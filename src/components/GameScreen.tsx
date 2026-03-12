import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Home, BookOpen, Star, Volume2 } from './Icons';
import { generateStory } from '../utils/storyGenerator';
import { BackgroundMusic } from './BackgroundMusic';
import { getMusicConfig } from '../config/music';
import { useSoundEffect } from '../hooks/useSoundEffect';
import { useTTS } from '../hooks/useTTS';
import type { Scene } from '../types';
import {
  startSession,
  updateSession,
  addThought,
  completeSession,
  getSessions,
  unlockBadge
} from '../utils/analytics';
import { sendToGoogleSheets } from '../utils/googleSheets';

interface GameScreenProps {
  bookTitle: string;
  gradeLevel: string;
  onReset: () => void;
}

// Helper function to get player title based on affinity stats
function getPlayerTitle(stats: Record<string, number>): string {
  if (Object.keys(stats).length === 0) return '다재다능한 탐험가';
  const topStat = Object.entries(stats).sort((a, b) => b[1] - a[1])[0][0];
  switch (topStat) {
    case 'courage': return '용기있는 행동대장 🦁';
    case 'wisdom': return '지혜로운 사색가 🦉';
    case 'empathy': return '따뜻한 마음의 수호자 💖';
    case 'curiosity': return '호기심 많은 모험가 🔍';
    case 'justice': return '정의로운 심판관 ⚖️';
    case 'caution': return '신중한 전략가 🛡️';
    default: return '다재다능한 탐험가 🌟';
  }
}

// Helper function to generate reflection analysis
function generateReflectionAnalysis(
  answers: Record<string, string>,
  bookTitle: string,
  playerName: string,
  totalQuestionsViewed: number
) {
  const answerCount = Object.keys(answers).length;

  if (answerCount === 0 || totalQuestionsViewed === 0) return null;

  // Calculate participation rate (answered / viewed)
  const participationRate = answerCount / totalQuestionsViewed;

  // Calculate thoughtfulness ratio based on average character length
  const totalCharacters = Object.values(answers).reduce((sum, answer) => sum + answer.length, 0);
  const avgCharLength = answerCount > 0 ? totalCharacters / answerCount : 0;
  let thoughtfulnessRatio = 0;
  if (answerCount === 0) {
    thoughtfulnessRatio = 0;
  } else if (avgCharLength >= 150) {
    thoughtfulnessRatio = 1.0;
  } else if (avgCharLength >= 120) {
    thoughtfulnessRatio = 0.9;
  } else if (avgCharLength >= 90) {
    thoughtfulnessRatio = 0.8;
  } else if (avgCharLength >= 70) {
    thoughtfulnessRatio = 0.7;
  } else if (avgCharLength >= 50) {
    thoughtfulnessRatio = 0.6;
  } else if (avgCharLength >= 40) {
    thoughtfulnessRatio = 0.5;
  } else if (avgCharLength >= 30) {
    thoughtfulnessRatio = 0.4;
  } else if (avgCharLength >= 20) {
    thoughtfulnessRatio = 0.3;
  } else if (avgCharLength >= 10) {
    thoughtfulnessRatio = 0.2;
  } else {
    thoughtfulnessRatio = 0.1;
  }

  // Calculate composite score (participation 60% + thoughtfulness 40%)
  const compositeScore = (participationRate * 0.6) + (thoughtfulnessRatio * 0.4);

  let message = '';
  let insight = '';
  let starCount = 0;
  let encouragement = '';

  // Generate stars based on composite score
  if (compositeScore >= 0.9) {
    starCount = 5;
    if (thoughtfulnessRatio >= 0.7) {
      message = `양과 질 모두 완벽해! 모든 순간마다 깊이 생각하며 여정을 완성했어. 철학적 질문들에 진지하게 답하고, 등장인물의 마음을 이해하려 노력한 흔적이 가득해.`;
      encouragement = '최고의 몰입도야! 🌟';
    } else if (thoughtfulnessRatio >= 0.4) {
      message = `모든 질문에 답하며 이야기를 완성했어. 때론 짧게, 때론 길게 자신만의 속도로 생각을 나누었지.`;
      encouragement = '완벽한 참여도! 👏';
    } else {
      message = `모든 선택의 순간마다 참여하며 빠르게 여정을 완주했어. 이야기의 흐름을 놓치지 않았어!`;
      encouragement = '완주 성공! 🎉';
    }
    insight = `《${bookTitle}》를 읽을 때도 이런 집중력으로 임한다면, 작품의 깊은 의미를 충분히 느낄 수 있을 거야!`;
  } else if (compositeScore >= 0.75) {
    starCount = 4;
    if (thoughtfulnessRatio >= 0.7) {
      message = `참여도 좋고 깊이도 있어! 대부분의 질문에 깊이 생각하며 답했어. 등장인물의 마음을 이해하고, 상황을 진지하게 고민한 모습이 보여.`;
      encouragement = '훌륭한 사색가! 💫';
    } else if (thoughtfulnessRatio >= 0.4) {
      message = `많은 질문에 답하며 이야기를 따라갔어. 자신만의 방식으로 생각을 표현했지.`;
      encouragement = '멋진 참여! 🌈';
    } else {
      message = `많은 순간에 참여하며 빠르게 이야기를 진행했어. 적극적인 모습이 돋보여!`;
      encouragement = '좋은 페이스! 🚀';
    }
    insight = `《${bookTitle}》를 읽을 때도 이렇게 능동적으로 참여한다면 더 많은 걸 발견할 수 있을 거야!`;
  } else if (compositeScore >= 0.6) {
    starCount = 3;
    if (thoughtfulnessRatio >= 0.7) {
      message = `질문 수는 적지만 깊이가 있어! 선택한 질문들에 깊이 생각하며 답했어. 진지하게 고민한 흔적이 보여.`;
      encouragement = '사려 깊은 독자! 📖';
    } else if (thoughtfulnessRatio >= 0.4) {
      message = `절반 정도의 질문에 답하며 이야기를 진행했어. 자유롭게 자신의 의견을 나누었지.`;
      encouragement = '좋은 시작! ✨';
    } else {
      message = `주요 선택지에서 간단히 생각을 남기며 이야기를 따라갔어.`;
      encouragement = '꾸준한 참여! 🌱';
    }
    insight = `《${bookTitle}》를 읽을 때는 조금 더 많은 질문을 스스로에게 던져보면 어떨까? 더 깊은 이해가 기다리고 있을 거야!`;
  } else if (compositeScore >= 0.4) {
    starCount = 2;
    if (thoughtfulnessRatio >= 0.7) {
      message = `몇몇 중요한 질문에 깊이 생각하며 답했어. 진정으로 고민한 순간들이 빛나!`;
      encouragement = '의미 있는 참여! 💭';
    } else if (thoughtfulnessRatio >= 0.4) {
      message = `일부 질문에 답하며 이야기를 따라갔어. 때때로 생각을 나누었지.`;
      encouragement = '관심 있는 독자! 📚';
    } else {
      message = `가끔씩 짧은 생각을 남기며 이야기를 빠르게 진행했어.`;
      encouragement = '참여 감사! 🌟';
    }
    insight = `《${bookTitle}》를 읽을 때는 등장인물이 되어보는 상상을 해보면 어떨까? 조금 더 천천히 음미하면 더 재미있는 발견이 기다리고 있을 거야!`;
  } else {
    starCount = 1;
    message = `이야기를 빠르게 진행하며 간단한 생각들을 남겼어.`;
    encouragement = '참여해줘서 고마워! 💫';
    insight = `《${bookTitle}》를 읽을 때는 조금 천천히, 등장인물이 되어보는 상상을 해보면 어떨까? 철학적 질문들에 답하며 읽으면 훨씬 더 재미있는 발견이 기다리고 있을 거야!`;
  }

  return (
    <>
      <p className="text-emerald-50 text-sm leading-relaxed">
        {message}
      </p>
      <div className="border-t border-emerald-400/20 pt-2 mt-2">
        <p className="text-emerald-100 text-sm leading-relaxed">
          {insight}
        </p>
      </div>
      <div className="bg-emerald-500/10 rounded-lg p-3 mt-2 space-y-1">
        {/* Star Rating Display */}
        <div className="flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 sm:w-6 sm:h-6 ${star <= starCount
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-500 text-gray-500'
                }`}
            />
          ))}
        </div>
        <p className="text-emerald-300 text-xs text-center font-medium">
          {encouragement}
        </p>
        <p className="text-emerald-200 text-xs text-center">
          💭 참여율 {Math.round(participationRate * 100)}% · 답변 깊이 {Math.round(thoughtfulnessRatio * 100)}%<br />
          종합 점수: {Math.round(compositeScore * 100)}%
        </p>
      </div>
    </>
  );
}

export function GameScreen({ bookTitle, gradeLevel, onReset }: GameScreenProps) {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [currentSceneId, setCurrentSceneId] = useState<string>('name-input');
  const [history, setHistory] = useState<string[]>(['name-input']);
  const [loading, setLoading] = useState(false);
  const { playClick } = useSoundEffect();
  const [playerLastName, setPlayerLastName] = useState<string>('');
  const [playerFirstName, setPlayerFirstName] = useState<string>('');
  const [lastNameInput, setLastNameInput] = useState<string>('');
  const [firstNameInput, setFirstNameInput] = useState<string>('');
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({});
  const [playerStats, setPlayerStats] = useState<Record<string, number>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [totalQuestionsViewed, setTotalQuestionsViewed] = useState<number>(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [finalStarRating, setFinalStarRating] = useState<number | null>(null);

  // TTS State
  const { speak, stop, isSpeaking, isSupported } = useTTS();

  // Game review/feedback state
  const [gameReview, setGameReview] = useState<string>('');
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  // Background music state
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Scroll indicator state
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Helper function to replace placeholders with actual player names
  const replacePlaceholders = (text: string): string => {
    if (!playerFirstName || !playerLastName) return text;

    const fullName = `${playerLastName}${playerFirstName}`;

    return text
      .replace(/\{playerFirstName\}/g, playerFirstName)
      .replace(/\{playerLastName\}/g, playerLastName)
      .replace(/\{playerFullName\}/g, fullName);
  };

  useEffect(() => {
    // Only generate story after player name is set
    if (playerLastName && playerFirstName) {
      setLoading(true);
      const story = generateStory(bookTitle, gradeLevel, playerLastName, playerFirstName);
      setScenes(story);
      setLoading(false);
      // Automatically go to start scene after story is generated
      setCurrentSceneId('start');
      setHistory(['name-input', 'start']);
      // Start analytics session
      const newSessionId = startSession(bookTitle, playerLastName, playerFirstName);
      setSessionId(newSessionId);
      // Update session with grade level and total pages
      updateSession(newSessionId, {
        gradeLevel: gradeLevel,
        totalPages: story.length,
      });
    }
  }, [bookTitle, gradeLevel, playerLastName, playerFirstName]);

  const currentScene = scenes.find(s => s.id === currentSceneId) || scenes[0];

  // Stop speaking when scene changes
  useEffect(() => {
    stop();
  }, [currentSceneId, stop]);

  // 동적 테마 컬러 시스템: 진행도에 따라 Prompt 상자 분위기를 순환 변환
  const themeColors = [
    'from-purple-900/60 to-pink-900/60 border-purple-400/40', // 기본 보라/핑크
    'from-blue-900/60 to-cyan-900/60 border-blue-400/40',     // 시원한 파랑
    'from-emerald-900/60 to-teal-900/60 border-emerald-400/40', // 안정적인 초록
    'from-orange-900/60 to-amber-900/60 border-orange-400/40',  // 긴박한/따뜻한 주황
    'from-indigo-900/60 to-purple-900/60 border-indigo-400/40', // 깊은 밤 인디고
  ];
  const currentThemeIdx = Math.max(0, history.length - 2) % themeColors.length;
  const currentTheme = themeColors[currentThemeIdx];

  const isEndingScene = currentScene?.id === 'ending';

  // Handle scroll to update progress
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll > 0) {
        const progress = (scrollTop / maxScroll) * 100;
        setScrollProgress(progress);
        setIsScrollable(true);
      } else {
        setIsScrollable(false);
      }
    };

    // Initial check
    handleScroll();

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [currentScene, currentSceneId]);

  // Check if content is scrollable and show indicator
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollContainerRef.current) {
        const { scrollHeight, clientHeight } = scrollContainerRef.current;
        const scrollable = scrollHeight > clientHeight;

        setIsScrollable(scrollable);

        if (scrollable) {
          setShowScrollIndicator(true);
          // Hide indicator after 3 seconds
          const timer = setTimeout(() => {
            setShowScrollIndicator(false);
          }, 3000);
          return () => clearTimeout(timer);
        } else {
          setShowScrollIndicator(false);
        }
      }
    };

    // Check after content loads
    const timer = setTimeout(checkScrollable, 100);
    return () => clearTimeout(timer);
  }, [currentSceneId, currentScene]);

  // Reset scroll position when scene changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentSceneId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && history.length > 1) {
        goBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history]);

  const goToScene = (sceneId: string) => {
    playClick(); // эффек트음 재생
    // 현재 답변을 저장
    if (currentScene && currentAnswer.trim()) {
      setReflectionAnswers(prev => ({
        ...prev,
        [currentScene.id]: currentAnswer.trim(),
      }));
      // Add thought to analytics
      addThought(bookTitle, playerLastName, playerFirstName, currentScene.id, currentAnswer.trim());
    }
    setCurrentAnswer('');
    setCurrentSceneId(sceneId);
    setHistory(prev => [...prev, sceneId]);
    if (currentScene && currentScene.prompt) {
      setTotalQuestionsViewed(prev => prev + 1);
    }

    // Update session progress
    if (sessionId && scenes.length > 0) {
      const sceneIndex = scenes.findIndex(s => s.id === sceneId);
      updateSession(sessionId, {
        currentPage: Math.max(0, sceneIndex),
      });

      // Mark as completed if ending scene
      if (sceneId === 'ending') {
        // Calculate star rating
        const answerCount = Object.keys(reflectionAnswers).length;
        const totalQuestions = totalQuestionsViewed;
        const participationRate = totalQuestions > 0 ? answerCount / totalQuestions : 0;

        // Calculate thoughtfulness ratio (0% ~ 100% in 10% increments)
        const totalCharacters = Object.values(reflectionAnswers).reduce((sum, answer) => sum + answer.length, 0);
        const avgCharLength = answerCount > 0 ? totalCharacters / answerCount : 0;
        // 답변이 없으면 0%, 있으면 평균 글자 수에 따라 10% 단위로 계산
        let thoughtfulnessRatio = 0;
        if (answerCount === 0) {
          thoughtfulnessRatio = 0; // 답변 없음
        } else if (avgCharLength >= 150) {
          thoughtfulnessRatio = 1.0; // 100% - 최고 수준의 성찰
        } else if (avgCharLength >= 120) {
          thoughtfulnessRatio = 0.9; // 90% - 아주 깊이 있는 답변
        } else if (avgCharLength >= 90) {
          thoughtfulnessRatio = 0.8; // 80% - 매우 긴 답변
        } else if (avgCharLength >= 70) {
          thoughtfulnessRatio = 0.7; // 70% - 긴 답변
        } else if (avgCharLength >= 50) {
          thoughtfulnessRatio = 0.6; // 60% - 보통보다 약간 긴 답변
        } else if (avgCharLength >= 40) {
          thoughtfulnessRatio = 0.5; // 50% - 보통
        } else if (avgCharLength >= 30) {
          thoughtfulnessRatio = 0.4; // 40% - 보통보다 약간 짧음
        } else if (avgCharLength >= 20) {
          thoughtfulnessRatio = 0.3; // 30% - 조금 짧은 답변
        } else if (avgCharLength >= 10) {
          thoughtfulnessRatio = 0.2; // 20% - 짧은 답변
        } else {
          thoughtfulnessRatio = 0.1; // 10% - 매우 짧은 답변
        }

        // Determine star rating using composite score (participation 60% + thoughtfulness 40%)
        const compositeScore = (participationRate * 0.6) + (thoughtfulnessRatio * 0.4);
        let starRating = 1;
        if (compositeScore >= 0.9) {
          starRating = 5;
        } else if (compositeScore >= 0.75) {
          starRating = 4;
        } else if (compositeScore >= 0.6) {
          starRating = 3;
        } else if (compositeScore >= 0.4) {
          starRating = 2;
        }

        // Update session with results
        updateSession(sessionId, {
          starRating,
          answerCount,
          totalQuestions,
          participationRate,
          thoughtfulnessRatio, // ✅ 추가
        });

        setFinalStarRating(starRating);

        completeSession(sessionId);

        // 배지 획득 로직
        unlockBadge('first_book');
        if (playerStats.courage && playerStats.courage >= 10) unlockBadge('courage_hero');
        if (playerStats.wisdom && playerStats.wisdom >= 10) unlockBadge('wisdom_sage');
        if (playerStats.empathy && playerStats.empathy >= 10) unlockBadge('empathy_heart');
        if (playerStats.curiosity && playerStats.curiosity >= 10) unlockBadge('curiosity_finder');
        if (playerStats.justice && playerStats.justice >= 10) unlockBadge('justice_judge');
        if (thoughtfulnessRatio >= 0.8) unlockBadge('deep_thinker');

        // Calculate statistics for Google Sheets
        const sessions = getSessions();
        const currentSession = sessions.find(s => s.sessionId === sessionId);

        if (currentSession) {
          const playTime = Math.round((Date.now() - currentSession.startTime) / 60000);

          // Send to Google Sheets with evaluation data
          sendToGoogleSheets({
            sessionId: sessionId,
            studentName: `${playerLastName}${playerFirstName}`,
            bookTitle: bookTitle,
            gradeLevel: gradeLevel,
            currentPage: sceneIndex,
            totalPages: scenes.length,
            completed: true,
            thoughtsCount: Object.keys(reflectionAnswers).length,
            playTime: playTime,
            // 평가 정보
            starRating: starRating,
            answerCount: answerCount,
            totalQuestions: totalQuestions,
            participationRate: Math.round(participationRate * 100), // 0-100 퍼센트로 변환
            thoughtfulnessRatio: Math.round(thoughtfulnessRatio * 100), // ✅ 추가: 0-100 퍼센트로 변환
          });
        }
      }
    }
  };

  const openHiddenCookie = () => {
    playClick(); // 효과음 재생
    const hiddenScene: Scene = {
      id: 'hidden_cookie',
      title: '🌟 숨겨진 이야기 결말',
      text: `${playerLastName}${playerFirstName}의 뛰어난 몰입과 훌륭한 선택 덕분에 숨겨진 결말이 열렸어!\n\n${bookTitle}의 본래 이야기와는 조금 다른, 오직 너만의 특별한 비밀스러운 쿠키 영상 같은 결말이 새롭게 펼쳐진다.\n\n"진정한 지혜와 용기, 그리고 공감 능력을 가진 자만이 이 비밀의 문을 열 수 있지."\n\n주변 풍경이 포근한 황금빛으로 물들며, 모험의 모든 순간이 눈앞에 스쳐 지나가. 너는 이야기 속에 영원히 기억될 아름다운 전설의 주인공이 되었단다.`,
      bg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' }
      ],
      prompt: '💭 이 특별한 순간을 어떻게 기억하고 싶어?'
    };

    // add to scenes if not exist
    if (!scenes.find((s: Scene) => s.id === 'hidden_cookie')) {
      setScenes(prev => [...prev, hiddenScene]);
    }

    // directly navigate without incrementing totalQuestionsViewed for the hidden ending itself, 
    // or we can use goToScene
    setCurrentSceneId('hidden_cookie');
    setHistory(prev => [...prev, 'hidden_cookie']);
  };

  const handleChoiceClick = (choice: { to: string; affinity?: Record<string, number> }) => {
    if (choice.affinity) {
      setPlayerStats((prev: Record<string, number>) => {
        const newStats = { ...prev };
        for (const [key, value] of Object.entries(choice.affinity!)) {
          newStats[key] = (newStats[key] || 0) + value;
        }
        return newStats;
      });
    }
    goToScene(choice.to);
  };

  const goBack = () => {
    playClick(); // 효과음 재생
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentSceneId(newHistory[newHistory.length - 1]);
    }
  };

  const goHome = () => {
    setCurrentSceneId('start');
    setHistory(['start']);
  };

  const handleNameSubmit = () => {
    if (lastNameInput.trim() && firstNameInput.trim()) {
      playClick(); // 효과음 재생
      setPlayerLastName(lastNameInput.trim());
      setPlayerFirstName(firstNameInput.trim());
      // Don't call goToScene here - let useEffect handle the transition after story generation
    }
  };

  const handleReflectionSubmit = () => {
    if (currentScene && currentAnswer.trim()) {
      playClick(); // 효과음 재생
      setReflectionAnswers(prev => ({
        ...prev,
        [currentScene.id]: currentAnswer.trim(),
      }));
      // Add thought to analytics
      addThought(bookTitle, playerLastName, playerFirstName, currentScene.id, currentAnswer.trim());
      setCurrentAnswer('');
      goToScene(currentScene.choices[0].to);
    }
  };

  // Name input screen
  if (currentSceneId === 'name-input') {
    return (
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-3 sm:p-4">
        <div className="w-full max-w-md mx-auto h-[90vh] sm:h-[85vh] bg-black rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          <header className="bg-gradient-to-r from-purple-900 to-indigo-900 px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between border-b border-purple-700 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300 shrink-0" />
              <div className="min-w-0">
                <h1 className="text-xs sm:text-sm text-purple-100 truncate">{bookTitle}</h1>
                <p className="text-[10px] sm:text-xs text-purple-300 truncate">{gradeLevel}</p>
              </div>
            </div>
            <button
              onClick={onReset}
              className="text-purple-300 hover:text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-purple-800/50 hover:bg-purple-700/50 transition-all shrink-0"
            >
              나가기
            </button>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8 bg-gradient-to-b from-gray-900 to-gray-800 overflow-y-auto">
            <div className="w-full space-y-5 sm:space-y-6">
              <div className="text-center space-y-2 sm:space-y-3">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto shadow-lg">
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h2 className="text-white text-lg sm:text-xl">주인공 이름 정하기</h2>
                <p className="text-purple-200 text-xs sm:text-sm">
                  이 이야기의 주인공은 바로 너야!<br />
                  너의 이름은?
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  value={lastNameInput}
                  onChange={(e) => setLastNameInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                  placeholder="성 입력"
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/10 border-2 border-purple-400/30 text-white text-sm sm:text-base placeholder:text-purple-300/50 focus:outline-none focus:border-purple-400 transition-all text-center"
                  maxLength={10}
                  autoFocus
                />

                <input
                  type="text"
                  value={firstNameInput}
                  onChange={(e) => setFirstNameInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                  placeholder="이름 입력"
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/10 border-2 border-purple-400/30 text-white text-sm sm:text-base placeholder:text-purple-300/50 focus:outline-none focus:border-purple-400 transition-all text-center"
                  maxLength={10}
                />

                <button
                  onClick={handleNameSubmit}
                  disabled={!lastNameInput.trim() || !firstNameInput.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all shadow-lg border-2 border-white/20 text-sm sm:text-base"
                >
                  프리퀄 스토리 시작
                </button>
              </div>

              <p className="text-purple-300/60 text-[10px] sm:text-xs text-center">
                💡 입력한 이름이 게임 속에서 사용돼요.<br></br>
                당신의 선택에 따라 새로운 스토리가 펼쳐집니다.<br></br>
                다양한 질문들에 깊이있게 답하며 등급도 높여보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p>게임을 생성하는 중...</p>
        </div>
      </div>
    );
  }

  if (!currentScene) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-red-400 mb-4">⚠️ 씬을 찾을 수 없습니다</p>
          <button
            onClick={onReset}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all"
          >
            처음으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-3 sm:p-4">
      {/* Mobile Container */}
      <div className="w-full max-w-md mx-auto h-[90vh] sm:h-[85vh] bg-black rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <header className="bg-gradient-to-r from-purple-900 to-indigo-900 px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between border-b border-purple-700 shrink-0 relative z-20">
          <div className="flex items-center gap-2 min-w-0">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300 shrink-0" />
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm text-purple-100 truncate">{bookTitle}</h1>
              <p className="text-[10px] sm:text-xs text-purple-300 truncate">{gradeLevel}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={goBack}
              disabled={history.length <= 1}
              className="text-purple-300 hover:text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-purple-800/50 hover:bg-purple-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1"
              title="뒤로 가기 (←)"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">뒤로</span>
            </button>
            <button
              onClick={onReset}
              className="text-purple-300 hover:text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-purple-800/50 hover:bg-purple-700/50 transition-all"
            >
              나가기
            </button>
          </div>
        </header>

        {/* ========== FULL SCREEN IMAGE WITH OVERLAY CONTENT ========== */}
        <div className="flex-1 relative overflow-hidden">
          {/* Background Image with Ken Burns effect */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene.bg}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1 },
                scale: { duration: 20, ease: "linear" }
              }}
              className="absolute inset-0 bg-cover bg-center origin-center"
              style={{ backgroundImage: `url(${currentScene.bg})`, willChange: 'transform' }}
            >
              <div className={`absolute inset-0 ${isEndingScene ? 'bg-gradient-to-b from-purple-900/70 via-indigo-900/60 to-black/80' : 'bg-gradient-to-b from-black/30 via-black/40 to-black/70'}`} />
            </motion.div>
          </AnimatePresence>

          {/* Ending Badge */}
          {isEndingScene && (
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-4 sm:p-6 shadow-2xl animate-pulse">
                <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              </div>
            </div>
          )}

          {/* Custom Scroll Indicator (Outside text area) */}
          {isScrollable && (
            <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-center pointer-events-none z-30">
              {/* Up Arrow - positioned at top */}
              <div className="absolute top-2 right-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-sm rounded-full p-0.5 shadow-md border border-white/10">
                <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"></path>
                </svg>
              </div>

              {/* Progress Bar - stretched to fill space between arrows */}
              <div className="absolute top-10 bottom-10 right-0 w-1 bg-gradient-to-b from-gray-700/30 via-gray-600/30 to-gray-700/30 rounded-full backdrop-blur-sm border border-white/10 shadow-md">
                {/* Progress Fill */}
                <div
                  ref={(el) => {
                    if (el) el.style.height = `${scrollProgress}%`;
                  }}
                  className="absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-400/50 via-pink-500/50 to-purple-600/50 rounded-full transition-all duration-300 ease-out shadow-md"
                />
              </div>

              {/* Down Arrow - positioned at bottom */}
              <div className="absolute bottom-2 right-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-sm rounded-full p-0.5 shadow-md border border-white/10">
                <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          )}

          {/* Overlay Content Container */}
          <div className="absolute inset-0 flex flex-col p-3 sm:p-4 md:p-5 z-10">

            {/* Top: Scene Title */}
            <div className="mb-2 sm:mb-3">
              <div className={`${isEndingScene ? 'bg-gradient-to-r from-yellow-500/90 to-orange-500/90' : 'bg-black/80'} relative backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 border ${isEndingScene ? 'border-yellow-400/60' : 'border-purple-500/40'} shadow-2xl`}>

                {/* TTS Button (Moved to Title area - Left Aligned) */}
                {isSupported && !isEndingScene && (
                  <div className="absolute left-1 sm:left-1 top-2">
                    <button
                      onClick={() => isSpeaking ? stop() : speak(`${currentScene.title}. ${replacePlaceholders(currentScene.text)}`)}
                      className={`flex items-center justify-center p-2 rounded-full transition-all ${isSpeaking ? 'bg-purple-600/80 text-white animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-white/10 text-purple-200 hover:text-white hover:bg-white/20'
                        }`}
                      title={isSpeaking ? "읽어주기 중지" : "스토리 읽어주기"}
                    >
                      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                )}

                {isEndingScene && (
                  <div className="text-center mb-1">
                    <span className="text-yellow-100 text-[10px] sm:text-xs">✨ THE END ✨</span>
                  </div>
                )}
                {/* 패딩 축소 및 버튼 고려한 좌우 여백 부여 */}
                <h2 className={`${isEndingScene ? 'text-white' : 'text-purple-100'} text-center text-sm sm:text-base px-10`}>{currentScene.title}</h2>
              </div>
            </div>

            {/* Bottom: Story Text, Prompt, and Choices */}
            <div className="flex-1 relative overflow-hidden">
              {/* Scrollable Content */}
              <div
                className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                ref={scrollContainerRef}
              >
                <div className="space-y-2 sm:space-y-3 pb-2 relative">

                  {/* Main Story Text with Staggered Fade-in */}
                  <div className={`${isEndingScene ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/40' : 'bg-black/60'} backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-5 py-3 sm:py-4 border ${isEndingScene ? '' : 'border-white/20'} shadow-2xl`}>
                    <motion.div
                      key={`text-${currentScene.id}`}
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.1 }
                        }
                      }}
                      className="text-white leading-relaxed text-xs sm:text-sm"
                    >
                      {replacePlaceholders(currentScene.text).split('\n').map((line, i) => (
                        <motion.span
                          key={i}
                          variants={{
                            hidden: { opacity: 0, y: 5 },
                            visible: { opacity: 1, y: 0 }
                          }}
                          className="block min-h-[1.5em]"
                        >
                          {line}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Ending Scene: Show Prompt BEFORE Choices */}
                  {isEndingScene ? (
                    <>
                      {/* Thinking Prompt with Dynamic Theme */}
                      <div className={`bg-gradient-to-r ${currentTheme} backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-5 py-3 sm:py-4 border shadow-2xl space-y-2 sm:space-y-3 transition-colors duration-1000`}>
                        <p className="text-purple-100 text-xs sm:text-sm leading-relaxed">
                          {currentScene.prompt}
                        </p>
                      </div>

                      {/* Choice Buttons */}
                      <div className="space-y-3">
                        {currentScene.choices.map((choice, index) => (
                          <button
                            key={index}
                            onClick={() => handleChoiceClick(choice)}
                            className={`group relative w-full overflow-hidden bg-white/10 text-gray-900 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl shadow-lg border border-white/40 backdrop-blur-md text-sm sm:text-base font-bold flex items-center justify-center cursor-pointer choice-btn-hover-transform`}
                          >
                            <div className={`absolute inset-0 ${choice.cls} pointer-events-none choice-tint`}></div>
                            <span className="relative z-20">{choice.label}</span>
                            <div className="choice-shimmer"></div>
                          </button>
                        ))}

                        {finalStarRating === 5 && (
                          <button
                            onClick={openHiddenCookie}
                            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 active:from-yellow-600 active:to-yellow-800 text-white px-3 sm:px-4 md:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all shadow-2xl border-2 border-yellow-200 backdrop-blur-sm text-xs sm:text-sm font-bold flex justify-center items-center gap-2 animate-bounce mt-4"
                          >
                            <span className="text-xl">🌟</span> 특별 보너스 스토리 열기
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Normal Scene: Show Choices BEFORE Prompt */}
                      {/* Choice Buttons */}
                      <div className="space-y-3">
                        {currentScene.choices.map((choice, index) => (
                          <button
                            key={index}
                            onClick={() => handleChoiceClick(choice)}
                            className={`group relative w-full overflow-hidden bg-white/10 text-gray-900 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl shadow-lg border border-white/40 backdrop-blur-md text-sm sm:text-base font-bold flex items-center justify-center cursor-pointer choice-btn-hover-transform`}
                          >
                            <div className={`absolute inset-0 ${choice.cls} pointer-events-none choice-tint`}></div>
                            <span className="relative z-20">{choice.label}</span>
                            <div className="choice-shimmer"></div>
                          </button>
                        ))}
                      </div>

                      {/* Thinking Prompt with Dynamic Theme */}
                      <div className={`bg-gradient-to-r ${currentTheme} backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-5 py-3 sm:py-4 border shadow-2xl space-y-2 sm:space-y-3 transition-colors duration-1000`}>
                        <p className="text-purple-100 text-xs sm:text-sm leading-relaxed">
                          {currentScene.prompt}
                        </p>

                        {/* Answer Input */}
                        <textarea
                          value={currentAnswer}
                          onChange={(e) => setCurrentAnswer(e.target.value)}
                          placeholder="네 생각을 자유롭게 적어봐~&#10;(답변 개수와 깊이에 따라 결과 창에 랭크가 표시돼)"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-white/10 border border-purple-300/30 text-white text-xs sm:text-sm placeholder:text-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all resize-none"
                          rows={3}
                        />
                      </div>
                    </>
                  )}

                  {/* Reflection Analysis - Only show on ending scene */}
                  {isEndingScene && Object.keys(reflectionAnswers).length > 0 && (
                    <div className="bg-gradient-to-br from-emerald-900/70 to-teal-900/70 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-5 py-3 sm:py-4 border border-emerald-400/40 shadow-2xl">
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-emerald-500/30 rounded-full p-1.5 sm:p-2">
                            <span className="text-xl sm:text-2xl">✨</span>
                          </div>
                          <h3 className="text-emerald-100 text-sm sm:text-base">{playerLastName}{playerFirstName}의 여정을 돌아보며</h3>
                        </div>

                        <div className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-2">
                          {generateReflectionAnalysis(reflectionAnswers, bookTitle, playerFirstName, totalQuestionsViewed)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Affinity Result - Only show on ending scene */}
                  {isEndingScene && Object.keys(playerStats).length > 0 && (
                    <div className="bg-gradient-to-br from-purple-900/70 to-fuchsia-900/70 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-5 py-3 sm:py-4 border border-purple-400/40 shadow-2xl mt-2 sm:mt-3">
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-purple-500/30 rounded-full p-1.5 sm:p-2">
                            <span className="text-xl sm:text-2xl">👑</span>
                          </div>
                          <h3 className="text-purple-100 text-sm sm:text-base">당신의 플레이 성향 칭호</h3>
                        </div>
                        <div className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                          <p className="text-fuchsia-200 text-xs sm:text-sm mb-2">모험을 통해 얻은 칭호는...</p>
                          <h4 className="text-white text-lg sm:text-xl font-bold px-4 py-2 bg-gradient-to-r from-fuchsia-600/50 to-purple-600/50 rounded-full inline-block border border-fuchsia-300/30">
                            {getPlayerTitle(playerStats)}
                          </h4>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Game Review Section - Only show on ending scene */}
                  {isEndingScene && (
                    <div className="bg-gradient-to-br from-blue-900/70 to-cyan-900/70 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-5 py-3 sm:py-4 border border-blue-400/40 shadow-2xl">
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-500/30 rounded-full p-1.5 sm:p-2">
                            <span className="text-xl sm:text-2xl">💭</span>
                          </div>
                          <h3 className="text-blue-100 text-sm sm:text-base">게임 후기</h3>
                        </div>

                        {!isReviewSubmitted ? (
                          <div className="space-y-2">
                            <p className="text-blue-200 text-xs sm:text-sm">
                              이 게임을 플레이하면서 어떤 생각이나 느낌을 받았나요? 자유롭게 적어주세요!
                            </p>
                            <textarea
                              value={gameReview}
                              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setGameReview(e.target.value)}
                              placeholder="어떤 감정과 교훈을 느꼈나요?&#10;원작에 대해 더 알고 싶어졌나요?&#10;좋았던 점이나 개선되기를 바라는 것은?&#10;&#10;솔직한 후기를 남겨주세요! 😊"
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-white/10 border border-blue-300/30 text-white text-xs sm:text-sm placeholder:text-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all resize-none"
                              rows={5}
                            />
                            <button
                              onClick={() => {
                                if (gameReview.trim()) {
                                  setIsReviewSubmitted(true);
                                  // 후기를 세션에 저장
                                  if (sessionId) {
                                    updateSession(sessionId, {
                                      gameReview: gameReview.trim(),
                                    });

                                    // Google Sheets에 후기 업데이트 전송
                                    const sessions = getSessions();
                                    const currentSession = sessions.find(s => s.sessionId === sessionId);

                                    if (currentSession) {
                                      const playTime = Math.round((Date.now() - currentSession.startTime) / 60000);
                                      const currentSceneIndex = scenes.findIndex(s => s.id === currentSceneId);

                                      sendToGoogleSheets({
                                        sessionId: sessionId,
                                        studentName: `${playerLastName}${playerFirstName}`,
                                        bookTitle: bookTitle,
                                        gradeLevel: gradeLevel,
                                        currentPage: Math.max(0, currentSceneIndex),
                                        totalPages: scenes.length,
                                        completed: true,
                                        thoughtsCount: Object.keys(reflectionAnswers).length,
                                        playTime: playTime,
                                        // 평가 정보
                                        starRating: currentSession.starRating,
                                        answerCount: currentSession.answerCount,
                                        totalQuestions: currentSession.totalQuestions,
                                        participationRate: Math.round((currentSession.participationRate || 0) * 100),
                                        thoughtfulnessRatio: Math.round((currentSession.thoughtfulnessRatio || 0) * 100),
                                        gameReview: gameReview.trim(), // ✅ 게임 후기 추가
                                      });
                                    }
                                  }
                                }
                              }}
                              disabled={!gameReview.trim()}
                              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all shadow-lg text-xs sm:text-sm"
                            >
                              후기 제출하기 ✍️
                            </button>
                          </div>
                        ) : (
                          <div className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-2">
                            <div className="flex items-center gap-2 text-blue-100">
                              <span className="text-lg sm:text-xl">✅</span>
                              <p className="text-xs sm:text-sm">후기가 제출되었어요!</p>
                            </div>
                            <div className="bg-blue-900/30 rounded-lg p-2 sm:p-3">
                              <p className="text-blue-100 text-xs sm:text-sm whitespace-pre-line">
                                {gameReview}
                              </p>
                            </div>
                            <p className="text-blue-300 text-[10px] sm:text-xs text-center">
                              소중한 의견 감사합니다! 🙏
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Gradient Fade (always visible when scrollable) */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

              {/* Scroll Indicator (shows for 3 seconds) */}
              {showScrollIndicator && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 pointer-events-none opacity-40">
                  <div className="bg-purple-600/70 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg animate-bounce-subtle">
                    <div className="flex items-center gap-1">
                      <span className="text-white text-[10px] sm:text-xs">아래로 스크롤</span>
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Background Music - 중앙 설정 파일에서 자동 로드 */}
      {getMusicConfig(bookTitle) && (
        <BackgroundMusic
          musicUrl={getMusicConfig(bookTitle)?.url}
          bookTitle={bookTitle}
          defaultVolume={getMusicConfig(bookTitle)?.volume || 0.3}
        />
      )}

      {/* 
        ===============================================
        🎵 배경 음악 중앙 관리 시스템
        ===============================================
        
        📁 설정 파일: /config/music.ts
        
        ✨ 특징:
        - 모든 작품의 BGM을 한 파일에서 관리
        - 작품별로 URL, 볼륨, 활성화 여부 설정
        - GameScreen.tsx 수정 불필요!
        
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        🚀 사용 방법 (3단계!)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        
        1단계: /config/music.ts 파일 열기
        
        2단계: 작품 찾아서 URL 입력 및 활성화
           '파우스트': {
             url: 'https://cdn.pixabay.com/audio/.../music.mp3',
             volume: 0.3,
             enabled: true,  // 👈 활성화!
           },
        
        3단계: 저장 → 새로고침 → 완료! ✅
        
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        📊 현재 작품 목록
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        
        ✅ 파우스트      - BGM 활성화됨
        ⏳ 노인과 바다   - BGM 대기 중
        ⏳ 레미제라블    - BGM 대기 중
        ⏳ 어린왕자      - BGM 대기 중
        ⏳ 홍길동전      - BGM 대기 중
        ⏳ 심청전        - BGM 대기 중
        ⏳ 춘향전        - BGM 대기 중
        
        진행률: 14% (1/7)
        
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        🎵 Pixabay에서 URL 얻는 방법
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        
        1. https://pixabay.com/music/ 방문
        2. 작품 분위기에 맞는 키워드 검색
           (music.ts 파일에 추천 키워드 있음!)
        3. 음악 재생
        4. F12 → Network → mp3 URL 복사
        5. ?filename=... 제거
        6. /config/music.ts에 붙여넣기
        
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        📖 자세한 가이드
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        
        - /config/README.md                    중앙 관리 가이드
        - /config/music.ts                     음악 설정 파일
        - /BACKGROUND_MUSIC_GUIDE.md           전체 가이드
        - /public/music/외부_URL_사용_가이드.md
        
        ===============================================
      */}
    </div>
  );
}
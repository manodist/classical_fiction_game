import React, { useState, useEffect } from 'react';
import { X, Award, Brain, TrendingUp, Trophy, Clock, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { getSessions, getUnlockedBadges, BADGE_DEFINITIONS, type ParticipantSession } from '../utils/analytics';
import { fetchFromGoogleSheets, type SessionData } from '../utils/googleSheets';
import { calculateStatsFromGoogleSheets } from '../utils/analytics';

interface MyRecordsPanelProps {
  onClose: () => void;
}

export function MyRecordsPanel({ onClose }: MyRecordsPanelProps) {
  const [activeTab, setActiveTab] = useState<'myRecords' | 'rankings' | 'badges'>('myRecords');
  const [myRecords, setMyRecords] = useState<ParticipantSession[]>([]);
  const [topRankings, setTopRankings] = useState<ParticipantSession[]>([]);
  const [isLoadingRankings, setIsLoadingRankings] = useState(false);
  const [currentUserNames, setCurrentUserNames] = useState<Set<string>>(new Set());

  // 나의 기록 불러오기 (로컬 데이터)
  useEffect(() => {
    const sessions = getSessions();
    // 완료된 세션만 필터링하고 최신순 정렬
    const completedSessions = sessions
      .filter(s => s.completed)
      .sort((a, b) => b.timestamp - a.timestamp);

    // 현재 브라우저에서 플레이한 모든 사용자 이름 추출
    const names = new Set(completedSessions.map(s => s.playerName));
    setCurrentUserNames(names);

    setMyRecords(completedSessions);
  }, []);

  // 전체 순위 불러오기 (Google Sheets)
  useEffect(() => {
    const loadTopRankings = async () => {
      setIsLoadingRankings(true);
      try {
        const sheetsData = await fetchFromGoogleSheets();
        if (sheetsData.length > 0) {
          const stats = calculateStatsFromGoogleSheets(sheetsData);
          // 상위 5명만 가져오기
          setTopRankings(stats.rankedSessions.slice(0, 5));
        }
      } catch (error) {
        console.error('❌ 순위 데이터 로드 실패:', error);
      } finally {
        setIsLoadingRankings(false);
      }
    };

    if (activeTab === 'rankings') {
      loadTopRankings();
    }
  }, [activeTab]);

  const gradeLabels: Record<string, string> = {
    'elementary-2-3': '초등 2-3',
    'elementary-4-6': '초등 4-6',
    'middle-school-1': '중1',
    'middle-school-2': '중2',
    'middle-school-3': '중3',
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <Card className="bg-gradient-to-br from-gray-900/95 to-black/95 border-white/10 p-4 sm:p-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white mb-1">📚 나의 독서 기록</h2>
                <p className="text-gray-400 text-sm">지금까지의 여정을 돌아보세요</p>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* 탭 */}
            <div className="flex gap-2 mb-6">
              <Button
                onClick={() => setActiveTab('myRecords')}
                variant={activeTab === 'myRecords' ? 'default' : 'outline'}
                size="sm"
                className={activeTab === 'myRecords'
                  ? 'flex-1'
                  : 'flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10'
                }
              >
                <BookOpen className="mr-2 h-4 w-4" />
                나의 기록
              </Button>
              <Button
                onClick={() => setActiveTab('badges')}
                variant={activeTab === 'badges' ? 'default' : 'outline'}
                size="sm"
                className={activeTab === 'badges'
                  ? 'flex-1'
                  : 'flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10'
                }
              >
                <Award className="mr-2 h-4 w-4" />
                수집 배지
              </Button>
              <Button
                onClick={() => setActiveTab('rankings')}
                variant={activeTab === 'rankings' ? 'default' : 'outline'}
                size="sm"
                className={activeTab === 'rankings'
                  ? 'flex-1'
                  : 'flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10'
                }
              >
                <Trophy className="mr-2 h-4 w-4" />
                전체 순위
              </Button>
            </div>

            {/* 나의 기록 탭 */}
            {activeTab === 'myRecords' && (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {myRecords.length > 0 ? (
                  myRecords.map((session: ParticipantSession, index: number) => {
                    // 종합 점수 기반 별점 재계산
                    const participationRate = session.participationRate || 0;
                    const thoughtfulnessRatio = session.thoughtfulnessRatio || 0;
                    const compositeScore = (participationRate * 0.6) + (thoughtfulnessRatio * 0.4);
                    let recalculatedStarRating = 1;
                    if (compositeScore >= 0.9) {
                      recalculatedStarRating = 5;
                    } else if (compositeScore >= 0.75) {
                      recalculatedStarRating = 4;
                    } else if (compositeScore >= 0.6) {
                      recalculatedStarRating = 3;
                    } else if (compositeScore >= 0.4) {
                      recalculatedStarRating = 2;
                    }

                    return (
                      <Card
                        key={session.sessionId}
                        className="bg-white/5 border-white/10 p-4 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-white">{session.bookTitle}</h3>
                              <span className="text-xs text-gray-400 px-2 py-0.5 rounded-full bg-white/5">
                                {gradeLabels[session.gradeLevel] || session.gradeLevel}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm">
                              {new Date(session.timestamp).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-4 h-4 ${star <= recalculatedStarRating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'fill-gray-600 text-gray-600'
                                  }`}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white/5 rounded-lg p-2 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <Brain className="h-3.5 w-3.5 text-purple-400" />
                              <span className="text-xs text-gray-400">답변</span>
                            </div>
                            <div className="text-white font-medium">{session.answerCount || 0}개</div>
                          </div>

                          <div className="bg-white/5 rounded-lg p-2 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                              <span className="text-xs text-gray-400">참여율</span>
                            </div>
                            <div className="text-white font-medium">
                              {Math.round((session.participationRate || 0) * 100)}%
                            </div>
                          </div>

                          <div className="bg-white/5 rounded-lg p-2 flex items-center justify-between col-span-2">
                            <div className="flex items-center gap-1.5">
                              <Award className="h-3.5 w-3.5 text-amber-400" />
                              <span className="text-xs text-gray-400">생각 깊이</span>
                            </div>
                            <div className={`font-medium ${(session.thoughtfulnessRatio || 0) >= 0.7
                              ? 'text-emerald-300'
                              : (session.thoughtfulnessRatio || 0) >= 0.4
                                ? 'text-amber-300'
                                : 'text-gray-400'
                              }`}>
                              {Math.round((session.thoughtfulnessRatio || 0) * 100)}%
                            </div>
                          </div>
                        </div>

                        {session.endTime && (
                          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="h-3 w-3" />
                            <span>
                              플레이 시간: {Math.round((session.endTime - session.startTime) / 60000)}분
                            </span>
                          </div>
                        )}
                      </Card>
                    );
                  })
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 mb-2">아직 완료한 게임이 없습니다</p>
                    <p className="text-gray-500 text-sm">게임을 끝까지 완료하면 기록이 저장됩니다!</p>
                  </div>
                )}
              </div>
            )}

            {/* 전체 순위 탭 */}
            {activeTab === 'rankings' && (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {isLoadingRankings ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-3"></div>
                    <p className="text-gray-400">순위 불러오는 중...</p>
                  </div>
                ) : topRankings.length > 0 ? (
                  topRankings.map((session: ParticipantSession, index: number) => {
                    const rankColors = [
                      'bg-gradient-to-r from-yellow-400 to-orange-500',
                      'bg-gradient-to-r from-gray-300 to-gray-400',
                      'bg-gradient-to-r from-orange-400 to-orange-600',
                      'bg-gradient-to-r from-blue-400 to-blue-500',
                      'bg-gradient-to-r from-purple-400 to-purple-500',
                    ];
                    const rankIcons = ['🥇', '🥈', '🥉', '4', '5'];
                    const isCurrentUser = currentUserNames.has(session.playerName);

                    // 종합 점수 기반 별점 재계산
                    const participationRate = session.participationRate || 0;
                    const thoughtfulnessRatio = session.thoughtfulnessRatio || 0;
                    const compositeScore = (participationRate * 0.6) + (thoughtfulnessRatio * 0.4);
                    let recalculatedStarRating = 1;
                    if (compositeScore >= 0.9) {
                      recalculatedStarRating = 5;
                    } else if (compositeScore >= 0.75) {
                      recalculatedStarRating = 4;
                    } else if (compositeScore >= 0.6) {
                      recalculatedStarRating = 3;
                    } else if (compositeScore >= 0.4) {
                      recalculatedStarRating = 2;
                    }

                    return (
                      <Card
                        key={session.sessionId}
                        className={`bg-white/5 border-white/10 p-4 transition-all ${isCurrentUser ? 'ring-2 ring-purple-500 bg-purple-500/10' : ''
                          }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* 순위 배지 */}
                          <div className={`
                            flex items-center justify-center w-12 h-12 rounded-full
                            ${rankColors[index]} shadow-lg flex-shrink-0
                            ${index >= 3 ? 'text-white' : ''}
                          `}>
                            <span className="text-lg font-bold">
                              {rankIcons[index]}
                            </span>
                          </div>

                          {/* 정보 */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-white truncate">
                                {session.playerName || '이름없음'}
                              </h3>
                              {isCurrentUser && (
                                <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full flex-shrink-0">
                                  나
                                </span>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm truncate mb-2">
                              {session.bookTitle}
                            </p>

                            <div className="flex items-center gap-3 text-sm">
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    className={`w-3 h-3 ${star <= recalculatedStarRating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'fill-gray-600 text-gray-600'
                                      }`}
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-gray-400">•</span>
                              <span className="text-emerald-300">
                                답변 {session.answerCount || 0}개 ({Math.round((session.participationRate || 0) * 100)}%)
                              </span>
                              <span className="text-gray-400">•</span>
                              <span className={`${(session.thoughtfulnessRatio || 0) >= 0.7
                                ? 'text-emerald-300'
                                : (session.thoughtfulnessRatio || 0) >= 0.4
                                  ? 'text-amber-300'
                                  : 'text-gray-400'
                                }`}>
                                깊이 {Math.round((session.thoughtfulnessRatio || 0) * 100)}%
                              </span>
                              <span className="text-gray-400">•</span>
                              <span className={`font-medium ${compositeScore >= 0.9
                                ? 'text-yellow-300'
                                : compositeScore >= 0.75
                                  ? 'text-emerald-300'
                                  : compositeScore >= 0.6
                                    ? 'text-blue-300'
                                    : 'text-gray-400'
                                }`}>
                                종합 {Math.round(compositeScore * 100)}점
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <div className="text-center py-12">
                    <Trophy className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 mb-2">아직 순위 데이터가 없습니다</p>
                    <p className="text-gray-500 text-sm">게임을 완료한 사용자들이 순위에 등록됩니다!</p>
                  </div>
                )}
              </div>
            )}

            {/* 수집 배지 탭 */}
            {activeTab === 'badges' && (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {BADGE_DEFINITIONS.map(badge => {
                    const isUnlocked = getUnlockedBadges().includes(badge.id);
                    return (
                      <div
                        key={badge.id}
                        className={`p-3 rounded-xl border ${isUnlocked
                          ? 'bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-400/50 shadow-lg'
                          : 'bg-white/5 border-white/10 opacity-60 grayscale'
                          } flex flex-col items-center text-center transition-all`}
                      >
                        <div className={`text-3xl mb-2 ${isUnlocked ? 'animate-bounce-slow' : ''}`}>
                          {isUnlocked ? badge.icon : '🔒'}
                        </div>
                        <h4 className={`text-sm font-bold mb-1 ${isUnlocked ? 'text-indigo-200' : 'text-gray-400'}`}>
                          {isUnlocked ? badge.name : '미해제 배지'}
                        </h4>
                        <p className="text-xs text-gray-400 leading-tight">
                          {isUnlocked ? badge.desc : '조건을 달성하여 배지를 획득하세요.'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 하단 안내 */}
            {activeTab === 'myRecords' && myRecords.length > 0 && (
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-start gap-2 text-sm text-gray-400">
                  <Award className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <p>
                    총 <span className="text-white font-medium">{myRecords.length}</span>개의 작품을 완료했습니다.
                    계속해서 새로운 작품에 도전해보세요!
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { BookOpen, Sparkles } from './components/Icons';
import { GameScreen } from './components/GameScreen';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { AdminPanel } from './components/AdminPanel';
import { MyRecordsPanel } from './components/MyRecordsPanel';
import logoImage from 'figma:asset/7c5782a8de24f1145706f6c4b29dfae3e0877f14.png';

// 앱 버전 - 업데이트 시마다 이 버전을 변경하세요
const APP_VERSION = '1.5.1';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showMyRecordsPanel, setShowMyRecordsPanel] = useState(false);
  const [adminLogoClickCount, setAdminLogoClickCount] = useState(0); // 관리자 패널용 (하단 로고)
  const [bookIconClickCount, setBookIconClickCount] = useState(0); // 나의 기록용 (상단 책 아이콘)
  const [lastBookIconClickTime, setLastBookIconClickTime] = useState(0); // 더블클릭 체크용

  // 버전 체크 로직
  useEffect(() => {
    const savedVersion = localStorage.getItem('appVersion');
    
    // 저장된 버전이 없거나 현재 버전과 다르면 업데이트 배너 표시
    if (savedVersion !== APP_VERSION) {
      setShowUpdateBanner(true);
    }
  }, []);

  // 관리자 패널 열기 (하단 인블랭큐 로고 3번 클릭)
  useEffect(() => {
    if (adminLogoClickCount >= 3) {
      setShowAdminPanel(true);
      setAdminLogoClickCount(0);
    }
  }, [adminLogoClickCount]);

  // 상단 노란색 책 아이콘 더블클릭 핸들러 (나의 기록 패널)
  const handleBookIconClick = () => {
    const now = Date.now();
    
    // 더블클릭 감지 (300ms 이내 두 번 클릭)
    if (now - lastBookIconClickTime < 300) {
      setShowMyRecordsPanel(true);
      setBookIconClickCount(0); // 카운트 리셋
    } else {
      setBookIconClickCount(prev => prev + 1);
    }
    
    setLastBookIconClickTime(now);
  };

  // 하단 인블랭큐 로고 클릭 핸들러 (관리자 패널)
  const handleInblankLogoClick = () => {
    setAdminLogoClickCount(prev => prev + 1);
  };

  // 업데이트 실행
  const handleUpdate = () => {
    localStorage.setItem('appVersion', APP_VERSION);
    // 강제 새로고침 (캐시 무시)
    handleForceRefresh();
  };

  // 나중에 업데이트
  const handleUpdateLater = () => {
    setShowUpdateBanner(false);
    // 다음에 다시 알림을 보기 위해 localStorage는 업데이트하지 않음
  };

  // 강제 새로고침 함수 (캐시 무시) - 개선된 버전
  const handleForceRefresh = async () => {
    try {
      // 1단계: Service Worker 등록 해제 (가장 중요!)
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (let registration of registrations) {
          await registration.unregister();
        }
        console.log('✅ Service Worker 등록 해제 완료');
      }
      
      // 2단계: 모든 캐시 삭제 (비동기 대기)
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
        console.log('✅ 모든 캐시 삭제 완료:', cacheNames);
      }
      
      // 3단계: localStorage 버전 업데이트
      localStorage.setItem('appVersion', APP_VERSION);
      console.log('✅ 버전 업데이트:', APP_VERSION);
      
      // 4단계: 타임스탬프를 추가하여 강제 새로고침 (캐시 우회)
      const timestamp = Date.now();
      window.location.href = window.location.pathname + '?v=' + APP_VERSION + '&t=' + timestamp;
      
    } catch (error) {
      console.error('❌ 캐시 지우기 실패:', error);
      // 실패해도 강제 새로고침 시도
      window.location.reload();
    }
  };

  // 학생 작품 매핑
  const booksByGrade: Record<string, { label: string; books: string[] }> = {
    'elementary-2-3': {
      label: '초등학교 2~3학년',
      books: [
        '톰 소여의 모험',
        '빨간머리 앤',
        '로빈슨 크루소',
        '홍당무',
        '보물섬',
        '오즈의 마법사',
        '해저 이만 리',
        '비밀의 정원',
        '15소년 표류기',
        '로미오와 줄리엣',
        '80일간의 세계 일주',
        '파브르 곤충기',
        '정글북',
        '아라비안 나이트',
        '지킬박사와 하이드',
        '허클베리 핀의 모험'
      ]
    },
    'elementary-4-6': {
      label: '초등학교 4~6학년',
      books: [
        '흥부전',
        '심청전',
        '서사무가',
        '옹고집전',
        '홍계월전',
        '적성의전',
        '김원전',
        '장화홍련전',
        '삼국유사',
        '두껍전',
        '박씨전',
        '금방울전',
        '박문수전',
        '강림도령',
        '별주부전',
        '홍길동전',
        '허생전'
      ]
    },
    'middle-school-1': {
      label: '중학교 1학년',
      books: ['어린왕자', '노인과 바다', '레미제라블', '키다리아저씨', '안네의 일기']
    },
    'middle-school-2': {
      label: '중학교 2학년',
      books: ['파우스트']
    },
    'middle-school-3': {
      label: '중학교 3학년',
      books: ['프랑켄슈타인']
    }
  };

  const handleGradeChange = (grade: string) => {
    setGradeLevel(grade);
    setBookTitle(''); // 학년이 바뀌면 선택한 책 초기화
  };

  const handleStart = () => {
    if (bookTitle.trim() && gradeLevel) {
      setGameStarted(true);
    }
  };

  if (gameStarted) {
    return <GameScreen bookTitle={bookTitle} gradeLevel={booksByGrade[gradeLevel]?.label || gradeLevel} onReset={() => setGameStarted(false)} />;
  }

  // Show admin panel
  if (showAdminPanel) {
    return <AdminPanel onClose={() => setShowAdminPanel(false)} />;
  }

  // Show my records panel
  if (showMyRecordsPanel) {
    return <MyRecordsPanel onClose={() => setShowMyRecordsPanel(false)} />;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* 우측 상단 업데이트 버튼 */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={handleForceRefresh}
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 transition-all text-xs text-white/80 hover:text-white backdrop-blur-md shadow-lg"
          title="캐시를 지우고 최신 버전으로 새로고침합니다"
        >
          <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <span>최신 버전</span>
        </button>
      </div>

      <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-5 sm:p-6 md:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <div 
            className="flex justify-center mb-3 sm:mb-4"
            onClick={handleBookIconClick}
            style={{ cursor: 'pointer' }}
            title="2번 빠르게 클릭하면 나의 독서 기록이 열립니다"
          >
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 sm:p-4 rounded-full">
              <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>
          <h1 className="text-white mb-2 text-xl sm:text-2xl">디지털 독서 게임</h1>
          <p className="text-purple-200 text-xs sm:text-sm">AI 기반 창작 소설 전자책 읽기</p>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {/* 1단계: 학년 선택 */}
          <div>
            <label className="block text-purple-200 mb-2 text-xs sm:text-sm">
              <span className="inline-block bg-purple-500 text-white rounded-full w-5 h-5 text-center mr-1 text-xs">1</span>
              학년 선택
            </label>
            <select
              value={gradeLevel}
              onChange={(e) => handleGradeChange(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/20 border border-white/30 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="" className="bg-purple-900">학년을 먼저 선택하세요</option>
              <option value="elementary-2-3" className="bg-purple-900">초등학교 2~3학년</option>
              <option value="elementary-4-6" className="bg-purple-900">초등학교 4~6학년</option>
              <option value="middle-school-1" className="bg-purple-900">중학교 1학년</option>
              <option value="middle-school-2" className="bg-purple-900">중학교 2학년</option>
              <option value="middle-school-3" className="bg-purple-900">중학교 3학년</option>
            </select>
          </div>

          {/* 2단계: 작 선택 (학년 선택 후 활성화) */}
          <div>
            <label className="block text-purple-200 mb-2 text-xs sm:text-sm">
              <span className="inline-block bg-purple-500 text-white rounded-full w-5 h-5 text-center mr-1 text-xs">2</span>
              고전 소설 선택
            </label>
            <select
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              disabled={!gradeLevel}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/20 border border-white/30 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-purple-900">
                {gradeLevel ? '작품을 선택하세요' : '먼저 학년을 선택하세요'}
              </option>
              {gradeLevel && booksByGrade[gradeLevel]?.books.map((book) => (
                <option key={book} value={book} className="bg-purple-900">
                  {book}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleStart}
            disabled={!bookTitle.trim() || !gradeLevel}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>게임 시작하기</span>
          </button>
        </div>

        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-white/5 rounded-lg sm:rounded-xl border border-white/10">
          <p className="text-purple-200 text-xs text-center leading-relaxed">
            💡 학년을 선택하면 적합한 작품이 나타나요.<br/>
            고전 소설을 재해석한 프롤로그 스토리를 체험합니다.<br/>
            원작의 이해를 돕는 배경지식과 기대감이 생기는 에피소드!
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 space-y-3">
          {/* 로고 */}
          <div className="flex justify-center">
            <ImageWithFallback 
              src={logoImage} 
              alt="InblanQ Logo" 
              className="h-6 sm:h-8 w-auto opacity-60 hover:opacity-80 transition-opacity"
              onClick={handleInblankLogoClick}
            />
          </div>
        </div>
      </div>

      {/* 업데이트 배너 */}
      {showUpdateBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 animate-slide-down">
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-2xl">
            <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                {/* 메시지 */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 animate-pulse">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-white text-sm sm:text-base">
                      ✨ <span className="font-semibold">버전UP 패치!</span>
                    </p>
                    <p className="text-white/90 text-xs sm:text-sm">
                      개선 사항과 새로운 작품을 적용하려면 업데이트하세요.
                    </p>
                  </div>
                </div>

                {/* 버튼들 */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleUpdate}
                    className="bg-white text-teal-600 hover:bg-teal-50 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg text-xs sm:text-sm font-semibold"
                  >
                    🚀 지금 업데이트
                  </button>
                  <button
                    onClick={handleUpdateLater}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all text-xs sm:text-sm"
                  >
                    나중에
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
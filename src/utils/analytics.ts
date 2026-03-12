// 참여자 데이터 추적 유틸리티

import type { SessionData } from './googleSheets';

export interface ParticipantSession {
  sessionId: string;
  timestamp: number;
  playerName: string; // 사용자 이름 (성 + 이름)
  bookTitle: string;
  gradeLevel: string;
  startTime: number;
  endTime?: number;
  currentPage: number;
  totalPages: number;
  thoughts: Record<number, string>; // 페이지별 생각 기록
  completed: boolean;
  // 결과 정보
  starRating?: number; // 1-5 별점
  answerCount?: number; // 답변한 질문 수
  totalQuestions?: number; // 전체 질문 수
  participationRate?: number; // 참여율 (0-1)
  thoughtfulnessRatio?: number; // ✅ 생각 깊이 비율 (0-1)
  gameReview?: string; // 게임 후기/감상평
}

export interface ParticipantStats {
  totalSessions: number;
  uniqueBooks: Set<string>;
  popularBooks: Record<string, number>;
  gradeDistribution: Record<string, number>;
  averageCompletionRate: number;
  totalThoughts: number;
  recentSessions: ParticipantSession[];
  rankedSessions: ParticipantSession[]; // 별점과 답변 개수로 정렬된 세션
}

const STORAGE_KEY = 'reading_game_analytics';

// 세션 ID 생성
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// 새 세션 시작
export function startSession(bookTitle: string, lastName: string, firstName: string): string {
  const sessions = getSessions();
  const sessionId = generateSessionId();

  const newSession: ParticipantSession = {
    sessionId,
    timestamp: Date.now(),
    playerName: `${lastName} ${firstName}`,
    bookTitle,
    gradeLevel: '', // Will be updated later
    startTime: Date.now(),
    currentPage: 0,
    totalPages: 0,
    thoughts: {},
    completed: false,
  };

  sessions.push(newSession);
  saveSessions(sessions);

  return sessionId;
}

// 세션 업데이트
export function updateSession(
  sessionId: string,
  updates: Partial<ParticipantSession>
): void {
  const sessions = getSessions();
  const index = sessions.findIndex(s => s.sessionId === sessionId);

  if (index !== -1) {
    sessions[index] = { ...sessions[index], ...updates };
    saveSessions(sessions);
  }
}

// 생각 기록 추가
export function addThought(
  bookTitle: string,
  lastName: string,
  firstName: string,
  pageId: string,
  thought: string
): void {
  const sessions = getSessions();
  // Find the most recent session for this book and player
  const session = sessions
    .filter(s => s.bookTitle === bookTitle)
    .sort((a, b) => b.timestamp - a.timestamp)[0];

  if (session) {
    const pageNumber = parseInt(pageId.replace(/\D/g, '')) || Object.keys(session.thoughts).length;
    session.thoughts[pageNumber] = thought;
    saveSessions(sessions);
  }
}

// 세션 완료 처리
export function completeSession(sessionId: string): void {
  updateSession(sessionId, {
    completed: true,
    endTime: Date.now(),
  });
}

// 모든 세션 가져오기
export function getSessions(): ParticipantSession[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('세션 데이터 로드 실패:', error);
    return [];
  }
}

// 세션 저장
function saveSessions(sessions: ParticipantSession[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('세션 데이터 저장 실패:', error);
  }
}

// 통계 계산
export function calculateStats(): ParticipantStats {
  const sessions = getSessions();

  const popularBooks: Record<string, number> = {};
  const gradeDistribution: Record<string, number> = {};
  const uniqueBooks = new Set<string>();
  let totalCompletionRate = 0;
  let totalThoughts = 0;

  sessions.forEach(session => {
    // 인기 작품
    popularBooks[session.bookTitle] = (popularBooks[session.bookTitle] || 0) + 1;
    uniqueBooks.add(session.bookTitle);

    // 학년 분포
    gradeDistribution[session.gradeLevel] = (gradeDistribution[session.gradeLevel] || 0) + 1;

    // ✅ 완료율: 완료된 세션은 100%, 그 외는 계산
    if (session.completed) {
      totalCompletionRate += 100;
    } else if (session.totalPages > 0) {
      totalCompletionRate += (session.currentPage / session.totalPages) * 100;
    }

    // 생각 기록 수
    totalThoughts += Object.keys(session.thoughts).length;
  });

  const averageCompletionRate = sessions.length > 0
    ? totalCompletionRate / sessions.length
    : 0;

  // 최근 세션 (최근 20개)
  const recentSessions = [...sessions]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 20);

  // 별점과 답변 개수로 정렬된 세션 (필터 조건 완화)
  const rankedSessions = [...sessions]
    .filter(s => {
      // 완료된 세션만 또는 별점이 있는 세션만
      const hasRating = s.starRating !== undefined && s.starRating > 0;
      const isCompleted = s.completed === true;
      return hasRating || isCompleted;
    })
    .sort((a, b) => {
      // 종합 점수 계산 (참여율 60% + 생각 깊이 40%)
      const aComposite = ((a.participationRate || 0) * 0.6) + ((a.thoughtfulnessRatio || 0) * 0.4);
      const bComposite = ((b.participationRate || 0) * 0.6) + ((b.thoughtfulnessRatio || 0) * 0.4);

      // 1순위: 종합 점수 (높은 순)
      if (bComposite !== aComposite) {
        return bComposite - aComposite;
      }
      // 2순위: 답변 개수 (많은 순)
      if ((b.answerCount || 0) !== (a.answerCount || 0)) {
        return (b.answerCount || 0) - (a.answerCount || 0);
      }
      // 3순위: 진행률 (높은 순)
      const aProgress = a.totalPages > 0 ? (a.currentPage / a.totalPages) : 0;
      const bProgress = b.totalPages > 0 ? (b.currentPage / b.totalPages) : 0;
      return bProgress - aProgress;
    });

  return {
    totalSessions: sessions.length,
    uniqueBooks,
    popularBooks,
    gradeDistribution,
    averageCompletionRate,
    totalThoughts,
    recentSessions,
    rankedSessions,
  };
}

// 통계 초기화 (관리자 전용)
export function clearAllData(): void {
  if (confirm('정말 모든 참여자 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
    localStorage.removeItem(STORAGE_KEY);
    alert('모든 데이터가 삭제되었습니다.');
  }
}

// CSV 내보내기
export function exportToCSV(): string {
  const sessions = getSessions();

  const headers = [
    '세션ID',
    '시작시간',
    '사용자이름',
    '작품명',
    '학년',
    '현재페이지',
    '전체페이지',
    '완료여부',
    '생각기록수',
    '플레이시간(분)'
  ];

  const rows = sessions.map(session => {
    const playTime = session.endTime
      ? Math.round((session.endTime - session.startTime) / 60000)
      : Math.round((Date.now() - session.startTime) / 60000);

    return [
      session.sessionId,
      new Date(session.timestamp).toLocaleString('ko-KR'),
      session.playerName || '이름없음',
      session.bookTitle,
      getGradeLabel(session.gradeLevel),
      session.currentPage,
      session.totalPages,
      session.completed ? '완료' : '진행중',
      Object.keys(session.thoughts).length,
      playTime
    ];
  });

  const csv = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');

  return csv;
}

// 학년 레이블 변환
function getGradeLabel(gradeLevel: string): string {
  const labels: Record<string, string> = {
    'elementary-2-3': '초등 2-3학년',
    'elementary-4-6': '초등 4-6학년',
    'middle-school-1': '중학교 1학년',
    'middle-school-2': '중학교 2학년',
    'middle-school-3': '중학교 3학년',
  };
  return labels[gradeLevel] || gradeLevel;
}

// Google Sheets 데이터를 ParticipantSession 형태로 변환
export function convertGoogleSheetsData(sheetsData: SessionData[]): ParticipantSession[] {
  // ✅ 유효한 데이터만 필터링
  const validData = sheetsData.filter(data => {
    // studentName이 비어있지 않은 것만
    return data.studentName && data.studentName.trim() !== '';
  });

  console.log(`🔍 [디버깅] 원본 ${sheetsData.length}개 → 유효 데이터 ${validData.length}개`);

  return validData.map(data => {
    // timestamp를 Date 객체로 변환
    const timestamp = typeof data.timestamp === 'string'
      ? new Date(data.timestamp).getTime()
      : data.timestamp;

    // ✅ 생각기록 수 = 답변 수 (일관성 유지)
    const thoughtsCount = data.answerCount || 0;
    const thoughts: Record<number, string> = {};
    // 답변 개수만큼 더미 thoughts 생성 (통계 계산을 위해)
    for (let i = 0; i < thoughtsCount; i++) {
      thoughts[i] = `답변 ${i + 1}`;
    }

    return {
      sessionId: data.sessionId || `gs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: timestamp || Date.now(),
      playerName: data.studentName || '이름없음',
      bookTitle: data.bookTitle || '알 수 없음',
      gradeLevel: data.gradeLevel || '',
      startTime: timestamp || Date.now(),
      endTime: data.completed ? timestamp + (data.playTime * 60000) : undefined,
      currentPage: data.currentPage || 0,
      totalPages: data.totalPages || 0,
      thoughts, // ✅ answerCount 기반으로 생성
      completed: data.completed || false,
      starRating: data.starRating || 0,
      answerCount: data.answerCount || 0,
      totalQuestions: data.totalQuestions || 0,
      participationRate: data.participationRate ? data.participationRate / 100 : 0, // 백분율을 0-1로 변환
      thoughtfulnessRatio: data.thoughtfulnessRatio ? data.thoughtfulnessRatio / 100 : 0, // ✅ 백분율을 0-1로 변환
      gameReview: data.gameReview || undefined, // ✅ 게임 후기 추가
    };
  });
}

// Google Sheets 데이터로 통계 계산
export function calculateStatsFromGoogleSheets(sheetsData: SessionData[]): ParticipantStats {
  const sessions = convertGoogleSheetsData(sheetsData);

  // 🔍 디버깅: 원본 데이터 샘플 확인
  console.log('🔍 [디버깅] Google Sheets 세션 샘플 (처음 3개):',
    sessions.slice(0, 3).map(s => ({
      name: s.playerName,
      book: s.bookTitle,
      completed: s.completed,
      starRating: s.starRating,
      answerCount: s.answerCount,
      totalQuestions: s.totalQuestions,
      participationRate: s.participationRate
    }))
  );

  const popularBooks: Record<string, number> = {};
  const gradeDistribution: Record<string, number> = {};
  const uniqueBooks = new Set<string>();
  let totalCompletionRate = 0;
  let totalThoughts = 0;

  sessions.forEach(session => {
    // 인기 작품
    popularBooks[session.bookTitle] = (popularBooks[session.bookTitle] || 0) + 1;
    uniqueBooks.add(session.bookTitle);

    // 학년 분포
    gradeDistribution[session.gradeLevel] = (gradeDistribution[session.gradeLevel] || 0) + 1;

    // ✅ 완료율: 완료된 세션은 100%, 그 외는 계산
    if (session.completed) {
      totalCompletionRate += 100;
    } else if (session.totalPages > 0) {
      totalCompletionRate += (session.currentPage / session.totalPages) * 100;
    }

    // 생각 기록 수 (Google Sheets에는 thoughtsCount로 저장됨)
    totalThoughts += Object.keys(session.thoughts).length;
  });

  const averageCompletionRate = sessions.length > 0
    ? totalCompletionRate / sessions.length
    : 0;

  // 최근 세션 (최근 20개)
  const recentSessions = [...sessions]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 20);

  // 별점과 답변 개수로 정렬된 세션 (필터 조건 완화)
  const rankedSessions = [...sessions]
    .filter(s => {
      // 완료된 세션만 또는 별점이 있는 세션만
      const hasRating = s.starRating !== undefined && s.starRating > 0;
      const isCompleted = s.completed === true;
      return hasRating || isCompleted;
    })
    .sort((a, b) => {
      // 종합 점수 계산 (참여율 60% + 생각 깊이 40%)
      const aComposite = ((a.participationRate || 0) * 0.6) + ((a.thoughtfulnessRatio || 0) * 0.4);
      const bComposite = ((b.participationRate || 0) * 0.6) + ((b.thoughtfulnessRatio || 0) * 0.4);

      // 1순위: 종합 점수 (높은 순)
      if (bComposite !== aComposite) {
        return bComposite - aComposite;
      }
      // 2순위: 답변 개수 (많은 순)
      if ((b.answerCount || 0) !== (a.answerCount || 0)) {
        return (b.answerCount || 0) - (a.answerCount || 0);
      }
      // 3순위: 진행률 (높은 순)
      const aProgress = a.totalPages > 0 ? (a.currentPage / a.totalPages) : 0;
      const bProgress = b.totalPages > 0 ? (b.currentPage / b.totalPages) : 0;
      return bProgress - aProgress;
    });

  // 🔍 디버깅: 필터링 결과 확인
  console.log(`🔍 [디버깅] 순위 필터링: 전체 ${sessions.length}개 → 표시 ${rankedSessions.length}개`);
  console.log('🔍 [디버깅] 순위 상위 5명:',
    rankedSessions.slice(0, 5).map(s => {
      const composite = ((s.participationRate || 0) * 0.6) + ((s.thoughtfulnessRatio || 0) * 0.4);
      return {
        name: s.playerName,
        completed: s.completed,
        compositeScore: Math.round(composite * 100),
        participation: Math.round((s.participationRate || 0) * 100),
        depth: Math.round((s.thoughtfulnessRatio || 0) * 100),
        answerCount: s.answerCount
      };
    })
  );

  return {
    totalSessions: sessions.length,
    uniqueBooks,
    popularBooks,
    gradeDistribution,
    averageCompletionRate,
    totalThoughts,
    recentSessions,
    rankedSessions,
  };
}

// ----------------------------------------------------
// 배지 (업적) 시스템
// ----------------------------------------------------

export interface Badge {
  id: string;
  name: string;
  desc: string;
  icon: string;
}

export const BADGE_DEFINITIONS: Badge[] = [
  { id: 'first_book', name: '독서의 시작', desc: '첫 번째 책을 끝까지 읽었습니다.', icon: '📖' },
  { id: 'courage_hero', name: '용기있는 영웅', desc: '용기 성향 +10 달성', icon: '⚔️' },
  { id: 'wisdom_sage', name: '지혜로운 현자', desc: '지혜 성향 +10 달성', icon: '🦉' },
  { id: 'empathy_heart', name: '따뜻한 마음', desc: '공감 성향 +10 달성', icon: '❤️' },
  { id: 'curiosity_finder', name: '호기심 탐험가', desc: '호기심 성향 +10 달성', icon: '🔍' },
  { id: 'justice_judge', name: '정의의 심판자', desc: '정의 성향 +10 달성', icon: '⚖️' },
  { id: 'deep_thinker', name: '깊은 사색가', desc: '선택지 질문에 깊이 있게 대답했습니다.', icon: '💭' },
];

const BADGE_STORAGE_KEY = 'reading_game_badges';

export function getUnlockedBadges(): string[] {
  try {
    const data = localStorage.getItem(BADGE_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function unlockBadge(badgeId: string): boolean {
  const currentBadges = getUnlockedBadges();
  if (!currentBadges.includes(badgeId)) {
    const newBadges = [...currentBadges, badgeId];
    localStorage.setItem(BADGE_STORAGE_KEY, JSON.stringify(newBadges));

    // (선택 사항) 배지 획득 이벤트를 브로드캐스트하여 UI에 띄울 수 있습니다.
    // const event = new CustomEvent('badgeUnlocked', { detail: badgeId });
    // window.dispatchEvent(event);

    return true; // 방금 획득함
  }
  return false; // 이미 보유 중
}
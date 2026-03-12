// Google Sheets 데이터 전송 유틸리티

import { GOOGLE_SHEETS_URL, ENABLE_GOOGLE_SHEETS } from './sheets-config';

export interface SessionData {
  studentName: string;
  bookTitle: string;
  gradeLevel: string;
  currentPage: number;
  totalPages: number;
  completed: boolean;
  thoughtsCount: number;
  playTime: number; // 분 단위
  sessionId: string;
  timestamp?: string | number; // ✅ GET 요청에서 받아오는 타임스탬프
  // 평가 정보
  starRating?: number; // 1-5 별점
  answerCount?: number; // 답변한 질문 수
  totalQuestions?: number; // 전체 질문 수
  participationRate?: number; // 참여율 (0-100 퍼센트)
  thoughtfulnessRatio?: number; // ✅ 생각 깊이 비율 (0-100 퍼센트)
  gameReview?: string; // ✅ 게임 후기/감상평
}

/**
 * Google Sheets에 세션 데이터 전송
 */
export async function sendToGoogleSheets(data: SessionData): Promise<boolean> {
  // Google Sheets 연동이 비활성화되어 있으면 전송하지 않음
  if (!ENABLE_GOOGLE_SHEETS) {
    console.log('Google Sheets 연동이 비활성화되어 있습니다.');
    return false;
  }

  // URL이 설정되지 않았으면 전송하지 않음
  if (!GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
    console.warn('Google Sheets URL이 설정되지 않았습니다. /utils/sheets-config.ts에서 설정하세요.');
    return false;
  }

  // ✅ 상세 디버깅 로그 추가
  console.log('📤 [Google Sheets 전송] 데이터 상세 분석:');
  console.log('  🎓 학생명:', data.studentName);
  console.log('  📚 작품명:', data.bookTitle);
  console.log('  🎯 학년:', data.gradeLevel);
  console.log('  📄 현재/전체 페이지:', `${data.currentPage}/${data.totalPages}`);
  console.log('  ✅ 완료 여부:', data.completed ? '완료' : '진행중');
  console.log('  💭 생각 기록 수:', data.thoughtsCount);
  console.log('  ⏱️ 플레이 시간(분):', data.playTime);
  console.log('  🆔 세션ID:', data.sessionId);
  console.log('  ⭐ 별점:', data.starRating);
  console.log('  📊 답변/전체:', `${data.answerCount}/${data.totalQuestions}`);
  console.log('  📈 참여율(%):', data.participationRate);
  console.log('  🧠 생각깊이(%):', data.thoughtfulnessRatio);
  console.log('  📝 게임후기:', data.gameReview ? `"${data.gameReview}"` : '없음');
  console.log('  🔗 전송 URL:', GOOGLE_SHEETS_URL);
  console.log('  📦 전체 데이터:', JSON.stringify(data, null, 2));

  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors', // CORS 문제 회피
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // no-cors 모드에서는 응답을 읽을 수 없지만, 요청은 전송됩니다
    console.log('✅ Google Sheets에 데이터 전송 완료 (no-cors 모드 - 실제 결과는 Apps Script 로그에서 확인)');
    console.log('💡 Apps Script 실행 로그를 확인하세요: https://script.google.com/');
    return true;
  } catch (error) {
    console.error('❌ Google Sheets 전송 실패:', error);
    return false;
  }
}

/**
 * Google Sheets에서 전체 데이터 읽기 (관리자 대시보드용)
 */
export async function fetchFromGoogleSheets(): Promise<SessionData[]> {
  // Google Sheets 연동이 비활성화되어 있으면 빈 배열 반환
  if (!ENABLE_GOOGLE_SHEETS) {
    console.log('Google Sheets 연동이 비활성화되어 있습니다.');
    return [];
  }

  // URL이 설정되지 않았으면 빈 배열 반환
  if (!GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
    console.warn('Google Sheets URL이 설정되지 않았습니다. /utils/sheets-config.ts에서 설정하세요.');
    return [];
  }

  try {
    console.log('🔄 Google Sheets 데이터 로드 중...', GOOGLE_SHEETS_URL);
    
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'GET',
      redirect: 'follow', // 리다이렉트 자동 따라가기
    });

    console.log('📡 응답 상태:', response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('📦 응답 데이터:', result);
    
    if (result.status === 'success' && Array.isArray(result.data)) {
      console.log(`✅ Google Sheets에서 ${result.count}개 데이터 로드 완료`);
      return result.data;
    } else {
      console.error('❌ Google Sheets 응답 형식 오류:', result);
      return [];
    }
  } catch (error) {
    console.error('❌ Google Sheets 데이터 로드 실패:', error);
    
    // 상세 에러 정보 출력
    if (error instanceof TypeError) {
      console.error('💡 해결방법:');
      console.error('1. Google Apps Script가 제대로 배포되었는지 확인');
      console.error('2. 배포 시 "액세스 권한: 모든 사용자"로 설정했는지 확인');
      console.error('3. doGet() 함수가 코드에 포함되었는지 확인');
      console.error('4. 새 버전으로 재배포 후 URL 업데이트');
    }
    
    throw error; // 에러를 다시 던져서 호출자가 처리할 수 있게 함
  }
}
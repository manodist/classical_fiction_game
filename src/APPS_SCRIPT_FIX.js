// ✅ 개선된 Google Apps Script 코드
// 이 코드를 Apps Script 편집기에 전체 복사-붙여넣기 하세요

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // ✅ 디버깅: 받은 데이터 확인
    Logger.log('📥 받은 이벤트 객체 타입: ' + typeof e);
    Logger.log('📥 e.postData 존재 여부: ' + (e && e.postData ? 'O' : 'X'));
    
    // ✅ e 또는 e.postData가 없는 경우 처리
    if (!e) {
      Logger.log('❌ 이벤트 객체(e)가 없습니다');
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: '이벤트 객체가 없습니다'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (!e.postData) {
      Logger.log('❌ postData가 없습니다');
      Logger.log('📦 이벤트 객체 내용: ' + JSON.stringify(Object.keys(e)));
      
      // parameter로 전달된 경우 확인
      if (e.parameter) {
        Logger.log('💡 parameter로 데이터가 전달되었습니다: ' + JSON.stringify(e.parameter));
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'postData가 없습니다. no-cors 모드 문제일 수 있습니다.',
        debug: {
          hasParameter: !!e.parameter,
          keys: Object.keys(e)
        }
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    Logger.log('✅ postData.contents: ' + e.postData.contents);
    
    const data = JSON.parse(e.postData.contents);
    Logger.log('✅ 파싱된 데이터: ' + JSON.stringify(data));
    
    // 헤더 확인 (첫 행이 비어있으면 헤더 추가)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '타임스탬프',
        '학생 이름',
        '작품명',
        '학년',
        '현재 페이지',
        '전체 페이지',
        '완료 여부',
        '생각 기록 수',
        '플레이 시간(분)',
        '세션ID',
        '별점',
        '답변 개수',
        '전체 질문 수',
        '참여율 (%)',
        '생각 깊이 (%)',
        '게임 후기',
        '종합점수'
      ]);
      Logger.log('📋 헤더 행 생성 완료');
    }
    
    const timestamp = new Date();
    const playTimeMinutes = data.playTime || 0;
    
    // 종합 점수 계산 (참여율 60% + 생각 깊이 40%)
    const participationRate = data.participationRate || 0;
    const thoughtfulnessRatio = data.thoughtfulnessRatio || 0;
    const compositeScore = (participationRate * 0.6) + (thoughtfulnessRatio * 0.4);
    
    Logger.log('📊 계산된 종합점수: ' + compositeScore.toFixed(1) + ' (참여율: ' + participationRate + '%, 깊이: ' + thoughtfulnessRatio + '%)');
    
    // 기존 세션 찾기 (세션ID 기준 - 10번째 컬럼)
    const sessionId = data.sessionId;
    const lastRow = sheet.getLastRow();
    let rowToUpdate = -1;
    
    for (let i = 2; i <= lastRow; i++) {
      if (sheet.getRange(i, 10).getValue() === sessionId) {
        rowToUpdate = i;
        Logger.log('🔍 기존 세션 발견: ' + sessionId + ' (행: ' + i + ')');
        break;
      }
    }
    
    // 데이터 행 구성 (17개 컬럼)
    const rowData = [
      timestamp,
      data.studentName || '',
      data.bookTitle || '',
      data.gradeLevel || '',
      data.currentPage || 0,
      data.totalPages || 0,
      data.completed ? '완료' : '진행중',
      data.thoughtsCount || 0,
      playTimeMinutes,
      data.sessionId || '',
      data.starRating || 0,
      data.answerCount || 0,
      data.totalQuestions || 0,
      participationRate,
      thoughtfulnessRatio,
      data.gameReview || '',
      compositeScore.toFixed(1)
    ];
    
    if (rowToUpdate > 0) {
      // 기존 행 업데이트 (타임스탬프는 유지)
      const existingTimestamp = sheet.getRange(rowToUpdate, 1).getValue();
      rowData[0] = existingTimestamp;
      sheet.getRange(rowToUpdate, 1, 1, rowData.length).setValues([rowData]);
      Logger.log('✅ 데이터 업데이트 완료: ' + data.studentName + ' (종합점수: ' + compositeScore.toFixed(1) + ')');
    } else {
      // 새 행 추가
      sheet.appendRow(rowData);
      Logger.log('✅ 신규 데이터 저장 완료: ' + data.studentName + ' (종합점수: ' + compositeScore.toFixed(1) + ')');
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: '데이터가 저장되었습니다.',
      compositeScore: compositeScore.toFixed(1),
      studentName: data.studentName
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('❌ 에러 발생: ' + error.toString());
    Logger.log('❌ 에러 스택: ' + error.stack);
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString(),
      stack: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    Logger.log('📖 데이터 읽기 요청 (총 ' + (lastRow - 1) + '개 행)');
    
    // 데이터가 없으면 빈 배열 반환
    if (lastRow <= 1) {
      Logger.log('⚠️ 데이터가 없습니다 (헤더만 존재)');
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        data: [],
        count: 0
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 모든 데이터 읽기 (17개 컬럼)
    const range = sheet.getRange(2, 1, lastRow - 1, 17);
    const values = range.getValues();
    
    // 데이터를 JSON 형식으로 변환
    const data = values.map(row => ({
      timestamp: row[0],
      studentName: row[1],
      bookTitle: row[2],
      gradeLevel: row[3],
      currentPage: row[4],
      totalPages: row[5],
      completed: row[6] === '완료',
      thoughtsCount: row[7],
      playTime: row[8],
      sessionId: row[9],
      starRating: row[10],
      answerCount: row[11],
      totalQuestions: row[12],
      participationRate: row[13],
      thoughtfulnessRatio: row[14],
      gameReview: row[15],
      compositeScore: row[16]
    }));
    
    Logger.log('✅ 데이터 읽기 완료: ' + data.length + '개');
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      data: data,
      count: data.length
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('❌ GET 에러: ' + error.toString());
    Logger.log('❌ 에러 스택: ' + error.stack);
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString(),
      stack: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ✅ 테스트 함수 (수동 실행용)
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        sessionId: 'test_' + Date.now(),
        studentName: '테스트학생',
        bookTitle: '파우스트',
        gradeLevel: '중학교 2학년',
        currentPage: 32,
        totalPages: 32,
        completed: true,
        thoughtsCount: 10,
        playTime: 15,
        starRating: 3,
        answerCount: 10,
        totalQuestions: 13,
        participationRate: 77,
        thoughtfulnessRatio: 30,
        gameReview: '테스트 후기입니다'
      })
    }
  };
  
  Logger.log('🧪 테스트 시작...');
  const result = doPost(testData);
  Logger.log('🧪 테스트 결과: ' + result.getContent());
}

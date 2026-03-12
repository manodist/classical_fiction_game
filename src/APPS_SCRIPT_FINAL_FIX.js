// ✅ no-cors 모드 대응 Google Apps Script 코드
// 이 코드를 Apps Script 편집기에 전체 복사-붙여넣기 하세요

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    Logger.log('📥 [doPost 호출됨] ' + new Date().toLocaleString());
    Logger.log('📦 이벤트 객체 타입: ' + typeof e);
    
    // e가 없는 경우
    if (!e) {
      Logger.log('❌ 이벤트 객체(e)가 없습니다');
      return createResponse('error', '이벤트 객체가 없습니다');
    }
    
    Logger.log('📦 e.postData 존재: ' + (e.postData ? 'O' : 'X'));
    Logger.log('📦 e.parameter 존재: ' + (e.parameter ? 'O' : 'X'));
    Logger.log('📦 e.parameters 존재: ' + (e.parameters ? 'O' : 'X'));
    
    let data = null;
    
    // 1. postData가 있는 경우 (정상적인 JSON POST)
    if (e.postData && e.postData.contents) {
      Logger.log('✅ postData.contents로 데이터 수신');
      Logger.log('📄 내용 길이: ' + e.postData.contents.length + ' 바이트');
      data = JSON.parse(e.postData.contents);
    }
    // 2. parameter로 전달된 경우 (no-cors 대응)
    else if (e.parameter && Object.keys(e.parameter).length > 0) {
      Logger.log('✅ parameter로 데이터 수신');
      data = e.parameter;
      // JSON 문자열로 전달된 경우 파싱
      if (data.json) {
        data = JSON.parse(data.json);
      }
    }
    // 3. parameters로 전달된 경우
    else if (e.parameters && Object.keys(e.parameters).length > 0) {
      Logger.log('✅ parameters로 데이터 수신');
      data = {};
      for (let key in e.parameters) {
        data[key] = e.parameters[key][0];
      }
    }
    else {
      Logger.log('❌ 데이터를 찾을 수 없습니다');
      Logger.log('📦 이벤트 객체 키: ' + Object.keys(e).join(', '));
      return createResponse('error', 'postData, parameter, parameters 모두 없습니다');
    }
    
    Logger.log('✅ 파싱된 데이터: ' + JSON.stringify(data).substring(0, 200));
    
    // 필수 필드 확인
    if (!data.sessionId) {
      Logger.log('❌ sessionId가 없습니다');
      return createResponse('error', 'sessionId는 필수입니다');
    }
    
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
        '게임 후기'
      ]);
      Logger.log('📋 헤더 행 생성 완료');
    }
    
    const timestamp = new Date();
    const playTimeMinutes = parseInt(data.playTime) || 0;
    
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
    
    // 데이터 행 구성 (16개 컬럼)
    const rowData = [
      timestamp,
      data.studentName || '',
      data.bookTitle || '',
      data.gradeLevel || '',
      parseInt(data.currentPage) || 0,
      parseInt(data.totalPages) || 0,
      (data.completed === true || data.completed === 'true') ? '완료' : '진행중',
      parseInt(data.thoughtsCount) || 0,
      playTimeMinutes,
      data.sessionId || '',
      parseInt(data.starRating) || 0,
      parseInt(data.answerCount) || 0,
      parseInt(data.totalQuestions) || 0,
      parseInt(data.participationRate) || 0,
      parseInt(data.thoughtfulnessRatio) || 0,
      data.gameReview || ''
    ];
    
    if (rowToUpdate > 0) {
      // 기존 행 업데이트 (타임스탬프는 유지)
      const existingTimestamp = sheet.getRange(rowToUpdate, 1).getValue();
      rowData[0] = existingTimestamp;
      sheet.getRange(rowToUpdate, 1, 1, rowData.length).setValues([rowData]);
      Logger.log('✅ 데이터 업데이트 완료: ' + data.studentName + ' (세션: ' + sessionId + ')');
    } else {
      // 새 행 추가
      sheet.appendRow(rowData);
      Logger.log('✅ 신규 데이터 저장 완료: ' + data.studentName + ' (세션: ' + sessionId + ')');
    }
    
    return createResponse('success', '데이터가 저장되었습니다.', {
      studentName: data.studentName,
      sessionId: sessionId
    });
    
  } catch (error) {
    Logger.log('❌ 에러 발생: ' + error.toString());
    Logger.log('❌ 에러 스택: ' + error.stack);
    return createResponse('error', error.toString());
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
      return createResponse('success', '', { data: [], count: 0 });
    }
    
    // 모든 데이터 읽기 (16개 컬럼)
    const range = sheet.getRange(2, 1, lastRow - 1, 16);
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
      gameReview: row[15]
    }));
    
    Logger.log('✅ 데이터 읽기 완료: ' + data.length + '개');
    
    return createResponse('success', '', { data: data, count: data.length });
    
  } catch (error) {
    Logger.log('❌ GET 에러: ' + error.toString());
    return createResponse('error', error.toString());
  }
}

// 응답 생성 헬퍼 함수
function createResponse(status, message, extraData) {
  const response = {
    status: status,
    message: message
  };
  
  if (extraData) {
    for (let key in extraData) {
      response[key] = extraData[key];
    }
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// ✅ 테스트 함수
function testDirectInsert() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  Logger.log('📍 현재 시트 이름: ' + sheet.getName());
  Logger.log('📍 현재 데이터 행 수: ' + sheet.getLastRow());
  
  // 테스트 데이터 추가
  sheet.appendRow([
    new Date(),
    '직접테스트',
    '톰 소여의 모험',
    '초등학교 2~3학년',
    36,
    36,
    '완료',
    5,
    10,
    'test_direct_' + Date.now(),
    2,
    5,
    11,
    45,
    30,
    '직접 삽입 테스트'
  ]);
  
  Logger.log('✅ 테스트 데이터 추가 완료! Google Sheets를 새로고침하세요.');
}

function getSheetUrl() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('📍 연결된 시트 URL: ' + sheet.getUrl());
  Logger.log('📍 시트 이름: ' + sheet.getName());
}

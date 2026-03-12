function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
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
        '종합점수'  // ✅ 17번째 컬럼에 추가
      ]);
    }
    
    const timestamp = new Date();
    const playTimeMinutes = data.playTime || 0;
    
    // 종합 점수 계산 (참여율 60% + 생각 깊이 40%)
    const participationRate = data.participationRate || 0;
    const thoughtfulnessRatio = data.thoughtfulnessRatio || 0;
    const compositeScore = (participationRate * 0.6) + (thoughtfulnessRatio * 0.4);
    
    // 기존 세션 찾기 (세션ID 기준 - 10번째 컬럼)
    const sessionId = data.sessionId;
    const lastRow = sheet.getLastRow();
    let rowToUpdate = -1;
    
    for (let i = 2; i <= lastRow; i++) {
      if (sheet.getRange(i, 10).getValue() === sessionId) {
        rowToUpdate = i;
        break;
      }
    }
    
    // 데이터 행 구성 (기존 순서 유지 + 종합점수 추가)
    const rowData = [
      timestamp,                              // 1. 타임스탬프
      data.studentName || '',                 // 2. 학생 이름
      data.bookTitle || '',                   // 3. 작품명
      data.gradeLevel || '',                  // 4. 학년
      data.currentPage || 0,                  // 5. 현재 페이지
      data.totalPages || 0,                   // 6. 전체 페이지
      data.completed ? '완료' : '진행중',      // 7. 완료 여부
      data.thoughtsCount || 0,                // 8. 생각 기록 수
      playTimeMinutes,                        // 9. 플레이 시간(분)
      data.sessionId || '',                   // 10. 세션ID
      data.starRating || 0,                   // 11. 별점
      data.answerCount || 0,                  // 12. 답변 개수
      data.totalQuestions || 0,               // 13. 전체 질문 수
      participationRate,                      // 14. 참여율 (%)
      thoughtfulnessRatio,                    // 15. 생각 깊이 (%)
      data.gameReview || '',                  // 16. 게임 후기
      compositeScore.toFixed(1)               // 17. 종합점수 ✅ NEW!
    ];
    
    if (rowToUpdate > 0) {
      // 기존 행 업데이트 (타임스탬프는 유지)
      const existingTimestamp = sheet.getRange(rowToUpdate, 1).getValue();
      rowData[0] = existingTimestamp; // 원래 타임스탬프 유지
      sheet.getRange(rowToUpdate, 1, 1, rowData.length).setValues([rowData]);
      Logger.log('✅ 데이터 업데이트: ' + data.studentName + ' (종합점수: ' + compositeScore.toFixed(1) + ')');
    } else {
      // 새 행 추가
      sheet.appendRow(rowData);
      Logger.log('✅ 신규 데이터 저장: ' + data.studentName + ' (종합점수: ' + compositeScore.toFixed(1) + ')');
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: '데이터가 저장되었습니다.',
      compositeScore: compositeScore.toFixed(1)
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('❌ 에러 발생: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    // 데이터가 없으면 빈 배열 반환
    if (lastRow <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        data: [],
        count: 0
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 모든 데이터 읽기 (헤더 제외) - 17개 컬럼으로 증가
    const range = sheet.getRange(2, 1, lastRow - 1, 17); // ✅ 16 → 17로 변경
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
      compositeScore: row[16]  // ✅ 17번째 컬럼 (인덱스 16)
    }));
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      data: data,
      count: data.length
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('❌ GET 에러: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

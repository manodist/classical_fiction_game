# 📊 Google Sheets 연동 - Apps Script 코드

## 🔧 업데이트된 코드 (게임 후기 포함)

아래 코드를 Google Apps Script 편집기에 붙여넣으세요.

```javascript
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
        '게임 후기'  // ✅ 16번째 컬럼에 추가
      ]);
    }
    
    const timestamp = new Date();
    const playTimeMinutes = data.playTime || 0;
    
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
    
    // 데이터 행 구성 (기존 순서 유지 + 게임 후기 추가)
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
      data.participationRate || 0,            // 14. 참여율 (%)
      data.thoughtfulnessRatio || 0,          // 15. 생각 깊이 (%)
      data.gameReview || ''                   // 16. 게임 후기 ✅ NEW!
    ];
    
    if (rowToUpdate > 0) {
      // 기존 행 업데이트 (타임스탬프는 유지)
      const existingTimestamp = sheet.getRange(rowToUpdate, 1).getValue();
      rowData[0] = existingTimestamp; // 원래 타임스탬프 유지
      sheet.getRange(rowToUpdate, 1, 1, rowData.length).setValues([rowData]);
    } else {
      // 새 행 추가
      sheet.appendRow(rowData);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: '데이터가 저장되었습니다.'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
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
    
    // 모든 데이터 읽기 (헤더 제외)
    const range = sheet.getRange(2, 1, lastRow - 1, 16); // 16개 컬럼
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
      gameReview: row[15]  // ✅ 16번째 컬럼 (인덱스 15)
    }));
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      data: data,
      count: data.length
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## 🚀 배포 단계

### 1️⃣ Google Sheets 열기
- 기존 시트: https://docs.google.com/spreadsheets/d/1yuAYBM0DCs2OcqGs89EwKPU61WGp_O177IELKuIQtVc/edit

### 2️⃣ Apps Script 편집기 열기
- **확장 프로그램** → **Apps Script** 클릭

### 3️⃣ 코드 업데이트
- 위의 전체 코드를 복사하여 **기존 코드에 덮어쓰기**
- **저장** (💾 아이콘 또는 Ctrl+S)

### 4️⃣ 새 버전으로 배포
- **배포** → **배포 관리**
- 기존 배포의 **✏️ 편집** 클릭
- **버전**: "새 버전" 선택
- **배포** 클릭

### 5️⃣ 완료!
- 이제 학생들이 게임 후기를 제출하면 Google Sheets P 컬럼에 자동으로 저장됩니다!

---

## 📊 Google Sheets 컬럼 구조 (기존 구조 유지)

| 컬럼 | 이름 | 예시 |
|------|------|------|
| **A** | 타임스탬프 | 2024-12-06 15:30:00 |
| **B** | 학생 이름 | 홍길동 |
| **C** | 작품명 | 파우스트 |
| **D** | 학년 | middle-school-2 |
| **E** | 현재 페이지 | 30 |
| **F** | 전체 페이지 | 30 |
| **G** | 완료 여부 | 완료 |
| **H** | 생각 기록 수 | 16 |
| **I** | 플레이 시간(분) | 25 |
| **J** | 세션ID | session_1733467800123 |
| **K** | 별점 | 5 |
| **L** | 답변 개수 | 16 |
| **M** | 전체 질문 수 | 16 |
| **N** | 참여율 (%) | 100 |
| **O** | 생각 깊이 (%) | 80 |
| **P** | **게임 후기** ⬅️ **NEW!** | 게임이 정말 재미있었어요... |

---

## 🔄 데이터 업데이트 흐름

```
1단계: 게임 완료
   ↓
   Google Sheets에 1~15번 컬럼 저장
   (P 컬럼 = 빈칸)

2단계: 학생이 후기 작성
   ↓
   "후기 제출하기" 버튼 클릭
   ↓
   같은 세션ID로 1~16번 컬럼 업데이트
   (P 컬럼 = 후기 내용)
```

---

## ✅ 테스트 방법

1. 게임을 끝까지 플레이
2. 엔딩 페이지에서 **게임 후기** 작성
3. **"후기 제출하기"** 버튼 클릭
4. Google Sheets에서 해당 세션의 **P 컬럼** 확인!

---

## 💡 데이터 활용 예시

### **후기가 있는 세션만 필터링**
```
=FILTER(A:P, P:P<>"")
```

### **후기 글자 수 계산**
```
=LEN(P2)
```

### **참여율 90% 이상 & 후기 작성한 세션**
```
=FILTER(A:P, (N:N>=90)*(P:P<>""))
```

---

이제 학생들의 소중한 후기가 Google Sheets P 컬럼에 자동으로 수집됩니다! 🎉

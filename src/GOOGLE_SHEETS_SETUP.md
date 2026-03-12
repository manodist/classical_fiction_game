# Google Sheets 데이터 수집 설정 가이드

## 1단계: 스프레드시트 준비

스프레드시트 URL: https://docs.google.com/spreadsheets/d/1yuAYBM0DCs2OcqGs89EwKPU61WGp_O177IELKuIQtVc/edit

### 시트 구조 (Sheet1)

다음 컬럼을 첫 번째 행에 추가해주세요:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 타임스탬프 | 학생이름 | 작품명 | 학년 | 현재페이지 | 전체페이지 | 완료여부 | 생각기록수 | 플레이시간(분) | 세션ID | 별점 | 답변수 | 전체질문수 | 참여율(%) | 생각깊이(%) |

## 2단계: Google Apps Script 추가

1. 스프레드시트 열기
2. 상단 메뉴: **확장 프로그램** → **Apps Script** 클릭
3. 새 창이 열리면 기본 코드 삭제
4. 아래 코드를 복사하여 붙여넣기:

```javascript
function doPost(e) {
  try {
    // 스프레드시트 접근 - 첫 번째 시트 가져오기
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    
    // POST 데이터 파싱
    var data = JSON.parse(e.postData.contents);
    
    // 현재 시간
    var timestamp = new Date();
    
    // 플레이 시간 계산 (분)
    var playTimeMinutes = data.playTime || 0;
    
    // 데이터 행 추가
    sheet.appendRow([
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
      data.participationRate || 0,
      data.thoughtfulnessRatio || 0  // ✅ 생각 깊이 비율
    ]);
    
    // 성공 응답
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: '데이터가 저장되었습니다.'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // 에러 응답
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 - 전체 데이터 읽기 (관리자 대시보드용)
function doGet(e) {
  try {
    // 스프레드시트 접근
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    
    // 모든 데이터 가져오기 (헤더 제외)
    var range = sheet.getDataRange();
    var values = range.getValues();
    
    // 헤더 제거
    var headers = values[0];
    var data = values.slice(1);
    
    // ✅ 빈 행 필터링: studentName이 비어있는 행 제외
    var validData = data.filter(function(row) {
      // studentName (index 1)이 비어있지 않은 행만 포함
      return row[1] && row[1].toString().trim() !== '';
    });
    
    // JSON 형태로 변환
    var jsonData = validData.map(function(row) {
      return {
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
        starRating: row[10] || 0,
        answerCount: row[11] || 0,
        totalQuestions: row[12] || 0,
        participationRate: row[13] || 0,
        thoughtfulnessRatio: row[14] || 0  // ✅ 생각 깊이 비율
      };
    });
    
    // 성공 응답
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      data: jsonData,
      count: jsonData.length
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // 에러 응답
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3단계: 웹 앱으로 배포

1. Apps Script 편집기에서 **배포** → **새 배포** 클릭
2. **유형 선택** → **웹 앱** 선택
3. 설정:
   - **설명**: 독서게임 데이터 수집
   - **다음 계정으로 실행**: 나
   - **액세스 권한**: **모든 사용자** (중요!)
4. **배포** 버튼 클릭
5. 권한 요청 승인
6. **웹 앱 URL** 복사 (예: https://script.google.com/macros/s/ABC123.../exec)

## 4단계: 웹 앱 URL 저장

복사한 웹 앱 URL을 `/utils/sheets-config.ts` 파일에 붙여넣으세요.

```typescript
export const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

## 5단계: 테스트

Apps Script 편집기에서 테스트 함수를 추가하세요:

```javascript
// 테스트 함수 (POST 테스트)
function testDoPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        studentName: '홍길동',
        bookTitle: '파우스트',
        gradeLevel: 'middle-school-2',
        currentPage: 30,
        totalPages: 30,
        completed: true,
        thoughtsCount: 5,
        playTime: 25,
        sessionId: 'test_session_123',
        starRating: 5,
        answerCount: 5,
        totalQuestions: 5,
        participationRate: 100,
        thoughtDepth: 85
      })
    }
  };
  
  var result = doPost(testData);
  Logger.log(result.getContent());
}

// 테스트 함수 (GET 테스트)
function testDoGet() {
  var result = doGet({});
  Logger.log(result.getContent());
}
```

**테스트 방법:**
1. 위 코드를 Apps Script 편집기에 추가
2. 함수 선택: **testDoPost**
3. **실행** 버튼 클릭
4. 스프레드시트 확인 → 테스트 데이터가 추가되었는지 확인
5. 함수 선택: **testDoGet**
6. **실행** 버튼 클릭
7. 로그 확인 (Ctrl+Enter) → 데이터가 JSON 형태로 출력되는지 확인

## 6단계: 완료!

이제 게임을 플레이하면 자동으로 데이터가 Google Sheets에 저장됩니다.

### 관리자 대시보드에서 전체 데이터 보기

관리자 대시보드(로고 클릭)에서 **데이터 소스**를 선택할 수 있습니다:

- **📱 로컬**: 현재 브라우저의 데이터만 표시 (빠름)
- **🌐 전체**: Google Sheets의 모든 사용자 데이터 표시 (통합 통계)

**전체 모드 사용법:**
1. 관리자 대시보드 열기
2. 우측 상단 "데이터: 로컬 | 전체" 에서 **전체** 클릭
3. Google Sheets에서 데이터 로드 (몇 초 소요)
4. 모든 학생의 통합 통계 확인!

---

## 업데이트 방법

코드를 수정한 경우:
1. Apps Script 편집기에서 **배포** → **배포 관리**
2. 현재 배포 옆 편집 아이콘(연필) 클릭
3. **버전**: 새 버전
4. **배포** 클릭

---

## 데이터 수집 시점

- **게임 완료 시**: 전체 세션 데이터가 한 번에 전송됩니다
- **엔딩 화면 도달 시**: 최종 통계와 함께 자동 저장

---

## 문제 해결

### ❌ "Failed to fetch" 에러

**원인:** Google Apps Script 배포가 제대로 되지 않았거나 접근 권한이 잘못 설정됨

**해결방법:**
1. Apps Script 편집기에서 `doGet()` 함수가 있는지 확인
2. **배포** → **배포 관리**로 이동
3. 현재 배포의 "액세스 권한"이 **"모든 사용자"**인지 확인
4. 아니라면:
   - 연필 아이콘(편집) 클릭
   - 새 버전 선택
   - "액세스 권한: 모든 사용자" 선택
   - 배포 클릭
5. **새 웹 앱 URL이 생성됨** → `/utils/sheets-config.ts`에 업데이트

### ⚠️ "Google Sheets에 데이터가 없습니다"

**원인:** 아직 게임을 완료한 사람이 없음

**해결방법:**
1. 게임을 한 번 완료해보세요
2. 엔딩까지 진행하면 자동으로 데이터가 저장됩니다
3. 스프레드시트에서 데이터가 추가되었는지 확인
4. 관리자 대시보드 → 전체 클릭 → 데이터 확인

### 🔢 실제보다 많은 데이터가 표시됨 (예: 1개인데 61개로 표시)

**원인:** Google Sheets에 빈 행이 포함되어 있음

**해법:**
1. Apps Script 코드를 최신 버전으로 업데이트
   - 위의 코드에서 `doGet()` 함수에 빈 행 필터링 로직 추가됨
   - `validData` 필터: studentName이 비어있는 행 제외
2. **배포** → **배포 관리** → **새 버전 배포**
3. 관리자 대시보드 → 전체 클릭 → 정확한 개수 확인

**확인:**
- 콘솔에서 `🔍 [디버깅] 원본 61개 → 유효 데이터 1개` 메시지 확인
- 이제 정확한 데이터만 표시됩니다! ✅

---

## 주의사항

⚠️ **중요**: 웹 앱 배포 시 반드시 "액세스 권한: 모든 사용자"로 설정해야 합니다.
그렇지 않으면 프론트엔드에서 데이터를 전송할 수 없습니다.

⚠️ **개인정보**: 학생 이름이 수집되므로 스프레드시트 공유 설정에 주의하세요.

---

## 📊 데이터 일관성 정책

관리자 대시보드에서 정확한 통계를 위해 다음 규칙이 적용됩니다:

### ✅ 진행도 (완료율)
- **완료된 세션**: 무조건 100% 표시
- **진행 중 세션**: (현재페이지 / 전체페이지) × 100%

### ✅ 생각 기록 vs 답변 수
- **Google Sheets 기준**: `answerCount` (답변한 질문 수) 사용
- **로컬 기준**: `thoughts` 객체의 키 개수 사용
- **일관성**: 전체 데이터 모드에서도 `answerCount` 기반으로 통일

### ✅ 순위 탭
- **정렬 기준**:
  1. 별점 (높은 순)
  2. 생각 깊이 비율 (높은 순) ✨ NEW!
  3. 답변 개수 (많은 순)
  4. 진행률 (높은 순)
- **표시 조건**: 완료된 세션 또는 별점이 있는 세션만

💡 **생각 깊이 비율**이란?
- 답변의 평균 글자 수를 기반으로 계산
- 50자 이상: 80% (깊이 있는 사고)
- 20자 이상: 50% (중간 수준)
- 그 외: 20% (간단한 응답)
- 같은 별점이라도 더 깊이 생각한 학생이 상위 순위!

---

## 🧪 테스트 데이터로 확인하기

**빠른 확인 방법:**
1. Apps Script 편집기에서 `testDoPost()` 함수 실행
2. 스프레드시트에 테스트 데이터 추가됨
3. 관리자 대시보드 → 전체 클릭
4. 테스트 데이터가 표시되면 성공! ✅

### 🔍 콘솔 로그 확인

브라우저 개발자 도구(F12) → Console 탭에서:
- `🔄 Google Sheets 데이터 로드 중...` - 요청 시작
- `📡 응답 상태: 200 OK` - 성공
- `📦 응답 데이터:` - 실제 데이터
- `🔍 [디버깅] 원본 N개 → 유효 데이터 M개` - 필터링 결과
- `✅ Google Sheets에서 M개 데이터 로드 완료` - 완료

**정상 작동 예시:**
```
🔍 [디버깅] 원본 61개 → 유효 데이터 1개
✅ Google Sheets에서 1개 데이터 로드 완료
```

에러가 보이면 에러 메시지를 확인하세요!
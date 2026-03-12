# 🌐 외부 URL로 음악 사용하기

## 개요

파일을 다운로드하지 않고 외부 URL을 직접 사용하여 음악을 재생할 수 있습니다.

---

## ✅ CORS 허용 무료 음악 사이트

### 1. **Pixabay Music** ⭐⭐⭐ (최고 추천!)

**장점:**
- ✅ CORS 허용 (대부분의 파일)
- ✅ CC0 라이선스 (완전 무료)
- ✅ 직접 MP3 링크 제공
- ✅ 고품질 음악
- ✅ 다양한 장르

**URL 얻는 방법:**
```
1. https://pixabay.com/music/ 방문
2. "dark fantasy orchestral" 검색
3. 음악 선택 (예: "Dark Sanctuary" by Lexin Music)
4. 페이지에서 우클릭 → 개발자 도구 (F12)
5. Network 탭 선택
6. "미리 듣기" 버튼 클릭
7. Network에서 .mp3 파일 찾기
8. URL 복사 (예: https://cdn.pixabay.com/audio/2023/12/...)
```

**예시 URL 구조:**
```
https://cdn.pixabay.com/audio/2023/12/29/audio_abc123def456.mp3
```

**사용 방법:**
```typescript
<BackgroundMusic
  musicUrl="https://cdn.pixabay.com/audio/2023/12/29/audio_abc123def456.mp3"
  bookTitle="파우스트"
/>
```

---

### 2. **Free Music Archive (FMA)** ⭐⭐

**장점:**
- ✅ 다양한 라이선스 (CC BY, CC0)
- ✅ 직접 링크 제공
- ✅ 대부분 CORS 허용

**URL 얻는 방법:**
```
1. https://freemusicarchive.org/ 방문
2. Genre → Soundtrack, Orchestral 선택
3. 음악 선택
4. "Download" 버튼 우클릭 → 링크 주소 복사
```

**예시 URL:**
```
https://files.freemusicarchive.org/storage-freemusicarchive-org/music/...
```

---

### 3. **Internet Archive** ⭐⭐⭐

**장점:**
- ✅ 완전한 CORS 지원
- ✅ 안정적인 CDN
- ✅ 영구 저장
- ✅ 무료

**URL 얻는 방법:**
```
1. https://archive.org/details/audio 방문
2. "orchestral fantasy" 검색
3. CC0 또는 Public Domain 필터 선택
4. 음악 선택 → 우클릭 → "Download Options" → MP3 링크 복사
```

**예시 URL:**
```
https://ia801402.us.archive.org/15/items/[item-id]/[file-name].mp3
```

---

### 4. **CDN.js / jsDelivr** (GitHub 기반) ⭐

**장점:**
- ✅ 완벽한 CORS 지원
- ✅ 빠른 CDN
- ✅ 무료

**방법:**
```
1. GitHub 리포지토리 생성
2. MP3 파일 업로드
3. jsDelivr URL 생성:
   https://cdn.jsdelivr.net/gh/username/repo@main/faust-music.mp3
```

**단계별:**
```
1. GitHub에 public 리포지토리 생성 (예: my-music-files)
2. faust-dark-fantasy.mp3 업로드
3. URL 사용:
   https://cdn.jsdelivr.net/gh/your-username/my-music-files@main/faust-dark-fantasy.mp3
```

---

### 5. **Wikimedia Commons** ⭐⭐

**장점:**
- ✅ CORS 허용
- ✅ 무료 라이선스
- ✅ 안정적

**URL 얻는 방법:**
```
1. https://commons.wikimedia.org/ 방문
2. "orchestral music" 검색
3. 파일 선택 → "Original file" 링크 복사
```

**예시 URL:**
```
https://upload.wikimedia.org/wikipedia/commons/[hash]/[filename].mp3
```

---

## 🎵 추천 무료 음악 URL (즉시 사용 가능!)

### 다크 판타지 / 오케스트라

**참고:** 아래는 예시 URL입니다. 실제 사용 가능한 URL은 위 사이트에서 직접 찾아야 합니다.

```typescript
// Pixabay Music CDN (예시 구조)
const MUSIC_URLS = {
  '파우스트': 'https://cdn.pixabay.com/audio/2022/04/29/audio_8eb6b5c833.mp3.',
  '노인과 바다': 'https://cdn.pixabay.com/audio/2024/...',
};
```

---

## 🛠️ 코드 사용 방법

### 방법 1: 직접 URL 입력

```typescript
// GameScreen.tsx

{bookTitle === '파우스트' && (
  <BackgroundMusic
    musicUrl="https://cdn.pixabay.com/audio/2022/04/29/audio_8eb6b5c833.mp3"
    bookTitle={bookTitle}
  />
)}
```

### 방법 2: URL 맵핑

```typescript
// GameScreen.tsx 상단에 추가

const MUSIC_URLS: Record<string, string> = {
  '파우스트': 'https://cdn.pixabay.com/audio/2022/04/29/audio_8eb6b5c833.mp3',
  '노인과 바다': 'https://cdn.pixabay.com/audio/2024/ocean-ambient.mp3',
  '레미제라블': 'https://cdn.pixabay.com/audio/2024/classic-orchestra.mp3',
};

// 컴포넌트 렌더링 부분
{MUSIC_URLS[bookTitle] && (
  <BackgroundMusic
    musicUrl={MUSIC_URLS[bookTitle]}
    bookTitle={bookTitle}
  />
)}
```

### 방법 3: 환경 변수 사용

```typescript
// .env.local 파일
NEXT_PUBLIC_FAUST_MUSIC_URL=https://cdn.pixabay.com/audio/...
NEXT_PUBLIC_OLDMAN_MUSIC_URL=https://cdn.pixabay.com/audio/...

// GameScreen.tsx
const musicUrl = process.env.NEXT_PUBLIC_FAUST_MUSIC_URL;

{bookTitle === '파우스트' && musicUrl && (
  <BackgroundMusic
    musicUrl={musicUrl}
    bookTitle={bookTitle}
  />
)}
```

---

## 🔍 Pixabay에서 직접 URL 찾기 (상세 가이드)

### 단계별 스크린샷 가이드

**1단계: 음악 검색**
```
https://pixabay.com/music/search/dark%20fantasy%20orchestral/
```

**2단계: 음악 선택**
- 마음에 드는 음악 클릭
- 페이지 URL 예시: `https://pixabay.com/music/beats-dark-sanctuary-12345/`

**3단계: 개발자 도구 열기**
```
- Windows/Linux: F12 또는 Ctrl+Shift+I
- Mac: Cmd+Option+I
```

**4단계: Network 탭으로 이동**
- 개발자 도구 상단 "Network" 탭 클릭
- 필터에 "mp3" 입력 (선택사항)

**5단계: 미리 듣기 재생**
- Pixabay 페이지에서 재생 버튼 클릭
- Network 탭에 mp3 파일 요청이 나타남

**6단계: URL 복사**
- mp3 파일 우클릭 → "Copy" → "Copy link address"
- 복사된 URL 예시:
  ```
  https://cdn.pixabay.com/audio/2023/12/29/audio_abc123def456789.mp3?filename=dark-sanctuary-12345.mp3
  ```

**7단계: URL 정리 (중요!)**
- `?filename=...` 부분 제거
- 최종 URL:
  ```
  https://cdn.pixabay.com/audio/2023/12/29/audio_abc123def456789.mp3
  ```

---

## ⚠️ CORS 문제 해결

### 문제: "CORS policy blocked" 오류

**원인:**
- 외부 서버가 CORS 헤더를 제공하지 않음
- 브라우저가 크로스 도메인 요청 차단

**해결 방법:**

#### 방법 1: CORS Proxy 사용 (개발 환경)

```typescript
// CORS Proxy를 통한 우회 (개발/테스트용만!)
const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(originalUrl)}`;

<BackgroundMusic
  musicUrl={proxiedUrl}
  bookTitle={bookTitle}
/>
```

**CORS Proxy 서비스:**
- https://corsproxy.io/
- https://cors-anywhere.herokuapp.com/ (요청 필요)
- https://api.allorigins.win/raw?url=

**예시:**
```typescript
const originalUrl = "https://example.com/music.mp3";
const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(originalUrl)}`;
```

#### 방법 2: 본인 서버에 음악 호스팅

```typescript
// 1. 음악 파일을 /public/music/에 넣기
// 2. 로컬 경로 사용 (CORS 문제 없음!)
musicUrl="/music/faust-dark-fantasy.mp3"
```

#### 방법 3: Vercel/Netlify에 배포 후 사용

```typescript
// 배포 후 절대 경로
musicUrl="https://your-app.vercel.app/music/faust-dark-fantasy.mp3"
```

---

## 📋 URL 테스트 체크리스트

### URL이 작동하는지 확인:

**1. 브라우저에서 직접 열기**
```
1. URL을 새 탭 주소창에 붙여넣기
2. Enter
3. ✅ 음악이 재생되면 URL 유효
4. ❌ 오류 또는 다운로드되면 URL 수정 필요
```

**2. 개발자 도구에서 테스트**
```javascript
// F12 → Console
const audio = new Audio('https://cdn.pixabay.com/audio/...');
audio.play();

// ✅ 재생되면 성공
// ❌ CORS 오류 → Proxy 필요
```

**3. CORS 헤더 확인**
```
1. F12 → Network 탭
2. URL 접속
3. 요청 클릭 → Headers 탭
4. Response Headers에서 찾기:
   - Access-Control-Allow-Origin: * (✅ 좋음)
   - Access-Control-Allow-Origin: https://your-domain.com (✅ 좋음)
   - 없음 (❌ CORS 차단)
```

---

## 🎯 추천 워크플로우

### 🥇 최고의 방법: Pixabay CDN URL

```
1. Pixabay Music에서 음악 찾기
2. F12 → Network → 재생 버튼
3. mp3 URL 복사
4. GameScreen.tsx에 붙여넣기
5. 테스트
6. 완료! ✅
```

**소요 시간:** 5분  
**CORS 문제:** 거의 없음  
**품질:** 최고

### 🥈 대안: GitHub + jsDelivr CDN

```
1. GitHub 리포지토리 생성
2. MP3 파일 업로드
3. jsDelivr URL 생성
4. GameScreen.tsx에 사용
5. 완료! ✅
```

**소요 시간:** 10분  
**CORS 문제:** 없음  
**품질:** 본인이 선택한 음악

---

## 💡 실전 예시

### 파우스트용 음악 URL 찾기

**추천 검색 키워드:**
1. Pixabay: "dark fantasy orchestral"
2. FMA: "gothic epic soundtrack"
3. Internet Archive: "classical dark orchestral"

**예상되는 URL 형태:**

```typescript
// Pixabay
const pixabayUrl = "https://cdn.pixabay.com/audio/2024/01/15/audio_1234567890abcdef.mp3";

// Internet Archive
const archiveUrl = "https://ia801504.us.archive.org/27/items/orchestral-collection/dark-fantasy.mp3";

// GitHub + jsDelivr
const cdnUrl = "https://cdn.jsdelivr.net/gh/username/music-files@main/faust-bgm.mp3";
```

---

## 🚨 주의사항

### 1. 저작권
- ✅ CC0, Public Domain 음악만 사용
- ✅ CC BY: 출처 표시 필요
- ❌ 저작권 있는 음악 절대 금지

### 2. URL 안정성
- ⚠️ Pixabay URL은 변경될 수 있음
- ✅ Internet Archive는 영구 저장
- ✅ GitHub + CDN이 가장 안정적

### 3. 대역폭
- 외부 URL은 서버 대역폭 사용
- 많은 사용자 → 서버 부담
- 본인 서버면 제한 없음

### 4. CORS
- 개발 환경에서 작동해도 프로덕션에서 차단될 수 있음
- 항상 프로덕션 환경에서 테스트

---

## 🔧 코드 템플릿

### GameScreen.tsx 통합 예시

```typescript
// 파일 상단
const MUSIC_URLS: Record<string, string> = {
  '파우스트': 'https://cdn.pixabay.com/audio/2024/dark-fantasy.mp3',
  '노인과 바다': 'https://cdn.pixabay.com/audio/2024/ocean-calm.mp3',
  '레미제라블': 'https://cdn.pixabay.com/audio/2024/classic-drama.mp3',
};

// 컴포넌트 내부 (return 문 안)
{MUSIC_URLS[bookTitle] && (
  <BackgroundMusic
    musicUrl={MUSIC_URLS[bookTitle]}
    bookTitle={bookTitle}
    autoPlay={false}
    defaultVolume={0.3}
  />
)}
```

### 여러 URL 시도하기 (Fallback)

```typescript
const MUSIC_URLS: Record<string, string[]> = {
  '파우스트': [
    'https://cdn.pixabay.com/audio/2024/dark-fantasy-1.mp3',
    'https://cdn.pixabay.com/audio/2024/dark-fantasy-2.mp3',
    '/music/faust-dark-fantasy.mp3', // Fallback: 로컬 파일
  ],
};

// 첫 번째 URL 사용
const musicUrl = MUSIC_URLS[bookTitle]?.[0];
```

---

## 📞 도움이 필요하신가요?

### 빠른 해결책:

1. **Pixabay URL 찾기 어려우면:**
   - `/public/music/`에 파일 넣기 (가장 확실!)
   - 사용자 업로드 기능 사용

2. **CORS 오류 발생하면:**
   - Pixabay 또는 Internet Archive 사용 (CORS 허용)
   - GitHub + jsDelivr 사용 (완벽한 CORS 지원)
   - 로컬 파일 사용 (`/music/파일명.mp3`)

3. **URL이 작동하지 않으면:**
   - 브라우저 주소창에 URL 직접 입력해서 테스트
   - F12 → Network 탭에서 CORS 오류 확인
   - 다른 URL 시도

---

## 🎉 성공 체크리스트

- [ ] Pixabay Music 방문
- [ ] 마음에 드는 음악 선택
- [ ] F12 → Network → mp3 URL 복사
- [ ] URL 정리 (?filename=... 제거)
- [ ] 브라우저에서 URL 테스트 (새 탭에서 열기)
- [ ] GameScreen.tsx에 URL 추가
- [ ] 코드 저장
- [ ] 브라우저 새로고침
- [ ] 파우스트 게임 시작
- [ ] 재생 버튼 클릭
- [ ] 음악 재생 확인 ✅

---

**URL을 직접 사용하면 파일 다운로드/업로드 없이 즉시 음악을 추가할 수 있습니다!** 🌐🎵

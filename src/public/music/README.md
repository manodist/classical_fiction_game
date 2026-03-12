# 배경 음악 폴더 (개발자용)

## 개요

개발자가 작품별로 배경 음악을 제공하는 폴더입니다.  
사용자는 재생/정지 버튼만 조작하여 음악을 즐길 수 있습니다.

---

## 🎵 사용 방법

### 방법 1: 외부 URL 사용 (권장! ⭐)

**가장 빠르고 쉬운 방법:**

```typescript
// GameScreen.tsx
{bookTitle === '파우스트' && (
  <BackgroundMusic
    musicUrl="https://cdn.pixabay.com/audio/2024/.../dark-fantasy.mp3"
    bookTitle={bookTitle}
  />
)}
```

**URL 얻는 방법:**
1. https://pixabay.com/music/ 방문
2. "dark fantasy orchestral" 검색
3. 음악 재생
4. F12 → Network → mp3 파일 URL 복사
5. 코드에 붙여넣기

**장점:**
- ✅ 파일 다운로드 불필요
- ✅ 5분 안에 완료
- ✅ 서버 저장 공간 절약
- ✅ CORS 허용 (Pixabay, Internet Archive 등)

---

### 방법 2: 로컬 파일 사용

**단계:**

1. **음악 다운로드**
   - Pixabay Music: https://pixabay.com/music/
   - 검색: "dark fantasy orchestral"
   - "Free Download" → MP3

2. **파일 저장**
   ```
   /public/music/faust-dark-fantasy.mp3
   ```

3. **코드 작성**
   ```typescript
   // GameScreen.tsx
   {bookTitle === '파우스트' && (
     <BackgroundMusic
       musicUrl="/music/faust-dark-fantasy.mp3"
       bookTitle={bookTitle}
     />
   )}
   ```

---

## 📁 파일 구조

```
/public/music/
├── README.md                          # 이 파일
├── 외부_URL_사용_가이드.md            # URL 사용법 상세
├── 추천_무료_음악_URL_목록.md         # 작품별 추천 사이트
├── faust-dark-fantasy.mp3            # 파우스트 BGM
├── oldman-sea-ambient.mp3            # 노인과 바다 BGM
└── les-miserables-orchestra.mp3      # 레미제라블 BGM
```

---

## 🎼 파일 규칙

| 작품 | 파일명 예시 | 분위기 |
|------|------------|--------|
| **파우스트** | `faust-*.mp3` | 다크 판타지, 오케스트라 |
| **노인과 바다** | `oldman-sea-*.mp3` | 바다, 앰비언트 |
| **레미제라블** | `les-miserables-*.mp3` | 클래식, 드라마틱 |
| **어린왕자** | `little-prince-*.mp3` | 동화, 피아노 |

---

## ⚙️ 파일 사양

| 항목 | 권장 사양 |
|------|----------|
| **형식** | MP3 |
| **비트레이트** | 128-192 kbps |
| **크기** | 3-5 MB |
| **길이** | 3-5분 (자동 반복) |
| **샘플레이트** | 44100 Hz |
| **채널** | Stereo |

---

## 🌐 추천 무료 음악 사이트

| 사이트 | URL | CORS | 라이선스 |
|--------|-----|------|----------|
| **Pixabay Music** ⭐⭐⭐ | pixabay.com/music | ✅ | CC0 |
| **Internet Archive** ⭐⭐⭐ | archive.org/details/audio | ✅ | Public Domain |
| **Incompetech** ⭐⭐ | incompetech.com/music | ✅ | CC BY |

---

## 🎯 작품별 추천 검색 키워드

### 파우스트 (다크 판타지)
- "dark fantasy orchestral" ⭐⭐⭐
- "gothic epic music"
- "dramatic dark orchestra"

### 노인과 바다 (바다, 고독)
- "ocean waves ambient" ⭐⭐⭐
- "calm sea meditation"
- "peaceful water"

### 레미제라블 (클래식, 드라마)
- "classical orchestra dramatic" ⭐⭐⭐
- "emotional strings"
- "epic cinematic"

### 어린왕자 (동화, 감성)
- "fairy tale music" ⭐⭐⭐
- "whimsical piano"
- "dreamy lullaby"

---

## 💻 코드 예시

### 단일 작품

```typescript
{bookTitle === '파우스트' && (
  <BackgroundMusic
    musicUrl="/music/faust-dark-fantasy.mp3"
    bookTitle={bookTitle}
    defaultVolume={0.3}
  />
)}
```

### 여러 작품 (권장)

```typescript
// 파일 상단
const MUSIC_URLS: Record<string, string> = {
  '파우스트': '/music/faust-dark-fantasy.mp3',
  '노인과 바다': '/music/oldman-sea-ambient.mp3',
  '레미제라블': '/music/les-miserables-orchestra.mp3',
};

// 렌더링 부분
{MUSIC_URLS[bookTitle] && (
  <BackgroundMusic
    musicUrl={MUSIC_URLS[bookTitle]}
    bookTitle={bookTitle}
  />
)}
```

### 외부 URL 사용

```typescript
const MUSIC_URLS: Record<string, string> = {
  '파우스트': 'https://cdn.pixabay.com/audio/2024/.../dark-fantasy.mp3',
  '노인과 바다': 'https://cdn.pixabay.com/audio/2024/.../ocean-calm.mp3',
};

{MUSIC_URLS[bookTitle] && (
  <BackgroundMusic
    musicUrl={MUSIC_URLS[bookTitle]}
    bookTitle={bookTitle}
  />
)}
```

---

## 🎮 사용자 경험

**심플하고 방해되지 않는 디자인:**

1. 게임 시작 → 우측 하단 재생 버튼 표시
2. 버튼 클릭 → 음악 재생
3. 버튼 호버 → 볼륨 조절 슬라이더 표시
4. 게임 플레이 중 배경 음악 자동 반복

**독서 집중을 방해하지 않습니다:**
- ✅ 에러 메시지 없음 (콘솔만)
- ✅ 업로드 버튼 없음
- ✅ 최소한의 UI (재생/정지 버튼만)
- ✅ 기본 볼륨 30% (텍스트 읽기 방해 안 함)

---

## 📖 자세한 가이드

- **외부 URL 사용:** `/public/music/외부_URL_사용_가이드.md`
- **추천 사이트:** `/public/music/추천_무료_음악_URL_목록.md`
- **전체 문서:** `/BACKGROUND_MUSIC_GUIDE.md`

---

## 📋 체크리스트

### 음악 추가 전

- [ ] 작품 분위기 파악
- [ ] 적합한 장르 선정
- [ ] Pixabay에서 음악 검색
- [ ] 2-3개 미리 듣기

### 음악 추가 (URL 방식)

- [ ] Pixabay에서 음악 선택
- [ ] F12 → Network → mp3 URL 복사
- [ ] GameScreen.tsx에 URL 추가
- [ ] 테스트

### 음악 추가 (파일 방식)

- [ ] Pixabay에서 MP3 다운로드
- [ ] `/public/music/` 폴더에 복사
- [ ] 파일명 규칙 준수
- [ ] GameScreen.tsx에 경로 지정
- [ ] 테스트

### 테스트

- [ ] 재생 버튼 작동 확인
- [ ] 볼륨 조절 작동 확인
- [ ] 자동 반복 확인
- [ ] 분위기 적합성 확인
- [ ] 모바일에서 테스트

---

## 🚨 주의사항

### 저작권
- ✅ CC0, Public Domain 음악만 사용
- ✅ Pixabay Music 권장
- ❌ 상업 음악 금지
- ❌ YouTube, 게임/영화 OST 금지

### 파일 크기
- ✅ 3-5MB 권장
- ⚠️ 10MB 이상은 로딩 지연 가능

### 브라우저 정책
- ⚠️ 자동 재생 차단됨 (정상)
- ✅ 사용자가 버튼 클릭해야 재생

---

**마지막 업데이트:** 2025-11-22  
**버전:** 2.0 - 개발자 제공 전용 (사용자 업로드 제거)

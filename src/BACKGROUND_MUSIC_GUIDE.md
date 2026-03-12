# 배경 음악 가이드 (개발자용)

## 개요

특정 작품에 배경 음악(BGM)을 추가하여 몰입도를 높일 수 있습니다.  
**개발자가 음악을 제공하면, 사용자는 재생/정지 버튼만 조작합니다.**

---

## ✨ 핵심 디자인 철학

### 독서 집중을 최우선으로

- ✅ **최소한의 UI** - 재생/정지 버튼만 표시
- ✅ **에러 메시지 없음** - 실패 시 조용히 처리 (콘솔 로그만)
- ✅ **업로드 기능 없음** - 개발자가 큐레이션한 음악만
- ✅ **기본 볼륨 30%** - 텍스트 읽기에 방해되지 않음
- ✅ **자동 반복** - 게임 플레이 중 끊김 없음

---

## 🚀 초간단 시작 (3단계!) ⭐

### **가장 쉬운 방법: 중앙 설정 파일 사용**

#### 1단계: `/config/music.ts` 열기

#### 2단계: 작품 찾아서 URL 입력

```typescript
'파우스트': {
  url: 'https://cdn.pixabay.com/audio/2024/.../dark-fantasy.mp3',  // URL 입력!
  volume: 0.3,
  enabled: true,  // 활성화!
},
```

#### 3단계: 저장 → 새로고침 → 완료! ✅

**이게 전부입니다!** GameScreen.tsx 수정 불필요!

---

## 🎯 빠른 시작 (상세)

### ⭐ 방법 0: 중앙 설정 파일 사용 (가장 쉬움!)

**초간단 3단계:**

```typescript
// 1단계: /config/music.ts 파일 열기

// 2단계: 작품 찾아서 URL 입력 및 활성화
'파우스트': {
  url: 'https://cdn.pixabay.com/audio/2024/.../dark-fantasy.mp3',
  volume: 0.3,
  enabled: true,  // ← true로 변경!
},

// 3단계: 저장 → 새로고침 → 완료! ✅
```

**장점:**
- ✅ GameScreen.tsx 수정 불필요!
- ✅ 한 파일에서 모든 음악 관리
- ✅ 타입 안전성 (TypeScript)
- ✅ 쉬운 활성화/비활성화

**자세한 가이드:** `/config/README.md`

---

### 방법 1: 외부 URL 사용 (권장! ⭐)

**장점:**
- 파일 다운로드 불필요
- 즉시 테스트 가능
- 서버 저장 공간 절약

**단계:**

```typescript
// 1. Pixabay Music 방문
// https://pixabay.com/music/search/dark%20fantasy%20orchestral/

// 2. 음악 재생 → F12 → Network → mp3 URL 복사

// 3. GameScreen.tsx에 추가
{bookTitle === '파우스트' && (
  <BackgroundMusic
    musicUrl="https://cdn.pixabay.com/audio/2024/.../dark-fantasy.mp3"
    bookTitle={bookTitle}
  />
)}

// 4. 완료! ✅
```

---

### 방법 2: 로컬 파일 사용

**장점:**
- 오프라인 작동
- URL 변경 걱정 없음

**단계:**

```bash
# 1. Pixabay에서 MP3 다운로드
# https://pixabay.com/music/

# 2. 파일을 /public/music/ 폴더에 복사
/public/music/faust-dark-fantasy.mp3

# 3. GameScreen.tsx에 경로 지정
{bookTitle === '파우스트' && (
  <BackgroundMusic
    musicUrl="/music/faust-dark-fantasy.mp3"
    bookTitle={bookTitle}
  />
)}

# 4. 완료! ✅
```

---

## 🌐 추천 무료 음악 사이트

### 1. Pixabay Music ⭐⭐⭐ (최고 추천!)

- **URL**: https://pixabay.com/music/
- **라이선스**: CC0 (완전 무료)
- **CORS**: ✅ 지원
- **품질**: 최고
- **직접 URL**: 가능!

### 2. Internet Archive ⭐⭐⭐

- **URL**: https://archive.org/details/audio
- **라이선스**: Public Domain, CC0
- **CORS**: ✅ 완벽 지원
- **안정성**: 영구 저장

### 3. Incompetech (Kevin MacLeod) ⭐⭐

- **URL**: https://incompetech.com/music/
- **라이선스**: CC BY 4.0 (출처 표시 필요)
- **CORS**: ✅ 지원
- **품질**: 매우 좋음

---

## 🎵 작품별 추천 음악

### 파우스트 (다크 판타지, 신비로움)

**Pixabay 검색어:**
- "dark fantasy orchestral" ⭐⭐⭐
- "gothic epic music"
- "dramatic dark orchestra"

**분위기:** 어둡고, 웅장하고, 긴장감 있는

---

### 노인과 바다 (바다, 고독, 자연)

**Pixabay 검색어:**
- "ocean waves ambient" ⭐⭐⭐
- "calm sea meditation"
- "peaceful water"

**분위기:** 차분하고, 명상적이고, 자연스러운

---

### 레미제라블 (드라마틱, 감정적, 클래식)

**Pixabay 검색어:**
- "classical orchestra dramatic" ⭐⭐⭐
- "emotional strings"
- "epic cinematic"

**분위기:** 웅장하고, 감정적이고, 드라마틱한

---

### 어린왕자 (동화, 감성, 피아노)

**Pixabay 검색어:**
- "fairy tale music" ⭐⭐⭐
- "whimsical piano"
- "dreamy lullaby"

**분위기:** 부드럽고, 동화적이고, 감성적인

---

## 💻 코드 통합

### 단일 작품

```typescript
// GameScreen.tsx

{bookTitle === '파우스트' && (
  <BackgroundMusic
    musicUrl="/music/faust-dark-fantasy.mp3"
    bookTitle={bookTitle}
    defaultVolume={0.3}
  />
)}
```

---

### 여러 작품 (권장!)

```typescript
// GameScreen.tsx 파일 상단

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

---

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

### 심플하고 방해되지 않는 UX

```
1. 게임 시작
   └─→ 우측 하단에 재생 버튼 표시 (작고 조용함)

2. 버튼 클릭
   └─→ 음악 재생 (볼륨 30%)

3. 버튼 호버
   └─→ 볼륨 조절 슬라이더 표시

4. 게임 플레이
   └─→ 배경 음악 자동 반복 (독서에 집중)
```

### UI 상태

| 상태 | 버튼 | 색상 |
|------|------|------|
| **정지** | 🔇 | 회색 |
| **재생 중** | 🔊 | 보라색 |
| **호버** | 🔊 + 슬라이더 | - |

---

## ⚙️ 기술 사양

### 파일 요구사항

| 항목 | 권장 사양 |
|------|----------|
| **형식** | MP3 |
| **비트레이트** | 128-192 kbps |
| **크기** | 3-5 MB |
| **길이** | 3-5분 |
| **샘플레이트** | 44100 Hz |
| **채널** | Stereo |

### 컴포넌트 Props

```typescript
interface BackgroundMusicProps {
  musicUrl: string;        // 음악 파일 경로 또는 URL (필수!)
  bookTitle: string;       // 작품 제목
  autoPlay?: boolean;      // 자동 재생 (기본: false)
  defaultVolume?: number;  // 기본 볼륨 0.0-1.0 (기본: 0.3)
}
```

---

## 🔧 Pixabay에서 URL 얻는 방법

### 상세 단계

```
1. https://pixabay.com/music/ 방문

2. 검색창에 키워드 입력
   예: "dark fantasy orchestral"

3. 음악 선택 및 페이지 열기

4. 개발자 도구 열기
   - Windows/Linux: F12 또는 Ctrl+Shift+I
   - Mac: Cmd+Option+I

5. "Network" 탭 클릭

6. Filter에 "mp3" 입력 (선택사항)

7. Pixabay 페이지에서 재생 버튼 클릭

8. Network 탭에 mp3 파일 요청 나타남

9. mp3 파일 우클릭 → "Copy" → "Copy link address"

10. URL 정리:
    복사한 URL:
    https://cdn.pixabay.com/audio/2024/01/15/audio_abc123.mp3?filename=dark-fantasy.mp3
    
    정리한 URL:
    https://cdn.pixabay.com/audio/2024/01/15/audio_abc123.mp3
    (?filename=... 이후 부분 제거)

11. 코드에 붙여넣기
```

---

## 📁 프로젝트 구조

```
/config/                                # ⭐ 음악 설정 파일 (NEW!)
├── README.md                           # 설정 파일 가이드
└── music.ts                            # 작품별 음악 URL 관리

/public/music/
├── README.md                          # 음악 폴더 가이드
├── 외부_URL_사용_가이드.md            # URL 사용 상세
├── 추천_무료_음악_URL_목록.md         # 작품별 추천
├── faust-dark-fantasy.mp3            # 파우스트
├── oldman-sea-ambient.mp3            # 노인과 바다
└── les-miserables-orchestra.mp3      # 레미제라블

/components/
├── BackgroundMusic.tsx               # 음악 재생 컴포넌트
└── GameScreen.tsx                    # 게임 화면 (음악 통합)

/BACKGROUND_MUSIC_GUIDE.md            # 이 파일
```

---

## 📋 체크리스트

### 음악 선정

- [ ] 작품 분위기 분석
- [ ] 적합한 장르 선정
- [ ] Pixabay에서 검색
- [ ] 2-3개 미리 듣기
- [ ] 가장 어울리는 음악 선택

### URL 방식

- [ ] Pixabay에서 음악 선택
- [ ] F12 → Network → mp3 URL 복사
- [ ] URL 정리 (?filename=... 제거)
- [ ] GameScreen.tsx에 URL 추가
- [ ] 브라우저 테스트
- [ ] 재생 확인
- [ ] 볼륨 조절 확인
- [ ] 분위기 적합성 확인

### 파일 방식

- [ ] Pixabay에서 MP3 다운로드
- [ ] `/public/music/` 폴더에 복사
- [ ] 파일명 규칙 준수
- [ ] GameScreen.tsx에 경로 지정
- [ ] 브라우저 테스트
- [ ] 재생 확인
- [ ] 볼륨 조절 확인
- [ ] 분위기 적합성 확인

### 최종 확인

- [ ] 모바일에서 테스트
- [ ] 자동 반복 확인
- [ ] 독서 방해 안 함 확인
- [ ] README.md 업데이트

---

## 🚨 주의사항

### 1. 저작권

- ✅ CC0, Public Domain 음악만 사용
- ✅ Pixabay Music 권장
- ❌ 상업 음악 절대 금지
- ❌ YouTube, 게임/영화 OST 금지

### 2. 파일 크기

| 비트레이트 | 3분 파일 크기 |
|------------|---------------|
| 128 kbps | ~3 MB |
| 192 kbps | ~5 MB |
| 320 kbps | ~8 MB (권장 안 함) |

### 3. 브라우저 정책

- ⚠️ 브라우저는 자동 재생을 차단함
- ✅ 사용자가 버튼을 클릭해야 재생 (정상 동작)
- ✅ `autoPlay={false}` 기본값

### 4. 에러 처리

- ✅ 에러 발생 시 조용히 실패
- ✅ 콘솔에만 로그 출력
- ✅ UI에 에러 메시지 표시 안 함
- ✅ 독서 집중도 유지

---

## 💡 Best Practices

### 1. 음악 선정

```
✅ 작품 분위기와 일치
✅ 텍스트 읽기에 방해 안 됨
✅ 자연스러운 반복 (루프)
✅ 3-5분 길이
❌ 보컬 포함 음악
❌ 너무 시끄러운 음악
❌ 갑작스러운 변화 많은 음악
```

### 2. 볼륨 설정

```
✅ 기본 30% (0.3)
✅ 사용자가 조절 가능
✅ 호버 시 슬라이더 표시
```

### 3. 파일 vs URL

**URL 사용 권장:**
- 빠른 프로토타이핑
- 서버 공간 절약
- 쉬운 교체

**파일 사용 권장:**
- 프로덕션 배포
- 오프라인 지원
- 안정성 중요

---

## 🎯 실전 예시

### 파우스트 구현 (완료!)

```typescript
// GameScreen.tsx
{bookTitle === '파우스트' && (
  <BackgroundMusic
    musicUrl="/music/faust-dark-fantasy.mp3"
    bookTitle={bookTitle}
    defaultVolume={0.3}
  />
)}
```

**결과:**
- ✅ 우측 하단에 작은 재생 버튼
- ✅ 클릭 시 다크 판타지 음악 재생
- ✅ 호버 시 볼륨 조절 가능
- ✅ 독서에 전혀 방해 안 됨
- ✅ 몰입도 크게 향상

---

## 📖 추가 문서

- **외부 URL 사용**: `/public/music/외부_URL_사용_가이드.md`
- **추천 사이트**: `/public/music/추천_무료_음악_URL_목록.md`
- **폴더 README**: `/public/music/README.md`

---

## 🚀 다음 단계

### 우선순위 1: 파우스트 음악 제공

```bash
# 방법 1: URL (권장)
# Pixabay에서 URL 복사 → 코드에 붙여넣기

# 방법 2: 파일
# Pixabay에서 다운로드 → /public/music/ 저장
```

### 우선순위 2: 다른 작품 음악 추가

```bash
# 노인과 바다, 레미제라블 등
# 각 작품 분위기에 맞는 음악 선정
```

### 우선순위 3: 사용자 피드백 수집

```
# 음악이 독서에 도움이 되는지 확인
# 볼륨 적절성 체크
# 분위기 적합성 평가
```

---

## 🎉 성공 사례

### 파우스트 배경 음악

**구현 완료:**
- ✅ 개발자 제공 음악 (다크 판타지)
- ✅ 재생/정지 버튼
- ✅ 볼륨 조절
- ✅ 자동 반복
- ✅ 에러 조용히 처리
- ✅ 최소한의 UI
- ✅ 독서 집중도 유지

**예상 사용자 반응:**
> "음악이 분위기를 완벽하게 살려줘요!" 🎵  
> "방해되지 않고 오히려 집중이 더 잘 돼요!" 🌟  
> "버튼 하나로 간단하게 조작할 수 있어서 좋아요!" ✨

---

**마지막 업데이트:** 2025-11-22  
**버전:** 2.0 - 개발자 제공 전용  
**철학:** 독서 집중을 최우선으로!
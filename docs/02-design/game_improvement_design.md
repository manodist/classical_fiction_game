# bkit PDCA 설계서: 클래식 픽션 게임 프리미엄 개선 (Phase 1)
작성일: 2026-02-27
작성자: 에이전트 김비서 (Secretary Kim)
프로젝트: classical_fiction_game

이 설계서는 `01-plan/game_improvement_plan.md`의 기획을 코드로 어떻게 안전하게(Zero-Breakage) 구현할 것인지를 정의합니다.

## 1. 🎨 Phase 2: 디자인 (UI/UX) 기술 설계

### 1.1 Framer Motion 의존성 추가
- **명령어**: `npm install framer-motion` (코드 작성 전 실행)
- **대상 파일**: `src/components/GameScreen.tsx`
- **구현 방식**:
  - `import { motion } from 'framer-motion'`
  - 텍스트가 렌더링되는 기존 `<div>`를 `<motion.div>`로 래핑하여 `initial={opacity:0}` -> `animate={opacity:1}` 및 `transition={staggerChildren}` 적용.
  - 텍스트 라인 단위로 부드럽게 Fade-up 되며 순차 표시(Typewriter 효과 대체안, 모바일 성능 고려).

### 1.2 배경 이미지 동적 효과 (Ken Burns)
- **대상 파일**: `src/components/GameScreen.tsx`
- **구현 방식**:
  - 기존 배경 `<div className="absolute inset-0...">` 내부에 `<motion.div>` 적용.
  - `animate={{ scale: [1.05, 1.0] }}` 및 `transition={{ duration: 20, ease: "linear" }}` 설정.
  - 리소스 최적화를 위해 CSS `will-change: transform` 명시.

### 1.3 효과음(SFX) 시스템 연동
- **대상 파일**: `src/hooks/useSoundEffect.ts` (신규 파일)
- **구현 방식**:
  - HTML5 `Audio` API를 커스텀 훅으로 감싸 관리. (캐싱 처리)
  - `GameScreen.tsx` 내에서 `const playClick = useSoundEffect('assets/sfx/click.mp3')` 호출.
  - 선택지 버튼의 `onClick` 핸들러에 `playClick()` 삽입. (옵션: 무음 모드 토글 토스트 에러 로직 추가)

### 1.4 테마별 UI Color Tint 변환
- **대상 파일**: `src/components/GameScreen.tsx` 및 `tailwind.config.js`
- **구현 방식**:
  - `Scene` 데이터에 `timeOfDay` 혹은 `themeColor` 속성을 선택적(`optional`)으로 추가하거나, 배경 이미지 URL을 분석하는 건 복잡하므로 시간대(Time)를 하드코딩된 값으로 넘기는 옵션 제공.
  - 간단하게 CSS 커스텀 속성을 인라인 스타일로 오버라이드. (예: `--theme-border-color: rgba(x,y,z,0.3)`)

---

## 2. 🕹️ Phase 3: 재미 요소 (Fun & Mechanics) 기술 설계

### 2.1 스탯(Affinity) 매핑 변경점
- **대상 파일**: `src/types/index.ts`
- **구현 방식**:
  ```typescript
  export interface Choice {
    label: string;
    to: string;
    cls?: string;
    affinity?: Record<string, number>; // 🔥 추가 (선택적)
  }
  ```
- **데이터 흐름**: 스토리 생성기 호환성을 깨지 않기 위해 선택적(Optional) 인자로만 추가하여 과거 파일들(기존 35개 작품)을 일괄 수정할 필요 없게 함.

### 2.2 성향 분석 및 수집품 로직
- **대상 파일**: `src/components/GameScreen.tsx`
- **구현 방식**:
  - 플레이어의 누적 Affinity를 담을 상태 `const [playerStats, setPlayerStats] = useState<Record<string, number>>({})` 추가.
  - `currentSceneId === 'ending'` 일 때, 스탯의 빈도가 높은 순으로 칭호(Title) 계산 후 엔딩 컴포넌트 하단에 렌더링.
- **수집품(Badge) 로직**: `localStorage.setItem('collected_badges', JSON.stringify(newBadges))` 형식으로 엔딩 도달 시 책 제목 기반의 배지 해금.

---

## 3. 📖 Phase 4: 스토리 및 콘텐츠 기술 설계

### 3.1 TTS (Web Speech API) 기반 '읽어주기' 프론트엔드
- **대상 파일**: `src/hooks/useTTS.ts` (신규 파일) 및 `src/components/GameScreen.tsx`
- **구현 방식**:
  - 브라우저 내장 `window.speechSynthesis` 활용.
  ```typescript
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9; // 약간 느리게 (어린이 대상)
    window.speechSynthesis.speak(utterance);
  };
  ```
  - 페이지 상단 UI 컨트롤 바에 🔊 (스피커) 이모지 버튼 추가. 씬이 넘어갈 때마다 이전 발화 `speechSynthesis.cancel()` 캔슬 호출 필수.

### 3.2 히든 엔딩 로직
- **대상 파일**: `src/components/GameScreen.tsx`
- **구현 방식**:
  - 특정 조건(예: 누적 클릭 수, 스탯의 극단치, 혹은 랜덤 확률 5%) 만족 시 기존 `ending` 장면의 텍스트 밑에 "💡 특별한 무언가를 발견했습니다!" 아코디언 컴포넌트를 열 수 있도록 설계.

---

## 4. 백업 및 롤백 플랜 (Zero-Breakage)
- 모든 수정 사항은 `git commit` 단위로 명확히 쪼개어 배포하며, Phase 2 작업 중 기존 `App.tsx` 흐름에 `Error`가 1건이라도 발생 시 즉시 리버트(`git revert`) 가능하도록 기능별 격리(Component Isolation) 전략을 세웁니다.
- 완료 후 `bkit` CLI 또는 스크립트로 `/pdca analyze`를 모사하여 사전 테스트를 수행합니다.

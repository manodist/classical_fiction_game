# 🔍 이미지 검색 시 엄격한 기준 적용 규칙

> ⚠️ **중요**: 모든 날짜는 [DATE_MANAGEMENT.md](./DATE_MANAGEMENT.md)를 기준으로 합니다!

## ⚠️ 핵심 원칙

**새 이미지를 검색할 때도 교체 작업과 동일한 엄격한 기준을 적용해야 합니다!**

---

## 🎯 이미지 검색 전 확인사항

### 0️⃣ 날짜 확인 (작업 시작 전)
```
1. DATE_MANAGEMENT.md 열기
2. 현재 날짜 확인
3. 작업 로그에 현재 날짜 사용
```

### 1️⃣ 작품 시대 배경 확인 (최우선!)
```
질문: 이 작품의 시대적 배경은 언제인가?
- 조선시대 → 100% 조선시대 이미지만
- 1800년대 → 1800년대 시대상에 맞는 이미지만
- 현대 이야기 → 현대 이미지 가능
```

### 2️⃣ 페이지 내용 분석
```
질문: 이 장면의 주요 내용은 무엇인가?
- 장소: 어디서?
- 행동: 무엇을?
- 감정: 어떤 기분으로?
```

### 3️⃣ 키워드 함정 피하기
```
⚠️ 주의: 페이지 제목의 키워드에 현혹되지 말 것!

예시:
- "변화를 위한 용기" (조선시대 작품)
  ❌ "변화" 키워드 → 현대 이미지
  ✅ 조선시대 배경 → 조선시대 이미지

- "다음 세대를 위한 가르침" (조선시대 작품)
  ❌ "세대" 키워드 → 현대 교육 이미지
  ✅ 조선시대 배경 → 조선시대 교육 이미지
```

---

## 📋 검색 키워드 작성 단계

### Step 1: 시대 배경 키워드 먼저
**조선시대 작품 예시:**
```
1. 기본 키워드: korean traditional
2. 시대 키워드: ancient, historical
3. 장소/사물 키워드: architecture, temple, village
```

**완성된 검색어:**
- ✅ `korean traditional architecture` (O)
- ✅ `ancient korean monastery` (O)
- ❌ `korean modern building` (X)
- ❌ `contemporary korea` (X)

### Step 2: 현대적 단어 제외
**절대 사용 금지 키워드:**
- modern, contemporary, current
- 2020s, 2010s, 21st century
- new, recent, latest

**대체 키워드:**
- traditional, ancient, historical
- vintage, antique, old
- classical, timeless

### Step 3: 검증 키워드 추가
**조선시대 작품:**
- traditional (필수)
- historical (권장)
- ancient (권장)
- authentic (권장)

---

## 🚫 검색 결과 필터링 기준

### 즉시 제외해야 할 이미지 (한국 전통 작품)

#### 1. 현대 건축물이 조금이라도 보이는 경우
```
❌ 산 풍경인데 배경에 아파트가 보임
❌ 한옥 사진인데 뒤에 빌딩이 보임
❌ 숲 사진인데 전봇대가 보임
```

#### 2. 현대 시설물이 있는 경우
```
❌ 전봇대, 전깃줄
❌ 아스팔트 도로
❌ 자동차
❌ 현대식 간판
❌ 콘크리트 구조물
```

#### 3. 현대인이 등장하는 경우
```
❌ 관광객이 한옥을 구경하는 사진
❌ 현대 의복을 입은 사람
❌ 재현/체험 행사 사진
```

#### 4. 복원/재현 건물인 경우
```
❌ 민속촌 같은 재현 시설
❌ 테마파크 전통 건물
✅ 순수한 역사적 건축물만
```

---

## ✅ 검색 프로세스 (단계별)

### 단계 1: 검색어 준비
```typescript
// 1. 작품 시대 확인
const era = "조선시대"; // 또는 "1800년대 프랑스" 등

// 2. 장면 내용 파악
const scene = {
  location: "산속 사원",
  action: "무예 수련",
  mood: "진지한"
};

// 3. 검색 키워드 조합
const keywords = [
  "korean traditional", // 문화권 + 시대
  "temple mountain",    // 장소
  "martial arts",       // 행동/사물
  "historical"          // 검증 키워드
].join(" ");

// 최종: "korean traditional temple mountain martial arts historical"
```

### 단계 2: 검색 실행
```typescript
// Unsplash Tool 사용
unsplash_tool({ 
  query: "korean traditional temple mountain martial arts historical" 
});
```

### 단계 3: 결과 검증 (필수!)
```
✅ 체크리스트:
- [ ] 현대 건축물이 전혀 보이지 않는가?
- [ ] 전봇대, 전깃줄이 없는가?
- [ ] 순수한 전통 이미지인가?
- [ ] 작품의 시대 배경과 일치하는가?
- [ ] 장면의 내용과 어울리는가?
```

### 단계 4: 불합격 시 재검색
```
불합격 시:
1. 키워드에 "authentic" 추가
2. "ancient" 강조
3. 더 구체적인 장소/사물 키워드 사용
4. IMAGE_ARCHIVE.md의 검증된 이미지 참고
```

---

## 🎯 실전 예시

### 예시 1: 조선시대 무예 수련 장면

#### ❌ 나쁜 검색 과정
```typescript
// 1. 키워드만 보고 검색
query: "martial arts training" 
// → 현대 태권도 도장 나옴

// 2. 결과 확인 없이 사용
bg: '[현대 태권도 대회 사진]'
```

#### ✅ 좋은 검색 과정
```typescript
// 1. 작품 시대 확인
시대: 조선시대

// 2. 시대 배경 키워드 우선
query: "korean traditional martial arts training historical"

// 3. 결과 검증
- 전통 무술 훈련 이미지인가? ✓
- 현대 건물이 보이는가? ✗
- 조선시대 분위기인가? ✓

// 4. 통과 → 사용
bg: 'https://images.unsplash.com/photo-1723164965015...'
```

### 예시 2: 조선시대 교육 장면

#### ❌ 나쁜 검색 과정
```typescript
// 키워드: "다음 세대를 위한 가르침"
// "세대", "가르침" → 현대적 연상

query: "education teaching stage"
// → 현대 무대, 강의실 나옴
```

#### ✅ 좋은 검색 과정
```typescript
// 작품 시대 우선 고려
query: "korean traditional education confucian teacher student historical"

// 결과: 서당, 전통 교육 이미지
// 검증: 조선시대 교육 분위기 ✓
```

---

## 📚 검증된 검색 패턴 (카테고리별)

### 한국 전통 - 건축
```
korean traditional architecture hanok
korean palace architecture ancient
korean traditional temple mountain
traditional korean wooden house historical
hanok courtyard traditional authentic
```

### 한국 전통 - 자연
```
korean traditional nature peaceful
korean mountain landscape ancient
traditional korean forest path
korean traditional garden historical
```

### 한국 전통 - 인물 활동
```
korean traditional martial arts historical
ancient korean meditation monastery
korean traditional education confucian
traditional korean ceremony historical
```

### 한국 전통 - 실내
```
korean traditional interior room wooden
ancient korean temple interior
traditional korean meditation hall
korean historical building interior quiet
```

---

## 🔄 검색 실패 시 대처법

### 1. 검색 결과가 현대적일 때
```
대처:
1. "traditional" → "ancient" 변경
2. "historical authentic" 추가
3. 연도 범위 키워드 추가 (예: "joseon era")
4. IMAGE_ARCHIVE.md에서 유사 이미지 URL 참고
```

### 2. 검색 결과가 너무 적을 때
```
대처:
1. 키워드 범위 확대 (예: "temple" → "temple monastery pavilion")
2. 유사 카테고리 검색 (예: "palace" 대신 "traditional architecture")
3. 검증된 이미지 재사용 고려
```

### 3. 적절한 이미지를 못 찾을 때
```
대처:
1. IMAGE_ARCHIVE.md의 검증된 이미지 사용
2. 유사한 장면의 이미지 재사용
3. 카테고리 키워드 변경 (예: "수련" → "명상")
```

---

## 💡 고급 팁

### 1. 시즈널 검색
```
봄 장면: spring blossom traditional korean
가을 장면: autumn fall traditional korean temple
겨울 장면: winter snow traditional korean palace
```

### 2. 시간대 검색
```
아침: morning sunrise traditional korean
저녁: sunset evening traditional korean
밤: night traditional korean architecture
```

### 3. 날씨/분위기 검색
```
평화로운: peaceful serene traditional korean
신비로운: mysterious misty traditional korean temple
장엄한: majestic grand traditional korean palace
```

---

## 📝 최종 체크리스트

### 검색 전
- [ ] 작품의 시대 배경 확인
- [ ] 장면의 장소/행동/감정 파악
- [ ] 페이지 제목 키워드 함정 주의

### 검색 중
- [ ] 시대 배경 키워드 포함
- [ ] 현대적 단어 제외
- [ ] 검증 키워드 추가 (traditional, historical)

### 검색 후
- [ ] 현대 건축물 없음
- [ ] 현대 시설물 없음
- [ ] 작품 시대와 일치
- [ ] 장면 내용과 어울림
- [ ] IMAGE_ARCHIVE.md에 기록

---

**핵심 원칙 재확인:**
> "페이지 제목의 키워드가 아니라, 작품 전체의 시대적 배경이 이미지 선택의 절대 기준이다!"

**작성일**: 2025-11-20
**적용 범위**: 모든 프리퀄 스토리 이미지 작업
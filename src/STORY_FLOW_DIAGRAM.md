# 파우스트 게임 분기 흐름도

## 🎯 메인 흐름 (Critical Path)

```
scene-1 (시스템 알림)
  ├─ 포털로 뛰어든다 → scene-2
  └─ 장비를 점검한다 → scene-2-equipment → scene-2

scene-2 (차원 이동)
  → scene-3 (난이도 선택)

scene-3 (난이도 선택) ★ 중요 분기점
  ├─ [일반] 안정적으로 추적 → scene-4-normal
  ├─ [어려움] 직접 대결 → scene-4-hard
  └─ [지옥] 전면전 → scene-4-hell
```

---

## 📖 CHAPTER 1: 잠입 (scene-4-11)

### 분기 1: 일반 난이도 (정보 수집)
```
scene-4-normal (신중한 추적)
  → scene-5 (첫 조우)
```

### 분기 2: 어려움 난이도 (함정)
```
scene-4-hard (함정)
  → scene-5 (첫 조우)
```

### 분기 3: 지옥 난이도 (압도적)
```
scene-4-hell (압도적)
  → scene-5 (첫 조우)
```

### 공통: scene-5 (첫 조우) → 좀비 처리
```
scene-5 (첫 조우)
  ├─ 빠르게 처리한다 → scene-6
  └─ 구원을 시도한다 → scene-6-save
```

#### scene-6 (쓰레기 소탕)
```
scene-6 → scene-7 (마을의 소문)
```

#### scene-6-save (구원 시도)
```
scene-6-save → scene-7 (마을의 소문)
```

### scene-7 (마을의 소문) → 연구실 발견
```
scene-7 → scene-8 (연구실)
```

### scene-8 (연구실) ★ 중요 분기점
```
scene-8
  ├─ 정면 돌파 → scene-9-front
  └─ 창문으로 잠입 → scene-9-stealth
```

#### 분기 A: 정면 돌파
```
scene-9-front (돌파)
  → scene-10 (계약 목격)
```

#### 분기 B: 잠입
```
scene-9-stealth (잠입)
  → scene-10-stealth (관찰)
```

### scene-10 계열 → 정신 공격
```
scene-10 (계약 목격) → scene-11 (정신 공격)
scene-10-stealth (관찰) → scene-11 (정신 공격)
```

### scene-11 (정신 공격) → 계약 장면 ★ 중요 분기점
```
scene-11 (정신 공격)
  ├─ 정신력으로 버틴다 → scene-11 (동일 페이지, 반복 선택)
  └─ 공격을 계속한다 → scene-11 (동일 페이지, 반복 선택)

→ 두 선택지 모두 scene-11로 가서 다시 분기:
  ├─ 뛰어들어 막는다 → scene-11-interrupt
  └─ 조금 더 지켜본다 → scene-11-watch
```

#### 분기 A: 계약 방해 (막지 못함)
```
scene-11-interrupt (계약 방해)
  → 남자를 살핀다 → scene-11-interrupt-check (쓰러진 남자) ★ NEW!
  → 손목 장치를 확인한다 → scene-12 (손목 장치)
```

#### 분기 B: 관찰 (늦음)
```
scene-11-watch (관찰)
  → 남자를 확인한다 → scene-12 (손목 장치)
```

---

## 📖 CHAPTER 2: 추격 (scene-12-20)

### scene-12 (손목 장치) ★ 중요 분기점
```
scene-12 (손목 장치)
  ├─ 즉시 추격 → scene-13-chase (조급한 추격)
  └─ 회복 후 추적 → scene-13-rest (전략적 휴식)
```

#### 분기 A: 즉시 추격 (함정)
```
scene-13-chase (조급한 추격)
  → scene-14 (함정 발동)
```

#### 분기 B: 회복 후 추적 (성공)
```
scene-13-rest (전략적 휴식)
  → scene-14-prepared (숲 속 추적)
```

### scene-14 계열 → 숲에서 공격당함
```
scene-14 (함정 발동) → scene-15-injured (상처 입은 헌터)
scene-14-prepared (숲 속 추적) → scene-15-injured (상처 입은 헌터)
```

### scene-15-injured → 갈림길
```
scene-15-injured (상처 입은 헌터)
  → scene-15 (갈림길) ★ 중요 분기점
```

### scene-15 (갈림길) ★ 중요 분기점
```
scene-15 (갈림길)
  ├─ 왼쪽 - 주민들을 구한다 → scene-16-save
  └─ 오른쪽 - 메피스토를 쫓는다 → scene-16-chase
```

#### 분기 A: 주민 구원 (메피스토 놓침)
```
scene-16-save (구원의 선택)
  → scene-17 (구원의 순간)
```

#### 분기 B: 메피스토 추격 (주민 희생)
```
scene-16-chase (복수의 선택)
  → scene-17 (복수의 순간)
```

### scene-17 (구원의 순간 / 복수의 순간) → 보스전
```
scene-17 (구원의 순간) → 숨을 고른다 → scene-17 (폐성 도착) → scene-17-boss
scene-17 (복수의 순간) → 정신을 잃는다 → scene-17 (폐성 도착) → scene-17-boss
```

### scene-17 (폐성 도착) → 보스전
```
scene-17 (폐성 도착)
  → scene-17-boss (보스 전투)
```

---

## 📖 CHAPTER 3: 보스전 (scene-17-boss ~ scene-20)

### scene-17-boss (보스 전투) ★ 중요 분기점
```
scene-17-boss (보스 전투)
  ├─ 필살기를 쓴다 → scene-18-ultimate
  └─ 후퇴한다 → scene-18 (폐성으로)
```

#### 분기 A: 필살기 사용 (메피스토 도주)
```
scene-18-ultimate (필살기: 빛의 심판)
  → 일어난다 → scene-18-ultimate-aftermath (회복과 추적) ★ NEW!
  → 문을 연다 → scene-19 (마지막 계약자)
```

#### 분기 B: 후퇴 (폐성으로)
```
scene-18 (폐성으로)
  → 문을 연다 → scene-19 (마지막 계약자)
```

### scene-19 (마지막 계약자) ★ 중요 분기점
```
scene-19 (마지막 계약자)
  ├─ 계약서를 빼앗는다 → scene-20-grab
  └─ 설득을 계속한다 → scene-20-persuade
```

#### 분기 A: 빼앗기 실패
```
scene-20-grab (빼앗기 실패)
  → scene-21 (분노)
```

#### 분기 B: 설득 성공
```
scene-20-persuade (설득 성공)
  → scene-21-saved (구원의 빛)
```

---

## 📖 CHAPTER 4: 최종 추격 (scene-21 ~ scene-26)

### 분기 A: 분노 루트 (scene-21)
```
scene-21 (분노)
  → scene-22 (최종 대결 준비)
```

### 분기 B: 구원 루트 (scene-21-saved)
```
scene-21-saved (구원의 빛)
  → scene-22 (최종 대결 준비)
```

### scene-22 (최종 대결 준비) ★ 중요 분기점
```
scene-22 (최종 대결 준비)
  ├─ 정면 돌파 → scene-23-power
  └─ 기술로 승부 → scene-23-skill
```

#### 분기 A: 힘으로 승부
```
scene-23-power (힘의 대결)
  → scene-24 (피의 대결)
```

#### 분기 B: 기술로 승부
```
scene-23-skill (기술의 승부)
  → scene-24 (피의 대결)
```

### scene-24 (피의 대결) ★ 중요 분기점
```
scene-24 (피의 대결)
  ├─ 정신력으로 버틴다 → scene-25-mental
  └─ 분노를 받아들인다 → scene-25-anger
```

#### 분기 A: 정신력으로 승리
```
scene-25-mental (정신의 승리)
  → scene-26-victory (승리)
```

#### 분기 B: 분노로 패배
```
scene-25-anger (분노의 힘)
  → scene-26-defeat (패배)
```

---

## 📖 CHAPTER 5: 엔딩 분기 (scene-26 ~ ending)

### 분기 A: 승리 루트
```
scene-26-victory (승리)
  → scene-27 (새로운 신호)
  → scene-28 선택
    ├─ 즉시 출발 → scene-28-rush
    └─ 회복 후 출발 → scene-28-rest
```

#### A-1: 즉시 출발 (실패)
```
scene-28-rush (무모한 출발)
  → scene-29-bad (완전한 패배)
  → ending-failure (사냥 실패)
```

#### A-2: 회복 후 출발 (성공)
```
scene-28-rest (준비된 출발)
  → scene-29 (마지막 도전)
  → scene-30 선택
    ├─ 남자를 설득한다 → scene-30-persuade → ending-success
    └─ 메피스토와 싸운다 → scene-30-fight → ending-success
```

### 분기 B: 패배 루트
```
scene-26-defeat (패배)
  → scene-27-injured (일주일 후)
  → ending-failure (사냥 실패)
```

---

## 🏁 최종 엔딩

### ending-success (부분적 승리)
```
[마지막 계약자 구출 성공]
[메피스토는 도주했지만 한 사람을 구했다]
→ ending (게임 결과 화면)
```

### ending-failure (사냥 실패)
```
[메피스토 추적 실패]
[하지만 헌터는 포기하지 않는다]
→ ending (게임 결과 화면)
```

### ending (게임 결과 화면)
```
[최종 통계 및 명언]
→ 메피스토와 다시 싸우기 (scene-1로 재시작)
```

---

## 🔧 Phase 8 수정 사항

### ✅ 수정 1: scene-11-interrupt 흐름 개선
**문제:** 계약 방해 → '남자를 살핀다' → 바로 손목 장치 (부자연스러움)

**해결:** 중간 페이지 추가
```
scene-11-interrupt (계약 방해)
  → 남자를 살핀다
  → scene-11-interrupt-check (쓰러진 남자) ★ NEW!
  → 손목 장치를 확인한다
  → scene-12 (손목 장치)
```

**scene-11-interrupt-check 내용:**
- 남자 맥박 확인 (살아있음)
- 계약 효과 시작 ("...지식... 모든 지식...")
- 남자를 바닥에 눕힘
- 메피스토를 잡아야 계약을 풀 수 있다는 결심
- 손목 장치 확인 준비

### ✅ 수정 2: scene-18-ultimate 흐름 개선
**문제:** 필살기: 빛의 심판 → '일어난다' → 갑자기 "문을 연다" (논리적 비약)

**해결:** 중간 페이지 추가
```
scene-18-ultimate (필살기: 빛의 심판)
  → 일어난다
  → scene-18-ultimate-aftermath (회복과 추적) ★ NEW!
  → 문을 연다
  → scene-19 (마지막 계약자)
```

**scene-18-ultimate-aftermath 내용:**
- 눈을 뜸 (10-20분 경과)
- 몸 일으키기 (HP: 520/850, 마력: 5/100 자연 회복)
- 손목 장치 확인 (메피스토 신호: 약함, 거리: 50m)
- 복도와 계단을 따라 이동
- 불빛이 새어나오는 방 발견
- 문 앞에 섬

---

## 📊 통계

### 총 페이지 수
- **메인 스토리 페이지:** 37개
- **엔딩 페이지:** 3개 (ending-success, ending-failure, ending)
- **총합:** 40개

### 주요 분기점 (선택지 2개 이상)
1. **scene-1** (포털 / 장비)
2. **scene-3** (난이도 3개)
3. **scene-5** (빠르게 처리 / 구원)
4. **scene-8** (정면 돌파 / 잠입)
5. **scene-11** (뛰어들기 / 관찰)
6. **scene-12** (즉시 추격 / 회복)
7. **scene-15** (주민 구원 / 메피스토 추격)
8. **scene-17-boss** (필살기 / 후퇴)
9. **scene-19** (빼앗기 / 설득)
10. **scene-22** (힘 / 기술)
11. **scene-24** (정신력 / 분노)
12. **scene-27** (즉시 출발 / 회복 후 출발)
13. **scene-30** (설득 / 전투)

**총 13개의 주요 선택 분기점**

### 엔딩 루트
- **성공 엔딩:** 2가지 방법 (설득 / 전투)
- **실패 엔딩:** 2가지 경로 (무모한 출발 / 패배 후 회복 실패)

---

## 🎯 핵심 설계 원칙

1. **선택의 의미:** 모든 선택지는 스토리와 캐릭터 발전에 영향
2. **멀티 엔딩:** 성공/실패 모두 의미 있는 경험 제공
3. **철학적 질문:** 각 페이지마다 생각구름(💭) 질문으로 성찰 유도
4. **2인칭 시점:** "너"를 사용하여 몰입감 극대화
5. **프리퀄 구조:** 원작(파우스트)으로 들어가기 전 세계관 이해

---

**마지막 업데이트:** 2025-01-22  
**작업:** Phase 8 - 분기 흐름 개선 (2개 중간 페이지 추가)

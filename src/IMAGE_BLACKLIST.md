# Image Blacklist

이 파일은 프로젝트에서 사용하지 말아야 할 이미지 URL 목록입니다.
판타지/액션 웹소설 작품에 어울리지 않는 사람 얼굴 사진들이 포함되어 있습니다.

---

## ⚠️ 이미지 선정 주의사항

### 🚫 절대 사용 금지 기준
1. **인종차별 우려**: 특정 인종을 부정적인 맥락(좀비, 악당, 피해자 등)과 연결할 수 있는 이미지
2. **사람 얼굴/초상**: 판타지 세계관에 어울리지 않는 현대인 사진
3. **부적절한 일상 사진**: 현대 배경, 일상적인 장면
4. **저작권 문제**: 출처 불명확하거나 상업적 사용이 불가능한 이미지

### ✅ 안전한 대체 이미지
- 자연 풍경 (숲, 산, 하늘, 바다)
- 판타지 건축물 (성, 폐허, 신전)
- 추상적 이미지 (마법진, 빛, 어둠)
- 동물/생물 (늑대, 용, 판타지 크리처)
- 무기/장비 (검, 방패, 갑옷)

---

## ❌ 사용 금지 이미지

### 사람 얼굴/초상 사진 (부적절)

1. `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d`
   - 사유: 사람 얼굴 사진 (남성 초상)
   - 교체 완료: ✅ 2025-01-22 (Phase 1 + Phase 2)
   - 사용됐던 위치: 
     - Phase 1: scene-3, scene-12, scene-21, scene-27, ending-success
     - Phase 2: scene-15 (갈림길) ✅ 완전 제거!

2. `https://images.unsplash.com/photo-1758730010177-1711515b7552`
   - 사유: 사람 얼굴 사진 (실내 인물)
   - 교체 완료: ✅ 2025-01-22 (총 7곳)
   - 사용됐던 위치: scene-8, scene-10, scene-11-watch, scene-19, scene-20-persuade, scene-28-rush, scene-30-persuade

3. `https://images.unsplash.com/photo-1590342833877-0cb275491d26`
   - 사유: 사람 얼굴 사진
   - 교체 완료: ✅ 2025-01-22 (총 4곳)
   - 사용됐던 위치: scene-9-stealth, scene-11-interrupt, scene-20-grab, scene-29

4. `https://images.unsplash.com/photo-1631217868264-e5b90bb7e133`
   - 사유: 부적절한 일상 사진
   - 교체 완료: ✅ 2025-01-22 (Phase 1 + Phase 3)
   - 사용됐던 위치:
     - Phase 1: scene-7 (마을의 소문), scene-28-rest (준비된 출발)
     - Phase 3: scene-4-normal (신중한 추적), scene-14-prepared (숲 속 추적) ✅ 완전 제거!

5. `https://images.unsplash.com/photo-1666214280557-f1b5022eb634` ⛔ **블랙리스트**
   - 사유: **인종차별 우려 (흑인 아이 포함) - 부적절한 현대 사진**
   - 교체 완료: ✅ 2025-11-22 (완전 제거)
   - 사용됐던 위치 (4곳 → 0곳):
     * scene-5-mercy (첫 조우) → 다크 판타지 폐허로 교체
     * scene-14 (좀비 군단) → 좀비 아포칼립스로 교체 ⭐
     * scene-15-injured-reflect (부상 후 성찰) → 포스트 아포칼립스 폐허로 교체
     * scene-23-skill (기술의 싸움) → 전투 폐허로 교체 ⭐
   - 대체 이미지:
     * `photo-1686164194855-e4d37f4e7c2d` (좀비 아포칼립스)
     * `photo-1716854029896-a2d7b34d3052` (포스트 아포칼립스 폐허)
     * `photo-1549656177-e245e8e6b292` (전투 폐허)
     * `photo-1704550208718-6fc116d60a7d` (다크 판타지 폐허)

---

## ✅ 대체 이미지 (판타지 테마)

### 판타지/액션에 적합한 이미지

#### Phase 1 이미지 (초반 교체)

1. `https://images.unsplash.com/photo-1732021884372-84e1ddac549e`
   - 테마: 어두운 신비로운 포털
   - 사용: scene-3 (난이도 선택)

2. `https://images.unsplash.com/photo-1762217235246-4235328d882b`
   - 테마: 다크 판타지 분위기
   - 사용: scene-5 (첫 조우)

3. `https://images.unsplash.com/photo-1618121070660-60fd94c60588`
   - 테마: 어두운 중세 도시
   - 사용: scene-7 (마을의 소문)

4. `https://images.unsplash.com/photo-1757083840090-17a7bfca08c0`
   - 테마: 중세 검/무기
   - 사용: scene-12 (손목 장치)

5. `https://images.unsplash.com/photo-1694065197372-65e3fdd0e236`
   - 테마: 폭풍 구름 (드라마틱)
   - 사용: scene-21 (분노)

6. `https://images.unsplash.com/photo-1631422248936-f6804d03929c`
   - 테마: 신비로운 밤하늘
   - 사용: scene-27 (새로운 신호), ending-success (부분적 승리)

7. `https://images.unsplash.com/photo-1598177183308-ec8555cbfe76`
   - 테마: 고대 유적/신전
   - 사용: scene-28-rest (준비된 출발)

#### Phase 2 이미지 (추가 교체)

8. `https://images.unsplash.com/photo-1713539282037-cf04d2af97cc`
   - 테마: 고딕 성 내부
   - 사용: scene-8 (연구실 선택)

9. `https://images.unsplash.com/photo-1547754440-19878c025ea5`
   - 테마: 어두운 마법 불꽃
   - 사용: scene-10 (계약 목격)

10. `https://images.unsplash.com/photo-1680552606273-d427f312a32e`
    - 테마: 중세 복도 어둠
    - 사용: scene-9-stealth (잠입)

11. `https://images.unsplash.com/photo-1690648682002-9e9dedb3e2ec`
    - 테마: 신비로운 빛과 그림자
    - 사용: scene-11-interrupt (중단), scene-20-persuade (설득 성공), scene-30-persuade (진심의 설득)

12. `https://images.unsplash.com/photo-1501314009489-f2e554b89422`
    - 테마: 고대 도서관/서적
    - 사용: scene-19 (계약서명), scene-29 (마지막 대화)

13. `https://images.unsplash.com/photo-1760876719577-8a6f5a416cdb`
    - 테마: 다크 판타지 분위기
    - 사용: scene-11-watch (관찰), scene-20-grab (실패), scene-28-rush (무모한 출발)

#### Phase 3 이미지 (최종 추가 교체)

14. `https://images.unsplash.com/photo-1483982258113-b72862e6cff6`
    - 테마: 어두운 숲 밤
    - 사용: scene-4-normal (신중한 추적)

15. `https://images.unsplash.com/photo-1614638964097-20e7104dea3c`
    - 테마: 숲길 신비로움
    - 사용: scene-14-prepared (숲 속 추적)

16. `https://images.unsplash.com/photo-1641692261192-6fa12c9a8047`
    - 테마: 갈림길 밤 어둠
    - 사용: scene-15 (갈림길)

17. `https://images.unsplash.com/photo-1739287700815-7eef4abaab4d`
    - 테마: 스마트워치 (기술)
    - 사용: scene-12 (손목 장치) [Phase 3에서 교체됨]

#### Phase 4 이미지 (품질 개선 및 테마 정확화)

18. `https://images.unsplash.com/photo-1694077743594-7b82dacafaf2`
    - 테마: 스마트워치 손목 클로즈업
    - 사용: scene-12 (손목 장치) - 더 정확한 스마트워치 이미지

19. `https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d`
    - 테마: Apple Watch 화면
    - 사용: scene-26-defeat (패배) - 밤하늘의 별로 교체됨 (Phase 8)

20. `https://images.unsplash.com/photo-1762920738995-f393efe82205`
    - 테마: 갈림길 선택 경로
    - 사용: scene-15 (갈림길) - 더 명확한 갈림길 이미지

21. `https://images.unsplash.com/photo-1639066299177-e35236880e00`
    - 테마: 찬란한 빛 광선
    - 사용: scene-18-ultimate (필살기: 빛의 심판) - 빛의 효과 극대화

22. `https://images.unsplash.com/photo-1725274122395-2af943d6f740`
    - 테마: 절벽 위 수도원 (산악 배경)
    - 사용: scene-21-saved (구원의 빛) - 수도원 배경

23. `https://images.unsplash.com/photo-1629793671328-f6842772a661`
    - 테마: 수도원 회랑/벤치 (정원)
    - 사용: scene-27-injured (일주일 후) - 수도원 침대 장면

#### Phase 5 이미지 (홀로그램/미래 인터페이스)

24. `https://images.unsplash.com/photo-1669054626218-f0b57b8ec632`
    - 테마: 매트릭스 스타일 디지털 코드 (사이버틱)
    - 사용: scene-1 (시스템 알림) - 디지털 전산 인터페이스

#### Phase 6 이미지 (판타지 장비/무기)

25. `https://images.unsplash.com/photo-1662122233713-a302ca091776`
    - 테마: 가죽 가방/장비 (말 안장 스타일)
    - 사용: scene-2-equipment (헌터의 장비) - 배낭과 장비

#### Phase 7 이미지 (테마 정확화 및 품질 개선)

26. `https://images.unsplash.com/photo-1758607235408-555a82671263`
    - 테마: 버려진 빈 집 내부
    - 사용: scene-13-rest (전략적 휴식) - 휴식 장소

27. `https://images.unsplash.com/photo-1614638964097-20e7104dea3c`
    - 테마: 어두운 숲길
    - 사용: scene-15-injured (상처 입은 헌터) - 숲 속에 쓰러짐

28. `https://images.unsplash.com/photo-1741276525729-ad7073c0685b`
    - 테마: 어두운 동굴 내부
    - 사용: scene-17-boss (동굴의 대결) - 보스전 장소

29. `https://images.unsplash.com/photo-1502957291543-d85480254bf8`
    - 테마: 밤하늘의 별
    - 사용: scene-29-bad (완전한 패배) - 하늘을 보며 쓰러짐

30. `https://images.unsplash.com/photo-1758525747606-bd5d801ca87b`
    - 테마: 스마트워치 화면 디스플레이
    - 사용: ending-failure (사냥 실패) - 손목 장치 확인

#### Phase 8 이미지 (패배 장면 통일)

31. `https://images.unsplash.com/photo-1502957291543-d85480254bf8`
    - 테마: 밤하늘의 별
    - 사용: scene-26-defeat (패배), scene-29-bad (완전한 패배) - 하늘을 보며 쓰러지는 장면 통일

#### Phase 9 이미지 (판타지 마법 장비 개선)

32. `https://images.unsplash.com/photo-1662122233713-a302ca091776`
    - 테마: 가죽 가방/장비 (미용 장비처럼 보임 ❌)
    - 제거 이유: 판타지 마법 장비가 아닌 현대적 미용/의료 장비처럼 보여 부적절
    - 교체 전 사용: scene-2-equipment (헌터의 장비)
    - 교체 후: `photo-1668007470566-bd1e18d05fe6` (판타지 마법 검)

#### Phase 10 이미지 (커다란 문 이미지 개선)

33. `https://images.unsplash.com/photo-1532798442725-41036acc7489`
    - 테마: 불명확한 배경
    - 제거 이유: "문을 박차고" 장면에 문이 명확하게 보이지 않음
    - 교체 전 사용: scene-9-front (문을 박차고)
    - 교체 후: `photo-1690114654614-0aaf2686b117` (고딕 중세 대문)

---

## 📊 교체 완료 현황

### ✅ 완전 제거된 부적절한 이미지
- `photo-1507003211169-0a1dd7228f2d` (6곳 → 0곳) ✅
- `photo-1758730010177-1711515b7552` (7곳 → 0곳) ✅
- `photo-1590342833877-0cb275491d26` (4곳 → 0곳) ✅
- `photo-1631217868264-e5b90bb7e133` (4곳 → 0곳) ✅
- `photo-1666214280557-f1b5022eb634` (4곳 → 0곳) ✅ **인종차별 우려로 완전 제거**

**총 27곳 교체 완료!** 🎉🎉🎉

### 🚨 최신 업데이트 (2025-11-22)

**인종차별 우려 이미지 긴급 교체:**
- `photo-1666214280557-f1b5022eb634` (흑인 아이 포함 사진)
  * scene-5-mercy → `photo-1704550208718-6fc116d60a7d` (다크 판타지 폐허)
  * scene-14 (좀비 군단) → `photo-1686164194855-e4d37f4e7c2d` (좀비 아포칼립스) ⭐
  * scene-15-injured-reflect → `photo-1716854029896-a2d7b34d3052` (포스트 아포칼립스 폐허)
  * scene-23-skill (기술의 싸움) → `photo-1549656177-e245e8e6b292` (전투 폐허) ⭐

**교체 사유:** 특정 인종을 부정적 맥락(좀비, 전투 피해)과 연결하여 인종차별로 해석될 수 있음

**대체 이미지 기준:**
- ✅ 사람이 없는 풍경/건축물
- ✅ 좀비/몬스터 테마는 실제 크리처나 폐허로 대체
- ✅ 전투 장면은 무기/환경으로 표현

### 🎨 Phase 4: 품질 개선 (6곳 추가 교체)
- 손목 장치 페이지: 더 정확한 스마트워치 이미지 ✅
- 사냥 실패 페이지: Apple Watch 화면 이미지 ✅
- 갈림길 페이지: 명확한 분기점 이미지 ✅
- 필살기 페이지: 찬란한 빛 효과 ✅
- 수도원 배경 2곳: 실제 수도원 이미지 ✅

**Phase 4 총 6곳 개선 완료!** 🌟

### 🔮 Phase 5: 홀로그램 인터페이스 (1곳 추가)
- 시스템 알림 페이지: 홀로그램 디스플레이 ✅

**Phase 5 총 1곳 개선 완료!** ⚡

### ⚔️ Phase 6: 판타지 장비/무기 (1곳 추가)
- 헌터의 장비 페이지: 판타지 검 ✅

**Phase 6 총 1곳 개선 완료!** 🗡️

### 🌟 Phase 7: 테마 정확화 및 품질 개선 (4곳 추가)
- 휴식 장소 페이지: 버려진 빈 집 내부 ✅
- 상처 입은 헌터 페이지: 어두운 숲길 ✅
- 보스전 장소 페이지: 어두운 동굴 내부 ✅
- 완전한 패배 페이지: 밤하늘의 별 ✅
- 사냥 실패 페이지: 스마트워치 화면 디스플레이 ✅

**Phase 7 총 4곳 개선 완료!** 🌟

### 🌟 Phase 8: 패배 장면 통일 (1곳 추가)
- 패배 페이지: 밤하늘의 별 ✅
- 완전한 패배 페이지: 밤하늘의 별 ✅

**Phase 8 총 1곳 개선 완료!** 🌟

### ⚔️ Phase 9: 판타지 마법 장비 이미지 개선 (1곳 추가)
- 헌터의 장비 페이지: 판타지 마법 무기로 교체 ✅

**Phase 9 총 1곳 개선 완료!** 🗡️

### 🚪 Phase 10: 커다란 문 이미지 개선 (1곳 추가)
- 문을 박차고 페이지: 고딕 중세 대문으로 교체 ✅

**Phase 10 총 1곳 개선 완료!** 🚪

---

## 🐛 버그 수정

### 무한 루프 버그 수정 ✅

**문제:** `scene-27-injured` → `scene-28` (존재하지 않는 ID)
- `scene-27-injured`에서 '일어선다' 선택지가 존재하지 않는 `scene-28`로 연결
- `scene-28-rush`와 `scene-28-rest`만 존재하여 무한 루프 발생

**해결:** `scene-27-injured` → `ending-failure`로 수정
- 논리적으로 일주일간 의식을 잃고 계약이 이미 완료된 상황이므로 실패 엔딩이 적합
- 무한 루프 문제 해결 ✅

---

## 📋 이미지 선택 가이드라인

### ✅ 적합한 이미지
- 판타지 분위기 (어둡고 신비로운)
- 자연 경관 (숲, 하늘, 폭풍 등)
- 건축물 (중세 성, 유적, 도시)
- 추상적 이미지 (빛, 그림자, 효과)
- 무기/장비 (검, 갑옷 등)
- 마법적 요소 (불꽃, 포털, 마법진 등)
- 고딕/다크 판타지 스타일

### ❌ 부적합한 이미지
- **사람 얼굴/초상 사진** (가장 중요!)
- 현대적 배경 (도시, 건물, 차량 등)
- 일상적 사진
- 밝고 경쾌한 분위기
- 만화/일러스트 (실사 추구)
- 현대 의상을 입은 인물

---

## 🔍 검증 방법

파일에서 블랙리스트 이미지 검색:
```bash
grep -r "photo-1507003211169" stories/
grep -r "photo-1758730010177" stories/
grep -r "photo-1590342833877" stories/
grep -r "photo-1631217868264" stories/
grep -r "photo-1666214280557" stories/
```

모두 0개 결과여야 함! ✅

---

**마지막 업데이트:** 2025-01-22
**담당자:** AI Assistant
**작업:** 파우스트 작품 19곳 이미지 교체 완료
# 📘 버전 업데이트 가이드

**버전:** 1.0.5  
**최종 업데이트:** 2025-01-XX

---

## 📌 개요
이 앱은 **자동 버전 체크 시스템**과 **수동 업데이트 버튼**을 모두 제공하여, 사용자가 언제나 최신 버전을 사용할 수 있도록 보장합니다.

**v1.0.5 주요 개선사항:** 🔥
- **강력한 캐시 무효화:** Service Worker 등록 해제 + 완전한 캐시 삭제
- **안네의 일기 추가:** 중학교 1학년 작품 목록에 추가
- **비동기 처리 개선:** 모든 캐시 작업을 await로 완료 후 새로고침

### **🎯 2가지 업데이트 방식**
1. **자동 알림** - 새 버전 감지 시 화면 상단에 배너 표시
2. **수동 버튼** - 첫 화면 우측 상단의 "🔄 최신 버전" 버튼

---

## 🚀 업데이트 배포 방법 (3단계)

### **1️⃣ 버전 번호 변경**
`/App.tsx` 파일의 8번 줄에서 `APP_VERSION`을 업데이트하세요.

```typescript
// 기존 버전
const APP_VERSION = '1.0.0';

// 새 버전으로 변경 (예시)
const APP_VERSION = '1.0.1';
```

#### **버전 번호 규칙 (Semantic Versioning)**
```
주 버전.부 버전.패치
 ↓      ↓     ↓
1  .   0  .  1

- 주 버전 (Major): 대규모 기능 변경, 호환성 깨짐
- 부 버전 (Minor): 새로운 기능 추가, 하위 호환성 유지
- 패치 (Patch): 버그 수정, 작은 개선
```

#### **예시**
| 변경 내용 | 버전 변경 |
|-----------|-----------|
| UI 색상 수정 | 1.0.0 → 1.0.1 |
| 스크롤바 개선 | 1.0.1 → 1.0.2 |
| 새 프리퀄 스토리 추가 | 1.0.2 → 1.1.0 |
| 전체 UI 리뉴얼 | 1.1.0 → 2.0.0 |

---

### **2️⃣ 앱 배포**
- 변경 사항을 커밋하고 배포 플랫폼(Vercel, Netlify 등)에 푸시합니다.
- 배포가 완료되면 자동으로 새 버전이 사용자에게 전달됩니다.

---

### **3️⃣ 완료!**
사용자가 앱에 접속하면 **자동으로 업데이트 배너**가 표시됩니다!

---

## 🎨 사용자 경험 플로우

### **시나리오 1: 자동 업데이트 배너** 🔔

#### **기존 사용자 (캐시된 버전 사용 중)**

```
1️⃣ 사용자가 앱 접속
   ↓
2️⃣ 자동으로 버전 체크
   ↓
3️⃣ 새 버전 감지!
   ↓
4️⃣ 화면 상단에 업데이트 배너 표시
   ┌─────────────────────────────────────┐
   │ ✨ 새 버전이 출시되었습니다!        │
   │ 최신 기능과 개선사항을 이용하려면... │
   │ [🚀 지금 업데이트] [나중에]        │
   └─────────────────────────────────────┘
   ↓
5️⃣ 사용자 선택:
   
   A) "지금 업데이트" 클릭
      → 캐시 지우기 → 자동 새로고침 → 최신 버전 사용 ✅
   
   B) "나중에" 클릭
      → 배너 닫힘 → 다음 방문 시 다시 알림
```

#### **배너가 안 보이는 경우 (App.tsx도 캐시됨)**
```
문제: App.tsx 자체가 캐시되어 버전 체크 로직이 실행되지 않음
해결: 👇
```

---

### **시나리오 2: 수동 업데이트 버튼** 🔄

```
1️⃣ 사용자가 첫 화면 우측 상단 확인
   
   ┌────────────────────────────┐
   │                    [🔄최신버전]│  ← 우측 상단 고정!
   │                            │
   │   디지털 독서 게임          │
   │   [학년 선택]              │
   │   [작품 선택]              │
   │   [게임 시작하기]          │
   │                            │
   │   💡 안내 메시지           │
   │                            │
   │   [InblanQ 로고]           │
   └────────────────────────────┘
   ↓
2️⃣ "🔄 최신 버전" 버튼 클릭
   ↓
3️⃣ 자동으로:
   - 모든 캐시 삭제 (Service Worker, 브라우저 캐시)
   - 강제 새로고침
   - 최신 버전 다운로드 ✅
   ↓
4️⃣ 최��� 버전으로 앱 실행!
```

---

### **신규 사용자**
- 항상 최신 버전을 다운로드하므로 배너가 표시되지 않습니다.
- 업데이트 버튼은 보이지만 클릭해도 변화 없음 (이미 최신 버전)

---

## 🔧 작동 원리

### **1. 버전 저장**
```typescript
// localStorage에 현재 버전 저장
localStorage.setItem('appVersion', '1.0.0');
```

### **2. 버전 비교**
```typescript
const savedVersion = localStorage.getItem('appVersion'); // '1.0.0'
const APP_VERSION = '1.0.1'; // 새 버전

if (savedVersion !== APP_VERSION) {
  // 업데이트 배너 표시!
}
```

### **3. 업데이트 실행**
```typescript
// "지금 업데이트" 버튼 클릭 시
const handleUpdate = () => {
  localStorage.setItem('appVersion', '1.0.1'); // 새 버전 저장
  window.location.reload(); // 강제 새로고침 (캐시 무시)
};
```

---

## 💡 고급 기능

### **1. 특정 기능 강제 업데이트**
중요한 버그 수정이나 보안 패치가 있을 때 "나중에" 버튼을 숨길 수 있습니다.

```typescript
// App.tsx에서 수정
const FORCE_UPDATE = true; // 강제 업데이트 활성화

{showUpdateBanner && (
  <div>
    {/* "지금 업데이트" 버튼만 표시 */}
    <button onClick={handleUpdate}>🚀 지금 업데이트</button>
    
    {/* 강제 업데이트가 아닐 때만 "나중에" 버튼 표시 */}
    {!FORCE_UPDATE && (
      <button onClick={handleUpdateLater}>나중에</button>
    )}
  </div>
)}
```

### **2. 버전별 메시지 커스터마이징**
```typescript
// 버전별로 다른 메시지 표시
const getUpdateMessage = (version: string) => {
  const messages: Record<string, string> = {
    '1.1.0': '🎉 새로운 프리퀄 스토리가 추가되었습니다!',
    '1.0.5': '🐛 중요한 버그가 수정되었습니다.',
    '2.0.0': '🌟 완전히 새로워진 디자인을 만나보세요!',
  };
  
  return messages[version] || '최신 기능과 개선사항을 이용하려면 업데이트하세요.';
};
```

### **3. 업데이트 알림 빈도 조절**
```typescript
// 하루에 한 번만 알림 표시
const lastDismissTime = localStorage.getItem('updateDismissTime');
const now = Date.now();
const ONE_DAY = 24 * 60 * 60 * 1000;

if (!lastDismissTime || now - parseInt(lastDismissTime) > ONE_DAY) {
  setShowUpdateBanner(true);
}

const handleUpdateLater = () => {
  localStorage.setItem('updateDismissTime', now.toString());
  setShowUpdateBanner(false);
};
```

---

## 🎯 체크리스트

업데이트 배포 전 확인사항:

- [ ] `APP_VERSION` 번호 변경 완료
- [ ] 변경 사항 테스트 완료
- [ ] Git 커밋 메시지에 버전 번호 포함 (예: "v1.0.1: 스크롤바 개선")
- [ ] 배포 완료
- [ ] 실제 환경에서 업데이트 배너 확인

---

## 🐛 트러블슈팅

### **문제 1: 업데이트 배너가 계속 표시됨**
**해결:** 브라우저 개발자 도구 → Application → Local Storage → `appVersion` 삭제 후 새로고침

---

### **문제 2: 업데이트 배너가 표시되지 않음**
**원인:** 이미 최신 버전을 사용 중이거나 localStorage에 현재 버전이 저장됨  
**해결:** localStorage의 `appVersion`을 이전 버전으로 변경하여 테스트

```javascript
// 브라우저 콘솔에서 실행
localStorage.setItem('appVersion', '0.9.0'); // 이전 버전으로 설정
location.reload(); // 새로고침 → 업데이트 배너 표시됨
```

---

### **문제 3: 최신 버전 버튼을 눌러도 새 작품이 안 보임** 🔥

**원인:** 강력한 브라우저 캐시 때문  
**해결:** v1.0.5부터 완전히 해결됨!

#### **v1.0.5 개선 사항** ✨

기존 `handleForceRefresh` 함수의 문제:
```typescript
// ❌ 문제가 있는 기존 코드
const handleForceRefresh = () => {
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => caches.delete(name));
    });
  }
  window.location.reload(); // 비동기 완료 전에 실행됨!
};
```

**문제점:**
1. `caches.delete()`는 비동기인데 기다리지 않고 바로 `reload()` 호출
2. Service Worker가 여전히 활성화되어 있음
3. `window.location.reload()`는 기본적으로 캐시 사용 가능

**개선된 코드 (v1.0.5):**
```typescript
// ✅ 강력한 캐시 무효화
const handleForceRefresh = async () => {
  try {
    // 1단계: Service Worker 등록 해제 (가장 중요!)
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (let registration of registrations) {
        await registration.unregister();
      }
      console.log('✅ Service Worker 등록 해제 완료');
    }
    
    // 2단계: 모든 캐시 삭제 (비동기 대기)
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('✅ 모든 캐시 삭제 완료:', cacheNames);
    }
    
    // 3단계: localStorage 버전 업데이트
    localStorage.setItem('appVersion', APP_VERSION);
    console.log('✅ 버전 업데이트:', APP_VERSION);
    
    // 4단계: 타임스탬프를 추가하여 강제 새로고침 (캐시 우회)
    const timestamp = Date.now();
    window.location.href = window.location.pathname + '?v=' + APP_VERSION + '&t=' + timestamp;
    
  } catch (error) {
    console.error('❌ 캐시 지우기 실패:', error);
    window.location.reload();
  }
};
```

**개선 효과:**
- ✅ Service Worker 완전 제거
- ✅ 모든 캐시 100% 삭제 (await 사용)
- ✅ URL에 타임스탬프 추가로 캐시 우회
- ✅ 콘솔 로그로 진행 상황 확인 가능

**사용자 경험:**
```
사용자가 "🔄 최신 버전" 버튼 클릭
   ↓
[콘솔] ✅ Service Worker 등록 해제 완료
   ↓
[콘솔] ✅ 모든 캐시 삭제 완료: [...]
   ↓
[콘솔] ✅ 버전 업데이트: 1.0.5
   ↓
페이지 새로고침 (URL에 ?v=1.0.5&t=1234567890 추가)
   ↓
✨ 최신 작품 목록 표시! (안네의 일기 포함)
```

---

### **추가 디버깅 방법** 🔍

#### **1. 브라우저 개발자 도구에서 확인**
```
F12 → Console 탭
최신 버전 버튼 클릭 → 다음 로그 확인:
✅ Service Worker 등록 해제 완료
✅ 모든 캐시 삭제 완료: [...]
✅ 버전 업데이트: 1.0.5

로그가 안 보이면 문제가 있는 것!
```

#### **2. Service Worker 수동 삭제**
```
F12 → Application 탭 → Service Workers
→ 등록된 Service Worker 찾기
→ [Unregister] 버튼 클릭
→ 페이지 새로고침
```

#### **3. 캐시 수동 삭제**
```
F12 → Application 탭 → Cache Storage
→ 모든 캐시 항목 우클릭
→ [Delete] 선택
→ 페이지 새로고침
```

#### **4. 하드 리로드 (Chrome/Edge)**
```
F12 열기 → 새로고침 버튼 우클릭 → "캐시 비우기 및 강력 새로고침" 선택
또는:
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

#### **5. 시크릿 모드 테스트**
```
Ctrl + Shift + N (Chrome/Edge)
Ctrl + Shift + P (Firefox)
→ 시크릿 모드에서 앱 접속
→ 캐시 없이 최신 버전 확인
```

---

### **완벽한 캐시 삭제 체크리스트** ✅

사용자가 최신 버전을 보지 못할 때:

1. [ ] 우측 상단 "🔄 최신 버전" 버튼 클릭
2. [ ] F12 → Console에서 ✅ 로그 3개 확인
3. [ ] 여전히 안 보이면: 시크릿 모드에서 테스트
4. [ ] 시크릿 모드에서 보이면: 브라우저 캐시 문제 확정
5. [ ] 해결: Service Worker 수동 삭제 + 캐시 수동 삭제
6. [ ] 최종 수단: 브라우저 설정 → 인터넷 사용 기록 삭제

---

## 📊 버전 관리 모범 사례

### **권장 릴리즈 주기**
```
주요 업데이트 (Major): 3-6개월
기능 추가 (Minor): 2-4주
버그 수정 (Patch): 필요시 즉시
```

### **변경 이력 관리**
`CHANGELOG.md` 파일을 만들어 버전별 변경사항 기록 권장:

```markdown
# 변경 이력

## [1.0.1] - 2024-01-15
### 개선
- 스크롤 진행 바 길이 증가 (화면 높이의 89%)
- 업데이트 알림 배너 추가

### 수정
- 이름 입력 후 오류 메시지 깜빡임 수정

## [1.0.0] - 2024-01-10
### 최초 릴리즈
- 디지털 독서 게임 프리퀄 생성 기능
- 중학교 1학년 4개 작품 지원
```

---

## 🎓 요약

### **개발자가 할 일**
1. `APP_VERSION` 번호 변경 (1줄 수정)
2. 배포

### **자동으로 처리되는 것**
1. ✅ 버전 감지
2. ✅ 업데이트 배너 표시
3. ✅ 캐시 무시 새로고침
4. ✅ 사용자 선택권 제공

**간단하지만 강력한 업데이트 시스템! 🚀**
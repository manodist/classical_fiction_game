import type { Scene } from '../../types';

function createNameVariations(lastName: string, firstName: string) {
  const fullName = lastName + firstName;
  const hasJongseong = (name: string) => {
    const lastChar = name.charCodeAt(name.length - 1);
    return (lastChar - 0xac00) % 28 > 0;
  };

  const firstHasJongseong = hasJongseong(firstName);

  return {
    full: fullName,
    first: firstName,
    은는: firstName + (firstHasJongseong ? '은' : '는'),
    이가: firstName + (firstHasJongseong ? '이' : '가'),
    을를: firstName + (firstHasJongseong ? '을' : '를'),
    의: firstName + '의',
    casual: firstName + '아',
    polite: fullName + ' 학생',
  };
}

export function generateLittlePrinceStory(
  gradeLevel: string,
  lastName: string,
  firstName: string
): Scene[] {
  const name = createNameVariations(lastName, firstName);

  return [
    {
      id: 'start',
      title: '사막의 무한 루프',
      text: `너의 이름은 ${name.full}.

...아니, 잠깐. 넌 여우잖아?
사실 여우에게 이름 같은 건 큰 의미가 없어.

사막 생활 5년차.
매일이 복붙의 연속이야.

오전 7시 - 기상 (알람 없이도 정확함) ⏰
오전 8시 - 아침 사냥 🦊
정오 12시 - 낮잠 😴
오후 5시 - 저녁 사냥 🍗
밤 10시 - 취침 💤

루틴을 지키는 건 좋은데...
이게 살아있는 건지 프로그램된 건지 헷갈려.

"이거 시뮬레이션 아니냐고?" 
가끔 하늘을 보며 생각해.`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '오늘도 루틴대로 간다 (MBTI J)', to: 'routine_master', cls: 'bg-blue-200' },
        { label: '오늘은 좀 다르게 살아본다 (MBTI P)', to: 'rebel_mode', cls: 'bg-pink-200' }
      ],
      prompt: '💭 반복되는 일상 = 안정적인 삶? 아니면 정체된 삶?'
    },
    {
      id: 'routine_master',
      title: '루틴의 달인 (근데 이제 지루함을 곁들인)',
      text: `오늘도 어김없이 7시 기상.
생체시계가 정확해서 알람이 필요 없어.

"오늘 뭐하지?"
물어볼 것도 없지. 어차피 똑같으니까.

사냥 타겟: 닭 한 마리
예상 소요 시간: 5분
성공률: 99.9%

RPG 게임으로 치면 지금 레벨 999가
레벨 1 슬라임 잡는 느낌?

재미는 제로지만 효율은 완벽해.

근데 문득...
"이게 과연 성공한 인생일까?
아니, 여우니까 호생일까?" 🤔`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '닭을 잡는다 (효율적)', to: 'catch_easy', cls: 'bg-gray-200' },
        { label: '오늘은 닭을 놔준다 (비효율적)', to: 'spare_chicken', cls: 'bg-green-200' }
      ],
      prompt: '💭 100% 성공률의 일상... 성취감이 있을까?'
    },
    {
      id: 'rebel_mode',
      title: '반란의 시작 (작은 것부터)',
      text: `"오늘은 다르게 살아볼까?"

7시 5분에 일어났어.
...뭐야, 별거 아니잖아?

그래도 5분이면 5분이야.
이것도 변화는 변화지.

평소와 다른 방향으로 걸어봤어.
동쪽? 서쪽? 
어차피 다 모래야. 😅

근데 신기하게...
뭔가 기대되는 느낌?

인사이드 아웃으로 치면 지금 내 머릿속:
기쁨이: "신난다!"
불안이: "길 잃으면?"
슬픔이: "헛수고일듯"
버럭이: "시간낭비야!"`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '모험을 계속한다', to: 'explore_new', cls: 'bg-yellow-200' },
        { label: '역시 익숙한 게 최고야', to: 'back_comfort', cls: 'bg-gray-200' }
      ],
      prompt: '💭 변화 = 성장의 기회? 아니면 불필요한 리스크?'
    },
    {
      id: 'catch_easy',
      title: '3분 컷 (스피드런 성공)',
      text: `3분 만에 끝.
닭도 놀랐어. "벌써?"

배는 부른데 마음은 공허해.
이게 뭔가 잘못됐다는 느낌.

게임으로 치면:
- 획득 경험치: 0 (레벨업 불가)
- 성취감: 0%
- 공허함: 100%

"너무 쉬운 게임은 재미없다"는 걸
이제야 깨달았어.

문득 든 생각:
"내 인생에 보스전은 언제 오는 거지?"`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '의미를 찾아 떠난다', to: 'search_meaning', cls: 'bg-purple-200' },
        { label: '그냥 이렇게 산다', to: 'give_up', cls: 'bg-gray-200' }
      ],
      prompt: '💭 쉬운 게임 vs 어려운 게임, 어느 쪽이 더 가치 있을까?'
    },
    {
      id: 'spare_chicken',
      title: 'Plot Twist: 오늘 닭은 프리패스',
      text: `닭을 그냥 놔줬어.

닭: "꼬꼬?" (뭐야 왜 안 잡아?)
나: "오늘 기분이 그래."
닭: "???"

5초... 10초... 30초...

닭이 멀뚱멀뚱 쳐다보다가
조심스럽게 걸어가.

이 순간 깨달았어.
"내가 선택을 바꾸니까 상황도 바뀌네?"

마치 선택지가 있는 게임처럼.

근데 이게... 생각보다 기분 좋은데?
처음으로 "내가 결정했다"는 느낌이야.`,
      bg: 'https://images.unsplash.com/photo-1696831387725-d758c9a54c26',
      choices: [
        { label: '닭을 따라가본다 (호기심)', to: 'follow_chicken', cls: 'bg-yellow-200' },
        { label: '이 느낌을 음미한다 (힐링)', to: 'feel_free', cls: 'bg-pink-200' }
      ],
      prompt: '💭 작은 선택 하나가 세상을 바꿀 수 있을까?'
    },
    {
      id: 'explore_new',
      title: '미지의 영역 진입 (모험가 모드 ON)',
      text: `모래 언덕 하나, 둘, 셋...
한 시간쯤 걸었을까?

발견한 것: 모래, 모래, 그리고 모래.

"야 이거 사기 아니냐?" 😤

근데 잠깐.
정말 아무것도 없을까?

바람 소리 - 처음 들어봐 이렇게 귀 기울여서.
햇살 반짝임 - 각도마다 다르게 빛나네.
내 발자국 - 여기 내가 있었다는 증거.

보이는 건 "모래"지만
경험하는 건 "순간"이야.

유튜브 숏츠 vs 영화의 차이 같은 거?
빠르게 스크롤 vs 천천히 몰입.`,
      bg: 'https://images.unsplash.com/photo-1721147238844-6ece27ae644f',
      choices: [
        { label: '발자국을 되돌아본다', to: 'look_back', cls: 'bg-blue-200' },
        { label: '계속 앞으로 간다', to: 'keep_going', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 눈에 보이는 것만이 전부일까?'
    },
    {
      id: 'back_comfort',
      title: '컴포트 존의 포로',
      text: `역시 익숙한 게 최고야.
알던 바위, 알던 선인장, 알던 모래 언덕.

근데... 뭔가 답답해.

넷플릭스 알고리즘 같아.
내가 좋아할 만한 것만 추천해주는 거.

새로운 건 없고,
챌린지도 없고,
성장도 없어.

안전하지만 지루해.
편하지만 갑갑해.

"이게 내가 원하던 거였나?"

알고리즘에 갇힌 기분.
추천 영상만 보다가 인생 끝나는 거 아냐? 😰`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '알고리즘 탈출 시도', to: 'explore_new', cls: 'bg-red-200' },
        { label: '그냥 편한 게 좋아', to: 'stay_comfort', cls: 'bg-green-200' }
      ],
      prompt: '💭 안전한 무료함 vs 위험한 새로움, 뭘 선택할까?'
    },
    {
      id: 'follow_chicken',
      title: '예상 못한 동맹',
      text: `닭을 살살 따라갔어.

닭이 어디로 가는지 궁금했거든.

선인장 아래로 가더니...
오! 물웅덩이 발견!

닭: "꼬꼬꼬!" (여기 물 있어!)
*뒤돌아보며 눈빛*

"아... 고마워?" 😳

처음이야. 닭이랑 소통한 거.
지금까지는 그냥 "먹이" 였는데
이제는 "알려주는 존재"가 됐어.

관계가 변하니까
세상이 다르게 보이네.

일방적 관계 → 상호작용
이게 바로... 특별함의 시작?`,
      bg: 'https://images.unsplash.com/photo-1620509400919-a2ef8294f239',
      choices: [
        { label: '닭과 친구 되기 프로젝트', to: 'befriend_chicken', cls: 'bg-pink-200' },
        { label: '물만 마시고 쿨하게 헤어짐', to: 'cool_goodbye', cls: 'bg-blue-200' }
      ],
      prompt: '💭 관계가 대상을 특별하게 만드는 걸까?'
    },
    {
      id: 'feel_free',
      title: '자유의 맛 (처음 맛보는 감각)',
      text: `그 자리에 그냥 앉았어.

할 일? 없어.
가야 할 곳? 없어.
지켜야 할 루틴? 오늘은 패스.

바람이 불고, 모래가 날리고,
해가 천천히 기울어.

스마트폰으로 사진 찍을 수도 없어.
(애초에 없으니까)

근데 오히려 좋아.
사진 찍느라 순간을 놓치는 것보다
지금 이 순간을 온전히 느끼는 게 나아.

"기록하지 않아도 기억은 남는다"

...명언 뽑았다! ✨`,
      bg: 'https://images.unsplash.com/photo-1601999025038-ee1249ae8df4',
      choices: [
        { label: '시간의 의미를 생각해본다', to: 'think_time', cls: 'bg-purple-200' },
        { label: '더 많은 순간 수집하러 간다', to: 'collect_moments', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 기록 vs 경험, 뭐가 더 중요할까?'
    },
    {
      id: 'search_meaning',
      title: '의미 찾기 대장정',
      text: `"의미가 뭐야?" 하고 걷기 시작.

다른 동물들한테 물어봤어.

뱀: "먹고 사는 거지 뭐." 😎
도마뱀: "햇볕 쬐는 게 최고임." 🦎
전갈: "강한 놈이 살아남아." 🦂

각자 다 다른 대답.

근데 공통점:
아무도 행복해 보이지 않음.

뱀은 항상 배고프고,
도마뱀은 심심해 보이고,
전갈은 외로워 보여.

"혹시 의미는 정답이 없는 거 아냐?"

철학적으로 깊어지는 중... 🤔`,
      bg: 'https://images.unsplash.com/photo-1657319717882-e04f8c1a1b74',
      choices: [
        { label: '뱀 따라하기 (현실주의)', to: 'snake_way', cls: 'bg-gray-200' },
        { label: '나만의 의미 만들기 (창조주의)', to: 'create_meaning', cls: 'bg-purple-200' }
      ],
      prompt: '💭 의미는 찾는 것? 만드는 것?'
    },
    {
      id: 'give_up',
      title: '포기한 자의 일상 (근데 이제 공허함을 곁들인)',
      text: `그냥 살기로 했어.
생각하면 머리만 아프잖아.

한 달 후...
반년 후...
1년 후...

여전히 똑같아.

어느 날 밤, 별을 보며 생각했어.

"저 별들도 매일 같은 자리에서 빛나는데
저것들은 행복할까?"

별은 답이 없어.
그냥 빛날 뿐.

근데 차이가 있어.
별은 느끼 못하지만,
난 느낄 수 있어.

느낄 수 있는데 왜 느끼지 않고 살지?

자괴감 +100 😔`,
      bg: 'https://images.unsplash.com/photo-1631108980044-f025e1b3a4e9',
      choices: [
        { label: '다시 도전한다', to: 'search_meaning', cls: 'bg-red-200' },
        { label: '이대로 계속 산다', to: 'eternal_void', cls: 'bg-gray-200' }
      ],
      prompt: '💭 느낄 수 있는 능력을 안 쓰는 건 낭비 아닐까?'
    },
    {
      id: 'look_back',
      title: '흔적의 철학',
      text: `뒤를 돌아봤어.

발자국들이 쭉 이어져 있어.
내가 걸어온 길.

바람이 불면 지워질 거야.
1시간? 아니면 10분?

"영원한 건 없구나."

근데 지금 이 순간,
내 발자국은 확실히 존재해.

사라진다고 무의미한 건 아니야.
오히려 사라지니까 더 소중한 거지.

인스타 스토리 같은 거?
24시간 후 사라지지만
그 순간은 진짜였어.

"영원하지 않아도 의미는 있다" 
명언 하나 더 추가! ✨`,
      bg: 'https://images.unsplash.com/photo-1721147238844-6ece27ae644f',
      choices: [
        { label: '더 많은 흔적 남기기', to: 'make_traces', cls: 'bg-yellow-200' },
        { label: '영원함에 대해 생각하기', to: 'think_eternal', cls: 'bg-purple-200' }
      ],
      prompt: '💭 사라지는 것이기에 더 소중할까?'
    },
    {
      id: 'keep_going',
      title: '끝없는 전진 (포기를 모르는 여우)',
      text: `멈추지 않고 계속 걸었어.

한 시간? 두 시간?
시간 감각이 사라졌어.

그런데... 저 멀리 뭔가 보여!

꽃이었어. 🌸
사막 한가운데 핀 작은 꽃.

"어떻게 여기서...?"

이론적으로 불가능한 일.
물도 없고, 영양분도 없고.

근데 피어있어.

"가끔 세상에는 
설명할 수 없는 아름다움이 있다"

...또 명언 만들었다!
오늘 폼 미쳤다! 😎`,
      bg: 'https://images.unsplash.com/photo-1702906432719-e45b24cc4568?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nbGUlMjByZWQlMjByb3NlJTIwZmxvd2VyfGVufDF8fHx8MTc2MzcxOTYwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '꽃을 지키기로 결심', to: 'protect_flower', cls: 'bg-pink-200' },
        { label: '꽃에게 질문하기', to: 'talk_flower', cls: 'bg-purple-200' }
      ],
      prompt: '💭 설명할 수 없는 것도 가치가 있을까?'
    },
    {
      id: 'befriend_chicken',
      title: '길들이기의 기술 (feat. 닭)',
      text: `매일 같은 시간에 닭을 찾아갔어.

Day 1: 닭 도망감. 
속도: 빛의 속도 ⚡

Day 3: 닭 경계함.
거리: 10m 유지

Day 7: 닭 조금 가까이 옴.
거리: 5m

Day 14: 닭이 기다리고 있음. 😭
"꼬꼬!" (왔구나!)

이 순간 깨달았어.

세상의 수천만 마리 닭 중에서,
이 닭은 이제 나에게 "특별한 닭"이야.

시간 투자 = 관계 레벨업
이게 바로 길들임이구나.`,
      bg: 'https://images.unsplash.com/photo-1696831387725-d758c9a54c26',
      choices: [
        { label: '더 많은 친구 만들기', to: 'make_friends', cls: 'bg-green-200' },
        { label: '이 관계 깊게 파기', to: 'deep_bond', cls: 'bg-pink-200' }
      ],
      prompt: '💭 시간이 관계를 특별하게 만드는 걸까?'
    },
    {
      id: 'cool_goodbye',
      title: '쿨한 헤어짐 (아쉽지만)',
      text: `물 마시고 쿨하게 떠났어.

닭: "꼬꼬..." (가지 마...)
나: "ㅂㅂ 좋은 하루~"

5분 뒤.

"...왜 미안하지?"

친해질 기회를 스스로 차버린 느낌.

며칠 후 그곳 지나갔는데
닭이 없어.

"그때 조금만 더 있을걸..."

요즘 세상이 이래.
스와이프 → 다음
클릭 → 다음
빠르게 넘어가다가 
진짜 연결 기회를 놓치는 거지.

후회 +50 😢`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '다시 닭을 찾으러 간다', to: 'find_chicken_again', cls: 'bg-yellow-200' },
        { label: '새로운 만남 찾기', to: 'new_encounter', cls: 'bg-blue-200' }
      ],
      prompt: '💭 많은 얕은 만남 vs 하나의 깊은 관계?'
    },
    {
      id: 'think_time',
      title: '시간이란 무엇인가 (철학 타임)',
      text: `시계가 있었다면:
똑딱똑딱똑딱...

근데 사막엔 시계가 없어.

아침/저녁 구분만 있고,
배고픔/포만감만 있어.

그런데 말야,
닭을 살려준 그 5초.
시계로는 짧지만
느낌으로는 엄청 길었어.

"시간 = 길이가 아니라 깊이?"

1시간 쇼츠 vs 1시간 영화
같은 1시간인데 느낌이 완전 다르지.

"양보다 질"
또 명언 추가! 오늘 대박이네! ✨`,
      bg: 'https://images.unsplash.com/photo-1631108980044-f025e1b3a4e9',
      choices: [
        { label: '의미 있는 시간 만들기', to: 'meaningful_time', cls: 'bg-purple-200' },
        { label: '시간 더 깊게 탐구하기', to: 'time_deep_dive', cls: 'bg-blue-200' }
      ],
      prompt: '💭 시간의 가치 = 길이? 아니면 의미?'
    },
    {
      id: 'collect_moments',
      title: '순간 콜렉터 (수집가의 함정)',
      text: `더 많은 순간을 찾아 떠났어!

- 노을 맛집 언덕 ✅
- 별빛 핫플 바위 ✅
- 바람 맛집 골짜기 ✅

인스타 갬성 완벽! 
(스마트폰은 없지만)

근데... 뭔가 허전해.

많은 장소를 가봤지만
진짜 경험한 건 없는 느낌?

인스타 vs 일기장의 차이 같은 거.
화려한 사진 vs 진솔한 기록

"100개의 얕은 경험보다
1개의 깊은 경험이 낫다"

...오늘 명언 몇 개째야? 😂`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '한 곳을 깊이 경험하기', to: 'one_place_deep', cls: 'bg-green-200' },
        { label: '계속 수집하기', to: 'keep_collecting', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 많은 경험 vs 깊은 경험?'
    },
    {
      id: 'snake_way',
      title: '뱀 라이프스타일 체험기 (실패)',
      text: `뱀처럼 살아보기로 했어.

"그냥 먹고 살면 돼"

1주일 후...

"...이거 아닌데?" 😑

뱀한테는 맞는 삶이야.
근데 나한테는 아니야.

남의 인생 공략을 따라한다고
내 인생이 풀리는 게 아니구나.

유튜브 "이렇게 하면 성공!" 영상처럼
그건 그 사람 이야기지 내 이야기가 아니야.

Copy & Paste는 코드에만 통해.
인생은 안 통함. 🙅`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '나만의 방식 찾기', to: 'create_meaning', cls: 'bg-purple-200' },
        { label: '다른 방식 시도하기', to: 'try_others', cls: 'bg-blue-200' }
      ],
      prompt: '💭 정답은 밖이 아니라 안에 있는 걸까?'
    },
    {
      id: 'create_meaning',
      title: 'DIY 인생 의미 만들기',
      text: `"내가 원하는 게 뭐지?"

돈? 여기선 쓸모없음.
명예? 아무도 안 봄.
권력? 누굴 지배해?

그럼 뭐가 남아?

- 관계 ❤️
- 경험 ✨
- 감정 💫
- 순간 ⏰

전부 눈에 안 보이고,
저장할 수도 없고,
영원하지도 않아.

근데 이게 진짜 가치 있는 것 같아.

"의미는 만드는 거다"
오늘의 결론! 🎯`,
      bg: 'https://images.unsplash.com/photo-1601999025038-ee1249ae8df4',
      choices: [
        { label: '관계 만들러 가기', to: 'build_connections', cls: 'bg-pink-200' },
        { label: '경험 쌓으러 가기', to: 'gain_experience', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 내가 만든 의미, 그것으로 충분할까?'
    },
    {
      id: 'stay_comfort',
      title: '컴포트 존 최종 보스',
      text: `계속 안전지대에 머물렀어.

한 달... 6개월... 1년...

변한 거? 없어.
성장? 제로.

어느 날 물웅덩이에 비친 내 모습.

"...너 맞아?"

늙었는데 성장은 안 했어.
시간은 흘렀는데 경험은 없어.

"존재했지만 살지는 않았다"

무서운 깨달음.
아직 늦지 않았을까?`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '지금이라도 변화 시도', to: 'last_chance', cls: 'bg-red-200' },
        { label: '그냥 이대로...', to: 'eternal_void', cls: 'bg-gray-200' }
      ],
      prompt: '💭 안전하게 살다가 아무것도 안 한 인생 = 진짜 안전할까?'
    },
    {
      id: 'make_traces',
      title: '흔적 남기기 프로젝트',
      text: `사막 곳곳에 내 흔적을 남겼어.

- 닭 만난 곳 📍
- 꽃 발견한 곳 📍
- 생각한 바위 📍
- 깨달음 얻은 언덕 📍

각 장소마다 이야기가 있어.

"내가 사라지면 누가 알아줄까?"

아무도 몰라.
근데... 괜찮아.

중요한 건 남이 알아주냐가 아니라
내가 경험했느냐니까.

"좋아요 없어도 의미는 있다"
SNS 시대 명언! 👍`,
      bg: 'https://images.unsplash.com/photo-1721147238844-6ece27ae644f',
      choices: [
        { label: '계속 경험 쌓기', to: 'keep_living', cls: 'bg-yellow-200' },
        { label: '지금까지 돌아보기', to: 'reflect_life', cls: 'bg-purple-200' }
      ],
      prompt: '💭 인정받지 못해도 의미 있을까?'
    },
    {
      id: 'think_eternal',
      title: '영원이라는 환상',
      text: `"영원한 게 뭐가 있을까?"

별? 언젠가 꺼져.
사막? 언젠가 바뀌어.
기억? 흐려져.

영원한 건 없어.

근데 역설이 있어:
영원하지 않으니까 더 소중해.

치킨 무제한 vs 마지막 한 조각
뭐가 더 맛있어? 😋

"한정판이 명품인 이유"

영원하면 오히려 무의미해.
사라지니까 의미 있는 거야.`,
      bg: 'https://images.unsplash.com/photo-1631108980044-f025e1b3a4e9',
      choices: [
        { label: '순간의 가치 받아들이기', to: 'accept_moment', cls: 'bg-purple-200' },
        { label: '영원한 것 만들고 싶어', to: 'want_eternal', cls: 'bg-blue-200' }
      ],
      prompt: '💭 영원하지 않아서 더 가치 있는 걸까?'
    },
    {
      id: 'protect_flower',
      title: '꽃집 사장님 되기',
      text: `꽃을 돌보기로 결심!

햇빛 너무 세면 → 그늘 만들기
바람 세게 불면 → 막아주기
목마를 것 같으면 → 물 찾아오기

며칠, 몇 주...

힘들었지만 뿌듯해.

"내가 필요한 존재가 있다"
"내 노력이 의미 있다"

꽃이 조금 자랐어.
1mm? 2mm?

작은 변화지만
나에겐 엄청난 성과!

"돌보는 것이 나를 만든다"
책임감 명언! 📖`,
      bg: 'https://images.unsplash.com/photo-1693159957917-a9d6bc273cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjByZWQlMjByb3NlJTIwY2xvc2V8ZW58MXx8fHwxNzYzNzE5NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '계속 돌보기', to: 'keep_caring', cls: 'bg-pink-200' },
        { label: '책임의 무게 느끼기', to: 'feel_responsibility', cls: 'bg-blue-200' }
      ],
      prompt: '💭 책임이 부담? 아니면 관계의 증거?'
    },
    {
      id: 'talk_flower',
      title: '꽃과의 대화 (feat. 상상력)',
      text: `"너는 왜 여기 있어?"

꽃: "........" (당연히 대답 없음)

"외롭지 않아?"

바람에 꽃잎이 흔들렸어.

"아... 너는 외로움을 모르는구나.
그냥 존재할 뿐이지."

부러웠어.
생각 안 하고,
고민 안 하고,
그냥 존재하는 거.

근데... 그게 진짜 좋을까?

느낄 수 없다면,
생각할 수 없다면,
의미를 찾을 수 없다면...

"생각하는 능력 = 축복"

철학자 됐나봐. 🤔`,
      bg: 'https://images.unsplash.com/photo-1693159957917-a9d6bc273cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjByZWQlMjByb3NlJTIwY2xvc2V8ZW58MXx8fHwxNzYzNzE5NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '생각하는 능력에 감사', to: 'grateful_thinking', cls: 'bg-purple-200' },
        { label: '단순함이 부럽다', to: 'envy_simple', cls: 'bg-green-200' }
      ],
      prompt: '💭 생각할 수 있는 능력 = 축복? 저주?'
    },
    {
      id: 'make_friends',
      title: '친구 모으기 대작전',
      text: `닭 외에도 친구가 생겼어!

- 아침 새 (알람 역할) 🐦
- 물가 도마뱀 (물 위치 알려줌) 🦎
- 밤 쥐 (별 보는 친구) 🐭

각자 다른 개성.
각자 다른 매력.

"모든 존재는 특별해질 수 있다
관심을 주면"

혼자였던 사막이
이제는 커뮤니티가 됐어.

친구 목록:
친구 0명 → 친구 4명

레벨업! 🎉`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '각 관계를 소중히 하기', to: 'value_each', cls: 'bg-green-200' },
        { label: '더 많은 친구 만들기', to: 'more_friends', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 많은 관계가 삶을 풍요롭게 할까?'
    },
    {
      id: 'deep_bond',
      title: '깊이 있는 우정 (with 닭)',
      text: `닭과의 관계가 깊어졌어.

이제는 말 없이도 알아.

닭이 언제 배고픈지,
언제 외로운지,
언제 놀고 싶은지.

말이 통하지 않지만
마음은 통해.

"진정한 소통은
언어를 넘어선 이해"

텔레파시? 
케미? 
찰떡궁합?

뭐라 부르든,
이게 진짜 관계야.

팔로워 1000명 < 진짜 친구 1명 💯`,
      bg: 'https://images.unsplash.com/photo-1696831387725-d758c9a54c26',
      choices: [
        { label: '이 관계 소중히 하기', to: 'treasure_bond', cls: 'bg-pink-200' },
        { label: '깊은 관계의 의미 깨닫기', to: 'understand_bond', cls: 'bg-purple-200' }
      ],
      prompt: '💭 진정한 소통 = 말? 아니면 마음?'
    },
    {
      id: 'find_chicken_again',
      title: '두 번째 기회 (찾았다!)',
      text: `며칠간 닭을 찾아다녔어.

Day 1: 못 찾음 😢
Day 2: 못 찾음 😭
Day 3: 발견! 😆

"꼬꼬?" (너... 왜 또 왔어?)

"저번엔... 미안해.
시간 좀 더 함께 할걸."

닭이 고개를 갸웃하다가
천천히 다가왔어.

두 번째 기회.
이번엔 놓치지 않을 거야!

"기회는 두 번 오지 않는다?
아니, 만들면 돼!" 💪`,
      bg: 'https://images.unsplash.com/photo-1620509400919-a2ef8294f239',
      choices: [
        { label: '닭과 시간 보내기', to: 'befriend_chicken', cls: 'bg-pink-200' },
        { label: '후회에서 배우기', to: 'learn_regret', cls: 'bg-blue-200' }
      ],
      prompt: '💭 두 번째 기회를 만드는 것도 능력일까?'
    },
    {
      id: 'new_encounter',
      title: '새로운 만남의 가능성',
      text: `새로운 만남을 찾아 떠났어.

며칠간 아무도 못 만남.

외롭고 후회도 됐어.
"그때 닭이랑 있을걸..."

근데 포기 안 했어.

그리고...

"쿵!" 

저 멀리서 큰 소리!
뭔가 떨어진 것 같아.

가까이 가보니...
이상한 물체.
금속으로 된 큰 새?

그리고 소리가 들려.
"여기가 어디지...?"

인간의 목소리! 😲`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '조심스럽게 다가간다', to: 'approach_carefully', cls: 'bg-yellow-200' },
        { label: '멀리서 관찰한다', to: 'observe_far', cls: 'bg-blue-200' }
      ],
      prompt: '💭 새로운 만남 앞에서 용기를 낼 수 있을까?'
    },
    {
      id: 'meaningful_time',
      title: '의미 충전소 (시간 업그레이드)',
      text: `시간을 의미 있게 쓰기로 했어.

아침: 해뜨는 거 보며 "안녕, 오늘"
저녁: 해지는 거 보며 "고마워, 오늘"

단순히 보는 게 아니라
감사하며 봐.

닭 만나면 이름으로 불러주고,
모래 밟으면 감촉 느끼고,
바람 불면 방향 확인해.

같은 시간인데
완전히 다른 경험이야.

"마음챙김 = 시간의 질 업그레이드"

명상 앱 필요없음! 😌`,
      bg: 'https://images.unsplash.com/photo-1601999025038-ee1249ae8df4',
      choices: [
        { label: '이 방식 계속하기', to: 'continue_mindful', cls: 'bg-purple-200' },
        { label: '더 탐구하기', to: 'time_deep_dive', cls: 'bg-blue-200' }
      ],
      prompt: '💭 같은 시간도 어떻게 대하느냐에 따라 달라질까?'
    },
    {
      id: 'time_deep_dive',
      title: '시간의 레이어 (깊이 파기)',
      text: `시간에는 층이 있어.

레벨 1: 물리적 시간
→ 초, 분, 시간 (기계적)

레벨 2: 경험적 시간
→ 느낌으로 재는 시간 (감성적)

레벨 3: 관계적 시간
→ 함께 보낸 시간 (의미적)

레벨 4: 기다림의 시간
→ 숫자로 잴 수 없음 (철학적)

"언젠가...
특별한 누군가를 만날 날이
올까?"

기대 +100 ✨`,
      bg: 'https://images.unsplash.com/photo-1631108980044-f025e1b3a4e9',
      choices: [
        { label: '기다림을 받아들인다', to: 'accept_waiting', cls: 'bg-purple-200' },
        { label: '적극적으로 찾아간다', to: 'active_search', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 기다림도 의미 있는 시간일까?'
    },
    {
      id: 'one_place_deep',
      title: '한 우물 파기 (깊이의 발견)',
      text: `한 곳만 깊게 경험하기로 했어.

닭 만난 그곳으로 돌아왔어.

전엔 몰랐던 걸 발견했어:

- 아침 햇살이 바위를 어떻게 비추는지
- 바람이 어떤 소리를 만드는지
- 모래의 온도 변화

같은 장소인데
매일 다르게 보여!

"100곳 얕게 보기 <
1곳 깊게 보기"

깊이 파니까 보물 나옴! 💎`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '이곳을 특별한 장소로', to: 'special_place', cls: 'bg-pink-200' },
        { label: '깊이의 가치 깨닫기', to: 'value_depth', cls: 'bg-purple-200' }
      ],
      prompt: '💭 많은 경험 vs 깊은 경험, 뭐가 더 풍요로울까?'
    },
    {
      id: 'keep_collecting',
      title: '콜렉터의 함정 (깨달음)',
      text: `계속 새로운 곳만 찾았어.

100곳... 200곳... 300곳...

전부 비슷해.
모래 + 바위 + 선인장의 조합.

"...내가 왜 이러고 있지?"

깨달았어.

새로운 걸 찾는 게 아니라
그냥 도망치고 있었어.

뭐로부터?
깊이 들어가는 것.
진짜 나와 마주하는 것.

"도피 중이었구나" 😅`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '도망 멈추고 한 곳에', to: 'one_place_deep', cls: 'bg-green-200' },
        { label: '계속 찾기', to: 'endless_search', cls: 'bg-gray-200' }
      ],
      prompt: '💭 새것 찾기 = 탐험? 아니면 도피?'
    },
    {
      id: 'try_others',
      title: '정답 찾기 실패 모음집',
      text: `여러 방식 다 시도해봤어.

도마뱀 스타일: 너무 게으름 😴
전갈 스타일: 너무 공격적 😠
새 스타일: 방향 상실 🌀

"왜 아무것도 안 맞지?"

그때 깨달음:

정답이 "없는" 게 아니라
정답이 "각자 다른" 거야.

뱀의 정답 ≠ 내 정답

"나만의 정답은 내가 만든다"
DIY 인생! 🛠️`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '나만의 답 만들기', to: 'create_meaning', cls: 'bg-purple-200' },
        { label: '답 없이 살아보기', to: 'live_answerless', cls: 'bg-blue-200' }
      ],
      prompt: '💭 하나의 정답? 아니면 각자의 정답?'
    },
    {
      id: 'build_connections',
      title: '관계망 구축 프로젝트',
      text: `사막의 존재들과 관계 맺기 시작!

매일 아침 선인장에게:
"좋은 아침! 잘 잤어?" 🌵

매일 저녁 바위에 앉아:
"오늘도 고마워~" 🪨

처음엔 이상했어.
대답도 안 하는데 뭐하는 거지?

근데 시간 지나니까...
특별해졌어!

"그냥 선인장" → "내 선인장"
"그냥 바위" → "내 바위"

"관계가 세상을 바꾼다"
소셜 명언! 🌐`,
      bg: 'https://images.unsplash.com/photo-1723479746540-fd0fc7844cf0',
      choices: [
        { label: '더 많이 관계 맺기', to: 'connect_more', cls: 'bg-green-200' },
        { label: '관계의 의미 생각하기', to: 'meaning_connection', cls: 'bg-purple-200' }
      ],
      prompt: '💭 관계는 쌍방향만 가능할까?'
    },
    {
      id: 'gain_experience',
      title: '경험치 파밍 (레벨업!)',
      text: `다양한 경험 시작!

✅ 폭풍우 견디기 - 무섭지만 짜릿
✅ 밤새 별보기 - 눈 아프지만 경이로움
✅ 하루 단식 - 힘들지만 음식의 소중함 깨달음

각 경험이 나를 바꿨어.

"경험 모으기 vs 변화하기"

100개 경험 후에도 똑같으면
무슨 의미?

"경험의 가치 = 변화"
성장 명언! 📈`,
      bg: 'https://images.unsplash.com/photo-1657319717882-e04f8c1a1b74',
      choices: [
        { label: '변화에 집중하기', to: 'focus_change', cls: 'bg-purple-200' },
        { label: '극한 경험 도전', to: 'extreme_exp', cls: 'bg-red-200' }
      ],
      prompt: '💭 경험의 가치 = 양? 아니면 변화?'
    },
    {
      id: 'eternal_void',
      title: '공허의 끝 (Bad Ending)',
      text: `계속 똑같이 살았어.

2년... 5년... 10년...

늙었지만 성장은 없어.
시간은 흘렀지만 경험은 없어.

거울 같은 물에 비친 내 모습:

"너... 진짜 살았어?"

존재 ≠ 생존
생존 ≠ 삶

"안전하게 살다가 
아무것도 하지 않은 인생"

이게 진짜 위험한 거였네.

[BAD ENDING]
다시 시도할래?`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '🔄 처음부터 다시', to: 'start', cls: 'bg-red-200' }
      ],
      prompt: '💭 안전한 무의미함 vs 위험한 의미... 뭘 선택했어야 했을까?'
    },
    {
      id: 'last_chance',
      title: '마지막 기회 (늦었지만)',
      text: `늦었지만 포기 안 해!

몸은 늙었어도 마음은 살아있어.

"지금이라도..."

그날, 들렸어.
큰 소리!

"쾅!"

뭔가 떨어지는 소리.

마지막 기회가 온 거 같아!

"늦었다고 생각할 때가
가장 빠른 때"

달려! 🏃💨`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '소리 나는 곳으로!', to: 'approach_carefully', cls: 'bg-red-200' }
      ],
      prompt: '💭 늦었다고 생각할 때가 정말 가장 빠를 때일까?'
    },
    {
      id: 'approach_carefully',
      title: '운명의 언덕 (떨리는 순간)',
      text: `조심스럽게 언덕을 올랐어.

심장이 쿵쾅쿵쾅.

언덕 위에 도착하니...

이상한 금속 물체 (나중에 알았지만 비행기)
그리고 두 사람.

한 명은 어른.
금속 물체 옆에서 뭔가 고치고 있어.

다른 한 명은...
작은 소년.
금발 머리, 이상한 옷.

소년이 사막을 보며 말해:
"여기... 정말 아름답네."

어른은 듣지도 않아.
일만 하고 있어.

"와... 같은 걸 보는데
완전히 다르게 보는구나" 😮`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '계속 관찰한다', to: 'observe_prince', cls: 'bg-blue-200' }
      ],
      prompt: '💭 같은 세상을 봐도 보는 방식은 다를까?'
    },
    {
      id: 'observe_far',
      title: '멀리서 본 진실',
      text: `멀리서 지켜봤어.

며칠간 관찰했어.

어른 (비행사):
- 계속 금속 물체 고치기만 함
- 주변 안 봄
- 소년 말도 잘 안 들음

소년 (어린 왕자):
- 모래를 만지며 신기해함
- 별을 보며 뭔가 그리워함
- 작은 것에도 감동함

"어른은 본질을 안 봐.
아이는 본질을 봐."

이 소년... 특별해.
내가 찾던 "본질을 보는 존재"야!`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '소년을 더 관찰한다', to: 'observe_prince', cls: 'bg-blue-200' }
      ],
      prompt: '💭 어른과 아이, 누가 세상을 제대로 볼까?'
    },
    {
      id: 'observe_prince',
      title: '어린 왕자의 세계관',
      text: `소년을 며칠간 봤어.

이 소년은 다르다:

- 모래알 하나하나를 신기해함
- 바람 소리에 귀 기울임
- 별을 보며 이야기함
- 눈에 보이지 않는 것을 봄

"진짜 중요한 건 눈에 안 보여"
소년이 혼잣말로 중얼거렸어.

와... 나랑 같은 생각이야!

이 소년이랑...
언젠가 친구가 되고 싶어.

시간을 함께 보내고 싶어.
이야기를 나누고 싶어.`,
      bg: 'https://images.unsplash.com/photo-1601999025038-ee1249ae8df4',
      choices: [
        { label: '기다리기로 한다', to: 'final_decision', cls: 'bg-pink-200' }
      ],
      prompt: '💭 특별한 만남은 타이밍이 중요할까?'
    },
    {
      id: 'final_decision',
      title: '여우의 결심',
      text: `며칠을 지켜봤어.

소년과 어른이 대화하는 걸 봤어.
소년이 뭔가 그림을 그리고,
어른이 물을 찾으러 가고.

"지금 다가가면 될까?"

아니야. 아직 때가 아니야.

소년은 지금 어른과
중요한 시간을 보내고 있어.

나는... 기다릴 거야.

언젠가,
소년이 준비됐을 때,
내가 준비됐을 때,

우리는 만날 거야.`,
      bg: 'https://images.unsplash.com/photo-1631108980044-f025e1b3a4e9',
      choices: [
        { label: '그날을 기다린다', to: 'ending', cls: 'bg-purple-200' }
      ],
      prompt: '💭 기다림도 하나의 선택일까?'
    },

    // 추가 연결 장면들
    {
      id: 'accept_waiting',
      title: '기다림의 예술',
      text: `기다림을 받아들였어.

조급하지 않아.
불안하지도 않아.

"언젠가는 오겠지"

기다리는 동안 준비했어:
- 마음 여는 법
- 경청하는 법  
- 함께하는 법

기다림 = 수동? ❌
기다림 = 능동적 준비! ✅

그날이 왔어.
"쾅!" 소리와 함께.`,
      bg: 'https://images.unsplash.com/photo-1631108980044-f025e1b3a4e9',
      choices: [
        { label: '그곳으로 간다', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 기다림도 준비의 한 형태일까?'
    },
    {
      id: 'active_search',
      title: '적극적 탐색 (운명 만들기)',
      text: `기다리지 않기로 했어.
직접 찾아 나섰어!

사막을 샅샅이 돌아다녔어.

그리고 발견했어.

"쾅!"

큰 소리와 함께
뭔가 떨어졌어.

"찾은 걸까? 
아니면 운명이 날 인도한 걸까?"

능동 + 운명 = 만남 🎯`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '소리 쪽으로!', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 운명은 기다리는 것? 만드는 것?'
    },

    // Helper scenes
    {
      id: 'continue_mindful',
      title: '마음챙김 라이프',
      text: `매일 의식적으로 살았어.

그러다 보니
특별한 순간들이 보이기 시작했어.

그날도...

"쾅!"

큰 소리가 들렸어.
뭔가 특별한 일이 일어날 것 같아!`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '소리 쪽으로', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 준비된 마음에 기회가 찾아올까?'
    },
    {
      id: 'keep_living',
      title: '삶을 사는 중',
      text: `계속 경험하고,
계속 느끼고,
계속 살아갔어.

그러던 어느 날...

"쾅!"

운명이 찾아왔어! ✨`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '운명을 향해', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 열심히 산 자에게 기회가 올까?'
    },
    {
      id: 'reflect_life',
      title: '삶의 되돌아보기',
      text: `지금까지를 돌아봤어.

많이 변했어.
많이 배웠어.
많이 자랐어.

"이제 준비됐어"

그때, "쾅!" 소리가 들렸어.

새로운 시작! 🚀`,
      bg: 'https://images.unsplash.com/photo-1631108980044-f025e1b3a4e9',
      choices: [
        { label: '새로운 만남으로', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 돌아보는 것이 앞으로 가는 힘이 될까?'
    },

    // 모든 누락된 장면들 추가
    {
      id: 'want_eternal',
      title: '영원을 향한 갈망',
      text: `영원한 것을 만들고 싶었어.

사라지지 않는 흔적,
잊히지 않는 이야기,
끝나지 않는 의미.

며칠을 고민했어.
근데 깨달았어.

영원함을 추구하는 것도 의미 있지만,
순간의 아름다움을 놓치면 안 돼.

그날...

"쾅!"

큰 소리가 들렸어.
진짜 영원한 만남이 시작되는 순간!`,
      bg: 'https://images.unsplash.com/photo-1631108980044-f025e1b3a4e9',
      choices: [
        { label: '소리 쪽으로', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 영원한 순간은 만들어지는 걸까?'
    },
    {
      id: 'keep_caring',
      title: '꽃과 함께한 시간',
      text: `매일 꽃을 돌봤어.

1주일, 2주일, 1달...

힘들었지만 행복했어.

꽃이 자라는 걸 보며
나도 성장했어.

"책임이 곧 사랑이구나"

그 순간...

"쾅!"

멀지 않은 곳에서 큰 소리.
새로운 만남의 예감!`,
      bg: 'https://images.unsplash.com/photo-1693159957917-a9d6bc273cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjByZWQlMjByb3NlJTIwY2xvc2V8ZW58MXx8fHwxNzYzNzE5NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '소리 쪽으로', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 돌봄이 나를 성장시킬까?'
    },
    {
      id: 'feel_responsibility',
      title: '책임의 무게와 아름다움',
      text: `꽃을 돌보면서 느꼈어.

책임은 무겁지만,
그 무게가 나를 단단하게 만들어.

부담이 아니라 의미야.

"내가 선택한 것에 책임지는 게
어른이 되는 거구나"

잠시 후...

"쾅!"

운명의 소리!`,
      bg: 'https://images.unsplash.com/photo-1693159957917-a9d6bc273cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjByZWQlMjByb3NlJTIwY2xvc2V8ZW58MXx8fHwxNzYzNzE5NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '소리를 향해', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 책임이 나를 자유롭게 할까?'
    },
    {
      id: 'grateful_thinking',
      title: '생각하는 존재의 축복',
      text: `꽃은 생각하지 못하지만,
나는 생각할 수 있어.

느낄 수 있고,
선택할 수 있고,
의미를 만들 수 있어.

이게 바로 축복이야!

"생각할 수 있어서 고마워"

그때...

"쾅!"

생각하는 존재끼리의 만남!`,
      bg: 'https://images.unsplash.com/photo-1601999025038-ee1249ae8df4',
      choices: [
        { label: '만남을 향해', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 생각이 삶을 풍요롭게 할까?'
    },
    {
      id: 'envy_simple',
      title: '단순함의 유혹',
      text: `가끔은 꽃처럼
단순하게 살고 싶어.

고민 없이,
선택 없이,
그냥 존재하는 거.

하지만...

고민이 있기에 성장하고,
선택이 있기에 의미가 생겨.

"복잡함이 나를 만든다"

순간...

"쾅!"

복잡한 세상과의 만남!`,
      bg: 'https://images.unsplash.com/photo-1693159957917-a9d6bc273cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjByZWQlMjByb3NlJTIwY2xvc2V8ZW58MXx8fHwxNzYzNzE5NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '세상을 향해', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 복잡함이 오히려 아름다울까?'
    },
    {
      id: 'value_each',
      title: '하나하나의 소중함',
      text: `각 친구가 특별해.

새는 새대로,
도마뱀은 도마뱀대로,
쥐는 쥐대로.

모두 다르고 모두 소중해.

"양보다 질이구나"

그날...

"쾅!"

또 다른 특별한 만남!`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '만남으로', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 모든 관계는 특별할까?'
    },
    {
      id: 'more_friends',
      title: '친구 네트워크 확장',
      text: `친구가 늘어났어!

전갈, 토끼, 올빼미까지!

사막이 커뮤니티가 됐어.

하지만 문득...

"많은 친구 vs 깊은 친구?"

고민하던 그때...

"쾅!"

답을 알려줄 만남!`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '답을 찾으러', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 친구는 많을수록 좋을까?'
    },
    {
      id: 'treasure_bond',
      title: '유일무이한 관계',
      text: `닭과의 관계를 소중히 했어.

매일 시간을 보내고,
서로를 이해하고,
함께 성장했어.

"이 관계는 세상에 하나뿐"

만족하던 그때...

"쾅!"

또 다른 특별한 인연!`,
      bg: 'https://images.unsplash.com/photo-1696831387725-d758c9a54c26',
      choices: [
        { label: '인연을 향해', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 깊은 관계 하나로 충분할까?'
    },
    {
      id: 'understand_bond',
      title: '관계의 본질 이해',
      text: `진짜 관계는...

조건 없이,
계산 없이,
그냥 함께 있어서 좋은 거야.

"이게 진짜 친구구나"

깨달은 순간...

"쾅!"

진짜 친구를 만날 시간!`,
      bg: 'https://images.unsplash.com/photo-1696831387725-d758c9a54c26',
      choices: [
        { label: '친구를 향해', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 진짜 관계의 기준은 뭘까?'
    },
    {
      id: 'learn_regret',
      title: '후회에서 배운 지혜',
      text: `첫 번째 헤어짐에서 배웠어.

시간을 함께 보내지 않으면
관계는 자라지 않아.

"다시는 놓치지 않을 거야"

그 결심과 함께...

"쾅!"

새로운 기회!`,
      bg: 'https://images.unsplash.com/photo-1620509400919-a2ef8294f239',
      choices: [
        { label: '기회를 향해', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 후회가 나를 성장시킬까?'
    },
    {
      id: 'accept_moment',
      title: '순간의 아름다움 수용',
      text: `영원하지 않아도 괜찮아.

지금 이 순간이 진짜니까.

"영원함보다 현재가 중요해"

그 깨달음과 함께...

"쾅!"

현재의 만남!`,
      bg: 'https://images.unsplash.com/photo-1631108980044-f025e1b3a4e9',
      choices: [
        { label: '현재로', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 현재 순간이 가장 중요할까?'
    },
    {
      id: 'special_place',
      title: '나만의 특별한 장소',
      text: `이곳이 특별해진 건
시간과 관심을 쏟았기 때문이야.

"의미는 쏟은 시간에 비례해"

그 장소에서...

"쾅!"

특별한 소리!`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '소리를 향해', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 시간이 장소를 특별하게 할까?'
    },
    {
      id: 'value_depth',
      title: '깊이의 진가',
      text: `깊게 경험하니까
보이지 않던 게 보였어.

"깊이가 진실을 드러낸다"

깨닫는 순간...

"쾅!"

깊은 만남의 시작!`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '만남으로', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 깊이가 질을 만들까?'
    },
    {
      id: 'endless_search',
      title: '끝없는 탐색의 공허',
      text: `계속 새로운 것만 찾다가
지쳐버렸어.

"도피는 답이 아니었어"

그때...

"쾅!"

도피를 멈출 신호!`,
      bg: 'https://images.unsplash.com/photo-1690942566395-f80f79320f20',
      choices: [
        { label: '멈추고 마주하기', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 도피보다 마주하는 게 나을까?'
    },
    {
      id: 'live_answerless',
      title: '답 없이 사는 법',
      text: `모든 질문에 답이 필요한 건 아니야.

때로는 질문과 함께 사는 게
더 풍요로워.

"질문이 삶을 깊게 만든다"

그 순간...

"쾅!"

새로운 질문의 시작!`,
      bg: 'https://images.unsplash.com/photo-1631108980044-f025e1b3a4e9',
      choices: [
        { label: '질문을 향해', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 답보다 질문이 중요할까?'
    },
    {
      id: 'connect_more',
      title: '연결의 확장',
      text: `더 많은 것들과 관계 맺었어.

바람, 별, 모래까지.

모든 게 살아있는 것처럼 느껴져.

"연결이 세상을 채운다"

그날...

"쾅!"

가장 특별한 연결!`,
      bg: 'https://images.unsplash.com/photo-1723479746540-fd0fc7844cf0',
      choices: [
        { label: '특별한 만남으로', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 모든 것과 연결될 수 있을까?'
    },
    {
      id: 'meaning_connection',
      title: '관계의 의미',
      text: `관계는 쌍방향이 아니어도 돼.

내가 의미를 부여하면
그것도 관계야.

"관계는 마음에서 시작돼"

깨달은 그때...

"쾅!"

마음의 관계!`,
      bg: 'https://images.unsplash.com/photo-1723479746540-fd0fc7844cf0',
      choices: [
        { label: '마음으로', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 일방적 관계도 의미 있을까?'
    },
    {
      id: 'focus_change',
      title: '변화에 집중',
      text: `경험의 가치는 변화야.

100개 경험해도 안 변하면 의미 없어.
1개라도 변화시키면 가치 있어.

"변화가 성장이다"

그 깨달음...

"쾅!"

변화의 순간!`,
      bg: 'https://images.unsplash.com/photo-1657319717882-e04f8c1a1b74',
      choices: [
        { label: '변화로', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 변화가 곧 성장일까?'
    },
    {
      id: 'extreme_exp',
      title: '극한의 경험',
      text: `한계에 도전했어.

폭풍을 견디고,
단식을 버티고,
추위를 이겨냈어.

"극한이 진짜 나를 보여줘"

그 순간...

"쾅!"

진짜 나를 만날 시간!`,
      bg: 'https://images.unsplash.com/photo-1657319717882-e04f8c1a1b74',
      choices: [
        { label: '진짜 나로', to: 'approach_carefully', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 극한이 진실을 드러낼까?'
    },

    // ============================================
    // 엔딩 페이지 (최종)
    // ============================================
    {
      id: 'ending',
      title: '여우의 기다림 (프리퀄의 끝, 본편의 시작)',
      text: `나도 이제 알아

- 특별함은 시간이 만든다는 것
- 관계는 선택이라는 것
- 눈에 보이지 않는 게 중요하다는 것
- 기다림도 의미 있다는 것

언젠가...
어린왕자가 혼자 산책하러 올 거야.

그때 나는 나타날 거야.
조심스럽게, 천천히.

그리고 우리는 친구가 될 거야.

"기다릴게, 어린 왕자."

---

📚 어린 왕자와 여우의 진짜 만남이 궁금해?

생텍쥐페리의 《어린왕자》에서
여우가 어린 왕자를 만나는 장면을 확인해봐!

진짜 이야기는 책에서 시작돼!

[THE END... 아니, THE BEGINNING!]`,
      bg: 'https://images.unsplash.com/photo-1631108980044-f025e1b3a4e9',
      choices: [
        { label: '🔄 처음부터 다시하기', to: 'start', cls: 'bg-purple-600' }
      ],
      prompt: `《어린왕자》 - 진짜 중요한 건 눈에 보이지 않아. 특별함, 시간, 길들임의 의미를 담은 영원한 이야기!`
    }
  ];
}
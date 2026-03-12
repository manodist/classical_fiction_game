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

export function generateParkMunsuStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '정의를 꿈꾸는 아이',
      text: `너의 이름은 ${name.full}.

조선시대 한양의 작은 마을에 살고 있어.

너는 암행어사를 정말 동경해!

"백성을 위해 정의를 실현하는 암행어사가 되고 싶어!"

마을에서 일어나는 사건들을 해결하며 실력을 키우고 있지.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db',
      choices: [
        { label: '암행어사에 대해 생각한다', to: 'dream_secret_inspector', cls: 'bg-purple-200' },
        { label: '집안으로 들어간다', to: 'go_home', cls: 'bg-blue-200' }
      ],
      prompt: '💭 정의를 실현하는 일이 왜 중요할까?'
    },
    {
      id: 'dream_secret_inspector',
      title: '암행어사란 무엇인가',
      text: `암행어사는 임금님이 몰래 보내는 특별한 관리야.

신분을 숨기고 백성들의 억울한 일을 조사해.

나쁜 관리들의 부정부패를 밝혀내지.

"암행어사 출두요!" 하며 마패를 꺼내는 순간!

모든 진실이 드러나는 거야.`,
      bg: 'https://images.unsplash.com/photo-1758384077255-b53dc9e171a0',
      choices: [
        { label: '집안으로 들어간다', to: 'go_home', cls: 'bg-blue-200' }
      ],
      prompt: '💭 요즘 시대에는 암행어사의 역할을 누가 할까?'
    },
    {
      id: 'go_home',
      title: '사건 1: 사라진 비녀',
      text: `집에 돌아오니 집안이 소란스러워!

어머니가 걱정스러운 표정이야.

"큰일이구나! 할머니의 은비녀가 없어졌어!"

"가문의 보물인데..."

동생과 하인 모두 모르겠다고 해.`,
      bg: 'https://images.unsplash.com/photo-1730471263121-a14c0b6d515e',
      choices: [
        { label: '조사를 시작한다', to: 'case1_start', cls: 'bg-red-200' }
      ],
      prompt: '💭 가족 간에도 조사가 필요할까?'
    },
    {
      id: 'case1_start',
      title: '가정 내 진실 찾기',
      text: `"제가 찾아볼게요!"

너는 탐정 모드로 전환했어.

용의자는 세 명:
- 동생 (어제 할머니 방에 들어갔음)
- 하인 (아침에 청소했음)
- 이웃집 아이 (잠깐 놀러 왔음)

누구부터 조사할까?`,
      bg: 'https://images.unsplash.com/photo-1746535908442-0140112ddc1a',
      choices: [
        { label: '동생을 먼저 조사한다', to: 'case1_brother', cls: 'bg-blue-200' },
        { label: '하인을 먼저 조사한다', to: 'case1_servant', cls: 'bg-green-200' },
        { label: '현장을 먼저 조사한다', to: 'case1_scene', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 신분이나 관계로 의심의 순서를 정하면 될까?'
    },
    {
      id: 'case1_brother',
      title: '동생 심문 - 편견의 함정',
      text: `"동생아, 할머니 방에 들어갔지?"

동생이 눈물을 글썽여.

"응... 할머니께 그림을 드리려고..."

"하지만 비녀는 안 가져갔어!"

부모님은 "네 동생이 그럴 리 없다"고 하셔.`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '동생을 믿고 다른 곳을 조사한다', to: 'case1_trust_brother', cls: 'bg-blue-200' },
        { label: '더 자세히 묻는다', to: 'case1_press_brother', cls: 'bg-red-200' }
      ],
      prompt: '💭 가족이라고 의심하지 말아야 할까?'
    },
    {
      id: 'case1_servant',
      title: '하인 심문 - 신분의 벽',
      text: `하인 영감을 불렀어.

"영감님, 아침에 청소하셨죠?"

영감이 고개를 숙이셨어.

"네... 늘 하던 대로 했습니다."

부모님은 "설마 영감이 그럴 리 있겠니"라고 하시지만...

마을 사람들은 "하인을 조심해야지"라고 수군거려.`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '신분 때문에 의심한다', to: 'case1_suspect_servant', cls: 'bg-red-200' },
        { label: '공평하게 조사한다', to: 'case1_fair_investigation', cls: 'bg-green-200' }
      ],
      prompt: '💭 신분이 낮다고 의심부터 해야 할까?'
    },
    {
      id: 'case1_scene',
      title: '현장 조사 - 단서 찾기',
      text: `할머니 방을 자세히 살펴봤어.

비녀를 놓던 자리에 아무것도 없어.

그런데... 바닥에 작은 종이 조각!

동생의 그림 한 조각이야.

그리고 창문이 살짝 열려 있어.`,
      bg: 'https://images.unsplash.com/photo-1753184649034-cadec03611da',
      choices: [
        { label: '종이 조각을 조사한다', to: 'case1_paper_clue', cls: 'bg-yellow-200' },
        { label: '창문을 조사한다', to: 'case1_window_clue', cls: 'bg-blue-200' }
      ],
      prompt: '💭 작은 단서도 중요할까?'
    },
    {
      id: 'case1_trust_brother',
      title: '믿음의 힘',
      text: `"알았어, 동생은 아니야."

동생이 고마워해.

"고마워!"

현장을 조사하러 할머니 방으로 갔어.

더 많은 단서가 필요해!`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db',
      choices: [
        { label: '현장을 조사한다', to: 'case1_scene', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 믿음도 조사의 일부일까?'
    },
    {
      id: 'case1_press_brother',
      title: '의심의 씨앗',
      text: `"정말 안 가져갔어? 확실해?"

동생이 서러워서 울어.

"정말 안 가져갔다니까!"

부모님이 너를 꾸짖으셨어.

"가족을 그렇게 의심하면 어떡하니!"

잘못된 접근이었나봐...`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '다시 생각하고 현장 조사를 한다', to: 'case1_scene', cls: 'bg-blue-200' }
      ],
      prompt: '💭 과도한 의심이 관계를 해칠 수 있을까?'
    },
    {
      id: 'case1_suspect_servant',
      title: '편견의 오류',
      text: `"영감님, 정말 안 가져가셨어요?"

영감의 눈에 슬픔이 어려 있어.

"저는... 이 집에 30년을 충성했습니다..."

부모님이 화를 내셨어.

"신분으로 사람을 판단하면 안 된다!"

너는 부끄러워졌어.`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '사과하고 다시 조사한다', to: 'case1_apologize', cls: 'bg-blue-200' }
      ],
      prompt: '💭 신분이나 지위로 사람을 판단하는 것이 옳을까?'
    },
    {
      id: 'case1_fair_investigation',
      title: '공평한 조사',
      text: `"영감님, 혹시 이상한 점을 보셨나요?"

영감이 생각하시더니...

"그러고 보니 까치가 창문으로 들어왔다 나갔어요."

"반짝이는 걸 물고 갔던 것 같은데..."

중요한 증언이야!`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '창문 밖을 조사한다', to: 'case1_outside', cls: 'bg-green-200' }
      ],
      prompt: '💭 공평하게 대하면 진실이 보일까?'
    },
    {
      id: 'case1_paper_clue',
      title: '종이의 진실',
      text: `종이 조각을 자세히 봤어.

동생이 그린 할머니 그림의 일부야.

그림 속 할머니는 비녀를 하고 계셔.

"동생은 할머니를 위해 그림을 그렸구나!"

동생은 범인이 아니야!`,
      bg: 'https://images.unsplash.com/photo-1753184649034-cadec03611da',
      choices: [
        { label: '다른 단서를 찾는다', to: 'case1_window_clue', cls: 'bg-blue-200' }
      ],
      prompt: '💭 증거를 제대로 해석하는 게 중요할까?'
    },
    {
      id: 'case1_window_clue',
      title: '창문의 비밀',
      text: `창문을 살펴봤어.

창틀에 까치 깃털이!

그리고 밖을 보니...

큰 나무에 까치집이 보여!

"혹시..."`,
      bg: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      choices: [
        { label: '나무로 간다', to: 'case1_tree', cls: 'bg-green-200' }
      ],
      prompt: '💭 예상치 못한 곳에 답이 있을까?'
    },
    {
      id: 'case1_apologize',
      title: '잘못된 편견',
      text: `"영감님, 죄송합니다."

"신분으로 판단한 제가 잘못했어요."

영감이 따뜻하게 웃으셨어.

"괜찮다, 젊은 양반. 배우는 게 중요하지."

"그나저나 아까 까치가 뭘 물고 갔더구나..."

중요한 정보야!`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '까치를 추적한다', to: 'case1_outside', cls: 'bg-green-200' }
      ],
      prompt: ' 잘못을 인정하는 것도 지혜일까?'
    },
    {
      id: 'case1_outside',
      title: '까치의 흔적',
      text: `밖으로 나가 살펴봤어.

큰 나무에 까치집이!

나무 밑에 반짝이는 게 떨어져 있어.

은비녀의 장식 조각이야!

"까치가 가져간 거구나!"`,
      bg: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      choices: [
        { label: '나무에 올라간다', to: 'case1_tree', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 진짜 범인은 따로 있을 수 있을까?'
    },
    {
      id: 'case1_tree',
      title: '진실의 발견',
      text: `나무에 올라가 까치집을 봤어.

거기에 은비녀가!

까치가 반짝이는 걸 좋아해서 가져간 거야.

"범인은 까치였구나!"

동생도, 하인도, 이웃 아이도 아니었어!`,
      bg: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      choices: [
        { label: '비녀를 가져온다', to: 'case1_solve', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 사람을 의심하기 전에 다른 가능성을 생각해야 할까?'
    },
    {
      id: 'case1_solve',
      title: '편견 없는 정의',
      text: `비녀를 찾아 돌아왔어!

"할머니, 여기 있어요!"

"범인은 까치였어요. 아무도 나쁘지 않았어요!"

영감이 말씀하셨어.

"신분이나 관계로 판단하지 않는 게 진짜 지혜로다."

첫 번째 교훈을 배웠어!`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db',
      choices: [
        { label: '며칠 후...', to: 'case2_intro', cls: 'bg-purple-200' }
      ],
      prompt: '💭 편견 없이 조사하는 것이 진정한 정의일까?'
    },
    {
      id: 'case2_intro',
      title: '사건 2: 서당의 혼란',
      text: `며칠 후, 너는 서당에 갔어.

훈장님이 심각한 표정이야.

"큰일이구나!"

"시험 답안지가 사라졌어!"

"누군가 미리 보려고 훔쳐간 것 같구나!"

서당 전체가 발칵 뒤집혔어.`,
      bg: 'https://images.unsplash.com/photo-1730471263121-a14c0b6d515e',
      choices: [
        { label: '조사를 자원한다', to: 'case2_start', cls: 'bg-red-200' }
      ],
      prompt: '💭 공정한 시험이 왜 중요할까?'
    },
    {
      id: 'case2_start',
      title: '서당의 정의',
      text: `"훈장님, 제가 조사하겠습니다!"

용의자들:
- 성적이 항상 1등인 양반집 아들 철수
- 공부를 열심히 하는 평민 아들 영식
- 최근 성적이 떨어진 중인 아들 만수

모두 어제 서당에 남아있었어.

누구부터 조사할까?`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '철수를 조사한다', to: 'case2_chulsu', cls: 'bg-blue-200' },
        { label: '영식을 조사한다', to: 'case2_youngshik', cls: 'bg-green-200' },
        { label: '만수를 조사한다', to: 'case2_mansu', cls: 'bg-yellow-200' },
        { label: '현장을 먼저 조사한다', to: 'case2_scene', cls: 'bg-purple-200' }
      ],
      prompt: '💭 신분에 따라 의심의 정도가 달라질까?'
    },
    {
      id: 'case2_chulsu',
      title: '양반의 특권?',
      text: `철수에게 물어봤어.

"철수야, 어제 뭐 했어?"

철수가 당당하게 말해.

"나는 1등인데 답안을 훔칠 이유가 없어!"

다른 양반 학생들도 거들어.

"철수가 그럴 리 없어! 양반은 그런 짓 안 해!"`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '양반이라고 제외한다', to: 'case2_exclude_chulsu', cls: 'bg-red-200' },
        { label: '신분과 관계없이 조사한다', to: 'case2_fair_chulsu', cls: 'bg-green-200' }
      ],
      prompt: '💭 양반이라고 의심하지 말아야 할까?'
    },
    {
      id: 'case2_youngshik',
      title: '평민에 대한 의심',
      text: `영식에게 물어봤어.

"영식아, 어제 늦게까지 남아있었지?"

영식이 고개를 끄덕여.

"네... 공부하고 있었어요..."

주변 양반 학생들이 수군거려.

"평민이 공부를 그렇게 열심히 하다니... 수상해!"`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '신분 때문에 의심한다', to: 'case2_suspect_youngshik', cls: 'bg-red-200' },
        { label: '공평하게 대한다', to: 'case2_fair_youngshik', cls: 'bg-green-200' }
      ],
      prompt: '💭 열심히 하는 것이 의심의 이유가 될까?'
    },
    {
      id: 'case2_mansu',
      title: '성적이 떨어진 아이',
      text: `만수에게 물어봤어.

"만수야, 요즘 성적이 떨어졌다며?"

만수가 슬픈 표정이야.

"응... 집에 일이 많아서..."

"하지만 답안은 안 훔쳤어!"

눈물을 글썽여.`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '의심한다', to: 'case2_suspect_mansu', cls: 'bg-red-200' },
        { label: '이야기를 듣는다', to: 'case2_listen_mansu', cls: 'bg-blue-200' }
      ],
      prompt: '💭 동기가 있다고 범인일까?'
    },
    {
      id: 'case2_scene',
      title: '훈장님 방 조사',
      text: `훈장님 방을 조사했어.

책상 서랍이 열려 있어.

바닥에 먹물 자국이!

그리고... 찢어진 천 조각.

비싼 비단이야.`,
      bg: 'https://images.unsplash.com/photo-1753184649034-cadec03611da',
      choices: [
        { label: '먹물 자국을 조사한다', to: 'case2_ink_clue', cls: 'bg-blue-200' },
        { label: '천 조각을 조사한다', to: 'case2_cloth_clue', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 물증이 사람보다 정직할까?'
    },
    {
      id: 'case2_exclude_chulsu',
      title: '신분의 함정',
      text: `"철수는 양반이니까 아니겠지..."

하지만 마음 한구석이 불편해.

"이게 맞는 조사일까?"

신분으로 판단하는 건...

암행어사가 할 일이 아니야!`,
      bg: 'https://images.unsplash.com/photo-1758384077255-b53dc9e171a0',
      choices: [
        { label: '다시 생각하고 현장을 조사한다', to: 'case2_scene', cls: 'bg-blue-200' }
      ],
      prompt: '💭 신분이 높다고 법 위에 있을까?'
    },
    {
      id: 'case2_fair_chulsu',
      title: '공평한 질문',
      text: `"철수야, 어제 정확히 몇 시까지 있었어?"

"그리고 어디에 있었어?"

철수가 당황해!

"그, 그건..."

"잠깐 서당 뒤에 갔다 왔어..."

수상해!`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '더 자세히 조사한다', to: 'case2_investigate_chulsu', cls: 'bg-red-200' },
        { label: '다른 단서를 찾는다', to: 'case2_scene', cls: 'bg-blue-200' }
      ],
      prompt: '💭 법은 신분에 관계없이 공평해야 할까?'
    },
    {
      id: 'case2_suspect_youngshik',
      title: '잘못된 의심',
      text: `"영식아, 평민이 그렇게 열심히 하는  이상해..."

영식의 눈에 눈물이 고여.

"저는... 배우고 싶어서 열심히 한 건데..."

옆에 있던 훈장님이 너를 꾸짖으셨어.

"신분으로 사람을 판단하면 안 된다!"

잘못 생각했어...`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '사과하고 다시 조사한다', to: 'case2_apologize_youngshik', cls: 'bg-blue-200' }
      ],
      prompt: '💭 배우려는 열정을 의심하는 것이 옳을까?'
    },
    {
      id: 'case2_fair_youngshik',
      title: '공평한 대화',
      text: `"영식아, 어제 뭘 공부했어?"

"혹시 이상한 거 못 봤어?"

영식이 생각하더니...

"아! 철수가 서당 뒤로 가는 걸 봤어요!"

"비단 옷자락이 나무에 걸려서..."

중요한 증언이야!`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '서당 뒤를 조사한다', to: 'case2_behind', cls: 'bg-green-200' }
      ],
      prompt: '💭 공평하게 대하면 진실이 드러날까?'
    },
    {
      id: 'case2_suspect_mansu',
      title: '성급한 판단',
      text: `"만수야, 성적이 떨어졌으니 답안이 필요했겠지?"

만수가 크게 울어.

"저는 안 했어요! 정말이에요!"

다른 학생들도 수군거려.

"역시... 성적 떨어진 애가..."

너는 후회했어. 너무 성급했어.`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '다시 생각한다', to: 'case2_reconsider_mansu', cls: 'bg-blue-200' }
      ],
      prompt: '💭 동기가 있다고 바로 범인으로 몰아야 할까?'
    },
    {
      id: 'case2_listen_mansu',
      title: '이해의 시작',
      text: `"무슨 일이 있었어?"

만수가 사연을 말해.

"아버지가 편찮으셔서..."

"집안일을 도와야 해서 공부할 시간이 없었어요..."

"하지만 부정은 절대 안 해요!"

진심이 느껴져.`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '다른 곳을 조사한다', to: 'case2_scene', cls: 'bg-blue-200' }
      ],
      prompt: '💭 사람의 사정을 이해하는 것도 지혜일까?'
    },
    {
      id: 'case2_ink_clue',
      title: '먹물의 흔적',
      text: `먹물 자국을 따라갔어.

서당 뒤쪽으로 이어져...

그리고 멈춰!

먹물이 묻은 종이 조각이 있어.

답안지의 일부야!`,
      bg: 'https://images.unsplash.com/photo-1753184649034-cadec03611da',
      choices: [
        { label: '서당 뒤를 조사한다', to: 'case2_behind', cls: 'bg-green-200' }
      ],
      prompt: '💭 단서를 끝까지 추적하는 끈기가 필요할까?'
    },
    {
      id: 'case2_cloth_clue',
      title: '비단의 비밀',
      text: `천 조각을 자세히 봤어.

비싼 비단이야!

양반들만 입을 수 있는...

이건 평민이나 중인의 옷이 아니야!

"양반 중에 범인이 있구나!"`,
      bg: 'https://images.unsplash.com/photo-1753184649034-cadec03611da',
      choices: [
        { label: '양반 학생들을 조사한다', to: 'case2_check_nobles', cls: 'bg-red-200' }
      ],
      prompt: '💭 물증이 편견을 깨뜨릴 수 있을까?'
    },
    {
      id: 'case2_apologize_youngshik',
      title: '편견 깨기',
      text: `"영식아, 미안해."

"신분으로 판단한 내가 잘못했어."

영식이 웃으며 말해.

"괜찮아! 대신 진짜 범인을 찾아줘!"

"아, 그리고 철수가 어제 서당 뒤로 갔던 것 같아."

중요한 정보야!`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '서당 뒤를 조사한다', to: 'case2_behind', cls: 'bg-green-200' }
      ],
      prompt: '💭 잘못을 인정하면 새로운 길이 보일까?'
    },
    {
      id: 'case2_reconsider_mansu',
      title: '다시 생각하기',
      text: `"미안해, 만수야."

"동기만으로 판단하면 안 되지..."

수가 고개를 끄덕여.

너는 다시 조사를 시작했어.

현장에 답이 있을 거야!`,
      bg: 'https://images.unsplash.com/photo-1758384077255-b53dc9e171a0',
      choices: [
        { label: '현장을 조사한다', to: 'case2_scene', cls: 'bg-blue-200' }
      ],
      prompt: '💭 실수를 인정하는 것도 용기일까?'
    },
    {
      id: 'case2_investigate_chulsu',
      title: '양반도 조사 대상',
      text: `"철수야, 서당 뒤에서 뭐 했어?"

철수가 더 당황해!

"그건... 잠깐..."

옷자락에 뭔가 묻어 있어!

먹물이야!`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '서당 뒤를 확인한다', to: 'case2_behind', cls: 'bg-green-200' }
      ],
      prompt: '💭 지위가 높아도 법 앞에 평등할까?'
    },
    {
      id: 'case2_check_nobles',
      title: '양반 조사',
      text: `양반 학생들의 옷을 살펴봤어.

철수의 옷자락이 찢어져 있어!

그리고 먹물도 묻어 있어!

"철수, 이게 뭐야?"

철수가 얼굴이 하얘졌어.`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '증거를 제시한다', to: 'case2_confront', cls: 'bg-red-200' }
      ],
      prompt: '💭 증거 앞에서 신분은 무의미할까?'
    },
    {
      id: 'case2_behind',
      title: '서당 뒤의 진실',
      text: `서당 뒤로 갔어.

나무 뒤에 숨겨진 답안지!

그리고 찢어진 비단 조각이 나뭇가지에!

철수의 옷과 같은 천이야!

"철수가 범인이구나!"`,
      bg: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      choices: [
        { label: '철수를 찾아간다', to: 'case2_confront', cls: 'bg-red-200' }
      ],
      prompt: '💭 진실은 결국 드러날까?'
    },
    {
      id: 'case2_confront',
      title: '양반의 고백',
      text: `"철수야, 답안지가 서당 뒤에 있었어."

"네 옷 조각도 있었고..."

철수가 무릎을 꿇었어.

"미안해... 항상 1등 해야 한다는 압박감에..."

"아버지가 2등 하면 혼내셔서..."

양반도 고민이 있었구나.`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '엄하게 벌한다', to: 'case2_punish', cls: 'bg-red-200' },
        { label: '이해하고 가르친다', to: 'case2_teach', cls: 'bg-blue-200' }
      ],
      prompt: '💭 법은 엄격해야 할까, 교육적이어야 할까?'
    },
    {
      id: 'case2_punish',
      title: '엄격한 정의',
      text: `"철수, 잘못은 잘못이야."

"훈장님께 사실을 말씀드려야 해."

철수가 벌을 받았어.

하지만... 이게 최선이었을까?

법은 지켜졌지만, 뭔가 아쉬워.`,
      bg: 'https://images.unsplash.com/photo-1758384077255-b53dc9e171a0',
      choices: [
        { label: '고민한다', to: 'case2_reflect', cls: 'bg-blue-200' }
      ],
      prompt: '💭 처벌만이 정의의 전부일까?'
    },
    {
      id: 'case2_teach',
      title: '교육적 정의',
      text: `"철수야, 압박감이 있었구나."

"하지만 부정은 너 자신을 속이는 거야."

"훈장님께 사실을 말하고, 다시 시작하자."

철수가 눈물을 흘리며 고개를 끄덕였어.

"고마워... 이제 정직하게 공부할게."

진정한 교훈을 얻었어!`,
      bg: 'https://images.unsplash.com/photo-1758384077255-b53dc9e171a0',
      choices: [
        { label: '다음 사건으로', to: 'case2_solve', cls: 'bg-green-200' }
      ],
      prompt: '💭 법과 교육이 함께 가야 할까?'
    },
    {
      id: 'case2_reflect',
      title: '정의에 대한 고민',
      text: `법은 지켜졌어.

하지만 철수의 근본적인 문제는...

해결되지 않았어.

"처벌과 교육, 둘 다 필요한 건가?"

정의에 대해 더 깊이 생각하게 돼.`,
      bg: 'https://images.unsplash.com/photo-1758384077255-b53dc9e171a0',
      choices: [
        { label: '다음날로', to: 'case2_solve', cls: 'bg-green-200' }
      ],
      prompt: '💭 완벽한 정의란 무엇일까?'
    },
    {
      id: 'case2_solve',
      title: '신분을 넘어선 정의',
      text: `사건이 해결됐어!

훈장님이 말씀하셨어.

"신분에 관계없이 조사한 네가 대단하구나."

"양반도, 평민도, 중인도..."

"법 앞에서는 모두 평등하단다!"

두 번째 교훈을 배웠어!`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db',
      choices: [
        { label: '며칠 후...', to: 'case3_intro', cls: 'bg-purple-200' }
      ],
      prompt: '💭 법 앞의 평등이 진정한 정의일까?'
    },
    {
      id: 'case3_intro',
      title: '사건 3: 마을의 위기',
      text: `며칠 후, 마을에 큰 사건이!

부자 상인의 창고에서 불이 났어!

많은 곡식이 타버렸어.

가난한 농부 김씨가 불을 질렀다는 의심을 받고 있어!

"김씨 때문이야! 빚을 갚으라고 했더니!"

상인이 소리쳐.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db',
      choices: [
        { label: '조사를 시작한다', to: 'case3_start', cls: 'bg-red-200' }
      ],
      prompt: '💭 가난하다고 범죄자일까?'
    },
    {
      id: 'case3_start',
      title: '사회적 편견과의 싸움',
      text: `마을 사람들이 모였어.

"김씨가 틀림없어! 빚이 많았으니까!"

"가난한 사람들은 믿을 수 없어!"

김씨는 억울해하고 있어.

"저는 안 했습니다!"

어떻게 할까?`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '군중의 의견을 따른다', to: 'case3_follow_crowd', cls: 'bg-red-200' },
        { label: '직접 조사한다', to: 'case3_investigate', cls: 'bg-green-200' }
      ],
      prompt: '💭 다수의 의견이 항상 옳을까?'
    },
    {
      id: 'case3_follow_crowd',
      title: '군중심리의 위험',
      text: `"김씨가 범인인가봐..."

"다들 그렇게 말하니까..."

하지만 뭔가 찝찝해.

김씨의 억울한 눈빛이 떠올라.

"이게 정의일까?"

다시 생각해야겠어.`,
      bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      choices: [
        { label: '직접 조사하기로 한다', to: 'case3_investigate', cls: 'bg-green-200' }
      ],
      prompt: '💭 편견을 따르는 것이 쉬운 길일까?'
    },
    {
      id: 'case3_investigate',
      title: '편견 없는 조사',
      text: `"저는 증거를 찾아보겠습니다!"

마을 사람들이 의아해해.

"김씨가 범인인 게 뻔한데..."

하지만 너는 흔들리지 않았어.

증거가 진실을 말할 거야!`,
      bg: 'https://images.unsplash.com/photo-1762112800093-764ab82c2301',
      choices: [
        { label: '현장을 조사한다', to: 'case3_scene', cls: 'bg-yellow-200' },
        { label: '김씨를 조사한다', to: 'case3_kim', cls: 'bg-blue-200' },
        { label: '목격자를 찾는다', to: 'case3_witness', cls: 'bg-green-200' }
      ],
      prompt: '💭 홀로 정의를 추구하는 용기가 필요할까?'
    },
    {
      id: 'case3_scene',
      title: '불의 흔적',
      text: `창고를 조사했어.

불이 난 곳을 자세히 보니...

기름 자국이 있어!

그리고 비싼 향의 냄새가...

가난한 농부가 쓸 향이 아니야!`,
      bg: 'https://images.unsplash.com/photo-1762112800093-764ab82c2301',
      choices: [
        { label: '기름 자국을 추적한다', to: 'case3_oil_trace', cls: 'bg-yellow-200' },
        { label: '향의 출처를 찾는다', to: 'case3_incense', cls: 'bg-purple-200' }
      ],
      prompt: '💭 작은 단서가 큰 진실을 밝힐까?'
    },
    {
      id: 'case3_kim',
      title: '김씨의 알리바이',
      text: `김씨에게 물어봤어.

"어젯밤 어디 계셨어요?"

"논에서 물을 대고 있었습니다."

"목격자가 있어요?"

"이웃 박씨가 지나가는 걸 봤을 겁니다..."

확인이 필요해!`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '박씨를 찾는다', to: 'case3_park', cls: 'bg-blue-200' },
        { label: '논을 조사한다', to: 'case3_field', cls: 'bg-green-200' }
      ],
      prompt: '💭 알리바이를 확인하는 것이 공정할까?'
    },
    {
      id: 'case3_witness',
      title: '목격자 찾기',
      text: `마을 사람들에게 물어봤어.

한 할머니가 말씀하셨어.

"어젯밤 늦게 누가 창고 쪽으로 가는 걸 봤어."

"얼굴은 못 봤지만..."

"비단옷을 입고 있었어..."

가난한 농부의 옷이 아니야!`,
      bg: 'https://images.unsplash.com/photo-1528799890977-e0dbf229e1e1',
      choices: [
        { label: '더 자세히 묻는다', to: 'case3_witness_detail', cls: 'bg-blue-200' }
      ],
      prompt: '💭 목격자의 작은 정보도 중요할까?'
    },
    {
      id: 'case3_oil_trace',
      title: '기름의 출처',
      text: `기름 자국을 따라갔어.

창고 밖으로 이어져...

부자 상인의 집 방향이야!

"이상한데?"

더 조사해야겠어!`,
      bg: 'https://images.unsplash.com/photo-1528799890977-e0dbf229e1e1',
      choices: [
        { label: '상인의 집을 조사한다', to: 'case3_merchant_house', cls: 'bg-red-200' }
      ],
      prompt: '💭 의심하기 어려운 사람도 조사해야 할까?'
    },
    {
      id: 'case3_incense',
      title: '향의 비밀',
      text: `향의 냄새를 맡아어.

비싼 향이야!

마을에서 이런 향을 쓰는 사람은...

부자 상인밖에 없어!

"설마... 상인이?"`,
      bg: 'https://images.unsplash.com/photo-1762112800093-764ab82c2301',
      choices: [
        { label: '상인을 조사한다', to: 'case3_investigate_merchant', cls: 'bg-red-200' }
      ],
      prompt: '💭 고발자가 범인일 수도 있을까?'
    },
    {
      id: 'case3_park',
      title: '박씨의 증언',
      text: `박씨를 찾아갔어.

"어젯밤 김씨를 봤어요?"

"네! 논에서 물 대고 있었어요."

"몇 시쯤이었어요?"

"해가 질 무렵부터 밤늦게까지..."

김씨는 범인이 아니야!`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '진짜 범인을 찾는다', to: 'case3_real_culprit', cls: 'bg-green-200' }
      ],
      prompt: '💭 알리바이가 무죄를 증명할까?'
    },
    {
      id: 'case3_field',
      title: '논의 증거',
      text: `논으로 갔어.

물이 방금 댄 흔적이!

그리고 김씨의 신발 자국...

어젯밤에 여기 있었던 게 확실해!

김씨는 무죄야!`,
      bg: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      choices: [
        { label: '진짜 범인을 찾는다', to: 'case3_real_culprit', cls: 'bg-green-200' }
      ],
      prompt: '💭 물증이 편견을 이길 수 있을까?'
    },
    {
      id: 'case3_witness_detail',
      title: '목격자의 상세 정보',
      text: `"할머니, 더 기억나는 게 없으세요?"

"음... 키가 컸어."

"그리고 향기가 났어. 비싼 향..."

"급하게 걸어가더구나."

비싼 향... 키 큰 사람...

상인이 의심스러워!`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '상인을 조사한다', to: 'case3_investigate_merchant', cls: 'bg-red-200' }
      ],
      prompt: '💭 세밀한 관찰이 진실을 밝힐까?'
    },
    {
      id: 'case3_merchant_house',
      title: '상인의 집',
      text: `상인의 집 근처를 조사했어.

뒷문에 기름 자국이!

그리고 숨겨진 항아리...

기름이 들어 있어!

창고에 있는 것과 같은 기름이야!`,
      bg: 'https://images.unsplash.com/photo-1730471263121-a14c0b6d515e',
      choices: [
        { label: '상인을 심문한다', to: 'case3_confront_merchant', cls: 'bg-red-200' }
      ],
      prompt: '💭 권력자도 법 앞에 평등할까?'
    },
    {
      id: 'case3_investigate_merchant',
      title: '상인 조사',
      text: `상인에게 다가갔어.

마을 사람들이 놀라워해!

"무슨 소리야! 상인님이 왜!"

"김씨가 범인이라니까!"

하지만 너는 흔들리지 않았어.

"증거를 찾았습니다."`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '증거를 제시한다', to: 'case3_present_evidence', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 권력에 맞서는 용기가 필요할까?'
    },
    {
      id: 'case3_real_culprit',
      title: '진범 추적',
      text: `김씨가 범인이 아니라면...

진짜 범인은 누구?

창고를 다시 조사하러 갔어.

증거가 있을 거야!`,
      bg: 'https://images.unsplash.com/photo-1762112800093-764ab82c2301',
      choices: [
        { label: '창고를 조사한다', to: 'case3_scene', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 포기하지 않는 것이 정의일까?'
    },
    {
      id: 'case3_confront_merchant',
      title: '상안과의 대면',
      text: `"상인님, 이 기름은 뭡니까?"

상인이 당황해!

"그, 그건..."

"그리고 어젯밤 어디 계셨습니까?"

"비단옷을 입고 창고에 가신 것 아닙니까?"

상인의 얼굴이 하얘졌어!`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '진실을 밝힌다', to: 'case3_reveal_truth', cls: 'bg-red-200' }
      ],
      prompt: '💭 진실 앞에서 지위는 무의미할까?'
    },
    {
      id: 'case3_present_evidence',
      title: '증거 제시',
      text: `"창고에서 비싼 향 냄새가 났습니다."

"상인님 집에서 같은 기름을 찾았습니다."

"목격자가 비단옷 입은 사람을 봤습니다."

마을 사람들이 놀랐어!

"설마... 상인님이?"`,
      bg: 'https://images.unsplash.com/photo-1762112800093-764ab82c2301',
      choices: [
        { label: '이유를 묻는다', to: 'case3_ask_why', cls: 'bg-blue-200' }
      ],
      prompt: '💭 증거가 사회적 지위를 이길까?'
    },
    {
      id: 'case3_reveal_truth',
      title: '진실의 순간',
      text: `상인이 무릎을 꿇었어!

"미안합니다..."

"빚을 못 갚는 사람들이 너무 많아서..."

"곡식을 태우고 김씨 탓으로 돌리려..."

"보험금을 받으려고..."

탐욕이 만든 범죄였구나!`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '판결을 내린다', to: 'case3_judgment', cls: 'bg-purple-200' }
      ],
      prompt: '💭 탐욕이 정의를 무너뜨릴까?'
    },
    {
      id: 'case3_ask_why',
      title: '범죄의 동기',
      text: `"왜 그러셨습니까?"

상인이 고백했어.

"장사가 잘 안 돼서..."

"빚이 많아서..."

"보험금을 타려고..."

"그리고 김씨가 가난해서 누명 쓸 거라 생각했습니다..."

권력의 오용이야!`,
      bg: 'https://images.unsplash.com/photo-1584637121674-06a7c34abee4',
      choices: [
        { label: '판결을 생각한다', to: 'case3_judgment', cls: 'bg-purple-200' }
      ],
      prompt: '💭 권력이 있다고 약자를 희생시켜도 될까?'
    },
    {
      id: 'case3_judgment',
      title: '정의의 판결',
      text: `마을 사람들이 너를 바라봐.

"${name.full}, 어떻게 해야 할까?"

이제 판결할 시간이야.

법대로? 교육적으로? 아니면...

지혜로운 판단이 필요해!`,
      bg: 'https://images.unsplash.com/photo-1758384077255-b53dc9e171a0',
      choices: [
        { label: '엄격하게 법을 적용한다', to: 'case3_strict_law', cls: 'bg-red-200' },
        { label: '지혜롭게 해결한다', to: 'case3_wise_solution', cls: 'bg-green-200' }
      ],
      prompt: '💭 지식과 지혜 중 무엇이 더 중요할까?'
    },
    {
      id: 'case3_strict_law',
      title: '법의 엄격함',
      text: `"상인은 방화죄로 관아에 넘깁니다!"

"김씨는 무죄입니다!"

법은 지켜졌어.

하지만 상인이 빚진 사람들은...

근본적인 문제는 남아 있어.`,
      bg: 'https://images.unsplash.com/photo-1758384077255-b53dc9e171a0',
      choices: [
        { label: '고민한다', to: 'case3_reflect', cls: 'bg-blue-200' }
      ],
      prompt: '💭 법만으로 충분할까?'
    },
    {
      id: 'case3_wise_solution',
      title: '지혜로운 해결',
      text: `"상인은 관아에 자수하셔야 합니다."

"하지만 김씨와 마을 사람들의 빚은..."

"상인의 재산으로 해결하고,"

"남은 재산으로 창고를 다시 지어"

"마을을 위해 쓰게 하는 게 어떨까요?"

모두가 고개를 끄덕였어!`,
      bg: 'https://images.unsplash.com/photo-1758384077255-b53dc9e171a0',
      choices: [
        { label: '사건 마무리', to: 'case3_solve', cls: 'bg-green-200' }
      ],
      prompt: '💭 법과 지혜가 함께하면 더 나을까?'
    },
    {
      id: 'case3_reflect',
      title: '법과 정의의 고민',
      text: `법은 정의를 실현했어.

하지만 완전한 해결일까?

피해자들은 여전히 어려워.

"법과 지혜, 둘 다 필요한가봐..."

더 깊이 생각하게 돼.`,
      bg: 'https://images.unsplash.com/photo-1758384077255-b53dc9e171a0',
      choices: [
        { label: '다음으로', to: 'case3_solve', cls: 'bg-green-200' }
      ],
      prompt: '💭 완벽한 정의를 위해 무엇이 필요할까?'
    },
    {
      id: 'case3_solve',
      title: '편견을 넘어선 정의',
      text: `사건이 해결됐어!

김씨가 감사해했어.

"${name.full}, 고맙소!"

"가난하다고 범인으로 몰렸는데..."

"자네가 편견 없이 조사해줬구려!"

마을 사람들도 반성했어.

세 번째 교훈을 배웠어!`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db',
      choices: [
        { label: '며칠 후...', to: 'children_play', cls: 'bg-purple-200' }
      ],
      prompt: '💭 편견 없는 정의가 세상을 바꿀까?'
    },
    {
      id: 'children_play',
      title: '암행어사 놀이',
      text: `며칠 후, 마을 광장.

아이들이 너를 손가마에 태웠어!

"암행어사 출두요!"

"${name.full} 암행어사님 나가신다!"

아이들이 신나게 놀이를 해.

너도 웃으며 마패를 흔들어!`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db',
      choices: [
        { label: '놀이를 즐긴다', to: 'willow_tree', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 꿈을 향해 가는 길은 항상 즐거울까?'
    },
    {
      id: 'willow_tree',
      title: '늙은 버드나무 아래',
      text: `광장 한켠, 늙은 버드나무 아래...

한 어른이 누워서 이 모습을 보고 계셔.

미소를 지으며 중얼거리셔.

"저 아이, 재미있구나..."

"진짜 암행어사의 자질이 있어..."

그 어른은... 바로 박문수였어!`,
      bg: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      choices: [
        { label: '암행어사를 꿈꾼다', to: 'ending', cls: 'bg-purple-200' }
      ],
      prompt: '💭 진정한 암행어사는 무엇을 볼까?'
    },
    {
      id: 'ending',
      title: '암행어사를 꿈꾸며',
      text: `너는 사건들을 해결하며 깨달았어.

🔍 **단서 모아 사건의 원인과 결과를 연결한다.**
💭 **생략되어 있는 부분은 맥락을 파악해 상상한다.**
🎭 **인물의 진짜 정체를 의심하고 예상해 본다.**
🧩 **작은 일들이 모여 큰 이야기 된다.**

📚 《박문수전》은 함께 사건을 해결하듯 추리하며 읽으면 더 재미있어!`,
      bg: 'https://images.unsplash.com/photo-1758384077255-b53dc9e171a0',
      prompt: '《박문전》- 법 앞에서 편견 없이 지혜롭게 백성들의 삶을 도와 나가는 암행어사의 이야기. 티니핑, 신비아파트, 명탐정 코난처럼 사건을 해결하는 추리 소설이야.',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' }
      ]
    }
  ];
}
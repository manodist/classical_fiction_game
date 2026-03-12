import type { Scene } from '../../types';

function hasFinalConsonant(char: string): boolean {
  if (!char) return false;
  const code = char.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return false;
  return (code - 0xAC00) % 28 !== 0;
}

function withParticle(name: string, type: 'subject' | 'topic' | 'object' | 'with'): string {
  const lastChar = name.charAt(name.length - 1);
  const hasFinal = hasFinalConsonant(lastChar);
  
  switch (type) {
    case 'subject':
      return `${name}${hasFinal ? '이' : '가'}`;
    case 'topic':
      return `${name}${hasFinal ? '은' : '는'}`;
    case 'object':
      return `${name}${hasFinal ? '을' : '를'}`;
    case 'with':
      return `${name}${hasFinal ? '과' : '와'}`;
    default:
      return name;
  }
}

function createNameVariations(lastName: string, firstName: string) {
  const full = `${lastName}${firstName}`;
  
  return {
    full,
    first: firstName,
    은는: withParticle(full, 'topic'),
    이가: withParticle(full, 'subject'),
    을를: withParticle(full, 'object'),
    과와: withParticle(full, 'with'),
    의: `${full}의`
  };
}

export function generateHuckFinnStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '보물을 찾은 후',
      text: `너의 이름은 ${name.full}. 
      1840년대 미국 미시시피 강변 마을에 살고 있지.

톰과 허크가 보물을 찾았어! 마을이 떠들썩해.

"6천 달러나 된대!"
"엄청난 부자가 됐네!"

허크는 더글러스 아주머니 집에서 살게 됐어. 깨끗한 옷을 입고, 학교도 다니기 시작했어.

톰과 허크는 산적단을 만들었대. 너도 들어갈래?`,
      bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '산적단에 가입한다', to: 'join_gang', cls: 'bg-red-200' },
        { label: '허크에게 축하해준다', to: 'congratulate', cls: 'bg-blue-200' }
      ],
      prompt: '💭 《톰 소여의 모험》 읽어봤어? 그 다음 이야기야!'
    },
    {
      id: 'join_gang',
      title: '톰 소여 산적단',
      text: `톰이 너를 산적단에 받아줬어!

"피로 서약해야 해! 비밀을 지키겠다고!"

손가락을 살짝 찔러 서명했어.

"우리는 착한 사람은 안 괴롭히고, 나쁜 사람만 혼내줘!"

허크가 말했어.
"진짜 산적은 그냥 다 털잖아?"

"우린 개념있는 산적이야!"

조 하퍼, 베키, 벤 로저스... 다들 모였어.`,
      bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '첫 모험을 계획한다', to: 'plan_adventure', cls: 'bg-green-200' },
        { label: '허크의 이야기를 듣는다', to: 'huck_story', cls: 'bg-purple-200' }
      ],
      prompt: '💭 상상 놀이를 진짜처럼 하면 어떨까?'
    },
    {
      id: 'congratulate',
      title: '부자가 된 허크',
      text: `"허크, 축하해! 이제 진짜 부자네!"

"응... 그런데 좀 이상해."

"왜?"

"돈이 생기니까 더글러스 아주머니 집에서 살아야 하고, 학교도 가야 하고..."

"그래도 좋잖아! 따뜻한 집이잖아!"

"맞아... 근데 가끔 답답해. 규칙이 너무 많아."

허크는 복잡해 보였어.`,
      bg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더글러스 집을 방문한다', to: 'visit_widow', cls: 'bg-purple-200' },
        { label: '학교 이야기를 한다', to: 'school_talk', cls: 'bg-blue-200' }
      ],
      prompt: '💭 돈이 생기면 다 좋은 걸까?'
    },
    {
      id: 'plan_adventure',
      title: '첫 모험 계획',
      text: `톰이 지도를 펼쳤어.

"오늘은 대상 습격이야! 저기 언덕 너머!"

"진짜 대상이 있어?" 베키가 물었어.

"상상력을 발휘해! 아라비아 상인들이야!"

허크가 웃었어.
"좋아, 해보자고!"

산적단은 언덕으로 향했어.`,
      bg: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '언덕으로 출발!', to: 'hill_raid', cls: 'bg-orange-200' },
        { label: '계획을 더 짠다', to: 'hill_raid', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 상상력이 최고의 놀이라고 생각해?'
    },
    {
      id: 'huck_story',
      title: '허크의 고민',
      text: `산적단 모임 후, 허크가 너한테만 조용히 말했어.

"있잖아... 적응이 진짜 어려워."

"뭐가?"

"매일 씻고, 정해진 시간에 밥 먹고, 기도하고... 자유롭게 못 살아."

"하지만 안전하잖아."

"알아... 아빠한테 맞던 것보단 백 배 나아. 근데 가끔 숨 막혀."

허크의 마음이 복잡해 보였어.`,
      bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '위로해준다', to: 'comfort_huck', cls: 'bg-pink-200' },
        { label: '함께 놀자고 한다', to: 'play_together', cls: 'bg-blue-200' }
      ],
      prompt: '💭 자유와 안전, 너라면 뭘 선택할래?'
    },
    {
      id: 'visit_widow',
      title: '더글러스 부인의 집',
      text: `더글러스 아주머니 집은 마을에서 제일 큰 집이야.

허크는 깨끗한 옷을 입고 있었어.

"불편해 보이네?"

"엄청 불편해! 넥타이 조르고, 구두 딱딱하고..."

더글러스 아주머니가 들어오셨어.

"허크, 친구가 왔구나! 같이 저녁 먹겠니?"

정말 친절하신 분이야.`,
      bg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '함께 저녁을 먹는다', to: 'dinner_time', cls: 'bg-orange-200' },
        { label: '허크랑 밖에서 논다', to: 'sneak_out', cls: 'bg-blue-200' }
      ],
      prompt: '💭 집마다 규칙이 다르지?'
    },
    {
      id: 'school_talk',
      title: '학교 생활',
      text: `"학교는 어때?"

"처음엔 진짜 싫었어. 가만히 앉아있기만 하잖아."

"근데 지금은?"

"조금... 재밌어졌어. 글자를 읽을 수 있게 됐거든!"

허크가 자랑스럽게 말했어.

"선생님이 칭찬해주셨어. 열심히 한다고!"

허크가 변하고 있어.`,
      bg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '같이 공부하자고 한다', to: 'study_together', cls: 'bg-purple-200' },
        { label: '톰을 만나러 간다', to: 'meet_tom', cls: 'bg-green-200' }
      ],
      prompt: '💭 새로운 걸 배우면 뿌듯해?'
    },
    {
      id: 'hill_raid',
      title: '대상 습격',
      text: `언덕을 넘어서니... 주일학교 소풍 가는 아이들이었어!

"멈춰라! 산적이다!" 톰이 외쳤어.

꼬마들이 깔깔 웃으며 과자를 줬어.

"이게 습격이야?" 조 하퍼가 투덜댔어.

"상상력을 발휘해! 저건 아라비아 보석이야!" 톰이 말했어.

재밌긴 했지만... 조금 더 진짜 같은 모험은 없을까?`,
      bg: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그래도 재밌게 논다', to: 'enjoy_play', cls: 'bg-yellow-200' },
        { label: '진짜 모험을 원한다', to: 'want_real', cls: 'bg-red-200' }
      ],
      prompt: '💭 상상 놀이도 충분히 재밌지 않아?'
    },
    {
      id: 'comfort_huck',
      title: '위로',
      text: `"허크, 시간이 지나면 익숙해질 거야."

"그럴까?"

"당연하지! 그리고 힘들면 나한테 말해. 친구잖아!"

허크가 웃었어.

"고마워... 너랑 톰이 있어서 견딜 수 있어."

"견디는 게 아니라 적응하는 거야!"

"그래
... 적응."

둘이서 강가로 산책을 갔어.`,
      bg: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '강가를 천천히 걷는다', to: 'river_walk', cls: 'bg-blue-200' },
        { label: '강에서 신나게 논다', to: 'river_play', cls: 'bg-green-200' }
      ],
      prompt: '💭 친구의 위로가 힘이 될까?'
    },
    {
      id: 'play_together',
      title: '함께 놀기',
      text: `"걱정하지 마! 지금 당장 놀러 가자!"

허크가 환하게 웃었어.

"좋아! 어디 갈까?"

"동굴? 강? 숲?"

"강! 강이 좋아!"

너희는 강가로 달려갔어. 허크가 정말 신나 보였어.

자유를 느낄 수 있는 시간이니까.`,
      bg: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '강에서 물장구친다', to: 'river_play', cls: 'bg-blue-200' },
        { label: '강가를 산책한다', to: 'river_walk', cls: 'bg-purple-200' }
      ],
      prompt: '💭 친구와 노는 시간이 제일 좋아?'
    },
    {
      id: 'dinner_time',
      title: '정갈한 저녁',
      text: `더글러스 아주머니의 저녁 식탁은 정갈했어.

식사 전 기도를 했어. 허크는 어색해 보였어.

"음식에 감사하며, 이 아이들이 건강하게 자라길..."

밥은 정말 맛있었어!

식사 중에 아주머니가 말씀하셨어.

"허크, 내일 학교에서 역사 수업 있지?"

"네, 아주머니."

"열심히 들어야 해. 중요한 거야."`,
      bg: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '기대되는 마음으로', to: 'history_class', cls: 'bg-purple-200' },
        { label: '걱정되는 마음으로', to: 'history_class', cls: 'bg-blue-200' }
      ],
      prompt: '💭 가족과 함께 밥 먹는 게 중요할까?'
    },
    {
      id: 'sneak_out',
      title: '몰래 나가기',
      text: `허크가 속삭였어.
"아주머니 모르게 나가자!"

너희는 조용히 뒷문으로 빠져나갔어.

강가로 달려갔어. 허크가 신나 보였어.

"이게 좋아! 숨 쉴 수 있어!"

신발을 벗고 맨발로 풀밭을 밟았어.

잠깐이지만 정말 자유로웠어.`,
      bg: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '강에서 논다', to: 'river_play', cls: 'bg-blue-200' },
        { label: '조금만 더 있다가 돌아간다', to: 'river_walk', cls: 'bg-purple-200' }
      ],
      prompt: '💭 잠깐의 자유라도 중요할까?'
    },
    {
      id: 'study_together',
      title: '함께 공부하기',
      text: `너와 허크는 도서관에서 공부했어.

"이 단어 뭐야?" 허크가 물었어.

"Freedom... 자유라는 뜻이야."

"자유..." 허크가 따라 읽었어.

책을 읽다가 흥미로운 이야기를 발견했어.

"허크, 이거 봐! 역사책이야!"

"뭐에 대한 건데?"

"미국 역사... 내일 수업 시간에 배울 거래."`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '책을 더 읽어본다', to: 'history_class', cls: 'bg-purple-200' },
        { label: '내일 수업에서 듣는다', to: 'history_class', cls: 'bg-blue-200' }
      ],
      prompt: '💭 책에서 세상을 배울 수 있을까?'
    },
    {
      id: 'meet_tom',
      title: '톰의 계획',
      text: `톰을 만나러 갔어.

톰이 신났어.
"내일 학교에서 역사 수업 있잖아?"

"응!"

"우리 미국 남북전쟁 전 시대에 대해 배운대!"

"재밌겠다!"

베키도 같이 있었어.
"선생님이 중요한 수업이라고 하셨어."

"왜 중요한데?"

"내일 알게 될 거야!"`,
      bg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '기대하며 내일을 기다린다', to: 'history_class', cls: 'bg-purple-200' },
        { label: '친구들과 더 이야기한다', to: 'history_class', cls: 'bg-green-200' }
      ],
      prompt: '💭 역사를 배우는 게 왜 중요할까?'
    },
    {
      id: 'enjoy_play',
      title: '즐거운 놀이',
      text: `산적단 놀이는 정말 재밌었어!

매일 방과 후 동굴에 모여서 계획을 짜고, 상상 속 모험을 했어.

"오늘은 해적선을 습격한다!"
"내일은 귀족을 구출한다!"

톰, 허크, 조, 베키... 모두 함께였어.

며칠이 지나고, 학교에서 중요한 수업이 있다는 공지가 있었어.`,
      bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '수업에 간다', to: 'history_class', cls: 'bg-purple-200' },
        { label: '조금 더 놀다가 간다', to: 'history_class', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 친구들과 노는 게 제일 재밌지?'
    },
    {
      id: 'want_real',
      title: '진짜 모험을 찾아서',
      text: `"상상 말고 진짜 모험은 없어?"

허크가 말했어.
"진짜 위험한 건 하기 싫은데?"

"아니야, 그냥 좀 더 실감나는 거!"

톰이 생각했어.
"그럼... 유령의 집에 가볼까?"

마을 외곽에 있는 버려진 집이야.

"무서울 것 같은데..." 베키가 말했어.

"같이 가면 안 무서워!"`,
      bg: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '용기를 내서 간다', to: 'haunted_house', cls: 'bg-gray-200' },
        { label: '무서워서 망설인다', to: 'haunted_house', cls: 'bg-blue-200' }
      ],
      prompt: '💭 친구와 함께하면 용기가 날까?'
    },
    {
      id: 'river_walk',
      title: '강가 산책',
      text: `강가를 걸으며 이야기를 나눴어.

"허크, 진짜로는 어때? 더글러스 아주머니 집."

"좋아... 근데 가끔 숨 막혀."

"왜?"

"예전엔 하고 싶은 거 다 했거든."

"그래도 따뜻하잖아."

"그게 좋아. 아빠한테 맞던 때보다는 백 배 나아."

강물이 흘러가는 걸 보며 생각했어.`,
      bg: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '며칠이 지난다', to: 'days_pass_1', cls: 'bg-blue-200' }
      ],
      prompt: '💭 자유와 안전 중 뭐가 더 중요할까?'
    },
    {
      id: 'river_play',
      title: '강가 놀이',
      text: `강가에서 신나게 놀았어!

돌 던지기, 물장구, 뗏목 타기...

허크가 정말 행복해 보였어.

"이게 좋아! 자유!"

해가 지기 시작했어.

"슬슬 돌아가야 해. 아주머니가 걱정하실 거야."

"알아... 가자."

집으로 돌아가는 길, 허크가 조용했어.`,
      bg: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '며칠이 지난다', to: 'days_pass_1', cls: 'bg-blue-200' }
      ],
      prompt: '💭 자유롭게 노는 시간이 중요?'
    },
    {
      id: 'haunted_house',
      title: '버려진 집',
      text: `유령의 집은 정말 무서워 보였어.

삐걱거리는 문, 깨진 창문...

허크가 먼저 들어갔어.
"유령 같은 거 없어. 그냥 낡은 집이야."

안에는... 누가 자고 간 흔적이 있었어.

"여기서 누가 잤나 봐."

"떠돌이들이 가끔 여기서 자."

허크가 말했어.

벽에 낙서가 있었어. "자유를 향하여..."`,
      bg: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '집을 자세히 탐험한다', to: 'explore_house', cls: 'bg-gray-200' },
        { label: '조금만 보고 나간다', to: 'explore_house', cls: 'bg-blue-200' }
      ],
      prompt: '💭 무서울 때는 어떻게 해야 할까?'
    },
    {
      id: 'days_pass_1',
      title: '평화로운 일상',
      text: `며칠이 평화롭게 지나갔어.

허크는 조금씩 적응했어. 학교도 다니고, 친구들과도 잘 지냈어.

어느 날, 학교에서 공지가 있었어.

"내일은 특별한 역사 수업이 있습니다. 미국의 남북전쟁 이전 시대에 대해 배웁니다."

선생님이 진지하게 말씀하셨어.

"이 수업은 매우 중요합니다. 모두 꼭 참석하세요."`,
      bg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음 날 수업에 간다', to: 'history_class', cls: 'bg-purple-200' }
      ],
      prompt: '💭 역사 수업에서 뭘 배울까?'
    },
    {
      id: 'explore_house',
      title: '발견',
      text: `집을 둘러보다가 더 많은 흔적을 발견했어.

"여기 봐! 최근에 누가 있었나 봐!"

오래된 담요, 빈 깡통...

허크가 조용히 말했어.
"도망치는 사람들이 여기서 쉬다 가."

"도망치는 사람?"

"응... 말하면 안 되는 사람들."

허크가 심각했어.

"비밀로 해야 해. 절대."

며칠 후 학교에서 이에 대해 배우게 됐어.`,
      bg: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '역사 수업에 간다', to: 'history_class', cls: 'bg-purple-200' }
      ],
      prompt: '💭 자유를 찾는 건 왜 중요할까?'
    },
    {
      id: 'history_class',
      title: '중요한 수업',
      text: `선생님이 칠판에 적으셨어.

"1840년대 미국 남부"

"여러분, 오늘은 우리 시대에 대해 배웁니다."

선생님이 심각한 표정으로 말씀하셨어.

"지금 이 순간에도, 우리나라 남쪽에는 노예제가 있습니다."

"노예제도요?" 베키가 물었어.

"네. 흑인들을 물건처럼 사고파는 제도입니다."

교실이 조용해졌어.`,
      bg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '집중해서 듣는다', to: 'slavery_lesson', cls: 'bg-gray-200' },
        { label: '친구들 반응을 살핀다', to: 'slavery_lesson', cls: 'bg-blue-200' }
      ],
      prompt: '💭 왜 역사를 배워야 할까?'
    },
    {
      id: 'slavery_lesson',
      title: '노예제도에 대해',
      text: `선생님이 계속 설명하셨어.

"노예들은 자유가 없습니다. 주인이 시키는 대로 일해야 하고, 돈도 받지 못합니다."

"그건 나쁜 거 아니에요?" 톰이 물었어.

"맞습니다. 아주 잘못된 것입니다. 하지만 많은 사람들이 당연하다고 생각했죠."

"왜요?"

"오래된 생각이었으니까요. 하지만 지금은 많은 사람들이 이게 잘못됐다는 걸 알아요."

허크가 진지하게 듣고 있었어.`,
      bg: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '질문한다', to: 'ask_questions', cls: 'bg-purple-200' },
        { label: '조용히 생각한다', to: 'ask_questions', cls: 'bg-blue-200' }
      ],
      prompt: '💭 잘못된 제도를 바로잡을 수 있을까?'
    },
    {
      id: 'ask_questions',
      title: '질문들',
      text: `너는 손을 들었어.

"선생님, 노예들은 어떻게 해요?"

"어떤 노예들은 도망쳐요. 북쪽으로 가면 자유주가 있거든요."

"잡히면요?"

"...심하게 벌받습니다. 그래서 도망치는 건 아주 위험해요."

조 하퍼가 물었어.
"우리는 뭘 할 수 있어요?"

선생님이 웃으셨어.
"가장 중요한 건 모든 사람을 동등하게 대하는 거예요."`,
      bg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 알고 싶다', to: 'want_learn_more', cls: 'bg-blue-200' },
        { label: '깊이 생각한다', to: 'want_learn_more', cls: 'bg-purple-200' }
      ],
      prompt: '💭 모든 사람이 존중받아야 할까?'
    },
    {
      id: 'want_learn_more',
      title: '더 알아보기',
      text: `수업 후 선생님께 다가갔어.

"선생님, 더 알고 싶어요."

"그래? 좋은 마음이구나."

선생님이 책을 빌려주셨어.

"여기 읽어봐. 노예제도를 없애려는 사람들 이야기야."

"폐지론자들이라고 해. 용감한 사람들이죠."

집에 가서 책을 읽었어. 정말 감동적이었어.`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구들과 이야기한다', to: 'discuss_friends', cls: 'bg-green-200' }
      ],
      prompt: '💭 용기 있는 사람들이 세상을 바꿀 수 있을까?'
    },
    {
      id: 'discuss_friends',
      title: '친구들과의 대화',
      text: `다음 날, 산적단 모임에서 이야기를 나눴어.

"어제 수업 정말 중요했어!" 베키가 말했어.

"맞아. 난 몰랐어. 그렇게 힘든 사람들이 있는 줄." 조가 말했어.

허크가 조용히 말했어.
"나도 자유 없이 살았어. 아빠 집에서."

모두가 허크를 봤어.

"물론 노예만큼은 아니야. 하지만... 자유가 없다는 게 뭔지 알아."

모두 심각해졌어.`,
      bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '산적단의 목표를 정한다', to: 'deep_discussion', cls: 'bg-purple-200' }
      ],
      prompt: '💭 자유가 왜 소중할까?'
    },
    {
      id: 'deep_discussion',
      title: '깊은 대화',
      text: `톰이 말했어.
"우리 산적단의 목표를 바꾸자!"

"어떻게?"

"약한 사람을 돕는 거야. 진짜로!"

"좋은 생각이야!" 너는 동의했어.

"하지만 어떻게?" 베키가 물었어.

허크가 말했어.
"일단 모든 사람을 평등하게 대하는 거. 선생님이 그러셨잖아."

"맞아! 그게 시작이야!"

너희는 새로운 서약을 했어.`,
      bg: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '실천하기로 한다', to: 'make_promise', cls: 'bg-pink-200' }
      ],
      prompt: '💭 작은 실천으로 변화를 만들 수 있을까?'
    },
    {
      id: 'make_promise',
      title: '약속',
      text: `"우리는 모든 사람을 존중한다!"

"피부색이나 출신에 상관없이!"

"약자를 돕고, 부당함과 싸운다!"

너희는 손을 모았어.

"톰 소여 산적단의 새로운 서약!"

모두가 진지했어.

상상 놀이였지만, 마음은 진짜였어.

며칠 후, 너희는 실천할 기회를 만났어.`,
      bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '마을 장터에 간다', to: 'market_day', cls: 'bg-orange-200' }
      ],
      prompt: '💭 약속을 지키는 게 왜 중요할까?'
    },
    {
      id: 'market_day',
      title: '장터 날',
      text: `마을 장터 날이었어.

사람들이 많이 모였어.

물건 파는 사람, 사는 사람...

그때 멀리서 떠들썩한 소리가 들렸어.

"노예 경매가 있대!" 누군가 말했어.

"경매?" 너는 몰랐어.

허크가 설명했어.
"사람을 물건처럼 파는 거야... 끔찍해."

너는 보고 싶지 않지만, 현실을 알아야 한다고 생각해.`,
      bg: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '멀리서 지켜본다', to: 'witness_auction', cls: 'bg-gray-200' },
        { label: '그냥 돌아간다', to: 'turn_away', cls: 'bg-blue-200' }
      ],
      prompt: '💭 현실을 직시하는 게 중요할까?'
    },
    {
      id: 'witness_auction',
      title: '목격',
      text: `멀리서 지켜봤어.

한 가족이 팔리고 있었어. 어머니와 아이들...

"저 아이는 우리랑 나이가 비슷한데..." 베키가 울먹였어.

사람들이 가격을 불렀어. 마치 물건처럼...

가족들이 뿔뿔이 흩어져 팔렸어.

"왜 가족을 떼어놔요?" 너는 화가 났어.

옆의 어른이 말했어.
"원래 그래. 주인 마음이야."

너는 견딜 수 없었어.`,
      bg: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '자리를 떠난다', to: 'leave_market', cls: 'bg-gray-200' }
      ],
      prompt: '💭 잘못된 걸 보면 어떤 기분이 들어?'
    },
    {
      id: 'turn_away',
      title: '돌아서기',
      text: `"못 보겠어. 가자."

친구들도 동의했어.

"우리가 볼 수 있는 게 아니야."

하지만 떠나며 멀리서 들리는 소리...

울음소리, 절규...

귀를 막아도 들렸어.

집으로 가는 길, 아무도 말이 없었어.

모두 마음이 무거웠어.`,
      bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '집에 돌아간다', to: 'return_home', cls: 'bg-blue-200' }
      ],
      prompt: '💭 외면하면 어떻게 될까?'
    },
    {
      id: 'leave_market',
      title: '무거운 마음',
      text: `장터를 떠났어.

"이게 법이라고? 말도 안 돼!" 톰이 화났어.

"법이 틀렸어. 완전히 틀렸어!" 조가 말했어.

허크가 조용히 말했어.
"우리가 뭘 할 수 있을까?"

베키가 말했어.
"지금은 어려도, 커서 바꿀 수 있어. 폐지론자들처럼!"

너희는 결심했어.

절대 잊지 않기로.`,
      bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-blue-200' }
      ],
      prompt: '💭 기억하는 것도 실천일까?'
    },
    {
      id: 'return_home',
      title: '집에서',
      text: `집에 돌아와 생각했어.

오늘 본 것들...

선생님이 말씀하신 것들이 진짜였어.

저녁 시간에 가족들과 이야기했어.

"오늘 장터에서 노예 경매를 봤어요."

부모님이 심각한 표정이 되셨어.

"힘들었겠구나. 하지만 현실을 알게 돼서 다행이야."

"왜요?"

"알아야 바꿀 수 있으니까."`,
      bg: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 이야기를 나눈다', to: 'family_talk', cls: 'bg-purple-200' }
      ],
      prompt: '💭 가족과 깊은 대화를 나눠봤어?'
    },
    {
      id: 'family_talk',
      title: '가족의 가르침',
      text: `아버지가 말씀하셨어.

"이 세상에는 잘못된 것들이 있단다. 노예제도도 그 중 하나지."

"언제 없어지나요?"

"모르지. 하지만 많은 사람들이 싸우고 있어."

어머니가 덧붙이셨어.

"너도 할 수 있는 게 있어. 차별하지 않는 거야."

"그게 도움이 돼요?"

"당연하지. 작은 친절이 모여 세상을 바꾼단다."

너는 고개를 끄덕였어.`,
      bg: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '며칠이 지난다', to: 'days_pass_2', cls: 'bg-blue-200' }
      ],
      prompt: '💭 부모님의 가르침이 중요할까?'
    },
    {
      id: 'days_pass_2',
      title: '변화',
      text: `며칠이 지났어.

너희는 배운 걸 실천하려고 노력했어.

마을에 새로 온 아이가 있었어. 가난한 집 아이였어.

다른 아이들은 무시했지만, 너희는 달랐어.

"같이 놀래?" 톰이 손을 내밀었어.

그 아이가 환하게 웃었어.

"정말요?"

"우리 산적단 친구가 돼!"

작은 실천이었지만 의미 있었어.`,
      bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구들과 사이좋게 지낸다', to: 'peaceful_days', cls: 'bg-green-200' }
      ],
      prompt: '💭 작은 친절로 변화를 만들 수 있을까?'
    },
    {
      id: 'peaceful_days',
      title: '평화로운 날들',
      text: `몇 달이 평화롭게 지났어.

허크는 완전히 적응했어. 학교 성적도 올랐어.

"이제 책 읽는 게 재밌어!" 허크가 말했어.

산적단도 계속됐어. 이제는 정말 의미 있는 놀이였어.

약자를 돕고, 모두를 존중하는...

어느 가을날, 불길한 소문이 들렸어.

"허크 아버지가 마을에 돌아왔대..."`,
      bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '허크를 찾아간다', to: 'father_news', cls: 'bg-gray-200' }
      ],
      prompt: '💭 평화가 계속될 수 있을까?'
    },
    {
      id: 'father_news',
      title: '불길한 소식',
      text: `허크를 찾아갔어.

허크는 창밖을 보고 있었어.

"들었어? 아빠가 왔대..."

"진짜?"

"응. 내 돈을 노리고 온 것 같아."

허크의 아버지는 술고래에 폭력적인 사람이야.

"더글러스 아주머니한테 말씀드려!"

"벌써 말씀드렸어. 근데... 아빠가 법적 보호자거든."

며칠 후, 정말로 허크 아버지가 나타났어.`,
      bg: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '허크를 걱정한다', to: 'worry_about_huck', cls: 'bg-red-200' }
      ],
      prompt: '💭 가족이라고 다 좋은 걸까?'
    },
    {
      id: 'worry_about_huck',
      title: '친구의 위기',
      text: `허크 아버지는 허크를 강 건너 오두막으로 데려갔어.

학교에 허크가 안 왔어. 며칠째...

"허크 괜찮을까?" 베키가 걱정했어.

"뭐라도 해야 하는 거 아냐?" 톰이 말했어.

더글러스 아주머니도 걱정하셨지만, 법이 막고 있었어.

"법이 틀렸어!" 너는 화가 났어.

노예제도도, 허크를 보호 못 하는 것도...

법이 항상 옳은 건 아니었어.`,
      bg: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '허크를 찾으러 간다', to: 'search_for_huck', cls: 'bg-red-200' },
        { label: '어른들께 도움을 청한다', to: 'ask_adults', cls: 'bg-blue-200' }
      ],
      prompt: '💭 친구가 위험할 때 어떻게 해야 할까?'
    },
    {
      id: 'search_for_huck',
      title: '허크를 찾아서',
      text: `너와 톰은 강 건너 오두막으로 갔어.

조심스럽게 다가갔어.

오두막 안에서 소리가 들렸어.

"이 돈은 내 거야!"
"아니에요, 제 거예요!"

허크 아버지가 소리치고 있었어.

"넌 내 아들이니까 네 것은 다 내 거야!"

위험해 보였어. 너희는 숨어서 지켜봤어.

며칠 후, 허크가 도망쳤다는 소문이 들렸어.`,
      bg: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '허크의 흔적을 찾는다', to: 'find_clues', cls: 'bg-gray-200' }
      ],
      prompt: '💭 친구를 위해 용기를 낼 수 있어?'
    },
    {
      id: 'ask_adults',
      title: '어른들의 도움',
      text: `더글러스 아주머니와 마을 판사를 찾아갔어.

"허크를 도와주세요!"

"우리도 돕고 싶단다. 하지만 법이..."

"법이 틀렸어요! 허크 아버지는 나쁜 사람이에요!"

판사가 한숨을 쉬셨어.

"알고 있어. 하지만 아버지가 법적 보호자야."

며칠 후, 허크가 사라졌다는 소식이 들렸어.

오두막은 비어있고, 허크는 없었어.`,
      bg: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '허크를 찾는다', to: 'find_clues', cls: 'bg-gray-200' }
      ],
      prompt: '💭 시스템이 완벽할까?'
    },
    {
      id: 'find_clues',
      title: '단서',
      text: `강가를 수색했어.

뗏목 한 척이 사라졌대.

"허크가 뗏목을 타고 도망쳤을 거야!" 톰이 말했어.

강변에서 작은 쪽지를 발견했어.

"자유를 찾아서..."

허크의 글씨였어.

"어디로 간 걸까?"

"미시시피 강을 따라 내려갔을 거야."

너희는 허크가 안전하길 기도했어.`,
      bg: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '며칠이 지난다', to: 'ending', cls: 'bg-blue-200' }
      ],
      prompt: '💭 허크는 어디로 갔을까?'
    },
    {
      id: 'ending',
      title: '자유를 향한 여정',
      text: `며칠이 지났어.

허크는 떠났어. 미시시피 강을 따라, 자유를 찾아...

더글러스 아주머니께 소식이 전해졌어.

"허크... 무사하길..." 아주머니 눈에 눈물이 고였어.

너는 생각했어. 

허크가 누구를 만날지...
어떤 모험을 할지...
진짜 자유를 찾을 수 있을지...

허크의 진짜 모험은 이제 시작이야.

**📚 《허클베리 핀의 모험》을 읽으면 알 수 있어!**

도서관이나 서점에서 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      prompt: '🌊 《허클베리 핀의 모험》 - 오픈월드 어드벤처 게임처럼 모험을 떠나는 여정! 미시시피 강을 뗏목 타고 내려가며 우정과 자유, 옳고 그름에 대해 고민하는 이야기야. 마크 트웨인이 쓴 미국 문학의 걸작이지!',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' }
      ]
    }
  ];
}
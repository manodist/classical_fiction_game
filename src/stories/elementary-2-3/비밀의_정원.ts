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
    의: `${full}의`,
    casual: `${firstName}야`
  };
}

export function generateSecretGardenStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '인도의 저택',
      text: `너의 이름은 ${name.full}.

1900년대 초, 영국령 인도.
뜨거운 태양 아래 거대한 저택.

너는 부유한 영국인 부모님 밑에서 태어났어.

하지만 부모님은 너를 직접 돌보지 않아.
하인 아야가 모든 걸 해줘.`,
      bg: 'https://images.unsplash.com/photo-1548013146-72479768bada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '엄마를 찾는다', to: 'find_mom', cls: 'bg-pink-200' },
        { label: '아야와 논다', to: 'play_aya', cls: 'bg-blue-200' }
      ],
      prompt: '💭 부모님이 바쁘면 아이는 어떻게 느낄까?'
    },
    {
      id: 'find_mom',
      title: '엄마를 찾아서',
      text: `"엄마!"

너는 저택을 돌아다니며 엄마를 찾아.

엄마는 파티 준비 중이야.
"아야, 아이를 데려가요."

엄마는 너를 보지도 않아.
마음이 아파.`,
      bg: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '울음을 터뜨린다', to: 'cry', cls: 'bg-gray-200' },
        { label: '화를 낸다', to: 'angry', cls: 'bg-red-200' }
      ],
      prompt: '💭 무시당하면 어떤 기분일까?'
    },
    {
      id: 'play_aya',
      title: '아야와의 시간',
      text: `아야가 너를 돌봐줘.

"인형 놀이 하실래요?"

아야는 친절하지만,
네가 원하는 건 모두 들어줘.

점점 버릇없어지는 걸 느껴.`,
      bg: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '명령을 한다', to: 'command', cls: 'bg-red-200' },
        { label: '고맙다고 한다', to: 'thank', cls: 'bg-green-200' }
      ],
      prompt: '💭 모든 걸 들어주면 좋을까?'
    },
    {
      id: 'cry',
      title: '눈물',
      text: `너는 울음을 터뜨렸어.

"엄마... 엄마..."

아야가 달려와서 안아줘.
하지만 엄마는 오지 않아.

외로움이 마음에 쌓여가.`,
      bg: 'https://images.unsplash.com/photo-1494791368093-85217fbbf8de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '혼자 있기로 한다', to: 'alone', cls: 'bg-gray-200' },
        { label: '아야에게 매달린다', to: 'cling', cls: 'bg-blue-200' }
      ],
      prompt: '💭 외로울 때 어떻게 해?'
    },
    {
      id: 'angry',
      title: '화',
      text: `너는 소리를 지르며 떼를 썼어.

"싫어! 엄마 보고 싶어!"

아야가 당황하며 달려와.
"진정하세요!"

하지만 너는 계속 화를 내.`,
      bg: 'https://images.unsplash.com/photo-1688705992559-0cdecfea2150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 떼를 쓴다', to: 'tantrum', cls: 'bg-red-200' },
        { label: '진정한다', to: 'calm', cls: 'bg-blue-200' }
      ],
      prompt: '💭 화는 어떻게 다스려야 할까?'
    },
    {
      id: 'command',
      title: '명령',
      text: `"이거 가져와!"
"저거 치워!"

너는 아야에게 명령만 해.

아야는 "예"라며
모든 걸 들어줘.

너는 점점 더 거만해져.`,
      bg: 'https://images.unsplash.com/photo-1528559827341-b4e108f6ff32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 많이 요구한다', to: 'demand', cls: 'bg-red-200' },
        { label: '아야가 힘들어 보인다', to: 'notice', cls: 'bg-blue-200' }
      ],
      prompt: '💭 명령만 하는 사람은 어떻게 될까?'
    },
    {
      id: 'thank',
      title: '감사',
      text: `"고마워, 아야."

아야가 깜짝 놀라며 웃어.
"정말 착하시네요!"

따뜻한 기분이 들어.
감사를 표현하니 기분이 좋아.`,
      bg: 'https://images.unsplash.com/photo-1565164705190-d5e3b7fb3446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 친절하다', to: 'kind', cls: 'bg-green-200' },
        { label: '가끔 친절하다', to: 'sometimes', cls: 'bg-blue-200' }
      ],
      prompt: '💭 감사하는 마은도 전염이 될까?'
    },
    {
      id: 'alone',
      title: '혼자',
      text: `너는 혼자 있기로 했어.

방 구석에 앉아 창밖을 봐.
뜨거운 인도의 정원이 보여.

하지만 나가지 않아.
"혼자가 편해."`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 방에 있는다', to: 'isolate', cls: 'bg-gray-200' },
        { label: '정원이 궁금하다', to: 'curious', cls: 'bg-green-200' }
      ],
      prompt: '💭 혼자 있는 게 항상 좋을까?'
    },
    {
      id: 'cling',
      title: '매달림',
      text: `너는 아야에게 매달렸어.

"아야, 가지 마!"

아야는 너를 안아주지만,
일도 해야 해.

"잠깐만요..."
혼자 남는 게 무서워.`,
      bg: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 따라다닌다', to: 'follow', cls: 'bg-blue-200' },
        { label: '혼자 놀아본다', to: 'play_alone', cls: 'bg-purple-200' }
      ],
      prompt: '💭 혼자 있는 방법도 배워야 할까?'
    },
    {
      id: 'tantrum',
      title: '떼쓰기',
      text: `너는 바닥에 드러누워 소리를 질러.

"싫어! 싫어!"

하인들이 당황해.
아야가 사탕을 줘.

떼쓰면 원하는 걸 얻을 수 있다는 걸 배워.`,
      bg: 'https://images.unsplash.com/photo-1688705992559-0cdecfea2150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '습관이 된다', to: 'habit', cls: 'bg-red-200' },
        { label: '미안하다', to: 'sorry', cls: 'bg-green-200' }
      ],
      prompt: '💭 떼쓰는 습관은 어떤 결과를 낳을까?'
    },
    {
      id: 'calm',
      title: '진정',
      text: `너는 깊게 숨을 쉬며 진정했어.

"괜찮아..."

아야가 손을 잡아줘.
"잘하셨어요."

감정을 조절하는 법을 배워가.`,
      bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '아야와 이야기한다', to: 'talk', cls: 'bg-blue-200' },
        { label: '스스로 생각한다', to: 'think', cls: 'bg-purple-200' }
      ],
      prompt: '💭 감정 조절이 왜 중요할까?'
    },
    {
      id: 'demand',
      title: '요구',
      text: `"더 많이! 더 크게!"

너는 계속 떼를 쓰며 요구해.

아야는 지쳐 보여.
하지만 여전히 모든 걸 들어줘.

너는 철 없이 만족할 줄 몰라.`,
      bg: 'https://images.unsplash.com/photo-1528559827341-b4e108f6ff32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 요구한다', to: 'greedy', cls: 'bg-red-200' },
        { label: '허전함을 느낀다', to: 'empty', cls: 'bg-gray-200' }
      ],
      prompt: '💭 많이 가지면 행복할까?'
    },
    {
      id: 'notice',
      title: '눈치',
      text: `아야를 자세히 봤어.

피곤한 눈,
힘든 표정.

"아야... 힘들어?"
"아니에요."

하지만 눈은 거짓말하지 않아.`,
      bg: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '덜 요구한다', to: 'less', cls: 'bg-green-200' },
        { label: '돕는다', to: 'help', cls: 'bg-blue-200' }
      ],
      prompt: '💭 다른 사람의 감정을 살필 줄 알아야 할까?'
    },
    {
      id: 'kind',
      title: '친절',
      text: `너는 계속 친절했어.

"고마워."
"괜찮아?"
"도와줄까?"

아야가 행복해해.
저택 분위기가 밝아져.`,
      bg: 'https://images.unsplash.com/photo-1565164705190-d5e3b7fb3446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '모두에게 친절하다', to: 'all_kind', cls: 'bg-green-200' },
        { label: '아야에게만 친절하다', to: 'aya_only', cls: 'bg-blue-200' }
      ],
      prompt: '💭 친절은 전염될까?'
    },
    {
      id: 'sometimes',
      title: '기분파',
      text: `기분 좋을 때만 친절해.

좋은 날: "고마워!"
나쁜 날: "빨리!"

사람들이 혼란스러워해.
"오늘은 어떨까?"`,
      bg: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '일관성 있게 행동한다', to: 'consistent', cls: 'bg-green-200' },
        { label: '그냥 그렇게 산다', to: 'moody', cls: 'bg-gray-200' }
      ],
      prompt: '💭 일관성이 왜 중요할까?'
    },
    {
      id: 'isolate',
      title: '고립',
      text: `너는 계속 방에만 있어.

창밖의 햇빛도,
정원의 꽃도,
아무것도 관심 없어.

마음이 점점 차가워져.`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 혼자 있는다', to: 'cold', cls: 'bg-gray-200' },
        { label: '밖이 궁금해진다', to: 'curious', cls: 'bg-green-200' }
      ],
      prompt: '💭 너무 오래 혼자 있으면 어떻게 될까?'
    },
    {
      id: 'curious',
      title: '궁금증',
      text: `창밖 정원이 궁금해졌어.

붉은 장미,
노란 나비,
초록 잔디.

"나가볼까?"

조심스럽게 문을 열어.`,
      bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '정원으로 간다', to: 'garden', cls: 'bg-green-200' },
        { label: '망설인다', to: 'hesitate', cls: 'bg-gray-200' }
      ],
      prompt: '💭 새로운 걸 시도하는 게 무서울까?'
    },
    {
      id: 'follow',
      title: '따라다니기',
      text: `너는 아야를 따라다녀.

부엌, 세탁실, 정원...

"아야! 어디 가?"

아야는 일을 할 수가 없어.
다른 하인들이 불편해 하는 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 따라다닌다', to: 'clingy', cls: 'bg-blue-200' },
        { label: '공간을 준다', to: 'space', cls: 'bg-green-200' }
      ],
      prompt: '💭 매달리는 건 사랑일까?'
    },
    {
      id: 'play_alone',
      title: '혼자 놀기',
      text: `너는 혼자 놀아보기로 했어.

인형을 꺼내서 이야기를 만들어.

"안녕, 나는 공주야."

처음엔 어색하지만 점점 재미있어져.`,
      bg: 'https://images.unsplash.com/photo-1560769680-ba4b39bdbbf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '상상놀이를 즐긴다', to: 'imagination', cls: 'bg-purple-200' },
        { label: '친구가 그립다', to: 'miss_friend', cls: 'bg-blue-200' }
      ],
      prompt: '💭 혼자서도 즐겁게 놀 수 있을까?'
    },
    {
      id: 'habit',
      title: '나쁜 습관',
      text: `떼쓰는 게 습관이 됐어.

원하는 게 있으면 소리를 지르고,
마음에 안 들면 물건을 던져.

하인들이 너를 '작은 악마'라고 불러.

너는 점점 외로워져.`,
      bg: 'https://images.unsplash.com/photo-1688705992559-0cdecfea2150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 그렇게 산다', to: 'spoiled', cls: 'bg-red-200' },
        { label: '뭔가 잘못됐다고 느낀다', to: 'wrong', cls: 'bg-blue-200' }
      ],
      prompt: '💭 나쁜 습관 뒤에 무엇이 숨어있을까?'
    },
    {
      id: 'sorry',
      title: '미안함',
      text: `"미안해, 아야..."

아야가 깜짝 놀라.

아야가 너를 꼭 안아줘.
마음이 따뜻해져.`,
      bg: 'https://images.unsplash.com/photo-1565164705190-d5e3b7fb3446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '조심하기로 한다', to: 'careful', cls: 'bg-green-200' },
        { label: '또 실수한다', to: 'repeat', cls: 'bg-red-200' }
      ],
      prompt: '💭 사과하면 어떤 기분일까?'
    },
    {
      id: 'talk',
      title: '대화',
      text: `"아야, 엄마는 왜 나랑 안 놀아?"

아야가 조심스럽게 대답해.
"부인께서는 바쁘세요."

"나는 중요하지 않은 거야?"
"아니에요! 소중해요."

아야가 너를 안아줘.`,
      bg: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '아야가 가족 같다', to: 'family', cls: 'bg-pink-200' },
        { label: '엄마가 그립다', to: 'miss_mom', cls: 'bg-gray-200' }
      ],
      prompt: '💭 가족이 아니어도 가족처럼 느낄 수 있을까?'
    },
    {
      id: 'think',
      title: '생각',
      text: `혼자 앉아 생각해.

"왜 화가 났을까?"
"왜 슬플까?"

스스로를 이해하기 시작해.

감정을 알아가는 중이야.`,
      bg: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 생각한다', to: 'deep_think', cls: 'bg-purple-200' },
        { label: '아야에게 물어본다', to: 'ask', cls: 'bg-blue-200' }
      ],
      prompt: '💭 자신을 이해하는 게 중요할까?'
    },
    {
      id: 'greedy',
      title: '욕심',
      text: `장난감도 많고,
옷도 많고,
음식도 많아.

하지만 행복하지 않아.

"왜 이렇게 허전하지?"`,
      bg: 'https://images.unsplash.com/photo-1528559827341-b4e108f6ff32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 요구한다', to: 'more', cls: 'bg-red-200' },
        { label: '다른 게 필요한 걸까?', to: 'different', cls: 'bg-blue-200' }
      ],
      prompt: '💭 물건이 많으면 행복할까?'
    },
    {
      id: 'empty',
      title: '허전함',
      text: `모든 걸 가졌지만 허전해.

"왜 이럴까?"

물질이 아니라
사람이 필요했던 거야.`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사람들에게 다가간다', to: 'approach', cls: 'bg-green-200' },
        { label: '어떻게 할지 모르겠다', to: 'confused', cls: 'bg-gray-200' }
      ],
      prompt: '💭 진짜 필요한 게 뭘까?'
    },
    {
      id: 'less',
      title: '조금 덜',
      text: `"아야, 이것만..."

너는 요구를 줄였어.

아야가 놀라며 웃어.
"감사해요!"

작은 변화지만 중요해.`,
      bg: 'https://images.unsplash.com/photo-1565164705190-d5e3b7fb3446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 배려한다', to: 'care', cls: 'bg-green-200' },
        { label: '가끔만 배려한다', to: 'sometimes_care', cls: 'bg-blue-200' }
      ],
      prompt: '💭 작은 배려도 중요할까?'
    },
    {
      id: 'help',
      title: '도움',
      text: `"아야, 내가 도와줄게!"

너는 아야의 일을 도와.

처음엔 서툴지만 점점 잘해.

"정말 착하네요!"`,
      bg: 'https://images.unsplash.com/photo-1565164705190-d5e3b7fb3446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 돕는다', to: 'helpful', cls: 'bg-green-200' },
        { label: '행복하다', to: 'happy', cls: 'bg-pink-200' }
      ],
      prompt: '💭 남을 돕는 게 왜 기분 좋을까?'
    },
    {
      id: 'all_kind',
      title: '모두에게',
      text: `너는 모든 하인에게 친절했어.

"고마워요."
"수고하세요."

사람들이 너를 좋아해.
저택이 밝아져.`,
      bg: 'https://images.unsplash.com/photo-1565164705190-d5e3b7fb3446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친절이 습관이 된다', to: 'kind_habit', cls: 'bg-green-200' },
        { label: '행복하다', to: 'happy', cls: 'bg-pink-200' }
      ],
      prompt: '💭 친절은 주변을 어떻게 바꿀까?'
    },
    {
      id: 'aya_only',
      title: '아야에게만',
      text: `아야에게만 친절해.

다른 하인들에게는 여전히 명령해.

하인들이 속삭여.
"아야에게만 친절하네..."
"차별하는거야 뭐야..."`,
      bg: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '모두에게 친절하려 한다', to: 'try_all', cls: 'bg-green-200' },
        { label: '아야만 특별하다', to: 'aya_special', cls: 'bg-blue-200' }
      ],
      prompt: '💭 차별하는 친절은 진짜 친절일까?'
    },
    {
      id: 'garden',
      title: '정원',
      text: `너는 정원으로 나갔어.

햇살이 따뜻하고,
바람이 시원하고,
꽃향기가 좋아.

"예쁘다..."

자연이 너를 위로해줘.`,
      bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '매일 나온다', to: 'daily', cls: 'bg-green-200' },
        { label: '평화롭다', to: 'peace', cls: 'bg-blue-200' }
      ],
      prompt: '💭 자연이 마음을 치유할까?'
    },
    {
      id: 'illness',
      title: '이상한 병',
      text: `어느 날부터 저택이 이상해져.

하인들이 쓰러지고,기침 소리가 들려.

"콜레라다!"

콜레라는 코로나 같이 전염될 수 있고 
적절한 치료가 이루어지지 않으면 
죽음에 이를 수도 있는 무서운 병이야.

사람들이 공포에 떨어.
너는 방에 갇혀있어.`,
      bg: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무서워한다', to: 'scared', cls: 'bg-gray-200' },
        { label: '아야를 찾는다', to: 'find_aya', cls: 'bg-blue-200' }
      ],
      prompt: '💭 위기 상황에서 가장 먼저 떠오르는 사람은?'
    },
    {
      id: 'scared',
      title: '두려움',
      text: `너는 방 구석에 웅크리고 있어.

밖에서 들리는 소리들,
사람들의 비명,
급한 발소리.

"무서워..."

아무도 찾아오지 않아.`,
      bg: 'https://images.unsplash.com/photo-1494791368093-85217fbbf8de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '숨어있는다', to: 'hide', cls: 'bg-gray-200' },
        { label: '밖으로 나간다', to: 'go_out', cls: 'bg-blue-200' }
      ],
      prompt: '💭 두려울 때 어떻게 해야 할까?'
    },
    {
      id: 'find_aya',
      title: '아야 찾기',
      text: `"아야! 아야!"

너는 저택을 돌아다녀.

하지만 아야가 보이지 않아.
다른 하인들도 없어.

이상하게 조용해.`,
      bg: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 찾는다', to: 'search', cls: 'bg-blue-200' },
        { label: '포기한다', to: 'give_up', cls: 'bg-gray-200' }
      ],
      prompt: '💭 포기하지 않는 게 중요할까?'
    },
    {
      id: 'hide',
      title: '숨기',
      text: `옷장 속에 숨었어.

밖의 소리가 점점 작아져.
이상하게 조용해.

"모두 어디 갔지?"

무섭지만 나갈 수가 없어.`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 숨는다', to: 'stay_hidden', cls: 'bg-gray-200' },
        { label: '용기를 낸다', to: 'brave', cls: 'bg-blue-200' }
      ],
      prompt: '💭 도망치는 게 해결책일까?'
    },
    {
      id: 'go_out',
      title: '밖으로',
      text: `용기를 내서 밖으로 나갔어.

저택은 텅 비어있어.
아무도 없어.

"여보세요?"

메아리만 돌아와.`,
      bg: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 찾는다', to: 'search', cls: 'bg-blue-200' },
        { label: '정원으로 간다', to: 'garden_final', cls: 'bg-green-200' }
      ],
      prompt: '💭 혼자 남겨지면 어떤 기분일까?'
    },
    {
      id: 'search',
      title: '찾기',
      text: `너는 포기하지 않고 찾아.

방마다, 복도마다...

하지만 아무도 없어.

"정말 혼자인가봐..."

눈물이 나.`,
      bg: 'https://images.unsplash.com/photo-1494791368093-85217fbbf8de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '운다', to: 'cry_final', cls: 'bg-gray-200' },
        { label: '강해지기로 한다', to: 'strong', cls: 'bg-blue-200' }
      ],
      prompt: '💭 혼자서도 강해질 수 있을까?'
    },
    {
      id: 'give_up',
      title: '포기',
      text: `찾는 걸 포기했어.

방으로 돌아가서 침대에 누워.

"모두 날 버렸어."

외로움에 잠들어.`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 잔다', to: 'sleep', cls: 'bg-gray-200' },
        { label: '일어난다', to: 'wake', cls: 'bg-blue-200' }
      ],
      prompt: '💭 포기하면 어떻게 될까?'
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `영국 군인이 너를 발견했어.

콜레라로 모든 사람이 죽었어.
엄마도, 아빠도, 아야도.

영국의 친척 집으로 가게 됐어.

《비밀의 정원》에서는 황량한 저택의 비밀 정원을 발견하고, 자연과 우정으로 마음을 여는 이야기가 펼쳐져!

📚 서점이나 도서관에서 《비밀의 정원》을 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1582203914689-d5cc1850fcb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      prompt: '《비밀의 정원》 - 마치 "동물의 숲"에서 황량한 섬을 꾸며가듯이! 버려진 정원을 되살리며 닫힌 마음을 여는 치유 이야기야.',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' }
      ]
    },
    // 모든 종료 노드들을 엔딩으로 연결
    { id: 'cold', title: '차가운 마음', text: `마음이 얼음처럼 차가워졌어.\n\n아무것도 느껴지지 않아.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 소리가 들려', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 감정을 잃으면 어떻게 될까?' },
    { id: 'hesitate', title: '망설임', text: `망설이다가 다시 방으로 들어와.\n\n"다음에 나가야지."\n\n그런데 그때...`, bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 망설이면 기회를 놓칠까?' },
    { id: 'clingy', title: '의존', text: `너는 아야에게서 떨어지지 않아.\n\n혼자 있는 법을 배우지 못해.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 독립심이 왜 필요할까?' },
    { id: 'space', title: '공간', text: `"아야, 일 끝나면 놀아줘!"\n\n너는 기다릴 줄 알게 됐어.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 기다림을 배우는 게 중요할까?' },
    { id: 'imagination', title: '상상', text: `상상놀이의 세계에 빠져.\n\n혼자여도 재미있어!\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1560769680-ba4b39bdbbf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 상상력은 왜 중요할까?' },
    { id: 'miss_friend', title: '친구', text: `"진짜 친구가 있으면 좋겠어."\n\n혼자는 외로워.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 친구가 왜 필요할까?' },
    { id: 'spoiled', title: '버릇없음', text: `너는 점점 더 버릇없어져.\n\n사람들이 피해.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1688705992559-0cdecfea2150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 버릇없는 행동의 결과는?' },
    { id: 'wrong', title: '깨달음', text: `"뭔가 잘못됐어."\n\n변하고 싶어.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-500' }], prompt: '💭 깨달음이 변화의 시작일까?' },
    { id: 'careful', title: '조심', text: `너는 조심하기 시작했어.\n\n점점 좋아져.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1565164705190-d5e3b7fb3446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 조심하는 마음이 중요할까?' },
    { id: 'repeat', title: '반복', text: `또 실수했어.\n\n습관을 바꾸는 건 어려워.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1688705992559-0cdecfea2150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 나쁜 습관은 어떻게 고칠까?' },
    { id: 'family', title: '가족', text: `아야는 진짜 가족 같아.\n\n따뜻해.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 사랑은 혈연과 상관없을까?' },
    { id: 'miss_mom', title: '엄마', text: `엄마가 그리워.\n\n하지만 엄마는 여전히 바빠.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1494791368093-85217fbbf8de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 그리움은 어떻게 다뤄야 할까?' },
    { id: 'deep_think', title: '깊은 생각', text: `계속 생각에 잠겨.\n\n철학적이 돼가.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 생각과 행동 중 뭐가 중요할까?' },
    { id: 'ask', title: '질문', text: `아야에게 질문해.\n\n많은 걸 배워.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-500' }], prompt: '💭 질문하는 게 중요할까?' },
    { id: 'more', title: '더', text: `계속 더 요구해.\n\n만족이 없어.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1528559827341-b4e108f6ff32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-500' }], prompt: '💭 욕심은 끝이 없을까?' },
    { id: 'different', title: '다른 것', text: `"물건이 아니라 사람이 필요해."\n\n깨달았어.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 진짜 필요한 게 뭘까?' },
    { id: 'approach', title: '다가가기', text: `사람들에게 다가가.\n\n용기를 냈어.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1565164705190-d5e3b7fb3446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 첫걸음이 중요할까?' },
    { id: 'confused', title: '혼란', text: `어떻게 해야 할지 모르겠어.\n\n막막해.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 혼란스러울 때 어떻게 할까?' },
    { id: 'care', title: '배려', text: `배려가 습관이 됐어.\n\n기분이 좋아.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1565164705190-d5e3b7fb3446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-500' }], prompt: '💭 배려는 습관이 될까?' },
    { id: 'sometimes_care', title: '가끔 배려', text: `가끔만 배려해.\n\n일관성이 없어.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 일관성이 왜 중요할까?' },
    { id: 'helpful', title: '도움', text: `남을 돕는 게 좋아.\n\n행복해.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1565164705190-d5e3b7fb3446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 나눔이 왜 기쁠까?' },
    { id: 'happy', title: '행복', text: `너는 행복해!\n\n마음이 따뜻해.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1565164705190-d5e3b7fb3446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 진짜 행복은 뭘까?' },
    { id: 'kind_habit', title: '친절 습관', text: `친절이 완전히 습관이 됐어!\n\n좋은 사람이 됐어.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1565164705190-d5e3b7fb3446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 좋은 습관은 어떻게 만들어질까?' },
    { id: 'try_all', title: '모두에게', text: `모두에게 친절하려 노력해.\n\n점점 좋아져.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1565164705190-d5e3b7fb3446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 노력이 중요할까?' },
    { id: 'aya_special', title: '특별', text: `아야만 특별해.\n\n다른 사람은 몰라.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 차별은 옳을까?' },
    { id: 'consistent', title: '일관성', text: `일관성 있게 행동해.\n\n사람들이 믿어.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1565164705190-d5e3b7fb3446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 일관성이 신뢰를 만들까?' },
    { id: 'moody', title: '기분파', text: `기분에 따라 행동해.\n\n사람들이 혼란스러워해.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 기분파의 문제는?' },
    { id: 'daily', title: '매일', text: `매일 정원에 나가.\n\n자연이 친구가 돼.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 자연이 주는 위로는?' },
    { id: 'peace', title: '평화', text: `평화로운 마음.\n\n고요해.\n\n그런데...`, bg: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '이상한 일이 생겨', to: 'illness', cls: 'bg-red-200' }], prompt: '💭 평화가 중요할까?' },
    { id: 'stay_hidden', title: '계속 숨기', text: `계속 숨어있어.\n\n너무 무서워.\n\n그런데 밖이 조용해졌어.`, bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '나가본다', to: 'ending', cls: 'bg-blue-200' }], prompt: '💭 언젠가는 나가야 해' },
    { id: 'brave', title: '용기', text: `용기를 냈어.\n\n밖으로 나가.\n\n이 상황을 알려주고 도와 줄 사람을 찾아 나서.`, bg: 'https://images.unsplash.com/photo-1610137444548-728e7c4b49d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '다음 날', to: 'ending', cls: 'bg-blue-200' }], prompt: '💭 용기를 내려면 어떻게 해야 할까?' },
    { id: 'garden_final', title: '정원으로', text: `정원으로 나갔어.\n\n하지만 아무도 없어.\n\n이제 어떻게 해야 할지 막막해.`, bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '다음 날', to: 'ending', cls: 'bg-blue-200' }], prompt: '💭 혼자인 것은 편한걸까?' },
    { id: 'cry_final', title: '눈물', text: `눈물이 나.\n\n하지만 강해져야 해.\n\n눈물은 계속 흐르지만 마음만은 굳게 먹기로 다짐해.`, bg: 'https://images.unsplash.com/photo-1494791368093-85217fbbf8de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '다음 날', to: 'ending', cls: 'bg-blue-200' }], prompt: '💭 최근에 눈물을 흘린적이 있어?' },
    { id: 'strong', title: '강함', text: `강해지기로 했어.\n\n혼자서도 할 수 있어.\n\n하지만 그럴수록 마음은 점점 차가워져.\n\n다른 사람들에게 마음을 여는 것이 쉽지 않아.`, bg: 'https://images.unsplash.com/photo-1610137444548-728e7c4b49d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '다음 날', to: 'ending', cls: 'bg-blue-200' }], prompt: '💭 강해지려면 어떻게 해야 할까?' },
    { id: 'sleep', title: '잠', text: `계속 자고 있어.\n\n그런데 누군가 오는 소리...\n\n누구일까?\n\n이불 밖은 위험하니까 머리까지 뒤집어 ㅆ고 숨어있자.`, bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '다음 날', to: 'ending', cls: 'bg-blue-200' }], prompt: '💭 누가 오는 걸까?' },
    { id: 'wake', title: '일어나기', text: `일어나서 밖을 봐.\n\n조용해.\n\n아무도 없는 마당과 집 밖은 쓸쓸하고 고요하기만 해.`, bg: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', choices: [{ label: '다음 날', to: 'ending', cls: 'bg-blue-200' }], prompt: '💭 무슨 일이 일어났을까?' }
  ];
}
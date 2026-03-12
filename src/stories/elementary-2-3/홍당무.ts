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
    polite: `${full} 님`,
    casual: full
  };
}

export function generateHongdangmuStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '🚂 시골로 이사',
      text: `너의 이름은 ${name.full}. 
      1800년대 프랑스.
오늘은 시골 마을로 이사 가는 날이야.

기차 안. 

엄마는 펠릭스 옆에 앉아 빵을 줘.
너는 짐 옆에 혼자 앉았어. 아무것도 못 받아.

'배고픈데...' 참아야 해.
창밖으로 들판이 지나가.`,
      bg: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '배고프다고 말한다', to: 'speak_up', cls: 'bg-red-300' },
        { label: '참고 창밖을 본다', to: 'look_outside', cls: 'bg-gray-300' }
      ],
      prompt: '💭 불공평한 상황에서 어떻게 해야 할까?'
    },
    {
      id: 'speak_up',
      title: '😔 용기 내어 말하기',
      text: `"엄마, 저도 배고파요."

엄마가 차갑게 말해.
"넌 아까 먹었잖아."

하지만 조금밖에 못 먹었어.
펠릭스가 빵을 먹으면서 너를 보고 픽 웃어.

펠릭스는 약삭빠르고 눈치가 빨라서
항상 엄마의 사랑을 독차지 해.

엄마는 더 이상 대답하지 않아.`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '눈물이 난다', to: 'feel_hurt', cls: 'bg-blue-300' },
        { label: '창밖을 본다', to: 'look_outside', cls: 'bg-gray-300' }
      ],
      prompt: '💭 형제 자매에게 질투가 난 적이 있어? ?'
    },
    {
      id: 'feel_hurt',
      title: '💔 상처받은 마음',
      text: `눈물이 날 것 같아.
하지만 꾹 참아. 

울면 에르네스틴이 놀릴 것 같아.

'왜... 왜 나만...'

기차가 덜컹거려. 역에 도착했나 봐.
새로운 집으로 가야 해.`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '역에서 내린다', to: 'arrive_house', cls: 'bg-blue-300' }
      ],
      prompt: '💭 슬픔을 혼자 삼키면 어떨까?'
    },
    {
      id: 'look_outside',
      title: '🌾 창밖의 세상',
      text: `너는 창밖을 봐.
들판, 숲, 작은 집들이 지나가.

'새로운 곳에 가면 달라질까?'
작은 희망이 생겨.

기차가 역에 멈춰.

"다 왔다. 내려!" 엄마가 말해.`,
      bg: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무거운 짐을 든다', to: 'arrive_house', cls: 'bg-gray-300' }
      ],
      prompt: '💭 새로운 곳에서는 행복할 수 있을까?'
    },
    {
      id: 'arrive_house',
      title: '🏠 새 집 도착',
      text: `돌담으로 둘러싸인 집. 너는 무거운 짐을 들고 들어가.

엄마가 말해.
"펠릭스, 너는 이 큰 방!"
"에르네스틴은 이 아담한 방!"
"${name.full}, 너는 다락방."

좁은 계단을 올라가니 다락방이 보여.
천장이 낮고, 창문이 작아. 

하지만... 너만의 공간이야.`,
      bg: 'https://images.unsplash.com/photo-1601314035641-880c6ebe559e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '짐을 정리한다', to: 'unpack_room', cls: 'bg-blue-300' },
        { label: '창밖을 본다', to: 'see_garden', cls: 'bg-green-300' }
      ],
      prompt: '💭 작아도 내 방이 있으면 좋을까?'
    },
    {
      id: 'unpack_room',
      title: '📦 혼자 정리하기',
      text: `너는 혼자 짐을 풀어.

아래층에서 소리가 들려.
엄마와 펠릭스가 웃으며 이야기해.

너는... 혼자. 항상 혼자.
하지만 이 작은 방은 오롯이 네 거야.`,
      bg: 'https://images.unsplash.com/photo-1601314035641-880c6ebe559e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '창밖을 본다', to: 'see_garden', cls: 'bg-green-300' }
      ],
      prompt: '💭 혼자만의 공간이 위로가 될까?'
    },
    {
      id: 'see_garden',
      title: '🌳 정원 발견',
      text: `작은 창문으로 밖을 봐.

정원이 보여! 채소밭, 과일나무, 꽃들...
햇살이 반짝반짝.

'저기는... 예쁘네.'
마음이 조금 가벼워져. 

내일 가봐야지.`,
      bg: 'https://images.unsplash.com/photo-1717959159782-98c42b1d4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '저녁 식사 시간', to: 'dinner_time', cls: 'bg-orange-300' }
      ],
      prompt: '💭 자연이 마음을 편하게 해줄까?'
    },
    {
      id: 'dinner_time',
      title: '🍽️ 차가운 식탁',
      text: `엄마가 고기와 빵을 나눠 줘.
왠지 내 몫이 더 적은 것 같아.

"${name.full}, 빨리 먹고 설거지해."
"너는 먹는 것도 느리니?"

"펠릭스랑 에르네스틴은 천천히 먹고 잘 준비하렴."

부엌으로 가서 설거지를 시작해.

손이 차가워.`,
      bg: 'https://images.unsplash.com/photo-1595940929854-47f1bca6f845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다락방에 간다', to: 'first_night', cls: 'bg-blue-300' }
      ],
      prompt: '💭 혼자 일할 때 어떤 생각이 들어?'
    },
    {
      id: 'first_night',
      title: '🌙 첫날 밤',
      text: `다락방에 누워.

아래층에서 엄마가 펠릭스에게 책 읽어주는 소리가 들려.
에르네스틴은 자기 방에서 뭘 하는지 모르겠어.

너는... 혼자야.

'내일은 정원에 가봐야지.'

그 생각으로 잠들어.`,
      bg: 'https://images.unsplash.com/photo-1601314035641-880c6ebe559e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음 날 아침', to: 'morning_garden', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 작은 희망이 있으면 견딜 수 있어?'
    },
    {
      id: 'morning_garden',
      title: '🌅 아침의 정원',
      text: `새 소리에 눈을 떠. 이른 아침이야.

조용히 밖으로 나가. 
정원이 정말 예뻐!
이슬이 반짝이고, 새들이 지저귀고...

'여기는... 평화로워.'

처음으로 마음이 편안해져.`,
      bg: 'https://images.unsplash.com/photo-1717959159782-98c42b1d4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '정원을 탐험한다', to: 'explore_garden', cls: 'bg-green-300' },
        { label: '조용히 앉아있는다', to: 'sit_in_garden', cls: 'bg-blue-300' }
      ],
      prompt: '💭 자연 속에서 마음이 편해질까?'
    },
    {
      id: 'explore_garden',
      title: '🌸 정원 탐험',
      text: `너는 정원을 걸어다녀.

당근밭, 장미꽃, 사과나무...

모든 게 신기해.

그때! 흰 토끼 한 마리가 당근밭 옆에 있어.

너무 귀여워!`,
      bg: 'https://images.unsplash.com/photo-1717959159782-98c42b1d4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '토끼에게 다가간다', to: 'meet_rabbit', cls: 'bg-purple-300' },
        { label: '꽃을 관찰한다', to: 'observe_flowers', cls: 'bg-pink-300' }
      ],
      prompt: '💭 무엇에 더 끌려?'
    },
    {
      id: 'sit_in_garden',
      title: '🧘 고요한 시간',
      text: `너는 나무 아래 앉아.

바람이 나뭇잎을 흔들어.
새들이 노래해.

'평화롭다...'
이런 느낌은 처음이야. 
집에서는 절대 느낄 수 없었어.`,
      bg: 'https://images.unsplash.com/photo-1717959159782-98c42b1d4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '정원을 탐험한다', to: 'explore_garden', cls: 'bg-green-300' }
      ],
      prompt: '💭 조용한 시간이 위로가 될까?'
    },
    {
      id: 'meet_rabbit',
      title: '🐰 토끼와의 만남',
      text: `너는 조심스럽게 토끼에게 다가가.

"안녕..."

토끼가 귀를 쫑긋! 도망가지 않고 너를 봐.
너는 천천히 손을 뻗어. 부드러운 털...

'친구가 생긴 것 같아.'`,
      bg: 'https://images.unsplash.com/photo-1759687083633-8534d77fbef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '며칠 후', to: 'days_pass', cls: 'bg-blue-300' }
      ],
      prompt: '💭 동물이 친구가 될 수 있을까?'
    },
    {
      id: 'observe_flowers',
      title: '🎨 아름다움 발견',
      text: `꽃밭이 너무 예뻐.

빨간 꽃, 노란 꽃, 보라색 꽃...
색깔이 다양해.

'이걸 그릴 수 있다면...'
아름다운 것을 담고 싶은 마음이 생겨.`,
      bg: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '며칠 후', to: 'days_pass', cls: 'bg-blue-300' }
      ],
      prompt: '💭 아름다운 걸 보면 그리고 싶어져?'
    },
    {
      id: 'days_pass',
      title: '📅 시간이 흐르고',
      text: `며칠이 지났어.

집에서는 여전히 힘들어. 

다들 사랑받는 것 같은데, 너는 일만 해.

하지만 매일 아침 정원에 가. 
토끼와 꽃들이 널 기다려.

조금씩... 견딜 만해져.`,
      bg: 'https://images.unsplash.com/photo-1717959159782-98c42b1d4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '마을을 구경한다', to: 'visit_village', cls: 'bg-yellow-300' },
        { label: '정원에만 있는다', to: 'stay_in_garden', cls: 'bg-green-300' }
      ],
      prompt: '💭 새로운 사람을 만나볼까, 혼자있을까?'
    },
    {
      id: 'visit_village',
      title: '🏘️ 마을 구경',
      text: `심부름 핑계로 마을을 돌아다녀.

작은 가게들, 돌담 길...
아이들이 공놀이를 해.

한 아이가 너를 봐.
"새로 온 애네! 머리가 빨갛다!"`,
      bg: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '인사한다', to: 'greet_kids', cls: 'bg-blue-300' },
        { label: '그냥 지나간다', to: 'walk_away', cls: 'bg-gray-300' }
      ],
      prompt: '💭 새로운 친구를 사귀고 싶어?'
    },
    {
      id: 'stay_in_garden',
      title: '🌿 나만의 세계',
      text: `너는 정원에만 있기로 해.

토끼와 놀고, 꽃을 보고, 나무 아래 앉아있고...

'여기가 내 세상이야.
다른 사람은 필요 없어.'

하지만 가끔... 
친구가 있으면 좋겠다는 생각도 들어.`,
      bg: 'https://images.unsplash.com/photo-1717959159782-98c42b1d4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '일요일이 되다', to: 'sunday_arrives', cls: 'bg-purple-300' }
      ],
      prompt: '💭 혼자여도 괜찮을까?'
    },
    {
      id: 'greet_kids',
      title: '👋 용기 내어 인사',
      text: `"안녕. 내 이름은 ${name.full}."

"나는 피에르야! 너, 홍당무 같네!"
다른 아이들이 웃어.

"...괜찮아. 홍당무라고 불러도 돼."

피에르가 놀라. "진짜? 같이 놀래?"
처음으로 친구들과 노는 거야!`,
      bg: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '일요일이 되다', to: 'sunday_arrives', cls: 'bg-purple-300' }
      ],
      prompt: '💭 별명을 받아들이면 친구가 생겨?'
    },
    {
      id: 'walk_away',
      title: '🚶 혼자 가기',
      text: `너는 그냥 지나가.

'놀림받기 싫어...'

정원으로 돌아가. 

토끼가 있고, 자연이 있어.
그걸로 충분해.

하지만 아이들의 웃음소리가 자꾸 생각나.`,
      bg: 'https://images.unsplash.com/photo-1717959159782-98c42b1d4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '일요일이 되다', to: 'sunday_arrives', cls: 'bg-purple-300' }
      ],
      prompt: '💭 안전하지만 외로운 선택이었을까?'
    },
    {
      id: 'sunday_arrives',
      title: '🎨 특별한 손님',
      text: `일요일 아침. 마차 소리가 들려.

"대부님이 오셨어!" 엄마가 말해.

키가 크고, 수염이 있고, 친절해 보이는 사람.
대부는 종교에서 아이를 돌봐주는 보호자 역할이래.

"안녕, ${name.first}! 
머리가 정말 예쁘네.
해 질 녘 하늘 같아!"

처음으로... 칭찬받았어.
어쩌면 진짜 아빠보다도 좋은 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1566152474719-8d79ca1a4c66',
      choices: [
        { label: '대부님과 이야기한다', to: 'talk_godfather', cls: 'bg-green-300' },
        { label: '수줍어한다', to: 'feel_shy', cls: 'bg-pink-300' }
      ],
      prompt: '💭 칭찬을 받으면 어떤 기분이 들어?'
    },
    {
      id: 'talk_godfather',
      title: '💬 마음을 열다',
      text: `"대부님은... 무슨 일 하세요?"

"나는 화가야. 그림을 그리지."

"그림이요?"

"응! 아름다운 것들을 그려. 자연, 사람들...
${name.first}, 너는 뭘 좋아해?"

"저는... 정원이 좋아요."`,
      bg: 'https://images.unsplash.com/photo-1566152474719-8d79ca1a4c66',
      choices: [
        { label: '정원을 보여드린다', to: 'show_garden', cls: 'bg-green-300' }
      ],
      prompt: '💭 나를 이해해주는 사람이 있으면 어때?'
    },
    {
      id: 'feel_shy',
      title: '😊 수줍은 미소',
      text: `너는 수줍어서 고개를 숙여.

대부님이 웃어. 
"괜찮아, 천천히 친해지자."

잠시 후, 대부님이 말해.
"${name.first}, 정원 구경시켜줄래?"

너는 고개를 끄덕여.`,
      bg: 'https://images.unsplash.com/photo-1566152474719-8d79ca1a4c66',
      choices: [
        { label: '정원으로 간다', to: 'show_garden', cls: 'bg-green-300' }
      ],
      prompt: '💭 처음 만난 사람에게 마음을 열기 어려워?'
    },
    {
      id: 'show_garden',
      title: '🌺 정원 산책',
      text: `대부님과 정원을 걸어.

"와, 정말 아름답구나!"
대부님이 가방에서 종이와 색연필을 꺼내.

"나는 화가야. 이런 걸 그리지."
대부님이 꽃을 그려. 종이 위에 꽃이 나타나!

"우와..."`,
      bg: 'https://images.unsplash.com/photo-1717959159782-98c42b1d4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그림을 배우고 싶다', to: 'want_to_draw', cls: 'bg-purple-300' },
        { label: '신기해하며 본다', to: 'watch_drawing', cls: 'bg-blue-300' }
      ],
      prompt: '💭 새로운 세계를 발견한 기분이야?'
    },
    {
      id: 'want_to_draw',
      title: '✏️ 첫 그림',
      text: `"저도... 해보고 싶어요."

"그럼 한번 해볼래?"
대부님이 색연필을 줘.

너는 토끼를 그려봐. 서툴지만...
"잘하는데! 자연을 보는 눈이 있어."

대부님이 칭찬해. 너는 계속 그려.`,
      bg: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '선물을 받는다', to: 'receive_gift', cls: 'bg-pink-300' }
      ],
      prompt: '💭 그림을 그리면 기분이 어때?'
    },
    {
      id: 'watch_drawing',
      title: '👀 관찰하기',
      text: `너는 대부님이 그리는 걸 지켜봐.

선이 하나씩 그어질 때마다
꽃이 살아나는 것 같아.

"신기해..."

"${name.first}, 너도 그리고 싶어?"
너는 고개를 끄덕여.`,
      bg: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그림을 그려본다', to: 'want_to_draw', cls: 'bg-purple-300' }
      ],
      prompt: '💭 누군가의 재능을 보면 배우고 싶어져?'
    },
    {
      id: 'receive_gift',
      title: '🎁 소중한 선물',
      text: `"${name.first}, 이 색연필은 네 거야."

"정말요? 제가 가져도 돼요?"

"물론이지! 매일 그림을 그려봐.
힘들 때는 아름다운 걸 그려.
그럼 행복해질 거야."

생전 처음으로 선물을 받았어.`,
      bg: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '고맙다고 인사한다', to: 'new_beginning', cls: 'bg-green-300' }
      ],
      prompt: '💭 누군가 네 재능을 알아봐주면 어때?'
    },
    {
      id: 'new_beginning',
      title: '🌱 새로운 하루',
      text: `대부님은 떠났지만 색연필은 네 곁에 있어.

그날 이후, 너의 삶이 조금씩 변해.
집에서는 여전히 힘들지만...

매일 정원에 나가 그림을 그려.
토끼, 꽃, 나무... 아름다운 것들을.

그림이 널 행복하게 해줘.`,
      bg: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '《홍당무》 읽어보기', to: 'ending', cls: 'bg-purple-300' }
      ],
      prompt: '💭 힘든 상황에서도 행복을 찾을 수 있어?'
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `너는 차별 속에서도 자연과 그림을 통해 위로를 찾았어.

《홍당무》는 1800년대 프랑스 시골을 배경으로, 가족에게 사랑받지 못하던 소년이 성장하는 이야기야.

힘든 상황에서도 아름다움을 발견하고, 그것을 그림으로 표현하며 자기만의 길을 찾아가는 감동적인 여정이 펼쳐져!

📚 서점이나 도서관에서 《홍당무》를 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1582203914689-d5cc1850fcb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      prompt: '《홍당무》 - 겨울왕국 안나처럼 가족에게 사랑받지 못해도 자기만의 길을 찾는 이야기! 차별 속에서 자연과 예술로 위로받으며 성장하는 감동 스토리야!',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-300' }
      ]
    }
  ];
}
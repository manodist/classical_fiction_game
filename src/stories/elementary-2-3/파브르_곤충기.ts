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
    polite: `${full} 학생`,
    casual: `${firstName}야`
  };
}

export function generateFabreStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '정원의 아침',
      text: `너의 이름은 ${name.full}.

아니, 잠깐!
오늘은 네가 곤충이야!

1870년대 프랑스, 작은 정원.
너는 이제 막 애벌레에서 깨어난
예쁜 풍뎅이야.

햇살이 따뜻해.
풀잎 위에 이슬이 반짝여.

"좋은 아침이야!"`,
      bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '아침 식사 찾으러 가기', to: 'morning-meal', cls: 'bg-green-300' },
        { label: '친구들 만나러 가기', to: 'meet-friends', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 아침에 일어나면 제일 먼저 뭐 해?'
    },
    {
      id: 'morning-meal',
      title: '맛있는 아침',
      text: `장미 잎에 맺힌 이슬을 마셔.

상큼해!

꽃가루도 먹고,
달콤한 꿀도 한 방울.

"이게 바로 곤충의 아침 뷔페지!"

그런데...
뭔가 이상한 느낌?

누군가 지켜보는 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '주변 살펴보기', to: 'look-around', cls: 'bg-blue-300' },
        { label: '무시하고 계속 먹기', to: 'keep-eating', cls: 'bg-red-300' }
      ],
      prompt: '💭 누가 지켜보는 느낌 받아본 적 있어?'
    },
    {
      id: 'meet-friends',
      title: '곤충 친구들',
      text: `개미 친구 앙투안이 인사해.

"안녕, ${name.full}!"

나비 친구 소피도 날아와.

"오늘 날씨 완전 좋지?"

무당벌레 루이도 합류했어.

"다 같이 놀자!"

평화로운 정원이야.`,
      bg: 'https://images.unsplash.com/photo-1502901437226-badb74caa4e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구들과 놀기', to: 'play-together', cls: 'bg-purple-300' },
        { label: '정원 탐험하기', to: 'explore-garden', cls: 'bg-green-300' }
      ],
      prompt: '💭 친구들과 노는 게 좋아?'
    },
    {
      id: 'look-around',
      title: '수상한 인간',
      text: `고개를 들어 주변을 봐.

저기!
커다란 인간이 있어!

무릎을 꿇고 앉아서
너를 빤히 쳐다봐.

손에는 이상한 유리 물건과
종이, 연필...

"으악! 인간이다!"

도망가야 할까?`,
      bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '재빨리 도망가기', to: 'run-away', cls: 'bg-red-300' },
        { label: '가만히 있어보기', to: 'stay-still', cls: 'bg-blue-300' }
      ],
      prompt: '💭 무서운 걸 만나면 도망갈까, 가만히 있을까?'
    },
    {
      id: 'keep-eating',
      title: '관찰 당하는 중',
      text: `너는 계속 먹어.

맛있는 꿀이 중요하거든!

그런데 그 느낌이 계속돼.

슬쩍 고개를 돌려보니...

한 인간이 돋보기로 너를 보고 있어!

그리고 뭔가 열심히 적고 있어.

"뭐야, 저 사람?"`,
      bg: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '날아서 피하기', to: 'fly-away', cls: 'bg-yellow-300' },
        { label: '관찰하기', to: 'observe-human', cls: 'bg-purple-300' }
      ],
      prompt: '💭 누군가 너를 관찰한다면 어떤 기분일까?'
    },
    {
      id: 'play-together',
      title: '즐거운 시간',
      text: `친구들과 숨바꼭질을 해.

개미 앙투안은 작아서 잘 숨고,
나비 소피는 높이 날아서 안 잡히고,
무당벌레 루이는 빨간 점 때문에 바로 들켜.

"하하하!"

그때, 소피가 속삭여.

"저기 봐! 또 그 이상한 인간이야!"`,
      bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구들과 숨기', to: 'hide-together', cls: 'bg-blue-300' },
        { label: '인간 구경하기', to: 'watch-human', cls: 'bg-green-300' }
      ],
      prompt: '💭 친구들이랑 같이 있으면 더 용감해져?'
    },
    {
      id: 'explore-garden',
      title: '정원의 비밀',
      text: `정원을 탐험하기로 했어.

돌 아래에는 지네가 살고,
나무 껍질 뒤에는 하늘소가 있고,
땅속에는 두더지가 터널을 파.

"정원은 작은 세계 같아!"

풀숲 사이로 가다가
이상한 집을 발견했어.

"저게 뭐지?"`,
      bg: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '가까이 가보기', to: 'approach-house', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 새로운 곳을 탐험하는 게 재미있어?'
    },
    {
      id: 'run-away',
      title: '도망 실패',
      text: `날개를 펄럭이며 도망쳤어!

윙윙윙!

하지만 그 인간은 쫓아오지 않아.

그냥 앉아서 너를 지켜봐.

호기심 가득한 눈빛으로.

잠깐 뒤돌아보니,
그는 웃으면서 뭔가 적고 있어.

"왜 안 쫓아와?"`,
      bg: 'https://images.unsplash.com/photo-1502901437226-badb74caa4e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다시 돌아가보기', to: 'return-curious', cls: 'bg-purple-300' },
        { label: '멀리 가기', to: 'go-far', cls: 'bg-blue-300' }
      ],
      prompt: '💭 도망쳤는데 안 쫓아오면 궁금해져?'
    },
    {
      id: 'stay-still',
      title: '처음 만난 파브르',
      text: `너는 가만히 있었어.

인간이 돋보기를 가까이 대.

무섭지만... 다치게 하지는 않네?

그는 부드럽게 속삭여.

"안녕, 작은 친구야.
아름다운 풍뎅이구나."

그의 목소리가 따뜻해.

종이에 뭔가 그리기 시작해.`,
      bg: 'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그가 그리는 걸 보기', to: 'watch-drawing', cls: 'bg-yellow-300' },
        { label: '슬금슬금 움직여보기', to: 'move-slowly', cls: 'bg-green-300' }
      ],
      prompt: '💭 처음 보는 사람도 친절할 수 있을까?'
    },
    {
      id: 'fly-away',
      title: '정원 위를 날며',
      text: `날개를 펴고 날아올랐어!

정��이 한눈에 보여.

장미 덤불, 야생화 밭, 작은 연못...

"우리 정원이 이렇게 넓었구나!"

그런데 저 아래,
그 인간이 여전히 있어.

하늘을 보며 너를 관찰해.

고개를 갸웃거리며 뭔가 적어.`,
      bg: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다른 곳으로 날아가기', to: 'fly-elsewhere', cls: 'bg-blue-300' },
        { label: '다시 내려가기', to: 'land-again', cls: 'bg-green-300' }
      ],
      prompt: '💭 높은 곳에서 보면 세상이 다르게 보여?'
    },
    {
      id: 'observe-human',
      title: '신기한 인간',
      text: `너도 그를 관찰하기로 했어.

"인간 관찰일기!"

그는 수염이 있고,
낡은 옷을 입었어.

손은 흙으로 더러운데
눈은 반짝반짝해.

정원 곳곳을 다니며
모든 곤충을 관찰해.

"이 인간, 곤충을 정말 좋아하나 봐?"`,
      bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 관찰하기', to: 'keep-observing', cls: 'bg-purple-300' },
        { label: '다른 곤충들에게 알리기', to: 'tell-others', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 반대로 상대를 관찰해본 적 있어?'
    },
    {
      id: 'hide-together',
      title: '친구들과 함께',
      text: `친구들과 함께 잎 뒤에 숨었어.

"쉿! 조용히!"

개미 앙투안이 속삭여.

"저 인간, 매일 와.
우리를 관찰하고 기록해."

나비 소피가 덧붙여.

"하지만 해를 끼치지는 않아.
그냥... 지켜만 봐."

무당벌레 루이가 말해.

"어쩌면 우리 친구일지도?"`,
      bg: 'https://images.unsplash.com/photo-1502901437226-badb74caa4e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구들 이야기 더 듣기', to: 'listen-stories', cls: 'bg-blue-300' },
        { label: '직접 확인하러 가기', to: 'check-myself', cls: 'bg-green-300' }
      ],
      prompt: '💭 친구들 경험을 들어보는 게 도움 돼?'
    },
    {
      id: 'watch-human',
      title: '함께 구경하기',
      text: `친구들과 함께 인간을 구경했어.

그는 땅에 엎드려
개미집을 들여다봐.

"우와, 진짜 집중하네!"

연필로 뭔가 그려.
개미들이 움직이는 모습을.

"우리 그림을 그리는 거야?"

개미 앙투안이 자랑스러워해.

"내 친척들이 유명해지는구나!"`,
      bg: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 가까이 가기', to: 'get-closer', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 누군가 너를 그린다면 기분이 어때?'
    },
    {
      id: 'approach-house',
      title: '파브르의 집',
      text: `조심스럽게 가까이 가봤어.

창문으로 안을 들여다보니...

책이 가득해!
표본 상자도 있고,
현미경도 있어!

벽에는 곤충 그림들이 빼곡해.

"여기가 저 인간이 사는 곳이구나!"

창턱에 노트가 있어.
열려있는 페이지에는
네 그림이 그려져 있어!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '노트 더 살펴보기', to: 'check-notebook', cls: 'bg-purple-300' },
        { label: '집 주변 탐험하기', to: 'explore-house', cls: 'bg-green-300' }
      ],
      prompt: '💭 누군가의 집을 보면 그 사람을 알 수 있을까?'
    },
    {
      id: 'return-curious',
      title: '호기심이 생겨',
      text: `궁금함을 참을 수 없어서 돌아왔어.

그 인간은 여전히 그 자리에.

이번엔 사마귀를 보고 있어.

"앞다리를 이렇게 접고...
머리를 이렇게 돌리고..."

혼자 중얼거리며 기록해.

마치 학생이 숙제하는 것처럼
진지해.

"재미있는 인��이네?"`,
      bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그 옆으로 가기', to: 'sit-beside', cls: 'bg-blue-300' }
      ],
      prompt: '💭 궁금한 게 있으면 확인해야 해?'
    },
    {
      id: 'go-far',
      title: '정원 끝으로',
      text: `정원 끝까지 날아갔어.

여기는 야생화가 만발해.

평화롭고 조용해.

하지만 며칠 뒤...

"어? 또 여기까지 왔네!"

그 인간이 여기도 왔어!

이번엔 야생화에 앉은 벌을 봐.

"이 사람, 정원 전체를 다 관찰하나 봐!"`,
      bg: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '관찰하는 모습 지켜보기', to: 'watch-working', cls: 'bg-green-300' }
      ],
      prompt: '💭 열심히 하는 사람을 보면 어때?'
    },
    {
      id: 'watch-drawing',
      title: '예술가 파브르',
      text: `그의 손놀림을 봤어.

연필이 종이 위를 달려.

네 몸통의 광택,
날개의 무늬,
작은 더듬이까지...

모든 걸 정확하게 그려!

"이 인간, 그림 진짜 잘 그리네!"

그림 옆에는 글씨도 적어.
날짜, 시간, 날씨, 네 행동...

"완전 일기장이야!"`,
      bg: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '감동받고 다가가기', to: 'approach-fabre', cls: 'bg-pink-300' }
      ],
      prompt: '💭 네가 잘하는 걸 누가 알아봐주면 기분이 어때?'
    },
    {
      id: 'move-slowly',
      title: '작은 움직임',
      text: `조금씩 움직여봤어.

앞다리로 더듬이를 정리하고,
날개를 한 번 펴보고.

"오!"

그의 눈이 더 반짝여!

더 자세히 관찰하면서
더 빠르게 적어.

"완전 신기해하네?"

너는 곤충 모델이 된 기분!`,
      bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 많이 움직여보기', to: 'show-off', cls: 'bg-yellow-300' },
        { label: '날아가보기', to: 'fly-for-him', cls: 'bg-blue-300' }
      ],
      prompt: '💭 누가 관심 가져주면 더 잘하고 싶어져?'
    },
    {
      id: 'fly-elsewhere',
      title: '다른 곤충들',
      text: `다른 곳으로 날아갔어.

거기서도 그 인간을 봤어!

아니, 같은 사람이 맞아?

어제는 여기 있었는데,
오늘은 저기 있고...

"이 사람, 매일 정원을 순회하나 봐!"

모든 곤충을 공평하게 관찰해.

"우���를 차별하지 않네!"`,
      bg: 'https://images.unsplash.com/photo-1502901437226-badb74caa4e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 지켜보기', to: 'continue-watching', cls: 'bg-green-300' }
      ],
      prompt: '💭 모두를 공평하게 대하는 게 중요해?'
    },
    {
      id: 'land-again',
      title: '다시 내려가서',
      text: `원래 자리로 돌아왔어.

그는 여전히 기다리고 있어!

"이 인간, 날 기다린 거야?"

너는 꽃잎에 살짝 앉았어.

그가 조용히 다가와.

절대 놀라게 하지 않으려고
천천히, 조심스럽게.

"인간 중에 이런 사람도 있구나..."`,
      bg: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '신뢰하고 가만히 있기', to: 'trust-him', cls: 'bg-blue-300' }
      ],
      prompt: '💭 기려주는 사람이 고마울 때가 있어?'
    },
    {
      id: 'keep-observing',
      title: '파브르의 일상',
      text: `매일 그를 관찰했어.

아침 일찍 오고,
해 질 때까지 있어.

더울 땐 모자를 쓰고,
비 올 땐 우산을 쓰고.

점심은 정원에서 먹어.
빵 한 조각이 전부.

"곤충 관찰이 정말 중요한가 봐!"

돈도 별로 없어 보여.
옷도 낡았어.

하지만 행복해 보여.`,
      bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그에게 다가가기', to: 'approach-fabre', cls: 'bg-green-300' }
      ],
      prompt: '💭 좋아하는 일을 하면 행복할까?'
    },
    {
      id: 'tell-others',
      title: '곤충 회의',
      text: `다른 곤충들을 불러 모았어.

"긴급 회의!"

개미, 나비, 무당벌레, 벌, 귀뚜라미...
모두 모였어.

"저 인간에 대해 얘기해보자!"

벌이 먼저 말해.

"나쁜 사람은 아닌 것 같아."

귀뚜라미가 덧붙여.

"우리를 해치지 않아.
그냥... 궁금해하는 것 같아."`,
      bg: 'https://images.unsplash.com/photo-1502901437226-badb74caa4e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '함께 확인하러 가기', to: 'group-visit', cls: 'bg-purple-300' }
      ],
      prompt: '💭 여럿이 의논하면 더 좋은 결정을 할 수 있어?'
    },
    {
      id: 'listen-stories',
      title: '곤충들의 증언',
      text: `친구들이 경험담을 들려줘.

개미 앙투안:
"우리 집을 관찰했는데,
망가뜨리지 않았어."

나비 소피:
"내가 번데기에서 나올 때
지켜봤는데, 감동한 것 같았어."

무당벌레 루이:
"내가 진딧물 먹는 걸 봤는데,
'대단하다'고 했어!"

"좋은 인간인가 봐!"`,
      bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '직접 만나보기', to: 'meet-fabre', cls: 'bg-blue-300' }
      ],
      prompt: '💭 다른 사람들 경험을 듣고 판단하는 게 좋아?'
    },
    {
      id: 'check-myself',
      title: '용기를 내서',
      text: `"내가 직접 확인해볼게!"

친구들이 응원해.

"조심해!"
"화이팅!"

너는 날아가서
그의 어깨에 살짝 앉았어.

그가 놀라서 고개를 돌려.

"오! 네가 여기 왔구나!"

부드럽게 웃어.

무섭지 않아!`,
      bg: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구들에게 신호 보내기', to: 'signal-friends', cls: 'bg-green-300' }
      ],
      prompt: '💭 직접 해봐야 아는 것들이 있어?'
    },
    {
      id: 'get-closer',
      title: '특별한 순간',
      text: `너희들은 더 가까이 갔어.

그는 개미집을 그리는 중이야.

너희를 보고도 놀라지 않아.

"안녕, 친구들!
방해해서 미안해.
조금만 더 그릴게."

그의 손길이 부드러워.

개미들도 그를 무서워하지 않아.
자연스럽게 움직여.

"우리가 인간과 친구가 된 거야?"`,
      bg: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그의 작업 도와주기', to: 'help-him', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 서로 다른 존재도 친구가 될 수 있을까?'
    },
    {
      id: 'check-notebook',
      title: '놀라운 기록',
      text: `노트를 자세히 봤어.

매 페이지마다 다른 곤충이!

나비의 날개 무늬 연구,
개미의 길 찾기 실험,
벌의 집 짓기 관찰...

"와... 이 사람, 우리를
정말 사랑하는구나!"

글씨가 빼곡해.

"곤충은 작지만 위대하다."
"각자의 삶이 경이롭다."

감동적이야.`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그를 찾아가기', to: 'find-fabre', cls: 'bg-blue-300' }
      ],
      prompt: '💭 작은 것도 소중하게 여기는 게 중요해?'
    },
    {
      id: 'explore-house',
      title: '연구실 구경',
      text: `집 주변을 날아다니며 구경했어.

창문마다 다른 세계!

한 방은 책으로 가득,
다른 방은 표본들,
또 다른 방은 실험 도구들.

"완전 곤충 박물관이야!"

벽에 걸린 글귀:
"자연은 가장 위대한 선생님"

"멋있는 말이다!"`,
      bg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그를 만나러 가기', to: 'find-fabre', cls: 'bg-green-300' }
      ],
      prompt: '💭 자연에서 배울 수 있는 게 많을까?'
    },
    {
      id: 'sit-beside',
      title: '함께 있기',
      text: `그 옆 잎에 조용히 앉았어.

그는 여전히 사마귀를 관찰 중.

너를 힐끗 보더니 미소 짓고
다시 집중해.

"우리 둘 다 관찰자네!"

시간이 천천히 흘러.

바람이 불고, 구름이 지나가고,
햇살이 움직여.

평화로운 순간이야.

"이게 바로 친구 같은 거 아닐까?"`,
      bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '매일 만나기로 결심', to: 'daily-meeting', cls: 'bg-pink-300' }
      ],
      prompt: '💭 말없이도 함께 있으면 편한 친구가 있어?'
    },
    {
      id: 'watch-working',
      title: '열정적인 과학자',
      text: `그의 일하는 모습을 봤어.

비가 와도, 더워도, 추워도
매일 와서 관찰해.

때로는 밤늦게까지 있어.
반딧불이를 보려고.

허리가 아파 보여도
계속 무릎 꿇고 앉아 있어.

"왜 이렇게까지 하지?"

그때 들려온 그의 목소리.

"나는 곤충들에게 배우고 있어.
그들은 내 선생님이야."`,
      bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '감동받고 다가가기', to: 'approach-fabre', cls: 'bg-blue-300' }
      ],
      prompt: '💭 열심히 노력하는 사람이 멋있어 보여?'
    },
    {
      id: 'approach-fabre',
      title: '특별한 인연',
      text: `용기를 내서 그에게 날아갔어.

그의 노트에 살짝 앉았어.

"오! 네가 왔구나!"

그가 환하게 웃어.

"고마워. 네 덕분에
오늘도 많이 배웠어."

손가락을 내밀어.

너는 그 위에 살짝 올랐어.

"우리 친구 할까?"

마음이 따뜻해져.`,
      bg: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구 되기', to: 'become-friends', cls: 'bg-pink-300' }
      ],
      prompt: '💭 서로 다른 존재끼리 이해할 수 있을까?'
    },
    {
      id: 'show-off',
      title: '곤충 쇼타임',
      text: `너는 특별한 움직임을 보여줬어!

날개를 활짝 펴고,
빙글빙글 돌고,
꽃에서 꽃으로 날아다니고.

"우와!"

그의 눈이 더 커졌어!

엄청 빠르게 그리고 적어.

"네가 이렇게 멋진 줄 몰랐어!"

완전 팬이 된 것 같아!

너는 곤충계의 아이돌!`,
      bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '마무리 인사하기', to: 'final-greeting', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 네 특기를 자랑해본 적 있어?'
    },
    {
      id: 'fly-for-him',
      title: '비행 시연',
      text: `하늘 높이 날아올랐어!

나선형으로 올라가고,
급강하했다가,
다시 올라가고!

"대단해!"

그가 박수까지 쳐!

인간에게 박수 받은 기분!

"이게 바로 레전드 곤충이지!"

너는 정원 최고의 비행사야!`,
      bg: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다시 그에게 가기', to: 'return-to-fabre', cls: 'bg-blue-300' }
      ],
      prompt: '💭 누가 응원해주면 더 잘하게 돼?'
    },
    {
      id: 'continue-watching',
      title: '끝없는 관찰',
      text: `매일 그를 관찰했어.

그는 정말 끈기가 있어!

같은 개미집을 일주일 내내 보거나,
사마귀 알이 부화하길 한 달을 기다려.

"진짜 대단한 인내심!"

어떤 날은 아무 일도 안 일어나.

그래도 기다려.

"포기하지 않는구나..."

너도 배우게 돼.`,
      bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그의 친구 되기', to: 'become-friends', cls: 'bg-green-300' }
      ],
      prompt: '💭 포기하지 않고 계속하는 게 중요해?'
    },
    {
      id: 'trust-him',
      title: '신뢰의 순간',
      text: `너는 더 이상 도망��지 않았어.

그가 가까이 와도 괜찮아.

심지어 그의 손바닥에
앉아보기도 했어!

"고마워, 작은 친구야.
네 신뢰가 정말 소중해."

그의 목소리에서
진심이 느껴져.

"인간도 나쁘지 않네!"

서로를 존중하는 관계.`,
      bg: 'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구 되기', to: 'become-friends', cls: 'bg-blue-300' }
      ],
      prompt: '💭 신뢰는 천천히 쌓이는 거 같아?'
    },
    {
      id: 'group-visit',
      title: '곤충 대표단',
      text: `곤충들이 함께 그에게 갔어.

풍뎅이, 개미, 나비, 무당벌레, 벌...

"우와!"

그가 너무 기뻐해!

"여러분 모두 와줬구나!
이건 정말 특별한 날이야!"

사진을 찍듯이
너희 모두를 그렸어.

"정원 친구들 단체사진!"

역사적인 순간이야!`,
      bg: 'https://images.unsplash.com/photo-1502901437226-badb74caa4e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '모두 친구 되기', to: 'become-friends', cls: 'bg-pink-300' }
      ],
      prompt: '💭 함께하면 더 특별해?'
    },
    {
      id: 'meet-fabre',
      title: '첫 만남',
      text: `직접 그를 만나러 갔어.

"안녕하세요!"
(곤충 언어로)

그는 못 알아듣지만
네 의도는 이해한 것 같아.

"안녕, 용감한 친구야!"

서로를 보며 웃었어.

말은 통하지 않지만
마음은 통해.

"이게 진짜 소통이구나!"`,
      bg: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구 되기', to: 'become-friends', cls: 'bg-pink-300' }
      ],
      prompt: '💭 말이 통하지 않아도 친구가 될 수 있을까?'
    },
    {
      id: 'signal-friends',
      title: '안전 신호',
      text: `너는 날개를 펄럭여 신호를 보냈어.

"여기 안전해! 다들 와!"

친구들이 하나둘 모여들어.

그는 움직이지 않고 조용히 앉아
너희를 맞이했어.

"어서 와, 친구들!"

정원이 따뜻한 공간이 됐어.

인간과 곤충이 함께하는
특별한 장소!`,
      bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '모두 함께', to: 'become-friends', cls: 'bg-green-300' }
      ],
      prompt: '💭 안전하다는 걸 알려주는 게 중요해?'
    },
    {
      id: 'help-him',
      title: '작은 도움',
      text: `너희는 그를 도와주기로 했어.

개미들은 줄을 예쁘게 서주고,
나비는 천천히 날아주고,
풍뎅이는 가까이 와주고.

"고마워, 친구들!
너희 덕분에 관찰이 쉬워!"

서로 돕는 관계!

"기브 앤 테이크네!"

그는 우리를 관찰하고,
우리는 그가 연구하도록 도와.

완벽한 팀워크!`,
      bg: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 함께하기', to: 'become-friends', cls: 'bg-blue-300' }
      ],
      prompt: '💭 서로 도우면 모두가 행복해질까?'
    },
    {
      id: 'find-fabre',
      title: '찾아가는 발걸음',
      text: `정원으로 그를 찾아갔어.

"어디 계세요?"

그는 장미 덤불 옆에서
애벌레를 관찰 중이야.

"파브르 씨!""
(곤충 언어로 외쳤어)

그가 고개를 들어.

만난 게 기뻐 보여.

너도 기뻐!`,
      bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '함께 시간 보내기', to: 'become-friends', cls: 'bg-green-300' }
      ],
      prompt: '💭 보고 싶은 사람을 만나면 기분이 어때?'
    },
    {
      id: 'daily-meeting',
      title: '일상이 된 만남',
      text: `매일 같은 시간, 같은 장소에서 만나.

그는 관찰하고 기록하고,
너는 자유롭게 살아가.

서로의 존재를 존중해.

"안녕, ${name.full}!"

그가 너를 이름으로 불러!
(비록 곤충 이름이지만)

'안녕, 파브르 씨!'

특별한 우정이야.`,
      bg: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '영원한 친구', to: 'become-friends', cls: 'bg-pink-300' }
      ],
      prompt: '💭 매일 만나는 친구가 특별해?'
    },
    {
      id: 'final-greeting',
      title: '감사의 인사',
      text: `너는 그에게 마지막 쇼를 보여줬어.

가장 아름다운 비행,
가장 우아한 착지!

그가 박수를 쳐줘.

"브라보! 네가 최고야!"

너는 그의 모자에 살짝 앉아
작별 인사를 했어.

"또 만나요, 친구!"

"그래, 또 보자!"

서로 웃었어.`,
      bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '내일도 만나기', to: 'become-friends', cls: 'bg-blue-300' }
      ],
      prompt: '💭 작별 인사도 중요해?'
    },
    {
      id: 'return-to-fabre',
      title: '돌아온 이유',
      text: `비행을 마치고 그에게 돌아왔어.

"왜냐하면..."

그가 네 친구니까!

그도 알아.

너를 보는 눈빛이 따뜻해.

"고마워, 돌아와줘서."

가장 아름다운 우정은
선택하는 것!

너는 그를 선택했어.`,
      bg: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '영원한 친구', to: 'become-friends', cls: 'bg-pink-300' }
      ],
      prompt: '💭 친구는 선택하는 거 같아?'
    },
    {
      id: 'become-friends',
      title: '특별한 친구',
      text: `${name.은는} 파브르와 친구가 됐어.

인간과 곤충의 우정!

그는 너를 해치지 않아.
너를 존중하고 사랑해.

너도 그를 믿고
가까이 있어.

매일 정원에서 만나.

그는 관찰하고,
너는 자유롭게 살아가.

이게 진짜 공존이야!

서로 다른 존재가
서로를 이해하는 것!`,
      bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음 이야기로', to: 'ending', cls: 'bg-purple-300' }
      ],
      prompt: '💭 서로 다른 존재끼리 친구가 될 수 있어?'
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `${name.은는} 프랑스 정원의 작은 풍뎅이였어.

이상한 인간 파브르를 만나 특별한 우정을 쌓았지.

《파브르 곤충기》는
평생 곤충을 사랑하고 관찰한
과학자 파브르의 이야기야.

작은 생명도 소중하고, 관찰과 기록이 얼마나 중요한지,
서로 다른 존재가 어떻게 공존하는지...

진짜 힐링 자연 다큐 같은 책!

📚 이제 진짜 책을 읽어볼 시간! 짧은 게임으로 맛본 이야기, 책에는 완전 TMI급 관찰 일지가 가득해!
💡 도서관이나 서점에서 《파브르 곤충기》를 찾아보자!`,
      
      bg: 'https://images.unsplash.com/photo-1502901437226-badb74caa4e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      prompt: `장 앙리 파브르의 《파브르 곤충기》 - 실화 레전드! 1800년대 프랑스 과학자가 평생을 곤충 덕질한 이야기! 개미 집 구조부터 거미 줄 치는 법까지, 완전 신기한 곤충 ASMR 같은 관찰 일기! 마치 '곤충 월드'를 직접 체험하는 느낌! 작은 생명도 소중하다는 걸 알려주는, 요즘 말로 '힐링 자연 다큐' 같은 고전이야!`,
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-300' }
      ]
    }
  ];
}
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
    도: `${full}도`,
    polite: `${full} 학생`,
    casual: `${firstName}야`
  };
}

export function generateOzStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '회색빛 캔자스',
      text: `너의 이름은 ${name.full}. 1900년대 미국 캔자스.

끝없이 펼쳐진 평평한 들판에서 엠 이모, 헨리 이모부와 함께 작은 농장에 살아.

하늘도 회색, 땅도 회색, 집도 회색빛이야. 태양이 모든 색을 태워버린 것처럼 온통 회색뿐이야.

그래도 너는 상상하기를 좋아해. 저 구름 너머엔 분명 알록달록한 세상이 있을 거야!`,
      bg: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '밖으로 나간다', to: 'go_outside', cls: 'bg-blue-200' },
        { label: '집 안에서 상상한다', to: 'imagine_inside', cls: 'bg-purple-200' }
      ],
      prompt: '💭 새로운 하루가 시작됐어. 뭐하고 싶어?'
    },
    
    {
      id: 'go_outside',
      title: '들판으로',
      text: `밖으로 나왔어. 회색 하늘, 회색 땅... 바람만 쌩쌩 불어.

캔자스 들판은 언제나 이렇게 넓고 평평해. 어디를 봐도 끝이 보이지 않아.

그때였어. "낑낑!" 작은 소리가 들려왔어!

헛간 쪽에서 들리는 것 같아. 누군가 도움이 필요한 걸까?`,
      bg: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '용기를 내서 가본다', to: 'find_toto', cls: 'bg-yellow-200' },
        { label: '엠 이모를 부른다', to: 'call_aunt', cls: 'bg-blue-200' }
      ],
      prompt: '💭 모르는 소리가 들리면 어떻게 해?'
    },
    {
      id: 'imagine_inside',
      title: '상상의 시작',
      text: `창밖을 바라보며 상상의 날개를 펼쳤어.

"저 구름 너머에는 분명 알록달록한 세상이 있을 거야! 에메랄드 빛 도시, 노란 벽돌길, 날아다니는 원숭이들..."

눈을 감으니 더 생생하게 보여.

엠 이모가 웃으며 말했어. "${name.first}, 상상력이 풍부하구나! 하지만 밖에 나가서 놀렴."`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '밖으로 나간다', to: 'go_outside', cls: 'bg-blue-200' },
        { label: '그림으로 그려본다', to: 'draw_imagination', cls: 'bg-purple-200' }
      ],
      prompt: '💭 상상하는 걸 좋아해?'
    },
    {
      id: 'find_toto',
      title: '작은 강아지 토토',
      text: `조심스럽게 헛간 뒤로 갔어. 작고 검은 강아지가 있었어!

떨고 있어. 겁에 질린 눈으로 너를 올려다봐. 길을 잃었나 봐.

"괜찮아, 나는 착해. 다치지 않았어?" 부드럽게 말을 건넸어.

강아지가 조금씩 경계를 풀고 꼬리를 살짝 흔들어. 반짝이는 검은 눈, 작은 귀... 너무 귀여워!

토토라고 이름을 지어줬어. 토토도 너를 좋아하는 것 같아!`,
      bg: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '음식을 가져온다', to: 'bring_food', cls: 'bg-yellow-200' },
        { label: '이모에게 보여드린다', to: 'show_aunt', cls: 'bg-pink-200' }
      ],
      prompt: '💭 무서워하는 동물을 만나면 어떻게 해?'
    },
    {
      id: 'call_aunt',
      title: '엠 이모의 조언',
      text: `"이모! 헛간 쪽에서 이상한 소리가 나요!" 너는 급하게 이모를 불렀어.

엠 이모가 손을 닦으며 나오셨어. "무슨 소리인데, ${name.first}?"

이모가 너의 머리를 쓰다듬으며 말씀하셨어. "겁내지 마라. 가서 확인해봐. 용기 있는 아이가 되렴!"

"이모가 여기서 지켜보고 있을게. 천천히 가서 뭔지 봐."

이모의 말에 힘이 났어. 그래, 나는 할 수 있어!`,
      bg: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '용기를 내서 간다', to: 'find_toto', cls: 'bg-red-200' },
        { label: '이모와 함께 간다', to: 'go_with_aunt', cls: 'bg-green-200' }
      ],
      prompt: '💭 어른의 조언이 도움이 돼?'
    },
    {
      id: 'draw_imagination',
      title: '상상을 그림으로',
      text: `종이와 색연필을 꺼냈어. 상상 속 세계를 그려볼 거야!

에메랄드 도시는 초록색, 노란 벽돌길은 노란색으로 그렸어. 착한 마녀는 예쁜 드레스를 입고, 날아다니는 원숭이들은 파란 하늘을 날아.

그림을 그리니 상상이 더 생생해져! 마치 진짜로 그곳에 간 것 같아.

엠 이모가 그림을 보시더니 눈을 크게 뜨셨어. "와! 너는 정말 예술가구나!"`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 그린다', to: 'keep_drawing', cls: 'bg-purple-200' },
        { label: '밖으로 나간다', to: 'go_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 상상을 표현하는 게 좋아?'
    },
    {
      id: 'bring_food',
      title: '토토를 돌보다',
      text: `"잠깐만 기다려, 토토!" 집으로 달려가 빵과 물을 가져왔어.

토토가 빵을 맛있게 먹어! 꼬리를 흔들면서 감사하다는 듯이 너를 올려다봐.

물도 벌컥벌컥 마셔. 정말 배가 고팠나 봐.

다 먹고 나니 토토가 네 손을 핥아줘. "고마워!" 하는 것 같아.

배려하니 마음이 따뜻해져. 토토가 완전히 긴장을 풀고 네 곁에 바짝 붙어 앉았어.`,
      bg: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '토토를 안아준다', to: 'hug_toto', cls: 'bg-pink-200' },
        { label: '이모에게 보여드린다', to: 'show_aunt', cls: 'bg-blue-200' }
      ],
      prompt: '💭 다른 존재를 배려하는 게 중요해?'
    },
    {
      id: 'go_with_aunt',
      title: '함께라면 용기가 나',
      text: `엠 이모와 함께 헛간 쪽으로 갔어. 이모가 함께 계시니 무섭지 않아.

"천천히 가자꾸나. 급하게 다가가면 놀랄 수 있어." 이모가 조언해주셨어.

조심스럽게 헛간 뒤를 돌아가니, 작고 검은 강아지가 있었어!

"아이고, 귀여워라! 길을 잃었나 보구나." 이모가 부드럽게 말씀하셨어.

"${name.first}, 잘했어. 혼자였다면 못 봤을 거야. 용기를 낸 네가 자랑스럽구나!"`,
      bg: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '키우고 싶다고 말한다', to: 'show_aunt', cls: 'bg-pink-200' },
        { label: '친해진다', to: 'bring_food', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 함께하면 용기가 나?'
    },
    {
      id: 'keep_drawing',
      title: '예술가의 꿈',
      text: `계속 그림을 그렸어. 한 장, 두 장, 세 장...

마법의 성도 그리고, 무지개도 그리고, 친절한 동물들도 그렸어.

그림을 그리다 보니 시간 가는 줄 몰랐어. 어느새 해가 중천에 떠 있어!

엠 이모가 다시 와서 그림들을 보셨어. "이 그림들, 액자에 넣어서 걸어야겠구나!"`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이모에게 감사한다', to: 'thank_aunt', cls: 'bg-pink-200' },
        { label: '밖으로 나간다', to: 'go_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 예술로 표현하는 게 좋아?'
    },
    {
      id: 'hug_toto',
      title: '평생 친구',
      text: `토토를 꼭 안아줬어. 토토도 네게 폭 안겨.

"토토, 우린 이제 친구야! 평생 함께하자!" 너는 진심으로 말했어.

토토가 네 얼굴을 핥아줘. 토토의 작은 혀가 간지러워서 웃음이 나와.

이렇게 좋은 친구를 만나다니! 외롭던 캔자스 생활이 이제 외롭지 않을 것 같아.

너와 토토, 둘만의 우정이 시작됐어.`,
      bg: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이모에게 보여드린다', to: 'show_aunt', cls: 'bg-blue-200' },
        { label: '토토와 놀아준다', to: 'play_with_toto', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 친구와의 우정이 소중해?'
    },
    {
      id: 'show_aunt',
      title: '가족이 되다',
      text: `"이모! 강아지 찾았어요!" 토토를 안고 달려갔어.

이모가 미소 지으셨어. "참 귀엽구나!"

"토토를 키워도 돼요? 제가 잘 돌볼게요!"

이모가 말씀하셨어. "좋아. 하지만 책임져야 해."

"네! 약속해요!"`,
      bg: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '책임감을 다짐한다', to: 'responsibility', cls: 'bg-green-200' },
        { label: '토토와 놀아준다', to: 'play_with_toto', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 책임감이 뭐라고 생각해?'
    },
    {
      id: 'thank_aunt',
      title: '감사의 마음',
      text: `"이모, 정말 고맙습니다!" 진심을 담아 말했어.

엠 이모가 너를 꼭 안아주셨어. "사랑한단다, ${name.first}."

이모의 품은 따뜻했어. 이 세상에서 가장 안전한 곳 같아.

"너는 용감하고 착하단다. 토토를 책임지는 모습을 보니 자랑스러워."

고마움을 표현하니 마음이 더 따뜻해졌어.`,
      bg: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이모를 도와드린다', to: 'help_aunt', cls: 'bg-green-200' },
        { label: '밖으로 나간다', to: 'go_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 고마움을 표현하는 게 중요해?'
    },
    {
      id: 'play_with_toto',
      title: '신나는 놀이',
      text: `토토와 넓은 들판을 신나게 뛰어다녔어!

공을 던지면 토토가 쫓아가서 물어와. "잘했어, 토토!"

토토가 꼬리를 신나게 흔들며 다시 공을 기다려.

햇빛이 따사롭게 내리쬐고, 바람이 시원하게 불어와. 완벽한 날씨야!

웃음소리가 끝이 없어. 친구가 있다는 건 정말 멋진 일이야!`,
      bg: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 멀리 탐험한다', to: 'explore_far', cls: 'bg-purple-200' },
        { label: '토토와 대화한다', to: 'talk_to_toto', cls: 'bg-green-200' }
      ],
      prompt: '💭 친구와 놀 때 가장 즐거워?'
    },
    {
      id: 'responsibility',
      title: '책임지는 마음',
      text: `그날부터 매일 토토를 돌봤어.

아침에 일어나면 제일 먼저 토토에게 밥을 줘. 신선한 물도 갈아줘.

브러시로 토토의 털을 빗겨주면 토토가 정말 좋아해!

산책도 빼먹지 않아. 비가 오는 날도, 바람이 부는 날도 함께 걸어.

'책임진다는 게 이런 거구나.' 너는 점점 성장하고 있어!`,
      bg: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '토토와 산책한다', to: 'walk_toto', cls: 'bg-green-200' },
        { label: '토토에게 말을 건다', to: 'talk_to_toto', cls: 'bg-blue-200' }
      ],
      prompt: '💭 책임지는 게 뿌듯해?'
    },
    {
      id: 'help_aunt',
      title: '이모 도와드리기',
      text: `"이모, 제가 도와드릴게요!" 빨래를 돕겠다고 나섰어.

무거운 빨랫감을 들어 밖으로 나르고, 빨랫줄에 하나씩 걸었어.

바람이 불 때마다 빨래가 팔랑팔랑 날려. 마치 춤추는 것 같아!

"${name.first}, 고맙구나. 네가 도와주니 일이 훨씬 빨리 끝나네!"

도와드리니 뿌듯해! 가족을 위해 할 수 있는 일이 있다는 게 좋아.`,
      bg: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 도와드린다', to: 'help_more', cls: 'bg-green-200' },
        { label: '토토와 논다', to: 'play_with_toto', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 가족을 돕는 게 좋아?'
    },
    {
      id: 'explore_far',
      title: '새로운 발견',
      text: `"토토, 더 멀리 가볼까?" 평소보다 멀리 나아갔어.

처음 보는 길을 걷다가 작은 개울을 발견했어!

"와! 여기 이런 곳이!" 신기해서 눈이 휘둥그레졌어.

토토가 물가에서 물장난을 쳐. 작은 발로 찰싹찰싹!

야생화도 피고, 나비도 날아다녀. 세상은 넓고 신기해!`,
      bg: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '함께 물놀이한다', to: 'play_water', cls: 'bg-blue-200' },
        { label: '더 멀리 가본다', to: 'climb_hill', cls: 'bg-purple-200' }
      ],
      prompt: '💭 새로운 것을 발견하면 신나?'
    },
    {
      id: 'talk_to_toto',
      title: '마음 나누기',
      text: `풀밭에 앉아 토토에게 이야기했어.

"토토, 넌 내 가장 친한 친구야. 가끔 외로웠는데, 이젠 아니야!"

토토가 고개를 갸웃하며 너를 쳐다봐. 정말 듣고 있는 것 같아!

"비밀 하나 말할게. 나는 언젠가 특별한 곳에 가보고 싶어. 알록달록한 세상 말이야."

토토가 네 손을 핥아줘. 응원하는 것 같아!`,
      bg: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '꿈에 대해 더 말한다', to: 'share_dream', cls: 'bg-purple-200' },
        { label: '산책을 간다', to: 'walk_toto', cls: 'bg-green-200' }
      ],
      prompt: '💭 친구에게 마음을 말하는 게 중요해?'
    },
    {
      id: 'walk_toto',
      title: '산책하는 즐거움',
      text: `토토와 산책을 나갔어. 이제 매일의 루틴이 됐어.

넓은 들판을 따라 걷다 보면 기분이 좋아져. 바람이 머리카락을 스쳐 지나가.

토토가 신나서 이리저리 뛰어다녀. 가끔 멈춰서 냄새를 맡기도 해.

하늘을 보니 구름이 흘러가고 있어. 구름 하나는 토끼 모양 같고, 또 하나는 성 모양 같아.

산책하면서 이런저런 생각을 하는 시간이 좋아.`,
      bg: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '하늘을 바라본다', to: 'watch_sky', cls: 'bg-blue-200' },
        { label: '더 멀리 간다', to: 'explore_far', cls: 'bg-purple-200' }
      ],
      prompt: '💭 산책하면서 무슨 생각해?'
    },
    {
      id: 'play_water',
      title: '물놀이의 즐거움',
      text: `토토와 개울에서 물놀이를 했어!

신발을 벗고 물에 발을 담갔어. "앗, 차가워!" 하지만 좋아!

토토도 물속으로 풀짝풀짝! 물이 튀어 너도 젖었어.

"토토! 나도 젖었잖아!" 하지만 웃음이 나와!

물장난 치고, 웃고, 뛰어놀고... 작은 것에서 행복을 느껴.`,
      bg: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 논다', to: 'enjoy_moment', cls: 'bg-yellow-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 작은 것에서 행복을 느껴?'
    },
    {
      id: 'climb_hill',
      title: '언덕 위에서',
      text: `멀리 가다가 작은 언덕을 발견했어. "토토, 올라갈까?"

오르기 힘들었지만, 꼭대기에서 시원한 바람이 불어와!

"와!" 캔자스가 한눈에 보여! 끝없는 들판이 펼쳐져.

"토토, 세상이 넓구나!" 처음 느끼는 감각이야.

그런데... 하늘이 이상해. 구름이 검게 모여들어.`,
      bg: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '서둘러 집으로 간다', to: 'rush_home', cls: 'bg-red-200' },
        { label: '잠깐 더 경치를 본다', to: 'watch_sky', cls: 'bg-blue-200' }
      ],
      prompt: '💭 높은 곳에 올라가본 적 있어?'
    },
    {
      id: 'share_dream',
      title: '꿈 이야기',
      text: `"토토, 나한테는 큰 꿈이 있어. 언젠가 정말 특별한 곳에 가보고 싶어!"

토토가 귀를 쫑긋 세우고 들어. 정말 이해하는 것 같아!

"알록달록한 도시, 마법사, 착한 마녀들... 상상만 해도 신나!"

"캔자스도 좋지만, 가끔은 다른 세상도 궁금해."

토토가 꼬리를 흔들며 네 얼굴을 핥아줘. "고마워, 토토. 넌 내 꿈을 응원해주는구나!"`,
      bg: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '상상력을 키운다', to: 'imagine_more', cls: 'bg-purple-200' },
        { label: '산책을 계속한다', to: 'walk_toto', cls: 'bg-green-200' }
      ],
      prompt: '💭 꿈을 이야기하는 게 좋아?'
    },
    {
      id: 'watch_sky',
      title: '변화하는 하늘',
      text: `하늘을 올려다봤어. 구름이 빠르게 흘러가고 있어.

아까까지만 해도 맑았는데, 이제 검은 구름이 모여들고 있어.

"저 구름 너머엔 뭐가 있을까?" 상상해봤어.

그런데 바람이 점점 강해져. 토토의 털이 바람에 날려.

"토토, 날씨가 이상해지는 것 같아. 빨리 집으로 가야 할 것 같아!"`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '빨리 집으로 뛴다', to: 'rush_home', cls: 'bg-red-200' },
        { label: '토토를 안심시킨다', to: 'comfort_toto', cls: 'bg-green-200' }
      ],
      prompt: '💭 갑자기 날씨가 변하면 무서워?'
    },
    {
      id: 'return_home',
      title: '집으로',
      text: `"토토, 집으로 돌아가자!" 천천히 집으로 향했어.

젖은 옷을 입었지만 기분은 상쾌해. 오늘 정말 재미있었어!

집이 보이기 시작했어. 익숙한 회색빛 집이 반갑게 느껴져.

"역시 집이 최고야!" 아무리 밖에서 놀아도, 집만큼 편한 곳은 없어.

엠 이모가 현관에서 기다리고 계셨어. "어서 오렴, ${name.first}!"`,
      bg: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이모와 대화한다', to: 'talk_with_aunt', cls: 'bg-pink-200' },
        { label: '창밖을 본다', to: 'look_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 집이 소중해?'
    },
    {
      id: 'imagine_more',
      title: '상상력 키우기',
      text: `매일 상상의 나래를 펼쳤어.

에메랄드로 만들어진 도시, 보석으로 장식된 성, 노란 벽돌로 만든 길...

착한 마녀 글린다는 분홍색 드레스를 입고, 마법 지팡이를 들고 있어.

날아다니는 원숭이들은 파란 하늘을 자유롭게 날아다녀!

"언젠가는 이런 세상을 정말로 볼 수 있을까?" 기대하며 상상을 계속했어.`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그림으로 그린다', to: 'draw_imagination', cls: 'bg-purple-200' },
        { label: '이모에게 말한다', to: 'share_with_aunt', cls: 'bg-pink-200' }
      ],
      prompt: '💭 상상력을 키우는 게 중요해?'
    },
    {
      id: 'rush_home',
      title: '폭풍우 속으로',
      text: `"토토, 빨리 집으로 가자!" 급하게 뛰기 시작했어.

바람이 엄청나게 강해졌어! 모래와 먼지가 날리고, 나뭇가지가 휘청거려.

하늘이 점점 더 어두워져. 번개가 번쩍이고 천둥이 쿵쾅거려!

무섭지만 포기할 수 없어. 집은 이제 저기 보여!

조금만 더 힘을 내면 집에 도착할 수 있어!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 뛴다', to: 'arrive_home', cls: 'bg-red-200' },
        { label: '토토를 안고 뛴다', to: 'carry_toto', cls: 'bg-green-200' }
      ],
      prompt: '💭 무서워도 용기를 낼 수 있어?'
    },
    {
      id: 'comfort_toto',
      title: '친구 돌보기',
      text: `토토가 무서워서 떨고 있어. 급하게 가는 것보다 먼저 토토를 안심시켜야 해!

"토토, 괜찮아. 내가 여기 있잖아!" 토토를 부드럽게 쓰다듬었어.

토토가 너를 올려다봐. 떨림이 조금 줄어든 것 같아.

"무섭지? 나도 무서워. 하지만 우리 함께니까 괜찮아!"

친구를 돌보니 너도 용기가 생겨. "자, 이제 천천히 집으로 가자."`,
      bg: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '함께 집으로 간다', to: 'rush_home', cls: 'bg-red-200' },
        { label: '안전한 곳을 찾는다', to: 'find_shelter', cls: 'bg-blue-200' }
      ],
      prompt: '💭 친구가 불안해하면 어떻게 해?'
    },
    {
      id: 'talk_with_aunt',
      title: '이모와의 시간',
      text: `옷을 갈아입고 엠 이모와 함께 앉았어.

"오늘 뭐 했니, ${name.first}?" 이모가 따뜻하게 물으셨어.

"토토랑 개울도 찾아보고, 언덕에도 올라갔어요! 캔자스가 한눈에 보였어요!"

"그래? 네가 탐험가가 됐구나!" 이모가 웃으셨어.

"너는 용감하고 착하단다. 토토를 책임지는 모습을 보니 자랑스러워."`,
      bg: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이모를 안아드린다', to: 'hug_aunt', cls: 'bg-pink-200' },
        { label: '창밖을 본다', to: 'look_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 가족과 대화하는 시간이 좋아?'
    },
    {
      id: 'look_outside',
      title: '폭풍의 전조',
      text: `창밖을 봤어. 하늘이 점점 어두워지고 있어.

구름이 빠르게 모여들고, 바람이 점점 강해져. 나뭇가지가 심하게 흔들려.

"이모, 폭풍우가 올 것 같아요..." 걱정스러운 마음으로 말했어.

"그러게. 하늘이 심상치 않구나. 집 안에 있어야겠어."

창문으로 번개가 번쩍이는 게 보여. 천둥소리도 들려. 쿵쾅!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '토토를 찾는다', to: 'find_toto_storm', cls: 'bg-yellow-200' },
        { label: '이모와 함께 있는다', to: 'stay_with_aunt', cls: 'bg-pink-200' }
      ],
      prompt: '💭 폭풍우가 오면 무서워?'
    },
    {
      id: 'share_with_aunt',
      title: '상상 나누기',
      text: `"이모, 제 상상 들어볼래요?" 신나서 이모에게 말했어.

"그럼! 네 상상은 언제나 재미있단다."

"알록달록한 도시가 있어요! 에메랄드로 만든 성도 있고요!"

"노란 벽돌길을 따라 가면 마법사를 만날 수 있대요!"

이모가 너의 이야기를 재미있게 들으셨어. "참 멋진 상상이구나!"`,
      bg: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '기뻐한다', to: 'feel_happy', cls: 'bg-yellow-200' },
        { label: '밖을 본다', to: 'look_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 꿈을 응원해주는 사람이 있어?'
    },
    {
      id: 'carry_toto',
      title: '친구 지키기',
      text: `토토가 힘들어하는 게 보여. 작은 다리로 이 강한 바람을 이겨내기 힘들 거야!

"토토, 내가 안아줄게!" 토토를 두 팔로 꼭 안아들었어.

무겁지만 괜찮아. 친구를 지키는 게 더 중요해!

"토토, 널 지킬게! 걱정하지 마!" 토토가 네 품에서 안정을 찾은 것 같아.

비록 무겁지만, 토토를 지킬 수 있다는 게 뿌듯해.`,
      bg: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '집으로 뛴다', to: 'arrive_home', cls: 'bg-red-200' },
        { label: '잠깐 쉰다', to: 'find_shelter', cls: 'bg-blue-200' }
      ],
      prompt: '💭 친구를 지키는 게 중요해?'
    },
    {
      id: 'find_shelter',
      title: '안전한 곳',
      text: `큰 나무 아래로 급히 피했어! 비바람을 조금이라도 피할 수 있어.

"토토, 여기서 잠깐 쉬자. 폭풍우가 조금 약해지면 뛰어가자!"

현명한 판단이야. 무작정 뛰는 것보다 안전이 먼저!

나무 아래에서 토토를 안심시켰어. "괜찮아, 곧 지나갈 거야."

잠시 후 바람이 조금 약해진 것 같아. "자, 이제 가자!"`,
      bg: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '집으로 뛴다', to: 'arrive_home', cls: 'bg-green-200' },
        { label: '더 기다린다', to: 'wait_storm', cls: 'bg-blue-200' }
      ],
      prompt: '💭 위험할 때 현명하게 판단할 수 있어?'
    },
    {
      id: 'arrive_home',
      title: '무사히 도착',
      text: `"이모!" 집 문을 열고 들어왔어! 드디어 안전해!

엠 이모가 달려오셨어. "${name.first}! 토토! 무사해서 다행이야!"

이모가 너와 토토를 꼭 안아주셨어. 이모의 품이 따뜻해.

"걱정했단다. 폭풍우가 몰려오는데 밖에 있어서..."

"괜찮아요, 이모. 제가 토토를 지켰어요!" 자랑스럽게 말했어.`,
      bg: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이모를 안는다', to: 'hug_aunt', cls: 'bg-pink-200' },
        { label: '토토를 돌본다', to: 'care_toto', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 집에 도착하면 안심돼?'
    },
    {
      id: 'find_toto_storm',
      title: '토토를 찾아서',
      text: `"토토! 토토!" 집 안을 돌아다니며 토토를 찾았어.

침대 밑을 봤어. 아니야. 부엌도 봤어. 여기도 없어!

"토토, 어디 있어?" 걱정이 커져.

마침내 구석 옷장에서 떨고 있는 토토를 찾았어!

"토토, 괜찮아! 무서웠구나..." 토토를 꼭 안아줬어.`,
      bg: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '토토를 안심시킨다', to: 'calm_toto', cls: 'bg-green-200' },
        { label: '이모에게 간다', to: 'stay_with_aunt', cls: 'bg-pink-200' }
      ],
      prompt: '💭 친구가 무서워하면 어떻게 해?'
    },
    {
      id: 'stay_with_aunt',
      title: '함께라면 괜찮아',
      text: `엠 이모 곁에 바짝 붙어 앉았어. 토토도 함께.

폭풍우가 점점 강해져. 집이 삐걱거리는 소리가 들려.

"무섭지 않니, ${name.first}?" 이모가 물으셨어.

"조금... 하지만 이모랑 토토랑 함께라서 괜찮아요!"

이모가 너를 안아주시며 말씀하셨어. "그래, 우리 함께니까 괜찮아."`,
      bg: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이모와 이야기한다', to: 'storm_talk', cls: 'bg-pink-200' },
        { label: '창밖을 본다', to: 'watch_storm', cls: 'bg-gray-200' }
      ],
      prompt: '💭 가족과 함께 있으면 안심돼?'
    },
    {
      id: 'hug_aunt',
      title: '사랑의 포옹',
      text: `엠 이모를 꼭 안아드렸어. "이모, 사랑해요!"

이모도 너를 꼭 안아주셨어. "나도 사랑한단다, ${name.first}."

이모의 품은 세상에서 가장 따뜻하고 안전한 곳이야.

"이모가 있어서 행복해요. 항상 저를 돌봐주시고, 응원해주시고..."

"얘야, 넌 우리 집의 보물이야. 네가 있어서 이모도 행복하단다."`,
      bg: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '성장을 느낀다', to: 'feel_growth', cls: 'bg-green-200' },
        { label: '창밖을 본다', to: 'watch_storm', cls: 'bg-blue-200' }
      ],
      prompt: '💭 가족을 안아본 적 있어?'
    },
    {
      id: 'care_toto',
      title: '토토 돌보기',
      text: `젖은 토토를 수건으로 닦아줬어. "토토, 감기 걸리면 안 돼!"

토토의 털을 정성껏 말려줬어. 하나하나 빗질도 해줬어.

"많이 무서웠지? 이제 괜찮아. 우리 집에 있으니까!"

따뜻한 물과 밥도 줬어. 토토가 맛있게 먹어.

다 먹고 나니 토토가 네 손을 핥아줘. "고마워!" 하는 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '토토와 쉰다', to: 'rest_together', cls: 'bg-green-200' },
        { label: '이모에게 간다', to: 'stay_with_aunt', cls: 'bg-pink-200' }
      ],
      prompt: '💭 책임감 있게 돌보는 게 중요해?'
    },
    {
      id: 'calm_toto',
      title: '친구 위로하기',
      text: `토토를 부드럽게 쓰다듬으며 말했어.

"토토, 괜찮아. 천둥소리는 무섭지만 우리를 해치지 않아."

"곧 그칠 거야. 내가 여기 있잖아. 너를 지켜줄게!"

토토가 점점 진정하는 게 느껴져. 떨림이 줄어들어.

친구를 위로할 줄 아는 너 자신이 자랑스러워.`,
      bg: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '함께 쉰다', to: 'rest_together', cls: 'bg-green-200' },
        { label: '이모에게 간다', to: 'stay_with_aunt', cls: 'bg-pink-200' }
      ],
      prompt: '💭 친구를 위로할 줄 알아?'
    },
    {
      id: 'wait_storm',
      title: '인내심',
      text: `나무 아래에서 폭풍우가 약해지기를 기다렸어.

급하게 뛰어가는 것보다 안전하게 기다리는 게 현명해!

"토토, 조금만 참자. 안전이 제일 중요해."

빗소리를 들으며 기다렸어. 천둥도 번개도 점점 멀어지는 것 같아.

인내심을 가지고 기다리니, 드디어 비가 약해졌어!`,
      bg: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '천천히 집으로 간다', to: 'arrive_home', cls: 'bg-green-200' },
        { label: '토토와 이야기한다', to: 'talk_to_toto', cls: 'bg-blue-200' }
      ],
      prompt: '💭 인내심이 중요해?'
    },
    {
      id: 'storm_talk',
      title: '폭풍우 이야기',
      text: `엠 이모가 이야기를 들려주셨어.

"캔자스에는 가끔 이렇게 큰 폭풍우가 와. 하지만 지나가면 다시 평화로워진다."

"무서운 일도 있지만, 그걸 이겨내면 더 강해지는 거란다."

이모의 이야기를 들으니 마음이 편해져. 나도 강해질 수 있어!

"너도 오늘을 이겨내면 더 용감해질 거야!"`,
      bg: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '용기를 얻는다', to: 'gain_courage', cls: 'bg-red-200' },
        { label: '창밖을 본다', to: 'watch_storm', cls: 'bg-gray-200' }
      ],
      prompt: '💭 어른의 경험담이 도움 돼?'
    },
    {
      id: 'watch_storm',
      title: '폭풍우 바라보기',
      text: `창밖을 조심스럽게 바라봤어. 엄청난 광경이야!

바람이 모든 것을 휩쓸고 지나가. 나뭇가지가 부러지고, 먼지가 날려.

하늘은 검고, 번개가 번쩍이고, 천둥이 쿵쾅거려!

무섭지만... 동시에 자연의 힘이 대단하다는 생각이 들어.

이 폭풍우가 지나가면, 나도 더 강해질 것 같아!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '용기를 배운다', to: 'gain_courage', cls: 'bg-red-200' },
        { label: '토토를 안는다', to: 'calm_toto', cls: 'bg-green-200' }
      ],
      prompt: '💭 자연의 힘이 대단해?'
    },
    {
      id: 'rest_together',
      title: '편안한 휴식',
      text: `토토와 함께 따뜻한 담요 속에 들어갔어.

폭풍우 소리는 들리지만, 토토와 함께라서 무섭지 않아.

토토가 네 곁에서 스르륵 잠들어. 평화로운 얼굴이야.

너도 토토를 보며 미소 지었어. "우리 정말 좋은 친구가 됐어."

가족과 친구가 있는 집. 이곳이 바로 내가 사랑하는 곳이야!`,
      bg: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '감사한 마음을 느낀다', to: 'feel_grateful', cls: 'bg-green-200' },
        { label: '평화를 즐긴다', to: 'enjoy_peace', cls: 'bg-blue-200' }
      ],
      prompt: '💭 평화로운 순간이 좋아?'
    },
    {
      id: 'gain_courage',
      title: '용기 배우기',
      text: `폭풍우를 경험하며 많은 걸 배웠어.

무서운 일이 있어도, 용기를 내면 이겨낼 수 있다는 것!

토토를 지키며 책임감을 배웠고, 이모와 함께하며 가족의 사랑을 느꼈어.

"나는 생각보다 강해!" 스스로에게 말했어.

어려운 상황에서도 포기하지 않고, 친구를 돌보고, 현명하게 판단했어.`,
      bg: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '성장을 느낀다', to: 'feel_growth', cls: 'bg-green-200' },
        { label: '미래를 상상한다', to: 'dream_future', cls: 'bg-purple-200' }
      ],
      prompt: '💭 어려운 경험이 너를 성장시켜?'
    },
    {
      id: 'help_more',
      title: '더 도와드리기',
      text: `빨래를 도와드린 후, 또 무엇을 도와드릴까 생각했어.

"이모, 정원 물주기도 제가 할게요!" 자발적으로 나섰어.

물뿌리개를 들고 정원으로 갔어. 꽃들에게 하나하나 물을 줬어.

시들었던 꽃들이 생기를 되찾아. "고마워!" 하는 것 같아!

도와드리면서 뿌듯함을 느껴. 가족을 위해 할 수 있는 일이 있다는 게 행복해!`,
      bg: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '자랑스러워한다', to: 'feel_proud', cls: 'bg-green-200' },
        { label: '토토와 논다', to: 'play_with_toto', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 가족을 돕는 게 뿌듯해?'
    },
    {
      id: 'thank_letter',
      title: '감사의 편지',
      text: `종이와 연필을 꺼내 편지를 썼어.

"사랑하는 이모께, 항상 저를 돌봐주시고 사랑해주셔서 감사합니다."

"이모가 있어서 저는 행복합니다. 토토도, 집도, 하늘도... 모든 게 감사해요."

마음을 글로 표현하니 더 진실되게 느껴져!

편지를 이모에게 드렸어. 이모가 읽으시더니 눈물을 글씽이셨어.`,
      bg: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '자랑스러워한다', to: 'feel_proud', cls: 'bg-green-200' },
        { label: '《오즈의 마법사》 읽어보기', to: 'ending', cls: 'bg-emerald-200' }
      ],
      prompt: '💭 감사를 표현하면 기분이 어때?'
    },
    {
      id: 'feel_grateful',
      title: '감사한 마음',
      text: `조용히 앉아서 생각했어. 내가 가진 것들에 대해.

사랑하는 엠 이모, 든든한 친구 토토, 따뜻한 집...

푸른 하늘, 넓은 들판, 신선한 공기까지.

"나는 정말 많은 것을 가졌구나!" 감사한 마음이 들어.

감사하는 마음을 가지니 작은 것들도 더 빛나 보여!`,
      bg: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '평화를 느낀다', to: 'enjoy_peace', cls: 'bg-blue-200' },
        { label: '《오즈의 마법사》 읽어보기', to: 'ending', cls: 'bg-emerald-200' }
      ],
      prompt: '💭 감사한 게 많아?'
    },
    {
      id: 'enjoy_peace',
      title: '평화로운 순간',
      text: `이 평화로운 순간을 만끽했어.

폭풍우는 밖에 있지만, 집 안은 따뜻하고 안전해.

토토의 평화로운 숨소리, 이모의 부드러운 목소리, 집의 포근한 분위기...

"행복은 멀리 있지 않아. 바로 여기, 지금이야!"

이 순간을 기억할 거야. 평화와 사랑으로 가득한 이 순간을!`,
      bg: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '성장을 느낀다', to: 'feel_growth', cls: 'bg-green-200' },
        { label: '《오즈의 마법사》 읽어보기', to: 'ending', cls: 'bg-emerald-200' }
      ],
      prompt: '💭 평화로운 순간을 소중히 여겨?'
    },
    {
      id: 'feel_growth',
      title: '성장하는 나',
      text: `캔자스에서 보낸 시간을 돌아봤어.

처음에는 외롭고 심심했지만, 이제는 달라.

토토를 만나며 책임감을 배웠고, 폭풍우를 이겨내며 용기를 얻었어.

이모의 사랑을 느끼고, 감사하는 마음도 배웠어.

"나는 많이 성장했어!" 스스로에게 자랑스러워.`,
      bg: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '자랑스러워한다', to: 'feel_proud', cls: 'bg-green-200' },
        { label: '미래를 꿈꾼다', to: 'dream_future', cls: 'bg-purple-200' }
      ],
      prompt: '💭 성장하는 걸 느낄 수 있어?'
    },
    {
      id: 'dream_future',
      title: '미래를 꿈꾸며',
      text: `미래를 상상해봤어. 어떤 일들이 펼쳐질까?

"언젠가는 정말로 특별한 모험을 하게 될지도 몰라!"

알록달록한 세상, 마법의 친구들, 신비한 경험들...

상상만 해도 가슴이 두근거려!

"꿈을 가지고, 현재를 소중히 여기며 살자!" 다짐했어!`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '희망을 품는다', to: 'have_hope', cls: 'bg-purple-200' },
        { label: '《오즈의 마법사》 읽어보기', to: 'ending', cls: 'bg-emerald-200' }
      ],
      prompt: '💭 미래를 꿈꾸는 게 좋아?'
    },
    {
      id: 'feel_proud',
      title: '자랑스러운 나',
      text: `거울을 보며 생각했어. '나는 정말 많이 변했어!'

용감하고, 책임감 있고, 상상력 풍부하고, 감사할 줄 아는 아이가 됐어.

토토를 돌보고, 이모를 도와드리고, 폭풍우를 이겨냈어!

"나는 할 수 있어! 나는 강해!" 자신감이 생겨.

이 모든 경험이 나를 더 나은 사람으로 만들었어.`,
      bg: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '미래를 꿈꾼다', to: 'dream_future', cls: 'bg-purple-200' },
        { label: '《오즈의 마법사》 읽어보기', to: 'ending', cls: 'bg-emerald-200' }
      ],
      prompt: '💭 자신을 자랑스럽게 여겨?'
    },
    {
      id: 'feel_happy',
      title: '행복한 하루',
      text: `들판으로 나가서 토토와 신나게 뛰어놀았어!

"토토, 잡아봐!" 술래잡기를 하며 웃음소리가 끝이 없어.

토토도 신나서 짖어. "멍멍!" 꼬리를 살랑살랑 흔들어!

햇빛이 따사롭게 비추고, 바람이 시원하게 불어와.

"오늘이 최고의 날이야!" 크게 소리쳤어.`,
      bg: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 신나게 논다', to: 'enjoy_moment', cls: 'bg-yellow-200' },
        { label: '《오즈의 마법사》 읽어보기', to: 'ending', cls: 'bg-emerald-200' }
      ],
      prompt: '💭 행복한 순간은 언제야?'
    },
    {
      id: 'have_hope',
      title: '희망의 빛',
      text: `하늘을 올려다보며 희망을 품었어.

"좋은 일이 생길 거야! 나는 할 수 있어!"

힘든 일이 있어도, 희망을 가지면 이겨낼 수 있어.

토토와 함께, 이모와 함께, 그리고 나의 용기와 함께라면!

"언젠가는 내 꿈도 이루어질 거야!" 믿음을 가졌어.`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '긍정적으로 생각한다', to: 'stay_positive', cls: 'bg-yellow-200' },
        { label: '《오즈의 마법사》 읽어보기', to: 'ending', cls: 'bg-emerald-200' }
      ],
      prompt: '💭 희망을 가지면 힘이 나?'
    },
    {
      id: 'stay_positive',
      title: '긍정의 힘',
      text: `긍정적인 마음으로 매일을 시작했어!

"오늘도 좋은 일이 생길 거야! 나는 행복해!"

어려운 일이 있어도 긍정적으로 생각하면 덜 힘들어.

토토도, 이모도, 주변의 모든 것이 고마워 보여.

웃으며 하루를 시작하니, 세상이 더 밝아 보여!`,
      bg: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '행복을 느낀다', to: 'feel_happy', cls: 'bg-yellow-200' },
        { label: '《오즈의 마법사》 읽어보기', to: 'ending', cls: 'bg-emerald-200' }
      ],
      prompt: '💭 긍정적으로 생각하는 편이야?'
    },
    {
      id: 'enjoy_moment',
      title: '소중한 순간',
      text: `이 순간을 마음껏 즐겼어!

토토와 함께 뛰놀고, 자연과 하나 되고, 행복을 느껴.

"지금 이 순간이 너무 소중해!" 가슴속 깊이 새겼어.

과거는 지나갔고, 미래는 아직 오지 않았어. 중요한 건 지금!

"행복은 지금 여기에 있어!" 큰 깨달음을 얻었어!`,
      bg: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '감사한다', to: 'feel_grateful', cls: 'bg-green-200' },
        { label: '《오즈의 마법사》 읽어보기', to: 'ending', cls: 'bg-emerald-200' }
      ],
      prompt: '💭 현재를 즐기는 게 중요해?'
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `너는 캔자스에서 용기와 우정을 배웠어.

《오즈의 마법사》에서는 토네이도가 너를 마법의 오즈 나라로 데려가!

허수아비, 양철 나무꾼, 겁쟁이 사자와 친구가 되어 노란 벽돌길을 걸으며 에메랄드 도시로 모험을 떠나!

각자 원하는 걸 찾아가지만, 결국 가장 소중한 건 이미 우리 안에 있다는 걸 깨달아. 집만큼 좋은 곳은 없다는 진리도 배우게 돼!

📚 서점이나 도서관에서 《오즈의 마법사》를 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      prompt: '💭 《오즈의 마법사》 - 해리포터, 위키드의 원조! 1900년 미국 판타지 고전. 회색 캔자스에서 알록달록 오즈 나라로! 집의 소중함과 진정한 용기를 배우는 마법 모험!',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' }
      ]
    }
  ];
}

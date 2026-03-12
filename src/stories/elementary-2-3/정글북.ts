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
    casual: `${firstName}야`
  };
}

export function generateJungleBookStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '첫 비행',
      text: `${name.은는} 어린 솔개야.
솔개는 매, 독수리와 비슷한 종류의 큰 새지.

오늘 처음으로 둥지를 떠나 하늘로 날아올랐어!

"와! 세상이 이렇게 넓어?"

아래로 초록빛 정글이 펼쳐져 있어.
반짝이는 강, 높은 나무들, 저 멀리 연기 나는 인간 마을...

어미 솔개가 날아와. 
"우리 솔개는 하늘에서 정글을 지켜볼 수 있단다."

어디부터 둘러볼까?`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '숲 속 동물들 보기', to: 'forest-1', cls: 'bg-green-200' },
        { label: '강가로 날아가기', to: 'river-1', cls: 'bg-blue-200' },
        { label: '높이 날며 전체 보기', to: 'sky-1', cls: 'bg-purple-200' }
      ],
      prompt: '💭 어디를 먼저 탐험할까?'
    },

    // ===== 숲 경로 =====
    {
      id: 'forest-1',
      title: '숲 속 생명들',
      text: `숲으로 날아가니 나무들이 빽빽해.

사슴 가족이 풀을 뜯어 먹고 있어.
새끼 사슴도 엄마 옆에서 조심스럽게 풀을 먹어.

원숭이들이 나무를 타고 뛰어다녀.
과일을 따 먹으며 재잘재잘!

어미 솔개가 말해. "사슴은 풀을 먹는 초식동물이고, 원숭이는 과일도 먹고 벌레도 먹는 잡식동물이야."

뭘 더 자세히 볼까?`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사슴 가족 관찰하기', to: 'forest-2-deer', cls: 'bg-yellow-200' },
        { label: '원숭이 무리 보기', to: 'forest-2-monkey', cls: 'bg-orange-200' }
      ],
      prompt: '💭 뭘 더 자세히 볼까?'
    },
    {
      id: 'forest-2-deer',
      title: '사슴의 경계',
      text: `사슴들을 자세히 봤어.

엄마 사슴은 항상 주변을 경계해.
귀를 쫑긋 세우고 주위를 살펴.

새끼 사슴이 물었어. "엄마, 왜 계속 두리번거려요?"

"우리는 약한 동물이야. 호랑이나 표범이 잡아먹으려 하거든."

갑자기 덤불이 바스락!
모든 사슴이 귀를 세워.

긴장된 순간이야...`,
      bg: 'https://images.unsplash.com/photo-1551798507-629020c81463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '덤불 확인하기', to: 'forest-3-danger', cls: 'bg-red-200' },
        { label: '사슴들 도와주기', to: 'forest-3-help', cls: 'bg-blue-200' }
      ],
      prompt: '💭 강한 자가 약한자를 이기는 것은 당연할까?'
    },
    {
      id: 'forest-2-monkey',
      title: '원숭이 무리',
      text: `원숭이들을 따라갔어.

나무에서 나무로 깡충깡충!
꼬리로 나뭇가지를 잡고 매달려.

한 원숭이가 바나나를 먹고 있어.
다른 원숭이가 다가오자 으르렁!

어미 솔개가 설명해줘. 
"원숭이들은 무리 지어 살지만, 먹이는 각자 구해야 해."

리더 원숭이가 제일 높은 곳에 앉아 주변을 살펴.

뭘 더 볼까?`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '원숭이 사회 배우기', to: 'forest-3-society', cls: 'bg-orange-200' },
        { label: '다른 동물 찾기', to: 'forest-3-explore', cls: 'bg-green-200' }
      ],
      prompt: '💭 공동체 사회에서 각자 경쟁하는 것이 맞을까?'
    },
    {
      id: 'forest-3-danger',
      title: '호랑이 등장',
      text: `덤불에서 오렌지색 줄무늬가 보여!

호랑이야!

조용히 사슴을 노리며 몸을 낮춰.
천천히... 천천히...

갑자기 뛰어올라!

사슴들이 놀라 도망쳐!
한 마리를 쫓아가는데...

사슴이 더 빨라서 실패했어.

호랑이가 지쳐서 멈춰.
"후... 실패했네."`,
      bg: 'https://images.unsplash.com/photo-1551798507-629020c81463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '호랑이 관찰하기', to: 'forest-4-tiger', cls: 'bg-orange-200' },
        { label: '먹이사슬 생각하기', to: 'forest-4-chain', cls: 'bg-green-200' }
      ],
      prompt: '💭 지쳐서 실패한 경험이 있어?'
    },
    {
      id: 'forest-3-help',
      title: '경고 울음',
      text: `네가 큰 소리로 울었어!

"끼익! 끼익!"

사슴들이 재빨리 도망쳐!

덤불에서 호랑이가 나타났지만 이미 늦었어.

호랑이가 너를 올려다봤어.
"작은 솔개가 방해했군..."

하지만 화내지 않아. 그냥 걸어가.

어미 솔개가 말해. 
"우리도 정글의 일원이야. 때로는 도와줄 수 있지."`,
      bg: 'https://images.unsplash.com/photo-1551798507-629020c81463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '호랑이 따라가기', to: 'forest-4-tiger', cls: 'bg-orange-200' },
        { label: '균형에 대해 생각하기', to: 'forest-4-balance', cls: 'bg-purple-200' }
      ],
      prompt: '💭 사슴을 도운걸까, 호랑이를 방해한걸까?'
    },
    {
      id: 'forest-3-society',
      title: '원숭이 사회',
      text: `원숭이들을 더 관찰했어.

리더 원숭이가 제일 높은 나뭇가지에 앉아.
다른 원숭이들이 존경하는 것 같아.

어린 원숭이들이 놀고 있어.
나무 사이를 뛰어다니며 재주 연습!

"원숭이들도 우두머리가 있어. 가장 강하고 똑똑한 원숭이가 리더야."

한 원숭이가 벌레를 잡아먹어!

"원숭이는 과일도 먹고 벌레도 먹는 잡식동물이야."`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '어린 원숭이들 보기', to: 'forest-4-young', cls: 'bg-yellow-200' },
        { label: '먹이 찾는 법 보기', to: 'forest-4-food', cls: 'bg-green-200' }
      ],
      prompt: '💭 어떤 스타일의 리더를 좋아해?'
    },
    {
      id: 'forest-3-explore',
      title: '다양한 생명',
      text: `숲을 더 돌아다녔어.

나무에 앵무새가 열매를 쪼아 먹어.
땅에서 멧돼지가 코로 땅을 파.

"멧돼지는 땅속 뿌리를 찾아 먹어. 코가 아주 좋거든."

하늘에서 다른 솔개도 날고 있어!
저 멀리 독수리도 보여.

"저 독수리는 우리보다 훨씬 커. 더 큰 동물도 잡을 수 있지."

숲에는 정말 많은 생명이 살아!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다른 새들 만나기', to: 'forest-4-birds', cls: 'bg-blue-200' },
        { label: '땅 동물 관찰하기', to: 'forest-4-ground', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 가장 좋아하는 동물은?'
    },
    {
      id: 'forest-4-tiger',
      title: '호랑이의 삶',
      text: `호랑이를 따라갔어.

물을 마시러 강으로 가.
발에 흉터가 있어.

"저 호랑이는 인간한테 다쳤나봐. 인간은 덫을 놓거든."

호랑이가 혼자 걸어가.

"호랑이는 혼자 사는 동물이야. 자기 영역을 지키면서 살지."

외로워 보이지만, 그게 호랑이의 방식이야.

나무에 발톱 자국을 남겨.
"이건 내 영역이야!"라고 알리는 거야.`,
      bg: 'https://images.unsplash.com/photo-1551798507-629020c81463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '육식동물 더 알기', to: 'forest-5-predator', cls: 'bg-red-200' },
        { label: '숲 떠나기', to: 'convergence-forest', cls: 'bg-green-200' }
      ],
      prompt: '💭 인간이 동물을 사냥하는 것은 옳은 일인가?'
    },
    {
      id: 'forest-4-chain',
      title: '먹이사슬 이해',
      text: `어미 솔개가 설명해줘.

"자, 잘 봐. 풀이 자라고, 사슴이 풀을 먹어
호랑이는 사슴을 잡아먹고 호랑이가 죽으면 흙으로 돌아가 풀이 자라
이게 먹이사슬이야!"

"그럼 호랑이는 나빠요?"

"아니야. 모두 살기 위한 거야. 자연의 법칙이지."

이제 조금 이해했어!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 배우기', to: 'forest-5-learn', cls: 'bg-purple-200' },
        { label: '다른 곳 가기', to: 'convergence-forest', cls: 'bg-green-200' }
      ],
      prompt: '💭 만약 먹이사슬이 끊어지면 어떻게 될까?'
    },
    {
      id: 'forest-4-balance',
      title: '균형의 의미',
      text: `어미 솔개가 물었어.

"만약 호랑이가 없으면 어떻게 될까?"

네가 생각해봤어.
"사슴이 너무 많아져요!"

"맞아. 그러면 풀이 다 없어지고, 사슴도 결국 못 살아."

"모든 동물이 필요하구나!"

"그래. 초식동물도, 육식동물도 모두 중요해. 균형이 필요한 거야."

정글의 지혜를 배웠어!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '균형 더 알아보기', to: 'forest-5-ecosystem', cls: 'bg-green-200' },
        { label: '새로운 곳 탐험', to: 'convergence-forest', cls: 'bg-blue-200' }
      ],
      prompt: '💭 징그러운 벌레들도 필요할까?'
    },
    {
      id: 'forest-4-young',
      title: '배우는 새끼들',
      text: `어린 원숭이들이 노는 걸 봤어.

나무에서 나무로 뛰어다니며 연습해.
가끔 떨어질 뻔하지만 계속 도전해!

"놀면서 배우는 거야. 어른이 되면 혼자 살아야 하니까."

어린 사슴들도 뛰어놀아.
서로 쫓아다니며 달리기 연습!

어린 호랑이도 보여!
엄마가 사냥하는 걸 지켜봐.

"어미한테 배우는 거지."

모든 새끼들이 배우며 자라!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '배움의 중요성 깨닫기', to: 'forest-5-learning', cls: 'bg-yellow-200' },
        { label: '더 넓은 세상 보기', to: 'convergence-forest', cls: 'bg-purple-200' }
      ],
      prompt: '💭 부모님 도움 없이 스스로 해내고 뿌듯한 것이 있어?'
    },
    {
      id: 'forest-4-food',
      title: '먹이 찾기',
      text: `원숭이가 먹이를 찾는 걸 봤어.

나무 열매를 따서 냄새를 맡아.
"이건 익었어!" 맛있게 먹어.

다른 원숭이는 나무껍질을 벗겨.
안에 벌레가! 냉큼 잡아먹어.

"원숭이는 과일도 먹고, 벌레도 먹고, 나뭇잎도 먹어
그래서 살아남기 쉬워. 여러 가지를 먹을 수 있으니까!"

똑똑한 방법이야!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '잡식동물 이해하기', to: 'forest-5-omnivore', cls: 'bg-orange-200' },
        { label: '정글 더 탐험하기', to: 'convergence-forest', cls: 'bg-green-200' }
      ],
      prompt: '💭 골고루 잘 먹어?  아니면 편식해?'
    },
    {
      id: 'forest-4-birds',
      title: '하늘 친구들',
      text: `다른 새들을 만났어!

앵무새가 화려한 색깔로 날아와.
"난 과일이랑 씨앗을 먹어!"

독수리가 높이 날고 있어.
"난 죽은 동물을 먹어. 정글을 깨끗하게 해주지!"

작은 새가 빠르게 날아다녀.
"난 벌레를 잡아먹어!"

"모든 새가 다른 먹이를 먹어. 그래서 함께 살 수 있지."`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '새들의 역할 배우기', to: 'forest-5-birds-role', cls: 'bg-blue-200' },
        { label: '숲 밖으로 나가기', to: 'convergence-forest', cls: 'bg-green-200' }
      ],
      prompt: '💭 가족끼리 좋아하는 음식이 같아?'
    },
    {
      id: 'forest-4-ground',
      title: '땅 위 생명들',
      text: `땅 가까이 날며 관찰했어.

멧돼지가 코로 땅을 파.
뿌리를 찾고 있어!

토끼가 풀을 먹다가 귀를 세워.
뭔가 소리를 들은 것 같아.

땅 위에 뱀이 지나가.
쥐를 찾고 있어.

"뱀은 다리가 없지만 잘 움직여. 뱀도 중요한 사냥꾼이야."

땅에도 많은 생명이!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '땅 생태계 배우기', to: 'forest-5-ground-eco', cls: 'bg-yellow-200' },
        { label: '높이 날아오르기', to: 'convergence-forest', cls: 'bg-blue-200' }
      ],
      prompt: '💭 뱀처럼 다리 없는 동물을 보면 어떤 느낌이 들어?'
    },
    {
      id: 'forest-5-predator',
      title: '육식동물의 역할',
      text: `어미 솔개가 설명해줘.

"육식동물은 나쁜 게 아니야. 초식동물 숫자를 조절해주지."

"만약 육식동물이 없으면요?"

"초식동물이 너무 많아져서 풀이 다 없어져. 그러면 모두 굶어."

"아... 육식동물도 필요하구나!"

"맞아. 우리 솔개도 작은 쥐를 잡아먹어. 쥐가 너무 많아지지 않게 하는 거야."

모두 역할이 있어!`,
      bg: 'https://images.unsplash.com/photo-1551798507-629020c81463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음 모험으로', to: 'convergence-forest', cls: 'bg-purple-200' }
      ],
      prompt: '💭 집이나 학교에서 어떤 역할이야?'
    },
    {
      id: 'forest-5-learn',
      title: '자연의 법칙',
      text: `숲에서 배운 것들을 정리했어.

초식동물은 풀이나 나뭇잎 먹음
육식동물은 다른 동물 잡아먹음
잡식동물은 여러 가지 다 먹음

"모두 살기 위해 먹이를 구해. 그게 자연의 법칙이야

잔인한 게 아니라 생존이야

필요한 만큼만 가져가. 그래야 균형이 유지되지."

중요한 걸 배웠어!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '새로운 곳으로', to: 'convergence-forest', cls: 'bg-green-200' }
      ],
      prompt: '💭 필요한 것 이상을 욕심낸 적 있어?'
    },
    {
      id: 'forest-5-ecosystem',
      title: '생태계 균형',
      text: `어미 솔개가 더 설명해줬어.

"생태계는 균형이 중요해

풀이 자라고, 초식동물이 먹고, 육식동물이 초식동물을 먹고...

죽은 동물은 흙으로 돌아가 풀을 자라게 해."

이 순환이 계속되는 거야

하나라도 없으면 균형이 깨져."

정글의 비밀을 알게 됐어!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 넓은 세상 보기', to: 'convergence-forest', cls: 'bg-blue-200' }
      ],
      prompt: '💭 최근에 알게 된 비밀이 있어?'
    },
    {
      id: 'forest-5-learning',
      title: '배움의 중요성',
      text: `어미 솔개가 말해.

"봤지? 모든 동물이 배우며 자라."

원숭이는 나무 타기를, 사슴은 빨리 달리기를, 호랑이는 사냥을...

우리도 배우고 있어. 정글을 이해하는 법을!

배워야 살아남을 수 있거든."

네가 고개를 끄덕여.
"저도 열심히 배울게요!"

"잘했어!"`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음 장소로', to: 'convergence-forest', cls: 'bg-purple-200' }
      ],
      prompt: '💭 열심히 배우고 싶은 것이 있어?'
    },
    {
      id: 'forest-5-omnivore',
      title: '잡식동물의 강점',
      text: `어미 솔개가 설명해줘.

"잡식동물은 여러 가지를 먹을 수 있어서 강해."

과일이 없으면 벌레를 먹고, 벌레가 없으면 나뭇잎을 먹어

우리처럼 한 가지만 먹는 동물보다 살아남기 쉬워

하지만 우리는 사냥을 잘해서 괜찮아!"

각자 장점이 있는 거야!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '새로운 모험으로', to: 'convergence-forest', cls: 'bg-green-200' }
      ],
      prompt: '💭 어떤 장점이나 특기가 있어?'
    },
    {
      id: 'forest-5-birds-role',
      title: '새들의 역할',
      text: `어미 솔개가 말해.

"우리 새들도 중요한 역할이 있어."

"독수리는 죽은 동물을 먹어서 정글을 깨끗하게 해

작은 새들은 벌레를 먹어서 나무를 지켜

우리 솔개는 쥐를 잡아서 쥐가 너무 많아지지 않게 해

모두 정글을 지키는 거야!"

자랑스러워!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음으로 이동하기', to: 'convergence-forest', cls: 'bg-blue-200' }
      ],
      prompt: '💭 스스로 자랑스럽게 느낀 경험이 있어?'
    },
    {
      id: 'forest-5-ground-eco',
      title: '땅의 생태계',
      text: `땅 생태계를 배웠어.

"땅에도 먹이사슬이 있어

"풀 → 토끼 → 뱀
뿌리 → 멧돼지
곡식 → 쥐 → 우리 솔개"

모두 연결되어 있지

땅과 하늘, 나무 위... 모든 곳에 생명이 살아

정글은 하나로 연결된 거야!"

신기해!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다른 곳 탐험하기', to: 'convergence-forest', cls: 'bg-green-200' }
      ],
      prompt: '💭 신기하게 느낀 새로운 지식이 있어?'
    },
    {
      id: 'convergence-forest',
      title: '숲을 떠나며',
      text: `숲에서 많은 걸 배웠어.

초식동물과 육식동물
먹이사슬과 균형
각 동물의 역할

어미 솔개가 말해.
"자, 이제 다른 곳도 가보자. 정글은 넓거든!"

멀리 늑대 무리가 보여.
바위 위에 모여서 뭔가 중요한 회의 중이야.

"저기 가볼까?"

뭔가 특별한 일이 일어나는 것 같아!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '늑대 무리로 가기', to: 'wolf-meeting', cls: 'bg-gray-200' }
      ],
      prompt: '💭 가족회의나 학급 회의를 해 본 적이 있어?'
    },

    // ===== 강 경로 =====
    {
      id: 'river-1',
      title: '강가의 생명',
      text: `강가로 날아왔어.

물속에서 물고기들이 헤엄쳐!
작은 물고기는 물풀을 먹고, 큰 물고기는 작은 물고기를 잡아먹어.

강가에 코끼리 무리가 왔어.
물을 마시고 흙탕물에서 놀아!

어미 솔개가 말해. 
"강도 하나의 생태계야. 물속, 물가, 모두 연결되어 있지."

뭘 먼저 볼까?`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '물고기 관찰하기', to: 'river-2-fish', cls: 'bg-blue-200' },
        { label: '코끼리 무리 보기', to: 'river-2-elephant', cls: 'bg-gray-200' }
      ],
      prompt: '💭 강이나 계속에 놀러가 본 적이 있어?'
    },
    {
      id: 'river-2-fish',
      title: '물속 세상',
      text: `강 위를 낮게 날며 물속을 봤어.

작은 물고기들이 떼 지어 다녀.
큰 물고기가 다가오면 재빨리 흩어져!

"저 작은 물고기들은 물속 풀을 먹어."

"큰 물고기는 작은 물고기를 먹고, 우리 같은 새들은 물고기를 잡아먹지."

"이게 물속 먹이사슬이야!"

배가 꼬르륵...
물고기 잡기를 연습해볼까?`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '물고기 잡기 연습', to: 'river-3-fishing', cls: 'bg-blue-200' },
        { label: '물속 더 관찰하기', to: 'river-3-underwater', cls: 'bg-green-200' }
      ],
      prompt: '💭 물고기를 잡아본 적이 있어?'
    },
    {
      id: 'river-2-elephant',
      title: '코끼리 가족',
      text: `코끼리들을 가까이서 봤어.

가장 큰 코끼리가 앞장서고, 다른 코끼리들이 따라가.

"저 큰 코끼리가 리더야. 무리를 이끌지."

아기 코끼리가 엄마 다리 사이를 오락가락!
코로 물을 빨아서 등에 뿌려!

"코끼리는 물을 좋아해. 더운 정글에서 물로 몸을 식혀."

코끼리들이 나무를 흔들어 열매를 떨어뜨려.`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '코끼리 생활 배우기', to: 'river-3-elephant-life', cls: 'bg-gray-200' },
        { label: '아기 코끼리 보기', to: 'river-3-baby', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 코끼리를 본 적이 있어?'
    },
    {
      id: 'river-3-fishing',
      title: '첫 사냥',
      text: `어미 솔개가 가르쳐줘.

"자, 발톱을 펴고, 물 가까이 가서... 냉큼!"

어미가 물고기를 잡았어!

네 차례야.
높은 곳에서 물고기를 노려봐...

조심조심 내려가서... 발톱으로...

첨벙! 성공!

작은 물고기를 잡았어!

"잘했어! 이게 우리 삶이야."

배가 든든해졌어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 연습하기', to: 'river-4-practice', cls: 'bg-blue-200' },
        { label: '다른 사냥꾼 보기', to: 'river-4-hunters', cls: 'bg-orange-200' }
      ],
      prompt: '💭 부모님에게 배운 것중 무엇이 가장 좋았어?'
    },
    {
      id: 'river-3-underwater',
      title: '물속 생태계',
      text: `물속을 자세히 관찰했어.

물풀이 자라고 있어.
작은 물고기들이 물풀을 뜯어 먹어.

"물속 풀도 중요해. 물고기들 먹이거든."

개구리가 풀썩 뛰어!
벌레를 잡아먹어.

물가에 작은 게들도 기어 다녀.

"강가는 물과 땅이 만나는 곳이야. 양쪽 동물들이 다 와."

신기한 세상이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '물가 동물 보기', to: 'river-4-shore', cls: 'bg-green-200' },
        { label: '개구리 관찰하기', to: 'river-4-frog', cls: 'bg-green-200' }
      ],
      prompt: '💭 물과 육지에서 동시에 사는 동물에 대해 알아?'
    },
    {
      id: 'river-3-elephant-life',
      title: '코끼리의 하루',
      text: `코끼리들의 생활을 더 봤어.

큰 코끼리가 나무를 밀어!
쿵! 나무가 쓰러져.

"코끼리는 힘이 세서 나무도 쓰러뜨려. 그러면 높은 곳 나뭇잎도 먹을 수 있지."

"코끼리는 하루에 100킬로그램 넘게 먹어야 해!"

코끼리들이 소리를 내며 대화해.
뿌우우~ 뿌우~

"코끼리끼리 이야기하는 거야."`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '코끼리 소통 배우기', to: 'river-4-communication', cls: 'bg-gray-200' },
        { label: '코끼리 식사 보기', to: 'river-4-eating', cls: 'bg-green-200' }
      ],
      prompt: '💭 채소와 과일 vs 고기 중에 무엇을 더 좋아해?'
    },
    {
      id: 'river-3-baby',
      title: '아기 코끼리',
      text: `아기 코끼리를 가까이서 봤어.

엄마 코끼리 옆에 바짝 붙어있어.
코로 엄마 다리를 만져.

"아기 코끼리는 엄마한테 많이 배워야 해."

물 마시는 법, 코 쓰는 법...

아기가 코로 물을 빨다가 실패!
물이 코에 들어갔어. "푸웅!"

엄마가 다시 보여줘.
천천히 배우는 거야.

귀여워!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '가족애 느끼기', to: 'river-4-family', cls: 'bg-pink-200' },
        { label: '다른 새끼들 보기', to: 'river-4-young', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 엄마가 친절하게 잘 가르쳐 주시는 편이야?'
    },
    {
      id: 'river-4-practice',
      title: '사냥 실력',
      text: `더 많이 연습했어!

여러 번 물고기를 잡아봤어.
점점 더 잘해져!

"잘하는구나! 이제 혼자서도 먹이를 구할 수 있겠어."

어미 솔개가 자랑스러워해.

"기억해. 필요한 만큼만 잡는 거야. 너무 많이 잡으면 안 돼."

"왜요?"

"물고기도 살아야 하고, 다른 동물들도 먹어야 하거든."

균형이 중요해!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '균형 배우기', to: 'river-5-balance', cls: 'bg-green-200' },
        { label: '강가 더 탐험', to: 'river-5-explore', cls: 'bg-blue-200' }
      ],
      prompt: '💭 필요한 만큼이 다 같은 기준일까?'
    },
    {
      id: 'river-4-hunters',
      title: '강의 사냥꾼',
      text: `물속에 악어가 숨어있어!

눈만 물 밖으로 내놓고 기다려.

"악어는 아주 오래 기다릴 수 있어."

사슴 한 마리가 물을 마시러 와!

악어가 움직이지 않아... 움직이지 않아...

갑자기 덥석!

다행히 사슴이 재빨리 뛰어서 도망쳤어!

"악어는 물속에서 아주 빨라."

무서운 사냥꾼이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '악어 더 관찰하기', to: 'river-5-crocodile', cls: 'bg-green-200' },
        { label: '위험 피하기', to: 'river-5-safety', cls: 'bg-orange-200' }
      ],
      prompt: '💭 무서워하는 동물이 있어?'
    },
    {
      id: 'river-4-shore',
      title: '물가의 생명들',
      text: `물가를 관찰했어.

새들이 와서 물고기를 잡아.
개구리가 벌레를 잡아먹어.

하마가 물속에서 나와!
거대한 몸집!

"하마는 낮에는 물에 있고, 밤에 나와서 풀을 먹어."

물가에는 다양한 동물이 와.
물을 마시러, 물고기를 잡으러...

"강은 모두에게 중요해!"`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '하마 관찰하기', to: 'river-5-hippo', cls: 'bg-gray-200' },
        { label: '물가 생태 배우기', to: 'river-5-shore-eco', cls: 'bg-blue-200' }
      ],
      prompt: '💭 낮과 밤 중에 언제가 더 좋아?'
    },
    {
      id: 'river-4-frog',
      title: '개구리의 역할',
      text: `개구리를 가까이서 봤어.

풀썩풀썩 뛰어다니며 벌레를 잡아먹어!

"개구리는 벌레를 많이 먹어. 벌레가 너무 많아지지 않게 하지."

개구리도 조심해야 해.
뱀이 개구리를 노리거든.

"개구리는 벌레를 먹고, 뱀은 개구리를 먹어. 먹이사슬이야!"

작은 동물도 중요한 역할이 있어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '작은 생명 이해하기', to: 'river-5-small', cls: 'bg-green-200' },
        { label: '먹이사슬 완성하기', to: 'river-5-chain', cls: 'bg-orange-200' }
      ],
      prompt: '💭 벌레의 역할은 무엇일까?'
    },
    {
      id: 'river-4-communication',
      title: '코끼리의 소통',
      text: `코끼리들이 소리를 내며 이야기해.

뿌우우~ 낮은 소리.
빠라라~ 높은 소리.

"코끼리는 여러 소리로 이야기해. 위험을 알리거나, 가족을 부르거나..."

아기 코끼리가 소리를 내!
엄마가 대답해줘.

"동물들도 서로 대화해. 방법은 다르지만!"

의사소통은 중요해!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '동물 소통 배우기', to: 'river-5-talk', cls: 'bg-purple-200' },
        { label: '코끼리 떠나기', to: 'convergence-river', cls: 'bg-green-200' }
      ],
      prompt: '💭 가족들과 소통을 많이 해?'
    },
    {
      id: 'river-4-eating',
      title: '코끼리의 식사',
      text: `코끼리가 먹는 걸 봤어.

코로 나뭇가지를 잡아서 입으로!
나무껍질도 벗겨서 먹어.

땅에 떨어진 과일도 주워 먹어.

"코끼리는 하루 종일 먹어야 해. 몸이 크니까!

풀, 나뭇잎, 나무껍질, 과일... 뭐든지 먹어

초식동물 중에서 가장 크지!"

엄청난 식욕이야!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '초식동물 이해하기', to: 'river-5-herbivore', cls: 'bg-green-200' },
        { label: '다음 장소로', to: 'convergence-river', cls: 'bg-blue-200' }
      ],
      prompt: '💭 식욕이 많은 편이야?'
    },
    {
      id: 'river-4-family',
      title: '코끼리 가족애',
      text: `코끼리 가족을 더 관찰했어.

엄마들이 아기들을 보호해.
항상 가운데 두고 지켜.

아기가 다치면 모두 걱정해.
함께 돌봐줘.

"코끼리는 가족이 정말 중요해. 서로 사랑하고 보호하지."

할머니 코끼리도 아기를 돌봐줘.

"가족은 함께 살아가는 거야!"

따뜻한 모습이야!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '가족의 중요성 깨닫기', to: 'river-5-family-value', cls: 'bg-pink-200' },
        { label: '새로운 곳으로', to: 'convergence-river', cls: 'bg-purple-200' }
      ],
      prompt: '💭 할머니나 할아버지가 자주 돌봐주셨어?'
    },
    {
      id: 'river-4-young',
      title: '여러 새끼들',
      text: `강가에 여러 새끼 동물들이 와.

새끼 사슴이 엄마 따라 물 마시러 와.
조심조심 주변을 살펴.

새끼 원숭이는 나무에서 물을 내려다봐.
아직 무서운가봐.

아기 코끼리는 신나게 물장구!

"모든 새끼들이 배우며 자라. 각자 속도대로!"

천천히 배우는 거야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '성장 과정 이해하기', to: 'river-5-growth', cls: 'bg-yellow-200' },
        { label: '다른 곳 탐험하기', to: 'convergence-river', cls: 'bg-green-200' }
      ],
      prompt: '💭 빨리 배우기 힘든 것이 있어?'
    },
    {
      id: 'river-5-balance',
      title: '강의 균형',
      text: `어미 솔개가 설명해줘.

"강에도 균형이 중요해."

"물고기가 너무 많으면 물풀이 없어져."

"물고기가 없으면 우리 같은 새들이 굶어."

"악어도, 개구리도, 모두 역할이 있어!"

"하나라도 없으면 균형이 깨져."

강 생태계를 이해했어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음으로 이동하기', to: 'convergence-river', cls: 'bg-blue-200' }
      ],
      prompt: '💭 악어 가죽으로 지갑이나 가방을 만들어도 될까? '
    },
    {
      id: 'river-5-explore',
      title: '강 더 탐험하기',
      text: `강을 따라 더 날아갔어.

상류에는 물이 맑고 빨라.
하류에는 물이 천천히 흘러.

"강마다 다른 동물이 살아."

빠른 물에는 빠른 물고기.
느린 물에는 느린 물고기.

"환경에 맞게 적응하는 거야!"

정글은 정말 다양해!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '새로운 장소로', to: 'convergence-river', cls: 'bg-green-200' }
      ],
      prompt: '💭 윗물이 맑아야 아랫물도 맑다는 속다'
    },
    {
      id: 'river-5-crocodile',
      title: '악어의 사냥법',
      text: `악어를 더 관찰했어.

물속에 몸을 숨기고 기다려.
눈만 물 밖으로...

"악어는 인내심이 있어. 몇 시간이고 기다릴 수 있지."

물가에 동물이 오기를 기다려.

"물속에서는 빠르지만 땅에서는 느려. 그래서 물가에서만 사냥해

각 동물마다 장점이 있어!"

악어의 강점이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다른 곳으로 이동', to: 'convergence-river', cls: 'bg-blue-200' }
      ],
      prompt: '💭 인내심이 있는 편이야?'
    },
    {
      id: 'river-5-safety',
      title: '안전의 중요성',
      text: `어미 솔개가 말해.

"정글에서는 항상 조심해야 해

악어가 있는 물가는 위험하고, 호랑이가 있는 덤불도 위험해

하지만 하늘에서 보면 미리 알 수 있지

그게 우리 장점이야. 높은 곳에서 위험을 볼 수 있어."

안전하게 살아가는 법을 배웠어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음 모험으로', to: 'convergence-river', cls: 'bg-green-200' }
      ],
      prompt: '💭 안전 규칙을 잘 지키는 편이야?'
    },
    {
      id: 'river-5-hippo',
      title: '하마의 생활',
      text: `하마를 더 관찰했어.

낮에는 물속에 있어.
"하마는 햇빛에 피부가 약해서 물에 있어야 해."

밤이 되면 땅으로 나와서 풀을 먹어.

"하마는 크지만 초식동물이야. 풀만 먹지."

물속과 땅, 둘 다 필요한 동물이야!

"환경에 맞게 살아가는 거야!"`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음 장소로', to: 'convergence-river', cls: 'bg-blue-200' }
      ],
      prompt: '💭 낯선 환경에 잘 적응하는 편이야?'
    },
    {
      id: 'river-5-shore-eco',
      title: '물가 생태계',
      text: `물가 생태계를 배웠어.

"물가는 물과 땅이 만나는 곳이야."

양쪽 동물들이 다 와. 물 마시러, 먹이 구하러...

물속 동물, 땅 동물, 하늘 동물 모두

그래서 물가가 중요해. 모두를 연결해주거든."

물가는 특별한 곳이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '새로운 모험으로', to: 'convergence-river', cls: 'bg-green-200' }
      ],
      prompt: '💭 물을 무서워 하는 편이야?'
    },
    {
      id: 'river-5-small',
      title: '작은 생명의 가치',
      text: `어미 솔개가 말해.

"작은 동물도 아주 중요해

개구리는 벌레를 먹어. 벌레가 너무 많으면 나무가 다 죽거든

작은 물고기는 물풀을 먹어. 물풀이 너무 많으면 물이 막혀

작다고 해서 중요하지 않은 게 아니야!"

모든 생명이 소중해!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음으로', to: 'convergence-river', cls: 'bg-purple-200' }
      ],
      prompt: '💭 작지만 소중한 것은 또 무엇이 있을까?'
    },
    {
      id: 'river-5-chain',
      title: '물속 먹이사슬',
      text: `물속 먹이사슬을 정리했어.

"물풀 → 작은 물고기 → 큰 물고기 → 새들"

"벌레 → 개구리 → 뱀"

"모두 연결되어 있어

우리 솔개도 물고기를 잡아먹으니까 이 사슬의 일부야!"

강 생태계를 이해했어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음 장소로', to: 'convergence-river', cls: 'bg-green-200' }
      ],
      prompt: '💭 인간은 먹이 사슬의 어디쯤 위피해 있을까?'
    },
    {
      id: 'river-5-talk',
      title: '동물들의 소통',
      text: `동물들의 소통을 배웠어.

"코끼리는 소리로, 사슴은 발 구르기로, 원숭이는 소리와 몸짓으로...

우리 새들은 울음소리로 이야기해

방법은 다르지만 모두 소통해

위험을 알리고, 가족을 부르고, 영역을 알려!"

소통은 생존에 중요해!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음으로 이동', to: 'convergence-river', cls: 'bg-blue-200' }
      ],
      prompt: '💭 동물들끼리는 서로 사람처럼 말을 한다고 느낄까?'
    },
    {
      id: 'river-5-herbivore',
      title: '초식동물의 삶',
      text: `초식동물에 대해 배웠어.

"초식동물은 풀이나 나뭇잎을 먹어

"하루 종일 먹어야 해. 풀은 영양이 적거든

코끼리, 사슴, 들소... 모두 초식동물!

육식동물보다 숫자가 많아. 많은 풀을 먹어야 하니까!"

자연의 균형이야!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음 모험으로', to: 'convergence-river', cls: 'bg-green-200' }
      ],
      prompt: '💭 풀만 먹고 사는데도 어떻게 덩치가 커졌까?'
    },
    {
      id: 'river-5-family-value',
      title: '가족의 힘',
      text: `가족의 중요성을 깨달았어.

동물들은 가족과 함께 살아

함께 먹이를 찾고, 새끼를 키우고, 위험에서 보호해

혼자보다 함께가 강해!

어미 솔개가 말해.
"우리 둘도 가족이야. 항상 함께할 거야!"

따뜻한 기분이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음으로', to: 'convergence-river', cls: 'bg-pink-200' }
      ],
      prompt: '💭 가족과 함께라서 든든한 적이 있어?'
    },
    {
      id: 'river-5-growth',
      title: '성장의 과정',
      text: `어미 솔개가 말해.

"모든 동물이 천천히 배우며 자라

실패해도 괜찮아. 다시 도전하면 돼

너도 처음에는 잘 넘어졌지만 지금은 잘 나잖아!

배움에는 시간이 필요해."

네가 고개를 끄덕여.
"저도 열심히 배울게요!"

성장은 과정이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '새로운 곳으로', to: 'convergence-river', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 성장했다고 느낀 적이 있어?'
    },
    {
      id: 'convergence-river',
      title: '강을 떠나며',
      text: `강에서 많은 걸 배웠어.

물속 먹이사슬, 코끼리 가족, 악어의 사냥법...

어미 솔개가 말해.
"정글에는 아직 배울 게 많아!"

멀리 늑대 무리가 보여.
바위 위에 모여서 회의 중이야.

"저기 가볼까?"

뭔가 중요한 일이 일어나는 것 같아!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '늑대 무리로 가기', to: 'wolf-meeting', cls: 'bg-gray-200' }
      ],
      prompt: '💭 왜 늑대는 무리를 지어서 살까? '
    },

    // ===== 하늘 경로 =====
    {
      id: 'sky-1',
      title: '높은 하늘',
      text: `높이 높이 날아올랐어!

정글 전체가 한눈에 보여.

어미 솔개가 말해. 
"자, 잘 봐. 저 초록색이 숲이고, 반짝이는 게 강이야
저 연기 나는 곳은 인간 마을이고..."

갑자기 배에서 꼬르륵!

"배고프구나? 사냥하는 법을 배워볼까?"

뭘 먼저 할까?`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사냥 배우기', to: 'sky-2-hunting', cls: 'bg-red-200' },
        { label: '정글 전체 관찰하기', to: 'sky-2-observe', cls: 'bg-green-200' }
      ],
      prompt: '💭 숲과 강가 중에 어디서 살고 싶어?'
    },
    {
      id: 'sky-2-hunting',
      title: '사냥의 기술',
      text: `어미 솔개가 가르쳐줘.

"저기 풀밭을 봐. 쥐가 있어."

작은 쥐 한 마리가 풀 사이를 지나가!

"우리 솔개는 눈이 좋아. 높은 하늘에서도 작은 쥐를 볼 수 있지
조용히 날아서, 발톱으로 재빨리 잡는 거야."

어미가 시범을 보여줘.
쏜살같이 내려가서 쥐를 잡았어!

"이게 우리 삶이야."

네 차례야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사냥 시도하기', to: 'sky-3-practice', cls: 'bg-red-200' },
        { label: '더 관찰하기', to: 'sky-3-watch', cls: 'bg-blue-200' }
      ],
      prompt: '💭 부모님이 시범을 잘 보여 주셔?'
    },
    {
      id: 'sky-2-observe',
      title: '정글의 하루',
      text: `높은 하늘에서 정글을 관찰했어.

동물들이 움직이기 시작해.

초식동물들은 풀을 먹으러 나와.
사슴, 코끼리, 물소...

육식동물들도 깨어나.
호랑이, 표범, 늑대...

"정글에는 풀 먹는 초식동물과, 다른 동물을 잡아먹는 육식동물이 있어. 우리 솔개는 육식동물이야!"

뭘 더 볼까?`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '초식동물 관찰하기', to: 'sky-3-herbivore', cls: 'bg-green-200' },
        { label: '육식동물 보기', to: 'sky-3-carnivore', cls: 'bg-orange-200' }
      ],
      prompt: '💭 풀도 초식동물에게 먹히는 것이 무서울까?'
    },
    {
      id: 'sky-3-practice',
      title: '첫 사냥',
      text: `작은 쥐를 노려봤어.

높은 곳에서 빙글빙글 돌며...
쥐의 움직임을 지켜봐.

쥐가 풀 사이에서 먹이를 찾고 있어.

지금이야!

쏴아악- 내려가서... 발톱으로...

성공! 쥐를 잡았어!

"잘했어!" 어미 솔개가 칭찬해줘.

배가 든든해졌어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 연습하기', to: 'sky-4-more', cls: 'bg-red-200' },
        { label: '다른 사냥감 찾기', to: 'sky-4-prey', cls: 'bg-orange-200' }
      ],
      prompt: '💭 최근에 엄마에게 칭찬 받은 일이 있어?'
    },
    {
      id: 'sky-3-watch',
      title: '다른 사냥꾼들',
      text: `하늘에서 다른 사냥꾼들을 봤어.

독수리가 높이 날고 있어.
"독수리는 우리보다 커. 더 큰 동물도 잡을 수 있지."

매가 빠르게 날아다녀.
"매는 정말 빨라! 날아다니는 새도 잡아!"

부엉이도 보여.
"부엉이는 밤에 사냥해."

하늘에도 여러 사냥꾼이!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '새들 비교하기', to: 'sky-4-birds', cls: 'bg-blue-200' },
        { label: '우리 역할 배우기', to: 'sky-4-role', cls: 'bg-purple-200' }
      ],
      prompt: '💭 하늘을 날고 싶다고 생각한 적 있어?'
    },
    {
      id: 'sky-3-herbivore',
      title: '초식동물들',
      text: `초식동물들을 관찰했어.

사슴, 들소, 영양... 모두 풀을 뜯어 먹어.

"저 동물들은 이빨이 평평해서 풀을 잘 씹을 수 있어."

영양 한 마리가 높이 뛰어올라!
뛰어다니는 게 정말 빨라.

"초식동물들은 대부분 달리기를 잘해. 도망가야 하니까."

동물마다 먹는 풀이 조금씩 달라.

"이렇게 나눠 먹으면 모두 충분해!"`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '초식동물 더 알기', to: 'sky-4-plant-eater', cls: 'bg-green-200' },
        { label: '먹이사슬 생각하기', to: 'sky-4-food-chain', cls: 'bg-orange-200' }
      ],
      prompt: '💭 어떤 채소를 가장 종아해?'
    },
    {
      id: 'sky-3-carnivore',
      title: '육식동물들',
      text: `육식동물들을 관찰했어.

호랑이: 가장 크고 강해. 혼자 사냥.
표범: 나무를 잘 타. 밤에 사냥.
늑대: 무리 지어 살아. 협동해서 사냥.

"각자 다른 방법으로 사냥하지? 그래서 충돌하지 않아."

뱀도 있고, 악어도 있고...

"육식동물이 너무 많은 거 아니에요?"

"아니야. 초식동물이 훨씬 많아."`,
      bg: 'https://images.unsplash.com/photo-1551798507-629020c81463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '육식동물 역할 배우기', to: 'sky-4-predator', cls: 'bg-red-200' },
        { label: '균형 이해하기', to: 'sky-4-balance', cls: 'bg-green-200' }
      ],
      prompt: '💭 초식동물은 잡아 먹히는데 왜 더 많을까?'
    },
    {
      id: 'sky-4-more',
      title: '사냥 실력 향상',
      text: `더 많이 연습했어!

쥐, 작은 새, 도마뱀...
여러 사냥감을 잡아봤어.

"잘하는구나!"

어미 솔개가 자랑스러워해.

"기억해. 필요한 만큼만 사냥하는 거야."

"왜요?"

"정글의 균형 때문이야. 모든 동물이 살아야 정글이 건강해."

적당히가 중요해!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '균형의 중요성 배우기', to: 'sky-5-balance', cls: 'bg-green-200' },
        { label: '솔개의 역할 배우기', to: 'sky-5-kite-role', cls: 'bg-blue-200' }
      ],
      prompt: '💭 엄청 많이 필요하고 생각하는 것이 있어?'
    },
    {
      id: 'sky-4-prey',
      title: '다양한 사냥감',
      text: `다른 사냥감을 찾아봤어.

땅 위에 도마뱀이 기어가!
햇볕을 쬐고 있어.

큰 메뚜기가 풀잎에 앉아있어.

뱀이 풀 속에 숨어있어!

"뱀은 조심해야 해. 어떤 뱀은 독이 있거든. 우리도 뱀을 먹지만, 안전한 뱀만!"

조심해야 할 것이 많아!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '안전하게 사냥하기', to: 'sky-5-safe', cls: 'bg-yellow-200' },
        { label: '정글 법칙 배우기', to: 'sky-5-law', cls: 'bg-purple-200' }
      ],
      prompt: '💭 요즘 가장 조심해야 하는 것은 무엇일까?'
    },
    {
      id: 'sky-4-birds',
      title: '하늘의 사냥꾼들',
      text: `새들을 비교했어.

독수리는 크고 힘세. 큰 동물을 잡아.
매는 빠르고 민첩. 날아다니는 새를 잡아.
부엉이는 밤에 잘 봐. 밤에 쥐를 잡아.
우리 솔개는 눈이 좋아. 낮에 작은 동물을 잡아.

모두 다른 사냥감을 잡아. 그래서 함께 살 수 있어!

각자 역할이 있어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '우리 장점 배우기', to: 'sky-5-advantage', cls: 'bg-blue-200' },
        { label: '생태계 이해하기', to: 'sky-5-ecosystem', cls: 'bg-green-200' }
      ],
      prompt: '💭 나와 다른 친구들과 사이좋게 지내?'
    },
    {
      id: 'sky-4-role',
      title: '솔개의 역할',
      text: `어미 솔개가 설명해줘.

"우리 솔개는 특별해!"

높은 하늘에서 전체를 볼 수 있어

작은 쥐를 잡아서 쥐가 너무 많아지지 않게 해

위험을 미리 보고 다른 동물들에게 알려줄 수 있어

그게 우리 역할이야!"

자랑스러워!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '역할의 중요성 깨닫기', to: 'sky-5-importance', cls: 'bg-purple-200' },
        { label: '정글 더 관찰하기', to: 'sky-5-observe', cls: 'bg-green-200' }
      ],
      prompt: '💭 어떤 역할을 맡는 것을 좋아해?'
    },
    {
      id: 'sky-4-plant-eater',
      title: '초식동물의 삶',
      text: `초식동물에 대해 더 배웠어.

"초식동물은 하루 종일 먹어야 해. 풀은 영양이 적거든."

그래서 항상 먹고 있어

육식동물보다 숫자가 많아야 해. 많은 풀을 먹어야 하니까

그리고 항상 조심해야 해. 육식동물이 노리거든."

힘든 삶이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '생존 전략 배우기', to: 'sky-5-survival', cls: 'bg-yellow-200' },
        { label: '균형 생각하기', to: 'sky-5-think', cls: 'bg-green-200' }
      ],
      prompt: '💭 요즘 사는게 힘들다고 느낀 적이 있어?'
    },
    {
      id: 'sky-4-food-chain',
      title: '먹이사슬 이해',
      text: `하늘에서 먹이사슬을 봤어.

"풀이 자라고, 사슴이 풀을 먹어

호랑이는 사슴을 먹고

우리는 쥐를 먹고

모두 죽으면 흙으로 돌아가 풀이 자라

이게 먹이사슬이야! 계속 순환하는 거지!"

이제 이해했어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '순환 더 배우기', to: 'sky-5-cycle', cls: 'bg-orange-200' },
        { label: '생태계 완성하기', to: 'sky-5-complete', cls: 'bg-purple-200' }
      ],
      prompt: '💭 사람은 죽으면 어디로 돌아갈까?'
    },
    {
      id: 'sky-4-predator',
      title: '육식동물의 역할',
      text: `어미 솔개가 설명해줘.

"육식동물은 나쁜 게 아니야

초식동물 숫자를 조절해줘

육식동물이 없으면 초식동물이 너무 많아져서 풀이 다 없어져

그러면 모두 굶어

"육식동물도 필요하구나!"

"맞아. 모두 역할이 있어!"`,
      bg: 'https://images.unsplash.com/photo-1551798507-629020c81463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '균형 이해하기', to: 'sky-5-balance-deep', cls: 'bg-green-200' },
        { label: '정글 지혜 얻기', to: 'sky-5-wisdom', cls: 'bg-purple-200' }
      ],
      prompt: '💭 역할마다 중요도가 다를까?'
    },
    {
      id: 'sky-4-balance',
      title: '정글의 균형',
      text: `균형에 대해 배웠어.

"만약 호랑이가 없으면?"

"사슴이 너무 많아져!"

"만약 풀이 없으면?"

"모두 못 살아!"

"만약 벌이 없으면?"

"열매가 안 열려!"

"모든 생명이 다 중요하구나!"

"맞아. 그게 균형이야!"`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '생태계 깊이 이해하기', to: 'sky-5-eco-deep', cls: 'bg-green-200' },
        { label: '모든 연결 보기', to: 'sky-5-connection', cls: 'bg-blue-200' }
      ],
      prompt: '💭 부모님은 질문에 답변을 잘 해주셔?'
    },
    {
      id: 'sky-5-balance',
      title: '균형의 법칙',
      text: `어미 솔개가 말해.

"정글의 균형은 아주 중요해

너무 많이 사냥하면 안 돼. 사냥감이 없어져

너무 적게 사냥하면 쥐가 너무 많아져

적당히가 중요해

각 동물이 적당히 먹으면 모두 살 수 있어."

지혜를 배웠어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음으로 이동', to: 'convergence-sky', cls: 'bg-purple-200' }
      ],
      prompt: '💭 한 사람이 돈을 엄청 많이 벌면 어떻게 될까?'
    },
    {
      id: 'sky-5-kite-role',
      title: '솔개의 역할',
      text: `우리 솔개의 역할을 배웠어.

"우리는 쥐를 잡아. 쥐가 너무 많으면 곡식을 다 먹거든

높은 곳에서 위험을 봐. 다른 동물들에게 알려줄 수 있어

정글 전체를 볼 수 있어. 균형을 지켜보지

작지만 중요한 역할이야!"

자랑스러워!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '새로운 곳으로', to: 'convergence-sky', cls: 'bg-blue-200' }
      ],
      prompt: '💭 작지만 중요한 역할을 하는 사람은 누가 있을까?'
    },
    {
      id: 'sky-5-safe',
      title: '안전한 사냥',
      text: `안전하게 사냥하는 법을 배웠어.

"독이 있는 뱀은 피해야 해

너무 큰 동물은 위험해

우리 크기에 맞는 사냥감만

안전이 가장 중요해. 다치면 사냥 못 하거든."

조심하며 살아가야 해!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음 모험으로', to: 'convergence-sky', cls: 'bg-green-200' }
      ],
      prompt: '💭 조심하지 않아서 다친 적이 있어?'
    },
    {
      id: 'sky-5-law',
      title: '정글의 법칙',
      text: `정글의 법칙을 배웠어.

첫째, 필요한 만큼만 가져가
둘째, 약한 자를 괴롭히지 마
셋째, 균형을 지켜
넷째, 함께 살아가

"이 법칙을 지키면 모두 살 수 있어!"

중요한 법칙이야!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음으로', to: 'convergence-sky', cls: 'bg-purple-200' }
      ],
      prompt: '💭 몇번 규칙이 가장 중요한 것 같아?'
    },
    {
      id: 'sky-5-advantage',
      title: '우리의 장점',
      text: `솔개의 장점을 배웠어.

"우리는 눈이 정말 좋아. 높은 곳에서도 작은 쥐를 봐

날개가 커서 오래 날 수 있어

빠르게 내려갈 수 있어

높은 곳에 둥지를 만들어서 안전해!"

우리만의 장점이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '새로운 곳으로', to: 'convergence-sky', cls: 'bg-blue-200' }
      ],
      prompt: '💭 단점도 장점이, 장점도 단점이 될 수 있을까?'
    },
    {
      id: 'sky-5-ecosystem',
      title: '생태계 이해',
      text: `생태계를 완전히 이해했어!

생산자 - 풀, 나무 (햇빛으로 자람)
1차 소비자 - 초식동물 (풀 먹음)
2차 소비자 - 육식동물 (동물 먹음)
분해자 - 벌레, 곰팡이 (죽은 것 분해)

"이게 다 연결되어 순환해!"

정글의 비밀을 알았어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음 모험으로', to: 'convergence-sky', cls: 'bg-green-200' }
      ],
      prompt: '💭 사람들도 생산자와 소비자가 따로 있을까?'
    },
    {
      id: 'sky-5-importance',
      title: '역할의 가치',
      text: `어미 솔개가 말해.

"크든 작든, 모든 역할이 중요해

코끼리는 나무를 쓰러뜨려 작은 동물들이 먹을 수 있게 해

벌은 꽃가루를 옮겨 열매가 열리게 해

우리는 쥐를 잡아 균형을 지켜

모두가 필요해!"

감동적이야!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음으로', to: 'convergence-sky', cls: 'bg-purple-200' }
      ],
      prompt: '💭 누군가에게 도움이 되는 역할을 한 적이 있어?'
    },
    {
      id: 'sky-5-observe',
      title: '관찰자의 눈',
      text: `높은 하늘에서 관찰했어.

모든 게 연결되어 보여.

풀밭, 숲, 강, 동물들...

"이제 정글을 이해하는구나!"
어미 솔개가 자랑스러워해.

"우리는 관찰자야. 전체를 보며 균형을 지켜보는 거지!"

특별한 역할이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '새로운 곳으로', to: 'convergence-sky', cls: 'bg-blue-200' }
      ],
      prompt: '💭 무언가를 관찰하는 것이 좋았던 적이 있어? '
    },
    {
      id: 'sky-5-survival',
      title: '생존 전략',
      text: `동물들의 생존 전략을 배웠어.

사슴 - 빠른 다리, 경계, 무리생활
호랑이 - 힘, 인내, 매복
원숭이 - 나무타기, 손 사용
우리 솔개 - 날카로운 눈, 비행

"모두 자기만의 방법으로 살아남아!"

다양한 전략이야!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음으로', to: 'convergence-sky', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 친구들과 친해질 수 있는 나만의 방법은?'
    },
    {
      id: 'sky-5-think',
      title: '균형의 깨달음',
      text: `균형에 대해 깊이 생각했어.

"모든 것이 딱 맞게 연결되어 있어

하나가 없어지면 다 흔들려

많아도 안 되고, 적어도 안 돼

자연은 정말 완벽해!"

경이로워!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음 모험으로', to: 'convergence-sky', cls: 'bg-green-200' }
      ],
      prompt: '💭 무언가 완벽하다고 느낀 적이 있어?'
    },
    {
      id: 'sky-5-cycle',
      title: '생명의 순환',
      text: `생명의 순환을 배웠어.

"태어나고, 자라고, 먹고, 죽고, 흙으로 돌아가

흙에서 풀이 자라고, 다시 시작

계속 돌고 도는 거야

이게 생명의 순환!"

아름다운 순환이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음으로', to: 'convergence-sky', cls: 'bg-orange-200' }
      ],
      prompt: '💭 무언가 정말 아름답다고 느낀 적이 있어?'
    },
    {
      id: 'sky-5-complete',
      title: '생태계 완성',
      text: `생태계를 완전히 이해했어!

모든 연결고리를 봤어.

풀→초식동물→육식동물→흙→풀

"이제 정글을 이해하는 솔개가 되었구나!"
어미 솔개가 기뻐해.

"잘 배웠어!"

자랑스러워!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '새로운 곳으로', to: 'convergence-sky', cls: 'bg-purple-200' }
      ],
      prompt: '💭 아직 이해하기 어려운 것이 있어?'
    },
    {
      id: 'sky-5-balance-deep',
      title: '깊은 균형',
      text: `균형을 깊이 이해했어.

"육식동물이 초식동물을 조절하고

초식동물이 풀을 조절하고

풀이 흙을 지키고...

모든 게 연결되어 균형을 이뤄!"

완벽한 균형이야!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음으로', to: 'convergence-sky', cls: 'bg-green-200' }
      ],
      prompt: '💭 인간들이 조절해야 하는 것은 무엇일까?'
    },
    {
      id: 'sky-5-wisdom',
      title: '정글의 지혜',
      text: `정글의 지혜를 얻었어.

첫째, 모든 생명은 연결되어 있어
둘째, 각자의 역할이 중요해
셋째, 균형을 지켜야 해
넷째, 필요한 만큼만 가져야 해
다섯째, 함께 살아가야 해

이게 정글의 지혜야!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음으로', to: 'convergence-sky', cls: 'bg-purple-200' }
      ],
      prompt: '💭 인간 세상에서 가장 중요한 것은 무엇일까?'
    },
    {
      id: 'sky-5-eco-deep',
      title: '생태계 깊은 이해',
      text: `생태계를 깊이 이해했어.

"생태계는 하나의 큰 가족 같아

모두가 서로 도우며 살아

경쟁도 하지만, 함께 균형을 이뤄

자연은 정말 지혜로워!"

감탄스러워!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음으로', to: 'convergence-sky', cls: 'bg-green-200' }
      ],
      prompt: '💭 경쟁하던 사람들도 같이 협력할 수 있을까?'
    },
    {
      id: 'sky-5-connection',
      title: '모든 연결',
      text: `모든 연결을 봤어.

하늘, 땅, 물...
식물, 동물, 곤충...
크고 작은 모든 생명...

모두 이어져 있어!

하나의 정글, 하나의 가족!

감동적이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '새로운 곳으로', to: 'convergence-sky', cls: 'bg-blue-200' }
      ],
      prompt: '💭 가장 감동적이었던 순간은 언제야?'
    },
    {
      id: 'convergence-sky',
      title: '하늘에서 본 특별한 광경',
      text: `하늘에서 많은 걸 배웠어.

먹이사슬, 균형, 순환...

어미 솔개가 말해.
"자, 이제 저기를 봐!"

멀리 늑대 무리가 바위 위에 모여있어.
뭔가 중요한 회의 중이야.

"저기 가볼까?"

뭔가 특별한 일이 일어나고 있어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '늑대 무리로 가기', to: 'wolf-meeting', cls: 'bg-gray-200' }
      ],
      prompt: '💭 회의를 해야 할 가장 중요한 일은 뭐가 있을까?'
    },

    // ===== 합류 및 엔딩 =====
    {
      id: 'wolf-meeting',
      title: '늑대의 회의',
      text: `늑대 무리에 가까이 갔어.

큰 바위 위에서 회의 중이야.

늙은 늑대가 무언가를 품에 안고 있어...
작은 생명이야!

"이 아기를 받아들일까?" 리더 늑대가 물었어.

"인간 새끼잖아!" "위험해!"

하지만 어미 늑대가 다가가더니...
작은 존재를 핥아줘.

"정글의 법칙은 생명을 보호하는 것!"

신비로운 순간이야!`,
      bg: 'https://images.unsplash.com/photo-1551798507-629020c81463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 지켜보기', to: 'wolf-decision', cls: 'bg-purple-200' }
      ],
      prompt: '💭 아기를 보고 생명의 신비를 느낀 적이 있어?'
    },
    {
      id: 'wolf-decision',
      title: '특별한 결정',
      text: `리더 늑대가 결정을 내렸어.

"정글의 법칙에 따라, 이 아기를 받아들인다!"

모든 늑대들이 울부짖었어.
"아우우~!"

어미 늑대가 작은 생명을 품에 안았어.

검은 표범 바기라가 나타났어.

"내가 이 아이를 지키겠어!"

늑대들과 바기라가 약속해.
함께 이 특별한 생명을 보호하기로!`,
      bg: 'https://images.unsplash.com/photo-1551798507-629020c81463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '바기라와 대화하기', to: 'bagheera-talk', cls: 'bg-gray-200' }
      ],
      prompt: '💭 요즘은 왜 아기를 잘 낳지 않을까?'
    },
    {
      id: 'bagheera-talk',
      title: '바기라의 약속',
      text: `바기라가 위를 올려다봤어.

"작은 솔개구나. 모든 걸 봤니?"

어미 솔개가 답했어.
"네, 바기라. 특별한 순간이었어."

"이 아이는 특별해. 정글과 인간, 두 세계를 이어줄 존재야."

"우리도 도와줄게요. 하늘에서 위험을 살피고 알려줄게요."

"고맙다. 함께 이 아이를 지키자."

정글 전체가 하나의 가족이 됐어!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '정글 가족 되기', to: 'jungle-family', cls: 'bg-green-200' }
      ],
      prompt: '💭 부모님이 다른 아이를 데려오면 가족이 될 수 있어?'
    },
    {
      id: 'jungle-family',
      title: '정글의 가족',
      text: `하늘 높이 날아올랐어.

아래 정글이 한눈에 보여.

늑대, 바기라, 그리고 작은 생명...

모든 동물들이 서로 다르지만,
함께 살아가기로 약속했어.

어미 솔개가 말해.
"이제 넌 정글을 이해하는 솔개야!"

먹이사슬, 균형, 생태계...
그리고 가장 중요한 것!

"모든 생명은 연결되어 있고, 모두 소중해!"`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '수호자의 맹세하기', to: 'guardian-promise', cls: 'bg-purple-200' }
      ],
      prompt: '💭 서로 다른 인간들도 함께 잘 살아갈 수 있을까?'
    },
    {
      id: 'guardian-promise',
      title: '수호자의 맹세',
      text: `어미 솔개가 말해.

"이제 약속하자. 정글을 지키겠다고."

"네!"

"필요한 만큼만 사냥하고,
다른 생명을 존중하고,
균형을 지키겠다고."

"약속해요!"

하늘 높이 함께 날아올라.

"우리는 하늘의 수호자야. 정글을 지켜보며 살아가자!"

새로운 삶이 시작됐어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '정글 이야기 완성하기', to: 'ending', cls: 'bg-green-200' }
      ],
      prompt: '💭 약속을 잘 지키는 편이야?'
    },
    {
      id: 'ending',
      title: '정글의 새 가족',
      text: `너는 정글에서 많은 걸 배웠어.

*먹이사슬: 풀→초식동물→육식동물→흙
*생태계 균형: 모든 생명이 연결됨
*동물 습성: 각자의 생존 방법
*정글 법칙: 생명 존중, 함께 살기

그리고 가장 중요한 것!
"모든 생명은 연결되어 있고, 모두 소중해!"

《정글북》에서는 인간 아이 모글리가 늑대에게 키워지며 정글 동물들과 함께 살아가!

정글의 법칙을 배우고, 위협과 고난을 극복하며 성장해.
자연과 인간의 조화를 깨달을 수 있는 멋진 모험 이야기지!

과연 모글리는 넓고 낯선 정글에서 잘 지낼 수 있을까?

📚 서점이나 도서관에서 《정글북》을 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [],
      prompt: '《정글북》 - 정글에서 펼쳐지는 초특급 서바이벌 챌린지! 🐻곰, 🐺늑대, 🐍뱀... 과연 누가 진짜 친구고, 빌런일까? 디즈니 애니메이션의 원작! 100년 전부터 시작된 레전드 모험을 지금 바로 정주행 시작~'
    }
  ];
}

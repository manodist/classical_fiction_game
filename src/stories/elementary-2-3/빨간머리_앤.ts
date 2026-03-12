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

export function generateAnneStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '어린 시절의 기억',
      text: `너의 이름은 ${name.full}. 
      1900년대 초 캐나다, 
      지금으로부터 약 120년 전이야.

아주 어렸을 때 부모님과 함께 살았던 따뜻한 기억이 있어. 엄마의 부드러운 목소리, 아빠의 따뜻한 손...

하지만 그때 네 나이는 겨우 세 살이었어.`,
      bg: 'https://images.unsplash.com/photo-1692233339289-52c49ed093e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '부모님 기억을 떠올린다', to: 'memory', cls: 'bg-purple-200' },
        { label: '무슨 일이 있었는지 궁금하다', to: 'what_happened', cls: 'bg-blue-200' }
      ],
      prompt: '부모님의 따뜻함을 느낄 때는 언제야?'
    },
    {
      id: 'memory',
      title: '희미한 기억',
      text: `너는 기억을 더듬어봐.

엄마가 너를 안아주던 느낌... 아빠가 불러주던 자장가...

하지만 너무 어려서 정확하게 기억나지 않아. 
사진도 없고, 물려받은 물건도 없어. 

그냥... 따뜻했다는 느낌만 어렴풋해.`,
      bg: 'https://images.unsplash.com/photo-1692233339289-52c49ed093e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무슨 일이 있었는지 생각한다', to: 'what_happened', cls: 'bg-blue-200' }
      ],
      prompt: '부모님과 어떤 추억으로 무엇을 남기고 싶어?'
    },
    {
      id: 'what_happened',
      title: '슬픈 이야기',
      text: `고아원 선생님이 말씀해주셨어.

"${name.first}, 네 부모님은 열병에 걸리셨단다."
"너를 정말 사랑하셨지만... 돌아가셨어."

너무 어려서 슬픔을 제대로 느낄 수도 없었어. 
그 후 여러 집을 전전하다가 고아원에 오게 됐어.`,
      bg: 'https://images.unsplash.com/photo-1663660408776-abc66d76f611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '슬픈 마음을 느낀다', to: 'sadness', cls: 'bg-gray-200' },
        { label: '부모님이 사랑했다는 걸 기억한다', to: 'love', cls: 'bg-pink-200' }
      ],
      prompt: '만약 부모님이 안계시면 어떨 것 같아?'
    },
    {
      id: 'sadness',
      title: '슬픔',
      text: `너는 가슴이 아파.

부모님을 모르는 게 슬퍼. 

왜 나는 가족이 없을까? 
다른 아이들처럼 집에 가고 싶어.

눈물이 날 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '울음을 참는다', to: 'hold_tears', cls: 'bg-blue-200' },
        { label: '슬픔을 인정한다', to: 'accept_sadness', cls: 'bg-purple-200' }
      ],
      prompt: '최근에 슬퍼서 눈물을 흘린적이 있어?'
    },
    {
      id: 'love',
      title: '사랑의 기억',
      text: `"부모님이 날 사랑하셨어."

너는 생각했어. 

비록 함께 있지 못했지만, 그 사랑은 진짜였어.

그 사랑이 지금의 나를 만들었을 거야. 
따뜻한 마음을 물려받았어.`,
      bg: 'https://images.unsplash.com/photo-1561468528-e7b3a39e0e66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '긍정적으로 생각한다', to: 'positive_start', cls: 'bg-yellow-200' },
        { label: '그래도 가끔 슬프다', to: 'sadness', cls: 'bg-gray-200' }
      ],
      prompt: '부모님께 물려 받은 성격은 무엇이야?'
    },
    {
      id: 'hold_tears',
      title: '참는 마음',
      text: `너는 울음을 참았어.

"울면 안 돼. 강해져야 해."

하지만 슬픔을 억누르니 더 힘들어. 
감정을 숨기는 게 항상 좋은 건 아니야.`,
      bg: 'https://images.unsplash.com/photo-1490163124523-78ededfc558c',
      choices: [
        { label: '솔직하게 슬퍼한다', to: 'accept_sadness', cls: 'bg-purple-200' },
        { label: '다른 생각을 한다', to: 'distract', cls: 'bg-blue-200' }
      ],
      prompt: '어떤 감정이든 표현하는 것이 좋을까?'
    },
    {
      id: 'accept_sadness',
      title: '슬픔 받아들이기',
      text: `너는 슬픔을 인정했어.

"슬퍼도 괜찮아. 내가 느끼는 감정이니까."

눈물이 났지만, 그 후엔 마음이 조금 가벼워졌어. 

슬픔도 나의 일부야.`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '앞으로 나아간다', to: 'move_forward', cls: 'bg-green-200' }
      ],
      prompt: '인사이드 아웃의 슬픔이를 알아?'
    },
    {
      id: 'distract',
      title: '상상으로 도피',
      text: `너는 다른 생각을 했어.

상상 속 세계로 도망가는 거야. 
거기엔 슬픔이 없어. 아름다운 것만 있어.

하지만 현실은 그대로야.`,
      bg: 'https://images.unsplash.com/photo-1692233339289-52c49ed093e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '상상을 계속한다', to: 'imagination_world', cls: 'bg-purple-200' },
        { label: '현실을 받아들인다', to: 'move_forward', cls: 'bg-blue-200' }
      ],
      prompt: '어떤 상상을 많이해?'
    },
    {
      id: 'positive_start',
      title: '긍정의 씨앗',
      text: `"부모님의 사랑이 있었어."

너는 그 사실에 힘을 얻었어.

지금은 혼자지만, 언젠가 다시 사랑을 느낄 수 있을 거야. 

희망을 가져야지!`,
      bg: 'https://images.unsplash.com/photo-1561468528-e7b3a39e0e66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '고아원 생활을 시작한다', to: 'orphanage_life', cls: 'bg-green-200' }
      ],
      prompt: '희망만 있으면 현실의 어려움도 이겨낼 수 있을까?'
    },
    {
      id: 'move_forward',
      title: '앞으로',
      text: `너는 결심했어.

"과거는 슬프지만, 앞으로를 봐야 해."

부모님은 돌아오지 않지만, 새로운 인연을 만날 수 있어. 

조금씩 앞으로 나아가자.`,
      bg: 'https://images.unsplash.com/photo-1692233339289-52c49ed093e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '고아원 생활을 시작한다', to: 'orphanage_life', cls: 'bg-green-200' }
      ],
      prompt: '앞으로 어떤 사람들을 만나고 싶어?'
    },
    {
      id: 'imagination_world',
      title: '상상의 세계',
      text: `너는 상상에 빠져들었어.

상상 속에선 부모님이 살아계셔. 아름다운 집에서 함께 살아.

하지만 눈을 뜨면 다시 고아원이야. 

현실과 상상의 균형이 필요해.`,
      bg: 'https://images.unsplash.com/photo-1611842418573-4a8addb3556c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '현실을 받아들인다', to: 'orphanage_life', cls: 'bg-blue-200' }
      ],
      prompt: '현실적이야? 아니면 상상력이 풍부해?'
    },
    {
      id: 'orphanage_life',
      title: '고아원에서의 하루',
      text: `이제 너는 고아원에서 살고 있어.

창밖을 보며 상상하는 게 좋아. 

"저 나무는 마법의 나무일 거야..."

상상력은 네 가장 큰 친구야.`,
      bg: 'https://images.unsplash.com/photo-1663660408776-abc66d76f611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '상상 속으로 빠져든다', to: 'imagination', cls: 'bg-purple-200' },
        { label: '다른 아이들과 놀려고 한다', to: 'friends', cls: 'bg-green-200' }
      ],
      prompt: '현실이 되면 좋겠다고 상상해 본 것이 있어?'
    },
    {
      id: 'imagination',
      title: '상상력의 세계',
      text: `너는 상상하는 걸 좋아해.

회색 벽은 은색 궁전이 되고, 작은 꽃은 요정의 집이 돼.

"이 세상은 마법으로 가득해!" 

상상하면 외로움이 사라져.`,
      bg: 'https://images.unsplash.com/photo-1611842418573-4a8addb3556c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 많은 이야기를 만든다', to: 'stories', cls: 'bg-purple-200' },
        { label: '친구들과 상상을 나눈다', to: 'share', cls: 'bg-blue-200' }
      ],
      prompt: '해리포터 같은 마법 이야기를 좋아해?'
    },
    {
      id: 'friends',
      title: '다른 아이들',
      text: `고아원에는 너처럼 부모님이 안 계신 아이들이 많아.

모두 슬픈 이야기를 갖고 있어. 

하지만 서로 위로하며 지내.

"우리는 가족 같아."`,
      bg: 'https://images.unsplash.com/photo-1663660408776-abc66d76f611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구를 위로한다', to: 'comfort', cls: 'bg-pink-200' },
        { label: '함께 놀 방법을 생각한다', to: 'play', cls: 'bg-yellow-200' }
      ],
      prompt: '가족같은 친구가 있어?'
    },
    {
      id: 'stories',
      title: '이야기 만들기',
      text: `너는 이야기를 만들어.

"옛날 옛적에 빨간 머리 소녀가 살았어..."
"그 소녀는 마법 같은 상상력을 가졌지..."

스스로 주인공이 되어 모험을 떠나는 거야!`,
      bg: 'https://images.unsplash.com/photo-1611842418573-4a8addb3556c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '모험 이야기를 계속 만든다', to: 'dream', cls: 'bg-purple-200' },
        { label: '친구들에게 들려준다', to: 'share', cls: 'bg-green-200' }
      ],
      prompt: '모험을 해 보고 싶은 곳이 있어?'
    },
    {
      id: 'share',
      title: '나누는 기쁨',
      text: `"친구들, 내 이야기 들어볼래?"

네가 상상한 이야기를 들려줘. 

친구들이 눈을 반짝이며 들어.

"우와, 정말 재미있어!" 

대화를 나누니 더 행복해졌어.`,
      bg: 'https://images.unsplash.com/photo-1663660408776-abc66d76f611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 많은 이야기를 만들어준다', to: 'entertain', cls: 'bg-yellow-200' },
        { label: '친구들의 이야기도 듣는다', to: 'listen', cls: 'bg-blue-200' }
      ],
      prompt: '대화를 나누면 좋은 친구가 있어?'
    },
    {
      id: 'comfort',
      title: '따뜻한 마음',
      text: `우는 친구 옆에 앉았어.

말은 하지 않았지만 함께 있어줬어.

때로는 말보다 같이 있어주는 게 더 큰 위로야.

친구가 조금 웃었어.`,
      bg: 'https://images.unsplash.com/photo-1663660408776-abc66d76f611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '상상 이야기로 웃게 만든다', to: 'cheer_up', cls: 'bg-purple-200' },
        { label: '조용히 손을 잡아준다', to: 'quiet_support', cls: 'bg-pink-200' }
      ],
      prompt: '위로를 해주는 편이야, 받는 편이야?'
    },
    {
      id: 'play',
      title: '함께 노는 시간',
      text: `"같이 놀자!"

너는 친구들과 술래잡기를 했어.

웃음소리가 고아원을 가득 채워. 

잠시나마 슬픔을 잊었어.`,
      bg: 'https://images.unsplash.com/photo-1663660408776-abc66d76f611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 재미있는 놀이를 제안한다', to: 'entertain', cls: 'bg-yellow-200' },
        { label: '조용히 쉬며 생각한다', to: 'think', cls: 'bg-blue-200' }
      ],
      prompt: '웃음이 나는 재미있는 놀이가 있어?'
    },
    {
      id: 'dream',
      title: '꿈을 꾸다',
      text: `너는 꿈꿨어.

"언젠가 진짜 가족을 만날까?"
"예쁜 집과 정원이 있는 곳에서 살까?"

상상력이 희망을 만들어줘. 

포기하지 않는 마음이 생겨.`,
      bg: 'https://images.unsplash.com/photo-1611842418573-4a8addb3556c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 아름다운 미래를 상상한다', to: 'future', cls: 'bg-purple-200' },
        { label: '현실로 돌아온다', to: 'reality', cls: 'bg-gray-200' }
      ],
      prompt: '포기하고 싶이 않은 목표가 있어?'
    },
    {
      id: 'entertain',
      title: '즐거움 주기',
      text: `너는 친구들을 웃게 만들어.

재미있는 이야기도 하고, 
우스운 표정도 짓고... 

모두가 웃었어.

"네가 있으면 재미있어!"`,
      bg: 'https://images.unsplash.com/photo-1663660408776-abc66d76f611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 밝은 모습을 보인다', to: 'positive', cls: 'bg-yellow-200' },
        { label: '가끔은 혼자 생각한다', to: 'think', cls: 'bg-blue-200' }
      ],
      prompt: '최근에 가장 크게 웃은 일은 뭐야?'
    },
    {
      id: 'listen',
      title: '경청하기',
      text: `친구들도 각자의 이야기가 있어.

슬픈 이야기도, 재미있는 이야기도... 

너는 귀 기울여 들어줘.

서로의 이야기를 듣는 건 진정한 우정이야.`,
      bg: 'https://images.unsplash.com/photo-1663660408776-abc66d76f611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 깊은 이야기를 나눈다', to: 'deep_talk', cls: 'bg-purple-200' },
        { label: '함께 미래를 꿈꾼다', to: 'future', cls: 'bg-blue-200' }
      ],
      prompt: '듣는 것과 말하는 것 중 어떤 쪽을 더 좋아해?'
    },
    {
      id: 'cheer_up',
      title: '위로의 이야기',
      text: `"내가 이야기 하나 해줄게!"

네가 신나는 모험 이야기를 들려줘.

친구가 점점 웃기 시작해. 

이야기는 마법 같은 힘이 있어.`,
      bg: 'https://images.unsplash.com/photo-1611842418573-4a8addb3556c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '긍정적인 태도를 유지한다', to: 'positive', cls: 'bg-yellow-200' },
        { label: '친구와 함께 미래를 꿈꾼다', to: 'future', cls: 'bg-purple-200' }
      ],
      prompt: '마법 같은 힘을 가진 이야기를 알아?'
    },
    {
      id: 'quiet_support',
      title: '조용한 지지',
      text: `말없이 손을 잡아줬어.

때로는 침묵이 가장 큰 위로가 돼.

친구가 고마워했어. 

너희는 서로를 이해해.`,
      bg: 'https://images.unsplash.com/photo-1663660408776-abc66d76f611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '서로를 응원한다', to: 'support', cls: 'bg-pink-200' },
        { label: '미래에 대해 이야기한다', to: 'future', cls: 'bg-blue-200' }
      ],
      prompt: '위로는 말과 행동 중 뭐가 더 좋을까?'
    },
    {
      id: 'think',
      title: '생각하는 시간',
      text: `너는 창가에 앉아 생각에 잠겼어.

"나는 누구일까?"
"어떤 사람이 되고 싶을까?"

깊은 생각을 하는 시간도 필요해.`,
      bg: 'https://images.unsplash.com/photo-1681931053935-7b523ea0b8fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '나만의 정체성을 생각한다', to: 'identity', cls: 'bg-purple-200' },
        { label: '미래를 상상한다', to: 'future', cls: 'bg-blue-200' }
      ],
      prompt: '어떤 사람이 되고 싶어?'
    },
    {
      id: 'positive',
      title: '긍정의 힘',
      text: `너는 항상 긍정적이야.

힘든 상황에서도 좋은 면을 찾으려 해.

"이것도 다 경험이야!" 

그런 긍정적인 태도가 주변을 밝게 만들어.`,
      bg: 'https://images.unsplash.com/photo-1561468528-e7b3a39e0e66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 희망을 잃지 않는다', to: 'hope', cls: 'bg-yellow-200' },
        { label: '다른 친구들도 응원한다', to: 'support', cls: 'bg-green-200' }
      ],
      prompt: '힘든 경험도 해 보는 것이 좋을까?'
    },
    {
      id: 'deep_talk',
      title: '깊은 대화',
      text: `친구들과 진지한 이야기를 나눠.

슬픔도, 희망도, 꿈도... 

서로를 더 잘 이해하게 됐어.

"우리는 진짜 친구야."`,
      bg: 'https://images.unsplash.com/photo-1663660408776-abc66d76f611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '서로를 응원한다', to: 'support', cls: 'bg-pink-200' },
        { label: '함께 희망을 품는다', to: 'hope', cls: 'bg-purple-200' }
      ],
      prompt: '네 생각을 자유롭게 적어봐~'
    },
    {
      id: 'future',
      title: '미래에 대한 꿈',
      text: `"어떤 친구를 사귀고 싶어?"

너는 미래를 상상해.

예쁜 집, 따뜻한 가족, 아름다운 정원... 

상상하는 것만으로도 행복해.`,
      bg: 'https://images.unsplash.com/photo-1611842418573-4a8addb3556c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '희망을 잃지 않는다', to: 'hope', cls: 'bg-yellow-200' },
        { label: '나만의 정체성을 생각한다', to: 'identity', cls: 'bg-purple-200' }
      ],
      prompt: '미래에 어떤 집에서 살고 싶어?'
    },
    {
      id: 'reality',
      title: '현실 직시',
      text: `하지만 현실은 쉽지 않아.

고아원 생활은 외롭고, 때로는 슬퍼.

그래도 너는 포기하지 않아. 

"내 안에 희망이 있어."`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다시 희망을 품는다', to: 'hope', cls: 'bg-yellow-200' },
        { label: '상상력으로 극복한다', to: 'imagination', cls: 'bg-purple-200' }
      ],
      prompt: '금방 포기하는 편이야, 희망을 잃지 않는 편이야?'
    },
    {
      id: 'support',
      title: '서로 응원하기',
      text: `너와 친구들은 서로를 응원해.

"우리 모두 행복해질 거야!"
"함께라면 할 수 있어!"

서로가 서로의 힘이 돼.`,
      bg: 'https://images.unsplash.com/photo-1663660408776-abc66d76f611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '희망을 함께 나눈다', to: 'hope', cls: 'bg-yellow-200' },
        { label: '나만의 길을 생각한다', to: 'identity', cls: 'bg-purple-200' }
      ],
      prompt: '누군가가 나의 힘이 되어 준 적이 있어?'
    },
    {
      id: 'identity',
      title: '나는 누구인가',
      text: `너는 생각해.

"나는 상상력이 풍부한 아이야."
"긍정적이고 밝은 사람이야."

스스로를 알아가는 건 정말 중요해.`,
      bg: 'https://images.unsplash.com/photo-1681931053935-7b523ea0b8fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '나를 사랑하기로 한다', to: 'hope', cls: 'bg-pink-200' },
        { label: '미래를 기대한다', to: 'hope', cls: 'bg-purple-200' }
      ],
      prompt: '스스로를 어떤 사람이라고 생각해?'
    },
    {
      id: 'hope',
      title: '희망의 빛',
      text: `너는 희망을 잃지 않아.

어려운 상황이지만 상상력과 긍정으로 버텨.

"언젠가 좋은 날이 올 거야!" 

그리고... 

진짜로 특별한 일이 일어날 거야!`,
      bg: 'https://images.unsplash.com/photo-1561468528-e7b3a39e0e66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '《빨간머리 앤》 읽어보기', to: 'ending', cls: 'bg-blue-200' }
      ],
      prompt: '최근에 특별한 경험을 한 것이 있어?'
    },
    {
      id: 'ending',
      title: '이야기는 계속돼!',
      text: `너는 고아원에서 상상력과 긍정으로 힘든 시간을 견뎌내고 있어.

《빨간머리 앤》에서는 앤이 그린 게이블스라는 녹색 지붕 집에 입양되면서 진정한 가족, 절친, 사랑, 그리고 아름다운 자연을 만나 성장하는 이야기가 펼쳐져!

상상력과 긍정의 힘을 배울 수 있어!

📚 도서관이나 서점에서 《빨간머리 앤》을 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1611842418573-4a8addb3556c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' }
      ],
      prompt: '《빨간머리 앤》 - 겨울왕국 엘사처럼 밝고 긍정적인 소녀 이야기! 슬픈 일이 있어도 상상력으로 행복을 찾는 앤의 모험이야!'
    }
  ];
}
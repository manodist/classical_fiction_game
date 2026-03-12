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

export function generateHeungbuStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '둥지에서의 아침',
      text: `${name.full}.\n\n너는 어린 제비야.\n\n따뜻한 봄날, 처마 밑 둥지에서 태어났어.\n\n형제 제비들이 옆에서 재잘거려.\n\n"짹짹! 배고파!"\n\n엄마 제비가 먹이를 물고 돌아오셨어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '먹이를 기다린다', to: 'wait_food', cls: 'bg-blue-200' },
        { label: '형제들을 관찰한다', to: 'observe_siblings', cls: 'bg-green-200' }
      ],
      prompt: '💭 가족 안에서 나는 어떤 존재일까?'
    },
    {
      id: 'wait_food',
      title: '형제들과 먹이 다툼',
      text: `형제들이 모두 부리를 벌려.\n\n"나 먼저요! 나 먼저요!"\n\n큰형 제비가 가장 크게 소리쳐.\n\n엄마는 큰형에게 먼저 먹이를 줘.\n\n너는 조용히 기다려.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '크게 소리친다', to: 'shout_loud', cls: 'bg-red-200' },
        { label: '차례를 기다린다', to: 'wait_turn', cls: 'bg-blue-200' }
      ],
      prompt: '💭 원하는 것을 얻기 위해 어떻게 행동해야 할까?'
    },
    {
      id: 'observe_siblings',
      title: '다섯 형제의 모습',
      text: `형제는 모두 다섯이야.\n\n큰형은 목소리가 커.\n\n둘째형은 날개가 빨라.\n\n셋째는 잘 다투어.\n\n막내는 항상 울어.\n\n그리고 너는...`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '내 역할을 찾는다', to: 'find_role', cls: 'bg-purple-200' },
        { label: '먹이 시간을 기다린다', to: 'wait_food', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 형제들 사이에서 나만의 자리는 무엇일까?'
    },
    {
      id: 'shout_loud',
      title: '욕심과 양심의 갈등',
      text: `"짹짹짹! 나도 배고파!"\n\n네가 크게 소리쳤어.\n\n큰형이 째려봐.\n\n"너는 가만히 있어!"\n\n엄마가 너에게 먹이를 줬어.\n\n하지만 마음이 편하지 않아.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '미안해한다', to: 'feel_sorry', cls: 'bg-blue-200' },
        { label: '당연하다고 생각한다', to: 'feel_right', cls: 'bg-red-200' }
      ],
      prompt: '💭 내가 원하는 것을 얻었지만 왜 마음이 불편할까?'
    },
    {
      id: 'wait_turn',
      title: '양보의 선행',
      text: `너는 조용히 기다렸어.\n\n큰형, 둘째형, 셋째...\n\n마지막에 네가 먹이를 받았어.\n\n양은 적었지만,\n\n엄마가 머리를 쓰다듬어 주셨어.\n\n마음이 따뜻해.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '만족한다', to: 'feel_satisfied', cls: 'bg-green-200' },
        { label: '더 먹고 싶다', to: 'want_more', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 적게 받았지만 마음이 편안한 이유는 무엇일까?'
    },
    {
      id: 'find_role',
      title: '형제를 돌보는 마음',
      text: `너는 생각했어.\n\n큰형처럼 강하지 않아.\n\n둘째형처럼 빠르지 않아.\n\n하지만 너는...\n\n다른 이들을 잘 챙겨줘.\n\n막내가 울면 위로해주고.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '이 역할이 좋다', to: 'like_role', cls: 'bg-green-200' },
        { label: '더 강해지고 싶다', to: 'want_strong', cls: 'bg-red-200' }
      ],
      prompt: '💭 약점이 오히려 장점이 될 수 있을까?'
    },
    {
      id: 'feel_sorry',
      title: '선한 마음의 사과',
      text: `"미안해, 형."\n\n네가 작게 말했어.\n\n큰형은 아무 말도 안 했지만,\n\n표정이 조금 풀렸어.\n\n엄마가 미소지으셨어.\n\n"착한 아이구나."`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '다음부터는 기다리기로 한다', to: 'decide_wait', cls: 'bg-blue-200' },
        { label: '밖을 내다본다', to: 'look_outside', cls: 'bg-green-200' }
      ],
      prompt: '💭 사과하는 것이 약함을 인정하는 것일까?'
    },
    {
      id: 'feel_right',
      title: '욕심의 대가',
      text: `'나도 배고픈데 뭐가 잘못이야.'\n\n너는 생각했어.\n\n하지만 큰형이 계속 째려봐.\n\n둥지 안 분위기가 불편해.\n\n엄마가 한숨을 쉬셨어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '생각을 바꾼다', to: 'change_mind', cls: 'bg-blue-200' },
        { label: '그냥 잔다', to: 'just_sleep', cls: 'bg-gray-200' }
      ],
      prompt: '💭 내 권리를 주장하는 것과 다른 이를 배려하는 것, 어떻게 균형을 맞출까?'
    },
    {
      id: 'feel_satisfied',
      title: '가난해도 풍요로운 마음',
      text: `적게 먹었지만 마음이 편해.\n\n큰형도 웃어줬어.\n\n둥지가 평화로워.\n\n"참 착하구나."\n\n둘째형이 말했어.\n\n너는 부끄럽지만 기뻐.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '밖을 구경한다', to: 'look_outside', cls: 'bg-green-200' },
        { label: '낮잠을 잔다', to: 'afternoon_nap', cls: 'bg-blue-200' }
      ],
      prompt: '💭 물질적으로 적게 가져도 마음이 풍요로울 수 있을까?'
    },
    {
      id: 'want_more',
      title: '욕심과 만족의 경계',
      text: `'조금 더 먹고 싶었는데...'\n\n너는 아쉬워.\n\n하지만 엄마도 지쳐 보여.\n\n먹이를 구하러 하루 종일 날아다니시니까.\n\n'참자. 다음엔 더 먹을 수 있겠지.'`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '엄마를 돕고 싶다', to: 'help_mom', cls: 'bg-green-200' },
        { label: '밖을 구경한다', to: 'look_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 욕심과 만족 사이에서 어떻게 균형을 찾을까?'
    },
    {
      id: 'like_role',
      title: '형제를 돕는 선행',
      text: `너는 막내 옆으로 갔어.\n\n"괜찮아. 내가 있잖아."\n\n막내가 울음을 그쳤어.\n\n엄마가 고마운 눈빛으로 봐주셨어.\n\n'이게 내 자리구나.'`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 돌본다', to: 'keep_caring', cls: 'bg-green-200' },
        { label: '밖을 구경한다', to: 'look_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 다른 이를 돕는 것이 나의 정체성이 될 수 있을까?'
    },
    {
      id: 'want_strong',
      title: '강해지고 싶은 욕망',
      text: `'나도 큰형처럼 강하고 싶어.'\n\n너는 날개를 파닥여봤어.\n\n아직 약해.\n\n'열심히 연습하면 되겠지!'\n\n결심했어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '날개 연습을 한다', to: 'practice_wings', cls: 'bg-red-200' },
        { label: '엄마에게 배운다', to: 'learn_from_mom', cls: 'bg-blue-200' }
      ],
      prompt: '💭 강함을 추구하는 것과 있는 그대로의 나를 받아들이는 것, 무엇이 더 중요할까?'
    },
    {
      id: 'decide_wait',
      title: '평화를 위한 양보',
      text: `'다음부터는 차례를 기다리자.'\n\n너는 다짐했어.\n\n큰형이 고개를 끄덕여줬어.\n\n둥지가 다시 평화로워졌어.\n\n평화가 얼마나 소중한지 알았어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '밖을 구경한다', to: 'look_outside', cls: 'bg-green-200' },
        { label: '형제들과 논다', to: 'play_siblings', cls: 'bg-blue-200' }
      ],
      prompt: '💭 관계의 평화가 물질적 이득보다 중요할까?'
    },
    {
      id: 'change_mind',
      title: '형제와의 화해',
      text: `너는 큰형에게 다가갔어.\n\n"형, 미안해."\n\n큰형이 놀랐어.\n\n"괜찮아. 너도 배고팠잖아."\n\n둘이 화해했어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '형제들과 논다', to: 'play_siblings', cls: 'bg-green-200' },
        { label: '밖을 구경한다', to: 'look_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 잘못을 인정하는 것이 성장의 시작일까?'
    },
    {
      id: 'just_sleep',
      title: '회피의 대가',
      text: `너는 모른 척하고 잤어.\n\n하지만 마음이 불편해.\n\n큰형의 따가운 시선이 느껴져.\n\n잠이 잘 오지 않아.\n\n'내일은 달라져야지...'`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '다음 날 아침', to: 'next_morning', cls: 'bg-purple-200' }
      ],
      prompt: '💭 회피가 문제를 해결해줄까?'
    },
    {
      id: 'look_outside',
      title: '부자와 가난한 마을',
      text: `너는 둥지 밖을 내다봤어.\n\n하늘은 넓고 푸르러.\n\n저 멀리 마을이 보여.\n\n큰 기와집도 있고,\n\n작은 초가집도 있어.\n\n"언젠가 저기 날아갈 거야!"`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '마을을 관찰한다', to: 'observe_village', cls: 'bg-green-200' },
        { label: '다른 제비들을 본다', to: 'watch_swallows', cls: 'bg-blue-200' }
      ],
      prompt: '💭 넓은 세상을 향한 동경과 안전한 둥지, 무엇을 선택할까?'
    },
    {
      id: 'afternoon_nap',
      title: '평화로운 형제애',
      text: `따뜻한 햇살이 둥지를 비춰.\n\n형제들이 옹기종기 모여 자.\n\n너도 눈을 감았어.\n\n평화로운 오후.\n\n이런 순간이 행복이야.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '꿈을 꾼다', to: 'dream', cls: 'bg-purple-200' },
        { label: '일어나서 밖을 본다', to: 'look_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 평범한 일상이 가장 큰 행복일까?'
    },
    {
      id: 'help_mom',
      title: '가족을 돕는 마음',
      text: `"엄마, 저도 도와드릴게요!"\n\n엄마가 웃으셨어.\n\n"아직 어려. 조금만 더 크면 도울 수 있단다."\n\n"그럼 빨리 크고 싶어요!"\n\n엄마가 너를 안아주셨어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '날개 연습을 한다', to: 'practice_wings', cls: 'bg-green-200' },
        { label: '밖을 구경한다', to: 'look_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 받기만 하는 것과 주고 싶은 마음, 어느 것이 더 성숙함일까?'
    },
    {
      id: 'keep_caring',
      title: '나눔의 선행',
      text: `너는 막내를 계속 돌봤어.\n\n먹이를 나눠주고,\n\n추우면 날개로 감싸주고.\n\n막내가 너를 따라.\n\n"고마워."\n\n작은 소리지만 마음이 따뜻해.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 돌본다', to: 'sibling_bond', cls: 'bg-green-200' },
        { label: '밖을 구경한다', to: 'look_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 나누는 기쁨이 받는 기쁨보다 클 수 있을까?'
    },
    {
      id: 'practice_wings',
      title: '노력의 선행',
      text: `너는 열심히 날개를 펄럭였어.\n\n파닥파닥!\n\n조금씩 강해지는 게 느껴져.\n\n큰형이 봐.\n\n"열심히 하는구나. 잘하고 있어."\n\n칭찬이 힘이 돼.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '더 연습한다', to: 'practice_more', cls: 'bg-red-200' },
        { label: '쉬면서 밖을 본다', to: 'look_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 노력은 재능을 이길 수 있을까?'
    },
    {
      id: 'learn_from_mom',
      title: '진정한 강함의 의미',
      text: `"엄마, 어떻게 하면 강해져요?"\n\n"힘만 강한 게 중요한 게 아니란다."\n\n엄마가 말씀하셨어.\n\n"마음이 강해야지.\n\n어려움이 와도 포기하지 않는 마음."\n\n너는 고개를 끄덕였어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '마음을 강하게 한다', to: 'strengthen_heart', cls: 'bg-purple-200' },
        { label: '날개도 연습한다', to: 'practice_wings', cls: 'bg-green-200' }
      ],
      prompt: '💭 진정한 강함은 어디서 나올까?'
    },
    {
      id: 'play_siblings',
      title: '형제들과의 우애',
      text: `형제들이 둥지에서 놀아.\n\n누가 더 높이 뛰나 시합해.\n\n너도 참여했어.\n\n못 이겼지만 즐거워.\n\n"우리 사이좋게 지내자!"\n\n모두가 웃었어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '더 논다', to: 'play_more', cls: 'bg-green-200' },
        { label: '밖을 구경한다', to: 'look_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 승부보다 함께하는 즐거움이 더 중요할까?'
    },
    {
      id: 'next_morning',
      title: '새로운 시작의 용기',
      text: `아침 햇살이 둥지를 깨워.\n\n너는 어젯밤 일이 생각나.\n\n'오늘은 잘해야지.'\n\n큰형이 일어났어.\n\n두 눈이 마주쳤어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '먼저 인사한다', to: 'greet_first', cls: 'bg-green-200' },
        { label: '모른 척한다', to: 'ignore', cls: 'bg-gray-200' }
      ],
      prompt: '💭 새로운 시작을 위해 필요한 것은 무엇일까?'
    },
    {
      id: 'observe_village',
      title: '부와 가난의 차이',
      text: `너는 마을을 자세히 봤어.\n\n큰 기와집에선 웃음소리가 들려.\n\n음식도 풍성해 보여.\n\n작은 초가집에선...\n\n아이들이 누더기를 입고 있어.\n\n하지만 서로 의지하며 살아.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '부자 집을 더 본다', to: 'rich_house', cls: 'bg-yellow-200' },
        { label: '가난한 집을 더 본다', to: 'poor_house', cls: 'bg-blue-200' }
      ],
      prompt: '💭 부와 가난, 무엇이 진정한 행복을 결정할까?'
    },
    {
      id: 'watch_swallows',
      title: '자유를 향한 꿈',
      text: `하늘에 많은 제비들이 날아.\n\n어떤 제비는 혼자 날고,\n\n어떤 제비는 무리지어 날아.\n\n"나도 저렇게 날고 싶어!"\n\n네 가슴이 뛰었어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '날기를 꿈꾼다', to: 'dream_flying', cls: 'bg-blue-200' },
        { label: '날개 연습을 한다', to: 'practice_wings', cls: 'bg-red-200' }
      ],
      prompt: '💭 꿈을 꾸는 것과 이루는 것 사이에는 무엇이 있을까?'
    },
    {
      id: 'dream',
      title: '선한 삶의 꿈',
      text: `너는 꿈을 꿨어.\n\n넓은 하늘을 자유롭게 날아.\n\n어려운 이들을 도와주고,\n\n형제들과 사이좋게 지내.\n\n행복한 꿈이야.\n\n눈을 떴어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '꿈을 이루고 싶다', to: 'want_dream', cls: 'bg-purple-200' },
        { label: '밖을 구경한다', to: 'look_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 꿈은 우리에게 무엇을 가르쳐줄까?'
    },
    {
      id: 'sibling_bond',
      title: '형제의 깊은 유대',
      text: `너와 막내는 특별한 사이가 됐어.\n\n서로 돕고,\n\n서로 위로해주고.\n\n다른 형제들도 봤어.\n\n"참 착하구나."\n\n엄마가 자랑스러워하셨어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '모두와 친해진다', to: 'all_siblings', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 가족의 사랑은 어떻게 만들어질까?'
    },
    {
      id: 'practice_more',
      title: '꾸준한 노력의 힘',
      text: `너는 매일 연습했어.\n\n처음엔 힘들었지만,\n\n조금씩 나아져.\n\n큰형도 도와줬어.\n\n"이렇게 하면 돼."\n\n형제애가 깊어졌어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '첫 비행을 시도한다', to: 'first_flight', cls: 'bg-red-200' },
        { label: '조금 더 연습한다', to: 'practice_longer', cls: 'bg-blue-200' }
      ],
      prompt: '💭 꾸준함이 빠른 성공보다 중요할까?'
    },
    {
      id: 'strengthen_heart',
      title: '선한 마음의 힘',
      text: `너는 마음을 다잡았어.\n\n어려워도 포기하지 않기.\n\n힘들어도 웃기.\n\n남을 탓하지 않기.\n\n'이게 진짜 강함이구나.'`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '날개도 연습한다', to: 'practice_wings', cls: 'bg-green-200' },
        { label: '형제를 돕는다', to: 'keep_caring', cls: 'bg-blue-200' }
      ],
      prompt: '💭 내면의 강함과 외면의 강함, 무엇이 먼저일까?'
    },
    {
      id: 'play_more',
      title: '형제애의 즐거움',
      text: `형제들과 놀이가 계속됐어.\n\n숨바꼭질도 하고,\n\n노래도 부르고.\n\n너는 행복해.\n\n'이렇게 사이좋게 지내면 좋겠어.'`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '엄마를 기다린다', to: 'wait_mom', cls: 'bg-blue-200' },
        { label: '밖을 구경한다', to: 'look_outside', cls: 'bg-green-200' }
      ],
      prompt: '💭 함께하는 시간이 가장 소중한 선물일까?'
    },
    {
      id: 'greet_first',
      title: '화해의 용기',
      text: `"형, 안녕."\n\n네가 먼저 인사했어.\n\n큰형이 놀랐어.\n\n"...안녕."\n\n어색했던 분위기가 풀렸어.\n\n새로운 시작이야.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '형제들과 논다', to: 'play_siblings', cls: 'bg-green-200' },
        { label: '밖을 구경한다', to: 'look_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 작은 용기가 큰 변화를 만들 수 있을까?'
    },
    {
      id: 'ignore',
      title: '악한 선택의 결과',
      text: `너는 모른 척했어.\n\n큰형도 말을 안 해.\n\n둥지가 계속 불편해.\n\n엄마가 슬퍼 보여.\n\n'이러면 안 되는데...'`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '용기를 낸다', to: 'find_courage', cls: 'bg-green-200' }
      ],
      prompt: '💭 관계의 회복은 누가 먼저 시작해야 할까?'
    },
    {
      id: 'rich_house',
      title: '부자의 불행',
      text: `큰 기와집을 봤어.\n\n음식이 넘쳐흘러.\n\n하지만 사람들이 다퉈.\n\n"내 것이야!" "아니야, 내 거야!"\n\n많이 가져도 행복하지 않아 보여.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '가난한 집을 본다', to: 'poor_house', cls: 'bg-blue-200' },
        { label: '생각에 잠긴다', to: 'think_wealth', cls: 'bg-purple-200' }
      ],
      prompt: '💭 많이 가진 것이 행복을 보장할까?'
    },
    {
      id: 'poor_house',
      title: '가난한 집의 행복',
      text: `작은 초가집을 봤어.\n\n음식은 적지만,\n\n가족이 함께 나눠 먹어.\n\n"맛있니?" "응, 고마워!"\n\n웃음소리가 따뜻해.\n\n너는 생각했어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '부자 집을 본다', to: 'rich_house', cls: 'bg-yellow-200' },
        { label: '깨달음을 얻는다', to: 'realize_poverty', cls: 'bg-green-200' }
      ],
      prompt: '💭 가난해도 행복할 수 있을까?'
    },
    {
      id: 'dream_flying',
      title: '자유의 꿈',
      text: `너는 상상했어.\n\n푸른 하늘을 자유롭게 날아.\n\n구름 사이를 지나고,\n\n바람을 타고...\n\n"꼭 날 거야!"\n\n결심했어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '날개 연습을 시작한다', to: 'practice_wings', cls: 'bg-red-200' },
        { label: '엄마에게 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 꿈이 있다면 언제 시작해야 할까?'
    },
    {
      id: 'want_dream',
      title: '선한 삶의 다짐',
      text: `'꿈을 이루고 싶어!'\n\n너는 일어났어.\n\n"엄마, 저 착하게 살고 싶어요."\n\n엄마가 웃으셨어.\n\n"넌 이미 착한 아이란다."`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '더 착해지려 노력한다', to: 'try_kindness', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 선한 마음은 타고나는 것일까, 만들어지는 것일까?'
    },
    {
      id: 'all_siblings',
      title: '화목한 형제들',
      text: `너는 모든 형제와 친해졌어.\n\n큰형과도, 둘째형과도,\n\n셋째와도, 막내와도.\n\n둥지가 화목해졌어.\n\n엄마가 기뻐하셨어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '이 행복을 지킨다', to: 'protect_happiness', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 행복은 지켜야 하는 것일까, 나누면 커지는 것일까?'
    },
    {
      id: 'learn_flying',
      title: '새로운 도전',
      text: `"이제 날기를 배울 때가 됐구나."\n\n엄마가 말씀하셨어.\n\n"먼저 날개 힘을 길러야 해."\n\n너는 설렜어.\n\n드디어 날 수 있어!`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '열심히 배운다', to: 'learn_hard', cls: 'bg-green-200' },
        { label: '무섭지만 도전한다', to: 'brave_try', cls: 'bg-red-200' }
      ],
      prompt: '💭 새로운 도전 앞에서 두려움과 설렘, 무엇이 더 클까?'
    },
    {
      id: 'first_flight',
      title: '첫 시도의 용기',
      text: `너는 둥지 끝에 섰어.\n\n아래가 아득해.\n\n두려워.\n\n하지만 날개를 펼쳤어.\n\n파닥!\n\n잠깐 떴다가 다시 둥지로.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '다시 도전한다', to: 'try_again', cls: 'bg-red-200' },
        { label: '더 연습한다', to: 'practice_longer', cls: 'bg-blue-200' }
      ],
      prompt: '💭 실패는 끝일까, 시작일까?'
    },
    {
      id: 'practice_longer',
      title: '인내의 선행',
      text: `너는 매일 연습했어.\n\n날개가 점점 강해져.\n\n어느 날,\n\n엄마가 말씀하셨어.\n\n"이제 됐어. 날 수 있어!"`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '첫 비행에 도전한다', to: 'real_first_flight', cls: 'bg-blue-200' }
      ],
      prompt: '💭 준비된 도전은 무모함과 다를까?'
    },
    {
      id: 'wait_mom',
      title: '가족을 기다리는 마음',
      text: `형제들이 엄마를 기다려.\n\n"언제 오실까?"\n\n막내가 물었어.\n\n"조금만 기다려. 곧 오실 거야."\n\n네가 위로했어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '엄마가 돌아오신다', to: 'mom_returns', cls: 'bg-green-200' },
        { label: '밖을 구경한다', to: 'look_outside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 기다림은 사랑의 표현일까?'
    },
    {
      id: 'find_courage',
      title: '선한 용기',
      text: `너는 용기를 냈어.\n\n"형, 미안해."\n\n큰형이 놀랐지만,\n\n곧 웃어줬어.\n\n"나도 미안해."\n\n화해했어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '형제들과 논다', to: 'play_siblings', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 용서는 약함의 표시일까, 강함의 표시일까?'
    },
    {
      id: 'think_wealth',
      title: '부의 진정한 의미',
      text: `너는 깨달았어.\n\n많이 가진 것이 중요한 게 아니야.\n\n어떻게 사용하느냐가 중요해.\n\n나누면 행복이 커지고,\n\n독차지하면 불행해져.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '가난한 집을 본다', to: 'poor_house', cls: 'bg-blue-200' },
        { label: '둥지로 돌아간다', to: 'return_nest', cls: 'bg-green-200' }
      ],
      prompt: '💭 진정한 부란 무엇일까?'
    },
    {
      id: 'realize_poverty',
      title: '가난 속의 사랑',
      text: `너는 알았어.\n\n가난해도 서로 사랑하면,\n\n행복할 수 있어.\n\n물질보다 마음이 중요해.\n\n'나도 저렇게 살고 싶어.'`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '착한 마음을 다짐한다', to: 'promise_kindness', cls: 'bg-green-200' },
        { label: '둥지로 돌아간다', to: 'return_nest', cls: 'bg-blue-200' }
      ],
      prompt: '💭 가난은 불행이 아닐 수 있을까?'
    },
    {
      id: 'try_kindness',
      title: '선행의 시작',
      text: `너는 착하게 행동하기로 했어.\n\n형제들에게 양보하고,\n\n엄마를 도와드리고,\n\n남을 배려하고.\n\n조금씩 변화가 보여.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 착하게 산다', to: 'keep_good', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 선행은 습관이 될 수 있을까?'
    },
    {
      id: 'protect_happiness',
      title: '행복을 지키는 선행',
      text: `너는 다짐했어.\n\n이 행복을 지키겠다고.\n\n형제들과 사이좋게 지내고,\n\n엄마를 기쁘게 해드리고,\n\n착하게 살겠다고.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '실천한다', to: 'practice_goodness', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 행복을 지키기 위해 필요한 것은 무엇일까?'
    },
    {
      id: 'learn_hard',
      title: '열심히 배우는 선행',
      text: `너는 엄마의 가르침을 따랐어.\n\n날개를 펼치는 법,\n\n바람을 타는 법,\n\n균형 잡는 법...\n\n하나하나 배워갔어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '첫 비행을 준비한다', to: 'prepare_flight', cls: 'bg-blue-200' },
        { label: '더 연습한다', to: 'practice_longer', cls: 'bg-green-200' }
      ],
      prompt: '💭 배움에는 왕도가 없을까?'
    },
    {
      id: 'brave_try',
      title: '용감한 도전',
      text: `두렵지만 너는 도전했어.\n\n날개를 펼치고,\n\n뛰어내렸어!\n\n파닥파닥!\n\n잠깐이지만 날았어!\n\n다시 둥지로 돌아왔어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '기뻐한다', to: 'feel_joy', cls: 'bg-yellow-200' },
        { label: '다시 도전한다', to: 'try_again', cls: 'bg-red-200' }
      ],
      prompt: '💭 용기는 두려움이 없는 것일까, 두려움을 이기는 것일까?'
    },
    {
      id: 'try_again',
      title: '포기하지 않는 선행',
      text: `너는 포기하지 않았어.\n\n다시 날개를 펼쳤어.\n\n이번엔 조금 더 오래 떴어!\n\n"할 수 있어!"\n\n자신감이 생겼어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 연습한다', to: 'practice_flight', cls: 'bg-green-200' },
        { label: '쉬었다가 한다', to: 'rest_first', cls: 'bg-blue-200' }
      ],
      prompt: '💭 포기하지 않는 마음이 재능보다 중요할까?'
    },
    {
      id: 'real_first_flight',
      title: '노력의 결실',
      text: `너는 준비됐어.\n\n깊게 숨을 쉬고,\n\n날개를 활짝 펼쳤어.\n\n뛰어내렸어!\n\n파닥파닥파닥!\n\n날고 있어! 정말 날고 있어!`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '하늘을 난다', to: 'fly_sky', cls: 'bg-blue-200' }
      ],
      prompt: '💭 꿈이 현실이 되는 순간, 무엇을 느낄까?'
    },
    {
      id: 'mom_returns',
      title: '가족의 사랑',
      text: `엄마가 돌아오셨어.\n\n먹이를 가득 물고.\n\n"기다렸지? 미안해."\n\n형제들이 반겨.\n\n너도 기뻐했어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '먹이를 나눠 먹는다', to: 'share_food', cls: 'bg-green-200' },
        { label: '엄마와 이야기한다', to: 'talk_mom', cls: 'bg-blue-200' }
      ],
      prompt: '💭 가족의 사랑은 어떤 모습일까?'
    },
    {
      id: 'return_nest',
      title: '형제와 나누는 지혜',
      text: `너는 둥지로 돌아왔어.\n\n형제들이 기다려.\n\n"어디 갔었어?"\n\n"세상을 봤어. 많은 걸 배웠어."`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '깨달음을 나눈다', to: 'share_wisdom', cls: 'bg-purple-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 배운 것을 나누는 것이 진정한 배움일까?'
    },
    {
      id: 'promise_kindness',
      title: '선행의 약속',
      text: `너는 마음속 깊이 다짐했어.\n\n항상 착하게 살겠다고.\n\n어려운 이를 도와주겠다고.\n\n형제들과 사이좋게 지내겠다고.\n\n이 약속을 지킬 거야.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '실천을 시작한다', to: 'start_practice', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 약속은 지켜질 때 의미를 가질까?'
    },
    {
      id: 'keep_good',
      title: '계속되는 선행',
      text: `너는 매일 착하게 행동했어.\n\n작은 일이라도 도와주고,\n\n양보하고,\n\n감사하고.\n\n주변이 변하기 시작했어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '변화를 느낀다', to: 'feel_change', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 선행은 세상을 바꿀 수 있을까?'
    },
    {
      id: 'practice_goodness',
      title: '나눔의 실천',
      text: `너는 선함을 실천했어.\n\n막내가 배고프면 자기 몫을 나눠주고,\n\n엄마가 피곤하시면 위로해드리고,\n\n형제들이 싸우면 중재하고.\n\n둥지가 평화로워졌어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 실천한다', to: 'continue_goodness', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 평화는 어떻게 만들어질까?'
    },
    {
      id: 'prepare_flight',
      title: '믿음의 힘',
      text: `너는 마음을 다잡았어.\n\n두렵지만 해야 해.\n\n엄마가 옆에 계셔.\n\n"괜찮아. 엄마가 있어."\n\n용기가 났어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '날아오른다', to: 'real_first_flight', cls: 'bg-blue-200' }
      ],
      prompt: '💭 누군가의 믿음이 우리에게 힘을 줄까?'
    },
    {
      id: 'feel_joy',
      title: '선행의 기쁨',
      text: `너는 너무 기뻐!\n\n"나 날았어! 정말 날았어!"\n\n형제들이 축하해줘.\n\n엄마가 자랑스러워하셔.\n\n최고의 순간이야.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '다시 날아본다', to: 'fly_again', cls: 'bg-blue-200' },
        { label: '기쁨을 나눈다', to: 'share_joy', cls: 'bg-green-200' }
      ],
      prompt: '💭 기쁨은 나눌 때 더 커질까?'
    },
    {
      id: 'practice_flight',
      title: '성장의 과정',
      text: `너는 매일 날았어.\n\n조금씩 더 오래,\n\n조금씩 더 높이.\n\n이제 자신감이 생겼어.\n\n"나 날 수 있어!"`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '멀리 날아본다', to: 'fly_far', cls: 'bg-blue-200' },
        { label: '형제들을 가르친다', to: 'teach_siblings', cls: 'bg-green-200' }
      ],
      prompt: '💭 배운 것을 가르치는 것이 진정한 이해일까?'
    },
    {
      id: 'rest_first',
      title: '지혜로운 인내',
      text: `너는 쉬기로 했어.\n\n서두르지 않아도 돼.\n\n천천히, 확실하게.\n\n내일 다시 도전하면 돼.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '다음 날 다시 도전한다', to: 'next_day_flight', cls: 'bg-blue-200' },
        { label: '형제들과 논다', to: 'play_siblings', cls: 'bg-green-200' }
      ],
      prompt: '💭 쉬는 것도 성장의 일부일까?'
    },
    {
      id: 'fly_sky',
      title: '자유로운 세상',
      text: `너는 하늘을 날아!\n\n바람이 날개를 스쳐.\n\n구름이 가까워.\n\n"이게 자유구나!"\n\n마을이 내려다보여.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '마을을 둘러본다', to: 'tour_village', cls: 'bg-green-200' }
      ],
      prompt: '💭 자유란 무엇일까?'
    },
    {
      id: 'share_food',
      title: '양보의 아름다움',
      text: `엄마가 먹이를 나눠주셨어.\n\n이번엔 네가 양보했어.\n\n"막내 먼저 먹어."\n\n엄마가 기뻐하셨어.\n\n형제들도 따라 양보해.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '기쁜 마음으로 먹는다', to: 'eat_happily', cls: 'bg-green-200' },
        { label: '날기에 대해 묻는다', to: 'ask_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 양보가 손해가 아닐 수 있을까?'
    },
    {
      id: 'talk_mom',
      title: '권선징악의 가르침',
      text: `"엄마, 착하게 사는 게 왜 중요해요?"\n\n엄마가 말씀하셨어.\n\n"착함은 돌고 돌아 네게 돌아온단다."\n\n"선행에는 반드시 복이 따라."\n\n너는 새겼어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '착하게 살기로 한다', to: 'decide_goodness', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 권선징악은 정말 존재할까?'
    },
    {
      id: 'share_wisdom',
      title: '가난 속 진정한 부',
      text: `너는 형제들에게 말했어.\n\n"부자라고 행복한 게 아니야."\n\n"가난해도 서로 사랑하면 행복해."\n\n형제들이 고개를 끄덕여.\n\n"네 말이 맞아."`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '함께 착하게 살기로 한다', to: 'all_promise', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 진리는 함께 나눌 때 더 강해질까?'
    },
    {
      id: 'start_practice',
      title: '작은 선행의 시작',
      text: `너는 오늘부터 시작했어.\n\n작은 일부터.\n\n"형, 이거 써." 양보하고,\n\n"괜찮아?" 위로하고,\n\n"고마워." 감사하고.\n\n조금씩 변화가 보여.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 실천한다', to: 'keep_practicing', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 작은 실천이 큰 변화를 만들까?'
    },
    {
      id: 'feel_change',
      title: '선행의 힘',
      text: `주변이 달라졌어.\n\n형제들이 더 친절해지고,\n\n엄마가 더 웃으시고,\n\n둥지가 더 평화로워.\n\n"내 선행이 이걸 만들었구나."\n\n너는 뿌듯했어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 착하게 산다', to: 'continue_kindness', cls: 'bg-green-200' },
        { label: '세상으로 나간다', to: 'go_world', cls: 'bg-blue-200' }
      ],
      prompt: '💭 한 사람의 선행이 세상을 바꿀 수 있을까?'
    },
    {
      id: 'continue_goodness',
      title: '멈추지 않는 선행',
      text: `너는 멈추지 않았어.\n\n매일 선행을 했어.\n\n힘들어도,\n\n피곤해도.\n\n"이게 내 길이야."\n\n확신했어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' },
        { label: '세상으로 나간다', to: 'go_world', cls: 'bg-green-200' }
      ],
      prompt: '💭 선함은 선택일까, 본성일까?'
    },
    {
      id: 'fly_again',
      title: '성공의 반복',
      text: `너는 다시 날았어.\n\n이번엔 더 자신감 있게.\n\n더 높이,\n\n더 멀리.\n\n"날 수 있어!"`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '마을로 날아간다', to: 'fly_to_village', cls: 'bg-green-200' },
        { label: '형제들을 가르친다', to: 'teach_siblings', cls: 'bg-blue-200' }
      ],
      prompt: '💭 성공은 반복될 수 있을까?'
    },
    {
      id: 'share_joy',
      title: '기쁨을 나누는 선행',
      text: `너는 형제들에게 말했어.\n\n"너희도 할 수 있어!"\n\n"나도 두려웠지만 해냈어!"\n\n형제들이 용기를 얻었어.\n\n함께 연습하기 시작했어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '함께 날기를 배운다', to: 'learn_together', cls: 'bg-green-200' },
        { label: '세상을 탐험한다', to: 'explore_world', cls: 'bg-blue-200' }
      ],
      prompt: '💭 기쁨은 나눌 때 배가 될까?'
    },
    {
      id: 'fly_far',
      title: '넓은 세상',
      text: `너는 멀리 날았어.\n\n처음 보는 곳들.\n\n새로운 풍경들.\n\n"세상은 정말 넓구나!"\n\n감탄했어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '마을을 둘러본다', to: 'tour_village', cls: 'bg-green-200' },
        { label: '둥지로 돌아간다', to: 'return_to_nest', cls: 'bg-blue-200' }
      ],
      prompt: '💭 넓은 세상을 보는 것이 성장일까?'
    },
    {
      id: 'teach_siblings',
      title: '형제에게 가르치는 선행',
      text: `너는 형제들에게 날기를 가르쳤어.\n\n"이렇게 날개를 펼치고,"\n\n"이렇게 균형을 잡고..."\n\n형제들이 하나둘 날기 시작했어.\n\n가르치는 기쁨을 알았어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '함께 난다', to: 'fly_together', cls: 'bg-green-200' },
        { label: '세상을 탐험한다', to: 'explore_world', cls: 'bg-blue-200' }
      ],
      prompt: '💭 가르침은 배움의 완성일까?'
    },
    {
      id: 'next_day_flight',
      title: '실패 후의 성장',
      text: `다음 날, 너는 다시 도전했어.\n\n어제의 실패는 오늘의 교훈.\n\n더 잘 준비했어.\n\n그리고...\n\n성공했어!`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '하늘을 난다', to: 'fly_sky', cls: 'bg-blue-200' }
      ],
      prompt: '💭 실패 후의 재도전이 더 값질까?'
    },
    {
      id: 'tour_village',
      title: '부와 가난의 선택',
      text: `너는 마을 위를 날았어.\n\n부자 집과 가난한 집이 보여.\n\n부자 집에선 다투는 소리,\n\n가난한 집에선 웃음소리.\n\n'어디로 갈까?'\n\n너는 생각했어.`,
      bg: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '가난한 집으로 간다', to: 'visit_poor', cls: 'bg-blue-200' },
        { label: '부자 집을 관찰한다', to: 'observe_rich', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 내 선택이 내 미래를 만들까?'
    },
    {
      id: 'eat_happily',
      title: '가난해도 행복한 마음',
      text: `적게 먹었지만 마음이 풍족해.\n\n가족이 함께하니까.\n\n서로 나누니까.\n\n"이게 진짜 행복이구나."\n\n너는 깨달았어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' },
        { label: '형제들과 논다', to: 'play_siblings', cls: 'bg-green-200' }
      ],
      prompt: '💭 함께함이 진정한 부일까?'
    },
    {
      id: 'ask_flying',
      title: '배움의 시작',
      text: `"엄마, 저도 날고 싶어요!"\n\n엄마가 웃으셨어.\n\n"이제 때가 됐구나."\n\n"내일부터 가르쳐 줄게."\n\n너는 설렜어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '다음 날', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 배움의 때는 언제 올까?'
    },
    {
      id: 'decide_goodness',
      title: '선의 선택',
      text: `너는 결심했어.\n\n"나는 착하게 살 거야."\n\n"어떤 일이 있어도."\n\n엄마가 안아주셨어.\n\n"자랑스럽다."`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '실천을 시작한다', to: 'practice_goodness', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 선택은 운명을 바꿀 수 있을까?'
    },
    {
      id: 'all_promise',
      title: '형제들의 약속',
      text: `형제들이 모두 다짐했어.\n\n"우리 모두 착하게 살자!"\n\n"서로 도와가며!"\n\n"사이좋게!"\n\n둥지가 하나가 됐어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '함께 실천한다', to: 'practice_together', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 함께하는 약속이 더 강할까?'
    },
    {
      id: 'keep_practicing',
      title: '선행의 습관',
      text: `너는 매일 선행했어.\n\n쉬지 않고,\n\n포기하지 않고.\n\n주변이 점점 밝아졌어.\n\n"선행은 습관이 되는구나."`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' },
        { label: '더 많이 돕는다', to: 'help_more', cls: 'bg-green-200' }
      ],
      prompt: '💭 습관이 성품을 만들까?'
    },
    {
      id: 'continue_kindness',
      title: '삶이 된 선행',
      text: `너는 멈추지 않았어.\n\n선행은 계속됐어.\n\n매일, 매순간.\n\n"이게 내 삶이야."\n\n행복했어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' },
        { label: '세상으로 나간다', to: 'go_world', cls: 'bg-green-200' }
      ],
      prompt: '💭 선행은 삶의 방식이 될 수 있을까?'
    },
    {
      id: 'go_world',
      title: '선한 마음으로',
      text: `너는 날기를 배웠어.\n\n이제 넓은 세상으로 갈 시간.\n\n"착한 마음을 가지고 가렴."\n\n엄마가 말씀하셨어.\n\n"네, 엄마!"`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '마을로 날아간다', to: 'fly_to_village', cls: 'bg-blue-200' }
      ],
      prompt: '💭 배운 것을 세상에서 실천할 때가 왔을까?'
    },
    {
      id: 'fly_to_village',
      title: '착한 마음이 이끄는 곳',
      text: `너는 마을로 날았어.\n\n부자 집과 가난한 집이 있어.\n\n'어디로 갈까?'\n\n마음속 목소리가 들려.\n\n'착한 마음이 이끄는 곳으로.'`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '가난한 집으로 간다', to: 'visit_poor', cls: 'bg-blue-200' },
        { label: '부자 집을 관찰한다', to: 'observe_rich', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 마음이 이끄는 곳이 진짜 목적지일까?'
    },
    {
      id: 'learn_together',
      title: '형제와 함께 성장',
      text: `형제들이 함께 날기를 배웠어.\n\n서로 도우며,\n\n격려하며.\n\n"우리 함께라서 좋아!"\n\n모두가 웃었어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '함께 날아오른다', to: 'fly_together', cls: 'bg-blue-200' }
      ],
      prompt: '💭 함께 성장하는 것이 더 의미 있을까?'
    },
    {
      id: 'explore_world',
      title: '세상의 다양성',
      text: `너는 세상을 탐험하기 시작했어.\n\n다양한 곳을 봤어.\n\n부자도, 가난한 이도,\n\n착한 이도, 나쁜 이도.\n\n"세상은 복잡하구나."`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '마을에 정착한다', to: 'settle_village', cls: 'bg-green-200' }
      ],
      prompt: '💭 다양성을 이해하는 것이 지혜일까?'
    },
    {
      id: 'return_to_nest',
      title: '형제에게 돌아가다',
      text: `너는 둥지로 돌아왔어.\n\n많은 것을 봤어.\n\n"형제들에게 알려줘야지."\n\n경험을 나누고 싶었어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '경험을 나눈다', to: 'share_experience', cls: 'bg-purple-200' },
        { label: '다시 세상으로 나간다', to: 'go_out_again', cls: 'bg-blue-200' }
      ],
      prompt: '💭 집은 언제나 돌아갈 곳일까?'
    },
    {
      id: 'fly_together',
      title: '형제와 함께 날다',
      text: `형제들이 함께 하늘을 날았어.\n\n"야호!"\n\n함께 구름을 지나고,\n\n함께 바람을 타.\n\n"함께라서 더 즐거워!"`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '마을로 간다', to: 'visit_village_together', cls: 'bg-green-200' }
      ],
      prompt: '💭 함께하는 여정이 더 가치 있을까?'
    },
    {
      id: 'visit_poor',
      title: '가난하지만 따뜻한 집',
      text: `너는 가난한 집으로 갔어.\n\n초라한 집이지만,\n\n사람들이 따뜻해.\n\n서로 돕고,\n\n서로 나눠.\n\n'여기가 좋아.'`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '이 집에 둥지를 튼다', to: 'make_nest_poor', cls: 'bg-green-200' },
        { label: '부자 집도 둘러본다', to: 'observe_rich', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 어떤 곳이 진정한 집일까?'
    },
    {
      id: 'observe_rich',
      title: '부자의 차가운 마음',
      text: `너는 부자 집을 봤어.\n\n크고 화려해.\n\n하지만 사람들이 차가워.\n\n서로 싸우고,\n\n독차지하려 해.\n\n'여긴 아닌 것 같아.'`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '가난한 집으로 간다', to: 'visit_poor', cls: 'bg-blue-200' }
      ],
      prompt: '💭 겉모습과 본질, 무엇이 더 중요할까?'
    },
    {
      id: 'practice_together',
      title: '형제와 함께하는 선행',
      text: `형제들이 함께 선행을 했어.\n\n서로 양보하고,\n\n서로 돕고,\n\n서로 사랑하고.\n\n둥지가 천국 같아.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 함께한다', to: 'stay_together', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 함께하는 선행이 더 큰 힘을 가질까?'
    },
    {
      id: 'help_more',
      title: '끝없는 도움의 선행',
      text: `너는 더 많이 도왔어.\n\n막내뿐 아니라,\n\n모든 형제를,\n\n심지어 다른 제비들도.\n\n"도움의 손길은 끝이 없구나."`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 돕는다', to: 'become_helper', cls: 'bg-green-200' },
        { label: '날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 도움에는 한계가 있을까?'
    },
    {
      id: 'settle_village',
      title: '운명의 선택',
      text: `너는 마을에 둥지를 틀기로 했어.\n\n부자 집과 가난한 집 사이.\n\n'어디로 갈까?'\n\n마음은 이미 정해져 있어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '가난한 집으로 간다', to: 'visit_poor', cls: 'bg-blue-200' }
      ],
      prompt: '💭 내 선택이 내 운명을 결정할까?'
    },
    {
      id: 'share_experience',
      title: '형제와 나누는 지혜',
      text: `너는 형제들에게 말했어.\n\n"세상엔 다양한 사람들이 있어."\n\n"착한 마음이 가장 중요해."\n\n형제들이 귀 기울여 들어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '함께 세상으로 나간다', to: 'go_together', cls: 'bg-green-200' },
        { label: '혼자 다시 나간다', to: 'go_out_again', cls: 'bg-blue-200' }
      ],
      prompt: '💭 경험은 나눌 때 더 값어치가 있을까?'
    },
    {
      id: 'go_out_again',
      title: '독립의 시작',
      text: `너는 다시 날았어.\n\n이번엔 더 먼 곳으로.\n\n마을이 보여.\n\n"이제 내 집을 찾을 시간이야."`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '마을로 간다', to: 'fly_to_village', cls: 'bg-blue-200' }
      ],
      prompt: '💭 독립은 성장의 증거일까?'
    },
    {
      id: 'visit_village_together',
      title: '형제의 각자 길',
      text: `형제들이 함께 마을에 왔어.\n\n"우리 여기서 살자!"\n\n둘째형이 말했어.\n\n"어디가 좋을까?"\n\n모두 둘러봤어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '각자의 길을 간다', to: 'separate_ways', cls: 'bg-purple-200' }
      ],
      prompt: '💭 함께 온 길도 언젠가 갈라질까?'
    },
    {
      id: 'make_nest_poor',
      title: '가난한 집의 선택',
      text: `너는 가난한 집에 둥지를 틀었어.\n\n처마 밑에 조심스럽게.\n\n가족들이 반겨줘.\n\n"제비가 왔네! 복이 오겠어!"\n\n따뜻한 곳이야.`,
      bg: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '새 삶을 시작한다', to: 'new_life', cls: 'bg-green-200' }
      ],
      prompt: '💭 선택한 곳이 나를 만들까?'
    },
    {
      id: 'stay_together',
      title: '형제의 사랑',
      text: `형제들이 함께 있기로 했어.\n\n"우리 헤어지지 말자!"\n\n모두 동의했어.\n\n사이좋은 형제들.\n\n이게 행복이야.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '함께 날기를 배운다', to: 'learn_flying', cls: 'bg-blue-200' }
      ],
      prompt: '💭 형제의 사랑이 가장 큰 재산일까?'
    },
    {
      id: 'become_helper',
      title: '돕는 자의 기쁨',
      text: `너는 선행의 화신이 됐어.\n\n모든 이를 도와.\n\n약한 제비,\n\n어린 제비,\n\n다친 제비.\n\n"돕는 게 기쁨이야."`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '세상으로 나간다', to: 'go_world', cls: 'bg-blue-200' }
      ],
      prompt: '💭 나의 존재 이유는 무엇일까?'
    },
    {
      id: 'go_together',
      title: '형제의 작별',
      text: `형제들이 함께 세상으로 나갔어.\n\n각자의 길을 찾아.\n\n"잘 지내!"\n\n"너도!"\n\n작별 인사를 나눴어.`,
      bg: 'https://images.unsplash.com/photo-1444465146604-4fe67bfac6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FsbG93JTIwYmlyZHxlbnwxfHx8fDE3NjM1NTc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '내 길을 간다', to: 'my_way', cls: 'bg-blue-200' }
      ],
      prompt: '💭 작별도 사랑의 한 형태일까?'
    },
    {
      id: 'separate_ways',
      title: '형제의 다른 선택',
      text: `형제들이 각자의 길을 택했어.\n\n큰형은 부자 집으로,\n\n둘째형은 다른 마을로.\n\n너는...\n\n가난한 집으로.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '가난한 집으로 간다', to: 'visit_poor', cls: 'bg-blue-200' }
      ],
      prompt: '💭 다른 선택이 다른 운명을 만들까?'
    },
    {
      id: 'new_life',
      title: '착한 사람들과의 새 삶',
      text: `네 새로운 삶이 시작됐어.\n\n가난하지만 따뜻한 집.\n\n착하지만 가난한 사람들.\n\n너는 이 집을 사랑하게 됐어.\n\n하지만 겨울이 다가오면 따뜻한 남쪽으로 가야 해.\n\n너는 다짐했어.\n\n'다음 봄에 꼭 돌아올게!'`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '다음 봄으로', to: 'ending', cls: 'bg-green-200' }
      ],
      prompt: '💭 선택한 삶이 진정한 나를 만들까?'
    },
    {
      id: 'my_way',
      title: '착한 마음의 인도',
      text: `너는 자신의 길을 갔어.\n\n착한 마음을 가지고.\n\n마을이 보여.\n\n"저기다."\n\n가난한 집이 보여.\n\n따뜻한 빛이 새어 나와.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '그 집으로 간다', to: 'visit_poor', cls: 'bg-blue-200' }
      ],
      prompt: '💭 내 마음이 이끄는 곳이 운명일까?'
    },
    {
      id: 'ending',
      title: '권선징악의 시작',
      text: `어느 날,\n지붕을 고치던 사람이 실수로 네 둥지를 건드렸어.\n\n너는 균형을 잃고 땅으로 떨어져.\n다리가 부러졌어!\n\n하지만 너는 알고 있어.\n\n착하게 산 보람이 있을 거라고.\n이 집 주인도 착한 사람이니까.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '🔄 처음부터 다시', to: 'start', cls: 'bg-purple-600' }
      ],
      prompt: `📚《흥부전》을 읽어보면,\n가난하지만 착한 흥부와 부유하지만 욕심 많은 놀부의 형제 이야기,\n\n그리고 선행에는 복이 따르고\n악행에는 벌이 따른다는 권선징악의 교훈을 만날 수 있어!\n\n직접 읽어보며 감동을 느껴보자! 🐦✨`
    }
  ];
}

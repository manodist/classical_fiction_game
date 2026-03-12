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

export function generateSeosaMugaStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '마을에 드리운 그림자',
      text: `${name.full}.\n\n너는 고려 시대 한 마을에 사는 아이야.\n\n요즘 마을이 이상해.\n\n밤마다 김씨 댁에서 이상한 소리가 들려.\n\n"으드득... 드드득..."\n\n집 안 물건들이 절로 움직이고, 가족들이 병들어가.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '무서워서 피한다', to: 'avoid_house', cls: 'bg-gray-200' },
        { label: '궁금해서 가까이 간다', to: 'approach_house', cls: 'bg-blue-200' }
      ],
      prompt: '💭 두려운 것에 다가갈 용기를 낼 수 있을까?'
    },
    {
      id: 'avoid_house',
      title: '피할 수 없는 운명',
      text: `너는 김씨 댁을 피해 다녔어.\n\n하지만 며칠 후, 네 집에도 이상한 일이 생겼어.\n\n밤마다 문이 저절로 열리고, 찬장에서 그릇이 떨어져.\n\n"이러다간 우리 집도..."\n\n엄마가 걱정하셨어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '도움을 구하러 간다', to: 'seek_help', cls: 'bg-blue-200' },
        { label: '혼자 해결하려 한다', to: 'try_alone', cls: 'bg-green-200' }
      ],
      prompt: '💭 문제를 혼자 해결할 것인가, 도움을 청할 것인가?'
    },
    {
      id: 'approach_house',
      title: '전통의 힘',
      text: `김씨 댁 울타리 너머를 봤어.\n\n집 위로 검은 기운이 어른거려.\n\n그때, 마을 무당이 나타났어.\n\n"그 집엔 악귀들이 들었구나. 사자 도령들이라고도 하지."\n\n무당이 장구를 치며 노래를 부르기 시작했어.\n\n신기하게도 검은 기운이 약해져.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '무당에게 다가간다', to: 'meet_mudang', cls: 'bg-blue-200' },
        { label: '멀리서 지켜본다', to: 'watch_far', cls: 'bg-green-200' }
      ],
      prompt: '💭 신비한 힘을 가진 사람에게 배울 수 있을까?'
    },
    {
      id: 'seek_help',
      title: '신과 통하는 재능',
      text: `너는 마을 무당을 찾아갔어.\n\n\"할머니, 우리 집을 도와주세요!"\n\n무당이 네 눈을 들여다봤어.\n\n\"네게서 빛이 보이는구나."\n\n\"신과 통할 수 있는 기운이야."\n\n\"내 제자가 되어볼래?"`,
      bg: 'https://images.unsplash.com/photo-1757825715704-1f2bf22d5f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzaGFtYW4lMjBy잇1YWwlMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NjM1NjEyODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '제자가 되겠다고 한다', to: 'become_disciple', cls: 'bg-blue-200' },
        { label: '망설인다', to: 'hesitate', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 특별한 능력은 선택인가, 운명인가?'
    },
    {
      id: 'try_alone',
      title: '함께의 힘',
      text: `너는 악귀를 쫓으려 했어.\n\n"저리 가! 썩 물러가!"\n\n하지만 아무 일도 일어나지 않았어.\n\n오히려 검은 기운이 더 짙어져.\n\n엄마가 말씀하셨어.\n\n"무당을 불러야겠구나."`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '무당을 부른다', to: 'seek_help', cls: 'bg-blue-200' }
      ],
      prompt: '💭 때로는 인정하는 것도 용기일까?'
    },
    {
      id: 'meet_mudang',
      title: '서사무가의 세계',
      text: `"할머니, 방금 부른 노래가 뭐예요?"\n\n무당이 미소 지었어.\n\n"이건 서사무가란다."\n\n"신을 부르는 이야기 노래지."\n(옛날에 무당들이 부르는 가요 같은거야) \n\n네 눈이 반짝였어.`,
      bg: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '배우고 싶다고 한다', to: 'want_learn', cls: 'bg-blue-200' },
        { label: '더 물어본다', to: 'ask_more', cls: 'bg-green-200' }
      ],
      prompt: '💭 전통은 낡은 것일까, 소중한 유산일까?'
    },
    {
      id: 'watch_far',
      title: '전통문화의 힘',
      text: `무당의 노래가 마을에 울려 퍼졌어.\n\n장구 소리에 맞춰 춤을 춰.\n(마치 요즘 아이돌처럼!)\n\n검은 기운이 점점 사라져.\n\n"저게 신의 힘인가...?"\n\n너는 감탄했어.`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무당에게 다가간다', to: 'meet_mudang', cls: 'bg-blue-200' },
        { label: '집으로 돌아간다', to: 'go_home', cls: 'bg-gray-200' }
      ],
      prompt: '💭 기회는 스스로 는 것일까?'
    },
    {
      id: 'hesitate',
      title: '재능과 책임',
      text: `"무당이 되면... 평범하게 못 살잖아요."\n\n할머니가 고개를 끄덕였어.\n\n"그래, 쉬운 길은 아니지."\n\n"하지만 많은 사람을 도울 수 있어."\n\n"신과 사람을 잇는 일이란다."\n\n너는 생각에 잠겼어.`,
      bg: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '용기를 내어 받아들인다', to: 'become_disciple', cls: 'bg-blue-200' },
        { label: '정중히 거절한다', to: 'decline', cls: 'bg-gray-200' }
      ],
      prompt: '💭 남다른 재능에는 책임이 따를까?'
    },
    {
      id: 'become_disciple',
      title: '전통의 계승',
      text: `"제자가 되겠습니다!"\n\n무당이 기뻐했어.\n\n\"좋아. 먼저 서사무가를 배우자."\n\n\"신을 부르는 노래야."\n\n할머니가 장구를 건넸어.\n\n"자, 이 박자를 따라 해봐. 쿵-따-쿵-따-쿵!"`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '열심히 연습한다', to: 'practice_hard', cls: 'bg-blue-200' },
        { label: '어려워한다', to: 'find_hard', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 새로운 것을 배우는 것은 즐거움일까, 고통일까?'
    },
    {
      id: 'want_learn',
      title: '배움의 시작',
      text: `"저도 배울 수 있나요?"\n\n무당이 네 얼굴을 살폈어.\n\n"네게 신의 기운이 보이는구나."\n\n"좋아, 가르쳐주마."\n\n"먼저 장구 치는 법부터!"\n\n쿵-따-쿵-따! 박자가 마음에 들었어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '신나게 배운다', to: 'practice_hard', cls: 'bg-blue-200' },
        { label: '천천히 배운다', to: 'learn_slowly', cls: 'bg-green-200' }
      ],
      prompt: '💭 배움의 속도보다 중요한 것은 무엇일까?'
    },
    {
      id: 'ask_more',
      title: '집을 지키는 신들',
      text: `"서사무가로 뭘 할 수 있어요?"\n\n"악귀를 물리치고, 착한 신들을 부르고, 집을 지켜주지."\n\n"집에는 신들이 사신단다."\n\n"황우양씨, 막막부인, 일곱 형제..."\n\n너는 놀랐어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '집지킴 신에 대해 묻는다', to: 'ask_gods', cls: 'bg-blue-200' },
        { label: '배우고 싶다고 한다', to: 'want_learn', cls: 'bg-green-200' }
      ],
      prompt: '💭 눈에 보이지 않는 것도 존재할 수 있을까?'
    },
    {
      id: 'go_home',
      title: '잊을 수 없는 광경',
      text: `집으로 돌아왔지만, 무당의 노래가 귓가에 맴돌아.\n\n"쿵-따-쿵-따..."\n\n며칠 후, 네 집에도 악귀가 나타났어.\n\n이번엔 피할 수 없어.\n\n너는 무당을 찾아갔어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '도움을 청한다', to: 'seek_help', cls: 'bg-blue-200' }
      ],
      prompt: '💭 운명은 돌고 도는 것일까?'
    },
    {
      id: 'decline',
      title: '평범한 삶의 선택',
      text: `"죄송하지만... 저는 평범하게 살고 싶어요."\n\n무당이 이해한다는 듯 고개를 끄덕였어.\n\n"그래, 네 선택이다."\n\n하지만 집의 악귀는 사라지지 않았어.\n\n결국 무당의 도움을 받아야 했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '다시 생각한다', to: 'become_disciple', cls: 'bg-blue-200' }
      ],
      prompt: '💭 선택은 언제든 바꿀 수 있을까?'
    },
    {
      id: 'practice_hard',
      title: '악귀 사냥꾼 훈련',
      text: `쿵-따-쿵-따!\n\n너는 온 힘을 다해 노래를 불렀어.\n\n"황우양씨여, 오셔서~ 이 집을 지켜주소서~"\n\n장구도 치고, 춤도 추고, 노래도 불러.\n\n음색이 점점 좋아져.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '더 배운다', to: 'learn_more', cls: 'bg-blue-200' },
        { label: '동료를 만나러 간다', to: 'meet_companions', cls: 'bg-green-200' }
      ],
      prompt: '💭 전통 문화도 재미있게 배울 수 있을까?'
    },
    {
      id: 'find_hard',
      title: '성장의 과정',
      text: `"으... 어려워요."\n\n손이 아프고, 목도 쉬었어.\n\n"처음엔 다 그래."\n\n할머니가 격려했어.\n\n"천천히, 하나씩."\n\n조금씩 박자를 익혀갔어. 며칠 후, 드디어 완성!`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 연습한다', to: 'learn_more', cls: 'bg-blue-200' }
      ],
      prompt: '💭 어려움을 극복하는 과정이 성장일까?'
    },
    {
      id: 'learn_slowly',
      title: '차근차근 배움',
      text: `너는 천천히, 확실하게 배웠어.\n\n하나하나 음을 외우고, 노래 가사를 익혔어.\n\n"급할 것 없다."\n\n할머니가 말씀하셨어.\n\n"제대로 배우는 게 중요하지."\n\n시간이 지나자 자신감이 생겼어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '다음 단계로 간다', to: 'learn_more', cls: 'bg-blue-200' }
      ],
      prompt: '💭 느려도 꾸준하면 언젠가 도착할까?'
    },
    {
      id: 'ask_gods',
      title: '집의 소중함',
      text: `"집에 신이 산다고요?"\n\n"그럼. 황우양씨는 터를 지키고, 막막부인은 집터를 보살피고, 일곱 형제는 대문을 지키지."\n\n"우리 눈엔 안 보이지만, 늘 집을 지켜주신단다."\n\n너는 신기했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '더 자세히 듣는다', to: 'learn_gods', cls: 'bg-blue-200' },
        { label: '배우고 싶다고 한다', to: 'want_learn', cls: 'bg-green-200' }
      ],
      prompt: '💭 집은 단순한 건물일까, 신이 지키는 공간일까?'
    },
    {
      id: 'learn_more',
      title: '집지킴 신 부르는 노래',
      text: `"이제 집지킴 신을 부르는 법을 배우자."\n\n할머니가 노래를 불렀어.\n\n"황우양씨여~ 막막부인이여~ 이 집을 지켜주소서~"\n\n춤을 추며 장구를 쳤어. 마치 멋진 공연 같아!`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '따라 부른다', to: 'sing_along', cls: 'bg-blue-200' },
        { label: '신들에 대해 묻는다', to: 'learn_gods', cls: 'bg-green-200' }
      ],
      prompt: '💭 노래로 신을 부를 수 있을까?'
    },
    {
      id: 'learn_gods',
      title: '신에 대한 이해',
      text: `"황우양씨는 땅의 신이야. 터를 다져주시지.\n\n막막부인은 집을 세울 때, 나무와 흙의 이치를 알려주셔.\n\n일곱 형제는 문을 지키며, 악귀가 못 들어오게 해."\n\n"우리 조상들의 지혜란다."`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '감동받는다', to: 'feel_moved', cls: 'bg-blue-200' },
        { label: '노래를 배운다', to: 'sing_along', cls: 'bg-green-200' }
      ],
      prompt: '💭 조상들의 지혜를 이어받는 것이 왜 중요할까?'
    },
    {
      id: 'sing_along',
      title: '신을 부르는 목소리',
      text: `"황우양씨여~ 막막부인이여~"\n\n너는 온 힘을 다해 불렀어.\n\n장구를 치고, 춤을 추며!\n\n신기하게도, 주변에 따뜻한 기운이 느껴져.\n\n"신들이 응답하시는구나!" 할머니가 기뻐했어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '더 열심히 부른다', to: 'sing_harder', cls: 'bg-blue-200' },
        { label: '동료를 만나러 간다', to: 'meet_companions', cls: 'bg-green-200' }
      ],
      prompt: '💭 진심은 하늘도 감동시킬까?'
    },
    {
      id: 'feel_moved',
      title: '전통문화의 가치',
      text: `"우리 조상들은 정말 지혜로웠구나..."\n\n너는 감탄했어.\n\n집을 지키는 신들, 그들을 부르는 노래, 모두 의미가 있었어.\n\n"이제 이해가 돼요!"\n\n할머니가 미소 지었어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '서사무가를 배운다', to: 'sing_along', cls: 'bg-blue-200' },
        { label: '동료를 만나러 간다', to: 'meet_companions', cls: 'bg-green-200' }
      ],
      prompt: '💭 전통을 배우는 것이 나를 성장시킬까?'
    },
    {
      id: 'sing_harder',
      title: '신들의 강림',
      text: `목청껏 불렀어!\n\n"황우양씨여! 막막부인이여! 일곱 형제여! 오소서!"\n\n갑자기 주변이 밝아져.\n\n따뜻한 빛이 내려와.\n\n"신들이 오셨다!" 할머니가 외쳤어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '신들께 인사한다', to: 'greet_gods', cls: 'bg-blue-200' },
        { label: '동료를 만나러 간다', to: 'meet_companions', cls: 'bg-green-200' }
      ],
      prompt: '💭 진심 어린 노래는 신도 감동시킬까?'
    },
    {
      id: 'greet_gods',
      title: '신과의 교감',
      text: `"황우양씨님, 막막부인님, 일곱 형제님, 감사합니다!"\n\n너는 정중히 절했어.\n\n따뜻한 바람이 불어와.\n\n마치 신들이 대답하는 것 같아.\n\n"이제 동료를 만날 시간이구나." 할머니가 말했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '동료를 만나러 간다', to: 'meet_companions', cls: 'bg-blue-200' }
      ],
      prompt: '💭 예의와 존중은 신에게도 중요할까?'
    },
    {
      id: 'meet_companions',
      title: '세 명의 만남',
      text: `마을 광장에 두 명의 아이가 더 있었어.\n\n한 명은 까칠한 성격이고, 다른 한 명은 밝고 명랑해.\n\n"너희도 신의 기운을 가졌구나."\n\n할머니가 말했어.\n\n"너희 셋이 함께하면 완벽한 동료가 될 거야!"`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '인사를 나눈다', to: 'greet_team', cls: 'bg-blue-200' },
        { label: '서로를 살핀다', to: 'observe_team', cls: 'bg-green-200' }
      ],
      prompt: '💭 성격이 다른 사람들이 함께할 수 있을까?'
    },
    {
      id: 'greet_team',
      title: '함께의 시작',
      text: `"안녕! 나는 ${name.first}!"\n\n"반가워! 내 이름은 조희야."\n밝은 아이가 활짝 웃었어.\n\n"미란"\n까칠해 보이는 아이가 팔짱을 끼고 말했어.\n\n"우리 셋이서 서사무가 악귀 사냥꾼이다!"\n조희가 외쳤어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '함께 훈련한다', to: 'train_together', cls: 'bg-blue-200' },
        { label: '각자의 강점을 묻는다', to: 'ask_strengths', cls: 'bg-green-200' }
      ],
      prompt: '💭 함께하는 것이 혼자보다 더 강할까?'
    },
    {
      id: 'observe_team',
      title: '서로 다른 강점',
      text: `조희는 귀엽고 장구를 엄청 빠르게 쳐.\n\n미란은 춤을 멋지게 추지만 성격은 냉정해.\n\n그리고 너는 노래를 아름답게 불러.\n\n"모두 다르지만, 그래서 완벽해!" 할머니가 웃었어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '함께 훈련한다', to: 'train_together', cls: 'bg-blue-200' }
      ],
      prompt: '💭 다양성이 조합이 더 강하게 만들까?'
    },
    {
      id: 'ask_strengths',
      title: '각자의 역할',
      text: `"조희는 장구로 박자를 맞추고,\n미란은 춤으로 기운을 모으고,\n${name.first}, 너는 노래로 신들을 부르는구나."\n\n할머니가 설명했어.\n\n"세 명이 합치면 엄청난 힘이 될 거야."\n\n너희는 서로를 바라봤어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '함께 훈련한다', to: 'train_together', cls: 'bg-blue-200' }
      ],
      prompt: '💭 각자의 역할이 모여 큰 힘이 될까?'
    },
    {
      id: 'train_together',
      title: '협동 훈련',
      text: `쿵-따-쿵-따!\n\n조희가 장구를 치고, 너는 노래하고, 미란은 춤을 춰.\n\n"황우양씨여~ 막막부인이여~"\n\n셋의 소리가 하나로 어우러져.\n\n할머니가 박수를 쳤어.\n"완벽해!"`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '더 연습한다', to: 'practice_team', cls: 'bg-blue-200' },
        { label: '숙소로 간다', to: 'go_home_together', cls: 'bg-green-200' }
      ],
      prompt: '💭 조화로운 조 구성의 비결은 무엇일까?'
    },
    {
      id: 'practice_team',
      title: '공든탑이 무너지랴',
      text: `"이제 '공든'이라는 신곡을 배워보자!"\n\n할머니가 새로운 노래를 가르쳐줬어.\n\n"어두워진, 하\n앞길 속에, 아\n영원히 깨질 수 없는\n공든 마음이 신을 부르네~\n함께 부르면 두렵지 않아~\n우리의 노래가 집을 지키네~"\n\n셋이 함께 불렀어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '노래를 익힌다', to: 'learn_gongdeun', cls: 'bg-blue-200' },
        { label: '숙소로 간다', to: 'go_home_together', cls: 'bg-green-200' }
      ],
      prompt: '💭 공들인 노력이 결실을 맺을까?'
    },
    {
      id: 'learn_gongdeun',
      title: '공든 노래의 의미',
      text: `"공든이라는 신곡은 특별해."\n\n할머니가 설명했어.\n\n"공을 들여 집을 지키고, 신을 모시는 마음을 담았지."\n\n너희 셋은 온 마음을 다해 연습했어.\n\n점점 더 좋아졌어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '숙소로 간다', to: 'go_home_together', cls: 'bg-blue-200' }
      ],
      prompt: '💭 전통을 지키는 노력의 가치는 무엇일까?'
    },
    {
      id: 'go_home_together',
      title: '악귀 사냥꾼들의 집',
      text: `할머니가 마련해준 작은 한옥.\n\n"여기서 함께 살며 수련하렴."\n\n셋이서 함께 살 집이야.\n\n"우리만의 집이다!" 조희가 신나했어.\n\n미란도 작게 미소 지었어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '집을 둘러본다', to: 'explore_house', cls: 'bg-blue-200' },
        { label: '함께 저녁을 먹는다', to: 'dinner_together', cls: 'bg-green-200' }
      ],
      prompt: '💭 집은 어떤 의미일까?'
    },
    {
      id: 'explore_house',
      title: '우리 집의 소중함',
      text: `마루, 부엌, 방 세 개.\n\n"각자 방이 있네!" 조희가 좋아했어.\n\n"근데 우리 집에도 집지킴 신이 계실까?" 미란이 물었어.\n\n"당연하지! 우리가 모셔야지!" 너는 대답했어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '집지킴 신을 모신다', to: 'worship_house_gods', cls: 'bg-blue-200' },
        { label: '함께 저녁을 먹는다', to: 'dinner_together', cls: 'bg-green-200' }
      ],
      prompt: '💭 집이 안전하고 따뜻한 공간이 되려면?'
    },
    {
      id: 'worship_house_gods',
      title: '집에 깃든 신들',
      text: `셋이서 함께 서사무가를 불렀어.\n\n"황우양씨여, 막막부인이여, 일곱 형제여, 이 집을 지켜주소서!"\n\n따뜻한 기운이 집안에 가득했어.\n\n"이제 우리 집도 안전해!" 조희가 웃었어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '함께 저녁을 먹는다', to: 'dinner_together', cls: 'bg-blue-200' }
      ],
      prompt: '💭 집을 소중히 여기는 마음이 왜 중요할까?'
    },
    {
      id: 'dinner_together',
      title: '가족처럼',
      text: `부엌에서 함께 밥을 지었어.\n\n조희는 아궁이에 불을 지피고, 미란은 날렵한 칼솜씨로 채소를 썰고, 너는 상을 차렸어.\n\n"우리 가족 같다!" 조희가 말했어.\n\n"...그래." 미란이 작게 웃었어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '야기를 나눈다', to: 'share_stories', cls: 'bg-blue-200' },
        { label: '내일 훈련을 준비한다', to: 'prepare_mission', cls: 'bg-green-200' }
      ],
      prompt: '💭 함께 사는 것이 가족이 되는 것일까?'
    },
    {
      id: 'share_stories',
      title: '서로를 이해하기',
      text: `조희는 밝지만 외로웠대.\n\n미란은 까칠하지만 사실은 따뜻한 마음을 가졌어.\n\n너도 네 이야기를 했어.\n\n"우리 다 다르지만, 그래서 더 좋아." 미란이 말했어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '내일 훈련을 준비한다', to: 'prepare_mission', cls: 'bg-blue-200' }
      ],
      prompt: '💭 차이를 인정하는 것이 진정한 이해일까?'
    },
    {
      id: 'prepare_mission',
      title: '첫 번째 의뢰',
      text: `다음 날 아침, 할머니가 찾아왔어.\n\n"박씨 댁에 소들이 이유도 없이 다 죽었다는구나.\n소 다 팍. 또 사자 도령들 짓이겠지."\n\n"너희 셋이 함께 가보렴."\n\n"드디어 우리 차례다!" \n조희가 주먹을 쥐었어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '박씨 댁으로 간다', to: 'go_park_house', cls: 'bg-blue-200' },
        { label: '더 연습하고 간다', to: 'practice_more', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 준비가 되지 않아도 도전해야 할 때가 있을까?'
    },
    {
      id: 'practice_more',
      title: '완벽한 조화',
      text: `"우리 한 번 더 연습하자!"\n\n셋이서 '공든' 노래를 불렀어.\n\n조희의 장구, 너의 노래, 미란의 춤.\n\n완벽한 조화였어.\n\n"이제 됐어." 미란이 자신감 있게 말했어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '박씨 댁으로 간다', to: 'go_park_house', cls: 'bg-blue-200' }
      ],
      prompt: '💭 완벽한 준비는 가능할까?'
    },
    {
      id: 'go_park_house',
      title: '악귀가 들린 집',
      text: `박씨 댁에 도착했어.\n\n집 위로 검은 기운이 소용돌이쳐.\n\n"으드득... 드드득..."\n\n가족들이 겁에 질려 있어.\n\n"악귀 사냥꾼들 출동!" 조희가 외쳤어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '바로 공연을 시작한다', to: 'start_performance', cls: 'bg-blue-200' },
        { label: '먼저 집을 살핀다', to: 'check_house', cls: 'bg-green-200' }
      ],
      prompt: '💭 용기는 두려움이 없는 것일까, 두려움을 이기는 것일까?'
    },
    {
      id: 'check_house',
      title: '집 상태 파악',
      text: `미란이 조용히 집을 살폈어.\n\n"대문이 삐걱거리고, 기둥이 기울어졌어."\n\n"집지킴 신들이 약해진 거야." 너는 말했어.\n\n"그럼 신들을 먼저 불러야겠네!" 조희가 장구를 꺼냈어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '공연을 시작한다', to: 'start_performance', cls: 'bg-blue-200' }
      ],
      prompt: '💭 문제의 원인을 파악하는 것이 먼저일까?'
    },
    {
      id: 'start_performance',
      title: '세 명의 조화',
      text: `쿵-따-쿵-따!\n\n조희가 장구를 치기 시작했어.\n\n너는 노래를 부르고, 미란은 춤을 춰.\n\n"황우양씨여~ 막막부인이여~ 일곱 형제여~"\n\n박력있는 칼군무야!`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '공든 노래를 부른다', to: 'sing_gongdeun', cls: 'bg-blue-200' },
        { label: '집지킴 신을 부른다', to: 'call_house_gods', cls: 'bg-green-200' }
      ],
      prompt: '💭 노래와 춤이 진짜 힘이 될 수 있을까?'
    },
    {
      id: 'sing_gongdeun',
      title: '공든 노래의 힘',
      text: `"어두워진, 하\n앞길 속에, 아\n영원히 깨질 수 없는\n공든 마음이 신을 부르네~\n함께 부르면 두렵지 않아~\n우리의 노래가 집을 지키네~"\n\n셋의 목소리가 하나가 됐어.\n\n검은 기운이 흔들려.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 부른다', to: 'continue_singing', cls: 'bg-blue-200' },
        { label: '집지킴 신을 부른다', to: 'call_house_gods', cls: 'bg-green-200' }
      ],
      prompt: '💭 공들인 노력이 기적을 만들까?'
    },
    {
      id: 'call_house_gods',
      title: '집지킴 신들이여!',
      text: `"황우양씨여! 이 터를 다져주소서!"\n\n"막막부인이여! 이 집을 보살펴주소서!"\n\n"일곱 형제여! 대문을 지켜주소서!"\n\n셋이 함께 외쳤어.\n\n집이 빛나기 시작했어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '악귀를 쫓는다', to: 'chase_demon', cls: 'bg-blue-200' },
        { label: '신들과 함께 싸운다', to: 'fight_together', cls: 'bg-green-200' }
      ],
      prompt: '💭 함께하면 더 강해질 수 있을까?'
    },
    {
      id: 'continue_singing',
      title: '악귀와의 대결',
      text: `노래를 계속 불렀어!\n\n조희의 장구가 더 빨라지고,\n네 목소리가 높아지고,\n미란의 춤이 격렬해져.\n\n"크아악!" 악귀가 비명을 질러.\n\n검은 기운이 점점 약해져.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '마지막 일격을 날린다', to: 'final_blow', cls: 'bg-blue-200' },
        { label: '신들께 도움을 청한다', to: 'ask_gods_help', cls: 'bg-green-200' }
      ],
      prompt: '💭 선은 악을 이길 수 있을까?'
    },
    {
      id: 'chase_demon',
      title: '악귀 퇴치',
      text: `셋이 함께 악귀를 쫓았어!\n\n조희가 장구를 치고, 너는 노래하고, 미란은 춤을 춰.\n\n"물러가라! 이 집을 떠나라!"\n\n"일곱 형제여! 문을 닫아주소서!"\n\n대문이 닫히며 악귀를 가뒀어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '마지막 일격을 날린다', to: 'final_blow', cls: 'bg-blue-200' },
        { label: '신들께 도움을 청한다', to: 'ask_gods_help', cls: 'bg-green-200' }
      ],
      prompt: '💭 끝까지 책임지는 것이 진정한 용기일까?'
    },
    {
      id: 'fight_together',
      title: '신과 인간의 협력',
      text: `너희가 노래하니, 신들이 힘을 보태줬어.\n\n황우양씨가 땅을 단단히 하고, 막막부인이 집을 보호하고, 일곱 형제가 악귀를 막았어.\n\n"우와, 완벽한 조화!" 조희가 외쳤어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '승리를 확인한다', to: 'victory', cls: 'bg-blue-200' }
      ],
      prompt: '💭 혼자보다 함께가 더 강할까?'
    },
    {
      id: 'final_blow',
      title: '승리의 노래',
      text: `마지막 노래를 불렀어!\n\n"물러가라, 악귀여! 이 집은 신들이 지키신다!"\n\n쿵-따-쿵-따!\n\n셋의 소리가 완벽하게 조화를 이뤘어.\n\n검은 기운이 완전히 사라졌어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '성공을 기뻐한다', to: 'celebrate', cls: 'bg-blue-200' }
      ],
      prompt: '💭 노래의 힘은 어디서 나올까?'
    },
    {
      id: 'ask_gods_help',
      title: '신들의 도움',
      text: `"신들이시여! 도와주소서!"\n\n셋이 함께 외쳤어.\n\n갑자기 강한 빛이 쏟아져.\n\n황우양씨, 막막부인, 일곱 형제!\n\n모두가 함께 악귀를 막아줬어. "크아악!" 악귀가 사라졌어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '신들께 감사한다', to: 'thank_gods', cls: 'bg-blue-200' }
      ],
      prompt: '💭 도움을 청하는 것도 용기일까?'
    },
    {
      id: 'final_song',
      title: '평화의 노래',
      text: `마지막으로 평화의 노래를 불렀어.\n\n"이 집에 평화가 깃들기를, 신들이 지켜주시기를, 가족이 행복하기를!"\n\n셋의 목소리가 아름답게 울렸어.\n\n집 전체가 따뜻한 빛으로 가득해졌어.`,
      bg: 'https://images.unsplash.com/photo-1604330279560-3c7a186beb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGRydW0lMjBqYW5nZ3V8ZW58MXx8fHwxNzYzNTYxNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '임무 완료', to: 'victory', cls: 'bg-blue-200' }
      ],
      prompt: '💭 진심 어린 기원은 이루어질까?'
    },
    {
      id: 'victory',
      title: '전통의 승리',
      text: `완벽한 승리였어!\n\n악귀는 사라지고, 집지킴 신들은 강해졌어.\n\n박씨 댁이 평화로워졌어.\n\n"우리 해냈어!" 셋이 손을 높게 들어 마주쳤어.\n\n"서사무가의 힘이구나..." 미란이 감탄했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '기뻐하며 돌아간다', to: 'celebrate', cls: 'bg-blue-200' }
      ],
      prompt: '💭 전통의 힘은 여전히 유효할까?'
    },
    {
      id: 'celebrate',
      title: '첫 성공의 기쁨',
      text: `"해냈어요!" 셋이 함께 외쳤어.\n\n박씨 댁 가족들이 감사했어.\n\n"정말 고맙습니다!"\n\n할머니가 자랑스럽게 웃었어.\n\n"잘했어. 훌륭한 서사무가 악귀 사냥꾼들이구나!"`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-blue-200' },
        { label: '더 많이 배운다', to: 'learn_deeper', cls: 'bg-green-200' }
      ],
      prompt: '💭 성공의 기쁨이 더 배우게 만들까?'
    },
    {
      id: 'thank_gods',
      title: '감사의 마음',
      text: `"황우양씨님, 막막부인님, 일곱 형제님, 감사합니다!"\n\n셋이 함께 절했어.\n\n따뜻한 빛이 너희를 감쌌어.\n\n신들의 축복이야.\n\n박씨 댁 가족들도 함께 절했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '성공을 자축한다', to: 'celebrate', cls: 'bg-blue-200' }
      ],
      prompt: '💭 감사하는 마음이 더 큰 축복을 부를까?'
    },
    {
      id: 'return_home',
      title: '우리 집으로',
      text: `셋이 함께 숙소로 돌아왔어.\n\n"오늘 정말 멋졌어!" 조희가 웃었어.\n\n"우리 완벽한 조합이야." 미란이 말했어.\n\n"응, 우리는 가족이야!" 너는 대답했어.\n\n따뜻한 집이 너희를 반겼어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '함께 저녁을 먹는다', to: 'celebrate_dinner', cls: 'bg-blue-200' },
        { label: '다음 의뢰를 기다린다', to: 'next_mission', cls: 'bg-green-200' }
      ],
      prompt: '💭 집이 단순한 건물 이상의 의미를 가질까?'
    },
    {
      id: 'celebrate_dinner',
      title: '가족의 식탁',
      text: `셋이 함께 밥을 지어 먹었어.\n\n"우리 협동심 짱이다!" 조희가 밥을 퍼 주었어.\n\n"내일도 힘내자." 미란이 웃었어.\n\n너희는 서로를 바라보며 웃었어.\n\n집이 더 따뜻해진 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '다음 의뢰를 기다린다', to: 'next_mission', cls: 'bg-blue-200' }
      ],
      prompt: '💭 함께 밥 먹는 것이 가족이 되는 과정일까?'
    },
    {
      id: 'learn_deeper',
      title: '전통문화의 깊이',
      text: `"할머니, 더 배우고 싶어요!" 셋이 말했어.\n\n"그래, 좋아."\n\n"집지킴 신 말고도, 조상신, 산신, 용왕 등 많은 신들이 계시지."\n\n"우리 조상들의 지혜는 정말 대단해." 미란이 감탄했어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '열심히 배운다', to: 'become_masters', cls: 'bg-blue-200' }
      ],
      prompt: '💭 배움에는 끝이 있을까?'
    },
    {
      id: 'next_mission',
      title: '다음 의뢰',
      text: `며칠 후, 또 다른 집에서 도움을 청했어.\n\n"이번엔 조상신을 모셔야 한대."\n\n"우리가 할 수 있어!" 조희가 자신 있게 말했어.\n\n"함께라면 뭐든 할 수 있어." 미란도 동의했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '새 의뢰에 도전한다', to: 'become_masters', cls: 'bg-blue-200' }
      ],
      prompt: '💭 경험은 자신감을 만들까?'
    },
    {
      id: 'become_masters',
      title: '서사무가의 전승',
      text: `시간이 흘렀어.\n\n너희 셋은 훌륭한 서사무가 악귀 사냥꾼들이 됐어.\n\n집집마다 서사무가를 불러주고,\n악귀를 물리치고,\n신들을 모셨어.\n\n함께 살며 가족처럼 지냈어.\n\n전통을 지키는 세 명의 영웅!\n\n 언젠가 비슷한 이야기가\n전 세계에서 인기를 얻을 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '전통을 이어간다', to: 'ending', cls: 'bg-blue-200' }
      ],
      prompt: '💭 전통을 지키는 것이 나의 사명일까?'
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `자신들이 겪은 고난으로부터 사람들을 지켜주는 신들.\n\n《서사무가》책에는 여러 신들의 사연들이 <옴니버스> 형태로 각각 소개되어 있어.\n\n 1.집 지키는 황우양씨와 터 지키는 막막부인 이야기\n 2.집 지키는 일곱 형제 이야기\n 3.사마장자가 저승사자와 맞서는 이야기\n\n노래로 신을 부르고 악을 물리치는 것도\n모두의 마음을 하나로 모으는 우리 조상들의 지혜란다!\n\n📚 서점이나 도서관에서 《서사무가》를 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' }
      ],
      prompt: '《서사무가》 - 케이팝 데몬 헌터스처럼 노래와 춤으로 악귀를 물리치고 집을 지키는 신들을 부르는 우리 전통 문화! 신에 대한 이해, 집의 소중함, 전통문화 전승의 깊은 의미를 담은 이야기야!'
    }
  ];
}
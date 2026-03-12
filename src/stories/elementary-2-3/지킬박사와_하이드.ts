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

export function generateJekyllHydeStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '지킬 박사의 조수',
      text: `너의 이름은 ${name.full}.\n\n1880년대 런던.\n안개가 자욱한 거리.\n\n너는 존경받는 의사\n헨리 지킬 박사의 조수야.\n\n"지킬 것은 지켜야 한다!"\n\n이게 박사님의 입버릇이야.\n\n착하게, 예의 바르게,\n항상 규칙을 지키시지.`,
      bg: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '박사님은 좋은 분이다', to: 'good_doctor', cls: 'bg-blue-200' },
        { label: '박사님을 관찰한다', to: 'observe', cls: 'bg-purple-200' }
      ],
      prompt: '💭 규칙을 항상 지키는 사람 주변에 있어?'
    },
    {
      id: 'good_doctor',
      title: '착한 지킬 박사',
      text: `박사님은 정말 착한 분이야.\n\n가난한 사람들을 공짜로 치료하고,\n언제나 점잖게 말씀하시고,\n거짓말도 안 하시지.\n\n하지만...\n\n가끔 표정이 이상해.\n\n뭔가 참고 계신 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '어느 날 파티에 간다', to: 'party', cls: 'bg-blue-200' }
      ],
      prompt: '💭 착하게만 살면 힘들 때도 있을까?'
    },
    {
      id: 'observe',
      title: '박사님 관찰하기',
      text: `너는 박사님을 조심히 봤어.\n\n환자들에게는 항상 웃으시지만,\n혼자 계실 때는 한숨을 쉬셔.\n\n"지킬 것은 지켜야 해..."\n\n중얼거리시면서\n주먹을 꽉 쥐셔.\n\n뭔가 속상한 일이 있나 봐.`,
      bg: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '어느 날 파티에 간다', to: 'party', cls: 'bg-blue-200' }
      ],
      prompt: '💭 겉과 속이 다를 때가 있어?'
    },
    {
      id: 'party',
      title: '상류층 파티',
      text: `어느 날, 박사님과 파티에 갔어.\n\n멋진 저택, 비싼 옷을 입은 사람들.\n\n"지킬 박사, 당신은 참 훌륭해요!"\n\n모두 칭찬해.\n\n하지만 박사님이 떠나자\n사람들이 속삭여.\n\n"너무 착한 척하는 거 아냐?"\n"재미없는 사람이지 뭐."`,
      bg: 'https://images.unsplash.com/photo-1519167758481-83f29da8c8b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '기분이 나쁘다', to: 'feel_bad', cls: 'bg-red-200' },
        { label: '그냥 듣는다', to: 'just_listen', cls: 'bg-gray-200' }
      ],
      prompt: '💭 뒤에서 나쁜 말하는 사람들을 본 적 있어?'
    },
    {
      id: 'feel_bad',
      title: '위선적인 사람들',
      text: `너는 화가 났어.\n\n겉으로는 칭찬하면서\n뒤에서는 욕하다니!\n\n박사님한테 말씀드릴까?\n\n하지만 박사님도 들으신 것 같아.\n\n표정이 굳어 계셔.`,
      bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '집으로 돌아간다', to: 'go_home', cls: 'bg-blue-200' }
      ],
      prompt: '💭 위선적인 사람들을 보면 어떤 기분이 들어?'
    },
    {
      id: 'just_listen',
      title: '런던 사회의 진짜 모습',
      text: `너는 계속 들었어.\n\n"내 비밀만 안 들키면 돼!"\n"우리도 밤에는 재미있게 놀지~"\n\n겉으로는 점잖은 척하지만\n뒤에서는 나쁜 짓을 하는 사람들.\n\n박사님이 중얼거리셨어.\n\n"모두 거짓말쟁이들..."`,
      bg: 'https://images.unsplash.com/photo-1519167758481-83f29da8c8b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '집으로 돌아간다', to: 'go_home', cls: 'bg-blue-200' }
      ],
      prompt: '💭 모두가 거짓말쟁이 같으면 실망돼?'
    },
    {
      id: 'go_home',
      title: '박사님의 고민',
      text: `집으로 돌아오는 길.\n\n박사님이 말했어.\n\n"${name.first}, 착하게만 사는 게\n정말 옳은 걸까?"\n\n"...네?"\n\n"다른 사람들은 다\n하고 싶은 대로 하는데,\n나만 참고 지키고..."\n\n박사님이 이상해.`,
      bg: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '박사님을 위로한다', to: 'comfort', cls: 'bg-green-200' },
        { label: '걱정된다', to: 'worried', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 착한 사람만 손해 보는 것 같을 때 있어?'
    },
    {
      id: 'comfort',
      title: '위로의 말',
      text: `"박사님은 좋은 분이에요.\n\n다른 사람들이 뭐라 해도\n전 박사님을 존경해요!"\n\n박사님이 쓴웃음을 지으셨어.\n\n"고맙구나... 하지만...\n\n내 안에도 나쁜 마음이 있어.\n\n그걸 참는 게 너무 힘들어."`,
      bg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '며칠 후', to: 'days_later', cls: 'bg-purple-200' }
      ],
      prompt: '💭 나쁜 마음을 참는 게 힘들 때 있어?'
    },
    {
      id: 'worried',
      title: '불안한 느낌',
      text: `너는 걱정이 됐어.\n\n박사님 목소리가 이상해.\n\n평소에는 조용하고 차분하신데\n오늘은 뭔가 무서워.\n\n"박사님... 괜찮으세요?"\n\n"...괜찮아. 집에 가자."\n\n하지만 전혀 괜찮아 보이지 않아.`,
      bg: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '며칠 후', to: 'days_later', cls: 'bg-purple-200' }
      ],
      prompt: '💭 누군가 이상하게 행동하면 걱정돼?'
    },
    {
      id: 'days_later',
      title: '이상한 실험',
      text: `며칠 후.\n\n박사님이 실험실에 틀어박히셨어.\n\n밤낮으로 뭔가를 만드시더니\n\n초록색 액체를 완성하셨어.\n\n"드디어... 성공했어!"\n\n박사님 눈빛이 무서워.`,
      bg: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '뭘 만드는지 궁금하다', to: 'ask_what', cls: 'bg-blue-200' },
        { label: '조용히 지켜본다', to: 'watch_quiet', cls: 'bg-gray-200' }
      ],
      prompt: '💭 어른이 이상한 행동을 하면 물어봐야 할까?'
    },
    {
      id: 'ask_what',
      title: '선과 악을 나누는 약',
      text: `"박사님, 그게 뭐예요?"\n\n박사님이 말했어.\n\n"사람의 마음을 나누는 약이야."\n\n"마음을요?"\n\n"그래. 사람에게는\n착한 마음과 나쁜 마음이 섞여 있지.\n\n이 약을 마시면\n나쁜 마음을 따로 떼어낼 수 있어!"`,
      bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무서운 생각이다', to: 'scary_idea', cls: 'bg-red-200' },
        { label: '신기하다', to: 'amazing', cls: 'bg-blue-200' }
      ],
      prompt: '💭 착한 마음과 나쁜 마음을 나눌 수 있다면?'
    },
    {
      id: 'watch_quiet',
      title: '조용히 관찰',
      text: `너는 조용히 지켜봤어.\n\n박사님이 노트에 뭔가 적으셨어.\n\n"착한 지킬과 나쁜 하이드..."\n"이제 나는 자유로워질 거야!"\n\n무슨 뜻일까?\n\n뭔가 나쁜 일이 일어날 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1456613820599-bfe244172af5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '질문한다', to: 'ask_what', cls: 'bg-blue-200' },
        { label: '계속 지켜본다', to: 'keep_watching', cls: 'bg-gray-200' }
      ],
      prompt: '💭 이상한 일이 보이면 어떻게 해?'
    },
    {
      id: 'scary_idea',
      title: '위험한 실험',
      text: `"무... 무서운 것 같은데요?"\n\n박사님이 웃으셨어.\n\n"무서울 게 뭐 있니?\n\n나쁜 마음만 없애면\n나는 완벽하게 착한 사람이 돼!"\n\n"그럼 나쁜 마음은 어떻게 돼요?"\n\n"사라지겠지. 아니면..."\n\n말을 멈추셨어.`,
      bg: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 묻는다', to: 'ask_more', cls: 'bg-yellow-200' },
        { label: '무서워서 멈춘다', to: 'too_scared', cls: 'bg-red-200' }
      ],
      prompt: '💭 뭔가 위험해 보이면 말려야 할까?'
    },
    {
      id: 'amazing',
      title: '신기한 과학',
      text: `"우와! 그럼 모두 착해질 수 있어요?"\n\n박사님이 고개를 끄덕이셨어.\n\n"맞아! 과학의 힘으로\n인간을 개선하는 거야!"\n\n하지만...\n\n박사님 표정이 이상해.\n\n너무 흥분하신 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '박사님을 돕고 싶다', to: 'want_help', cls: 'bg-green-200' },
        { label: '조금 걱정된다', to: 'bit_worried', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 좋은 일 같지만 이상한 느낌 들 때 있어?'
    },
    {
      id: 'ask_more',
      title: '나쁜 마음의 행방',
      text: `"박사님, 나쁜 마음이 분리되면\n그것도 생명이 있는 거 아닌가요?"\n\n박사님이 멈췄어.\n\n"...그건 통제할 수 있어."\n\n"하지만 만약 통제가 안 되면?"\n\n"안 돼! 과학적으로 완벽해!"\n\n박사님이 화를 내셨어.`,
      bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '며칠이 지난다', to: 'experiment_day', cls: 'bg-purple-200' }
      ],
      prompt: '💭 옳은 질문을 했는데 화를 내면 어떻게 해?'
    },
    {
      id: 'too_scared',
      title: '두려움',
      text: `너는 더 이상 묻지 못했어.\n\n박사님이 너무 흥분하셨어.\n\n며칠 동안\n박사님은 실험에 빠지셨어.\n\n밤낮으로 약을 만들고\n중얼거리시고...\n\n"이제 곧... 자유로워질 거야..."`,
      bg: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '실험하는 날', to: 'experiment_day', cls: 'bg-purple-200' }
      ],
      prompt: '💭 무서워서 말을 못 할 때 있어?'
    },
    {
      id: 'want_help',
      title: '열심히 돕기',
      text: `"저도 도와드릴게요!"\n\n너는 박사님을 도왔어.\n\n약을 섞고, 도구를 정리하고...\n\n하지만 시간이 지날수록\n박사님이 이상해지셨어.\n\n"지킬 것은 지켜야 해..."\n"아니야, 이젠 안 지켜도 돼..."\n\n혼자 중얼거리셔.`,
      bg: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '실험하는 날', to: 'experiment_day', cls: 'bg-purple-200' }
      ],
      prompt: '💭 도와줬는데 나쁜 결과가 나오면 어떻게 해?'
    },
    {
      id: 'bit_worried',
      title: '조금씩 이상해지는 박사님',
      text: `너는 조심스럽게 지켜봤어.\n\n박사님이 점점 이상해지셔.\n\n식사도 안 하시고,\n잠도 안 자시고,\n혼자 웃으시고...\n\n"드디어... 나는 변할 거야..."\n\n무서워.`,
      bg: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '실험하는 날', to: 'experiment_day', cls: 'bg-purple-200' }
      ],
      prompt: '💭 누군가 이상해지는 걸 보면 무서워?'
    },
    {
      id: 'keep_watching',
      title: '불안한 관찰',
      text: `너는 계속 지켜봤어.\n\n박사님은 매일\n그 초록 약을 만드셨어.\n\n"완벽해... 이제 마실 시간이야..."\n\n너는 가슴이 철렁했어.\n\n박사님이 직접 드실 거야?\n\n위험해!`,
      bg: 'https://images.unsplash.com/photo-1456613820599-bfe244172af5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '실험하는 날', to: 'experiment_day', cls: 'bg-purple-200' }
      ],
      prompt: '💭 위험한 일이 일어날 것 같으면?'
    },
    {
      id: 'experiment_day',
      title: '실험하는 날 밤',
      text: `그날 밤.\n\n박사님이 말했어.\n\n"${name.first}, 오늘은 집에 가.\n\n내일은... 오지 않아도 돼."\n\n"왜요?"\n\n"오늘 밤, 나는 약을 마실 거야.\n\n그리고 내일은...\n새로운 내가 될 거야."`,
      bg: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '말리려고 한다', to: 'try_stop', cls: 'bg-red-200' },
        { label: '집에 간다', to: 'go_home_scared', cls: 'bg-gray-200' },
        { label: '몰래 지켜본다', to: 'sneak_watch', cls: 'bg-purple-200' }
      ],
      prompt: '💭 위험한 일을 하려는 사람을 막을 수 있을까?'
    },
    {
      id: 'try_stop',
      title: '간절한 만류',
      text: `"박사님, 안 돼요!\n\n너무 위험해요!"\n\n박사님이 손을 저으셨어.\n\n"넌 몰라.\n\n나는 평생 착하게만 살았어.\n항상 참고, 지키고...\n\n이젠 내 안의 나쁜 마음과\n착한 마음을 나눌 거야!"\n\n박사님이 너를 밖으로 내보냈어.`,
      bg: 'https://images.unsplash.com/photo-1621252179027-94459d278660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '문 밖에서 기다린다', to: 'wait_outside', cls: 'bg-yellow-200' },
        { label: '창문으로 본다', to: 'peek_window', cls: 'bg-purple-200' }
      ],
      prompt: '💭 말렸는데 안 들으면 어떻게 해?'
    },
    {
      id: 'go_home_scared',
      title: '불안한 밤',
      text: `너는 집으로 갔어.\n\n하지만 잠이 안 와.\n\n박사님이 걱정돼.\n\n'약을 마시면 어떻게 될까?'\n\n새벽이 되자\n실험실 쪽에서\n비명 소리가 들렸어!\n\n"으아아악!"`,
      bg: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '실험실로 달려간다', to: 'rush_to_lab', cls: 'bg-red-200' }
      ],
      prompt: '💭 무서운 소리를 들으면 어떻게 해?'
    },
    {
      id: 'sneak_watch',
      title: '몰래 지켜보기',
      text: `너는 몰래 창문 밖에 숨었어.\n\n박사님이 초록 약을 들고 계셔.\n\n"드디어... 자유다!"\n\n약을 입에 가져가셨어.\n\n쭉-\n\n박사님이 약을 마셨어!`,
      bg: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무슨 일이 일어나는지 본다', to: 'witness_transformation', cls: 'bg-purple-200' }
      ],
      prompt: '💭 위험한 순간을 목격하면 어떻게 해?'
    },
    {
      id: 'wait_outside',
      title: '문 밖에서',
      text: `너는 문 밖에서 기다렸어.\n\n잠시 조용하더니...\n\n"으악! 크아아악!"\n\n박사님 목소리가 아니야.\n\n짐승 같은 소리야!\n\n쾅! 쿵!\n\n안에서 물건이 부서지는 소리!`,
      bg: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '문을 두드린다', to: 'knock_door', cls: 'bg-red-200' },
        { label: '창문으로 본다', to: 'peek_window', cls: 'bg-purple-200' }
      ],
      prompt: '💭 무서운 소리를 들으면 도망쳐야 할까?'
    },
    {
      id: 'peek_window',
      title: '창문 너머로',
      text: `너는 창문 너머로 봤어.\n\n박사님이...\n\n아니, 박사님이 아니야!\n\n몸이 작아지고,\n얼굴이 일그러지고,\n손이 짐승처럼 구부러지고...\n\n"크크크... 드디어 자유다!"\n\n괴물이 웃고 있어!`,
      bg: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무서워서 도망간다', to: 'run_away', cls: 'bg-red-200' }
      ],
      prompt: '💭 무서운 걸 보면 어떻게 해?'
    },
    {
      id: 'knock_door',
      title: '문을 두드리다',
      text: `"박사님! 괜찮으세요?!"\n\n너는 문을 두드렸어.\n\n갑자기 문이 확 열렸어!\n\n작고 못생긴 남자가 서 있어.\n\n박사님이 아니야!\n\n"크크크... 누구지?"\n\n그의 눈빛이 무서워.`,
      bg: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '도망간다', to: 'run_away', cls: 'bg-red-200' }
      ],
      prompt: '💭 낯선 사람이 무섭게 나오면?'
    },
    {
      id: 'rush_to_lab',
      title: '실험실로',
      text: `너는 실험실로 달려갔어.\n\n문이 반쯤 열려 있어.\n\n안은 엉망이야.\n\n깨진 유리, 엎질러진 약...\n\n그리고... 작은 남자가\n거울을 보며 웃고 있어.\n\n"크크크... 나는 하이드다!"\n\n박사님은 어디 가셨지?`,
      bg: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그 남자를 본다', to: 'see_hyde', cls: 'bg-purple-200' }
      ],
      prompt: '💭 무서운 장면을 보면 어떻게 해?'
    },
    {
      id: 'witness_transformation',
      title: '변신',
      text: `박사님이 약을 마시자\n\n몸이 떨리기 시작했어!\n\n"으으윽! 크아악!"\n\n몸이 작아지고,\n얼굴이 변하고,\n손발이 뒤틀리고...\n\n잠시 후.\n\n완전히 다른 사람이 됐어!\n\n"크크크... 나는 하이드다!"`,
      bg: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무서워서 숨는다', to: 'hide_scared', cls: 'bg-red-200' }
      ],
      prompt: '💭 사람이 괴물로 변하는 걸 보면?'
    },
    {
      id: 'see_hyde',
      title: '하이드를 만나다',
      text: `그 남자가 너를 봤어!\n\n"넌 누구야?"\n\n목소리가 거칠고 무서워.\n\n"지... 지킬 박사님은\n어디 계세요?"\n\n"크크크... 지킬?\n그 지루한 놈 말이야?\n\n내가 바로 지킬의\n나쁜 마음이야!"\n\n박사님이... 저렇게 됐어?!`,
      bg: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '도망간다', to: 'run_away', cls: 'bg-red-200' }
      ],
      prompt: '💭 무서운 사람을 만나면 도망쳐야 해?'
    },
    {
      id: 'hide_scared',
      title: '숨어서 지켜보기',
      text: `너는 떨면서 숨었어.\n\n하이드가 밖으로 나갔어.\n\n"크하하! 이제 자유다!\n\n하고 싶은 걸 다 할 거야!\n\n규칙? 예의? 그딴 건 필요 없어!"\n\n나쁜 웃음소리를 내며\n어둠 속으로 사라졌어.`,
      bg: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '엔딩으로', to: 'ending', cls: 'bg-purple-200' }
      ],
      prompt: '💭 나쁜 마음이 자유로워지면 어떻게 될까?'
    },
    {
      id: 'run_away',
      title: '도망',
      text: `너는 무서워서 도망쳤어!\n\n뒤에서 하이드의 웃음소리가 들려.\n\n"크하하하!"\n\n집으로 달려가서\n문을 꽁꽁 잠갔어.\n\n떨리는 손으로\n창문을 닫았어.\n\n박사님은 어떻게 된 걸까...`,
      bg: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '엔딩으로', to: 'ending', cls: 'bg-purple-200' }
      ],
      prompt: '💭 무서울 때 도망가는 게 맞을까?'
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `낮에는 박사, 밤에는 하이드...\n\n 두 사람 사이를 오가며 어떤 일들이 벌어질까?\n\n 마블의 '헐크'가 사고로 탄생했다면, 지킬 박사는 스스로 변화를 추구했어.\n\n사람 마음의 양면성을 표현한 원조 심리 스릴러.\n\n📚 《지킬 박사와 하이드》에서 착한 마음과 나쁜 마음에 깊은 이야기를 만나보자!`,
      bg: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' }
      ],
      prompt: '《지킬 박사와 하이드》 - 착하게만 살아야 할까? 나쁜 마음을 숨기고 사는 게 맞을까? 선과 악, 인간의 두 얼굴에 대한 스릴 넘치는 이야기!'
    }
  ];
}

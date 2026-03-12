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

export function generateSimcheongStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '심청이와의 첫 만남',
      text: `${name.full}.\n\n너는 옛날 어느 한 마을에 사는 아이야.\n\n오늘, 옆집에 이사 온 아이를 만났어.\n\n"안녕, 나는 심청이라고 해."\n\n밝게 웃는 여자아이.\n\n너와 같은 나이야.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '친구가 되자고 한다', to: 'be_friends', cls: 'bg-blue-200' },
        { label: '심청이 집을 관찰한다', to: 'observe_house', cls: 'bg-green-200' }
      ],
      prompt: '💭 새로운 친구를 만나는 것은 어떤 의미일까?'
    },
    {
      id: 'be_friends',
      title: '우정의 선택',
      text: `"나도 친구하고 싶어!"\n\n너는 밝게 대답했어.\n\n심청이가 환하게 웃었어.\n\n"좋아! 우리 친구하자!"\n\n그날부터 너희는 친구가 됐어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '심청이 집에 간다', to: 'visit_simcheong', cls: 'bg-blue-200' },
        { label: '같이 논다', to: 'play_together', cls: 'bg-green-200' }
      ],
      prompt: '💭 친구를 선택한다는 것은 어떤 책임을 의미할까?'
    },
    {
      id: 'observe_house',
      title: '가난한 집의 현실',
      text: `심청이네 집을 보니,\n\n아주 낡고 작았어.\n\n문짝도 삐걱거려.\n\n하지만 심청이는 밝게 웃고 있어.\n\n'저렇게 가난해도 웃을 수 있구나.'`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '친구가 되자고 한다', to: 'be_friends', cls: 'bg-blue-200' },
        { label: '집으로 돌아간다', to: 'go_home', cls: 'bg-gray-200' }
      ],
      prompt: '💭 겉모습으로 사람을 판단해도 될까?'
    },
    {
      id: 'visit_simcheong',
      title: '장애인 아버지를 만나다',
      text: `심청이네 집에 들어갔어.\n\n"아버지, 친구가 왔어요!"\n\n방에서 한 분이 나오셨어.\n\n지팡이를 짚고 계셔.\n\n눈을 보지 못하시는 분이야.\n\n"어서 오렴. 심청이 친구구나."`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '인사를 한다', to: 'greet_father', cls: 'bg-blue-200' },
        { label: '놀란다', to: 'feel_surprised', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 장애를 가진 사람을 만나면 어떻게 대해야 할까?'
    },
    {
      id: 'play_together',
      title: '친구와의 시간 선택',
      text: `심청이와 밖에서 놀았어.\n\n술래잡기도 하고,\n\n꽃을 따기도 했어.\n\n"넌 참 좋은 친구야!"\n\n심청이가 말했어.\n\n너도 기뻤어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '심청이 집에 간다', to: 'visit_simcheong', cls: 'bg-blue-200' },
        { label: '계속 논다', to: 'play_more', cls: 'bg-green-200' }
      ],
      prompt: '💭 친구와 함께하는 시간은 어떤 가치가 있을까?'
    },
    {
      id: 'go_home',
      title: '선택의 결과',
      text: `너는 집으로 돌아갔어.\n\n하지만 마음이 불편해.\n\n'심청이는 좋은 아이 같은데...'\n\n'가난하다고 친구 안 되는 건 아니잖아?'\n\n다음 날, 심청이가 너를 찾아왔어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '미안하다고 한다', to: 'apologize', cls: 'bg-blue-200' },
        { label: '같이 놀자고 한다', to: 'play_together', cls: 'bg-green-200' }
      ],
      prompt: '💭 첫인상으로 한 판단을 바꿀 수 있을까?'
    },
    {
      id: 'greet_father',
      title: '장애를 넘어선 인사',
      text: `"안녕하세요!"\n\n너는 밝게 인사했어.\n\n심봉사님이 웃으셨어.\n\n"착한 아이구나. 심청이 잘 부탁한다."\n\n심청이가 행복해 보여.\n\n너도 기분이 좋았어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '심봉사님과 이야기한다', to: 'talk_father', cls: 'bg-blue-200' },
        { label: '심청이와 논다', to: 'play_with_sim', cls: 'bg-green-200' }
      ],
      prompt: '💭 장애는 그 사람의 전부가 아닐까?'
    },
    {
      id: 'feel_surprised',
      title: '장애에 대한 편견',
      text: `너는 놀라서 멈칫했어.\n\n심청이가 네 표정을 봤어.\n\n조금 슬퍼 보여.\n\n"아버지는 눈이 안 보이셔."\n\n"하지만 누구보다 따뜻하신 분이야."\n\n너는 부끄러워졌어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '사과한다', to: 'apologize_reaction', cls: 'bg-blue-200' },
        { label: '인사를 한다', to: 'greet_father', cls: 'bg-green-200' }
      ],
      prompt: '💭 나도 모르게 가진 편견을 어떻게 극복할까?'
    },
    {
      id: 'apologize',
      title: '선택을 되돌리다',
      text: `"미안해. 어제는..."\n\n너는 솔직하게 말했어.\n\n심청이가 웃었어.\n\n"괜찮아. 이해해."\n\n"우리 친구하자!"\n\n너희는 진짜 친구가 됐어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '심청이 집에 간다', to: 'visit_simcheong', cls: 'bg-blue-200' },
        { label: '같이 논다', to: 'play_together', cls: 'bg-green-200' }
      ],
      prompt: '💭 잘못을 인정하는 것이 더 큰 용기일까?'
    },
    {
      id: 'talk_father',
      title: '장애인의 지혜',
      text: `"아버지, 눈이 안 보이시면 불편하시겠어요."\n\n심봉사님이 웃으셨어.\n\n"불편하긴 하지. 하지만 괜찮단다."\n\n"심청이가 있으니까."\n\n"이 아이는 내 눈이란다."\n\n심청이가 아버지를 꼭 안았어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '감동받는다', to: 'feel_moved', cls: 'bg-blue-200' },
        { label: '심청이를 본다', to: 'look_simcheong', cls: 'bg-green-200' }
      ],
      prompt: '💭 장애는 사랑으로 극복될 수 있을까?'
    },
    {
      id: 'play_with_sim',
      title: '효도하는 친구',
      text: `심청이와 놀다가,\n\n심청이가 갑자기 일어났어.\n\n"아버지 물 드려야 해."\n\n물을 떠다 드리고,\n\n다시 돌아왔어.\n\n"미안해. 기다렸지?"\n\n전혀 귀찮아하지 않는 얼굴이야.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '심청이가 대단하다고 생각한다', to: 'admire_sim', cls: 'bg-blue-200' },
        { label: '함께 아버지를 돕는다', to: 'help_together', cls: 'bg-green-200' }
      ],
      prompt: '💭 효도는 의무일까, 사랑의 표현일까?'
    },
    {
      id: 'play_more',
      title: '선택의 기회비용',
      text: `너희는 해질 때까지 놀았어.\n\n정말 즐거웠어.\n\n그런데 심청이가 걱정스러워.\n\n"아버지 저녁 드려야 하는데..."\n\n해가 이미 저물었어.\n\n심청이가 서둘러 집으로 갔어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '따라가서 돕는다', to: 'follow_help', cls: 'bg-blue-200' },
        { label: '집으로 간다', to: 'go_home_sunset', cls: 'bg-gray-200' }
      ],
      prompt: '💭 내 즐거움과 친구의 책임 사이에서 어떻게 선택할까?'
    },
    {
      id: 'apologize_reaction',
      title: '장애 이해의 시작',
      text: `"죄송해요. 놀라서..."\n\n심봉사님이 웃으셨어.\n\n"괜찮단다. 처음 보면 다들 그래."\n\n"중요한 건 마음이지."\n\n너는 심봉사님이 좋아졌어.\n\n따뜻한 분이야.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '심봉사님과 더 이야기한다', to: 'talk_father', cls: 'bg-blue-200' },
        { label: '심청이와 논다', to: 'play_with_sim', cls: 'bg-green-200' }
      ],
      prompt: '💭 편견을 버리는 첫걸음은 무엇일까?'
    },
    {
      id: 'feel_moved',
      title: '효도의 의미',
      text: `심청이와 심봉사님의 모습에\n\n너는 감동했어.\n\n'저렇게 아버지를 사랑할 수 있구나.'\n\n네 부모님 얼굴이 떠올랐어.\n\n'나도 효도해야지.'`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '심청이에게 배운다', to: 'learn_filial', cls: 'bg-blue-200' },
        { label: '집에 가서 부모님께 효도한다', to: 'go_be_filial', cls: 'bg-green-200' }
      ],
      prompt: '💭 효도는 배워서 하는 것일까, 마음에서 우러나는 것일까?'
    },
    {
      id: 'look_simcheong',
      title: '효도하는 딸의 모습',
      text: `심청이를 보니,\n\n아버지를 바라보는 눈빛이\n\n사랑으로 가득해.\n\n"아버지, 배고프시죠? 먹을 것 좀 구해 올게요."\n\n어린 나이에 집안일을 다 해.\n\n대단한 아이야.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '돕겠다고 한다', to: 'offer_help', cls: 'bg-blue-200' },
        { label: '대단하다고 말한다', to: 'praise_sim', cls: 'bg-green-200' }
      ],
      prompt: '💭 나이가 어려도 큰 책임을 질 수 있을까?'
    },
    {
      id: 'admire_sim',
      title: '효도의 본보기',
      text: `'심청이는 정말 효녀구나.'\n\n너는 감탄했어.\n\n나이는 어리지만,\n\n아버지를 위해 무엇이든 해.\n\n'나도 저렇게 할 수 있을까?'\n\n생각해봤어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '심청이를 도와주기로 한다', to: 'decide_help', cls: 'bg-blue-200' },
        { label: '심청이와 더 친해진다', to: 'become_closer', cls: 'bg-green-200' }
      ],
      prompt: '💭 좋은 친구를 본받는 것이 나를 성장시킬까?'
    },
    {
      id: 'help_together',
      title: '함께하는 효도',
      text: `"나도 도와줄게!"\n\n너는 심청이와 함께\n\n심봉사님을 도왔어.\n\n물도 떠다 드리고,\n\n말벗도 되어드렸어.\n\n심봉사님이 고마워하셨어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '자주 돕기로 한다', to: 'regular_help', cls: 'bg-blue-200' },
        { label: '심청이와 논다', to: 'play_after_help', cls: 'bg-green-200' }
      ],
      prompt: '💭 다른 사람의 효도를 돕는 것도 선한 일일까?'
    },
    {
      id: 'follow_help',
      title: '친구의 선택을 돕다',
      text: `너는 심청이를 따라갔어.\n\n"내가 도와줄게!"\n\n심청이가 놀라며 고마워했어.\n\n함께 음식을 구하고,\n\n아버지께 저녁을 드렸어.\n\n뿌듯했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '자주 돕기로 한다', to: 'regular_help', cls: 'bg-blue-200' },
        { label: '집으로 돌아간다', to: 'go_home_evening', cls: 'bg-green-200' }
      ],
      prompt: '친구를 돕는 것이 나의 시간을 희생하는 것일까?'
    },
    {
      id: 'go_home_sunset',
      title: '선택의 대가',
      text: `너는 집으로 갔어.\n\n하지만 마음이 불편해.\n\n'심청이 혼자 힘들 텐데...'\n\n다음 날 아침,\n\n심청이를 만났어.\n\n피곤해 보여.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '미안하다고 한다', to: 'apologize_leave', cls: 'bg-blue-200' },
        { label: '앞으로는 돕겠다고 한다', to: 'promise_help', cls: 'bg-green-200' }
      ],
      prompt: '💭 편한 선택이 항상 옳은 선택일까?'
    },
    {
      id: 'learn_filial',
      title: '효도 배우기',
      text: `"심청아, 어떻게 그렇게 효도할 수 있어?"\n\n심청이가 웃었어.\n\n"아버지가 내 전부야."\n\n"아버지가 행복하시면 나도 행복해."\n\n너는 깊이 생각했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '나도 실천하기로 한다', to: 'practice_filial', cls: 'bg-blue-200' },
        { label: '심청이를 돕는다', to: 'help_together', cls: 'bg-green-200' }
      ],
      prompt: '💭 효도는 의무인가, 사랑의 자연스러운 표현인가?'
    },
    {
      id: 'go_be_filial',
      title: '효도의 실천',
      text: `너는 집으로 달려갔어.\n\n"엄마, 아빠! 사랑해요!"\n\n부모님을 꼭 안았어.\n\n부모님이 놀라시며 기뻐하셨어.\n\n"우리 아이가 갑자기 왜 이래?"\n\n너는 웃으며 말했어.\n\n"그냥 말하고 싶었어요!"`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '심청이 이야기를 한다', to: 'tell_about_sim', cls: 'bg-blue-200' },
        { label: '다음 날 심청이를 만난다', to: 'next_day', cls: 'bg-green-200' }
      ],
      prompt: '💭 효도를 말로 표현하는 것도 중요할까?'
    },
    {
      id: 'offer_help',
      title: '장애인 가족 돕기',
      text: `"심청아, 내가 도와줄게!"\n\n심청이가 고마워했어.\n\n"정말? 고마워!"\n\n너희는 함께 음식을 구하고,\n\n청소도 했어.\n\n둘이 하니 금방 끝났어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '자주 오기로 한다', to: 'regular_help', cls: 'bg-blue-200' },
        { label: '심봉사님과 이야기한다', to: 'talk_with_father', cls: 'bg-green-200' }
      ],
      prompt: '💭 장애인 가족을 돕는 것은 어떤 의미가 있을까?'
    },
    {
      id: 'praise_sim',
      title: '효녀를 칭찬하다',
      text: `"심청아, 너 정말 대단해!"\n\n심청이가 부끄러워했어.\n\n"아니야. 당연한 거야."\n\n"아버지를 돌보는 건\n\n딸로서 해야 할 일이야."\n\n너는 감동했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '나도 돕겠다고 한다', to: 'offer_help', cls: 'bg-blue-200' },
        { label: '심청이를 본받기로 한다', to: 'learn_from_sim', cls: 'bg-green-200' }
      ],
      prompt: '💭 당연한 일을 당연하게 하는 것이 얼마나 어려울까?'
    },
    {
      id: 'decide_help',
      title: '돕기로 선택하다',
      text: `너는 결심했어.\n\n'심청이를 도와주자.'\n\n'혼자 하기엔 너무 힘들 거야.'\n\n다음 날부터\n\n너는 심청이네 집에 자주 갔어.\n\n함께 일을 하니 훨씬 수월했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '매일 돕는다', to: 'daily_help', cls: 'bg-blue-200' },
        { label: '가끔 돕는다', to: 'sometimes_help', cls: 'bg-green-200' }
      ],
      prompt: '💭 친구를 돕기로 한 선택은 어떤 변화를 가져올까?'
    },
    {
      id: 'become_closer',
      title: '친구의 선택',
      text: `너와 심청이는 더 친해졌어.\n\n매일 만나서 놀고,\n\n이야기하고,\n\n웃었어.\n\n하지만 심청이는 항상\n\n아버지 걱정을 해.\n\n"아버지 눈만 뜨시면..."\n\n자주 하는 말이야.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '위로한다', to: 'comfort_sim', cls: 'bg-blue-200' },
        { label: '함께 방법을 찾는다', to: 'find_way', cls: 'bg-green-200' }
      ],
      prompt: '💭 친구의 소원을 함께 이루고 싶을 때 어떻게 해야 할까?'
    },
    {
      id: 'regular_help',
      title: '헌신의 선택',
      text: `너는 매일 심청이네 집에 갔어.\n\n일을 돕고,\n\n심봉사님 말벗이 되어드렸어.\n\n네 시간은 줄었지만,\n\n마음은 더 풍요로워졌어.\n\n심청이가 정말 고마워했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 돕는다', to: 'continue_help', cls: 'bg-blue-200' },
        { label: '다른 친구들과의 시간도 가진다', to: 'balance_time', cls: 'bg-green-200' }
      ],
      prompt: '💭 내 시간을 나누는 것과 내 삶을 사는 것, 어떻게 균형을 맞출까?'
    },
    {
      id: 'play_after_help',
      title: '효도 후의 즐거움',
      text: `일을 마치고 나니,\n\n심청이가 훨씬 밝아졌어.\n\n"고마워! 네 덕분에 빨리 끝났어!"\n\n너희는 함께 놀았어.\n\n일하고 나서 함 노니\n\n더 즐거웠어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '앞으로도 계속 돕는다', to: 'regular_help', cls: 'bg-blue-200' },
        { label: '가끔 돕는다', to: 'sometimes_help', cls: 'bg-green-200' }
      ],
      prompt: '💭 의무를 다한 후의 즐거움이 더 달콤할까?'
    },
    {
      id: 'go_home_evening',
      title: '선택의 기회비용',
      text: `너는 집으로 돌아갔어.\n\n부모님이 걱정하셨어.\n\n"어디 갔었니?"\n\n"친구 도와주고 왔어요."\n\n부모님이 기뻐하셨어.\n\n"착한 일 했구나."`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '심청이 이야기를 한다', to: 'tell_parents', cls: 'bg-blue-200' },
        { label: '다음 날을 기다린다', to: 'next_day', cls: 'bg-green-200' }
      ],
      prompt: '💭 부모님을 안심시키는 것도 효도일까?'
    },
    {
      id: 'apologize_leave',
      title: '선택의 후회',
      text: `"미안해, 어제 도와주지 못해서..."\n\n심청이가 웃었어.\n\n"괜찮아. 이해해."\n\n"너도 네 일이 있잖아."\n\n하지만 너는 미안했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '앞으로는 돕겠다고 한다', to: 'promise_help', cls: 'bg-blue-200' },
        { label: '오늘은 돕는다', to: 'help_today', cls: 'bg-green-200' }
      ],
      prompt: '💭 후회하는 것과 행동을 바꾸는 것 중 무엇이 더 중요할까?'
    },
    {
      id: 'promise_help',
      title: '새로운 선택',
      text: `"심청아, 앞으로는 내가 도와줄게!"\n\n심청이가 눈물을 글썽였어.\n\n"정말? 고마워..."\n\n"혼자 하기엔 정말 힘들었어."\n\n너는 마음이 아팠어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '매일 돕기로 한다', to: 'daily_help', cls: 'bg-blue-200' },
        { label: '할 수 있을 때 돕는다', to: 'sometimes_help', cls: 'bg-green-200' }
      ],
      prompt: '💭 약속은 지켜질 때 의미를 가질까?'
    },
    {
      id: 'practice_filial',
      title: '효도의 실천',
      text: `너는 부모님께 효도하기 시작했어.\n\n집안일을 도와드리고,\n\n말씀을 잘 들었어.\n\n부모님이 놀라셨어.\n\n"갑자기 왜 이렇게 착해졌니?"\n\n너는 웃으며 말했어.\n\n"그냥요!"`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '심청이 이야기를 한다', to: 'tell_parents', cls: 'bg-blue-200' },
        { label: '계속 효도한다', to: 'continue_filial', cls: 'bg-green-200' }
      ],
      prompt: '💭 효도는 특별한 날에만 하는 것일까?'
    },
    {
      id: 'tell_about_sim',
      title: '친구의 효도 이야기',
      text: `너는 부모님께 심청이 이야기를 했어.\n\n부모님이 감동하셨어.\n\n"그렇게 어린 나이에..."\n\n"대단한 아이구나."\n\n"너도 좋은 친구를 뒀네."\n\n부모님이 자랑스러워하셨어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '심청이를 집에 초대한다', to: 'invite_sim', cls: 'bg-blue-200' },
        { label: '다음 날 심청이를 만난다', to: 'next_day', cls: 'bg-green-200' }
      ],
      prompt: '💭 좋은 친구의 이야기를 나누는 것도 의미 있을까?'
    },
    {
      id: 'talk_with_father',
      title: '장애인의 마음',
      text: `심봉사님과 이야기를 나눴어.\n\n"눈이 안 보이시면 어떤 기분이세요?"\n\n"처음엔 힘들었지."\n\n"하지만 이제는 익숙해."\n\n"심청이가 있어서 행복하단다."\n\n너는 많은 걸 배웠어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '더 많이 돕기로 한다', to: 'decide_more_help', cls: 'bg-blue-200' },
        { label: '심청이와 이야기한다', to: 'talk_with_sim', cls: 'bg-green-200' }
      ],
      prompt: '💭 장애를 가진 사람도 행복할 수 있을까?'
    },
    {
      id: 'learn_from_sim',
      title: '효도 본받기',
      text: `너는 심청이를 본받기로 했어.\n\n집에 가서 부모님을 도왔어.\n\n설거지도 하고,\n\n청소도 했어.\n\n부모님이 정말 기뻐하셨어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '매일 효도한다', to: 'daily_filial', cls: 'bg-blue-200' },
        { label: '심청이도 계속 돕는다', to: 'help_both', cls: 'bg-green-200' }
      ],
      prompt: '💭 좋은 본보기를 따라 하는 것이 성장일까?'
    },
    {
      id: 'daily_help',
      title: '헌신의 시간',
      text: `너는 매일 심청이를 도왔어.\n\n아침에 일어나 바로 달려가서\n\n일을 도왔어.\n\n네 놀 시간은 줄었지만,\n\n심청이가 훨씬 밝아졌어.\n\n그게 더 기뻤어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 돕는다', to: 'keep_helping', cls: 'bg-blue-200' },
        { label: '가끔은 쉰다', to: 'rest_sometimes', cls: 'bg-green-200' }
      ],
      prompt: '💭 친구를 위한 희생은 언제까지 해야 할까?'
    },
    {
      id: 'sometimes_help',
      title: '균형 잡힌 선택',
      text: `너는 할 수 있을 때 도왔어.\n\n매일은 아니지만,\n\n일주일에 서너 번.\n\n심청이도 이해했어.\n\n"네 시간도 소중해."\n\n"이것만으로도 고마워."`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '더 자주 돕는다', to: 'daily_help', cls: 'bg-blue-200' },
        { label: '이대로 계속한다', to: 'continue_balance', cls: 'bg-green-200' }
      ],
      prompt: '💭 내 삶과 친구 돕기 사이의 균형은 어디일까?'
    },
    {
      id: 'comfort_sim',
      title: '장애 가족의 소원',
      text: `"아버지 눈 뜨실 수 있어."\n\n너는 심청이를 위로했어.\n\n"언젠가 방법이 있을 거야."\n\n심청이가 눈물을 글썽였어.\n\n"그랬으면 좋겠어..."\n\n"아버지가 세상을 보셨으면..."`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '함께 방법을 찾는다', to: 'find_way', cls: 'bg-blue-200' },
        { label: '계속 위로한다', to: 'keep_comforting', cls: 'bg-green-200' }
      ],
      prompt: '💭 이룰 수 없을지도 모르는 소원을 함께 꿀 수 있을까?'
    },
    {
      id: 'find_way',
      title: '장애 치료의 희망',
      text: `"우리 방법을 찾아보자!"\n\n너희는 마을 사람들에게 물었어.\n\n"눈 뜨게 하는 방법이 있나요?"\n\n한 스님이 말씀하셨어.\n\n"공양미 300석을 부처님께 바치면\n\n눈을 뜰 수 있다네."`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '심청이에게 말한다', to: 'tell_sim_way', cls: 'bg-blue-200' },
        { label: '300석이 너무 많다고 생각한다', to: 'think_impossible', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 희망을 주는 것과 실망을 주는 것 사이에서 어떻게 선택할까?'
    },
    {
      id: 'continue_help',
      title: '헌신의 기쁨',
      text: `시간이 흘렀어.\n\n너는 계속 심청이를 도왔어.\n\n힘들 때도 있었지만,\n\n심청이의 웃는 얼굴을 보면\n\n다시 힘이 났어.\n\n진짜 친구가 된 거야.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 돕는다', to: 'years_pass', cls: 'bg-blue-200' },
        { label: '다른 방법을 찾는다', to: 'find_other_way', cls: 'bg-green-200' }
      ],
      prompt: '💭 진정한 우정은 어떻게 만들어질까?'
    },
    {
      id: 'balance_time',
      title: '선택의 균형',
      text: `너는 심청이도 돕고,\n\n다른 친구들과도 놀았어.\n\n모두와 시간을 보내니\n\n삶이 균형 잡혔어.\n\n심청이도 이해해줬어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '이대로 계속한다', to: 'continue_balance', cls: 'bg-blue-200' },
        { label: '심청이를 더 돕는다', to: 'help_more', cls: 'bg-green-200' }
      ],
      prompt: '💭 모든 관계에 균등하게 시간을 줘야 할까?'
    },
    {
      id: 'tell_parents',
      title: '효도의 본보기 전하기',
      text: `부모님께 심청이 이야기를 자세히 했어.\n\n"그 아이는 정말 효녀구나."\n\n"우리도 저 아이네를 도와줘야겠다."\n\n부모님이 말씀하셨어.\n\n가족 모두가 감동했어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '가족이 함께 돕는다', to: 'family_help', cls: 'bg-blue-200' },
        { label: '다음 날 심청이를 만난다', to: 'next_day', cls: 'bg-green-200' }
      ],
      prompt: '💭 좋은 일은 나눌수록 커질까?'
    },
    {
      id: 'next_day',
      title: '일상의 선택',
      text: `다음 날, 너는 심청이를 만났어.\n\n"오늘 뭐 할까?"\n\n심청이가 물었어.\n\n하지만 네가 보기엔\n\n심청이는 늘 바빠 보여.\n\n아버지를 돌봐야 하니까.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '일을 먼저 돕는다', to: 'help_first', cls: 'bg-blue-200' },
        { label: '놀자고 한다', to: 'suggest_play', cls: 'bg-green-200' }
      ],
      prompt: '💭 친구의 상황을 배려하는 것이 진정한 우정일까?'
    },
    {
      id: 'invite_sim',
      title: '친구의 선택 존중',
      text: `"심청아, 우리 집에 놀러 올래?"\n\n심청이가 잠깐 망설였어.\n\n"가고 싶은데... 아버지를..."\n\n너는 이해했어.\n\n"괜찮아. 아버지랑 같이 와!"`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '심봉사님도 초대한다', to: 'invite_father', cls: 'bg-blue-200' },
        { label: '다음에 초대한다', to: 'invite_later', cls: 'bg-green-200' }
      ],
      prompt: '💭 친구의 상황을 배려하는 것이 배려일까, 차별일까?'
    },
    {
      id: 'decide_more_help',
      title: '장애 가족 돕기 결심',
      text: `심봉사님과 이야기하고 나서,\n\n너는 더 많이 돕기로 했어.\n\n'심청이 혼자서는 너무 힘들겠어.'\n\n'내가 더 도와줘야지.'\n\n마음을 굳게 먹었어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '매일 돕는다', to: 'daily_help', cls: 'bg-blue-200' },
        { label: '부모님께 도움을 청한다', to: 'ask_parents_help', cls: 'bg-green-200' }
      ],
      prompt: '💭 혼자 돕는 것과 함께 돕는 것 중 무엇이 나을까?'
    },
    {
      id: 'talk_with_sim',
      title: '효도의 무게',
      text: `"심청아, 힘들지 않아?"\n\n너는 조심스럽게 물었어.\n\n"가끔은 힘들어."\n\n심청이가 솔직하게 말했어.\n\n"하지만 아버지를 사랑하니까,\n\n할 수 있어."`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '더 많이 돕기로 한다', to: 'decide_more_help', cls: 'bg-blue-200' },
        { label: '심청이를 안아준다', to: 'hug_sim', cls: 'bg-green-200' }
      ],
      prompt: '💭 사랑하는 사람을 위한 희생은 힘든 것일까, 당연한 것일까?'
    },
    {
      id: 'daily_filial',
      title: '매일의 효도',
      text: `너는 매일 부모님께 효도했어.\n\n작은 일이라도 도와드렸어.\n\n부모님이 정말 행복해하셨어.\n\n"우리 아이가 이렇게 컸구나."\n\n너도 뿌듯했어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '심청이에게 배운 거라고 한다', to: 'credit_sim', cls: 'bg-blue-200' },
        { label: '계속 효도한다', to: 'continue_filial', cls: 'bg-green-200' }
      ],
      prompt: '💭 효도는 한순간이 아니라 평생일까?'
    },
    {
      id: 'help_both',
      title: '두 가지 효도',
      text: `너는 부모님께도 효도하고,\n\n심청이네도 도왔어.\n\n두 집을 오가며 바빴지만,\n\n마음은 풍요로웠어.\n\n'이게 진짜 사는 거구나.'`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 양쪽을 돕는다', to: 'continue_both', cls: 'bg-blue-200' },
        { label: '조금 쉰다', to: 'rest_a_bit', cls: 'bg-green-200' }
      ],
      prompt: '💭 여러 사람을 동시에 돌보는 것은 가능할까?'
    },
    {
      id: 'keep_helping',
      title: '헌신의 삶',
      text: `시간이 흘렀어.\n\n너는 계속 심청이를 도왔어.\n\n때로는 힘들었지만,\n\n심청이의 행복한 얼굴이\n\n너를 지탱해줬어.\n\n진정한 친구였어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속한다', to: 'years_pass', cls: 'bg-blue-200' }
      ],
      prompt: '💭 희생은 아름다운 것일까, 슬픈 것일까?'
    },
    {
      id: 'rest_sometimes',
      title: '균형의 지혜',
      text: `너는 가끔 쉬기도 했어.\n\n"오늘은 좀 쉴게."\n\n심청이가 이해해줬어.\n\n"당연하지. 너도 쉬어야지."\n\n진짜 친구는 이해해주는 거야.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '이렇게 계속한다', to: 'continue_balance', cls: 'bg-blue-200' },
        { label: '다시 매일 돕는다', to: 'daily_help', cls: 'bg-green-200' }
      ],
      prompt: '💭 자기 자신을 돌보는 것도 중요할까?'
    },
    {
      id: 'keep_comforting',
      title: '장애 가족의 위로',
      text: `너는 계속 심청이를 위로했어.\n\n"괜찮아. 언젠가 방법이 있을 거야."\n\n심청이가 고마워했어.\n\n"네가 있어서 힘이 나."\n\n너도 뿌듯했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '방법을 찾아본다', to: 'find_way', cls: 'bg-blue-200' },
        { label: '계속 함께한다', to: 'stay_together', cls: 'bg-green-200' }
      ],
      prompt: '💭 위로가 문제를 해결하지 못해도 의미가 있을까?'
    },
    {
      id: 'tell_sim_way',
      title: '희망과 선택',
      text: `너는 심청이에게 말했어.\n\n"공양미 300석이 있으면\n\n아버지 눈을 뜰 수 있대!"\n\n심청이의 눈이 반짝였어.\n\n"정말? 300석..."\n\n하지만 곧 슬퍼졌어.\n\n"그건 너무 많아..."`,
      bg: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '함께 방법을 찾자고 한다', to: 'find_rice', cls: 'bg-blue-200' },
        { label: '위로한다', to: 'comfort_rice', cls: 'bg-green-200' }
      ],
      prompt: '💭 희망을 주는 것이 잔인할 수도 있을까?'
    },
    {
      id: 'think_impossible',
      title: '현실의 선택',
      text: `'300석은 너무 많아...'\n\n너는 생각했어.\n\n'심청이네는 가난한데,\n\n어떻게 구하지?'\n\n심청이에게 말해야 할까,\n\n말지 않아야 할까...`,
      bg: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '말한다', to: 'tell_sim_way', cls: 'bg-blue-200' },
        { label: '말하지 않는다', to: 'keep_secret', cls: 'bg-gray-200' }
      ],
      prompt: '💭 이룰 수 없을지도 모르는 희망을 전해도 될까?'
    },
    {
      id: 'years_pass',
      title: '시간의 흐름',
      text: `몇 년이 흘렀어.\n\n너와 심청이는 함께 자랐어.\n\n여전히 가난했지만,\n\n우정은 더 깊어졌어.\n\n그러던 어느 날,\n\n심청이가 심각한 표정으로 왔어.`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무슨 일이냐고 묻는다', to: 'ask_what', cls: 'bg-blue-200' }
      ],
      prompt: '💭 시간이 지나도 변하지 않는 것이 있을까?'
    },
    {
      id: 'find_other_way',
      title: '다른 선택 찾기',
      text: `"다른 방법이 있을 거야!"\n\n너는 여기저기 물어봤어.\n\n하지만 모두 똑같은 말만 했어.\n\n"공양미 300석만이 방법이야."\n\n절망적이었어.`,
      bg: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 돕는다', to: 'years_pass', cls: 'bg-blue-200' },
        { label: '심청이에게 말한다', to: 'tell_sim_way', cls: 'bg-green-200' }
      ],
      prompt: '💭 한 가지 길밖에 없을 때 어떻게 해야 할까?'
    },
    {
      id: 'continue_balance',
      title: '균형의 지속',
      text: `너는 균형 잡힌 삶을 살았어.\n\n부모님께 효도하고,\n\n심청이도 돕고,\n\n네 시간도 가졌어.\n\n행복했어.\n\n그러던 어느 날...`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '계속한다', to: 'years_pass', cls: 'bg-blue-200' }
      ],
      prompt: '💭 완벽한 균형은 존재할까?'
    },
    {
      id: 'help_more',
      title: '헌신의 선택',
      text: `너는 심청이를 더 돕기로 했어.\n\n다른 것들을 조금 포기하고,\n\n심청이네 집에 더 자주 갔어.\n\n심청이가 정말 고마워했어.\n\n시간이 흘렀어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속한다', to: 'years_pass', cls: 'bg-blue-200' }
      ],
      prompt: '💭 친구를 위해 무엇을 포기할 수 있을까?'
    },
    {
      id: 'family_help',
      title: '가족의 선택',
      text: `네 가족이 함께 심청이네를 도왔어.\n\n음식도 나눠주고,\n\n일도 도와줬어.\n\n심청이와 심봉사님이\n\n정말 고마워했어.\n\n마을 사람들도 감동했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 돕는다', to: 'family_continue', cls: 'bg-blue-200' },
        { label: '다른 이웃도 돕는다', to: 'help_neighbors', cls: 'bg-green-200' }
      ],
      prompt: '💭 선한 행동은 전염될 수 있을까?'
    },
    {
      id: 'help_first',
      title: '효도를 먼저',
      text: `"일 먼저 하자!"\n\n너는 심청이와 함께 일했어.\n\n빨리 끝내고 놀 수 있었어.\n\n심청이가 행복해 보여.\n\n"네 덕분에 빨리 끝났어!"`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '같이 논다', to: 'play_after', cls: 'bg-blue-200' },
        { label: '매일 돕기로 한다', to: 'daily_help', cls: 'bg-green-200' }
      ],
      prompt: '💭 일과 놀이의 순서가 중요할까?'
    },
    {
      id: 'suggest_play',
      title: '선택의 갈등',
      text: `"오늘은 그냥 놀자!"\n\n심청이가 망설였어.\n\n"하지만 아버지..."\n\n너는 잘못 말한 것 같아.\n\n"미안, 일 먼저 하자."`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '함께 일한다', to: 'help_first', cls: 'bg-blue-200' },
        { label: '심청이의 선택을 존중한다', to: 'respect_choice', cls: 'bg-green-200' }
      ],
      prompt: '💭 친구의 우선순위를 이해하는 것이 우정일까?'
    },
    {
      id: 'invite_father',
      title: '장애인 초대',
      text: `"심봉사님도 같이 오세요!"\n\n심봉사님이 놀라셨어.\n\n"내가 가도 될까?"\n\n"물론이에요!"\n\n너희 가족은 함께 즐거운 시간을 보냈어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '자주 초대한다', to: 'regular_invite', cls: 'bg-blue-200' },
        { label: '시간이 흐른다', to: 'years_pass', cls: 'bg-green-200' }
      ],
      prompt: '💭 장애인을 특별하게 대하는 것이 진정한 배려일까?'
    },
    {
      id: 'invite_later',
      title: '선택의 배려',
      text: `"다음에 편할 때 와!"\n\n심청이가 고마워했어.\n\n"이해해줘서 고마워."\n\n너는 심청이의 상황을\n\n존중해주었어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '심청이네 집에 가서 논다', to: 'play_at_sims', cls: 'bg-blue-200' },
        { label: '시간이 흐른다', to: 'years_pass', cls: 'bg-green-200' }
      ],
      prompt: '💭 배려는 때로 거리를 두는 것일까?'
    },
    {
      id: 'ask_parents_help',
      title: '가족과 함께',
      text: `너는 부모님께 도움을 청했어.\n\n"심청이네를 도와주세요."\n\n부모님이 흔쾌히 동의하셨어.\n\n"그래, 함께 돕자."\n\n혼자보다 함께가 힘이 됐어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '가족이 함께 돕는다', to: 'family_help', cls: 'bg-blue-200' },
        { label: '시간이 흐른다', to: 'years_pass', cls: 'bg-green-200' }
      ],
      prompt: '💭 혼자 하는 선행보다 함께 하는 선행이 더 좋을까?'
    },
    {
      id: 'hug_sim',
      title: '효도의 위로',
      text: `너는 심청이를 꼭 안아줬어.\n\n"힘들면 나한테 말해."\n\n심청이가 울었어.\n\n"고마워... 네가 있어서 다행이야."\n\n너도 눈물이 났어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '더 많이 돕기로 한다', to: 'decide_more_help', cls: 'bg-blue-200' },
        { label: '계속 함께한다', to: 'stay_together', cls: 'bg-green-200' }
      ],
      prompt: '💭 진정한 위로는 무엇일까?'
    },
    {
      id: 'credit_sim',
      title: '효도의 본보기',
      text: `"심청이한테 배웠어요."\n\n너는 부모님께 말했어.\n\n부모님이 감동하셨어.\n\n"좋은 친구를 뒀구나."\n\n심청이에게도 고마웠어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 효도한다', to: 'continue_filial', cls: 'bg-blue-200' },
        { label: '심청이도 돕는다', to: 'help_both', cls: 'bg-green-200' }
      ],
      prompt: '💭 좋은 영향을 준 사람에게 감사하는 것이 중요할까?'
    },
    {
      id: 'continue_filial',
      title: '평생의 효도',
      text: `너는 계속 부모님께 효도했어.\n\n작은 일이라도 꾸준히.\n\n부모님이 행복해하셨어.\n\n시간이 흘렀어.\n\n그러던 어느 날...`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속한다', to: 'years_pass', cls: 'bg-blue-200' }
      ],
      prompt: '💭 효도는 언제까지 해야 하는 것일까?'
    },
    {
      id: 'continue_both',
      title: '두 가지 효도의 균형',
      text: `시간이 흘렀어.\n\n너는 부모님께도 효도하고,\n\n심청이네도 계속 도왔어.\n\n바빴지만 행복했어.\n\n그러던 어느 날...`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속한다', to: 'years_pass', cls: 'bg-blue-200' }
      ],
      prompt: '💭 여러 사람을 사랑하는 것은 가능할까?'
    },
    {
      id: 'rest_a_bit',
      title: '선택과 휴식',
      text: `너는 조금 쉬기로 했어.\n\n"너무 무리하면 안 돼."\n\n부모님이 걱정하셨어.\n\n잠깐 쉬고 나니,\n\n다시 힘이 났어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '다시 돕는다', to: 'continue_both', cls: 'bg-blue-200' },
        { label: '균형을 찾는다', to: 'find_balance', cls: 'bg-green-200' }
      ],
      prompt: '💭 쉬는 것도 선택의 일부일까?'
    },
    {
      id: 'stay_together',
      title: '함께하는 시간',
      text: `시간이 흘렀어.\n\n너와 심청이는 계속 함께했어.\n\n기쁠 때도, 슬플 때도.\n\n진정한 친구였어.\n\n그러던 어느 날...`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '무슨 일이 일어난다', to: 'years_pass', cls: 'bg-blue-200' }
      ],
      prompt: '💭 진정한 우정은 시간으로 증명될까?'
    },
    {
      id: 'find_rice',
      title: '희망 찾기의 선택',
      text: `"우리 함께 방법을 찾아보자!"\n\n하지만 300석은 너무 많았어.\n\n마을 전체가 1년 먹을 양이야.\n\n심청이가 절망했어.\n\n"불가능해..."`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '포기하지 말자고 한다', to: 'dont_give_up', cls: 'bg-blue-200' },
        { label: '함께 슬퍼한다', to: 'sad_together', cls: 'bg-gray-200' }
      ],
      prompt: '💭 불가능해 보이는 꿈을 꾸는 것이 잔인할까?'
    },
    {
      id: 'comfort_rice',
      title: '현실의 위로',
      text: `"300석은 너무 많아..."\n\n너는 심청이를 위로했어.\n\n"괜찮아. 다른 방법이 있을 거야."\n\n하지만 마음속으로는\n\n너도 절망적이었어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 함께한다', to: 'stay_together', cls: 'bg-blue-200' },
        { label: '시간이 흐른다', to: 'years_pass', cls: 'bg-green-200' }
      ],
      prompt: '💭 때로는 해결책이 없을 때도 있을까?'
    },
    {
      id: 'keep_secret',
      title: '선택의 침묵',
      text: `너는 말하지 않기로 했어.\n\n'희망을 주고 실망시키고 싶지 않아.'\n\n하지만 마음이 무거웠어.\n\n'이게 맞는 선택일까?'`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '나중에 말한다', to: 'tell_later', cls: 'bg-blue-200' },
        { label: '계속 비밀로 한다', to: 'keep_forever', cls: 'bg-gray-200' }
      ],
      prompt: '💭 진실을 숨기는 것이 때로는 친절일까?'
    },
    {
      id: 'ask_what',
      title: '큰 결심',
      text: `"무슨 일이야?"\n\n심청이가 말했어.\n\n"인당수 뱃사람들이 공양미 300석을 주겠대."\n"대신..."\n\n심청이가 멈칫했어.\n\n"인당수에 배가 안전하게 다닐 수 있도록 제물로 몸을 바쳐야 한대."`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '놀라며 묻는다', to: 'shocked', cls: 'bg-red-200' }
      ],
      prompt: '💭 최악의 선택을 해야 할 때가 있을까?'
    },
    {
      id: 'family_continue',
      title: '가족의 헌신',
      text: `네 가족은 계속 도왔어.\n\n다른 이웃들도 동참했어.\n\n마을이 따뜻해졌어.\n\n하지만 시간이 흘러...\n\n심청이가 심각한 표정으로 왔어.`,
      bg: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무슨 일이냐고 묻는다', to: 'ask_what', cls: 'bg-blue-200' }
      ],
      prompt: '💭 선한 행동이 모든 문제를 해결할 수 있을까?'
    },
    {
      id: 'help_neighbors',
      title: '확장되는 선행',
      text: `너희 가족은 다른 어려운 이웃도 도왔어.\n\n마을이 하나가 됐어.\n\n모두가 서로 도왔어.\n\n아름다운 마을이었어.\n\n그러던 어느 날...`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '무슨 일이 일어난다', to: 'ask_what', cls: 'bg-blue-200' }
      ],
      prompt: '💭 선행은 전염될 수 있을까?'
    },
    {
      id: 'play_after',
      title: '효도 후의 기쁨',
      text: `일을 마치고 너희는 놀았어.\n\n정말 즐거웠어.\n\n심청이도 행복해 보여.\n\n시간이 빨리 흘렀어.\n\n몇 년이 지났어...`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속한다', to: 'years_pass', cls: 'bg-blue-200' }
      ],
      prompt: '💭 의무를 다한 후의 즐거움이 더 소중할까?'
    },
    {
      id: 'respect_choice',
      title: '선택의 존중',
      text: `"네가 하고 싶은 대로 해."\n\n심청이가 고마워했어.\n\n"일 먼저 하고 놀자."\n\n너는 심청이를 도왔어.\n\n친구의 선택을 존중했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '함께 일한다', to: 'help_first', cls: 'bg-blue-200' },
        { label: '시간이 흐른다', to: 'years_pass', cls: 'bg-green-200' }
      ],
      prompt: '💭 친구의 선택을 존중하는 것이 진정한 우정일까?'
    },
    {
      id: 'regular_invite',
      title: '장애 없는 우정',
      text: `너희는 자주 함께 시간을 보냈어.\n\n심봉사님도 편하게 오셨어.\n\n장애는 더 이상 장벽이 아니었어.\n\n서로를 이해하고 사랑했어.\n\n시간이 흘렀어...`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF%EB%8B%A4%EC%9D%B4%EC%85%98hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속한다', to: 'years_pass', cls: 'bg-blue-200' }
      ],
      prompt: '💭 진정한 포용은 무엇일까?'
    },
    {
      id: 'play_at_sims',
      title: '친구 집에서',
      text: `너는 심청이네 집에서 놀았어.\n\n가난하지만 따뜻한 집.\n\n심봉사님도 함께 웃으셨어.\n\n행복한 시간이었어.\n\n시간이 흘렀어...`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속한다', to: 'years_pass', cls: 'bg-blue-200' }
      ],
      prompt: '💭 가난도 사랑을 막을 수 없을까?'
    },
    {
      id: 'dont_give_up',
      title: '희망의 선택',
      text: `"포기하지 마!"\n\n너는 심청이를 격려했어.\n\n"언젠가 방법이 있을 거야!"\n\n심청이가 조금 힘을 냈어.\n\n"고마워..."\n\n시간이 흘렀어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '함께 기다린다', to: 'years_pass', cls: 'bg-blue-200' }
      ],
      prompt: '💭 희망을 포기하지 않는 것이 때로는 고통일까?'
    },
    {
      id: 'sad_together',
      title: '슬픔 나누기',
      text: `너와 심청이는 함께 울었어.\n\n"불가능해..."\n\n"그래도 괜찮아."\n\n"우리 함께 있잖아."\n\n서로 위로했어.\n\n시간이 흘렀어...`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '계속 함께한다', to: 'years_pass', cls: 'bg-blue-200' }
      ],
      prompt: '💭 함께 슬퍼하는 것도 위로가 될까?'
    },
    {
      id: 'tell_later',
      title: '선택의 고백',
      text: `시간이 지나서 너는 말했어.\n\n"사실은..."\n\n심청이가 들었어.\n\n"그걸 알고 있었어."\n\n"하지만 말해주지 않아서 고마워."\n\n너는 놀랐어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '이해한다', to: 'understand', cls: 'bg-blue-200' }
      ],
      prompt: '💭 때로는 진실을 말하지 않는 것도 사랑일까?'
    },
    {
      id: 'keep_forever',
      title: '선택의 무게',
      text: `너는 끝까지 말하지 않았어.\n\n그게 맞다고 생각했어.\n\n시간이 흘렀어.\n\n그러던 어느 날,\n\n심청이가 직접 알게 됐어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '무슨 일이 일어난다', to: 'ask_what', cls: 'bg-blue-200' }
      ],
      prompt: '💭 비밀은 언젠가 드러날까?'
    },
    {
      id: 'shocked',
      title: '친구의 희생',
      text: `"뭐라고?!"\n\n너는 소리쳤어.\n\n"안 돼! 그럴 순 없어!"\n\n심청이가 조용히 말했어.\n\n"아버지 눈을 뜨게 할 수 있어."\n\n"이게... 유일한 방법이야."`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '막으려 한다', to: 'try_stop', cls: 'bg-red-200' },
        { label: '슬퍼한다', to: 'feel_sad', cls: 'bg-blue-200' }
      ],
      prompt: '💭 효도를 위해 목숨을 바칠 수 있을까?'
    },
    {
      id: 'find_balance',
      title: '삶의 균형',
      text: `너는 균형을 찾았어.\n\n부모님께 효도하고,\n\n친구도 돕고,\n\n네 시간도 가졌어.\n\n행복했어.\n\n그러던 어느 날...`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '무슨 일이 일어난다', to: 'ask_what', cls: 'bg-blue-200' }
      ],
      prompt: '💭 완벽한 균형은 존재할까?'
    },
    {
      id: 'understand',
      title: '이해와 용서',
      text: `"왜 말하지 않아도 괜찮았어?"\n\n"불가능한 희망보다는\n\n네가 옆에 있어주는 게\n\n더 위로가 됐어."\n\n너는 심청이를 꼭 안았어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '시간이 흐른다', to: 'ask_what', cls: 'bg-blue-200' }
      ],
      prompt: '💭 진정한 위로는 무엇일까?'
    },
    {
      id: 'try_stop',
      title: '친구를 막는 선택',
      text: `"안 돼! 다른 방법이 있을 거야!"\n\n너는 필사적으로 말했어.\n\n하지만 심청이는 결심한 얼굴이야.\n\n"이미 약속했어."\n\n"아버지를 위해서라면..."\n\n너는 무력했어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '마지막 밤을 함께한다', to: 'ending', cls: 'bg-blue-200' }
      ],
      prompt: '💭 친구의 선택을 막을 권리가 있을까?'
    },
    {
      id: 'feel_sad',
      title: '효도의 대가',
      text: `너는 너무 슬펐어.\n\n"정말 갈 거야?"\n\n심청이가 고개를 끄덕였어.\n\n"아버지를 위해서라면..."\n\n"이게 내 효도야."\n\n너는 눈물이 났어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '마지막 밤을 함께한다', to: 'ending', cls: 'bg-blue-200' }
      ],
      prompt: '💭 진정한 효도는 어디까지일까?'
    },
    {
      id: 'ending',
      title: '이별 전 마지막 밤',
      text: `인당수로 가기 전날 밤.\n너와 심청이는 함께 있었어.\n\n"나... 무서워."\n심청이가 처음으로 약한 모습을 보였어.\n\n"하지만 가야 해. 아버지를 위해서..."\n\n너는 심청이를 꼭 안아줬어.\n"넌 정말 대단한 사람이야."\n\n함께 밤을 새웠어.\n웃기도 하고, 울기도 하며 추억을 나눴어.\n\n"항상 친구로 남을 거야."\n\n새벽이 밝아왔어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '🔄 처음부터 다시', to: 'start', cls: 'bg-purple-600' }
      ],
      prompt: `📚 《심청전》을 읽어보면,\n효녀 심청이의 감동적인 이야기,\n장애를 가진 아버지를 향한 깊은 사랑,\n그리고 선택의 무게와 희생의 의미를 만날 수 있어!\n\n심청이의 선택은 어떤 결과를 가져올까?\n직접 읽어보며 감동을 느껴보자! 🌊✨`
    }
  ];
}

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

export function generateOngojipStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '스승님과의 수련',
      text: `${name.full}.
      
너는 산속 작은 암자에 사는 제자야.

스승님은 도술을 부리는 유명한 도사님이셔.

"제자야, 오늘부터 네게 진짜 중요한 것을 가르쳐주마."

스승님의 눈빛이 깊었어.`,
      bg: 'https://images.unsplash.com/photo-1612192422324-551b76c2985d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '열심히 듣는다', to: 'listen_carefully', cls: 'bg-blue-200' },
        { label: '도술이 궁금하다', to: 'ask_magic', cls: 'bg-green-200' }
      ],
      prompt: '💭 배움에서 가장 중요한 것은 무엇일까?'
    },
    {
      id: 'listen_carefully',
      title: '진짜 배움의 시작',
      text: `"스승님, 무엇을 배우나요?"
      
"진짜와 가짜를 구분하는 눈을 배우는 거란다."

"사람도 겉모습과 속마음이 다를 수 있지."

너는 고개를 끄덕였어.`,
      bg: 'https://images.unsplash.com/photo-1652043575899-abc124633ecf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 자세히 듣는다', to: 'learn_truth', cls: 'bg-blue-200' },
        { label: '도술 배우기를 청한다', to: 'ask_magic', cls: 'bg-green-200' }
      ],
      prompt: '💭 진짜와 가짜, 어떻게 구분할 수 있을까?'
    },
    {
      id: 'ask_magic',
      title: '능력에 대한 욕심',
      text: `"스승님, 도술을 가르쳐주세요!"
      
"허허, 서두르는구나."

"도술은 수단일 뿐이야. 마음이 먼저란다."

스승님이 너를 조용히 바라봤어.`,
      bg: 'https://images.unsplash.com/photo-1652043575899-abc124633ecf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '마음 수련을 먼저 한다', to: 'learn_truth', cls: 'bg-blue-200' },
        { label: '도술이 더 급하다', to: 'impatient', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 능력과 인성, 무엇이 먼저일까?'
    },
    {
      id: 'learn_truth',
      title: '진실을 보는 눈',
      text: `스승님이 두 개의 옥구슬을 꺼냈어.
      
"이 중 하나는 진짜, 하나는 가짜란다."

겉모습은 똑같아 보였어.

"어떻게 구분하나요?"

"마음으로 보는 거야."`,
      bg: 'https://images.unsplash.com/photo-1554196967-174b5a753c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '눈을 감고 느껴본다', to: 'feel_truth', cls: 'bg-blue-200' },
        { label: '겉모습을 자세히 본다', to: 'look_outside', cls: 'bg-green-200' }
      ],
      prompt: '💭 진짜는 눈으로 볼 수 있을까, 마음으로 느낄 수 있을까?'
    },
    {
      id: 'impatient',
      title: '급한 마음의 결과',
      text: `"저는 빨리 배우고 싶어요!"
      
스승님이 한숨을 쉬었어.

"그래, 그럼 한 가지 과제를 주마."

"마을에 가서 진짜 부자를 찾아오너라."

"진짜 부자요?"`,
      bg: 'https://images.unsplash.com/photo-1652043575899-abc124633ecf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '마을로 간다', to: 'go_village', cls: 'bg-blue-200' },
        { label: '다시 배우기를 청한다', to: 'learn_truth', cls: 'bg-green-200' }
      ],
      prompt: '💭 서두르는 것이 언제나 좋을까?'
    },
    {
      id: 'feel_truth',
      title: '마음으로 보는 법',
      text: `눈을 감고 두 구슬을 만져봤어.
      
하나는 따뜻했고, 하나는 차가웠어.

"이게 진짜예요!"

"잘했다. 진짜는 온기가 있단다."

스승님이 미소 지었어.`,
      bg: 'https://images.unsplash.com/photo-1552993843-71ada7343f48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 배운다', to: 'learn_more', cls: 'bg-blue-200' },
        { label: '마을 수행을 간다', to: 'go_village', cls: 'bg-green-200' }
      ],
      prompt: '💭 진짜는 어떤 온기를 가지고 있을까?'
    },
    {
      id: 'look_outside',
      title: '모습의 함정',
      text: `너는 구슬을 자세히 들여다봤어.\n      \n하나가 더 빛나 보였어.\n\n"이게 진짜예요!"\n\n"아니란다. 가짜가 더 화려하지."\n\n너는 잘못 골랐어.`,
      bg: 'https://images.unsplash.com/photo-1596931464674-a5d2c07943fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다시 시도한다', to: 'feel_truth', cls: 'bg-blue-200' },
        { label: '실망한다', to: 'disappointed', cls: 'bg-gray-200' }
      ],
      prompt: '💭 화려한 것이 언제나 진짜일까?'
    },
    {
      id: 'disappointed',
      title: '실패에서 배우기',
      text: `"저는 못하겠어요..."
      
"실망할 필요 없어. 실패는 배움의 과정이란다."

"겉모습에 속는 것은 당연해."

"중요한 건 다시 시도하는 거야."

스승님이 격려했어.`,
      bg: 'https://images.unsplash.com/photo-1758647533524-5bb8d14208ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다시 도전한다', to: 'feel_truth', cls: 'bg-blue-200' }
      ],
      prompt: '💭 실패는 끝일까, 시작일까?'
    },
    {
      id: 'learn_more',
      title: '부에 대한 가르침',
      text: `"스승님, 진짜 부자는 뭐예요?"
      
"돈이 많은 사람일까, 마음이 풍요로운 사람일까?"

"이제 마을에 가서 배워보렴."

"진짜 부자를 찾아오너라."`,
      bg: 'https://images.unsplash.com/photo-1758647533524-5bb8d14208ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '마을로 간다', to: 'go_village', cls: 'bg-blue-200' },
        { label: '더 물어본다', to: 'ask_about_wealth', cls: 'bg-green-200' }
      ],
      prompt: '💭 진짜 부자는 누구일까?'
    },
    {
      id: 'ask_about_wealth',
      title: '재물의 의미',
      text: `"부자는 돈 많은 사람 아닌가요?"
      
"겉으로 보이는 부와 진짜 부는 다르단다."

"어떤 사람은 돈은 많지만 마음이 가난하지."

"어떤 사람은 가난하지만 마음이 부자야."

너는 고개를 끄덕였어.`,
      bg: 'https://images.unsplash.com/photo-1758647533524-5bb8d14208ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '마을로 간다', to: 'go_village', cls: 'bg-blue-200' }
      ],
      prompt: '💭 진짜 부는 무엇으로 측정할까?'
    },
    {
      id: 'go_village',
      title: '마을로 가는 길',
      text: `산을 내려가 마을로 향했어.
      
마을 입구에 큰 기와집이 보였어.

"저기가 제일 부자 집이겠지?"

그때 누더기를 입은 노인이 지나갔어.`,
      
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '큰 집으로 간다', to: 'rich_house', cls: 'bg-yellow-200' },
        { label: '노인에게 묻는다', to: 'ask_old_man', cls: 'bg-blue-200' }
      ],
      prompt: '💭 첫인상이 전부를 말해줄까?'
    },
    {
      id: 'rich_house',
      title: '화려한 부자의 집',
      text: `큰 기와집 문을 두드렸어.
      
"뭐야? 거지 같은 도사가?"

주인이 인상을 찌푸렸어.

"진짜 부자를 찾아왔습니다."

"당연히 나지! 이 마을에서 제일 부자야!"`,
      bg: 'https://images.unsplash.com/photo-1568552643509-9f22db65a7c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '집 안을 살핀다', to: 'observe_rich', cls: 'bg-blue-200' },
        { label: '바로 인정한다', to: 'quick_judge', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 재산이 많으면 진짜 부자일까?'
    },
    {
      id: 'ask_old_man',
      title: '겸손한 만남',
      text: `"할아버지, 이 마을의 진짜 부자가 누구인지 아세요?"
      
노인이 웃었어.

"진짜 부자? 큰 집 주인을 말하는 건가?"

"아니면 마음이 부자인 사람을 말하는 건가?"

너는 멈칫했어.`,
      bg: 'https://images.unsplash.com/photo-1758384077516-64239756fd4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '마음의 부자를 묻는다', to: 'heart_rich', cls: 'bg-blue-200' },
        { label: '돈 많은 부자를 묻는다', to: 'money_rich', cls: 'bg-green-200' }
      ],
      prompt: '💭 부자에도 종류가 있을까?'
    },
    {
      id: 'observe_rich',
      title: '가짜 부유함',
      text: `집 안은 화려했어.
      
하지만 주인은 하인들에게 소리를 질렀어.

"이것들이! 제대로 일을 안 해!"

손님에게도 인색했어.

"차 한 잔 대접할 여유가 없어."

이상했어.`,
      bg: 'https://images.unsplash.com/photo-1568552643509-9f22db65a7c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '의문을 품는다', to: 'doubt_rich', cls: 'bg-blue-200' },
        { label: '돌아간다', to: 'leave_house', cls: 'bg-green-200' }
      ],
      prompt: '💭 진짜 부자는 어떻게 행동할까?'
    },
    {
      id: 'quick_judge',
      title: '성급한 판단의 실수',
      text: `"당신이 진짜 부자시군요!"\n      \n너는 기뻐하며 돌아왔어.\n\n스승님께 말씀드렸어.\n\n"큰 집 주인이 부자입니다!"\n\n스승님이 고개를 저었어.\n\n"다시 가보렴."`,
      bg: 'https://images.unsplash.com/photo-1762440114601-447bf3052e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다시 마을로 간다', to: 'return_village', cls: 'bg-blue-200' }
      ],
      prompt: '💭 빠른 판단이 언제나 옳을까?'
    },
    {
      id: 'heart_rich',
      title: '진짜 부를 찾아서',
      text: `"마음이 부자인 사람을 찾아요."
      
노인이 빙그레 웃었어.

"그럼 저 작은 초가집으로 가보게."

"김 서방네 말이야."

"가난하지만 마음만은 부자란다."`,
      bg: 'https://images.unsplash.com/photo-1758384077516-64239756fd4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '초가집으로 간다', to: 'poor_house', cls: 'bg-blue-200' },
        { label: '큰 집도 가본다', to: 'rich_house', cls: 'bg-green-200' }
      ],
      prompt: '💭 겉모습과 속마음, 무엇이 진실일까?'
    },
    {
      id: 'money_rich',
      title: '재물의 기준',
      text: `"돈이 제일 은 사람이요."
      
"그럼 저 큰 기와집 주인이지."

"하지만 그 사람, 마음은 가난하다네."

너는 고개를 갸우뚱했어.

"마음이 가난하다고요?"`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 물어본다', to: 'ask_more_wealth', cls: 'bg-blue-200' },
        { label: '큰 집으로 간다', to: 'rich_house', cls: 'bg-green-200' }
      ],
      prompt: '💭 돈과 마음, 무엇이 더 중요할까?'
    },
    {
      id: 'doubt_rich',
      title: '진실을 의심하다',
      text: `"뭔가 이상해요."
      
"돈은 많은데 인색하고 화를 잘 내요."

집을 나왔어.

그때 아까 그 노인이 보였어.

"할아버지, 질문이 있어요."`,
      bg: 'https://images.unsplash.com/photo-1758621996298-d19c4bcc43a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '노인에게 묻는다', to: 'ask_old_man', cls: 'bg-blue-200' }
      ],
      prompt: '💭 의심하는 것도 배움의 과정일까?'
    },
    {
      id: 'leave_house',
      title: '다른 길을 찾아',
      text: `집을 나와 마을을 걸었어.
      
작은 초가집에서 웃음소리가 들렸어.

가난해 보이는 집이었지만

따뜻한 기운이 느껴졌어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '초가집으로 간다', to: 'poor_house', cls: 'bg-blue-200' },
        { label: '노인을 찾는다', to: 'ask_old_man', cls: 'bg-green-200' }
      ],
      prompt: '💭 진짜 풍요로움은 어디서 올까?'
    },
    {
      id: 'ask_more_wealth',
      title: '마음의 가난함',
      text: `"마음이 가난하다는 게 뭐예요?"
      
"돈은 많아도 남에게 베풀 줄 모르고,"

"작은 것에 감사할 줄 모르는 거야."

"항상 더 갖고 싶어 하는 거지."

너는 이해했어.`,
      bg: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '진짜 부자를 찾는다', to: 'heart_rich', cls: 'bg-blue-200' }
      ],
      prompt: '💭 만족할 줄 모르는 것이 가난일까?'
    },
    {
      id: 'return_village',
      title: '반성의 시작',
      text: `"너무 성급했어."
      
마을로 다시 내려왔어.

이번엔 천천히 살펴봐야겠어.

큰 집도 있고, 작은 집도 있어.

어디로 가야 할까?`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '작은 집을 살핀다', to: 'poor_house', cls: 'bg-blue-200' },
        { label: '마을 사람들에게 묻는다', to: 'ask_villagers', cls: 'bg-green-200' }
      ],
      prompt: '💭 반성은 나를 성장시킬까?'
    },
    {
      id: 'ask_villagers',
      title: '진실을 향한 질문',
      text: `마을 사람들에게 물었어.\n      \n\"누가 진짜 부자인가요?\"\n\n\"큰 집 주인은 돈은 많지만 인색해요.\"\n\n\"김 서방은 가난하지만 늘 나눠요.\"\n\n의견이 갈렸어.`,
      bg: 'https://images.unsplash.com/photo-1700880324068-e84f9f4660f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '김 서방을 만난다', to: 'poor_house', cls: 'bg-blue-200' },
        { label: '스스로 판단한다', to: 'self_judge', cls: 'bg-green-200' }
      ],
      prompt: '💭 타인의 의견과 내 판단, 무엇을 믿을까?'
    },
    {
      id: 'poor_house',
      title: '초라한 집의 풍요로움',
      text: `작은 초가집 문을 두드렸어.

"어서 오세요!"

주인이 환하게 웃으며 맞았어.

집은 작고 가난했지만
따뜻한 차를 대접했어.

"별것 없지만 드세요."`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '감사히 받는다', to: 'receive_kindness', cls: 'bg-blue-200' },
        { label: '부자에 대해 묻는다', to: 'ask_about_rich', cls: 'bg-green-200' }
      ],
      prompt: '💭 가난해도 나눌 수 있을까?'
    },
    {
      id: 'self_judge',
      title: '나만의 기준',
      text: `두 집을 다시 떠올렸어.
      
큰 집은 화려하지만 인색해

작은 집은 가난하지만 따뜻해

스승님 말씀이 생각났어.

"진짜와 가짜를 구분하라."`,
      bg: 'https://images.unsplash.com/photo-1554196967-174b5a753c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '작은 집 주인이 진짜다', to: 'choose_poor', cls: 'bg-blue-200' },
        { label: '큰 집 주인이 진짜다', to: 'choose_rich', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 내 기준은 무엇일까?'
    },
    {
      id: 'receive_kindness',
      title: '진짜 부의 발견',
      text: `차를 마시며 이야기를 나눴어.
      
"저희는 가난하지만 행복해요."

"이웃과 나누고, 서로 돕고."

"그게 진짜 부라고 생각해요."

너는 깨달았어.

이 사람이 진짜 부자야!`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '스승님께 돌아간다', to: 'return_master', cls: 'bg-blue-200' },
        { label: '더 배운다', to: 'learn_from_poor', cls: 'bg-green-200' }
      ],
      prompt: '💭 나눔이 진짜 부를 만들까?'
    },
    {
      id: 'ask_about_rich',
      title: '부에 대한 생각',
      text: `"진짜 부자가 누구라고 생각하세요?"
      
"글쎄요, 돈이 많은 게 부자일까요?"

"아니면 마음이 풍요로운 게 부자일까요?"

주인이 잔잔히 웃었어.

"스님이 직접 판단해보세요."`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '깨달음을 얻는다', to: 'receive_kindness', cls: 'bg-blue-200' }
      ],
      prompt: '💭 정답은 스스로 찾는 것일까?'
    },
    {
      id: 'learn_from_poor',
      title: '가난 속의 지혜',
      text: `"어떻게 그렇게 행복하세요?"
      
"적은 것에 감사하고,"

"있는 것을 나누니까요."

"욕심을 버리면 모든 게 풍족해져요."

귀한 가르침이었어.`,
      bg: 'https://images.unsplash.com/photo-1659090833777-fcdb820ce4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwdGhhdGNoZWQlMjBob3VzZSUyMGtvcmVhfGVufDF8fHx8MTc2MzU1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '스승님께 돌아간다', to: 'return_master', cls: 'bg-blue-200' }
      ],
      prompt: '💭 욕심을 버리면 부자가 될까?'
    },
    {
      id: 'choose_poor',
      title: '옳은 선택',
      text: `"작은 집 주인이 진짜 부자예요!"
      
마음속으로 확신했어.

스승님께 돌아가 말씀드려야지.

암자로 향했어.`,
      bg: 'https://images.unsplash.com/photo-1758329024663-faabb85fd111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '스승님께 돌아간다', to: 'return_master', cls: 'bg-blue-200' }
      ],
      prompt: '💭 확신은 어디서 올까?'
    },
    {
      id: 'choose_rich',
      title: '또 다른 실수',
      text: `"큰 집 주인이 진짜 부자예요!"
      
스승님께 돌아가 말씀드렸어.

"정말 그렇게 생각하느냐?"

스승님의 눈빛이 안타까웠어.

"다시 한번 생각해보렴."`,
      bg: 'https://images.unsplash.com/photo-1652043575899-abc124633ecf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다시 생각한다', to: 'reconsider', cls: 'bg-blue-200' }
      ],
      prompt: '💭 실수를 반복하는 것도 배움일까?'
    },
    {
      id: 'return_master',
      title: '스승님께 보고',
      text: `"스승님, 돌아왔습니다!"
      
"그래, 누가 진짜 부자더냐?"

"작은 집 김 서방입니다."

"왜 그렇게 생각하느냐?"

너는 배운 것을 말했어.`,
      bg: 'https://images.unsplash.com/photo-1652043575899-abc124633ecf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '깨달음을 설명한다', to: 'explain_learning', cls: 'bg-blue-200' }
      ],
      prompt: '💭 배움을 말로 표현할 수 있을까?'
    },
    {
      id: 'reconsider',
      title: '반성과 깨달음',
      text: `"제가 또 겉모습만 봤네요..."
      
큰 집은 화려했지만 인색했어.

작은 집은 가난했지만 나눴어.

"진짜 부자는 김 서방이에요!"

스승님이 고개를 끄덕였어.`,
      bg: 'https://images.unsplash.com/photo-1652043575899-abc124633ecf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '깨달음을 설명한다', to: 'explain_learning', cls: 'bg-blue-200' }
      ],
      prompt: '💭 반성은 언제 일어날까?'
    },
    {
      id: 'explain_learning',
      title: '진짜 부의 의미',
      text: `"돈이 많아도 나누지 않으면 가짜 부자요,"
      
"가난해도 나눌 줄 알면 진짜 부자예요."

"겉모습이 아니라 마음이 중요해요!"

스승님이 만족스럽게 웃었어.

"잘 배웠구나."`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '다음 수행을 받는다', to: 'next_lesson', cls: 'bg-blue-200' }
      ],
      prompt: '💭 깨달음은 나를 어떻게 변화시킬까?'
    },
    {
      id: 'next_lesson',
      title: '도술 수련의 시작',
      
      text: `"이제 도술을 가르쳐주마."
      
스승님이 손짓하자 물이 공중에 떠올랐어.

"우와! 저도 할 수 있나요?"

"마음이 바르면 가능하단다."

너는 설레었어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '열심히 배운다', to: 'learn_magic', cls: 'bg-blue-200' },
        { label: '조심스럽게 배운다', to: 'careful_learning', cls: 'bg-green-200' }
      ],
      prompt: '💭 큰 힘에는 큰 책임이 따를까?'
    },
    {
      id: 'learn_magic',
      title: '능력의 성장',
      text: `매일 도술을 연습했어.
      
물을 움직이고, 작은 물건을 띄우고.

점점 실력이 늘었어.

"스승님, 저 잘하죠?"

뿌듯했어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '더 큰 도술을 배운다', to: 'advanced_magic', cls: 'bg-blue-200' },
        { label: '겸손함을 유지한다', to: 'stay_humble', cls: 'bg-green-200' }
      ],
      prompt: '💭 실력이 늘면 교만해지기 쉬울까?'
    },
    {
      id: 'careful_learning',
      title: '신중한 수련',
      text: `"이 도술, 조심해서 써야겠어요."
      
"그래, 잘 알고 있구나."

"도술은 남을 돕는 데 써야 해."

"절대 잘난 척하거나 해치는 데 쓰면 안 돼."

스승님이 당부했어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '더 배운다', to: 'advanced_magic', cls: 'bg-blue-200' }
      ],
      prompt: '💭 능력을 어떻게 사용할지가 중요할까?'
    },
    {
      id: 'advanced_magic',
      title: '고급 도술 전수',
      text: `"이제 사람 모습을 바꾸는 법을 가르쳐주마."
      
"사람을 만들 수도 있어."

"하지만 함부로 쓰면 안 된다."

"이건 아주 위험한 도술이란다."

너는 긴장했어.`,
      bg: 'https://images.unsplash.com/photo-1592899940134-3161736713c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '신중하게 배운다', to: 'learn_creation', cls: 'bg-blue-200' },
        { label: '무서워서 거절한다', to: 'refuse_magic', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 강력한 힘일수록 책임도 클까?'
    },
    {
      id: 'stay_humble',
      title: '겸손한 마음',
      text: `"스승님, 저는 아직 부족해요."
      
"겸손하구나. 그게 중요하단다."

"실력이 좋아질수록 더 겸손해야 해."

"교만하면 실수하기 쉽거든."

스승님의 말씀이 깊었어.`,
      bg: 'https://images.unsplash.com/photo-1731838201947-25e2ebdf4e8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 배운다', to: 'advanced_magic', cls: 'bg-blue-200' }
      ],
      prompt: '💭 겸손함이 진짜 실력일까?'
    },
    {
      id: 'refuse_magic',
      title: '두려움과 지혜',
      text: `"스승님, 저는... 아직 준비가 안 된 것 같아요."
      
"현명한 판단이다."

"두려워할 줄 아는 것도 지혜란다."

"때가 되면 다시 가르쳐주마."

안도했어.`,
      bg: 'https://images.unsplash.com/photo-1763143396637-2b05bf5277cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '기본 수련을 계속한다', to: 'continue_basic', cls: 'bg-blue-200' }
      ],
      prompt: '💭 거절할 줄 아는 것도 용기일까?'
    },
    {
      id: 'learn_creation',
      title: '창조의 도술',
      text: `"집중하거라."
      
스승님이 주문을 외우자
진흙이 사람 모양으로 변했어.

"생명은 줄 수 없지만 모양은 만들 수 있어."

"악한 사람을 깨우치는 데 쓰는 거야."`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '따라 배운다', to: 'practice_creation', cls: 'bg-blue-200' },
        { label: '신중하게 관찰한다', to: 'observe_creation', cls: 'bg-green-200' }
      ],
      prompt: '💭 창조의 힘은 어떻게 사용해야 할까?'
    },
    {
      id: 'continue_basic',
      title: '기본의 중요성',
      text: `기본 도술을 계속 연마했어.

 물을 다루고, 바람을 일으키고.
 
"기본이 탄탄해야 고급 도술도 안전해."

스승님 말씀이 맞았어.

실력이 더 견고해졌어.`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '시험받기를 청한다', to: 'ask_test', cls: 'bg-blue-200' }
      ],
      prompt: '💭 기본이 전부를 만들까?'
    },
    {
      id: 'practice_creation',
      title: '욕심의 시작',
      text: `열심히 연습했어.
      
작은 인형을 만들 수 있게 됐어.

"나도 이제 대단한데?"

스승님이 외출한 어느 날,

혼자 연습하고 싶었어.`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '스승님을 기다린다', to: 'wait_master', cls: 'bg-blue-200' },
        { label: '혼자 연습한다', to: 'practice_alone', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 허락 없이 해도 될까?'
    },
    {
      id: 'observe_creation',
      title: '신중한 관찰',
      text: `스승님의 모든 동작을 눈여겨봤어.\n      \n주문, 손짓, 마음가짐.\n\n\"서두르지 말고 천천히 배우렴.\"\n\n\"이 도술은 위험하니까.\"\n\n너는 고개를 끄덕였어.`,
      bg: 'https://images.unsplash.com/photo-1699324908366-33788d82761a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '천천히 배운다', to: 'slow_learning', cls: 'bg-blue-200' }
      ],
      prompt: '💭 천천히 가는 것이 빠른 길일까?'
    },
    {
      id: 'wait_master',
      title: '인내의 미덕',
      text: `"스승님이 돌아올 때까지 기다려야지."
      
다른 수련을 했어.

명상하고, 경전을 읽고.

스승님이 돌아왔어.

"잘 기다렸구나."`,
      bg: 'https://images.unsplash.com/photo-1758696654486-925ac9cd9801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 배운다', to: 'slow_learning', cls: 'bg-blue-200' }
      ],
      prompt: '💭 기다림도 수련일까?'
    },
    {
      id: 'practice_alone',
      title: '큰 실수의 시작',
      text: `"내가 한번 해볼까?"
      
주문을 외우며 인형을 만들었어.

그런데!

인형이 움직이기 시작했어!

"어? 이게 왜?"

당황했어.`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '멈추려 한다', to: 'stop_magic', cls: 'bg-blue-200' },
        { label: '계속 관찰한다', to: 'watch_doll', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 실수는 어떻게 시작될까?'
    },
    {
      id: 'slow_learning',
      title: '올바른 수련',
      text: `스승님과 함께 천천히 배웠어.\n      \n"이 도술은 악한 사람을 반성시키는 거야."\n\n"그 사람과 똑같이 생긴 사람을 만들어,"\n\n"잘못을 깨닫게 하는 거지."\n\n이해했어.`,
      bg: 'https://images.unsplash.com/photo-1632397299937-b2c5bb1e54a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '시험을 받는다', to: 'ask_test', cls: 'bg-blue-200' }
      ],
      prompt: '💭 도술의 진짜 목적은 무엇일까?'
    },
    {
      id: 'stop_magic',
      title: '통제 불능',
      text: `"멈춰! 멈추라고!"
      
하지만 인형은 멈추지 않았어.

점점 커지고, 움직이고.

"이러려던 게 아닌데!"

스승님이 급히 돌아왔어.

"무슨 짓이냐!"`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사과한다', to: 'apologize', cls: 'bg-blue-200' }
      ],
      prompt: '💭 통제할 수 없는 힘은 위험할까?'
    },
    {
      id: 'watch_doll',
      title: '더 큰 실수',
      text: `"신기한데? 조금 더 봐볼까?"
      
인형이 점점 커졌어.

사람 크기가 됐어!

그리고 말을 하기 시작했어!

"나는 누구지?"

완전히 잘못됐어!`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '도움을 청한다', to: 'call_help', cls: 'bg-blue-200' }
      ],
      prompt: '💭 호기심이 화를 부를까?'
    },
    {
      id: 'apologize',
      title: '진심 어린 반성',
      text: `"스승님, 죄송합니다!"
      
스승님이 인형을 멈췄어.

"왜 혼자 했느냐?"

"가... 너무 자신만만했어요."

"허락도 안 받고..."

눈물이 났어.`,
      bg: 'https://images.unsplash.com/photo-1652043576230-abebdacb94af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '반성문을 쓴다', to: 'write_reflection', cls: 'bg-blue-200' },
        { label: '무릎 꿇고 사죄한다', to: 'deep_apology', cls: 'bg-green-200' }
      ],
      prompt: '💭 진짜 사과는 무엇일까?'
    },
    {
      id: 'call_help',
      title: '뒤늦은 후회',
      text: `"스승님! 도와주세요!"

스승님이 급히 달려왔어.

주문으로 인형을 멈췄어.

"너 혼자 했구나."

"예... 죄송합니다."

스승님이 한숨을 쉬었어.`,
      bg: 'https://images.unsplash.com/photo-1762112800093-764ab82c2301?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '반성한다', to: 'apologize', cls: 'bg-blue-200' }
      ],
      prompt: '💭 후회는 언제 오는가?'
    },
    {
      id: 'ask_test',
      title: '마지막 시험',
      text: `"스승님, 시험을 받고 싶습니다."
      
"그래, 마지막 시험이다."

"마을에 아주 인색한 부자가 있다."

"그를 반성시켜 오너라."

"도술을 써도 좋다."`,
      bg: 'https://images.unsplash.com/photo-1746535908442-0140112ddc1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '마을로 간다', to: 'final_mission', cls: 'bg-blue-200' }
      ],
      prompt: '💭 배운 것을 실천할 준비가 됐을까?'
    },
    {
      id: 'write_reflection',
      title: '반성의 글',
      text: `밤새 반성문을 썼어.
      
"저는 교만했습니다."

"스승님 허락도 없이 함부로 했습니다."

"능력은 신중하게 써야 함을 배웠습니다."

스승님이 읽어보셨어.`,
      bg: 'https://images.unsplash.com/photo-1759665360546-d6abbc246775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '용서를 구한다', to: 'ask_forgiveness', cls: 'bg-blue-200' }
      ],
      prompt: '💭 글로 쓰면 반성이 더 깊어질까?'
    },
    {
      id: 'deep_apology',
      title: '진정한 뉘우침',
      text: `무릎을 꿇고 절했어.
      
"제가 잘못했습니다."

"다시는 교만하지 않겠습니다."

"능력을 함부로 쓰지 않겠습니다."

스승님이 일으켜 세웠어.`,
      bg: 'https://images.unsplash.com/photo-1747486710510-01cf450ad947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '용서를 구한다', to: 'ask_forgiveness', cls: 'bg-blue-200' }
      ],
      prompt: '💭 행동으로 보이는 반성이 진짜일까?'
    },
    {
      id: 'ask_forgiveness',
      title: '용서와 기회',
      text: `"스승님, 용서해주세요."
      
"네가 진심으로 반성하는구나."

"실수는 누구나 해. 중요한 건 배우는 거야."

"다시 한 번 기회를 주마."

감사했어.`,
      bg: 'https://images.unsplash.com/photo-1756216996882-50d9360690c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '새로운 마음으로 배운다', to: 'new_start', cls: 'bg-blue-200' }
      ],
      prompt: '💭 용서는 새로운 시작일까?'
    },
    {
      id: 'new_start',
      title: '겸손한 재출발',
      text: `실수 이후로 달라졌어.
      
더 신중하게, 더 겸손하게.

"능력은 남을 위해 쓰는 거야."

스승님 말씀을 가슴에 새겼어.

드디어 시험을 받을 때가 왔어.`,
      
      bg: 'https://images.unsplash.com/photo-1758384077255-b53dc9e171a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '시험을 받는다', to: 'ask_test', cls: 'bg-blue-200' }
      ],
      prompt: '💭 실수가 나를 성장시켰을까?'
    },
    {
      id: 'final_mission',
      title: '인색한 부자',
      text: `마을에 도착했어.\n      \n소문의 그 부자 집이야.\n\n\"재물은 많지만 베풀 줄 모른대.\"\n\n\"가난한 사람을 업신여긴대.\"\n\n어떻게 깨우쳐줄까?`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '먼저 관찰한다', to: 'observe_ongojip', cls: 'bg-blue-200' },
        { label: '직접 만난다', to: 'meet_ongojip', cls: 'bg-green-200' }
      ],
      prompt: '💭 어떻게 사람을 변화시킬까?'
    },
    {
      id: 'observe_ongojip',
      title: '진짜 모습 파악',
      text: `며칠간 부자를 관찰했어.\n      \n구걸하는 사람을 쫓아내고,\n\n하인들에게 소리 지르고,\n\n재물을 쌓아두고만 있어.\n\n\"저 사람, 정말 반성이 필요해.\"`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계획을 세운다', to: 'make_plan', cls: 'bg-blue-200' }
      ],
      prompt: '💭 관찰이 이해의 시작일까?'
    },
    {
      id: 'meet_ongojip',
      title: '차가운 대면',
      text: `부자를 만나러 갔어.\n      \n\"스님, 시주할 것 없소!\"\n\n문전박대했어.\n\n\"부자님, 한 가지 여쭤봐도 될까요?\"\n\n\"바빠! 썩 물러가시오!\"\n\n인정머리가 없었어.`,
      bg: 'https://images.unsplash.com/photo-1758620402428-6af3a0be7979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '물러나 계획을 세운다', to: 'make_plan', cls: 'bg-blue-200' }
      ],
      prompt: '💭 거절당해도 포기하지 않을까?'
    },
    {
      id: 'make_plan',
      title: '깨우침의 고민',
      text: `"어떻게 해야 반성시킬까?"\n      \n말로 설득할까? 아니면 도술을 써야 할까?\n\n"저 사람이 자기 모습을 볼 수 있다면..."\n\n"분명 뭔가 깨달을 거야."\n\n하지만 어떻게 해야 할까?`,
      bg: 'https://images.unsplash.com/photo-1739713908421-39e6168dead5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 고민한다', to: 'think_more', cls: 'bg-blue-200' },
        { label: '소문을 더 듣는다', to: 'hear_more_rumors', cls: 'bg-green-200' }
      ],
      prompt: '💭 목적이 수단을 정당화할까?'
    },
    {
      id: 'think_more',
      title: '방법을 고민하다',
      text: `"도술을 쓰면 쉽게 할 수 있을 거야."
      
"하지만 진짜 반성하게 할 수 있을까?"

"스승님이라면 어떻게 하실까?"

생각이 깊어졌어.

방법보다 중요한 게 있어.`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 알아본다', to: 'hear_more_rumors', cls: 'bg-blue-200' }
      ],
      prompt: '💭 방법보다 중요한 것은 무엇일까?'
    },
    {
      id: 'hear_more_rumors',
      title: '옹고집의 소문',
      text: `마을을 돌아다니며 더 들었어.
      
"옹고집이 얼마나 인색한지 아세요?"

"제사도 안 지내고, 손님도 안 받고."

"오직 돈만 모은대요."

"누군가 좀 혼내줬으면..."`,
      bg: 'https://images.unsplash.com/photo-1757825422820-2e1b024bb562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 알아본다', to: 'learn_more_ongojip', cls: 'bg-blue-200' }
      ],
      prompt: '💭 소문과 진실, 얼마나 다를까?'
    },
    {
      id: 'learn_more_ongojip',
      title: '완벽한 대상',
      text: `옹고집에 대해 더 알아봤어.\n      \n진짜 부자와 가짜 부자.\n\n겉으로만 부자인 사람.\n\n"이 사람이야말로..."\n\n"내가 배운 걸 실천할 수 있는 대상이야!"`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '결심한다', to: 'decision', cls: 'bg-blue-200' }
      ],
      prompt: '💭 배움을 실천할 때가 왔을까?'
    },
    {
      id: 'decision',
      title: '운명의 결심',
      text: `"옹고집을 꼭 깨우쳐야겠어."
      
어떻게 해야 할지는 아직 모르겠어.

하지만 스승님께 배운 모든 것.

진짜와 가짜, 부자의 의미, 반성.

분명 방법을 찾을 수 있을 거야!`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '암자로 돌아간다', to: 'return_final', cls: 'bg-blue-200' }
      ],
      prompt: '💭 배움은 실천으로 완성될까?'
    },
    {
      id: 'return_final',
      title: '스승님께 보고',
      text: `스승님께 돌아가 말씀드렸어.\n      \n"옹고집이라는 부자를 찾았습니다."\n\n"그를 깨우고 싶습니다."\n\n스승님이 고개를 끄덕였어.\n\n"그래, 잘 생각했다."\n\n"하지만 조심하렴."`,
      bg: 'https://images.unsplash.com/photo-1758696654393-69d17450aeb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '허락을 받는다', to: 'get_permission', cls: 'bg-blue-200' }
      ],
      prompt: '💭 스승의 허락이 중요할까?'
    },
    {
      id: 'get_permission',
      title: '떠날 준비',
      text: `"가서 그를 깨우쳐주렴."\n      \n"하지만 기억하거라."\n\n"도술은 깨우침을 위한 것이지,\n벌을 주기 위한 게 아니란다."\n\n"네, 잘 다녀오겠습니다!"`,
      
      bg: 'https://images.unsplash.com/photo-1746535908442-0140112ddc1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '옹고집을 찾아 떠난다', to: 'ending', cls: 'bg-blue-200' }
      ],
      prompt: '💭 목적을 잊지 않는 것이 중요할까?'
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `너는 옹고집을 찾아 떠났어.
      
진짜와 가짜를 구분하는 눈,

진짜 부자의 의미,

실수하고 반성하며 배운 모든 것.

이제 옹고집을 만나
어떻게 깨우쳐줄지 고민할 때야!

📚 서점이나 도서관에서 《옹고집전》을 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' }
      ],
      prompt: '《옹고집전》 - 인색한 옹고집에게 신기한 일이 일어나 반성하게 되는 이야기! 진짜와 가짜, 진정한 부자의 의미, 반성과 깨달음의 가치를 담은 우리 고전!'
    }
  ];
}
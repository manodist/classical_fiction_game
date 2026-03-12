import type { Scene } from '../../types';

function createNameVariations(lastName: string, firstName: string) {
  const fullName = lastName + firstName;
  const hasJongseong = (name: string) => {
    const lastChar = name.charCodeAt(name.length - 1);
    return (lastChar - 0xac00) % 28 > 0;
  };

  const firstHasJongseong = hasJongseong(firstName);

  return {
    full: fullName,
    first: firstName,
    은는: firstName + (firstHasJongseong ? '은' : '는'),
    이가: firstName + (firstHasJongseong ? '이' : '가'),
    을를: firstName + (firstHasJongseong ? '을' : '를'),
    의: firstName + '의',
    casual: firstName + '아',
    polite: fullName + ' 학생',
  };
}

export function generateHeosaengStory(
  gradeLevel: string,
  lastName: string,
  firstName: string
): Scene[] {
  const name = createNameVariations(lastName, firstName);

  return [
    {
      id: 'start',
      title: '책방의 책쾌',
      text: `너의 이름은 ${name.full}. 
      
조선시대 한양 장터에서 책을 사고파는 책쾌야. 책 판매자와 소비자 사이에서 거래를 중개하지. 
      
양반들이 읽다 버린 책, 중국에서 들어온 책, 새로 쓴 책... 온갖 책이 네 손을 거쳐가.

한 선비가 책방 문을 열고 들어왔어. 옷은 남루하지만 눈빛만은 깊었어.

"혹시 경세제민에 관한 책이 있소?" 선비가 물었어.`,
      bg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwc2hvcHxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '실학 서적(실용적인 책)을 권한다', to: 'recommend_practical', cls: 'bg-blue-200' },
        { label: '유학 경전(유교 교과서)을 권한다', to: 'recommend_classic', cls: 'bg-green-200' },
      ],
      prompt: '💭 어떤 학문이 백성을 이롭게 할까?',
    },
    {
      id: 'recommend_practical',
      title: '실학의 시작',
      text: `"『성호사설』이나 『반계수록』은 어떠십니까? 실제로 쓸 수 있는 지식이 담겨 있습니다."
      
선비의 눈이 반짝였어. 
"오, 실학서! 바로 그런 책을 찾고 있었소. 공허한 이론보다 백성을 위한 실용적 학문... 좋소!" 선비가 기뻐했어.

책값을 치르며 선비가 말했어. 
"나는 허생이라 하오. 앞으로 자주 들르겠소."`,
      bg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwc2hvcHxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '허생을 기억한다', to: 'meet_heosaeng', cls: 'bg-purple-200' },
      ],
      prompt: '💭 실학이란 무엇일까?',
    },
    {
      id: 'recommend_classic',
      title: '경전의 한계',
      text: `"『논어』나 『맹자』는 어떠십니까? 성현의 가르침이..."
      
선비가 고개를 저었어. 
"그런 책은 이미 다 읽었소. 백성이 굶주리는데 공자 말씀만으로는 부족하오. 실제로 농사짓고 장사하는 방법, 나라를 부강하게 만드는 법... 그런 책은 없겠소?"

너는 깨달았어. 이 선비는 보통 사람이 아니구나.`,
      bg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwc2hvcHxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '실학서를 찾아준다', to: 'recommend_practical', cls: 'bg-blue-200' },
      ],
      prompt: '💭 이론과 실천, 무엇이 더 중요할까?',
    },
    {
      id: 'meet_heosaeng',
      title: '허생이라는 남자',
      text: `그날 이후 허생은 주에 한 번 책방에 들렀어. 항상 실용적인 책만 골랐지. 어느 날 허생이 한숨을 쉬며 말했어.

"요즘 들어 아내가 점점 바가지를 긁소. 책만 읽고 돈은 못 벌어온다고... 하지만 이 책들을 다 익히면 언젠가 내 큰일을 할 수 있을 것 같소." 허생의 눈빛은 확신에 차 있었어.

너는 궁금했어. 이 가난한 선비가 큰일을 할 수 있을까?`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYXJrZXQlMjBwbGFjZXxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '허생을 응원한다', to: 'encourage_heosaeng', cls: 'bg-green-200' },
        { label: '의아해한다', to: 'doubt_heosaeng', cls: 'bg-red-200' },
      ],
      prompt: '💭 가난한 학자의 꿈을 믿을 수 있을까?',
    },
    {
      id: 'encourage_heosaeng',
      title: '책쾌의 응원',
      text: `"책에는 세상을 바꿀 힘이 있습니다." 너는 말했어.

허생이 고마워했어. "그대만큼은 나를 이해해주는구려."

"책값이 모자라면 다음에 주셔도 됩니다. 공부하는 사람을 돕는 것도 내 일이니까요."

허생은 감동했어. "은혜를 꼭 갚겠소!"`,
      bg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwc2hvcHxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '새 손님을 맞는다', to: 'meet_scholar', cls: 'bg-purple-200' },
      ],
      prompt: '💭 누군가를 믿어주는 것의 의미는?',
    },
    {
      id: 'doubt_heosaeng',
      title: '현실의 벽',
      text: `"책만 읽어서는 배를 채울 수 없습니다." 너는 솔직하게 조언을 했어.
      
허생이 쓸쓸히 웃었어. "그것도 맞는 말이오. 하지만..."
"지식이 있으면 기회가 왔을 때 잡을 수 있소. 나는 그 기회를 기다리고 있소."

너는 이 때 허생의 눈빛에서 뭔가 다른 것을 느낀거야.`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYXJrZXQlMjBwbGFjZXxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '생각이 바뀐다', to: 'encourage_heosaeng', cls: 'bg-green-200' },
      ],
      prompt: '💭 준비된 자에게만 기회가 올까?',
    },
    {
      id: 'meet_scholar',
      title: '또 다른 손님',
      text: `며칠 후, 다른 선비가 들어왔어. 기품 있는 양반이었지.
      
"저기... 실례하오만 내 소설의 글감을 찾고 있는 참이오. 근래 백성들의 삶에 대해 이야기를 좀 나눌 수 있겠소?"

"소설을 쓰십니까?" 너는 놀랐어. 양반이 소설을 쓴다니!

"세상의 부조리를 이야기로 고발하고 싶소."`,
      bg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwc2hvcHxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '흥미를 느낀다', to: 'yeonam_story', cls: 'bg-blue-200' },
      ],
      prompt: '💭 이야기로 세상을 바꿀 수 있을까?',
    },
    {
      id: 'yeonam_story',
      title: '소설가의 글',
      text: `"어떤 소설을 쓰실 생각이십니까?" 너는 궁금했어.
      
"양반들을 풍자하는 이야기를 구상 중이오." 그가 말했어.

"그리고 앞으로도 백성들의 삶에 실질적으로 도움이 되는 이야기를 많이 쓸 생각이오. 실제 있었던 일들을 바탕으로, 교훈을 담아서."

너는 생각했어. 이 양반도 범상치 않구나.`,
      bg: 'https://images.unsplash.com/photo-1723479128748-8cac9c3282d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjYWxsaWdyYXBoeSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzU1NzQ5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '이야기를 더 듣는다', to: 'yeonam_philosophy', cls: 'bg-purple-200' },
      ],
      prompt: '💭 글을 쓰는 목적은 무엇일까?',
    },
    {
      id: 'yeonam_philosophy',
      title: '소설의 힘',
      text: `"왜 소설을 쓰십니까?" 너는 물었어.
      
그 소설가가 말했어. "백성의 고통을 양반들에게 알리고, 잘못된 제도를 고치고 싶소."

"직접 상소를 올리면 되지 않습니까?" 

"이야기는 상소보다 강하오. 사람의 마음을 움직이니까."

너는 고개를 끄덕였어. 소설이 세상을 바꿀 수 있구나.`,
      bg: 'https://images.unsplash.com/photo-1741121625227-8ab247bf9d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHRyYWRpdGlvbmFsJTIwc2Nob2xhcnxlbnwxfHx8fDE3NjM1NTc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '감명받는다', to: 'heosaeng_returns', cls: 'bg-green-200' },
      ],
      prompt: '💭 이야기는 어떤 힘을 가질까?',
    },
    {
      id: 'heosaeng_returns',
      title: '허생의 질문',
      text: `그 소설가가 책을 고르는 사이, 허생이 들어왔어. 두 사람이 마주쳤지.
      
"오, 허생! 여전히 공부만 하나?" 그가 반가워했어.

"선배님, 오랜만에 뵙습니다. 저는 요즘 경제를 공부하고 있습니다." 허생이 답했어.

"경제?"

"네, 물건 값이 오르내리는 원리, 그리고 장사하는 법을 익히는 중이지요."`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYXJrZXQlMjBwbGFjZXxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '대화를 듣는다', to: 'economics_talk', cls: 'bg-blue-200' },
      ],
      prompt: '💭 선비가 경제를 배운다?',
    },
    {
      id: 'economics_talk',
      title: '경제의 원리',
      text: `그 소설가가 물었어. "선비가 돈 이야기를 하다니, 무슨 생각이 있어서 그런게지?"
      
"백성이 굶주리는 것도, 나라가 가난한 것도 모두 경제 때문입니다. 양반들은 '의리'만 외치지만, 백성은 먹고살 방법이 필요합니다." 허생이 진지했어.

너는 옆에서 듣다가 끼어들었어. "제 책방도 경제원리로 돌아갑니다. 수요와 공급이죠."`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYXJrZXQlMjBwbGFjZXxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '수요와 공급을 설명한다', to: 'supply_demand', cls: 'bg-purple-200' },
      ],
      prompt: '💭 선비에게 경제가 필요할까?',
    },
    {
      id: 'supply_demand',
      title: '수요와 공급',
      text: `"책이 귀하면 값이 오르고, 흔하면 내립니다. 사람들이 많이 원하는 물건은 비싸지죠."

허생은 눈을 빛냈어. "그렇다면 귀한 물건을 많이 사두었다가 팔면?"

"그러한 전략을 매점매석이라고 합니다. 하지만..." 너는 고민하며 말을 멈췄어.

그 소설가가 고개를 저었어. "그건 시장을 혼란시키고 백성을 괴롭히는 짓 아닌가?"`,
      bg: 'https://images.unsplash.com/photo-1685973015825-ef1a3dc5d31e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdHMlMjB2ZWdldGFibGVzJTIwbWFya2V0fGVufDF8fHx8MTc2MzU1MDg4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '매점매석의 문제를 말한다', to: 'monopoly_problem', cls: 'bg-red-200' },
        { label: '경제 전략으로 본다', to: 'economics_strategy', cls: 'bg-blue-200' },
      ],
      prompt: '💭 매점매석은 나쁜 것일까?',
    },
    {
      id: 'monopoly_problem',
      title: '매점매석의 그림자',
      text: `"물건을 쌓아두면 가난한 사람들이 비싼 값을 주고 사야 합니다. 그건 옳지 않아요."

허생이 고개를 끄덕였어. "맞소. 하지만 잘 생각해보면..."
"만약 썪을 물건을 미리 사서 잘 보관했다가, 필요한 때 팔면 어떨까?"

그 소설가가 턱을 괴었어. "음... 그건 좀 다르군."`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYXJrZXQlMjBwbGFjZXxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '허생의 생각을 듣는다', to: 'heosaeng_plan', cls: 'bg-green-200' },
      ],
      prompt: '💭 목적이 수단을 정당화할까?',
    },
    {
      id: 'economics_strategy',
      title: '경제 전략',
      text: `"때를 잘 맞춰 사고파는 건 장사의 기본입니다." 너는 상인으로서 알고 있었어.
      
"문제는 그 이익을 어디에 쓰느냐겠죠." 그 소설가가 말했어.

허생이 조용히 말했어. "만약 그 돈으로 백성을 돕는다면?"

모두 침묵했어. 허생의 눈빛이 심상치 않았어.`,
      bg: 'https://images.unsplash.com/photo-1645690364326-1f80098eca66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHRyYWRpdGlvbmFsJTIwY29pbnN8ZW58MXx8fHwxNzYzNTU3NDkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '허생에게 묻는다', to: 'heosaeng_plan', cls: 'bg-purple-200' },
      ],
      prompt: '💭 돈은 선할 수도 악할 수도 있을까?',
    },
    {
      id: 'heosaeng_plan',
      title: '허생의 구상',
      text: `"허생, 자네 무슨 계획이 있나?" 그 소설가가 물었어.
      
"언젠가... 자본이 생기면 해보고 싶은 일이 있습니다." 허생이 조심스럽게 말했어.

"장사로 큰돈을 벌어, 그 돈으로 유랑하는 백성들을 모아 새로운 나라를 만들고 싶습니다."

너는 깜짝 놀랐어. 새로운 나라라니!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYXJrZXQlMjBwbGFjZXxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '이상향에 대해 듣는다', to: 'utopia_talk', cls: 'bg-blue-200' },
      ],
      prompt: '💭 이상향은 만들 수 있을까?',
    },
    {
      id: 'utopia_talk',
      title: '이상향의 꿈',
      text: `"새로운 나라?" 너는 물었어.
      
"신분 차별 없고, 모두가 일하고, 모두가 먹고사는 나라입니다. 양반도 농사짓고, 상민도 글 읽는 세상. 실학의 원리로 운영되는 나라!" 허생의 눈이 빛났어.

그 소설가가 진지해졌어. "흥미롭군. 하지만 자본이 만만치 않게 필요할 텐데..."`,
      bg: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBpc2xhbmR8ZW58MXx8fHwxNzYzNTM3MDYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '자본 문제를 고민한다', to: 'capital_problem', cls: 'bg-red-200' },
      ],
      prompt: '💭 이상을 현실로 만들려면?',
    },
    {
      id: 'capital_problem',
      title: '자본의 필요성',
      text: `"돈 없이는 아무것도 할 수 없죠." 네가 현실적으로 말했어.
      
허생이 고개를 끄덕였어. "그래서 장사를 배우는 겁니다."

"하지만 밑천이 있어야 장사를 시작이라도 할 수 있죠." 너는 상인으로서 잘 알고 있는 사실이야.

"장터에서 소문을 들었는데, 변씨 성을 가진 큰 부자가 있다던데..." 허생이 중얼거렸어.`,
      bg: 'https://images.unsplash.com/photo-1685973015825-ef1a3dc5d31e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdHMlMjB2ZWdldGFibGVzJTIwbWFya2V0fGVufDF8fHx8MTc2MzU1MDg4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '변부자 이야기를 한다', to: 'byeon_buja', cls: 'bg-purple-200' },
      ],
      prompt: '💭 돈을 빌리는 것은 부끄러운 일일까?',
    },
    {
      id: 'byeon_buja',
      title: '변부자의 소문',
      text: `"변부자 말씀이시군요. 한양에서 제일 부자라는..."
      
"그 양반은 돈은 많지만 쓸 줄을 모른다고들 하더군요." 그 소설가가 말했어.

허생이 생각에 잠겼어. "돈을 제대로 쓸 줄 아는 사람에게 빌려준다면..."

"자네, 설마 그 변부자에게 돈을 빌리려는겐가?" 그 소설가가 놀랐어.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25하bCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNjM1MzU0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '허생을 말린다', to: 'stop_heosaeng', cls: 'bg-red-200' },
        { label: '응원한다', to: 'support_heosaeng', cls: 'bg-green-200' },
      ],
      prompt: '💭 무모한 도전과 용기의 차이는?',
    },
    {
      id: 'stop_heosaeng',
      title: '현실적 조언',
      text: `"변부자가 가난한 선비에게 돈을 빌려줄 리 없습니다. 고리대로 이자를 무척 높게 받을지도 몰라요." 너는 솔직히 말했어.
      
허생이 씁쓸하게 웃었어. "흠...맞는 말이오."

그 소설가가 덧붙였어. "하지만 계획만 있고 실행하지 못하면 그저 꿈일 뿐이지."

허생의 눈빛은 확고했어. "기회는 만드는 거요."`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYXJrZXQlMjBwbGFjZXxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '허생을 다시 본다', to: 'heosaeng_determination', cls: 'bg-blue-200' },
      ],
      prompt: '💭 현실주의와 이상주의 사이?',
    },
    {
      id: 'support_heosaeng',
      title: '책쾌의 응원',
      text: `"배운 것을 실천하는 게 중요하죠. 해보십시오!" 너는 응원했어.
      
허생이 고마워했어. "역시 자네는 나를 이해해주는구려."

그 소설가도 흥미로워했어. "만약 성공한다면... 재미있는 이야기가 되겠군."`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYXJrZXQlMjBwbGFjZXxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '기대한다', to: 'heosaeng_determination', cls: 'bg-purple-200' },
      ],
      prompt: '💭 응원의 힘은 얼마나 클까?',
    },
    {
      id: 'heosaeng_determination',
      title: '허생의 결심',
      text: `"결심했소. 변부자를 찾아가보겠소." 허생이 일어섰어.
      
"마지막으로 상업에 관한 책 몇 권만 더 추천해주시겠소." 허생이 부탁했어.

너는 최고 경제서들을 골라주었어. 동서고금 상인들의 지혜가 담긴 책들.

"이 책들이 도움이 되길 바랍니다." 진심으로 응원했어.`,
      bg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwc2hvcHxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '허생을 배웅한다', to: 'deeper_thought', cls: 'bg-blue-200' },
      ],
      prompt: '💭 지식이 실전에서 빛을 발할까?',
    },
               
    {
      id: 'deeper_thought',
      title: '세 가지 교훈',
      text: `너는 새롭게 깨달은 것들을 정리해봤어.
      
첫째, 실학. 공허한 이론보다 백성에게 실용적인 지식이다.
둘째, 경제. 돈의 원리를 알면 세상을 움직일 수 있다.
셋째, 이상향. 꿈꾸고 실천하려는 의지가 중요하다.

모두 더 나은 세상을 만드는데 필요한 것들이야.`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYXJrZXQlMjBwbGFjZXxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '책의 힘을 믿는다', to: 'next_generation', cls: 'bg-green-200' },
      ],
      prompt: '💭 지식과 실천, 무엇이 먼저일까?',
    },
    {
      id: 'next_generation',
      title: '전해지는 지혜',
      text: `먼 훗날, 한 유생이 책방에 들어왔어.
      
"허생 선생님 이야기를 듣고 왔습니다. 저도 실학을 배우고 싶어요!"

너는 미소 지으며 책을 권했어. 허생에게 했던 것처럼.
지식은 이렇게 세대를 넘어 전해지는구나.`,
      bg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwc2hvcHxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '희망을 느낀다', to: 'ending', cls: 'bg-green-200' },
      ],
      prompt: '💭 과거의 지혜에도 배울 것이 있을까?',
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `책쾌로서 허생과 한 소설가의 이야기를 지켜봤어.
      
실학, 경제 원리, 더 나은 세상에 대한 꿈.
모든 것은 책에서 시작됐어. 지식은 실천으로 이어졌지.

《허생전》에서 허생이 변부자를 어떻게 설득하는지, 실학은 세상을 얼마나 변화시키는지 확인해보자!

📚 서점이나 도서관에서 《허생전》을 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwc2hvcHxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' },
      ],
      prompt: '《허생전》 - 실학을 바탕으로 한 고전 소설! 허생의 경제 실험, 이상향 건설, 그리고 조선 개혁안까지. 지식과 실천의 힘을 보여주는 작품이야!',
    },
  ];
}
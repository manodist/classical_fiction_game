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

export function generateRobinsonStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '특별한 선물',
      text: `너의 이름은 ${name.full}. 
      
      1600년대 영국의 요크라는 도시에 살아. 
      (지금으로부터 약 400년 전이야)

오늘은 네 일곱 번째 생일! 할아버지가 선물을 주셨어. 
나무로 만든 작은 배 모형이야.

"이건... 정말 멋져!"`,
      bg: 'https://images.unsplash.com/photo-1705845182138-079d4633d710?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '배 모형을 가지고 논다', to: 'play_ship', cls: 'bg-blue-300' },
        { label: '할아버지께 바다 이야기를 청한다', to: 'ask_grandpa', cls: 'bg-purple-300' }
      ],
      prompt: '💭 특별한 선물을 받아본 적 있어?'
    },
    {
      id: 'play_ship',
      title: '상상의 항해',
      text: `너는 작은 배로 놀았어.

물동이에 배를 띄워보고, 바람을 불어 움직이게 하고... 
상상만으로도 신나!

"나는 선장이야! 세계를 탐험하는 거야!"`,
      bg: 'https://images.unsplash.com/photo-1672688749283-a5b738c97e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '할아버지께 더 물어본다', to: 'ask_grandpa', cls: 'bg-purple-300' }
      ],
      prompt: '💭 장난감 가지고 상상 놀이 해본 적 있어?'
    },
    {
      id: 'ask_grandpa',
      title: '할아버지의 이야기',
      text: `"할아버지, 바다는 어때요?"

할아버지 눈이 반짝였어.

"옛날에 나도 선원이었단다. 거대한 파도, 신기한 물고기들... 바다는 무섭지만 아름답지."

너는 눈을 반짝이며 들었어.`,
      bg: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 많은 이야기를 듣는다', to: 'grandpa_stories', cls: 'bg-blue-300' }
      ],
      prompt: '💭 할아버지 할머니의 옛날 이야기 듣는 게 재미있어?'
    },
    {
      id: 'grandpa_stories',
      title: '선원 시절',
      text: `할아버지가 계속 말씀하셨어.

"돌고래 떼가 배를 따라왔지. 폭풍우 속에서 살아남기도 했어. 하지만 가장 좋았던 건... 새로운 땅을 발견하는 순간!"

너는 완전히 빠져들었어.`,
      bg: 'https://images.unsplash.com/photo-1686266390608-7786f932d2de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '나도 선원이 되고 싶다', to: 'want_be_sailor', cls: 'bg-red-300' },
        { label: '바다가 궁금해진다', to: 'curious_sea', cls: 'bg-blue-300' }
      ],
      prompt: '💭 어른들의 모험담을 들으면 해보고 싶어?'
    },
    {
      id: 'want_be_sailor',
      title: '첫 번째 꿈',
      text: `"할아버지, 저도 선원이 될래요!"

할아버지가 웃으셨어.

"그래, 꿈을 가지는 건 좋지. 하지만 아버지는... 네가 가게를 물려받길 바라신단다."

너는 고민에 빠졌어.`,
      bg: 'https://images.unsplash.com/photo-1627983575019-50b4a5c4819d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '꿈을 포기하지 않기로 한다', to: 'keep_dream', cls: 'bg-green-300' },
        { label: '아버지 말씀을 따를까 고민한다', to: 'think_father', cls: 'bg-gray-300' }
      ],
      prompt: '💭 꿈과 가족의 기대가 다를 때 어떻게 해?'
    },
    {
      id: 'curious_sea',
      title: '바다에 대한 호기심',
      text: `그날 이후로 바다 생각만 해.

"진짜 바다는 어떨까?"
"배는 어떻게 움직일까?"
"물고기는 정말 많을까?"

궁금한 게 너무 많아!`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '항구에 가보고 싶다', to: 'want_harbor', cls: 'bg-blue-300' },
        { label: '바다 관련 책을 찾는다', to: 'find_books', cls: 'bg-purple-300' }
      ],
      prompt: '💭 궁금한 게 생기면 꼭 알아보고 싶어?'
    },
    {
      id: 'keep_dream',
      title: '꿈 간직하기',
      text: `너는 결심했어.

"언젠가 꼭 바다에 갈 거야!"

작은 배 모형을 책상에 놓고 매일 바라봤어. 꿈을 포기하지 않기로 했어.`,
      bg: 'https://images.unsplash.com/photo-1582203914689-d5cc1850fcb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '몰래 항구에 가본다', to: 'sneak_harbor', cls: 'bg-red-300' },
        { label: '바다 공부를 시작한다', to: 'study_sea_early', cls: 'bg-blue-300' }
      ],
      prompt: '💭 꿈을 이루려면 무엇부터 해야 할까?'
    },
    {
      id: 'think_father',
      title: '아버지의 기대',
      text: `아버지는 상인이셔.

"${name.first}, 가게 일을 배워라. 안정적으로 살 수 있단다."

아버지를 실망시키고 싶지 않아. 하지만... 바다가 자꾸 생각나.`,
      bg: 'https://images.unsplash.com/photo-1669186040107-da25c522c53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '가게 일을 배운다', to: 'learn_shop', cls: 'bg-green-300' },
        { label: '바다 꿈을 숨기고 간직한다', to: 'hide_dream', cls: 'bg-blue-300' }
      ],
      prompt: '💭 부모님 기대와 내 꿈이 다르면 힘들어?'
    },
    {
      id: 'want_harbor',
      title: '몰래 계획',
      text: `"항구에 가보고 싶어!"

하지만 아버지가 허락 안 하실 거야. 
'어떻게 하지? 몰래 갈까? 아니면 솔직하게 말할까?'`,
      bg: 'https://images.unsplash.com/photo-1672688749283-a5b738c97e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '몰래 항구에 간다', to: 'sneak_harbor', cls: 'bg-red-300' },
        { label: '아버지께 부탁한다', to: 'ask_father', cls: 'bg-blue-300' }
      ],
      prompt: '💭 하고 싶은 일이 있으면 허락받고 해야 할까?'
    },
    {
      id: 'find_books',
      title: '책 속의 바다',
      text: `너는 바다 이야기 책을 찾았어.

배 그림, 물고기 그림... 상상으로 바다를 여행했어.

하지만 진짜가 보고 싶어!`,
      bg: 'https://images.unsplash.com/photo-1669186040107-da25c522c53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '직접 보러 간다', to: 'want_harbor', cls: 'bg-blue-300' },
        { label: '더 많은 책을 읽는다', to: 'read_more', cls: 'bg-purple-300' }
      ],
      prompt: '💭 책으로 보는 것과 직접 보는 것 중 뭐가 좋아?'
    },
    {
      id: 'sneak_harbor',
      title: '첫 번째 모험',
      text: `너는 몰래 집을 나섰어.

심장이 두근두근! 들키면 큰일 나겠지만... 
바다를 꼭 보고 싶어.

항구로 가는 길, 설레면서도 무서워.`,
      bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 간다', to: 'arrive_harbor', cls: 'bg-blue-300' },
        { label: '걱정되어 돌아갈까 고민한다', to: 'hesitate', cls: 'bg-gray-300' }
      ],
      prompt: '💭 몰래 뭔가 해본 적 있어?'
    },
    {
      id: 'ask_father',
      title: '용기내어 부탁하기',
      text: `"아버지, 항구 좀 가볼게요!"

아버지가 눈썹을 찌푸리셨어.
"항구는 위험해."

"그냥 한 번만요! 바다가 보고 싶어요."

아버지가 한숨을 쉬셨어.`,
      bg: 'https://images.unsplash.com/photo-1753354868473-94c8ac971269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 부탁한다', to: 'keep_asking', cls: 'bg-blue-300' },
        { label: '포기하고 몰래 간다', to: 'sneak_harbor', cls: 'bg-red-300' }
      ],
      prompt: '💭 부모님께 계속 부탁해본 적 있어?'
    },
    {
      id: 'learn_shop',
      title: '가게 일 배우기',
      text: `너는 가게 일을 배웠어.

손님 맞이하고, 물건 정리하고...

"잘하는구나, ${name.first}!" 아버지가 기뻐하셨어. 하지만 창밖 하늘만 봐.`,
      bg: 'https://images.unsplash.com/photo-1507204135820-e462b349179f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '일에 집중한다', to: 'focus_work', cls: 'bg-green-300' },
        { label: '바다 생각이 떠나지 않는다', to: 'cant_forget_sea', cls: 'bg-blue-300' }
      ],
      prompt: '💭 하기 싫은 일을 할 때 어떤 기분이야?'
    },
    {
      id: 'hide_dream',
      title: '비밀 꿈',
      text: `너는 바다 꿈을 숨겼어.

아버지 앞에선 착한 아들, 하지만 혼자 있을 땐 배 모형을 보며 꿈꿔.

"언젠가는..." 마음속 꿈을 간직해.`,
      bg: 'https://images.unsplash.com/photo-1672688749283-a5b738c97e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '몰래 준비를 시작한다', to: 'secret_prep', cls: 'bg-purple-300' },
        { label: '때를 기다린다', to: 'wait_time', cls: 'bg-blue-300' }
      ],
      prompt: '💭 비밀 꿈을 간직하고 있어?'
    },
    {
      id: 'study_sea_early',
      title: '바다 공부',
      text: `너는 바다에 대해 공부했어.

별을 보고 방향 찾는 법, 로프 묶는 법... 
책도 읽고, 선원들 이야기도 듣고.

조금씩 준비하고 있어!`,
      bg: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 열심히 배운다', to: 'learn_more', cls: 'bg-green-300' },
        { label: '실제로 보고 싶어진다', to: 'want_real', cls: 'bg-blue-300' }
      ],
      prompt: '💭 좋아하는 걸 공부하면 재미있어?'
    },
    {
      id: 'read_more',
      title: '책 속 세계',
      text: `매일 바다 이야기를 읽었어.

해적, 보물섬, 신비한 나라... 상상력이 커졌어.

하지만 점점 더 진짜 바다가 보고 싶어졌어.`,
      bg: 'https://images.unsplash.com/photo-1669186040107-da25c522c53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '드디어 항구에 가기로 한다', to: 'decide_harbor', cls: 'bg-blue-300' }
      ],
      prompt: '💭 책 많이 읽으면 더 궁금해져?'
    },
    {
      id: 'arrive_harbor',
      title: '드디어 항구!',
      text: `와! 진짜 항구다!

커다란 배들이 줄지어 있어. 
선원들이 짐을 나르고, 갈매기들이 울어.

"정말... 멋져!" 

눈물이 날 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1686266390608-7786f932d2de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '배에 더 가까이 간다', to: 'close_to_ship', cls: 'bg-blue-300' },
        { label: '선원들 이야기를 엿듣는다', to: 'listen_sailors', cls: 'bg-purple-300' }
      ],
      prompt: '💭 꿈꾸던 걸 처음 봤을 때 기분이 어땠어?'
    },
    {
      id: 'hesitate',
      title: '망설임',
      text: `"아버지가 화내시면 어떡하지..."

발걸음이 멈췄어. 하지만 바다가 너무 보고 싶어. 어떻게 할까?`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '용기를 내서 계속 간다', to: 'arrive_harbor', cls: 'bg-green-300' },
        { label: '집으로 돌아간다', to: 'go_back_home', cls: 'bg-gray-300' }
      ],
      prompt: '💭 무서워도 용기 낼 수 있어?'
    },
    {
      id: 'keep_asking',
      title: '끈질긴 부탁',
      text: `"제발요, 아버지! 딱 한 번만이요!"

너는 계속 부탁했어.

아버지가 결국 웃으셨어. 
"알았다. 하지만 나랑 같이 가자." 성공했어!`,
      bg: 'https://images.unsplash.com/photo-1753354868473-94c8ac971269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '아버지와 함께 항구에 간다', to: 'harbor_with_father', cls: 'bg-blue-300' }
      ],
      prompt: '💭 포기하지 않고 부탁하면 들어주실 때가 있어?'
    },
    {
      id: 'focus_work',
      title: '책임감',
      text: `너는 일에 집중했어.

"아버지를 실망시키고 싶지 않아."

성실하게 일하는 모습에 아버지가 흐뭇해하셨어. 하지만 마음 한구석에 바다가 있어.`,
      bg: 'https://images.unsplash.com/photo-1669186040107-da25c522c53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 가족의 기대를 따른다', to: 'duty', cls: 'bg-green-300' },
        { label: '조금씩 바다 공부를 시작한다', to: 'study_sea', cls: 'bg-blue-300' }
      ],
      prompt: '💭 책임감과 꿈 사이에서 고민해본 적 있어?'
    },
    {
      id: 'cant_forget_sea',
      title: '바다의 부름',
      text: `일을 하면서도 바다 생각이 떠나지 않아.

"저 하늘 너머엔 뭐가 있을까?"
"배를 타고 가면 어떤 세상이 펼쳐질까?"

호기심이 점점 커져.`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '아버지께 솔직하게 말씀드린다', to: 'tell_father', cls: 'bg-blue-300' },
        { label: '혼자 고민을 계속한다', to: 'worry', cls: 'bg-gray-300' }
      ],
      prompt: '💭 마음속 꿈을 가족에게 말하기 어려워?'
    },
    {
      id: 'secret_prep',
      title: '비밀 준비',
      text: `너는 몰래 바다에 대해 공부하기 시작했어.

항해 기술, 별자리, 날씨 읽는 법...

꿈을 포기하지 않으면서도 가족을 존중하는 방법을 찾았어.`,
      bg: 'https://images.unsplash.com/photo-1672688749283-a5b738c97e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 준비한다', to: 'prepare', cls: 'bg-purple-300' },
        { label: '적절한 때를 기다린다', to: 'wait', cls: 'bg-blue-300' }
      ],
      prompt: '💭 목표를 위해 조용히 준비하는 게 현명할까?'
    },
    {
      id: 'wait_time',
      title: '기다리는 지혜',
      text: `너는 때를 기다리기로 했어.

지금은 아니어도 언젠가 기회가 올 거야. 준비하면서, 배우면서, 그날을 기다려.`,
      bg: 'https://images.unsplash.com/photo-1672688749283-a5b738c97e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '인내심을 가진다', to: 'ready', cls: 'bg-blue-300' },
        { label: '꾸준히 공부한다', to: 'prepare', cls: 'bg-purple-300' }
      ],
      prompt: '💭 좋은 기회를 위해 기다릴 수 있어?'
    },
    {
      id: 'learn_more',
      title: '배우는 자세',
      text: `$너는 선원들에게 항해술을 배웠어.

"별을 보고 방향을 찾는 거야."
"로프 묶는 법도 중요해."

하나씩 배워가는 게 즐거워!`,
      bg: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 열심히 배운다', to: 'prepare', cls: 'bg-green-300' },
        { label: '실전 경험을 쌓고 싶다', to: 'ready', cls: 'bg-red-300' }
      ],
      prompt: '💭 새로운 걸 배우는 게 재미있어?'
    },
    {
      id: 'want_real',
      title: '실제 경험',
      text: `$너는 진짜 바다를 보고 싶어.

"선원이 되고 싶어. 세계를 보고, 모험을 하고, 자유롭게 살 거야!"

마음이 확고해졌어.`,
      bg: 'https://images.unsplash.com/photo-1627983575019-50b4a5c4819d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '준비를 시작한다', to: 'prepare', cls: 'bg-green-300' },
        { label: '아버지와 대화한다', to: 'tell_father', cls: 'bg-blue-300' }
      ],
      prompt: '💭 큰 결심을 한 적 있어?'
    },
    {
      id: 'decide_harbor',
      title: '결심',
      text: `너는 항구에 가기로 결심했어.

"저도 선원이 되고 싶어요!"

선원들이 웃었어. 
"어린 친구, 바다는 위험해. 하지만 용기가 있다면 가능하지!"`,
      bg: 'https://images.unsplash.com/photo-1610137444548-728e7c4b49d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '바다에 대해 더 배운다', to: 'learn', cls: 'bg-purple-300' },
        { label: '아버지와 이야기해야겠다고 생각한다', to: 'tell_father', cls: 'bg-blue-300' }
      ],
      prompt: '💭 꿈을 이루려면 무엇부터 해야 할까?'
    },
    {
      id: 'close_to_ship',
      title: '배에 가까이',
      text: `너는 배에 가까이 다가갔어.

선원들이 바쁘게 일하고 있어. 

"저도 배를 타고 싶어요!"

선원들이 웃었어. 
"어린 친구, 바다는 위험해. 하지만 용기가 있다면 가능하지!"`,
      bg: 'https://images.unsplash.com/photo-1686266390608-7786f932d2de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '바다에 대해 더 배운다', to: 'learn', cls: 'bg-purple-300' },
        { label: '아버지와 이야기해야겠다고 생각한다', to: 'tell_father', cls: 'bg-blue-300' }
      ],
      prompt: '💭 꿈을 이루려면 무엇부터 해야 할까?'
    },
    {
      id: 'listen_sailors',
      title: '선원들의 이야기',
      text: `"형님들, 바다는 어때요?"

선원들이 눈을 반짝이며 말해.

"거대한 고래를 봤지! 폭풍우도 만났어! 낯선 땅에 도착하는 순간은 최고야!"

너는 더욱 바다가 궁금해졌어.`,
      bg: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '선원이 되고 싶다고 말한다', to: 'want_sailor', cls: 'bg-red-300' },
        { label: '더 많은 이야기를 듣는다', to: 'more_stories', cls: 'bg-purple-300' }
      ],
      prompt: '💭 모험담을 들으면 직접 해보고 싶어져?'
    },
    {
      id: 'harbor_with_father',
      title: '아버지와 함께',
      text: `너는 아버지와 함께 항구에 도착했어.

선원들이 바쁘게 일하고 있어. 

"저도 배를 타고 싶어요!"

선원들이 웃었어. 
"어린 친구, 바다는 위험해. 하지만 용기가 있다면 가능하지!"`,
      bg: 'https://images.unsplash.com/photo-1686266390608-7786f932d2de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '바다에 대해 더 배운다', to: 'learn', cls: 'bg-purple-300' },
        { label: '아버지와 이야기해야겠다고 생각한다', to: 'tell_father', cls: 'bg-blue-300' }
      ],
      prompt: '💭 꿈을 이루려면 무엇부터 해야 할까?'
    },
    {
      id: 'prepare',
      title: '준비하는 마음',
      text: `너는 차근차근 준비하고 있어.

지식도 쌓고, 체력도 기르고, 마음도 다지고...

"언젠가는 바다로 나갈 거야!"`,
      bg: 'https://images.unsplash.com/photo-1627983575019-50b4a5c4819d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '꾸준히 준비를 계속한다', to: 'ready', cls: 'bg-green-300' },
        { label: '때를 기다린다', to: 'wait', cls: 'bg-blue-300' }
      ],
      prompt: '💭 꿈을 위한 준비는 언제 끝날까?'
    },
    {
      id: 'father_advice',
      title: '아버지의 지혜',
      text: `"${name.first}, 바다는 위험하단다."

"하지만 네 꿈이라면... 충분히 준비하고, 신중하게 결정하렴."

아버지도 너를 이해하시는구나.`,
      bg: 'https://images.unsplash.com/photo-1669186040107-da25c522c53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '감사하며 준비한다', to: 'prepare', cls: 'bg-green-300' },
        { label: '신중하게 생각한다', to: 'think_carefully', cls: 'bg-blue-300' }
      ],
      prompt: '💭 부모님의 조언이 도움이 될까?'
    },
    {
      id: 'explain_dream',
      title: '꿈의 이유',
      text: `"아버지, 저는 새로운 세상을 보고 싶어요."

"다양한 사람들을 만나고, 자유롭게 살고 싶어요."

진심을 전했더니 아버지가 고개를 끄덕이셨어.`,
      bg: 'https://images.unsplash.com/photo-1610137444548-728e7c4b49d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '아버지의 이해에 감사한다', to: 'ready', cls: 'bg-green-300' },
        { label: '더 깊이 대화한다', to: 'father_advice', cls: 'bg-blue-300' }
      ],
      prompt: '💭 꿈의 이유를 설명하는 게 중요할까?'
    },
    {
      id: 'accept',
      title: '받아들임',
      text: `너는 현실을 받아들였어.

모두가 모험가가 될 순 없어. 가족과 함께하는 것도 하나의 행복이야.

바다는 마음속에 간직할게.`,
      bg: 'https://images.unsplash.com/photo-1669186040107-da25c522c53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이 삶에 만족한다', to: 'settle', cls: 'bg-green-300' },
        { label: '그래도 가끔 꿈꾼다', to: 'wait', cls: 'bg-blue-300' }
      ],
      prompt: '💭 꿈을 내려놓는 것도 성숙함일까?'
    },
    {
      id: 'wait',
      title: '기다리는 지혜',
      text: `너는 때를 기다리기로 했어.

지금은 아니어도 언젠가 기회가 올 거야. 준비하면서, 배우면서, 그날을 기다려.`,
      bg: 'https://images.unsplash.com/photo-1672688749283-a5b738c97e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '인내심을 가진다', to: 'ready', cls: 'bg-blue-300' },
        { label: '꾸준히 공부한다', to: 'prepare', cls: 'bg-purple-300' }
      ],
      prompt: '💭 좋은 기회를 위해 기다릴 수 있어?'
    },
    {
      id: 'think_carefully',
      title: '신중한 결정',
      text: `너는 신중하게 생각했어.

바다의 위험도, 가족의 걱정도, 꿈의 가치도... 모든 걸 고려한 후 현명한 결정을 내릴 거야.`,
      bg: 'https://images.unsplash.com/photo-1627983575019-50b4a5c4819d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '충분히 준비하기로 한다', to: 'prepare', cls: 'bg-green-300' },
        { label: '결심을 확고히 한다', to: 'ready', cls: 'bg-red-300' }
      ],
      prompt: '💭 중요한 결정을 내릴 때 어떻게 해?'
    },
    {
      id: 'ready',
      title: '모험의 시작',
      text: `${name.은는} 준비가 됐어!

지식도, 마음도, 각오도... 이제 진짜 바다로 나갈 때가 온 것 같아!

새로운 세상이 너를 기다리고 있어!`,
      bg: 'https://images.unsplash.com/photo-1686266390608-7786f932d2de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '《로빈슨 크루소》 읽어보기', to: 'ending', cls: 'bg-blue-300' }
      ],
      prompt: '💭 새로운 도전을 시작할 준비가 됐어?'
    },
    {
      id: 'settle',
      title: '안정된 삶',
      text: `너는 가족과 함께 평화로운 삶을 살기로 했어.

모험은 책으로 읽고, 현실은 안정적으로... 이것도 하나의 행복한 선택이야.`,
      bg: 'https://images.unsplash.com/photo-1669186040107-da25c522c53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '《로빈슨 크루소》 읽어보기', to: 'ending', cls: 'bg-blue-300' }
      ],
      prompt: '💭 안정도 하나의 가치일까?'
    },
    {
      id: 'ending',
      title: '이야기는 계속돼!',
      text: `1600년대 유럽은 마치 '원피스'처럼 바다를 통해 세상으로 나아가는 대항해시대야.

《로빈슨 크루소》에서도 주인공이 부모님의 반대를 무릅쓰고 바다로 나가게 돼. 그리고 폭풍우를 만나 낯선 무인도에 홀로 남겨지는데...

과연 로빈슨은 무인도에서 살아남을 수 있을까?
아무것도 없는 곳에서 어떻게 살아갈까?
다시 집으로 돌아갈 수 있을까?

**📚 《로빈슨 크루소》를 읽으면 알 수 있어!**

도서관이나 서점에서 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1582203914689-d5cc1850fcb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-300' }
      ],
      prompt: '🏝️ 마인크래프트 서바이벌 모드처럼 무인도에서 혼자 살아남을 수 있을까? - 《로빈슨 크루소》를 읽어보자!'
    },
    {
      id: 'go_back_home',
      title: '집으로 돌아가기',
      text: `너는 집으로 돌아가기로 했어.

"오늘은 아니야." 다음 기회를 기다리기로 했어.

하지만 바다에 대한 꿈은 여전히 마음속에 있어.`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음을 기약한다', to: 'wait_time', cls: 'bg-blue-300' }
      ],
      prompt: '💭 포기와 지혜로운 선택은 다를까?'
    },
    {
      id: 'duty',
      title: '가족을 위해',
      text: `너는 가족의 기대를 따르기로 했어.

상인이 되어 안정적으로 사는 것도 나쁘지 않아.

하지만 가끔 바다가 그리워질 거야.`,
      bg: 'https://images.unsplash.com/photo-1669186040107-da25c522c53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이 선택을 받아들인다', to: 'accept', cls: 'bg-gray-300' },
        { label: '나중에 기회를 엿본다', to: 'wait', cls: 'bg-blue-300' }
      ],
      prompt: '💭 가족을 위해 꿈을 미루는 것도 사랑일까?'
    },
    {
      id: 'study_sea',
      title: '조용한 준비',
      text: `너는 몰래 바다에 대해 공부하기 시작했어.

항해 기술, 별자리, 날씨 읽는 법...

꿈을 포기하지 않으면서도 가족을 존중하는 방법을 찾았어.`,
      bg: 'https://images.unsplash.com/photo-1672688749283-a5b738c97e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 준비한다', to: 'prepare', cls: 'bg-purple-300' },
        { label: '적절한 때를 기다린다', to: 'wait', cls: 'bg-blue-300' }
      ],
      prompt: '💭 목표를 위해 조용히 준비하는 게 현명할까?'
    },
    {
      id: 'tell_father',
      title: '솔직한 대화',
      text: `"아버지, 제 마음을 말씀드리고 싶어요."

너는 용기를 냈어.

"저는... 바다를 보고 싶어요."

아버지가 화를 내셨어. "안 돼! 바다는 너무 위험해!"`,
      bg: 'https://images.unsplash.com/photo-1753354868473-94c8ac971269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '아버지의 반대에도 포기하지 않는다', to: 'father_opposition', cls: 'bg-red-300' },
        { label: '일단 포기한 척한다', to: 'hide_dream', cls: 'bg-gray-300' }
      ],
      prompt: '💭 부모님이 강하게 반대하면 어떻게 해?'
    },
    {
      id: 'father_opposition',
      title: '아버지의 반대',
      text: `"${name.first}, 절대 안 된다!"

아버지가 단호하게 말씀하셨어.

"우리 집안은 상인이야. 바다는 위험하단 말이야!"

하지만 너의 마음은 변하지 않아.`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '몰래 준비를 시작한다', to: 'secret_prep', cls: 'bg-purple-300' },
        { label: '계속 설득을 시도한다', to: 'keep_persuading', cls: 'bg-blue-300' }
      ],
      prompt: '💭 부모님의 강한 반대에도 꿈을 지킬 수 있어?'
    },
    {
      id: 'keep_persuading',
      title: '끝없는 설득',
      text: `"아버지, 저는 정말 바다가 보고 싶어요!"

하지만 아버지는 단호하셔.

"이 이야기는 끝이다. 다시는 꺼내지 마라."

더 이상 설득할 수 없어.`,
      bg: 'https://images.unsplash.com/photo-1688705992559-0cdecfea2150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '겉으로는 따르는 척한다', to: 'hide_dream', cls: 'bg-gray-300' },
        { label: '결국 무릅쓰기로 결심한다', to: 'final_decision', cls: 'bg-red-300' }
      ],
      prompt: '💭 설득이 안 통할 때는 어떻게 해야 할까?'
    },
    {
      id: 'final_decision',
      title: '최후의 결심',
      text: `너는 깊은 고민 끝에 결심했어.

'아버지께는 미안하지만... 나의 꿈을 포기할 수 없어.'

무릅쓰고라도 바다로 나가야겠어. 마음이 확고해졌어.`,
      bg: 'https://images.unsplash.com/photo-1627983575019-50b4a5c4819d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '몰래 준비를 완료한다', to: 'ready', cls: 'bg-red-300' }
      ],
      prompt: '💭 때로는 부모님 반대를 무릅써야 할 때도 있을까?'
    },
    {
      id: 'worry',
      title: '혼자만의 고민',
      text: `너는 혼자 고민했어.

'어떻게 해야 할까? 가족도 소중하고, 꿈도 포기하기 싫어.''

답을 찾기 어려워.`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '아버지께 말씀드린다', to: 'tell_father', cls: 'bg-blue-300' },
        { label: '조금씩 준비한다', to: 'study_sea', cls: 'bg-purple-300' }
      ],
      prompt: '💭 고민을 혼자 안고 있는 게 힘들어?'
    },
    {
      id: 'want_sailor',
      title: '결심',
      text: `"저도 선원이 되고 싶어요!"

${name.이가} 용기 내어 말했어.

선원들이 웃었어. 
"어린 친구, 바다는 위험해. 하지만 용기가 있다면 가능하지!"`,
      bg: 'https://images.unsplash.com/photo-1610137444548-728e7c4b49d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '바다에 대해 더 배운다', to: 'learn', cls: 'bg-purple-300' },
        { label: '아버지와 이야기해야겠다고 생각한다', to: 'tell_father', cls: 'bg-blue-300' }
      ],
      prompt: '💭 꿈을 이루려면 무엇부터 해야 할까?'
    },
    {
      id: 'more_stories',
      title: '세상의 신비',
      text: `선원들이 더 많은 이야기를 들려줘.

신기한 동물들, 낯선 문화들, 무한한 바다...

"세상은 정말 넓구나!" 너의 호기심이 폭발했어.`,
      bg: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '항해술을 배우고 싶다', to: 'learn', cls: 'bg-purple-300' },
        { label: '꿈을 키우며 돌아간다', to: 'pursue_dream', cls: 'bg-blue-300' }
      ],
      prompt: '💭 다른 문화와 세계가 궁금해?'
    },
    {
      id: 'pursue_dream',
      title: '꿈을 향해',
      text: `${name.은는} 결심했어.

"나는 선원이 될 거야! 세계를 보고, 모험을 하고, 자유롭게 살 거야!"

마음이 확고해졌어.`,
      bg: 'https://images.unsplash.com/photo-1627983575019-50b4a5c4819d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '준비를 시작한다', to: 'prepare', cls: 'bg-green-300' },
        { label: '아버지와 대화한다', to: 'tell_father', cls: 'bg-blue-300' }
      ],
      prompt: '💭 큰 결심을 한 적 있어?'
    },
    {
      id: 'learn',
      title: '배우는 자세',
      text: `너는 선원들에게 항해술을 배웠어.

"별을 보고 방향을 찾는 거야."
"로프 묶는 법도 중요해."

하나씩 배워가는 게 즐거워!`,
      bg: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 열심히 배운다', to: 'prepare', cls: 'bg-green-300' },
        { label: '실전 경험을 쌓고 싶다', to: 'ready', cls: 'bg-red-300' }
      ],
      prompt: '💭 새로운 걸 배우는 게 재미있어?'
    }
  ];
}
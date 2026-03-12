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

export function generateKimWonStory(
  gradeLevel: string,
  lastName: string,
  firstName: string
): Scene[] {
  const name = createNameVariations(lastName, firstName);

  return [
    {
      id: 'start',
      title: '천상계의 기록관',
      text: `너의 이름은 ${name.full}.

하늘나라의 기록관이야.

천상계에서 일어나는 모든 일을 관찰하고 기록해.

오늘, 특별한 별 하나가 네 눈에 들어왔어.

"남두성... 생명을 관장하는 저 별은 다르구나."`,
      bg: 'https://images.unsplash.com/photo-1748073417788-b6e809757768',
      choices: [
        { label: '남두성을 관찰한다', to: 'observe_star', cls: 'bg-blue-200' },
        { label: '다른 신선들에게 묻는다', to: 'ask_others', cls: 'bg-purple-200' },
      ],
      prompt: '💭 특별함을 발견했을 때, 어떻게 해야 할까?',
    },
    {
      id: 'observe_star',
      title: '빛나는 별',
      text: `남두성을 자세히 관찰했어.

다른 별들과는 확연히 달랐어.

더 밝고, 더 따뜻하고, 더 강했어.

"저 별에서 누가 태어날까?"

기대가 됐어.`,
      bg: 'https://images.unsplash.com/photo-1577911450015-0e1782df2b8b',
      choices: [
        { label: '계속 지켜본다', to: 'witness_birth', cls: 'bg-blue-200' },
        { label: '별의 역사를 조사한다', to: 'research_star', cls: 'bg-green-200' },
      ],
      prompt: '💭 특별한 존재는 어떻게 태어날까?',
    },
    {
      id: 'ask_others',
      title: '신선들의 이야기',
      text: `나이 많은 신선들에게 물어봤어.

"남두성? 아, 생명과 복을 주관하는 별이지."

"남두주생(南斗注생) - 남두성은 사람의 태어남과 수명을 관장한다네."

"곧 위대한 영웅이 태어날 거야."

너는 더 궁금해졌어.`,
      bg: 'https://images.unsplash.com/photo-1761452776106-78710d4fada9',
      choices: [
        { label: '남두성을 관찰한다', to: 'observe_star', cls: 'bg-blue-200' },
        { label: '기록을 준비한다', to: 'prepare_record', cls: 'bg-purple-200' },
      ],
      prompt: '💭 전설 속 존재를 만날 준비를 해야 할까?',
    },
    {
      id: 'research_star',
      title: '별의 전설',
      text: `천상계의 도서관에서 기록을 찾았어.

"남두육성(南斗六星)에서 태어난 이들은 모두 영웅이 됐다."

"생명의 별에서 온 자들은 사람들을 살리고 돕는 운명."

"하지만... 모두 시련을 겪었다."

"큰 특별함에는 큰 책임이 따른다."

너는 걱정이 됐어.`,
      bg: 'https://images.unsplash.com/photo-1760665361699-d9d2e46155bb',
      choices: [
        { label: '그래도 지켜보기로', to: 'witness_birth', cls: 'bg-blue-200' },
        { label: '도울 방법을 찾는다', to: 'find_help', cls: 'bg-green-200' },
      ],
      prompt: '💭 특별한 운명을 가진 이를 어떻게 도와야 할까?',
    },
    {
      id: 'prepare_record',
      title: '기록관의 준비',
      text: `새 기록서를 펼쳤어.

"위대한 이야기를 기록할 준비 완료."

붓을 쥐고 기다렸어.

곧 남두성에서 빛이 쏟아졌어.

"시작이다!"`,
      bg: 'https://images.unsplash.com/photo-1652419675955-c6c5d52b0d02',
      choices: [
        { label: '탄생을 목격한다', to: 'witness_birth', cls: 'bg-blue-200' },
      ],
      prompt: '💭 위대한 이야기는 어떻게 시작될까?',
    },
    {
      id: 'find_help',
      title: '도움의 마음',
      text: `"나는 기록관이지만, 도울 수도 있지 않을까?"

선배 기록관에게 물어봤어.

"기록관은 관찰만 해야 해. 개입하면 안 돼."

"하지만 마음속으로 응원할 순 있지."

너는 고개를 끄덕였어.`,
      bg: 'https://images.unsplash.com/photo-1746535908442-0140112ddc1a',
      choices: [
        { label: '응원하며 지켜본다', to: 'witness_birth', cls: 'bg-green-200' },
      ],
      prompt: '💭 직접 돕지 못할 때, 우리가 할 수 있는 건 뭘까?',
    },
    {
      id: 'witness_birth',
      title: '김원의 탄생',
      text: `남두성에서 눈부신 빛이 터져 나왔어.

그 빛 속에서 한 존재가 나타났어.

김원.

천상계에 태어난 새로운 신선.

"안녕, 김원."`,
      bg: 'https://images.unsplash.com/photo-1762010232238-7ad300242e49',
      choices: [
        { label: '김원을 관찰한다', to: 'observe_kimwon', cls: 'bg-blue-200' },
        { label: '김원에게 인사한다', to: 'greet_kimwon', cls: 'bg-green-200' },
      ],
      prompt: '💭 위대한 영웅의 탄생, 어떻게 기록해야 할까?',
    },
    {
      id: 'observe_kimwon',
      title: '특별한 신선',
      text: `김원을 조용히 관찰했어.

그는 태어나자마자 걸었어.

말도 유창했고, 배움도 빨랐어.

"역시 남두성의 힘이구나."

다른 신선들도 놀라워했어.`,
      bg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      choices: [
        { label: '김원의 수련을 본다', to: 'training_days', cls: 'bg-blue-200' },
        { label: '김원과 대화한다', to: 'talk_kimwon', cls: 'bg-green-200' },
      ],
      prompt: '💭 특별한 재능은 축복일까, 부담일까?',
    },
    {
      id: 'greet_kimwon',
      title: '첫 만남',
      text: `"안녕, 김원. 나는 기록관 ${name.first}야."

김원이 환하게 웃었어.

"기록관? 재밌겠다. 나도 많이 배우고 싶어."

"내 이야기도 기록해 줄래?"

너는 고개를 끄덕였어.`,
      bg: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      choices: [
        { label: '김원과 친구가 된다', to: 'become_friend', cls: 'bg-green-200' },
        { label: '거리를 둔다', to: 'keep_distance', cls: 'bg-gray-200' },
      ],
      prompt: '💭 기록자는 대상과 친구가 되어도 될까?',
    },
    {
      id: 'talk_kimwon',
      title: '김원의 꿈',
      text: `김원과 대화를 나눴어.

"나는 영웅이 되고 싶어."

"많은 이들을 도우며 살고 싶어."

"이렇 남두성으로 태어난 내 사명이라고 생각해."

진심이 느껴졌어.`,
      bg: 'https://images.unsplash.com/photo-1758696654249-9f6a76ef5a30',
      choices: [
        { label: '꿈을 응원한다', to: 'support_dream', cls: 'bg-green-200' },
        { label: '위험을 경고한다', to: 'warn_danger', cls: 'bg-red-200' },
      ],
      prompt: '💭 영웅이 되고 싶다는 꿈, 어떻게 대해야 할까?',
    },
    {
      id: 'become_friend',
      title: '우정의 시작',
      text: `김원과 친구가 됐어.

함께 하늘을 날고, 별을 관찰했어.

"${name.first}, 넌 좋은 친구야."

"함께 있으면 마음이 편해."

너도 기뻤어.`,
      bg: 'https://images.unsplash.com/photo-1699180127998-040010b81935',
      choices: [
        { label: '함께 수련한다', to: 'training_days', cls: 'bg-blue-200' },
        { label: '천상계를 구경한다', to: 'explore_heaven', cls: 'bg-purple-200' },
      ],
      prompt: '💭 우정과 책임, 둘 다 지킬 수 있을까?',
    },
    {
      id: 'keep_distance',
      title: '기록관의 원칙',
      text: `"미안, 나는 기록관이야. 거리를 둬야 해."

김원이 이해했어.

"그래, 네 일도 중요하지."

"그래도 가끔 이야기 나누자."

프로페셔널했지만 아쉬웠어.`,
      bg: 'https://images.unsplash.com/photo-1753791913732-055c3d951ec9',
      choices: [
        { label: '멀리서 지켜본다', to: 'training_days', cls: 'bg-blue-200' },
      ],
      prompt: '💭 원칙과 감정, 무엇이 더 중요할까?',
    },
    {
      id: 'support_dream',
      title: '꿈의 응원',
      text: `"좋은 꿈이야. 응원할게."

김원의 눈이 반짝였어.

"고마워. 꼭 이룰 거야."

"나를 믿어줘."

너는 믿었어.`,
      bg: 'https://images.unsplash.com/photo-1761452359849-c2eea35d0479',
      choices: [
        { label: '김원의 수련을 본다', to: 'training_days', cls: 'bg-blue-200' },
      ],
      prompt: '💭 누군가의 꿈을 응원한다는 것은?',
    },
    {
      id: 'warn_danger',
      title: '현실의 경고',
      text: `"영웅의 길은 위험해. 조심해야 해."

김원이 고개를 끄덕였어.

"알아. 하지만 피하지 않을 거야."

"위험을 무릅쓰는 게 영웅 아닐까?"

용기가 대단했어.`,
      bg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      choices: [
        { label: '더 조심하라고 한다', to: 'more_warning', cls: 'bg-red-200' },
        { label: '믿고 지켜본다', to: 'training_days', cls: 'bg-blue-200' },
      ],
      prompt: '💭 위험을 감수하는 용기, 멈춰야 할까?',
    },
    {
      id: 'more_warning',
      title: '기록관의 우려',
      text: `"정말 조심해. 천상계 역사를 보면..."

"너무 빛나면 시련도 커."

김원이 손을 잡았어.

"걱정해줘서 고마워. 하지만 괜찮아."

너는 한숨을 쉬었어.`,
      bg: 'https://images.unsplash.com/photo-1758696654486-925ac9cd9801',
      choices: [
        { label: '지켜보기로 한다', to: 'training_days', cls: 'bg-blue-200' },
      ],
      prompt: '💭 걱정과 믿음, 균형은 어디에?',
    },
    {
      id: 'explore_heaven',
      title: '천상계 탐험',
      text: `김원과 함께 천상계를 돌아다녔어.

선녀들의 정원, 용궁의 보물창고, 옥황상제의 전각...

"${name.first}, 여기 정말 멋지다!"

김원은 모든 게 신기했어.

특히 인간 세상을 내려다보는 곳에서 오래 머물렀어.`,
      bg: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186',
      choices: [
        { label: '다음 장소로 간다', to: 'training_days', cls: 'bg-blue-200' },
        { label: '인간 세상을 더 본다', to: 'watch_humans', cls: 'bg-green-200' },
      ],
      prompt: '💭 금지된 것에 끌린다면?',
    },
    {
      id: 'watch_humans',
      title: '인간 세상에 대한 호기심',
      text: `김원이 인간 세상을 바라봤어.

"저들은... 재밌어 보여."

"짧은 생을 열심히 사 모습이..."

"부럽기도 하고."

위험한 감정이었어.`,
      bg: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e',
      choices: [
        { label: '김원을 데리고 나온다', to: 'leave_viewpoint', cls: 'bg-blue-200' },
        { label: '함께 더 본다', to: 'watch_together', cls: 'bg-purple-200' },
      ],
      prompt: '💭 금지된 동경, 어떻게 다뤄야 할까?',
    },
    {
      id: 'leave_viewpoint',
      title: '현명한 선택',
      text: `"김원, 이제 가자. 수련할 시간이야."

김원이 아쉬워했지만 따라왔어.

"맞아, 수련이 중요하지."

위기를 넘겼어.

하지만 김원은 자꾸 인간 세상을 생각했어.`,
      bg: 'https://images.unsplash.com/photo-1716329094028-91ff9efff456',
      choices: [
        { label: '수련에 집중시킨다', to: 'training_days', cls: 'bg-blue-200' },
      ],
      prompt: '💭 호기심을 억누를 수 있을까?',
    },
    {
      id: 'watch_together',
      title: '함께 보는 인간 세상',
      text: `함께 인간 세상을 바라봤어.

사랑하고, 싸우고, 웃고, 우는 인간들.

"아름답다..." 김원이 속삭였어.

너도 그렇게 느껴졌어.

하지만 신선은 인간 세상에 개입하면 안 돼.`,
      bg: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e',
      choices: [
        { label: '규칙을 상기시킨다', to: 'remind_rules', cls: 'bg-red-200' },
        { label: '이해한다', to: 'understand_longing', cls: 'bg-green-200' },
      ],
      prompt: '💭 규칙과 마음, 어느 것이 옳을까?',
    },
    {
      id: 'remind_rules',
      title: '천상계의 규칙',
      text: `"김원, 신선은 인간 세상에 개입하면 안 돼."

"그건 하늘의 질서야."

김원이 고개를 끄덕였어.

"알아... 하지만 궁금해."

위험한 호기심이었어.`,
      bg: 'https://images.unsplash.com/photo-1759108732402-a64a428f02df',
      choices: [
        { label: '수련으로 돌아간다', to: 'training_days', cls: 'bg-blue-200' },
      ],
      prompt: '💭 규칙은 왜 만들어졌을까?',
    },
    {
      id: 'understand_longing',
      title: '동경의 이해',
      text: `"이해해. 인간들은... 특별해."

"짧은 생을 열심히 사니까."

김원이 고마워했어.

"${name.first}는 이해해주는구나."

하지만 이 감정이 위험할 거라는 걸 몰랐어.`,
      bg: 'https://images.unsplash.com/photo-1701154695157-c8f9b9afed59',
      choices: [
        { label: '함께 돌아간다', to: 'training_days', cls: 'bg-blue-200' },
      ],
      prompt: '💭 공감이 때로는 위험할까?',
    },
    {
      id: 'training_days',
      title: '수련의 나날',
      text: `김원은 열심히 수련했어.

검술, 학문, 도술...

모든 것을 완벽하게 익혔어.

"역시 남두성이구나."

시간이 흐르고... 어느 날, 이상한 일이 일어났어.`,
      bg: 'https://images.unsplash.com/photo-1722479909908-7cd41b8426be',
      choices: [
        { label: '무슨 일인지 본다', to: 'witness_sin', cls: 'bg-red-200' },
      ],
      prompt: '💭 평화는 영원할까?',
    },
    {
      id: 'witness_sin',
      title: '목격의 순간',
      text: `기록관으로서 너는 천상계 곳곳을 돌아다녔어.

그날, 네 가지 장소 중 한 곳을 가게 됐어.

어디로 갈까?

각 장소에서 무언가 중요한 일이 벌어질 것 같았어.`,
      bg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      choices: [
        { label: '옥황상제의 전각으로', to: 'witness_refusal', cls: 'bg-red-200' },
        { label: '천도복숭아 정원으로', to: 'witness_theft', cls: 'bg-purple-200' },
        { label: '신선들의 연회장으로', to: 'witness_mistake', cls: 'bg-orange-200' },
        { label: '인간 세상 관측소로', to: 'witness_longing', cls: 'bg-green-200' },
      ],
      prompt: '💭 기록관으로서 무엇까지 기록해야 할까?',
    },
    {
      id: 'witness_refusal',
      title: '명령 거부의 현장',
      text: `옥황상제의 전각에 도착했어.

김원이 상제 앞에 무릎 꿇고 있었어.

"김원, 하늘의 질서를 지키는 임무를 맡겠느냐?"

"죄송합니다. 그 임무는... 제 양심에 어긋납니다."

천상계가 술렁였어.

"감히 명령을 거부하다니!"`,
      bg: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a',
      choices: [
        { label: '김원을 지지한다', to: 'support_refusal', cls: 'bg-green-200' },
        { label: '조용히 지켜본다', to: 'watch_quietly', cls: 'bg-blue-200' },
      ],
      prompt: '💭 옳은 일을 위해 명령을 거부할 수 있을까?',
    },
    {
      id: 'witness_theft',
      title: '질서 위반의 현장',
      text: `천도복숭아 정원에 도착했어.

김원이 몰래 정원에 들어가고 있었어!

"이 복숭아로 인간들의 병을 치료할 수 있어..."

복숭아를 가져가려는 순간!

경비 신선들이 나타났어.

"거기 서라! 도둑이다!"`,
      bg: 'https://images.unsplash.com/photo-1528825871115-3581a5387919',
      choices: [
        { label: '김원을 막으려 했다고 한다', to: 'try_stop', cls: 'bg-blue-200' },
        { label: '김원의 뜻을 이해한다', to: 'understand_intention', cls: 'bg-green-200' },
      ],
      prompt: '💭 좋은 목적을 위한 나쁜 방법, 정당화될까?',
    },
    {
      id: 'witness_mistake',
      title: '사소한 실수의 현장',
      text: `신선들의 연회장에 도착했어.

김원이 선녀의 아름다운 춤을 보고 있었어.

너무 집중한 나머지...

뒤로 물러서다가!

쾅!

옥황상제의 술잔을 엎어버렸어!

"죄송합니다!"

모두가 충격에 빠졌어.`,
      bg: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946',
      choices: [
        { label: '변호한다', to: 'defend_mistake', cls: 'bg-green-200' },
        { label: '실수를 인정한다', to: 'admit_mistake', cls: 'bg-blue-200' },
      ],
      prompt: '💭 실수도 죄가 될까?',
    },
    {
      id: 'witness_longing',
      title: '인간에 대한 동경 현장',
      text: `인간 세상 관측소에 도착했어.

김원이 인간 세상을 바라보며 눈물을 흘리고 있었어.

옥황상제가 옆에 계셨어.

"상제님... 말씀드릴 게 있습니다."

"저는... 인간이 되고 싶습니다."

상제가 놀라셨어.

"신선이 인간이 되고 싶다니!"`,
      bg: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e',
      choices: [
        { label: '이유를 함께 설명한다', to: 'explain_reason', cls: 'bg-green-200' },
        { label: '말리려 한다', to: 'try_dissuade', cls: 'bg-red-200' },
      ],
      prompt: '💭 영원한 삶보다 의미 있는 삶?',
    },
    {
      id: 'support_refusal',
      title: '용기 있는 지지',
      text: `"김원이 옳습니다!"

너도 앞으로 나섰어.

"선한 이를 해치는 건 하늘의 도가 아닙니다!"

옥황상제가 너를 바라봤어.

"기록관까지..."`,
      bg: 'https://images.unsplash.com/photo-1544499494-f06d80f4427d',
      choices: [
        { label: '끝까지 지킨다', to: 'stand_together', cls: 'bg-red-200' },
      ],
      prompt: '💭 친구를 돕기 위해 모든 걸 걸 수 있을까?',
    },
    {
      id: 'watch_quietly',
      title: '관찰자의 입장',
      text: `조용히 지켜봤어.

기록관의 역할을 지켰어.

김원이 혼자 벌을 받게 됐어.

"미안해, 김원..."

마음이 아팠어.`,
      bg: 'https://images.unsplash.com/photo-1732966917397-bf14f7307ec9',
      choices: [
        { label: '판결을 듣는다', to: 'hear_verdict', cls: 'bg-blue-200' },
      ],
      prompt: '💭 원칙을 지키는 것도 때로는 아플까?',
    },
    {
      id: 'try_stop',
      title: '막으려는 시도',
      text: `"김원! 안 돼!"

하지만 늦었어.

이미 복숭아를 가져간 뒤였어.

"${name.first}, 미안해. 하지만 해야 했어."

김원의 눈빛이 확고했어.`,
      bg: 'https://images.unsplash.com/photo-1758696654316-32f659c9f721',
      choices: [
        { label: '함께 책임진다', to: 'share_responsibility', cls: 'bg-red-200' },
        { label: '증언한다', to: 'testify', cls: 'bg-blue-200' },
      ],
      prompt: '💭 친구의 잘못, 함께 책임져야 할까?',
    },
    {
      id: 'understand_intention',
      title: '의도의 이해',
      text: `"김원은 선한 의도였습니다."

"인간들을 돕고 싶었던 거예요."

옥황상제가 말씀하셨어.

"의도가 선해도 규칙은 규칙이다."

엄격했어.`,
      bg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      choices: [
        { label: '판결을 듣는다', to: 'hear_verdict', cls: 'bg-blue-200' },
      ],
      prompt: '💭 선한 의도는 죄를 가볍게 할까?',
    },
    {
      id: 'defend_mistake',
      title: '실수의 변호',
      text: `"실수였습니다! 고의가 아닙니다!"

"김원은 선한 신선입니다!"

상제가 고개를 저었어.

"천상계에서는 실수도 용납되지 않는다."

"완벽해야 한다."`,
      bg: 'https://images.unsplash.com/photo-1762529484143-9430545abda6',
      choices: [
        { label: '완벽함에 의문을 제기한다', to: 'question_perfection', cls: 'bg-purple-200' },
        { label: '받아들인다', to: 'hear_verdict', cls: 'bg-blue-200' },
      ],
      prompt: '💭 완벽을 요구하는 것이 옳을까?',
    },
    {
      id: 'admit_mistake',
      title: '실수의 인정',
      text: `김원이 무릎을 꿇었어.

"제 실수입니다. 벌을 받겠습니다."

당당했어.

실수를 인정하는 모습이...

오히려 더 멋있어 보였어.`,
      bg: 'https://images.unsplash.com/photo-1762267659923-1b6c158e12b7',
      choices: [
        { label: '판결을 듣는다', to: 'hear_verdict', cls: 'bg-blue-200' },
      ],
      prompt: '💭 실수를 인정하는 것도 용기일까?',
    },
    {
      id: 'explain_reason',
      title: '동경의 이유',
      text: `"김원은 인간들에게서 배우고 싶어 합니다."

"영원한 삶보다 의미 있는 삶을요."

상제가 잠시 생각하셨어.

"...흥미로운 이유구나."`,
      bg: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e',
      choices: [
        { label: '판결을 듣는다', to: 'hear_verdict', cls: 'bg-green-200' },
      ],
      prompt: '💭 삶의 의미가 길이보다 중요할까?',
    },
    {
      id: 'try_dissuade',
      title: '만류',
      text: `"김원! 신선으로 사는 게 얼마나 좋은데!"

"인간은 고통받고 짧게 살아!"

김원이 고개를 저었어.

"그래서 더 의미 있어."

설득할 수 없었어.`,
      bg: 'https://images.unsplash.com/photo-1761199663713-57e554a9f499',
      choices: [
        { label: '판결을 듣는다', to: 'hear_verdict', cls: 'bg-blue-200' },
      ],
      prompt: '💭 친구의 선택을 막을 권리가 있을까?',
    },
    {
      id: 'stand_together',
      title: '함께 서다',
      text: `너와 김원이 함께 섰어.

"우리는 함께 벌을 받겠습니다."

옥황상제가 놀랐어.

"기록관이... 이 정도로..."

"좋다. 둘 다 인간 세상으로 보내겠다."`,
      bg: 'https://images.unsplash.com/photo-1544499494-f06d80f4427d',
      choices: [
        { label: '함께 받아들인다', to: 'accept_together', cls: 'bg-red-200' },
      ],
      prompt: '💭 함께라면 어떤 벌도 견딜 수 있을까?',
    },
    {
      id: 'share_responsibility',
      title: '공동 책임',
      text: `"저도 책임이 있습니다."

"막지 못했습니다."

상제가 고개를 끄덕였어.

"기록관으로서 실패했구나."

"너도 벌을 받아라."`,
      bg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      choices: [
        { label: '벌을 받아들인다', to: 'accept_punishment', cls: 'bg-blue-200' },
      ],
      prompt: '💭 친구와 함께 벌을 받는 것, 후회될까?',
    },
    {
      id: 'testify',
      title: '진실의 증언',
      text: `"제가 본 걸 증언하겠습니다."

모든 진실을 말했어.

김원의 선한 의도를.

하지만 규칙은 규칙이었어.

"증언은 들었다. 하지만 벌은 피할 수 없다."`,
      bg: 'https://images.unsplash.com/photo-1755938031479-77667de05c86',
      choices: [
        { label: '판결을 듣는다', to: 'hear_verdict', cls: 'bg-blue-200' },
      ],
      prompt: '💭 진실을 말하는 것으로 충분할까?',
    },
    {
      id: 'question_perfection',
      title: '완벽함에 대한 의문',
      text: `"완벽만 요구하는 것이 과연 옳습니까?"

"실수에서 배우는 것도 중요하지 않습니까?"

천상계가 조용해졌어.

아무도 상제에게 이렇게 말한 적이 없었어.`,
      bg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      choices: [
        { label: '상제의 대답을 듣는다', to: 'emperor_response', cls: 'bg-purple-200' },
      ],
      prompt: '💭 권위에 의문을 제기할 수 있을까?',
    },
    {
      id: 'emperor_response',
      title: '상제의 대답',
      text: `옥황상제가 오랫동안 생각하셨어.

"...네 말에 일리가 있다."

"하지만 천상계는 그렇게 돌아가지 않는다."

"김원은 인간 세상에서 배워라."

"그곳에서 실수하고 성장하거라."`,
      bg: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a',
      choices: [
        { label: '판결을 받아들인다', to: 'accept_verdict', cls: 'bg-blue-200' },
      ],
      prompt: '💭 타협도 지혜일까?',
    },
    {
      id: 'accept_verdict',
      title: '판결의 수용',
      text: `김원이 판결을 받아들였어.

"알겠습니다, 상제님."

"인간 세상에서 영웅이 되겠습니다."

당당했어.

두려움이 없어 보였어.`,
      bg: 'https://images.unsplash.com/photo-1688997812395-ac0de751f1a9',
      choices: [
        { label: '작별을 준비한다', to: 'prepare_farewell', cls: 'bg-blue-200' },
      ],
      prompt: '💭 운명을 받아들이는 것도 용기?',
    },
    {
      id: 'accept_together',
      title: '함께하는 수락',
      text: `김원과 함께 판결을 받아들였어.

"인간 세상으로 함께 가겠습니다."

상제가 말씀하셨어.

"기록관은 인간 세상에서도 김원을 기록하라."

"그것이 너의 임무다."`,
      bg: 'https://images.unsplash.com/photo-1544499494-f06d80f4427d',
      choices: [
        { label: '준비를 시작한다', to: 'prepare_descent', cls: 'bg-red-200' },
      ],
      prompt: '💭 새로운 세상에서의 새로운 임무!',
    },
    {
      id: 'accept_punishment',
      title: '벌의 수용',
      text: `벌을 받아들였어.

"김원과 함께 내려가겠습니다."

상제가 허락했어.

"좋다. 그곳에서 그를 도우라."

새로운 임무였어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db',
      choices: [
        { label: '함께 준비한다', to: 'prepare_descent', cls: 'bg-blue-200' },
      ],
      prompt: '💭 벌이 새로운 시작이 될 수 있을까?',
    },
    {
      id: 'hear_verdict',
      title: '판결',
      text: `옥황상제가 판결을 내렸어.

"김원, 너는 인간 세상으로 떨어져라."

"그곳에서 영웅이 되고,"

"공을 세우면 다시 돌아올 수 있다."

"이것이 너의 시련이자 기회다."`,
      bg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      choices: [
        { label: '김원의 반응을 본다', to: 'kimwon_reaction', cls: 'bg-blue-200' },
      ],
      prompt: '💭 벌이자 기회? 모순일까, 은혜일까?',
    },
    {
      id: 'prepare_descent',
      title: '하강 준비',
      text: `인간 세상으로 내려갈 준비를 했어.

"어떤 모습으로 태어날까?"

"귀한 집안의 아들로 태어날 거야."

"하지만 조금은 특별한 모습으로."

운명이 정해졌어.`,
      bg: 'https://images.unsplash.com/photo-1660145878505-168d2dc06d2f',
      choices: [
        { label: '함께 내려간다', to: 'descend_together', cls: 'bg-red-200' },
      ],
      prompt: '💭 새로운 삶의 시작!',
    },
    {
      id: 'prepare_farewell',
      title: '작별 준비',
      text: `김원을 보낼 준비를 했어.

"잘 가, 김원."

"인간 세상에서 행복하길."

김원이 웃었어.

"고마워, ${name.first}. 기록 잘 부탁해."`,
      bg: 'https://images.unsplash.com/photo-1683041132892-0fe990b3afc3',
      choices: [
        { label: '보내준다', to: 'watch_descent', cls: 'bg-blue-200' },
      ],
      prompt: '💭 작별은 끝일까, 새 시작일까?',
    },
    {
      id: 'promise_record',
      title: '기록의 약속',
      text: `"물론이지. 네 이야기를 모두 기록할게."

"위대한 영웅의 이야기로."

김원이 고마워했어.

"그럼, 이만..."

작별의 시간이 왔어.`,
      bg: 'https://images.unsplash.com/photo-1755938031479-77667de05c86',
      choices: [
        { label: '배웅한다', to: 'watch_descent', cls: 'bg-blue-200' },
      ],
      prompt: '💭 기록자의 역할은 무엇일까?',
    },
    {
      id: 'go_together',
      title: '함께 가는 결심',
      text: `"나도 갈게!"

"혼자 보내지 않을 거야!"

김원이 놀랐어.

"정말?"

상제가 허락했어.

"좋다. 함께 가거라."`,
      bg: 'https://images.unsplash.com/photo-1544499494-f06d80f4427d',
      choices: [
        { label: '함께 준비한다', to: 'prepare_descent', cls: 'bg-red-200' },
      ],
      prompt: '💭 우정이 운명을 바꿀 수 있을까?',
    },
    {
      id: 'descend_together',
      title: '함께하는 하강',
      text: `김원과 함께 인간 세상으로 내려갔어.

빛이 쏟아지고, 세상이 바뀌었어.

"새로운 시작이다!"

조선 땅이 보였어.

한양, 좌승의 집...`,
      bg: 'https://images.unsplash.com/photo-1732111608134-6b3284c2dfb6',
      choices: [
        { label: '땅에 도착한다', to: 'arrive_earth', cls: 'bg-green-200' },
      ],
      prompt: '💭 새로운 세상에서 무엇을 할까?',
    },
    {
      id: 'watch_descent',
      title: '하강을 지켜보다',
      text: `김원이 빛 속으로 사라졌어.

인간 세상으로 떨어지는 모습.

"잘 가..."

곧 조선의 한양에서 태어날 거야.

좌승상 집안의 아들로.`,
      bg: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a',
      choices: [
        { label: '탄생을 본다', to: 'birth_kimwon', cls: 'bg-green-200' },
      ],
      prompt: '💭 영웅은 태어나는 걸까, 성장하는걸까?',
    },
    {
      id: 'arrive_earth',
      title: '조선 땅',
      text: `조선 한양에 도착했어.

김원은 좌승상의 집에 태어날 거야.

자식이 없던 부부가 기다리고 있어.

너는... 보이지 않는 기록관으로 남았어.

그의 곁에서. 영원히.`,
      bg: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186',
      choices: [
        { label: '김원의 탄생을 본다', to: 'birth_kimwon', cls: 'bg-green-200' },
      ],
      prompt: '💭 보이지 않아도 함께 있는 것일까?',
    },
    {
      id: 'birth_kimwon',
      title: '원(圓)의 탄생',
      text: `한양, 좌승상 김규의 집.

부인 유씨가 태몽을 꾸고 아이를 낳았어.

하지만... 아기는 수박처럼 둥근 모습이었어!

"이, 이게 무슨...!"

부모는 놀랐지만, 김원(金圓)이라는 이름을 지어줬어.`,
      bg: 'https://images.unsplash.com/photo-1641919041660-b54d88dad809',
      choices: [
        { label: '이야기를 기록한다', to: 'ending', cls: 'bg-blue-200' },
      ],
      prompt: '💭 특별한 모습이 영웅의 조건일까?',
    },
    {
      id: 'kimwon_childhood',
      title: '특별한 아이',
      text: `김원은 둥근 모습으로 자랐어.

귀한 집안이지만 특이한 모습 때문에,

부모는 걱정이 많았어.

하지만 김원은 놀라운 힘을 가졌어.

진짜 영웅의 시작이었어.`,
      bg: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186',
      choices: [
        { label: '이야기를 기록한다', to: 'ending', cls: 'bg-green-200' },
      ],
      prompt: '💭 어떤 힘이 영웅에게 필요할까?',
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `너는 김원의 이야기를 기록했어.

천상계에서의 탄생,
특별함으로 인한 시련,
선택한 죄,
인간 세상으로의 추방.

《김원전》에서 그는 조선에서 위대한 영웅이 되어 수많은 모험을 겪고, 결국 다시 하늘로 돌아가!

📚 서점이나 도서관에서 《김원전》을 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1748073417788-b6e809757768',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' },
      ],
      prompt: '《김원전》 - 천상계 신선이 네 가지 죄 중 하나를 선택하고 인간 세상에서 진정한 영웅이 되는 이야기! 명령 거부, 규칙 위반, 실수, 인간에 대한 동경... 어떤 죄가 가장 용서받기 어려울까?',
    },
  ];
}
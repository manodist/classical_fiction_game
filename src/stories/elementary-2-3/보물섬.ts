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
    의: `${full}의`
  };
}

export function generateTreasureIslandStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '해적 이야기를 좋아하는 아이',
      text: `너의 이름은 ${name.full}.

1720년대 영국 항구 마을에 살고 있어.

너는 해적 이야기를 정말 좋아해!

원피스의 루피처럼 해적의 모험을 동경하지.

"나는 꼭 해적 기사를 쓰는 기자가 될 거야!"`,
      bg: 'https://images.unsplash.com/photo-1605744494559-cca2036bc783',
      choices: [
        { label: '항구로 나간다', to: 'go_harbor', cls: 'bg-blue-300' },
        { label: '해적 책을 읽는다', to: 'read_book', cls: 'bg-purple-300' }
      ],
      prompt: '💭 동경하는 직업이 있니?'
    },
    {
      id: 'go_harbor',
      title: '해적의 황금기',
      text: `항구는 사람들로 붐벼.

선원들이 술집에서 이야기를 나눠.

"요즘 해적들이 대단하다던데!"

"벤 건도 정말 무시무시하지!"

너는 귀가 쫑긋했어.`,
      bg: 'https://images.unsplash.com/photo-1762119594516-074b5a0bd683',
      choices: [
        { label: '선원들에게 다가간다', to: 'approach_sailors', cls: 'bg-blue-300' },
        { label: '조용히 듣는다', to: 'listen_quietly', cls: 'bg-green-300' }
      ],
      prompt: '💭 궁금한 걸 직접 물어볼 수 있니?'
    },
    {
      id: 'read_book',
      title: '해적 전설',
      text: `책에는 해적 이야기가 가득해.

"해적들은 보물을 찾아 항해한다..."

"검은 깃발 아래 자유를 외친다..."

하지만 책만으론 부족해.

진짜 해적 이야기가 듣고 싶어!`,
      bg: 'https://images.unsplash.com/photo-1625053376622-e462848c453f',
      choices: [
        { label: '항구로 조사를 나간다', to: 'go_harbor', cls: 'bg-blue-300' },
        { label: '더 많은 책을 읽는다', to: 'learn_flint', cls: 'bg-purple-300' }
      ],
      prompt: '💭 책과 실제는 어떻게 다를까?'
    },
    {
      id: 'approach_sailors',
      title: '용기 있는 질문',
      text: `"저, 실례지만요!"

너는 용기내어 말했어.

"벤 건에 대해 알려주실 수 있나요?"

선원들이 너를 보며 웃었어.

"호기심 많은 꼬마로군!"`,
      bg: 'https://images.unsplash.com/photo-1673516534359-efe3d1e8e675',
      choices: [
        { label: '벤 건에 대해 듣는다', to: 'learn_ben_gunn', cls: 'bg-yellow-300' },
        { label: '보물 이야기를 먼저 듣는다', to: 'treasure_rumors', cls: 'bg-purple-300' }
      ],
      prompt: '💭 낯선 사람에게 말 거는 게 어렵니?'
    },
    {
      id: 'listen_quietly',
      title: '관찰의 시작',
      text: `너는 조용히 관찰했어.

"기자는 관찰력이 중요하지!"

선원들의 이야기를 하나하나 기억해.

"벤 건의 배가 출항한다던데..."

"플린트 선장의 보물이 어마어마하대!"`,
      bg: 'https://images.unsplash.com/photo-1762176691679-cc560f016dc1',
      choices: [
        { label: '보물 이야기를 더 듣는다', to: 'treasure_rumors', cls: 'bg-yellow-300' },
        { label: '플린트에 대해 알아본다', to: 'learn_flint', cls: 'bg-red-300' }
      ],
      prompt: '💭 관찰하는 걸 좋아하니?'
    },
    {
      id: 'learn_ben_gunn',
      title: '벤 건 선장의 전설',
      text: `늙은 선원이 말했어.

"벤 건은 원래 평범한 선원이었지."

"하지만 플린트 선장 밑에서 항해하며..."

"보물의 맛을 알게 됐어!"

"욕심이 생기면 사람이 변하는 법이지..."`,
      bg: 'https://images.unsplash.com/photo-1762879737546-be26ab6b7cd1',
      choices: [
        { label: '플린트에 대해 묻는다', to: 'ask_about_flint', cls: 'bg-red-300' },
        { label: '욕심에 대해 생각한다', to: 'think_greed', cls: 'bg-purple-300' }
      ],
      prompt: '💭 욕심이 사람을 변하게 할까?'
    },
    {
      id: 'treasure_rumors',
      title: '보물의 소문',
      text: `"플린트가 숨긴 보물이 얼마나 많은지 아나?"

"금화가 수백만 개, 보석도 산더미래!"

"어떤 섬에 묻어뒀다는데..."

"지도를 가진 사람만 찾을 수 있어!"

너는 노트에 적었어.`,
      bg: 'https://images.unsplash.com/photo-1642211841112-2beeda7bfc07',
      choices: [
        { label: '지도에 대해 묻는다', to: 'ask_map', cls: 'bg-yellow-300' },
        { label: '플린트에 대해 더 듣는다', to: 'learn_flint', cls: 'bg-red-300' }
      ],
      prompt: '💭 보물보다 중요한 게 있을까?'
    },
    {
      id: 'learn_flint',
      title: '공포의 플린트 선장',
      text: `"플린트 선장은 전설이야."

선원이 목소리를 낮췄어.

"무시무시한 해적이었지."

"하지만 죽기 전에 보물을 숨겼어."

"그리고 그 비밀을 아는 사람들은..."`,
      bg: 'https://images.unsplash.com/photo-1577388219814-9b75a45cea09',
      choices: [
        { label: '비밀을 아는 사람들은 어떻게 됐을까??', to: 'secret_keepers', cls: 'bg-gray-300' }
      ],
      prompt: '💭 큰 비밀을 지킬 수 있니?'
    },
    {
      id: 'ask_about_flint',
      title: '플린트의 영향력',
      text: `"플린트 선장은 어떤 사람이었나요?"

"냉혹했지. 하지만 똑똑했어."

"선원들을 잘 이끌었지만..."

"보물 앞에서는 누구도 믿지 않았어."

"그래서 혼자 숨긴 거야."`,
      bg: 'https://images.unsplash.com/photo-1762119594490-9e4afe0323ca',
      choices: [
        { label: '신뢰에 대해 생각한다', to: 'think_trust', cls: 'bg-blue-300' }
      ],
      prompt: '💭 믿음은 왜 중요할까?'
    },
    {
      id: 'think_greed',
      title: '욕심의 무게',
      text: `너는 노트에 썼어.

"욕심은 사람을 변하게 한다..."

"벤 건도 욕심 때문에 달라졌다..."

기자로서 중요한 통찰이야!

"진실을 기록해야지!"`,
      bg: 'https://images.unsplash.com/photo-1760720962384-e470ee773c1f',
      choices: [
        { label: '더 많은 이야기를 찾는다', to: 'find_more_stories', cls: 'bg-blue-300' }
      ],
      prompt: '💭 욕심과 꿈은 어떻게 다를까?'
    },
    {
      id: 'ask_map',
      title: '보물 지도의 비밀',
      text: `"그 지도는 누가 가지고 있나요?"

"플린트가 죽을 때 빌 본즈에게 줬다던데."

"빌 본즈?"

"플린트의 일등 항해사였지!"

"지금은 빌 선장으로 불리더군..."

너는 빌 본즈라는 이름을 적었어.`,
      bg: 'https://images.unsplash.com/photo-1718043073914-9fb5e34cc503',
      choices: [
        { label: '빌 본즈를 찾아보자', to: 'search_billy', cls: 'bg-red-300' }
      ],
      prompt: '💭 중요한 물건을 맡으면 어떨까?'
    },
    {
      id: 'secret_keepers',
      title: '비밀을 아는 자들',
      text: `"보물의 비밀을 아는 사람이 여럿 있었어."

"빌 본즈, 존 실버..."

"하지만 서로를 믿지 못했지."

"보물 때문에 친구도 적이 되는 거야."

슬픈 이야기야...`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '존 실버에 대해 듣는다', to: 'learn_silver', cls: 'bg-gray-300' },
        { label: '빌 본즈를 찾는다', to: 'search_billy', cls: 'bg-red-300' }
      ],
      prompt: '💭 친구를 배신하는 건 나쁜 일일까?'
    },
    {
      id: 'think_trust',
      title: '신뢰의 가치',
      text: `너는 깨달았어.

"플린트는 아무도 믿지 않았구나..."

"그래서 외로웠을 거야."

"보물보다 믿을 수 있는 친구가 더 중요해!"

노트에 적었어.`,
      bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      choices: [
        { label: '신뢰에 대한 기사를 쓴다', to: 'write_trust_article', cls: 'bg-green-300' }
      ],
      prompt: '💭 친구를 믿는 게 중요하니?'
    },
    {
      id: 'find_more_stories',
      title: '취재의 확장',
      text: `너는 여러 선원을 만났어.

각자 다른 이야기를 해줬지.

"좋은 기자는 여러 사람 이야를 듣는다!"

진실에 가까워지고 있어!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
      choices: [
        { label: '존 실버를 만난다', to: 'meet_silver', cls: 'bg-gray-300' },
        { label: '빌 본즈를 찾는다', to: 'search_billy', cls: 'bg-red-300' }
      ],
      prompt: '💭 여러 의견을 듣는 게 중요할까?'
    },
    {
      id: 'search_billy',
      title: '빌 본즈를 찾아서',
      text: `"빌 본즈를 찾고 있어요!"

술집 주인이 고개를 저었어.

"요즘 모습을 안 보이는데..."

"다른 해적들이 그를 찾고 있거든."

"조심해라, 위험해!"`,
      bg: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
      choices: [
        { label: '왜 쫓기는지 알아본다', to: 'why_hunted', cls: 'bg-red-300' },
        { label: '해적 소굴에 잠입한다', to: 'sneak_into_pirates', cls: 'bg-purple-300' }
      ],
      prompt: '💭 위험해도 진실을 찾아야 할까?'
    },
    {
      id: 'sneak_into_pirates',
      title: '위험한 잠입취재',
      text: `너는 해적들이 모이는 뒷골목으로 갔어.

어둡고 위험한 곳이야.

"여기서 정보를 얻을 수 있을 거야..."

떨리지만 용기를 내!

기자는 현장에 가야 해!`,
      bg: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
      choices: [
        { label: '숨어서 엿듣는다', to: 'eavesdrop_pirates', cls: 'bg-gray-300' },
        { label: '대담하게 들어간다', to: 'confront_pirates', cls: 'bg-red-300' }
      ],
      prompt: '💭 안전과 진실 중 무엇이 더 중요할까?'
    },
    {
      id: 'eavesdrop_pirates',
      title: '엿듣기',
      text: `너는 조용히 숨었어.

해적들이 이야기하고 있어.

"빌 본즈 그 녀석, 벤보 여관에 있다던데!"

"지도만 빼앗으면 우리 거야!"

위험한 계획을 세우고 있어!`,
      bg: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
      choices: [
        { label: '더 듣는다', to: 'hear_more_danger', cls: 'bg-yellow-300' },
        { label: '조용히 빠져나간다', to: 'escape_quietly', cls: 'bg-green-300' }
      ],
      prompt: '💭 더 많이 알수록 위험해질까?'
    },
    {
      id: 'confront_pirates',
      title: '대담한 취재',
      text: `"저기요! 취재 중인데요!"

너는 용감하게 말했어.

해적들이 너를 보고 웃었어.

"꼬마가 담이 두둑하군!"

위험하지만... 관심을 끌었어!`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '질문을 던진다', to: 'question_pirates', cls: 'bg-blue-300' },
        { label: '농담으로 분위기를 푼다', to: 'joke_with_pirates', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 용기와 무모함의 차이는 뭘까?'
    },
    {
      id: 'hear_more_danger',
      title: '위험한 비밀',
      text: `"존 실버가 이끌 거야."

"우리가 먼저 빌을 찾으면..."

그 순간, 발을 헛디뎠어!

"거기 누구야?!"

들켰다!`,
      bg: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
      choices: [
        { label: '빨리 도망친다', to: 'run_away', cls: 'bg-red-300' },
        { label: '태연하게 대처한다', to: 'act_calm', cls: 'bg-blue-300' }
      ],
      prompt: '💭 위기 상황에서 어떻게 행동할까?'
    },
    {
      id: 'escape_quietly',
      title: '전략적 후퇴',
      text: `너는 조용히 빠져나왔어.

"충분한 정보를 얻었어!"

"벤보 여관, 존 실버의 계획..."

안전하게 탈출 성공!

현명한 판단이야!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
      choices: [
        { label: '정보를 정리한다', to: 'organize_pirate_info', cls: 'bg-green-300' }
      ],
      prompt: '💭 정보를 얻었으면 어떻게 사용해야 할까?'
    },
    {
      id: 'question_pirates',
      title: '직접 질문',
      text: `"빌 본즈에 대해 알려주세요!"

한 해적이 다가왔어.

무서운 얼굴이지만...

"용감한 꼬마로군. 좋아."

"빌은 겁쟁이야. 도망만 다니지!"`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '왜 쫓는지 묻는다', to: 'why_chase_billy', cls: 'bg-yellow-300' },
        { label: '감사하고 떠난다', to: 'thank_pirates', cls: 'bg-green-300' }
      ],
      prompt: '💭 직접 물어보는 게 항상 좋을까?'
    },
    {
      id: 'joke_with_pirates',
      title: '분위기 전환',
      text: `"해적님들은 정말 멋지시네요!"

너는 밝게 말했어.

"이런 용감한 분들 이야기를 쓰고 싶어요!"

해적들이 웃었어.

"귀여운 녀석! 좋아!"`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '자연스럽게 정보를 캔다', to: 'casual_talk', cls: 'bg-blue-300' }
      ],
      prompt: '💭 관계를 만드는 게 중요할까?'
    },
    {
      id: 'run_away',
      title: '긴급 탈출',
      text: `너는 재빨리 뛰었어!

"저 꼬마 잡아!"

심장이 터질 것 같아!

골목을 빠져나가 숨었어.

가까스로 도망쳤어!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
      choices: [
        { label: '숨을 고르며 생각한다', to: 'reflect_danger', cls: 'bg-purple-300' }
      ],
      prompt: '💭 실패에서 배울 수 있을까?'
    },
    {
      id: 'act_calm',
      title: '침착한 대응',
      text: `"아, 안녕하세요!"

너는 태연하게 말했어.

"길을 잃었어요..."

해적이 의심스러운 눈으로 봐.

"...조심해서 가거라."

넘어갔어!`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '빨리 그 자리를 떠난다', to: 'leave_safely', cls: 'bg-green-300' }
      ],
      prompt: '💭 침착함이 위기를 벗어나게 할까?'
    },
    {
      id: 'organize_pirate_info',
      title: '정보 정리',
      text: `노트를 꺼내 정리했어.

"빌 본즈 - 벤보 여관"

"존 실버 - 지도를 노림"

"해적들 - 공격 계획 중"

모든 퍼즐이 맞춰져!`,
      bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      choices: [
        { label: '빌에게 경고한다', to: 'must_warn', cls: 'bg-red-300' },
        { label: '더 조사한다', to: 'continue_reporting', cls: 'bg-blue-300' }
      ],
      prompt: '💭 정보를 정리하면 진실이 보일까?'
    },
    {
      id: 'why_chase_billy',
      title: '추격의 이유',
      text: `"왜 빌을 쫓나요?"

"지도 때문이지!"

해적이 웃었어.

"보물을 찾으려면 지도가 필요하거든!"

"빌이 가진 게 유일한 지도야!"`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '더 많은 정보를 얻는다', to: 'get_more_info', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 하나뿐인 것은 더 가치있을까?'
    },
    {
      id: 'thank_pirates',
      title: '현명한 마무리',
      text: `"알려주셔서 감사합니다!"

너는 예의 바르게 인사했어.

"똑똑한 녀석이군!"

안전하게 정보를 얻었어!

좋은 취재였어!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
      choices: [
        { label: '정보를 기록한다', to: 'record_safely', cls: 'bg-green-300' }
      ],
      prompt: '💭 예의가 안전을 가져올까?'
    },
    {
      id: 'casual_talk',
      title: '자연스러운 대화',
      text: `"해적 생활이 어때요?"

너는 자연스럽게 물었어.

"자유롭지! 하지만 위험해!"

"보물을 찾아야 살아남아..."

좋은 정보야!`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '빌에 대해 묻는다', to: 'ask_about_billy', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 대화가 정보를 얻는 좋은 방법일까?'
    },
    {
      id: 'reflect_danger',
      title: '위험의 교훈',
      text: `숨을 고르며 생각했어.

"너무 무모했어..."

"하지만 정보는 얻었어!"

"다음엔 더 조심해야지!"

실패도 배움이야!`,
      bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      choices: [
        { label: '다른 방법을 찾는다', to: 'find_another_way', cls: 'bg-green-300' }
      ],
      prompt: '💭 실패가 성장의 기회일까?'
    },
    {
      id: 'leave_safely',
      title: '안전한 탈출',
      text: `너는 빠르게 걸어갔어.

뒤돌아보지 않았어.

"위험했지만 정보는 얻었어!"

성공적인 탈출이야!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
      choices: [
        { label: '안전한 곳에서 정리한다', to: 'organize_pirate_info', cls: 'bg-green-300' }
      ],
      prompt: '💭 때로는 물러서는 게 승리일까?'
    },
    {
      id: 'get_more_info',
      title: '추가 정보',
      text: `"어디에 있나요?"

"벤보 여관이라던데!"

해적이 말했어.

"우리도 곧 찾아갈 거야!"

중요한 정보를 얻었어!`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '감사하고 떠난다', to: 'thank_pirates', cls: 'bg-green-300' }
      ],
      prompt: '💭 한 걸음 더 나아가는 용기가 있니?'
    },
    {
      id: 'record_safely',
      title: '안전한 기록',
      text: `안전한 곳에서 노트에 적었어.

"빌 본즈 - 지도 소유"

"해적들 - 추격 중"

"벤보 여관 - 빌의 위치"

완벽한 정보야!`,
      bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      choices: [
        { label: '다음 행동을 계획한다', to: 'plan_next', cls: 'bg-blue-300' }
      ],
      prompt: '💭 기록이 왜 중요할까?'
    },
    {
      id: 'ask_about_billy',
      title: '빌에 대한 질문',
      text: `"빌 본즈는 어떤 사람인가요?"

"겁쟁이지! 숨어 다녀!"

해적이 비웃었어.

"하지만 지도는 꽉 쥐고 있어!"

흥미로운 정보야!`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '더 듣는다', to: 'listen_more', cls: 'bg-yellow-300' },
        { label: '감사하고 떠난다', to: 'thank_pirates', cls: 'bg-green-300' }
      ],
      prompt: '💭 사람들의 평가가 진실일까?'
    },
    {
      id: 'plan_next',
      title: '다음 계획',
      text: `너는 계획을 세웠어.

"빌을 만나야 해!"

"하지만 신중하게..."

"정보가 있으니 준비됐어!"

좋은 계획이야!`,
      bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      choices: [
        { label: '빌을 찾아간다', to: 'final_search', cls: 'bg-red-300' }
      ],
      prompt: '💭 계획이 성공의 열쇠일까?'
    },
    {
      id: 'listen_more',
      title: '더 많은 이야기',
      text: `"벤보 여관에 숨어 있대!"

"곧 찾아갈 거야!"

해적들이 수군거려.

위험한 상황이야!

빨리 경고해야 해!`,
      bg: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
      choices: [
        { label: '조용히 빠져나간다', to: 'sneak_out', cls: 'bg-green-300' }
      ],
      prompt: '💭 위급한 정보는 빨리 전해야 할까?'
    },
    {
      id: 'sneak_out',
      title: '조심스러운 이탈',
      text: `너는 조용히 일어났어.

아무도 눈치채지 못했어.

밖으로 나와 숨을 쉬었어.

"빨리 빌에게 알려야 해!"

서둘러!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
      choices: [
        { label: '빌을 찾아간다', to: 'final_search', cls: 'bg-red-300' }
      ],
      prompt: '💭 책임감이 있니?'
    },
    {
      id: 'learn_silver',
      title: '존 실버의 두 얼굴',
      text: `"존 실버는 특별한 사람이야."

"겉으로는 친절하고 상냥하지."

"하지만 속으로는 계산적이야."

"보물을 노리면서도 아무도 모르게 하지."

"양면성이 있는 사람이야..."`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '직접 만나보고 싶다', to: 'want_meet_silver', cls: 'bg-yellow-300' },
        { label: '실버를 조심해야겠다', to: 'be_careful_silver', cls: 'bg-red-300' }
      ],
      prompt: '💭 겉과 속이 다른 사람을 어떻게 봐야 할까?'
    },
    {
      id: 'be_careful_silver',
      title: '신중한 판단',
      text: `"존 실버는 위험해..."

너는 생각했어.

"친절한 척하지만 속셈이 있어."

"조심해야 해!"

현명한 판단이야!`,
      bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      choices: [
        { label: '다른 사람들에게 묻는다', to: 'ask_others_silver', cls: 'bg-blue-300' },
        { label: '빌을 먼저 찾는다', to: 'search_billy_first', cls: 'bg-red-300' }
      ],
      prompt: '💭 위험한 사람은 피하는 게 나을까?'
    },
    {
      id: 'ask_others_silver',
      title: '다양한 의견',
      text: `여러 사람에게 실버에 대해 물었어.

"실버는 영리해!"

"하지만 믿을 수 없어!"

"보물에 미쳐 있거든..."

다들 비슷하게 말해.`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
      choices: [
        { label: '실버를 피하기로 한다', to: 'avoid_silver', cls: 'bg-green-300' }
      ],
      prompt: '💭 여러 의견이 일치하면 진실일까?'
    },
    {
      id: 'search_billy_first',
      title: '우선순위 결정',
      text: `"빌이 더 중요해!"

너는 결정했어.

"빌을 먼저 찾자!"

"나중에 실버는 조사하고..."

좋은 우선순위야!`,
      bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      choices: [
        { label: '빌을 찾는다', to: 'final_search', cls: 'bg-red-300' }
      ],
      prompt: '💭 우선순위를 정하는 게 중요할까?'
    },
    {
      id: 'avoid_silver',
      title: '안전한 선택',
      text: `"실버는 피하는 게 좋겠어."

너는 결정했어.

"대신 다른 방법으로 정보를 모으자!"

안전하고 현명한 선택이야!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
      choices: [
        { label: '다른 선원들과 이야기한다', to: 'talk_other_sailors', cls: 'bg-blue-300' }
      ],
      prompt: '💭 안전이 우선일까?'
    },
    {
      id: 'talk_other_sailors',
      title: '선원들의 이야기',
      text: `다른 선원들을 만났어.

"빌 본즈는 벤보 여관에 있어!"

"해적들이 노리고 있다던데..."

유용한 정보를 얻었어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
      choices: [
        { label: '빌을 찾아간다', to: 'final_search', cls: 'bg-red-300' }
      ],
      prompt: '💭 간접적인 방법도 효과적일까?'
    },
    {
      id: 'write_trust_article',
      title: '첫 기사: 신��',
      text: `너는 기사를 썼어.

"보물보다 소중한 것"

"플린트 선장은 보물을 얻었지만..."

"믿을 사람은 없었다."

"진정한 보물은 신뢰다!"`,
      bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      choices: [
        { label: '더 많은 이야기를 취재한다', to: 'continue_reporting', cls: 'bg-blue-300' },
        { label: '빌 본즈를 찾는다', to: 'search_billy', cls: 'bg-red-300' }
      ],
      prompt: '💭 네 생각을 글로 표현하는 게 좋니?'
    },
    {
      id: 'meet_silver',
      title: '존 실버와의 만남',
      text: `술집에서 한 남자를 만났어.

한쪽 다리가 나무 의족이야.

"안녕, 꼬마! 난 존 실버라고 해."

밝게 웃으며 말했어.

하지만 눈빛은 날카로워...`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '조심스럽게 질문한다', to: 'careful_question', cls: 'bg-blue-300' },
        { label: '관찰만 한다', to: 'observe_silver', cls: 'bg-green-300' }
      ],
      prompt: '💭 첫인상이 중요할까?'
    },
    {
      id: 'why_hunted',
      title: '도망자 빌 본즈',
      text: `"왜 빌 본즈를 찾나요?"

"지도를 가지고 있거든!"

"플린트의 보물 지도 말이야."

"모든 해적이 그걸 노려."

"그래서 빌은 숨어 다니는 거지!"`,
      bg: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c',
      choices: [
        { label: '지도의 힘에 대해 생각한다', to: 'power_of_map', cls: 'bg-yellow-300' },
        { label: '빌의 위치를 물어본다', to: 'ask_billy_location', cls: 'bg-red-300' }
      ],
      prompt: '💭 소유가 때로는 위험할까?'
    },
    {
      id: 'ask_billy_location',
      title: '위험한 질문',
      text: `"빌이 어디 있는지 아세요?"

술집 주인이 조심스럽게 말했어.

"벤보 여관이라던데..."

"하지만 조심해라!"

"해적들이 눈에 불을 켜고 찾고 있어!"`,
      bg: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
      choices: [
        { label: '빌을 경고하러 간다', to: 'decide_warn_billy', cls: 'bg-red-300' },
        { label: '더 많은 정보를 모은다', to: 'gather_more_info', cls: 'bg-blue-300' }
      ],
      prompt: '💭 위험한 상황에 개입해야 할까?'
    },
    {
      id: 'decide_warn_billy',
      title: '정의로운 결심',
      text: `"빌에게 경고해야 해!"

너는 결심했어.

기자는 진실을 알리는 사람이야!

위험에 처한 사람을 도와야 해!

용감한 선택이야!`,
      bg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
      choices: [
        { label: '바로 여관으로 간다', to: 'rush_to_benbow', cls: 'bg-red-300' },
        { label: '먼저 계획을 세운다', to: 'plan_approach', cls: 'bg-blue-300' }
      ],
      prompt: '💭 행동하기 전에 계획이 필요할까?'
    },
    {
      id: 'gather_more_info',
      title: '신중한 취재',
      text: `"더 많이 알아야 해!"

너는 여러 사람에게 물었어.

"해적들이 오늘 밤 움직인대!"

"존 실버가 계획을 세웠어!"

중요한 정보들이야!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
      choices: [
        { label: '정보를 정리한다', to: 'organize_all_info', cls: 'bg-green-300' }
      ],
      prompt: '💭 충분한 정보가 있어야 행동할까?'
    },
    {
      id: 'rush_to_benbow',
      title: '급한 발걸음',
      text: `너는 서둘러 달렸어.

"시간이 없어!"

벤보 여관은 멀지 않아.

땀을 흘리며 계속 달려!

빨리!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
      choices: [
        { label: '여관에 도착한다', to: 'benbow_inn', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 긴급할 때는 빨리 행동해야 할까?'
    },
    {
      id: 'plan_approach',
      title: '전략 수립',
      text: `"계획을 세우자!"

너는 노트에 적었어.

"1. 빌을 만난다"

"2. 위험을 알린다"

"3. 안전하게 돕는다"

좋은 계획이야!`,
      bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      choices: [
        { label: '계획대로 실행한다', to: 'execute_plan', cls: 'bg-green-300' }
      ],
      prompt: '💭 계획이 성공률을 높일까?'
    },
    {
      id: 'organize_all_info',
      title: '종합 정리',
      text: `모든 정보를 정리했어.

"빌 본즈 - 벤보 여관, 지도 소유"

"해적들 - 오늘 밤 습격 계획"

"존 실버 - 주모자"

"시간 - 얼마 없음!"

명확해졌어!`,
      bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      choices: [
        { label: '빌을 구하러 간다', to: 'save_billy_mission', cls: 'bg-red-300' }
      ],
      prompt: '💭 정리하면 행동이 명확해질까?'
    },
    {
      id: 'execute_plan',
      title: '계획 실행',
      text: `너는 차분하게 준비했어.

"당황하지 말고..."

"계획대로 하자!"

침착함을 유지해.

여관으로 출발!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
      choices: [
        { label: '여관에 도착한다', to: 'benbow_inn', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 침착함이 성공의 열쇠일까?'
    },
    {
      id: 'save_billy_mission',
      title: '구출 임무',
      text: `"빌을 구해야 해!"

너는 결연한 표정을 지었어.

기자는 방관자가 아니야!

행동하는 사람이야!

출발!`,
      bg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
      choices: [
        { label: '여관으로 서둘러 간다', to: 'benbow_inn', cls: 'bg-red-300' }
      ],
      prompt: '💭 정의를 위해 행동할 용기가 있니?'
    },
    {
      id: 'want_meet_silver',
      title: '위험한 호기심',
      text: `"존 실버를 직접 만나보고 싶어!"

너는 결심했어.

기자는 직접 만나봐야 해!

위험할 수도 있지만...

진실을 위해서라면!`,
      bg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
      choices: [
        { label: '실버를 찾아간다', to: 'meet_silver', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 진실을 위해 위험을 감수할 수 있니?'
    },
    {
      id: 'continue_reporting',
      title: '기자의 사명',
      text: `너는 계속 취재했어.

"진실을 밝히는 게 기자의 일이야!"

항구를 돌아다니며 정보를 모아.

해적들의 세계가 보이기 시작해!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
      choices: [
        { label: '존 실버를 만난다', to: 'meet_silver', cls: 'bg-gray-300' },
        { label: '빌 본즈를 찾는다', to: 'search_billy', cls: 'bg-red-300' }
      ],
      prompt: '💭 진실을 찾는 게 왜 중요할까?'
    },
    {
      id: 'careful_question',
      title: '신중한 대화',
      text: `"선생님, 해적에 대해 여쭤봐도 될까요?"

실버가 웃었어.

"호기심이 많구나! 좋아."

"해적은 자유를 찾는 사람들이지."

"하지만 대가도 크단다..."`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '자유에 대해 묻는다', to: 'ask_freedom', cls: 'bg-blue-300' },
        { label: '대가에 대해 묻는다', to: 'ask_price', cls: 'bg-red-300' }
      ],
      prompt: '💭 자유에는 대가가 따를까?'
    },
    {
      id: 'observe_silver',
      title: '관찰의 지혜',
      text: `너는 조용히 관찰했어.

실버는 사람들과 잘 어울려.

친절하게 대해주지.

하지만 가끔 눈빛이 차가워져...

"겉과 속이 다른 사람이구나..."`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '노트에 기록한다', to: 'record_observation', cls: 'bg-green-300' },
        { label: '직접 대화를 시도한다', to: 'talk_to_silver', cls: 'bg-blue-300' }
      ],
      prompt: '💭 관찰만으로도 알 수 있는 게 있을까?'
    },
    {
      id: 'talk_to_silver',
      title: '용기 있는 접근',
      text: `"존 실버님!"

너는 다가갔어.

"저는 기자예요. 인터뷰해도 될까요?"

실버가 웃으며 말했어.

"기자라고? 재미있군!"`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '조심스럽게 질문한다', to: 'careful_question', cls: 'bg-blue-300' }
      ],
      prompt: '💭 직접 부딪치는 게 나을까?'
    },
    {
      id: 'power_of_map',
      title: '지도가 가진 힘',
      text: `너는 깨달았어.

"지도 하나가 사람들을 변하게 하네..."

"친구를 적으로 만들고..."

"평화를 깨뜨려..."

"욕심은 정말 무섭구나!"`,
      bg: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60',
      choices: [
        { label: '욕심에 대한 기사를 쓴다', to: 'write_greed_article', cls: 'bg-purple-300' },
        { label: '빌을 도와야겠다고 생각한다', to: 'help_billy_decision', cls: 'bg-blue-300' }
      ],
      prompt: '💭 물건보다 마음이 중요할까?'
    },
    {
      id: 'help_billy_decision',
      title: '도움의 결심',
      text: `"빌이 불쌍해..."

너는 생각했어.

"지도 때문에 평생 도망 다니잖아..."

"누군가 도와줘야 해!"

공감하는 마음이야!`,
      bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      choices: [
        { label: '빌을 찾아간다', to: 'final_search', cls: 'bg-red-300' },
        { label: '먼저 기사를 쓴다', to: 'write_greed_article', cls: 'bg-purple-300' }
      ],
      prompt: '💭 공감이 행동으로 이어질까?'
    },
    {
      id: 'ask_freedom',
      title: '자유의 의미',
      text: `"해적의 자유가 뭔가요?"

실버가 바다를 바라봤어.

"규칙에 얽매이지 않는 것..."

"하지만 진정한 자유는..."

"책임을 질 수 있을 때 오는 거야."`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      choices: [
        { label: '자유와 책임을 생각한다', to: 'freedom_responsibility', cls: 'bg-blue-300' }
      ],
      prompt: '💭 자유에는 책임이 따를까?'
    },
    {
      id: 'ask_price',
      title: '자유의 대가',
      text: `"무슨 대가를 치르나요?"

실버가 진지해졌어.

"가족을 잃고, 친구를 지."

"항상 도망 다녀야 하고..."

"결국 외롭게 되는 거야."`,
      bg: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c',
      choices: [
        { label: '선택의 무게를 느낀다', to: 'weight_of_choice', cls: 'bg-red-300' }
      ],
      prompt: '💭 모든 선택에는 대가가 있을까?'
    },
    {
      id: 'record_observation',
      title: '기자의 눈',
      text: `노트에 적었어.

"존 실버 - 친절하지만 계산적"

"사람들을 잘 다루는 재능"

"하지만 진심인지 알 수 없음"

"더 관찰이 필요함"`,
      bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      choices: [
        { label: '더 깊이 알아본다', to: 'dig_deeper', cls: 'bg-blue-300' }
      ],
      prompt: '💭 기록하는 습관이 있니?'
    },
    {
      id: 'write_greed_article',
      title: '두 번째 기사: 욕심',
      text: `너는 또 기사를 썼어.

"보물 지도가 부른 재앙"

"하나의 지도가 친구를 적으로 만들었다."

"욕심은 평화를 파괴한다."

좋은 기사야!`,
      bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      choices: [
        { label: '실버를 더 취재한다', to: 'investigate_silver', cls: 'bg-gray-300' },
        { label: '빌 본즈를 찾는다', to: 'final_search', cls: 'bg-red-300' }
      ],
      prompt: '💭 글쓰기로 생각을 정리할 수 있니?'
    },
    {
      id: 'freedom_responsibility',
      title: '균형의 지혜',
      text: `"자유와 책임의 균형..."

너는 중요한 걸 배웠어!

"진짜 자유는 책임질 수 있을 때구나."

실버가 고개를 끄덕였어.

"똑똑한 친구로군!"`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      choices: [
        { label: '실버에게 더 묻는다', to: 'ask_silver_more', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 책임을 질 준비가 되어 있니?'
    },
    {
      id: 'weight_of_choice',
      title: '선택의 결과',
      text: `"모든 선택엔 결과가 있구나..."

너는 노트에 적었어.

"해적이 되는 건 선택이다."

"하지만 그 대가도 받아들여야 한다."

깊은 통찰이야!`,
      bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      choices: [
        { label: '선택에 대한 기사를 쓴다', to: 'write_choice_article', cls: 'bg-purple-300' }
      ],
      prompt: '💭 선택하기 전에 결과를 생각하니?'
    },
    {
      id: 'dig_deeper',
      title: '심층 취재',
      text: `너는 실버를 며칠동안 관찰했어.

그는 정말 영리해!

사람들의 마음을 잘 읽어.

"나중에 큰일을 벌일 사람이야..."

예감이 들었어.`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
      choices: [
        { label: '실버의 계획을 알아본다', to: 'silvers_plan', cls: 'bg-red-300' }
      ],
      prompt: '💭 직감을 믿니?'
    },
    {
      id: 'investigate_silver',
      title: '실버 추적',
      text: `너는 실버를 조사했어.

여러 사람에게 물어봤지.

"존 실버는 요리사로 일해."

"하지만 원래 해적이었대."

"지금도 보물을 노린다던데..."`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
      choices: [
        { label: '더 깊이 파고든다', to: 'silvers_plan', cls: 'bg-red-300' }
      ],
      prompt: '💭 과거를 아는 게 중요할까?'
    },
    {
      id: 'ask_silver_more',
      title: '진실의 문턱',
      text: `"빌 본즈를 아시나요?"

실버의 눈빛이 변했어.

"...왜 그런 걸 묻지?"

조금 긴장한 것 같아.

"조심스러운 주제구나..."`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '물러선다', to: 'back_off', cls: 'bg-gray-300' },
        { label: '계속 묻는다', to: 'press_on', cls: 'bg-red-300' }
      ],
      prompt: '💭 때로는 물러서는 게 지혜일까?'
    },
    {
      id: 'write_choice_article',
      title: '세 번째 기사: 선택',
      text: `"해적의 선택과 그 대가"

너의 세 번째 기사야!

"자유를 선택하면 외로움을 받는다."

"모든 선택에는 책임이 따른다."

점점 깊어지고 있어!`,
      bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      choices: [
        { label: '빌 본즈를 찾는다', to: 'final_search', cls: 'bg-red-300' }
      ],
      prompt: '💭 글쓰기가 네 생각을 성장시키니?'
    },
    {
      id: 'silvers_plan',
      title: '실버의 야망',
      text: `조용히 듣다 보니 알게 됐어.

"존 실버는 보물을 노리고 있어!"

"빌 본즈의 지도를 빼앗으려 해."

"다른 해적들과 계획을 세우고 있어..."

위험한 음모야!`,
      bg: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c',
      choices: [
        { label: '빌에게 경고해야 한다', to: 'must_warn', cls: 'bg-red-300' }
      ],
      prompt: '💭 나쁜 일을 알게 되면 막아야 할까?'
    },
    {
      id: 'back_off',
      title: '신중한 후퇴',
      text: `"아, 그냥 궁금해서요..."

너는 화제를 돌렸어.

때로는 물러서는 게 현명해.

더 안전한 방법을 찾자!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
      choices: [
        { label: '다른 방법을 찾는다', to: 'find_another_way', cls: 'bg-blue-300' }
      ],
      prompt: '💭 용기와 무모함은 어떻게 다를까?'
    },
    {
      id: 'press_on',
      title: '용기 있는 질문',
      text: `"전 기자예요. 진실이 알고 싶어요!"

실버가 웃었어.

"용감한 꼬마로군..."

"하지만 너무 깊이 파면 위험해."

경고하는 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '진실을 위해 계속한다', to: 'pursue_truth', cls: 'bg-red-300' }
      ],
      prompt: '💭 진실을 위해 위험을 감수할까?'
    },
    {
      id: 'final_search',
      title: '빌 본즈를 찾아서',
      text: `너는 빌 본즈를 찾아 헤맸어.

마침내 소문을 들었지.

"어떤 선장이 작은 여관으로 갔대!"

"벤보 제독 여관이라는 곳..."

"거기 숨어 있을 거야!"`,
      bg: 'https://images.unsplash.com/photo-1564769625905-50e93615e769',
      choices: [
        { label: '벤보 여관을 찾아간다', to: 'benbow_inn', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 끈기가 중요할까?'
    },
    {
      id: 'must_warn',
      title: '정의로운 마음',
      text: `"빌 본즈에게 알려줘야 해!"

너는 결심했어.

기자는 진실을 알리는 사람이야!

하지만 빌을 어떻게 찾지?`,
      bg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
      choices: [
        { label: '빌을 찾아 나선다', to: 'final_search', cls: 'bg-red-300' }
      ],
      prompt: '💭 정의를 위해 행동할 수 있니?'
    },
    {
      id: 'find_another_way',
      title: '안전한 경로',
      text: `"직접 묻는 건 위험해."

"다른 방법으로 알아보자!"

너는 여러 정보원을 만났어.

조각조각 진실을 모아가!`,
      bg: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
      choices: [
        { label: '정보를 종합한다', to: 'piece_together', cls: 'bg-green-300' }
      ],
      prompt: '💭 안전하게 목표를 이루는 방법이 있을까?'
    },
    {
      id: 'pursue_truth',
      title: '진실 추구',
      text: `"전 진실을 포기할 수 없어요!"

실버가 감탄했어.

"좋아... 조심해야 할 거야."

"빌 본즈는 도망 다녀."

"벤보 여관으로 갔을지도..."`,
      bg: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae',
      choices: [
        { label: '벤보 여관으로 간다', to: 'benbow_inn', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 진실을 추구하는 게 가치 있을까?'
    },
    {
      id: 'piece_together',
      title: '퍼즐 맞추기',
      text: `여러 정보를 모았어.

"빌 본즈 - 플린트의 일등 항해사"

"지도를 가지고 도망 중"

"존 실버와 다른 해적들이 추적"

"벤보 여관에 숨었을 가능성!"`,
      bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      choices: [
        { label: '벤보 여관으로 향한다', to: 'benbow_inn', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 작은 정보들이 모여 큰 그림이 될까?'
    },
    {
      id: 'benbow_inn',
      title: '벤보 제독 여관',
      text: `드디어 벤보 여관에 도착했어!

작은 언덕 위에 있는 여관이야.

바다가 보이는 조용한 곳...

"빌 본즈가 여기 있을 거야!"

문을 두드렸어.`,
      bg: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      choices: [
        { label: '바로 들어간다', to: 'talk_innkeeper', cls: 'bg-blue-300' },
        { label: '먼저 주변을 살핀다', to: 'check_surroundings', cls: 'bg-green-300' }
      ],
      prompt: '💭 목표에 가까워지면 떨리니?'
    },
    {
      id: 'check_surroundings',
      title: '주변 살피기',
      text: `너는 주변을 살펴보았어.

여관 주변에는 작은 마을이 있어.

"여관 주인이 있을 거야!"

문을 두드렸어.`,
      bg: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      choices: [
        { label: '여관 주인과 이야기한다', to: 'talk_innkeeper', cls: 'bg-blue-300' }
      ],
      prompt: '💭 주변을 살펴보는 게 중요할까?'
    },
    {
      id: 'talk_innkeeper',
      title: '여관 주인',
      text: `친절한 부부가 문을 열었어.

어린 아들도 있어.

"안녕하세��! 혹시..."

그 순간, 한 남자가 계단을 내려왔어.

거친 모습의 선장...빌 본즈야!`,
      bg: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      choices: [
        { label: '빌을 관찰한다', to: 'observe_billy', cls: 'bg-red-300' },
        { label: '여관 주인에게 물어본다', to: 'ask_innkeeper', cls: 'bg-blue-300' }
      ],
      prompt: '💭 기다리던 순간이 오면 어떤 기분일까?'
    },
    {
      id: 'ask_innkeeper',
      title: '여관 주인의 걱정',
      text: `너는 여관 주인에게 조용히 물었어.

"저 선장님은...?"

"빌 본즈라는 분이에요."

"좋은 분 같은데 항상 불안해하세요..."

"무슨 일이 있나 봐요."

여관 주인도 걱정하고 있어.`,
      bg: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      choices: [
        { label: '빌을 관찰한다', to: 'observe_billy', cls: 'bg-red-300' }
      ],
      prompt: '💭 다른 사람의 걱정을 공감할 수 있니?'
    },
    {
      id: 'observe_billy',
      title: '빌 본즈',
      text: `빌 본즈는 무서워 보여.

칼 상처가 많고, 얼굴은 긴장해 있어.

계속 주위를 살펴.

"누가 따라올까 봐 두려워하는구나..."

지도 때문에 평생 도망 다니는 거야.`,
      bg: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c',
      choices: [
        { label: '동정심이 든다', to: 'feel_sympathy', cls: 'bg-blue-300' }
      ],
      prompt: '💭 소유가 때로는 고통이 될까?'
    },
    {
      id: 'feel_sympathy',
      title: '이해와 동정',
      text: `"보물 때문에 평생 도망 다니네..."

너는 깨달았어.

"보물이 행복을 주는 게 아니구나."

"오히려 불행을 가져왔어."

슬픈 이야기야...`,
      bg: 'https://images.unsplash.com/photo-1610618292314-e55c7ac33485',
      choices: [
        { label: '마지막 기사를 쓴다', to: 'final_article', cls: 'bg-purple-300' }
      ],
      prompt: '💭 진짜 행복은 뭘까?'
    },
    {
      id: 'final_article',
      title: '마지막 기사: 진정한 보물',
      text: `너는 마지막 기사를 썼어.

"진정한 보물은 무엇인가"

"금과 보석이 아닌..."

"신뢰, 자유, 평화..."

"그리고 함께하는 사람들이다!"

완벽한 마무리야!`,
      bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      choices: [
        { label: '여관을 떠난다', to: 'leave_inn', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 진정한 보물이 뭐라고 생각하니?'
    },
    {
      id: 'leave_inn',
      title: '새로운 시작',
      text: `너는 여관을 나왔어.

빌 본즈는 그곳에 머물 거야.

곧 다른 해적들이 찾아올 거고...

그때부터 진짜 모험이 시작되겠지.

"이건 무조건 특종이야!"`,
      bg: 'https://images.unsplash.com/photo-1589667967858-70c5fad4c255',
      choices: [
        { label: '보물섬 이야기를 읽어본다', to: 'ending', cls: 'bg-blue-300' }
      ],
      prompt: '💭 이야기는 끝이 또 다른 시작일까?'
    },
    {
      id: 'ending',
      title: '보물섬의 시작',
      text: `너는 이제 알게 됐어!

📍 플린트 선장이 엄청난 보물을 섬에 숨겼어
📍 해적들은 보물 때문에 서로 배신하고 싸워
📍 플린트의 선원 벤 건이 보물에 욕심을 냈어
📍 빌 본즈가 그 보물 지도를 가지고 있어
📍 존 실버와 다른 해적들이 지도를 빼앗으려 해

누군가 보물 지도를 얻게 된다면 진짜 모험이 시작될거야! 어떤 특종이 기다리고 있을지 기대되는걸?

**📚 《보물섬》을 읽으면 알 수 있어!**

도서관이나 서점에서 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      prompt: '🏴‍☠️ 《보물섬》 - 로버트 루이스 스티븐슨이 쓴 고전 명작 소설! *원피스*처럼 보물을 둘러싼 갈등, 배신, 그리고 진정한 용기와 신뢰에 대해 배우는 모험 이야기야.',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' }
      ]
    }
  ];
}
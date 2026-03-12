import type { Scene } from '../../types';

export function generateRomeoJulietStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  return [
    {
      id: 'start',
      title: '베로나의 아침',
      text: `이탈리아 베로나, 1590년대.

너는 이 도시의 심부름꾼이야.
편지를 전하고, 책을 배달하고,
사람들의 메시지를 전해주지.

오늘도 가방을 메고
베로나 거리로 나서.

사람들의 이야기가
너를 기다리고 있어.`,
      bg: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9',
      choices: [
        { label: '광장으로 향한다', to: 'to_square', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '귀족 저택 구역으로 간다', to: 'to_noble_district', cls: 'bg-purple-300 bg-opacity-50' }
      ],
      prompt: '💭 오늘은 어디서부터 심부름을 시작할까?'
    },
    {
      id: 'to_square',
      title: '광장의 소동',
      text: `광장에 도착하니
사람들이 웅성거려.

"또 몬터규와 캐풀릿이 싸웠대!"
"언제까지 저럴 거야?"

너는 고개를 갸웃거려.
베로나에서 가장 유명한
두 귀족 집안이
왜 늘 싸우는 걸까?`,
      bg: 'https://images.unsplash.com/photo-1549053780-bae1106b21d5',
      choices: [
        { label: '두 집안에 대해 물어본다', to: 'ask_about_families', cls: 'bg-yellow-300 bg-opacity-50' },
        { label: '조용히 관찰한다', to: 'observe_quietly', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 두 집안의 이야기가 궁금해?'
    },
    {
      id: 'to_noble_district',
      title: '귀족 거리',
      text: `베로나의 귀족 거리는
아름다운 저택들이 줄지어 있어.

그런데 이상한 걸 발견해.

왼쪽 거리는 온통 푸른색,
오른쪽 거리는 온통 붉은색.

푸른 깃발과 붉은 깃발이
서로 등을 지고 있어.`,
      bg: 'https://images.unsplash.com/photo-1533577116850-9af5e8b33415',
      choices: [
        { label: '푸른 거리로 간다', to: 'blue_street', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '붉은 거리로 간다', to: 'red_street', cls: 'bg-red-300 bg-opacity-50' }
      ],
      prompt: '💭 푸른색과 붉은색, 무슨 의미일까?'
    },
    {
      id: 'ask_about_families',
      title: '두 집안 이야기',
      text: `상인 아저씨가 설명해 줘.

"푸른 몬터규 가문과
붉은 캐풀릿 가문은
베로나의 양대 귀족이지.

하지만 물과 불처럼
절대 섞일 수 없는 사이야.

몬터규는 차갑고 냉정해.
캐풀릿은 뜨겁고 격정적이지.

서로 다른 방식으로
세상을 바라보거든."`,
      bg: 'https://images.unsplash.com/photo-1591570548468-752aece6ef6d',
      choices: [
        { label: '왜 싸우게 되었는지 묻는다', to: 'why_fight', cls: 'bg-purple-300 bg-opacity-50' },
        { label: '각 가문의 특징을 더 듣는다', to: 'family_traits', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 물과 불처럼 다른 두 집안?'
    },
    {
      id: 'observe_quietly',
      title: '조용한 관찰자',
      text: `너는 사람들의 이야기를
조용히 듣기로 해.

"몬터규는 이성적이야."
"캐풀릿은 감정적이지."
"푸른색과 붉은색처럼 정반대야."

너는 이 이야기들을
마음속에 담아.

언젠가 이것을
글로 써보고 싶다는 생각이 들어.

하지만 먼저, 두 집안 사람들을
직접 만나봐야겠어.`,
      bg: 'https://images.unsplash.com/photo-1719773906940-5b0cf605b1cb',
      choices: [
        { label: '푸른 거리로 간다', to: 'blue_street', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '붉은 거리로 간다', to: 'red_street', cls: 'bg-red-300 bg-opacity-50' }
      ],
      prompt: '💭 두 집안 사람들을 만나보자!'
    },
    {
      id: 'blue_street',
      title: '푸른 몬터규 거리',
      text: `푸른 깃발이 펄럭이는 거리.

몬터규 저택은 차분하고 고요해.
사람들은 절제된 목소리로 말하고,
모든 것이 질서정연해.

"이성이 우선이다."
"감정에 휘둘리지 말라."

이것이 몬터규의 방식이야.`,
      bg: 'https://images.unsplash.com/photo-1555881842-8a7e95ab7bfa',
      choices: [
        { label: '몬터규 사람들을 만난다', to: 'talk_montague', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 차갑고 이성적인 분위기를 느껴봐.'
    },
    {
      id: 'red_street',
      title: '붉은 캐풀릿 거리',
      text: `붉은 깃발이 휘날리는 거리.

캐풀릿 저택은 활기차고 열정적이야.
사람들은 큰 목소리로 웃고,
감정을 자유롭게 표현해.

"열정이 최고다!"
"마음이 이끄는 대로!"

이것이 캐풀릿의 방식이야.`,
      bg: 'https://images.unsplash.com/photo-1582485910339-a62d8b6b0e95',
      choices: [
        { label: '캐풀릿 사람들을 만난다', to: 'talk_capulet', cls: 'bg-red-300 bg-opacity-50' }
      ],
      prompt: '💭 뜨겁고 감정적인 분위기를 느껴봐.'
    },
    {
      id: 'why_fight',
      title: '싸움의 시작',
      text: `"왜 싸우게 되었냐고?"
노인이 한숨을 쉬며 말해.

"옛날에 큰 사건이 있었어.
베로나의 미래를 놓고
두 집안이 정반대 의견을 냈지.

몬터규는 신중하게,
캐풀릿은 과감하게.

결국 도시가 둘로 나뉘었고,
그때부터 원수가 되었단다.

물과 불은 만날 수 없듯이."`,
      bg: 'https://images.unsplash.com/photo-1648397618997-0a2b24c5eaf3',
      choices: [
        { label: '화해할 방법을 생각한다', to: 'think_peace', cls: 'bg-green-300 bg-opacity-50' },
        { label: '각 가문의 특징을 더 알아본다', to: 'family_traits', cls: 'bg-purple-300 bg-opacity-50' }
      ],
      prompt: '💭 물과 불도 함께할 방법이 있지 않을까?'
    },
    {
      id: 'family_traits',
      title: '성향의 차이',
      text: `상인이 재미있는 비유를 해 줘.

"요즘 말로 하면 MBTI가 다른 거야.

몬터규는 T(생각) 형,
캐풀릿은 F(감정) 형.

몬터규는 J(계획) 형,
캐풀릿은 P(즉흥) 형.

서로의 방식을 이해하지 못하고,
자기 방식이 최고라고 생각하지.

마치 정치인들이 서로 싸우는 것처럼."

너는 두 집안 사람들을
직접 만나보고 싶어졌어.`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '푸른 거리로 간다', to: 'blue_street', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '붉은 거리로 간다', to: 'red_street', cls: 'bg-red-300 bg-opacity-50' }
      ],
      prompt: '💭 두 집안 사람들을 직접 만나보자!'
    },
    {
      id: 'talk_montague',
      title: '몬터규의 청년',
      text: `푸른 옷을 입은 청년이
나무 아래 앉아 있어.

한숨을 쉬며 무언가를 쓰고 있지.

"사랑이란 무엇일까..."

섬세하고 낭만적인 청년이야.
요즘 사랑에 빠져 괴로워하는 것 같아.

이 청년도 특별한 사람이구나.

이제 캐풀릿 가문도 가봐야겠어.`,
      bg: 'https://images.unsplash.com/photo-1701351717123-11c1d97dd339',
      choices: [
        { label: '붉은 거리로 간다', to: 'talk_capulet', cls: 'bg-red-300 bg-opacity-50' }
      ],
      prompt: '💭 캐풀릿 가문 사람들도 만나보자!'
    },
    {
      id: 'talk_capulet',
      title: '캐풀릿의 소녀',
      text: `붉은 드레스를 입은 소녀가
책을 읽고 있어.

하지만 그저 읽기만 하는 게 아니야.
질문하고, 생각하고,
자기만의 답을 찾고 있지.

"왜 운명을 따라야 하지?"

똑똑하고 당찬 소녀야.

이 소녀도 특별한 사람이구나.

이제 친구들도 만나봐야겠어.`,
      bg: 'https://images.unsplash.com/photo-1688439276816-8f4f2ad52bd2',
      choices: [
        { label: '친구들을 만나러 간다', to: 'meet_friends', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 두 집안의 친구들도 궁금해!'
    },
    {
      id: 'think_peace',
      title: '평화의 꿈',
      text: `너는 생각해.

"두 집안이 화해할 수는 없을까?"

물과 불도
적당한 온도에서 만나면
따뜻한 증기가 되잖아.

MBTI도 T형과 F형이 만나면
더 좋은 결정을 내릴 수 있고.

다름은 틀림이 아니야.
함께하면 더 강해질 수 있어.`,
      bg: 'https://images.unsplash.com/photo-1762920738995-f393efe82205',
      choices: [
        { label: '평화를 위해 노력한다', to: 'work_for_peace', cls: 'bg-green-300 bg-opacity-50' },
        { label: '먼저 사람들을 더 알아본다', to: 'meet_people', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 평화를 위해 무엇을 할 수 있을까?'
    },
    {
      id: 'understand_difference',
      title: '다름의 가치',
      text: `너는 깨달아.

"서로 다르기 때문에
더 풍부해질 수 있어."

몬터규의 신중함과
캐풀릿의 열정이 만나면

더 좋은 결정을 내리고,
더 멋진 일을 할 수 있을 거야.

하지만 두 집안은
아직 그걸 모르고 있어.

직접 사람들을 만나봐야겠어.`,
      bg: 'https://images.unsplash.com/photo-1759513332107-cbc80cdbf6ac',
      choices: [
        { label: '푸른 거리로 간다', to: 'blue_street', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '붉은 거리로 간다', to: 'red_street', cls: 'bg-red-300 bg-opacity-50' }
      ],
      prompt: '💭 두 집안 사람들을 만나보자!'
    },
    {
      id: 'meet_people',
      title: '사람들을 만나다',
      text: `너는 양쪽 집안의
사람들을 만나보기로 해.

몬터규 쪽에는
차분한 벤볼리오와
재치있는 머큐쇼가 있고,

캐풀릿 쪽에는
격정적인 티볼트와
점잖은 파리스가 있어.

모두 다른 성격이지.`,
      bg: 'https://images.unsplash.com/photo-1719773906940-5b0cf605b1cb',
      choices: [
        { label: '친구들을 만나본다', to: 'meet_friends', cls: 'bg-yellow-300 bg-opacity-50' },
        { label: '더 많은 사람들을 관찰한다', to: 'observe_more', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 어떤 사람들을 만나볼까?'
    },
    {
      id: 'start_writing',
      title: '이야기 기록',
      text: `너는 작은 수첩을 꺼내
오늘 본 것들을 기록하기 시작해.

"베로나의 두 집안..."

사람들의 말,
감정들,
갈등들.

모두 적어 내려가.

언젠가 이것이
뭔가 의미 있는 글이 될 수도 있어.`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '행복한 이야기로 만들까?', to: 'consider_comedy', cls: 'bg-yellow-300 bg-opacity-50' },
        { label: '교훈 있는 이야기로 만들까?', to: 'consider_tragedy', cls: 'bg-gray-300 bg-opacity-50' }
      ],
      prompt: '💭 이 이야기는 어떻게 끝날까?'
    },
    {
      id: 'talk_romeo',
      title: '청년과의 대화',
      text: `"안녕, 심부름꾼 친구."
청년이 미소 지어.

"난 사랑에 빠졌어.
하지만 그녀는 날 사랑하지 않아.

사랑이란 이렇게
아픈 건가..."

순수하고 열정적인 청년이야.
지금은 짝사랑에 괴로워하고 있어.`,
      bg: 'https://images.unsplash.com/photo-1645694564299-eb5d7900d0e3',
      choices: [
        { label: '위로의 말을 건넨다', to: 'comfort_romeo', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '사랑에 대해 이야기한다', to: 'talk_about_love', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 사랑에 빠진 청년을 어떻게 도울까?'
    },
    {
      id: 'observe_romeo',
      title: '청년 관찰',
      text: `너는 청년을 조용히 관찰해.

그는 시를 쓰고,
꽃을 바라보고,
별을 세며 한숨 쉬어.

전형적인 몬터규답지 않게
감정이 풍부한 사람이야.

"물과 불의 경계에 선 사람이네."
너는 수첩에 적어.`,
      bg: 'https://images.unsplash.com/photo-1701351717123-11c1d97dd339',
      choices: [
        { label: '청년에 대해 더 알아본다', to: 'learn_about_romeo', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '다른 사람들도 만나본다', to: 'meet_friends', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 독특한 청년이 흥미로워?'
    },
    {
      id: 'talk_juliet',
      title: '소녀와의 대화',
      text: `"안녕, 심부름꾼!"
소녀가 밝게 웃어.

"난 책 읽는 걸 좋아해.
특히 다른 세상 이야기들.

여자들은 결혼만 해야 한대.
하지만 난 내 인생을 살고 싶어.

그게 이상한 걸까?"

또래보다 훨씬 성숙한 소녀야.`,
      bg: 'https://images.unsplash.com/photo-1688439276816-8f4f2ad52bd2',
      choices: [
        { label: '꿈을 응원한다', to: 'support_juliet', cls: 'bg-green-300 bg-opacity-50' },
        { label: '운명에 대해 이야기한다', to: 'talk_about_fate', cls: 'bg-purple-300 bg-opacity-50' }
      ],
      prompt: '💭 당찬 소녀를 응원할까?'
    },
    {
      id: 'observe_juliet',
      title: '소녀 관찰',
      text: `너는 소녀를 조용히 관찰해.

그녀는 책을 읽으며
고개를 끄덕이기도 하고
고개를 젓기도 해.

자기만의 생각이 확실한
독립적인 사람이야.

"캐풀릿답지 않게 차분하네."
너는 수첩에 적어.`,
      bg: 'https://images.unsplash.com/photo-1762920738995-f393efe82205',
      choices: [
        { label: '소녀에 대해 더 알아본다', to: 'learn_about_juliet', cls: 'bg-red-300 bg-opacity-50' },
        { label: '다른 사람들도 만나본다', to: 'meet_friends', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 독특한 소녀가 흥미로워?'
    },
    {
      id: 'work_for_peace',
      title: '평화를 위한 노력',
      text: `너는 작은 심부름꾼이지만
할 수 있는 일을 시작해.

양쪽 집안에 편지를 전하며
친절한 말을 덧붙이고,

"오늘 날씨가 좋네요."
"서로 미소 지어보세요."

작은 시도들이지만,
언젠가는 큰 변화가 될 거야.`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '계속 노력한다', to: 'keep_trying', cls: 'bg-green-300 bg-opacity-50' },
        { label: '더 큰 계획을 세운다', to: 'bigger_plan', cls: 'bg-orange-300 bg-opacity-50' }
      ],
      prompt: '💭 작은 노력이 세상을 바꿀 수 있을까?'
    },
    {
      id: 'want_to_share',
      title: '깨달음 전하기',
      text: `너는 사람들에게 말해보기 시작해.

"다름은 나쁜 게 아니에요."
"함께하면 더 좋을 수 있어요."

하지만 사람들은 고개를 저어.

"몬터규와 캐풀릿이
함께하다니, 말도 안 돼!"

쉽지 않은 일이야.`,
      bg: 'https://images.unsplash.com/photo-1648397618997-0a2b24c5eaf3',
      choices: [
        { label: '포기하지 않는다', to: 'dont_give_up', cls: 'bg-green-300 bg-opacity-50' },
        { label: '다른 방법을 찾는다', to: 'find_another_way', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 사람들의 마음을 바꿀 수 있을까?'
    },
    {
      id: 'want_to_write',
      title: '이야기로 남기기',
      text: `너는 깨닫아.

"말로는 안 통해.
이야기로 보여줘야 해."

이 갈등과 화해,
사랑과 증오,
웃음과 눈물을

모두 담은 글을 써서
사람들에게 보여주면
뭔가 바뀔���도 몰라.`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '연극에 대해 알아본다', to: 'learn_about_play', cls: 'bg-purple-300 bg-opacity-50' },
        { label: '이야기 구상을 시작한다', to: 'plan_story', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 이야기의 힘을 믿어?'
    },
    {
      id: 'meet_friends',
      title: '친구들',
      text: `여러 사람들을 만나.

벤볼리오는 평화주의자야.
"싸움은 좋지 않아."

머큐쇼는 장난꾸러기야.
"인생은 즐기는 거지!"

티볼트는 자존심이 세.
"캐풀릿의 명예가 최고야!"

각자 다른 성격이지만,
모두 친구들을 아끼고 있어.`,
      bg: 'https://images.unsplash.com/photo-1719773906940-5b0cf605b1cb',
      choices: [
        { label: '평화로운 벤볼리오와 이야기한다', to: 'talk_benvolio', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '격정적인 티볼트와 이야기한다', to: 'talk_tybalt', cls: 'bg-red-300 bg-opacity-50' }
      ],
      prompt: '💭 친구들의 우정이 따뜻해 보여.'
    },
    {
      id: 'observe_more',
      title: '관찰 계속',
      text: `너는 양쪽 집안의
사람들을 계속 관찰해.

각자의 이야기가 있고,
각자의 고민이 있어.

"모두가 자기 이유로
살아가고 있구나."

이 모든 이야기가
흥미로워.`,
      bg: 'https://images.unsplash.com/photo-1719773906940-5b0cf605b1cb',
      choices: [
        { label: '이야기를 기록한다', to: 'record_observations', cls: 'bg-purple-300 bg-opacity-50' },
        { label: '평화를 위해 노력한다', to: 'work_for_peace', cls: 'bg-green-300 bg-opacity-50' }
      ],
      prompt: '💭 모든 사람의 이야기가 소중해.'
    },
    {
      id: 'consider_comedy',
      title: '희극이란?',
      text: `희극은 웃음과 행복으로
끝나는 이야기야.

오해와 갈등이 있지만,
결국 모두가 화해하고
행복하게 끝나지.

"두 집안이 화해하고,
모두가 웃으며 끝나는 이야기..."

그런 결말이 가능할까?`,
      bg: 'https://images.unsplash.com/photo-1762920738995-f393efe82205',
      choices: [
        { label: '행복한 결말을 원한다', to: 'want_happy_ending', cls: 'bg-yellow-300 bg-opacity-50' },
        { label: '현실적이지 않을 것 같다', to: 'consider_tragedy', cls: 'bg-gray-300 bg-opacity-50' }
      ],
      prompt: '💭 행복한 결말이 가능할까?'
    },
    {
      id: 'consider_tragedy',
      title: '비극이란?',
      text: `비극은 슬픔과 교훈으로
끝나는 이야기야.

주인공들이 노력하지만,
결국 비극적으로 끝나면서
사람들에게 깊은 교훈을 줘.

"증오의 대가를 보여주는 이야기..."

비극이 사람들의 마음을
바꿀 수 있을까?`,
      bg: 'https://images.unsplash.com/photo-1645694564299-eb5d7900d0e3',
      choices: [
        { label: '교훈을 주는 비극을 선택한다', to: 'choose_tragedy', cls: 'bg-gray-300 bg-opacity-50' },
        { label: '희극이 더 나을 것 같다', to: 'consider_comedy', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 슬픈 이야기가 더 큰 교훈을 줄까?'
    },
    {
      id: 'comfort_romeo',
      title: '청년 위로하기',
      text: `"괜찮아질 거야."
너는 위로해 줘.

"진짜 사랑은
언젠가 찾아올 거야.

지금의 짝사랑은
너를 준비시키는 거야."

청년이 고개를 들어.
"정말 그럴까?"

"그럼, 분명히."`,
      bg: 'https://images.unsplash.com/photo-1688439276816-8f4f2ad52bd2',
      choices: [
        { label: '청년의 미래를 상상한다', to: 'imagine_future', cls: 'bg-pink-300 bg-opacity-50' },
        { label: '다른 사람들도 만나본다', to: 'meet_friends', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 진짜 사랑이 찾아올까?'
    },
    {
      id: 'talk_about_love',
      title: '사랑에 대하여',
      text: `"사랑은 강력한 힘이야."
너는 말해.

"사랑은 장벽을 넘고,
미움을 녹이고,
불가능을 가능하게 해.

진짜 사랑을 만나면,
세상이 달라 보일 거야."

청년의 눈이 반짝여.`,
      bg: 'https://images.unsplash.com/photo-1759513332107-cbc80cdbf6ac',
      choices: [
        { label: '사랑의 힘을 믿는다', to: 'believe_in_love', cls: 'bg-pink-300 bg-opacity-50' },
        { label: '조심스럽게 경고한다', to: 'warn_about_love', cls: 'bg-orange-300 bg-opacity-50' }
      ],
      prompt: '💭 사랑은 정말 모든 것을 이길 수 있을까?'
    },
    {
      id: 'learn_about_romeo',
      title: '청년의 성격',
      text: `너는 청년에 대해 더 알게 돼.

그는 몬터규 가문이지만
감정이 풍부하고,
시를 쓰고 꿈을 꾸는
낭만적인 사람이야.

"물 속의 불씨 같은 사람."

그는 두 세계의 경계에 서 있어.
그래서 더 특별해.`,
      bg: 'https://images.unsplash.com/photo-1701351717123-11c1d97dd339',
      choices: [
        { label: '청년의 이야기를 기록한다', to: 'record_observations', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '소녀도 알아본다', to: 'learn_about_juliet', cls: 'bg-red-300 bg-opacity-50' }
      ],
      prompt: '💭 경계에 선 사람이 흥미로워.'
    },
    {
      id: 'support_juliet',
      title: '소녀 응원하기',
      text: `"네 꿈을 따라."
너는 응원해 줘.

"여자도 자기 인생을 살 수 있어.
네가 원하는 걸 선택해.

운명은 만드는 거야,
따르는 게 아니야."

소녀가 환하게 웃어.
"고마워!"`,
      bg: 'https://images.unsplash.com/photo-1762920738995-f393efe82205',
      choices: [
        { label: '소녀의 미래를 상상한다', to: 'imagine_future', cls: 'bg-pink-300 bg-opacity-50' },
        { label: '다른 사람들도 만나본다', to: 'meet_friends', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 자기 운명을 만들 수 있을까?'
    },
    {
      id: 'talk_about_fate',
      title: '운명에 대하여',
      text: `"운명은 정해진 게 아니야."
너는 말해.

"우리가 내리는 선택들이
운명을 만들어가는 거야.

용감하게 선택하면,
새로운 길이 열려."

소녀가 고개를 끄덕여.
"그럼 난 내 길을 선택할 거야."`,
      bg: 'https://images.unsplash.com/photo-1759513332107-cbc80cdbf6ac',
      choices: [
        { label: '선택의 힘을 믿는다', to: 'believe_in_choice', cls: 'bg-green-300 bg-opacity-50' },
        { label: '조심스럽게 경고한다', to: 'warn_about_choice', cls: 'bg-orange-300 bg-opacity-50' }
      ],
      prompt: '💭 우리는 정말 운명을 바꿀 수 있을까?'
    },
    {
      id: 'learn_about_juliet',
      title: '소녀의 성격',
      text: `너는 소녀에 대해 더 알게 돼.

그녀는 캐풀릿 가문이지만
차분하고 생각이 깊고,
책을 읽고 질문하는
지적인 사람이야.

"불 속의 얼음 같은 사람."

그녀도 두 세계의 경계에 서 있어.
그래서 더 특별해.`,
      bg: 'https://images.unsplash.com/photo-1688439276816-8f4f2ad52bd2',
      choices: [
        { label: '소녀의 이야기를 기록한다', to: 'record_observations', cls: 'bg-red-300 bg-opacity-50' },
        { label: '청년도 알아본다', to: 'learn_about_romeo', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 경계에 선 사람이 흥미로워.'
    },
    {
      id: 'keep_trying',
      title: '계속되는 노력',
      text: `너는 매일 작은 노력을 계속해.

웃으며 인사하고,
친절한 말을 전하고,
양쪽의 좋은 점을 이야기하고.

사람들이 조금씩 부드러워져.

"저 심부름꾼 덕분에
기분이 좋아지네."

작은 변화가 시작되고 있어.`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '더 큰 변화를 꿈꾼다', to: 'dream_bigger', cls: 'bg-green-300 bg-opacity-50' },
        { label: '이야기로 기록한다', to: 'record_observations', cls: 'bg-purple-300 bg-opacity-50' }
      ],
      prompt: '💭 작은 노력이 쌓이고 있어!'
    },
    {
      id: 'bigger_plan',
      title: '더 큰 계획',
      text: `너는 더 큰 계획을 세워.

"만약 두 집안의 사람들이
함께 모일 기회가 있다면..."

파티나 축제 같은 곳에서
자연스럽게 만나게 하면
서로를 이해할 수 있을 거야.

하지만 어떻게?`,
      bg: 'https://images.unsplash.com/photo-1762920738995-f393efe82205',
      choices: [
        { label: '기회를 기다린다', to: 'wait_for_chance', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '작은 노력부터 한다', to: 'keep_trying', cls: 'bg-orange-300 bg-opacity-50' }
      ],
      prompt: '💭 큰 계획이 성공할 수 있을까?'
    },
    {
      id: 'dont_give_up',
      title: '포기하지 않기',
      text: `너는 포기하지 않아.

"언젠가는 통할 거야."

매일 작은 메시지를 전하고,
작은 친절을 베풀고,
작은 희망을 나눠.

포기하지 않는 마음이
기적을 만들어낼 거야.`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '희망을 품고 계속한다', to: 'keep_hoping', cls: 'bg-green-300 bg-opacity-50' },
        { label: '이야기로 남긴다', to: 'record_observations', cls: 'bg-purple-300 bg-opacity-50' }
      ],
      prompt: '💭 포기하지 않는 마음이 중요해!'
    },
    {
      id: 'find_another_way',
      title: '다른 방법',
      text: `너는 다른 방법을 생각해.

"말로 안 되면...
이야기로 보여주자!"

베로나의 이야기를
글로 만들어서
사람들에게 보여주는 거야.

연극이나 책으로 말이야.`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '연극에 대해 알아본다', to: 'learn_about_play', cls: 'bg-purple-300 bg-opacity-50' },
        { label: '이야기 구상을 시작한다', to: 'plan_story', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 이야기가 세상을 바꿀 수 있을까?'
    },
    {
      id: 'learn_about_play',
      title: '연극이란?',
      text: `너는 연극에 대해 알게 돼.

연극은 무대에서 공연하는
이야기야.

배우들이 인물이 되어
실제로 연기하면,
관객들이 직접 보고 느껴.

"이 베로나의 이야기를
연극으로 만들면..."

사람들의 마음을 움직일 수 있을까?`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '글 쓰는 일을 꿈꾼다', to: 'dream_writer', cls: 'bg-purple-300 bg-opacity-50' },
        { label: '먼저 이야기를 구상한다', to: 'plan_story', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 글 쓰는 사람이 되고 싶어?'
    },
    {
      id: 'plan_story',
      title: '이야기 구상',
      text: `너는 이야기를 구상하기 시작해.

"물과 불 같은 두 집안,
경계에 선 사람들...

만약 이들이 서로를 이해하게 된다면?
증오를 넘어서는 무언가..."

흥미진진한 이야기가
머릿속에 그려져.`,
      bg: 'https://images.unsplash.com/photo-1762920738995-f393efe82205',
      choices: [
        { label: '사랑 이야기로 만든다', to: 'love_story', cls: 'bg-pink-300 bg-opacity-50' },
        { label: '교훈 이야기로 만든다', to: 'lesson_story', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 어떤 이야기를 만들고 싶어?'
    },
    {
      id: 'talk_benvolio',
      title: '평화주의자 벤볼리오',
      text: `벤볼리오는 차분하게 말해.

"난 싸움이 싫어.
왜 서로 미워해야 하는지 모르겠어.

친구들이 행복했으면 좋겠어.

두 집안이 화해할 수 있다면..."

그의 눈에는 진심이 담겨 있어.`,
      bg: 'https://images.unsplash.com/photo-1719773906940-5b0cf605b1cb',
      choices: [
        { label: '벤볼리오의 평화를 응원한다', to: 'support_peace', cls: 'bg-green-300 bg-opacity-50' },
        { label: '다른 친구들도 만나본다', to: 'talk_tybalt', cls: 'bg-red-300 bg-opacity-50' }
      ],
      prompt: '💭 평화를 원하는 마음이 전해져.'
    },
    {
      id: 'talk_tybalt',
      title: '자존심 강한 티볼트',
      text: `티볼트는 단호하게 말해.

"캐풀릿의 명예는 절대적이야.
몬터규는 우리의 적이지.

화해? 말도 안 돼!
우리가 옳고 그들이 틀렸어."

그의 목소리는 확신에 차 있어.
하지만 눈 속에는 불안함도 보여.`,
      bg: 'https://images.unsplash.com/photo-1648397618997-0a2b24c5eaf3',
      choices: [
        { label: '티볼트를 이해하려 한다', to: 'understand_tybalt', cls: 'bg-orange-300 bg-opacity-50' },
        { label: '다른 방법을 생각한다', to: 'think_another_way', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 자존심 뒤에 숨은 마음은 뭘까?'
    },
    {
      id: 'record_observations',
      title: '관찰 기록',
      text: `너는 지금까지의 모든 것을
수첩에 기록해.

두 집안의 갈등,
사람들의 성격,
특별한 사람들,
친구들의 우정...

"이 모든 게 하나의 이야기가 될까?"

너의 가슴이 두근거려.`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '언젠가 글을 쓰고 싶다', to: 'dream_writer', cls: 'bg-purple-300 bg-opacity-50' },
        { label: '이야기의 결말을 고민한다', to: 'think_ending', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 이 이야기를 세상에 전하고 싶어?'
    },
    {
      id: 'imagine_future',
      title: '미래 상상',
      text: `너는 이 사람들의 미래를 상상해.

"언젠가 무슨 일이 벌어질까?"

사랑을 찾을까?
용기를 낼까?
평화가 올까?

좋은 일이든,
슬픈 일이든,

뭔가 특별한 일이
일어날 것만 같아.`,
      bg: 'https://images.unsplash.com/photo-1701351717123-11c1d97dd339',
      choices: [
        { label: '행복한 미래를 바란다', to: 'wish_happy', cls: 'bg-pink-300 bg-opacity-50' },
        { label: '현실은 알 수 없다고 생각한다', to: 'uncertain_future', cls: 'bg-gray-300 bg-opacity-50' }
      ],
      prompt: '💭 어떤 미래가 펼쳐질까?'
    },
    {
      id: 'believe_in_love',
      title: '사랑의 힘',
      text: `너는 사랑의 힘을 믿어.

"진짜 사랑은
모든 장벽을 넘을 수 있어.

가족의 반대도,
사회의 편견도,
넘어설 수 있을 거야.

사랑은 강한 힘이야."`,
      bg: 'https://images.unsplash.com/photo-1759513332107-cbc80cdbf6ac',
      choices: [
        { label: '사랑 이야기를 구상한다', to: 'love_story', cls: 'bg-pink-300 bg-opacity-50' },
        { label: '관찰을 계속한다', to: 'observe_more', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 사랑이 모든 것을 이길 수 있다고 믿어?'
    },
    {
      id: 'warn_about_love',
      title: '사랑의 위험',
      text: `너는 조심스럽게 말해.

"사랑은 강력하지만,
때로는 위험할 수도 있어.

너무 맹목적으로 사랑하면
이성을 잃을 수 있고,

주변 사람들을 다치게 할 수도 있어.

사랑할 때도
지혜가 필요해."`,
      bg: 'https://images.unsplash.com/photo-1645694564299-eb5d7900d0e3',
      choices: [
        { label: '균형 잡힌 사랑을 생각한다', to: 'balanced_love', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '그래도 사랑은 아름답다고 믿는다', to: 'believe_in_love', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 사랑할 때도 지혜가 필요할까?'
    },
    {
      id: 'believe_in_choice',
      title: '선택의 힘',
      text: `너는 선택의 힘을 믿어.

"우리가 내리는 선택이
우리의 운명을 만들어.

용감하게 선택하면,
새로운 길이 열리고,

비겁하게 도망치면,
후회만 남을 거야.

선택하는 용기가 중요해."`,
      bg: 'https://images.unsplash.com/photo-1762920738995-f393efe82205',
      choices: [
        { label: '용기 있는 이야기를 구상한다', to: 'plan_story', cls: 'bg-green-300 bg-opacity-50' },
        { label: '관찰을 계속한다', to: 'observe_more', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 선택이 운명을 만든다고 믿어?'
    },
    {
      id: 'warn_about_choice',
      title: '선택의 책임',
      text: `너는 조심스럽게 말해.

"선택은 자유지만,
책임도 따라와.

용감한 선택이
항상 좋은 결과를 가져오는 건 아니야.

하지만 그래도
선택하지 않는 것보다는 나아.

선택하고, 책임지는 거야."`,
      bg: 'https://images.unsplash.com/photo-1645694564299-eb5d7900d0e3',
      choices: [
        { label: '책임감 있는 이야기를 생각한다', to: 'plan_story', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '그래도 선택의 용기를 믿는다', to: 'believe_in_choice', cls: 'bg-green-300 bg-opacity-50' }
      ],
      prompt: '💭 선택에는 책임이 따를까?'
    },
    {
      id: 'dream_bigger',
      title: '더 큰 꿈',
      text: `너는 더 큰 변화를 꿈꿔.

"언젠가 이 두 집안이
진짜로 화해하는 날이 올까?

물과 불이 함께
아름다운 무지개를 만드는 날이?"

작은 심부름꾼의 큰 꿈.
하지만 불가능하지 않아.`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '꿈을 이루기 위해 계속 노력한다', to: 'work_for_dream', cls: 'bg-green-300 bg-opacity-50' },
        { label: '이야기로 희망을 전한다', to: 'spread_hope', cls: 'bg-purple-300 bg-opacity-50' }
      ],
      prompt: '💭 큰 꿈을 품는 게 중요해!'
    },
    {
      id: 'wait_for_chance',
      title: '기회를 기다리며',
      text: `너는 기회를 기다려.

며칠 후, 소식이 들려와.

"캐풀릿 가문에서
큰 가면 무도회를 연대!"

가면을 쓰면 누군지 모르니까,
여러 사람이 참석할 수 있을 거야.

"이거야!"
너는 무릎을 친다.`,
      bg: 'https://images.unsplash.com/photo-1533577116850-9af5e8b33415',
      choices: [
        { label: '무도회 준비를 돕는다', to: 'help_ball', cls: 'bg-pink-300 bg-opacity-50' },
        { label: '초대장을 배달한다', to: 'deliver_invitation', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 가면 무도회가 기회가 될까?'
    },
    {
      id: 'keep_hoping',
      title: '희망의 씨앗',
      text: `너는 희망을 잃지 않아.

매일 작은 친절을 베풀고,
작은 평화를 만들고,
작은 변화를 일으켜.

"언젠가는 통할 거야."

그 믿음이 너를 지탱해 줘.
희망은 마지막까지 남는 거야.`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '계속 희망을 전한다', to: 'spread_hope', cls: 'bg-green-300 bg-opacity-50' },
        { label: '큰 기회를 기다린다', to: 'wait_for_chance', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 희망을 잃지 않는 게 중요해!'
    },
    {
      id: 'dream_writer',
      title: '글 쓰는 꿈',
      text: `너는 꿈을 꿔.

"언젠가 이 이야기를
글로 쓰는 거야.

사람들이 읽고 느끼고,
마음이 변하는 거야.

나는 글을 쓰는 사람이 될 거야."

작은 심부름꾼의 큰 꿈.
불가능해 보이지 않아.`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '지금부터 준비를 시작한다', to: 'start_preparing', cls: 'bg-purple-300 bg-opacity-50' },
        { label: '먼저 이야기를 구한다', to: 'plan_story', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 꿈을 향해 나아가고 있어!'
    },
    {
      id: 'love_story',
      title: '사랑 이야기',
      text: `너는 사랑 이야기로 만들기로 해.

"증오를 이기는 사랑의 힘!"

서로 다른 두 사람의 사랑이
두 집안을 변화시키는
아름다운 이야기.

사람들이 사랑의 힘을
믿게 될까?`,
      bg: 'https://images.unsplash.com/photo-1759513332107-cbc80cdbf6ac',
      choices: [
        { label: '희망적으로 끝낸다', to: 'hopeful_ending', cls: 'bg-pink-300 bg-opacity-50' },
        { label: '현실적으로 끝낸다', to: 'realistic_ending', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 사랑 이야기는 어떻게 끝나야 할까?'
    },
    {
      id: 'lesson_story',
      title: '교훈 이야기',
      text: `너는 교훈 이야기로 만들기로 해.

"증오의 대가를 보여주는 이야기!"

사람들이 미움의 결과를 보고,
평화의 중요성을 깨닫게 하는
강렬한 이야기.

비극이지만 의미 있어.`,
      bg: 'https://images.unsplash.com/photo-1645694564299-eb5d7900d0e3',
      choices: [
        { label: '강렬한 비극으로 끝낸다', to: 'powerful_tragedy', cls: 'bg-gray-300 bg-opacity-50' },
        { label: '희망을 남긴다', to: 'leave_hope', cls: 'bg-green-300 bg-opacity-50' }
      ],
      prompt: '💭 교훈은 어떻게 전달해야 할까?'
    },
    {
      id: 'support_peace',
      title: '평화의 동지',
      text: `너는 벤볼리오와 함께
평화를 위해 노력하기로 해.

"우리가 할 수 있는 작은 일들을
하나씩 해나가자."

두 사람의 작은 노력이
큰 변화의 시작이 될 거야.`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '평화 활동을 계속한다', to: 'peace_activities', cls: 'bg-green-300 bg-opacity-50' },
        { label: '기회를 기다린다', to: 'wait_for_chance', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 평화를 위한 동지가 생겼어!'
    },
    {
      id: 'understand_tybalt',
      title: '티볼트 이해하기',
      text: `너는 티볼트를 이해하려 해.

자존심 강한 모습 뒤에는
가족을 지키려는 마음,
약해 보이기 싫은 마음,
사랑받고 싶은 마음이 숨어있어.

"티볼트도 사실은 무서운 거구나."

이해하니까 조금 다르게 보여.`,
      bg: 'https://images.unsplash.com/photo-1648397618997-0a2b24c5eaf3',
      choices: [
        { label: '티볼트의 이야기를 기록한다', to: 'record_observations', cls: 'bg-red-300 bg-opacity-50' },
        { label: '모든 인물을 이해하려 한다', to: 'understand_all', cls: 'bg-purple-300 bg-opacity-50' }
      ],
      prompt: '💭 미움 뒤에 숨은 두려움을 봐.'
    },
    {
      id: 'think_another_way',
      title: '다른 접근',
      text: `티볼트 같은 사람은
말로는 안 통해.

"행동으로 보여줘야 해."

가면 무도회 같은 곳에서
자연스럽게 만나면
생각이 바뀔 수도 있어.

기회를 기다려야겠어.`,
      bg: 'https://images.unsplash.com/photo-1762920738995-f393efe82205',
      choices: [
        { label: '자연스러운 기회를 기다린다', to: 'wait_for_chance', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '작은 노력부터 한다', to: 'keep_trying', cls: 'bg-orange-300 bg-opacity-50' }
      ],
      prompt: '💭 때로는 기다림도 전략이야.'
    },
    {
      id: 'think_ending',
      title: '결말 고민',
      text: `너는 결말을 고민해.

"행복하게 끝나야 할까?
아니면 슬프게 끝나야 할까?

희극으로 웃음을 줄까?
비극으로 교훈을 줄까?

어떤 결말이
사람들의 마음을 움직일까?"

중요한 선택이야.`,
      bg: 'https://images.unsplash.com/photo-1762920738995-f393efe82205',
      choices: [
        { label: '행복한 희극을 선택한다', to: 'choose_comedy', cls: 'bg-yellow-300 bg-opacity-50' },
        { label: '의미 있는 비극을 선택한다', to: 'choose_tragedy', cls: 'bg-gray-300 bg-opacity-50' }
      ],
      prompt: '💭 어떤 결말이 더 강력할까?'
    },
    {
      id: 'want_happy_ending',
      title: '행복한 결말',
      text: `너는 행복한 결말을 원해.

"사람들에게 희망을 주고 싶어."

서로 다른 사람들이 만나고,
두 집안이 화해하고,
모두가 행복해지는...

그런 아름다운 이야기.`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '희망적인 이야기를 계획한다', to: 'plan_hopeful', cls: 'bg-yellow-300 bg-opacity-50' },
        { label: '하지만 현실도 고려한다', to: 'consider_reality', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 행복한 결말을 만들 수 있을까?'
    },
    {
      id: 'choose_tragedy',
      title: '비극 선택',
      text: `너는 비극을 선택해.

"슬픈 결말이
더 강한 교훈을 줄 거야."

노력했지만 실패하고,
그래서 남는 사람들에게
큰 깨달음을 주는...

그런 강렬한 비극.`,
      bg: 'https://images.unsplash.com/photo-1645694564299-eb5d7900d0e3',
      choices: [
        { label: '교훈적인 비극을 계획한다', to: 'plan_lesson_tragedy', cls: 'bg-gray-300 bg-opacity-50' },
        { label: '희망의 여지를 남긴다', to: 'leave_hope_room', cls: 'bg-green-300 bg-opacity-50' }
      ],
      prompt: '💭 비극이 더 큰 변화를 일으킬까?'
    },
    {
      id: 'wish_happy',
      title: '행복을 바라며',
      text: `너는 진심으로 바라.

"모두가 행복했으면 좋겠어."

순수한 청년도,
당찬 소녀도,
평화를 원하는 사람들도.

"언젠가 좋은 일이 있을 거야."`,
      bg: 'https://images.unsplash.com/photo-1701351717123-11c1d97dd339',
      choices: [
        { label: '행복을 기원한다', to: 'pray_happiness', cls: 'bg-pink-300 bg-opacity-50' },
        { label: '관찰을 계속한다', to: 'observe_more', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 모두가 행복했으면 좋겠어.'
    },
    {
      id: 'uncertain_future',
      title: '불확실한 미래',
      text: `너는 현실적으로 생각해.

"무슨 일이 일어날지 모르지."

좋은 일일 수도,
슬픈 일일 수도 있어.

하지만 그게 인생이야.
알 수 없기에 더 흥미로워.

"무슨 일이 벌어질까..."`,
      bg: 'https://images.unsplash.com/photo-1645694564299-eb5d7900d0e3',
      choices: [
        { label: '그래도 희망을 품는다', to: 'keep_hoping', cls: 'bg-green-300 bg-opacity-50' },
        { label: '관찰을 계속한다', to: 'observe_more', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 미래는 알 수 없어.'
    },
    {
      id: 'balanced_love',
      title: '균형 잡힌 사랑',
      text: `너는 생각해.

"사랑할 때도 이성이 필요해.
열정적이되 맹목적이지 않게,
헌신하되 자신을 잃지 않게."

균형 잡힌 사랑이
진짜 사랑일 거야.

하지만 그게 쉬울까?`,
      bg: 'https://images.unsplash.com/photo-1762920738995-f393efe82205',
      choices: [
        { label: '균형의 이야기를 구상한다', to: 'plan_story', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '순수한 열정도 가치 있다고 생각한다', to: 'believe_in_love', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 사랑의 균형을 찾을 수 있을까?'
    },
    {
      id: 'work_for_dream',
      title: '꿈을 위해',
      text: `너는 꿈을 위해 계속 일해.

심부름을 하면서도
사람들을 관찰하고,
이야기를 기록하고,
글쓰기를 공부하고.

"언젠가 이 꿈을 이룰 거야."

노력하는 사람의 꿈은
이루어지는 법이야.`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '계속 준비한다', to: 'keep_preparing', cls: 'bg-green-300 bg-opacity-50' },
        { label: '기회를 찾는다', to: 'wait_for_chance', cls: 'bg-orange-300 bg-opacity-50' }
      ],
      prompt: '💭 꿈을 향해 나아가고 있어!'
    },
    {
      id: 'spread_hope',
      title: '희망 전하기',
      text: `너는 희망을 전해.

"평화는 가능해요."
"다름을 이해할 수 있어요."
"우리가 바꿀 수 있어요."

작은 목소리지만,
진심이 담겨 있어.

그 진심이 사람들에게 닿기 시작해.`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '계속 희망을 전한다', to: 'continue_spreading', cls: 'bg-green-300 bg-opacity-50' },
        { label: '이야기로 희망을 담는다', to: 'hope_in_story', cls: 'bg-purple-300 bg-opacity-50' }
      ],
      prompt: '💭 희망은 전염되는 거야!'
    },
    {
      id: 'help_ball',
      title: '무도회 준비',
      text: `너는 캐풀릿 가문의
무도회 준비를 돕기 시작해.

초대장을 배달하고,
장식을 나르고,
손님 명단을 확인하고...

"이 무도회에서
뭔가 특별한 일이 일어날 것 같아."

가슴이 두근거려.`,
      bg: 'https://images.unsplash.com/photo-1533577116850-9af5e8b33415',
      choices: [
        { label: '초대장을 배달한다', to: 'deliver_invitation', cls: 'bg-yellow-300 bg-opacity-50' },
        { label: '무도회를 상상한다', to: 'imagine_ball', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 무도회에서 무슨 일이 벌어질까?'
    },
    {
      id: 'deliver_invitation',
      title: '초대장 배달',
      text: `너는 가면 무도회 초대장을
여기저기 배달해.

캐풀릿 가문 사람들에게,
그리고 다른 귀족들에게.

가면을 쓰면 누군지 모르니까,
예상치 못한 만남이 있을 수도 있어.

뭔가 특별한 일이 일어날 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9',
      choices: [
        { label: '무도회 날을 기대한다', to: 'ending', cls: 'bg-pink-300 bg-opacity-50' },
        { label: '이 순간을 기록한다', to: 'record_moment', cls: 'bg-purple-300 bg-opacity-50' }
      ],
      prompt: '💭 무슨 일이 일어날까?'
    },
    {
      id: 'start_preparing',
      title: '준비 시작',
      text: `너는 글 쓰는 사람이 되기 위한
준비를 시작해.

매일 글을 쓰고,
사람들을 관찰하고,
이야기를 구상하고,
공부해.

"준비된 사람에게
기회가 오는 법이야."`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '매일 연습한다', to: 'practice_daily', cls: 'bg-purple-300 bg-opacity-50' },
        { label: '이야기를 완성한다', to: 'plan_story', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 준비하는 과정도 소중해!'
    },
    {
      id: 'choose_comedy',
      title: '희극 선택',
      text: `너는 희극을 선택해.

"사람들에게 희망을 주고 싶어.
웃음과 행복으로 끝나는 이야기."

서로 다른 사람들이 만나고,
친구들이 도와주고,
결국 화해하는...

아름다운 희극.`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '희망적인 희극을 완성한다', to: 'complete_comedy', cls: 'bg-yellow-300 bg-opacity-50' },
        { label: '현실적 요소도 넣는다', to: 'add_reality', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 희극이 세상을 밝게 할 수 있을까?'
    },
    {
      id: 'peace_activities',
      title: '평화 활동',
      text: `너와 벤볼리오는
평화를 위한 활동을 계속해.

양쪽 사람들에게 친절하게 대하고,
서로의 좋은 점을 이야기하고,
작은 연결고리를 만들어가.

"조금씩, 조금씩
변화가 일어나고 있어."`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '더 많은 사람을 모은다', to: 'gather_people', cls: 'bg-green-300 bg-opacity-50' },
        { label: '무도회를 기회로 삼는다', to: 'wait_for_chance', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 평화를 위한 움직임이 커지고 있어!'
    },
    {
      id: 'understand_all',
      title: '모두를 이해하기',
      text: `너는 모든 인물을 이해하게 돼.

청년의 순수함,
소녀의 용기,
벤볼리오의 평화,
티볼트의 두려움,
머큐쇼의 우정...

"모두가 자기 이유가 있어.
모두가 사랑받을 자격이 있어."`,
      bg: 'https://images.unsplash.com/photo-1719773906940-5b0cf605b1cb',
      choices: [
        { label: '이해를 바탕으로 이야기를 쓴다', to: 'write_with_understanding', cls: 'bg-green-300 bg-opacity-50' },
        { label: '모든 인물을 기록한다', to: 'record_all', cls: 'bg-purple-300 bg-opacity-50' }
      ],
      prompt: '💭 이해가 이야기를 풍부하게 해!'
    },
    {
      id: 'record_all',
      title: '모든 인물 기록',
      text: `너는 모든 인물을 기록해.

청년, 소녀,
벤볼리오, 티볼트, 머큐쇼,
파리스, 유모, 신부님...

각자의 성격, 역할, 의미.

"이 모든 인물이 모여서
하나의 완벽한 이야기를 만드는 거야."`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '이야기를 완성한다', to: 'complete_full_story', cls: 'bg-purple-300 bg-opacity-50' },
        { label: '무도회에 대해 생각한다', to: 'wait_for_chance', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 모든 조각이 모이고 있어!'
    },
    {
      id: 'imagine_ball',
      title: '무도회 상상',
      text: `너는 무도회를 상상해봐.

가면을 쓴 사람들이 춤을 추고,
누가 누군지 모르는 상태에서
자연스럽게 이야기를 나누고...

"어떤 일이 벌어질까?"

예상치 못한 만남,
특별한 순간들...

상상만으로도 가슴이 뛰어.`,
      bg: 'https://images.unsplash.com/photo-1533577116850-9af5e8b33415',
      choices: [
        { label: '무도회를 기대하며 끝낸다', to: 'ending', cls: 'bg-pink-300 bg-opacity-50' },
        { label: '이야기로 기록한다', to: 'record_moment', cls: 'bg-purple-300 bg-opacity-50' }
      ],
      prompt: '💭 무슨 일이 일어날지 기대돼!'
    },
    {
      id: 'record_moment',
      title: '순간 기록',
      text: `너는 이 순간을 기록해.

"오늘, 가면 무도회 준비를 도왔다.

곧 많은 사람들이 모일 것이다.
가면 뒤에 숨겨진 진심들,
예상치 못한 만남들...

무슨 일이 벌어질지
아무도 모른다."

너는 수첩을 덮어.`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '이야기를 계속 쓰고 싶다', to: 'promise_to_write', cls: 'bg-purple-300 bg-opacity-50' },
        { label: '무도회를 기대하며 끝낸다', to: 'ending', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 무슨 일이 벌어질까?'
    },
    {
      id: 'promise_to_write',
      title: '글 쓰는 약속',
      text: `너는 다짐해.

"언젠가 이 이야기를
글로 쓸 거야.

이 도시의 이야기,
사람들의 감정,
갈등과 화해를..."

작은 심부름꾼의 큰 약속.

무슨 일이 벌어질지는 모르지만,
그것도 이야기의 일부가 될 거야.`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '미래를 기대한다', to: 'ending', cls: 'bg-purple-300 bg-opacity-50' }
      ],
      prompt: '💭 약속을 지킬 수 있을까?'
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `오늘 밤, 캐풀릿 가문에서 가면 무도회가 열려.

이 베로나에서 뭔가
특별한 일이 시작될 것만 같아.

《엘리멘탈》의 물과 불 같은 원수 집안
💕 첫눈에 사랑에 빠지는 금사빠 로미오!
💕 완성형 미모에 똑쟁이 귀족 영애 줄리엣!
⏰ 단 며칠 만에 벌어지는 운명적 사건들!
📚 《로미오와 줄리엣》을 읽으면 알 수 있어.

`,
      bg: 'https://images.unsplash.com/photo-1533577116850-9af5e8b33415',
      choices: [
        { label: '🔄 다시 시작하기', to: 'start', cls: 'bg-purple-300 bg-opacity-50' }
      ],
      prompt: '🎭 400년 넘게 연극과 소설로 전 세계가 사랑한 대문호 윌리엄 셰익스피어의 《로미오와 줄리엣》원작 스토리가 궁금하지 않아?'
    },
    {
      id: 'gather_people',
      title: '사람들 모으기',
      text: `너는 평화를 원하는
사람들을 모으기 시작해.

벤볼리오, 로렌스 신부,
그리고 조용히 평화를 바라는
다른 사람들...

"우리가 함께하면
뭔가 바꿀 수 있어."

작은 그룹이 만들어져.`,
      bg: 'https://images.unsplash.com/photo-1719773906940-5b0cf605b1cb',
      choices: [
        { label: '평화 계획을 세운다', to: 'peace_activities', cls: 'bg-green-300 bg-opacity-50' },
        { label: '무도회를 활용한다', to: 'wait_for_chance', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 함께하면 더 강해져!'
    },
    {
      id: 'hopeful_ending',
      title: '희망의 이야기',
      text: `너는 희망적인 결말을 생각해.

"서로를 이해하고,
함께 웃으며,
평화롭게 끝나는 이야기."

현실적이지 않을 수도 있지만,
사람들에게 꿈을 주는 거야.

희망이 있어야
세상이 변할 수 있어.`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '희망을 전한다', to: 'spread_hope', cls: 'bg-green-300 bg-opacity-50' },
        { label: '무도회를 기대한다', to: 'wait_for_chance', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 희망이 있어야 변화가 와!'
    },
    {
      id: 'realistic_ending',
      title: '현실적 이야기',
      text: `너는 현실적으로 생각해.

"사랑만으로 모든 게 해결되진 않아.
현실의 벽은 높고,
변화는 쉽지 않아."

하지만 그래도,
시도하는 것 자체가
의미 있는 거야.`,
      bg: 'https://images.unsplash.com/photo-1762920738995-f393efe82205',
      choices: [
        { label: '균형 잡힌 이야기를 만든다', to: 'balanced_story', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '결말을 고민한다', to: 'think_ending', cls: 'bg-gray-300 bg-opacity-50' }
      ],
      prompt: '💭 현실과 희망의 균형!'
    },
    {
      id: 'powerful_tragedy',
      title: '강렬한 비극',
      text: `너는 비극의 힘을 믿어.

"슬픈 이야기가
사람들의 마음을 깊이 움직여.

행복한 이야기는 잊혀지지만,
비극은 오래 기억돼.

그래서 세상을 바꿀 수 있어."`,
      bg: 'https://images.unsplash.com/photo-1645694564299-eb5d7900d0e3',
      choices: [
        { label: '비극을 계획한다', to: 'plan_tragedy', cls: 'bg-gray-300 bg-opacity-50' },
        { label: '희망의 여지를 남긴다', to: 'leave_hope', cls: 'bg-green-300 bg-opacity-50' }
      ],
      prompt: '💭 비극이 더 강한 메시지를 줄까?'
    },
    {
      id: 'leave_hope',
      title: '희망 남기기',
      text: `너는 생각해.

"비극이라도
희망을 남겨야 해.

절망만 주면
사람들은 변하지 않아.

슬프지만,
그 속에서 교훈과 희망을 찾게 하는 거야."`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '희망을 담는다', to: 'hope_in_story', cls: 'bg-green-300 bg-opacity-50' },
        { label: '무도회를 기대한다', to: 'wait_for_chance', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 희망은 항상 필요해!'
    },
    {
      id: 'pray_happiness',
      title: '행복 기원',
      text: `너는 진심으로 기원해.

"모두가 행복하길.
평화롭길.
사랑받길."

작은 심부름꾼의
큰 바람.

그 바람이 이루어질까?`,
      bg: 'https://images.unsplash.com/photo-1701351717123-11c1d97dd339',
      choices: [
        { label: '희망을 품는다', to: 'keep_hoping', cls: 'bg-pink-300 bg-opacity-50' },
        { label: '무도회를 기대한다', to: 'wait_for_chance', cls: 'bg-yellow-300 bg-opacity-50' }
      ],
      prompt: '💭 좋은 일이 있기를!'
    },
    {
      id: 'keep_preparing',
      title: '준비 계속',
      text: `너는 매일 준비해.

글을 쓰고,
관찰하고,
배우고,
성장해.

"기회가 왔을 때
준비되어 있어야 해."

노력하는 모습이 아름다워.`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '계속 노력한다', to: 'work_for_dream', cls: 'bg-purple-300 bg-opacity-50' },
        { label: '기회를 기다린다', to: 'wait_for_chance', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 준비하는 시간도 소중해!'
    },
    {
      id: 'practice_daily',
      title: '매일 연습',
      text: `너는 매일 글을 써.

사람들의 이야기,
감정의 변화,
갈등과 화해...

모두 기록하고 표현해.

"매일 조금씩
나아지고 있어."`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '계속 연습한다', to: 'keep_preparing', cls: 'bg-purple-300 bg-opacity-50' },
        { label: '기회를 찾는다', to: 'wait_for_chance', cls: 'bg-orange-300 bg-opacity-50' }
      ],
      prompt: '💭 매일의 노력이 쌓여가!'
    },
    {
      id: 'continue_spreading',
      title: '희망 계속 전하기',
      text: `너는 계속 희망을 전해.

매일, 조금씩,
사람들에게 말하고,
행동으로 보여주고.

"변화는 천천히 오는 거야."

포기하지 않는 마음.`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '계속 노력한다', to: 'peace_activities', cls: 'bg-green-300 bg-opacity-50' },
        { label: '무도회를 기대한다', to: 'wait_for_chance', cls: 'bg-blue-300 bg-opacity-50' }
      ],
      prompt: '💭 작은 희망이 모여 큰 변화가 돼!'
    },
    {
      id: 'hope_in_story',
      title: '이야기 속 희망',
      text: `너는 이야기에 희망을 담기로 해.

"슬프더라도,
어렵더라도,
희망은 있어야 해.

그래야 사람들이
포기하지 않고
계속 노력하니까."`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '희망의 이야기를 쓴다', to: 'write_hope', cls: 'bg-green-300 bg-opacity-50' },
        { label: '무도회를 기대한다', to: 'wait_for_chance', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 희망이 담긴 이야기!'
    },
    {
      id: 'write_with_understanding',
      title: '이해를 담은 글',
      text: `너는 모두를 이해하며 글을 써.

각자의 입장,
각자의 고민,
각자의 이유...

모두를 이해하고 존중하는
깊이 있는 이야기.

"이게 진짜 이야기야."`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '이야기를 완성한다', to: 'complete_full_story', cls: 'bg-purple-300 bg-opacity-50' },
        { label: '무도회를 기대한다', to: 'wait_for_chance', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 깊이 있는 이야기가 탄생하고 있어!'
    },
    {
      id: 'complete_full_story',
      title: '완성된 이야기',
      text: `너는 이야기를 완성해.

모든 인물,
모든 갈등,
모든 희망을 담았어.

"언젠가 이 이야기가
사람들에게 전해지길."

작은 심부름꾼의
큰 작품.`,
      bg: 'https://images.unsplash.com/photo-1762920738995-f393efe82205',
      choices: [
        { label: '미래를 기대한다', to: 'ending', cls: 'bg-purple-300 bg-opacity-50' }
      ],
      prompt: '💭 이야기가 완성되었어!'
    },
    {
      id: 'complete_comedy',
      title: '희극 완성',
      text: `너는 희극을 완성해.

웃음과 행복,
화해와 평화로
끝나는 이야기.

"사람들이 웃으며
희망을 가질 거야."

밝은 이야기의 완성.`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '희망을 전한다', to: 'spread_hope', cls: 'bg-yellow-300 bg-opacity-50' },
        { label: '무도회를 기대한다', to: 'wait_for_chance', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 밝은 이야기가 완성되었어!'
    },
    {
      id: 'add_reality',
      title: '현실 추가',
      text: `너는 희극에 현실을 더해.

"너무 완벽하면 믿기지 않아.
조금의 어려움,
조금의 현실감..."

희극이지만
진실된 이야기.`,
      bg: 'https://images.unsplash.com/photo-1762920738995-f393efe82205',
      choices: [
        { label: '균형 잡힌 이야기를 완성한다', to: 'balanced_story', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '무도회를 기대한다', to: 'wait_for_chance', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 현실감 있는 희극!'
    },
    {
      id: 'balanced_story',
      title: '균형 잡힌 이야기',
      text: `너는 균형 잡힌 이야기를 만들어.

희망과 현실,
행복과 슬픔,
웃음과 눈물...

모든 것이 균형을 이루는
깊이 있는 이야기.

"이게 인생이야."`,
      bg: 'https://images.unsplash.com/photo-1762920738995-f393efe82205',
      choices: [
        { label: '이야기를 완성한다', to: 'complete_full_story', cls: 'bg-purple-300 bg-opacity-50' },
        { label: '무도회를 기대한다', to: 'wait_for_chance', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 균형 잡힌 이야기가 최고야!'
    },
    {
      id: 'plan_hopeful',
      title: '희망적 계획',
      text: `너는 희망적인 이야기를 계획해.

"사람들에게 꿈을 주는 이야기.
포기하지 말라는 메시지."

어렵더라도,
희망을 잃지 않으면
길이 열린다는 이야기.`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '희망의 이야기를 쓴다', to: 'write_hope', cls: 'bg-green-300 bg-opacity-50' },
        { label: '무도회를 기대한다', to: 'wait_for_chance', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 희망이 가득한 이야기!'
    },
    {
      id: 'consider_reality',
      title: '현실 고려',
      text: `너는 현실도 고려해.

"행복한 결말이 좋지만,
너무 비현실적이면 안 돼.

사람들이 믿을 수 있어야 해."

희망과 현실의 균형이 필요해.`,
      bg: 'https://images.unsplash.com/photo-1762920738995-f393efe82205',
      choices: [
        { label: '균형을 맞춘다', to: 'balanced_story', cls: 'bg-blue-300 bg-opacity-50' },
        { label: '그래도 희망을 선택한다', to: 'plan_hopeful', cls: 'bg-green-300 bg-opacity-50' }
      ],
      prompt: '💭 현실과 희망의 균형!'
    },
    {
      id: 'plan_lesson_tragedy',
      title: '교훈적 비극',
      text: `너는 교훈적인 비극을 계획해.

"슬프지만,
사람들에게 큰 깨달음을 줘.

증오의 대가,
평화의 중요성..."

강렬한 메시지의 비극.`,
      bg: 'https://images.unsplash.com/photo-1645694564299-eb5d7900d0e3',
      choices: [
        { label: '비극을 완성한다', to: 'plan_tragedy', cls: 'bg-gray-300 bg-opacity-50' },
        { label: '희망을 남긴다', to: 'leave_hope', cls: 'bg-green-300 bg-opacity-50' }
      ],
      prompt: '💭 교훈이 강한 비극!'
    },
    {
      id: 'leave_hope_room',
      title: '희망의 여지',
      text: `너는 비극에도 희망을 남겨.

"슬픈 결말이지만,
남은 사람들이 변화하고,
평화를 이루려는 노력...

그것이 희망이야."`,
      bg: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      choices: [
        { label: '희망을 담은 비극을 쓴다', to: 'write_hopeful_tragedy', cls: 'bg-green-300 bg-opacity-50' },
        { label: '무도회를 기대한다', to: 'wait_for_chance', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 비극 속의 희망!'
    },
    {
      id: 'plan_tragedy',
      title: '비극 계획',
      text: `너는 비극을 계획해.

"강렬하고,
슬프고,
하지만 의미 있는 이야기."

사람들의 마음을 깊이 울리는
그런 비극.`,
      bg: 'https://images.unsplash.com/photo-1645694564299-eb5d7900d0e3',
      choices: [
        { label: '비극을 완성한다', to: 'complete_tragedy', cls: 'bg-gray-300 bg-opacity-50' },
        { label: '무도회를 기대한다', to: 'wait_for_chance', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 강렬한 비극!'
    },
    {
      id: 'write_hope',
      title: '희망 쓰기',
      text: `너는 희망을 써 내려가.

어둠 속에서도
빛을 찾는 사람들,

어려움 속에서도
포기하지 않는 마음...

희망의 이야기가 완성되어 가.`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '이야기를 완성한다', to: 'complete_full_story', cls: 'bg-green-300 bg-opacity-50' },
        { label: '무도회를 기대한다', to: 'wait_for_chance', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 희망의 이야기가 완성되어 가!'
    },
    {
      id: 'write_hopeful_tragedy',
      title: '희망 있는 비극',
      text: `너는 희망이 담긴 비극을 써.

슬픈 결말이지만,
그 속에서 배우고,
그 속에서 성장하고,
그 속에서 희망을 찾는...

그런 깊이 있는 이야기.`,
      bg: 'https://images.unsplash.com/photo-1762878251475-7b49b460b4a1',
      choices: [
        { label: '이야기를 완성한다', to: 'complete_full_story', cls: 'bg-purple-300 bg-opacity-50' },
        { label: '무도회를 기대한다', to: 'wait_for_chance', cls: 'bg-pink-300 bg-opacity-50' }
      ],
      prompt: '💭 의미 깊은 이야기가 탄생하고 있어!'
    },
    {
      id: 'complete_tragedy',
      title: '비극 완성',
      text: `너는 비극을 완성해.

슬프고 강렬한 이야기.
사람들의 마음을 울리고,
생각하게 만드는 이야기.

"이 이야기가
세상을 바꾸길."`,
      bg: 'https://images.unsplash.com/photo-1645694564299-eb5d7900d0e3',
      choices: [
        { label: '미래를 기대한다', to: 'ending', cls: 'bg-gray-300 bg-opacity-50' }
      ],
      prompt: '💭 강렬한 이야기가 완성되었어!'
    }
  ];
}

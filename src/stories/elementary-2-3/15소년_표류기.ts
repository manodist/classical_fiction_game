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

export function generateFifteenBoysStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '뉴질랜드 기숙학교',
      text: `너의 이름은 ${name.full}.

1860년대 뉴질랜드 기숙학교에 다니고 있어.
지금으로부터 약 160년 전이야.

학교에는 너를 포함해서 15명의 친구들이 있어.
브리앙, 도니펀, 고든, 자크...
모두 8세부터 14세까지 다양해.

여름 방학이 일주일 앞으로 다가왔어!`,
      bg: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구들과 운동장에서 논다', to: 'playground', cls: 'bg-yellow-300' },
        { label: '도서관에서 책을 읽는다', to: 'library', cls: 'bg-blue-300' }
      ],
      prompt: '💭 방학이 다가오면 설레?'
    },
    {
      id: 'playground',
      title: '운동장에서',
      text: `너는 친구들과 운동장으로 뛰어나가.

브리앙이 손을 흔들어. "술래잡기 하자!"
도니펀이 웃으며 말해. "좋아, 내가 술래!"

고든, 크로스, 서비스, 월콕...
모두 신나서 뛰어다녀.

자크가 큰 소리로 외쳐. "여기 못 잡아!"
웃음소리가 운동장에 가득해.`,
      bg: 'https://images.unsplash.com/photo-1551927336-575d71d6e90e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '브리앙과 이야기한다', to: 'talk_briant', cls: 'bg-green-300' },
        { label: '도니펀과 경주한다', to: 'race_doniphan', cls: 'bg-red-300' }
      ],
      prompt: '💭 친구들과 뛰어노는 게 재미있어?'
    },
    {
      id: 'library',
      title: '도서관',
      text: `너는 조용한 도서관으로 들어가.

책장 가득 모험 이야기들이 있어.
"로빈슨 크루소", "보물섬", "바다 탐험기"...

고든이 옆에 앉아. "나도 모험을 떠나고 싶어."
그 친구는 똑똑하고 조용해.

창밖으로 푸른 하늘이 보여.
방학에 뭔가 특별한 일을 하고 싶어져.`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '바다 책을 읽는다', to: 'sea_book', cls: 'bg-blue-300' },
        { label: '고든과 이야기한다', to: 'talk_gordon', cls: 'bg-green-300' }
      ],
      prompt: '💭 모험 이야기를 읽으면 설레?'
    },
    {
      id: 'talk_briant',
      title: '브리앙의 꿈',
      text: `브리앙은 15명 중 가장 나이가 많아. 14살이야.

"${name.first}, 나 방학 때 뭔가 특별한 걸 하고 싶어."
그가 진지하게 말해.

"매년 똑같이 집에만 가는 건 지루해.
우리 15명 다 같이 모험을 떠나면 어때?"

너는 가슴이 두근거려.
정말 재미있을 것 같아!`,
      bg: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '좋은 생각이라고 한다', to: 'boat_plan', cls: 'bg-green-300' },
        { label: '어떤 모험인지 묻는다', to: 'ask_adventure', cls: 'bg-blue-300' }
      ],
      prompt: '💭 친구들과 모험을 떠나면 설레?'
    },
    {
      id: 'race_doniphan',
      title: '도니펀과 경주',
      text: `도니펀은 힘이 세고 달리기를 잘해.

"${name.first}, 우리 저 나무까지 경주할래?"
너는 고개를 끄덕여.

"하나, 둘, 셋!"
두 사람이 동시에 뛰어나가.

바람이 얼굴을 스쳐 지나가.
숨이 차지만 기분이 좋아!

도니펀이 웃으며 말해. "잘했어! 거의 비겼네!"`,
      bg: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '쉬면서 방학 이야기를 한다', to: 'vacation_talk', cls: 'bg-blue-300' },
        { label: '브리앙이 부른다', to: 'briant_calls', cls: 'bg-green-300' }
      ],
      prompt: '💭 친구와 경쟁하는 게 재미있어?'
    },
    {
      id: 'sea_book',
      title: '바다 이야기',
      text: `너는 "항해자의 일기"라는 책을 꺼내.

푸른 바다, 하얀 돛배, 먼 섬들...
선장이 별을 보고 길을 찾는 장면이 나와.

"와, 멋있다..."

고든이 옆에서 말해.
"우리 학교 선생님이 배 한 척을 갖고 계시대.
방학 때 빌려주신다고 했어."

너는 눈이 반짝여. 정말?`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '배 이야기를 더 듣는다', to: 'boat_info', cls: 'bg-blue-300' },
        { label: '친구들에게 알린다', to: 'tell_friends', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 배를 타보고 싶어?'
    },
    {
      id: 'talk_gordon',
      title: '고든의 생각',
      text: `고든은 조용하지만 생각이 깊어.

"${name.first}, 난 항상 바다를 동경했어.
아빠가 옛날에 선원이셨거든."

그가 책장에서 항해 지도를 꺼내 보여줘.

"이걸 보면 정말 멀리 갈 수 있을 것 같아.
우리도 언젠가 모험을 떠날 수 있을까?"

너는 고개를 끄덕여. "꼭 그렇게 할 수 있을 거야!"`,
      bg: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '지도를 자세히 본다', to: 'study_map', cls: 'bg-blue-300' },
        { label: '친구들을 모으려고 한다', to: 'suggest_gather', cls: 'bg-green-300' }
      ],
      prompt: '💭 꿈을 이루려면 계획이 필요해?'
    },
    {
      id: 'boat_plan',
      title: '배 여행 계획',
      text: `"배를 빌려서 여행하는 거야!"

브리앙이 신나서 설명해.

"선생님한테 슬루기호라는 배가 있대.
15명이 다 탈 수 있는 범선이야!"

너는 놀라. "정말? 그럼 우리..."

"그래! 방학 때 근처 섬으로 모험을 떠나는 거야!"

점점 더 많은 친구들이 모여들어.`,
      bg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구들을 모은다', to: 'gather_friends', cls: 'bg-green-300' },
        { label: '계획을 더 듣는다', to: 'hear_plan', cls: 'bg-blue-300' }
      ],
      prompt: '💭 배 여행이 신나?'
    },
    {
      id: 'ask_adventure',
      title: '어떤 모험?',
      text: `"어떤 모험을 하고 싶은데?"

브리앙이 주변을 둘러보더니 작은 목소리로 말해.

"선생님한테 배를 빌릴 수 있대.
우리 15명이 배를 타고 근처 섬을 탐험하는 거야!"

너는 놀라. "정말? 그게 가능해?"

"물론이지! 선생님께 허락만 받으면 돼.
우리 나이로도 충분히 할 수 있어."`,
      bg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '신나서 찬성한다', to: 'agree_excited', cls: 'bg-yellow-300' },
        { label: '안전 계획을 묻는다', to: 'ask_safety', cls: 'bg-blue-300' }
      ],
      prompt: '💭 배를 타는 모험이 신나?'
    },
    {
      id: 'vacation_talk',
      title: '방학 이야기',
      text: `도니펀이 물어. "방학 때 뭐 하고 싶어?"

"글쎄... 뭔가 특별한 걸 하고 싶어."

그때 브리앙과 고든이 다가와.
브리앙이 신나서 말해.

"얘들아! 우리 방학 때 배 타고 모험 가자!
선생님한테 배를 빌릴 수 있대!"

도니펀이 눈을 반짝여. "정말?
우와, 그거 대박인데!"`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '모두 함께 계획한다', to: 'gather_friends', cls: 'bg-green-300' },
        { label: '더 자세히 듣는다', to: 'hear_plan', cls: 'bg-blue-300' }
      ],
      prompt: '💭 방학 계획이 생기니 설레?'
    },
    {
      id: 'briant_calls',
      title: '브리앙의 부름',
      text: `"얘들아! 이리 와봐!"

브리앙이 크게 소리쳐.
너와 도니펀은 다가가.

"중요한 얘기가 있어.
우리 방학 때 배를 타고 모험을 떠나려고 해!"

도니펀이 놀라. "배라고?"

"응! 슬루기호라는 범선이야.
15명이 모두 탈 수 있어!"`,
      bg: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '바로 찬성한다', to: 'agree_excited', cls: 'bg-green-300' },
        { label: '계획을 듣는다', to: 'hear_plan', cls: 'bg-blue-300' }
      ],
      prompt: '💭 브리앙의 제안이 흥미로워?'
    },
    {
      id: 'boat_info',
      title: '슬루기호',
      text: `"배 이름이 슬루기호래."
고든이 설명해.

"작지만 튼튼한 범선이야.
15명이 다 탈 수 있어.
 нель도 있고, 키도 있고...
진짜 항해를 할 수 있는 배야!"

너는 상상해봐.
푸른 바다 위를 가르는 하얀 돛...

"우리 정말 탈 수 있을까?"

"물론이지! 친구들만 모으면 돼."`,
      bg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구들을 모으러 간다', to: 'gather_friends', cls: 'bg-green-300' },
        { label: '계획을 더 세운다', to: 'make_plan', cls: 'bg-blue-300' }
      ],
      prompt: '💭 배 이름까지 있으니 진짜 같아?'
    },
    {
      id: 'tell_friends',
      title: '친구들에게 알리기',
      text: `너는 신나서 운동장으로 뛰어나가.

"얘들아! 대단한 소식이 있어!"

브리앙, 도니펀, 자크... 친구들이 모여들어.

"뭔데?"

"선생님께 배가 있대!
방학 때 우리가 빌려 탈 수 있대!"

"정말?" 친구들이 눈을 반짝여.
"그럼 우리 바다로 갈 수 있겠네!"`,
      bg: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '모두 계획을 세운다', to: 'gather_friends', cls: 'bg-green-300' },
        { label: '선생님께 여쭤본다', to: 'ask_teacher', cls: 'bg-blue-300' }
      ],
      prompt: '💭 좋은 소식을 나누면 기뻐?'
    },
    {
      id: 'study_map',
      title: '지도 공부',
      text: `고든이 지도를 펼쳐놔.

"여기가 우리 학교가 있는 뉴질랜드야.
이 근처에 작은 섬들이 많아."

너는 지도를 자세히 봐.
해안선, 섬, 바다...

"여기 이 섬은 어때?
하루면 갈 수 있을 것 같은데."

고든이 고개를 끄덕여. "좋은 생각이야!
우리 친구들에게도 보여주자."`,
      bg: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구들을 모은다', to: 'gather_friends', cls: 'bg-green-300' },
        { label: '계획을 더 짠다', to: 'make_plan', cls: 'bg-blue-300' }
      ],
      prompt: '💭 지도를 보면 여행이 현실 같아?'
    },
    {
      id: 'suggest_gather',
      title: '친구들 모으기 제안',
      text: `"우리 친구들을 모아서 진짜 모험을 떠나자!"

고든이 눈을 반짝여.
"좋은 생각이야! 15명이 함께하면..."

너희는 운동장으로 나가.
브리앙, 도니펀, 자크...
친구들을 하나둘 모아.

"얘들아, 중요한 얘기가 있어!"

모두가 관심 있게 다가와.`,
      bg: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계획을 설명한다', to: 'gather_friends', cls: 'bg-green-300' }
      ],
      prompt: '💭 친구들을 모으면 힘이 세져?'
    },
    {
      id: 'agree_excited',
      title: '신나는 찬성',
      text: `"너무 좋아! 꼭 하자!"

너는 흥분해서 말해.
상상만 해도 가슴이 두근거려.

브리앙이 어깨를 두드려.
"좋아! 네가 함께해주니 든든해."

도니펀도 다가와. "나도 할래!"
자크도 손을 들어. "나도!"

점점 더 많은 친구들이 모여들어.
15명의 모험단이 만들어지고 있어!`,
      bg: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '모두 함께 계획한다', to: 'gather_friends', cls: 'bg-green-300' }
      ],
      prompt: '💭 함께할 친구가 많으면 든든해?'
    },
    {
      id: 'ask_safety',
      title: '안전 계획',
      text: `"그런데... 안전할까?"

브리앙이 진지하게 대답해.

"물론 조심해야 해.
그래서 우리 15명이 함께 가는 거야.
혼자면 위험하지만 함께면 안전해."

"게다가 가까운 섬만 갈 거야.
날씨도 잘 보고, 준비도 철저히 하고..."

너는 고개를 끄덕여. 그럼 괜찮을 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '안심하고 참여한다', to: 'gather_friends', cls: 'bg-green-300' }
      ],
      prompt: '💭 안전이 먼저 중요해?'
    },
    {
      id: 'hear_plan',
      title: '계획 듣기',
      text: `브리앙이 주머니에서 종이를 꺼내.

"내가 계획을 좀 세워봤어.
첫째, 선생님한테 배를 빌린다.
둘째, 식량이랑 물을 준비한다.
셋째, 근처 섬까지 항해한다!"

너는 듣고 있다가 손을 들어.
"우리 15명 모두 갈 수 있어?"

"물론이지! 오히려 15명이 있어야
서로 도우면서 더 안전하게 갈 수 있어."`,
      bg: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구들을 모두 모은다', to: 'gather_friends', cls: 'bg-green-300' }
      ],
      prompt: '💭 계획이 구체적이면 믿음이 가?'
    },
    {
      id: 'make_plan',
      title: '계획 세우기',
      text: `너와 고든은 종이에 계획을 적기 시작해.

"첫째, 선생님께 허락받기."
"둘째, 친구들 15명 모으기."
"셋째, 준비물 챙기기."
"넷째, 항해 연습하기."

하나씩 적으면 할 수 있을 것 같아!

고든이 말해. "우리 친구들한테도 보여주자.
15명이 힘을 합치면 뭐든 할 수 있어!"`,
      bg: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구들을 모은다', to: 'gather_friends', cls: 'bg-green-300' }
      ],
      prompt: '💭 계획이 있으면 안심돼?'
    },
    {
      id: 'gather_friends',
      title: '15명 모두 모이기',
      text: `브리앙이 큰 소리로 외쳐.
"얘들아, 다 모여봐! 중요한 얘기가 있어!"

15명이 모두 모여.
도니펀, 고든, 크로스, 서비스, 월콕, 자크...
그리고 어린 친구들인 코스터, 이빈스, 도울...

"방학 때 우리 15명이서 배를 타고 모험을 떠나려고 해!"

모두가 환호해. "우와!"
"정말?"
"신난다!"`,
      bg: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '역할을 나눈다', to: 'assign_roles', cls: 'bg-green-300' },
        { label: '선생님께 허락받으러 간다', to: 'ask_teacher', cls: 'bg-blue-300' }
      ],
      prompt: '💭 15명이 모이니 힘이 세?'
    },
    {
      id: 'ask_teacher',
      title: '선생님께 허락받기',
      text: `너희는 선생님 사무실로 가.

브리앙이 조심스럽게 문을 두드려.
"선생님, 여쭤볼 게 있어요."

선생님이 웃으시며 말씀하셔.
"뭔데, 얘들아?"

"방학 때 슬루기호를 빌릴 수 있을까요?
저희 15명이 함께 섬 탐험을 가고 싶어요!"

선생님이 잠시 생각하시더니 고개를 끄덕이셔.
"좋은 생각이구나. 허락한다!"`,
      bg: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '기뻐하며 준비한다', to: 'prepare_start', cls: 'bg-green-300' }
      ],
      prompt: '💭 선생님께 허락받으니 진짜 같아?'
    },
    {
      id: 'assign_roles',
      title: '역할 배정',
      text: `"자, 이제 역할을 나누자!"

브리앙이 말해.
"나는 선장 역할을 할게."

도니펀이 손을 들어. "나는 돟을 관리할게!"
고든이 말해. "나는 항해사!"

크로스, 서비스, 월콕도 각자 역할을 정해.
"나는 요리!"
"나는 물품 관리!"
"나는 안전 담당!"

자크가 말해. "나는 모두를 응원할게!"

너도 역할을 정할 시간이야.`,
      bg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '항해를 돕기로 한다', to: 'prepare_start', cls: 'bg-blue-300' },
        { label: '물품 관리를 맡는다', to: 'prepare_start', cls: 'bg-green-300' }
      ],
      prompt: '💭 역할 분담이 중요해?'
    },
    {
      id: 'prepare_start',
      title: '준비 시작',
      text: `다음 날부터 본격적인 준비가 시작돼.

식량팀은 빵, 물, 건어물을 모아.
도구팀은 밧줄, 나침반, 망원경을 챙겨.
항해팀은 지도를 공부하고 날씨를 확인해.

너도 네가 맡은 일을 열심히 해.

일주일이 금방 지나가.
드디어 출발일이 다가와!

준비는 완벽해!`,
      bg: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '출발 전날 밤', to: 'night_before', cls: 'bg-purple-300' },
        { label: '출발하는 아침', to: 'departure_morning', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 출발이 다가오니 설레?'
    },
    {
      id: 'night_before',
      title: '출발 전날 밤',
      text: `출발 전날 밤이야.

너는 기숙사 침대에 누워 있지만
흥분해서 잠이 안 와.

옆 침대의 브리앙도 뒤척여.
"${name.first}, 자?"

"응, 너무 설레서 잠이 안 와."

"나도 그래. 내일이 기대돼!"

창밖으로 별이 보여.
내일은 분명 멋진 날이 될 거야.`,
      bg: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '별을 보며 잠든다', to: 'departure_morning', cls: 'bg-purple-300' }
      ],
      prompt: '💭 중요한 날 전날 밤에 잠이 와?'
    },
    {
      id: 'departure_morning',
      title: '출발하는 아침',
      text: `드디어 출발하는 아침이야!

15명이 모두 항구에 모여.
슬루기호가 물 위에 떠 있어.

하얀 돟, 튼튼한 키, 넓은 갑판...
정말 멋진 배야!

브리앙이 소리쳐.
"자, 모두 배에 타자!"

너는 설레는 마음으로 배에 올라타.
드디어 모험이 시작돼!`,
      bg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '돛을 올린다', to: 'raise_sail', cls: 'bg-blue-300' },
        { label: '항구를 떠난다', to: 'leave_port', cls: 'bg-green-300' }
      ],
      prompt: '💭 드디어 출발하니 어때?'
    },
    {
      id: 'raise_sail',
      title: '돛 올리기',
      text: `"딕을 올려!"

도니펀과 크로스가 밧줄을 당겨.
흰 돟이 천천히 올라가.

바람이 돟을 가득 채워.
배가 움직이기 시작해!

"우와!" 모두가 환호성을 질러.

고든이 나침반을 확인해.
"방향 좋아! 이대로 가면 돼!"

너는 가슴이 두근두근해.`,
      bg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '항해를 시작한다', to: 'start_sailing', cls: 'bg-blue-300' }
      ],
      prompt: '💭 돟이 바람에 채워지니 멋있어?'
    },
    {
      id: 'leave_port',
      title: '항구를 떠나다',
      text: `슬루기호가 천천히 항구를 벗어나.

해안선이 점점 멀어져.
넓고 푸른 바다가 펼쳐져.

브리앙이 키를 잡고 외쳐.
"자유다!"

15명이 모두 함께 웃어.

파도가 배를 부드럽게 흔들어.
짠 바람이 얼굴을 스쳐.

이게 바로 모험이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '평화로운 항해를 즐긴다', to: 'start_sailing', cls: 'bg-blue-300' }
      ],
      prompt: '💭 바다 위에 있으니 자유로워?'
    },
    {
      id: 'start_sailing',
      title: '항해 시작',
      text: `슬루기호는 바다를 가로질러.

햇살이 반짝이고,
갈매기가 날아다녀.

자크가 준비한 샌드위치를 나눠 먹어.
"맛있다!"

도니펀이 돟을 조절하고,
고든이 방향을 확인해.

모두가 자기 역할을 잘해내.
15명의 팀워크가 완벽해!`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '바다를 바라본다', to: 'look_ocean', cls: 'bg-blue-300' },
        { label: '노래를 부른다', to: 'sing_together', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 항해가 즐거워?'
    },
    {
      id: 'look_ocean',
      title: '바다를 보다',
      text: `너는 배 난간에 기대어 바다를 봐.

끝없이 펼쳐진 푸른 물결...
하늘과 바다가 만나는 수평선...

돌고래 한 마리가 배 옆으로 헤엄쳐.
"와, 돌고래다!"

갈매기들이 배 위를 날아다녀.

고든이 옆에 와서 말해.
"멋지지? 이게 바로 우리가 꿈꾸던 거야."`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '항해를 계속한다', to: 'peaceful_voyage', cls: 'bg-blue-300' }
      ],
      prompt: '💭 바다가 아름다워?'
    },
    {
      id: 'sing_together',
      title: '함께 노래하기',
      text: `자크가 노래를 시작해.
"바다로 가자, 우리 함께~"

모두가 따라 부르기 시작해.
15명의 목소리가 하나로 어우러져.

"파도를 넘어, 섬을 향해~"

브리앙이 웃으며 박수쳐.
도니펀이 리듬을 맞춰.

노래 소리가 바다에 울려퍼져.
정말 행복한 순간이야!`,
      bg: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '평화로운 항해를 즐긴다', to: 'peaceful_voyage', cls: 'bg-blue-300' }
      ],
      prompt: '💭 함께 노래하니 즐거워?'
    },
    {
      id: 'peaceful_voyage',
      title: '평화로운 항해',
      text: `항해는 평화로워.

파도 소리, 바람 소리...
자연의 음악이야.

너희는 편안하게 바다를 즐겨.

저 멀리 섬이 보이기 시작해.
하지만 고든이 하늘을 보며 말해.

"저기... 구름이 모여드는 것 같은데..."

브리앙이 진지하게 쳐다봐.
날씨가 조금씩 변하는 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '조심스럽게 나아간다', to: 'careful_sailing', cls: 'bg-blue-300' },
        { label: '《15소년 표류기》 읽어보기', to: 'ending', cls: 'bg-purple-300' }
      ],
      prompt: '💭 날씨 변화가 걱정돼?'
    },
    {
      id: 'careful_sailing',
      title: '조심스럽게',
      text: `"모두 조심해!"

브리앙이 키를 단단히 잡아.
도니펀이 돟을 확인해.

하늘이 점점 어두워져.
바람이 강해지기 시작해.

고든이 나침반을 보며 말해.
"방향은 맞아. 계속 가자!"

15명이 함께 있으니 두렵지 않아.
서로를 믿고, 협력하며...

이야기는 이제부터 시작이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '《15소년 표류기》 읽어보기', to: 'ending', cls: 'bg-purple-300' }
      ],
      prompt: '💭 함께라면 두렵지 않아?'
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `너는 14명의 친구들과 슬루기호를 타고 항해를 시작했어.

브리앙, 도니펀, 고든, 자크...
15명이 함께 떠난 여름방학 모험!

《15소년 표류기》에서는 이 15명의 소년들에게 놀라운 일이 벌어져!
협력과 우정, 용기와 지혜로 위기를 극복하고,
진정한 팀워크의 힘을 깨달아가는 감동적인 이야기야!

📚 서점이나 도서관에서 《15소년 표류기》를 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      prompt: '《15소년 표류기》 - 마치 "마인크래프트 서바이벌"처럼! 무인도에서 15명이 집 짓고, 음식 구하고, 협력하며 살아남는 팀워크 생존 모험이야!',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-300' }
      ]
    }
  ];
}
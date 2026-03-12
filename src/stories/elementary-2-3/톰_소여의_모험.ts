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
    casual: full
  };
}

export function generateTomSawyerStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '새 학기 첫날',
      text: `너의 이름은 ${name.full}. 
      1840년대 미국 미시시피 강변 마을에 살아.

오늘은 새 학기 첫날! 폴리 이모가 아침부터 잔소리야.
\"${name.first}! 학교 늦겠어!
세수하고 머리 빗어!\"

하지만 창밖을 보니 강물이 반짝반짝 빛나. '오늘 강에서 놀면 얼마나 좋을까...'`,
      bg: 'https://images.unsplash.com/photo-1624417325852-c9a4040764c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXNzaXNzaXBwaSUyMHJpdmVyJTIwc3Vuc2V0fGVufDF8fHx8MTc2MzA1NTkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '학교에 간다', to: 'go_school', cls: 'bg-blue-300' },
        { label: '강에 가고 싶다', to: 'want_river', cls: 'bg-green-300' }
      ],
      prompt: '새 학기에 제일 기대되는 것은? ~'
    },
    {
      id: 'go_school',
      title: '학교 가는 길',
      text: `학교로 걸어가는데 낡은 옷을 입은 소년이 보여. 허클베리 핀이야.

마을 사람들은 허크를 싫어해. "학교도 안 가고 떠돌아다닌다"고. 하지만 허크는 자유로워 보여.

허크가 손을 흔들어.`,
      bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '허크에게 인사한다', to: 'greet_huck', cls: 'bg-green-300' },
        { label: '그냥 지나간다', to: 'pass_by', cls: 'bg-gray-300' }
      ],
      prompt: '💭 친구들이 싫어하는 아이한테도 친절하게 대해?'
    },
    {
      id: 'want_river',
      title: '마음의 갈등',
      text: `'학교... 꼭 가야 하나?'

폴리 이모 목소리가 들려.
\"${name.first}! 어디 있어?\"

학교에 가면 재미없는 수업. 하지만 안 가면 이모가 실망하실 거야. 그리고 친구들도 기다리고 있어.`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '결국 학교에 간다', to: 'go_school', cls: 'bg-blue-300' },
        { label: '잠깐만 강에 간다', to: 'sneak_river', cls: 'bg-red-300' }
      ],
      prompt: '💭 하고 싶은 것과 해야 하는 것 중에 고민해본 적 있어?'
    },
    {
      id: 'greet_huck',
      title: '새로운 친구',
      text: `"안녕, 허크!"

허크가 놀란 표정이야.
\"너... 나한테 말 거는 거야?\"
\"응! 내 이름은 ${name.full}!\"

허크가 천천히 웃었어.
\"애들이 나랑 놀면 혼난다던데...\"

너는 어깨를 으쓱했어. "나는 상관없어!"`,
      bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '허크와 이야기를 나눈다', to: 'talk_huck', cls: 'bg-green-300' }
      ],
      prompt: '💭 새로운 친구 사귀는 게 즐거워?'
    },
    {
      id: 'pass_by',
      title: '후회',
      text: `그냥 지나쳤어. 허크의 실망한 표정이 보였어.

학교에 가는 내내 마음이 무거워. '왜 인사를 안 했을까...'

점심시간에 친구들이 말해.
\"${name.first}, 우리 허크한테 말 안 거는 게 좋대.\"`,
      bg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구들 말에 동의한다', to: 'agree_friends', cls: 'bg-gray-300' },
        { label: '내 생각은 다르다고 말한다', to: 'disagree', cls: 'bg-green-300' }
      ],
      prompt: '💭 다른 사람 말 때문에 내 마음과 다르게 행동한 적 있어?'
    },
    {
      id: 'sneak_river',
      title: '물가의 자유',
      text: `살금살금 강으로 갔어. 차가운 물에 발을 담갔어.
\"와, 시원해!\"

물고기들이 헤엄치고, 새들이 노래해. 정말 기분 좋아!

그런데... 시계를 봤어. 학교 시작 시간이 지났어. '큰일 났어!'`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '급히 학교로 달려간다', to: 'late_school', cls: 'bg-red-300' },
        { label: '이왕 늦은 거 더 논다', to: 'keep_playing', cls: 'bg-purple-300' }
      ],
      prompt: '💭 하면 안 되는 거 하다가 들킬까 봐 조마조마한 적 있어?'
    },
    {
      id: 'talk_huck',
      title: '허크의 이야기',
      text: `허크가 말했어.
\"나는 아빠랑 안 살아.
그냥... 자유롭게 살지.\"

"부럽다! 숙제도 없고 잔소리도 없겠네?"

허크가 쓸쓸하게 웃었어.
\"그런데 가끔... 외로워. 친구가 없거든.\"

너는 허크의 손을 잡았어. "이제부터 내가 친구야!"`,
      bg: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '방과 후 만나기로 약속한다', to: 'promise_meet', cls: 'bg-green-300' }
      ],
      prompt: '💭 외로운 친구를 위로해준 적 있어?'
    },
    {
      id: 'agree_friends',
      title: '따라가기',
      text: `친구들 말에 고개를 끄덕였어. 하지만 마음이 편하지 않아.

수업 시간, 뭔가 집중이 안 돼. 계속 허크의 슬픈 표정이 생각나.

'내가 잘한 걸까?'

그때 선생님이 말씀하셨어. "오늘은 중요한 이야기를 해볼 거예요."`,
      bg: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '수업을 듣는다', to: 'class_time', cls: 'bg-blue-300' }
      ],
      prompt: '💭 마음이 무거울 때 집중하기 힘들어?'
    },
    {
      id: 'disagree',
      title: '내 생각 말하기',
      text: `"난 그렇게 생각 안 해."

친구들이 놀랐어.
\"뭐? 허크는 이상한 애야!\"
\"아니야. 허크도 우리랑 똑같아. 그냥 환경이 다를 뿐이야.\"

친구들이 조용해졌어. 한 친구가 말했어.
\"그건... 생각 못 해봤어.\"`,
      bg: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구들에게 더 설명한다', to: 'explain_more', cls: 'bg-blue-300' }
      ],
      prompt: '💭 친구들과 생각이 다를 때 용감하게 말할 수 있어?'
    },
    {
      id: 'late_school',
      title: '지각',
      text: `숨을 헐떡이며 교실에 들어갔어.

선생님이 날카로운 눈빛으로 봐.
\"${name.full}, 늦었구나.\"
\"죄, 죄송합니다...\"
\"이유를 말해보렴.\"

너는 고민했어. 솔직하게 말할까, 아니면 변명할까?`,
      bg: 'https://images.unsplash.com/photo-1588072432836-e10032774350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '솔직하게 말한다', to: 'honest', cls: 'bg-green-300' },
        { label: '변명한다', to: 'excuse', cls: 'bg-red-300' }
      ],
      prompt: '💭 잘못했을 때 솔직하게 말하는 게 나아?'
    },
    {
      id: 'keep_playing',
      title: '하루 결석',
      text: `하루 종일 강에서 놀았어. 물고기 잡고, 돌 던지고, 풀밭에 누워 구름 보고... 정말 재미있었어!

하지만 해가 질 무렵, 불안해지기 시작했어.
'이모님이 엄청 걱정하시겠다...'
'학교에서도 난리 났겠지...'`,
      bg: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '집으로 돌아간다', to: 'go_home', cls: 'bg-blue-300' }
      ],
      prompt: '💭 재미있었지만 후회되는 일을 해본 적 있어?'
    },
    {
      id: 'promise_meet',
      title: '비밀 약속',
      text: `"오늘 저녁 여기서 만나자!"

허크가 환하게 웃었어.
\"정말? 약속?\"
\"응! 우리만의 비밀 아지트를 만들자!\"

학교 종이 울렸어. "가봐야겠다. 나중에 봐!"

너는 신나서 학교로 뛰어갔어. 오늘이 기다려져!`,
      bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '수업을 듣는다', to: 'class_time', cls: 'bg-blue-300' }
      ],
      prompt: '💭 친구와의 약속을 기대하면 하루가 신나?'
    },
    {
      id: 'brave_talk',
      title: '두 번째 기회',
      text: `"허크! 잠깐만!"

허크가 놀라서 돌아봤어.
\"아까는... 미안해.
친구들 때문에 망설였어.\"
\"하지만 이제 알았어. 네가 좋은 사람이라는 걸.\"

허크가 천천히 웃었어.
\"괜찮아. 용기 내줘서 고마워.\"`,
      bg: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '친구가 된다', to: 'become_friends', cls: 'bg-green-300' }
      ],
      prompt: '💭 잘못을 바로잡으니 기분이 어때?'
    },
    {
      id: 'pass_again',
      title: '놓친 기회',
      text: `또다시 지나쳤어. 허크가 고개를 숙였어.

집으로 가면서 계속 뒤돌아봤어. '왜 나는 용기를 못 낼까...'

그날 밤 잠이 안 왔어. 내일은... 꼭 용기를 내야지.`,
      bg: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음을 기약한다', to: 'ending', cls: 'bg-gray-300' }
      ],
      prompt: '💭 용기를 못 내서 후회한 적 있어?'
    },
    {
      id: 'explain_more',
      title: '편견 깨기',
      text: `"허크는 그냥 환경이 안 좋을 뿐이야. 우리가 친절하게 대하면 허크도 좋은 친구가 될 거야."

친구들이 생각에 잠겼어. 한 친구가 말했어.
\"그래... 네 말이 맞는 것 같아.
우리가 너무 편견을 가졌나 봐.\"

너는 뿌듯했어. 생각을 바꾸게 했어!`,
      bg: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '함께 허크를 찾아간다', to: 'together_find', cls: 'bg-green-300' }
      ],
      prompt: '💭 친구들을 설득해본 적 있어?'
    },
    {
      id: 'honest',
      title: '솔직한 고백',
      text: `"죄송합니다. 강에서 놀다가 늦었습니다."

선생님이 한숨을 쉬셨어.
\"적어도 거짓말은 안 하는구나.\"
\"다음부턴 꼭 시간 지키겠습니다.\"

선생님이 고개를 끄덕이셨어.
\"좋아. 정직은 소중한 거란다. 하지만 다음엔 늦지 마렴.\"`,
      bg: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '자리에 앉는다', to: 'class_time', cls: 'bg-blue-300' }
      ],
      prompt: '💭 솔직하게 말하면 마음이 편해?'
    },
    {
      id: 'excuse',
      title: '거짓말의 무게',
      text: `"저기... 할머니가 아프셔서..."

선생님이 의심스러운 눈빛이야.
\"정말? 어제는 건강하셨는데?\"

얼굴이 빨개졌어. 거짓말이 들통났어.
\"${name.full}, 정직하게 말하렴.\"

마음이 너무 무거워.`,
      bg: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '진실을 말한다', to: 'tell_truth', cls: 'bg-green-300' }
      ],
      prompt: '💭 거짓말하면 더 힘들어?'
    },
    {
      id: 'go_home',
      title: '집으로',
      text: `집에 도착했어. 폴리 이모가 울고 계셔.

\"${name.first}! 어디 갔었어!
학교에서 연락 왔어!\"

가슴이 아팠어. 이모를 걱정시켰어.
\"이모님... 정말 죄송해요.\"

진심으로 반성했어.

"내일부터는 꼭 학교 갈게요. 그리고 선생님 말씀 잘 들을게요!"`,
      bg: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음 날 학교에 간다', to: 'next_day_school', cls: 'bg-blue-300' }
      ],
      prompt: '💭 가족을 걱정시켜서 미안했던 적 있어?'
    },
    {
      id: 'next_day_school',
      title: '다음 날',
      text: `다음 날, 너는 정말 일찍 일어났어.

"오늘은 절대 지각 안 해!"

학교에 도착하니 선생님이 반갑게 맞아주셨어.

"오늘은 특별한 수업을 할 거예요."

어떤 수업일까? 궁금해졌어.`,
      bg: 'https://images.unsplash.com/photo-1588072432836-e10032774350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '수업을 듣는다', to: 'class_time', cls: 'bg-blue-300' }
      ],
      prompt: '💭 반성하고 나면 마음가짐이 달라져?'
    },
    {
      id: 'class_time',
      title: '수업 시간',
      text: `수업이 시작됐어. 선생님이 칠판에 뭔가 쓰셔.

\"오늘은 미국의 역사에 대해 배워볼 거예요.
이 땅에는 원래 누가 살고 있었을까요?\"

한 친구가 손을 들어.
\"인디언이요!\"`,
      bg: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '집중해서 듣는다', to: 'learn_native_history', cls: 'bg-blue-300' }
      ],
      prompt: '💭 역사 수업에서 새로운 걸 배울 때 흥미로워?'
    },
    {
      id: 'learn_native_history',
      title: '잊혀진 주인들',
      text: `선생님이 설명하셨어.
\"맞아요. 인디언들이 이 땅의 원래 주인이었어요.
이 숲도, 강도, 들판도 모두 인디언들의 터전이었죠.\"

\"하지만 유럽에서 백인들이 와서 땅을 빼앗았어요.
많은 인디언들이 쫓겨났답니다.\"

마음이 무거워졌어.`,
      bg: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 듣는다', to: 'learn_discrimination', cls: 'bg-blue-300' }
      ],
      prompt: '💭 원래 주인이 쫓겨난다는 게 슬프지 않아?'
    },
    {
      id: 'learn_discrimination',
      title: '차별에 대하여',
      text: `선생님이 계속 말씀하셨어.
\"지금도 인디언들은 차별을 받고 있어요.
다르게 생겼다고, 다른 문화를 가졌다고 이상하게 보는 거죠.\"

\"하지만 그들도 우리와 똑같은 사람이에요.
다른 사람을 이해하고 존중하는 게 중요합니다.\"`,
      bg: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '깊이 생각한다', to: 'think_about_lesson', cls: 'bg-purple-300' }
      ],
      prompt: '💭 다르다는 이유로 차별하는 게 옳을까?'
    },
    {
      id: 'think_about_lesson',
      title: '수업 후 생각',
      text: `수업이 끝났어. 선생님 말씀을 계속 생각해.

'인디언들... 불쌍하다. 아무 잘못도 안 했는데...'
'다른 사람을 차별하면 안 되겠어.'
'허크처럼 환경이 다른 사람도 똑같이 존중해야지!'

너는 많은 걸 배웠어.`,
      bg: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '방과 후를 기다린다', to: 'after_school', cls: 'bg-green-300' }
      ],
      prompt: '💭 배운 걸 실천하면 세상이 바뀔까?'
    },
    {
      id: 'after_school',
      title: '약속 장소에서',
      text: `드디어 방과 후! 약속 장소로 뛰어갔어. 허크가 기다리고 있어.

\"${name.first}! 왔구나!\"
\"응! 뭐 하고 놀까?\"

허크가 신비로운 표정으로 말했어.
\"내가 아는 비밀 장소가 있어. 거기엔... 보물이 있을지도 몰라!\"`,
      bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '모험을 시작한다', to: 'adventure_begin', cls: 'bg-gray-300' }
      ],
      prompt: '💭 친구와의 약속을 지키니 기분이 어때?'
    },
    {
      id: 'adventure_begin',
      title: '모험의 시작',
      text: `너와 허크는 숲 속으로 들어갔어.

\"저기 오래된 집이 있어. 사람들이 귀신 나온다고 하는데...\"
\"진짜? 무서운데?\"
\"하지만 보물이 있을 수도 있어!\"

두근두근했어. 무서우면서도 설레! 진짜 모험이야!`,
      bg: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '용감하게 들어간다', to: 'brave_adventure', cls: 'bg-purple-300' },
        { label: '조금 무서워한다', to: 'scared_but_try', cls: 'bg-yellow-300' }
      ],
      prompt: '💭 무서워도 도전하는 게 용기야?'
    },
    {
      id: 'brave_adventure',
      title: '용감한 탐험가',
      text: `"괜찮아! 같이 가자!"

너는 허크의 손을 잡았어. 둘이 함께라면 무섭지 않아!

오래된 집 안은 어두컴컴해. 하지만 탐험하는 기분이 정말 짜릿해!

"${name.first}, 넌 정말 용감해!"

허크가 감탄했어.`,
      bg: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '신나는 모험을 계속한다', to: 'ending', cls: 'bg-purple-300' }
      ],
      prompt: '💭 친구와 함께하면 용기가 생겨?'
    },
    {
      id: 'scared_but_try',
      title: '솔직한 마음',
      text: `"사실... 좀 무서워."

허크가 웃었어.
\"나도 무서워! 하지만 같이 있으니까 괜찮아.\"
\"그래, 우리 함께니까!\"

무서운 걸 솔직하게 말했더니 오히려 마음이 편해. 둘이서 조심조심 들어갔어.`,
      bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '함께 탐험한다', to: 'ending', cls: 'bg-green-300' }
      ],
      prompt: '💭 무서울 때 솔직하게 말하는 게 나아?'
    },
    {
      id: 'become_friends',
      title: '진짜 친구',
      text: `너와 허크는 친구가 됐어.

\"${name.first}, 넌 특별해. 다른 애들은 날 피하는데...\"
\"우린 이제 친구야!\"

허크가 행복한 표정이야. 너도 기분이 좋아.

"학교 갈 시간이다. 오늘 수업이 기대돼!"

진짜 친구를 만났으니 뭐든 할 수 있을 것 같아!`,
      bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '신나게 학교에 간다', to: 'go_to_class', cls: 'bg-blue-300' }
      ],
      prompt: '💭 진짜 친구를 사귀면 기분이 어때?'
    },
    {
      id: 'go_to_class',
      title: '설레는 마음으로',
      text: `친구와 함께 학교로 갔어.

마음이 가벼워. 허크라는 친구가 생겼으니까!

교실에 들어가니 선생님이 말씀하셨어.
"오늘은 아주 중요한 이야기를 할 거예요."

어떤 이야기일까?`,
      bg: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '수업을 듣는다', to: 'class_time', cls: 'bg-blue-300' }
      ],
      prompt: '💭 좋은 일이 있으면 공부도 더 잘 되는 것 같아?'
    },
    {
      id: 'together_find',
      title: '함께',
      text: `너와 친구들이 함께 허크를 찾았어.

\"허크! 우리랑 같이 놀래?\"

허크가 놀라며 물었어.
\"정말... 나랑?\"

친구들이 웃으며 말했어.
\"응! ${name.first} 말이 맞아. 넌 좋은 친구 될 것 같아!\"

모두가 웃었어.

"학교 가자! 함께 수업 들으면 재미있을 거야!"`,
      bg: 'https://images.unsplash.com/photo-1529156069898-49953e39b3be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다 함께 학교에 간다', to: 'all_together_class', cls: 'bg-blue-300' }
      ],
      prompt: '💭 편견이 사라지면 기분이 어때?'
    },
    {
      id: 'all_together_class',
      title: '함께하는 수업',
      text: `친구들과 함께 교실에 들어갔어.

선생님이 반갑게 맞아주셨어.
"오늘은 모두에게 중요한 이야기를 해줄게요."

모두 함께 수업을 듣게 됐어!`,
      bg: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '수업을 듣는다', to: 'class_time', cls: 'bg-blue-300' }
      ],
      prompt: '💭 친구들과 함께 배우면 더 즐거워?'
    },
    {
      id: 'tell_truth',
      title: '진실',
      text: `"죄송합니다... 강에서 놀았어요."

선생님이 한숨을 쉬셨어.
\"처음부터 솔직하게 말했으면 좋았을 텐데.\"
\"정말 죄송합니다.\"

\"거짓말은 더 큰 문제를 만든단다. 다음엔 정직하렴.\"

고개를 끄덕였어. 배웠어.`,
      bg: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '반성한다', to: 'ending', cls: 'bg-blue-300' }
      ],
      prompt: '💭 잘못을 인정하는 게 용기라는 거 알아?'
    },
    {
      id: 'apologize_aunt',
      title: '진심 어린 사과',
      text: `"이모님, 정말 죄송해요. 다시는 안 그럴게요."

폴리 이모가 너를 꼭 안아줬어.
\"${name.first}, 난 네가 다친 줄 알고 정말 무서웠어.\"

\"걱정 끼쳐드려서 죄송해요.\"
\"다음엔 꼭 어디 가는지 말하고 가렴.\"

약속했어.`,
      bg: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '교훈을 얻는다', to: 'ending', cls: 'bg-green-300' }
      ],
      prompt: '💭 진심으로 사과하면 용서받을 수 있어?'
    },
    {
      id: 'dream_adventure',
      title: '모험의 꿈',
      text: `"허크, 우리 모험을 떠나자!"
\"무슨 모험?\"
\"음... 보물 찾기? 아니면 해적 놀이?\"

허크의 눈이 반짝였어.
\"좋아! 나는 자유롭게 다닐 수 있으니까 좋은 장소를 많이 알아!\"

둘은 모험 계획을 세우기 시작했어.`,
      bg: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '신나는 미래를 꿈꾼다', to: 'ending', cls: 'bg-purple-300' }
      ],
      prompt: '💭 친구와 모험 계획 세우는 게 즐거워?'
    },
    {
      id: 'play_together',
      title: '함께하는 즐거움',
      text: `모두 함께 강에서 놀았어. 수영하고, 물장난하고, 돌멩이 던지기 놀이하고...

허크가 말했어.
\"이렇게 많은 친구랑 놀아본 게 처음이야!\"

모두가 행복한 표정이야. 편견이 사라지니까 더 즐거워!`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '우정을 다진다', to: 'ending', cls: 'bg-green-300' }
      ],
      prompt: '💭 모두가 친구가 되면 더 재미있어?'
    },
    {
      id: 'ending',
      title: '이야기는 계속돼!',
      text: `《톰 소여의 모험》에는 더 신나는 이야기가 가득해.       
      학교에서의 말썽, 첫사랑 베키와의 이야기, 동굴 속에서 길을 잃는 모험, 그리고 진짜 보물 찾기!

용기와 우정, 정직과 모험, 그리고 성장에 대한 이야기야.

📚 이제 진짜 책을 읽어볼 시간! 짧은 게임으로 맛본 이야기, 책에서 더 본격적인 내용을 확인해 볼까?

💡 도서관이나 서점에서 《톰 소여의 모험》을 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' }
      ],
      prompt: '《톰 소여의 모험》 - *짱구는 못말려*처럼 장난꾸러기 친구들과 함께하는 모험 이야기! 강에서 놀고, 동굴을 탐험하고, 사건을 해결하는 신나는 이야기야. 그리고 편견과 우정에 대해서도 배울 수 있어!'
    }
  ];
}
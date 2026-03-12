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

export function generateArabianNightsStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '왕궁 도서관의 견습생',
      text: `너는 왕궁 도서관에서 일하는 어린 견습생이야.

매일 책을 정리하고, 두루마리를 펴고, 먼지를 털어.
가장 좋아하는 건 사서 할아버지가 들려주는 이야기!

오늘도 할아버지가 말해. 
"책과 이야기는 마법과도 같단다. 사람의 마음을 바꿀 수 있지."

"정말요?"

"그럼! 언젠가 네가 직접 알게 될 거야."

무슨 일이 일어날까?`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '도서관 둘러보기', to: 'library-1', cls: 'bg-amber-200' },
        { label: '시장 구경가기', to: 'market-1', cls: 'bg-orange-200' },
        { label: '왕궁 정원 산책', to: 'palace-1', cls: 'bg-purple-200' }
      ],
      prompt: '💭 어떤 취미가 있어?'
    },

    // ===== 도서관 경로 =====
    {
      id: 'library-1',
      title: '책들의 세계',
      text: `도서관을 둘러봤어.

높은 선반에 수천 권의 책!
여행 이야기, 모험 이야기, 지혜 이야기...

한 여자가 책을 읽고 있어.
아름답고 똑똑해 보여.

"안녕? 난 세헤라자데야. 너도 책을 좋아하니?"

너는 고개를 끄덕여.

"나도 이야기를 정말 사랑해. 이야기는 힘이 있거든."

뭘 물어볼까?`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이야기의 힘에 대해 묻기', to: 'library-2-power', cls: 'bg-purple-200' },
        { label: '좋아하는 책 이야기하기', to: 'library-2-books', cls: 'bg-blue-200' }
      ],
      prompt: '💭 좋아하는 책이 있어?'
    },
    {
      id: 'library-2-power',
      title: '이야기의 힘',
      text: `"이야기가 어떤 힘이 있어요?"

세헤라자데가 미소 지어.

"이야기는 화난 사람을 진정시킬 수 있어. 슬픈 사람을 위로하고, 무서운 사람을 용감하게 만들지."

"말로만?"

"응! 좋은 이야기는 검보다 강해. 마음을 바꾸니까."

할아버지가 말했던 것과 같아!

"그래서 난 매일 새로운 이야기를 배워. 언젠가 필요할지 몰라."

왜 그럴까?`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 많은 이야기 듣기', to: 'library-3-learn', cls: 'bg-amber-200' },
        { label: '왜 필요한지 물어보기', to: 'library-3-why', cls: 'bg-orange-200' }
      ],
      prompt: '💭 가장 감명 깊었던 스토리는 뭐야?'
    },
    {
      id: 'library-2-books',
      title: '책 이야기',
      text: `"저는 모험 이야기를 좋아해요!"

세헤라자데가 눈을 반짝여.
"나도! 신드바드의 항해 이야기 알아?"

너는 신나서 이야기해.
알리바바, 마법 양탄자, 요술 램프...

"와, 정말 많이 알고 있구나!"

세헤라자데가 책을 하나 꺼내.

"이 책엔 지혜로운 사람들 이야기가 있어. 힘이 아니라 지혜로 문제를 해결하는 거야."

흥미로워!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '지혜 이야기 듣기', to: 'library-3-wisdom', cls: 'bg-purple-200' },
        { label: '함께 책 읽기', to: 'library-3-read', cls: 'bg-blue-200' }
      ],
      prompt: '💭 힘과 지혜중 무엇이 더 강할까?'
    },
    {
      id: 'library-3-learn',
      title: '이야기 배우기',
      text: `세헤라자데가 여러 이야기를 들려줘.

용감한 영웅, 똑똑한 소녀, 지혜로운 할아버지...

"봐, 이 이야기들엔 공통점이 있어."

"뭐예요?"

"힘으로 이기는 게 아니야. 생각하고, 기지를 발휘하고, 대화하며 문제를 풀지."

"아... 머리를 쓰는 거네요!"

"맞아! 그게 진짜 강한 거야."

갑자기 밖이 소란스러워!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '밖을 확인하기', to: 'library-4-noise', cls: 'bg-red-200' },
        { label: '이야기 계속 듣기', to: 'library-4-continue', cls: 'bg-blue-200' }
      ],
      prompt: '💭 대화로 문제를 해결한 적이 있어?'
    },
    {
      id: 'library-3-why',
      title: '필요한 이유',
      text: `"왜 이야기가 필요할 것 같아요?"

세헤라자데가 잠시 생각해.

"세상엔 힘으로 해결할 수 없는 일이 많아."

"예를 들면요?"

"화난 사람을 진정시키거나, 마음이 닫힌 사람을 열거나... 그럴 땐 좋은 이야기가 필요해."

"이야기가 그렇게 강해요?"

"응. 이야기는 마음에 직접 닿거든."

밖에서 갑자기 소란이!
사람들이 웅성거려.`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무슨 일인지 보러 가기', to: 'library-4-noise', cls: 'bg-orange-200' },
        { label: '세헤라자데와 함께 있기', to: 'library-4-stay', cls: 'bg-purple-200' }
      ],
      prompt: '💭 마음을 움직이는 방법은 무엇일까?'
    },
    {
      id: 'library-3-wisdom',
      title: '지혜의 이야기들',
      text: `세헤라자데가 이야기를 들려줘.

한 소년이 거인을 만났어.
힘으로는 이길 수 없었어.

하지만 재치있는 수수께끼로 거인을 물리쳤어!

"봐, 힘이 아니라 머리를 썼지?"

또 다른 이야기.
공주가 세 가지 시험을 통과했어.
용기도 있었지만, 지혜가 더 중요했어!

"지혜는 누구나 가질 수 있어. 배우기만 하면 돼!"

밖이 갑자기 소란스러워!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '밖 확인하기', to: 'library-4-noise', cls: 'bg-red-200' },
        { label: '지혜 더 배우기', to: 'library-4-more', cls: 'bg-blue-200' }
      ],
      prompt: '💭 알고 있는 재미있는 넌센스 퀴즈가 있어?'
    },
    {
      id: 'library-3-read',
      title: '함께 책 읽기',
      text: `세헤라자데와 함께 책을 읽었어.

"이야기를 읽을 때는 마음으로 읽어야 해."

책 속 주인공이 되어보고,
그 마음을 느껴보고,
교훈을 찾아보고...

"이야기는 거울 같아. 우리 자신을 비춰주지."

너는 고개를 끄덕여.
이야기 속에서 배울 게 많아!

갑자기 밖이 소란스러워!
사람들의 비명과 울음소리...`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무슨 일인지 보기', to: 'library-4-noise', cls: 'bg-orange-200' },
        { label: '세헤라자데 걱정하기', to: 'library-4-worry', cls: 'bg-purple-200' }
      ],
      prompt: '💭 책에서 얻은 교훈이 있어?'
    },
    {
      id: 'library-4-noise',
      title: '왕궁의 비극',
      text: `밖으로 나갔어.

사람들이 울고 있어.
"왕비님이... 왕비님이..."

할아버지가 슬픈 얼굴로 말해.
"왕비님이 왕을 배신했단다. 왕이 크게 상처받으셨어."

"그래서요?"

"왕이 분노에 휩싸였어. 이제 아무도 믿지 않으시겠다고..."

"왕이 무서운 명령을 내리셨어!"

세헤라자데의 얼굴이 창백해져.

무슨 명령일까?`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '명령 내용 듣기', to: 'library-5-decree', cls: 'bg-red-200' }
      ],
      prompt: '💭 어떤 리더가 있으면 좋겠어?'
    },
    {
      id: 'library-4-continue',
      title: '이야기의 마법',
      text: `세헤라자데가 이야기를 계속해.

"이야기엔 마법이 있어. 화난 마음도 풀어주지."

한 왕이 있었어.
너무 화가 나서 아무 말도 듣지 않았어.

하지만 한 현자가 이야기를 들려줬어.
왕은 이야기에 빠져들었고, 화가 풀렸어.

"이야기는 마음의 문을 여는 열쇠야."

밖에서 비명 소리!
"왕이... 왕이..."

세헤라자데가 창백해져.`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무슨 일인지 확인하기', to: 'library-5-decree', cls: 'bg-orange-200' }
      ],
      prompt: '💭 화가 난 사람의 마음을 어떻게 풀면 좋을까?'
    },
    {
      id: 'library-4-stay',
      title: '함께 있기',
      text: `세헤라자데 옆에 있었어.

"괜찮아요. 저도 무서워요."

세헤라자데가 너의 손을 잡아줘.

"고마워. 넌 용감한 친구야."

할아버지가 급하게 들어와.

"세헤라자데! 큰일이야!"

"무슨 일이세요?"

"왕이... 왕이 무서운 명령을 내리셨어!"

세헤라자데의 얼굴이 굳어져.`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '명령 듣기', to: 'library-5-decree', cls: 'bg-red-200' }
      ],
      prompt: '💭 부당한 왕의 명령도 따라야 할까?'
    },
    {
      id: 'library-4-more',
      title: '지혜의 중요성',
      text: `세헤라자데가 말을 이어가.

"지혜로운 사람은 어려운 상황에도 길을 찾아."

"어떻게요?"

"생각하고, 관찰하고, 기회를 기다려. 그리고 적절한 때에 적절한 말을 해."

"말이요?"

"응. 좋은 말 한마디가 백 명의 군사보다 강할 때가 있어."

갑자기 문이 벌컥 열려!
할아버지가 헐떡이며 들어와.

"큰일났어! 왕이..."`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '할아버지 말 듣기', to: 'library-5-decree', cls: 'bg-orange-200' }
      ],
      prompt: '💭 관찰하기와 생각하기 중 무엇을 더 좋아해?'
    },
    {
      id: 'library-4-worry',
      title: '걱정스러운 마음',
      text: `"세헤라자데, 괜찮아요?"

세헤라자데가 창문을 바라봐.

"응... 아니, 사실 걱정돼."

"왜요?"

"왕이 큰 슬픔에 빠지셨다는 소문을 들었어. 왕비님이 배신을 했대."

"그럼요?"

"슬픔이 분노로 바뀔 때가 제일 위험해..."

문이 열리며 할아버지가!

"세헤라자데! 왕이 무서운 명령을 내리셨어!"`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '명령 내용 듣기', to: 'library-5-decree', cls: 'bg-red-200' }
      ],
      prompt: '💭 최근에 슬프거나 화가 난 적 있어?'
    },
    {
      id: 'library-5-decree',
      title: '왕의 명령',
      text: `할아버지가 떨리는 목소리로 말해.

"왕이... 매일 밤 새 신부를 맞이하시겠대. 그리고 다음 날 아침..."

말을 잇지 못해.

세헤라자데가 대신 말해. "처형하시겠다는 거죠?"

할아버지가 고개를 끄덕여.

"왕이 모든 여자를 믿지 못하시게 됐어. 배신당하기 전에 먼저..."

끔찍해!
너는 떨려.

"이럴 수가..."`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '세헤라자데 반응 보기', to: 'convergence-library', cls: 'bg-purple-200' }
      ],
      prompt: '💭 배신감을 느껴본 적이 있어?'
    },
    {
      id: 'convergence-library',
      title: '세헤라자데의 결심',
      text: `세헤라자데가 조용히 말해.

"누군가 이걸 멈춰야 해."

"어떻게요? 왕은 아무 말도 듣지 않으세요!"

"알아. 하지만..."

세헤라자데가 책들을 바라봐.

"이야기로라면 가능할지도 몰라."

"이야기요?"

"응. 왕의 마음을 녹일 수 있는 이야기... 계속되는 이야기..."

너는 깨달았어.
세헤라자데가 뭔가 계획하고 있어!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계획 듣기', to: 'plan-reveal', cls: 'bg-amber-200' }
      ],
      prompt: '💭 계획적으로 실천하는 편이야?'
    },

    // ===== 시장 경로 =====
    {
      id: 'market-1',
      title: '활기찬 시장',
      text: `시장으로 나갔어.

향신료 냄새, 사람들 소리, 노래하는 상인들!

양탄자 파는 곳, 램프 파는 곳, 과일 파는 곳...

한 이야기꾼이 사람들을 모아놓고 이야기 중이야.

"옛날 옛적에..."

사람들이 숨죽이며 들어.

이야기꾼 옆에 예쁜 여자가 있어.
관심있게 듣고 있어.

뭘 할까?`,
      bg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이야기 듣기', to: 'market-2-story', cls: 'bg-orange-200' },
        { label: '여자에게 다가가기', to: 'market-2-woman', cls: 'bg-purple-200' }
      ],
      prompt: '💭 시장이나 마트에 가는 것을 좋아해?'
    },
    {
      id: 'market-2-story',
      title: '이야기꾼의 재주',
      text: `이야기를 들었어.

신드바드가 거대한 새를 만났대!
목숨이 위험했지만, 재치로 빠져나왔어.

사람들이 환호해!
"와!" "대단해!"

이야기꾼이 미소 지어.

"이야기는 마법이죠. 듣는 사람을 다른 세계로 데려가니까!"

옆 여자가 끄덕여.

"맞아요. 이야기는 힘이 있어요."

너는 그 여자를 봤어.
세헤라자데야!`,
      bg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '세헤라자데와 이야기하기', to: 'market-3-talk', cls: 'bg-purple-200' },
        { label: '이야기 더 듣기', to: 'market-3-listen', cls: 'bg-blue-200' }
      ],
      prompt: '💭 문제를 재치로 해결한 적이 있어? '
    },
    {
      id: 'market-2-woman',
      title: '세헤라자데 만남',
      text: `여자에게 다가갔어.

"안녕? 난 세헤라자데야."

"저는 ${name.full}이에요. 왕궁 도서관에서 일해요!"

"아, 그래? 난 이야기를 정말 좋아해서 여기 왔어."

이야기꾼이 계속 이야기해.
알리바바와 40인의 도적!

"봐, 알리바바는 힘이 세지 않았어. 하지만 똑똑했지. '열려라 참깨!'를 기억했거든."

"머리를 쓴 거네요!"

"그래. 지혜가 힘보다 강해!"`,
      bg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '지혜에 대해 이야기하기', to: 'market-3-wisdom', cls: 'bg-amber-200' },
        { label: '시장 구경하기', to: 'market-3-walk', cls: 'bg-orange-200' }
      ],
      prompt: '💭 도서관에 자주 가는 편이야?'
    },
    {
      id: 'market-3-talk',
      title: '이야기의 힘',
      text: `"이야기가 정말 힘이 있어요?"

세헤라자데가 사람들을 가리켜.

"봐. 저 사람들, 모두 다른 생각하고 있었을 거야. 걱정도 하고, 화도 났을 거고..."

"근데요?"

"이야기 하나로 모두 같은 곳을 보고 있어. 웃고, 긴장하고, 함께 느끼고 있지."

정말 그래!
모두 이야기에 빠져있어.

"이야기는 사람들을 하나로 만들어. 그게 힘이야."

신기해!`,
      bg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 배우기', to: 'market-4-learn', cls: 'bg-purple-200' },
        { label: '시장 구경하기', to: 'market-4-explore', cls: 'bg-orange-200' }
      ],
      prompt: '💭 웃긴 이야기와 감동적인 이야기 중 어떤 쪽이 좋아?'
    },
    {
      id: 'market-3-listen',
      title: '이야기의 교훈',
      text: `이야기꾼이 계속해.

"그래서 알리바바는 도둑들을 이겼어요. 힘이 아니라 지혜로!"

사람들이 박수쳐!

세헤라자데가 말해.
"좋은 이야기엔 항상 교훈이 있어."
"이 이야기는 '기회를 잘 포착하라'는 거야. 그리고 '머리를 써라'는 거고."

"이야기로 배우는구나!"

"맞아. 재미있게 배울 수 있지!"

갑자기 시장이 소란스러워!`,
      bg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무슨 일인지 보기', to: 'market-4-commotion', cls: 'bg-red-200' },
        { label: '세헤라자데와 함께 있기', to: 'market-4-stay', cls: 'bg-purple-200' }
      ],
      prompt: '💭교훈을 실천으로 옮긴 적이 있어? '
    },
    {
      id: 'market-3-wisdom',
      title: '지혜의 가치',
      text: `"지혜가 힘보다 강하다니 신기해요."

세헤라자데가 설명해.
"힘은 한 번만 써. 하지만 지혜는 계속 쓸 수 있어."

"어떻게요?"

"힘으로 이기면 끝이야. 하지만 지혜로 이기면 다음에도 쓸 수 있지. 그리고 다른 사람도 배울 수 있어!"

아, 이해했어!

"그래서 이야기가 중요한 거야. 지혜를 전하니까!"

갑자기 소란이!

"왕궁에서 전령이!"`,
      bg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '전령 보기', to: 'market-4-herald', cls: 'bg-orange-200' },
        { label: '세헤라자데 걱정하기', to: 'market-4-worry', cls: 'bg-purple-200' }
      ],
      prompt: '💭 가장 의미 있는 지혜가 담긴 책은 뭐였어?'
    },
    {
      id: 'market-3-walk',
      title: '시장 구경',
      text: `세헤라자데와 시장을 걸었어.

"여기 봐. 양탄자 파는 곳!"

화려한 양탄자들!

"저 양탄자 이야기 알아? 마법 양탄자가 하늘을 난대!"

다음은 램프 가게.

"요술 램프 이야기도 있어. 지니가 나와서 소원을 들어주지!"

"이야기는 희망을 줘요?"

"맞아!"

갑자기 전령이!`,
      bg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '전령 말 듣기', to: 'market-4-herald', cls: 'bg-red-200' }
      ],
      prompt: '💭 희망을 느낀 이야기가 있어?'
    },
    {
      id: 'market-4-learn',
      title: '이야기꾼에게 배우기',
      text: `이야기꾼에게 물었어.

"어떻게 그렇게 재미있게 이야기해요?"

"비결이 있지! 첫째, 듣는 사람을 봐. 둘째, 목소리를 바꿔. 셋째, 적절한 곳에서 멈춰!"

"멈춰요?"

"응! 제일 궁금할 때 멈추는 거야. 그럼 다음이 더 듣고 싶어지거든!"
세헤라자데가 눈을 반짝여.

'그 방법... 중요할 것 같아!'

갑자기 전령이 와!`,
      bg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '전령 듣기', to: 'market-4-herald', cls: 'bg-orange-200' }
      ],
      prompt: '💭 최근에 가장 중요하게 느낀 소식은 뭐야?'
    },
    {
      id: 'market-4-explore',
      title: '사람들의 이야기',
      text: `시장 곳곳을 다녔어.

상인들도 이야기를 해.
"이 향신료는 먼 나라에서 왔어요!"

할머니도 이야기를 해.
"옛날에 내가 어렸을 때..."

"봐, 모두가 이야기를 가지고 있어."

세헤라자데가 말해.
"이야기는 사람을 이어주는 다리야. 시간도, 장소도 연결해."

갑자기 나팔 소리!
왕궁 전령이야!

사람들이 모여들어.`,
      bg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '전령 말 듣기', to: 'market-4-herald', cls: 'bg-red-200' }
      ],
      prompt: '💭 다른 나라 역사에 관심이 있어?'
    },
    {
      id: 'market-4-commotion',
      title: '소란의 원인',
      text: `사람들이 웅성거려.

"왕궁에서 큰일났대!"
"왕비님이..."
"왕이 화나셨대!"

세헤라자데의 얼굴이 굳어져.

너는 물었어.
"무슨 일이에요?"

"왕비님이 왕을 배신했대..."

"그럼요?"

"왕이... 아마 큰 결정을 내리실 거야."

전령이 나타나! 무슨 발표를 할까?`,
      bg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '발표 듣기', to: 'market-5-decree', cls: 'bg-orange-200' }
      ],
      prompt: '💭 최근 가장 중요한 결정은 뭐였어?'
    },
    {
      id: 'market-4-stay',
      title: '함께 있기',
      text: `세헤라자데 옆에 있었어.

"괜찮아요?"

"응... 걱정돼."

사람들이 계속 웅성거려.
왕궁에서 큰일이 났다는 소문.

"왕이 배신당하셨대."
"왕비님이..."

세헤라자데가 한숨 쉬어.
"슬픔이 분노로 바뀌면... 무서운 일이 생겨."

전령이 나타나!
나팔을 불어.

"왕의 명령을 전하노라!"`,
      bg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '명령 듣기', to: 'market-5-decree', cls: 'bg-red-200' }
      ],
      prompt: '💭 선생님이나 부모님이 화나신 적이 있어?'
    },
    {
      id: 'market-4-herald',
      title: '왕궁 전령',
      text: `전령이 나팔을 불어!

사람들이 모두 모여.

"왕의 명령을 전하노라!"

모두 숨죽여.

"왕비님의 배신으로 인해, 왕께서는 큰 슬픔에 빠지셨다!"

사람들이 웅성거려.

세헤라자데가 너의 손을 꽉 잡아.
"무슨 명령일까..."

전령이 두루마리를 펴!`,
      bg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '명령 내용 듣기', to: 'market-5-decree', cls: 'bg-orange-200' }
      ],
      prompt: '💭 최근 가장 슬펐던 뉴스는 뭐야?'
    },
    {
      id: 'market-4-worry',
      title: '걱정되는 마음',
      text: `세헤라자데가 걱정스러워 보여.

"왜 그래요?"

"왕이... 상처를 받으셨어. 깊은 상처를."

"그럼요?"

"상처받은 사람은 때로 무서운 결정을 해..."

전령이 나타나!

"왕의 명령!"

사람들이 모여들어.

세헤라자데가 떨어.

무슨 명령일까?`,
      bg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '전령 듣기', to: 'market-5-decree', cls: 'bg-red-200' }
      ],
      prompt: '💭 최근 가장 상처받은 일은 뭐야?'
    },
    {
      id: 'market-5-decree',
      title: '끔찍한 명령',
      text: `전령이 크게 외쳐!

"왕께서 명하시노라! 오늘부터 매일 밤 새 신부를 맞이하시고, 다음 날 아침 처형하시겠다!"

사람들이 비명을 질러!
"안 돼!" "이럴 수가!"

세헤라자데가 창백해져.

너는 떨려.
"왜... 왜 그런 명령을..."

"왕이 아무도 믿지 못하시게 됐어. 배신당하기 전에 먼저..."

끔찍해!

시장이 울음바다가 됐어.`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '세헤라자데 보기', to: 'convergence-market', cls: 'bg-purple-200' }
      ],
      prompt: '💭 사형제도는 필요할까?'
    },
    {
      id: 'convergence-market',
      title: '세헤라자데의 각오',
      text: `세헤라자데가 조용히 말해.

"이걸 멈춰야 해."

"어떻게요? 왕은 분노에 휩싸였어요!"

세헤라자데가 너를 봐.
"아까 이야기꾼이 뭐라고 했지?"

"가장 궁금할 때 멈추라고..."

"맞아! 이야기를 계속 듣고 싶게 만드는 거!"

너는 깨달았어!
"설마... 왕에게 이야기를?"

세헤라자데가 고개를 끄덕여.`,
      bg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계획 듣기', to: 'plan-reveal', cls: 'bg-amber-200' }
      ],
      prompt: '💭 다음 이야기가 궁금해진 적이 있어?'
    },

    // ===== 왕궁 경로 =====
    {
      id: 'palace-1',
      title: '왕궁 정원',
      text: `왕궁 정원을 산책했어.

아름다운 꽃들, 분수, 새들...

멀리 왕비님이 계셔.
슬퍼 보여.

시녀 하나가 옆에 있어.
예쁘고 똑똑해 보이는 여자야.

"저기, ${name.full}! 여기 와봐!"

세헤라자데야!
왕비님의 시녀였구나!

뭘 할까?`,
      bg: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '세헤라자데와 이야기하기', to: 'palace-2-talk', cls: 'bg-purple-200' },
        { label: '왕비님 관찰하기', to: 'palace-2-observe', cls: 'bg-blue-200' }
      ],
      prompt: '💭 예쁜 것과 똑똑한 것 중 무엇이 더 좋을까?'
    },
    {
      id: 'palace-2-talk',
      title: '세헤라자데와 대화',
      text: `"안녕, 세헤라자데!"

"${name.full}! 오랜만이야!"

세헤라자데는 왕비님의 시녀야.
똑똑하고 책을 많이 읽어.

"요즘 걱정이 많아 보여요."

"응... 왕비님이 슬퍼하셔."

"왜요?"

"왕과의 사이가 좋지 않아. 오해가 있는 것 같아..."

세헤라자데가 한숨 쉬어.
"말로 풀 수 있는 일인데. 대화가 필요해."`,
      bg: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '대화의 중요성 듣기', to: 'palace-3-communication', cls: 'bg-purple-200' },
        { label: '왕궁 둘러보기', to: 'palace-3-tour', cls: 'bg-orange-200' }
      ],
      prompt: '💭 오해는 말로 다 풀 수 있을까?'
    },
    {
      id: 'palace-2-observe',
      title: '왕비님 관찰',
      text: `왕비님을 멀리서 봤어.

정말 슬퍼 보여.
혼자 앉아서 꽃을 바라봐.

세헤라자데가 말해.

"왕비님은 좋은 분이야. 하지만 왕과 대화가 안 돼."

"왜요?"

"왕은 바쁘시고, 왕비님은 외로워하시고... 서로 마음을 나누지 못해."

"그럼 오해가 생기겠네요!"

"맞아. 말하지 않으면 알 수 없거든."

갑자기 소란이!`,
      bg: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무슨 일인지 보기', to: 'palace-3-commotion', cls: 'bg-red-200' },
        { label: '세헤라자데와 함께 있기', to: 'palace-3-stay', cls: 'bg-purple-200' }
      ],
      prompt: '💭 말하지 않아도 마음이 통할 수 있을까?'
    },
    {
      id: 'palace-3-communication',
      title: '대화의 힘',
      text: `"대화가 그렇게 중요해요?"

세헤라자데가 고개를 끄덕여.

"대화는 마음을 이어주는 다리야. 오해를 풀고, 진심을 전하고, 함께 해결책을 찾지."

"말 한마디로요?"

"응! 좋은 말 한마디가 관계를 살려. 나쁜 말 한마디가 관계를 망치고."

"그래서 잘 말해야 하는구나!"

"맞아. 그리고 잘 들어야 해!"

갑자기 비명 소리!
"왕비님이!"`,
      bg: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무슨 일인지 확인', to: 'palace-4-crisis', cls: 'bg-red-200' },
        { label: '세헤라자데 따라가기', to: 'palace-4-follow', cls: 'bg-orange-200' }
      ],
      prompt: '💭 말 때문에 관계가 나빠진 적이 있어?'
    },
    {
      id: 'palace-3-tour',
      title: '왕궁 구경',
      text: `세헤라자데와 왕궁을 돌았어.

"여기가 왕의 집무실이야."

큰 방에 지도와 책들!

"왕은 나라 걱정을 많이 하셔. 하지만 외로워하시기도 해."

"왕도 외로워요?"

"높은 곳에 있으면 더 외로워. 마음 나눌 사람이 적거든."

"그래서 왕비님이 중요하겠네요!"

"맞아..."

갑자기 소란!

"왕비님!"`,
      bg: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '달려가기', to: 'palace-4-crisis', cls: 'bg-red-200' }
      ],
      prompt: '💭 외로움을 느낀 적이 있어?'
    },
    {
      id: 'palace-3-commotion',
      title: '왕궁의 소란',
      text: `정원 쪽에서 소리가!

경비병들이 뛰어와.
"왕비님을!"

세헤라자데가 창백해져.

"무슨 일이에요?"

경비병이 말해.
"왕비님이... 배신을!"

"거짓말이에요! 왕비님은 그런 분이 아니에요!"

하지만 경비병들은 듣지 않아.

왕이 나타나!
얼굴이 차갑고 화나 보여.

긴장돼...`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '상황 지켜보기', to: 'palace-4-witness', cls: 'bg-orange-200' },
        { label: '세헤라자데 걱정하기', to: 'palace-4-worry', cls: 'bg-purple-200' }
      ],
      prompt: '💭 거짓말을 하면 어떤 특징이 나타날까?'
    },
    {
      id: 'palace-3-stay',
      title: '함께 있기',
      text: `세헤라자데 옆에 있었어.

경비병들이 뛰어와!
"왕비님을 데려가라!"

"안 돼요!" 세헤라자데가 외쳐.

하지만 막을 수 없어.

왕비님이 끌려가.
"난 억울해! 아무것도 안 했어!"

왕이 나타나.
얼굴이 차갑고 분노로 가득해.

"배신자를 용서하지 않겠다!"

너는 떨려.
왕이 무서워 보여.`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '왕 보기', to: 'palace-4-witness', cls: 'bg-red-200' },
        { label: '세헤라자데 보기', to: 'palace-4-worry', cls: 'bg-purple-200' }
      ],
      prompt: '💭 억울한 일을 당한 적이 있어?'
    },
    {
      id: 'palace-4-crisis',
      title: '왕의 분노',
      text: `왕이 서 있어.

얼굴이 차갑고 분노로 가득해.
"왕비가 나를 배신했다!"

신하들이 떨어.

"이제 아무도 믿지 않겠다!"

왕비님이 울며 말해.
"전하, 오해예요!"

하지만 왕은 듣지 않아.
"충분히 들었다! 더는 속지 않겠다!"

세헤라자데가 너의 손을 잡아.
떨고 있어.

왕의 상처가 깊어 보여.`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '왕의 명령 듣기', to: 'palace-5-decree', cls: 'bg-red-200' }
      ],
      prompt: '💭 남에게 속았다고 느낀 적이 있어?'
    },
    {
      id: 'palace-4-follow',
      title: '세헤라자데 따라가기',
      text: `세헤라자데를 따라갔어.

왕비님이 끌려가고 있어.

왕이 연회장에 서 있어.
신하들을 모아놓고.

"사랑도, 믿음도 필요 없다!"
목소리가 차가워.

세헤라자데가 눈물을 흘려.

"왕이... 완전히 달라지셨어."

상처가 왕을 바꿔버렸어.`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '왕의 선언 듣기', to: 'palace-5-decree', cls: 'bg-orange-200' }
      ],
      prompt: '💭 상처를 받은 사람은 어떻게 달라질까?'
    },
    {
      id: 'palace-4-witness',
      title: '비극의 목격',
      text: `왕이 선언해.

"왕비를 폐위한다!"

사람들이 놀라.

왕비님이 울어.
"전하..."

왕이 돌아서.
"다시는 배신당하지 않을 것이다!"

세헤라자데가 속삭여.
"왕의 마음이 닫혔어. 슬픔이 분노로 바뀐 거야."

"어떻게 하면 되요?"

"마음을 다시 열어야 해. 하지만..."

왕이 다시 말해!`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '왕의 다음 말 듣기', to: 'palace-5-decree', cls: 'bg-red-200' }
      ],
      prompt: '💭 닫힌 마음을 열려면 어떻게 해야 할까?'
    },
    {
      id: 'palace-4-worry',
      title: '세헤라자데의 눈물',
      text: `세헤라자데가 울고 있어.

"왕이... 너무 상처받으셨어. 그래서 아무 말도 듣지 않으시는 거야."

"그럼 어떻게 해요?"

"상처받은 마음은 시간과 이해가 필요해. 그리고..."

"그리고요?"

"좋은 이야기가 필요해. 마음을 녹일 수 있는..."

왕이 다시 외쳐!`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '왕의 외침 듣기', to: 'palace-5-decree', cls: 'bg-orange-200' }
      ],
      prompt: '💭 정말 시간이 약일까?'
    },
    {
      id: 'palace-5-decree',
      title: '무서운 선언',
      text: `왕이 크게 선언해!

"오늘부터 매일 밤 새 신부를 맞이하겠다! 그리고 다음 날 아침, 처형하겠다!"

모두가 충격에 빠져!

"전하, 안 됩니다!"
"너무 가혹합니다!"

하지만 왕은 듣지 않아.

"나를 배신하기 전에 내가 먼저 끝낼 것이다!"

세헤라자데가 창백해져.

너도 떨려.
끔찍한 명령이야...`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '세헤라자데 보기', to: 'convergence-palace', cls: 'bg-purple-200' }
      ],
      prompt: '💭 상처 입을까봐 먼저 상처를 줘도 될까? '
    },
    {
      id: 'convergence-palace',
      title: '세헤라자데의 결심',
      text: `왕이 사라진 후.

세헤라자데가 조용히 말해.
"이대로 둘 순 없어."

"하지만 왕은 아무 말도 듣지 않으세요!"

세헤라자데가 너를 봐.
"이야기라면 다를 거야."

"이야기요?"

"응. 왕의 마음에 직접 닿는 이야기. 계속 듣고 싶은 이야기..."

너는 깨달았어!

"설마..."`,
      bg: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계획 듣기', to: 'plan-reveal', cls: 'bg-amber-200' }
      ],
      prompt: '💭 말과 이야기는 어떤 차이가 있을까?'
    },

    // ===== 계획 공개 및 결말 =====
    {
      id: 'plan-reveal',
      title: '세헤라자데의 계획',
      text: `"내가 왕에게 가겠어."

"안 돼요! 그럼 다음 날..."

세헤라자데가 미소 지어.
"그래서 이야기를 하는 거야. 밤새 이야기를 들려주고, 가장 재미있는 순간에 멈추는 거지."

"왜요?"

"왕이 다음이 궁금해서 하루를 더 기다리시게!"

"그리고 또 이야기하고, 또 멈추고..."

대단한 계획이야!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '걱정하기', to: 'plan-worry', cls: 'bg-red-200' },
        { label: '도와주겠다고 하기', to: 'plan-help', cls: 'bg-blue-200' }
      ],
      prompt: '💭 계획한 대로 일이 풀리지 않으면 어떻게 해야 할까?'
    },
    {
      id: 'plan-worry',
      title: '걱정스러운 마음',
      text: `"너무 위험해요!"

세헤라자데가 너의 손을 잡아.
"알아. 하지만 누군가는 해야 해."

"만약 실패하면..."

"실패하지 않을 거야. 난 많은 이야기를 알아. 매일 새로운 이야기를 들려줄 수 있어!"

"그래도..."

"${name.full}, 이야기는 힘이 있어. 왕의 마음을 녹일 수 있어."

세헤라자데의 눈이 반짝여.
용기와 지혜가 보여!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '응원하기', to: 'support-1', cls: 'bg-green-200' },
        { label: '함께 준비하기', to: 'prepare-1', cls: 'bg-purple-200' }
      ],
      prompt: '💭 용기와 지혜 중 무엇이 더 중요할까?'
    },
    {
      id: 'plan-help',
      title: '도움의 손',
      text: `"제가 도와줄게요!"

세헤라자데가 고마워해.
"정말? 어떻게?"

"책도 찾고 이야기 정리도 도와드릴게요!"

"와, 고마워!"

"책에는 수많은 이야기가 있어요. 모험, 지혜, 사랑, 우정..."

"좋아! 다양한 이야기가 필요해."

둘이서 계획을 짜!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이야기 준비하기', to: 'prepare-2', cls: 'bg-amber-200' },
        { label: '전략 짜기', to: 'strategy-1', cls: 'bg-purple-200' }
      ],
      prompt: '💭 누군가를 열심히 도와준 적이 있어?'
    },
    {
      id: 'support-1',
      title: '용기에 대한 응원',
      text: `"세헤라자데, 당신은 정말 용감해요!"

세헤라자데가 미소 지어.
"용기는 두렵지 않은 게 아니야. 두려워도 행동하는 거지."

"저도 두려워요. 하지만 당신을 믿어요!"

"고마워. 네 응원이 힘이 돼."

세헤라자데가 책들을 바라봐.
"이 이야기들이 나를 도와줄 거야. 수천 년 동안 전해진 지혜니까."

"이야기가 정말 힘이 있네요!"

"그래. 이야기는 마법이야!"`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이야기 선택 돕기', to: 'prepare-3', cls: 'bg-blue-200' },
        { label: '마음 다지기', to: 'final-preparation', cls: 'bg-purple-200' }
      ],
      prompt: '💭 아주 오래 된 이야기가 현재에도 의미 있을까?'
    },
    {
      id: 'prepare-1',
      title: '이야기 모으기',
      text: `도서관에서 함께 책을 찾았어.

"신드바드의 모험!"
"알리바바 이야기!"
"마법 양탄자!"

세헤라자데가 메모해.
"첫날은 신나는 모험 이야기로 시작할게. 왕의 관심을 끌어야 하니까."

"그 다음엔요?"

"지혜 이야기, 우정 이야기... 다양하게!"

"그리고 항상 제일 궁금한 순간에 멈추는 거죠?"

"맞아!"

준비가 되어가!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이야기 순서 정하기', to: 'strategy-2', cls: 'bg-orange-200' },
        { label: '연습하기', to: 'practice-1', cls: 'bg-blue-200' }
      ],
      prompt: '💭 모험, 지혜, 우정 이야기 중 무엇이 가장 끌려?'
    },
    {
      id: 'prepare-2',
      title: '이야기 분류하기',
      text: `너는 이야기를 분류했어.
"모험 이야기는 신나고 흥미로워요!"
"지혜 이야기는 생각하게 만들어요!"
"우정 이야기는 마음이 따뜻해져요!"

세헤라자데가 고개를 끄덕여.
"완벽해! 왕의 감정에 따라 이야기를 들려줄 수 있어."

"화나셨을 때는?"

"진정시키는 지혜 이야기!"

"슬퍼하실 때는?"

"위로가 되는 우정 이야기!",

대단한 전략이야!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '전략 더 세우기', to: 'strategy-3', cls: 'bg-purple-200' },
        { label: '연습 시작하기', to: 'practice-2', cls: 'bg-blue-200' }
      ],
      prompt: '💭 무언가를 위해 전략을 세워본 적이 있어?'
    },
    {
      id: 'strategy-1',
      title: '이야기 전략',
      text: `세헤라자데가 전략을 설명해.

"첫째, 흥미롭게 시작해서 왕의 관심을 끌어."

"둘째, 감정을 담아서 몰입하게 만들어."

"셋째, 교훈을 자연스럽게 전해."

"넷째, 가장 궁금한 순간에 멈춰!"

"그럼 왕이 다음을 듣고 싶어하시겠네요!"

"맞아! 그게 핵심이야!"

너는 감탄해.
정말 똑똑한 계획이야!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이야기 고르기', to: 'prepare-3', cls: 'bg-amber-200' },
        { label: '마무리 준비', to: 'final-preparation', cls: 'bg-purple-200' }
      ],
      prompt: '💭 몇번 째 단계가 가장 중요한 것 같아?'
    },
    {
      id: 'prepare-3',
      title: '첫 번째 이야기',
      text: `"첫날 어떤 이야기를 할 거예요?"

세헤라자데가 생각해.
"신드바드의 첫 번째 항해! 젊은 선원이 모험을 떠나는 이야기야."

"왜 그걸로?"

"왕도 젊었을 때 모험을 꿈꿨을 거야. 공감하실 수 있어."

"그리고 신드바드는 어려움을 지혜로 이겨내죠!"

"맞아! 힘이 아니라 지혜로!"

완벽한 선택이야!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '연습해보기', to: 'practice-3', cls: 'bg-blue-200' },
        { label: '최종 준비', to: 'final-preparation', cls: 'bg-green-200' }
      ],
      prompt: '💭 공감하게 만들려면 어떻게 해야 할까? '
    },
    {
      id: 'strategy-2',
      title: '순서의 중요성',
      text: `이야기 순서를 정했어.

"1-3일차: 흥미로운 모험 이야기로 관심 끌기!"
"4-10일차: 지혜 이야기로 생각하게 만들기!"
"11일 이후: 다양한 이야기로 마음 변화시키기!"

세헤라자데가 고개를 끄덕여.

"좋아! 천천히 왕의 마음을 녹이는 거지."

"한 번에 바꾸려 하면 안 되죠?"

"맞아. 조금씩, 매일매일..."

인내심이 필요해!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이야기 연습', to: 'practice-3', cls: 'bg-blue-200' },
        { label: '마음 준비', to: 'final-preparation', cls: 'bg-purple-200' }
      ],
      prompt: '💭 인내심을 가지고 이겨낸 적이 있어?'
    },
    {
      id: 'practice-1',
      title: '이야기 연습',
      text: `세헤라자데가 연습해.

"옛날 옛적, 바그다드에..."
목소리가 신비로워!

"신드바드라는 젊은이가 있었습니다..."

너는 빠져들어. 정말 재미있어!

"그가 배를 타고 떠났는데... 갑자기 폭풍이!"

"어떻게 됐어요?"

세헤라자데가 웃어.
"바로 여기서 멈추는 거야!"

"아! 다음이 궁금해요!"

"그게 핵심이야!"`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 연습하기', to: 'practice-4', cls: 'bg-blue-200' },
        { label: '준비 완료', to: 'final-preparation', cls: 'bg-green-200' }
      ],
      prompt: '💭 신드바드의 모험 이야기를 알아?'
    },
    {
      id: 'practice-2',
      title: '감정 담기',
      text: `"이야기할 때 가장 중요한 게 뭐예요?"

세헤라자데가 말해.
"감정을 담는 거야. 그냥 이야기 하는 게 아니라, 느끼면서 하는 거지."

세헤라자데가 시범을 보여.

신드바드가 폭풍을 만났을 때 - 목소리가 떨려!
보물을 발견했을 때 - 목소리가 신나!
친구를 잃었을 때 - 목소리가 슬퍼!

"와! 정말 그 장면이 보이는 것 같아요!"

"그게 좋은 이야기야!"`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '감정 연습', to: 'practice-4', cls: 'bg-orange-200' },
        { label: '최종 점검', to: 'final-preparation', cls: 'bg-purple-200' }
      ],
      prompt: '💭 감정이 목소리나 표정에 잘 드러나는 편이야? '
    },
    {
      id: 'practice-3',
      title: '멈추는 기술',
      text: `"어디서 멈춰야 할까요?"

세헤라자데가 설명해.
"가장 긴장되는 순간! 위험한 순간, 선택의 순간, 비밀이 밝혀지기 직전..."

"예를 들면요?"

"'신드바드가 동굴에 들어갔습니다. 그런데 갑자기...' 여기서 멈춰!"

"아! 뭐가 있는지 너무 궁금해요!"

"바로 그거야! 왕도 그렇게 느끼실 거야!"

완벽한 기술이야!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다시 연습', to: 'practice-4', cls: 'bg-blue-200' },
        { label: '준비 끝', to: 'final-preparation', cls: 'bg-green-200' }
      ],
      prompt: '💭 나만의 특기나 재능이 있어?'
    },
    {
      id: 'strategy-3',
      title: '왕의 마음 읽기',
      text: `세헤라자데가 말해.
"왕의 상태를 읽는 게 중요해."

"어떻게요?"

"화나셨으면 진정시키는 이야기, 슬프시면 위로하는 이야기, 지루하시면 재미있는 이야기!"

"왕의 마음에 맞춰서!"

"맞아! 그리고 교훈을 담아. '믿음의 가치', '용서의 힘'..."

"조금씩 왕의 마음을 녹이는 거네요!"

"바로 그거야!"

지혜로운 계획이야!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '연습 시작', to: 'practice-4', cls: 'bg-blue-200' },
        { label: '최종 준비', to: 'final-preparation', cls: 'bg-green-200' }
      ],
      prompt: '💭 상대방의 마음을 잘 알아채는 편이야?'
    },
    {
      id: 'practice-4',
      title: '완벽한 연습',
      text: `세헤라자데가 처음부터 끝까지 연습했어.

시작 - 흥미롭게!
중간 - 감정 가득!
끝 - 가장 궁금한 순간에 멈춤!

너는 박수쳐!

"완벽해요!"

세헤라자데가 미소 지어.
"많이 연습했어. 이제 준비됐어!"

"왕의 마음을 꼭 녹이실 수 있을 거예요!"

"응. 이야기의 힘을 믿어!"

드디어 준비가 끝났어!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '마지막 점검', to: 'final-preparation', cls: 'bg-purple-200' }
      ],
      prompt: '💭 준비를 철저하게 하는 편이야?'
    },
    {
      id: 'final-preparation',
      title: '떠나기 전',
      text: `세헤라자데가 왕궁으로 가기 전.

너와 마주봤어.
"고마워. 네가 없었으면 못 했을 거야."

"전 아무것도..."

"아니야. 넌 나를 도와주고, 응원해주고, 함께 준비해줬어. 그게 큰 힘이 됐어."

세헤라자데가 손을 잡아.
"이야기는 혼자 만드는 게 아니야. 함께 만드는 거야."

너는 고개를 끄덕여.

"세헤라자데, 꼭 성공하세요!"`,
      bg: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '첫 밤 지켜보기', to: 'first-night', cls: 'bg-purple-200' }
      ],
      prompt: '💭 누군가와 팀을 이뤄서 좋았던 경험이 있어?'
    },
    {
      id: 'first-night',
      title: '첫 번째 밤',
      text: `밤이 되었어.

세헤라자데가 왕 앞에 섰어.
왕은 차갑고 무서워 보여.

"이야기를 들려드리고 싶습니다."

"필요 없다."

"제 이야기는 특별합니다. 전하께서 한 번도 들어보지 못한..."

왕이 잠시 멈춰.
"좋다. 들어보지. 하지만 지루하면..."

세헤라자데가 이야기를 시작했어!

너는 멀리서 기도했어.`,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '첫 아침 보기', to: 'first-morning', cls: 'bg-amber-200' }
      ],
      prompt: '💭 누군가를 위해 기도해 본 적이 있어?'
    },
    {
      id: 'first-morning',
      title: '첫 번째 아침',
      text: `동이 텄어.

너는 초조하게 기다렸어.
세헤라자데가 나왔어! 살아있어!

"어떻게 됐어요?"

"성공했어! 왕이 이야기에 빠져드셨어. 그리고 가장 궁금한 순간에 멈췄지."

"그랬더니요?"

"왕이 말씀하셨어. '내일 밤, 계속 들려달라'고!"

너는 기뻐서 뛰었어!
"성공이에요!"

"첫 번째 성공이야. 이제 시작이지!"`,
      bg: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속되는 이야기', to: 'ending', cls: 'bg-purple-200' }
      ],
      prompt: '💭 첫 성공을 해서 성취감을 느껴 본 적이 있어?'
    },
    {
      id: 'ending',
      title: '천 하루 밤의 시작',
      text: `그날 밤부터 세헤라자데의 이야기가 시작됐어.

밤마다 새로운 이야기!

매번 가장 궁금한 순간에 멈추고,
다음 날 밤 계속되는 이야기.

왕은 조금씩 변하기 시작했어.
차가운 눈빛이 따뜻해지고,
이야기에 빠져드는 모습이 보여.

세헤라자데가 말했어.
"이야기는 마음을 움직이는 힘이 있어. 천 하루 밤 동안, 계속될 거야."

**📚 《아라비안 나이트》에는 세헤라자데가 왕에게 들려준 이야기들이 가득해!**

도서관이나 서점에서 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '🔄 다시 시작하기', to: 'start', cls: 'bg-purple-300' }
      ],
      prompt: '🌙 좋은 책을 많이 읽고, 다른 사람들에게 정보와 감동을 주는 글을 쓰는 것은 정말 멋진 일이야!  - 《아라비안 나이트》를 읽고 독서 감상문을 써보자!'
    }
  ];
}

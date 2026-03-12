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
    아야: `${firstName}아`,
  };
}

export function generateGangrimStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '3천 년을 살 수 있다면',
      text: `조선시대, 광양 땅 김치고을.

너의 이름은 ${name.full}.

무려 3천 년을 살아온 존재지.
사람들에게는 '동방삭'이라고도 불려.

저승 차사들은 너를 데려가려 하지만,
너는 둔갑술로 모습을 바꾸며 도망쳤어.

오늘도 차사의 기운이 느껴져.
서둘러 피해야 해!`,
      bg: 'https://images.unsplash.com/photo-1528353518104-dbd48bee7bc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '시장 속으로 숨는다', to: 'hide_market', cls: 'bg-blue-200' },
        { label: '떡집 주인으로 변신한다', to: 'transform_shop', cls: 'bg-purple-200' }
      ],
      prompt: '💭 영원히 살 수 있으면, 삶의 의미는 무엇일까?'
    },
    {
      id: 'hide_market',
      title: '북적이는 시장',
      text: `시장은 사람들로 가득해.

"싱싱한 생선이오!"
"맛있는 떡 사세요!"

다양한 직업을 가진 사람들이 일하고 있어.

생선 장수, 떡 장수, 옷감 장수...

문득 생각해.
'나는 3천 년을 살았지만,
어떤 직업이 잘 어울리는지 모르겠어.'

그때, 뒤에서 차가운 기운이 느껴져.
저승 차사야!`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93',
      choices: [
        { label: '떡집 주인으로 변신한다', to: 'transform_shop', cls: 'bg-purple-200' },
        { label: '도술로 사라진다', to: 'disappear', cls: 'bg-red-200' }
      ],
      prompt: '💭 직업이 그 사람을 정의할 수 있을까?'
    },
    {
      id: 'transform_shop',
      title: '이싱한 떡가게, 동방삭네 떡집',
      text: `"얍!" 둔갑술을 썼어.

순식간에 낡은 떡집이 나타났어.

이상한 떡 가게
[동방삭네 떡집]의 주인이 된거야.

"게획에도 없이 급히 차린 떡집이지만... 
내가 3천 년간 배운 지혜를 떡에 담아 
손님들을 행복하게 만드는 장사를 하자."

선반에는 여러 종류의 떡이 놓였어.
백설기, 송편, 인절미, 꿀떡, 약식...

각각의 떡에는 특별한 힘이 담겨 있어.
사람의 적성을 찾고, 능력을 길러주는 힘.`,
      bg: 'https://images.unsplash.com/photo-1747228469031-c5fc60b9d9f9',
      choices: [
        { label: '첫 손님을 기다린다', to: 'first_customer', cls: 'bg-green-200' }
      ],
      prompt: '💭 음식에는 어떤 의미가 담겨 있을까?'
    },
    {
      id: 'disappear',
      title: '순간이동',
      text: `휘익-

도술을 써서 멀리 사라졌어.

하지만... 이렇게 도망만 다니는 게
과연 옳은 걸까?

3천 년을 살았지만
항상 도망만 다녔어.

'다른 사람들은 한평생을 살면서도
자신의 일에 최선을 다하는데...'

문득 부끄러워졌어.

다시 시장으로 돌아가
떡집을 차리기로 했어.`,
      bg: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '떡집을 차린다', to: 'transform_shop', cls: 'bg-purple-200' }
      ],
      prompt: '💭 안전한 삶과 맞서는 삶, 어느 것이 진정한 삶일까?'
    },
    {
      id: 'first_customer',
      title: '첫 번째 손님 - 젊은 선비',
      text: `문이 열리며 젊은 선비가 들어왔어.

"여기가 소문난 떡집이군요.
저는... 고민이 있습니다."

선비는 한숨을 쉬었어.

"과거 시험을 볼까, 
아니면 고향에서 훈장(선생님)이 될까 
고민입니다.

과거에 급제하면 큰 벼슬(요즘의 고위 공무원)을 
할 수 있지만...

훈장이 되면 아이들을 가르치는 일을
할 수 있죠."

너는 선비를 보며 생각했어.`,
      bg: 'https://images.unsplash.com/photo-1707925547023-eeb1eaa1005d',
      choices: [
        { label: '선비의 이야기를 더 듣는다', to: 'scholar_story', cls: 'bg-blue-200' },
        { label: '바로 떡을 추천한다', to: 'quick_advice', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 높은 지위와 보람 있는 일 중 무엇이 더 중요할까?'
    },
    {
      id: 'scholar_story',
      title: '선비의 진심',
      text: `"말씀해 보세요. 
무엇이 진짜 고민인가요?"

선비가 천천히 말했어.

"솔직히... 아버지는 제가 
벼슬을 하길 원하십니다.
돈도 많이 벌고, 집안을 빛내라고요.

하지만 저는... 
아이들 가르치는 게 좋습니다.
아이들 눈이 반짝이는 걸 볼 때
정말 행복하거든요."

너는 고개를 끄덕였어.

"그래서 어떤 떡이 필요한가요?"`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d',
      choices: [
        { label: '설명을 잘하게 되는 떡', to: 'teaching_rice_cake', cls: 'bg-green-200' },
        { label: '지혜와 학문을 키워주는 떡', to: 'wisdom_rice_cake', cls: 'bg-purple-200' }
      ],
      prompt: '💭 부모님의 기대와 내 꿈이 다를 때, 어떻게 해야 할까?'
    },
    {
      id: 'quick_advice',
      title: '성급한 판단',
      text: `"그럼 이 떡을 드세요!"

너는 약식을 내밀었어.
지혜와 학문을 키워주는 떡이지.

하지만 선비는 망설였어.

"저의 진짜 고민을 
들어주시지 않으시나요?"

앗, 너무 성급했어.

3천 년을 살았지만
아직도 사람의 마음을 헤아리는 건
쉽지 않구나.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d',
      choices: [
        { label: '다시 이야기를 듣는다', to: 'scholar_story', cls: 'bg-blue-200' }
      ],
      prompt: '💭 조언을 할 때 가장 중요한 것은 무엇일까?'
    },
    {
      id: 'teaching_rice_cake',
      title: '송편 - 세심한 마음',
      text: `너는 송편을 꺼냈어.

"이 송편은 특별합니다.
속에 깨, 콩, 밤이 들어있죠.

각각의 재료가 다르듯,
학생들도 모두 다릅니다.

세심하게 학생 한 명 한 명을 
살피는 마음이 담긴 떡이에요."

선비가 송편을 먹었어.

"아... 이 맛은...
마치 제가 가르쳤던 아이들이 
생각나네요."

선비의 눈이 반짝였어.

"결심했습니다. 
훈장이 되겠습니다!"`,
      bg: 'https://images.unsplash.com/photo-1747228469031-c5fc60b9d9f9',
      choices: [
        { label: '선비를 격려한다', to: 'encourage_scholar', cls: 'bg-green-200' }
      ],
      prompt: '💭 직업의 가치는 연봉이 아니라 사명감에서 나올까?'
    },
    {
      id: 'wisdom_rice_cake',
      title: '약식 - 지혜의 떡',
      text: `너는 약식을 꺼냈어.

"이 약식은 
학문과 지혜를 키워줍니다.

과거 시험에도,
아이들을 가르치는 데도
모두 필요한 능력이죠."

선비가 약식을 먹었어.

"음... 달콤하면서도 깊은 맛이네요.

하지만... 
저는 제 마음을 따르고 싶어요.
훈장이 되겠습니다."

너는 웃었어.

"좋은 선택입니다.
진짜 지혜는 자기 마음을 아는 것이니까요."`,
      bg: 'https://images.unsplash.com/photo-1747228469031-c5fc60b9d9f9',
      choices: [
        { label: '선비를 격려한다', to: 'encourage_scholar', cls: 'bg-green-200' }
      ],
      prompt: '💭 진정한 지혜란 무엇일까?'
    },
    {
      id: 'encourage_scholar',
      title: '좋은 선택',
      text: `"훌륭한 결정입니다.

직업에는 귀천이 없어요.
높은 벼슬도 좋지만,
아이들을 잘 가르치는 훈장도
정말 소중한 일이죠.

요즘으로 치면 선생님은
미래를 만드는 사람입니다."

선비가 깊이 절했어.

"고맙습니다. 
평생 아이들을 위해 살겠습니다."

선비가 떠났어.

잠시 후, 또 다른 손님이 찾아왔어.`,
      bg: 'https://images.unsplash.com/photo-1707925547023-eeb1eaa1005d',
      choices: [
        { label: '다음 손님을 맞이한다', to: 'second_customer', cls: 'bg-purple-200' }
      ],
      prompt: '💭 다른 사람의 미래를 돕는다는 것은 어떤 의미일까?'
    },
    {
      id: 'second_customer',
      title: '두 번째 손님 - 장인',
      text: `문을 열고 들���온 건
손이 거칠어 보이는 중년 남자.

"저는 도자기를 만드는 장인입니다.

아들이 있는데요...
아들은 과거를 보고 싶어 합니다.

'아버지처럼 평생 흙만 만지며
살고 싶지 않다'고 하더군요."

장인의 목소리가 떨렸어.

"제 일이... 
그렇게 부끄러운 일인가요?

요즘으로 치면 제조업 기술자인데,
그게 나쁜 직업인가요?"`,
      bg: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '장인의 아픔을 공감한다', to: 'craftsman_pain', cls: 'bg-blue-200' },
        { label: '과거 이야기를 들려준다', to: 'past_story', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 손으로 만드는 노동은 낮은 일일까?'
    },
    {
      id: 'craftsman_pain',
      title: '장인의 자부심',
      text: `"부끄러운 일이 아닙니다.

오히려 자랑스러운 일이죠."

너는 선반에서 
정성스럽게 빚은 인절미를 꺼냈어.

"이 떡을 보세요.
하나하나 정성껏 만들었죠.

선생님의 도자기도 마찬가지 아닐까요?

요즘으로 치면 명품 도자기 장인.
세계적인 예술가입니다.

급제해서 벼슬하는 것(대기업 직원)도 좋지만,
평생을 걸고 하나를 완성하는 것도
정말 귀한 일이에요."`,
      bg: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '인절미를 권한다', to: 'give_injeolmi', cls: 'bg-green-200' }
      ],
      prompt: '💭 장인 정신이란 무엇일까?'
    },
    {
      id: 'past_story',
      title: '3천 년의 기억',
      text: `"제가 살아온 세월 동안
많은 사람들을 봤습니다.

높은 벼슬을 하다가
한순간에 몰락한 사람도 있고,

평생 한 가지 일을 하며
역사에 이름을 남긴 사람도 있죠.

고려 시대에 만난 
한 도공(도자기 만드는 사람)은
청자를 빚었습니다.

그 청자는 지금까지도
'세계 최고의 예술품'으로 
남아있어요."`,
      bg: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '장인에게 떡을 준다', to: 'give_injeolmi', cls: 'bg-green-200' }
      ],
      prompt: '💭 역사에 남는 것은 지위일까, 작품일까?'
    },
    {
      id: 'give_injeolmi',
      title: '인절미 - 끈기와 성실',
      text: `너는 인절미를 내밀었어.

"이 떡은 찹쌀을 오래오래 쳐서 만듭니다.
끈기와 성실함이 필요하죠.

장인의 일도 마찬가지입니다.

하루 이틀이 아니라
평생을 걸고 하나를 파는 것.

그것이 진짜 장인 정신이에요."

장인이 인절미를 먹으며 눈물을 흘렸어.

"고맙습니다...
제 일이 부끄럽지 않다는 걸 
다시 깨달았습니다."`,
      bg: 'https://images.unsplash.com/photo-1747228469031-c5fc60b9d9f9',
      choices: [
        { label: '장인을 격려한다', to: 'encourage_craftsman', cls: 'bg-purple-200' }
      ],
      prompt: '💭 끈기는 재능을 이길 수 있을까?'
    },
    {
      id: 'encourage_craftsman',
      title: '자부심 회복',
      text: `"아드님께 이렇게 말씀하세요.

'과거에 급제하는 것도 좋지만,
아버지처럼 평생 한 가지를 파는 것도
훌륭한 일이다.

중요한 건 무슨 일을 하느냐가 아니라,
그 일을 얼마나 정성껏 하느냐다.'라고요."

장인이 활짝 웃었어.

"감사합니다! 
아들에게 자신 있게 말할 수 있을 것 같습니다!"

그때, 또 누군가 문을 두드렸어.`,
      bg: 'https://images.unsplash.com/photo-1598620650015-717ea19b8901',
      choices: [
        { label: '문을 연다', to: 'third_customer', cls: 'bg-blue-200' }
      ],
      prompt: '💭 일의 가치는 무엇으로 결정될까?'
    },
    {
      id: 'third_customer',
      title: '세 번째 손님 - 젊은 의원',
      text: `들어온 사람은 젊은 의원이었어.

"저는 의원입니다.
사람들의 병을 고치죠.

요즘으로 치면 의사입니다."

의원이 한숨을 쉬었어.

"오늘... 환자 한 분이 돌아가셨습니다.
제가 최선을 다했지만...
결국 살리지 못했어요.

죽음 앞에서...
저는 정말 무력합니다.

제가 의원 일을 계속해야 할까요?"`,
      bg: 'https://images.unsplash.com/photo-1748077228194-e7d5b947287a',
      choices: [
        { label: '죽음에 대해 이야기한다', to: 'talk_death', cls: 'bg-purple-200' },
        { label: '위로부터 한다', to: 'comfort_doctor', cls: 'bg-green-200' }
      ],
      prompt: '💭 죽음을 막을 수 없다면, 의사의 역할은 무엇일까?'
    },
    {
      id: 'talk_death',
      title: '3천 년의 죽음',
      text: `"저는 3천 년을 살았습니다.

그동안 수많은 죽음을 봤죠.

사랑하는 사람들이 떠나고,
친구들이 하나둘 사라졌어요.

처음엔 저도 
죽음이 무서웠습니다.

하지만 깨달았죠.

죽음은 끝이 아니라
이승에서 저승으로 가는 
'이동'일 뿐이라는 걸요.

저승에는 염라대왕(요즘의 법원장)이 있고,
저승 차사들(공무원)이 혼을 관리합니다."`,
      bg: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이야기를 이어간다', to: 'death_meaning', cls: 'bg-blue-200' }
      ],
      prompt: '💭 죽음은 끝일까, 또 다른 시작일까?'
    },
    {
      id: 'comfort_doctor',
      title: '의원의 사명',
      text: `"당신은 최선을 다했습니다.

그것만으로도 충분해요.

모든 죽음을 막을 순 없어도,
한 사람이라도 더 살리고,
한 사람이라도 덜 아프게 하는 것.

그게 의원의 사명 아닐까요?"

의원이 고개를 들었어.

"하지만... 
죽음 앞에서 너무 무력합니다."

너는 고개를 저었어.`,
      bg: 'https://images.unsplash.com/photo-1748077228194-e7d5b947287a',
      choices: [
        { label: '죽음에 대해 이야기한다', to: 'talk_death', cls: 'bg-purple-200' }
      ],
      prompt: '💭 완벽하지 않아도 최선을 다하는 것, 그것으로 충분할까?'
    },
    {
      id: 'death_meaning',
      title: '죽음의 의미',
      text: `"그래서 의원의 일은 더 소중합니다.

죽음은 언젠가 찾아옵니다.
모든 사람이 언젠가는 
저승으로 가야 하죠.

하지만 그 '언젠가'를 
조금이라도 늦추고,

그 시간 동안 
덜 아프게 해주는 것.

그게 의원의 역할입니다.

완벽하진 않아도,
최선을 다하는 것.
그것만으로도 충분히 훌륭합니다."`,
      bg: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '송편을 권한다', to: 'give_songpyeon', cls: 'bg-green-200' }
      ],
      prompt: '💭 완벽을 추구하는 것과 최선을 다하는 것, 어떤 차이가 있을까?'
    },
    {
      id: 'give_songpyeon',
      title: '송편 - 배려의 마음',
      text: `"이 송편을 드세요.

송편 속에는 
깨, 콩, 밤이 들어있습니다.

각각 다른 맛이죠.

사람들도 마찬가지입니다.
누구는 빨리 낫고,
누구는 천천히 낫고,
누구는 안타깝게도 떠나갑니다.

하지만 중요한 건
한 사람 한 사람을 
세심하게 돌보는 마음.

그 마음이 담긴 떡입니다."

의원이 송편을 먹으며 눈물을 흘렸어.`,
      bg: 'https://images.unsplash.com/photo-1747228469031-c5fc60b9d9f9',
      choices: [
        { label: '의원을 격려한다', to: 'encourage_doctor', cls: 'bg-purple-200' }
      ],
      prompt: '💭 세심함과 배려, 기술만큼 중요할까?'
    },
    {
      id: 'encourage_doctor',
      title: '의원의 결심',
      text: `"감사합니다...

제가 왜 의원이 되려고 했는지
다시 떠올랐습니다.

모든 사람을 살릴 순 없지만,
한 사람이라도 더 돕겠습니다."

의원이 깊이 절하고 떠났어.

해가 저물기 시작했어.

오늘 하루 동안
여러 사람을 도왔어.

하지만... 
문득 외로워졌어.

3천 년을 살았지만
진짜 친구는 없었어.`,
      bg: 'https://images.unsplash.com/photo-1649727986077-122d1623244b',
      choices: [
        { label: '과거를 회상한다', to: 'recall_past', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 오래 산다는 것, 그것이 행복일까?'
    },
    {
      id: 'recall_past',
      title: '기나긴 세월',
      text: `3천 년...

한나라 시대, 너는 황제의 신하였어.
고려 시대, 너는 광대였어.
조선 초기, 너는 상인이었어.

매번 시대가 바뀌고,
신분과 직업도 바뀌었어.

친구들은 모두 늙어 죽고,
너만 홀로 남았어.

그래서 더 이상 
깊은 관계를 맺지 않으려 했어.

하지만 오늘...
사람들을 도우면서
뭔가 따뜻한 걸 느꼈어.`,
      bg: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '생각에 잠긴다', to: 'deep_thought', cls: 'bg-purple-200' }
      ],
      prompt: '💭 불멸의 삶이 축복일까, 저주일까?'
    },
    {
      id: 'deep_thought',
      title: '삶의 의미',
      text: `'나는 왜 3천 년을 사는 걸까?

단순히 죽음을 피하기 위해서?

아니면... 다른 이유가 있는 걸까?'

그때, 또 문이 열렸어.

들어온 사람은...
단정한 옷차림의 젊은 여인이었어.

"안녕하세요. 
저는 이 고을 차사(공무원)인
강림도령의 아내입니다."

강림의 아내!

바로 소문으로 들었던
그 훌륭한 강림도령의 각시구나.`,
      bg: 'https://images.unsplash.com/photo-1761402511821-1e61a1469670',
      choices: [
        { label: '강림 각시를 맞이한다', to: 'meet_gangrim', cls: 'bg-blue-200' }
      ],
      prompt: '💭 우연한 만남이 운명을 바꿀 수 있을까?'
    },
    {
      id: 'meet_gangrim',
      title: '강림 각시의 고민',
      text: `"어르신, 떡 하나 주시겠습니까?
남편이 차사 일을 하는데,
곧 어려운 일을 맡게 될 것 같습니다."

강림 각시는 걱정스러워 보였어.

"과양각시라는 분이
세 아들의 억울한 죽음을 밝혀달라고 
사또에게 계속 청을 올린답니다.

남편이... 저승에 가서
염라대왕을 모셔와야 할지도 몰라요."

너는 깜짝 놀랐어.

"저승에? 그건 위험한 일입니다!"`,
      bg: 'https://images.unsplash.com/photo-1758207574693-3f870de1fdc5',
      choices: [
        { label: '조언을 해준다', to: 'advise_gangrim_wife', cls: 'bg-blue-200' },
        { label: '떡 재료를 준다', to: 'give_gangrim_rice_cake', cls: 'bg-green-200' }
      ],
      prompt: '💭 사랑하는 사람이 위험한 일을 해야 한다면?'
    },
    {
      id: 'ask_task',
      title: '저승으로 가는 길',
      text: `"남편 강림이 정말로
저승에 가야 한다면...

어떻게 해야 할까요?"

강림 각시는 불안해했어.

너는 깊이 생각했어.

'강림도령은 책임감 있고
용감한 사람이구나.

하지만 저승은 위험한 곳이야.'`,
      bg: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '말리는 게 좋다고 한다', to: 'stop_gangrim', cls: 'bg-red-200' },
        { label: '조언을 해준다', to: 'advise_gangrim_wife', cls: 'bg-blue-200' }
      ],
      prompt: '💭 위험한 일이지만 해야 할 일이라면, 어떻게 해야 할까?'
    },
    {
      id: 'give_gangrim_rice_cake',
      title: '정직한 마음',
      text: `너는 떡 재료들을 꺼냈어.

"이 떡 재료들은 
순수하고 정직한 마음을 
지켜주는 효력이 있습니다.

떡을 지어 조상신과 남편분께 드리세요."

강림 각시가 조심스럽게 재료들을 받았어.

"고맙습니다."`,
      bg: 'https://images.unsplash.com/photo-1560100927-c32f29063ade',
      choices: [
        { label: '이야기를 더 듣는다', to: 'ask_task', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 정직함이 위험을 이길 수 있을까?'
    },
    {
      id: 'stop_gangrim',
      title: '만류',
      text: `"저승은 위험한 곳입니다.

산 사람이 함부로 갈 수 있는 곳이 아니에요!"

하지만 강림 각시는 고개를 저었어.

"하지만 과양각시는 억울해합니다.
세 아들의 죽음을 밝혀야 해요.

그게 남편의 임무(책임)입니다.
요즘으로 치면 공무원의 직무죠."

강림 각시의 눈에는 
남편을 믿는 마음이 가득했어.`,
      bg: 'https://images.unsplash.com/photo-1758207574693-3f870de1fdc5',
      choices: [
        { label: '조언을 해준다', to: 'advise_gangrim_wife', cls: 'bg-blue-200' }
      ],
      prompt: '💭 책임감은 두려움보다 강할까?'
    },
    {
      id: 'advise_gangrim',
      title: '동방삭의 조언',
      text: `"알겠습니다.
막을 수 없다면...
조언을 드리죠.

저승에 가려면
조왕할머니(부엌의 신)와
문전할아버지(대문의 신)의 
도움이 필요합니다.

그들께 정성껏 떡을 올리세요.

그리고 저승에서는
절대 음식을 먹지 마세요.
먹으면 돌아올 수 없습니다."

강림이 고개를 끄덕였어.

"감사합니다! 
남편에게 꼭 전하겠습니다.
어르신은... 많이 아시네요?"`,
      bg: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '떡을 주며 배웅한다', to: 'keep_secret', cls: 'bg-gray-200' }
      ],
      prompt: '💭 도움을 줄 때, 자신을 드러내야 할까?'
    },
    {
      id: 'advise_gangrim_wife',
      title: '저승으로 가는 법',
      text: `"남편께 이렇게 전하세요.\n\n저승에 가려면\n조왕할머니(부엌의 신)와\n문전할아버지(대문의 신)의 \n도움이 필요합니다.\n\n이 재료들로 지은 떡을 그들께 드리면\n길을 열어주실 거예요.\n\n그리고 저승에서는\n절대 음식을 먹으면 안 됩니다.\n먹으면 돌아올 수 없어요.\"\n\n강림 각시가 눈물을 글썽이며 절했어.\n\n\"정말 감사합니다.\n남편에게 꼭 전하겠습니다.\"`,
      bg: 'https://images.unsplash.com/photo-1598620650015-717ea19b8901',
      choices: [
        { label: '떡 재료를 주며 배웅한다', to: 'keep_secret', cls: 'bg-gray-200' }
      ],
      prompt: '💭 위험한 길을 떠나는 사람을 어떻게 도와야 할까?'
    },
    {
      id: 'keep_secret',
      title: '떡 재료들을 건네며',
      text: `너는 재료들을 잘 포장해 주었어.

강림 각시가 깊이 절했어.

"정말 감사합니다!
남편이 무사히 돌아오면
꼭 다시 인사드리러 오겠습니다!"

강림 각시가 떠났어.

너는 창밖을 바라봤어.

'강림은 임무에 성공할 수 있을까?'`,
      bg: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '몇년 후', to: 'days_later', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 선행은 드러내지 않아도 빛날까?'
    },
    {
      id: 'days_later',
      title: '소문',
      text: `몇년 후, 마을에 소문이 퍼졌어.

"강림이 정말 저승에 다녀 왔대!"
"염라대왕을 데려왔다던데!"

너는 가슴이 벅찼어.

'강림이 해냈구나!''

그리고 며칠 더 지나자...
또 다른 소문이 들렸어.

"강림이 저승 차사가 됐대!"
"이제 이승에 못 온대!"`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93',
      choices: [
        { label: '기쁘면서도 슬프다', to: 'mixed_feelings', cls: 'bg-blue-200' }
      ],
      prompt: '💭 성공은 기쁘지만 이별은 슬픈 것, 자연스러운 일일까?'
    },
    {
      id: 'mixed_feelings',
      title: '죽음을 앞둔 마음',
      text: `기뻤어.
강림이 성공했으니까.

하지만 슬프기도 했어.

너는 떡집을 둘러봤어.

"언젠가...
나도 저승 차사에게
잡혀가는 날이 오겠지."`,
      bg: 'https://images.unsplash.com/photo-1762112800093-764ab82c2301',
      choices: [
        { label: '미래를 생각한다', to: 'think_future', cls: 'bg-purple-200' }
      ],
      prompt: '💭 피할 수 없는 운명 앞에서, 어떻게 살아야 할까?'
    },
    {
      id: 'think_future',
      title: '선택의 순간',
      text: `"그날이 오면... 나는 어떤 선택을 할까?"

"도망칠까? 아니면...
평온하게 받아들일까?"

3천 년 동안 줄곧 도망쳤어.

하지만... 사람들을 도우면서 무언가 달라졌어.

"도망치는 삶이 아니라, 의미 있는 삶을 살고 싶어."`,
      bg: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 도망치며 산다', to: 'continue_running', cls: 'bg-red-200' },
        { label: '의미있는 삶을 살기로 한다', to: 'meaningful_life', cls: 'bg-green-200' }
      ],
      prompt: '💭 도망치는 삶과 맞서는 삶, 어느 쪽을 선택할까?'
    },
    {
      id: 'continue_running',
      title: '도망의 연속',
      text: `"아직은... 
준비가 안 됐어.

좀 더 도망치면서
생각해봐야겠어."

너는 다시 둔갑술을 썼어.

떡집이 사라지고,
너도 사라졌어.

하지만 마음 한구석에서
작은 목소리가 들렸어.

"언제까지 도망칠 건가?"`,
      bg: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다시 생각한다', to: 'think_again', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 도망치는 것도 하나의 선택일까?'
    },
    {
      id: 'think_again',
      title: '마음의 변화',
      text: `한참을 도망친 후...

너는 멈춰 섰어.

"아니야.
이건 아니야."

그동안 만난 사람들이 떠올랐어.

선비, 장인, 의원, 강림 각시...

그들은 모두 도망치지 않고
자신의 길을 걸었어.

"나도... 
더 이상 도망치지 말자."`,
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '의미있는 삶을 살기로 한다', to: 'meaningful_life', cls: 'bg-green-200' }
      ],
      prompt: '💭 마음을 바꾸는 것, 용기가 필요할까?'
    },
    {
      id: 'meaningful_life',
      title: '새로운 결심',
      text: `"그래.
언젠가 잡혀가는 날이 와도,

그때는 후회 없이
떠날 수 있도록 살자."

너는 다시 떡집을 열었어.

"매일매일,
사람들을 도우며 살겠어!

앞 날을 고민하는 사람들에게
떡을 나눠주고,

직업에는 귀천이 없다는 걸
알려주겠어."

너의 마음이 평온해졌어.`,
      bg: 'https://images.unsplash.com/photo-1747228469031-c5fc60b9d9f9',
      choices: [
        { label: '매일을 의미있게 산다', to: 'daily_life', cls: 'bg-purple-200' }
      ],
      prompt: '💭 죽음을 받아들이면, 삶이 더 소중해질까?'
    },
    {
      id: 'daily_life',
      title: '의미 있는 매일',
      text: `그날 이후,

너는 매일 떡집을 열었어.

많은 사람들이 찾아왔고,
너는 그들에게 조언을 해주었어.

"직업에는 귀천이 없습니다.
중요한 건 그 일을 하는 마음입니다."

3천 년 만에...
처음으로 의미 있는 삶을 살고 있었어.

언젠가 저승 차사가 올지도 몰라.

하지만 그날이 와도...
후회하지 않을 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1598620650015-717ea19b8901',
      choices: [
        { label: '엔딩으로', to: 'ending', cls: 'bg-blue-200' }
      ],
      prompt: '💭 매일 마지막처럼 산다면, 후회 없이 살 수 있을까?'
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `동방삭은 3천 년 동안 도망쳤지만,
이제는 의미 있는 삶을 살기로 했어.

떡집을 열어 사람들을 돕고,
직업의 가치를 알려주었지.

언젠가 저승 차사가 올지도 몰라.
하지만 그때는 후회 없이 떠날 수 있을 거야.
매일매일을 최선을 다해 살았으니까.

강림도령도 훌륭한 차사로서
맡은 일에 최선을 다했어.

직업에는 귀천이 없어.
중요한 건 그 일을 하는 '마음'인거야.

이승과 저승을 넘나들며 이직한 강림은 어떤 직장을 더 좋아할까?

📚 《강림도령전》을 통해 세월이 흘러도 변치 않는 고민 주제인 삶과 죽음, 성격과 적성, 직업에 대해 생각해 보자!`,
      bg: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '🔄 처음부터 다시하기', to: 'start', cls: 'bg-purple-500' }
      ],
      prompt: `《강림도령》 - 영화 '신과함께'처럼 저승과 이승을 오가는 스펙터클한 모험! 용감한 강림도령과 함께 사후세계 체험!`
    }
  ];
}
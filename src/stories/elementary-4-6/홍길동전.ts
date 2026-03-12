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

export function generateHongGilDongStory(
  gradeLevel: string,
  lastName: string,
  firstName: string
): Scene[] {
  const name = createNameVariations(lastName, firstName);

  return [
    {
      id: 'start',
      title: '신분의 벽',
      text: `너의 이름은 ${name.full}.

조선시대, 천민 집안의 아이로 태어났어.

부모님은 조용히 살았어. 특별한 능력이 있었지만 숨겼어. 들키면 역모죄로 온 가족이 위험하니까.

너는 부모님처럼 착하게 살려고 했지만 세상은 냉혹했어.

"천민 주제에 감히!" 양반 자제가 너를 밀쳤어. 이유는 단 하나, 네가 천민이라서.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF다이션hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '참고 고개를 숙인다', to: 'endure', cls: 'bg-blue-200' },
        { label: '억울함을 말한다', to: 'speak_up', cls: 'bg-red-200' },
      ],
      prompt: '💭 차별받을 때 어떻게 해야 할까?',
    },
    {
      id: 'endure',
      title: '억눌린 분노',
      text: `고개를 숙였어. 참는 게 익숙했어.

하지만 가슴속 분노는 점점 커져갔어. 양반들은 힘없는 사람들을 짓밟았어.

부모님이 말씀하셨어. "참아야 해. 우리 같은 사람들은..." 부모님의 눈빛이 슬펐어.

그날 밤, 너는 결심했어. 이대로는 살 수 없다고.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF다이션hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNjM1MzU0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '집을 떠나기로 한다', to: 'leave_home', cls: 'bg-purple-200' },
        { label: '부모님께 하소연한다', to: 'talk_to_parents', cls: 'bg-green-200' },
      ],
      prompt: '💭 참는 것과 행동하는 것, 어느 것이 용기일까?',
    },
    {
      id: 'speak_up',
      title: '정의를 외치다',
      text: `"잘못한 게 없어요!" 너는 당당히 말했어.

양반 자제가 화를 냈어. "이놈이 감히!" 곧 하인들이 달려왔어.

너는 매를 맞았어. 하지만 후회하지 않았어. 옳은 말을 했으니까.

부모님이 놀라 달려오셨어. "아가, 괜찮니?" 부모님은 너를 안았어. 눈물을 참으시며.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '이대로는 못 산다', to: 'leave_home', cls: 'bg-purple-200' },
        { label: '부모님과 이야기한다', to: 'talk_to_parents', cls: 'bg-green-200' },
      ],
      prompt: '💭 정의를 위해 희생할 수 있을까?',
    },
    {
      id: 'talk_to_parents',
      title: '부모님의 비밀',
      text: `부모님께 털어놓았어. "이 세상은 너무 불공평해요."

아버지가 한숨을 쉬셨어. "우리도... 사실 특별한 능력이 있단다."

"능력이요?" 너는 놀랐어.

어머니가 작은 물건을 허공에 띄우셨어. 도술이었어. "하지만 들키면 역모죄란다. 그래서 숨기고 살았어."

"나도 그 능력을..." "넌 아직 어려. 언젠가 때가 오면 쓸 수 있을 거야."`,
      bg: 'https://images.unsplash.com/photo-1746535908442-0140112ddc1a',
      choices: [
        { label: '능력을 연습해본다', to: 'practice_power', cls: 'bg-blue-200' },
        { label: '세상을 바꾸고 싶다', to: 'dream_change', cls: 'bg-red-200' },
      ],
      prompt: '💭 숨겨진 능력, 언제 써야 할까?',
    },
    {
      id: 'practice_power',
      title: '잠재된 힘',
      text: `혼자 연습해봤어. 돌멩이를 띄우려 했어.

집중했어. 온 힘을 다했어. 돌이 살짝 떨렸어! 하지만 곧 떨어졌어.

"아직 멀었구나..." 하지만 가능성을 느꼈어. 언젠가 부모님처럼 도술을 부릴 수 있을 거야.

그때, 밖에서 비명 소리가 들렸어. "탐관오리들이 세금을 더 걷는대!"`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '밖으로 나가본다', to: 'witness_injustice', cls: 'bg-red-200' },
        { label: '계속 수련한다', to: 'keep_training', cls: 'bg-blue-200' },
      ],
      prompt: '💭 능력은 언제 쓰는 게 옳을까?',
    },
    {
      id: 'dream_change',
      title: '평등한 세상을 꿈꾸다',
      text: `"이 세상을 바꾸고 싶어요. 신분 없이, 모두가 평등한 세상!"

부모님이 슬프게 웃으셨어. "착한 마음이구나. 하지만 세상은 쉽게 바뀌지 않아."

"그래도 언젠가..." 너는 주먹을 쥐었어.

그때, 밖에서 아우성이 들렸어. "탐관오리가 또 세금을 늘렸어!" "먹고살 수가 없어!"`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF다이션hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '마을 사람들을 보러 간다', to: 'witness_injustice', cls: 'bg-red-200' },
      ],
      prompt: '💭 이상향은 꿈일 뿐일까?',
    },
    {
      id: 'keep_training',
      title: '수련의 시간',
      text: `매일 연습했어. 작은 돌을 띄우고, 집중력을 키우고.

어느 날, 돌이 허공에 3초 동안 떠 있었어! 성장하고 있었어.

부모님이 말씀하셨어. "네 안에 힘이 있어. 하지만 조심해야 해."

그 순간, 관아 군졸들이 마을에 들이닥쳤어. "세금 더 내라!"`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF다이션hbCUyMHBhdHRlcm58ZW58MXx8fHwxNjM1MzU0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '무슨 일인지 본다', to: 'witness_injustice', cls: 'bg-red-200' },
      ],
      prompt: '💭 힘은 무엇을 위해 키워야 할까?',
    },
    {
      id: 'witness_injustice',
      title: '탐관오리의 횡포',
      text: `마을 사람들이 무릎 꿇고 있었어. 탐관오리가 소리쳤어. "세금을 못 내면 감옥이다!"

한 노인이 애원했어. "저희는 이미 다 냈습니다!" "시끄러! 내가 정한 게 법이다!"

너는 주먹을 쥐었어. 분노가 치밀었어. 하지만 어떻게 할 수 없었어. 힘없는 천민일 뿐이니까.

그날 밤, 부모님마저 관아에 끌려가셨어. "세금을 더 내지 못하면..."`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '부모님을 구하러 간다', to: 'save_parents', cls: 'bg-red-200' },
        { label: '도움을 청한다', to: 'seek_help', cls: 'bg-blue-200' },
      ],
      prompt: '💭 불의 앞에서 침묵하는 것은 옳을까?',
    },
    {
      id: 'save_parents',
      title: '무모한 용기',
      text: `관아로 뛰어갔어. "부모님을 놓아주세요!"

군졸들이 너를 막았어. "꺼져! 천민 주제에!"

너는 밀려났어. 능력을 쓰고 싶었어. 하지만 부모님 말씀이 떠올랐어. '들키면 역모죄...'

결국 쫓겨났어. 무력감이 엄습했어. "나는... 아무것도 할 수 없어..."`,
      bg: 'https://images.unsplash.com/photo-1610349633888-c6058d7393e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBwYWxhY2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzYzNTM1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '집을 떠나기로 한다', to: 'leave_home', cls: 'bg-purple-200' },
      ],
      prompt: '💭 용기와 무모함의 차이는?',
    },
    {
      id: 'seek_help',
      title: '차가운 현실',
      text: `마을 사람들에게 도움을 청했어. "부모님을 구해주세요!"

하지만 모두 고개를 돌렸어. "우리도 힘들어..." "미안하지만..."

양반들은 더 냉정했어. "천민 일에 왜 나서?" 누구도 도와주지 않았어.

너는 깨달았어. 이 세상에서 힘없는 자는 아무도 지켜주지 않는다는 것을.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF다이션hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '혼자서 길을 떠난다', to: 'leave_home', cls: 'bg-purple-200' },
      ],
      prompt: '💭 힘없는 자는 누가 지켜줄까?',
    },
    {
      id: 'leave_home',
      title: '결별의 시간',
      text: `부모님이 풀려나셨지만, 너는 결심했어. 집을 떠나기로.

"너 때문에 우리가 위험해질 수 있어." 차라리 혼자 살겠다고.

부모님이 눈물을 흘리셨어. "조심해라... 언젠가 네 힘을 쓸 때가 올 거야. 정의로운 일을 위해."

너는 고개를 끄덕였어. 작은 보따리를 메고 집을 나섰어. 밤하늘 별들이 빛났어.`,
      bg: 'https://images.unsplash.com/photo-1697395981156-12adaf457d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF다이션hbCUyMHRoYXRjaGVkJTIwcm9vZiUyMGhvdXNlfGVufDF8fHx8MTc2MzU0MzY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      choices: [
        { label: '산길로 간다', to: 'mountain_path', cls: 'bg-green-200' },
        { label: '마을을 거쳐 간다', to: 'village_path', cls: 'bg-blue-200' },
      ],
      prompt: '💭 떠남은 도피일까, 새로운 시작일까?',
    },
    {
      id: 'mountain_path',
      title: '험난한 여정',
      text: `산길은 험했어. 배가 고팠어. 물도 떨어졌어.

며칠째 제대로 먹지 못했어. 비틀거렸어.

그때, 한 노인을 만났어. "배고프구나..." 노인이 주먹밥을 건넸어.

"감사합니다!" 너는 눈물을 흘리며 먹었어. "세상에도 좋은 사람이 있구나..."`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '노인과 이야기한다', to: 'meet_elder', cls: 'bg-green-200' },
        { label: '감사하고 떠난다', to: 'continue_journey', cls: 'bg-blue-200' },
      ],
      prompt: '💭 어려울 때 받은 도움의 의미는?',
    },
    {
      id: 'village_path',
      title: '또 다른 차별',
      text: `마을에 들렀어. 배가 너무 고팠어.

"물 한 모금만 주세요..." 한 집 문을 두드렸어.

"거지는 저리 가!" 문이 쾅 닫혔어. 다른 집도 마찬가지였어.

"천민은 우물도 못 쓴단다." 마을 사람들이 쫓아냈어. 또 차별이었어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '산으로 도망친다', to: 'flee_to_mountain', cls: 'bg-red-200' },
        { label: '참고 계속 간다', to: 'continue_journey', cls: 'bg-blue-200' },
      ],
      prompt: '💭 차별은 어디에나 있을까?',
    },
    {
      id: 'meet_elder',
      title: '지혜로운 조언',
      text: `노인이 말했어. "세상은 불공평하지. 하지만 포기하면 안 돼."

"어떻게 살아야 하나요?" 너는 물었어.

"정의로운 사람을 찾아. 세상을 바꾸려는 사람들이 있어. 그들과 함께하면 네 힘도 쓸 곳이 생길 거야."

노인은 미소 지었어. "산 너머에 희망이 있을 거야." 그리고 사라졌어.`,
      bg: 'https://images.unsplash.com/photo-1655645894221-948b9d2c7ed2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF다이션hbCUyMHRlbXBsZXxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '산 너머로 향한다', to: 'find_bandits', cls: 'bg-purple-200' },
      ],
      prompt: '💭 희망은 어디서 찾을 수 있을까?',
    },
    {
      id: 'flee_to_mountain',
      title: '쓸쓸한 도피',
      text: `산으로 도망쳤어. 눈물이 났어.

"왜 세상은 이렇게 불공평한 거야..." 주먹으로 땅을 쳤어.

그때, 멀리서 불빛이 보였어. 산속에 누가 있는 거야?

호기심이 생겼어. 조심스럽게 다가갔어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '불빛을 따라간다', to: 'find_bandits', cls: 'bg-purple-200' },
      ],
      prompt: '💭 도피 끝에 무엇이 있을까?',
    },
    {
      id: 'continue_journey',
      title: '생존의 길',
      text: `계속 걸었어. 풀뿌리를 캐 먹고, 시냇물을 마셨어.

며칠이 지났어. 몸은 지쳤지만, 마음은 단단해졌어.

"나는 살아남을 거야. 그리고 언젠가..." 주먹을 쥐었어.

저 멀리, 산속에서 연기가 피어올랐어. 사람들이 사는 곳 같았어.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF다이션hbCUyMHBhdHRlcm58ZW58MXx8fHwxNjM1MzU0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '연기 쪽으로 간다', to: 'find_bandits', cls: 'bg-purple-200' },
      ],
      prompt: '💭 고난은 사람을 어떻게 변화시킬까?',
    },
    {
      id: 'find_bandits',
      title: '도적의 소굴',
      text: `산속 깊은 곳, 동굴이 있었어. 사람들의 목소리가 들렸어.

안을 들여다봤어. 도적들이었어! 하지만... 양반이 아니었어. 모두 가난한 백성들 같았어.

"먹고살 길이 없어서 이렇게 됐지..." 한 도적이 한숨 쉬었어.

갑자기 누군가 너를 발견했어. "꼬마가 왜 여기 있어?" 도적들이 너를 둘러쌌어.`,
      bg: 'https://images.unsplash.com/photo-1746535908442-0140112ddc1a',
      choices: [
        { label: '솔직하게 말한다', to: 'honest_approach', cls: 'bg-blue-200' },
        { label: '함께하고 싶다고 한다', to: 'ask_to_join', cls: 'bg-red-200' },
      ],
      prompt: '💭 도적이 되는 것은 잘못일까?',
    },
    {
      id: 'honest_approach',
      title: '진심을 말하다',
      text: `"저도 갈 곳이 없어요. 천민이라 차별받고, 부모님도 잃었어요."

도적들이 고개를 끄덕였어. "우리도 비슷해. 탐관오리들 때문에 먹고살 수가 없었지."

대장이 나타났어. "우리 무리에 들어올래? 하지만 쉽지 않아. 규율이 있거든."

"네!" 너는 대답했어. 여기라면... 살 수 있을 것 같았어.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF다이션hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNjM1MzU0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '패거리를 선택한다', to: 'choose_group', cls: 'bg-purple-200' },
      ],
      prompt: '💭 진심은 통할까?',
    },
    {
      id: 'ask_to_join',
      title: '간절한 부탁',
      text: `"저를 받아주세요! 저도 싸울 수 있어요!"

도적들이 웃었어. "꼬마가 용기는 있구나."

대장이 말했어. "우리는 그냥 도적이 아니야. 살기 위해 어쩔 수 없이 이 길을 택했지. 너도 각오가 있어?"

"네! 전 갈 곳이 없어요." 너는 간절히 말했어.

"좋아. 우리와 함께하자." 대장이 손을 내밀었어.`,
      bg: 'https://images.unsplash.com/photo-1746535908442-0140112ddc1a',
      choices: [
        { label: '패거리를 정한다', to: 'choose_group', cls: 'bg-purple-200' },
      ],
      prompt: '💭 간절함이 문을 열까?',
    },
    {
      id: 'choose_group',
      title: '패거리 배정',
      text: `대장이 설명했어. "우리 무리엔 세 패거리가 있어."

첫째, 흙 풀 품은. 빠르고 조심스럽게 정찰을 수행해. 
둘째, 서리 내린. 힘이 센 사람들이 전투를 맡아. 
셋째, 글이 핀 돌. 계획을 세우고 물자를 지원해."

"네가 어디로 갈지 선택해." 대장이 말했어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '흙 풀 품은, 정찰대를 선택한다', to: 'scout_group', cls: 'bg-green-200' },
        { label: '서리 내린, 전투대를 선택한다', to: 'combat_group', cls: 'bg-red-200' },
        { label: '글이 핀 돌, 지원대를 선택한다', to: 'support_group', cls: 'bg-blue-200' },
      ],
      prompt: '💭 내 적성은 무엇일까?',
    },
    {
      id: 'scout_group',
      title: '정찰대의 일원',
      text: `정찰대에 들어갔어. 빠른 발놀림과 관찰력이 필요했어.

선배가 말했어. "우리는 눈과 귀야. 위험을 미리 알아채야 해."

훈련이 시작됐어. 숲을 빠르게 달리고, 숨는 법을 배웠어.

어느 날, 첫 임무가 떨어졌어. "마을에 가서 관아 동태를 살펴."`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '임무를 수행한다', to: 'first_mission', cls: 'bg-green-200' },
      ],
      prompt: '💭 관찰의 힘은 무엇일까?',
    },
    {
      id: 'combat_group',
      title: '전투대의 일원',
      text: `전투대에 들어갔어. 힘센 사람들이 모였어.

선배가 말했어. "우리는 무기야. 적들을 이겨야 해."

무술을 배웠어. 몸을 단련했어. 검 다루는 법도 익혔어.

어느 날, 대장이 말했어. "오늘 밤, 탐관오리 저택을 습격한다."`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF다이션hbCUyMHBhdHRlcm58ZW58MXx8fHwxNjM1MzU0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '임무를 수행한다', to: 'first_mission', cls: 'bg-red-200' },
      ],
      prompt: '💭 힘은 무엇을 지켜야 할까?',
    },
    {
      id: 'support_group',
      title: '지원대의 일원',
      text: `지원대에 들어갔어. 머리를 쓰는 일이 많았어.

선배가 말했어. "우리는 두뇌야. 계획이 없으면 모두 위험해."

지도를 그리고, 물자를 관리하고, 작전을 세웠어.

어느 날, 회의가 열렸어. "다음 목표를 정해야 해. 네 의견은?"`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF다이션hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNjM1MzU0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '작전에 참여한다', to: 'first_mission', cls: 'bg-blue-200' },
      ],
      prompt: '💭 지혜는 힘보다 강할까?',
    },
    {
      id: 'first_mission',
      title: '첫 임무',
      text: `첫 임무를 마쳤어. 탐관오리의 재물을 훔쳐왔어.

하지만 마음이 무거웠어. "이게... 옳은 일일까?"

동료가 말했어. "저 돈은 백성들에게서 빼앗은 거야. 우리가 가져와 나눠주는 게 낫지."

"그래도..." 양심의 가책이 들었어. 도적질은 도적질이니까.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF다이션hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '고민을 털어놓는다', to: 'share_doubts', cls: 'bg-blue-200' },
        { label: '혼자 생각한다', to: 'contemplate', cls: 'bg-green-200' },
      ],
      prompt: '💭 생존과 양심, 무엇이 먼저일까?',
    },
    {
      id: 'share_doubts',
      title: '양심의 고백',
      text: `대장에게 말했어. "전... 이게 옳은 일인지 모르겠어요."

대장이 한숨 쉬었어. "나도 처음엔 그랬어. 하지만 우리에겐 선택지가 없었어."

"언젠가 이런 삶을 끝낼 수 있을까요?" 너는 물었어.

"그렇게 되길 바라. 정의로운 세상이 온다면..." 대장의 눈빛이 슬펐어.`,
      bg: 'https://images.unsplash.com/photo-1746535908442-0140112ddc1a',
      choices: [
        { label: '마음속 꿈을 간직한다', to: 'secret_dream', cls: 'bg-purple-200' },
      ],
      prompt: '💭 양심을 지키며 살 수 있을까?',
    },
    {
      id: 'contemplate',
      title: '혼자만의 고민',
      text: `밤하늘을 바라보며 생각했어. "내가 원한 삶이 이게 아닌데..."

훔친 재물을 보니, 가난한 사람들의 얼굴이 떠올랐어.

"이 돈으로 굶주린 사람들을 도울 수 있다면..." 새로운 생각이 들었어.

"도적이 아니라... 의적이 되면 어떨까?" 마음속에 작은 불씨가 타올랐어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '꿈을 혼자 간직한다', to: 'secret_dream', cls: 'bg-purple-200' },
      ],
      prompt: '💭 혼자만의 깨달음도 가치 있을까?',
    },
    {
      id: 'secret_dream',
      title: '이상향을 향한 꿈',
      text: `마음속으로만 꿈꿨어. "언젠가 우리가 의적이 되면..."

밤마다 도술 연습도 했어. 몰래, 조용히. 능력이 조금씩 자랐어. 하지만 아직 부족했어.

시간이 흘렀어. 도적 생활에 익숙해졌지만, 꿈은 잃지 않았어.

어느 날, 평소와 다름없는 아침. 동굴 입구에 낯선 사람이 나타났어.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF다이션hbCUyMHBhdHRlcm58ZW58MXx8fHwxNjM1MzU0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '낯선 사람을 본다', to: 'stranger_arrives', cls: 'bg-purple-200' },
      ],
      prompt: '💭 이상을 현실로 만들 수 있을까?',
    },
    {
      id: 'stranger_arrives',
      title: '운명의 방문자',
      text: `당당한 걸음걸이의 젊은이였어. 
      "나는 홍길동이오. 여러분과 함께하고 싶소."

도적들이 웅성거렸어. "이 무리에 들어오려면 시험을 통과해야 해!"

대장이 말했어. "저 커다란 돌을 들어올려보시오."

모두가 비웃었어. "불가능해!" 

하지만 홍길동은 미소 지으며 돌로 다가갔어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '시험을 지켜본다', to: 'hong_test', cls: 'bg-red-200' },
      ],
      prompt: '💭 진정한 힘이란 무엇일까?',
    },
    {
      id: 'hong_test',
      title: '천 근 돌의 기적',
      text: `홍길동이 돌 앞에 서서 심호흡을 하더니... 돌을 들어올렸어!

"어떻게...!" 모두가 놀라 소리쳤어. 
천 근이나 되는 무거운 돌이 허공에 떠올랐어!

너는 깨달았어. '도술이다!' 그는 나처럼 도술을 쓸 수 있어!

대장이 무릎 꿇었어. "대장님! 이제부터 당신이 우리의 대장이오!" 모두가 환호했어.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF다이션hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '홍길동을 따르기로 한다', to: 'follow_hong', cls: 'bg-red-200' },
      ],
      prompt: '💭 영웅은 어떻게 만들어질까?',
    },
    {
      id: 'follow_hong',
      title: '새로운 시작',
      text: `홍길동이 말했어. "나는 서얼로 태어나 차별받았소. 그래서 알아. 이 세상의 불의를."

"우리는 의적이 될 것이오! 탐관오리와 부패한 양반에게서 빼앗아, 가난한 백성을 도울 것이오!"

너는 가슴이 뛰었어. '내가 꿈꾸던 바로 그거야!' 홍길동이 실현해주려 해!

"우리는 평등하오. 신분은 중요하지 않소." 홍길동이 모두를 둘러보며 말했어.`,
      bg: 'https://images.unsplash.com/photo-1746535908442-0140112ddc1a',
      choices: [
        { label: '결심을 다진다', to: 'final_resolve', cls: 'bg-purple-200' },
      ],
      prompt: '💭 진정한 리더의 조건은?',
    },
    {
      id: 'final_resolve',
      title: '도술 연마의 결심',
      text: `홍길동에게 감명받았어. '저렇게 당당하고 정의로운 사람!'

나도 도술을 완전히 익혀서 홍길동 대장님을 돕고 싶어. 더 훌륭한 의적이 되고 싶어.

그날 밤, 혼자 수련했어. 돌이 5초 동안 떠올랐어! 점점 나아지고 있어.

"정의를 위해, 평등한 세상을 위해..." 너는 다짐했어. 언젠가 강력한 동료가 될 거야.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '의적의 길로', to: 'ending', cls: 'bg-purple-200' },
      ],
      prompt: '💭 노력은 재능을 넘어설 수 있을까?',
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `홍길동과 함께하게 됐어.

도적에서 의적으로. 차별받던 천민에서 정의를 실현하는 영웅으로.

홍길동에게 감명받아, 너는 도술 수련에 더욱 매진하기로 했어. 언젠가 홍길동을 보필하는 믿음직한 동료가 될 거야.

《홍길동전》에서 홍길동은 어떤 고난을 겪었고, 또 앞으로 어떤 세상을 만들어 나가는지 확인해볼까?

📚 서점이나 도서관에서 《홍길동전》을 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1655645894221-948b9d2c7ed2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmF다이션hbCUyMHRlbXBsZXxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' },
      ],
      prompt: '《홍길동전》 - 조선판 해리포터! 도술 능력을 가진 주인공이 의적이 되어서 평등한 이상향을 꿈꾸며 신분 차별에 맞서 싸우는 판타지 소설이야!',
    },
  ];
}
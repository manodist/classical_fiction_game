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

export function generateJeokSeongUiStory(
  gradeLevel: string,
  lastName: string,
  firstName: string
): Scene[] {
  const name = createNameVariations(lastName, firstName);

  return [
    {
      id: 'start',
      title: '새로운 친구와의 만남',
      text: `너의 이름은 ${name.full}.

하늘을 나는 기러기야.

어느 날, 궁궐 지붕에 앉았어.

마당에서 두 왕자가 보였어.

형 항의와 동생 성의.

두 형제는 서로 너무 달랐지.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '형 항의를 관찰한다', to: 'watch_hangui', cls: 'bg-red-200' },
        { label: '동생 성의를 관찰한다', to: 'watch_seongui', cls: 'bg-blue-200' },
      ],
      prompt: '💭 누구를 먼저 알아가야 할까?',
    },
    {
      id: 'watch_hangui',
      title: '이기적인 마음',
      text: `형 항의를 지켜봤어.

"내 것이야! 네가 왜 만져!" 동생에게 소리쳤어.

부모님이 부르시면 못 들은 척했어.

자기만 생각하는 형이었어.

너는 고개를 저었어.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTM1NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '동생도 관찰한다', to: 'watch_seongui', cls: 'bg-blue-200' },
        { label: '부모님을 관찰한다', to: 'watch_parents', cls: 'bg-green-200' },
      ],
      prompt: '💭 이기심은 어디서 올까?',
    },
    {
      id: 'watch_seongui',
      title: '효심이 깃든 마음',
      text: `동생 성의를 지켜봤어.

"어머니, 제가 도와드릴게요." 항상 먼저 나섰어.

형이 괴롭혀도 참았어.

부모님을 향한 마음이 깊었어.

너는 감동했어.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTM1NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의에게 다가간다', to: 'approach_seongui', cls: 'bg-blue-200' },
        { label: '가족을 더 관찰한다', to: 'watch_family', cls: 'bg-green-200' },
      ],
      prompt: '💭 효심은 어디서 나올까?',
    },
    {
      id: 'watch_parents',
      title: '부모의 사랑',
      text: `부모님을 지켜봤어.

아버지는 공정했지만, 두 아들의 차이에 마음 아파했어.

어머니는 두 아들을 똑같이 사랑했어.

"언젠가 항의도 깨달을 거야." 어머니가 말씀하셨어.

희망을 버리지 않으셨어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vayUyMGNvdXJ0eWFyZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzUzNzA2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의를 관찰한다', to: 'watch_seongui', cls: 'bg-blue-200' },
        { label: '형제의 다툼을 본다', to: 'see_conflict', cls: 'bg-red-200' },
      ],
      prompt: '💭 부모의 사랑은 공평할 수 있을까?',
    },
    {
      id: 'approach_seongui',
      title: '선한 인연의 시작',
      text: `성의에게 날아갔어.

"기러기다!" 성의가 미소 지었어.

"배고프구나. 이거 먹어." 과일을 나눠줬어.

한낱 동물인 너도 잘 챙겼주는 것이 고마웠지.

너는 성의가 특별하다고 느꼈어.`,
      bg: 'https://images.unsplash.com/photo-1575391142273-cbc677912f22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGtvcmVhbiUyMHZpbGxhZ2UlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzYzNTM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '매일 찾아가기로 한다', to: 'daily_visit', cls: 'bg-blue-200' },
        { label: '먼저 관찰을 더 한다', to: 'observe_more', cls: 'bg-purple-200' },
      ],
      prompt: '💭 좋은 친구는 어떻게 알아볼까?',
    },
    {
      id: 'watch_family',
      title: '가족의 균열',
      text: `가족 식사 시간을 봤어.

항의는 맛있는 것만 자기 앞에 당겼어.

성의는 부모님께 좋은 것을 드렸어.

아버지는 한숨을 쉬셨어.

어머니는 눈물을 참으셨어.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTM1NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의를 응원하고 싶다', to: 'support_seongui', cls: 'bg-blue-200' },
        { label: '항의를 교훈하고 싶다', to: 'teach_hangui', cls: 'bg-red-200' },
      ],
      prompt: '💭 옳고 그름은 누가 정할까?',
    },
    {
      id: 'see_conflict',
      title: '참을성의 힘',
      text: `형제가 싸웠어.

"네가 잘못했어!" 항의가 거짓말했어.

성의는 억울했지만 참았어.

"형님, 제가 잘못했습니다." 고개를 숙였어.

분노를 삭이는 성의의 모습이 놀라웠어.`,
      bg: 'https://images.unsplash.com/photo-1758384077516-64239756fd4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGNvdXJ0eWFyZHxlbnwxfHx8fDE3NjM1MzU0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의의 감정 조절을 배운다', to: 'learn_control', cls: 'bg-blue-200' },
        { label: '진실은 드러날 거라 믿는다', to: 'truth_will_win', cls: 'bg-green-200' },
      ],
      prompt: '💭 억울해도 참아야 할 때가 있을까?',
    },
    {
      id: 'daily_visit',
      title: '우정이 싹트다',
      text: `매일 성의를 찾아갔어.

성의는 너를 기다렸어.

"기러기야, 오늘은 무슨 일 있었어?" 이야기를 나눴어.

말은 못 해도 마음이 통했어.

진짜 친구가 됐어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '가족 이야기를 더 듣는다', to: 'hear_family', cls: 'bg-purple-200' },
        { label: '성의의 고민을 알아간다', to: 'know_worry', cls: 'bg-blue-200' },
      ],
      prompt: '💭 진정한 친구란 무엇일까?',
    },
    {
      id: 'observe_more',
      title: '관찰을 통한 배움',
      text: `며칠 더 관찰했어.

성의는 항상 남을 먼저 생각했어.

힘든 일도 기쁘게 했어.

부모님을 웃게 하려고 노력했어.

마음이 정말 아름다웠어.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTM1NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '이제 다가간다', to: 'approach_seongui', cls: 'bg-blue-200' },
        { label: '항의도 관찰한다', to: 'compare_brothers', cls: 'bg-orange-200' },
      ],
      prompt: '💭 사람의 진심은 어떻게 알 수 있을까?',
    },
    {
      id: 'support_seongui',
      title: '선한 이를 돕는 마음',
      text: `성의를 돕기로 했어.

어려운 일이 있으면 나타났어.

길을 잃으면 방향을 알려줬어.

슬플 때는 곁에 있어줬어.

작은 도움이지만 의미가 있었어.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '계속 돕는다', to: 'keep_helping', cls: 'bg-blue-200' },
        { label: '성의의 소망을 알고 싶다', to: 'know_wish', cls: 'bg-purple-200' },
      ],
      prompt: '💭 선한 이를 도우면 무슨 일이 생길까?',
    },
    {
      id: 'teach_hangui',
      title: '\'사필귀정\' - 악행의 결과',
      text: `항의에게 교훈을 주고 싶었어.

하지만... 항의는 새를 쫓아냈어.

"귀찮아! 저리 가!" 소리쳤어.

너는 깨달았어. 스스로 깨닫지 못하면 소용없다는 걸.

사필귀정. 결국 돌아올 거야.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTM1NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의에게 집중한다', to: 'focus_seongui', cls: 'bg-blue-200' },
        { label: '항의의 변화를 기다린다', to: 'wait_change', cls: 'bg-gray-200' },
      ],
      prompt: '💭 나쁜 행동은 어떤 결과를 가져올까?',
    },
    {
      id: 'learn_control',
      title: '\'감정\'을 다스리는 법',
      text: `성의에게 배웠어.

화가 나도 깊게 숨을 쉬었어.

억울해도 진실은 언젠가 드러난다고 믿었어.

참을성이야말로 진정한 힘이었어.

너도 따라 하기로 했어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '감정 조절을 연습한다', to: 'practice_control', cls: 'bg-blue-200' },
        { label: '성의와 더 가까워진다', to: 'get_closer', cls: 'bg-green-200' },
      ],
      prompt: '💭 화를 참으면 어떤 힘이 생길까?',
    },
    {
      id: 'truth_will_win',
      title: '\'사필귀정\' - 정의는 반드시 승리한다',
      text: `머칠 후, 진실이 드러났어.

이웃이 봤던 거야. 항의가 거짓말한 걸.

아버지가 항의를 꾸짖으셨어.

성의는 말없이 미소 지었어.

사필귀정. 옳은 일은 반드시 이긴다.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '정의를 믿는다', to: 'believe_justice', cls: 'bg-green-200' },
        { label: '항의가 변할지 지켜본다', to: 'watch_hangui_change', cls: 'bg-orange-200' },
      ],
      prompt: '💭 진실은 항상 이길까?',
    },
    {
      id: 'hear_family',
      title: '가족의 걱정',
      text: `성의가 혼잣말을 했어.

"어머니가 편찮으시네... 어떻게 도와드릴까?"

걱정이 가득했어.

어머니의 병이 점점 심해지고 있었어.

너도 걱정됐어.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTM1NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '어머니를 살펴본다', to: 'check_mother', cls: 'bg-purple-200' },
        { label: '성의를 위로한다', to: 'comfort_seongui', cls: 'bg-blue-200' },
      ],
      prompt: '💭 가족이 아프면 어떤 마음일까?',
    },
    {
      id: 'know_worry',
      title: '효자의 간절한 \'바람\'',
      text: `성의의 고민을 알게 됐어.

어머니의 병을 낫게 하고 싶었어.

의원도, 약도 소용없었어.

"어떻게 하면... 어머니를 살릴 수 있을까?"

간절한 소망이었어.`,
      bg: 'https://images.unsplash.com/photo-1641476609477-42fc8ac254a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGludGVyaW9yJTIwcm9vbXxlbnwxfHx8fDE3NjM1MzcwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '함께 방법을 찾는다', to: 'find_way', cls: 'bg-blue-200' },
        { label: '희망을 잃지 말라고 격려한다', to: 'encourage_hope', cls: 'bg-green-200' },
      ],
      prompt: '💭 간절히 바라면 이뤄질까?',
    },
    {
      id: 'compare_brothers',
      title: '선과 악의 차이',
      text: `두 형제를 비교했어.

형 항의는 자기만 생각하고, 부모님을 무시하고, 거짓말했어.

동생 성의는 남을 먼저 생각하고, 부모님을 섬기고, 정직했어.

같은 부모 아래서도 이렇게 다를 수 있구나.

선택의 차이였어.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNzYzNTM1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '선한 길을 응원한다', to: 'support_good', cls: 'bg-green-200' },
        { label: '항의에게 기회를 준다', to: 'give_chance', cls: 'bg-orange-200' },
      ],
      prompt: '💭 사람은 왜 다르게 자랄까?',
    },
    {
      id: 'keep_helping',
      title: '꾸준한 도움의 힘',
      text: `매일 성의를 도왔어.

밭일 할 때 옆에 있어줬어.

외로울 때 노래를 불러줬어.

길을 갈 때 함께 날아갔어.

작은 도움이 쌓여 큰 힘이 됐어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '계속 함께한다', to: 'stay_together', cls: 'bg-blue-200' },
        { label: '더 큰 도움을 주고 싶다', to: 'bigger_help', cls: 'bg-purple-200' },
      ],
      prompt: '💭 작은 도움도 의미 있을까?',
    },
    {
      id: 'know_wish',
      title: '\'소망\'을 이루려는 마음',
      text: `성의의 소망을 알았어.

첫째, 어머니를 낫게 하고 싶다.

둘째, 가족이 행복했으면 좋겠다.

셋째, 형도 착해졌으면 좋겠다.

모두 자기를 위한 게 아니었어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '소망을 이루도록 돕는다', to: 'help_wish', cls: 'bg-blue-200' },
        { label: '희망을 포기하지 말라 한다', to: 'keep_hope', cls: 'bg-green-200' },
      ],
      prompt: '💭 진정한 소망이란 무엇일까?',
    },
    {
      id: 'focus_seongui',
      title: '선택과 집중',
      text: `성의에게 집중하기로 했어.

모든 사람을 다 도울 순 없어.

하지만 한 사람이라도 제대로 도울 순 있어.

성의는 그럴 가치가 있는 사람이었어.

너는 성의의 편이 됐어.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의와 더 가까워진다', to: 'get_closer', cls: 'bg-blue-200' },
        { label: '어머니의 병을 살핀다', to: 'check_mother', cls: 'bg-purple-200' },
      ],
      prompt: '💭 누구를 도와야 할까?',
    },
    {
      id: 'wait_change',
      title: '\'사필귀정\' - 인과응보를 기다리며',
      text: `항의의 변화를 기다렸어.

하지만... 더 나빠졌어.

거짓말도 늘고, 욕심도 커졌어.

언젠가 대가를 치를 거야.

사필귀정. 인과응보.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNzYzNTM1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의에게 집중한다', to: 'focus_seongui', cls: 'bg-blue-200' },
        { label: '계속 지켜본다', to: 'keep_watching', cls: 'bg-gray-200' },
      ],
      prompt: '💭 나쁜 행동의 결과는 언제 올까?',
    },
    {
      id: 'practice_control',
      title: '\'감정\' 다스림의 연습',
      text: `감정 조절을 연습했어.

다른 새가 밥을 뺏어가도 참았어.

사냥꾼이 쫓아와도 침착하게 도망쳤어.

화를 내지 않으니 더 현명해졌어.

성의에게 배운 거야.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의와 나눈다', to: 'share_learning', cls: 'bg-blue-200' },
        { label: '계속 수련한다', to: 'keep_training', cls: 'bg-purple-200' },
      ],
      prompt: '💭 감정을 다스리면 어떻게 될까?',
    },
    {
      id: 'get_closer',
      title: '진정한 우정',
      text: `성의와 더욱 가까워졌어.

말없이도 통했어.

성의가 슬프면 너도 슬펐고,

성의가 기쁘면 너도 기뻤어.

진짜 친구가 됐어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '평생 함께하고 싶다', to: 'promise_forever', cls: 'bg-blue-200' },
        { label: '어머니를 살펴본다', to: 'check_mother', cls: 'bg-purple-200' },
      ],
      prompt: '💭 진짜 친구는 어떤 존재일까?',
    },
    {
      id: 'believe_justice',
      title: '\'정의\'를 믿는 마음',
      text: `정의는 반드시 이긴다고 믿었어.

당장은 안 보여도, 언젠가는 드러나.

선한 사람은 결국 보상받고,

악한 사람은 결국 대가를 치러.

사필귀정이야.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의를 더 돕는다', to: 'help_more', cls: 'bg-blue-200' },
        { label: '정의로운 일을 한다', to: 'do_justice', cls: 'bg-green-200' },
      ],
      prompt: '💭 정의는 항상 승리할까?',
    },
    {
      id: 'watch_hangui_change',
      title: '변화의 가능성',
      text: `항의를 지켜봤어.

아버지께 혼난 후 조금 조용해졌어.

하지만 진짜 뉘우쳤을까?

아직은 모르겠어.

시간이 지나봐야 알 거야.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNzYzNTM1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '희망을 갖는다', to: 'hope_for_change', cls: 'bg-green-200' },
        { label: '성의에게 돌아간다', to: 'return_to_seongui', cls: 'bg-blue-200' },
      ],
      prompt: '💭 사람은 변할 수 있을까?',
    },
    {
      id: 'check_mother',
      title: '병든 어머니의 고통',
      text: `어머니를 살폈어.

얼굴이 창백했어. 기침이 심했어.

"괜찮다... 걱정 마라..." 말씀하셨지만 힘들어 보였어.

성의는 밤새 간호했어.

눈물을 보였어.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTM1NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의를 위로한다', to: 'comfort_seongui', cls: 'bg-blue-200' },
        { label: '치료법을 찾는다', to: 'find_cure', cls: 'bg-purple-200' },
      ],
      prompt: '💭 소중한 사람이 아프면 어떤 마음일까?',
    },
    {
      id: 'comfort_seongui',
      title: '\'슬픔\'을 나누다',
      text: `성의 곁에 앉았어.

말은 못 해도 위로가 됐어.

"기러기야... 어머니가 나으실까?"

너는 고개를 끄덕였어. 희망을 줬어.

함께 슬퍼하는 것만으로도 힘이 됐어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '희망을 준다', to: 'give_hope', cls: 'bg-green-200' },
        { label: '치료법을 함께 찾는다', to: 'find_cure', cls: 'bg-purple-200' },
      ],
      prompt: '💭 슬픔을 나누면 어떻게 될까?',
    },
    {
      id: 'find_way',
      title: '\'희망\'을 찾아서',
      text: `방법을 찾기 시작했어.

여러 마을을 날아다녔어.

의원들에게 물어봤어. (물론 말은 못 하지만)

뭔가 방법이 있을 거야.

희망을 포기하지 않았어.`,
      bg: 'https://images.unsplash.com/photo-1681820652573-4abc14628fe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzYzNTM2NzM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '계속 찾는다', to: 'keep_searching', cls: 'bg-blue-200' },
        { label: '성의에게 돌아간다', to: 'return_with_hope', cls: 'bg-green-200' },
      ],
      prompt: '💭 희망을 찾아 나서는 용기, 어디서 올까?',
    },
    {
      id: 'encourage_hope',
      title: '\'희망\'을 버리지 않는 힘',
      text: `성의를 격려했어.

날개를 퍼덕이며 힘을 냈어.

"고마워, 기러기야. 희망을 잃지 않을게."

성의의 눈에 다시 불빛이 들어왔어.

희망은 살아있는 힘이야.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '함께 방법을 찾는다', to: 'find_way', cls: 'bg-blue-200' },
        { label: '매일 격려한다', to: 'daily_encourage', cls: 'bg-green-200' },
      ],
      prompt: '💭 희망은 어디서 나올까?',
    },
    {
      id: 'support_good',
      title: '선한 길을 선택하다',
      text: `선한 길을 응원하기로 했어.

세상엔 두 길이 있어.

자기만 생각하는 길, 남을 위하는 길.

성의는 어려운 길을 선택했어.

하지만 그게 옳은 길이야.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의와 함께 간다', to: 'walk_together', cls: 'bg-blue-200' },
        { label: '선한 행동을 한다', to: 'do_good', cls: 'bg-green-200' },
      ],
      prompt: '💭 옳은 길은 항상 어려울까?',
    },
    {
      id: 'give_chance',
      title: '두 번째 기회',
      text: `항의에게 다가갔어.

혹시 모르잖아. 변할 수도 있어.

하지만 항의는 돌을 던졌어.

"저리 가!"

너는 슬펐어. 기회를 줬는데...`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTM1NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '포기하고 성의에게 간다', to: 'give_up_hangui', cls: 'bg-blue-200' },
        { label: '언젠가 깨닫기를 바란다', to: 'wish_awakening', cls: 'bg-gray-200' },
      ],
      prompt: '💭 기회를 버리는 사람은 어떻게 될까?',
    },
    {
      id: 'stay_together',
      title: '함께하는 날들',
      text: `매일 함께했어.

아침에 성의를 깨우고,

낮에 함께 일하고,

밤에 별을 보며 쉬었어.

가장 행복한 시간들이었어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '평생 이렇게 지내고 싶다', to: 'wish_forever', cls: 'bg-green-200' },
        { label: '어머니 병이 걱정된다', to: 'worry_mother', cls: 'bg-purple-200' },
      ],
      prompt: '💭 진정한 행복은 무엇일까?',
    },
    {
      id: 'bigger_help',
      title: '더 큰 도움의 \'소망\'',
      text: `더 큰 도움을 주고 싶었어.

작은 도움만으론 부족해.

어머니를 살리고 싶어.

하지만 어떻게?

너는 고민에 빠졌어.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '방법을 찾아 나선다', to: 'search_solution', cls: 'bg-blue-200' },
        { label: '성의와 상의한다', to: 'discuss_with_seongui', cls: 'bg-green-200' },
      ],
      prompt: '💭 진짜 도움이란 무엇일까?',
    },
    {
      id: 'help_wish',
      title: '\'소망\'을 이루기 위해',
      text: `소망을 이루도록 돕기로 했어.

쉽지 않을 거야. 알아.

하지만 포기할 순 없어.

성의는 그럴 자격이 있는 사람이야.

너는 결심했어.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '방법을 찾기 시작한다', to: 'start_quest', cls: 'bg-blue-200' },
        { label: '하늘에 기도한다', to: 'pray_to_heaven', cls: 'bg-purple-200' },
      ],
      prompt: '💭 소망은 노력으로 이뤄질까?',
    },
    {
      id: 'keep_hope',
      title: '\'희망\'의 불씨를 지키다',
      text: `희망을 포기하지 말라고 했어.

어둠 속에서도 불씨는 있어.

작은 희망이라도 지켜야 해.

그게 살아가는 힘이니까.

성의도 고개를 끄덕였어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '희망을 찾아 나선다', to: 'search_hope', cls: 'bg-blue-200' },
        { label: '매일 희망을 나눈다', to: 'share_hope', cls: 'bg-green-200' },
      ],
      prompt: '💭 희망은 어떻게 지켜질까?',
    },
    {
      id: 'keep_watching',
      title: '\'사필귀정\' - 시간이 증명하리라',
      text: `계속 지켜봤어.

항의는 여전히 이기적이었어.

부모님을 속이고, 동생을 괴롭히고.

하지만 언젠가 대가를 치를 거야.

시간이 증명할 거야. 사필귀정.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNzYzNTM1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의에게 돌아간다', to: 'return_to_seongui', cls: 'bg-blue-200' },
      ],
      prompt: '💭 악행의 결과는 언제 올까?',
    },
    {
      id: 'share_learning',
      title: '배움을 나누다',
      text: `성의에게 배운 걸 보여줬어.

참을성 있게 행동했어.

화내지 않고 침착하게 대응했어.

"기러기야, 넌 정말 현명하구나."

성의가 미소 지었어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '함께 수련한다', to: 'train_together', cls: 'bg-blue-200' },
        { label: '어머니를 살핀다', to: 'check_mother', cls: 'bg-purple-200' },
      ],
      prompt: '💭 배움은 나누면 어떻게 될까?',
    },
    {
      id: 'keep_training',
      title: '꾸준한 수련',
      text: `매일 수련했어.

감정을 다스리는 법을 익혔어.

어려움이 와도 흔들리지 않았어.

마음이 평온해졌어.

진정한 힘을 얻었어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의와 나눈다', to: 'share_with_seongui', cls: 'bg-blue-200' },
        { label: '더 큰 시련을 준비한다', to: 'prepare_trial', cls: 'bg-purple-200' },
      ],
      prompt: '💭 진정한 힘은 어디서 나올까?',
    },
    {
      id: 'promise_forever',
      title: '영원한 우정의 약속',
      text: `평생 함께하기로 마음먹었어.

성의도 같은 마음이었어.

"기러기야, 너는 내 가장 소중한 친구야."

말은 못 해도 너도 그랬어.

영원한 우정을 약속했어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '어머니를 도우러 간다', to: 'help_mother', cls: 'bg-purple-200' },
      ],
      prompt: '💭 진정한 우정은 무엇일까?',
    },
    {
      id: 'help_more',
      title: '선한 이를 돕는 즐거움',
      text: `성의를 더 많이 도왔어.

짐을 날라주고, 길을 안내하고, 위험을 알렸어.

작은 도움이 모여 큰 힘이 됐어.

선한 사람을 돕는 건 기쁜 일이야.

정의로운 일이기도 하고.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '계속 돕는다', to: 'continue_helping', cls: 'bg-blue-200' },
        { label: '더 큰 도움이 필요하다', to: 'need_bigger_help', cls: 'bg-purple-200' },
      ],
      prompt: '💭 선한 일을 하면 어떤 기분일까?',
    },
    {
      id: 'do_justice',
      title: '\'정의\'로운 행동',
      text: `정의로운 일을 했어.

약한 새를 괴롭히는 매를 쫓아냈어.

떨어진 새끼를 둥지에 돌려줬어.

작은 일이지만 의미가 있었어.

정의는 말이 아니라 행동이야.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '계속 정의롭게 산다', to: 'live_justly', cls: 'bg-green-200' },
        { label: '성의를 돕는다', to: 'help_seongui_more', cls: 'bg-blue-200' },
      ],
      prompt: '💭 정의란 무엇일까?',
    },
    {
      id: 'hope_for_change',
      title: '변화를 \'바라는\' 마음',
      text: `항의가 변하길 바랐어.

누구나 변할 수 있어.

늦지 않았어.

하지만... 스스로 깨달아야 해.

너는 희망을 가졌어.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '기다려본다', to: 'wait_and_see', cls: 'bg-gray-200' },
        { label: '성의에게 집중한다', to: 'focus_on_seongui', cls: 'bg-blue-200' },
      ],
      prompt: '💭 변화는 언제 올까?',
    },
    {
      id: 'return_to_seongui',
      title: '진짜 중요한 것',
      text: `성의에게 돌아갔어.

항의를 바꾸려는 건 시간 낭비야.

진짜 중요한 건 성의를 돕는 거야.

선한 사람을 돕는 게 더 의미 있어.

선택과 집중이야.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의와 함께한다', to: 'with_seongui', cls: 'bg-blue-200' },
      ],
      prompt: '💭 무엇이 진짜 중요할까?',
    },
    {
      id: 'find_cure',
      title: '치료법을 찾아서',
      text: `치료법을 찾기 시작했어.

여러 마을을 날아다녔어.

의원들도, 약사들도 방법을 몰랐어.

모두가 고개를 저었어.

하지만 포기할 수 없었어.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNzYzNTM1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의에게 돌아간다', to: 'return_with_comfort', cls: 'bg-blue-200' },
        { label: '계속 찾아본다', to: 'keep_searching', cls: 'bg-purple-200' },
      ],
      prompt: '💭 답을 찾지 못해도 계속 찾아야 할까?',
    },
    {
      id: 'give_hope',
      title: '\'희망\'을 주는 친구',
      text: `희망을 줬어.

날개를 펼쳐 하늘을 가리켰어.

"어머니는 나으실 거야" 전하고 싶었어.

성의의 얼굴이 밝아졌어.

희망은 살아가는 힘이야.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '치료법을 찾는다', to: 'find_cure', cls: 'bg-purple-200' },
        { label: '매일 희망을 준다', to: 'daily_hope', cls: 'bg-green-200' },
      ],
      prompt: '💭 희망은 전염될까?',
    },
    {
      id: 'keep_searching',
      title: '포기하지 않는 탐색',
      text: `계속 찾아다녔어.

산을 넘고, 강을 건너고, 먼 마을까지.

지쳤지만 포기하지 않았어.

성의를 위해서, 어머니를 위해서.

희망을 찾을 때까지.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '드디어 소식을 듣는다', to: 'hear_news', cls: 'bg-blue-200' },
      ],
      prompt: '💭 포기하지 않으면 어떻게 될까?',
    },
    {
      id: 'return_with_hope',
      title: '\'희망\'을 안고 돌아오다',
      text: `성의에게 돌아왔어.

아직 확실한 건 아니지만, 희망이 생겼어.

성의는 너를 반겼어.

"어디 갔었어? 걱정했잖아."

너는 좋은 소식이 있다고 말하고 싶었어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '더 조사한다', to: 'investigate_more', cls: 'bg-purple-200' },
        { label: '함께 찾는다', to: 'search_together', cls: 'bg-blue-200' },
      ],
      prompt: '💭 희망을 나누면 어떻게 될까?',
    },
    {
      id: 'daily_encourage',
      title: '매일의 격려',
      text: `매일 격려했어.

아침마다 밝게 울어줬어.

힘들 때 곁에 있어줬어.

"괜찮아, 희망은 있어" 전했어.

작은 격려가 큰 힘이 됐어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '계속 격려한다', to: 'keep_encouraging', cls: 'bg-green-200' },
        { label: '치료법을 찾는다', to: 'find_cure', cls: 'bg-purple-200' },
      ],
      prompt: '💭 격려의 힘은 얼마나 클까?',
    },
    {
      id: 'walk_together',
      title: '함께 걷는 길',
      text: `성의와 함께 걸었어.

선한 길은 외로운 길이야.

하지만 함께하면 외롭지 않아.

서로 힘이 되어주며 걸었어.

이게 진짜 우정이야.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '평생 함께 간다', to: 'lifelong_journey', cls: 'bg-blue-200' },
        { label: '어머니를 돕는다', to: 'help_mother', cls: 'bg-purple-200' },
      ],
      prompt: '💭 함께하는 길은 어떤 의미일까?',
    },
    {
      id: 'do_good',
      title: '선한 행동의 실천',
      text: `선한 행동을 했어.

다친 새를 도와주고,

길 잃은 새끼를 찾아주고,

약한 새를 지켜줬어.

선한 행동은 기분 좋은 일이야.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '계속 선한 일을 한다', to: 'continue_good', cls: 'bg-green-200' },
        { label: '성의를 돕는다', to: 'help_seongui_more', cls: 'bg-blue-200' },
      ],
      prompt: '💭 선한 행동은 돌아올까?',
    },
    {
      id: 'give_up_hangui',
      title: '선택의 결과',
      text: `항의를 포기했어.

도울 수 없는 사람은 있어.

스스로 변하려 하지 않으면 소용없어.

너는 성의에게 집중하기로 했어.

그게 더 나은 선택이야.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTM1NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의와 함께한다', to: 'with_seongui', cls: 'bg-blue-200' },
      ],
      prompt: '💭 때로는 포기하는 것도 지혜일까?',
    },
    {
      id: 'wish_awakening',
      title: '깨달음을 기다리며',
      text: `항의가 언젠가 깨닫기를 바랐어.

사필귀정. 악행은 결국 대가를 치러.

그때 항의가 깨달을 거야.

너무 늦지 않길 바랄 뿐이야.

선택은 항의 몫이야.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNzYzNTM1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의에게 간다', to: 'return_to_seongui', cls: 'bg-blue-200' },
      ],
      prompt: '💭 깨달음은 언제 올까?',
    },
    {
      id: 'wish_forever',
      title: '영원한 순간',
      text: `평생 이렇게 지내고 싶었어.

행복한 날들이었어.

하지만... 어머니의 병이 악화됐어.

행복은 오래가지 않았어.

너는 뭔가 해야 한다고 느꼈어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '치료법을 찾는다', to: 'find_cure', cls: 'bg-purple-200' },
      ],
      prompt: '💭 행복을 지키려면 무엇을 해야 할까?',
    },
    {
      id: 'worry_mother',
      title: '커지는 \'걱정\'',
      text: `어머니의 병이 더 심해졌어.

이대로는 안 돼.

뭔가 해야 해.

성의는 밤새 울었어.

너도 함께 슬펐어.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTM1NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '치료법을 찾아 나선다', to: 'find_cure', cls: 'bg-purple-200' },
        { label: '성의와 함께 고민한다', to: 'discuss_with_seongui', cls: 'bg-blue-200' },
      ],
      prompt: '💭 사랑하는 사람을 어떻게 지킬까?',
    },
    {
      id: 'search_solution',
      title: '해결책을 찾아서',
      text: `해결책을 찾아 나섰어.

멀리 날아가 이것저것 물어봤어.

하지만 아무도 방법을 몰랐어.

어려운 병이라고 했어.

그래도 포기할 순 없었어.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '계속 찾아본다', to: 'keep_searching', cls: 'bg-purple-200' },
        { label: '성의에게 돌아간다', to: 'return_with_comfort', cls: 'bg-blue-200' },
      ],
      prompt: '💭 답을 찾지 못해도 계속해야 할까?',
    },
    {
      id: 'discuss_with_seongui',
      title: '함께 고민하다',
      text: `성의와 함께 고민했어.

"어떻게 하면 어머니를 구할 수 있을까?"

너는 날개로 여러 곳을 가리켰어.

"네가 더 멀리 날아 다녀 보겠다는거야?" 성의가 물었어.

너는 고개를 끄덕였어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '함께 방법을 찾는다', to: 'search_solution', cls: 'bg-purple-200' },
      ],
      prompt: '💭 함께 고민하면 답이 보일까?',
    },
    {
      id: 'start_quest',
      title: '\'소망\'을 위한 여정',
      text: `여정을 시작했어.

어머니를 살릴 방법을 찾으러.

쉽지 않을 거야.

하지만 성의를 위해서, 어머니를 위해서.

너는 날아올랐어.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '멀리 날아간다', to: 'fly_far', cls: 'bg-blue-500' },
      ],
      prompt: '💭 소망을 이루려면 얼마나 노력해야 할까?',
    },
    {
      id: 'pray_to_heaven',
      title: '하늘에 비는 \'바람\'',
      text: `하늘을 향해 기도했어.

선한 사람이 고통받는 건 부당해.

성의는 효자야. 어머니는 선한 분이야.

하늘이 들어주실 거야.

사필귀정. 정의는 이긴다.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '계속 기도한다', to: 'keep_praying', cls: 'bg-purple-200' },
        { label: '직접 행동한다', to: 'take_action', cls: 'bg-blue-200' },
      ],
      prompt: '💭 기도는 이뤄질까?',
    },
    {
      id: 'search_hope',
      title: '\'희망\'의 탐색',
      text: `희망을 찾아 나섰어.

여러 마을, 여러 산을 날아다녔어.

희망은 멀리 있지 않았어.

사람들 사이에, 이야기 속에 있었어.

작은 희망들을 모았어.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의와 희망을 나눈다', to: 'share_hope', cls: 'bg-blue-200' },
      ],
      prompt: '💭 희망은 어디에 있을까?',
    },
    {
      id: 'share_hope',
      title: '\'희망\'을 나누는 기쁨',
      text: `매일 희망을 나눴어.

성의와 희망을 이야기했어.

"내일은 더 나을 거야."

"어머니는 나으실 거야."

희망을 나누니 배가 됐어.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '계속 나눈다', to: 'keep_sharing', cls: 'bg-green-200' },
        { label: '구체적 방법을 찾는다', to: 'find_cure', cls: 'bg-purple-200' },
      ],
      prompt: '💭 희망을 나누면 커질까?',
    },
    {
      id: 'train_together',
      title: '함께 수련하다',
      text: `성의와 함께 수련했어.

감정을 다스리는 법을 함께 익혔어.

어려움이 와도 흔들리지 않는 법을.

서로 배우며 성장했어.

더 강해졌어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '계속 수련한다', to: 'continue_training', cls: 'bg-purple-200' },
        { label: '어머니를 돕는다', to: 'help_mother', cls: 'bg-blue-200' },
      ],
      prompt: '💭 함께 배우면 더 강해질까?',
    },
    {
      id: 'share_with_seongui',
      title: '배움을 나누다',
      text: `성의에게 배운 걸 보여줬어.

평온한 마음, 참을성, 감정 조절.

"기러기야, 넌 정말 현명해."

성의가 감동했어.

서로에게 배웠어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '함께 성장한다', to: 'grow_together', cls: 'bg-green-200' },
        { label: '어머니를 돕는다', to: 'help_mother', cls: 'bg-purple-200' },
      ],
      prompt: '💭 서로 배우며 성장한다는 건?',
    },
    {
      id: 'prepare_trial',
      title: '시련을 준비하다',
      text: `큰 시련이 올 것 같았어.

어머니의 병은 더 심해졌어.

성의는 결단을 내려야 할 거야.

너도 함께할 준비를 했어.

어떤 어려움이 와도 함께할 거야.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNzYzNTM1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의 곁을 지킨다', to: 'stay_by_seongui', cls: 'bg-blue-200' },
      ],
      prompt: '💭 시련은 어떻게 준비할까?',
    },
    {
      id: 'help_mother',
      title: '어머니를 돕기 위해',
      text: `어머니를 돕기로 했어.

하지만 기러기인 너로서는 한계가 있어.

약초를 찾아다녔지만 소용없었어.

더 강력한 치료법이 필요해.

하지만 방법을 찾지 못했어.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTM1NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의 곁을 지킨다', to: 'stay_by_seongui', cls: 'bg-blue-200' },
      ],
      prompt: '💭 정말 중요한 순간, 무엇을 할까?',
    },
    {
      id: 'continue_helping',
      title: '끊임없는 도움',
      text: `계속 도왔어.

포기하지 않았어.

작은 도움이라도 꾸준히.

성의는 힘을 얻었어.

"네가 있어서 다행이야."`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '어머니를 위한 방법을 찾는다', to: 'find_cure', cls: 'bg-purple-200' },
      ],
      prompt: '💭 꾸준한 도움은 어떤 결과를 낼까?',
    },
    {
      id: 'need_bigger_help',
      title: '더 큰 도움의 필요성',
      text: `작은 도움으론 부족해.

어머니는 점점 약해지고 있어.

더 큰 도움이 필요해.

하지만 너로서는 한계가 있어.

그래도 성의 곁을 지키고 싶어.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNzYzNTM1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의를 위로한다', to: 'comfort_seongui', cls: 'bg-blue-200' },
      ],
      prompt: '💭 큰 문제는 큰 해결책이 필요할까?',
    },
    {
      id: 'live_justly',
      title: '\'정의\'롭게 사는 삶',
      text: `정의롭게 살기로 했어.

매일 옳은 일을 하고,

약한 이를 돕고,

악한 일에 맞서고.

이게 올바른 삶이야.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의와 함께 정의롭게 산다', to: 'justice_together', cls: 'bg-green-200' },
      ],
      prompt: '💭 정의롭게 산다는 건 무엇일까?',
    },
    {
      id: 'help_seongui_more',
      title: '성의를 더 돕다',
      text: `성의를 더 많이 도왔어.

어머니 간호를 도왔어.

일을 함께 했어.

슬플 때 곁에 있어줬어.

진짜 친구로서.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '함께 고민한다', to: 'discuss_with_seongui', cls: 'bg-blue-200' },
      ],
      prompt: '💭 진정한 도움이란?',
    },
    {
      id: 'wait_and_see',
      title: '기다림의 시간',
      text: `조금 더 기다렸어.

하지만 항의는 변하지 않았어.

오히려 더 나빠졌어.

너는 깨달았어. 시간 낭비라는 걸.

성의에게 집중하기로 했어.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNzYzNTM1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의에게 간다', to: 'focus_on_seongui', cls: 'bg-blue-200' },
      ],
      prompt: '💭 때로는 포기도 필요할까?',
    },
    {
      id: 'focus_on_seongui',
      title: '진정한 선택',
      text: `성의에게 집중했어.

모든 시간과 노력을 성의를 위해.

이게 옳은 선택이야.

선한 사람을 돕는 게 의미 있어.

너는 확신했어.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의와 함께한다', to: 'with_seongui', cls: 'bg-blue-200' },
      ],
      prompt: '💭 옳은 선택이란 것을 어떻게 알까?',
    },
    {
      id: 'with_seongui',
      title: '하늘에서 함께',
      text: `성의 곁에 있었어.

매일, 항상.

어려울 때도, 기쁠 때도.

진짜 친구는 곁에 있는 거야.

너는 성의의 친구였어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '어머니를 돕는다', to: 'help_mother', cls: 'bg-purple-200' },
      ],
      prompt: '💭 진정한 우정이란 뭘까?',
    },
    {
      id: 'tell_seongui',
      title: '\'희망\'의 전달',
      text: `성의에게 알렸어.

날개를 펼쳐 먼 곳을 가리켰어.

"네가 더 멀리 날아 다녀 보겠다는 거야?" 성의가 물었어.

너는 고개를 끄덕였어.

"어딘가 만병통치약만 있다면 나도..." 성의가 중얼거렸어.

어디선가 들은 적 있나봐.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '더 자세히 알아본다', to: 'investigate_more', cls: 'bg-purple-200' },
      ],
      prompt: '💭 희망을 전하면 어떻게 될까?',
    },
    {
      id: 'investigate_more',
      title: '도사의 소문',
      text: `여러 마을을 날아다니며 소문을 들었어.

"한 도사가 이 나라에 나타났다더라."

"세상의 많은 것을 아는 분이래."

"만병통치약에 대해서도 아실지 몰라."

왠지 도사님이 희망을 줄 수 있을 것 같았어.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNzYzNTM1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '궁궐로 돌아간다', to: 'wait_at_palace', cls: 'bg-blue-200' },
      ],
      prompt: '💭 희망은 뜻밖의 곳에서 올까?',
    },
    {
      id: 'hear_news',
      title: '소식을 듣다',
      text: `드디어 소식을 들었어!

"한 도사가 이 나라에 계신대."

"세상의 많은 것을 아는 분이래."

"만병통치약에 대해서도 아실지 몰라."

희망이야! 진짜 희망이야!`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의에게 알린다', to: 'tell_about_daosa', cls: 'bg-blue-200' },
      ],
      prompt: '💭 희망을 발견하면 어떤 기분일까?',
    },
    {
      id: 'search_together',
      title: '함께하는 탐색',
      text: `성의와 함께 찾았어.

성의는 마을을 돌아다녔고,

너는 하늘을 날며 소문을 들었어.

함께하니 더 빨리 찾았어.

"도사"에 대한 소문을.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '더 알아본다', to: 'investigate_more', cls: 'bg-purple-200' },
      ],
      prompt: '💭 함께하면 더 빨리 찾을까?',
    },
    {
      id: 'keep_encouraging',
      title: '끊임없는 격려',
      text: `매일 격려했어.

"포기하지 마."

"희망은 있어."

"어머니는 낫으실 거야."

성의는 힘을 얻었어.

격려는 마법 같은 힘이야.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '도사 소문을 알아본다', to: 'investigate_more', cls: 'bg-purple-200' },
      ],
      prompt: '💭 격려는 얼마나 중요할까?',
    },
    {
      id: 'lifelong_journey',
      title: '평생의 여정',
      text: `평생 함께하기로 했어.

어떤 일이 있어도.

성의도 같은 마음이었어.

"넌 내 가장 소중한 친구야, 기러기야."

영원한 우정을 약속했어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '도사 소식을 듣는다', to: 'hear_about_ilyeongju', cls: 'bg-purple-200' },
      ],
      prompt: '💭 평생 친구란?',
    },
    {
      id: 'continue_good',
      title: '선한 행동의 연속',
      text: `계속 선한 일을 했어.

매일, 조금씩.

작은 선행이 모여 큰 선이 돼.

세상이 조금씩 나아졌어.

선한 행동은 전염돼.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의와 함께 선한 일을 한다', to: 'good_together', cls: 'bg-green-200' },
      ],
      prompt: '💭 선한 행동은 전염될까?',
    },
    {
      id: 'fly_far',
      title: '먼 여정의 시작',
      text: `멀리 날아갔어.

산을 넘고, 강을 건너고.

지쳤지만 멈추지 않았어.

성의를 위해, 어머니를 위해.

희망을 찾을 때까지.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '도사 소식을 듣는다', to: 'hear_about_ilyeongju', cls: 'bg-purple-200' },
      ],
      prompt: '💭 멀리 가야만 하는 이유는?',
    },
    {
      id: 'keep_praying',
      title: '간절한 기도',
      text: `계속 기도했어.

매일 하늘을 향해.

"선한 사람이 행복하게 해주세요."

"정의가 승리하게 해주세요."

간절함은 하늘에 닿을 거야.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '행동으로 옮긴다', to: 'take_action', cls: 'bg-blue-200' },
      ],
      prompt: '💭 기도와 행동, 무엇이 먼저일까?',
    },
    {
      id: 'take_action',
      title: '행동으로 옮기다',
      text: `기도만으론 부족해.

행동해야 해.

기도하며 기다려야 해.

성의도, 너도.

함께 움직일 때야.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '도사 소문을 듣는다', to: 'investigate_more', cls: 'bg-purple-200' },
      ],
      prompt: '💭 기도만 하고 행동은 안하면 어떻게 될까?',
    },
    {
      id: 'follow_rumor',
      title: '소문을 따라서',
      text: `소문을 쫓아갔어.

"도사가 이 나라에 계신대."

"세상의 많은 것을 아는 분이래."

"만병통치약에 대해서도 아실지 몰라."

정보를 모았어.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNzYzNTM1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의에게 알린다', to: 'tell_about_daosa', cls: 'bg-blue-200' },
      ],
      prompt: '💭 소문 속에 진실이 있을까?',
    },
    {
      id: 'keep_sharing',
      title: '\'희망\'을 계속 나누다',
      text: `계속 희망을 나눴어.

성의와, 가족과.

희망은 나눌수록 커져.

어머니도 희망을 느꼈어.

"괜찮을 거야..." 미소 지으셨어.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '구체적 방법을 찾는다', to: 'investigate_more', cls: 'bg-purple-200' },
      ],
      prompt: '💭 희망은 나눌수록 커질까?',
    },
    {
      id: 'continue_training',
      title: '꾸준한 성장',
      text: `계속 수련했어.

감정 조절, 참을성, 평온함.

성의와 함께 성장했어.

곧 큰 시련이 올 거야.

준비가 필요해.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '도사 소식을 듣는다', to: 'hear_about_ilyeongju', cls: 'bg-purple-200' },
      ],
      prompt: '💭 수련은 왜 필요할까?',
    },
    {
      id: 'grow_together',
      title: '함께 성장하다',
      text: `서로에게 배우며 성장했어.

성의는 너에게 효심과 인내를,

너는 성의에게 희망과 용기를.

함께여서 더 강해졌어.

진정한 성장이야.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '도사 소식을 듣는다', to: 'investigate_more', cls: 'bg-purple-200' },
      ],
      prompt: '💭 함께 성장한다는 건?',
    },
    {
      id: 'stay_by_seongui',
      title: '곁을 지키다',
      text: `성의 곁을 지켰어.

어떤 일이 있어도 함께할 거야.

어머니의 병은 더 심해졌어.

이제 결단을 내릴 때야.

방법을 찾아야 해.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTM1NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '도사에 대해 듣는다', to: 'hear_about_ilyeongju', cls: 'bg-purple-200' },
      ],
      prompt: '💭 진정한 우정은 어떤 모습일까?',
    },
    {
      id: 'justice_together',
      title: '함께 \'정의\'를 실천하다',
      text: `성의와 함께 정의롭게 살았어.

옳은 일을 하고, 약한 이를 돕고.

사필귀정. 정의는 이긴다.

두 친구는 빛이 됐어.

어둠 속의 빛.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '어머니를 위한 길을 찾는다', to: 'hear_about_ilyeongju', cls: 'bg-purple-200' },
      ],
      prompt: '💭 정의로운 삶은 어떤 삶일까?',
    },
    {
      id: 'hear_about_ilyeongju',
      title: '도사의 소문',
      text: `드디어 확실한 정보를 들었어.

한 마을 노인이 말했어.

"한 도사가 이 나라를 여행하고 계신다네."

"세상의 많은 것을 아는 분이라더라."

"혹시 만병통치약에 대해서도 아실지 몰라."

왠지 도사님이 희망을 줄 수 있을 것 같았어.`,
      bg: 'https://images.unsplash.com/photo-1655645894221-948b9d2c7ed2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHRlbXBsZXxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '성의와 상의한다', to: 'discuss_decision', cls: 'bg-blue-200' },
      ],
      prompt: '💭 희망은 뜻밖의 곳에서 올까?',
    },
    {
      id: 'tell_about_daosa',
      title: '\'희망\'의 소식',
      text: `성의에게 도사에 대해 전했어.

날개를 펼쳐 하늘을 가리켰어.

이 나라에 도사가 계신다고.

"도사님...?" 성의의 눈이 반짝였어.

희망이 보였어. 왠지 도움을 받을 수 있을 것 같았어.`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '기다리며 기도한다', to: 'wait_at_palace', cls: 'bg-purple-200' },
      ],
      prompt: '💭 어려운 희망도 희망일까?',
    },
    {
      id: 'wait_at_palace',
      title: '간절한 기다림',
      text: `궁궐로 돌아와 기다렸어.

성의는 매일 기도했어.

"하늘이시여, 도와주소서..."

너도 함께 간절히 빌었어.

진심은 하늘에 닿을 거야.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNjM1MzU0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '도사가 찾아온다', to: 'daosa_arrives', cls: 'bg-blue-200' },
      ],
      prompt: '💭 진심은 통할까?',
    },
    {
      id: 'good_together',
      title: '함께하는 선행',
      text: `성의와 함께 선한 일을 했어.

마을 사람들을 도왔어.

어려운 이웃을 돌봤어.

사람들이 고마워했어.

"너희는 참 착한 친구들이구나."

선한 행동은 돌고 돈다.`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '어머니를 위한 길을 찾는다', to: 'hear_about_ilyeongju', cls: 'bg-purple-200' },
      ],
      prompt: '💭 선한 행동의 결과는?',
    },
    {
      id: 'discuss_decision',
      title: '결단의 시간',
      text: `성의와 진지하게 이야기했어.

"기러기야, 방법을 찾아야 해. 어머니를 위해."

"어떻게든 도움을 받을 수 있을 거야."

너는 고개를 끄덕였어.

함께 희망을 품었어.`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTM1NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '기다리며 기도한다', to: 'daosa_arrives', cls: 'bg-blue-200' },
      ],
      prompt: '💭 어려운 결단, 어떻게 내릴까?',
    },
    {
      id: 'decision_time',
      title: '효심의 결단',
      text: `성의가 결심했어.

"어떻게든 방법을 찾겠습니다."

아버지가 걱정하셨어. "분명 쉬운 방법은 없을테다..."

하지만 성의는 흔들리지 않았어.

"어머니를 구할 수 있다면, 무엇이든 하겠습니다."

너는 함께 기도했어.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNzYzNTM1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '도사가 찾아온다', to: 'daosa_arrives', cls: 'bg-blue-200' },
      ],
      prompt: '💭 효심은 어디까지 갈까?',
    },
    {
      id: 'daosa_arrives',
      title: '도사의 방문',
      text: `그날 밤, 놀라운 일이 일어났어.

한 도사가 궁궐에 찾아왔어.

흰 수염을 기른, 신비로운 분이셨어.

"왕자님의 효심이 하늘에 닿았습니다."

도사가 말씀하셨어.

모두가 놀라 바라봤어.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNzYzNTM1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '도사의 말을 듣는다', to: 'daosa_speaks', cls: 'bg-blue-200' },
      ],
      prompt: '💭 진심은 하늘에 닿을까?',
    },
    {
      id: 'daosa_speaks',
      title: '일영주의 희망',
      text: `도사가 말씀하셨어.

"멀고 먼 서천에 일영주라는 신비한 구슬이 있습니다."

"그것만이 왕비님을 구할 수 있습니다."

"하지만... 그 길은 험난할 것입니다."

성의의 눈빛이 결연해졌어.

희망과 각오가 함께 있었어.`,
      bg: 'https://images.unsplash.com/photo-1655645894221-948b9d2c7ed2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHRlbXBsZXxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '새로운 시작', to: 'ending', cls: 'bg-blue-200' },
      ],
      prompt: '💭 희망이 생기면 용기도 생길까?',
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `도사의 말씀을 들은 성의 왕자.
일영주에 대한 희망을 품었어.

너도 함께 있었어. 친구로서.
어떤 어려움이 기다리든, 함께할 거야.

《적성의전》에서는 성의 왕자가 서천으로 떠나 일영주를 구하기 위해 온갖 시련을 겪는 놀라운 모험이 펼쳐져!

과연 성의는 일영주를 구할 수 있을까? 어머니는 나으실까? 형 항의는 어떻게 될까? 기러기와의 우정은 계속될까?

📚 서점이나 도서관에서 《적성의전》을 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1616627042766-2190228f1881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHJvb2YlMjB0aWxlfGVufDF8fHx8MTc2MzUzNTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' },
      ],
      prompt: '《적성의전》 - 효자 성의의 판타지 어드벤처! 바라는 것을 위해 고난을 극복하고, 감정을 잘 다스리면 모든 것이 바른 길로 이어진다는 사필귀정의 교훈이 담겨 있어.',
    },
  ];
}

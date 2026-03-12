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

export function generateByeoljubuStory(
  gradeLevel: string,
  lastName: string,
  firstName: string
): Scene[] {
  const name = createNameVariations(lastName, firstName);

  return [
    {
      id: 'start',
      title: '낭만 어의 허사부',
      text: `너의 이름은 ${name.full}.

조선시대, 너는 명의 허준 선생님의 제자가 되었어.

"의술은 사람을 살리는 일이다. 신분을 가리지 말고, 마음을 다해 치료해야 한다." 허준 선생님의 첫 가르침이었어.

오늘은 첫 진료 날. 두 명의 환자가 기다리고 있어.
한 명은 배 아픈 양반, 다른 한 명은 열이 심한 천민 아이.`,
      bg: 'https://images.unsplash.com/photo-1723976710497-7eca60bf0835',
      choices: [
        { label: '양반을 먼저 진료한다', to: 'treat_yangban', cls: 'bg-blue-200' },
        { label: '아픈 아이를 먼저 본다', to: 'treat_child', cls: 'bg-red-200' },
      ],
      prompt: '💭 누구를 먼저 치료해야 할까?',
    },
    {
      id: 'treat_yangban',
      title: '신분의 벽',
      text: `양반을 먼저 진료했어. "당연한 일 아니냐!" 양반이 말했어.

맥을 짚어보니 체했을 뿐이야. 약을 처방했어.

그 사이 천민 아이의 열은 더 올랐어. 어머니가 울며 애원했어.

허준 선생님이 말씀하셨어. "급한 환자를 먼저 보는 것이 의원의 도리다. 신분보다 생명이 먼저야."`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNjM1MzU0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '가르침을 새긴다', to: 'learn_lesson', cls: 'bg-green-200' },
      ],
      prompt: '💭 신분과 생명, 무엇이 먼저일까?',
    },
    {
      id: 'treat_child',
      title: '의원의 도리',
      text: `급한 환자부터 보기로 했어. 아이의 열이 너무 높았거든.

양반이 화를 냈어. "천민 따위를 먼저 보다니!" 하지만 신경 쓸 겨를이 없었어.

침을 놓고 약을 달여 먹였어. 아이의 열이 서서히 내렸어.

허준 선생님이 미소 지으셨어. "잘했다. 의원은 생명을 먼저 보는 법이다."`,
      bg: 'https://images.unsplash.com/photo-1723976710497-7eca60bf0835',
      choices: [
        { label: '보람을 느낀다', to: 'learn_lesson', cls: 'bg-green-200' },
      ],
      prompt: '💭 올바른 선택이란 무엇일까?',
    },
    {
      id: 'learn_lesson',
      title: '언젠가는 슬기로운 수련의 생활',
      text: `매일 환자를 보고, 약재를 다루고, 의서를 공부했어.

허준 선생님은 엄하지만 따뜻했어. "동의보감을 완성하면, 모든 백성이 의술의 혜택을 받을 수 있을 거야."

너는 선생님을 존경했어. 양반 출신이 아니지만, 실력으로 임금님의 어의가 되신 분.

어느 날, 심한 복통을 호소하는 환자가 왔어. 증상을 살펴야 해.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNjM1MzU0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '맥을 짚어본다', to: 'check_pulse', cls: 'bg-blue-200' },
        { label: '증상을 물어본다', to: 'ask_symptoms', cls: 'bg-green-200' },
      ],
      prompt: '💭 존경받는 사람의 덕목은?',
    },
    {
      id: 'check_pulse',
      title: '맥진의 기술',
      text: `맥을 짚었어. 선생님께 배운 대로 집중했어.

"맥이 빠르고 거칠구나..." 열이 있고 염증이 의심돼.

환자에게 물었어. "언제부터 아프셨습니까?" "어제 저녁부터요..."

허준 선생님이 고개를 끄덕이셨어. "잘 관찰했다. 맥진과 문진, 둘 다 중요하지."`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNjM1MzU0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '약을 처방한다', to: 'medical_dilemma', cls: 'bg-purple-200' },
      ],
      prompt: '💭 의사에게 필요한 능력은?',
    },
    {
      id: 'ask_symptoms',
      title: '문진의 중요성',
      text: `"어디가 어떻게 아프신가요?" 꼼꼼히 물었어.

"배가 쥐어짜는 것 같고, 열도 나요..." 환자가 신음했어.

맥을 짚어보니 역시 염증 증상이 있어. 문진과 일치해.

허준 선생님이 말씀하셨어. "환자의 말을 잘 들어야 해. 몸은 거짓말을 하지 않는단다."`,
      bg: 'https://images.unsplash.com/photo-1723976710497-7eca60bf0835',
      choices: [
        { label: '치료를 시작한다', to: 'medical_dilemma', cls: 'bg-purple-200' },
      ],
      prompt: '💭 경청은 왜 중요할까?',
    },
    {
      id: 'medical_dilemma',
      title: '백성의 고민',
      text: `약을 처방했지만, 환자가 난처해했어. "죄송하지만... 돈이 없습니다."

가난한 백성이었어. 약값을 낼 수 없다고.

다른 환자들이 여럿 기다리고 있어. 궁궐에서 온 급한 환자도 있어.

허준 선생님이 너를 바라보셨어. "네 판단에 맡기마." 시험하시는 거야.`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '무료로 약을 준다', to: 'help_common', cls: 'bg-green-200' },
        { label: '궁궐 환자를 먼저 본다', to: 'serve_palace', cls: 'bg-blue-200' },
      ],
      prompt: '💭 의원의 우선순위는?',
    },
    {
      id: 'help_common',
      title: '백성을 위한 의술',
      text: `"염려 마세요. 약은 제가 드리겠습니다." 너는 말했어.

환자가 눈물을 흘렸어. "은인이십니다!"

허준 선생님이 미소 지으셨어. "나도 그렇게 해왔단다. 의술은 백성을 위한 것이니까."

하지만 궁궐 사람이 불만스러운 표정을 지었어. "천민 따위를 먼저 보다니..."`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNjM1MzU0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '신념을 지킨다', to: 'conviction', cls: 'bg-purple-200' },
      ],
      prompt: '💭 옳은 일에는 대가가 따를까?',
    },
    {
      id: 'serve_palace',
      title: '왕실을 섬기다',
      text: `"죄송합니다. 궁궐 환자를 먼저 봐야겠습니다." 현실적으로 판단했어.

궁궐 환자는 가벼운 감기였어. 하지만 신분이 높으니 정성껏 치료했어.

가난한 환자는 실망한 표정으로 돌아갔어.

허준 선생님이 ��숨을 쉬셨어. "때로는 어려운 선택을 해야 하지. 하지만 잊지 마라. 의원의 본분을."`,
      bg: 'https://images.unsplash.com/photo-1610349633888-c6058d7393e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBwYWxhY2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzYzNTM1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '후회를 느낀다', to: 'conviction', cls: 'bg-purple-200' },
      ],
      prompt: '💭 현실과 이상 사이에서?',
    },
    {
      id: 'conviction',
      title: '어의의 소명',
      text: `시간이 흘렀어. 너는 실력이 늘어 더 많은 환자를 돌볼 수 있게 됐어.

허준 선생님은 왕의 어의지만, 틈날 때마다 백성을 치료하셨어.

"왕도 신하도, 백성도 모두 사람이다. 아프면 같은 방법으로 치료해야 하지."

그날 밤, 선생님은 동의보감 집필에 열중하셨어. "이 책이 완성되면 많은 이가 구원받을 거야."`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNjM1MzU0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '선생님을 돕는다', to: 'help_book', cls: 'bg-green-200' },
        { label: '의술을 더 배운다', to: 'study_more', cls: 'bg-blue-200' },
      ],
      prompt: '💭 의사의 사명은 무엇일까?',
    },
    {
      id: 'help_book',
      title: '동의보감의 꿈',
      text: `선생님의 동의보감 집필을 도왔어. 약초를 정리하고, 처방을 기록했어.

"이 책에는 모든 병과 치료법이 담길 거야. 양반도 천민도 누구나 볼 수 있게."

선생님의 꿈은 장대했어. 신분을 넘어 모두가 건강할 수 있는 세상.

밤새 일했지만 보람찼어. "고맙다. 네가 큰 힘이 되는구나."`,
      bg: 'https://images.unsplash.com/photo-1723976710497-7eca60bf0835',
      choices: [
        { label: '보람을 느낀다', to: 'strange_visitor', cls: 'bg-purple-200' },
      ],
      prompt: '💭 지식을 나누는 것의 가치는?',
    },
    {
      id: 'study_more',
      title: '배움의 길',
      text: `의서를 더 공부하기로 했어. 『동의보감』, 『향약집성방』, 『의방유취』...

질병의 원인, 증상, 치료법을 외웠어. 의술과 약재에 대해서도 열심히 익혔어.

허준 선생님이 문제를 내셔. "간이 나쁜 환자는 어떤 증상을 보이지?"

"눈이 누렇고, 피로하며, 소화가 안 됩니다!" 너는 척척 답했어.`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNjM1MzU0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '실력이 늘었다', to: 'strange_visitor', cls: 'bg-purple-200' },
      ],
      prompt: '💭 배움에 끝이 있을까?',
    },
    {
      id: 'strange_visitor',
      title: '기이한 방문객',
      text: `어느 날, 이상한 사람이 찾아왔어. 물에 젖은 옷, 물고기 비늘 같은 피부.

"허준 선생님을 뵙고 싶습니다. 급한 환자가 있어서요."

목소리가 울렸어. 마치 물속에서 말하는 것 같았어.

허준 선생님이 맞이하셨어. "어디서 오셨소?" 

"저는 용궁 어의입니다."`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNjM1MzU0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '놀라서 바라본다', to: 'sea_doctor', cls: 'bg-blue-200' },
      ],
      prompt: '💭 믿기 어려운 일을 마주할 때?',
    },
    {
      id: 'sea_doctor',
      title: '수궁의 어의',
      text: `"용궁 어의라고요?" 너는 놀랐어.

물고기처럼 생긴 어의가 말했어. "광리왕께서 중병에 걸리셨습니다. 수궁의 모든 의술을 동원했지만 나아지지 않습니다."

"육지의 명의 허준 선생님만이 유일한 희망입니다. 부디 용궁에 가주십시오!"

허준 선생님이 고민하셨어. "왕께서 아프시다니... 증상이 어떠하오?"`,
      bg: 'https://images.unsplash.com/photo-1723976710497-7eca60bf0835',
      choices: [
        { label: '진지하게 듣는다', to: 'dragon_king_illness', cls: 'bg-green-200' },
      ],
      prompt: '💭 불가능해 보이는 일도 시도해야 할까?',
    },
    {
      id: 'dragon_king_illness',
      title: '광리왕의 병',
      text: `"기력이 없으시고, 온몸이 아프시며, 어떤 약도 듣지 않습니다." 수궁 어의가 설명했어.

"원인을 알 수 없는 병이라... 이상하군요." 허준 선생님이 고민하셨어.

수궁 어의가 한숨을 쉬었어. "흥청망청 놀이와 연회를 즐기시다가 쓰러지셨습니다."

선생님이 너를 보셨어. "함께 가겠느냐? 위험할 수도 있지만, 귀한 경험이 될 거다."`,
      bg: 'https://images.unsplash.com/photo-1710388766264-07a47a416e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMGhhbm9rfGVufDF8fHx8MTc2MzUzNTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '함께 가기로 한다', to: 'journey_begin', cls: 'bg-blue-200' },
        { label: '망설인다', to: 'hesitation', cls: 'bg-red-200' },
      ],
      prompt: '💭 두려움과 호기심 사이에서?',
    },
    {
      id: 'hesitation',
      title: '용기를 내다',
      text: `"용궁이라니... 정말 갈 수 있을까요?" 두려웠어.

허준 선생님이 말씀하셨어. "의원은 환자가 있는 곳이라면 어디든 가야 한다."

"하지만 물속에서 숨을 쉴 수 있을까요?" 걱정이 앞섰어.

수궁 어의가 웃었어. "염려 마십시오. 제 술법으로 물속에서도 숨을 쉬게 해드리겠습니다."`,
      bg: 'https://images.unsplash.com/photo-1605972082877-46c5f53df51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNjM1MzU0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '용기를 낸다', to: 'journey_begin', cls: 'bg-purple-200' },
      ],
      prompt: '💭 두려움을 극복하는 방법은?',
    },
    {
      id: 'journey_begin',
      title: '바다로의 여행',
      text: `바닷가에 도착했어. 수궁 어의가 술법을 부렸어.

"이제 물속에서도 숨을 쉴 수 있습니다. 저를 따라오십시오!"

물속으로 들어가는 순간, 신기하게도 숨을 쉴 수 있었어!

물고기들이 인사했어. 해초 숲을 지나고, 진주 빛나는 길을 따라갔어.`,
      bg: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHVuZGVyd2F0ZXJ8ZW58MXx8fHwxNzYzNTQ0Nzc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '신기해하며 구경한다', to: 'arrive_palace', cls: 'bg-blue-200' },
      ],
      prompt: '💭 새로운 세계를 마주할 때의 마음은?',
    },
    {
      id: 'arrive_palace',
      title: '용궁에 도착',
      text: `웅장한 궁전이 나타났어. 산호와 진주로 만든 기둥, 물고기들이 춤을 추고.

신하들이 나와 맞이했어. 
"허준 선생님, 오시길 기다렸습니다!"

궁전 안은 화려했어. 하지만 분위기는 무거웠어.

"광리왕께서 위독하십니다. 빨리 진찰해주십시오!" 신하들이 다급해했어.`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JhbCUyMHJlZWYlMjBjYXN0레일8ZW58MXx8fHwxNzYzNTQ0Nzc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '왕을 진찰하러 간다', to: 'examine_king', cls: 'bg-red-200' },
      ],
      prompt: '💭 왕과 신하의 관계는?',
    },
    {
      id: 'examine_king',
      title: '광리왕 진찰',
      text: `광리왕이 침상에 누워계셨어. 용의 모습이지만 기력이 없어 보였어.

허준 선생님이 맥을 짚으셨어. 너도 조심스럽게 관찰했어.

"이상하군요... 맥이 불규칙하지만 뚜렷한 원인을 찾기 어렵습니다."

왕이 신음하셨어. "살려주시오... 무엇이든 하겠소..."`,
      bg: 'https://images.unsplash.com/photo-1723976710497-7eca60bf0835',
      choices: [
        { label: '증상을 더 살핀다', to: 'mysterious_illness', cls: 'bg-blue-200' },
      ],
      prompt: '💭 왕도 백성처럼 아픈 존재일까?',
    },
    {
      id: 'mysterious_illness',
      title: '알 수 없는 병',
      text: `허준 선생님이 여러 방법으로 진찰하셨어. 하지만 원인을 찾을 수 없었어.

"이런 병은 처음 봅니다. 흥청망청 놀이에 빠지신 것과 관련이 있을까요?"

수궁 어의도 고개를 저었어. "저희도 모든 약을 써봤지만 소용이 없었습니다."

선생님의 표정이 어두워졌어. "원인을 모르니 치료법도 찾기 어렵군요..."`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHBhdHRlcm58ZW58MXx8fHwxNjM1MzU0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '계속 노력한다', to: 'try_treatment', cls: 'bg-green-200' },
      ],
      prompt: '💭 원인을 모르는 병은 어떻게 치료할까?',
    },
    {
      id: 'try_treatment',
      title: '치료 시도',
      text: `허준 선생님은 포기하지 않으셨어. 온갖 약재를 시도하고, 침을 놓고.

너도 열심히 도왔어. 약을 달이고, 왕의 상태를 기록했어.

하지만 며칠이 지나도 광리왕의 상태는 나아지지 않았어.

"이 약도 안 듣는군요..." 
선생님의 목소리에 좌절이 묻어났어.`,
      bg: 'https://images.unsplash.com/photo-1723976710497-7eca60bf0835',
      choices: [
        { label: '최선을 다한다', to: 'do_best_treatment', cls: 'bg-purple-200' },
        { label: '고민에 빠진다', to: 'teacher_worry', cls: 'bg-blue-200' },
      ],
      prompt: '💭 의술에도 한계가 있을까?',
    },
    {
      id: 'do_best_treatment',
      title: '끝까지 최선을',
      text: `포기하지 않고 계속 치료했어. 다른 약재를 시도하고, 새로운 처방을 만들고.

광리왕의 고통을 조금이라도 덜어드리려 노력했어.

"고맙소, 선생님... 그대들..." 왕이 감사를 표했어.

비록 완치는 못 해도, 최선을 다하는 것이 의원의 도리라고 배웠어.`,
      bg: 'https://images.unsplash.com/photo-1723976710497-7eca60bf0835',
      choices: [
        { label: '보람을 느낀다', to: 'final_decision', cls: 'bg-green-200' },
      ],
      prompt: '💭 과정도 결과만큼 중요할까?',
    },
    {
      id: 'teacher_worry',
      title: '스승의 고뇌',
      text: `"선생님, 어떻게 해야 할까요?" 너는 물었어.

허준 선생님이 한숨을 쉬셨어. "의원은 생명을 살리는 사람이다. 하지만 원인을 모르는 병은..."

"왕이든 백성이든, 치료하고 싶지만 내 의술로는 한계가 있구나."

선생님의 눈빛도 슬펐어. 하지만 담담하셨어. 
"그래도 끝까지 최선을 다해야지."`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25하bCUyMHBhdHRlcm58ZW58MXx8fHwxNjM1MzU0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '깊이 생각한다', to: 'final_decision', cls: 'bg-purple-200' },
      ],
      prompt: '💭 스승의 가르침과 현실 사이?',
    },
    {
      id: 'final_decision',
      title: '치료의 한계',
      text: `며칠을 더 노력했지만, 광리왕의 병은 나아지지 않았어.

허준 선생님이 결정하셨어. "죄송합니다. 제 의술로는 더 이상 방법이 없습니다."

신하들이 실망했어. "정말 방법이 없습니까?"

"원인을 알 수 없는 병입니다. 더 현명한 분의 도움이 필요할 것 같습니다."`,
      bg: 'https://images.unsplash.com/photo-1723976710497-7eca60bf0835',
      choices: [
        { label: '안타까워한다', to: 'return_land', cls: 'bg-blue-200' },
      ],
      prompt: '💭 의술의 한계를 인정해야 할까?',
    },
    {
      id: 'return_land',
      title: '육지로의 귀환',
      text: `"우리는 돌아가야겠구나." 허준 선생님이 말씀하셨어.

신하들이 아쉬워했지만 이해했어. "최선을 다해주셔서 감사합니다."

수궁 어의가 다시 법술을 부려 육지로 데려다줬어.

바닷가에 도착했을 때, 너는 많은 것을 배웠다고 느꼈어.`,
      bg: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHVuZGVyd2F0ZXJ8ZW58MXx8fHwxNzYzNTQ0Nzc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '선생님과 이야기한다', to: 'reflection', cls: 'bg-green-200' },
      ],
      prompt: '💭 여정에서 무엇을 배웠을까?',
    },
    {
      id: 'reflection',
      title: '깨달음의 시간',
      text: `"선생님, 오늘 많이 배웠어요." 너는 말했어.

"무엇을 배웠니?" 선생님이 물으셨어.

"왕도 백성도 모두 아프면 같다는 것. 그리고 의술에도 한계가 있다는 것."

"그래, 잘 깨달았구나. 하지만 한계가 있다고 포기하면 안 된단다."`,
      bg: 'https://images.unsplash.com/photo-1712412898244-80a5cfe9456f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBoYW5vayUyMGdhcmRlbnxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '더 배우고 싶다', to: 'continue_learning', cls: 'bg-blue-200' },
      ],
      prompt: '💭 한계를 넘어서려면?',
    },
    {
      id: 'continue_learning',
      title: '의원의 길',
      text: `"선생님, 저도 동의보감을 더 공부하고 싶어요. 더 많은 사람을 치료하고 싶어요."

허준 선생님이 뿌듯해하셨어. "좋은 마음이구나. 함께 공부하자."

집으로 돌아와 다시 일상으로 돌아갔어. 환자를 보고, 의서를 공부하고.

하지만 너는 달라졌어. 왕도 신하도 백성도 모두 같은 생명이라는 것을 알았어.`,
      bg: 'https://images.unsplash.com/photo-1723976710497-7eca60bf0835',
      choices: [
        { label: '성장을 느낀다', to: 'epilogue', cls: 'bg-purple-200' },
      ],
      prompt: '💭 진정한 성장이란?',
    },
    {
      id: 'epilogue',
      title: '새로운 시작',
      text: `며칠 후, 소문을 들었어. 용궁에 신선이 나타났다는 이야기.

그 신선이 광리왕의 병을 고칠 방법을 알려줬다고 해.

"어떤 방법인지 궁금하네..." 너는 생각했어.

허준 선생님이 말씀하셨어. "세상에는 아직 우리가 모르는 의술이 많단다. 겸손하게 배워야지."`,
      bg: 'https://images.unsplash.com/photo-1647700243862-95b7d4defb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25하bCUyMHBhdHRlcm58ZW58MXx8fHwxNjM1MzU0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '이야기를 마무리한다', to: 'ending', cls: 'bg-purple-200' },
      ],
      prompt: '💭 지혜는 어디서 올까?',
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `허준 선생님과 함께한 용궁 여행.

너는 왕과 신하와 백성에 대해 배웠어. 

모두가 같은 생명이라는 것. 의술에는 한계가 있지만, 최선을 다하는 것이 의원의 도리라는 것.

《별주부전》에서는 광리왕의 병에 신하들이 어떻게 대처하는지 확인해볼까?

📚 서점이나 도서관에서 《별주부전》을 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1655645894221-948b9d2c7ed2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHRlbXBsZXxlbnwxfHx8fDE3NjM1MzU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' },
      ],
      prompt: '《별주부전》 - 자라 별주부와 토끼의 지혜 대결! 용궁 광리왕을 살리기 위한 모험과 속임수, 그리고 재치가 넘치는 고전 우화야!',
    },
  ];
}
import type { Story } from '../../types/story';

export const 노인과바다: Story = {
  id: '노인과바다',
  title: '노인과 바다 - 청새치의 여정',
  description: '바다의 왕이 되기 위한 청새치의 도전. 운, 외로움, 고난 속에서 진정한 강함을 찾아가는 이야기.',
  start: 'start',
  scenes: [
    {
      id: 'start',
      title: '태어남',
      text: `너는 청새치야. 바다 깊은 곳에서 태어났어.

수천 개의 알 중 하나. 수백 마리의 형제 중 하나. 하지만 너는 살아남았어.

운이 좋았을까? 아니면 강했을까?

"살아남는다는 건 선택받는 거야"

첫 번째 교훈.`,
      bg: 'https://images.unsplash.com/photo-1753792344130-9772d0bdd0f2',
      choices: [
        { label: '나는 운이 좋았어', to: 'believe_luck', cls: 'bg-blue-200' },
        { label: '나는 강했어', to: 'believe_strength', cls: 'bg-purple-200' }
      ],
      prompt: '💭 생존은 운일까, 실력일까?'
    },
    {
      id: 'believe_luck',
      title: '운을 믿다',
      text: `"나는 운이 좋은 청새치야" 그렇게 생각했어.

형제들보다 좋은 위치에 있었고, 먹이도 더 많이 만났어. 하지만... 운만 믿으면 노력을 게을리하게 돼.

"운은 준비된 자에게만 의미가 있다"

마치 시험 전날 운을 믿고 공부 안 하는 것처럼. 준비 없는 운은 금방 사라져.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '그래도 운이 중요해', to: 'depend_luck', cls: 'bg-yellow-200' },
        { label: '노력도 필요하구나', to: 'balance_luck_effort', cls: 'bg-green-200' }
      ],
      prompt: '💭 운에만 의존할 수 있을까?'
    },
    {
      id: 'believe_strength',
      title: '실력을 믿다',
      text: `"나는 강한 청새치야" 태어나자마자 다른 형제들보다 빨리 헤엄쳤어.

먹이도 더 잘 잡고, 위험도 더 잘 피했어. 자신감이 생겼어. 하지만...

"실력만으로는 부족해" 때로는 운이 필요해. 아무리 잘해도 기회가 안 오면 소용없어.

마치 열심히 공부해도 시험 문제가 너무 어려우면 좋은 점수 받기 어려운 것처럼.`,
      bg: 'https://images.unsplash.com/photo-1753792344130-9772d0bdd0f2',
      choices: [
        { label: '실력이 전부야', to: 'only_strength', cls: 'bg-red-200' },
        { label: '운도 필요하구나', to: 'balance_luck_effort', cls: 'bg-green-200' }
      ],
      prompt: '💭 실력만으로 충분할까?'
    },
    {
      id: 'depend_luck',
      title: '운에 의존하는 삶',
      text: `운을 믿고 살기로 했어. 노력하지 않고 기회만 기다렸어.

처음에는 괜찮았어. 운이 좋아서 먹이도 만나고. 그런데... 어느 날 운이 사라졌어.

먹이가 안 보이고, 포식자는 자주 나타나고.

"운만 믿고 준비 안 한 게 후회됐어"

마치 시험공부 안 하고 찍기로만 승부하다가 망하는 것처럼.`,
      bg: 'https://images.unsplash.com/photo-1762717563045-407f3bfde88f',
      choices: [
        { label: '이제라도 노력하자', to: 'late_effort', cls: 'bg-orange-200' },
        { label: '다시 운을 기다리자', to: 'keep_waiting', cls: 'bg-gray-200' }
      ],
      prompt: '💭 늦었다고 생각할 때가 가장 빠를 때일까?'
    },
    {
      id: 'only_strength',
      title: '오만한 실력',
      text: `"난 강하니까 괜찮아" 자신감이 과했어.

위험한 곳도 함부로 가고, 큰 먹이만 노렸어. 그러다가... 큰 상어를 만났어.

너무 자신만만해서 도망가지 않았어. "싸우다가 크게 다쳤어"

운이 좋아서 살았지만, 실력만으론 부족했어. 마치 실력만 믿고 건방지게 굴다가 예상 못한 일로 넘어지는 것처럼.`,
      bg: 'https://images.unsplash.com/photo-1637308111472-fdf4886a2e07',
      choices: [
        { label: '겸손하게 배우자', to: 'learn_humility', cls: 'bg-blue-200' },
        { label: '더 강해지자', to: 'become_stronger', cls: 'bg-red-200' }
      ],
      prompt: '💭 진짜 강함은 무엇일까?'
    },
    {
      id: 'balance_luck_effort',
      title: '운과 노력의 균형',
      text: `깨달았어. "운과 실력, 둘 다 필요하다"

열심히 준비하면서도 기회를 기다리는 거야. 노력으로 준비하고, 운으로 기회를 잡는 거.

마치 꿈을 향해 공부하면서도 좋은 기회를 놓치지 않는 것처럼.

바다는 넓고, 할 일은 많아. 너는 매일 헤엄치는 법을 연습했어. 빠르게, 정확하게.`,
      bg: 'https://images.unsplash.com/photo-1719754522656-10b30c29b598',
      choices: [
        { label: '계속 연습하기', to: 'keep_practicing', cls: 'bg-green-200' },
        { label: '바다 탐험하기', to: 'explore_ocean', cls: 'bg-blue-200' }
      ],
      prompt: '💭 준비와 기회, 어느 것이 먼저일까?'
    },
    {
      id: 'late_effort',
      title: '늦은 각성',
      text: `뒤늦게 깨달았어. "노력 없는 운은 오래가지 못한다"

이제부터라도 시작! 헤엄 연습, 사냥 연습, 생존 연습.

힘들었어. 늦게 시작해서 더 힘들었어. 하지만...

"늦었다고 생각할 때가 가장 빠른 때"

조금씩 나아졌어. 마치 중간고사 망쳐도 기말고사 열심히 준비하면 만회할 수 있는 것처럼.`,
      bg: 'https://images.unsplash.com/photo-1753792344130-9772d0bdd0f2',
      choices: [
        { label: '계속 노력하기', to: 'keep_practicing', cls: 'bg-green-200' },
        { label: '나만의 방법 찾기', to: 'find_own_way', cls: 'bg-purple-200' }
      ],
      prompt: '💭 시작이 늦어도 포기하지 않으면 될까?'
    },
    {
      id: 'keep_waiting',
      title: '운을 기다리는 청새치',
      text: `계속 기다렸어. "언젠가 운이 올 거야"

하지만 운은 오지 않았어. 점점 약해졌어. 먹이를 못 찾아서 배고프고, 몸도 느려졌어.

다른 청새치들은 열심히 노력해서 성장했는데, 너는 그대로였어.

"후회만 쌓였어" 마치 공부 안 하고 기적만 바라다가 낙제하는 것처럼.

이제는 노력할 힘도 없어졌어. 너무 늦었어...`,
      bg: 'https://images.unsplash.com/photo-1759850426194-be693eb19da0',
      choices: [
        { label: '마지막 힘을 내보자', to: 'last_chance', cls: 'bg-orange-200' },
        { label: '이대로 포기할까', to: 'give_up_path', cls: 'bg-gray-300' }
      ],
      prompt: '💭 기회는 기다리는 자에게만 올까?'
    },
    {
      id: 'give_up_path',
      title: '포기의 끝',
      text: `포기했어. 더 이상 할 수 없었어.

바다의 흐름에 몸을 맡기며 떠다녔어. 어쩌면 이게 운명일까?

하지만 마음 한구석이 아팠어. "내가 조금만 더 일찍 깨달았다면..."

인생은 선택의 연속이야. 그리고 모든 선택에는 대가가 따라와.`,
      bg: 'https://images.unsplash.com/photo-1759850426194-be693eb19da0',
      choices: [
        { label: '그래도 다시 시도', to: 'last_chance', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 정말 끝일까, 아니면 새 시작일까?'
    },
    {
      id: 'learn_humility',
      title: '겸손의 가치',
      text: `상처를 치료하며 배웠어. "강하다고 자만하면 안 돼"

진짜 강한 자는 자신의 한계를 알아. 그리고 배우려 해.

바다의 선배들을 관찰했어. 나이 든 청새치는 어떻게 사냥하나? 돌고래는 어떻게 협력하나? 거북이는 어떻게 오래 사나?

"배움에는 끝이 없어" 마치 1등이어도 더 배우려는 학생처럼. 겸손이 진짜 실력이야.`,
      bg: 'https://images.unsplash.com/photo-1624891534001-df01917cfeec',
      choices: [
        { label: '더 많이 배우기', to: 'learn_more', cls: 'bg-purple-200' },
        { label: '배운 걸 연습하기', to: 'practice_learned', cls: 'bg-green-200' }
      ],
      prompt: '💭 겸손은 약함일까, 강함일까?'
    },
    {
      id: 'become_stronger',
      title: '더 강해지는 길',
      text: `상처에서 배웠어. "더 강해져야 해"

하지만 이번엔 달라. 무작정 자신만만한 게 아니라, 진짜 실력을 키우는 거야.

매일 연습했어. 스피드 훈련, 지구력 훈련, 전략 훈련.

실패해도 괜찮아. 실패에서 배우니까. "실패는 성공의 어머니"

마치 틀린 문제를 통해 실력이 늘어나는 것처럼. 조금씩 강해졌어.`,
      bg: 'https://images.unsplash.com/photo-1719754522656-10b30c29b598',
      choices: [
        { label: '계속 훈련하기', to: 'keep_practicing', cls: 'bg-red-200' },
        { label: '실전 경험 쌓기', to: 'gain_experience', cls: 'bg-orange-200' }
      ],
      prompt: '💭 진짜 강함은 어떻게 만들어질까?'
    },
    {
      id: 'keep_practicing',
      title: '끊임없는 연습',
      text: `매일, 매일 연습했어.

아침 - 속도 훈련, 낮 - 사냥 연습, 밤 - 회피 훈련. "하루도 빠짐없이"

힘들었어. 때로는 포기하고 싶었어. 하지만... "노력은 배신하지 않는다"

조금씩 달라졌어. 어제보다 빨라지고, 어제보다 정확해지고, 어제보다 강해졌어.

마치 매일 조금씩 공부하면 실력이 쌓이는 것처럼. 변화는 작지만, 누적되면 엄청나.`,
      bg: 'https://images.unsplash.com/photo-1662757171170-30a462b7d4c9',
      choices: [
        { label: '혼자 계속 훈련', to: 'train_alone', cls: 'bg-blue-200' },
        { label: '다른 물고기와 함께', to: 'train_together', cls: 'bg-green-200' }
      ],
      prompt: '💭 꾸준함이 재능을 이길 수 있을까?'
    },
    {
      id: 'explore_ocean',
      title: '바다를 알아가다',
      text: `바다는 넓었어. 너는 탐험하기로 했어.

얕은 곳, 깊은 곳, 따뜻한 곳, 차가운 곳. 모든 곳이 달랐어.

얕은 곳 - 먹이 많지만 위험해, 깊은 곳 - 안전하지만 어두워, 따뜻한 곳 - 편하지만 경쟁 치열, 차가운 곳 - 힘들지만 기회 많아

"어디가 내 터전일까?"

바다(el mar)는 대상이야. 정복해야 할 공간. 하지만 사랑하는 바다(la mar)는 내 집이야. 어떻게 바라볼까?`,
      bg: 'https://images.unsplash.com/photo-1759850426194-be693eb19da0',
      choices: [
        { label: '바다는 정복할 대상', to: 'el_mar', cls: 'bg-red-200' },
        { label: '바다는 사랑할 터전', to: 'la_mar', cls: 'bg-blue-200' }
      ],
      prompt: '💭 삶의 공간을 어떻게 바라봐야 할까?'
    },
    {
      id: 'find_own_way',
      title: '나만의 방법',
      text: `남들 따라 하지 않기로 했어. 나는 나야. 내 방식이 있어.

다른 청새치들은 낮에 사냥해. 나는 새벽을 선택했어. 경쟁자가 적거든.

다른 청새치들은 큰 무리를 공략해. 나는 작은 먹이를 확실하게 잡았어.

"남과 다르다고 틀린 게 아냐" 마치 공부 방법이 사람마다 다른 것처럼. 내 방식을 찾았어.`,
      bg: 'https://images.unsplash.com/photo-1753792344130-9772d0bdd0f2',
      choices: [
        { label: '내 방식 계속 발전', to: 'develop_own_style', cls: 'bg-purple-200' },
        { label: '가끔 남의 방법도 배우기', to: 'learn_from_others', cls: 'bg-green-200' }
      ],
      prompt: '💭 나만의 방법이 더 좋을까, 검증된 방법이 나을까?'
    },
    {
      id: 'last_chance',
      title: '마지막 기회',
      text: `마지막 힘을 냈어. 약했지만 포기 안 해.

"지금이라도 시작하자" 천천히, 조금씩 헤엄치기 시작했어.

힘들었어. 몸이 말을 안 들어. 하지만... "포기하지 않는 게 중요해"

한 번, 두 번, 세 번... 조금씩 회복됐어.

마치 낙제 위기에서 마지막 시험으로 턱걸이하는 것처럼. 늦었지만 끝난 건 아냐.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '조금씩 회복하기', to: 'slow_recovery', cls: 'bg-green-200' },
        { label: '빠르게 만회하기', to: 'quick_recovery', cls: 'bg-orange-200' }
      ],
      prompt: '💭 포기하지 않으면 기적이 일어날까?'
    },
    {
      id: 'quick_recovery',
      title: '급한 만회',
      text: `빠르게 만회하려고 했어. 무리했어.

"빨리 따라잡아야 해!" 하지만 약한 몸으로 무리하니 더 힘들었어.

조급함이 독이 됐어. 마치 벼락치기 공부하다 지쳐버리는 것처럼.

"천천히 가는 게 빠를 때도 있어" 다시 생각해봐야겠어.`,
      bg: 'https://images.unsplash.com/photo-1762717563045-407f3bfde88f',
      choices: [
        { label: '속도 조절하기', to: 'slow_recovery', cls: 'bg-blue-200' },
        { label: '그래도 밀어붙이기', to: 'push_harder', cls: 'bg-red-200' }
      ],
      prompt: '💭 빠른 게 항상 좋을까?'
    },
    {
      id: 'push_harder',
      title: '한계에 도전',
      text: `그래도 밀어붙였어. "이대로 멈출 순 없어"

한계를 넘어서려 했어. 고통스러웠지만 포기하지 않았어.

그리고... 뭔가 달라졌어. 한계를 넘자 새로운 힘이 생겼어.

"극한의 순간이 나를 성장시켰어" 위험했지만 해냈어.`,
      bg: 'https://images.unsplash.com/photo-1662757171170-30a462b7d4c9',
      choices: [
        { label: '이 힘으로 나아가기', to: 'new_power', cls: 'bg-gold-200' }
      ],
      prompt: '💭 한계를 넘어야 성장할까?'
    },
    {
      id: 'new_power',
      title: '새로운 힘',
      text: `한계를 넘으며 새로운 힘을 얻었어.

몸도 강해지고, 정신도 단단해졌어. 고난이 나를 만들었어.

"고통 없이는 성장 없다" 진짜 강자가 되어가고 있어.

이제 바다를 향해 나갈 준비가 됐어.`,
      bg: 'https://images.unsplash.com/photo-1662757171170-30a462b7d4c9',
      choices: [
        { label: '넓은 바다로', to: 'enter_world', cls: 'bg-blue-200' }
      ],
      prompt: '💭 고난이 선물일 수 있을까?'
    },
    {
      id: 'train_alone',
      title: '고독한 훈련',
      text: `혼자 훈련하기로 했어. "외로움을 견뎌야 강해진다"

무리를 떠나 홀로 깊은 바다로. 처음엔 무서웠어. 누구도 없고, 아무 소리도 없어.

"이게 외로움이구나" 하지만 외로움 속에서 나를 발견했어.

내 한계, 내 가능성, 내 꿈. 마치 혼자 공부하며 집중력을 기르는 것처럼. 외로움이 나를 단단하게 만들어.`,
      bg: 'https://images.unsplash.com/photo-1759850426194-be693eb19da0',
      choices: [
        { label: '계속 혼자 수련', to: 'continue_solo', cls: 'bg-purple-200' },
        { label: '외로움을 극복하기', to: 'overcome_loneliness', cls: 'bg-blue-200' }
      ],
      prompt: '💭 외로움은 약점일까, 성장의 기회일까?'
    },
    {
      id: 'train_together',
      title: '함께하는 성장',
      text: `다른 물고기들을 찾았어. 혼자보다 함께가 좋아.

돌고래들은 협력을 가르쳐줬어. 참치들은 속도를 가르쳐줬어. 거북이는 인내를 가르쳐줬어.

"함께하면 더 많이 배워" 경쟁도 되고, 동료도 되고.

마치 친구들과 같이 공부하면 서로 자극받는 것처럼. 하지만... "언젠가 헤어져야 해" 각자의 길이 있으니까.`,
      bg: 'https://images.unsplash.com/photo-1624891534001-df01917cfeec',
      choices: [
        { label: '계속 함께하기', to: 'stay_together', cls: 'bg-green-200' },
        { label: '이제 혼자 가기', to: 'go_alone', cls: 'bg-orange-200' }
      ],
      prompt: '💭 함께 성장할까, 혼자 성장할까?'
    },
    {
      id: 'gain_experience',
      title: '실전의 가르침',
      text: `연습만으론 부족해. "실전이 진짜 스승이야"

위험한 사냥에 도전했어. 실패했어. 여러 번. 다쳤어. 여러 번. 하지만...

"실전에서 배운 건 연습에서 못 배워"

언제 공격하고, 언제 피하고, 언제 포기하는지. 책으로만 공부하다가 실제 시험 보는 것처럼. 경험이 쌓였어.`,
      bg: 'https://images.unsplash.com/photo-1751813648912-996c8e7c53c8',
      choices: [
        { label: '더 위험한 도전', to: 'dangerous_challenge', cls: 'bg-red-200' },
        { label: '안전하게 경험 쌓기', to: 'safe_experience', cls: 'bg-green-200' }
      ],
      prompt: '💭 실패를 통해 배우는 게 더 가치 있을까?'
    },
    {
      id: 'el_mar',
      title: 'El Mar - 정복할 바다',
      text: `바다는 적이야. 정복해야 할 대상. 이겨야 할 공간.

"바다를 지배하자" 최고의 청새치가 되려면 바다를 정복해야 해.

가장 빠르고, 가장 강하고, 가장 영리해야 해. 마치 시험을 정복하고, 학년을 1등으로 지배하는 것처럼.

바다(el mar)와 싸웠어. 거친 파도, 무서운 포식자, 부족한 먹이. 모두 적이야.`,
      bg: 'https://images.unsplash.com/photo-1762717563045-407f3bfde88f',
      choices: [
        { label: '더 강하게 싸우기', to: 'fight_harder', cls: 'bg-red-200' },
        { label: '전략적으로 접근', to: 'strategic_approach', cls: 'bg-purple-200' }
      ],
      prompt: '💭 삶은 싸워서 이기는 것일까?'
    },
    {
      id: 'la_mar',
      title: 'La Mar - 사랑할 바다',
      text: `바다는 집이야. 사랑하는 공간. 함께 사는 터전.

"바다를 사랑하자" 바다가 나를 키워줬어. 먹이도 주고, 쉴 곳도 주고, 배울 것도 줘.

마치 학교가 단순히 경쟁하는 곳이 아니라 성장하는 공간인 것처럼.

바다(la mar)와 친구 됐어. 파도 소리를 들으며 쉬고, 해류를 따라 여행하고, 다른 생명들과 공존해. 평화로워.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '바다와 조화롭게', to: 'harmony_ocean', cls: 'bg-blue-200' },
        { label: '사랑하되 경계하기', to: 'love_with_caution', cls: 'bg-green-200' }
      ],
      prompt: '💭 삶의 터전을 사랑으로 대할 수 있을까?'
    },
    {
      id: 'learn_more',
      title: '배움의 여정',
      text: `매일 새로운 걸 배웠어.

나이 든 청새치에게서 - 경험, 젊은 물고기에게서 - 열정, 작은 물고기에게서 - 겸손, 큰 포식자에게서 - 생존

"모두가 선생님이야" 심지어 실패에서도 배워.

왜 실패했지? 뭘 놓쳤지? 다음엔 뭘 바꿀까?

마치 모든 경험이 공부가 되는 것처럼. 지식이 쌓였어. 지혜가 자랐어.`,
      bg: 'https://images.unsplash.com/photo-1674785511474-231880067d4f',
      choices: [
        { label: '계속 배우기', to: 'keep_learning', cls: 'bg-purple-200' },
        { label: '배운 걸 가르치기', to: 'teach_others', cls: 'bg-orange-200' }
      ],
      prompt: '💭 배움에 끝이 있을까?'
    },
    {
      id: 'practice_learned',
      title: '배움을 실천으로',
      text: `배운 걸 연습했어. "아는 것과 하는 건 달라"

이론은 알겠는데 실제로 하면 어려워. 수백 번 연습했어.

처음 - 어색해, 열 번째 - 조금 나아져, 백 번째 - 익숙해, 천 번째 - 내 것이 돼

마치 수학 공식을 반복해서 풀면 완전히 이해되는 것처럼.

"연습이 완벽을 만든다" 이제 몸이 기억해.`,
      bg: 'https://images.unsplash.com/photo-1662757171170-30a462b7d4c9',
      choices: [
        { label: '더 많이 연습', to: 'more_practice', cls: 'bg-green-200' },
        { label: '새로운 기술 배우기', to: 'learn_new_skill', cls: 'bg-blue-200' }
      ],
      prompt: '💭 연습은 배신하지 않을까?'
    },
    {
      id: 'develop_own_style',
      title: '나만의 스타일 완성',
      text: `내 방식을 발전시켰어.

새벽 사냥 + 정확한 타격 = 나만의 전략

효율적이야. 에너지도 적게 들고, 성공률도 높아.

"내 길을 만들었어" 남들은 이해 못 해도 괜찮아. 나한테 맞으니까.

마치 자기만의 공부법을 찾은 것처럼. 정석은 없어. 나에게 맞는 게 최고야. 자신감이 생겼어.`,
      bg: 'https://images.unsplash.com/photo-1753792344130-9772d0bdd0f2',
      choices: [
        { label: '내 스타일 완벽하게', to: 'perfect_style', cls: 'bg-purple-200' },
        { label: '계속 실험하기', to: 'keep_experimenting', cls: 'bg-orange-200' }
      ],
      prompt: '💭 자기만의 길이 정답일까?'
    },
    {
      id: 'learn_from_others',
      title: '타인에게서 배우기',
      text: `내 방식도 좋지만 남의 방법도 봤어.

"좋은 건 받아들이자" 다른 청새치의 속도 기술, 참치의 지구력, 돌고래의 협력.

내 방식에 더했어. 내 것 70% + 남의 것 30% = 더 나은 방법

마치 공부할 때 내 방법 + 친구 방법 = 최적의 전략. 융합이 혁신을 만들어.`,
      bg: 'https://images.unsplash.com/photo-1624891534001-df01917cfeec',
      choices: [
        { label: '계속 융합하기', to: 'keep_integrating', cls: 'bg-green-200' },
        { label: '균형 찾기', to: 'find_balance', cls: 'bg-blue-200' }
      ],
      prompt: '💭 자기 것과 남의 것, 어떻게 조화시킬까?'
    },
    {
      id: 'slow_recovery',
      title: '느린 회복',
      text: `조금씩 나아졌어. 빠르지 않아. 힘들어. 하지만... "포기하지 않았어"

하루에 1%씩만 나아져도 100일이면 다른 사람이 돼. 아주 천천히, 착실하게.

마치 성적이 조금씩 올라가는 것처럼.

"느려도 괜찮아 멈추지만 않으면" 회복하고 있어. 다시 시작할 수 있어.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '꾸준히 회복하기', to: 'steady_recovery', cls: 'bg-green-200' },
        { label: '회복하며 배우기', to: 'learn_while_recovering', cls: 'bg-blue-200' }
      ],
      prompt: '💭 느린 성장도 성장일까?'
    },
    {
      id: 'learn_while_recovering',
      title: '회복 중의 깨달음',
      text: `회복하면서 많은 걸 배웠어.

"쉼도 성장이야" 몸을 쉬는 동안 관찰하고 생각했어.

다른 물고기들을 보며 전략을 배우고, 바다의 흐름을 이해했어.

마치 아파서 쉬면서도 독서하며 배우는 것처럼. 회복과 배움, 동시에!`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '완전히 회복하기', to: 'steady_recovery', cls: 'bg-green-200' }
      ],
      prompt: '💭 쉬는 시간도 성장의 시간일까?'
    },
    {
      id: 'continue_solo',
      title: '고독 속의 성장',
      text: `계속 혼자였어. 외로웠어. 정말 외로웠어. 하지만...

"외로움이 나를 만들었어" 혼자여서 집중할 수 있었고, 혼자여서 나를 알게 됐어.

내 한계를 시험하고, 내 가능성을 발견했어. 외로움은 때로는 선물이야.

마치 혼자 조용히 공부하며 깊이 있게 이해하는 것처럼.

"고독이 완성했어" 강해졌어. 정말 강해졌어.`,
      bg: 'https://images.unsplash.com/photo-1759850426194-be693eb19da0',
      choices: [
        { label: '계속 고독하게', to: 'embrace_solitude', cls: 'bg-purple-200' },
        { label: '이제 세상으로', to: 'back_to_world', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 외로움을 친구로 만들 수 있을까?'
    },
    {
      id: 'overcome_loneliness',
      title: '외로움 극복하기',
      text: `외로움이 힘들었어. "견딜 수 없었어"

하지만 도망치지 않았어. 외로움을 느끼면서도 계속 앞으로 갔어.

외로움과 친구가 됐어. "외로움아, 너도 나의 일부야"

외로움을 인정하니까 덜 외로워졌어. 신기하지?

마치 불안을 인정하면 오히려 평온해지는 것처럼. 외로움을 극복했어. 이제 외롭지 않아.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '새로운 관계 맺기', to: 'new_relationships', cls: 'bg-green-200' },
        { label: '나 자신과 친해지기', to: 'befriend_myself', cls: 'bg-blue-200' }
      ],
      prompt: '💭 외로움을 받아들이면 자유로워질까?'
    },
    {
      id: 'stay_together',
      title: '무리 속의 안정',
      text: `함께 있기로 했어. 안전하고, 즐겁고, 배울 것도 많아. 하지만...

"내 성장이 멈췄어" 편안함에 안주했어. 도전이 없으니까 발전도 없어.

다른 물고기들과 비슷해졌어. 특별함이 사라졌어.

마치 친구들과 놀기만 하다 공부를 소홀히 하는 것처럼.

"안정은 때로는 위험해" 변화가 필요해.`,
      bg: 'https://images.unsplash.com/photo-1624891534001-df01917cfeec',
      choices: [
        { label: '이제 떠나기', to: 'leave_group', cls: 'bg-orange-200' },
        { label: '무리 안에서 도전', to: 'challenge_within', cls: 'bg-purple-200' }
      ],
      prompt: '💭 편안함이 발전을 막을까?'
    },
    {
      id: 'go_alone',
      title: '홀로서기',
      text: `작별했어. "친구들아, 고마웠어"

함께해서 좋았지만 이제 내 길을 가야 해. 처음엔 두려웠어. 혼자가 되니까. 하지만...

"혼자여야 진짜 나를 찾아" 무리에 있으면 남들 따라가게 돼. 혼자여야 내 길을 가.

마치 친구들과 떨어져 스스로 공부하기 시작하는 것처럼. 자립이 시작됐어.`,
      bg: 'https://images.unsplash.com/photo-1753792344130-9772d0bdd0f2',
      choices: [
        { label: '완전히 혼자 가기', to: 'completely_alone', cls: 'bg-blue-200' },
        { label: '가끔 만나기', to: 'occasional_meeting', cls: 'bg-green-200' }
      ],
      prompt: '💭 홀로서기가 진정한 성장일까?'
    },
    {
      id: 'dangerous_challenge',
      title: '위험한 도전',
      text: `가장 위험한 사냥에 도전했어.

큰 먹이, 강한 적, 높은 위험. "이기면 최고가 돼"

실패할 수도 있어. 다칠 수도 있어. 죽을 수도 있어. 하지만... "안 하면 평범해"

마치 어려운 문제에 도전하는 것처럼. 틀릴 수도 있지만, 맞히면 큰 성장이야.

심장이 뛰어. 두렵지만 설레.`,
      bg: 'https://images.unsplash.com/photo-1637308111472-fdf4886a2e07',
      choices: [
        { label: '도전한다!', to: 'take_challenge', cls: 'bg-red-200' },
        { label: '한 번 더 준비하기', to: 'prepare_more', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 위험한 도전이 가치 있을까?'
    },
    {
      id: 'safe_experience',
      title: '안전하게 성장하기',
      text: `조금씩 경험 쌓기로 했어. 작은 도전부터, 하나씩 단계적으로.

"착실하게 가자" 급하지 않아. 천천히 가도 돼.

실패해도 작은 실패, 성공하면 확실한 성공. 마치 쉬운 문제부터 풀며 자신감 쌓는 것처럼.

안전하지만 확실해. 경험이 쌓이고, 실력이 늘어. "빠르지 않지만 멈추지 않아"`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '계속 안전하게', to: 'keep_safe', cls: 'bg-green-200' },
        { label: '조금씩 난이도 높이기', to: 'increase_difficulty', cls: 'bg-orange-200' }
      ],
      prompt: '💭 안전한 성장도 의미 있을까?'
    },
    {
      id: 'fight_harder',
      title: '바다와의 전쟁',
      text: `더 강하게 싸웠어. 바다를 이기려고 온 힘을 다했어.

폭풍 - 정면돌파, 포식자 - 맞서 싸움, 기아 - 끝까지 버팀

"나는 강해!" 하지만... 너무 힘들어. 지쳐가.

바다는 끝이 없는데 내 힘은 한계가 있어.

"싸우기만 하면 지쳐" 마치 모든 걸 완벽하게 하려다 번아웃 오는 것처럼. 다른 방법이 필요해.`,
      bg: 'https://images.unsplash.com/photo-1762717563045-407f3bfde88f',
      choices: [
        { label: '계속 싸우기', to: 'keep_fighting', cls: 'bg-red-200' },
        { label: '전략 바꾸기', to: 'change_strategy', cls: 'bg-blue-200' }
      ],
      prompt: '💭 힘으로만 이길 수 있을까?'
    },
    {
      id: 'strategic_approach',
      title: '전략적 삶',
      text: `머리를 쓰기로 했어. "힘보다 지혜"

바다의 패턴을 관찰했어. 언제 먹이가 많나? 언제 포식자가 적나? 어디가 안전한가?

데이터를 모았어. 그리고 전략을 세웠어.

아침 - 사냥, 낮 - 휴식, 저녁 - 이동

마치 효율적인 공부 계획처럼. "전략이 실력을 이긴다" 훨씬 쉬워졌어.`,
      bg: 'https://images.unsplash.com/photo-1753792344130-9772d0bdd0f2',
      choices: [
        { label: '전략 더 발전시키기', to: 'develop_strategy', cls: 'bg-purple-200' },
        { label: '전략 실행하기', to: 'execute_strategy', cls: 'bg-green-200' }
      ],
      prompt: '💭 전략이 힘보다 중요할까?'
    },
    {
      id: 'harmony_ocean',
      title: '바다와의 조화',
      text: `바다와 하나가 됐어. 바다의 흐름을 따르고, 바다의 리듬에 맞춰.

"거스르지 않고 함께"

파도가 치면 - 함께 춤춰, 해류가 흐르면 - 함께 가, 폭풍이 오면 - 피해서 기다려

바다를 사랑하니까 바다도 나를 도와줘. 마치 삶의 흐름을 받아들이는 것처럼.

"저항보다 수용" 평화로워. 행복해.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '계속 조화롭게', to: 'keep_harmony', cls: 'bg-blue-200' },
        { label: '가끔은 도전하기', to: 'sometimes_challenge', cls: 'bg-orange-200' }
      ],
      prompt: '💭 조화가 최선일까?'
    },
    {
      id: 'love_with_caution',
      title: '사랑하되 경계하기',
      text: `바다를 사랑해. 하지만 방심하지 않아.

"사랑하지만 존중해" 바다는 아름답지만 위험해. 평화롭지만 무서워.

사랑하되 조심하고, 믿되 준비해. 마치 삶을 사랑하되 현실적으로 대비하는 것처럼.

균형이 중요해. 낭만과 현실, 꿈과 준비, 사랑과 경계.

"지혜로운 사랑" 이게 진짜 성숙함이야.`,
      bg: 'https://images.unsplash.com/photo-1762402460271-65f055dbe5a5',
      choices: [
        { label: '균형 유지하기', to: 'maintain_balance', cls: 'bg-green-200' },
        { label: '더 사랑하기', to: 'love_more', cls: 'bg-pink-200' }
      ],
      prompt: '💭 사랑과 경계, 함께 할 수 있을까?'
    },
    {
      id: 'steady_recovery',
      title: '꾸준한 재기',
      text: `매일 조금씩 나아졌어.

1일차 - 1m 헤엄, 2일차 - 2m 헤엄, 3일차 - 3m 헤엄...

"꾸준함의 힘" 한 달 후, 완전히 회복했어.

그리고 깨달았어. "포기하지 않으면 반드시 일어난다"

낙제에서 우등생으로, 약자에서 강자로. 불가능은 없어. 시간이 걸릴 뿐. 이제 준비됐어. 세상을 향해 나갈.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '세상으로 나가기', to: 'enter_world', cls: 'bg-yellow-200' },
        { label: '더 완벽하게 준비', to: 'perfect_preparation', cls: 'bg-blue-200' }
      ],
      prompt: '💭 꾸준함이 기적을 만들까?'
    },
    {
      id: 'perfect_preparation',
      title: '완벽한 준비',
      text: `회복했지만 조금 더 준비하기로 했어.

"완벽하게 준비하고 나가자" 마지막 훈련, 마지막 점검.

모든 기술을 점검하고, 모든 전략을 확인했어. 완벽해.

이제 정말 준비됐어. 자신감이 넘쳐.`,
      bg: 'https://images.unsplash.com/photo-1753792344130-9772d0bdd0f2',
      choices: [
        { label: '이제 출발!', to: 'enter_world', cls: 'bg-gold-200' }
      ],
      prompt: '💭 완벽한 준비가 가능할까?'
    },
    {
      id: 'embrace_solitude',
      title: '고독을 받아들이다',
      text: `고독과 친구가 됐어. "외로움이 나의 힘"

혼자라서 강해. 혼자라서 집중해. 혼자라서 자유로워.

고독은 약점이 아니야. 고독은 선택이야. 최고의 청새치들은 모두 고독했어. 왜?

"위대함은 고독에서 나와" 마치 위대한 예술가들이 혼자서 작품을 완성하는 것처럼. 고독을 사랑하게 됐어.`,
      bg: 'https://images.unsplash.com/photo-1759850426194-be693eb19da0',
      choices: [
        { label: '완벽한 고독으로', to: 'perfect_solitude', cls: 'bg-purple-200' },
        { label: '이제 나갈 때', to: 'back_to_world', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 고독이 완성의 길일까?'
    },
    {
      id: 'back_to_world',
      title: '세상으로의 복귀',
      text: `고독 속에서 완성됐어. 이제 세상으로 돌아갈 시간.

"혼자서 강해졌으니 이제 함께 할 수 있어"

다른 물고기들을 만났어. 예전과 달라. 흔들리지 않아. 나를 잃지 않아.

고독이 나를 단단하게 만들었으니까. 마치 혼자 공부해서 실력 쌓고 다시 친구들과 어울리는 것처럼.

"혼자 있을 줄 알아야 함께 할 수 있어" 준비됐어.`,
      bg: 'https://images.unsplash.com/photo-1624891534001-df01917cfeec',
      choices: [
        { label: '새로운 시작', to: 'new_beginning', cls: 'bg-green-200' },
        { label: '넓은 세상으로', to: 'enter_world', cls: 'bg-blue-200' }
      ],
      prompt: '💭 고독 후의 만남이 더 의미 있을까?'
    },
    {
      id: 'take_challenge',
      title: '최대의 도전',
      text: `도전했어! 가장 크고 빠른 먹이.

힘들었어. 여러 번 놓쳤어. 하지만 포기 안 해.

"한 번만 성공하면 돼" 집중하고, 타이밍 잡고, 전력으로!

성공했어!!! "해냈어!!!"

믿을 수 없어. 가장 어려운 걸 해냈어. 이 순간, 평범한 청새치에서 특별한 청새치가 됐어.

"도전이 나를 만들었어"`,
      bg: 'https://images.unsplash.com/photo-1662757171170-30a462b7d4c9',
      choices: [
        { label: '더 큰 도전으로', to: 'bigger_challenge', cls: 'bg-red-200' },
        { label: '성취감 즐기기', to: 'enjoy_achievement', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 도전의 성공이 자신감을 만들까?'
    },
    {
      id: 'prepare_more',
      title: '신중한 준비',
      text: `한 번 더 준비했어. "준비가 완벽하면 성공 확률이 높아"

더 연습하고, 더 관찰하고, 더 계획했어. 시간이 걸렸지만, 확실해졌어.

마치 시험 전에 한 번 더 복습하는 것처럼.

"준비된 자가 기회를 잡아" 이제 진짜 준비됐어. 실패할 확률이 낮아졌어. 자신 있어!`,
      bg: 'https://images.unsplash.com/photo-1753792344130-9772d0bdd0f2',
      choices: [
        { label: '이제 도전!', to: 'ready_challenge', cls: 'bg-green-200' },
        { label: '더 완벽하게', to: 'more_preparation', cls: 'bg-purple-200' }
      ],
      prompt: '💭 완벽한 준비가 가능할까?'
    },
    {
      id: 'more_preparation',
      title: '과도한 준비',
      text: `계속 준비만 했어. "아직 부족해, 더 준비해야 해"

하지만... 준비만 하고 도전하지 않으면 의미가 없어.

"완벽한 준비는 없어" 어느 순간 실행해야 해.

마치 계속 공부만 하고 시험은 안 보는 것처럼. 이제는 해야 할 때.`,
      bg: 'https://images.unsplash.com/photo-1753792344130-9772d0bdd0f2',
      choices: [
        { label: '이제 정말 도전!', to: 'ready_challenge', cls: 'bg-red-200' }
      ],
      prompt: '💭 과도한 준비도 도피일까?'
    },
    {
      id: 'enter_world',
      title: '세상으로',
      text: `넓은 바다로 나갔어. 회복했고, 강해졌고, 준비됐어.

"이제 진짜 시작이야" 세상은 넓고, 기회는 많아.

하지만 경쟁자도 많아. 위험도 많아. 그래도 괜찮아.

"나는 준비됐으니까" 꿈을 향해 헤엄쳐.

최고의 청새치, 전설의 청새치가 되는 꿈. 시작이야!`,
      bg: 'https://images.unsplash.com/photo-1762402460271-65f055dbe5a5',
      choices: [
        { label: '전설을 향해', to: 'toward_legend', cls: 'bg-gold-200' },
        { label: '자유롭게 탐험', to: 'free_exploration', cls: 'bg-blue-200' }
      ],
      prompt: '💭 준비된 자에게 세상은 어떻게 보일까?'
    },
    {
      id: 'free_exploration',
      title: '자유로운 탐험',
      text: `전설보다 자유를 선택했어.

"목표에 얽매이지 않고 살자" 바다 곳곳을 여행하며 경험을 쌓았어.

목적 없이 헤엄치는 게 행복했어. 하지만... 가끔 방황하는 것 같기도 해.

자유와 목표, 둘 다 필요한 걸까?`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '계속 자유롭게', to: 'continue_free', cls: 'bg-blue-200' },
        { label: '목표를 정하기', to: 'toward_legend', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 자유와 목표, 어느 것이 더 중요할까?'
    },
    {
      id: 'continue_free',
      title: '자유의 대가',
      text: `계속 자유롭게 살았어. 즐거웠어. 하지만...

"성장이 없었어" 목표 없는 자유는 방황이 될 수 있어.

이제 깨달았어. 진짜 자유는 목표가 있을 때 더 빛나.

다시 생각해볼 시간이야.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '이제 목표로', to: 'toward_legend', cls: 'bg-gold-200' }
      ],
      prompt: '💭 목표 없는 자유가 진짜 자유일까?'
    },
    {
      id: 'bigger_challenge',
      title: '끝없는 도전',
      text: `성공의 기쁨도 잠시. "더 큰 도전이 있어"

만족하지 않아. 계속 성장하고 싶어.

다음 목표 - 더 크게! 다음 도전 - 더 어렵게! "끝이 없어"

마치 1등 해도 다음 시험을 준비하는 것처럼. 성장에는 끝이 없어. 하지만...

너무 많은 도전은 지칠 수도 있어. "균형이 필요해"`,
      bg: 'https://images.unsplash.com/photo-1662757171170-30a462b7d4c9',
      choices: [
        { label: '계속 도전!', to: 'endless_challenge', cls: 'bg-red-200' },
        { label: '잠시 휴식', to: 'take_rest', cls: 'bg-green-200' }
      ],
      prompt: '💭 끝없는 도전이 행복일까?'
    },
    {
      id: 'enjoy_achievement',
      title: '성취의 순간',
      text: `성공을 즐겼어. "이 순간을 만끽하자"

열심히 했으니까 즐길 자격 있어. 자부심, 만족감, 행복. 모두 느꼈어.

"성취는 달콤해" 마치 시험 잘 봐서 기쁜 것처럼. 노력의 결실이야. 하지만...

"이것도 지나가" 계속 여기 머물 순 없어. 다음을 준비해야 해. 즐기되 준비하자.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '다음 목표로', to: 'next_goal', cls: 'bg-yellow-200' },
        { label: '조금 더 즐기기', to: 'savor_moment', cls: 'bg-pink-200' }
      ],
      prompt: '💭 성취를 즐기는 것도 중요할까?'
    },
    {
      id: 'savor_moment',
      title: '순간을 음미하다',
      text: `조금 더 이 순간을 즐겼어.

"서두르지 말자" 성공의 기쁨을 충분히 느꼈어. 이것도 삶의 일부야.

쉬면서 다음을 준비하는 거지. 충전 완료! 이제 다시 갈 수 있어.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '다음으로', to: 'next_goal', cls: 'bg-green-200' }
      ],
      prompt: '💭 휴식도 성장의 일부일까?'
    },
    {
      id: 'ready_challenge',
      title: '완벽한 도전',
      text: `완벽하게 준비하고 도전했어. 모든 게 계획대로.

집중, 타이밍, 실행. 완벽!

성공했어! "준비의 힘"

준비된 도전은 성공 확률이 높아. 마치 완벽하게 공부하고 시험 보는 것처럼.

불안하지 않아. 확신이 있어. "이게 프로의 길이야" 준비하고, 실행하고, 성공하는 것.`,
      bg: 'https://images.unsplash.com/photo-1662757171170-30a462b7d4c9',
      choices: [
        { label: '다음 단계로', to: 'next_level', cls: 'bg-purple-200' },
        { label: '이 방법 완성하기', to: 'master_method', cls: 'bg-green-200' }
      ],
      prompt: '💭 준비된 성공이 더 달콤할까?'
    },
    {
      id: 'master_method',
      title: '방법의 완성',
      text: `이 방법을 완벽하게 익혔어.

준비 → 실행 → 성공의 공식. 이제 완전히 내 것이 됐어.

"시스템이 완성됐어" 이 방법으로 계속 성장할 수 있어.

전문가가 된 기분이야.`,
      bg: 'https://images.unsplash.com/photo-1753792344130-9772d0bdd0f2',
      choices: [
        { label: '더 높은 곳으로', to: 'next_level', cls: 'bg-gold-200' }
      ],
      prompt: '💭 완성된 방법이 최고의 무기일까?'
    },
    {
      id: 'toward_legend',
      title: '전설을 향하여',
      text: `전설의 청새치를 꿈꿨어. 바다 최고의 존재. 모두가 아는 청새치.

"나도 될 수 있어" 운도 있고, 실력도 있고, 준비도 됐어. 하지만...

"전설이 되려면 더 많은 게 필요해" 인내, 끈기, 희생. 모든 걸 바쳐야 해.

마치 꿈을 이루려면 모든 걸 걸어야 하는 것처럼. 준비됐어?`,
      bg: 'https://images.unsplash.com/photo-1662757171170-30a462b7d4c9',
      choices: [
        { label: '모든 걸 건다', to: 'all_in', cls: 'bg-red-200' },
        { label: '균형 있게 가기', to: 'balanced_path', cls: 'bg-blue-200' }
      ],
      prompt: '💭 전설이 되려면 무엇을 포기해야 할까?'
    },
    {
      id: 'all_in',
      title: '모든 걸 걸다',
      text: `결심했어. "전설이 되겠어"

모든 걸 바쳤어. 편안함 - 포기, 안전 - 포기, 평범한 행복 - 포기. 오직 목표만.

"대가는 크지만 꿈도 크다"

하루하루 한계에 도전. 매일 최고를 추구. 힘들어. 외로워. 하지만...

"이게 내가 선택한 길" 후회 없어. 전설은 평범함을 거부한 자들의 것.`,
      bg: 'https://images.unsplash.com/photo-1662757171170-30a462b7d4c9',
      choices: [
        { label: '끝까지 간다', to: 'go_all_way', cls: 'bg-red-200' }
      ],
      prompt: '💭 모든 걸 거는 게 옳을까?'
    },
    {
      id: 'balanced_path',
      title: '균형의 길',
      text: `전설도 좋지만 삶도 중요해. "균형을 찾자"

최고를 추구하되 행복도 지키고. 도전하되 휴식도 하고.

마치 공부도 하지만 건강도 챙기는 것처럼. "지속 가능한 성장"

번아웃 오면 다 소용없어. 오래 가는 게 중요해. 천천히, 꾸준히, 균형 있게. "이게 진짜 지혜"`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '지혜롭게 가기', to: 'wise_path', cls: 'bg-green-200' }
      ],
      prompt: '💭 균형이 더 높이 갈 수 있게 할까?'
    },
    {
      id: 'go_all_way',
      title: '최고를 향해',
      text: `모든 고난을 견뎠어. 폭풍, 기아, 외로움, 부상. 모두 이겨냈어.

"포기하지 않았어" 강해졌어. 정말 강해졌어.

이제... 바다에서 내 이름을 알아.

"저 청새치는 다르다" "저 청새치는 특별하다"

전설이 되어가고 있어. 하지만 여정은 끝나지 않았어. 마지막 시험이 남았어.`,
      bg: 'https://images.unsplash.com/photo-1662757171170-30a462b7d4c9',
      choices: [
        { label: '운명을 향해', to: 'toward_destiny', cls: 'bg-gray-200' }
      ],
      prompt: '💭 진정한 시험은 마지막에 올까?'
    },
    {
      id: 'wise_path',
      title: '지혜의 완성',
      text: `균형 잡힌 성장. 이게 진짜야.

빠르지 않지만 확실하고, 화려하지 않지만 지속 가능해.

"오래 가는 자가 멀리 간다" 마라톤이지 단거리가 아냐.

천천히 성장했지만, 결국 높은 곳에 도달했어. 지혜롭게, 건강하게, 행복하게.

"이게 성공이야" 이제... 준비됐어. 인생의 큰 시험을 맞을.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '운명의 순간으로', to: 'toward_destiny', cls: 'bg-blue-200' }
      ],
      prompt: '💭 지혜로운 길이 최고일까?'
    },
    {
      id: 'toward_destiny',
      title: '운명의 만남',
      text: `그날이 왔어. 바다 한가운데, 맑은 날씨. 뭔가 느껴졌어.

"오늘은 특별한 날" 수면 위를 봤어.

작은 배 하나. 낡은 배. 그 배에서... 낚시줄이 내려왔어. 그리고 미끼.

"이게... 나의 운명인가?"

지금까지의 모든 것, 모든 선택, 모든 노력. 이 순간을 위한 거였어.`,
      bg: 'https://images.unsplash.com/photo-1710442995783-3640c50c4ab3',
      choices: [
        { label: '운명을 받아들인다', to: 'ending', cls: 'bg-gray-200' }
      ],
      prompt: '💭 모든 여정이 이 순간을 향했을까?'
    },
    
    // ============================================
    // Additional helper scenes for branches
    // ============================================
    {
      id: 'keep_learning',
      title: '끝없는 배움',
      text: `배움을 멈추지 않았어. 매일 새로운 발견, 매일 새로운 깨달음.

"배울수록 모르는 게 많아져" 그게 배움의 아름다움이야.

점점 더 지혜로워지고 있어.`,
      bg: 'https://images.unsplash.com/photo-1674785511474-231880067d4f',
      choices: [
        { label: '완성을 향해', to: 'toward_legend', cls: 'bg-purple-200' }
      ],
      prompt: '💭 배움에 진짜 끝이 없을까?'
    },
    {
      id: 'teach_others',
      title: '가르치는 청새치',
      text: `배운 걸 다른 물고기들에게 가르쳤어.

"가르치면서 더 배워" 신기하게도 가르치니까 내가 더 성장했어.

나누는 것도 성장이야.`,
      bg: 'https://images.unsplash.com/photo-1624891534001-df01917cfeec',
      choices: [
        { label: '계속 성장하기', to: 'toward_legend', cls: 'bg-green-200' }
      ],
      prompt: '💭 가르침이 배움보다 클까?'
    },
    {
      id: 'more_practice',
      title: '연습의 달인',
      text: `더 많이 연습했어. 질리지 않아. 연습할수록 재미있어.

"완벽에 가까워져" 1만 시간의 법칙. 달인이 되어가고 있어.`,
      bg: 'https://images.unsplash.com/photo-1662757171170-30a462b7d4c9',
      choices: [
        { label: '달인의 길로', to: 'toward_legend', cls: 'bg-gold-200' }
      ],
      prompt: '💭 완벽은 존재할까?'
    },
    {
      id: 'learn_new_skill',
      title: '새로운 기술',
      text: `새로운 기술을 배우기 시작했어. 기존 실력에 더해서 새로운 무기를 얻는 거야.

"다재다능해지고 있어" 한 가지만 잘하는 게 아니라 여러 가지를 잘하는 청새치로.`,
      bg: 'https://images.unsplash.com/photo-1719754522656-10b30c29b598',
      choices: [
        { label: '종합 실력 쌓기', to: 'toward_legend', cls: 'bg-blue-200' }
      ],
      prompt: '💭 전문가보다 제너럴리스트가 나을까?'
    },
    {
      id: 'perfect_style',
      title: '스타일의 완성',
      text: `내 스타일을 완벽하게 다듬었어. 이제 누구도 따라할 수 없는 나만의 방식.

"독보적이야" 이게 바로 나만의 브랜드.`,
      bg: 'https://images.unsplash.com/photo-1753792344130-9772d0bdd0f2',
      choices: [
        { label: '독보적인 길로', to: 'toward_legend', cls: 'bg-purple-200' }
      ],
      prompt: '💭 독창성이 최고의 경쟁력일까?'
    },
    {
      id: 'keep_experimenting',
      title: '끝없는 실험',
      text: `계속 실험하고 있어. 새로운 방법, 새로운 시도. 실패해도 괜찮아. 그게 혁신이니까.

"혁신가의 길" 안주하지 않고 계속 발전하는 거야.`,
      bg: 'https://images.unsplash.com/photo-1719754522656-10b30c29b598',
      choices: [
        { label: '혁신의 길로', to: 'toward_legend', cls: 'bg-orange-200' }
      ],
      prompt: '💭 혁신은 위험을 감수해야 할까?'
    },
    {
      id: 'keep_integrating',
      title: '융합의 마스터',
      text: `계속 융합하며 발전했어. 내 것과 남의 것을 섞어 더 나은 방법을 만들어.

"융합이 미래야" 하이브리드 청새치!`,
      bg: 'https://images.unsplash.com/photo-1624891534001-df01917cfeec',
      choices: [
        { label: '융합의 길로', to: 'toward_legend', cls: 'bg-green-200' }
      ],
      prompt: '💭 융합이 독창성을 뛰어넘을까?'
    },
    {
      id: 'find_balance',
      title: '완벽한 균형',
      text: `균형을 찾았어. 내 것과 남의 것, 혁신과 전통, 도전과 안정.

"균형이 최고야" 어느 한쪽으로 치우치지 않는 지혜.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '균형의 길로', to: 'toward_legend', cls: 'bg-blue-200' }
      ],
      prompt: '💭 균형이 모든 답일까?'
    },
    {
      id: 'new_relationships',
      title: '새로운 인연',
      text: `외로움을 극복하고 새로운 관계를 맺었어. 이제 혼자가 아냐.

하지만 의존하지 않아. 독립적이면서도 연결되어 있어. 건강한 관계야.`,
      bg: 'https://images.unsplash.com/photo-1624891534001-df01917cfeec',
      choices: [
        { label: '함께 성장하기', to: 'toward_legend', cls: 'bg-green-200' }
      ],
      prompt: '💭 건강한 관계란 무엇일까?'
    },
    {
      id: 'befriend_myself',
      title: '나 자신과의 우정',
      text: `나 자신과 친구가 됐어. 나를 이해하고, 나를 사랑하고, 나를 믿어.

"자기 사랑이 시작이야" 나를 사랑해야 남도 사랑할 수 있어.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '자기 사랑으로', to: 'toward_legend', cls: 'bg-pink-200' }
      ],
      prompt: '💭 자기 사랑이 이기심과 다를까?'
    },
    {
      id: 'leave_group',
      title: '결별',
      text: `무리를 떠났어. 편안했지만 성장이 없었으니까.

"안녕, 그리고 고마워" 새로운 길을 가야 해.`,
      bg: 'https://images.unsplash.com/photo-1753792344130-9772d0bdd0f2',
      choices: [
        { label: '새 길로', to: 'go_alone', cls: 'bg-orange-200' }
      ],
      prompt: '💭 떠남도 용기일까?'
    },
    {
      id: 'challenge_within',
      title: '무리 안의 도전자',
      text: `무리 안에 있으면서도 도전했어. 함께 있되 안주하지 않는 거야.

"다른 방식도 가능해" 무리와 함께 성장하는 법을 찾았어.`,
      bg: 'https://images.unsplash.com/photo-1624891534001-df01917cfeec',
      choices: [
        { label: '함께 성장', to: 'toward_legend', cls: 'bg-purple-200' }
      ],
      prompt: '💭 집단 안에서도 개인이 빛날 수 있을까?'
    },
    {
      id: 'completely_alone',
      title: '완전한 독립',
      text: `완전히 혼자가 됐어. 아무도 없어. 오직 나만.

외롭지만 자유로워. 무섭지만 강해져. 이게 진짜 독립이야.`,
      bg: 'https://images.unsplash.com/photo-1759850426194-be693eb19da0',
      choices: [
        { label: '독립의 길', to: 'embrace_solitude', cls: 'bg-purple-200' }
      ],
      prompt: '💭 완전한 독립이 가능할까?'
    },
    {
      id: 'occasional_meeting',
      title: '적당한 거리',
      text: `가끔 만나기로 했어. 너무 가깝지도, 너무 멀지도 않게.

"적당한 거리가 좋아" 독립과 연결, 둘 다 지키는 거야.`,
      bg: 'https://images.unsplash.com/photo-1624891534001-df01917cfeec',
      choices: [
        { label: '균형 잡힌 삶으로', to: 'toward_legend', cls: 'bg-green-200' }
      ],
      prompt: '💭 적당한 거리가 최선일까?'
    },
    {
      id: 'keep_safe',
      title: '안전한 길',
      text: `계속 안전하게 갔어. 빠르지 않지만 확실해. 실패도 적고 꾸준히 성장해.

"안전이 나쁜 건 아냐" 내 페이스로 가는 거야.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '꾸준히 가기', to: 'toward_legend', cls: 'bg-green-200' }
      ],
      prompt: '💭 안전한 길이 정답일 때도 있을까?'
    },
    {
      id: 'increase_difficulty',
      title: '난이도 상승',
      text: `조금씩 난이도를 높였어. 안전하게 시작했지만 이제 조금씩 도전.

"단계적 성장" 이게 가장 효율적이야.`,
      bg: 'https://images.unsplash.com/photo-1719754522656-10b30c29b598',
      choices: [
        { label: '점진적 성장', to: 'toward_legend', cls: 'bg-orange-200' }
      ],
      prompt: '💭 점진적 성장이 가장 현명할까?'
    },
    {
      id: 'keep_fighting',
      title: '끝없는 싸움',
      text: `계속 싸웠어. 지치지만 멈추지 않아. "싸움이 내 삶"

하지만... 너무 지쳤어. 이대로 가다간 무너질 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1762717563045-407f3bfde88f',
      choices: [
        { label: '방법을 바꾸자', to: 'change_strategy', cls: 'bg-blue-200' }
      ],
      prompt: '💭 싸움만이 답일까?'
    },
    {
      id: 'change_strategy',
      title: '전략 전환',
      text: `싸움에서 전략으로 바꿨어. 힘으로 안 되면 머리를 써야지.

"지혜가 힘을 이긴다" 훨씬 쉬워졌어.`,
      bg: 'https://images.unsplash.com/photo-1753792344130-9772d0bdd0f2',
      choices: [
        { label: '전략의 길로', to: 'strategic_approach', cls: 'bg-purple-200' }
      ],
      prompt: '💭 전략이 힘보다 나을까?'
    },
    {
      id: 'develop_strategy',
      title: '전략 개발',
      text: `전략을 더 발전시켰어. 정교해지고, 효율적이 되고, 완벽해져.

"전략가가 되어가" 계획하는 게 재미있어.`,
      bg: 'https://images.unsplash.com/photo-1753792344130-9772d0bdd0f2',
      choices: [
        { label: '전략의 대가로', to: 'toward_legend', cls: 'bg-purple-200' }
      ],
      prompt: '💭 완벽한 전략이 존재할까?'
    },
    {
      id: 'execute_strategy',
      title: '전략 실행',
      text: `전략을 실행했어. 계획대로 움직이니 모든 게 순조로워.

"실행력이 중요해" 좋은 전략도 실행하지 않으면 의미 없어.`,
      bg: 'https://images.unsplash.com/photo-1719754522656-10b30c29b598',
      choices: [
        { label: '실행의 달인으로', to: 'toward_legend', cls: 'bg-green-200' }
      ],
      prompt: '💭 전략과 실행, 무엇이 더 중요할까?'
    },
    {
      id: 'keep_harmony',
      title: '지속적 조화',
      text: `계속 바다와 조화롭게 살았어. 평화롭고 행복해.

하지만 가끔 도전도 필요한 것 같아.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '조화 속 도전', to: 'sometimes_challenge', cls: 'bg-orange-200' }
      ],
      prompt: '💭 조화와 도전을 함께할 수 있을까?'
    },
    {
      id: 'sometimes_challenge',
      title: '조화 속의 도전',
      text: `대부분은 조화롭게, 가끔은 도전하며 살았어.

"이게 완벽한 균형" 평화와 성장, 둘 다 가능해.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '균형의 달인으로', to: 'toward_legend', cls: 'bg-blue-200' }
      ],
      prompt: '💭 조화와 도전의 균형이 최고일까?'
    },
    {
      id: 'maintain_balance',
      title: '균형 유지',
      text: `균형을 계속 유지했어. 사랑과 경계, 신뢰와 준비.

"이게 성숙함이야" 양극단을 피하는 지혜.`,
      bg: 'https://images.unsplash.com/photo-1762402460271-65f055dbe5a5',
      choices: [
        { label: '성숙한 길로', to: 'toward_legend', cls: 'bg-green-200' }
      ],
      prompt: '💭 균형이 성숙의 증거일까?'
    },
    {
      id: 'love_more',
      title: '더 깊은 사랑',
      text: `바다를 더 사랑하기로 했어. 경계보다 사랑.

위험할 수 있지만, 사랑이 나를 보호해줄 거야.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '사랑의 길로', to: 'toward_legend', cls: 'bg-pink-200' }
      ],
      prompt: '💭 사랑이 모든 것을 이길까?'
    },
    {
      id: 'perfect_solitude',
      title: '완벽한 고독',
      text: `고독을 완벽하게 받아들였어. 이제 고독이 친구야.

"고독 속에서 완성" 최고의 작품은 고독에서 나와.`,
      bg: 'https://images.unsplash.com/photo-1759850426194-be693eb19da0',
      choices: [
        { label: '고독의 대가로', to: 'toward_legend', cls: 'bg-purple-200' }
      ],
      prompt: '💭 고독이 최고의 스승일까?'
    },
    {
      id: 'new_beginning',
      title: '새로운 출발',
      text: `세상으로 복귀했어. 새로운 시작. 더 강하고, 더 지혜로워진 모습으로.

"이제 진짜 시작이야" 준비됐어.`,
      bg: 'https://images.unsplash.com/photo-1624891534001-df01917cfeec',
      choices: [
        { label: '세상을 향해', to: 'enter_world', cls: 'bg-blue-200' }
      ],
      prompt: '💭 새로운 시작이 두렵지 않을까?'
    },
    {
      id: 'next_goal',
      title: '다음 목표',
      text: `다음 목표를 정했어. 성취했지만 멈추지 않아.

"계속 전진" 성장은 멈추지 않아.`,
      bg: 'https://images.unsplash.com/photo-1662757171170-30a462b7d4c9',
      choices: [
        { label: '계속 성장', to: 'toward_legend', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 끝없는 목표가 행복일까?'
    },
    {
      id: 'next_level',
      title: '다음 레벨',
      text: `다음 단계로 올라갔어. 레벨업!

더 높은 곳으로. 더 멀리.`,
      bg: 'https://images.unsplash.com/photo-1662757171170-30a462b7d4c9',
      choices: [
        { label: '최고를 향해', to: 'toward_legend', cls: 'bg-gold-200' }
      ],
      prompt: '💭 레벨업의 끝이 있을까?'
    },
    {
      id: 'endless_challenge',
      title: '무한 도전',
      text: `끝없이 도전했어. 지치지만 행복해. 이게 내 삶.

"도전이 나를 살아있게 해" 도전하는 한 살아있어.`,
      bg: 'https://images.unsplash.com/photo-1662757171170-30a462b7d4c9',
      choices: [
        { label: '도전의 화신으로', to: 'toward_legend', cls: 'bg-red-200' }
      ],
      prompt: '💭 끝없는 도전이 삶의 의미일까?'
    },
    {
      id: 'take_rest',
      title: '휴식의 시간',
      text: `잠시 쉬기로 했어. 지속적 도전은 지치게 해.

"쉼표도 필요해" 쉬면서 재충전. 그리고 다시 시작.`,
      bg: 'https://images.unsplash.com/photo-1666062289131-e13f26c7a3a2',
      choices: [
        { label: '재충전 후 출발', to: 'toward_legend', cls: 'bg-green-200' }
      ],
      prompt: '💭 휴식도 성장의 일부일까?'
    },
    
    // ============================================
    // 엔딩 페이지 (최종)
    // ============================================
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `너는 청새치야. 바다에서 태어나 수많은 선택을 하며 성장했어.

그리고 오늘...

낡은 배 위의 노인과 운명적인 만남을 했어.

두 전설의 대결.
같은 꿈을 가진 자들. 최고가 되려는 자들.
바다라는 무대에서 각자 원하는 걸 차지하려는... 진정한 경쟁자.

여기서부터 진짜 이야기가 시작돼.

📚 노인과 청새치의 진짜 승부가 궁금해?

[THE END... 아니, THE BEGINNING!]`,
      bg: 'https://images.unsplash.com/photo-1662757171170-30a462b7d4c9',
      choices: [
        { label: '🔄 처음부터 다시하기', to: 'start', cls: 'bg-purple-600' }
      ],
      prompt: '💭 《노인과 바다》 - 노인과 청새치, 치열한 사투 속에서 운, 외로움, 고난 그리고 바다라는 삶의 터전에 대해 생각해 보게 된는 감동적인 이야기!'
    }
  ]
};

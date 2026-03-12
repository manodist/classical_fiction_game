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

export function generateHongGyewolStory(
  gradeLevel: string,
  lastName: string,
  firstName: string
): Scene[] {
  const name = createNameVariations(lastName, firstName);

  return [
    {
      id: 'start',
      title: '배움을 향한 첫걸음',
      text: `너의 이름은 ${name.full}.

깊은 산속, 곽도사님의 제자가 되었어.

"배움엔 끝이 없다. 무예도, 학문도, 마음도 모두 갈고닦아야 한다."

도사님은 엄하지만 따뜻하셔.

네가 왜 여기 왔는지 물으셨어.`,
      bg: 'https://images.unsplash.com/photo-1761452776106-78710d4fada9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '강해지고 싶어서요', to: 'want_strength', cls: 'bg-red-200' },
        { label: '배우고 싶어서요', to: 'want_learning', cls: 'bg-blue-200' },
        { label: '세상을 바꾸고 싶어서요', to: 'want_change', cls: 'bg-purple-200' },
      ],
      prompt: '💭 너는 무엇을 이루고 싶어?',
    },
    {
      id: 'want_strength',
      title: '진정한 힘이란',
      text: `"강해지고 싶습니다."

도사님이 고개를 끄덕이셨어.

"힘이란 무엇이냐? 주먹의 힘? 칼의 힘?"

"아니다. 진정한 힘은 약한 이를 지키는 것이다."

너는 그 말을 가슴에 새겼어.`,
      bg: 'https://images.unsplash.com/photo-1722479909908-7cd41b8426be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무예 수련부터 시작한다', to: 'martial_first', cls: 'bg-red-200' },
        { label: '마음 수련부터 시작한다', to: 'mind_first', cls: 'bg-blue-200' },
      ],
      prompt: '💭 진짜 강한 사람은 어떤 사람일까?',
    },
    {
      id: 'want_learning',
      title: '배움은 자유다',
      text: `"배우고 싶습니다."

도사님의 눈이 반짝였어.

"좋다. 배움은 사람을 자유롭게 한다."

"책도 읽고, 무예도 익히고, 세상도 알아야 한다."

너는 설렜어. 드넓은 세상이 기다리는 것 같았어.`,
      bg: 'https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '책 읽기부터 시작한다', to: 'book_first', cls: 'bg-blue-200' },
        { label: '세상 구경부터 한다', to: 'world_first', cls: 'bg-green-200' },
      ],
      prompt: '💭 배움이 왜 중요할까?',
    },
    {
      id: 'want_change',
      title: '세상을 바꾸려면',
      text: `"세상을 바꾸고 싶습니다."

도사님이 깊게 고개를 끄덕이셨어.

"큰 뜻이로구나. 하지만 세상을 바꾸려면 먼저 너 자신이 변해야 한다."

"무엇부터 시작하겠느냐?"

너는 생각에 잠겼어.`,
      bg: 'https://images.unsplash.com/photo-1761452359849-c2eea35d0479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사람들을 만나고 싶다', to: 'people_first', cls: 'bg-orange-200' },
        { label: '나를 먼저 갈고닦겠다', to: 'self_first', cls: 'bg-purple-200' },
      ],
      prompt: '💭 변화는 어디서부터 시작될까?',
    },
    {
      id: 'martial_first',
      title: '무예 수련의 의미',
      text: `새벽부터 검을 휘둘렀어.

땀이 비 오듯 흘렀지만 포기하지 않았어.

활을 쏘고, 말을 타는 법도 배웠어.

몸이 강해지니 마음도 단단해졌어.`,
      bg: 'https://images.unsplash.com/photo-1723164965274-5262a095ac54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 강해지고 싶다', to: 'advanced_martial', cls: 'bg-red-200' },
        { label: '이제 학문도 배우고 싶다', to: 'martial_to_book', cls: 'bg-blue-200' },
      ],
      prompt: '💭 무예만으로 충분할까?',
    },
    {
      id: 'mind_first',
      title: '마음의 수련',
      text: `도사님과 명상을 했어.

"마음이 흔들리면 검도 흔들린다."

분노를 다스리고, 욕심을 버리는 법을 배웠어.

평온함 속에서 진정한 힘을 느꼈어.`,
      bg: 'https://images.unsplash.com/photo-1716329094028-91ff9efff456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사람들에게 가르치고 싶다', to: 'teach_mind', cls: 'bg-green-200' },
        { label: '무예도 익히고 싶다', to: 'mind_to_martial', cls: 'bg-red-200' },
      ],
      prompt: '💭 마음이 평온하면 무엇이 달라질까?',
    },
    {
      id: 'book_first',
      title: '지식이 주는 자유',
      text: `병서, 역사서, 철학서를 읽었어.

과거의 영웅들과 현자들을 만났어.

"지식은 무기보다 강하다." 도사님의 말씀이었어.

세상이 넓다는 걸 알았어.`,
      bg: 'https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 많은 책을 읽는다', to: 'deep_study', cls: 'bg-blue-200' },
        { label: '배운 걸 실천하고 싶다', to: 'book_to_action', cls: 'bg-orange-200' },
      ],
      prompt: '💭 아는 것과 행하는 것, 무엇이 더 중요할까?',
    },
    {
      id: 'world_first',
      title: '세상의 불평등',
      text: `도사님과 함께 마을에 내려갔어.

장터가 붐볐어. 여러 사람들을 봤어.

그런데... 여자들은 시장 구석에만 있었어.

"왜 저쪽에만 계세요?" 물어보니 아무도 대답하지 않았어.`,
      bg: 'https://images.unsplash.com/photo-1699324908366-33788d82761a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '불공평하다고 말한다', to: 'speak_first', cls: 'bg-red-200' },
        { label: '더 관찰하고 싶다', to: 'observe_more', cls: 'bg-gray-200' },
      ],
      prompt: '💭 이상한 걸 보면 어떻게 해야 할까?',
    },
    {
      id: 'people_first',
      title: '차별받는 사람들',
      text: `마을로 내려가 사람들을 만났어.

똑같이 일하는데 여자들은 돈을 적게 받았어.

여자아이들은 학당에 갈 수 없었어.

"옛날부터 그랬어." 사람들이 말했어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '지금 당장 바꾸려 한다', to: 'immediate_change', cls: 'bg-red-200' },
        { label: '먼저 힘을 기르기로 한다', to: 'power_first', cls: 'bg-purple-200' },
      ],
      prompt: '💭 변화를 만들려면 무엇이 필요할까?',
    },
    {
      id: 'self_first',
      title: '나를 갈고닦기',
      text: `"먼저 저 자신을 완성하겠습니다."

도사님이 흡족해하셨어.

"현명하구나. 빈 그릇으로는 아무도 채울 수 없다."

열심히 수련을 시작했어.`,
      bg: 'https://images.unsplash.com/photo-1762267659923-1b6c158e12b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무예를 집중적으로 배운다', to: 'self_martial', cls: 'bg-red-200' },
        { label: '학문을 집중적으로 배운다', to: 'self_book', cls: 'bg-blue-200' },
      ],
      prompt: '💭 무엇을 먼저 채워야 할까?',
    },
    {
      id: 'advanced_martial',
      title: '무예의 달인',
      text: `검술이 물 흐르듯 자연스러워졌어.

화살은 백발백중이었어.

도사님이 말씀하셨어. "이제 진짜 적을 알 때다."

"진짜 적은 밖이 아니라 안에 있다."`,
      bg: 'https://images.unsplash.com/photo-1758621996298-d19c4bcc43a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '내면의 적이 뭔지 묻는다', to: 'inner_enemy', cls: 'bg-purple-200' },
        { label: '실전 경험이 필요하다', to: 'real_battle', cls: 'bg-red-200' },
      ],
      prompt: '💭 진짜 적은 누구일까?',
    },
    {
      id: 'martial_to_book',
      title: '무예에서 학문으로',
      text: `"이제 학문도 배우고 싶습니다."

도사님이 책들을 가져오셨어.

손자병법, 삼국지, 맹자...

무예만 할 때와는 다른 세상이 펼쳐졌어.`,
      bg: 'https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '전쟁과 전략을 공부한다', to: 'strategy_study', cls: 'bg-red-200' },
        { label: '철학과 윤리를 공부한다', to: 'philosophy_study', cls: 'bg-blue-200' },
      ],
      prompt: '💭 무엇을 배우고 싶어?',
    },
    {
      id: 'teach_mind',
      title: '마음의 선생',
      text: `마을 사람들에게 명상을 가르쳤어.

"마음이 편해졌어요." 사람들이 고마워했어.

한 여인이 물었어. "우리 딸도 배울 수 있나요?"

"물론입니다." 너는 대답했어.`,
      bg: 'https://images.unsplash.com/photo-1746535908442-0140112ddc1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '여자아이들만 따로 가르친다', to: 'teach_girls', cls: 'bg-pink-200' },
        { label: '모두 함께 가르친다', to: 'teach_all', cls: 'bg-green-200' },
      ],
      prompt: '💭 누구를 가르쳐야 할까?',
    },
    {
      id: 'mind_to_martial',
      title: '마음과 무예의 조화',
      text: `마음이 평온하니 무예가 더 빨리 늘었어.

도사님이 말씀하셨어.

"마음과 몸이 하나가 되는구나."

"이것이 진정한 무인의 길이다."`,
      bg: 'https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 수련한다', to: 'balanced_path', cls: 'bg-purple-200' },
        { label: '세상에 나가 시험하고 싶다', to: 'test_world', cls: 'bg-orange-200' },
      ],
      prompt: '💭 배운 것을 어떻게 사용할까?',
    },
    {
      id: 'deep_study',
      title: '지식과 지혜의 차이',
      text: `밤낮으로 책을 읽었어.

역사 속 영웅들의 실수도 배웠어.

"지식만으로는 부족하다. 지혜가 필요하다." 

도사님의 가르침을 이해하기 시작했어.`,
      bg: 'https://images.unsplash.com/photo-1762440114601-447bf3052e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사람들을 가르치고 싶다', to: 'become_teacher', cls: 'bg-blue-200' },
        { label: '나라를 위해 일하고 싶다', to: 'serve_country', cls: 'bg-red-200' },
      ],
      prompt: '💭 배운 것을 어디에 쓸까?',
    },
    {
      id: 'book_to_action',
      title: '아는 것과 행하는 것',
      text: `책에서 읽은 것을 실천하기로 했어.

"아는 것과 행하는 것은 다르다."

도사님이 허락하셔서 마을로 내려갔어.

무엇부터 할지 고민됐어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '가난한 사람들을 돕는다', to: 'help_poor', cls: 'bg-green-200' },
        { label: '교육이 필요한 아이들을 가르친다', to: 'teach_children', cls: 'bg-blue-200' },
      ],
      prompt: '💭 무엇이 가장 급할까?',
    },
    {
      id: 'speak_first',
      title: '평등을 향한 외침',
      text: `"왜 여자들은 저쪽에만 있어야 하나요?"

큰 소리로 물었어.

사람들이 놀라 돌아봤어.

"원래 그런 거야." "여자가 감히!"

비웃음도 있었지만, 고개 끄덕이는 사람도 있었어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 질문한다', to: 'keep_asking', cls: 'bg-red-200' },
        { label: '도사님께 여쭤본다', to: 'ask_master_early', cls: 'bg-blue-200' },
      ],
      prompt: '💭 반대에 부딪히면 어떻게 할까?',
    },
    {
      id: 'observe_more',
      title: '관찰의 힘',
      text: `조용히 관찰했어.

여자들은 남자들보다 일을 더 많이 했어.

하지만 대우는 훨씬 나빴어.

"왜 아무도 이상하다고 안 할까?"

궁금했어.`,
      bg: 'https://images.unsplash.com/photo-1699324908366-33788d82761a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '여자들에게 직접 물어본다', to: 'ask_women', cls: 'bg-pink-200' },
        { label: '남자들에게 물어본다', to: 'ask_men', cls: 'bg-blue-200' },
      ],
      prompt: '💭 누구의 이야기를 들어야 할까?',
    },
    {
      id: 'immediate_change',
      title: '급한 마음',
      text: `"지금 당장 바꿔야 합니다!"

열정적으로 말했지만 사람들은 웃었어.

"네가 뭔데?" "어린것이 세상을 뭘 안다고."

좌절했어. 도사님이 말씀하셨어.

"급하면 일을 그르친다."`,
      bg: 'https://images.unsplash.com/photo-1762440114601-447bf3052e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '방법을 바꾼다', to: 'change_method', cls: 'bg-orange-200' },
        { label: '먼저 배우기로 한다', to: 'learn_more', cls: 'bg-blue-200' },
      ],
      prompt: '💭 실패했을 때 어떻게 해야 할까?',
    },
    {
      id: 'power_first',
      title: '힘을 기르기',
      text: `"먼저 힘을 길러야겠어."

도사님께 돌아가 열심히 수련했어.

무예도, 학문도, 마음도.

"때가 오면 쓸 수 있도록" 준비했어.`,
      bg: 'https://images.unsplash.com/photo-1762267659923-1b6c158e12b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '몇 년 후 다시 마을로', to: 'return_village', cls: 'bg-green-200' },
        { label: '계속 수련한다', to: 'more_training', cls: 'bg-purple-200' },
      ],
      prompt: '💭 준비는 언제까지 해야 할까?',
    },
    {
      id: 'self_martial',
      title: '무예 수련의 길',
      text: `검, 창, 활, 말... 모든 무예를 익혔어.

강해지니 자신감이 생겼어.

하지만 도사님이 물으셨어.

"힘으로 무엇을 하려느냐?"`,
      bg: 'https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '나라를 지키고 싶다', to: 'protect_country', cls: 'bg-blue-200' },
        { label: '약한 이들을 지키고 싶다', to: 'protect_weak', cls: 'bg-green-200' },
      ],
      prompt: '💭 힘을 무엇을 위해 쓸까?',
    },
    {
      id: 'self_book',
      title: '학문 연구의 길',
      text: `온갖 책을 섭렵했어.

역사, 철학, 병법, 문학...

세상을 이해하는 눈이 생겼어.

"이제 뭘 하고 싶으냐?" 도사님이 물으셨어.`,
      bg: 'https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사람들을 가르치고 싶다', to: 'want_teach', cls: 'bg-blue-200' },
        { label: '책을 쓰고 싶다', to: 'want_write', cls: 'bg-purple-200' },
      ],
      prompt: '💭 지식을 어떻게 나눌까?',
    },
    {
      id: 'inner_enemy',
      title: '내면의 적',
      text: `"내면의 적이 뭔가요?"

"두려움, 분노, 교만, 편견이다."

도사님의 대답이었어.

"이것들을 이기지 못하면 진정한 강자가 될 수 없다."

너는 자신을 돌아봤어.`,
      bg: 'https://images.unsplash.com/photo-1716329094028-91ff9efff456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '마음 수련을 더 한다', to: 'overcome_self', cls: 'bg-blue-200' },
        { label: '세상에서 배우고 싶다', to: 'learn_from_world', cls: 'bg-orange-200' },
      ],
      prompt: '💭 어떻게 내면의 적을 이길까?',
    },
    {
      id: 'real_battle',
      title: '실전의 필요성',
      text: `"실전 경험이 필요합니다."

도사님이 고개를 끄덕이셨어.

"좋다. 산적들이 나타난 마을이 있다."

"가서 백성들을 도와라."

첫 실전이었어.`,
      bg: 'https://images.unsplash.com/photo-1603909070343-649482999bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '혼자 간다', to: 'solo_mission', cls: 'bg-red-200' },
        { label: '마을 사람들과 함께 간다', to: 'team_mission', cls: 'bg-green-200' },
      ],
      prompt: '💭 혼자 할까, 함께 할까?',
    },
    {
      id: 'strategy_study',
      title: '전략의 세계',
      text: `손자병법과 육도삼략을 읽었어.

"싸우지 않고 이기는 것이 최선이다."

전쟁은 힘만이 아니라 지혜의 싸움이었어.

나라를 지키고 싶은 마음이 커졌어.`,
      bg: 'https://images.unsplash.com/photo-1762440114601-447bf3052e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '병법을 더 공부한다', to: 'master_strategy', cls: 'bg-red-200' },
        { label: '무예도 함께 배운다', to: 'strategy_martial', cls: 'bg-orange-200' },
      ],
      prompt: '💭 전략과 무예, 무엇이 더 중요할까?',
    },
    {
      id: 'philosophy_study',
      title: '철학의 길',
      text: `맹자, 노자, 공자의 가르침을 배웠어.

"인의예지신" 다섯 가지 덕목.

"사람다움이란 무엇인가?"

깊은 질문을 마주했어.`,
      bg: 'https://images.unsplash.com/photo-1737929798451-7f06be199fef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사람다움을 실천하러 간다', to: 'practice_virtue', cls: 'bg-green-200' },
        { label: '더 깊이 공부한다', to: 'deep_philosophy', cls: 'bg-purple-200' },
      ],
      prompt: '💭 아는 것과 사는 것, 무엇이 중요할까?',
    },
    {
      id: 'teach_girls',
      title: '여자도 배울 수 있다',
      text: `여자아이들만 모아서 가르쳤어.

"왜 우리만 가르치세요?" 한 아이가 물었어.

"너희에게도 기회가 있어야 한다."

아이들의 눈이 반짝였어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '남자아이들도 함께 가르친다', to: 'expand_teaching', cls: 'bg-blue-200' },
        { label: '여자아이들에게 집중한다', to: 'focus_girls', cls: 'bg-pink-200' },
      ],
      prompt: '💭 평등한 교육이란 뭘까?',
    },
    {
      id: 'teach_all',
      title: '모두가 배울 권리',
      text: `남자아이도 여자아이도 모두 가르쳤어.

처음엔 부모들이 반대했어.

"여자는 배울 필요 없어!"

하지만 조금씩 변화가 일어났어.`,
      bg: 'https://images.unsplash.com/photo-1657461821016-62c047f663de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 밀고 나간다', to: 'persist_teaching', cls: 'bg-green-200' },
        { label: '부모들을 설득한다', to: 'convince_parents', cls: 'bg-blue-200' },
      ],
      prompt: '💭 반대를 어떻게 이겨낼까?',
    },
    {
      id: 'balanced_path',
      title: '조화로운 수련',
      text: `마음과 몸, 무예와 학문을 모두 익혔어.

균형이 중요하다는 걸 깨달았어.

도사님이 흡족해하셨어.

"이제 세상으로 나가도 좋다."`,
      bg: 'https://images.unsplash.com/photo-1762267659923-1b6c158e12b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '마을로 내려간다', to: 'go_to_village', cls: 'bg-green-200' },
        { label: '더 멀리 여행하고 싶다', to: 'travel_far', cls: 'bg-orange-200' },
      ],
      prompt: '💭 어디로 가야 할까?',
    },
    {
      id: 'test_world',
      title: '세상의 시험',
      text: `마을로 내려가 사람들을 만났어.

배고픈 사람, 억울한 사람, 차별받는 사람...

세상은 생각보다 복잡했어.

"뭘 해야 하지?"`,
      bg: 'https://images.unsplash.com/photo-1699324908366-33788d82761a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '가장 약한 사람부터 돕는다', to: 'help_weakest', cls: 'bg-green-200' },
        { label: '제도를 바꾸려 한다', to: 'change_system', cls: 'bg-red-200' },
      ],
      prompt: '💭 어디서부터 시작할까?',
    },
    {
      id: 'become_teacher',
      title: '선생의 길',
      text: `학당을 열었어.

아이들이 모여들었어.

그런데 여자아이들은 올 수 없었어.

"선생님, 제 동생도 배우고 싶대요."

한 소년이 말했어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '여자아이들도 받아들인다', to: 'accept_girls', cls: 'bg-pink-200' },
        { label: '따로 여자 학당을 연다', to: 'separate_school', cls: 'bg-blue-200' },
      ],
      prompt: '💭 어떻게 가르쳐야 할까?',
    },
    {
      id: 'serve_country',
      title: '나라란 무엇인가',
      text: `"나라를 위해 일하고 싶습니다."

도사님이 말씀하셨어.

"나라란 무엇이냐? 임금? 성?"

"아니다. 나라는 백성이다."

백성이 행복해야 나라가 강하다는 걸 깨달았어.`,
      bg: 'https://images.unsplash.com/photo-1762440114601-447bf3052e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '벼슬을 하고 싶다', to: 'want_office', cls: 'bg-blue-200' },
        { label: '백성을 직접 돕고 싶다', to: 'help_people', cls: 'bg-green-200' },
      ],
      prompt: '💭 어떻게 나라를 섬길까?',
    },
    {
      id: 'help_poor',
      title: '가난한 이들을 위해',
      text: `굶주린 사람들에게 밥을 주었어.

"고맙습니다." 눈물을 흘리는 사람들.

하지만 너무 많았어. 네 힘만으로는 부족했어.

"어떻게 해야 하지?"`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사람들을 조직한다', to: 'organize_people', cls: 'bg-orange-200' },
        { label: '더 큰 힘이 필요하다', to: 'need_power', cls: 'bg-purple-200' },
      ],
      prompt: '💭 혼자 할 수 있는 일의 한계는?',
    },
    {
      id: 'teach_children',
      title: '아이들의 선생',
      text: `글을 모르는 아이들을 가르쳤어.

배우는 기쁨에 눈을 빛내는 아이들.

그런데 여자아이들은 부모가 안 보냈어.

"여자는 배워서 뭐하나?"`,
      bg: 'https://images.unsplash.com/photo-1657461821016-62c047f663de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '부모들을 찾아간다', to: 'visit_parents', cls: 'bg-blue-200' },
        { label: '여자아이들을 몰래 가르친다', to: 'secret_teaching', cls: 'bg-red-200' },
      ],
      prompt: '💭 옳은 일이지만 반대받을 때는?',
    },
    {
      id: 'keep_asking',
      title: '끝없는 질문',
      text: `계속 질문했어.

"왜요? 이유가 뭐예요?"

사람들은 화를 냈고, 일부는 생각하기 시작했어.

"어린것이 버릇없어!" vs "그러게... 왜 그럴까?"

변화의 씨앗이 뿌려졌어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '도사님께 돌아간다', to: 'ask_master_question', cls: 'bg-blue-200' },
        { label: '계속 마을에 남는다', to: 'stay_village', cls: 'bg-green-200' },
      ],
      prompt: '💭 질문이 세상을 바꿀 수 있을까?',
    },
    {
      id: 'ask_master_early',
      title: '세상은 바뀔 수 있다',
      text: `도사님께 여쭤봤어.

"왜 세상은 불공평한가요?"

"옛날부터 그래왔다는 핑계가 있다."

"하지만 너희 같은 이들이 바꿀 수 있다."

희망이 보였어.`,
      bg: 'https://images.unsplash.com/photo-1679310447555-6b29a10a75fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 배우고 싶다', to: 'continue_learning', cls: 'bg-blue-200' },
        { label: '바로 실천하고 싶다', to: 'immediate_action', cls: 'bg-red-200' },
      ],
      prompt: '💭 배움과 실천, 무엇이 먼저일까?',
    },
    {
      id: 'ask_women',
      title: '여자들의 이야기',
      text: `여자들에게 조용히 물어봤어.

"왜 참으세요?"

"말해봤자 소용없어." "원래 그런 거야."

하지만 한 할머니가 말씀하셨어.

"옛날엔... 나도 꿈이 있었는데..."`,
      bg: 'https://images.unsplash.com/photo-1699324908366-33788d82761a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 많은 이야기를 듣는다', to: 'listen_more', cls: 'bg-purple-200' },
        { label: '변화를 시작하고 싶다', to: 'start_change', cls: 'bg-red-200' },
      ],
      prompt: '💭 다른 사람의 아픔을 들으면 어떻게 될까?',
    },
    {
      id: 'ask_men',
      title: '두려움이 만든 차별',
      text: `남자들에게 물어봤어.

"왜 여자들을 차별하나요?"

"원래 그런 거지." "남자가 강하니까."

한 노인이 말했어.

"사실... 여자들이 똑똑해지면 우리가 무섭단다."`,
      bg: 'https://images.unsplash.com/photo-1762440114601-447bf3052e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '두려움을 이해하려 한다', to: 'understand_fear', cls: 'bg-blue-200' },
        { label: '잘못됐다고 말한다', to: 'say_wrong', cls: 'bg-red-200' },
      ],
      prompt: '💭 차별의 뿌리는 무엇일까?',
    },
    {
      id: 'protect_country',
      title: '백성이 곧 나라',
      text: `"나라를 지키고 싶습니다."

도사님이 물으셨어.

"나라를 지킨다는 건 무엇이냐?"

"전쟁에서 이기는 것? 아니다."

"백성이 평화롭게 사는 것이다."`,
      bg: 'https://images.unsplash.com/photo-1737929798451-7f06be199fef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 수련을 쌓는다', to: 'years_pass', cls: 'bg-purple-200' },
      ],
      prompt: '💭 진정한 평화란 무엇일까?',
    },
    {
      id: 'protect_weak',
      title: '약자를 지키는 힘',
      text: `"약한 이들을 지키고 싶습니다."

도사님이 고개를 끄덕이셨어.

"약자란 누구냐?"

"가난한 사람, 병든 사람, 차별받는 사람..."

너는 깨달았어. 세상엔 약자가 너무 많다는 걸.`,
      bg: 'https://images.unsplash.com/photo-1716329094028-91ff9efff456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 수련을 쌓는다', to: 'years_pass', cls: 'bg-purple-200' },
      ],
      prompt: '💭 모두를 지킬 수 있을까?',
    },
    {
      id: 'want_teach',
      title: '가르치는 길',
      text: `"사람들을 가르치고 싶습니다."

"좋다. 배운 것을 나누는 것이 진정한 배움이다."

도사님이 허락하셨어.

마을로 내려가 학당을 열었어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '모두에게 문을 연다', to: 'open_school', cls: 'bg-green-200' },
      ],
      prompt: '💭 누구를 가르칠까?',
    },
    {
      id: 'want_write',
      title: '글을 쓰는 길',
      text: `"책을 쓰고 싶습니다."

"무엇을 쓰겠느냐?"

"평등에 대해, 정의에 대해, 꿈에 대해..."

도사님이 웃으셨어. "세상이 준비될 때까지 기다려야 할 수도 있다."`,
      bg: 'https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그래도 쓰겠다', to: 'write_anyway', cls: 'bg-purple-200' },
        { label: '먼저 경험을 쌓는다', to: 'experience_first', cls: 'bg-orange-200' },
      ],
      prompt: '💭 글은 세상을 바꿀 수 있을까?',
    },
    {
      id: 'years_pass',
      title: '세월의 흐름',
      text: `몇 해가 흘렀어.

너는 이제 훌륭한 무사이자 학자가 됐어.

많은 사람들을 가르치고, 변화도 만들었어.

도사님이 말씀하셨어.

"이제 마지막 가르침을 줄 때다."`,
      bg: 'https://images.unsplash.com/photo-1716329094028-91ff9efff456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '무엇인지 듣는다', to: 'final_lesson', cls: 'bg-blue-200' },
      ],
      prompt: '💭 가장 중요한 배움은 무엇일까?',
    },
    {
      id: 'final_lesson',
      title: '다음 세대를 위한 가르침',
      text: `"다음 세대를 준비하라."

도사님의 말씀이었어.

"네가 한 일은 시작일 뿐이다."

"진짜 변화는 너의 뒤를 이을 이들이 만들 것이다."

너는 고개를 끄덕였어.`,
      bg: 'https://images.unsplash.com/photo-1751938441118-34d73adf6342?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음 세대를 기다린다', to: 'wait_next_generation', cls: 'bg-green-200' },
      ],
      prompt: '💭 꿈을 물려준다는 건 무엇일까?',
    },
    {
      id: 'wait_next_generation',
      title: '예언',
      text: `"앞으로 두 아이가 올 것이다."

도사님이 말씀하셨어.

"소녀의 이름은 계월, 소년의 이름은 보국."

"계월이는 여자의 몸으로 세상에 맞설 것이다."

"어떤 방법으로든 자신의 길을 찾을 것이다."`,
      bg: 'https://images.unsplash.com/photo-1679310447555-6b29a10a75fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그들을 위해 준비한다', to: 'prepare', cls: 'bg-purple-200' },
      ],
      prompt: '💭 다음 세대를 위해 무엇을 할 수 있을까?',
    },
    {
      id: 'prepare',
      title: '준비',
      text: `세월이 흘러 계월이와 보국이가 태어났어.

두 아이가 자라는 동안 너는 준비했어.

책들을 정리하고, 무기들을 손질하고,

무엇보다 세상을 조금이라도 더 나은 곳으로 만들었어.`,
      bg: 'https://images.unsplash.com/photo-1762440114601-447bf3052e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그날을 기다린다', to: 'arrival', cls: 'bg-blue-200' },
      ],
      prompt: '💭 씨앗을 심는다는 건 무슨 뜻일까?',
    },
    {
      id: 'arrival',
      title: '그날',
      text: `"오늘이다."

도사님의 말씀이었어.

산 아래서 발소리가 들렸어.

당당한 소녀와 씩씩한 소년.

계월이와 보국이였어.`,
      bg: 'https://images.unsplash.com/photo-1731838201947-25e2ebdf4e8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '환영한다', to: 'welcome', cls: 'bg-green-200' },
      ],
      prompt: '💭 새로운 세대에게 무엇을 전하고 싶어?',
    },
    {
      id: 'welcome',
      title: '새 시대의 시작',
      text: `"환영한다."

도사님이 두 아이를 맞이했어.

계월이는 당당했고, 보국이는 정의로웠어.

그들의 성장과 미래가 기대가 되었어.

꿈이 이뤄질 수 있다는 믿음이 생겨.

세상은 의지를 이어가는 사람들에 의해 변할거야`,
      bg: 'https://images.unsplash.com/photo-1637143714463-813403c37f90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이야기를 마친다', to: 'ending', cls: 'bg-blue-200' },
      ],
      prompt: '💭 변화는 어떻게 시작될까?',
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `너는 계월이와 보국이의 성장을 위한 준비를 잘 마쳤어.

그리고 세상으로 나가 나라에 큰 변화를 일으킬 기반을 마련하기로 했어.

배우고, 나라를 사랑하고, 차별없는 세상을 만드는데 성별은 아무 상관이 없기를 바라며...

《홍계월전》에서는 여자의 몸으로 태어난 계월이가 어떻게 자신의 꿈을 이룰지, 그 놀라운 이야기가 펼쳐져!

📚 서점이나 도서관에서 《홍계월전》을 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1737929798451-7f06be199fef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' },
      ],
      prompt: '《홍계월전》 - 마치 *잔다르크*나 *뮬란*처럼 여성도 능력 있고 성실하다면 국가의 영웅이 될 수 있다는 교훈적 메시지를 담은 통쾌한 이야기야!',
    },

    // 추가 분기들의 엔딩 연결
    {
      id: 'overcome_self',
      title: '자아 극복',
      text: `마음 수련을 통해 내면의 적을 이겼어.

두려움이 용기로, 분노가 평온으로 바뀌었어.

도사님이 말씀하셨어.

"이제 진정한 무인이 되었구나."`,
      bg: 'https://images.unsplash.com/photo-1716329094028-91ff9efff456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '세상에 나가본다', to: 'learn_from_world', cls: 'bg-orange-200' },
        { label: '수련을 계속한다', to: 'years_pass', cls: 'bg-purple-200' },
      ],
      prompt: '💭 자신을 이긴다는 건 무엇일까?',
    },
    {
      id: 'learn_from_world',
      title: '세상이라는 스승',
      text: `여러 마을을 돌아다니며 배웠어.

사람들의 아픔, 기쁨, 꿈...

책에서는 배울 수 없는 것들이었어.

세상이 가장 큰 선생이었어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사람들을 가르치고 싶다', to: 'expand_teaching', cls: 'bg-blue-200' },
        { label: '배운 걸 나누고 싶다', to: 'years_pass', cls: 'bg-green-200' },
      ],
      prompt: '💭 진짜 배움은 어디서 올까?',
    },
    {
      id: 'solo_mission',
      title: '혼자서의 승리',
      text: `혼자서 산적들을 물리쳤어.

백성들이 고마워했어.

하지만 뭔가 허전했어.

"혼자 하는 영웅놀이는... 외롭네."`,
      bg: 'https://images.unsplash.com/photo-1603909070343-649482999bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다음엔 함께 하기로', to: 'organize_people', cls: 'bg-green-200' },
        { label: '혼자가 편하다', to: 'years_pass', cls: 'bg-blue-200' },
      ],
      prompt: '💭 영웅은 혼자일까?',
    },
    {
      id: 'team_mission',
      title: '함께한 승리',
      text: `마을 사람들과 함께 계획을 세웠어.

각자의 역할을 했고, 산적들을 물리쳤어.

"함께하니 더 강하네요!" 사람들이 웃었어.

혼자보다 함께가 낫다는 걸 배웠어.`,
      bg: 'https://images.unsplash.com/photo-1657461821016-62c047f663de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사람들을 더 조직한다', to: 'organize_people', cls: 'bg-orange-200' },
        { label: '계속 이렇게 하기로', to: 'years_pass', cls: 'bg-green-200' },
      ],
      prompt: '💭 함께하는 힘은 얼마나 클까?',
    },
    {
      id: 'master_strategy',
      title: '전략의 대가',
      text: `모든 병법서를 섭렵했어.

전쟁의 원리, 리더십, 전략과 전술...

나라를 지킬 준비가 됐어.

"때가 오면 쓸 수 있도록."`,
      bg: 'https://images.unsplash.com/photo-1762440114601-447bf3052e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '제도를 바꾸고 싶다', to: 'change_system', cls: 'bg-red-200' },
        { label: '그날을 준비한다', to: 'years_pass', cls: 'bg-purple-200' },
      ],
      prompt: '💭 평화로울 때 전쟁을 준비하는 이유는?',
    },
    {
      id: 'strategy_martial',
      title: '지략과 무예',
      text: `전략과 무예를 함께 익혔어.

머리로 생각하고 몸으로 실천하는 무인.

완벽한 균형이었어.

도사님이 자랑스러워하셨어.`,
      bg: 'https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '세상에 나간다', to: 'travel_far', cls: 'bg-orange-200' },
        { label: '계속 수련한다', to: 'years_pass', cls: 'bg-purple-200' },
      ],
      prompt: '💭 지혜와 힘, 둘 다 필요할까?',
    },
    {
      id: 'practice_virtue',
      title: '덕을 실천하다',
      text: `배운 덕목을 실천하러 나갔어.

인(仁) - 사람을 사랑하고
의(義) - 옳은 일을 하고
예(禮) - 예의를 지키고
지(智) - 지혜롭게 판단하고
신(信) - 신의를 지켰어.

쉽지 않았지만 의미 있었어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '약한 이들을 돕는다', to: 'help_weakest', cls: 'bg-green-200' },
        { label: '계속 실천한다', to: 'years_pass', cls: 'bg-blue-200' },
      ],
      prompt: '💭 아는 것을 사는 것, 가능할까?',
    },
    {
      id: 'deep_philosophy',
      title: '철학의 깊이',
      text: `더 깊이 공부했어.

"사람다움이란 무엇인가?"
"정의란 무엇인가?"
"평등이란 무엇인가?"

답은 없었지만, 질문하는 과정이 중요했어.`,
      bg: 'https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '글로 기록하고 싶다', to: 'write_anyway', cls: 'bg-purple-200' },
        { label: '사람들과 나누고 싶다', to: 'years_pass', cls: 'bg-blue-200' },
      ],
      prompt: '💭 답 없는 질문도 가치 있을까?',
    },
    {
      id: 'expand_teaching',
      title: '확장된 교육',
      text: `남자아이들도 함께 가르쳤어.

"왜 여자들도 배워요?" 한 남자아이가 물었어.

"모두 배울 권리가 있으니까."

아이들은 금방 이해했어. 어른보다 빠르게.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 많이 가르친다', to: 'persist_teaching', cls: 'bg-blue-200' },
        { label: '계속 가르친다', to: 'years_pass', cls: 'bg-green-200' },
      ],
      prompt: '💭 아이들이 더 열린 마음을 가진 이유는?',
    },
    {
      id: 'focus_girls',
      title: '여자아이들에게 집중',
      text: `여자아이들에게 더 많은 기회를 주었어.

무예도, 학문도, 모든 것을.

"저도 영웅이 될 수 있나요?" 한 아이가 물었어.

"당연하지. 넌 이미 영웅이야."`,
      bg: 'https://images.unsplash.com/photo-1657461821016-62c047f663de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '꿈을 응원한다', to: 'persist_teaching', cls: 'bg-blue-200' },
        { label: '계속 응원한다', to: 'years_pass', cls: 'bg-pink-200' },
      ],
      prompt: '💭 영웅은 어떻게 만들어질까?',
    },
    {
      id: 'persist_teaching',
      title: '변화를 위한 용기',
      text: `반대가 있어도 계속 가르쳤어.

조금씩 변화가 일어났어.

한 여자아이가 장원급제하는 꿈을 꾸기 시작했어.

"불가능해 보이는 꿈도 꿔야 한다."`,
      bg: 'https://images.unsplash.com/photo-1723164965015-681b5243e0a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '부모들을 설득한다', to: 'convince_parents', cls: 'bg-green-200' },
        { label: '꿈을 응원한다', to: 'years_pass', cls: 'bg-blue-200' },
      ],
      prompt: '💭 불가능해 보이는 꿈을 꾸는 이유는?',
    },
    {
      id: 'convince_parents',
      title: '설득의 길',
      text: `부모들을 한 명씩 찾아가 설득했어.

"딸도 아들만큼 훌륭합니다."

쉽지 않았지만 포기하지 않았어.

한 명씩 마음을 열기 시작했어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 많이 설득한다', to: 'spread_stories', cls: 'bg-orange-200' },
        { label: '계속 설득한다', to: 'years_pass', cls: 'bg-green-200' },
      ],
      prompt: '💭 변화는 어떻게 일어날까?',
    },
    {
      id: 'go_to_village',
      title: '마을로',
      text: `마을로 내려가 사람들과 살았어.

그들의 기쁨과 슬픔을 함께했어.

책에서 배운 것보다 더 많은 걸 배웠어.

진짜 삶은 여기 있었어.`,
      bg: 'https://images.unsplash.com/photo-1699324908366-33788d82761a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '약한 이들을 돕는다', to: 'help_weakest', cls: 'bg-green-200' },
        { label: '여기서 뿌리내린다', to: 'years_pass', cls: 'bg-blue-200' },
      ],
      prompt: '💭 삶의 현장에서 배우는 것은?',
    },
    {
      id: 'travel_far',
      title: '먼 여행',
      text: `여러 고을을 여행했어.

다양한 사람들, 다양한 삶...

세상은 넓고 배울 게 많았어.

여행이 끝날 때쯤, 네가 해야 할 일을 알았어.`,
      bg: 'https://images.unsplash.com/photo-1716329094028-91ff9efff456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '마을에 정착한다', to: 'go_to_village', cls: 'bg-green-200' },
        { label: '그 일을 시작한다', to: 'years_pass', cls: 'bg-orange-200' },
      ],
      prompt: '💭 여행은 사람을 어떻게 바꿀까?',
    },
    {
      id: 'help_weakest',
      title: '가장 약한 이를 위해',
      text: `가장 약한 사람들을 찾았어.

버려진 아이들, 병든 노인들, 차별받는 사람들...

작은 도움이었지만 의미가 있었어.

한 사람 한 사람이 중요했어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사람들을 조직한다', to: 'organize_people', cls: 'bg-orange-200' },
        { label: '계속 돕는다', to: 'years_pass', cls: 'bg-green-200' },
      ],
      prompt: '💭 작은 도움도 의미 있을까?',
    },
    {
      id: 'change_system',
      title: '제도를 바꾸려는 시도',
      text: `개인을 돕는 것만으로는 부족했어.

제도 자체가 바뀌어야 했어.

어렵고 느린 길이었지만 시작했어.

"언젠가는..."`,
      bg: 'https://images.unsplash.com/photo-1762440114601-447bf3052e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사람들을 모은다', to: 'organize_people', cls: 'bg-orange-200' },
        { label: '포기하지 않는다', to: 'years_pass', cls: 'bg-red-200' },
      ],
      prompt: '💭 제도를 바꾸는 게 왜 어려울까?',
    },
    {
      id: 'accept_girls',
      title: '편견을 깨다',
      text: `여자아이들도 학당에 받아들였어.

소란이 일었지만 밀고 나갔어.

시간이 지나자 여자아이들이 남자아이들만큼, 아니 더 잘했어.

편견이 무너지기 시작했어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이야기를 퍼뜨린다', to: 'spread_stories', cls: 'bg-orange-200' },
        { label: '계속 가르친다', to: 'years_pass', cls: 'bg-pink-200' },
      ],
      prompt: '💭 편견은 어떻게 무너질까?',
    },
    {
      id: 'separate_school',
      title: '여자 학당',
      text: `따로 여자 학당을 열었어.

안전한 공간에서 마음껏 배울 수 있게.

여자아이들이 모여들었어.

"우리만의 학당이에요!" 아이들이 기뻐했어.`,
      bg: 'https://images.unsplash.com/photo-1657461821016-62c047f663de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '성공 사례를 퍼뜨린다', to: 'spread_stories', cls: 'bg-orange-200' },
        { label: '학당을 키워간다', to: 'years_pass', cls: 'bg-blue-200' },
      ],
      prompt: '💭 분리가 필요할 때도 있을까?',
    },
    {
      id: 'want_office',
      title: '벼슬의 길',
      text: `관직에 나가려 했지만...

"네 신분으로는 어렵다."

제도의 벽이 높았어.

다른 방법을 찾아야 했어.`,
      bg: 'https://images.unsplash.com/photo-1762440114601-447bf3052e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다른 길을 찾는다', to: 'help_people', cls: 'bg-green-200' },
      ],
      prompt: '💭 막힌 길이 있으면 어떻게 할까?',
    },
    {
      id: 'help_people',
      title: '백성을 직접 돕기',
      text: `벼슬 없이도 백성을 도울 수 있었어.

마을을 돌며 문제를 해결해줬어.

"관직이 없어도 도울 수 있구나."

진짜 힘은 지위가 아니었어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 돕는다', to: 'years_pass', cls: 'bg-green-200' },
      ],
      prompt: '💭 지위 없이도 세상을 바꿀 수 있을까?',
    },
    {
      id: 'organize_people',
      title: '사람들을 조직하다',
      text: `혼자서는 한계가 있었어.

사람들을 모아 조직을 만들었어.

함께 일하니 더 많은 이를 도울 수 있었어.

"함께하면 강하다."`,
      bg: 'https://images.unsplash.com/photo-1657461821016-62c047f663de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '제도 변화를 추구한다', to: 'change_system', cls: 'bg-red-200' },
        { label: '조직을 키워간다', to: 'years_pass', cls: 'bg-orange-200' },
      ],
      prompt: '💭 조직의 힘은 무엇일까?',
    },
    {
      id: 'need_power',
      title: '더 큰 힘이 필요하다',
      text: `개인의 힘으로는 부족했어.

더 큰 힘, 제도적 힘이 필요했어.

하지만 그건 시간이 필요했어.

"언젠가는..."`,
      bg: 'https://images.unsplash.com/photo-1762440114601-447bf3052e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사람들을 모은다', to: 'organize_people', cls: 'bg-orange-200' },
        { label: '준비하며 기다린다', to: 'years_pass', cls: 'bg-purple-200' },
      ],
      prompt: '💭 큰 변화는 얼마나 걸릴까?',
    },
    {
      id: 'visit_parents',
      title: '부모들을 찾아가다',
      text: `한 집 한 집 찾아가 설득했어.

"따님도 훌륭합니다. 배울 기회를 주세요."

쉽지 않았지만 한 명씩 마음을 열었어.

변화는 천천히 왔어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이야기를 나눈다', to: 'spread_stories', cls: 'bg-orange-200' },
        { label: '계속 설득한다', to: 'years_pass', cls: 'bg-blue-200' },
      ],
      prompt: '💭 천천히 온 변화도 가치 있을까?',
    },
    {
      id: 'secret_teaching',
      title: '비밀 교육',
      text: `몰래 여자아이들을 가르쳤어.

밤에, 숨어서.

위험했지만 아이들의 눈빛이 너무 간절했어.

"꼭 비밀로 해야 해요."`,
      bg: 'https://images.unsplash.com/photo-1657461821016-62c047f663de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '들키지 않게 조심한다', to: 'secret_continues', cls: 'bg-gray-200' },
        { label: '공개적으로 하기로 결심한다', to: 'go_public', cls: 'bg-red-200' },
      ],
      prompt: '💭 옳은 일인데 숨어야 할 때는?',
    },
    {
      id: 'secret_continues',
      title: '비밀은 계속되고',
      text: `비밀 교육을 계속했어.

점점 더 많은 여자아이들이 찾아왔어.

소문이 조용히 퍼졌어.

"희망의 불씨"를 키우고 있었어.`,
      bg: 'https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 조심스럽게', to: 'years_pass', cls: 'bg-purple-200' },
      ],
      prompt: '💭 작은 불씨도 큰불이 될 수 있을까?',
    },
    {
      id: 'go_public',
      title: '공개 선언',
      text: `"더 이상 숨지 않겠습니다!"

당당하게 선언했어.

많은 반대가 있었지만, 지지자도 생겼어.

용기가 용기를 낳았어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '끝까지 간다', to: 'years_pass', cls: 'bg-red-200' },
      ],
      prompt: '💭 용기는 전염될까?',
    },
    {
      id: 'ask_master_question',
      title: '스승의 지혜',
      text: `도사님께 돌아가 여쭤봤어.

"계속 질문하는 게 맞나요?"

"그렇다. 질문하지 않으면 답도 없다."

"네 질문이 세상을 깨우고 있다."`,
      bg: 'https://images.unsplash.com/photo-1679310447555-6b29a10a75fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 질문하기로', to: 'years_pass', cls: 'bg-blue-200' },
      ],
      prompt: '💭 질문이 세상을 바꿀 수 있을까?',
    },
    {
      id: 'stay_village',
      title: '마을에 남다',
      text: `마을에 남아 계속 질문하고 행동했어.

조금씩 사람들이 바뀌기 시작했어.

"그래, 왜 그럴까?" 사람들도 질문하기 시작했어.

변화의 물결이 일어났어.`,
      bg: 'https://images.unsplash.com/photo-1699324908366-33788d82761a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 남아있는다', to: 'years_pass', cls: 'bg-green-200' },
      ],
      prompt: '💭 변화는 어디서 시작될까?',
    },
    {
      id: 'continue_learning',
      title: '배움은 계속된다',
      text: `더 많이 배웠어.

무예도, 학문도, 사람도.

배울수록 모르는 게 더 많다는 걸 알았어.

"배움에는 끝이 없구나."`,
      bg: 'https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 배운다', to: 'years_pass', cls: 'bg-blue-200' },
      ],
      prompt: '💭 배움의 끝은 있을까?',
    },
    {
      id: 'immediate_action',
      title: '바로 실천',
      text: `배운 걸 바로 실천했어.

실수도 많았지만 배웠어.

행동하면서 더 많이 깨달았어.

"실천이 진짜 배움이구나."`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 실천한다', to: 'years_pass', cls: 'bg-red-200' },
      ],
      prompt: '💭 완벽해질 때까지 기다려야 할까?',
    },
    {
      id: 'listen_more',
      title: '더 많이 듣다',
      text: `여자들의 이야기를 더 들었어.

지워진 꿈들, 숨겨진 재능들...

"이 이야기들을 세상에 알려야 해."

너는 다짐했어.`,
      bg: 'https://images.unsplash.com/photo-1699324908366-33788d82761a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이야기를 기록한다', to: 'record_stories', cls: 'bg-purple-200' },
        { label: '이야기를 퍼뜨린다', to: 'spread_stories', cls: 'bg-orange-200' },
      ],
      prompt: '💭 숨겨진 이야기를 어떻게 전할까?',
    },
    {
      id: 'start_change',
      title: '변화의 시작',
      text: `이야기를 듣고만 있을 수 없었어.

"제가 도와드리겠습니다."

여자들을 중요한 일을 시작했어.

작지만 의미 있는 변화였어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 돕는다', to: 'years_pass', cls: 'bg-green-200' },
      ],
      prompt: '💭 작은 변화도 시작이 될 수 있을까?',
    },
    {
      id: 'understand_fear',
      title: '차별의 뿌리',
      text: `"왜 무서운가요?"

차별의 뿌리는 두려움이었어.

변화가 무섭고, 자리를 잃을까 봐 무섭고...

"두려움을 이해해야 변화가 가능하구나."`,
      bg: 'https://images.unsplash.com/photo-1716329094028-91ff9efff456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '두려움을 없애는 방법을 찾는다', to: 'remove_fear', cls: 'bg-blue-200' },
      ],
      prompt: '💭 두려움을 이해하면 바꿀 수 있을까?',
    },
    {
      id: 'say_wrong',
      title: '잘못을 말하다',
      text: `"그건 잘못됐습니다!"

분명하게 말했어.

일부는 화를 냈고, 일부는 생각에 잠겼어.

진실을 말하는 건 쉽지 않았지만 필요했어.`,
      bg: 'https://images.unsplash.com/photo-1758621976659-b2d5d0e13253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 진실을 말한다', to: 'years_pass', cls: 'bg-red-200' },
      ],
      prompt: '💭 불편한 진실도 말해야 할까?',
    },
    {
      id: 'record_stories',
      title: '이야기를 기록하다',
      text: `여자들의 이야기를 책으로 기록했어.

묻혀버릴 이야기들을 보존했어.

"언젠가 이 이야기들이 세상을 바꿀 거야."

희망을 품었어.`,
      bg: 'https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 기록한다', to: 'years_pass', cls: 'bg-purple-200' },
      ],
      prompt: '💭 기록하는 것은 왜 중요할까?',
    },
    {
      id: 'spread_stories',
      title: '이야기를 퍼뜨리다',
      text: `여자들의 이야기를 마을마다 다니며 전했어.

사람들이 들으면서 생각이 바뀌기 시작했어.

"저런 일도 있었구나..."

공감이 변화의 시작이었어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 전한다', to: 'years_pass', cls: 'bg-orange-200' },
      ],
      prompt: '💭 이야기가 사람을 바꿀 수 있을까?',
    },
    {
      id: 'remove_fear',
      title: '두려움 없는 세상',
      text: `두려움을 없애는 방법을 찾았어.

함께 일하고, 함께 배우고, 함께 성장하면

두려움이 줄어든다는 걸.

조금씩 실천했어.`,
      bg: 'https://images.unsplash.com/photo-1657461821016-62c047f663de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '함께하는 세상을 만든다', to: 'years_pass', cls: 'bg-green-200' },
      ],
      prompt: '💭 두려움을 어떻게 없앨까?',
    },
    {
      id: 'return_village',
      title: '마을로 돌아가다',
      text: `준비를 마치고 마을로 돌아갔어.

이제 너는 달랐어. 강하고 지혜로웠어.

사람들이 너를 존경했어.

"이제 뭘 하지?"`,
      bg: 'https://images.unsplash.com/photo-1699324908366-33788d82761a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사람들을 가르친다', to: 'open_school', cls: 'bg-blue-200' },
        { label: '변화를 만들기 시작한다', to: 'years_pass', cls: 'bg-red-200' },
      ],
      prompt: '💭 준비된 힘을 어떻게 쓸까?',
    },
    {
      id: 'more_training',
      title: '더 많은 수련',
      text: `아직 부족하다고 느꼈어.

더 수련하고, 더 배웠어.

완벽을 추구했어.

하지만 도사님이 말씀하셨어. "완벽은 없다."`,
      bg: 'https://images.unsplash.com/photo-1762267659923-1b6c158e12b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이제 세상으로', to: 'return_village', cls: 'bg-green-200' },
        { label: '그래도 최선을 다한다', to: 'years_pass', cls: 'bg-purple-200' },
      ],
      prompt: '💭 완벽해져야만 시작할 수 있을까?',
    },
    {
      id: 'write_anyway',
      title: '그래도 쓰다',
      text: `세상이 준비 안 됐어도 썼어.

평등과 정의에 대해.

누가 읽을지 몰라도 썼어.

"언젠가 필요한 사람이 읽겠지."`,
      bg: 'https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '기록을 남긴다', to: 'record_stories', cls: 'bg-blue-200' },
        { label: '계속 쓴다', to: 'years_pass', cls: 'bg-purple-200' },
      ],
      prompt: '💭 시대를 앞서가는 용기가 필요할까?',
    },
    {
      id: 'experience_first',
      title: '경험을 쌓다',
      text: `먼저 살아보기로 했어.

경험하고, 느끼고, 배우고...

그리고 나중에 쓰기로.

"진짜 경험이 진짜 글을 만든다."`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '여행을 떠난다', to: 'travel_far', cls: 'bg-orange-200' },
        { label: '세상을 경험한다', to: 'years_pass', cls: 'bg-green-200' },
      ],
      prompt: '💭 경험과 글쓰기, 무엇이 먼저일까?',
    },
    {
      id: 'change_method',
      title: '방법을 바꾸다',
      text: `급하게 하던 방식을 바꿨어.

천천히, 한 사람씩, 대화로...

더 느렸지만 더 효과적이었어.

"방법도 중요하구나."`,
      bg: 'https://images.unsplash.com/photo-1716329094028-91ff9efff456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '설득을 시작한다', to: 'convince_parents', cls: 'bg-green-200' },
        { label: '새로운 방법으로', to: 'years_pass', cls: 'bg-blue-200' },
      ],
      prompt: '💭 목적이 같아도 방법은 다를 수 있을까?',
    },
    {
      id: 'learn_more',
      title: '더 배우기로',
      text: `실패에서 배웠어.

"내가 부족했구나."

도사님께 돌아가 더 배웠어.

실패는 끝이 아니라 시작이었어.`,
      bg: 'https://images.unsplash.com/photo-1762267659923-1b6c158e12b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 수련한다', to: 'more_training', cls: 'bg-purple-200' },
        { label: '다시 도전할 준비를 한다', to: 'years_pass', cls: 'bg-green-200' },
      ],
      prompt: '💭 실패는 정말 실패일까?',
    },
    {
      id: 'open_school',
      title: '열린 학당',
      text: `모두에게 문을 열었어.

부자든 가난하든, 남자든 여자든.

"배움에는 경계가 없다."

혁명적인 학당이었어.

시간이 흘러 네 학당은 유명해졌어.`,
      bg: 'https://images.unsplash.com/photo-1733647781019-3a4d28ff86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 많이 가르친다', to: 'expand_teaching', cls: 'bg-blue-200' },
        { label: '계속 나아간다', to: 'years_pass', cls: 'bg-green-200' },
      ],
      prompt: '💭 진짜 평등한 교육은 무엇일까?',
    },
  ];
}

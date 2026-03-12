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

export function generateTwentyThousandLeaguesStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '바다를 꿈꾸는 아이',
      text: `너의 이름은 ${name.full}.

1860년대 프랑스의 작은 마을에 살아. (지금으로부터 약 160년 전이야)

너는 책상에 앉아 바다 생물 그림책을 보고 있어. 거대한 고래, 신비한 해파리, 알록달록한 물고기들!

"언젠가 저 넓은 바다에 가보고 싶어!" 너는 창밖을 바라보며 꿈을 꿔.

바다는 정말 신비로워!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '책을 더 읽는다', to: 'read_more', cls: 'bg-blue-200' },
        { label: '바닷가로 가본다', to: 'go_beach', cls: 'bg-green-200' }
      ],
      prompt: '💭 책으로 배우는 게 좋아? 아니면 직접 가보고 싶어?'
    },
    {
      id: 'read_more',
      title: '책 속의 바다',
      text: `너는 책을 한 장씩 넘겼어.

"심해에는 빛을 내는 물고기가 산대!" "거대한 문어도 있어!" 

책에는 신기한 이야기가 가득해. 하지만 그림만 봐서는 잘 모르겠어.

"진짜 바다는 어떨까?" 호기심이 생겨!

직접 보고 싶어!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '상상하며 그림을 그린다', to: 'draw_ocean', cls: 'bg-purple-200' },
        { label: '바닷가에 가고 싶다', to: 'decide_beach', cls: 'bg-blue-200' }
      ],
      prompt: '💭 상상만으로도 즐거워?'
    },
    {
      id: 'go_beach',
      title: '첫 바다',
      text: `너는 짠한 바닷바람을 맞으며 해변에 섰어!

철썩철썩! 파도가 밀려왔다 물러가. 모래가 발가락 사이로 들어와.

"우와, 진짜 바다다!" 가슴이 두근두근!

멀리 수평선이 보여. 바다는 책에서 본 것보다 훨씬 넓고 아름다워!

이제 뭘 해볼까?`,
      bg: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '조개껍데기를 찾는다', to: 'find_shells', cls: 'bg-yellow-200' },
        { label: '파도를 관찰한다', to: 'watch_waves', cls: 'bg-blue-200' }
      ],
      prompt: '💭 바다에 가면 제일 먼저 뭘 하고 싶어?'
    },
    {
      id: 'draw_ocean',
      title: '상상의 바다',
      text: `너는 색연필을 꺼내 상상 속 바다를 그렸어.

파란 물결, 금빛 물고기, 신비한 해초... 네가 만든 바다 세계야!

"내가 그린 바다도 멋지지?" 뿌듯해!

하지만 진짜 바다는 어떨까? 그림과 같을까, 다를까?

점점 더 궁금해져!`,
      bg: 'https://images.unsplash.com/photo-1577985043696-0d00b4ba3d79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 그림을 그린다', to: 'keep_drawing', cls: 'bg-purple-200' },
        { label: '진짜 바다를 보러 간다', to: 'decide_beach', cls: 'bg-green-200' }
      ],
      prompt: '💭 상상과 현실 중 뭐가 더 궁금해?'
    },
    {
      id: 'decide_beach',
      title: '바다로 가는 길',
      text: `"이제 진짜 바다를 볼 거야!"

너는 결심하고 집을 나섰어. 모자를 쓰고, 가방을 메고!

바닷가까지 걸어가는 길. 바람이 시원하게 불어와.

멀리서 갈매기 소리가 들려. "까악까악!"

바다가 가까워지고 있어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '빨리 달려간다', to: 'run_to_beach', cls: 'bg-red-200' },
        { label: '천천히 걸으며 기대한다', to: 'walk_slowly', cls: 'bg-blue-200' }
      ],
      prompt: '💭 기다려온 순간이 다가오면 어떤 기분이야?'
    },
    {
      id: 'find_shells',
      title: '조개껍데기 탐험',
      text: `너는 모래사장을 걸으며 조개껍데기를 찾았어.

하나, 둘, 셋... 예쁜 조개들이 햇빛에 반짝여! 각각 다른 모양과 색깔이야.

"이 조개 안에는 어떤 생물이 살았을까?" 궁금해져.

주머니에 가장 예쁜 조개를 넣었어. 바다의 보물이야!

더 많은 걸 발견하고 싶어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '바위 사이를 탐험한다', to: 'explore_rocks', cls: 'bg-gray-200' },
        { label: '물웅덩이를 본다', to: 'tide_pool', cls: 'bg-blue-200' }
      ],
      prompt: '💭 작은 것 속에도 신비함이 있어?'
    },
    {
      id: 'watch_waves',
      title: '파도의 리듬',
      text: `너는 파도를 자세히 관찰했어.

철썩! 밀려오는 파도. 스르륵... 물러가는 파도.

규칙적인 리듬이 있어! 마치 바다가 숨을 쉬는 것 같아.

하얀 물거품이 반짝이며 사라져. "바다는 살아있어!"

계속 보고 싶어!`,
      bg: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '물에 발을 담근다', to: 'touch_water', cls: 'bg-blue-200' },
        { label: '모래사장을 산책한다', to: 'beach_walk', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 자연의 리듬을 느껴본 적 있어?'
    },
    {
      id: 'keep_drawing',
      title: '바다 화가',
      text: `너는 계속 그림을 그렸어. 한 장, 두 장, 세 장...

스케치북이 바다 그림으로 가득 찼어! 네가 만든 바다 도감이야.

"나중에 이 그림들을 모아서 책을 만들어도 좋겠어!"

하지만 마음 한구석에서 진짜 바다가 보고 싶어져.

상상도 좋지만, 진짜는 어떨까?`,
      bg: 'https://images.unsplash.com/photo-1577985043696-0d00b4ba3d79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '그림에 집중한다', to: 'artist_path', cls: 'bg-purple-200' },
        { label: '바다를 보러 간다', to: 'run_to_beach', cls: 'bg-green-200' }
      ],
      prompt: '💭 예술과 과학 중 뭐가 더 끌려?'
    },
    {
      id: 'run_to_beach',
      title: '바다와의 만남',
      text: `너는 달렸어! 신발이 모래에 파묻히지만 상관없어!

드디어 파도가 가까이 보여. 철썩철썩!

"와! 진짜 바다다!" 너는 손을 번쩍 들었어.

짠한 바닷바람이 얼굴을 스쳐가. 갈매기들이 하늘을 날아다녀.

책에서 본 것보다 훨씬 멋져!`,
      bg: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '물가로 뛰어간다', to: 'touch_water', cls: 'bg-blue-200' },
        { label: '조용히 바라본다', to: 'gaze_ocean', cls: 'bg-purple-200' }
      ],
      prompt: '💭 꿈꿔온 순간이 이루어지면 어때?'
    },
    {
      id: 'walk_slowly',
      title: '기대와 설렘',
      text: `너는 천천히 걸었어. 한 걸음, 한 걸음...

바다 냄새가 점점 진해져. 파도 소리가 점점 커져!

"조금만 더 가면 바다야!" 가슴이 뛰어.

기다림도 즐거워. 설렘이 커져가!

드디어 바다가 눈앞에 펼쳐졌어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '파도를 본다', to: 'watch_waves', cls: 'bg-blue-200' },
        { label: '해변을 탐험한다', to: 'explore_rocks', cls: 'bg-gray-200' }
      ],
      prompt: '💭 기다리는 시간도 즐거워?'
    },
    {
      id: 'explore_rocks',
      title: '바위 탐험',
      text: `바위 사이사이를 조심스럽게 걸었어.

미끄러운 바위, 날카로운 조개... 조심해야 해!

그런데 바위 틈에 작은 게가 보여! 옆으로 총총총!

"안녕, 작은 친구!" 너는 미소 지었어.

바다에는 숨은 생물들이 많아!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 많은 생물을 찾는다', to: 'find_creatures', cls: 'bg-green-200' },
        { label: '물웅덩이를 본다', to: 'tide_pool', cls: 'bg-blue-200' }
      ],
      prompt: '💭 작은 생명도 신기해?'
    },
    {
      id: 'tide_pool',
      title: '작은 바다',
      text: `물웅덩이를 들여다봤어!

작은 물고기, 말미잘, 불가사리... 작은 바다 세계야!

"우와! 여기에도 이렇게 많은 생물이!" 감탄이 절로 나와.

햇빛이 물에 반사되어 반짝반짝! 아름다워!

이 작은 웅덩이 속에도 완전한 생태계가 있어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '자세히 관찰한다', to: 'observe_pool', cls: 'bg-blue-200' },
        { label: '노트에 기록한다', to: 'take_notes', cls: 'bg-purple-200' }
      ],
      prompt: '💭 작은 세계 속에도 많은 게 있어?'
    },
    {
      id: 'touch_water',
      title: '바닷물의 감촉',
      text: `너는 조심스럽게 발을 물에 담갔어.

차가운 바닷물! 파도가 발을 간질여. 기분이 이상해!

"짜! 바닷물은 정말 짜네!" 손으로 맛을 봤어.

물결이 너를 밀었다 당겼다. 바다와 하나가 된 기분이야!

점점 더 깊이 들어가고 싶어!`,
      bg: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 깊이 들어간다', to: 'wade_deeper', cls: 'bg-blue-200' },
        { label: '물속을 관찰한다', to: 'observe_underwater', cls: 'bg-green-200' }
      ],
      prompt: '💭 새로운 경험이 설레?'
    },
    {
      id: 'beach_walk',
      title: '해변 산책',
      text: `모래사장을 따라 천천히 걸었어.

발자국이 모래에 찍히고, 파도가 와서 지워가. 자연의 순환이야!

조개껍데기, 해초, 예쁜 돌멩이... 걸을 때마다 새로운 걸 발견해.

"바다는 끝이 없어!" 수평선을 바라봤어.

이 넓은 세상을 탐험하고 싶어!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 걷는다', to: 'walk_far', cls: 'bg-green-200' },
        { label: '앉아서 생각한다', to: 'sit_think', cls: 'bg-purple-200' }
      ],
      prompt: '💭 걸으면서 생각하는 거 좋아?'
    },
    {
      id: 'artist_path',
      title: '예술가의 길',
      text: `"나는 바다 화가가 될 거야!"

너는 결심했어. 상상 속 바다를 그림으로 표현하는 거야!

색연필, 물감, 크레파스... 모든 도구로 바다를 그렸어.

사람들이 네 그림을 보고 감탄해. "정말 아름다워!"

하지만 가끔은 진짜 바다가 궁금해져.`,
      bg: 'https://images.unsplash.com/photo-1577985043696-0d00b4ba3d79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '예술에 전념한다', to: 'pure_artist', cls: 'bg-purple-200' },
        { label: '진짜도 보고 싶다', to: 'want_both', cls: 'bg-blue-200' }
      ],
      prompt: '💭 상상만으로도 충분할까?'
    },
    {
      id: 'gaze_ocean',
      title: '바다를 바라보며',
      text: `너는 조용히 바다를 바라봤어.

파도, 하늘, 구름... 모든 게 움직이고 있어.

"바다는 살아있어. 숨을 쉬고 있어!" 깨달았어.

멀리 배 한 척이 지나가. "저 배는 어디로 가는 걸까?"

바다 너머의 세상이 궁금해져!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '바다에 대해 더 알고 싶다', to: 'want_learn', cls: 'bg-blue-200' },
        { label: '배를 타보고 싶다', to: 'dream_voyage', cls: 'bg-green-200' }
      ],
      prompt: '💭 미지의 세계가 궁금해?'
    },
    {
      id: 'find_creatures',
      title: '생명의 발견',
      text: `너는 더 많은 생물을 찾았어!

작은 물고기, 소라, 해파리...  각각 다른 모습이야.

"모두 바다에서 살아가는구나!" 신기해!

조심스럽게 관찰했어. 생명은 소중하니까.

"나중에 바다 생물학자가 되고 싶어!" 꿈이 생겼어.`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '노트에 기록한다', to: 'take_notes', cls: 'bg-purple-200' },
        { label: '계속 탐험한다', to: 'continue_explore', cls: 'bg-green-200' }
      ],
      prompt: '💭 생물을 관찰하는 게 재미있어?'
    },
    {
      id: 'observe_pool',
      title: '관찰의 즐거움',
      text: `너는 물웅덩이를 아주 자세히 봤어.

작은 물고기는 어떻게 먹이를 먹을까? 말미잘은 왜 흔들릴까?

"하나하나 다 이유가 있겠지!" 궁금증이 생겨.

햇빛이 물속으로 들어가 아름다운 무늬를 만들어.

관찰은 새로운 발견의 시작이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '스케치한다', to: 'sketch_nature', cls: 'bg-purple-200' },
        { label: '과학자처럼 기록한다', to: 'take_notes', cls: 'bg-blue-200' }
      ],
      prompt: '💭 자세히 보면 더 많은 게 보여?'
    },
    {
      id: 'take_notes',
      title: '과학자의 시작',
      text: `너는 작은 노트를 꺼냈어.

"게: 옆으로 걷기, 집게발 2개" "물고기: 지느러미로 헤엄"

관찰한 모든 걸 적었어. 진짜 과학자처럼!

그림도 그리고, 색깔도 표시하고... 완벽한 관찰 일기!

"이 노트를 모으면 나만의 바다 백과사전이 될 거야!"`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 기록한다', to: 'scientist_path', cls: 'bg-blue-200' },
        { label: '더 탐험하러 간다', to: 'continue_explore', cls: 'bg-green-200' }
      ],
      prompt: '💭 기록하는 습관이 중요해?'
    },
    {
      id: 'wade_deeper',
      title: '깊은 물로',
      text: `너는 조금 더 깊이 들어갔어! 무릎까지 물이 차올라.

파도가 세게 밀려와 몸이 흔들려. "우와!"

물속에 작은 물고기들이 헤엄쳐! 은빛 비늘이 반짝여.

"물고기들과 함께 헤엄치고 있어!" 신나!

더 깊은 바다는 어떨까? 궁금해!`,
      bg: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '수영을 배우고 싶다', to: 'want_swim', cls: 'bg-blue-200' },
        { label: '물속 세계를 상상한다', to: 'imagine_deep', cls: 'bg-purple-200' }
      ],
      prompt: '💭 물속 세계가 궁금해?'
    },
    {
      id: 'observe_underwater',
      title: '수중 관찰',
      text: `너는 물속을 들여다봤어.

해초가 물결에 흔들려. 작은 생물들이 숨어 있어!

"물속은 다른 세계야!" 경이로워.

햇빛이 물을 통과하며 신비한 빛을 만들어. 반짝반짝!

"언젠가 깊은 바다를 탐험하고 싶어!"`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '잠수를 배우고 싶다', to: 'want_dive', cls: 'bg-blue-200' },
        { label: '바다 공부를 하고 싶다', to: 'want_learn', cls: 'bg-purple-200' }
      ],
      prompt: '💭 보이지 않는 세계가 궁금해?'
    },
    {
      id: 'walk_far',
      title: '해변의 끝',
      text: `너는 계속 걸었어. 한참을 걸었어!

사람이 없는 조용한 곳. 자연 그대로의 해변이야.

"여기는 아무도 없어!" 혼자만의 바다야.

갈매기가 날아다니고, 파도가 노래해. 평화로워!

이런 곳에서 바다를 연구하면 좋겠어.`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이곳을 탐험한다', to: 'continue_explore', cls: 'bg-green-200' },
        { label: '연구자가 되고 싶다', to: 'want_research', cls: 'bg-blue-200' }
      ],
      prompt: '💭 조용한 곳에서 생각하는 게 좋아?'
    },
    {
      id: 'sit_think',
      title: '생각의 시간',
      text: `너는 모래 위에 앉아 생각에 잠겼어.

"바다는 정말 넓어. 그 속에는 얼마나 많은 생물이 살까?"

"심해에는 빛도 없다는데... 거기에도 생명이 있을까?"

질문이 꼬리를 물어. 알고 싶은 게 너무 많아!

"바다를 제대로 공부하고 싶어!" 결심했어.`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '바다를 연구하기로 한다', to: 'want_research', cls: 'bg-blue-200' },
        { label: '탐험가가 되고 싶다', to: 'dream_voyage', cls: 'bg-green-200' }
      ],
      prompt: '💭 깊이 생각하는 게 좋아?'
    },
    {
      id: 'pure_artist',
      title: '바다 예술가',
      text: `너는 예술가로 살기로 했어!

매일 바다를 그려. 상상 속 바다는 무한해!

사람들이 네 그림을 사랑해. "마치 진짜 바다 같아요!"

하지만 가끔 창밖을 보며 생각해. "진짜 바다는 어떨까?"

예술과 과학, 둘 다 좋은데...`,
      bg: 'https://images.unsplash.com/photo-1577985043696-0d00b4ba3d79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '예술에만 집중한다', to: 'art_only', cls: 'bg-purple-200' },
        { label: '과학도 궁금하다', to: 'want_both', cls: 'bg-blue-200' }
      ],
      prompt: '💭 한 가지에만 집중하는 게 좋아?'
    },
    {
      id: 'want_both',
      title: '두 가지 길',
      text: `"예술도 좋고, 과학도 좋아! 둘 다 할 수는 없을까?"

너는 고민했어. 그런데 좋은 생각이 떠올랐어!

"과학자가 되어 바다를 연구하고, 그걸 그림으로 기록하면 돼!"

바다 생물을 스케치하고, 관찰 일기를 쓰는 거야!

"예술과 과학을 함께!" 완벽한 계획이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '바다 연구자가 된다', to: 'want_research', cls: 'bg-blue-200' },
        { label: '탐험가가 된다', to: 'dream_voyage', cls: 'bg-green-200' }
      ],
      prompt: '💭 여러 가지를 함께 하는 게 좋아?'
    },
    {
      id: 'want_learn',
      title: '배움의 시작',
      text: `"바다에 대해 제대로 배우고 싶어!"

너는 도서관에 가서 바다 책을 찾았어. 두꺼운 책들!

해양 생물학, 해류, 지질학... 배울 게 정말 많아!

선생님께 질문도 하고, 친구들과 이야기도 나눴어.

"공부하면 할수록 더 궁금해져!" 학습의 즐거움이야!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '열심히 공부한다', to: 'study_hard', cls: 'bg-blue-200' },
        { label: '수족관에 가본다', to: 'visit_aquarium', cls: 'bg-green-200' }
      ],
      prompt: '💭 배우는 게 즐거워?'
    },
    {
      id: 'dream_voyage',
      title: '항해의 꿈',
      text: `"언젠가 저 큰 배를 타고 먼 바다로 갈 거야!"

너는 항구에 정박한 배들을 바라봤어. 거대한 돛대!

선원들이 바쁘게 움직여. 그들은 바다를 잘 알겠지?

"나도 선원이 되어 세계를 여행하고 싶어!"

항해는 진짜 모험이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '선원에게 배운다', to: 'learn_sailing', cls: 'bg-blue-200' },
        { label: '먼저 공부한다', to: 'study_hard', cls: 'bg-green-200' }
      ],
      prompt: '💭 모험을 떠나고 싶어?'
    },
    {
      id: 'continue_explore',
      title: '끝없는 탐험',
      text: `너는 계속 탐험했어!

바위, 모래, 물웅덩이... 매 순간 새로운 발견!

"바다는 끝이 없어! 탐험할 게 너무 많아!"

조개도 모으고, 생물도 관찰하고, 파도도 느껴봤어.

이 경험들이 모여 지식이 돼!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '경험을 기록한다', to: 'scientist_path', cls: 'bg-purple-200' },
        { label: '더 배우고 싶다', to: 'want_research', cls: 'bg-blue-200' }
      ],
      prompt: '💭 직접 경험하는 게 최고의 배움이야?'
    },
    {
      id: 'scientist_path',
      title: '어린 과학자',
      text: `너는 노트를 가득 채웠어!

관찰 일기, 스케치, 발견한 것들... 모두 기록했어.

"이게 바로 과학자가 하는 일이구나!" 뿌듯해!

선생님이 네 노트를 보고 감탄하셨어. "훌륭한 관찰력이야!"

"저는 바다 생물학자가 되고 싶어요!" 꿈을 말했어.`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '제대로 배우러 간다', to: 'want_research', cls: 'bg-blue-200' },
        { label: '실전 경험을 쌓는다', to: 'learn_sailing', cls: 'bg-green-200' }
      ],
      prompt: '💭 과학자가 되고 싶어?'
    },
    {
      id: 'sketch_nature',
      title: '자연 스케치',
      text: `너는 연필을 꺼내 물웅덩이를 그렸어.

움직이는 물고기, 흔들리는 해초... 생생하게 그려!

"과학과 예술을 함께!" 완벽한 조합이야!

옛날 위대한 과학자들도 이렇게 그림으로 기록했대.

"나도 그들처럼 될 거야!" 결심했어.`,
      bg: 'https://images.unsplash.com/photo-1577985043696-0d00b4ba3d79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '과학 그림을 계속 그린다', to: 'scientific_art', cls: 'bg-purple-200' },
        { label: '본격적으로 연구한다', to: 'want_research', cls: 'bg-blue-200' }
      ],
      prompt: '💭 과학과 예술을 함께 하면 좋아?'
    },
    {
      id: 'want_swim',
      title: '수영의 꿈',
      text: `"수영을 배우면 바다를 더 잘 탐험할 수 있겠어!"

너는 팔을 휘저으며 연습했어. 첨벙첨벙!

물에 떠보려고 노력했어. 처음엔 어렵지만 조금씩 익숙해져!

"물고기처럼 자유롭게 헤엄치고 싶어!"

연습하면 할 수 있어!`,
      bg: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '수영을 열심히 배운다', to: 'learn_swimming', cls: 'bg-blue-200' },
        { label: '잠수도 배우고 싶다', to: 'want_dive', cls: 'bg-purple-200' }
      ],
      prompt: '💭 새로운 기술을 배우는 게 좋아?'
    },
    {
      id: 'imagine_deep',
      title: '심해의 상상',
      text: `너는 눈을 감고 상상했어.

깊고 깊은 바다 밑... 빛도 없는 어둠 속...

"거기엔 어떤 생물이 살까?" "거대한 생물도 있을까?"

신비로운 심해! 누구도 다 보지 못한 세계!

"언젠가 꼭 가보고 싶어!" 꿈이 커져!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '심해를 공부한다', to: 'study_deep_sea', cls: 'bg-purple-200' },
        { label: '잠수를 배운다', to: 'want_dive', cls: 'bg-blue-200' }
      ],
      prompt: '💭 미지의 세계를 상상하는 게 좋아?'
    },
    {
      id: 'want_dive',
      title: '잠수의 꿈',
      text: `"잠수를 배우면 물속을 직접 볼 수 있겠어!"

너는 잠수에 대한 책을 읽었어. 신기한 장비들!

물속에서 숨을 쉴 수 있는 도구, 물안경...

"언젠가 잠수 장비를 입고 깊은 바다를 탐험할 거야!"

준비가 필요해!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '잠수를 배우러 간다', to: 'learn_diving', cls: 'bg-blue-200' },
        { label: '먼저 공부한다', to: 'want_research', cls: 'bg-green-200' }
      ],
      prompt: '💭 도전하고 싶은 게 있어?'
    },
    {
      id: 'want_research',
      title: '연구자의 길',
      text: `"나는 바다 연구자가 될 거야!"

너는 진지하게 결심했어. 바다의 모든 비밀을 알고 싶어!

과학 책도 읽고, 실험도 하고, 관찰도 하고...

선생님이 말씀하셨어. "훌륭한 꿈이구나! 열심히 공부해야 해."

"네! 최고의 해양 물학자가 될 거예요!"`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '공부를 시작한다', to: 'study_hard', cls: 'bg-blue-200' },
        { label: '수족관에 가본다', to: 'visit_aquarium', cls: 'bg-green-200' }
      ],
      prompt: '💭 꿈을 이루려면 어떻게 해야 할까?'
    },
    {
      id: 'study_hard',
      title: '열심히 배우기',
      text: `너는 바다에 대해 열심히 공부했어!

해양 생물의 종류, 바다의 깊이, 해류의 흐름...

어려운 내용도 있지만 재미있어! 알수록 더 궁금해져.

"공부는 새로운 세계를 여는 열쇠야!" 깨달았어.

점점 더 많이 알아가!`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '수족관에서 실제로 본다', to: 'visit_aquarium', cls: 'bg-green-200' },
        { label: '항해를 배운다', to: 'learn_sailing', cls: 'bg-blue-200' }
      ],
      prompt: '💭 이론과 실천 중 뭐가 먼저야?'
    },
    {
      id: 'visit_aquarium',
      title: '수족관 방문',
      text: `수족관에 도착했어! 거대한 수조가 보여!

유리 너머로 수백 마리의 물고기가 헤엄쳐. 우와!

"책에서 본 그 물고기다!" "저건 처음 보는데!"

각 수조마다 다른 바다 환경! 산호초, 심해, 극지방...

"진짜 바다처럼 아름다워!" 감동이야!`,
      bg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '자세히 관찰한다', to: 'observe_aquarium', cls: 'bg-blue-200' },
        { label: '직원에게 질문한다', to: 'ask_expert', cls: 'bg-green-200' }
      ],
      prompt: '💭 진짜를 보니 어때?'
    },
    {
      id: 'learn_sailing',
      title: '항해 배우기',
      text: `항구에서 늙은 선장님을 만났어!

"어린 친구, 바다에 관심이 있구나?" "네! 가르쳐주세요!"

선장님은 밧줄 묶는 법, 돟 다루는 법을 알려주셨어.

"바다는 아름답지만 위험하기도 해. 존중해야 하지."

선장님의 이야기를 열심히 들었어. 롤모델이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 배운다', to: 'sailor_training', cls: 'bg-blue-200' },
        { label: '작은 배를 타본다', to: 'first_boat', cls: 'bg-green-200' }
      ],
      prompt: '💭 선배에게 배우는 게 중요해?'
    },
    {
      id: 'art_only',
      title: '순수 예술',
      text: `너는 예술만 하기로 했어!

매일 그림을 그려. 상상 속 바다는 무한대야!

전시회도 열고, 상도 받았어. 사람들이 좋아해!

하지만 가끔 생각해. "진짜 바다도 보고 싶어..."

예술과 과학, 완전히 나눌 수 있을까?`,
      bg: 'https://images.unsplash.com/photo-1577985043696-0d00b4ba3d79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '예술에만 집중한다', to: 'ending', cls: 'bg-purple-200' },
        { label: '진짜도 보러 간다', to: 'visit_aquarium', cls: 'bg-blue-200' }
      ],
      prompt: '💭 한 가지만 하는 게 맞을까?'
    },
    {
      id: 'scientific_art',
      title: '과학 일러스트',
      text: `"과학 일러스트레이터가 되면 돼!"

너는 생물을 정확하고 아름답게 그리는 법을 배웠어!

과학자들이 네 그림을 책에 실어. "완벽한 그림이야!"

예술과 과학의 완벽한 조화! 둘 다 할 수 있어!

"이제 진짜 탐험을 떠나고 싶어!" 준비가 됐어!`,
      bg: 'https://images.unsplash.com/photo-1577985043696-0d00b4ba3d79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '탐험을 준비한다', to: 'prepare_voyage', cls: 'bg-green-200' },
        { label: '먼저 공부를 더 한다', to: 'visit_aquarium', cls: 'bg-blue-200' }
      ],
      prompt: '💭 두 가지를 함께 하니 어때?'
    },
    {
      id: 'learn_swimming',
      title: '수영 연습',
      text: `너는 매일 수영을 연습했어!

처음엔 물이 무서웠지만, 이제 자신감이 생겼어!

개헤엄, 자유형, 잠수... 하나씩 배워가!

"이제 물고기처럼 헤엄칠 수 있어!" 자랑스러워!

바다를 탐험할 준비가 되어가!`,
      bg: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '바다로 나간다', to: 'first_boat', cls: 'bg-green-200' },
        { label: '잠수도 배운다', to: 'learn_diving', cls: 'bg-blue-200' }
      ],
      prompt: '💭 연습하면 뭐든 할 수 있어?'
    },
    {
      id: 'study_deep_sea',
      title: '심해 공부',
      text: `너는 심해에 대한 책을 읽었어!

빛이 없는 깊은 바다... 거대한 압력... 신비한 생물들!

"심해는 지구에서 가장 미지의 세계야!" 놀라워!

발광 물고기, 거대한 오징어, 이상한 모양의 생물들...

"언젠가 꼭 심해를 탐험할 거야!" 꿈이 커져!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 공부한다', to: 'visit_aquarium', cls: 'bg-blue-200' },
        { label: '잠수를 배운다', to: 'learn_diving', cls: 'bg-green-200' }
      ],
      prompt: '💭 미지의 세계를 탐험하고 싶어?'
    },
    {
      id: 'learn_diving',
      title: '잠수 훈련',
      text: `잠수 선생님이 장비를 가르쳐주셨어!

산소통, 물안경, 오리발... 하나하나 배워!

"물속에서도 숨을 쉴 수 있어!" 신기해!

연못에서 연습했어. 천천히, 조심스럽게...

"이제 바다 속으로 갈 수 있어!" 설레!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '첫 잠수를 한다', to: 'first_dive', cls: 'bg-blue-200' },
        { label: '더 연습한다', to: 'practice_more', cls: 'bg-green-200' }
      ],
      prompt: '💭 새로운 도전이 두려워?'
    },
    {
      id: 'observe_aquarium',
      title: '깊은 관찰',
      text: `너는 수족관의 물고기를 아주 자세히 봤어.

어떻게 헤엄치는지, 어떻게 먹이를 먹는지...

노트에 스케치하고, 특징을 적었어!

직원분이 다가오셨어. "관찰력이 뛰어나구나! 나중에 연구자가 되겠어?"

"네! 해양 생물학자가 꿈이에요!" 자신 있게 말했어!`,
      bg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '직원에게 더 배운다', to: 'ask_expert', cls: 'bg-blue-200' },
        { label: '진짜 바다로 간다', to: 'prepare_voyage', cls: 'bg-green-200' }
      ],
      prompt: '💭 전문가에게 배우고 싶어?'
    },
    {
      id: 'ask_expert',
      title: '전문가의 조언',
      text: `수족관 연구원님이 많은 걸 가르쳐주셨어!

"바다 연구는 평생 공부야. 하지만 정말 보람 있지!"

"책도 읽고, 직접 관찰도 하고, 실험도 해야 해."

"그리고 무엇보다 바다를 사랑해야 해!" 선생님이 미소 지으셨어.

"열심히 할게요!" 너는 결심했어!`,
      bg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '공부를 더 한다', to: 'study_hard', cls: 'bg-blue-200' },
        { label: '실전 경험을 쌓는다', to: 'prepare_voyage', cls: 'bg-green-200' }
      ],
      prompt: '💭 조언을 잘 듣는 편이야?'
    },
    {
      id: 'sailor_training',
      title: '선원 수업',
      text: `선장님은 매일 새로운 걸 가르쳐주셨어!

파도 읽는 법, 날씨 예측하는 법, 항해술...

"바다는 살아있어. 말을 들어야 하지." 선장님의 말씀!

손에 굳은살이 박이고, 피부가 그을렸어.

"진짜 선원이 되어가고 있어!" 자랑스러워!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '배를 타본다', to: 'first_boat', cls: 'bg-green-200' },
        { label: '계속 훈련한다', to: 'practice_more', cls: 'bg-blue-200' }
      ],
      prompt: '💭 열심히 배우는 게 보람 있어?'
    },
    {
      id: 'first_boat',
      title: '첫 항해',
      text: `드디어 작은 배에 올랐어!

선장님과 함께 해안을 따라 항해했어. 파도가 철썩철썩!

돛에 바람이 가득 차. 배가 앞으로 나아가!

"이거야! 이게 바로 항해야!" 너무 신나!

바다 위는 자유로워! 바람과 파도와 하나가 된 기분!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 먼 바다로 간다', to: 'venture_out', cls: 'bg-blue-200' },
        { label: '바다를 관찰한다', to: 'observe_from_boat', cls: 'bg-green-200' }
      ],
      prompt: '💭 첫 항해 어때?'
    },
    {
      id: 'prepare_voyage',
      title: '탐험 준비',
      text: `"이제 진짜 탐험을 떠날 시간이야!"

너는 준비를 시작했어. 필요한 장비, 지식, 체력...

지도를 보고, 계획을 세우고, 공부를 했어!

친구들과 가족들에게 꿈을 이야기했어. 모두 응원해줘!

"준비된 탐험가가 될 거야!" 자신감이 생겼어!`,
      bg: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '철저히 준비한다', to: 'thorough_prep', cls: 'bg-blue-200' },
        { label: '일단 시작한다', to: 'first_boat', cls: 'bg-red-200' }
      ],
      prompt: '💭 준비가 중요해?'
    },
    {
      id: 'first_dive',
      title: '첫 잠수',
      text: `장비를 입고 물속으로 들어갔어!

처음엔 무서웠지만... 와! 물속은 다른 세계야!

물고기들이 네 옆을 지나가! 해초가 흔들려!

"이게 바로 수중 세계구나!" 경이로워!

숨소리만 들려. 고요하고 평화로워!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 깊이 간다', to: 'deeper_dive', cls: 'bg-blue-200' },
        { label: '주변을 관찰한다', to: 'underwater_observe', cls: 'bg-green-200' }
      ],
      prompt: '💭 물속 세계 어때?'
    },
    {
      id: 'practice_more',
      title: '더 많은 연습',
      text: `너는 계속 연습했어!

항해도 연습하고, 잠수도 연습하고, 공부도 했어!

"연습하면 할수록 자신감이 생겨!" 뿌듯해!

선장님이 말씀하셨어. "이제 준비가 됐구나!"

"네! 이제 진짜 탐험을 떠날 수 있어요!" 자신 있게 대답했어!`,
      bg: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '탐험을 떠난다', to: 'venture_out', cls: 'bg-green-200' },
        { label: '조금 더 준비한다', to: 'thorough_prep', cls: 'bg-blue-200' }
      ],
      prompt: '💭 충분히 준비됐어?'
    },
    {
      id: 'thorough_prep',
      title: '완벽한 준비',
      text: `너는 철저하게 준비했어!

장비를 점검하고, 지식을 복습하고, 체력도 길렀어!

"모든 게 완벽해!" 확인하고 또 확인했어.

선생님들과 선장님도 인정하셨어. "훌륭한 준비야!"

"이제 떠날 준비가 완벽하게 됐어!" 설레!`,
      bg: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '드디어 출발한다', to: 'venture_out', cls: 'bg-green-200' }
      ],
      prompt: '💭 완벽하게 준비하니 어때?'
    },
    {
      id: 'venture_out',
      title: '미지의 바다로',
      text: `배가 항구를 떠나  바다로 나아가!

뒤를 돌아보니 해안선이 점점 작아져. 앞은 끝없는 바다!

"이제 진짜 모험이야!" 가슴이 두근두근!

파도를 헤치고, 바람을 타고, 앞으로 앞으로!

미지의 세계가 너를 기다려!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '바다를 관찰한다', to: 'observe_from_boat', cls: 'bg-blue-200' },
        { label: '더 먼 곳으로 간다', to: 'final_journey', cls: 'bg-purple-200' }
      ],
      prompt: '💭 미지의 세계로 떠나는 기분이 어때?'
    },
    {
      id: 'observe_from_boat',
      title: '바다 관찰',
      text: `배 위에서 바다를 관찰했어!

멀리 돌고래 떼가 뛰어올라! 갈매기가 날아다녀!

"바다는 생명으로 가득해!" 감동이야!

노트에 모든 걸 기록했어. 관찰 일기!

이 순간이 정말 소중해!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 관찰한다', to: 'final_journey', cls: 'bg-blue-200' },
        { label: '더 탐험한다', to: 'final_journey', cls: 'bg-green-200' }
      ],
      prompt: '💭 관찰이 즐거워?'
    },
    {
      id: 'deeper_dive',
      title: '깊은 잠수',
      text: `더 깊이 잠수했어!

빛이 점점 줄어들어. 하지만 무섭지 않아!

신기한 생물들이 보여! 처음 보는 물고기들!

"물속에는 또 다른 세계가 있어!" 놀라워!

이 경험은 평생 잊지 못할 거야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '기록한다', to: 'underwater_observe', cls: 'bg-purple-200' },
        { label: '탐험을 계속한다', to: 'final_journey', cls: 'bg-green-200' }
      ],
      prompt: '💭 깊은 곳이 궁금해?'
    },
    {
      id: 'underwater_observe',
      title: '수중 관찰',
      text: `물속에서 생물들을 관찰했어!

각자 다른 모습, 다른 생활 방식!

"모두 바다에 적응해서 살아가는구나!" 배워!

방수 노트에 스케치도 했어!

수중 생태계의 아름다움에 감동이야!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 탐험한다', to: 'final_journey', cls: 'bg-green-200' }
      ],
      prompt: '💭 수중 세계를 연구하고 싶어?'
    },
    {
      id: 'final_journey',
      title: '탐험의 시작',
      text: `너는 바다를 사랑하는 탐험가가 됐어!

책으로 배우고, 직접 경험하고, 관찰하고 기록했어.

"바다는 끝없는 배움의 공간이야!" 깨달았어.

이제 더 큰 모험이 기다려! 심해의 비밀, 미지의 생물들...

"나의 바다 탐험은 이제 시작이야!"`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '《해저 이만 리》 읽어보기', to: 'ending', cls: 'bg-blue-200' }
      ],
      prompt: '💭 탐험이 계속되길 바라?'
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `이야기는 계속돼!

너는 바다를 사랑하는 탐험가가 되었어.

《해저 이만 리》에는 네모 선장의 잠수함 노틸러스호와 심해 탐험이 기다려!

거대한 대왕오징어, 아틀란티스 유적, 남극 빙산...

📚 책에는 더 신비롭고 스릴 넘치는 바다 모험이 가득해!

💡 서점이나 도서관에서 《해저 이만 리》를 찾아보자!`,
      bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-500' }
      ],
      prompt: '《해저 이만 리》 - 마인크래프트 바다 업데이트처럼 신기한 바닷속 세계 탐험!'
    }
  ];
}
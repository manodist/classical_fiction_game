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
    casual: `${firstName}야`
  };
}

export function generateAroundWorldStory(gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: '1870년, 런던',
      text: `너의 이름은 ${name.full}.\n\n1870년, 영국 런던.\n\n너는 시계 수리점 할아버지와 함께 살아.\n\n"이 시계는 정확히 12시를 가리켜야 한다!"\n\n할아버지는 시간에 아주 엄격하셔.\n\n똑딱똑딱... 가게엔 시계 소리만 가득해.`,
      bg: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '시계를 관찰한다', to: 'watch_clock', cls: 'bg-blue-200' },
        { label: '밖으로 나간다', to: 'go_outside', cls: 'bg-green-200' }
      ],
      prompt: '💭 정확함은 삶에서 어떤 가치를 가질까?'
    },
    {
      id: 'watch_clock',
      title: '시계의 비밀',
      text: `시계를 자세히 봤어.\n\n"할아버지, 왜 시계마다 시간이 조금씩 달라요?"\n\n"좋은 질문이구나! 이건 아주 신기한 비밀이 있단다."\n\n할아버지가 큰 세계지도를 펼쳤어.\n\n"세계에는 여러 나라가 있지. 그리고 나라마다 시간이 다르단다."`,
      bg: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 자세히 듣는다', to: 'learn_time_step1', cls: 'bg-purple-200' },
        { label: '지도를 본다', to: 'check_map', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 세상에는 나와 다른 시간을 사는 사람들이 있다는 게 무엇을 의미할까?'
    },
    {
      id: 'go_outside',
      title: '런던 거리',
      text: `밖으로 나왔어.\n\n런던 거리는 북적북적해.\n\n말이 끄는 마차들이 달려.\n\n"비켜! 비켜!"\n\n사람들이 서두르고 있어.\n\n하지만 할아버지는 천천히 걸으셔.\n\n"서두르지 말고 침착하게, ${name.casual}."`,
      bg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '항구로 간다', to: 'harbor', cls: 'bg-blue-200' },
        { label: '기차역으로 간다', to: 'station', cls: 'bg-red-200' }
      ],
      prompt: '💭 바쁜 삶과 침착한 삶, 어느 것이 진정한 삶일까?'
    },
    {
      id: 'learn_time_step1',
      title: '지구는 빙글빙글',
      text: `할아버지가 지구본을 돌렸어.\n\n"지구는 이렇게 빙글빙글 돌아. 하루에 한 바퀴!"\n\n"그럼 어떻게 되는데요?"\n\n"영국이 낮일 때, 반대편에 있는 나라는 밤이란다."\n\n"어? 그럼 지금 누군가는 자고 있어요?"\n\n"맞아! 지구 반대편에서는 말이야."`,
      bg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 궁금하다', to: 'learn_time_step2', cls: 'bg-blue-200' },
        { label: '밖에 나가본다', to: 'go_street', cls: 'bg-green-200' }
      ],
      prompt: '💭 우리가 낮일 때 다른 곳은 밤... 이 세상은 얼마나 넓을까?'
    },
    {
      id: 'learn_time_step2',
      title: '시차, 천천히 이해하기',
      text: `"그럼 나라마다 시간이 달라요?"\n\n"그렇지! 조금씩 다르단다."\n\n"어... 어떻게 다른데요?"\n\n"동쪽으로 가면 시간이 조금씩 빨라져.\n서쪽으로 가면 조금씩 느려지고."\n\n"어렵다..."\n\n"천천히 배우면 돼. 급하지 않아."`,
      bg: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '좀 더 생각해본다', to: 'learn_time_step3', cls: 'bg-purple-200' },
        { label: '나중에 다시 물어본다', to: 'go_street', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 어려운 것도 천천히 배우면 이해할 수 있을까?'
    },
    {
      id: 'learn_time_step3',
      title: '조금씩 이해되는 시차',
      text: `할아버지가 다시 설명하셨어.\n\n"지구가 이렇게 도니까,\n햇빛을 먼저 받는 곳은\n아침이 먼저 와."\n\n"아! 동쪽이요?"\n\n"맞아! 똑똑하구나!"\n\n"그래서 시간이 다른 거구나!"\n\n조금 이해가 됐어!`,
      bg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 알고 싶다', to: 'learn_around_world', cls: 'bg-blue-200' },
        { label: '밖에 나가본다', to: 'go_street', cls: 'bg-green-200' }
      ],
      prompt: '💭 새로운 것을 이해하면 기분이 좋아?'
    },
    {
      id: 'learn_around_world',
      title: '일주가 뭐예요?',
      text: `"할아버지, 사람들이 '세계일주'라고 하던데, 그게 뭐예요?"\n\n"좋은 질문이야!"\n\n"여행은 이곳저곳 다니는 거고,\n관광은 구경하러 가는 거야.\n\n하지만 일주는..."\n\n"한 바퀴 빙 돌아서\n다시 여기로 돌아오는 거란다!"\n\n"우와! 지구를 한 바퀴요?"`,
      bg: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '가능한지 묻는다', to: 'ask_possible', cls: 'bg-yellow-200' },
        { label: '밖에 나가본다', to: 'go_street', cls: 'bg-green-200' }
      ],
      prompt: '💭 여행과 일주는 어떻게 다를까?'
    },
    {
      id: 'check_map',
      title: '세계지도',
      text: `지도에는 많은 나라가 있어.\n\n영국, 프랑스, 이집트, 인도, 중국, 일본, 미국...\n\n"이 모든 곳을 갈 수 있나요?"\n\n"물론이지! 증기선과 기차가 있으니까."\n\n"하지만 침착하게 계획해야 해.\n서두르면 실수하기 쉽단다."\n\n할아버지가 말씀하셨어.`,
      bg: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '교통수단에 대해 묻는다', to: 'ask_transport', cls: 'bg-green-200' },
        { label: '시차에 대해 묻는다', to: 'learn_time_step1', cls: 'bg-blue-200' }
      ],
      prompt: '💭 지도 위의 선들이 실제 세계를 얼마나 담고 있을까?'
    },
    {
      id: 'ask_possible',
      title: '가능성의 질문',
      text: `"정말 지구를 한 바퀴 돌 수 있어요?"\n\n"이론적으로는 가능하지."\n\n"하지만 준비가 필요해.\n정확한 계획, 침착함, 그리고 용기."\n\n"특히 침착함이 중요하단다.\n서두르거나 당황하면 실패하기 쉬워."\n\n할아버지의 말씀.`,
      bg: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '항구를 보러 간다', to: 'harbor', cls: 'bg-blue-200' },
        { label: '기차역을 보러 간다', to: 'station', cls: 'bg-red-200' }
      ],
      prompt: '💭 침착함은 왜 중요할까?'
    },
    {
      id: 'harbor',
      title: '템스 강 항구',
      text: `항구에 도착했어.\n\n거대한 증기선들이 정박해 있어.\n\n"저 배는 어디로 가나요?"\n\n선원이 대답했어.\n\n"인도로 간다! 수에즈 운하를 통해서!"\n\n검은 연기가 굴뚝에서 나와.`,
      bg: 'https://images.unsplash.com/photo-1578926314433-e2789279f4aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '증기선에 대해 묻는다', to: 'ask_steamship', cls: 'bg-blue-200' },
        { label: '수에즈 운하에 대해 묻는다', to: 'ask_suez', cls: 'bg-purple-200' }
      ],
      prompt: '💭 새로운 기술은 세상을 어떻게 바꿀까?'
    },
    {
      id: 'station',
      title: '킹스 크로스 역',
      text: `기차역에 도착했어.\n\n거대한 증기기관차가 서 있어.\n\n쉬익- 콰앙!\n\n하얀 증기가 뿜어져 나와.\n\n"이 기차는 어디로 가나요?"\n\n"파리까지 간다!"\n\n할아버지가 말씀하셨어.\n\n"정확한 시간에 출발하고 도착하지. 약속을 지키는 거란다."`,
      bg: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '기차를 구경한다', to: 'train_watch', cls: 'bg-red-200' },
        { label: '시간표를 본다', to: 'check_schedule', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 약속을 지키는 것은 왜 중요할까?'
    },
    {
      id: 'ask_suez',
      title: '수에즈 운하',
      text: `"수에즈 운하가 뭐예요?"\n\n선원이 설명했어.\n\n"운하는 육지 사이를 파서 만든 물길이야!\n배가 지나갈 수 있게 말이야."\n\n"수에즈 운하는 작년에 열렸어.\n이제 아프리카를 빙 돌지 않아도 돼."\n\n"인도까지 가는 시간이 반으로 줄었지!"\n\n${name.은는} 놀랐어.`,
      bg: 'https://images.unsplash.com/photo-1541585249251-e415a2282e0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '세계 항로를 알아본다', to: 'ask_routes', cls: 'bg-blue-200' },
        { label: '인도에 대해 묻는다', to: 'ask_india', cls: 'bg-orange-200' }
      ],
      prompt: '💭 인간의 노력으로 자연을 바꾸는 것은 대단한 일일까?'
    },
    {
      id: 'go_street',
      title: '오후의 런던',
      text: `할아버지와 함께 밖으로 나왔어.\n\n"오늘은 특별한 곳에 가보자."\n\n"어디요?"\n\n"신문사란다.\n세계의 소식을 듣는 곳이지.\n\n침착하게, 차근차근 배우는 게 중요해."`,
      bg: 'https://images.unsplash.com/photo-1738873221829-372d891655a5',
      choices: [
        { label: '신문사로 간다', to: 'newspaper', cls: 'bg-yellow-200' },
        { label: '대영박물관으로 간다', to: 'museum', cls: 'bg-purple-200' }
      ],
      prompt: '💭 정보는 세상을 어떻게 바꿀까?'
    },
    {
      id: 'ask_transport',
      title: '교통의 혁명',
      text: `"증기 엔진이 세상을 바꿨단다."\n\n할아버지가 설명하셨어.\n\n"증기선, 증기기관차..."\n\n"이제 사람들은 바람과 날씨에 의존하지 않아."\n\n"우리가 시간을 정할 수 있지!"\n\n"하지만 정확함이 중요해.\n침착하게 계획하고 실행해야 한단다."`,
      bg: 'https://images.unsplash.com/photo-1667149229081-5ce4e7c53673',
      choices: [
        { label: '항구를 보러 간다', to: 'harbor', cls: 'bg-blue-200' },
        { label: '기차역을 보러 간다', to: 'station', cls: 'bg-red-200' }
      ],
      prompt: '💭 인간은 자연을 극복할 수 있을까?'
    },
    {
      id: 'ask_steamship',
      title: '증기선의 힘',
      text: `선원이 설명했어.\n\n"증기 엔진으로 움직여. 석탄을 태워서!"\n\n"옛날엔 바람에 의존했지만,"\n\n"이젠 우리가 바람보다 빠르단다!"\n\n${name.은는} 감탄했어.\n\n할아버지가 말씀하셨어.\n\n"기술의 발전도 중요하지만,\n그걸 침착하게 다루는 사람이 더 중요하단다."`,
      bg: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '항로에 대해 묻는다', to: 'ask_routes', cls: 'bg-green-200' },
        { label: '선실을 구경한다', to: 'ship_cabin', cls: 'bg-purple-200' }
      ],
      prompt: '💭 기술과 사람, 어느 것이 더 중요할까?'
    },
    {
      id: 'ask_routes',
      title: '세계의 항로',
      text: `선원이 지도를 보여줬어.\n\n"런던 → 수에즈 → 봄베이 → 홍콩 → 요코하마"\n\n"그리고 샌프란시스코를 거쳐 뉴욕으로!"\n\n"철도와 배를 이용하면 세계일주가 가능해!"\n\n"하지만 모든 것이 정확히 연결되어야 해.\n하나라도 놓치면 실패하지."`,
      bg: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '시간을 계산해본다', to: 'calculate_time', cls: 'bg-yellow-200' },
        { label: '각 나라에 대해 묻는다', to: 'ask_countries', cls: 'bg-green-200' }
      ],
      prompt: '💭 세계가 연결된다는 것은 무엇을 의미할까?'
    },
    {
      id: 'train_watch',
      title: '철도의 시대',
      text: `기관사가 말했어.\n\n"이 기차는 시속 60킬로미터로 달린다!"\n\n"옛날엔 마차로 며칠 걸렸는데,"\n\n"이젠 몇 시간이면 파리에 도착해!"\n\n세상이 정말 좁아지고 있어.\n\n할아버지가 말씀하셨어.\n\n"빠르다고 좋은 건 아니야.\n침착하게 움직이는 게 더 중요하단다."`,
      bg: 'https://images.unsplash.com/photo-1667149229081-5ce4e7c53673',
      choices: [
        { label: '철도망에 대해 묻는다', to: 'ask_railway', cls: 'bg-green-200' },
        { label: '역 안으로 들어간다', to: 'station_inside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 빠름과 침착함, 무엇이 더 중요할까?'
    },
    {
      id: 'check_schedule',
      title: '정확한 시간표',
      text: `벽에 시간표가 붙어있어.\n\n런던 출발: 오전 9시\n파리 도착: 오후 4시\n\n"모든 기차는 정확히 움직여."\n\n"1분이라도 늦으면 큰일이야."\n\n할아버지의 말이 생각났어.\n\n"정확함, 침착함, 그리고 약속 지키기.\n이것들이 중요하단다."`,
      bg: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '세계 일주를 상상한다', to: 'imagine_schedule', cls: 'bg-purple-200' },
        { label: '역 안을 구경한다', to: 'station_inside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 약속을 지키는 것은 왜 중요할까?'
    },
    {
      id: 'newspaper',
      title: '타임스 신문사',
      text: `신문사에 도착했어.\n\n벽에 세계지도가 있어.\n\n"인도에서 전보가 왔습니다!"\n\n직원이 외쳤어.\n\n"이제 소식이 빠르게 전해집니다!"\n\n할아버지가 말씀하셨어.\n\n"소식은 빨라도, 우리는 침착해야 한단다."`,
      bg: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '전보에 대해 묻는다', to: 'telegraph', cls: 'bg-purple-200' },
        { label: '세계 소식을 듣는다', to: 'world_news', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 빠른 정보 전달은 세상을 더 좋게 만들까?'
    },
    {
      id: 'museum',
      title: '대영박물관',
      text: `박물관에 도착했어.\n\n이집트의 유물,\n인도의 보석,\n중국의 도자기...\n\n"세계가 이렇게 넓구나!"\n\n${name.은는} 감탄했어.\n\n할아버지가 말씀하셨어.\n\n"다양한 문화를 이해하려면\n침착하게, 천천히 배워야 한단다."`,
      bg: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '이집트 전시실로', to: 'egypt_exhibit', cls: 'bg-yellow-200' },
        { label: '인도 전시실로', to: 'india_exhibit', cls: 'bg-orange-200' }
      ],
      prompt: '💭 다른 문화를 이해하는 것은 왜 중요할까?'
    },
    {
      id: 'ship_cabin',
      title: '선실 구경',
      text: `선실 안으로 들어갔어.\n\n침대, 책상, 작은 창문.\n\n"여기서 몇 주를 보내는 거예요?"\n\n"그렇지. 하지만 빠르단다."\n\n"옛날엔 몇 달 걸렸어!"\n\n할아버지가 말씀하셨어.\n\n"좁은 공간에서도 침착함을 잃지 않는 게\n진정한 용기란다."`,
      bg: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '바다 여행을 상상한다', to: 'imagine_voyage', cls: 'bg-blue-200' },
        { label: '다른 곳을 탐험한다', to: 'explore_harbor', cls: 'bg-green-200' }
      ],
      prompt: '💭 불편함을 감수하고서라도 도전할 가치가 있을까?'
    },
    {
      id: 'calculate_time',
      title: '정확한 계산',
      text: `${name.은는} 생각했어.\n\n런던 → 수에즈: 7일\n수에즈 → 봄베이: 13일\n봄베이 → 요코하마: 20일\n요코하마 → 샌프란시스코: 22일\n샌프란시스코 → 뉴욕 → 런던: 15일\n\n"총 77일... 아니 80일이면 가능해!"\n\n할아버지가 말씀하셨어.\n\n"계산도 중요하지만, 침착하게 실행하는 게 더 중요하단다."`,
      bg: 'https://images.unsplash.com/photo-1554224311-beee460c201f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '준비에 대해 생각한다', to: 'think_preparation', cls: 'bg-yellow-200' },
        { label: '더 알아보기로 한다', to: 'learn_more', cls: 'bg-blue-200' }
      ],
      prompt: '💭 불가능해 보이는 목표에 도전하는 것은 어리석은 일일까?'
    },
    {
      id: 'ask_countries',
      title: '세계의 나라들',
      text: `"이집트는 피라미드가 있고,"\n\n"일본은 사무라이가 있고,"\n\n"미국은 넓은 평원이 있단다!"\n\n선원이 신나게 설명했어.\n\n세계는 정말 다양해.\n\n"다양한 문화를 존중하는 마음,\n그게 진정한 용기란다."\n\n할아버지가 말씀하셨어.`,
      bg: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '박물관에서 더 보고 싶다', to: 'museum', cls: 'bg-purple-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 다양성은 세상을 풍요롭게 만들까?'
    },
    {
      id: 'ask_india',
      title: '인도 이야기',
      text: `"인도는 어떤 곳인가요?"\n\n"향료의 나라지. 그리고 코끼리가 있어!"\n\n선원의 눈이 반짝였어.\n\n"타지마할도 있고, 정글도 있단다."\n\n신기한 나라야.\n\n할아버지가 말씀하셨어.\n\n"낯선 것을 두려워하지 말고,\n침착하게 이해하려는 용기가 필요하단다."`,
      bg: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다른 나라에 대해 묻는다', to: 'ask_countries', cls: 'bg-purple-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 낯선 것에 대한 호기심은 편견을 넘어설 수 있을까?'
    },
    {
      id: 'ask_railway',
      title: '철도 네트워크',
      text: `"유럽 전체가 철도로 연결됐어."\n\n기관사가 설명했어.\n\n"인도도, 미국도 철도가 있지."\n\n"이제 세계는 하나의 거대한 네트워크야!"\n\n${name.은는} 놀랐어.\n\n할아버지가 말씀하셨어.\n\n"연결은 좋지만, 정확함과 침착함이 없으면\n연결이 무너진단다."`,
      bg: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '세계일주를 상상한다', to: 'dream_world_tour', cls: 'bg-purple-200' },
        { label: '역 안을 둘러본다', to: 'station_inside', cls: 'bg-blue-200' }
      ],
      prompt: '💭 연결은 우리에게 자유를 줄까, 책임을 줄까?'
    },
    {
      id: 'station_inside',
      title: '역 안의 풍경',
      text: `역 안은 사람들로 가득해.\n\n다양한 언어가 들려.\n\n프랑스어, 독일어, 이탈리아어...\n\n"여기는 세계의 중심이란다."\n\n할아버지가 말씀하셨어.\n\n"하지만 북적이는 곳에서도\n침착함을 유지하는 게 중요하단다."`,
      bg: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사람들을 관찰한다', to: 'observe_people', cls: 'bg-yellow-200' },
        { label: '신문사로 간다', to: 'newspaper', cls: 'bg-green-200' }
      ],
      prompt: '💭 다양한 문화가 만나는 곳에서 우리는 무엇을 배울까?'
    },
    {
      id: 'imagine_schedule',
      title: '완벽한 계획',
      text: `${name.은는} 상상했어.\n\n모든 기차와 배가 정확히 연결되면...\n\n시간을 딱 맞춰서 움직이면...\n\n"세계일주도 가능할 거야!"\n\n눈이 반짝였어.\n\n할아버지가 말씀하셨어.\n\n"계획도 중요하지만,\n침착하게 실행하는 용기가 더 중요하단다."`,
      bg: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '박물관에 가본다', to: 'museum', cls: 'bg-purple-200' },
        { label: '신문사에 가본다', to: 'newspaper', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 완벽한 계획이 성공을 보장할까?'
    },
    {
      id: 'telegraph',
      title: '전신의 기적',
      text: `"전선을 통해 전기 신호를 보내는 거야."\n\n직원이 설명했어.\n\n"모스 부호로 메시지를 전달하지."\n\n띠리리링- 기계가 소리를 냈어.\n\n"지금 인도에서 온 거야!"\n\n할아버지가 말씀하셨어.\n\n"빠른 소식도 좋지만,\n침착하게 판단하는 게 더 중요하단다."`,
      bg: 'https://images.unsplash.com/photo-1461685265823-f8d5d0b08b9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '세계 소식을 더 듣는다', to: 'world_news', cls: 'bg-green-200' },
        { label: '기술의 발전을 생각한다', to: 'think_technology', cls: 'bg-blue-200' }
      ],
      prompt: '💭 거리가 사라지면 세상은 어떻게 변할까?'
    },
    {
      id: 'world_news',
      title: '세계의 소식',
      text: `기자가 말했어.\n\n"인도에서 철도가 확장되고 있습니다!"\n\n"미국에서는 대륙횡단철도가 완성되었어요!"\n\n"세계는 점점 가까워지고 있습니다!"\n\n${name.은는} 흥분했어.\n\n할아버지가 말씀하셨어.\n\n"세계 이야기를 듣는 건 중요해.\n하지만 침착하게 생각하는 게 더 중요하단다."`,
      bg: 'https://images.unsplash.com/photo-1586339949216-35c2747cc36d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '세계일주 가능성을 묻는다', to: 'ask_world_tour', cls: 'bg-blue-200' },
        { label: '박물관으로 간다', to: 'museum', cls: 'bg-purple-200' }
      ],
      prompt: '💭 변화는 항상 좋은 것일까?'
    },
    {
      id: 'egypt_exhibit',
      title: '이집트의 신비',
      text: `거대한 파라오 석상이 있어.\n\n"이걸 만드는 데 얼마나 걸렸을까?"\n\n할아버지가 말씀하셨어.\n\n"오랜 시간과 노력이 필요했겠지."\n\n"위대한 것은 하루아침에 만들어지지 않는단다."\n\n"침착하게, 꾸준히 노력해야 해."`,
      bg: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '인도 전시실로 간다', to: 'india_exhibit', cls: 'bg-orange-200' },
        { label: '과거와 미래를 생각한다', to: 'past_future', cls: 'bg-blue-200' }
      ],
      prompt: '💭 과거의 위대함에서 우리는 무엇을 배울 수 있을까?'
    },
    {
      id: 'india_exhibit',
      title: '인도의 보물',
      text: `화려한 보석들이 빛나.\n\n"인도는 향료와 보석의 나라란다."\n\n"예전엔 수개월 걸려 갔지만,"\n\n"이젠 수에즈 운하 덕분에 빨라졌어."\n\n기술의 발전이 놀라워.\n\n할아버지가 말씀하셨어.\n\n"기술도 중요하지만,\n그걸 침착하게 사용하는 지혜가 더 중요하단다."`,
      bg: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '일본 전시실로 간다', to: 'japan_exhibit', cls: 'bg-red-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 편리함과 경험, 무엇이 더 소중할까?'
    },
    {
      id: 'imagine_voyage',
      title: '바다의 꿈',
      text: `${name.은는} 상상했어.\n\n푸른 바다를 가르며,\n낯선 항구에 도착하고,\n새로운 사람들을 만나는...\n\n"언젠가 나도!"\n\n가슴이 두근거렸어.\n\n할아버지가 말씀하셨어.\n\n"꿈을 갖는 건 좋아.\n하지만 침착하게 준비하는 용기도 필요하단다."`,
      bg: 'https://images.unsplash.com/photo-1761396227947-0ea0bc403317',
      choices: [
        { label: '항구를 더 구경한다', to: 'explore_harbor', cls: 'bg-blue-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 꿈을 갖는 것만으로도 의미가 있을까?'
    },
    {
      id: 'explore_harbor',
      title: '항구 탐험',
      text: `항구를 걸었어.\n\n여러 나라 국기가 펄럭여.\n\n영국, 프랑스, 네덜란드, 스페인...\n\n"세계가 여기 모여있구나."\n\n${name.은는} 깨달았어.\n\n할아버지가 말씀하셨어.\n\n"다양성을 존중하고,\n침착하게 이해하려는 태도가\n진정한 용기란다."`,
      bg: 'https://images.unsplash.com/photo-1541480551145-2370a440d585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '선원들과 더 이야기한다', to: 'talk_sailors', cls: 'bg-blue-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 작은 곳에서도 세계를 만날 수 있을까?'
    },
    {
      id: 'dream_world_tour',
      title: '세계일주의 꿈',
      text: `${name.은는} 상상했어.\n\n기차를 타고, 배를 타고,\n세계를 한 바퀴 도는...\n\n"정말 가능할까?"\n\n"가능하다면 얼마나 걸릴까?"\n\n궁금했어.\n\n할아버지가 말씀하셨어.\n\n"상상은 자유롭지만,\n실천하려면 침착함과 용기가 필요하단다."`,
      bg: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계산해본다', to: 'calculate_time', cls: 'bg-yellow-200' },
        { label: '신문사에서 알아본다', to: 'newspaper', cls: 'bg-blue-200' }
      ],
      prompt: '💭 상상력은 현실이 될 수 있을까?'
    },
    {
      id: 'observe_people',
      title: '다양한 사람들',
      text: `여행자들을 봤어.\n\n상인, 외교관, 탐험가...\n\n모두 다른 목적으로 여행해.\n\n"세상엔 정말 많은 사람들이 있구나."\n\n${name.은는} 생각했어.\n\n할아버지가 말씀하셨어.\n\n"다양한 사람들을 존중하고,\n침착하게 이해하려는 마음이 중요하단다."`,
      bg: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '한 신사에게 관심이 간다', to: 'notice_gentleman', cls: 'bg-purple-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 다른 사람의 여정에서 우리는 무엇을 배울까?'
    },
    {
      id: 'think_technology',
      title: '기술의 시대',
      text: `증기 엔진, 전신, 철도...\n\n모든 게 너무 빨리 변해.\n\n"10년 전엔 상상도 못했던 일들이야."\n\n할아버지가 말씀하셨어.\n\n"앞으로는 더 놀라운 일이 생길 거야."\n\n"하지만 기술보다 중요한 건\n침착함과 지혜란다."`,
      bg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '미래를 상상한다', to: 'imagine_future', cls: 'bg-blue-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 기술의 발전은 인간을 행복하게 만들까?'
    },
    {
      id: 'ask_world_tour',
      title: '가능성의 질문',
      text: `"그럼 세계일주가 정말 가능한가요?"\n\n기자가 고개를 끄덕였어.\n\n"가능하죠! 하지만 정확한 계획이 필요해요."\n\n"시간을 정확히 지켜야 하고,"\n\n"모든 교통편이 연결되어야 해요."\n\n할아버지가 덧붙이셨어.\n\n"그리고 침착함과 용기가 필요하단다."`,
      bg: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계산해보고 싶다', to: 'calculate_time', cls: 'bg-yellow-200' },
        { label: '박물관으로 간다', to: 'museum', cls: 'bg-purple-200' }
      ],
      prompt: '💭 꿈을 이루기 위해 필요한 것은 무엇일까?'
    },
    {
      id: 'past_future',
      title: '과거와 미래',
      text: `과거의 위대함을 보며,\n미래를 생각했어.\n\n"옛날 사람들도 불가능을 가능하게 만들었어."\n\n할아버지가 말씀하셨어.\n\n"우리도 할 수 있단다."\n\n"침착하게, 꾸준히 노력하면 말이야."`,
      bg: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '인도 전시실로 간다', to: 'india_exhibit', cls: 'bg-orange-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 역사는 미래를 위한 교훈일까?'
    },
    {
      id: 'japan_exhibit',
      title: '일본의 문화',
      text: `아름다운 도자기와 칼이 있어.\n\n"일본은 동쪽 끝의 나라란다."\n\n"최근에 개항했지."\n\n"이제 증기선으로 갈 수 있어!"\n\n신기한 나라야.\n\n할아버지가 말씀하셨어.\n\n"낯선 문화를 존중하고,\n침착하게 이해하려는 태도가 필요하단다."`,
      bg: 'https://images.unsplash.com/photo-1528164344705-47542687000d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '동양에 대해 더 배운다', to: 'learn_east', cls: 'bg-red-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 낯선 문화에 대한 존중은 어떻게 배울까?'
    },
    {
      id: 'think_preparation',
      title: '준비의 중요성',
      text: `"무엇을 준비해야 하나요?"\n\n할아버지가 설명하셨어.\n\n"정확한 시계, 세계 지도,\n각국의 언어와 문화,\n그리고 무엇보다... 침착함과 용기."\n\n"침착함과 용기요?"\n\n"그래, 어떤 상황에서도 흔들리지 않고,\n두려움을 이기는 마음이지."`,
      bg: 'https://images.unsplash.com/photo-1553531384-397c8ec5c1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '준비 방식을 고민한다', to: 'pj_choice', cls: 'bg-green-200' },
        { label: '더 알아본다', to: 'learn_more', cls: 'bg-blue-200' }
      ],
      prompt: '💭 물질적 준비와 정신적 준비, 어느 것이 더 중요할까?'
    },
    {
      id: 'pj_choice',
      title: '너는 어떤 사람?',
      text: `할아버지가 물으셨어.\n\n"너는 여행할 때 어떻게 준비할래?"\n\n"미리 계획을 세세하게 다 짜고 갈래?\n아니면 가면서 즉흥적으로 정할래?"\n\n너는 어떤 스타일일까?`,
      bg: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계획을 세세하게 짠다 (MBTI J형)', to: 'j_type', cls: 'bg-blue-200' },
        { label: '가면서 정한다 (MBTI P형)', to: 'p_type', cls: 'bg-green-200' }
      ],
      prompt: '💭 너는 계획적인 사람? 즉흥적인 사람?'
    },
    {
      id: 'j_type',
      title: '계획적인 여행자',
      text: `"저는 계획을 미리 다 짜고 싶어요!"\n\n할아버지가 고개를 끄덕이셨어.\n\n"그래, 좋은 방법이야.\n세계일주처럼 정확함이 중요한 여행은\n계획이 정말 중요하단다."\n\n"하지만 계획대로 안 될 때도 있어.\n그럴 때는 침착하게 대처하는 것도 필요하지."\n\n${name.은는} 고개를 끄덕였어.`,
      bg: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '준비를 시작한다', to: 'start_learning', cls: 'bg-green-200' },
        { label: '더 알아본다', to: 'learn_more', cls: 'bg-blue-200' }
      ],
      prompt: '💭 완벽한 계획이 성공을 보장할까?'
    },
    {
      id: 'p_type',
      title: '즉흥적인 여행자',
      text: `"저는 가면서 정하고 싶어요!"\n\n할아버지가 웃으셨어.\n\n"그래, 유연한 마음도 중요하지.\n하지만 세계일주는 배와 기차 시간이 정해져 있어.\n\n어느 정도 계획은 필요하단다."\n\n"즉흥성과 계획,\n둘의 균형이 중요해.\n\n그리고 항상 침착함을 유지하는 거야."\n\n${name.은는} 고개를 끄덕였어.`,
      bg: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '준비를 시작한다', to: 'start_learning', cls: 'bg-green-200' },
        { label: '더 알아본다', to: 'learn_more', cls: 'bg-blue-200' }
      ],
      prompt: '💭 유연함과 계획, 균형이 필요할까?'
    },
    {
      id: 'learn_more',
      title: '더 많은 배움',
      text: `"좀 더 알아보고 싶어요!"\n\n할아버지가 좋아하셨어.\n\n"좋아. 박물관에 가볼까?"\n\n"아니면 신문사에서 더 알아볼까?"\n\n${name.은는} 생각했어.\n\n"침착하게 생각하고 결정하렴."\n\n할아버지가 말씀하셨어.`,
      bg: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '박물관으로 간다', to: 'museum', cls: 'bg-purple-200' },
        { label: '신문사로 간다', to: 'newspaper', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 배움에 끝이 있을까?'
    },
    {
      id: 'talk_sailors',
      title: '선원들의 이야기',
      text: `선원들이 모여 이야기하고 있어.\n\n"인도의 몬순을 조심해야 해!"\n\n"태평양은 거칠단다!"\n\n"하지만 증기선이니까 괜찮아!"\n\n모험의 이야기들.\n\n할아버지가 말씀하셨어.\n\n"위험할 때일수록 침착함이 중요하단다.\n당황하면 더 위험해지지."`,
      bg: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '위험과 용기를 생각한다', to: 'think_courage', cls: 'bg-red-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 위험을 무릅쓴 도전은 가치가 있을까?'
    },
    {
      id: 'notice_gentleman',
      title: '품격있는 신사',
      text: `한 신사가 시계를 보고 있어.\n\n매우 정확한 시계.\n\n할아버지가 수리한 시계 같아.\n\n"저분은 누구세요?"\n\n"혁신 클럽의 회원이시란다."\n\n"거기선 신사들이 모여서\n세계 여러 곳의 이야기를 나눈단다."`,
      bg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '혁신 클럽에 대해 묻는다', to: 'ask_club', cls: 'bg-blue-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 규칙적인 삶은 지루함일까, 안정감일까?'
    },
    {
      id: 'imagine_future',
      title: '미래의 세계',
      text: `${name.은는} 상상했어.\n\n하늘을 나는 기계,\n더 빠른 증기선,\n세계가 하나로...\n\n"정말 그런 날이 올까?"\n\n할아버지가 미소지으셨어.\n\n"올 거야. 하지만 그때도\n침착함과 용기는 여전히 중요할 거란다."`,
      bg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '박물관으로 간다', to: 'museum', cls: 'bg-purple-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 미래는 우리가 만드는 것일까?'
    },
    {
      id: 'learn_east',
      title: '동양의 매력',
      text: `중국, 일본, 인도...\n\n동양은 신비로워.\n\n"언젠가 직접 보고 싶어요!"\n\n할아버지가 고개를 끄덕이셨어.\n\n"그래, 넌 할 수 있을 거야."\n\n"침착하게 준비하고,\n용기를 내면 말이야."`,
      bg: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '여행 계획을 생각한다', to: 'think_preparation', cls: 'bg-blue-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 다름을 존중하는 마음은 어디서 시작될까?'
    },
    {
      id: 'return_home',
      title: '저녁의 가게',
      text: `집으로 돌아왔어.\n\n할아버지가 시계를 수리하고 계셔.\n\n"오늘 뭘 배웠니?"\n\n"세계가 생각보다 가깝다는 걸요!"\n\n"그리고 침착함과 용기가 중요하다는 것도요!"\n\n"그래, 좋은 깨달음이구나."`,
      bg: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '시계를 도와드린다', to: 'help_clock', cls: 'bg-blue-200' },
        { label: '더 물어본다', to: 'ask_more_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 배움은 우리를 어떻게 성장시킬까?'
    },
    {
      id: 'start_learning',
      title: '배움의 시작',
      text: `${name.은는} 매일 배우기 시작했어.\n\n세계 지리, 각국의 문화, 시간 계산...\n\n할아버지가 모든 걸 가르쳐주셨어.\n\n"좋아, 잘하고 있구나!"\n\n칭찬이 힘이 됐어.\n\n"하지만 서두르지 마라.\n침착하게, 꾸준히 하는 거야."\n\n할아버지의 말씀.`,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '열심히 공부한다', to: 'study_hard', cls: 'bg-green-200' },
        { label: '며칠 후', to: 'days_later', cls: 'bg-purple-200' }
      ],
      prompt: '💭 꾸준함이 재능을 이길 수 있을까?'
    },
    {
      id: 'think_courage',
      title: '용기에 대하여',
      text: `용기란 무엇일까?\n\n두려움이 없는 게 아니야.\n\n두려워도 침착하게 앞으로 나아가는 거야.\n\n할아버지가 말씀하셨어.\n\n"용기는 두려움을 이기는 마음이란다.\n침착함과 함께할 때 진정한 용기가 되지."\n\n"그래, 나도 할 수 있어!"\n\n${name.은는} 다짐했어.`,
      bg: 'https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '집으로 돌아가 준비한다', to: 'return_home', cls: 'bg-green-200' },
        { label: '혁신 클럽으로 간다', to: 'near_club', cls: 'bg-blue-200' }
      ],
      prompt: '💭 진정한 용기는 어디서 나올까?'
    },
    {
      id: 'ask_club',
      title: '혁신 클럽',
      text: `"혁신 클럽은 신사들의 모임이란다."\n\n"거기서 세계 여러 곳 소식을 이야기하고,"\n\n"카드 게임을 하며 시간을 보내지."\n\n"매우 격식 있는 곳이야."\n\n${name.은는} 상상했어.\n\n"침착하고 품격 있는 사람들이 모이는 곳이구나."`,
      bg: 'https://images.unsplash.com/photo-1519167758481-83f29da8fd36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 궁금해한다', to: 'curious_club', cls: 'bg-purple-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 좋은 환경은 사람을 만들 수 있을까?'
    },
    {
      id: 'help_clock',
      title: '시계 수리',
      text: `작은 톱니바퀴를 건넸어.\n\n"정확함이 가장 중요하란다."\n\n할아버지가 말씀하셨어.\n\n"톱니바퀴 하나만 어긋나도,\n전체가 망가진단다."\n\n"세계일주도 마찬가지야.\n하나의 실수가 전체 계획을 망칠 수 있지.\n\n그래서 침착함이 중요해."`,
      bg: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '조심스럽게 작업한다', to: 'careful_work', cls: 'bg-green-200' },
        { label: '세계일주 이야기를 한다', to: 'talk_world_tour', cls: 'bg-blue-200' }
      ],
      prompt: '💭 작은 것의 중요성을 우리는 얼마나 이해하고 있을까?'
    },
    {
      id: 'ask_more_home',
      title: '더 많은 질문',
      text: `"할아버지, 정말 누군가 세계일주를 할 수 있을까요?"\n\n"물론이지. 준비만 되어 있다면."\n\n"정확한 시간 관리,\n완벽한 계획,\n그리고 흔들리지 않는 침착함과 용기."\n\n"그럼 가능하단다."`,
      bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '배우기 시작한다', to: 'start_learning', cls: 'bg-green-200' },
        { label: '며칠 후', to: 'days_later', cls: 'bg-purple-200' }
      ],
      prompt: '💭 침착함과 용기는 어떻게 만들어질까?'
    },
    {
      id: 'study_hard',
      title: '열심히 공부',
      text: `${name.은는} 매일 공부했어.\n\n경도와 위도,\n시차 계산,\n각국의 기후...\n\n점점 더 많은 걸 알게 됐어.\n\n세계가 조금씩 가까워지는 느낌.\n\n할아버지가 말씀하셨어.\n\n"잘하고 있구나. 침착하게, 꾸준히."`,
      bg: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 공부한다', to: 'continue_study', cls: 'bg-green-200' },
        { label: '며칠 후', to: 'days_later', cls: 'bg-purple-200' }
      ],
      prompt: '💭 꾸준함은 힘일까?'
    },
    {
      id: 'days_later',
      title: '며칠 후',
      text: `며칠이 지났어.\n\n${name.은는} 매일 배우고 있어.\n\n시간, 지리, 문화...\n\n그리고 침착함과 용기도.\n\n"언젠가는 준비가 될 거야."\n\n그렇게 생각했어.`,
      bg: 'https://images.unsplash.com/photo-1506784881475-163ade1122f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '어느 날 저녁', to: 'special_evening', cls: 'bg-purple-200' },
        { label: '계속 공부한다', to: 'continue_study', cls: 'bg-green-200' }
      ],
      prompt: '💭 준비하는 시간은 낭비일까, 투자일까?'
    },
    {
      id: 'near_club',
      title: '혁신 클럽 근처',
      text: `클럽 근처에 왔어.\n\n우아한 건물이 서 있어.\n\n신사들이 드나들어.\n\n"여기가 혁신 클럽이구나."\n\n${name.은는} 지켜봤어.\n\n할아버지가 말씀하셨어.\n\n"저들처럼 침착하고 품격 있게 살아가는 것도\n중요한 배움이란다."`,
      bg: 'https://images.unsplash.com/photo-1519167758481-83f29da8fd36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '사람들을 관찰한다', to: 'observe_club', cls: 'bg-blue-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 권위와 전통은 어떤 의미를 가질까?'
    },
    {
      id: 'careful_work',
      title: '정밀한 작업',
      text: `톱니바퀴를 조심히 끼웠어.\n\n딸각-\n\n완벽하게 맞아떨어졌어.\n\n"잘했구나!"\n\n할아버지가 칭찬하셨어.\n\n"너는 재능이 있어.\n침착하게 일하는 모습이 좋구나."`,
      bg: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '뿌듯해한다', to: 'feel_proud', cls: 'bg-yellow-200' },
        { label: '세계일주 이야기를 한다', to: 'talk_world_tour', cls: 'bg-blue-200' }
      ],
      prompt: '💭 노력의 결과를 보는 것은 어떤 의미일까?'
    },
    {
      id: 'talk_world_tour',
      title: '세계일주 대화',
      text: `"할아버지, 언젠가 나도 세계일주를 하고 싶어요!"\n\n할아버지가 미소지으셨어.\n\n"좋은 꿈이구나."\n\n"하지만 준비가 필요하단다."\n\n"지식, 계획, 그리고 침착함과 용기."\n\n"천천히, 차근차근 준비하자꾸나."`,
      bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 배우기로 한다', to: 'start_learning', cls: 'bg-green-200' },
        { label: '며칠 후', to: 'days_later', cls: 'bg-purple-200' }
      ],
      prompt: '💭 꿈을 말하는 것은 그것을 이루는 첫걸음일까?'
    },
    {
      id: 'observe_club',
      title: '클럽 관찰',
      text: `신사들이 들어가고 나와.\n\n모두 정장을 입고,\n시계를 차고,\n품격있게 걸어.\n\n"언젠가 나도..."\n\n${name.은는} 상상했어.\n\n할아버지가 말씀하셨어.\n\n"품격은 겉모습이 아니라\n침착함과 용기에서 나온단다."`,
      bg: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 지켜본다', to: 'watch_more', cls: 'bg-blue-200' },
        { label: '집으로 돌아간다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 동경하는 것과 되는 것 사이에는 무엇이 있을까?'
    },
    {
      id: 'feel_proud',
      title: '성취감',
      text: `${name.은는} 뿌듯했어.\n\n작은 일이지만,\n완벽하게 해냈어.\n\n"할아버지처럼 정확하고 침착한 사람이 될 거야."\n\n그렇게 다짐했어.\n\n할아버지가 말씀하셨어.\n\n"작은 성공들이 모여 큰 성공이 되는 거란다."`,
      bg: 'https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '계속 배운다', to: 'start_learning', cls: 'bg-green-200' },
        { label: '며칠 후', to: 'days_later', cls: 'bg-purple-200' }
      ],
      prompt: '💭 작은 성공들이 모여 큰 성공을 만들 수 있을까?'
    },
    {
      id: 'special_evening',
      title: '특별한 저녁',
      text: `할아버지가 신문을 읽으시다 말씀하셨어.\n\n"혁신 클럽에서 재미있는 일이 있나 보구나."\n\n"어떤 일이요?"\n\n"신사들이 내기를 했다는군."\n\n${name.은는} 귀를 기울였어.\n\n"80일간의 세계 일주 내기래."`,
      bg: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '자세히 듣는다', to: 'hear_bet', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 호기심은 우리를 어디로 이끌까?'
    },
    {
      id: 'continue_study',
      title: '꾸준한 공부',
      text: `${name.은는} 포기하지 않았어.\n\n매일 조금씩,\n꾸준히 배웠어.\n\n시간이 지나면서,\n세계가 점점 더 가까워졌어.\n\n"준비되고 있어!"\n\n할아버지가 말씀하셨어.\n\n"침착하게, 꾸준히. 잘하고 있구나."`,
      bg: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '어느 날 저녁', to: 'special_evening', cls: 'bg-purple-200' },
        { label: '혁신 클럽으로 간다', to: 'near_club', cls: 'bg-blue-200' }
      ],
      prompt: '💭 꾸준함이 천재성을 이길 수 있을까?'
    },
    {
      id: 'curious_club',
      title: '궁금한 클럽',
      text: `"혁신 클럽에서 어떤 이야기를 하나요?"\n\n"세계 여러 곳 소식, 과학, 발명..."\n\n"그리고 가끔 흥미로운 내기도 한단다."\n\n"내기요?"\n\n할아버지가 미소지으셨어.\n\n"침착한 사람들이 하는 내기는\n무모하지 않고 계산된 도전이지."`,
      bg: 'https://images.unsplash.com/photo-1519167758481-83f29da8fd36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '클럽에 가보고 싶다', to: 'near_club', cls: 'bg-blue-200' },
        { label: '집에서 준비한다', to: 'return_home', cls: 'bg-green-200' }
      ],
      prompt: '💭 토론과 논쟁은 진실에 가까워지게 할까?'
    },
    {
      id: 'watch_more',
      title: '특별한 날',
      text: `오늘은 뭔가 특별해.\n\n클럽 앞에 사람들이 모여.\n\n"무슨 일이지?"\n\n할아버지가 오셨어.\n\n"오늘 포그 씨가 출발하는 날이래."\n\n"80일 만에 세계를 한 바퀴 돈다는 내기를 했대!"`,
      bg: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '포그 씨에 대해 묻는다', to: 'ask_fogg', cls: 'bg-blue-200' }
      ],
      prompt: '💭 역사적 순간은 어떻게 만들어질까?'
    },
    {
      id: 'hear_bet',
      title: '놀라운 내기',
      text: `"누군가 80일 만에 세계일주를 할 수 있다고 주장했대."\n\n${name.의} 눈이 커졌어.\n\n"정말요?!"\n\n"그래, 그래서 큰 돈을 걸었다는군."\n\n"2만 파운드라니!"\n\n할아버지가 말씀하셨어.\n\n"침착하고 정확한 사람만이\n그런 도전을 할 수 있단다."`,
      bg: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '더 자세히 묻는다', to: 'ask_details', cls: 'bg-red-200' }
      ],
      prompt: '💭 자신의 신념을 위해 모든 것을 거는 것은 용기일까, 무모함일까?'
    },
    {
      id: 'ask_fogg',
      title: '필리어스 포그',
      text: `"포그 씨가 누구예요?"\n\n"혁신 클럽의 회원이지."\n\n"매우 규칙적이고 정확한 분이야."\n\n"80일 만에 세계일주를 하겠다고 내기를 하셨단다!"\n\n${name.은는} 놀랐어.\n\n할아버지가 말씀하셨어.\n\n"침착함과 정확함의 힘이지."`,
      bg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '출발을 보고 싶다', to: 'wait_departure', cls: 'bg-blue-200' }
      ],
      prompt: '💭 계획과 실행 사이에는 무엇이 필요할까?'
    },
    {
      id: 'ask_details',
      title: '내기의 주인공',
      text: `"누가 그런 내기를 했어요?"\n\n"필리어스 포그라는 신사래."\n\n"매우 규칙적이고 정확한 분이지."\n\n"바로 얼마 전 우리 가게에 온 그 분이야!"\n\n${name.은는} 놀랐어.\n\n"저 침착하신 분이...!"`,
      bg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '클럽으로 가고 싶다', to: 'want_go_club', cls: 'bg-orange-200' }
      ],
      prompt: '💭 침착함과 용기는 어떻게 행동으로 이어질까?'
    },
    {
      id: 'wait_departure',
      title: '출발 대기',
      text: `클럽 문 앞에서 기다렸어.\n\n사람들이 모여있어.\n\n"정말 떠나실까?"\n\n"불가능해!"\n\n웅성거리는 소리.\n\n할아버지가 말씀하셨어.\n\n"침착함과 정확함이 있으면\n불가능도 가능하게 만들 수 있단다."`,
      bg: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '긴장하며 기다린다', to: 'fogg_appears', cls: 'bg-blue-200' }
      ],
      prompt: '💭 불가능을 가능하게 만드는 것은 무엇일까?'
    },
    {
      id: 'want_go_club',
      title: '클럽으로',
      text: `"할아버지, 클럽에 가보고 싶어요!"\n\n"그래, 가보자꾸나."\n\n"오늘이 역사적인 날이 될지도 모른단다."\n\n둘은 혁신 클럽으로 향했어.\n\n"침착하게 가자. 서두르지 말고."\n\n할아버지의 말씀.`,
      bg: 'https://images.unsplash.com/photo-1519167758481-83f29da8fd36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '클럽에 도착한다', to: 'arrive_club', cls: 'bg-blue-200' }
      ],
      prompt: '💭 위대한 순간을 목격하는 것도 배움일까?'
    },
    {
      id: 'arrive_club',
      title: '혁신 클럽 앞',
      text: `클럽 앞에 도착했어.\n\n사람들이 많아.\n\n"포그 씨가 나오신다!"\n\n누군가 외쳤어.\n\n${name.은는} 숨을 죽였어.\n\n할아버지가 말씀하셨어.\n\n"저 침착한 모습을 잘 봐두렴."`,
      bg: 'https://images.unsplash.com/photo-1519167758481-83f29da8fd36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '포그를 기다린다', to: 'fogg_appears', cls: 'bg-blue-200' }
      ],
      prompt: '💭 시작은 언제나 용기를 필요로 할까?'
    },
    {
      id: 'fogg_appears',
      title: '포그의 등장',
      text: `클럽 문이 열렸어.\n\n품격 있는 신사가 나왔어.\n\n필리어스 포그.\n\n옆에는 젊은 하인이 있어.\n\n"파스파르투라는 프랑스인이래."\n\n누군가 속삭였어.\n\n포그의 얼굴은 매우 침착해.`,
      bg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '지켜본다', to: 'watch_fogg', cls: 'bg-purple-200' }
      ],
      prompt: '💭 훌륭한 동반자는 성공의 열쇠일까?'
    },
    {
      id: 'watch_fogg',
      title: '침착한 출발',
      text: `포그는 매우 침착해.\n\n시계를 확인해.\n\n정확히 8시 45분.\n\n"제 시간에 돌아오겠습니다."\n\n그가 말했어.\n\n그리고 마차에 올랐어.\n\n전혀 서두르지 않아.\n\n완벽한 침착함이야.`,
      bg: 'https://images.unsplash.com/photo-1758767055081-c357cf87f19c',
      choices: [
        { label: '감동받는다', to: 'inspired', cls: 'bg-green-200' }
      ],
      prompt: '💭 침착함은 자신감에서 나올까?'
    },
    {
      id: 'inspired',
      title: '영감',
      text: `${name.은는} 깊이 감동받았어.\n\n"나도 언젠가..."\n\n할아버지가 손을 잡아주셨어.\n\n"그래, 너도 할 수 있단다."\n\n"정확함, 침착함, 용기.\n이 세 가지만 있으면 말이야."\n\n마차가 멀어져갔어.`,
      bg: 'https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '다짐한다', to: 'ending', cls: 'bg-yellow-200' }
      ],
      prompt: '💭 다른 사람의 성공이 내 성공의 시작이 될 수 있을까?'
    },
    {
      id: 'ending',
      title: '프리퀄 에피소드 끝',
      text: `그날 이후, ${name.은는} 매일 배웠어.\n\n그리고 알게 됐어.\n\n세계일주는 단순히 빠르게 도는 것이 아니라,\n세상을 이해하고, 다양성을 존중하며,\n정확함과 계획의 중요성을 아는 것.\n\n그리고 무엇보다...\n\n침착함과 용기.\n\n언젠가, 너도 세계를 여행하게 될 거야.\n\n📚 필리어스 포그의 모험이 궁금하지 않니?\n\n그는 정말 80일 만에 세계일주에 성공했을까?\n여행 중 어떤 위험과 모험이 기다리고 있었을까?\n\n쥘 베른의 《80일간의 세계 일주》를 읽어보면,\n스릴 넘치는 모험과 예상치 못한 반전들을\n만날 수 있어!\n\n직접 읽어보며 함께 여행을 떠나자! 🌍`,
      bg: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '🔄 처음부터 다시하기', to: 'start', cls: 'bg-purple-600' }
      ],
      prompt: `《80일간의 세계 일주》 - 지구를 한 바퀴 도는 여행, 그것도 딱 80일 만에! 정확함, 침착함, 용기가 만들어내는 위대한 모험 이야기!`
    }
  ];
}

import type { Scene } from '../types';

// Import all story generators from stories folders
import {
  generateHongdangmuStory,
  generateOzStory,
  generateTwentyThousandLeaguesStory,
  generateSecretGardenStory,
  generateFifteenBoysStory,
  generateFabreInsectsStory,
  generateJungleBookStory,
  generateTomSawyerStory,
  generateAnneStory,
  generateRobinsonStory,
  generateTreasureIslandStory,
  generateAroundWorldStory,
  generateArabianNightsStory,
  generateHuckFinnStory,
  generateJekyllHydeStory,
  generateRomeoJulietStory
} from '../stories/elementary-2-3';

import {
  generateHeungbuStory,
  generateSimcheongStory,
  generateSeosaMugaStory,
  generateOngojipStory,
  generateHongGyewolStory,
  generateJeokSeongUiStory,
  generateKimWonStory,
  generateJanghwaHongryeonStory,
  generateSamgukyusaStory,
  generateDukkeopjeonStory,
  generateBakssijeonStory,
  generateGeumbanguljeonStory,
  generateParkMunsuStory,
  generateHongGilDongStory,
  generateByeoljubuStory,
  generateHeosaengStory,
  generateGangrimStory
} from '../stories/elementary-4-6';

import {
  generateLittlePrinceStory,
  노인과바다,
  레미제라블,
  키다리아저씨,
  안네의일기
} from '../stories/middle-school-1';

import {
  파우스트
} from '../stories/middle-school-2';

import {
  프랑켄슈타인
} from '../stories/middle-school-3';

// Helper function to check if a character has 받침
function hasFinalConsonant(char: string): boolean {
  if (!char) return false;
  const code = char.charCodeAt(0);
  // 한글 유니코드 범위 체크
  if (code < 0xAC00 || code > 0xD7A3) return false;
  return (code - 0xAC00) % 28 !== 0;
}

// Helper function to add correct particle based on final consonant
function withParticle(name: string, type: 'subject' | 'topic' | 'object' | 'with'): string {
  const lastChar = name.charAt(name.length - 1);
  const hasFinal = hasFinalConsonant(lastChar);
  
  switch (type) {
    case 'subject': // 이/가
      return `${name}${hasFinal ? '이' : '가'}`;
    case 'topic': // 은/는
      return `${name}${hasFinal ? '은' : '는'}`;
    case 'object': // 을/를
      return `${name}${hasFinal ? '을' : '를'}`;
    case 'with': // 과/와
      return `${name}${hasFinal ? '과' : '와'}`;
    default:
      return name;
  }
}

// Helper function to create name variations
function createNameVariations(lastName: string, firstName: string) {
  const fullName = `${lastName}${firstName}`;
  
  return {
    full: fullName,
    first: firstName,
    casual: `${firstName}야`,
    polite: `${fullName} 학생`,
    이가: withParticle(firstName, 'subject'),
    은는: withParticle(firstName, 'topic'),
    을를: withParticle(firstName, 'object'),
    과와: withParticle(firstName, 'with'),
    full이가: withParticle(fullName, 'subject'),
    full은는: withParticle(fullName, 'topic'),
    의: `${firstName}의`,
  };
}

// Story templates mapping
const storyTemplates: Record<string, (gradeLevel: string, lastName: string, firstName: string) => Scene[]> = {
  // Elementary 2-3
  '홍당무': generateHongdangmuStory,
  '오즈의 마법사': generateOzStory,
  '해저 이만 리': generateTwentyThousandLeaguesStory,
  '비밀의 정원': generateSecretGardenStory,
  '15소년 표류기': generateFifteenBoysStory,
  '파브르 곤충기': generateFabreInsectsStory,
  '정글북': generateJungleBookStory,
  '톰 소여의 모험': generateTomSawyerStory,
  '빨간머리 앤': generateAnneStory,
  '로빈슨 크루소': generateRobinsonStory,
  '보물섬': generateTreasureIslandStory,
  '80일간의 세계 일주': generateAroundWorldStory,
  '아라비안 나이트': generateArabianNightsStory,
  '허클베리 핀의 모험': generateHuckFinnStory,
  '지킬박사와 하이드': generateJekyllHydeStory,
  '로미오와 줄리엣': generateRomeoJulietStory,
  
  // Elementary 4-6
  '흥부전': generateHeungbuStory,
  '심청전': generateSimcheongStory,
  '서사무가': generateSeosaMugaStory,
  '옹고집전': generateOngojipStory,
  '홍계월전': generateHongGyewolStory,
  '적성의전': generateJeokSeongUiStory,
  '김원전': generateKimWonStory,
  '장화홍련전': generateJanghwaHongryeonStory,
  '삼국유사': generateSamgukyusaStory,
  '두껍전': generateDukkeopjeonStory,
  '박씨전': generateBakssijeonStory,
  '금방울전': generateGeumbanguljeonStory,
  '박문수전': generateParkMunsuStory,
  '강림도령': generateGangrimStory,
  '별주부전': generateByeoljubuStory,
  '홍길동전': generateHongGilDongStory,
  '허생전': generateHeosaengStory,
  
  // Middle School
  '어린왕자': generateLittlePrinceStory,
  // 파우스트, 프랑켄슈타인, 노인과 바다, 레미제라블, 키다리아저씨, 안네의 일기는 if문에서 직접 처리
};

export function generateStory(bookTitle: string, gradeLevel: string, lastName: string = '', firstName: string = ''): Scene[] {
  const normalizedTitle = bookTitle.trim();
  const effectiveLastName = lastName || '김';
  const effectiveFirstName = firstName || '주인공';
  
  // Special case: 노인과 바다, 레미제라블, 키다리아저씨, 안네의 일기 return Story object directly
  if (normalizedTitle === '노인과 바다') {
    return 노인과바다.scenes;
  }
  
  if (normalizedTitle === '레미제라블') {
    return 레미제라블.scenes;
  }
  
  if (normalizedTitle === '키다리아저씨') {
    return 키다리아저씨.scenes;
  }
  
  if (normalizedTitle === '안네의 일기') {
    return 안네의일기.scenes;
  }
  
  if (normalizedTitle === '파우스트') {
    return 파우스트.scenes;
  }
  
  if (normalizedTitle === '프랑켄슈타인') {
    return 프랑켄슈타인.scenes;
  }
  
  // Find matching template
  const generator = storyTemplates[normalizedTitle];
  
  if (generator) {
    return generator(gradeLevel, effectiveLastName, effectiveFirstName);
  }

  // Default fallback story for unknown books
  return createDefaultStory(bookTitle, gradeLevel, effectiveLastName, effectiveFirstName);
}

function createDefaultStory(bookTitle: string, gradeLevel: string, lastName: string, firstName: string): Scene[] {
  const name = createNameVariations(lastName, firstName);
  
  return [
    {
      id: 'start',
      title: `${bookTitle}의 세계로`,
      text: `${name.full은는} ${bookTitle}의 주인공이 되었다.\n\n새로운 모험이 너를 기다리고 있다.\n\n어떤 선택을 하느냐에 따라 이야기가 달라진다.`,
      bg: 'https://images.unsplash.com/photo-1672688749283-a5b738c97e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '모험을 시작한다', to: 'choice1', cls: 'bg-blue-300' }
      ],
      prompt: '💭 새로운 모험을 시작한다면, 너는 어떤 마음일까?'
    },
    {
      id: 'choice1',
      title: '첫 번째 만남',
      text: `${name.은는} 새로운 사람을 만난다.\n\n그는 너에게 흥미로운 제안을 해.\n\n"나와 함께 가지 않을래?"`,
      bg: 'https://images.unsplash.com/photo-1675277026290-1f06990cbec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '함께 간다', to: 'together', cls: 'bg-green-300' },
        { label: '혼자 간다', to: 'alone', cls: 'bg-purple-300' }
      ],
      prompt: '💭 처음 만난 사람을 쉽게 믿을 수 있을까?'
    },
    {
      id: 'together',
      title: '함께하는 여정',
      text: `${name.은는} 새 친구와 함께 길을 가.\n\n혼자보다 든든해.\n\n이야기를 나누며 점점 친해져.`,
      bg: 'https://images.unsplash.com/photo-1672688749283-a5b738c97e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '모험을 계속한다', to: 'ending', cls: 'bg-blue-300' }
      ],
      prompt: '💭 친구가 있으면 어려운 일도 쉬워질까?'
    },
    {
      id: 'alone',
      title: '혼자만의 길',
      text: `${name.은는} 자 가기로 해.\n\n조용히 생각할 시간이 생겨.\n\n스스로 결정하는 게 익숙해져.`,
      bg: 'https://images.unsplash.com/photo-1688705992559-0cdecfea2150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '모험을 계속한다', to: 'ending', cls: 'bg-blue-300' }
      ],
      prompt: '💭 혼자 있는 시간도 소중할 수 있을까?'
    },
    {
      id: 'ending',
      title: '이야기는 계속돼!',
      text: `${name.full은는} ${bookTitle}의\n더 많은 인물, 사건, 배경을\n기다리고 있어!\n\n이 짧은 체험이\n책을 읽고 싶게 만들었니?\n\n진짜 이야기는 책에서 시작돼!`,
      bg: 'https://images.unsplash.com/photo-1582203914689-d5cc1850fcb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      choices: [
        { label: '🔄 처음부터 다시 해보기', to: 'start', cls: 'bg-purple-300' }
      ],
      prompt: '💭 이 게임을 하고 나니, 책이 읽고 싶어졌어?'
    }
  ];
}
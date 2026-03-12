export interface Choice {
  label: string;
  to: string;
  cls?: string;
  affinity?: Record<string, number>; // 🔥 추가: 성향을 기록하기 위한 선택적 속성 (용기, 지혜 등)
}

export interface Scene {
  id: string;
  title: string;
  text: string;
  bg: string;
  char?: string;
  choices: Choice[];
  prompt: string;
  bgMusic?: string; // 배경 음악 URL (선택사항, 작품별로 설정 가능)
}

export interface StoryMetadata {
  title: string;
  bgMusic?: string; // 작품 전체에 적용될 배경 음악 URL
  musicVolume?: number; // 기본 볼륨 (0.0 ~ 1.0)
}
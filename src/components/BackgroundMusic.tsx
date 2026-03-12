import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface BackgroundMusicProps {
  musicUrl?: string;
  bookTitle: string;
  autoPlay?: boolean;
  defaultVolume?: number;
}

export function BackgroundMusic({ 
  musicUrl, 
  bookTitle,
  autoPlay = false,
  defaultVolume = 0.3 
}: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 음악 URL이 없으면 표시하지 않음
  if (!musicUrl) {
    return null;
  }

  // Initialize audio element
  useEffect(() => {
    // 이전 오디오 정리
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.load();
      audioRef.current = null;
    }

    // 새 오디오 생성
    audioRef.current = new Audio();
    audioRef.current.preload = 'auto';
    audioRef.current.loop = true;
    audioRef.current.volume = defaultVolume;
    audioRef.current.crossOrigin = 'anonymous';

    // 에러 이벤트 - 조용히 실패 (개발 모드에서만 로그)
    audioRef.current.addEventListener('error', (e) => {
      // 조용히 실패 - UI에 영향 없음
      setIsPlaying(false);
    });

    // src 설정은 이벤트 리스너 등록 후
    audioRef.current.src = musicUrl;
    audioRef.current.load();

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [musicUrl, defaultVolume]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // 브라우저 정책으로 재생 실패 - 조용히 실패
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className={`
          ${isPlaying ? 'bg-purple-600 hover:bg-purple-700 opacity-50' : 'bg-gray-700 hover:bg-gray-600 opacity-30'}
          backdrop-blur-md rounded-full p-3 border border-purple-500/40 shadow-xl transition-all
          hover:scale-110 hover:opacity-100 active:scale-95
        `}
        title={isPlaying ? '음악 정지' : '음악 재생'}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-white" />
        ) : (
          <VolumeX className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
}
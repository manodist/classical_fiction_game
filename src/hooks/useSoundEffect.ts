import React, { useEffect, useCallback, useRef } from 'react';

/**
 * Web Audio API를 활용하여 별도의 에셋 파일 다운로드 없이
 * 가볍고 빠른 UI 효과음(Click/Pop)을 생성하는 커스텀 훅입니다.
 */
export function useSoundEffect() {
    const playClick = useCallback(() => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();

            // 약간 부드러운 사인파로 종이 넘기는 듯한 톡/팝 소리 구현
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

            gainNode.gain.setValueAtTime(0.1, ctx.currentTime); // 볼륨은 작게 (0.1)
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.05);
        } catch (e) {
            // Safari 등 오디오 컨텍스트 자동 재생이 제한된 환경을 위해 에러 무시
            // console.warn('Audio play failed:', e);
        }
    }, []);

    return { playClick };
}

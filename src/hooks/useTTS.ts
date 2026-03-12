import { useState, useCallback, useEffect } from 'react';

/**
 * Web Speech API를 활용하는 TTS(Text-To-Speech) 훅입니다.
 */
export function useTTS() {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    // 음성 목록 불러오기
    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            const loadVoices = () => {
                const availableVoices = window.speechSynthesis.getVoices();
                if (availableVoices.length > 0) {
                    setVoices(availableVoices);
                }
            };

            loadVoices();
            // 일부 브라우저에서는 voices가 비동기로 로드됨
            window.speechSynthesis.onvoiceschanged = loadVoices;
        } else {
            setIsSupported(false);
        }

        // 컴포넌트 언마운트 시 리스너 제거 및 음성 취소
        return () => {
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.onvoiceschanged = null;
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const speak = useCallback((text: string) => {
        if (!isSupported) return;

        window.speechSynthesis.cancel(); // 진행 중인 음성 취소

        if (!text) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR'; // 한국어

        // 자연스러운 한국어 음성 찾기 로직
        if (voices.length > 0) {
            const koreanVoices = voices.filter(v => v.lang.includes('ko') || v.lang.includes('KR'));

            if (koreanVoices.length > 0) {
                // 선호하는 고품질/자연스러운 음성 이름 키워드 목록
                const preferredKeywords = [
                    'natural', 'online', // Microsoft Edge, Chrome online voices
                    'sunh', 'injoon', 'heami', // Microsoft voices
                    'siri', 'yuna', // Apple voices
                    'google' // Google voices
                ];

                // 1. 프리미엄/온라인/자연스러운 음성을 최우선으로 찾기
                let selectedVoice = koreanVoices.find(v =>
                    preferredKeywords.some(keyword => v.name.toLowerCase().includes(keyword))
                );

                // 2. 없으면 일반 한국어 여성/남성 음성 중 첫 번째 선택
                if (!selectedVoice) {
                    selectedVoice = koreanVoices[0];
                }

                utterance.voice = selectedVoice;
            }
        }

        utterance.rate = 1.0; // 기본 속도 (필요시 자연스러움을 위해 0.95 등으로 조절 가능)
        utterance.pitch = 1.0; // 기본 음정

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (e) => {
            console.error('TTS Error:', e);
            setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    }, [isSupported]);

    const stop = useCallback(() => {
        if (!isSupported) return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, [isSupported]);

    return { speak, stop, isSpeaking, isSupported, availableVoices: voices.length };
}

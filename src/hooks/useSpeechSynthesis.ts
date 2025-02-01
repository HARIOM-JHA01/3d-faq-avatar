import { useCallback } from 'react';

export function useSpeechSynthesis() {
  const speak = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
    return new Promise<void>((resolve) => {
      utterance.onend = () => resolve();
    });
  }, []);

  return { speak };
}
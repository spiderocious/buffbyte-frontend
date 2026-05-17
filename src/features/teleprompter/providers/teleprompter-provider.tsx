import { useState, useCallback } from 'react';
import { TeleprompterContext } from './teleprompter-context';

export function TeleprompterProvider({ children }: { readonly children: React.ReactNode }) {
  const [script, setScript] = useState('');
  const [speed, setSpeed] = useState(130);
  const [fontSize, setFontSize] = useState(56);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const reset = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
  }, []);

  return (
    <TeleprompterContext.Provider
      value={{
        script,
        setScript,
        speed,
        setSpeed,
        fontSize,
        setFontSize,
        isPlaying,
        play,
        pause,
        reset,
        progress,
        setProgress,
      }}
    >
      {children}
    </TeleprompterContext.Provider>
  );
}

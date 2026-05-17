import { createContext } from 'react';

export interface TeleprompterContextValue {
  readonly script: string;
  readonly setScript: (s: string) => void;
  readonly speed: number;
  readonly setSpeed: (n: number) => void;
  readonly fontSize: number;
  readonly setFontSize: (n: number) => void;
  readonly isPlaying: boolean;
  readonly play: () => void;
  readonly pause: () => void;
  readonly reset: () => void;
  readonly progress: number;
  readonly setProgress: (n: number) => void;
}

export const TeleprompterContext = createContext<TeleprompterContextValue | null>(null);

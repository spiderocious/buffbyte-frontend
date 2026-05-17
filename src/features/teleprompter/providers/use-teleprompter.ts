import { useContext } from 'react';
import { TeleprompterContext } from './teleprompter-context';

export function useTeleprompter() {
  const ctx = useContext(TeleprompterContext);
  if (!ctx) throw new Error('useTeleprompter must be used inside TeleprompterProvider');
  return ctx;
}

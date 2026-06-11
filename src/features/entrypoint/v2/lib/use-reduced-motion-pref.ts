import { useSyncExternalStore } from 'react';

/**
 * True when the user has asked the OS to reduce motion. The page uses
 * this to skip ambient loops, pinned scrub scenes and entrances.
 */
const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

export function useReducedMotionPref(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot);
}

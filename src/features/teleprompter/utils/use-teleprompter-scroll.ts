import { useEffect, useRef } from 'react';
import { useTeleprompter } from '../providers/use-teleprompter';
import { calculateScrollSpeed } from '../helpers/calculate-scroll-speed';

export function useTeleprompterScroll(
  containerRef: React.RefObject<HTMLDivElement | null>,
) {
  const { isPlaying, speed, fontSize, pause, play, progress } = useTeleprompter();
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Scroll animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!isPlaying) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimeRef.current = null;
      // Reset scroll position when progress is 0 (reset was called)
      if (progress === 0) {
        el.scrollTop = 0;
      }
      return;
    }

    const pxPerSec = calculateScrollSpeed(speed, fontSize);

    function step(timestamp: number) {
      if (!el) return;
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const delta = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      el.scrollTop += pxPerSec * delta;

      const maxScroll = el.scrollHeight - el.clientHeight;
      if (el.scrollTop >= maxScroll) {
        el.scrollTop = maxScroll;
        pause();
        return;
      }

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, speed, fontSize, pause, progress, containerRef]);

  // Keyboard controls
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (isPlaying) pause();
        else play();
      }
      if (e.code === 'Escape') pause();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isPlaying, pause, play]);
}

import type { ScoreRingColor } from '@ui/score-ring';

export function scoreToColor(score: number): ScoreRingColor {
  if (score >= 80) return 'accent';
  if (score >= 60) return 'ink';
  if (score >= 40) return 'warn';
  return 'crit';
}

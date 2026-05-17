export function estimateDuration(wordCount: number): string {
  const totalSecs = Math.round((wordCount / 130) * 60);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `~${mins}:${secs.toString().padStart(2, '0')}`;
}

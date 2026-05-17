export function calculateScrollSpeed(wpm: number, fontSize: number): number {
  const wordsPerSec = wpm / 60;
  const charsPerWord = 5;
  const lineHeightPx = fontSize * 1.45;
  const charsPerLine = Math.max(1, Math.floor(1100 / (fontSize * 0.55)));
  const wordsPerLine = charsPerLine / charsPerWord;
  const linesPerSec = wordsPerSec / wordsPerLine;
  // Multiply by 2.5 so motion is visible at low WPM — 50 WPM still feels like slow deliberate scroll
  return linesPerSec * lineHeightPx * 2.5;
}

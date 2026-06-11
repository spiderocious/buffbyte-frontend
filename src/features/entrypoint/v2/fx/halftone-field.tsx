import { useEffect, useRef } from 'react';
import { useReducedMotionPref } from '../lib/use-reduced-motion-pref';

/* ============================================================
   Halftone wave field — the signature surface.
   A grid of dots whose radius + brightness ride a flowing wave,
   warm-gold at the crest fading to violet at the edges, drifting
   slowly. 2D canvas, transform/opacity-cheap, dpr-aware. Static
   single-frame fallback under prefers-reduced-motion.
   ============================================================ */

type Props = {
  /**
   * 'violet'  brand-core crest on dark  (default hero)
   * 'violet-soft'  brand crest tuned for a light/paper ground
   * 'spark'  violet core with a faint warm rim (secondary accent only)
   */
  tone?: 'violet' | 'violet-soft' | 'spark';
  /** vertical position of the wave crest, 0=top 1=bottom */
  crest?: number;
  /** dots brighten/grow/repel around the pointer */
  interactive?: boolean;
  /** radius of pointer influence in px */
  pointerRadius?: number;
  className?: string;
  style?: React.CSSProperties;
};

/* hot = crest highlight, warm = mid, cool = fringe.
   Brand violet #533AFD is the anchor across every tone. */
const TONES = {
  violet:      { hot: [201, 192, 255], warm: [124, 92, 255], cool: [61, 39, 217] },
  'violet-soft': { hot: [124, 92, 255], warm: [83, 58, 253], cool: [201, 192, 255] },
  spark:       { hot: [222, 210, 255], warm: [124, 92, 255], cool: [240, 170, 70] },
} as const;

export function HalftoneField({ tone = 'violet', crest = 0.62, interactive = false, pointerRadius = 150, className, style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotionPref();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const palette = TONES[tone];
    const GAP = 17; // px between dot centers
    let w = 0, h = 0, dpr = 1;
    let cols = 0, rows = 0;
    let raf = 0;

    // pointer state, in canvas-local px. target = raw, px/py = eased follower.
    const usesPointer = interactive && !reduced;
    let targetX = -9999, targetY = -9999;   // off-screen until first move
    let px = -9999, py = -9999;
    const R2 = pointerRadius * pointerRadius;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / GAP) + 1;
      rows = Math.ceil(h / GAP) + 1;
    };

    const mix = (a: readonly number[], b: readonly number[], t: number) =>
      `${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)}`;

    // light ground wants lower baseline alpha + a touch more contrast at the crest
    const light = tone === 'violet-soft';
    const baseA = light ? 0.04 : 0.12;
    const gainA = light ? 0.62 : 0.78;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = time * 0.00018;
      const crestY = h * crest;

      // ease the influence point toward the pointer for buttery follow
      if (usesPointer) {
        px += (targetX - px) * 0.12;
        py += (targetY - py) * 0.12;
      }

      for (let cx = 0; cx < cols; cx++) {
        const x = cx * GAP;
        const nx = x / w;
        // flowing wave: two summed sines so the crest undulates
        const wave =
          Math.sin(nx * 3.1 + t * 1.6) * 0.5 +
          Math.sin(nx * 6.7 - t * 1.1) * 0.28 +
          Math.sin(nx * 1.4 + t * 0.7) * 0.22;
        const bandY = crestY + wave * h * 0.16;
        for (let cy = 0; cy < rows; cy++) {
          const y = cy * GAP;
          // distance from the glowing band, normalised
          const d = Math.abs(y - bandY) / (h * 0.42);
          let energy = Math.max(0, 1 - d * d); // 0..1, sharp falloff

          // pointer influence: brighten + grow + push dots near the cursor
          let ox = 0, oy = 0;
          if (usesPointer) {
            const ddx = x - px, ddy = y - py;
            const dist2 = ddx * ddx + ddy * ddy;
            if (dist2 < R2) {
              const falloff = 1 - dist2 / R2;       // 1 at cursor -> 0 at edge
              const soft = falloff * falloff;
              energy = Math.min(1, energy + soft * 0.85); // light up
              const dist = Math.sqrt(dist2) || 1;
              const push = soft * 9;                 // repel outward
              ox = (ddx / dist) * push;
              oy = (ddy / dist) * push;
            }
          }
          if (energy < 0.02) continue;

          // colour: hot core -> warm -> cool at the fringes
          let color: string;
          if (energy > 0.6) color = mix(palette.warm, palette.hot, (energy - 0.6) / 0.4);
          else color = mix(palette.cool, palette.warm, energy / 0.6);
          const r = 0.6 + energy * 2.9;
          ctx.beginPath();
          ctx.fillStyle = `rgba(${color},${baseA + energy * gainA})`;
          ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    let rect = canvas.getBoundingClientRect();
    const onPointer = (e: PointerEvent) => {
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };
    const onLeave = () => { targetX = -9999; targetY = -9999; };

    resize();
    if (reduced) {
      draw(3200); // single representative frame, no loop
    } else {
      const loop = (time: number) => { draw(time); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => { resize(); rect = canvas.getBoundingClientRect(); if (reduced) draw(3200); };
    window.addEventListener('resize', onResize);
    if (usesPointer) {
      window.addEventListener('scroll', onResize, { passive: true }); // rect.top shifts on scroll
      window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('pointerleave', onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [tone, crest, reduced, interactive, pointerRadius]);

  return <canvas ref={canvasRef} className={className} style={{ display: 'block', width: '100%', height: '100%', ...style }} aria-hidden="true" />;
}

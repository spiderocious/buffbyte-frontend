import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

/* Single registration point for the Variant B GSAP stack. */
gsap.registerPlugin(ScrollTrigger, SplitText);
ScrollTrigger.config({ ignoreMobileResize: true });

/* Pinned scenes + split text measure layout — re-measure once webfonts land. */
if (typeof document !== 'undefined' && document.fonts) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

/* Vite HMR swaps components under live pinned ScrollTriggers, which can
   strand pin-spacers and mis-position scenes. Re-measure after each hot
   update; if the layout is still broken, a manual reload is needed. */
if (import.meta.hot) {
  import.meta.hot.on('vite:afterUpdate', () => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });
}

export { gsap, ScrollTrigger, SplitText };

import { useEffect, useRef } from 'react';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const smoothstep = (start, end, value) => {
  const progress = clamp((value - start) / (end - start), 0, 1);
  return progress * progress * (3 - 2 * progress);
};

function ScrollExpand({ children, triggerRef }) {
  const revealRef = useRef(null);

  useEffect(() => {
    const reveal = revealRef.current;
    const trigger = triggerRef.current;
    if (!reveal || !trigger) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let origin = trigger.getBoundingClientRect();
    let currentProgress = 0;
    let targetProgress = 0;
    let frameId = 0;
    const backgroundText = reveal.querySelector('.reveal-backdrop-text');
    const revealItems = [...reveal.querySelectorAll('[data-scroll-reveal]')];

    const applyProgress = progress => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const eased = smoothstep(0, 1, progress);
      trigger.style.setProperty('--stamp-scale', `${reduceMotion ? 1 : 1 + eased * 1.1}`);
      trigger.style.setProperty('--stamp-rotation', `${reduceMotion ? 0 : eased * 180}deg`);
      reveal.style.top = `${origin.top * (1 - eased)}px`;
      reveal.style.left = `${origin.left * (1 - eased)}px`;
      reveal.style.width = `${origin.width + (viewportWidth - origin.width) * eased}px`;
      reveal.style.height = `${origin.height + (viewportHeight - origin.height) * eased}px`;
      reveal.style.borderRadius = `${Math.min(origin.width, origin.height) * 0.3 * (1 - eased)}px`;
      reveal.style.visibility = progress > 0.001 ? 'visible' : 'hidden';
      reveal.style.overflow = progress > 0.99 ? 'auto' : 'hidden';
      reveal.setAttribute('aria-hidden', progress < 0.99 ? 'true' : 'false');
      const contentProgress = smoothstep(0.72, 0.98, progress);
      reveal.style.setProperty('--reveal-content-opacity', `${contentProgress}`);
      reveal.style.setProperty('--reveal-content-offset', `${18 * (1 - contentProgress)}px`);
      reveal.style.setProperty('--reveal-progress', `${eased}`);
      if (backgroundText) {
        backgroundText.style.opacity = `${smoothstep(0.25, 0.8, progress) * 0.28}`;
        backgroundText.style.transform = `translate(-50%, -50%) translate3d(${-36 * (1 - eased)}px, ${20 * (1 - eased)}px, 0) rotate(${eased * 180}deg) scale(${0.92 + eased * 0.08})`;
      }
      revealItems.forEach((item, index) => {
        const stagger = Math.min(0.075, 0.56 / Math.max(revealItems.length - 1, 1));
        const start = 0.24 + index * stagger;
        const itemProgress = reduceMotion ? 1 : smoothstep(start, Math.min(start + 0.16, 0.98), progress);
        item.style.opacity = `${itemProgress}`;
        item.style.transform = reduceMotion ? 'none' : `translate3d(0, ${20 * (1 - itemProgress)}px, 0)`;
      });
    };

    const tick = () => {
      currentProgress += (targetProgress - currentProgress) * 0.16;
      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
        frameId = 0;
      } else {
        frameId = window.requestAnimationFrame(tick);
      }
      applyProgress(currentProgress);
    };

    const updateTarget = () => {
      targetProgress = clamp(window.scrollY / (window.innerHeight * 0.85), 0, 1);
      if (reduceMotion) {
        currentProgress = targetProgress;
        applyProgress(currentProgress);
      } else if (!frameId) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      if (window.scrollY < 1) origin = trigger.getBoundingClientRect();
      updateTarget();
    };

    updateTarget();
    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', onResize);
    };
  }, [triggerRef]);

  return (
    <section
      ref={revealRef}
      className="click-reveal"
      aria-label="About Rahul"
      aria-hidden="true"
    >
      <span className="reveal-backdrop-text" aria-hidden="true">ABOUT / RAHUL</span>
      <div className="click-reveal-content">{children}</div>
    </section>
  );
}

export default ScrollExpand;

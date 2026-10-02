import { useEffect, useRef } from 'react';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const smoothstep = (start, end, value) => {
  const progress = clamp((value - start) / (end - start), 0, 1);
  return progress * progress * (3 - 2 * progress);
};

function ScrollExpand({ children, triggerRef, pageRef }) {
  const revealRef = useRef(null);

  useEffect(() => {
    const reveal = revealRef.current;
    const trigger = triggerRef.current;
    if (!reveal || !trigger) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let currentProgress = 0;
    let targetProgress = 0;
    let frameId = 0;

    const applyProgress = progress => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const eased = smoothstep(0, 1, progress);
      if (pageRef.current) {
        const pageScale = 1 - eased * 0.035;
        pageRef.current.style.transform = `scale(${pageScale}) rotate(${eased * -1.5}deg)`;
        pageRef.current.style.borderRadius = `${eased * 14}px`;
      }
      trigger.style.setProperty('--stamp-scale', `${1 + eased * 0.12}`);
      const headline = trigger.closest('.hero-line-third');
      headline?.style.setProperty('--headline-scale', `${1 + eased * 0.12}`);
      headline?.style.setProperty('--headline-rotation', `${eased * -180}deg`);
      const origin = trigger.getBoundingClientRect();
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

    updateTarget();
    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
    };
  }, [triggerRef, pageRef]);

  return (
    <section
      ref={revealRef}
      className="click-reveal"
      aria-label="About Rahul"
      aria-hidden="true"
    >
      <div className="click-reveal-content">{children}</div>
    </section>
  );
}

export default ScrollExpand;

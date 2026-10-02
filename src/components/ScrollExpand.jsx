'use client';

import { useEffect, useRef } from 'react';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const smoothstep = (edge0, edge1, value) => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

function ScrollExpand({ children, className = '' }) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const revealRef = useRef(null);
  const logoRef = useRef(null);
  const outlineRef = useRef(null);
  const contentRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const reveal = revealRef.current;
    const logo = logoRef.current;
    const outline = outlineRef.current;
    if (!track || !stage || !reveal || !logo || !outline) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId = 0;
    let current = 0;
    let target = 0;
    let stageHeight = 0;
    let running = false;
    const originX = 0.75;

    const applyProgress = progress => {
      const eased = smoothstep(0, 1, progress);
      const originPx = window.innerWidth * originX;
      const originPy = window.innerHeight / 2;
      const radius = 58 + Math.max(
        Math.hypot(originPx, originPy),
        Math.hypot(window.innerWidth - originPx, originPy),
      ) * 1.08 * eased;
      reveal.style.clipPath = `circle(${radius}px at ${originX * 100}% 50%)`;
      logo.style.left = `${originX * 100}%`;
      logo.style.transform = `translate(-50%, -50%) scale(${1 + eased * 17})`;
      logo.style.opacity = `${1 - smoothstep(0.16, 0.48, progress)}`;
      logo.style.visibility = progress >= 0.5 ? 'hidden' : 'visible';
      outline.style.left = `${originX * 100}%`;
      outline.style.transform = `translate(-50%, -50%) scale(${radius / 58})`;
      outline.style.opacity = `${1 - smoothstep(0.82, 1, progress)}`;
      const shade = Math.round(21 * (1 - eased));
      reveal.style.backgroundColor = `rgb(${shade} ${shade} ${shade})`;
      if (progress === 1) reveal.style.clipPath = `circle(${radius}px at ${originX * 100}% 50%)`;
      if (contentRef.current) {
        contentRef.current.style.opacity = `${smoothstep(0.5, 0.78, progress)}`;
        contentRef.current.style.transform = `translate3d(0, ${24 * (1 - smoothstep(0.5, 0.78, progress))}px, 0)`;
      }
      if (hintRef.current) hintRef.current.style.opacity = `${1 - smoothstep(0, 0.1, progress)}`;
    };

    const measure = () => {
      stageHeight = window.innerHeight;
      stage.style.height = `${stageHeight}px`;
      track.style.height = `${stageHeight * (reduceMotion ? 1 : 2.25)}px`;
    };

    const readProgress = () => {
      if (reduceMotion) return 1;
      const trackTop = track.getBoundingClientRect().top;
      return clamp(-trackTop / (stageHeight * 1.25), 0, 1);
    };

    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) {
        current = target;
        running = false;
      }
      applyProgress(current);
      frameId = running ? requestAnimationFrame(tick) : 0;
    };

    const onScroll = () => {
      target = readProgress();
      if (reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      if (!running) {
        running = true;
        frameId = requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section ref={trackRef} className={`scroll-expand-track ${className}`.trim()} aria-label="About Rahul">
      <div ref={stageRef} className="scroll-expand-stage">
        <div ref={revealRef} className="scroll-expand-reveal">
          <div ref={contentRef} className="scroll-expand-content">
            {children}
          </div>
        </div>
        <div ref={outlineRef} className="scroll-expand-outline" aria-hidden="true" />
        <div ref={logoRef} className="scroll-expand-logo" aria-hidden="true">R</div>
        <p ref={hintRef} className="scroll-expand-hint">Scroll to discover</p>
      </div>
    </section>
  );
}

export default ScrollExpand;

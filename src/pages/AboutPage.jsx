import { useEffect, useRef } from "react";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const smoothstep = (start, end, value) => {
  const progress = clamp((value - start) / (end - start), 0, 1);
  return progress * progress * (3 - 2 * progress);
};

function AboutPage() {
  const scrollRef = useRef(null);
  const titleRef = useRef(null);
  const statementRef = useRef(null);
  const wordRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const title = titleRef.current;
    const statement = statementRef.current;
    const word = wordRef.current;
    if (!scrollContainer || !title || !statement || !word) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateScrollAnimation = () => {
      const progress = clamp(scrollContainer.scrollTop / Math.max(scrollContainer.clientHeight * 1.35, 1), 0, 1);
      const wordProgress = smoothstep(0.04, 0.58, progress);
      const titleProgress = smoothstep(0.28, 0.62, progress);
      const statementProgress = smoothstep(0.48, 0.82, progress);

      word.style.opacity = `${1 - wordProgress}`;
      word.style.transform = reduceMotion
        ? "translate3d(0, -50%, 0)"
        : `translate3d(${-112 * wordProgress}vw, -50%, 0)`;
      title.style.opacity = `${titleProgress}`;
      title.style.transform = reduceMotion ? "none" : `translate3d(${48 * (1 - titleProgress)}px, 0, 0)`;
      statement.style.opacity = `${statementProgress}`;
      statement.style.transform = reduceMotion ? "none" : `translate3d(${-48 * (1 - statementProgress)}px, 0, 0)`;
    };

    updateScrollAnimation();
    scrollContainer.addEventListener("scroll", updateScrollAnimation, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", updateScrollAnimation);
  }, []);

  return (
    <div className="about-scroll" ref={scrollRef} aria-label="About Rahul">
      <div className="about-scroll-track">
        <section className="about-scroll-stage" aria-label="About Rahul">
          <p className="about-word" ref={wordRef} aria-hidden="true">ABOUT</p>
          <div className="about-intro-sequence">
            <h1 className="about-title" ref={titleRef}>Hi, I&apos;m <span>Rahul.</span></h1>
            <p className="about-statement" ref={statementRef}>Good work should feel effortless.</p>
          </div>
          <span className="about-scroll-index" aria-hidden="true">01 <i /> 02</span>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;

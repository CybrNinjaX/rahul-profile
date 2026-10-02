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
  const titleText = "Hi, I'm Rahul.";
  const statementText = "Good work should feel effortless.";

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const title = titleRef.current;
    const statement = statementRef.current;
    const word = wordRef.current;
    if (!scrollContainer || !title || !statement || !word) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateScrollAnimation = () => {
      // Give the intro more scroll distance, then type each line in sequence.
      const progress = reduceMotion ? 1 : clamp(scrollContainer.scrollTop / Math.max(scrollContainer.clientHeight * 2.4, 1), 0, 1);
      const wordProgress = smoothstep(0.03, 0.4, progress);
      const titleProgress = smoothstep(0.3, 0.48, progress);
      const statementProgress = smoothstep(0.58, 0.76, progress);
      const titleFloatProgress = clamp((progress - 0.34) / 0.34, 0, 1);
      const statementFloatProgress = clamp((progress - 0.63) / 0.34, 0, 1);

      word.style.opacity = `${1 - wordProgress}`;
      word.style.transform = reduceMotion
        ? "translate3d(0, -50%, 0)"
        : `translate3d(${-112 * wordProgress}vw, -50%, 0)`;
      title.style.opacity = `${titleProgress}`;
      title.style.transform = reduceMotion ? "none" : `translate3d(${48 * (1 - titleProgress)}px, 0, 0)`;
      [...title.querySelectorAll(".about-type-character")].forEach((character, index, characters) => {
        const stagger = (index / characters.length) * 0.5;
        const characterProgress = smoothstep(stagger, stagger + 0.34, titleFloatProgress);
        character.style.opacity = `${characterProgress}`;
        character.style.transform = `translate3d(0, ${(1 - characterProgress) * 0.7}em, 0)`;
        character.style.filter = `blur(${(1 - characterProgress) * 8}px)`;
      });
      statement.style.opacity = `${statementProgress}`;
      statement.style.transform = reduceMotion ? "none" : `translate3d(${-48 * (1 - statementProgress)}px, 0, 0)`;
      [...statement.querySelectorAll(".about-type-character")].forEach((character, index, characters) => {
        const stagger = (index / characters.length) * 0.5;
        const characterProgress = smoothstep(stagger, stagger + 0.34, statementFloatProgress);
        character.style.opacity = `${characterProgress}`;
        character.style.transform = `translate3d(0, ${(1 - characterProgress) * 0.7}em, 0)`;
        character.style.filter = `blur(${(1 - characterProgress) * 8}px)`;
      });
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
            <h1 className="about-title" ref={titleRef} aria-label={titleText}>
              <span className="about-typed-text" aria-hidden="true">
                {[...titleText].map((character, index) => (
                  <span className={`about-type-character${index > 7 ? " about-name-character" : ""}`} key={`${character}-${index}`}>{character}</span>
                ))}
              </span>
            </h1>
            <p className="about-statement" ref={statementRef} aria-label={statementText}>
              <span className="about-typed-text" aria-hidden="true">
                {[...statementText].map((character, index) => (
                  <span className="about-type-character" key={`${character}-${index}`}>{character}</span>
                ))}
              </span>
            </p>
          </div>
          <span className="about-scroll-index" aria-hidden="true">01 <i /> 02</span>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;

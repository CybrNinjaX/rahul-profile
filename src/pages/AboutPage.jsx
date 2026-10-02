import { useEffect, useRef, useState } from "react";
import TextType from "../components/TextType";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const smoothstep = (start, end, value) => {
  const progress = clamp((value - start) / (end - start), 0, 1);
  return progress * progress * (3 - 2 * progress);
};

/*
  Scroll timeline, measured in viewport heights (vh) of scrollTop:

    0.0 -> 3.4   PHASE 1  "ABOUT" exits, "Hi, I'm Rahul." and the statement animate in
    3.4 -> 4.4   HOLD     nothing changes; the intro block sits fully rendered and stable
    4.4 -> 5.6   PHASE 2  intro exits, details panel appears (a separate scroll action)

  The details typing starts only when ALL of these are true:
    - phase 1 is complete (both lines fully revealed)
    - the user has scrolled past the hold zone into phase 2
    - a short settle delay has passed without the user scrolling back
*/
const INTRO_END = 3.4;
const HOLD_END = 4.4;
const DETAILS_SPAN = 1.2;
const TOTAL_SPAN = HOLD_END + DETAILS_SPAN; // 5.6
const SETTLE_DELAY_MS = 400;

function AboutPage() {
  const scrollRef = useRef(null);
  const titleRef = useRef(null);
  const statementRef = useRef(null);
  const wordRef = useRef(null);
  const introRef = useRef(null);
  const detailsRef = useRef(null);
  const detailsActiveRef = useRef(false);
  const settleTimerRef = useRef(null);
  const [detailsActive, setDetailsActive] = useState(false);
  const titleText = "Hi, I'm Rahul.";
  const statementText = "Good work should feel effortless.";

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const title = titleRef.current;
    const statement = statementRef.current;
    const word = wordRef.current;
    const intro = introRef.current;
    const details = detailsRef.current;
    if (!scrollContainer || !title || !statement || !word || !intro || !details) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealCharacters = (element, floatProgress) => {
      [...element.querySelectorAll(".about-type-character")].forEach((character, index, characters) => {
        const stagger = (index / characters.length) * 0.5;
        const characterProgress = smoothstep(stagger, stagger + 0.34, floatProgress);
        character.style.opacity = `${characterProgress}`;
        character.style.transform = `translate3d(0, ${(1 - characterProgress) * 0.7}em, 0)`;
        character.style.filter = `blur(${(1 - characterProgress) * 8}px)`;
      });
    };

    const clearSettleTimer = () => {
      if (settleTimerRef.current) {
        clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
      }
    };

    const updateScrollAnimation = () => {
      const vh = Math.max(scrollContainer.clientHeight, 1);
      const scrollTop = scrollContainer.scrollTop;

      // ---------- PHASE 1: intro sequence ----------
      const progress = reduceMotion ? 1 : clamp(scrollTop / (vh * INTRO_END), 0, 1);

      const wordProgress = smoothstep(0.0, 0.3, progress);
      const titleProgress = smoothstep(0.35, 0.52, progress);
      const titleFloatProgress = clamp((progress - 0.38) / 0.3, 0, 1);
      const statementProgress = smoothstep(0.58, 0.75, progress);
      const statementFloatProgress = clamp((progress - 0.61) / 0.3, 0, 1);

      word.style.opacity = `${1 - wordProgress}`;
      word.style.transform = reduceMotion
        ? "translate3d(0, -50%, 0)"
        : `translate3d(${-120 * wordProgress}vw, -50%, 0)`;

      title.style.opacity = `${titleProgress}`;
      title.style.transform = reduceMotion ? "none" : `translate3d(${48 * (1 - titleProgress)}px, 0, 0)`;
      revealCharacters(title, titleFloatProgress);

      statement.style.opacity = `${statementProgress}`;
      statement.style.transform = reduceMotion ? "none" : `translate3d(${-48 * (1 - statementProgress)}px, 0, 0)`;
      revealCharacters(statement, statementFloatProgress);

      // The intro is "stable" once both lines are completely revealed.
      const introStable = statementFloatProgress >= 1 && titleFloatProgress >= 1;

      // ---------- PHASE 2: details (separate scroll action after the hold zone) ----------
      const detailsScroll = clamp((scrollTop - vh * HOLD_END) / (vh * DETAILS_SPAN), 0, 1);
      const introExit = smoothstep(0.0, 0.4, detailsScroll);
      const detailsProgress = smoothstep(0.3, 0.8, detailsScroll);

      intro.style.opacity = `${1 - introExit}`;
      intro.style.transform = reduceMotion ? "none" : `translate3d(0, ${-32 * introExit}px, 0)`;

      details.style.opacity = `${detailsProgress}`;
      details.style.transform = `translate3d(0, ${reduceMotion ? 0 : 36 * (1 - detailsProgress)}px, 0)`;
      details.style.pointerEvents = detailsProgress > 0.95 ? "auto" : "none";

      // ---------- Typing trigger ----------
      const wantsDetails = introStable && detailsProgress > 0.1;

      if (wantsDetails && !detailsActiveRef.current && !settleTimerRef.current) {
        // Let the layout settle briefly before the typing begins.
        settleTimerRef.current = setTimeout(() => {
          settleTimerRef.current = null;
          detailsActiveRef.current = true;
          setDetailsActive(true);
        }, SETTLE_DELAY_MS);
      } else if (!wantsDetails && detailsProgress < 0.03) {
        // User scrolled back: cancel any pending start and reset so it can replay.
        clearSettleTimer();
        if (detailsActiveRef.current) {
          detailsActiveRef.current = false;
          setDetailsActive(false);
        }
      }
    };

    updateScrollAnimation();
    scrollContainer.addEventListener("scroll", updateScrollAnimation, { passive: true });
    return () => {
      scrollContainer.removeEventListener("scroll", updateScrollAnimation);
      clearSettleTimer();
    };
  }, []);

  return (
    <div className="about-scroll" ref={scrollRef} aria-label="About Rahul">
      {/* Track height matches the timeline above (TOTAL_SPAN viewports of scrolling + the sticky stage itself). */}
      <div className="about-scroll-track" style={{ height: `${(TOTAL_SPAN + 1) * 100}%` }}>
        <section className="about-scroll-stage" aria-label="About Rahul">
          <p className="about-word" ref={wordRef} aria-hidden="true">ABOUT</p>
          <div className="about-intro-sequence" ref={introRef}>
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
          <section className="about-details" ref={detailsRef} aria-label="A little about my work">
            <p className="about-details-label">
              <TextType text="A LITTLE ABOUT MY WORK" active={detailsActive} typingSpeed={36} />
            </p>
            <div className="about-details-copy">
              <TextType
                text="I build thoughtful digital experiences with clear interfaces, responsive layouts, and purposeful interactions."
                active={detailsActive}
                initialDelay={550}
                typingSpeed={22}
              />
            </div>
            <div className="about-keywords" aria-label="Areas of focus">
              {["Frontend development", "React", "Interface animation", "Responsive design"].map((keyword, index) => (
                <span className="about-keyword" key={keyword}>
                  <i>0{index + 1}</i>
                  <TextType text={keyword} active={detailsActive} initialDelay={2800 + index * 430} typingSpeed={32} />
                </span>
              ))}
            </div>
          </section>
          <span className="about-scroll-index" aria-hidden="true">01 <i /> 02</span>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
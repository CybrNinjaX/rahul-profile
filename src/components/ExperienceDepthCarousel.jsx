import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, BadgeCheck } from "lucide-react";

const experiences = [
  {
    role: "Software Engineer",
    company: "Thasai Technologies Private Limited",
    type: "Full-time",
    dates: "Apr 2026 - Jun 2026",
    duration: "3 mos",
    location: "Tamil Nadu, India",
    workMode: "On-site",
    skills: "TypeScript, MySQL and +1 skill",
    brand: "thasai",
    mark: "TT",
  },
  {
    role: "API Testing",
    company: "NADAL Business Services",
    type: "Internship",
    dates: "Jan 2026 - Mar 2026",
    duration: "3 mos",
    location: "Thisaiyanvilai",
    workMode: "On-site",
    skills: "API Testing",
    brand: "nadal",
    mark: "NBS",
  },
  {
    role: "Software Engineer",
    company: "astraval",
    type: "Internship",
    dates: "May 2025 - Jun 2025",
    duration: "2 mos",
    location: "Thisaiyanvilai, Tamil Nadu, India",
    workMode: "On-site",
    skills: "Java Development and Front-End Development",
    brand: "astraval",
    mark: "A",
  },
];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const smoothstep = (start, end, value) => {
  const progress = clamp((value - start) / (end - start), 0, 1);
  return progress * progress * (3 - 2 * progress);
};

const INITIAL_POSITION = experiences.length * 2;

function ExperienceDepthCarousel({ scrollContainerRef }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const overlayRefs = useRef([]);
  const layoutCardsRef = useRef(() => {});
  const positionRef = useRef(INITIAL_POSITION);
  const activeRef = useRef(0);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const normalizePosition = position => {
    let normalized = position;
    while (normalized < experiences.length) normalized += experiences.length;
    while (normalized > experiences.length * 4 - 1) normalized -= experiences.length;
    return normalized;
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    const section = sectionRef.current;
    const stage = stageRef.current;
    const title = titleRef.current;
    if (!container || !section || !stage || !title) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const updateCards = position => {
      const width = stage.clientWidth;
      const cardWidth = cardRefs.current.find(Boolean)?.offsetWidth || 360;
      const spread = Math.max(42, Math.min(92, width * 0.075));
      const depth = Math.max(130, Math.min(250, width * 0.19));
      const scale = clamp((width - 36) / (cardWidth + spread * 2), 0.5, 1);

      cardRefs.current.forEach((card, virtualIndex) => {
        if (!card) return;
        const distance = virtualIndex - position;
        const behind = Math.max(0, distance);
        const absoluteDistance = Math.abs(distance);
        const isVisible = absoluteDistance <= 3.5;
        const opacity = !isVisible ? 0 : distance < 0 ? Math.max(0, 1 + distance) : 1;

        card.style.transform = `translate(-50%, -50%) scale(${scale}) translateX(${(spread * distance).toFixed(2)}px) translateZ(${(-depth * distance).toFixed(2)}px) rotateY(${(22 * clamp(distance, 0, 1)).toFixed(2)}deg)`;
        card.style.opacity = opacity.toFixed(3);
        card.style.filter = `brightness(${Math.max(0.28, 1 - behind * 0.19).toFixed(3)}) blur(${Math.min(5, behind * 1.25).toFixed(2)}px)`;
        card.style.zIndex = String(Math.round(2000 - distance * 20));
        card.style.pointerEvents = isVisible && opacity > 0.05 ? "auto" : "none";
        card.setAttribute("aria-hidden", String(absoluteDistance > 0.5));

        const overlay = overlayRefs.current[virtualIndex];
        if (overlay) overlay.style.opacity = clamp(behind * 0.2, 0, 0.7).toFixed(3);
      });

      const nextIndex = ((Math.round(position) - INITIAL_POSITION) % experiences.length + experiences.length) % experiences.length;
      if (nextIndex !== activeRef.current) {
        activeRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };
    layoutCardsRef.current = updateCards;

    const updateFromPageScroll = () => {
      const viewportHeight = Math.max(window.innerHeight, 1);
      const progress = clamp((container.scrollTop - section.offsetTop) / viewportHeight, 0, experiences.length + 1);
      const coverProgress = smoothstep(0, 1, progress);
      const carouselProgress = clamp((progress - 1) * ((experiences.length - 1) / experiences.length), 0, experiences.length - 1);

      title.style.transform = reduceMotion
        ? "translate3d(-50%, -50%, 0)"
        : `translate3d(calc(-50% + ${coverProgress * 200 - 100}vw), -50%, 0)`;
      section.style.setProperty("--cover-opacity", `${1 - smoothstep(0.82, 1, progress)}`);
      positionRef.current = INITIAL_POSITION + carouselProgress;
      updateCards(positionRef.current);
    };

    updateFromPageScroll();
    container.addEventListener("scroll", updateFromPageScroll, { passive: true });
    window.addEventListener("resize", updateFromPageScroll);
    const resizeObserver = new ResizeObserver(updateFromPageScroll);
    resizeObserver.observe(stage);
    return () => {
      container.removeEventListener("scroll", updateFromPageScroll);
      window.removeEventListener("resize", updateFromPageScroll);
      resizeObserver.disconnect();
      layoutCardsRef.current = () => {};
    };
  }, [scrollContainerRef]);

  const navigateBy = step => {
    positionRef.current = normalizePosition(positionRef.current + step);
    layoutCardsRef.current(positionRef.current);
  };

  const onPointerDown = event => {
    if (event.button !== 0) return;
    dragRef.current = { x: event.clientX, position: positionRef.current, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = event => {
    const drag = dragRef.current;
    const stage = stageRef.current;
    if (!drag || !stage) return;
    const delta = event.clientX - drag.x;
    if (Math.abs(delta) < 4 && !drag.moved) return;
    drag.moved = true;
    positionRef.current = drag.position - delta / Math.max(stage.clientWidth * 0.42, 140);
    layoutCardsRef.current(positionRef.current);
  };

  const finishPointer = () => {
    if (!dragRef.current) return;
    const moved = dragRef.current.moved;
    dragRef.current = null;
    if (moved) {
      positionRef.current = normalizePosition(Math.round(positionRef.current));
      suppressClickRef.current = true;
      layoutCardsRef.current(positionRef.current);
      window.setTimeout(() => { suppressClickRef.current = false; }, 0);
    }
  };

  const onKeyDown = event => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigateBy(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      navigateBy(1);
    }
  };

  const cards = Array.from({ length: experiences.length * 5 }, (_, virtualIndex) => {
    const itemIndex = virtualIndex % experiences.length;
    const item = experiences[itemIndex];
    return (
      <article
        className="experience-depth-card"
        data-brand={item.brand}
        key={virtualIndex}
        ref={element => { cardRefs.current[virtualIndex] = element; }}
        role="group"
        aria-roledescription="slide"
        aria-label={`${item.role} at ${item.company}`}
        aria-hidden={virtualIndex !== INITIAL_POSITION}
        onClick={() => {
          if (suppressClickRef.current) {
            suppressClickRef.current = false;
            return;
          }
          positionRef.current = normalizePosition(virtualIndex);
          layoutCardsRef.current(positionRef.current);
        }}
      >
        <div className="experience-depth-card-topline">
          <span className="experience-company-mark" aria-hidden="true">{item.mark}</span>
          <span>{String(itemIndex + 1).padStart(2, "0")} / 03</span>
        </div>
        <p className="experience-depth-type">{item.type}</p>
        <h3>{item.role}</h3>
        <p className="experience-depth-company">{item.company}</p>
        <div className="experience-depth-details">
          <p>{item.dates} <span>· {item.duration}</span></p>
          <p>{item.location} <span>· {item.workMode}</span></p>
        </div>
        <p className="experience-depth-skills"><BadgeCheck size={15} aria-hidden="true" />{item.skills}</p>
        <span className="experience-depth-tint" ref={element => { overlayRefs.current[virtualIndex] = element; }} aria-hidden="true" />
      </article>
    );
  });

  return (
    <section className="experience-scroll" ref={sectionRef} aria-labelledby="experience-title">
      <div className="experience-stage" ref={stageRef}>
        <div className="experience-cover">
          <p className="experience-cover-number">03</p>
          <h2 id="experience-title" ref={titleRef}>Experience</h2>
          <p className="experience-cover-subtitle">Where I’ve worked.</p>
          <span className="experience-scroll-prompt"><ArrowDown size={14} /> Scroll to explore</span>
        </div>
        <div
          className="experience-depth-stage"
          role="group"
          aria-roledescription="carousel"
          aria-label="Work experience"
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishPointer}
          onPointerCancel={finishPointer}
          onKeyDown={onKeyDown}
        >
          {cards}
          <button className="experience-depth-control experience-depth-previous" type="button" onClick={() => navigateBy(-1)} aria-label="Previous experience">
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button className="experience-depth-control experience-depth-next" type="button" onClick={() => navigateBy(1)} aria-label="Next experience">
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          <div className="experience-depth-indicators" role="group" aria-label="Choose experience">
            {experiences.map((item, index) => (
              <button
                type="button"
                key={item.company}
                aria-label={`Show ${item.role} at ${item.company}`}
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => {
                  const delta = ((index - activeIndex + experiences.length) % experiences.length);
                  navigateBy(delta > experiences.length / 2 ? delta - experiences.length : delta);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceDepthCarousel;

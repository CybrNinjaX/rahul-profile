import { useEffect, useRef, useState } from "react";
import ScrollExpand from "../components/ScrollExpand";
import SplashCursor from "../components/SplashCursor";
import GlassIcon from "../components/GlassIcon";
import AboutPage from "./AboutPage";
import WorksPage from "./WorksPage";

function HomePage() {
  const revealTriggerRef = useRef(null);
  const aboutScrollRef = useRef(null);
  const revealScrollRef = useRef(null);
  const worksRef = useRef(null);
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    const revealContainer = revealScrollRef.current;
    const updateActivePage = () => {
      if (revealScrollRef.current?.scrollTop > window.innerHeight * 0.5) {
        setActivePage("works");
      } else {
        setActivePage(window.scrollY > window.innerHeight * 0.35 ? "about" : "home");
      }
    };
    updateActivePage();
    window.addEventListener("scroll", updateActivePage, { passive: true });
    revealContainer?.addEventListener("scroll", updateActivePage, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActivePage);
      revealContainer?.removeEventListener("scroll", updateActivePage);
    };
  }, []);

  const navigateHome = event => {
    event.preventDefault();
    aboutScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateAbout = () => {
    revealScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    aboutScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  const navigateWorks = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
    let attempts = 0;
    const scrollToWorks = () => {
      const reveal = revealScrollRef.current;
      if (!reveal) return;
      if (reveal.clientHeight >= window.innerHeight * 0.99) {
        const worksStart = worksRef.current?.offsetTop ?? window.innerHeight;
        reveal.scrollTo({ top: worksStart + window.innerHeight * 0.6, behavior: "smooth" });
      } else if (attempts < 120) {
        attempts += 1;
        window.requestAnimationFrame(scrollToWorks);
      }
    };
    window.requestAnimationFrame(scrollToWorks);
  };

  return (
    <div className="app-root">
      <SplashCursor
        RAINBOW_MODE={false}
        COLOR="#ffffff"
        DYE_RESOLUTION={768}
        DENSITY_DISSIPATION={2.5}
        SPLAT_RADIUS={0.35}
      />
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Rahul, also known as CybrNinjaX, home">CybrNinjaX<span>.</span></a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#home" onClick={navigateHome} aria-current={activePage === "home" ? "page" : undefined}><span className="nav-marker" aria-hidden="true" />Home</a>
          <button className="nav-about" type="button" onClick={navigateAbout} aria-current={activePage === "about" ? "page" : undefined}><span className="nav-marker" aria-hidden="true" />About</button>
          <button className="nav-works" type="button" onClick={navigateWorks} aria-current={activePage === "works" ? "page" : undefined}><span className="nav-marker" aria-hidden="true" />Works</button>
          <a className="nav-contact" href="#contact"><span className="nav-marker" aria-hidden="true" />Start a project <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main className="home-page" id="home">
        <section className="hero" aria-labelledby="hero-title">
          <p className="hero-note">An independent frontend developer building thoughtful digital experiences with clarity, care, and a little character.</p>
          <div className="hero-copy">
            <p className="eyebrow"><span className="availability-dot" /> Independent developer · Available for projects</p>
            <h1 id="hero-title">
              <span className="hero-line hero-line-first">Building</span>
              <span className="hero-line hero-line-second">Tomorrow</span>
              <span className="hero-line hero-line-third" aria-label="For Today">
                <span>For</span>
                <span ref={revealTriggerRef} className="hero-stamp" aria-hidden="true"><GlassIcon className="hero-stamp-icon" /></span>
                <span>Today</span>
              </span>
            </h1>
          </div>
        </section>

        <div className="hero-divider" aria-hidden="true"><span /></div>
      </main>

      <div className="scroll-runway" aria-hidden="true" />
      <ScrollExpand triggerRef={revealTriggerRef} scrollRef={revealScrollRef}>
        <AboutPage scrollRef={aboutScrollRef} />
        <WorksPage scrollContainerRef={revealScrollRef} worksRef={worksRef} />
      </ScrollExpand>
    </div>
  );
}

export default HomePage;

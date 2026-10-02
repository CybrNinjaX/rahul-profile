import { useRef } from "react";
import ScrollExpand from "../components/ScrollExpand";
import SplashCursor from "../components/SplashCursor";
import GlassIcon from "../components/GlassIcon";

function HomePage() {
  const revealTriggerRef = useRef(null);
  const pageRef = useRef(null);

  return (
    <div className="app-root">
      <SplashCursor
        RAINBOW_MODE={false}
        COLOR="#ffffff"
        DYE_RESOLUTION={768}
        DENSITY_DISSIPATION={2.5}
        SPLAT_RADIUS={0.35}
      />
      <main ref={pageRef} className="home-page">
        <header className="site-header">
          <a className="wordmark" href="#home" aria-label="Rahul, also known as CybrNinjaX, home">CybrNinjaX<span>.</span></a>
          <nav className="site-nav" aria-label="Main navigation">
            <a href="#home"><span className="nav-marker" aria-hidden="true" />Home</a>
            <a className="nav-contact" href="#contact"><span className="nav-marker" aria-hidden="true" />Start a project <span aria-hidden="true">↗</span></a>
          </nav>
        </header>

        <section className="hero" id="home" aria-labelledby="hero-title">
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
      <ScrollExpand triggerRef={revealTriggerRef} pageRef={pageRef}>
        <section className="intro-section scroll-expand-about" id="about">
          <p className="section-label">A little about me</p>
          <p className="intro-copy">Good digital work should feel <em>simple to use</em> and <em>worth remembering.</em> That&apos;s the idea I bring to every project.</p>
        </section>
        <footer className="site-footer" id="contact">
          <span>Have something good in mind?</span>
          <a href="mailto:hello@cybrninjax.dev">Start a conversation <span aria-hidden="true">↗</span></a>
        </footer>
      </ScrollExpand>
    </div>
  );
}

export default HomePage;

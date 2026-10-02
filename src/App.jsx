import SplashCursor from "./components/SplashCursor";
import ScrollExpand from "./components/ScrollExpand";

function App() {
  return (
    <div className="app-root">
      <SplashCursor
        RAINBOW_MODE={false}
        COLOR="#ffffff"
        DYE_RESOLUTION={768}
        DENSITY_DISSIPATION={2.5}
        SPLAT_RADIUS={0.35}
      />
      <main className="home-page">
        <header className="site-header">
          <a className="wordmark" href="#home" aria-label="Rahul, also known as CybrNinjaX, home">CybrNinjaX<span>.</span></a>
          <nav className="site-nav" aria-label="Main navigation">
            <a href="#about"><span className="nav-marker" aria-hidden="true" />About</a>
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
              <span className="hero-line hero-line-third">For <span className="hero-stamp" aria-label="Rahul, digital builder"><span>R.</span><small>Digital<br />builder</small></span> Today</span>
            </h1>
          </div>
          <a className="text-link" href="#about">Scroll to explore <span aria-hidden="true">↓</span></a>
        </section>

        <div className="hero-divider" aria-hidden="true"><span /></div>

        <ScrollExpand>
          <section className="intro-section scroll-expand-about" id="about">
            <p className="section-label">A little about me</p>
            <p className="intro-copy">Good digital work should feel <em>simple to use</em> and <em>worth remembering.</em> That&apos;s the idea I bring to every project.</p>
          </section>
        </ScrollExpand>

        <footer className="site-footer" id="contact">
          <span>Have something good in mind?</span>
          <a href="#home">Back to top <span aria-hidden="true">↗</span></a>
        </footer>
      </main>
    </div>
  );
}

export default App;
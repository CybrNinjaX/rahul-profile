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
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="availability-dot" /> Frontend developer</p>
          <h1 id="hero-title">Making the web feel <span>more human.</span></h1>
          <div className="hero-bottom">
            <p className="hero-summary">I build thoughtful digital experiences with clarity, care, and a little character.</p>
            <a className="text-link" href="#about">Scroll to explore <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <ScrollExpand>
        <section className="intro-section scroll-expand-about" id="about">
          <p className="section-label">A little about me</p>
          <p className="intro-copy">Good digital work should feel <em>simple to use</em> and <em>worth remembering.</em> That&apos;s the idea I bring to every project.</p>
        </section>
      </ScrollExpand>

      </main>
    </div>
  );
}

export default App;
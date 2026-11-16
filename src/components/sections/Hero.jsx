import EchoText from '../animations/EchoText.jsx'
import GlowCursor from '../animations/GlowCursor.jsx'

export default function Hero() {
  return (
<section className="hero" id="home" aria-labelledby="hero-title">
            <GlowCursor
              className="hero-glow-cursor"
              color="#a98aff"
              secondaryColor="#70e8db"
              intensity={0.8}
              trailWidth={1.8}
              quality="medium"
              clickBurst={false}
              aria-hidden="true"
            />
            <div className="hero-atmosphere" aria-hidden="true">
              <div className="hero-model-glow" />
              <div className="hero-model-ring" />
              <div className="hero-ground-shadow" />
              {['React', 'AI', 'API', '3D', 'JS', 'ML', '∞', '<>'].map((label, index) => (
                <span className={`hero-tech-chip hero-tech-chip-${index + 1}`} key={label}>
                  {label}
                </span>
              ))}
              <span className="hero-code hero-code-one">const ideas = build(&amp;&amp; ship)</span>
              <span className="hero-code hero-code-two">&lt;Future /&gt;</span>
              <span className="hero-code hero-code-three">001101 · create · 001010</span>
              <span className="hero-code hero-code-four">model → refine → print</span>
              <span className="hero-code hero-code-five">while (curious) {'{'} learn() {'}'}</span>
              <span className="hero-code hero-code-six">npm run build</span>
            </div>
            <div className="hero-inner">
              <div className="hero-intro">
                <div className="hero-copy reveal-on-scroll">
                  <p className="availability">
                    <span className="dot" /> Available for freelance work
                  </p>

                  <h1 id="hero-title">
                    <span className="h1-hi">
                      <EchoText
                        text="Rahul"
                        className="hero-name-echo"
                        echoes={7}
                        offset={20}
                        tint="#a98aff"
                        mode="both"
                        trail="auto"
                        clickBurst={false}
                      />
                      <span className="hero-period">.</span>
                    </span>
                  </h1>

                  <p className="hero-role"><span>Full-Stack Developer</span><i aria-hidden="true" /></p>
                  <p className="hero-summary">
                    AI / ML enthusiast
                    <br />
                    3D modeling &amp; printing nerd
                  </p>

                  <div className="hero-actions">
                    <a className="btn btn-primary" href="#projects">
                      View my work ↗
                    </a>
                    <a className="btn btn-ghost" href="#contact">
                      Let's talk →
                    </a>
                  </div>
                </div>

                <div className="hero-value-grid reveal-on-scroll" aria-label="What I bring">
                  <article className="hero-value-card">
                    <span>01 / ENGINEERING</span>
                    <h2>Full-stack</h2>
                    <p>From product interface to production API.</p>
                  </article>
                  <article className="hero-value-card">
                    <span>02 / INTELLIGENCE</span>
                    <h2>Applied AI</h2>
                    <p>Useful machine learning and automation.</p>
                  </article>
                  <article className="hero-value-card">
                    <span>03 / IMAGINATION</span>
                    <h2>Creative tech</h2>
                    <p>3D, mobile, and thoughtful digital work.</p>
                  </article>
                </div>
              </div>
            </div>

            <a className="scroll-cue" href="#about" aria-label="Scroll to about">
              <span className="scroll-line" aria-hidden="true" />
              Scroll to explore
            </a>
          </section>
  )
}

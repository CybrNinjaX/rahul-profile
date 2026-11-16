import EchoText from '../animations/EchoText.jsx'

export default function Hero() {
  return (
<section className="hero" id="home" aria-labelledby="hero-title">
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
                        fontSize="inherit"
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

                  <p className="hero-role">
                    <span>Full-Stack Developer</span>
                    <i aria-hidden="true" />
                  </p>
                  <p className="hero-summary">
                    I build useful web products, explore applied AI, and bring ideas into the
                    physical world through 3D modeling and printing.
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

              </div>
            </div>

            <a className="scroll-cue" href="#about" aria-label="Scroll to about">
              <span className="scroll-line" aria-hidden="true" />
              Scroll to explore
            </a>
          </section>
  )
}

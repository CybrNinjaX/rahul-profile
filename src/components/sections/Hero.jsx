import EchoText from '../animations/EchoText.jsx'

export default function Hero() {
  return (
<section className="hero" id="home" aria-labelledby="hero-title">
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

                  <p className="hero-role">Full-Stack Developer</p>
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

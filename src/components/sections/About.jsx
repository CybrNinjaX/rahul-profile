import ParticleText from '../animations/ParticleText.jsx'
import StrokeText from '../animations/StrokeText.jsx'

export default function About() {
  return (
<section className="content-section" id="about">
            <div className="section-wrap">
              <div className="section-heading about-heading">
                <p className="section-label">01 <span>/</span> ABOUT</p>
                <h2><StrokeText text="A little about me" strokeColor="#35DFFF" strokeWidth={1.4} drawDuration={1.6} fillDelay={0.2} stagger={0.05} trigger="mount" fillMode="wipe" wipeFrom="left" fontSize="clamp(2.25rem, 4.4vw, 3.3rem)" fontWeight={700} letterSpacing={-2} hoverRedraw /></h2>
              </div>
              <div className="about-grid">
                <div className="about-text reveal-on-scroll">
                  <p>
                    I'm <strong>cybrninjaX</strong>, a full-stack developer and AI/ML enthusiast. I
                    enjoy building web and mobile applications, AI-powered solutions, automation
                    tools, and 3D models.
                  </p>
                  <p>
                    I like turning ideas into practical projects, learning new technologies, and
                    making software that solves real problems.
                  </p>
                </div>
                <div className="about-particle-wrap reveal-on-scroll">
                  <ParticleText
                    text="Build with curiosity"
                    particleSize={2}
                    density={4}
                    color="currentColor"
                    highlightColor="#35dfff"
                    highlightMode="motion"
                    shape="circle"
                    intro="gather"
                    scatter={180}
                    gatherDuration={1600}
                    stagger={420}
                    clickBurst
                    burstStrength={1}
                    pointerRepel={40}
                    repelRadius={120}
                    idleDrift={0.7}
                    trigger="hover"
                    fontSize="clamp(2rem, 3vw, 3.4rem)"
                    fontWeight={800}
                    fontFamily="inherit"
                    glow
                  />
                  <span>Move your cursor through the words</span>
                </div>
                <div className="about-cards reveal-on-scroll">
                  <div className="about-card">
                    <span>🚀</span>
                    <h4>Fast Delivery</h4>
                    <p>Clean, production-ready code shipped on time.</p>
                  </div>
                  <div className="about-card">
                    <span>🧠</span>
                    <h4>AI-Powered</h4>
                    <p>Integrating modern AI into practical solutions.</p>
                  </div>
                  <div className="about-card">
                    <span>📐</span>
                    <h4>Clean Design</h4>
                    <p>Pixel-perfect UIs that work on every device.</p>
                  </div>
                  <div className="about-card">
                    <span>🔧</span>
                    <h4>Full-Stack</h4>
                    <p>From database to deployment, end to end.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
  )
}

import ParticleText from '../animations/ParticleText.jsx'
import StrokeText from '../animations/StrokeText.jsx'

export default function About() {
  return (
<section className="content-section" id="about">
            <div className="section-wrap">
              <div className="section-heading about-heading">
                <p className="section-label">01 <span>/</span> ABOUT</p>
                <h2><StrokeText text="A little about me" strokeColor="#b89cff" strokeWidth={1.4} drawDuration={1.6} fillDelay={0.2} stagger={0.05} trigger="mount" fillMode="wipe" wipeFrom="left" fontSize="clamp(2.25rem, 4.4vw, 3.3rem)" fontWeight={700} letterSpacing={-2} hoverRedraw /></h2>
              </div>
              <div className="about-grid">
                <div className="about-text reveal-on-scroll">
                  <p>
                    I'm Rahul, also known as <strong>cybrninjaX</strong>. I build full-stack web
                    and mobile applications, and explore applied AI, automation, and 3D modeling.
                  </p>
                  <p>
                    I enjoy the full process: understanding a problem, shaping the experience,
                    building the system, and refining it into something people can use.
                  </p>
                </div>
                <div className="about-particle-wrap reveal-on-scroll">
                  <ParticleText
                    text="Build with curiosity"
                    particleSize={2}
                    density={4}
                    color="currentColor"
                    highlightColor="#bdff83"
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
                  <span>Move through the words to scatter the particles</span>
                </div>
                <div className="about-cards reveal-on-scroll">
                  <div className="about-card">
                    <span>🚀</span>
                    <h4>Fast Delivery</h4>
                    <p>Focused implementation, clear progress, and practical releases.</p>
                  </div>
                  <div className="about-card">
                    <span>🧠</span>
                    <h4>AI-Powered</h4>
                    <p>Exploring where machine learning can improve everyday workflows.</p>
                  </div>
                  <div className="about-card">
                    <span>📐</span>
                    <h4>Clean Design</h4>
                    <p>Careful interfaces with readable layouts across screen sizes.</p>
                  </div>
                  <div className="about-card">
                    <span>🔧</span>
                    <h4>Full-Stack</h4>
                    <p>Connecting user interfaces, APIs, data, and deployment.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
  )
}

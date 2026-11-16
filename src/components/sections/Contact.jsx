import profileImage from '../../assets/images/image.png'
import LaserFlow from '../animations/LaserFlow.jsx'
import Footer from '../layout/Footer.jsx'

export default function Contact() {
  return (
<section className="contact-section" id="contact">
            <div className="contact-laser" aria-hidden="true">
              <LaserFlow
                color="#a98aff"
                intensity={0.55}
                beamWidth={1.1}
                speed={0.7}
                fog={0.08}
                dust={0.5}
                streaks={0.7}
                dots={0.35}
                pulse={0.7}
                mouseInteraction={false}
              />
            </div>
            <div className="contact-portrait" aria-hidden="true">
              <img
                className="contact-portrait-image"
                src={profileImage}
                alt=""
                loading="lazy"
              />
              <div className="contact-portrait-shade" />
            </div>

            <div className="section-wrap">
              <div className="contact-inner reveal-on-scroll">
                <div className="contact-left">
                  <p className="section-label">
                    06 <span>/</span> CONTACT
                  </p>
                  <h2>
                    Have a project
                    <br />
                    in mind?
                  </h2>
                  <p className="contact-intro">
                    I'm always happy to talk about good ideas and interesting work. Drop me a
                    message and I'll get back to you.
                  </p>
                  <a className="btn btn-primary" href="mailto:rahul63794@gmail.com">
                    Say hello ↗
                  </a>
                </div>

                <div className="contact-right">
                  <a className="contact-email" href="mailto:rahul63794@gmail.com">
                    rahul63794@gmail.com
                  </a>
                  <div className="social-links">
                    <a
                      href="https://github.com/CybrNinjaX"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/rahul-77a46b273"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://www.instagram.com/rahul_zeronex___"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                    <a href="mailto:rahul63794@gmail.com">Email</a>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </section>
  )
}

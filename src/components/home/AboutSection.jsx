import { ArrowUpRight } from "lucide-react";

function AboutSection() {
	return (
		<section className="profile-section profile-about" id="about" aria-labelledby="about-title">
			<div className="profile-section-heading">
				<p className="profile-section-label"><span>01</span> A little about me</p>
				<h2 id="about-title">From a rough idea<br />to something <em>real.</em></h2>
			</div>
			<div className="profile-about-copy">
				<p>Technology has always pulled me toward the next question: can this be built, made simpler, or made useful to someone?</p>
				<p>I like moving from a quick prototype to a working system, then learning from the people who use it. Sometimes that system stays on screen. Sometimes it becomes a physical print.</p>
				<a className="profile-inline-link" href="https://github.com/AgileSecDev" target="_blank" rel="noreferrer">Find me on GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>
			</div>
		</section>
	);
}

export default AboutSection;

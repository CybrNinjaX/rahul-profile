function HeroSection() {
	return (
		<>
			<section className="profile-hero" aria-labelledby="profile-title">
				<div className="profile-hero-copy">
					<p className="profile-eyebrow"><span /> Independent developer <i /> India</p>
					<h1 id="profile-title">Build things<br />that <em>matter.</em></h1>
					<p className="profile-lede">I’m Rahul, also known as <strong>cybrninjaX</strong>. I build across full-stack software, applied AI, automation, and generative 3D.</p>
				</div>
			</section>
			<div className="profile-ribbon" aria-label="Areas of work">
				<span>Software</span><i /><span>Machine learning</span><i /><span>Automation</span><i /><span>3D printing</span>
			</div>
		</>
	);
}

export default HeroSection;

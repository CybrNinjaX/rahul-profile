import { focusAreas } from "../../data/homePageData";

function WorkSection() {
	return (
		<section className="profile-section profile-focus" id="work" aria-labelledby="work-title">
			<div className="profile-section-heading profile-focus-heading">
				<p className="profile-section-label"><span>02</span> Areas of work</p>
				<h2 id="work-title">Many ways to build.<br /><em>One curious mind.</em></h2>
			</div>
			<div className="profile-focus-grid">
				{focusAreas.map(({ number, icon: Icon, title, copy }) => (
					<article className="profile-focus-item" data-motion-reveal key={number}>
						<div className="profile-focus-topline"><span>{number}</span><Icon size={19} strokeWidth={1.5} aria-hidden="true" /></div>
						<h3>{title}</h3>
						<p>{copy}</p>
					</article>
				))}
			</div>
		</section>
	);
}

export default WorkSection;

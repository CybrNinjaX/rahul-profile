import { workflowSteps } from "../../data/homePageData";

function ExperienceSection() {
	return (
		<section className="profile-process" id="experience" aria-labelledby="process-title">
			<div className="profile-process-heading">
				<p className="profile-section-label"><span>04</span> How I build</p>
				<h2 id="process-title">Make it useful.<br /><em>Make it real.</em></h2>
			</div>
			<ol className="profile-process-steps">
				{workflowSteps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}
			</ol>
			<p className="profile-process-note">For 3D projects, the last mile can mean Blender, a slicer, and a print on my Bambu Lab A1.</p>
		</section>
	);
}

export default ExperienceSection;

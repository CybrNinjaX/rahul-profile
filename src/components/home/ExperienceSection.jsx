import { workflowSteps } from "../../data/homePageData";
import CrystalizedBall from "./CrystalizedBall";

function ExperienceSection() {
	return (
		<section className="profile-process" id="experience" aria-labelledby="process-title" data-motion-reveal>
			<div className="profile-process-heading" data-motion-reveal>
				<p className="profile-section-label"><span>04</span> How I build</p>
				<h2 id="process-title">Make it useful.<br /><em>Make it real.</em></h2>
			</div>
			<figure className="profile-process-orb" aria-label="Interactive pink crystalline plasma orb">
				<CrystalizedBall
					preset="plasma"
					color="#F25BD0"
					size={0.7}
					crackle={0.85}
					fill={0.5}
					interactive
					hoverStrength={0.7}
				/>
			</figure>
			<ol className="profile-process-steps">
				{workflowSteps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}
			</ol>
			<p className="profile-process-note">For 3D projects, the last mile can mean Blender, a slicer, and a print on my Bambu Lab A1.</p>
		</section>
	);
}

export default ExperienceSection;

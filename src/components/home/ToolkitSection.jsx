import { toolGroups } from "../../data/homePageData";

function ToolkitSection() {
	return (
		<section className="profile-section profile-toolkit" id="toolkit" aria-labelledby="toolkit-title">
			<div className="profile-section-heading" data-motion-reveal>
				<p className="profile-section-label"><span>03</span> Tools I reach for</p>
				<h2 id="toolkit-title">The right tool<br />for the <em>problem.</em></h2>
			</div>
			<div className="profile-tool-groups" data-motion-reveal>
				{toolGroups.map(({ number, label, tools, icon: Icon }) => (
					<div className="profile-tool-group" data-motion-reveal key={label}>
						<h3><Icon size={19} strokeWidth={1.6} aria-hidden="true" /><span>{number}</span><span>{label}</span></h3>
						<ul>{tools.map((tool, index) => <li data-motion-reveal key={tool} style={{ "--skill-reveal-delay": `${index * 45}ms` }}><Icon size={13} strokeWidth={1.7} aria-hidden="true" />{tool}</li>)}</ul>
					</div>
				))}
			</div>
		</section>
	);
}

export default ToolkitSection;

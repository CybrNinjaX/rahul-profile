import { toolGroups } from "../../data/homePageData";

function ToolkitSection() {
	return (
		<section className="profile-section profile-toolkit" id="toolkit" aria-labelledby="toolkit-title">
			<div className="profile-section-heading">
				<p className="profile-section-label"><span>03</span> Tools I reach for</p>
				<h2 id="toolkit-title">The right tool<br />for the <em>problem.</em></h2>
			</div>
			<div className="profile-tool-groups">
				{toolGroups.map(({ number, label, tools }) => (
					<div className="profile-tool-group" key={label}>
						<h3><span>{number}</span>{label}</h3>
						<ul>{tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
					</div>
				))}
			</div>
		</section>
	);
}

export default ToolkitSection;

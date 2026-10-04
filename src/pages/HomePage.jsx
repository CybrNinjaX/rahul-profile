import SplashCursor from "../components/SplashCursor";
import {
	ArrowDownRight,
	ArrowRight,
	ArrowUpRight,
	BriefcaseBusiness,
	Boxes,
	Camera,
	Code2,
	Cpu,
	Cuboid,
	Play,
	Workflow,
} from "lucide-react";

const focusAreas = [
	{
		number: "01",
		icon: Code2,
		title: "Web & mobile",
		copy: "Full-stack products and thoughtful interfaces, from the first screen to the systems behind it.",
	},
	{
		number: "02",
		icon: Cpu,
		title: "Applied AI",
		copy: "Practical experiments with machine learning, language models, and useful AI workflows.",
	},
	{
		number: "03",
		icon: Workflow,
		title: "Automation",
		copy: "Small tools and repeatable workflows that remove friction from everyday work.",
	},
	{
		number: "04",
		icon: Cuboid,
		title: "Generative 3D",
		copy: "Taking ideas from generated models through Blender cleanup and into physical prints.",
	},
];

const toolGroups = [
	{ label: "Languages", tools: ["Java", "Python", "TypeScript", "JavaScript", "C", "C++", "Dart"] },
	{ label: "Frameworks", tools: ["React", "Next.js", "Spring Boot", "Flutter", "Django", "FastAPI", "Tailwind CSS"] },
	{ label: "AI & data", tools: ["PyTorch", "Transformers", "scikit-learn", "MongoDB", "MySQL", "PostgreSQL"] },
	{ label: "Build & ship", tools: ["AWS", "Firebase", "Supabase", "Docker", "Git", "Linux", "n8n", "Blender"] },
];

const workflow = ["Explore", "Prototype", "Build", "Test", "Ship"];

const socialLinks = [
	{ label: "GitHub", href: "https://github.com/AgileSecDev", icon: Code2 },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/rahul-77a46b273/", icon: BriefcaseBusiness },
	{ label: "YouTube", href: "https://www.youtube.com/@MR-RZone", icon: Play },
	{ label: "Instagram", href: "https://www.instagram.com/rahul_zeronex___/", icon: Camera },
];

function HomePage() {
	return (
		<div className="profile-site">
			<SplashCursor
				SIM_RESOLUTION={96}
				DYE_RESOLUTION={640}
				CAPTURE_RESOLUTION={320}
				DENSITY_DISSIPATION={3.8}
				VELOCITY_DISSIPATION={2.8}
				PRESSURE_ITERATIONS={14}
				CURL={2.5}
				SPLAT_RADIUS={0.13}
				SPLAT_FORCE={3600}
				SHADING={false}
				COLOR_UPDATE_SPEED={4}
				RAINBOW_MODE={false}
				COLOR="#80edc4"
			/>

			<header className="profile-header">
				<a className="profile-wordmark" href="#home" aria-label="cybrninjaX home">cybrninjaX<span>.</span></a>
				<nav className="profile-nav" aria-label="Main navigation">
					<a href="#about">About</a>
					<a href="#focus">Focus</a>
					<a href="#toolkit">Toolkit</a>
					<a href="#contact">Contact <ArrowUpRight size={13} aria-hidden="true" /></a>
				</nav>
			</header>

			<main id="home">
				<section className="profile-hero" aria-labelledby="profile-title">
					<div className="profile-hero-copy">
						<p className="profile-eyebrow"><span /> Independent developer <i /> India</p>
						<h1 id="profile-title">Build things<br />that <em>matter.</em></h1>
						<p className="profile-lede">I’m Rahul, also known as <strong>cybrninjaX</strong>. I build across full-stack software, applied AI, automation, and generative 3D.</p>
						<div className="profile-hero-actions">
							<a className="profile-button profile-button-primary" href="#focus">Explore my work <ArrowDownRight size={16} aria-hidden="true" /></a>
							<a className="profile-text-link" href="mailto:rahul63794@gmail.com">Say hello <ArrowUpRight size={15} aria-hidden="true" /></a>
						</div>
					</div>
					<div className="profile-hero-art">
						<div className="profile-art-frame">
							<img src="https://user-images.githubusercontent.com/74038190/221352987-68da234d-4d62-4e9d-9d7f-098dc657c2dc.gif" alt="Animated illustration of a developer at work" />
						</div>
						<p className="profile-art-caption"><span>Curiosity in motion</span><span>01 — 05</span></p>
						<div className="profile-art-mark" aria-hidden="true"><Boxes size={24} strokeWidth={1.4} /></div>
					</div>
					<a className="profile-scroll-cue" href="#about"><span>Scroll to explore</span><ArrowDownRight size={15} aria-hidden="true" /></a>
				</section>

				<div className="profile-ribbon" aria-label="Areas of work">
					<span>Software</span><i /><span>Machine learning</span><i /><span>Automation</span><i /><span>3D printing</span>
				</div>

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

				<section className="profile-section profile-focus" id="focus" aria-labelledby="focus-title">
					<div className="profile-section-heading profile-focus-heading">
						<p className="profile-section-label"><span>02</span> What I’m into</p>
						<h2 id="focus-title">A broad toolkit.<br /><em>One curious mind.</em></h2>
					</div>
					<div className="profile-focus-grid">
						{focusAreas.map(({ number, icon: Icon, title, copy }) => (
							<article className="profile-focus-item" key={number}>
								<div className="profile-focus-topline"><span>{number}</span><Icon size={19} strokeWidth={1.5} aria-hidden="true" /></div>
								<h3>{title}</h3>
								<p>{copy}</p>
							</article>
						))}
					</div>
				</section>

				<section className="profile-section profile-toolkit" id="toolkit" aria-labelledby="toolkit-title">
					<div className="profile-section-heading">
						<p className="profile-section-label"><span>03</span> Tools I reach for</p>
						<h2 id="toolkit-title">The right tool<br />for the <em>problem.</em></h2>
					</div>
					<div className="profile-tool-groups">
						{toolGroups.map(({ label, tools }) => (
							<div className="profile-tool-group" key={label}>
								<h3>{label}</h3>
								<ul>{tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
							</div>
						))}
					</div>
				</section>

				<section className="profile-process" aria-labelledby="process-title">
					<div className="profile-process-heading">
						<p className="profile-section-label"><span>04</span> How I build</p>
						<h2 id="process-title">Make it useful.<br /><em>Make it real.</em></h2>
					</div>
					<ol className="profile-process-steps">
						{workflow.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}
					</ol>
					<p className="profile-process-note">For 3D projects, the last mile can mean Blender, a slicer, and a print on my Bambu Lab A1.</p>
				</section>

				<section className="profile-contact" id="contact" aria-labelledby="contact-title">
					<div className="profile-contact-copy">
						<p className="profile-section-label"><span>05</span> Open to good ideas</p>
						<h2 id="contact-title">Let’s make<br />something <em>work.</em></h2>
						<a className="profile-button profile-button-primary" href="mailto:rahul63794@gmail.com">rahul63794@gmail.com <ArrowUpRight size={16} aria-hidden="true" /></a>
					</div>
					<div className="profile-contact-links">
						<p>Find me elsewhere</p>
						{socialLinks.map(({ label, href, icon: Icon }) => (
							<a key={label} href={href} target="_blank" rel="noreferrer"><Icon size={16} aria-hidden="true" />{label}<ArrowRight className="profile-social-arrow" size={14} aria-hidden="true" /></a>
						))}
					</div>
				</section>
			</main>

			<footer className="profile-footer"><a className="profile-wordmark" href="#home">cybrninjaX<span>.</span></a><span>Built with code, curiosity, and care.</span><a href="#home">Back to top ↑</a></footer>
		</div>
	);
}

export default HomePage;

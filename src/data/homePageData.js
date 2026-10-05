import {
	BriefcaseBusiness,
	Camera,
	Code2,
	Cpu,
	Cuboid,
	Play,
	Workflow,
} from "lucide-react";

export const focusAreas = [
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

export const toolGroups = [
	{ number: "01", label: "Languages", tools: ["Java", "Python", "TypeScript", "JavaScript", "C", "C++", "Dart"] },
	{ number: "02", label: "Frameworks", tools: ["React", "Next.js", "Spring Boot", "Flutter", "Django", "FastAPI", "Tailwind CSS"] },
	{ number: "03", label: "AI & data", tools: ["PyTorch", "Transformers", "scikit-learn", "MongoDB", "MySQL", "PostgreSQL"] },
	{ number: "04", label: "Build & ship", tools: ["AWS", "Firebase", "Supabase", "Docker", "Git", "Linux", "n8n", "Blender"] },
];

export const workflowSteps = ["Explore", "Prototype", "Build", "Test", "Ship"];

export const navigationLinks = [
	{ label: "About", href: "/#about" },
	{ label: "Skills", href: "/skills" },
	{ label: "Project", href: "/project" },
	{ label: "Experience", href: "/experience" },
	{ label: "Contact", href: "/contact", external: true },
];

export const socialLinks = [
	{ label: "GitHub", href: "https://github.com/AgileSecDev", icon: Code2 },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/rahul-77a46b273/", icon: BriefcaseBusiness },
	{ label: "YouTube", href: "https://www.youtube.com/@MR-RZone", icon: Play },
	{ label: "Instagram", href: "https://www.instagram.com/rahul_zeronex___/", icon: Camera },
];

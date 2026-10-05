import AboutSection from "../components/home/AboutSection";
import ContactSection from "../components/home/ContactSection";
import ExperienceSection from "../components/home/ExperienceSection";
import HeroSection from "../components/home/HeroSection";
import ToolkitSection from "../components/home/ToolkitSection";
import WorkSection from "../components/home/WorkSection";

function HomePage() {
	return (
		<main id="home">
			<HeroSection />
			<AboutSection />
			<WorkSection />
			<ToolkitSection />
			<ExperienceSection />
			<ContactSection />
		</main>
	);
}

export default HomePage;

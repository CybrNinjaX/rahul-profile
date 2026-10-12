import { useEffect, useRef } from "react";
import AboutSection from "../components/home/AboutSection";
import ContactSection from "../components/home/ContactSection";
import ExperienceSection from "../components/home/ExperienceSection";
import HeroSection from "../components/home/HeroSection";
import ToolkitSection from "../components/home/ToolkitSection";
import WorkSection from "../components/home/WorkSection";

function HomePage() {
	const sphereStageRef = useRef(null);
	const contactRef = useRef(null);

	useEffect(() => {
		const stage = sphereStageRef.current;
		if (!stage) return undefined;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			stage.style.setProperty("--sphere-contact-opacity", "1");
			stage.style.setProperty("--sphere-orb-opacity", "1");
			if (contactRef.current) contactRef.current.inert = false;
			return undefined;
		}
		let frame = 0;

		const updateProgress = () => {
			frame = 0;
			const bounds = stage.getBoundingClientRect();
			const scrollDistance = Math.max(1, bounds.height - window.innerHeight);
			const progress = Math.min(1, Math.max(0, -bounds.top / scrollDistance));
			stage.style.setProperty("--sphere-progress", progress.toFixed(4));
			stage.style.setProperty("--sphere-scale", (0.72 + progress * 5).toFixed(3));
			stage.style.setProperty("--sphere-orb-scale", (1 + progress * 2.2).toFixed(3));
			stage.style.setProperty("--sphere-color-opacity", Math.min(1, Math.max(0, 1 - (progress - 0.64) * 3)).toFixed(3));
			stage.style.setProperty("--sphere-content-opacity", Math.min(1, Math.max(0, 1 - (progress - 0.48) * 4)).toFixed(3));
			stage.style.setProperty("--sphere-orb-opacity", Math.min(1, Math.max(0, 1 - (progress - 0.82) * 5.5)).toFixed(3));
			stage.style.setProperty("--sphere-contact-opacity", Math.min(1, Math.max(0, (progress - 0.58) * 3.4)).toFixed(3));
			if (contactRef.current) contactRef.current.inert = progress < 0.68;
		};
		const requestUpdate = () => {
			if (!frame) frame = window.requestAnimationFrame(updateProgress);
		};

		updateProgress();
		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);
		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", requestUpdate);
			window.removeEventListener("resize", requestUpdate);
		};
	}, []);

	return (
		<main id="home">
			<HeroSection />
			<AboutSection />
			<WorkSection />
			<ToolkitSection />
			<div className="profile-sphere-transition" ref={sphereStageRef}>
				<div className="profile-sphere-pin">
					<ExperienceSection />
					<div ref={contactRef}>
						<ContactSection />
					</div>
				</div>
			</div>
		</main>
	);
}

export default HomePage;

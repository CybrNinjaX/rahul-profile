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
			stage.style.setProperty("--sphere-orb-opacity", ".82");
			if (contactRef.current) contactRef.current.inert = false;
			return undefined;
		}
		let frame = 0;

		const updateProgress = () => {
			frame = 0;
			const bounds = stage.getBoundingClientRect();
			const scrollDistance = Math.max(1, bounds.height - window.innerHeight);
			const progress = Math.min(1, Math.max(0, -bounds.top / scrollDistance));
			stage.style.setProperty("--sphere-orb-scale", (1 + progress * 2.2).toFixed(3));
			stage.style.setProperty("--sphere-content-opacity", Math.min(1, Math.max(0, 1 - (progress - 0.48) * 4)).toFixed(3));
			stage.style.setProperty("--sphere-orb-opacity", (0.82 * Math.min(1, Math.max(0, 1 - (progress - 0.82) * 5.5))).toFixed(3));
			const revealProgress = Math.min(1, Math.max(0, (progress - 0.42) / 0.44));
			const revealRadius = Math.hypot(window.innerWidth, window.innerHeight) * revealProgress;
			stage.style.setProperty("--sphere-reveal-radius", `${revealRadius.toFixed(1)}px`);
			if (contactRef.current) contactRef.current.inert = progress < 0.62;
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

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ExperienceDepthCarousel from "../components/ExperienceDepthCarousel";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const smoothstep = (start, end, value) => {
	const progress = clamp((value - start) / (end - start), 0, 1);
	return progress * progress * (3 - 2 * progress);
};

function WorksPage({ scrollContainerRef, worksRef }) {
	const featureRef = useRef(null);
	const labelRef = useRef(null);

	useEffect(() => {
		const container = scrollContainerRef.current;
		const section = worksRef.current;
		const feature = featureRef.current;
		const label = labelRef.current;
		if (!container || !section || !feature || !label) return undefined;

		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const updateFeature = () => {
			const viewportHeight = Math.max(window.innerHeight, 1);
			const progress = reduceMotion
				? 1
				: smoothstep(0.08, 0.88, (container.scrollTop - section.offsetTop) / viewportHeight);

			feature.style.opacity = `${0.45 + progress * 0.55}`;
			feature.style.transform = reduceMotion
				? "none"
				: `perspective(1400px) translate3d(0, ${(1 - progress) * 72}px, 0) rotateX(${(1 - progress) * 12}deg) scale(${0.82 + progress * 0.18})`;
			label.style.opacity = `${progress}`;
			label.style.transform = reduceMotion ? "none" : `translate3d(${(1 - progress) * 42}px, 0, 0)`;
		};

		updateFeature();
		container.addEventListener("scroll", updateFeature, { passive: true });
		window.addEventListener("resize", updateFeature);
		return () => {
			container.removeEventListener("scroll", updateFeature);
			window.removeEventListener("resize", updateFeature);
		};
	}, [scrollContainerRef, worksRef]);

	return (
		<>
			<section className="works-scroll" ref={worksRef} id="works" aria-labelledby="works-title">
			<div className="works-stage">
				<div className="works-heading" ref={labelRef}>
					<p className="works-kicker"><span>02</span> Selected work</p>
					<h2 id="works-title">Thoughtful digital experiences.</h2>
					<p className="works-description">A closer look at the details, systems, and interactions that make the web feel considered.</p>
					<a className="works-explore" href="#contact">Have a project in mind? <ArrowUpRight size={15} aria-hidden="true" /></a>
				</div>
				<figure className="works-feature" ref={featureRef}>
					<img src="/images/loading/digital-workspace.jpg" alt="A designer working at a digital workspace" />
					<figcaption><span>Interface / Interaction</span><span>Scroll to explore <ArrowDown size={14} aria-hidden="true" /></span></figcaption>
				</figure>
				<span className="works-index" aria-hidden="true">02 <i /> 02</span>
			</div>
			</section>
			<ExperienceDepthCarousel scrollContainerRef={scrollContainerRef} />
		</>
	);
}

export default WorksPage;

import { useEffect, useRef } from "react";
import { focusAreas } from "../../data/homePageData";

function WorkSection() {
	const stageRef = useRef(null);
	const trackRef = useRef(null);

	useEffect(() => {
		const stage = stageRef.current;
		const track = trackRef.current;
		if (!stage || !track) return undefined;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
		let frame = 0;

		const updatePosition = () => {
			frame = 0;
			const bounds = stage.getBoundingClientRect();
			const scrollDistance = Math.max(1, stage.offsetHeight - window.innerHeight);
			const progress = Math.min(1, Math.max(0, -bounds.top / scrollDistance));
			const horizontalDistance = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
			stage.style.setProperty("--work-progress", progress.toFixed(4));
			track.style.setProperty("--work-offset", `${-horizontalDistance * progress}px`);
		};
		const requestUpdate = () => {
			if (!frame) frame = window.requestAnimationFrame(updatePosition);
		};
		const resizeObserver = new ResizeObserver(requestUpdate);
		resizeObserver.observe(track);
		resizeObserver.observe(track.parentElement);
		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);
		updatePosition();
		return () => {
			window.cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			window.removeEventListener("scroll", requestUpdate);
			window.removeEventListener("resize", requestUpdate);
		};
	}, []);

	return (
		<div className="profile-horizontal-stage" ref={stageRef}>
			<section className="profile-section profile-focus profile-horizontal-pin" id="work" aria-labelledby="work-title">
				<div className="profile-section-heading profile-focus-heading" data-motion-reveal>
					<p className="profile-section-label"><span>02</span> Areas of work</p>
					<h2 id="work-title">Many ways to build.<br /><em>One curious mind.</em></h2>
				</div>
				<div className="profile-horizontal-viewport">
					<div className="profile-focus-grid profile-horizontal-track" ref={trackRef}>
						{focusAreas.map(({ number, icon: Icon, title, copy }) => (
							<article className="profile-focus-item" data-motion-reveal key={number}>
								<div className="profile-focus-topline"><span>{number}</span><Icon size={19} strokeWidth={1.5} aria-hidden="true" /></div>
								<h3>{title}</h3>
								<p>{copy}</p>
							</article>
						))}
					</div>
				</div>
				<div className="profile-horizontal-hint" aria-hidden="true">
					<span>Scroll to explore</span><span className="profile-horizontal-rail"><i /></span><span>{`${String(focusAreas.length).padStart(2, "0")} areas`}</span>
				</div>
			</section>
		</div>
	);
}

export default WorkSection;

import { useEffect, useRef } from "react";

function TickerItems({ items, hidden = false }) {
	return (
		<div className="profile-ticker-set" aria-hidden={hidden}>
			{items.map((item, index) => (
				<span className="profile-ticker-item" key={`${item}-${index}`}>
					{item}<i aria-hidden="true" />
				</span>
			))}
		</div>
	);
}

function ScrollTicker({ items }) {
	const tickerRef = useRef(null);

	useEffect(() => {
		const ticker = tickerRef.current;
		if (!ticker || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
		let frame = 0;

		const updatePosition = () => {
			frame = 0;
			const bounds = ticker.parentElement.getBoundingClientRect();
			const progress = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
			const setWidth = ticker.scrollWidth / 2;
			ticker.style.setProperty("--ticker-offset", `${(0.5 - progress) * setWidth * 0.5}px`);
		};
		const requestUpdate = () => {
			if (!frame) frame = window.requestAnimationFrame(updatePosition);
		};
		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);
		updatePosition();
		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", requestUpdate);
			window.removeEventListener("resize", requestUpdate);
		};
	}, []);

	return (
		<div className="profile-ribbon-viewport">
			<div className="profile-ribbon-track" ref={tickerRef}>
				<TickerItems items={items} />
				<TickerItems items={items} hidden />
			</div>
		</div>
	);
}

export default ScrollTicker;

import { useEffect } from "react";

export default function useScrollReveal(rootRef, selector = "[data-motion-reveal]", trigger = null) {
	useEffect(() => {
		const root = rootRef.current;
		if (!root) return undefined;

		const elements = root.querySelectorAll(selector);
		if (!("IntersectionObserver" in window)) {
			elements.forEach(element => element.classList.add("is-visible"));
			return undefined;
		}

		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			});
		}, { threshold: 0.15, rootMargin: "0px 0px -32px 0px" });

		elements.forEach(element => observer.observe(element));
		return () => observer.disconnect();
	}, [rootRef, selector, trigger]);
}

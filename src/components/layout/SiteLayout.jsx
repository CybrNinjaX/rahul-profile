import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";
import useTheme from "../../hooks/useTheme";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import SplashCursorEffect from "./SplashCursorEffect";

function SiteLayout() {
	const pageRef = useRef(null);
	const location = useLocation();
	const { theme, toggleTheme } = useTheme();
	useScrollReveal(pageRef, ".profile-focus-item[data-motion-reveal]", location.pathname);

	useEffect(() => {
		const frame = window.requestAnimationFrame(() => {
			if (location.hash) {
				document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
			} else {
				window.scrollTo({ top: 0, behavior: "auto" });
			}
		});
		return () => window.cancelAnimationFrame(frame);
	}, [location.pathname, location.hash]);

	return (
		<div className="profile-site" data-theme={theme} ref={pageRef}>
			<SplashCursorEffect />
			<SiteHeader theme={theme} onToggleTheme={toggleTheme} />
			<Outlet />
			<SiteFooter />
		</div>
	);
}

export default SiteLayout;

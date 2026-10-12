import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";
import useTheme from "../../hooks/useTheme";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import LetterGlitch from "./LetterGlitch";
import SplashCursorEffect from "./SplashCursorEffect";

function SiteLayout() {
	const pageRef = useRef(null);
	const location = useLocation();
	const { theme, toggleTheme } = useTheme();
	useScrollReveal(pageRef, "[data-motion-reveal]", location.pathname);

	useEffect(() => {
		const frame = window.requestAnimationFrame(() => {
			if (location.hash) {
				const target = document.querySelector(location.hash);
				const sphereStage = location.hash === "#contact" ? target?.closest(".profile-sphere-transition") : null;
				if (sphereStage) {
					const destination = window.scrollY + sphereStage.getBoundingClientRect().top + sphereStage.offsetHeight - window.innerHeight;
					window.scrollTo({ top: destination, behavior: "smooth" });
				} else {
					target?.scrollIntoView({ behavior: "smooth" });
				}
			} else {
				window.scrollTo({ top: 0, behavior: "auto" });
			}
		});
		return () => window.cancelAnimationFrame(frame);
	}, [location.pathname, location.hash]);

	return (
		<div className="profile-site" data-theme={theme} ref={pageRef}>
			<LetterGlitch
				glitchColors={theme === "light" ? ["#18181b", "#0f9f6e"] : ["#ffffff", "#61dca3"]}
				glitchAmount={0.5}
				speed={1}
				flow={0.5}
				clickEffect="tear"
				lightMode={theme === "light"}
			/>
			<SplashCursorEffect color={theme === "light" ? "#267653" : "#80edc4"} />
			<SiteHeader theme={theme} onToggleTheme={toggleTheme} />
			<Outlet />
			<SiteFooter />
		</div>
	);
}

export default SiteLayout;

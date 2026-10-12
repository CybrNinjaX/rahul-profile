import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { navigationLinks } from "../../data/homePageData";

function SiteHeader({ theme, onToggleTheme }) {
	const location = useLocation();
	const activeHash = location.pathname === "/" ? location.hash : "";

	return (
		<header className="profile-header">
			<Link className="profile-wordmark" to="/" aria-label="cybrninjaX home">cybrninjaX<span>.</span></Link>
			<nav className="profile-nav" aria-label="Main navigation">
				{navigationLinks.map(({ label, href, external }) => (
					<Link to={href} key={href} aria-current={activeHash === href.slice(1) ? "location" : undefined}>
						{label}{external && <ArrowUpRight size={13} aria-hidden="true" />}
					</Link>
				))}
				<button
					className="profile-theme-toggle"
					type="button"
					onClick={onToggleTheme}
					aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
					title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
				>
					{theme === "dark" ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
					<span>{theme === "dark" ? "Light" : "Dark"}</span>
				</button>
			</nav>
		</header>
	);
}

export default SiteHeader;

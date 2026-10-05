import { useState } from "react";

const THEME_STORAGE_KEY = "profile-theme";

export default function useTheme() {
	const [theme, setTheme] = useState(() => {
		if (typeof window === "undefined") return "dark";
		return window.localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
	});

	const toggleTheme = () => {
		const nextTheme = theme === "dark" ? "light" : "dark";
		setTheme(nextTheme);
		window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
	};

	return { theme, toggleTheme };
}

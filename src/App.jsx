import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import ContactPage from "./pages/ContactPage.jsx";
import ExperiencePage from "./pages/ExperiencePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import SkillsPage from "./pages/SkillsPage.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<SiteLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/skills" element={<SkillsPage />} />
					<Route path="/project" element={<ProjectPage />} />
					<Route path="/experience" element={<ExperiencePage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

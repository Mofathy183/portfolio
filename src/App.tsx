import { useEffect, useState } from 'react';
import Nav from '@/layouts/Nav';
import Footer from '@/layouts/Footer';
import Hero from '@/sections/Hero';
import BeggySection from '@/sections/Beggy/BeggySection';
import Skills from '@/sections/Skills';
import Contact from '@/sections/Contact';

/**
 * Root application shell responsible for global layout and section composition.
 *
 * @remarks
 * Acts as the top-level orchestrator for:
 * - Global navigation
 * - Page sections composition
 * - Theme state management (dark/light mode)
 */
function App() {
	/**
	 * Initializes theme state from persistent storage or system preference.
	 *
	 * @remarks
	 * Priority:
	 * 1. User preference stored in localStorage
	 * 2. System preference via matchMedia
	 */
	const [dark, setDark] = useState(() => {
		const stored = localStorage.getItem('theme');
		if (stored) return stored === 'dark';
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	});

	/**
	 * Synchronizes theme state with DOM and persistent storage.
	 *
	 * @remarks
	 * Updates:
	 * - <html> class for Tailwind dark mode
	 * - localStorage for persistence across sessions
	 */
	useEffect(() => {
		document.documentElement.classList.toggle('dark', dark);
		localStorage.setItem('theme', dark ? 'dark' : 'light');
	}, [dark]);

	return (
		<div className="min-h-screen bg-background">
			<Nav dark={dark} onToggleDark={() => setDark((d) => !d)} />
			<main>
				<Hero />
				<BeggySection />
				<Skills />
				<Contact />
			</main>
			<Footer />
		</div>
	);
}

export default App;

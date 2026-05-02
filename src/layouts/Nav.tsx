import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import useScrollSpy from '@/hooks/useScrollSpy';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Defines the ordered list of page sections used for navigation and scroll tracking.
 *
 * @remarks
 * This array is tightly coupled with DOM section IDs and scroll spy logic.
 */
const NAV_SECTIONS = ['hero', 'beggy', 'skills', 'contact'];

/**
 * Maps internal section IDs to user-facing navigation labels.
 *
 * @remarks
 * Decouples DOM identifiers from UI display text for flexibility and localization.
 */
const NAV_LABELS: Record<string, string> = {
	hero: 'About',
	beggy: 'Beggy',
	skills: 'Skills',
	contact: 'Contact',
};

interface NavProps {
	dark: boolean;
	onToggleDark: () => void;
}

/**
 * Global navigation header for the portfolio application.
 *
 * @remarks
 * Provides:
 * - Section-based navigation with scroll spy highlighting
 * - Theme toggle (dark/light mode)
 * - Responsive mobile navigation menu
 *
 * Acts as a persistent layout element across all sections.
 */
const Nav = ({ dark, onToggleDark }: NavProps) => {
	/**
	 * Tracks whether the page has been scrolled beyond the initial threshold.
	 *
	 * @remarks
	 * Used to dynamically apply background blur and border styling to the navbar.
	 */
	const [scrolled, setScrolled] = useState(false);

	/**
	 * Controls visibility of the mobile navigation menu.
	 *
	 * @remarks
	 * Toggles between collapsed and expanded navigation state on small screens.
	 */
	const [menuOpen, setMenuOpen] = useState(false);
	const activeId = useScrollSpy(NAV_SECTIONS);

	useEffect(() => {
		/**
		 * Registers a scroll listener to update navigation styling based on scroll position.
		 *
		 * @remarks
		 * Improves UX by transitioning navbar from transparent to elevated state after scrolling.
		 */
		const handler = () => setScrolled(window.scrollY > 20);
		window.addEventListener('scroll', handler, { passive: true });
		return () => window.removeEventListener('scroll', handler);
	}, []);

	/**
	 * Smoothly scrolls to a specific page section and closes mobile menu if open.
	 *
	 * @param id - DOM element id corresponding to a page section
	 */
	const scrollTo = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
		setMenuOpen(false);
	};

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
				scrolled
					? 'bg-background/90 backdrop-blur-md border-b border-border shadow-sm'
					: 'bg-transparent'
			)}
		>
			<div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
				{/* Logo */}
				<button
					onClick={() => scrollTo('hero')}
					className="font-heading font-semibold text-lg text-foreground hover:text-primary transition-colors tracking-tight"
				>
					mf<span className="text-primary">.</span>
				</button>

				{/* Desktop nav */}
				<nav className="hidden md:flex items-center gap-8">
					{NAV_SECTIONS.map((id) => (
						<button
							key={id}
							onClick={() => scrollTo(id)}
							className={cn(
								'nav-link text-sm text-muted-foreground hover:text-foreground transition-colors',
								activeId === id && 'active text-foreground'
							)}
						>
							{NAV_LABELS[id]}
						</button>
					))}
				</nav>

				{/* Right actions */}
				<div className="flex items-center gap-2">
					{/* Dark mode toggle — shadcn Button ghost */}
					<Button
						variant="ghost"
						size="icon"
						onClick={onToggleDark}
						aria-label="Toggle dark mode"
						className="text-muted-foreground hover:text-foreground"
					>
						{dark ? <Sun size={16} /> : <Moon size={16} />}
					</Button>

					{/* GitHub — shadcn Button outline */}
					<Button
						variant="outline"
						size="sm"
						asChild
						className="hidden md:inline-flex rounded-full text-xs hover:border-primary hover:text-primary"
					>
						<a
							href="https://github.com/Mofathy183"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub
						</a>
					</Button>

					{/* Mobile menu toggle */}
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden text-muted-foreground hover:text-foreground"
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label="Toggle menu"
					>
						{menuOpen ? <X size={18} /> : <Menu size={18} />}
					</Button>
				</div>
			</div>

			{/* Mobile dropdown */}
			{menuOpen && (
				<div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 py-4 flex flex-col gap-1">
					{NAV_SECTIONS.map((id) => (
						<button
							key={id}
							onClick={() => scrollTo(id)}
							className={cn(
								'text-left text-sm py-2 px-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors',
								activeId === id &&
									'text-foreground font-medium bg-muted'
							)}
						>
							{NAV_LABELS[id]}
						</button>
					))}
				</div>
			)}
		</header>
	);
};

export default Nav;

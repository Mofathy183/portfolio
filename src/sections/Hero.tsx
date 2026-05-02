import { personal } from '@/data/portfolio';
import { Github, Mail, FileText, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Hero section of the portfolio landing page.
 *
 * @description
 * Presents identity, primary call-to-actions, and quick credibility signals.
 * Acts as the main entry point for user navigation (e.g., scrolling to projects,
 * accessing GitHub, email, or downloading CV).
 *
 * @remarks
 * - Depends on `personal` data for content.
 * - Assumes the presence of a DOM element with id `beggy` for scroll navigation.
 */
const Hero = () => {
	/**
	 * Smoothly scrolls to the "Beggy" project section.
	 *
	 * @remarks
	 * No-op if the target element is not present in the DOM.
	 */
	const scrollToBeggy = () =>
		document
			.getElementById('beggy')
			?.scrollIntoView({ behavior: 'smooth' });

	return (
		<section
			id="hero"
			className="relative min-h-screen flex flex-col justify-center grain overflow-hidden"
		>
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background:
						'radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.52 0.105 223.128 / 8%) 0%, transparent 70%)',
				}}
			/>

			<div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24">
				{/* Status pill */}
				<div className="fade-up fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-mono mb-8">
					<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
					Open to work · Giza, Egypt
				</div>

				{/* Name */}
				<h1 className="fade-up fade-up-2 font-heading font-semibold text-5xl sm:text-6xl md:text-7xl text-foreground leading-tight tracking-tight mb-4">
					{personal.name}
					<span className="text-primary">.</span>
				</h1>

				{/* Title */}
				<p className="fade-up fade-up-2 text-xl sm:text-2xl text-muted-foreground font-mono font-light mb-6">
					{personal.title}
				</p>

				{/* Tagline */}
				<p className="fade-up fade-up-3 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mb-4">
					{personal.tagline}
				</p>

				{/* Bio */}
				<p className="fade-up fade-up-3 text-sm text-muted-foreground max-w-lg leading-relaxed mb-10 opacity-80">
					{personal.bio}
				</p>

				{/* CTAs */}
				<div className="fade-up fade-up-4 flex flex-wrap items-center gap-3 mb-16">
					<Button onClick={scrollToBeggy} className="rounded-full">
						See Beggy project
						<ArrowDown size={14} />
					</Button>

					<Button variant="outline" className="rounded-full" asChild>
						<a
							href={personal.github}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github size={14} />
							GitHub
						</a>
					</Button>

					<Button variant="outline" className="rounded-full" asChild>
						<a href={`mailto:${personal.email}`}>
							<Mail size={14} />
							Email me
						</a>
					</Button>

					<Button variant="outline" className="rounded-full" asChild>
						<a href={personal.cv} download>
							<FileText size={14} />
							Download CV
						</a>
					</Button>
				</div>

				{/* Quick stats */}
				<div className="fade-up fade-up-5 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
					{[
						{ value: '1', label: 'Production monorepo' },
						{ value: '5+', label: 'Auth mechanisms' },
						{ value: 'E2E', label: 'Playwright coverage' },
						{ value: '100%', label: 'TypeScript strict' },
					].map((stat) => (
						<div
							key={stat.label}
							className="border border-border rounded-xl p-4 bg-card/50"
						>
							<div className="text-2xl font-heading font-semibold text-primary mb-1">
								{stat.value}
							</div>
							<div className="text-xs text-muted-foreground leading-tight">
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Scroll hint */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50">
				<span className="text-xs tracking-widest uppercase">
					Scroll
				</span>
				<div className="w-px h-8 bg-linear-to-b from-muted-foreground/30 to-transparent" />
			</div>
		</section>
	);
};

export default Hero;

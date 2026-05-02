import { beggy } from '@/data/portfolio';
import { Github, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/**
 * Hero section for the featured Beggy project.
 *
 * @remarks
 * This component serves as the entry point for the project case study,
 * combining branding, summary, and primary navigation actions (code + demo).
 */
const BeggyHero = () => {
	return (
		<div className="mb-16">
			<div className="inline-flex items-center gap-2 text-xs font-medium text-primary uppercase tracking-widest mb-4">
				<span className="w-6 h-px bg-primary" />
				Featured project
			</div>

			<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
				<div>
					<h2 className="font-heading font-semibold text-4xl sm:text-5xl text-foreground tracking-tight mb-3">
						Beggy
						<span className="text-primary text-3xl ml-2">🎒</span>
					</h2>
					<p className="text-lg text-muted-foreground max-w-xl">
						{beggy.tagline}
					</p>
				</div>

				{/**
				 * Primary call-to-action area for external project navigation.
				 *
				 * @remarks
				 * Provides access to source code (GitHub) and optional live deployment.
				 * The demo link is conditionally rendered based on availability.
				 */}
				<div className="flex items-center gap-3 shrink-0">
					<Button variant="outline" className="rounded-full" asChild>
						<a
							href={beggy.github}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github size={14} />
							View code
						</a>
					</Button>
					{beggy.demo && (
						<Button className="rounded-full" asChild>
							<a
								href={beggy.demo}
								target="_blank"
								rel="noopener noreferrer"
							>
								<ExternalLink size={14} />
								Live demo
							</a>
						</Button>
					)}
				</div>
			</div>

			<p className="text-muted-foreground leading-relaxed max-w-2xl mb-8">
				{beggy.description}
			</p>

			{/* Stack pills — same Badge swap as Skills */}
			<div className="flex flex-wrap gap-2">
				{/**
				 * Represents the technology stack used in the Beggy project.
				 *
				 * @remarks
				 * Used purely for visual representation; does not imply runtime dependency graph.
				 * Displayed as semantic badges for quick technical scanning.
				 */}
				{beggy.stack.map((tech) => (
					<Badge key={tech} variant="secondary">
						{tech}
					</Badge>
				))}
			</div>
		</div>
	);
};

export default BeggyHero;

import useSectionReveal from '@/hooks/useSectionReveal';
import { techStack } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';

/**
 * Maps a tech category to its visual icon representation.
 *
 * @remarks
 * Keep keys aligned with `techStack` categories to avoid missing icons at runtime.
 */
const categoryIcon: Record<string, string> = {
	Backend: '⚙️',
	Frontend: '🎨',
	Architecture: '🏗️',
	Testing: '🧪',
	'External Services': '🔌',
};

/**
 * Renders the Skills & Tech Stack section of the portfolio.
 *
 * @description
 * Displays categorized technologies alongside a short description
 * of engineering principles. Uses `useSectionReveal` to trigger
 * entrance animations when the section enters the viewport.
 *
 * @remarks
 * - Assumes `techStack` is a stable, well-structured data source.
 * - Relies on category names matching `categoryIcon` keys.
 */
const Skills = () => {
	const ref = useSectionReveal();

	return (
		<section
			id="skills"
			ref={ref as React.RefObject<HTMLElement>}
			className="py-24 border-t border-border"
		>
			<div className="max-w-5xl mx-auto px-6">
				<div className="inline-flex items-center gap-2 text-xs font-medium text-primary uppercase tracking-widest mb-6">
					<span className="w-6 h-px bg-primary" />
					Skills & stack
				</div>

				<div className="flex flex-col md:flex-row md:gap-16 mb-12">
					<div className="md:w-72 shrink-0 mb-6 md:mb-0">
						<h2 className="font-heading font-semibold text-3xl sm:text-4xl text-foreground tracking-tight mb-3">
							What I work with
						</h2>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Backend-leaning full-stack. I'm most comfortable
							designing APIs, data models, and auth systems — and
							I bring the same care to the frontend when it
							matters.
						</p>
					</div>

					<div className="flex-1 space-y-6">
						{techStack.map((group) => (
							<div key={group.category}>
								<div className="flex items-center gap-2 mb-3">
									<span className="text-base">
										{categoryIcon[group.category]}
									</span>
									<span className="text-sm font-medium text-foreground">
										{group.category}
									</span>
								</div>
								<div className="flex flex-wrap gap-2">
									{group.items.map((tech) => (
										<Badge key={tech} variant="secondary">
											{tech}
										</Badge>
									))}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="rounded-xl border border-border bg-card/50 p-6">
					<h3 className="text-sm font-medium text-foreground mb-4">
						How I approach engineering
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
						{[
							{
								heading: 'Design before code',
								body: "I think through data models, API contracts, and edge cases before writing the first line. The hard decisions are easier when you haven't committed to an implementation yet.",
							},
							{
								heading: 'Types as documentation',
								body: "Strict TypeScript and shared Zod schemas aren't overhead — they're the first place a new collaborator looks. Schema drift between API and client is a class of bugs I've eliminated by design.",
							},
							{
								heading: 'Test the important paths',
								body: "I don't chase 100% coverage metrics. I test the auth flow, the business logic, and the E2E paths a real user would take — those are the ones that break in production.",
							},
						].map((item) => (
							<div key={item.heading}>
								<h4 className="text-xs font-semibold text-foreground mb-2">
									{item.heading}
								</h4>
								<p className="text-xs text-muted-foreground leading-relaxed">
									{item.body}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Skills;

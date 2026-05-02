import { beggy } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';

/**
 * Portfolio section highlighting system design and engineering decisions behind the project.
 *
 * @remarks
 * This section is intentionally non-technical in structure but communicates
 * architectural depth, constraints, and engineering trade-offs to recruiters and reviewers.
 */
export const Highlights = () => {
	return (
		<div className="mb-16">
			<h3 className="text-lg font-medium text-foreground mb-2">
				What makes it different
			</h3>
			<p className="text-sm text-muted-foreground mb-6">
				Not CRUD with a login form — real constraint logic, real auth
				complexity, real architecture decisions.
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{/**
				 * Represents a single engineering highlight entry.
				 *
				 * @property icon - Visual identifier for quick scanning
				 * @property title - Concise engineering or architectural concept
				 * @property body - Explanation of the technical decision or trade-off
				 */}
				{beggy.highlights.map((h) => (
					<div
						key={h.title}
						className="p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-border/80 transition-all"
					>
						<div className="text-2xl mb-3">{h.icon}</div>
						<h4 className="text-sm font-medium text-foreground mb-2">
							{h.title}
						</h4>
						<p className="text-xs text-muted-foreground leading-relaxed">
							{h.body}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

/**
 * Displays the project's testing strategy across multiple abstraction layers.
 *
 * @remarks
 * Each layer represents a different testing boundary (unit, integration, e2e, etc.)
 * and is rendered from a structured domain model for consistency.
 */
export const Testing = () => {
	return (
		<div className="mb-16">
			<h3 className="text-lg font-medium text-foreground mb-2">
				Testing strategy
			</h3>
			<p className="text-sm text-muted-foreground mb-6">
				{beggy.testing.summary}
			</p>

			<div className="rounded-xl border border-border overflow-hidden">
				{/**
				 * Represents a single testing layer in the project's testing strategy.
				 *
				 * @property label - Name of the testing boundary (e.g. Unit, Integration, E2E)
				 * @property tool - Primary testing technology used at this layer
				 * @property coverage - Description of what is validated at this level
				 */}
				{beggy.testing.layers.map((layer, i) => (
					<div
						key={layer.label}
						className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 px-4 py-3 ${
							i < beggy.testing.layers.length - 1
								? 'border-b border-border'
								: ''
						} hover:bg-muted/30 transition-colors`}
					>
						<div className="shrink-0 sm:w-44">
							<span className="text-xs font-medium text-foreground">
								{layer.label}
							</span>
						</div>
						<div className="shrink-0 sm:w-44">
							<Badge variant="secondary" className="font-mono">
								{layer.tool}
							</Badge>
						</div>
						<p className="text-xs text-muted-foreground flex-1">
							{layer.coverage}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

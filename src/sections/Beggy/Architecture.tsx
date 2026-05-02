import { beggy } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';

/**
 * Maps architectural roles to their corresponding UI color styles.
 *
 * @remarks
 * This is a presentation-layer concern used to visually distinguish system responsibilities.
 * Not part of the domain model.
 */
const roleColor: Record<string, string> = {
	Frontend: 'text-primary bg-primary/10 border-primary/20',
	Backend: 'text-chart-2 bg-chart-2/10 border-chart-2/20',
	Database: 'text-chart-3 bg-chart-3/10 border-chart-3/20',
	'Shared contract': 'text-muted-foreground bg-muted border-border',
	'Auth & email': 'text-muted-foreground bg-muted border-border',
};

/**
 * Maps HTTP methods to semantic color styles for API endpoint visualization.
 *
 * @remarks
 * Improves readability of REST surface by visually encoding request semantics
 * (read, create, update, delete).
 */
const methodColor: Record<string, string> = {
	GET: 'bg-primary/15 text-primary border-primary/20',
	POST: 'bg-chart-2/15 text-chart-2 border-chart-2/20',
	PATCH: 'bg-chart-4/15 text-chart-4 border-chart-4/20',
	DELETE: 'bg-destructive/15 text-destructive border-destructive/20',
};

/**
 * Visual representation of the system architecture layers for the Beggy project.
 *
 * @remarks
 * This section communicates high-level system design decisions in a monorepo setup,
 * highlighting separation of concerns between frontend, backend, database, and shared contracts.
 */
const Architecture = () => {
	return (
		<div className="mb-16">
			<h3 className="text-lg font-medium text-foreground mb-2">
				Architecture
			</h3>
			<p className="text-sm text-muted-foreground mb-6">
				Turborepo monorepo with four packages. The shared layer is the
				backbone — one Zod schema serves both API validation and
				frontend form validation.
			</p>

			<div className="flex flex-col gap-3">
				{/**
				 * Represents a single layer in the system architecture.
				 *
				 * @property layer - Name of the system layer (e.g. frontend, backend, shared)
				 * @property role - Responsibility classification of the layer
				 * @property detail - Technical explanation of responsibilities and design decisions
				 */}
				{beggy.architecture.map((layer, i) => (
					<div key={layer.layer} className="relative">
						<div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors">
							<div className="shrink-0 w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center text-xs text-muted-foreground font-medium">
								{i + 1}
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex flex-wrap items-center gap-2 mb-1">
									<span className="font-medium text-sm text-foreground">
										{layer.layer}
									</span>
									{/* Role badge — outline variant + color override via className */}
									<Badge
										variant="outline"
										className={
											roleColor[layer.role] ??
											roleColor['Shared contract']
										}
									>
										{layer.role}
									</Badge>
								</div>
								<p className="text-xs text-muted-foreground">
									{layer.detail}
								</p>
							</div>
						</div>
						{i < beggy.architecture.length - 1 && (
							<div className="absolute left-[22px] -bottom-3 w-px h-3 bg-border" />
						)}
					</div>
				))}
			</div>

			{/* API endpoints */}
			<div className="mt-8">
				<h4 className="text-sm font-medium text-foreground mb-3">
					Key API endpoints
				</h4>
				<div className="rounded-xl border border-border overflow-hidden">
					{/**
					 * Represents a single REST API endpoint in the system.
					 *
					 * @property method - HTTP method (GET, POST, PATCH, DELETE)
					 * @property path - API route path
					 * @property description - Human-readable explanation of endpoint responsibility
					 */}
					{beggy.apiEndpoints.map((ep, i) => (
						<div
							key={ep.path}
							className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors ${
								i < beggy.apiEndpoints.length - 1
									? 'border-b border-border'
									: ''
							}`}
						>
							{/* HTTP method badge */}
							<Badge
								variant="outline"
								className={`shrink-0 font-mono text-xs w-14 justify-center ${
									methodColor[ep.method] ?? methodColor.GET
								}`}
							>
								{ep.method}
							</Badge>
							<code className="text-xs text-foreground font-mono shrink-0">
								{ep.path}
							</code>
							<span className="text-xs text-muted-foreground hidden sm:block">
								{ep.description}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Architecture;

import { useState } from 'react';
import { beggy } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

/**
 * Interactive accordion section showcasing real engineering challenges solved in the project.
 *
 * @remarks
 * This component is designed to communicate engineering maturity:
 * each entry follows a structured problem → solution → result narrative.
 *
 * Only one challenge can be expanded at a time to maintain readability and focus.
 */
const Challenges = () => {
	/**
	 * Controls which challenge is currently expanded in the accordion.
	 *
	 * @remarks
	 * Uses index-based selection (number) where `null` means all sections are collapsed.
	 * Only one item can be open at a time.
	 */
	const [open, setOpen] = useState<number | null>(0);

	return (
		<div className="mb-16">
			<h3 className="text-lg font-medium text-foreground mb-2">
				Engineering decisions & hard problems
			</h3>
			<p className="text-sm text-muted-foreground mb-6">
				The parts that actually required thinking — not boilerplate.
				Each one has a real root cause, a deliberate solution, and a
				measurable result.
			</p>

			<div className="space-y-3">
				{/**
				 * Represents a single engineering challenge entry in the portfolio.
				 *
				 * @property title - Short descriptive label of the engineering problem
				 * @property what - Problem statement (what went wrong / limitation encountered)
				 * @property how - Technical approach used to solve the problem
				 * @property result - Measurable or qualitative outcome after implementation
				 */}
				{beggy.challenges.map((ch, i) => (
					<div
						key={ch.title}
						className={cn(
							'rounded-xl border transition-all duration-200',
							open === i
								? 'border-primary/30 bg-primary/3 dark:bg-primary/5'
								: 'border-border bg-card/50 hover:border-border/80'
						)}
					>
						{/* Header */}
						<button
							className="w-full flex items-center justify-between gap-4 p-4 text-left"
							onClick={() => setOpen(open === i ? null : i)}
						>
							<div className="flex items-center gap-3 min-w-0">
								<span
									className={cn(
										'shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border transition-colors',
										open === i
											? 'bg-primary text-primary-foreground border-primary'
											: 'bg-muted text-muted-foreground border-border'
									)}
								>
									{i + 1}
								</span>
								<span
									className={cn(
										'text-sm font-medium truncate',
										open === i
											? 'text-foreground'
											: 'text-foreground/80'
									)}
								>
									{ch.title}
								</span>
							</div>
							<ChevronDown
								size={16}
								className={cn(
									'shrink-0 text-muted-foreground transition-transform duration-200',
									open === i && 'rotate-180'
								)}
							/>
						</button>

						{/* Content */}
						{open === i && (
							<div className="px-4 pb-4 space-y-4">
								<div>
									<span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
										<span className="w-1 h-1 rounded-full bg-destructive/60" />
										Problem
									</span>
									<p className="text-sm text-foreground/80 leading-relaxed">
										{ch.what}
									</p>
								</div>

								<div className="border-l-2 border-primary/30 pl-3">
									<span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
										<span className="w-1 h-1 rounded-full bg-primary/60" />
										How I solved it
									</span>
									<p className="text-sm text-foreground/80 leading-relaxed">
										{ch.how}
									</p>
								</div>

								<div className="flex gap-2 items-start">
									<span className="shrink-0 w-1 h-1 rounded-full bg-primary mt-2" />
									<div>
										<span className="text-xs font-medium text-primary uppercase tracking-wider block mb-1">
											Result
										</span>
										<p className="text-sm text-foreground/80 leading-relaxed">
											{ch.result}
										</p>
									</div>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Challenges;

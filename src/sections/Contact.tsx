import useSectionReveal from '@/hooks/useSectionReveal';
import { personal } from '@/data/portfolio';
import { Mail, Github, Linkedin, FileText, MapPin } from 'lucide-react';

/**
 * External contact entry used to render a contact method card.
 */
type ContactLink = {
	icon: React.ElementType;
	label: string;
	value: string;
	href: string;
	description: string;
	download?: boolean;
};

/**
 * Structured contact methods displayed in the Contact section.
 *
 * @remarks
 * This configuration drives the entire UI rendering of contact links.
 * Keep values in sync with `personal` data source to avoid stale links.
 */
const links: ContactLink[] = [
	{
		icon: Mail,
		label: 'Email',
		value: personal.email,
		href: `mailto:${personal.email}`,
		description: 'Best for job inquiries',
	},
	{
		icon: Github,
		label: 'GitHub',
		value: 'Mofathy183',
		href: personal.github,
		description: 'Code, projects, contributions',
	},
	{
		icon: Linkedin,
		label: 'LinkedIn',
		value: 'mofathy',
		href: personal.linkedin,
		description: 'Professional profile',
	},
	{
		icon: FileText,
		label: 'CV',
		value: 'Download PDF',
		href: personal.cv,
		description: 'Full work history',
		download: true,
	},
];

/**
 * Contact section for professional outreach.
 *
 * @description
 * Provides structured access to communication channels and professional profiles.
 * Designed as a conversion-focused section for recruiters and collaborators.
 *
 * @remarks
 * Relies on `personal` data for identity and location information.
 */
const Contact = () => {
	const ref = useSectionReveal();

	return (
		<section
			id="contact"
			ref={ref as React.RefObject<HTMLElement>}
			className="py-24 border-t border-border"
		>
			<div className="max-w-5xl mx-auto px-6">
				<div className="inline-flex items-center gap-2 text-xs font-medium text-primary uppercase tracking-widest mb-6">
					<span className="w-6 h-px bg-primary" />
					Contact
				</div>

				<div className="flex flex-col md:flex-row md:gap-16">
					<div className="md:w-72 shrink-0 mb-10 md:mb-0">
						<h2 className="font-heading font-semibold text-3xl sm:text-4xl text-foreground tracking-tight mb-3">
							Let's talk
						</h2>
						<p className="text-sm text-muted-foreground leading-relaxed mb-4">
							I'm actively looking for my first full-stack or
							backend role. If you're building something
							interesting and need someone who cares about both
							architecture and execution — let's talk.
						</p>
						<div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
							<MapPin size={12} />
							{personal.location} · Open to remote
						</div>
					</div>

					<div className="flex-1 space-y-3">
						{links.map(
							({
								icon: Icon,
								label,
								value,
								href,
								description,
								download,
							}) => (
								<a
									key={label}
									href={href}
									target={download ? undefined : '_blank'}
									rel={
										download
											? undefined
											: 'noopener noreferrer'
									}
									download={download}
									className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 group transition-all"
								>
									<div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/30 group-hover:bg-primary/5 transition-all shrink-0">
										<Icon size={16} />
									</div>
									<div className="min-w-0">
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium text-foreground">
												{label}
											</span>
											<span className="text-xs text-muted-foreground hidden sm:block">
												— {description}
											</span>
										</div>
										<span className="text-xs text-muted-foreground group-hover:text-primary transition-colors font-mono truncate block">
											{value}
										</span>
									</div>
								</a>
							)
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;

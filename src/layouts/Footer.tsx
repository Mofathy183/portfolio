import { personal } from '@/data/portfolio';

const Footer = () => {
	return (
		<footer className="border-t border-border py-8">
			<div className="max-w-5xl mx-auto px-6">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
					<span>Built with React + Vite + Tailwind v4</span>
					<span>
						{personal.name} · Sol inc · {new Date().getFullYear()}
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

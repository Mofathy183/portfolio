import type { RefObject } from 'react';
import useSectionReveal from '@/hooks/useSectionReveal';
import BeggyHero from './BeggyHero';
import { Highlights, Testing } from './Highlights';
import Architecture from './Architecture';
import Screenshots from './Screenshots';
import Challenges from './Challenges';

/**
 * Composite feature section for the Beggy project case study.
 *
 * @remarks
 * Acts as a layout orchestrator that composes multiple domain-specific UI sections
 * into a single cohesive narrative experience.
 *
 * Also integrates scroll-based reveal behavior to enhance progressive disclosure UX.
 */
const BeggySection = () => {
	/**
	 * Reference used to trigger section reveal animations on scroll.
	 *
	 * @remarks
	 * Provided by `useSectionReveal`, which likely observes intersection visibility
	 * to animate or activate the section when it enters the viewport.
	 */
	const ref = useSectionReveal();

	return (
		<section
			id="beggy"
			ref={ref as RefObject<HTMLElement>}
			className="py-24 border-t border-border"
		>
			<div className="max-w-5xl mx-auto px-6">
				<BeggyHero />
				<Highlights />
				<Architecture />
				<Challenges />
				<Testing />
				<Screenshots />
			</div>
		</section>
	);
};

export default BeggySection;

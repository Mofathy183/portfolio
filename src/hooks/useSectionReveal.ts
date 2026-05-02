import { useEffect, useRef } from 'react';

/**
 * Provides a ref that triggers a one-time reveal animation when the element enters the viewport.
 *
 * @remarks
 * This hook applies CSS classes (`section-hidden`, `section-visible`) based on
 * IntersectionObserver state. Once revealed, observation is terminated to prevent re-triggering.
 *
 * Intended for entrance animations in long-scrolling landing pages.
 *
 * Ref attached to a DOM element that should animate into view on scroll.
 *
 * @remarks
 * The element must support CSS classes:
 * - section-hidden (initial state)
 * - section-visible (final state)
 */
const useSectionReveal = () => {
	const ref = useRef<HTMLElement>(null);

	/**
	 * Intersection observer responsible for triggering the reveal animation.
	 *
	 * @remarks
	 * Uses a low visibility threshold (0.08) to trigger animation slightly before full entry,
	 * improving perceived responsiveness of the UI.
	 *
	 * The observer disconnects after the first successful reveal.
	 */
	useEffect(() => {
		/**
		 * Ensures the reveal animation is triggered only once per element lifecycle.
		 *
		 * @remarks
		 * After the element becomes visible, the observer is disconnected to prevent re-triggering
		 * during subsequent scroll events.
		 */
		const el = ref.current;
		if (!el) return;

		el.classList.add('section-hidden');

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add('section-visible');
					el.classList.remove('section-hidden');
					observer.disconnect();
				}
			},
			{ threshold: 0.08 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return ref;
};

export default useSectionReveal;

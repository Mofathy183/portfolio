import { useEffect, useState } from 'react';

/**
 * Tracks the currently visible section based on scroll position.
 *
 * @remarks
 * Uses IntersectionObserver to determine which section is currently active in the viewport.
 * Intended for navigation highlighting (scroll spy behavior).
 *
 * The active section is determined by the last intersecting element.
 *
 * @param sectionIds - List of DOM element IDs to observe for visibility changes
 * @param offset - Pixel offset used to adjust activation sensitivity (default: 80)
 */
const useScrollSpy = (sectionIds: string[], offset = 80) => {
	/**
	 * Stores the ID of the currently active (visible) section.
	 *
	 * @remarks
	 * Updated whenever an observed section crosses the intersection threshold.
	 */
	const [activeId, setActiveId] = useState<string>('');

	/**
	 * Intersection observer callback responsible for updating active section state.
	 *
	 * @remarks
	 * The last intersecting entry determines the active section.
	 * This means rapid scrolling may cause quick state transitions between sections.
	 */
	useEffect(() => {
		/**
		 * Intersection observer callback responsible for updating active section state.
		 *
		 * @remarks
		 * The last intersecting entry determines the active section.
		 * This means rapid scrolling may cause quick state transitions between sections.
		 */
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			/**
			 * Configures viewport detection sensitivity using rootMargin.
			 *
			 * @remarks
			 * The negative top offset triggers earlier activation before the section fully reaches the top.
			 * The bottom offset prevents premature activation near the bottom of the viewport.
			 */
			{ rootMargin: `-${offset}px 0px -50% 0px` }
		);

		sectionIds.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [sectionIds, offset]);

	return activeId;
};

export default useScrollSpy;

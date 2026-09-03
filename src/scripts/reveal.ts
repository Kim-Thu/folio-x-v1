import { LOADING_SCREEN_COMPLETE_EVENT } from "@/scripts/loading-screen";

const REVEAL_SELECTOR = "[data-reveal], [data-reveal-group]";

function revealImmediately(elements: NodeListOf<HTMLElement>): void {
	elements.forEach((element) => {
		element.dataset.visible = "true";
	});
}

export function initReveal(): void {
	const elements = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
	if (!elements.length) return;

	const startReveal = (): void => {
		document.documentElement.dataset.revealReady = "true";

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (prefersReducedMotion || !("IntersectionObserver" in window)) {
			revealImmediately(elements);
			return;
		}

		const observer = new IntersectionObserver(
			(entries, currentObserver) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					(entry.target as HTMLElement).dataset.visible = "true";
					currentObserver.unobserve(entry.target);
				});
			},
			{ rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
		);

		elements.forEach((element) => observer.observe(element));
	};

	if (document.querySelector("[data-loading-screen]")) {
		window.addEventListener(LOADING_SCREEN_COMPLETE_EVENT, startReveal, {
			once: true,
		});
		return;
	}

	startReveal();
}

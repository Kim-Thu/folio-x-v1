export function initScrollToTop(): void {
	const root = document.querySelector<HTMLElement>("[data-scroll-to-top]");
	const button = root?.querySelector<HTMLButtonElement>("button");
	if (!root || !button) return;

	const syncVisibility = (): void => {
		root.classList.toggle("hidden", window.scrollY <= 480);
	};

	button.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});

	syncVisibility();
	window.addEventListener("scroll", syncVisibility, { passive: true });
}

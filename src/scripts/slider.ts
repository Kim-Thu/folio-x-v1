const getActiveIndex = (viewport: HTMLElement, slides: HTMLElement[]) => {
	const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;

	return slides.reduce(
		(closest, slide, index) => {
			const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
			const distance = Math.abs(viewportCenter - slideCenter);
			return distance < closest.distance ? { index, distance } : closest;
		},
		{ index: 0, distance: Number.POSITIVE_INFINITY },
	).index;
};

export function initSliders(): void {
	document.querySelectorAll<HTMLElement>("[data-slider]").forEach((slider) => {
		const viewport =
			slider.querySelector<HTMLElement>("[data-slider-viewport]");
		const slides = Array.from(
			slider.querySelectorAll<HTMLElement>("[data-slide]"),
		);
		const previous = slider.querySelector<HTMLButtonElement>(
			"[data-slider-previous]",
		);
		const next = slider.querySelector<HTMLButtonElement>(
			"[data-slider-next]",
		);
		const currentLabel = slider.querySelector<HTMLElement>(
			"[data-slider-current]",
		);
		const directButtons = Array.from(
			slider.querySelectorAll<HTMLButtonElement>("[data-slider-go]"),
		);

		if (!viewport || slides.length < 2) return;

		const updateCurrent = () => {
			const activeIndex = getActiveIndex(viewport, slides);
			if (currentLabel) {
				currentLabel.textContent = String(activeIndex + 1).padStart(2, "0");
			}
			directButtons.forEach((button, index) => {
				const current = index === activeIndex;
				button.setAttribute("aria-current", String(current));
				button.classList.toggle("bg-blue-600", current);
				button.classList.toggle("bg-white/60", !current);
			});
		};

		const move = (offset: number) => {
			const current = getActiveIndex(viewport, slides);
			const target = (current + offset + slides.length) % slides.length;
			slides[target]?.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "center",
			});
		};

		previous?.addEventListener("click", () => move(-1));
		next?.addEventListener("click", () => move(1));
		directButtons.forEach((button) => {
			button.addEventListener("click", () => {
				const target = Number(button.dataset.sliderGo);
				slides[target]?.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
					inline: "center",
				});
			});
		});
		viewport.addEventListener("scrollend", updateCurrent);
		updateCurrent();
	});
}

const getSlideScrollLeft = (viewport: HTMLElement, slide: HTMLElement): number => {
	const viewportRect = viewport.getBoundingClientRect();
	const slideRect = slide.getBoundingClientRect();

	return viewport.scrollLeft + slideRect.left - viewportRect.left;
};

const getActiveIndex = (viewport: HTMLElement, slides: HTMLElement[]) =>
	slides.reduce(
		(closest, slide, index) => {
			const distance = Math.abs(
				viewport.scrollLeft - getSlideScrollLeft(viewport, slide),
			);

			return distance < closest.distance ? { index, distance } : closest;
		},
		{ index: 0, distance: Number.POSITIVE_INFINITY },
	).index;

export function initSliders(): void {
	document.querySelectorAll<HTMLElement>("[data-slider]").forEach((slider) => {
		const viewport = slider.querySelector<HTMLElement>("[data-slider-viewport]");
		const slides = Array.from(
			slider.querySelectorAll<HTMLElement>("[data-slide]"),
		);
		const previous = slider.querySelector<HTMLButtonElement>(
			"[data-slider-previous]",
		);
		const next = slider.querySelector<HTMLButtonElement>("[data-slider-next]");
		const currentLabel = slider.querySelector<HTMLElement>(
			"[data-slider-current]",
		);
		const directButtons = Array.from(
			slider.querySelectorAll<HTMLButtonElement>("[data-slider-go]"),
		);

		if (!viewport || slides.length < 2) return;

		const updateCurrent = () => {
			const activeIndex = getActiveIndex(viewport, slides);
			const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
			const atStart = viewport.scrollLeft <= 1;
			const atEnd = viewport.scrollLeft >= maxScrollLeft - 1;

			if (currentLabel) {
				currentLabel.textContent = String(activeIndex + 1).padStart(2, "0");
			}

			if (previous) previous.disabled = atStart;
			if (next) next.disabled = atEnd;

			directButtons.forEach((button, index) => {
				const current = index === activeIndex;
				button.setAttribute("aria-current", String(current));
				button.classList.toggle("bg-blue-600", current);
				button.classList.toggle("bg-white/60", !current);
			});
		};

		const scrollToSlide = (index: number) => {
			const slide = slides[index];
			if (!slide) return;

			const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
			const targetLeft = Math.min(
				Math.max(getSlideScrollLeft(viewport, slide), 0),
				maxScrollLeft,
			);

			viewport.scrollTo({
				left: targetLeft,
				behavior: "smooth",
			});
		};

		const move = (offset: number) => {
			const current = getActiveIndex(viewport, slides);
			const target = Math.min(
				Math.max(current + offset, 0),
				slides.length - 1,
			);

			if (target !== current) scrollToSlide(target);
		};

		previous?.addEventListener("click", () => move(-1));
		next?.addEventListener("click", () => move(1));

		directButtons.forEach((button) => {
			button.addEventListener("click", () => {
				const target = Number(button.dataset.sliderGo);
				if (Number.isInteger(target)) scrollToSlide(target);
			});
		});

		let frame = 0;
		viewport.addEventListener(
			"scroll",
			() => {
				if (frame) cancelAnimationFrame(frame);
				frame = requestAnimationFrame(updateCurrent);
			},
			{ passive: true },
		);

		window.addEventListener("resize", updateCurrent, { passive: true });
		updateCurrent();
	});
}

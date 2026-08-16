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

		const autoplay = slider.dataset.sliderAutoplay === "true";
		const autoplayInterval = Math.max(
			1000,
			Number(slider.dataset.sliderAutoplayInterval) || 5000,
		);
		const draggable = slider.dataset.sliderDraggable === "true";
		const pauseOnHover = slider.dataset.sliderPauseOnHover === "true";

		let autoplayTimer = 0;
		let hoverPaused = false;
		let dragging = false;
		let dragMoved = false;
		let dragStartX = 0;
		let dragStartScrollLeft = 0;
		let dragPointerId = -1;
		let frame = 0;

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

		const stopAutoplay = () => {
			if (!autoplayTimer) return;
			window.clearTimeout(autoplayTimer);
			autoplayTimer = 0;
		};

		const scheduleAutoplay = () => {
			stopAutoplay();
			if (!autoplay || hoverPaused || dragging || document.hidden) return;

			autoplayTimer = window.setTimeout(() => {
				const current = getActiveIndex(viewport, slides);
				const target = current >= slides.length - 1 ? 0 : current + 1;
				scrollToSlide(target);
				scheduleAutoplay();
			}, autoplayInterval);
		};

		const move = (offset: number) => {
			const current = getActiveIndex(viewport, slides);
			const target = Math.min(
				Math.max(current + offset, 0),
				slides.length - 1,
			);

			if (target !== current) scrollToSlide(target);
			scheduleAutoplay();
		};

		previous?.addEventListener("click", () => move(-1));
		next?.addEventListener("click", () => move(1));

		directButtons.forEach((button) => {
			button.addEventListener("click", () => {
				const target = Number(button.dataset.sliderGo);
				if (Number.isInteger(target)) scrollToSlide(target);
				scheduleAutoplay();
			});
		});

		if (draggable) {
			viewport.addEventListener("pointerdown", (event) => {
				if (event.pointerType === "mouse" && event.button !== 0) return;

				dragging = true;
				dragMoved = false;
				dragStartX = event.clientX;
				dragStartScrollLeft = viewport.scrollLeft;
				dragPointerId = event.pointerId;
				viewport.setPointerCapture(event.pointerId);
				stopAutoplay();
			});

			viewport.addEventListener("pointermove", (event) => {
				if (!dragging || event.pointerId !== dragPointerId) return;

				const delta = event.clientX - dragStartX;
				if (Math.abs(delta) > 4) dragMoved = true;
				viewport.scrollLeft = dragStartScrollLeft - delta;

				if (dragMoved) event.preventDefault();
			});

			const finishDrag = (event: PointerEvent) => {
				if (!dragging || event.pointerId !== dragPointerId) return;

				dragging = false;
				if (viewport.hasPointerCapture(event.pointerId)) {
					viewport.releasePointerCapture(event.pointerId);
				}
				dragPointerId = -1;
				scrollToSlide(getActiveIndex(viewport, slides));
				scheduleAutoplay();
			};

			viewport.addEventListener("pointerup", finishDrag);
			viewport.addEventListener("pointercancel", finishDrag);

			viewport.addEventListener(
				"click",
				(event) => {
					if (!dragMoved) return;
					event.preventDefault();
					event.stopPropagation();
					dragMoved = false;
				},
				true,
			);
		}

		if (pauseOnHover) {
			slider.addEventListener("mouseenter", () => {
				hoverPaused = true;
				stopAutoplay();
			});

			slider.addEventListener("mouseleave", () => {
				hoverPaused = false;
				scheduleAutoplay();
			});
		}

		viewport.addEventListener(
			"scroll",
			() => {
				if (frame) cancelAnimationFrame(frame);
				frame = requestAnimationFrame(updateCurrent);
			},
			{ passive: true },
		);

		window.addEventListener("resize", updateCurrent, { passive: true });
		document.addEventListener("visibilitychange", scheduleAutoplay);

		updateCurrent();
		scheduleAutoplay();
	});
}

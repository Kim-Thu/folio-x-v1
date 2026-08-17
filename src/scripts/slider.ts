import EmblaCarousel from "embla-carousel";

const sliderSelector = "[data-slider]";
const viewportSelector = "[data-slider-viewport]";
const containerSelector = "[data-slider-container]";
const slideSelector = "[data-slide]";
const previousSelector = "[data-slider-previous]";
const nextSelector = "[data-slider-next]";
const currentSelector = "[data-slider-current]";
const totalSelector = "[data-slider-total]";
const goSelector = "[data-slider-go]";

const toBoolean = (value: string | undefined, fallback: boolean) => {
	if (value === "true") return true;
	if (value === "false") return false;
	return fallback;
};

const toInterval = (value: string | undefined) => {
	const parsed = Number(value);
	return Number.isFinite(parsed) ? Math.max(1000, parsed) : 5000;
};

const initSlider = (root: HTMLElement) => {
	if (root.dataset.sliderInitialized === "true") return;

	const viewport = root.querySelector<HTMLElement>(viewportSelector);
	const container = viewport?.querySelector<HTMLElement>(containerSelector);
	const slides = container
		? Array.from(container.querySelectorAll<HTMLElement>(`:scope > ${slideSelector}`))
		: [];

	if (!viewport || !container || slides.length === 0) return;

	const autoplay = toBoolean(root.dataset.sliderAutoplay, false);
	const autoplayInterval = toInterval(root.dataset.sliderAutoplayInterval);
	const draggable = toBoolean(root.dataset.sliderDraggable, true);
	const loop = toBoolean(root.dataset.sliderLoop, false);
	const pauseOnHover = toBoolean(root.dataset.sliderPauseOnHover, true);

	const embla = EmblaCarousel(viewport, {
		align: "start",
		container,
		containScroll: "trimSnaps",
		loop,
		slides,
		watchDrag: draggable,
	});

	root.dataset.sliderInitialized = "true";

	const previous = root.querySelector<HTMLButtonElement>(previousSelector);
	const next = root.querySelector<HTMLButtonElement>(nextSelector);
	const current = root.querySelector<HTMLElement>(currentSelector);
	const total = root.querySelector<HTMLElement>(totalSelector);
	const directButtons = Array.from(
		root.querySelectorAll<HTMLButtonElement>(goSelector),
	);

	let autoplayTimer: number | undefined;
	let hoverPaused = false;

	const stopAutoplay = () => {
		if (autoplayTimer === undefined) return;
		window.clearTimeout(autoplayTimer);
		autoplayTimer = undefined;
	};

	const scheduleAutoplay = () => {
		stopAutoplay();
		if (!autoplay || hoverPaused || document.hidden) return;

		autoplayTimer = window.setTimeout(() => {
			if (embla.canScrollNext()) {
				embla.scrollNext();
			} else {
				embla.scrollTo(0);
			}
		}, autoplayInterval);
	};

	const updateControls = () => {
		const selectedIndex = embla.selectedScrollSnap();
		const snapCount = embla.scrollSnapList().length;

		if (current) {
			current.textContent = String(selectedIndex + 1).padStart(2, "0");
		}

		if (total) {
			total.textContent = String(snapCount).padStart(2, "0");
		}

		if (previous) previous.disabled = !embla.canScrollPrev();
		if (next) next.disabled = !embla.canScrollNext();

		directButtons.forEach((button, index) => {
			const available = index < snapCount;
			const selected = available && index === selectedIndex;
			button.hidden = !available;
			button.setAttribute("aria-current", selected ? "true" : "false");
			button.dataset.current = selected ? "true" : "false";
		});
	};

	const handlePrevious = () => embla.scrollPrev();
	const handleNext = () => embla.scrollNext();
	const handleVisibilityChange = () => {
		if (document.hidden) {
			stopAutoplay();
			return;
		}
		scheduleAutoplay();
	};
	const handleMouseEnter = () => {
		hoverPaused = true;
		stopAutoplay();
	};
	const handleMouseLeave = () => {
		hoverPaused = false;
		scheduleAutoplay();
	};
	const handlePointerDown = () => stopAutoplay();
	const handlePointerUp = () => scheduleAutoplay();
	const handleSelect = () => {
		updateControls();
		scheduleAutoplay();
	};
	const handleReInit = () => {
		updateControls();
		scheduleAutoplay();
	};

	const directHandlers = directButtons.map((button, index) => {
		const handler = () => embla.scrollTo(index);
		button.addEventListener("click", handler);
		return { button, handler };
	});

	previous?.addEventListener("click", handlePrevious);
	next?.addEventListener("click", handleNext);
	document.addEventListener("visibilitychange", handleVisibilityChange);

	if (pauseOnHover) {
		root.addEventListener("mouseenter", handleMouseEnter);
		root.addEventListener("mouseleave", handleMouseLeave);
	}

	embla.on("pointerDown", handlePointerDown);
	embla.on("pointerUp", handlePointerUp);
	embla.on("select", handleSelect);
	embla.on("reInit", handleReInit);

	updateControls();
	scheduleAutoplay();

	window.addEventListener(
		"pagehide",
		() => {
			stopAutoplay();
			previous?.removeEventListener("click", handlePrevious);
			next?.removeEventListener("click", handleNext);
			document.removeEventListener("visibilitychange", handleVisibilityChange);

			if (pauseOnHover) {
				root.removeEventListener("mouseenter", handleMouseEnter);
				root.removeEventListener("mouseleave", handleMouseLeave);
			}

			directHandlers.forEach(({ button, handler }) => {
				button.removeEventListener("click", handler);
			});

			embla.destroy();
			delete root.dataset.sliderInitialized;
		},
		{ once: true },
	);
};

export const initSliders = () => {
	document.querySelectorAll<HTMLElement>(sliderSelector).forEach(initSlider);
};

import { createElement, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";

import type { CSliderEmblaProps } from "@/types/components/object/component/CSliderEmbla.types";

export default function CSliderEmbla({
	autoplay,
	autoplayInterval,
	draggable,
	loop,
	pauseOnHover,
}: CSliderEmblaProps) {
	const controllerRef = useRef<HTMLSpanElement | null>(null);
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		containScroll: "trimSnaps",
		loop,
		watchDrag: draggable,
	});

	useEffect(() => {
		const controller = controllerRef.current;
		const root = controller?.closest("[data-slider]") as HTMLElement | null;
		const viewport = root?.querySelector("[data-slider-viewport]") as HTMLElement | null;

		if (!viewport) return;

		emblaRef(viewport);

		return () => {
			emblaRef(null);
		};
	}, [emblaRef]);

	useEffect(() => {
		if (!emblaApi) return;

		const viewport = emblaApi.rootNode();
		const root = viewport.closest("[data-slider]") as HTMLElement | null;
		if (!root) return;

		const previous = root.querySelector("[data-slider-previous]") as HTMLButtonElement | null;
		const next = root.querySelector("[data-slider-next]") as HTMLButtonElement | null;
		const currentLabel = root.querySelector("[data-slider-current]") as HTMLElement | null;
		const totalLabel = root.querySelector("[data-slider-total]") as HTMLElement | null;
		const directButtons = Array.from(
			root.querySelectorAll("[data-slider-go]"),
		) as HTMLButtonElement[];

		let autoplayTimer = 0;
		let hoverPaused = false;

		const updateControls = () => {
			const selectedIndex = emblaApi.selectedScrollSnap();
			const snapCount = emblaApi.scrollSnapList().length;

			if (currentLabel) {
				currentLabel.textContent = String(selectedIndex + 1).padStart(2, "0");
			}

			if (totalLabel) {
				totalLabel.textContent = String(snapCount).padStart(2, "0");
			}

			if (previous) previous.disabled = loop ? false : !emblaApi.canScrollPrev();
			if (next) next.disabled = loop ? false : !emblaApi.canScrollNext();

			directButtons.forEach((button, index) => {
				const available = index < snapCount;
				const current = available && index === selectedIndex;

				button.hidden = !available;
				button.setAttribute("aria-current", current ? "true" : "false");
				button.dataset.current = current ? "true" : "false";
			});
		};

		const stopAutoplay = () => {
			if (!autoplayTimer) return;
			window.clearTimeout(autoplayTimer);
			autoplayTimer = 0;
		};

		const scheduleAutoplay = () => {
			stopAutoplay();
			if (!autoplay || hoverPaused || document.hidden) return;

			autoplayTimer = window.setTimeout(() => {
				if (loop || emblaApi.canScrollNext()) {
					emblaApi.scrollNext();
				} else {
					emblaApi.scrollTo(0);
				}
				scheduleAutoplay();
			}, Math.max(1000, autoplayInterval));
		};

		const handlePrevious = () => {
			emblaApi.scrollPrev();
			scheduleAutoplay();
		};

		const handleNext = () => {
			emblaApi.scrollNext();
			scheduleAutoplay();
		};

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

		const directHandlers = directButtons.map((button, index) => {
			const handler = () => {
				emblaApi.scrollTo(index);
				scheduleAutoplay();
			};
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

		emblaApi.on("select", updateControls);
		emblaApi.on("reInit", updateControls);

		updateControls();
		scheduleAutoplay();

		return () => {
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

			emblaApi.off("select", updateControls);
			emblaApi.off("reInit", updateControls);
		};
	}, [emblaApi, autoplay, autoplayInterval, loop, pauseOnHover]);

	return createElement("span", {
		ref: controllerRef,
		hidden: true,
		"data-slider-controller": "",
	});
}

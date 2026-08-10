export function initFooterReveal(): void {
	const root = document.querySelector<HTMLElement>("[data-footer-reveal]");
	const panel = root?.querySelector<HTMLElement>("[data-footer-reveal-panel]");
	const space = root?.querySelector<HTMLElement>("[data-footer-reveal-space]");
	const profile = panel?.querySelector<HTMLElement>("[data-closing-profile]");

	const stage = profile?.querySelector<HTMLElement>(
		"[data-closing-profile-stage]",
	);

	const motionElements = profile?.querySelectorAll<HTMLElement>(
		"[data-closing-profile-motion]",
	);

	if (
		!root ||
		!panel ||
		!space ||
		!profile ||
		!stage ||
		!motionElements?.length
	) {
		return;
	}

	let scrollFrame = 0;
	let layoutFrame = 0;
	let revealProgress = 0;

	const animationDuration = 1000;
	const motionAnimations = new Map<HTMLElement, Animation>();

	const clamp = (value: number, minimum: number, maximum: number): number => {
		return Math.min(maximum, Math.max(minimum, value));
	};

	const resetMotion = (): void => {
		motionElements.forEach((element) => {
			motionAnimations.get(element)?.cancel();
			motionAnimations.delete(element);
			element.style.removeProperty("transform");
		});
	};

	const syncMotionBounds = (): void => {
		resetMotion();

		const stageRect = stage.getBoundingClientRect();

		/*
		 * Khoảng chữ tách khỏi tâm.
		 * Co theo màn hình nhưng không bị bay quá xa.
		 */
		const travelDistance = Math.min(320, stageRect.width * 0.22);

		motionElements.forEach((element) => {
			const direction =
				element.dataset.closingProfileMotion === "left" ? -1 : 1;

			const elementRect = element.getBoundingClientRect();

			/*
			 * Giới hạn để chữ không vượt khỏi stage.
			 */
			const minimumOffset = stageRect.left - elementRect.left;

			const maximumOffset = stageRect.right - elementRect.right;

			const desiredOffset = travelDistance * direction;

			const targetOffset = clamp(desiredOffset, minimumOffset, maximumOffset);

			const animation = element.animate(
				[
					{
						transform: "translateX(0)",
					},
					{
						transform: `translateX(${targetOffset}px)`,
					},
				],
				{
					duration: animationDuration,
					easing: "linear",
					fill: "both",
				},
			);

			animation.pause();
			animation.currentTime = revealProgress * animationDuration;

			motionAnimations.set(element, animation);
		});
	};

	const updateProfilePosition = (): void => {
		const spaceRect = space.getBoundingClientRect();
		const revealedDistance = window.innerHeight - spaceRect.top;

		revealProgress = clamp(
			revealedDistance / Math.max(spaceRect.height, 1),
			0,
			1,
		);

		motionAnimations.forEach((animation) => {
			animation.currentTime = revealProgress * animationDuration;
		});
	};

	const requestProfileUpdate = (): void => {
		if (scrollFrame) return;

		scrollFrame = window.requestAnimationFrame(() => {
			updateProfilePosition();
			scrollFrame = 0;
		});
	};

	const syncLayout = (): void => {
		if (layoutFrame) {
			window.cancelAnimationFrame(layoutFrame);
		}

		layoutFrame = window.requestAnimationFrame(() => {
			syncMotionBounds();
			updateProfilePosition();

			layoutFrame = 0;
		});
	};

	const resizeObserver = new ResizeObserver(() => {
		syncLayout();
	});

	resizeObserver.observe(stage);

	motionElements.forEach((element) => {
		resizeObserver.observe(element);
	});

	void document.fonts.ready.then(syncLayout);

	window.addEventListener("scroll", requestProfileUpdate, {
		passive: true,
	});

	window.addEventListener("resize", syncLayout, {
		passive: true,
	});

	syncLayout();
}

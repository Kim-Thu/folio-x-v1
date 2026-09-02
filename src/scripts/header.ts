export function initHeader(): void {
	const header = document.querySelector<HTMLElement>("#header");
	const menuButton = header?.querySelector<HTMLButtonElement>("[data-menu-toggle]");
	const menuId = menuButton?.getAttribute("aria-controls");
	const mobileMenu = menuId ? document.getElementById(menuId) : null;

	if (!header || !menuButton || !mobileMenu) return;

	let previousScrollY = Math.max(window.scrollY, 0);
	let scrollFrame = 0;

	const menuIsOpen = (): boolean =>
		menuButton.getAttribute("aria-expanded") === "true";

	const getMenuFocusables = (): HTMLElement[] => {
		const menuFocusables = Array.from(
			mobileMenu.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
			),
		);

		return [menuButton, ...menuFocusables];
	};

	const updateHeader = (): void => {
		const currentScrollY = Math.max(window.scrollY, 0);
		const isPastHeader = currentScrollY > header.offsetHeight;
		const isScrollingDown = currentScrollY > previousScrollY;
		const hasHeaderFocus = header.contains(document.activeElement);

		const solidSurface = header.dataset.solidHeader === "true" || isPastHeader;
		const hidden =
			!menuIsOpen() && !hasHeaderFocus && isPastHeader && isScrollingDown;
		header.dataset.scrollSurface = solidSurface ? "solid" : "transparent";
		header.dataset.scrollState = hidden ? "hidden" : "visible";
		header.classList.toggle("-translate-y-full", hidden);
		header.classList.toggle(
			"bg-black/80",
			solidSurface && header.dataset.headerTone === "dark",
		);
		header.classList.toggle(
			"bg-white/90",
			solidSurface && header.dataset.headerTone !== "dark",
		);
		previousScrollY = currentScrollY;
	};

	const requestHeaderUpdate = (): void => {
		if (scrollFrame) return;

		scrollFrame = window.requestAnimationFrame(() => {
			updateHeader();
			scrollFrame = 0;
		});
	};

	const setMenuState = (isOpen: boolean): void => {
		menuButton.setAttribute("aria-expanded", String(isOpen));
		menuButton.setAttribute(
			"aria-label",
			isOpen
				? (menuButton.dataset.closeLabel ?? "")
				: (menuButton.dataset.openLabel ?? ""),
		);
		mobileMenu.dataset.menuState = isOpen ? "open" : "closed";
		mobileMenu.classList.toggle("invisible", !isOpen);
		mobileMenu.classList.toggle("-translate-y-3", !isOpen);
		mobileMenu.classList.toggle("opacity-0", !isOpen);
		mobileMenu.classList.toggle("visible", isOpen);
		mobileMenu.classList.toggle("translate-y-0", isOpen);
		mobileMenu.classList.toggle("opacity-100", isOpen);
		mobileMenu.setAttribute("aria-hidden", String(!isOpen));
		mobileMenu.inert = !isOpen;
		header.dataset.scrollState = "visible";
		header.classList.remove("-translate-y-full");
	};

	window.addEventListener("scroll", requestHeaderUpdate, { passive: true });
	menuButton.addEventListener("click", () => setMenuState(!menuIsOpen()));
	mobileMenu.addEventListener("click", (event) => {
		if ((event.target as Element).closest("a")) setMenuState(false);
	});

	header.addEventListener("focusin", updateHeader);
	header.addEventListener("focusout", () => {
		window.requestAnimationFrame(updateHeader);
	});

	document.addEventListener("keydown", (event) => {
		if (!menuIsOpen()) return;

		if (event.key === "Escape") {
			setMenuState(false);
			menuButton.focus();
			return;
		}

		if (event.key !== "Tab") return;

		const focusables = getMenuFocusables();
		if (focusables.length === 0) return;

		const activeElement = document.activeElement as HTMLElement | null;
		const currentIndex = activeElement ? focusables.indexOf(activeElement) : -1;
		const first = focusables[0];
		const last = focusables[focusables.length - 1];

		if (event.shiftKey && currentIndex <= 0) {
			event.preventDefault();
			last?.focus();
			return;
		}

		if (!event.shiftKey && (currentIndex === -1 || currentIndex === focusables.length - 1)) {
			event.preventDefault();
			first?.focus();
		}
	});

	updateHeader();
}

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

	const updateHeader = (): void => {
		const currentScrollY = Math.max(window.scrollY, 0);
		const isPastHeader = currentScrollY > header.offsetHeight;
		const isScrollingDown = currentScrollY > previousScrollY;

		const solidSurface = header.dataset.solidHeader === "true" || isPastHeader;
		const hidden = !menuIsOpen() && isPastHeader && isScrollingDown;

		header.dataset.scrollSurface = solidSurface ? "solid" : "transparent";
		header.dataset.scrollState = hidden ? "hidden" : "visible";
		header.classList.toggle("-translate-y-full", hidden);
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
	};

	window.addEventListener("scroll", requestHeaderUpdate, { passive: true });
	menuButton.addEventListener("click", () => setMenuState(!menuIsOpen()));
	mobileMenu.addEventListener("click", (event) => {
		if ((event.target as Element).closest("a")) setMenuState(false);
	});
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && menuIsOpen()) {
			setMenuState(false);
			menuButton.focus();
		}
	});

	updateHeader();
}

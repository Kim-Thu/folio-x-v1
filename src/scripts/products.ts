function initProductsRoot(root: HTMLElement): void {
	const grid = root.querySelector<HTMLElement>("[data-product-grid]");
	const cards = Array.from(
		root.querySelectorAll<HTMLElement>("[data-product-item]"),
	);
	const search = root.querySelector<HTMLInputElement>("[data-product-search]");
	const categorySelect =
		root.querySelector<HTMLSelectElement>("[data-category-select]");
	const platformSelect =
		root.querySelector<HTMLSelectElement>("[data-platform-select]");
	const sortSelect = root.querySelector<HTMLSelectElement>("[data-product-sort]");
	const range = root.querySelector<HTMLInputElement>("[data-price-filter]");
	const priceOutput =
		root.querySelector<HTMLOutputElement>("[data-price-output]");
	const count = root.querySelector<HTMLElement>("[data-result-count]");
	const empty = root.querySelector<HTMLElement>("[data-product-empty]");
	const pagination = root.querySelector<HTMLElement>("[data-pagination]");
	const pageButtons = Array.from(
		root.querySelectorAll<HTMLButtonElement>("[data-page]"),
	);
	const previous =
		root.querySelector<HTMLButtonElement>("[data-page-previous]");
	const next = root.querySelector<HTMLButtonElement>("[data-page-next]");
	const navigationFilters = Array.from(
		root.querySelectorAll<HTMLButtonElement>("[data-choice-filter]"),
	);
	const pageSize = 9;
	let currentPage = 1;

	if (!cards.length || !grid) return;

	const gridColumnClasses = Array.from(grid.classList).filter((className) =>
		className.includes("grid-cols-"),
	);

	const cardData = (card: HTMLElement): HTMLElement =>
		card.querySelector<HTMLElement>("[data-card-view='grid'] [data-product-card]") ??
		card;

	const selectedCategory = (): string =>
		root.querySelector<HTMLInputElement>(
			'input[name="product-category"]:checked',
		)?.value ?? "all";

	const selectedValues = (selector: string): string[] =>
		Array.from(root.querySelectorAll<HTMLInputElement>(selector)).map(
			(item) => item.value,
		);

	const selectedNavigationValue = (control: string): string | undefined =>
		navigationFilters.find(
			(button) =>
				button.dataset.choiceControl === control &&
				button.getAttribute("aria-pressed") === "true",
		)?.dataset.choiceValue;

	const syncSelectDisplay = (
		select: HTMLSelectElement,
		value: string,
	): void => {
		select.value = value;
		const selectRoot = select.closest<HTMLElement>("[data-select]");
		const option = selectRoot?.querySelector<HTMLElement>(
			`[data-select-option][data-value="${value}"]`,
		);
		const label = selectRoot?.querySelector<HTMLElement>("[data-select-label]");
		if (label && option) label.textContent = option.textContent?.trim() ?? "";
		selectRoot
			?.querySelectorAll<HTMLElement>("[data-select-option]")
			.forEach((item) => {
				item.setAttribute("aria-selected", String(item === option));
			});
	};

	const syncNavigationFilter = (control: string, value: string): void => {
		navigationFilters
			.filter((button) => button.dataset.choiceControl === control)
			.forEach((button) => {
				button.setAttribute(
					"aria-pressed",
					String(button.dataset.choiceValue === value),
				);
			});
	};

	const syncPriceOutput = (): void => {
		if (!range || !priceOutput) return;
		priceOutput.value = `$${range.value}${
			range.value === range.max ? "+" : ""
		}`;
	};

	const applyView = (view: "grid" | "list"): void => {
		gridColumnClasses.forEach((className) => {
			grid.classList.toggle(className, view === "grid");
		});

		if (view === "list") {
			grid.classList.add("grid-cols-1");
		} else if (!gridColumnClasses.includes("grid-cols-1")) {
			grid.classList.remove("grid-cols-1");
		}

		cards.forEach((card) => {
			const gridCard = card.querySelector<HTMLElement>("[data-card-view='grid']");
			const listCard = card.querySelector<HTMLElement>("[data-card-view='list']");
			if (gridCard) gridCard.hidden = view !== "grid";
			if (listCard) listCard.hidden = view !== "list";
		});

		grid.dataset.view = view;
	};

	const render = (): void => {
		const term = search?.value.trim().toLowerCase() ?? "";
		const category = categorySelect?.value ?? selectedCategory();
		const selectedPlatforms = selectedValues("[data-platform-filter]:checked");
		const selectedLicenses = selectedValues("[data-license-filter]:checked");
		const selectedRatings = selectedValues("[data-rating-filter]:checked").map(
			Number,
		);
		const toolbarPlatform =
			platformSelect?.value ?? selectedNavigationValue("platform") ?? "all";
		const maxPrice = Number(range?.value ?? 69);

		const visible = cards.filter((card) => {
			const data = cardData(card).dataset;
			const matchesTerm = !term || (data.title ?? "").includes(term);
			const matchesCategory =
				category === "all" || data.filterCategory === category;
			const matchesPlatforms =
				!selectedPlatforms.length ||
				selectedPlatforms.includes(data.platform ?? "");
			const matchesLicense =
				!selectedLicenses.length ||
				selectedLicenses.includes(data.license ?? "");
			const matchesRating =
				!selectedRatings.length ||
				selectedRatings.some((rating) => Number(data.rating) >= rating);
			const matchesToolbarPlatform =
				toolbarPlatform === "all" || data.platform === toolbarPlatform;

			return (
				matchesTerm &&
				matchesCategory &&
				matchesPlatforms &&
				matchesLicense &&
				matchesRating &&
				matchesToolbarPlatform &&
				Number(data.price) <= maxPrice
			);
		});

		const sort = sortSelect?.value;
		visible.sort((first, second) => {
			const firstData = cardData(first).dataset;
			const secondData = cardData(second).dataset;

			if (sort === "price-low") {
				return Number(firstData.price) - Number(secondData.price);
			}
			if (sort === "price-high") {
				return Number(secondData.price) - Number(firstData.price);
			}
			if (sort === "rating") {
				return Number(secondData.rating) - Number(firstData.rating);
			}
			return (
				Number(firstData.sortIndex ?? 0) -
				Number(secondData.sortIndex ?? 0)
			);
		});
		visible.forEach((card) => grid.append(card));

		const pages = Math.max(1, Math.ceil(visible.length / pageSize));
		currentPage = Math.min(currentPage, pages);
		cards.forEach((card) => {
			card.hidden = true;
		});
		visible
			.slice((currentPage - 1) * pageSize, currentPage * pageSize)
			.forEach((card) => {
				card.hidden = false;
			});

		if (count) count.textContent = String(visible.length);
		if (empty) empty.hidden = visible.length > 0;
		if (pagination) pagination.hidden = visible.length === 0;
		pageButtons.forEach((button) => {
			const page = Number(button.dataset.page);
			button.parentElement?.toggleAttribute("hidden", page > pages);
			if (page === currentPage) button.setAttribute("aria-current", "page");
			else button.removeAttribute("aria-current");
		});
		if (previous) previous.disabled = currentPage === 1;
		if (next) next.disabled = currentPage === pages;
	};

	const resetAndRender = (): void => {
		currentPage = 1;
		render();
	};

	root
		.querySelectorAll<HTMLInputElement>('input[name="product-category"]')
		.forEach((radio) => {
			radio.addEventListener("change", () => {
				if (categorySelect) syncSelectDisplay(categorySelect, radio.value);
				resetAndRender();
			});
		});

	[categorySelect, platformSelect, sortSelect].forEach((control) => {
		control?.addEventListener("change", () => {
			if (categorySelect && control === categorySelect) {
				const matchingRadio = root.querySelector<HTMLInputElement>(
					`input[name="product-category"][value="${categorySelect.value}"]`,
				);
				if (matchingRadio) matchingRadio.checked = true;
			}
			if (platformSelect && control === platformSelect) {
				syncNavigationFilter("platform", platformSelect.value);
			}
			resetAndRender();
		});
	});

	navigationFilters.forEach((button) => {
		button.addEventListener("click", () => {
			const control = button.dataset.choiceControl;
			const value = button.dataset.choiceValue;
			if (!control || !value) return;

			syncNavigationFilter(control, value);
			if (control === "platform" && platformSelect) {
				syncSelectDisplay(platformSelect, value);
			}
			resetAndRender();
		});
	});

	[search, range].forEach((control) => {
		control?.addEventListener("input", () => {
			syncPriceOutput();
			resetAndRender();
		});
	});

	root
		.querySelectorAll<HTMLInputElement>(
			"[data-platform-filter], [data-license-filter], [data-rating-filter]",
		)
		.forEach((control) => control.addEventListener("change", resetAndRender));

	root
		.querySelectorAll<HTMLButtonElement>("[data-view-control]")
		.forEach((button) => {
			button.addEventListener("click", () => {
				root.querySelectorAll("[data-view-control]").forEach((item) => {
					item.setAttribute("aria-pressed", String(item === button));
				});
				applyView(button.dataset.viewControl === "list" ? "list" : "grid");
			});
		});

	root
		.querySelectorAll<HTMLButtonElement>("[data-cart-button]")
		.forEach((button) => {
			button.addEventListener("click", () => {
				const active = button.getAttribute("aria-pressed") === "true";
				const item = button.closest<HTMLElement>("[data-product-item]");
				const nextValue = String(!active);
				(item ?? root)
					.querySelectorAll<HTMLButtonElement>("[data-cart-button]")
					.forEach((cartButton) => {
						cartButton.setAttribute("aria-pressed", nextValue);
					});
			});
		});

	pageButtons.forEach((button) => {
		button.addEventListener("click", () => {
			currentPage = Number(button.dataset.page) || 1;
			render();
		});
	});
	previous?.addEventListener("click", () => {
		if (currentPage <= 1) return;
		currentPage -= 1;
		render();
	});
	next?.addEventListener("click", () => {
		currentPage += 1;
		render();
	});

	if (platformSelect) {
		syncNavigationFilter("platform", platformSelect.value);
	}
	syncPriceOutput();
	applyView("grid");
	render();
}

export function initProducts(scope: ParentNode = document): void {
	scope
		.querySelectorAll<HTMLElement>('[data-filter-mode="faceted"]')
		.forEach((root) => {
			if (!root.querySelector("[data-product-item]")) return;
			initProductsRoot(root);
		});
}

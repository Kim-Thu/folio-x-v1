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
	const reset = root.querySelector<HTMLButtonElement>("[data-filter-reset]");
	const pageButtons = Array.from(
		root.querySelectorAll<HTMLButtonElement>("[data-page]"),
	);
	const previous =
		root.querySelector<HTMLButtonElement>("[data-page-previous]");
	const next = root.querySelector<HTMLButtonElement>("[data-page-next]");
	const navigationFilters = Array.from(
		root.querySelectorAll<HTMLButtonElement>("[data-choice-filter]"),
	);
	const navigationLinks = Array.from(
		root.querySelectorAll<HTMLAnchorElement>("[data-choice-link]"),
	);
	const platformControls = Array.from(
		root.querySelectorAll<HTMLInputElement>("[data-platform-filter]"),
	);
	const licenseControls = Array.from(
		root.querySelectorAll<HTMLInputElement>("[data-license-filter]"),
	);
	const ratingControls = Array.from(
		root.querySelectorAll<HTMLInputElement>("[data-rating-filter]"),
	);
	const pageSize = Number(root.dataset.paginationPageSize ?? 9);
	let currentPage = 1;

	if (!cards.length || !grid) return;

	const normalizedPath = (): string =>
		window.location.pathname.replace(/\/+$/, "") || "/";
	const isProductsIndex = (): boolean => normalizedPath() === "/products";
	const isProductCategoryRoute = (): boolean =>
		/^\/products\/category\/[^/]+$/.test(normalizedPath());

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
		)?.dataset.choiceValue ??
		navigationLinks.find(
			(link) =>
				link.dataset.choiceControl === control &&
				Boolean(link.getAttribute("aria-current")),
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
		const hasActiveValue = value !== "all";

		navigationFilters
			.filter((button) => button.dataset.choiceControl === control)
			.forEach((button) => {
				button.setAttribute(
					"aria-pressed",
					String(hasActiveValue && button.dataset.choiceValue === value),
				);
			});

		navigationLinks
			.filter((link) => link.dataset.choiceControl === control)
			.forEach((link) => {
				if (hasActiveValue && link.dataset.choiceValue === value) {
					link.setAttribute("aria-current", "page");
				} else {
					link.removeAttribute("aria-current");
				}
			});
	};

	const navigationHref = (control: string, value: string): string | undefined =>
		navigationLinks.find(
			(link) =>
				link.dataset.choiceControl === control &&
				link.dataset.choiceValue === value,
		)?.href;

	const syncPriceOutput = (): void => {
		if (!range || !priceOutput) return;
		priceOutput.value = `$${range.value}${
			range.value === range.max ? "+" : ""
		}`;
	};

	const syncPlatformControls = (values: string[]): void => {
		platformControls.forEach((control) => {
			control.checked = values.includes(control.value);
		});
	};

	const syncPlatformSelectFromControls = (): void => {
		if (!platformSelect) return;
		const selected = platformControls.filter((control) => control.checked);
		syncSelectDisplay(
			platformSelect,
			selected.length === 1 ? selected[0].value : "all",
		);
	};

	const setCheckedValues = (
		controls: HTMLInputElement[],
		values: string[],
	): void => {
		controls.forEach((control) => {
			control.checked = values.includes(control.value);
		});
	};

	const readListParam = (name: string): string[] => {
		const value = new URLSearchParams(window.location.search).get(name);
		if (!value) return [];
		return value.split(",").map((item) => item.trim()).filter(Boolean);
	};

	const writeListParam = (
		params: URLSearchParams,
		name: string,
		values: string[],
	): void => {
		if (values.length) params.set(name, values.join(","));
		else params.delete(name);
	};

	const categoryFromPath = (): string => {
		if (!isProductCategoryRoute()) return "all";
		const currentPath = normalizedPath();
		const currentLink = navigationLinks.find((link) => {
			if (link.dataset.choiceControl !== "category") return false;
			return new URL(link.href, window.location.href).pathname.replace(/\/+$/, "") === currentPath;
		});
		return currentLink?.dataset.choiceValue ?? "all";
	};

	const syncLocationFromFilters = (): void => {
		const params = new URLSearchParams(window.location.search);

		if (isProductsIndex()) {
			const category =
				categorySelect?.value ?? selectedNavigationValue("category") ?? "all";
			if (category !== "all") params.set("categories", category);
			else params.delete("categories");
		} else {
			params.delete("categories");
		}

		writeListParam(
			params,
			"platform",
			selectedValues("[data-platform-filter]:checked"),
		);
		writeListParam(
			params,
			"license",
			selectedValues("[data-license-filter]:checked"),
		);
		writeListParam(
			params,
			"rating",
			selectedValues("[data-rating-filter]:checked"),
		);

		if (range && range.value !== range.max) params.set("price", range.value);
		else params.delete("price");

		const query = params.toString();
		const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
		window.history.replaceState({}, "", nextUrl);
	};

	const syncFiltersFromLocation = (): void => {
		const params = new URLSearchParams(window.location.search);
		const category = isProductCategoryRoute()
			? categoryFromPath()
			: params.get("categories") ?? "all";

		if (categorySelect) syncSelectDisplay(categorySelect, category);
		syncNavigationFilter("category", category);

		const platforms = readListParam("platform");
		syncPlatformControls(platforms);
		syncPlatformSelectFromControls();
		setCheckedValues(licenseControls, readListParam("license"));
		setCheckedValues(ratingControls, readListParam("rating"));

		if (range) {
			const price = Number(params.get("price"));
			range.value = Number.isFinite(price) && price >= Number(range.min) && price <= Number(range.max)
				? String(price)
				: range.max;
		}

		syncPriceOutput();
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
		const category =
			categorySelect?.value ?? selectedNavigationValue("category") ?? selectedCategory();
		const selectedPlatforms = selectedValues("[data-platform-filter]:checked");
		const selectedLicenses = selectedValues("[data-license-filter]:checked");
		const selectedRatings = selectedValues("[data-rating-filter]:checked").map(
			Number,
		);
		const toolbarPlatform = platformSelect?.value ?? "all";
		const activePlatforms = selectedPlatforms.length
			? selectedPlatforms
			: toolbarPlatform !== "all"
				? [toolbarPlatform]
				: [];
		const maxPrice = range ? Number(range.value) : Number.POSITIVE_INFINITY;

		const visible = cards.filter((card) => {
			const data = cardData(card).dataset;
			const matchesTerm = !term || (data.title ?? "").includes(term);
			const matchesCategory =
				category === "all" || data.filterCategory === category;
			const matchesPlatforms =
				!activePlatforms.length ||
				activePlatforms.includes(data.platform ?? "");
			const matchesLicense =
				!selectedLicenses.length ||
				selectedLicenses.includes(data.license ?? "");
			const matchesRating =
				!selectedRatings.length ||
				selectedRatings.some((rating) => Number(data.rating) >= rating);

			return (
				matchesTerm &&
				matchesCategory &&
				matchesPlatforms &&
				matchesLicense &&
				matchesRating &&
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

	const selectCategory = (value: string): void => {
		if (isProductCategoryRoute()) {
			const href = value === "all" ? "/products" : navigationHref("category", value);
			if (href) window.location.assign(href);
			return;
		}

		if (categorySelect) syncSelectDisplay(categorySelect, value);
		syncNavigationFilter("category", value);
		syncLocationFromFilters();
		resetAndRender();
	};

	const selectToolbarPlatform = (value: string): void => {
		if (platformSelect) syncSelectDisplay(platformSelect, value);
		syncPlatformControls(value === "all" ? [] : [value]);
		syncLocationFromFilters();
		resetAndRender();
	};

	const resetAllFilters = (): void => {
		if (search) search.value = "";
		if (platformSelect) syncSelectDisplay(platformSelect, "all");
		if (range) range.value = range.max;

		platformControls.forEach((control) => {
			control.checked = false;
		});
		licenseControls.forEach((control) => {
			control.checked = false;
		});
		ratingControls.forEach((control) => {
			control.checked = false;
		});

		if (isProductsIndex()) {
			if (categorySelect) syncSelectDisplay(categorySelect, "all");
			syncNavigationFilter("category", "all");
		}

		syncPriceOutput();
		syncLocationFromFilters();
		resetAndRender();
	};

	root
		.querySelectorAll<HTMLInputElement>('input[name="product-category"]')
		.forEach((radio) => {
			radio.addEventListener("change", () => {
				selectCategory(radio.value);
			});
		});

	categorySelect?.addEventListener("change", () => {
		selectCategory(categorySelect.value);
	});

	platformSelect?.addEventListener("change", () => {
		selectToolbarPlatform(platformSelect.value);
	});

	sortSelect?.addEventListener("change", resetAndRender);

	navigationFilters.forEach((button) => {
		button.addEventListener("click", () => {
			const control = button.dataset.choiceControl;
			const value = button.dataset.choiceValue;
			if (!control || !value) return;
			if (control === "category") selectCategory(value);
		});
	});

	navigationLinks.forEach((link) => {
		link.addEventListener("click", (event) => {
			const control = link.dataset.choiceControl;
			const value = link.dataset.choiceValue;
			if (!control || !value || control !== "category") return;

			if (isProductCategoryRoute()) return;

			event.preventDefault();
			selectCategory(value);
		});
	});

	reset?.addEventListener("click", resetAllFilters);

	search?.addEventListener("input", resetAndRender);

	range?.addEventListener("input", () => {
		syncPriceOutput();
		syncLocationFromFilters();
		resetAndRender();
	});

	platformControls.forEach((control) => {
		control.addEventListener("change", () => {
			syncPlatformSelectFromControls();
			syncLocationFromFilters();
			resetAndRender();
		});
	});

	[...licenseControls, ...ratingControls].forEach((control) => {
		control.addEventListener("change", () => {
			syncLocationFromFilters();
			resetAndRender();
		});
	});

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

	window.addEventListener("popstate", () => {
		syncFiltersFromLocation();
		resetAndRender();
	});

	if (isProductsIndex()) {
		navigationLinks
			.filter((link) => link.dataset.choiceControl === "category")
			.forEach((link) => {
				const value = link.dataset.choiceValue ?? "all";
				const url = new URL(window.location.href);
				if (value === "all") url.searchParams.delete("categories");
				else url.searchParams.set("categories", value);
				link.href = `${url.pathname}${url.search}`;
			});
	}

	syncFiltersFromLocation();
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

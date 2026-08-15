import { cardCollectionViewClasses } from "@/variants/components/object/project/card/PCard.variants";

function initProductsRoot(root: HTMLElement): void {
	const cards = Array.from(
		root.querySelectorAll<HTMLElement>("[data-product-card]"),
	);
	const grid = root.querySelector<HTMLElement>("[data-product-grid]");
	const search = root.querySelector<HTMLInputElement>("[data-product-search]");
	const categorySelect =
		root.querySelector<HTMLSelectElement>("[data-category-select]");
	const platformSelect =
		root.querySelector<HTMLSelectElement>("[data-platform-select]");
	const sortSelect = root.querySelector<HTMLSelectElement>("[data-archive-sort]");
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
	const pageSize = Number(root.dataset.paginationPageSize) || cards.length || 1;
	let currentPage = 1;

	if (!cards.length || !grid) return;

	const applyView = (view: "grid" | "list"): void => {
		grid.dataset.view = view;
		const isList = view === "list";
		grid.classList.toggle(
			cardCollectionViewClasses.list.collection,
			isList,
		);
		cards.forEach((card) => {
			card.classList.toggle(cardCollectionViewClasses.list.item, isList);
		});
		root.querySelectorAll<HTMLButtonElement>("[data-view-control]").forEach((item) => {
			item.setAttribute(
				"aria-pressed",
				String(item.dataset.viewControl === view),
			);
		});
	};

	const selectedCategory = (): string =>
		root.querySelector<HTMLInputElement>(
			'input[name="product-category"]:checked',
		)?.value ?? "all";

	const selectedValues = (selector: string): string[] =>
		Array.from(root.querySelectorAll<HTMLInputElement>(selector)).map(
			(item) => item.value,
		);

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

	const syncPriceOutput = (): void => {
		if (!range || !priceOutput) return;
		priceOutput.value = `$${range.value}${
			range.value === range.max ? "+" : ""
		}`;
	};

	const render = (): void => {
		const term = search?.value.trim().toLowerCase() ?? "";
		const category = categorySelect?.value ?? selectedCategory();
		const selectedPlatforms = selectedValues("[data-platform-filter]:checked");
		const selectedLicenses = selectedValues("[data-license-filter]:checked");
		const selectedRatings = selectedValues("[data-rating-filter]:checked").map(
			Number,
		);
		const toolbarPlatform = platformSelect?.value ?? "all";
		const maxPrice = Number(range?.value ?? 69);

		const visible = cards.filter((card) => {
			const matchesTerm = !term || (card.dataset.title ?? "").includes(term);
			const matchesCategory =
				category === "all" || card.dataset.filterCategory === category;
			const matchesPlatforms =
				!selectedPlatforms.length ||
				selectedPlatforms.includes(card.dataset.platform ?? "");
			const matchesLicense =
				!selectedLicenses.length ||
				selectedLicenses.includes(card.dataset.license ?? "");
			const matchesRating =
				!selectedRatings.length ||
				selectedRatings.some((rating) => Number(card.dataset.rating) >= rating);
			const matchesToolbarPlatform =
				toolbarPlatform === "all" || card.dataset.platform === toolbarPlatform;

			return (
				matchesTerm &&
				matchesCategory &&
				matchesPlatforms &&
				matchesLicense &&
				matchesRating &&
				matchesToolbarPlatform &&
				Number(card.dataset.price) <= maxPrice
			);
		});

		const sort = sortSelect?.value;
		visible.sort((first, second) => {
			if (sort === "price-low") {
				return Number(first.dataset.price) - Number(second.dataset.price);
			}
			if (sort === "price-high") {
				return Number(second.dataset.price) - Number(first.dataset.price);
			}
			if (sort === "rating") {
				return Number(second.dataset.rating) - Number(first.dataset.rating);
			}
			return (
				Number(first.dataset.sortIndex ?? 0) -
				Number(second.dataset.sortIndex ?? 0)
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
				applyView(button.dataset.viewControl === "list" ? "list" : "grid");
			});
		});

	root
		.querySelectorAll<HTMLButtonElement>("[data-cart-button]")
		.forEach((button) => {
			button.addEventListener("click", () => {
				const active = button.getAttribute("aria-pressed") === "true";
				button.setAttribute("aria-pressed", String(!active));
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

	applyView(grid.dataset.view === "list" ? "list" : "grid");
	syncPriceOutput();
	render();
}

export function initProducts(scope: ParentNode = document): void {
	scope
		.querySelectorAll<HTMLElement>('[data-filter-mode="faceted"]')
		.forEach((root) => {
			if (!root.querySelector("[data-product-card]")) return;
			initProductsRoot(root);
		});
}

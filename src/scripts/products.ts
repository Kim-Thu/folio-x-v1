class ProductArchiveController {
	private readonly cards: HTMLElement[];
	private readonly grid: HTMLElement | null;
	private readonly search: HTMLInputElement | null;
	private readonly categorySelect: HTMLSelectElement | null;
	private readonly platformSelect: HTMLSelectElement | null;
	private readonly sortSelect: HTMLSelectElement | null;
	private readonly range: HTMLInputElement | null;
	private readonly priceOutput: HTMLOutputElement | null;
	private readonly count: HTMLElement | null;
	private readonly empty: HTMLElement | null;
	private readonly pagination: HTMLElement | null;
	private readonly pageButtons: HTMLButtonElement[];
	private readonly previous: HTMLButtonElement | null;
	private readonly next: HTMLButtonElement | null;
	private readonly pageSize = 9;
	private currentPage = 1;

	constructor(private readonly root: HTMLElement) {
		this.cards = Array.from(
			root.querySelectorAll<HTMLElement>("[data-product-card]"),
		);
		this.grid = root.querySelector<HTMLElement>("[data-product-grid]");
		this.search = root.querySelector<HTMLInputElement>("[data-product-search]");
		this.categorySelect = root.querySelector<HTMLSelectElement>("[data-category-select]");
		this.platformSelect = root.querySelector<HTMLSelectElement>("[data-platform-select]");
		this.sortSelect = root.querySelector<HTMLSelectElement>("[data-product-sort]");
		this.range = root.querySelector<HTMLInputElement>("[data-price-filter]");
		this.priceOutput = root.querySelector<HTMLOutputElement>("[data-price-output]");
		this.count = root.querySelector<HTMLElement>("[data-result-count]");
		this.empty = root.querySelector<HTMLElement>("[data-product-empty]");
		this.pagination = root.querySelector<HTMLElement>("[data-pagination]");
		this.pageButtons = Array.from(
			root.querySelectorAll<HTMLButtonElement>("[data-page]"),
		);
		this.previous = root.querySelector<HTMLButtonElement>("[data-page-previous]");
		this.next = root.querySelector<HTMLButtonElement>("[data-page-next]");
	}

	mount(): void {
		if (!this.cards.length || !this.grid) return;

		this.root
			.querySelectorAll<HTMLInputElement>('input[name="product-category"]')
			.forEach((radio) => {
				radio.addEventListener("change", () => {
					if (this.categorySelect) {
						this.syncSelectDisplay(this.categorySelect, radio.value);
					}
					this.resetAndRender();
				});
			});

		[this.categorySelect, this.platformSelect, this.sortSelect].forEach((control) => {
			control?.addEventListener("change", () => {
				if (this.categorySelect && control === this.categorySelect) {
					const matchingRadio = this.root.querySelector<HTMLInputElement>(
						`input[name="product-category"][value="${this.categorySelect.value}"]`,
					);
					if (matchingRadio) matchingRadio.checked = true;
				}
				this.resetAndRender();
			});
		});

		[this.search, this.range].forEach((control) => {
			control?.addEventListener("input", () => {
				this.syncPriceOutput();
				this.resetAndRender();
			});
		});

		this.root
			.querySelectorAll<HTMLInputElement>(
				"[data-platform-filter], [data-license-filter], [data-rating-filter]",
			)
			.forEach((control) => control.addEventListener("change", this.resetAndRender));

		this.root
			.querySelectorAll<HTMLButtonElement>("[data-view-control]")
			.forEach((button) => {
				button.addEventListener("click", () => this.setView(button));
			});

		this.root
			.querySelectorAll<HTMLButtonElement>("[data-cart-button]")
			.forEach((button) => {
				button.addEventListener("click", () => {
					const active = button.getAttribute("aria-pressed") === "true";
					button.setAttribute("aria-pressed", String(!active));
				});
			});

		this.pageButtons.forEach((button) => {
			button.addEventListener("click", () => {
				this.currentPage = Number(button.dataset.page) || 1;
				this.render();
			});
		});
		this.previous?.addEventListener("click", () => {
			if (this.currentPage <= 1) return;
			this.currentPage -= 1;
			this.render();
		});
		this.next?.addEventListener("click", () => {
			this.currentPage += 1;
			this.render();
		});

		this.syncPriceOutput();
		this.render();
	}

	private readonly resetAndRender = (): void => {
		this.currentPage = 1;
		this.render();
	};

	private selectedCategory(): string {
		return (
			this.root.querySelector<HTMLInputElement>(
				'input[name="product-category"]:checked',
			)?.value ?? "all"
		);
	}

	private selectedValues(selector: string): string[] {
		return Array.from(
			this.root.querySelectorAll<HTMLInputElement>(selector),
		).map((item) => item.value);
	}

	private syncSelectDisplay(select: HTMLSelectElement, value: string): void {
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
	}

	private syncPriceOutput(): void {
		if (!this.range || !this.priceOutput) return;
		this.priceOutput.value = `$${this.range.value}${
			this.range.value === this.range.max ? "+" : ""
		}`;
	}

	private setView(button: HTMLButtonElement): void {
		this.root.querySelectorAll("[data-view-control]").forEach((item) => {
			item.setAttribute("aria-pressed", String(item === button));
		});
		if (this.grid) this.grid.dataset.view = button.dataset.viewControl;
	}

	private render(): void {
		if (!this.grid) return;

		const term = this.search?.value.trim().toLowerCase() ?? "";
		const category = this.categorySelect?.value ?? this.selectedCategory();
		const selectedPlatforms = this.selectedValues("[data-platform-filter]:checked");
		const selectedLicenses = this.selectedValues("[data-license-filter]:checked");
		const selectedRatings = this.selectedValues("[data-rating-filter]:checked").map(
			Number,
		);
		const toolbarPlatform = this.platformSelect?.value ?? "all";
		const maxPrice = Number(this.range?.value ?? 69);

		const visible = this.cards.filter((card) => {
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

		const sort = this.sortSelect?.value;
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
				Number(first.dataset.sortIndex ?? 0) - Number(second.dataset.sortIndex ?? 0)
			);
		});
		visible.forEach((card) => this.grid?.append(card));

		const pages = Math.max(1, Math.ceil(visible.length / this.pageSize));
		this.currentPage = Math.min(this.currentPage, pages);
		this.cards.forEach((card) => {
			card.hidden = true;
		});
		visible
			.slice(
				(this.currentPage - 1) * this.pageSize,
				this.currentPage * this.pageSize,
			)
			.forEach((card) => {
				card.hidden = false;
			});

		if (this.count) this.count.textContent = String(visible.length);
		if (this.empty) this.empty.hidden = visible.length > 0;
		if (this.pagination) this.pagination.hidden = visible.length === 0;
		this.pageButtons.forEach((button) => {
			const page = Number(button.dataset.page);
			button.parentElement?.toggleAttribute("hidden", page > pages);
			if (page === this.currentPage) button.setAttribute("aria-current", "page");
			else button.removeAttribute("aria-current");
		});
		if (this.previous) this.previous.disabled = this.currentPage === 1;
		if (this.next) this.next.disabled = this.currentPage === pages;
	}
}

export function initProducts(scope: ParentNode = document): void {
	scope
		.querySelectorAll<HTMLElement>('[data-filter-mode="faceted"]')
		.forEach((root) => {
			if (!root.querySelector("[data-product-card]")) return;
			new ProductArchiveController(root).mount();
		});
}

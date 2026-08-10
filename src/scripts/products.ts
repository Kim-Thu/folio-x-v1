const root = document.querySelector<HTMLElement>(
  '[data-filter-mode="faceted"]',
);

if (root) {
  const cards = [...root.querySelectorAll<HTMLElement>("[data-product-card]")];
  const grid = root.querySelector<HTMLElement>("[data-product-grid]");
  const search = root.querySelector<HTMLInputElement>("[data-product-search]");
  const categorySelect = root.querySelector<HTMLSelectElement>(
    "[data-category-select]",
  );
  const platformSelect = root.querySelector<HTMLSelectElement>(
    "[data-platform-select]",
  );
  const sortSelect = root.querySelector<HTMLSelectElement>(
    "[data-product-sort]",
  );
  const range = root.querySelector<HTMLInputElement>("[data-price-filter]");
  const priceOutput = root.querySelector<HTMLOutputElement>(
    "[data-price-output]",
  );
  const count = root.querySelector<HTMLElement>("[data-result-count]");
  const empty = root.querySelector<HTMLElement>("[data-product-empty]");
  const pagination = root.querySelector<HTMLElement>("[data-pagination]");
  const pageButtons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-page]"),
  ];
  const previous = root.querySelector<HTMLButtonElement>(
    "[data-page-previous]",
  );
  const next = root.querySelector<HTMLButtonElement>("[data-page-next]");
  let currentPage = 1;
  const pageSize = 9;

  const selectedCategory = () =>
    root.querySelector<HTMLInputElement>(
      'input[name="product-category"]:checked',
    )?.value ?? "all";

  const syncSelectDisplay = (select: HTMLSelectElement, value: string) => {
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

  const render = () => {
    if (!grid) return;
    const term = search?.value.trim().toLowerCase() ?? "";
    const category = categorySelect?.value ?? selectedCategory();
    const selectedPlatforms = [
      ...root.querySelectorAll<HTMLInputElement>(
        "[data-platform-filter]:checked",
      ),
    ].map((item) => item.value);
    const selectedLicenses = [
      ...root.querySelectorAll<HTMLInputElement>(
        "[data-license-filter]:checked",
      ),
    ].map((item) => item.value);
    const selectedRatings = [
      ...root.querySelectorAll<HTMLInputElement>(
        "[data-rating-filter]:checked",
      ),
    ].map((item) => Number(item.value));
    const toolbarPlatform = platformSelect?.value ?? "all";
    const maxPrice = Number(range?.value ?? 69);

    const visible = cards.filter((card) => {
      const matchesTerm = card.dataset.title?.includes(term);
      const matchesCategory =
        category === "all" || card.dataset.filterCategory === category;
      const matchesChecks =
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
        matchesChecks &&
        matchesLicense &&
        matchesRating &&
        matchesToolbarPlatform &&
        Number(card.dataset.price) <= maxPrice
      );
    });

    const sort = sortSelect?.value;
    visible.sort((a, b) => {
      if (sort === "price-low")
        return Number(a.dataset.price) - Number(b.dataset.price);
      if (sort === "price-high")
        return Number(b.dataset.price) - Number(a.dataset.price);
      if (sort === "rating")
        return Number(b.dataset.rating) - Number(a.dataset.rating);
      return (
        Number(a.dataset.sortIndex ?? 0) - Number(b.dataset.sortIndex ?? 0)
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

  root
    .querySelectorAll<HTMLInputElement>('input[name="product-category"]')
    .forEach((radio) =>
      radio.addEventListener("change", () => {
        if (categorySelect) syncSelectDisplay(categorySelect, radio.value);
        currentPage = 1;
        render();
      }),
    );
  [categorySelect, platformSelect, sortSelect].forEach((control) =>
    control?.addEventListener("change", () => {
      if (categorySelect && control === categorySelect) {
        const matchingRadio = root.querySelector<HTMLInputElement>(
          `input[name="product-category"][value="${categorySelect.value}"]`,
        );
        if (matchingRadio) matchingRadio.checked = true;
      }
      currentPage = 1;
      render();
    }),
  );
  [search, range].forEach((control) =>
    control?.addEventListener("input", () => {
      if (range && priceOutput)
        priceOutput.value = `$${range.value}${range.value === range.max ? "+" : ""}`;
      currentPage = 1;
      render();
    }),
  );
  root
    .querySelectorAll<HTMLInputElement>("[data-platform-filter]")
    .forEach((checkbox) =>
      checkbox.addEventListener("change", () => {
        currentPage = 1;
        render();
      }),
    );
  root
    .querySelectorAll<HTMLInputElement>(
      "[data-license-filter], [data-rating-filter]",
    )
    .forEach((checkbox) =>
      checkbox.addEventListener("change", () => {
        currentPage = 1;
        render();
      }),
    );
  root
    .querySelectorAll<HTMLButtonElement>("[data-view-control]")
    .forEach((button) =>
      button.addEventListener("click", () => {
        root
          .querySelectorAll("[data-view-control]")
          .forEach((item) =>
            item.setAttribute("aria-pressed", String(item === button)),
          );
        if (grid) grid.dataset.view = button.dataset.viewControl;
      }),
    );
  root
    .querySelectorAll<HTMLButtonElement>("[data-cart-button]")
    .forEach((button) =>
      button.addEventListener("click", () => {
        const active = button.getAttribute("aria-pressed") === "true";
        button.setAttribute("aria-pressed", String(!active));
      }),
    );
  pageButtons.forEach((button) =>
    button.addEventListener("click", () => {
      currentPage = Number(button.dataset.page) || 1;
      render();
    }),
  );
  previous?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage -= 1;
      render();
    }
  });
  next?.addEventListener("click", () => {
    currentPage += 1;
    render();
  });
  render();
}

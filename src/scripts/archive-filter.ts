const FILTER_LOADING_DELAY = 180;

export function initArchiveFilter(): void {
  document.querySelectorAll<HTMLElement>('[data-filter-root]').forEach((root) => {
    const buttons = root.querySelectorAll<HTMLButtonElement>('[data-filter-value]');
    const cards = root.querySelectorAll<HTMLElement>('[data-filter-category]');
    const emptyState = root.querySelector<HTMLElement>('[data-filter-empty]');
    const results = root.querySelector<HTMLElement>('[data-filter-results]');
    const skeleton = root.querySelector<HTMLElement>('[data-filter-skeleton]');

    if (!buttons.length || !cards.length) return;

    let filterTimer: number | undefined;

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const selectedCategory = button.dataset.filterValue ?? 'all';

        buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));

        window.clearTimeout(filterTimer);
        if (results) {
          results.hidden = true;
          results.setAttribute('aria-busy', 'true');
        }
        if (skeleton) skeleton.hidden = false;
        if (emptyState) emptyState.hidden = true;

        filterTimer = window.setTimeout(() => {
          let visibleCount = 0;

          cards.forEach((card) => {
            const isVisible = selectedCategory === 'all' || card.dataset.filterCategory === selectedCategory;
            card.hidden = !isVisible;
            if (isVisible) visibleCount += 1;
          });

          if (skeleton) skeleton.hidden = true;
          if (results) {
            results.hidden = false;
            results.setAttribute('aria-busy', 'false');
          }
          if (emptyState) emptyState.hidden = visibleCount > 0;
        }, FILTER_LOADING_DELAY);
      });
    });
  });
}

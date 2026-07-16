export function initArchiveFilter(): void {
  document.querySelectorAll<HTMLElement>('[data-filter-root]').forEach((root) => {
    const buttons = root.querySelectorAll<HTMLButtonElement>('[data-filter-value]');
    const cards = root.querySelectorAll<HTMLElement>('[data-filter-category]');
    const emptyState = root.querySelector<HTMLElement>('[data-filter-empty]');

    if (!buttons.length || !cards.length) return;

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const selectedCategory = button.dataset.filterValue ?? 'all';
        let visibleCount = 0;

        buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        cards.forEach((card) => {
          const isVisible = selectedCategory === 'all' || card.dataset.filterCategory === selectedCategory;
          card.hidden = !isVisible;
          if (isVisible) visibleCount += 1;
        });

        if (emptyState) emptyState.hidden = visibleCount > 0;
      });
    });
  });
}

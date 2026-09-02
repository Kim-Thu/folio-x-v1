export function initSelectedWorkTabs(): void {
  document.querySelectorAll<HTMLElement>('[data-tabbed-collection]').forEach((root, rootIndex) => {
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tab-value]'));
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-tab-card]'));
    const panel = root.querySelector<HTMLElement>('[data-collection-panel]');

    if (!tabs.length || !cards.length || !panel) return;

    const panelId = panel.id || `tab-panel-${rootIndex}`;
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    tabs.forEach((tab) => tab.setAttribute('aria-controls', panelId));

    const selectTab = (selectedTab: HTMLButtonElement): void => {
      const category = selectedTab.dataset.tabValue ?? 'all';
      cards.forEach((card) => {
        const isVisible = category === 'all' || card.dataset.filterCategory === category;
        card.hidden = !isVisible;
      });

      tabs.forEach((tab) => {
        const isSelected = tab === selectedTab;
        tab.setAttribute('aria-selected', String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
      });

      panel.setAttribute('aria-labelledby', selectedTab.id);
    };

    tabs.forEach((tab, tabIndex) => {
      tab.addEventListener('click', () => selectTab(tab));
      tab.addEventListener('keydown', (event) => {
        const keyOffsets: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };
        let nextIndex = tabIndex;

        if (event.key in keyOffsets) nextIndex = (tabIndex + keyOffsets[event.key] + tabs.length) % tabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = tabs.length - 1;
        else return;

        event.preventDefault();
        tabs[nextIndex].focus();
        selectTab(tabs[nextIndex]);
      });
    });

    const initialTab = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') ?? tabs[0];
    if (initialTab) selectTab(initialTab);
  });
}

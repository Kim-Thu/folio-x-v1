const OPEN_CLASS_NAMES = ['invisible', 'opacity-0', '-translate-y-3'] as const;

export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('#header');
  const menuButton = document.querySelector<HTMLButtonElement>('#menu-button');
  const mobileMenu = document.querySelector<HTMLElement>('#mobile-menu');
  const mobileLinks = document.querySelectorAll<HTMLAnchorElement>('.mobile-link');

  if (!header || !menuButton || !mobileMenu) return;

  let previousScrollY = window.scrollY;
  let scrollFrame = 0;

  const updateHeader = (): void => {
    const currentScrollY = window.scrollY;
    const isSolid = header.dataset.solidHeader === 'true';
    const isMenuOpen = menuButton.getAttribute('aria-expanded') === 'true';
    const isPastHeader = currentScrollY > header.offsetHeight;
    const isScrollingDown = currentScrollY > previousScrollY;

    header.classList.toggle('bg-surface-dark/80', isSolid || isPastHeader);
    header.dataset.scrollState = !isMenuOpen && isPastHeader && isScrollingDown ? 'hidden' : 'visible';
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
    menuButton.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    mobileMenu.inert = !isOpen;
    OPEN_CLASS_NAMES.forEach((className) => mobileMenu.classList.toggle(className, !isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
    header.dataset.scrollState = 'visible';

    menuButton.querySelector<HTMLElement>('.menu-icon-open')?.classList.toggle('invisible', isOpen);
    menuButton.querySelector<HTMLElement>('.menu-icon-close')?.classList.toggle('invisible', !isOpen);
  };

  window.addEventListener('scroll', requestHeaderUpdate, { passive: true });
  menuButton.addEventListener('click', () => {
    setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  mobileLinks.forEach((link) => link.addEventListener('click', () => setMenuState(false)));

  updateHeader();
}

const OPEN_CLASS_NAMES = ['invisible', 'opacity-0', '-translate-y-3'] as const;

export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('#header');
  const menuButton = document.querySelector<HTMLButtonElement>('#menu-button');
  const mobileMenu = document.querySelector<HTMLElement>('#mobile-menu');
  const mobileLinks = document.querySelectorAll<HTMLAnchorElement>('.mobile-link');

  if (!header || !menuButton || !mobileMenu) return;

  const updateHeaderSurface = (): void => {
    const isSolid = header.dataset.solidHeader === 'true';
    header.classList.toggle('bg-surface-dark/80', isSolid || window.scrollY > 20);
  };

  const setMenuState = (isOpen: boolean): void => {
    menuButton.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    mobileMenu.inert = !isOpen;
    OPEN_CLASS_NAMES.forEach((className) => mobileMenu.classList.toggle(className, !isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';

    menuButton.querySelector<HTMLElement>('.menu-icon-open')?.classList.toggle('invisible', isOpen);
    menuButton.querySelector<HTMLElement>('.menu-icon-close')?.classList.toggle('invisible', !isOpen);
  };

  window.addEventListener('scroll', updateHeaderSurface, { passive: true });
  menuButton.addEventListener('click', () => {
    setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  mobileLinks.forEach((link) => link.addEventListener('click', () => setMenuState(false)));

  updateHeaderSurface();
}

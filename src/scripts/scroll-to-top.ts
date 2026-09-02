export function initScrollToTop(): void {
  const button = document.querySelector<HTMLButtonElement>('[data-scroll-to-top]');
  if (!button) return;

  const updateVisibility = (): void => {
    const shouldShow = window.scrollY > 480;
    button.classList.toggle('hidden', !shouldShow);
    button.classList.toggle('flex', shouldShow);
  };

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  updateVisibility();
  window.addEventListener('scroll', updateVisibility, { passive: true });
}

export function initReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach((element) => { element.dataset.visible = 'true'; });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        (entry.target as HTMLElement).dataset.visible = 'true';
        currentObserver.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  elements.forEach((element) => observer.observe(element));
}

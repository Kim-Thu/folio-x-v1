const VISIBLE_CLASS_NAME = 'is-visible';

export function initReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add(VISIBLE_CLASS_NAME));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add(VISIBLE_CLASS_NAME);
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  elements.forEach((element) => observer.observe(element));
}

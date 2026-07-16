const SECTION_TOTAL = 6;

export function initScrollProgress(): void {
  const progressBar = document.querySelector<HTMLElement>('#scroll-progress-bar');
  const readingProgress = document.querySelector<HTMLProgressElement>('#reading-progress');
  const sectionCount = document.querySelector<HTMLElement>('#section-count');
  const backToTop = document.querySelector<HTMLButtonElement>('#back-to-top');
  const progressRing = document.querySelector<HTMLElement>('#progress-ring');
  const sections = [...document.querySelectorAll<HTMLElement>('[data-section]')];

  if (!progressBar || !readingProgress || !sectionCount || !backToTop || !progressRing || sections.length === 0) return;

  const updateProgress = (): void => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0;

    progressBar.style.height = `${progress * 100}%`;
    readingProgress.value = progress * 100;
    readingProgress.textContent = `${Math.round(progress * 100)}%`;
    progressRing.style.setProperty('--progress-value', String(progress));

    const isVisible = progress >= 0.2;
    backToTop.classList.toggle('opacity-0', !isVisible);
    backToTop.classList.toggle('translate-y-4', !isVisible);
    backToTop.classList.toggle('pointer-events-none', !isVisible);
    backToTop.inert = !isVisible;

    let activeSectionIndex = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.45) {
        activeSectionIndex = index;
      }
    });

    sectionCount.textContent = `${String(activeSectionIndex + 1).padStart(2, '0')} / ${String(SECTION_TOTAL).padStart(2, '0')}`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  updateProgress();
}

export function initScrollProgress(): void {
  const progressBar = document.querySelector<HTMLElement>('#scroll-progress-bar');
  const readingProgress = document.querySelector<HTMLProgressElement>('#reading-progress');
  const sectionCount = document.querySelector<HTMLElement>('#section-count');
  const backToTop = document.querySelector<HTMLButtonElement>('#back-to-top');
  const progressRing = document.querySelector<HTMLElement>('#progress-ring');
  const sections = [...document.querySelectorAll<HTMLElement>('[data-section]')];

  if (!progressBar || !readingProgress || !sectionCount || !backToTop || !progressRing || sections.length === 0) return;

  let sectionOffsets: number[] = [];
  let frameRequested = false;

  const refreshSectionOffsets = (): void => {
    sectionOffsets = sections.map((section) => section.offsetTop);
  };

  const updateProgress = (): void => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0;
    const activeThreshold = window.scrollY + window.innerHeight * 0.45;
    let activeSectionIndex = 0;

    sectionOffsets.forEach((offset, index) => {
      if (offset <= activeThreshold) activeSectionIndex = index;
    });

    progressBar.style.height = `${progress * 100}%`;
    readingProgress.value = progress * 100;
    readingProgress.textContent = `${Math.round(progress * 100)}%`;
    progressRing.style.setProperty('--progress-value', String(progress));

    const isVisible = progress >= 0.2;
    backToTop.classList.toggle('opacity-0', !isVisible);
    backToTop.classList.toggle('translate-y-4', !isVisible);
    backToTop.classList.toggle('pointer-events-none', !isVisible);
    backToTop.inert = !isVisible;

    sectionCount.textContent = `${String(activeSectionIndex + 1).padStart(2, '0')} / ${String(sections.length).padStart(2, '0')}`;
  };

  const requestProgressUpdate = (): void => {
    if (frameRequested) return;

    frameRequested = true;
    window.requestAnimationFrame(() => {
      updateProgress();
      frameRequested = false;
    });
  };

  window.addEventListener('scroll', requestProgressUpdate, { passive: true });
  window.addEventListener('resize', () => {
    refreshSectionOffsets();
    requestProgressUpdate();
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  refreshSectionOffsets();
  updateProgress();

  document.fonts.ready.then(() => {
    refreshSectionOffsets();
    requestProgressUpdate();
  });
}

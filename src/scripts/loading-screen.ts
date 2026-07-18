const COMPLETION_DURATION = 300;
const PROGRESS_DURATION = 900;
const MINIMUM_VISIBLE_DURATION = PROGRESS_DURATION;
const FADE_FALLBACK_DURATION = 600;
const INITIAL_PROGRESS_LIMIT = 92;
const LAST_TIP_STORAGE_KEY = 'loading-screen:last-tip';

function selectRandomTip(tips: string[]): string | undefined {
  if (tips.length === 0) return undefined;

  try {
    const previousTip = sessionStorage.getItem(LAST_TIP_STORAGE_KEY);
    const availableTips = tips.length > 1 ? tips.filter((tip) => tip !== previousTip) : tips;
    const selectedTip = availableTips[Math.floor(Math.random() * availableTips.length)];

    if (selectedTip) sessionStorage.setItem(LAST_TIP_STORAGE_KEY, selectedTip);
    return selectedTip;
  } catch {
    return tips[Math.floor(Math.random() * tips.length)];
  }
}

export function initLoadingScreen(): void {
  const screen = document.querySelector<HTMLElement>('[data-loading-screen]');
  const progress = screen?.querySelector<HTMLElement>('[data-loading-progress]');
  const progressValue = screen?.querySelector<HTMLElement>('[data-loading-progress-value]');
  const progressNumber = screen?.querySelector<HTMLElement>('[data-loading-progress-number]');
  const tip = screen?.querySelector<HTMLElement>('[data-loading-tip]');

  if (!screen || !progress || !progressValue || !progressNumber) return;

  if (tip?.dataset.tips) {
    try {
      const tips = JSON.parse(tip.dataset.tips) as string[];
      const randomTip = selectRandomTip(tips);
      if (randomTip) tip.textContent = randomTip;
    } catch {
      // Keep the server-rendered fallback tip when CMS data cannot be parsed.
    }
  }

  const documentRoot = document.documentElement;
  documentRoot.classList.add('overflow-hidden');

  const startedAt = performance.now();
  let currentValue = 0;
  let frameId = 0;

  const renderValue = (value: number): void => {
    currentValue = Math.round(value);
    progressValue.style.scale = `${currentValue / 100} 1`;
    progress.setAttribute('aria-valuenow', String(currentValue));
    progressNumber.textContent = String(currentValue);
  };

  const animateProgress = (from: number, to: number, duration: number, onComplete?: () => void): void => {
    const animationStartedAt = performance.now();

    const update = (time: number): void => {
      const elapsed = Math.min((time - animationStartedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      renderValue(from + (to - from) * eased);

      if (elapsed < 1) frameId = requestAnimationFrame(update);
      else onComplete?.();
    };

    frameId = requestAnimationFrame(update);
  };

  const hideScreen = (): void => {
    if (screen.dataset.holdOpen === 'true') return;

    let hasCleanedUp = false;
    const cleanup = (): void => {
      if (hasCleanedUp) return;
      hasCleanedUp = true;
      documentRoot.classList.remove('overflow-hidden');
      screen.remove();
    };

    screen.classList.remove('opacity-100');
    screen.classList.add('opacity-0');
    screen.addEventListener('transitionend', cleanup, { once: true });
    window.setTimeout(cleanup, FADE_FALLBACK_DURATION);
  };

  const complete = (): void => {
    cancelAnimationFrame(frameId);
    animateProgress(currentValue, 100, COMPLETION_DURATION, hideScreen);
  };

  animateProgress(0, INITIAL_PROGRESS_LIMIT, PROGRESS_DURATION);

  const completeAfterMinimumDuration = (): void => {
    const remainingDuration = Math.max(MINIMUM_VISIBLE_DURATION - (performance.now() - startedAt), 0);
    window.setTimeout(complete, remainingDuration);
  };

  if (document.readyState === 'complete') completeAfterMinimumDuration();
  else window.addEventListener('load', completeAfterMinimumDuration, { once: true });
}

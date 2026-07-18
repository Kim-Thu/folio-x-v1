import { initAccordion } from '@/scripts/accordion';
import { initArchiveFilter } from '@/scripts/archive-filter';
import { initFooterReveal } from '@/scripts/footer-reveal';
import { initHeader } from '@/scripts/header';
import { initLoadingScreen } from '@/scripts/loading-screen';
import { initReveal } from '@/scripts/reveal';
import { initScrollProgress } from '@/scripts/scroll-progress';
import { initSelectedWorkTabs } from '@/scripts/selected-work-tabs';

initLoadingScreen();
initHeader();
initScrollProgress();
initAccordion();
initArchiveFilter();
initFooterReveal();
initReveal();
initSelectedWorkTabs();

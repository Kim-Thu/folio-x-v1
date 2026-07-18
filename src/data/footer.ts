import type { FooterColumn } from '@/types/ui';
import { footerContent } from '@/data/content';
import { footerNavItems, legalLinks, resourceLinks } from '@/data/site';

export const footerColumns = [
  {
    kind: 'navigation',
    label: footerContent.menuLabel,
    items: footerNavItems,
  },
  {
    kind: 'navigation',
    label: footerContent.resourcesLabel,
    items: resourceLinks,
  },
  {
    kind: 'navigation',
    label: footerContent.legalLabel,
    items: legalLinks,
  },
] satisfies FooterColumn[];

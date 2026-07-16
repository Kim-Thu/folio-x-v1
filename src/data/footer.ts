import type { FooterColumn } from '@/types/ui';
import { footerContent, interfaceContent } from '@/data/content';
import { footerNavItems, legalLinks, site, socialLinks } from '@/data/site';

export const footerColumns = [
  {
    kind: 'navigation',
    label: footerContent.menuLabel,
    items: footerNavItems,
  },
  {
    kind: 'social',
    label: interfaceContent.navigation.socialLabel,
    links: socialLinks,
  },
  {
    kind: 'navigation',
    label: footerContent.legalLabel,
    items: legalLinks,
  },
  {
    kind: 'location',
    label: footerContent.locationLabel,
    location: site.location,
  },
] satisfies FooterColumn[];

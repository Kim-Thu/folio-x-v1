import type { FooterColumn } from '../types/ui';
import { footerContent, interfaceContent } from './content';
import { footerNavItems, legalLinks, site, socialLinks } from './site';

export const footerColumns = [
  {
    kind: 'contact',
    label: footerContent.contactLabel,
    email: site.email,
  },
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
    email: site.email,
  },
] satisfies FooterColumn[];

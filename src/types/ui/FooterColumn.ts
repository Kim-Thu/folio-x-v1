import type { NavigationItem, SocialLink } from '../navigation';

export type FooterColumn =
  | {
      kind: 'contact';
      label: string;
      email: string;
    }
  | {
      kind: 'navigation';
      label: string;
      items: NavigationItem[];
    }
  | {
      kind: 'social';
      label: string;
      links: SocialLink[];
    }
  | {
      kind: 'location';
      label: string;
      location: string;
      email: string;
    };

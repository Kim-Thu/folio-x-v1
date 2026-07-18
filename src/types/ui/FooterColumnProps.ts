import type { FooterColumn } from '@/types/ui/FooterColumn';

export interface FooterColumnProps {
  column: FooterColumn;
}

export interface NavigationFooterColumnProps {
  column: Extract<FooterColumn, { kind: 'navigation' }>;
}

export interface SocialFooterColumnProps {
  column: Extract<FooterColumn, { kind: 'social' }>;
}

export interface LocationFooterColumnProps {
  column: Extract<FooterColumn, { kind: 'location' }>;
}

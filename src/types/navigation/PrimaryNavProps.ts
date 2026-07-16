import type { NavigationItem } from './NavigationItem';

export interface PrimaryNavProps {
  items: NavigationItem[];
  variant?: 'desktop' | 'mobile';
}

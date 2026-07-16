import type { NavigationItem } from '@/types/navigation/NavigationItem';

export interface PrimaryNavProps {
  items: NavigationItem[];
  variant?: 'desktop' | 'mobile';
}

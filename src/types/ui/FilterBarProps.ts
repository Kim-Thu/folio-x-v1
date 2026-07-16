import type { TaxonomyTerm } from '@/types/content';

export interface FilterBarProps {
  categories: TaxonomyTerm[];
  allLabel: string;
  label: string;
  theme?: 'dark' | 'light';
}

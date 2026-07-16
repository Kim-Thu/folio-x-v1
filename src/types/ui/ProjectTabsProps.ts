import type { TaxonomyTerm } from '@/types/content';

export interface ProjectTabsProps {
  categories: TaxonomyTerm[];
  allLabel: string;
  label: string;
  panelId: string;
}

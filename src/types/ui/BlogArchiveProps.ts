import type { Insight, TaxonomyTerm } from '@/types/content';

export interface BlogArchiveProps {
  eyebrow: string;
  title: string;
  description: string;
  posts: Insight[];
  categories?: TaxonomyTerm[];
  filterLabel?: string;
  allLabel?: string;
  emptyLabel: string;
}

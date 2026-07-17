import type { TaxonomyTerm } from '@/types/content';

export type ArchivePageTheme = 'dark' | 'light';
export type ArchivePageListVariant = 'grid' | 'stack';

export interface ArchivePageProps {
  eyebrow: string;
  title: string;
  description: string;
  categories?: TaxonomyTerm[];
  filterLabel?: string;
  allLabel?: string;
  emptyLabel: string;
  theme?: ArchivePageTheme;
  listVariant?: ArchivePageListVariant;
}

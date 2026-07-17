import type { TaxonomyTerm } from '@/types/content';

export interface TaxonomyLinksProps {
  terms: TaxonomyTerm[];
  basePath: string;
  label: string;
  tone?: 'dark' | 'light';
}

import type { Project, TaxonomyTerm } from '@/types/content';

export interface ProjectArchiveProps {
  eyebrow: string;
  title: string;
  description: string;
  projects: Project[];
  categories?: TaxonomyTerm[];
  filterLabel?: string;
  allLabel?: string;
  emptyLabel: string;
}

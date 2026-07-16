import type { Project, TaxonomyTerm } from '../content';

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

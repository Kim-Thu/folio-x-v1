import type { ContentSection } from './ContentSection';
import type { TaxonomyTerm } from './TaxonomyTerm';

export interface Project {
  number: string;
  slug: string;
  href: string;
  title: string;
  client: string;
  year: string;
  category: string;
  categorySlug: string;
  tags: TaxonomyTerm[];
  summary: string;
  outcome: string;
  image: string;
  alt: string;
  tone: string;
  sections: ContentSection[];
}

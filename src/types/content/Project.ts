import type { ContentSection } from '@/types/content/ContentSection';
import type { TaxonomyTerm } from '@/types/content/TaxonomyTerm';

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

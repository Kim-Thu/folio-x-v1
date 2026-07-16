import type { ContentSection } from './ContentSection';
import type { TaxonomyTerm } from './TaxonomyTerm';

export interface Insight {
  index: string;
  slug: string;
  href: string;
  category: string;
  categorySlug: string;
  tags: TaxonomyTerm[];
  title: string;
  excerpt: string;
  readTime: string;
  duration: string;
  publishedAt: string;
  publishedLabel: string;
  author: string;
  image?: string;
  imageAlt: string;
  sections: ContentSection[];
}

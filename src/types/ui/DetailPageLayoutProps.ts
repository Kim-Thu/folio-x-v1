import type { TaxonomyTerm } from '@/types/content';
import type { ContentSectionsTone } from '@/types/ui/ContentSectionsProps';

export interface DetailPageImage {
  src: string;
  alt: string;
}

export interface DetailPageToneClasses {
  main: string;
}

export interface DetailPageLayoutProps {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
  tone: ContentSectionsTone;
  image?: DetailPageImage;
  taxonomyTerms: TaxonomyTerm[];
  taxonomyBasePath: string;
  taxonomyLabel: string;
}

import type { ContentSection } from '@/types/content';

export type ContentSectionsTone = 'dark' | 'light';
export type ContentSectionsVariant = 'article' | 'policy';

export interface ContentSectionsProps {
  sections: ContentSection[];
  tone?: ContentSectionsTone;
  variant?: ContentSectionsVariant;
  idPrefix?: string;
}

import type { ContentSection } from '@/types/content/ContentSection';

export interface PolicyPageContent {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  sections: ContentSection[];
}

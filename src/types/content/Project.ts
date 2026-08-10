import type { ContentSection } from '@/types/content/ContentSection';
import type { TaxonomyTerm } from '@/types/content/TaxonomyTerm';
import type { PageBuilderControl } from "@/types/components/pages/builder/PageBuilder.types";

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
  detail?: {
    role: string;
    duration: string;
    showBackAction: boolean;
    liveUrl?: string;
    sourceUrl?: string;
    features: Array<{
      title: string;
      description: string;
      icon: 'folder01' | 'userCircle' | 'calendar03' | 'lightBulb';
    }>;
    gallery: Array<{
      src: string;
      alt: string;
      width: number;
      height: number;
    }>;
    results: Array<{ value: string; label: string }>;
    reviews?: {
      eyebrow: string;
      title: string;
      summary: {
        score: number;
        maximum: number;
        totalLabel: string;
        distribution: Array<{ label: string; value: number }>;
      };
      items: Array<{
        name: string;
        date: string;
        quote: string;
        rating: number;
        avatar?: {
          src: string;
          alt: string;
          width: number;
          height: number;
        };
      }>;
    };
    testimonial?: {
      quote: string;
      name: string;
      role: string;
    };
    builder?: PageBuilderControl;
  };
}

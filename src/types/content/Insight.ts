import type { TaxonomyTerm } from "@/types/content/TaxonomyTerm";

export type InsightContentNode =
  | {
      type: "heading";
      id: string;
      level: 2 | 3;
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "image";
      image: {
        src: string;
        alt: string;
        width: number;
        height: number;
      };
    };

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
  content: InsightContentNode[];
}

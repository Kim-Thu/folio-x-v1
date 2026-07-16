import type { TaxonomyTerm } from '../types/content';

export function getCategories<T extends { category: string; categorySlug: string }>(items: T[]): TaxonomyTerm[] {
  return Array.from(
    new Map(items.map((item) => [item.categorySlug, { label: item.category, slug: item.categorySlug }])).values(),
  );
}

export function getTags<T extends { tags: TaxonomyTerm[] }>(items: T[]): TaxonomyTerm[] {
  return Array.from(new Map(items.flatMap((item) => item.tags).map((tag) => [tag.slug, tag])).values());
}

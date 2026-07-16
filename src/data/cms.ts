import { getCollection } from 'astro:content';
import type { CollectionEntry, CollectionKey } from 'astro:content';
import type { Insight, PolicyPageContent, Project } from '@/types/content';

async function getSingleton<C extends CollectionKey>(collection: C): Promise<CollectionEntry<C>['data']> {
  const entries = await getCollection(collection);
  const entry = entries[0];

  if (!entry) {
    throw new Error(`Missing required CMS content collection: ${collection}`);
  }

  return entry.data;
}

export const getSiteSettings = () => getSingleton('siteSettings');
export const getNavigationSettings = () => getSingleton('navigationSettings');
export const getHomepageSettings = () => getSingleton('homepageSettings');
export const getInterfaceSettings = () => getSingleton('interfaceSettings');
export const getArchiveSettings = () => getSingleton('archiveSettings');
export const getFooterSettings = () => getSingleton('footerSettings');
export const getSystemStatesSettings = () => getSingleton('systemStatesSettings');

export async function getProjects(): Promise<Project[]> {
  const entries = await getCollection('projects');
  assertUnique(entries.map((entry) => entry.data.order), 'project order');
  entries.forEach((entry) => assertEntrySlug(entry.id, entry.data.slug, 'project'));

  return entries
    .sort((a, b) => a.data.order - b.data.order)
    .map(({ data }, index) => ({
      ...data,
      number: String(index + 1).padStart(2, '0'),
      href: `/projects/${data.slug}`,
    }));
}

export async function getInsights(): Promise<Insight[]> {
  const [entries, interfaceSettings] = await Promise.all([
    getCollection('blog'),
    getInterfaceSettings(),
  ]);
  assertUnique(entries.map((entry) => entry.data.order), 'blog order');
  entries.forEach((entry) => assertEntrySlug(entry.id, entry.data.slug, 'blog post'));

  const dateFormatter = new Intl.DateTimeFormat(interfaceSettings.contentFormatting.dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return entries
    .sort((a, b) => a.data.order - b.data.order)
    .map(({ data }, index) => ({
      ...data,
      index: String(index + 1).padStart(2, '0'),
      href: `/blog/${data.slug}`,
      readTime: interfaceSettings.contentFormatting.readingTimeTemplate.replace('{minutes}', String(data.readingMinutes)),
      duration: `PT${data.readingMinutes}M`,
      publishedLabel: dateFormatter.format(new Date(`${data.publishedAt}T00:00:00Z`)),
    }));
}

function assertEntrySlug(id: string, slug: string, contentType: string): void {
  const fileSlug = id.replace(/\.json$/, '');
  if (fileSlug !== slug) {
    throw new Error(`CMS ${contentType} slug "${slug}" must match its filename "${fileSlug}"`);
  }
}

function assertUnique(values: Array<string | number>, label: string): void {
  if (new Set(values).size !== values.length) {
    throw new Error(`CMS content contains duplicate ${label} values`);
  }
}

export async function getPolicies(): Promise<Record<string, PolicyPageContent>> {
  const entries = await getCollection('policies');
  return Object.fromEntries(entries.map((entry) => [entry.id.replace(/\.json$/, ''), entry.data]));
}

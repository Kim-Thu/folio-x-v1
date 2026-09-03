import type { Insight, Lab, Product, Project, PublicationEntry } from "@/types/content";
import type { CollectionEntry, CollectionKey } from "astro:content";
import { getCollection } from "astro:content";

async function getSingleton<C extends CollectionKey>(
	collection: C,
): Promise<CollectionEntry<C>["data"]> {
	const entries = await getCollection(collection);
	const entry = entries[0];

	if (!entry) {
		throw new Error(`Missing required CMS content collection: ${collection}`);
	}

	return entry.data;
}

export const getSiteSettings = () => getSingleton("siteSettings");
export const getNavigationSettings = () => getSingleton("navigationSettings");
export const getClosingProfileSettings = () => getSingleton("closingProfileSettings");
export const getInterfaceSettings = () => getSingleton("interfaceSettings");
export const getFooterSettings = () => getSingleton("footerSettings");
export const getSystemStatesSettings = () => getSingleton("systemStatesSettings");
export const getLabDetailSettings = () => getSingleton("labDetailSettings");
export const getBlogDetailSettings = () => getSingleton("blogDetailSettings");
export const getPublicationDetailSettings = () => getSingleton("publicationDetailSettings");
export const getPublicationCatalogSettings = () => getSingleton("publicationCatalogSettings");

export async function getPage(slug: string): Promise<CollectionEntry<"pages">["data"]> {
	const pages = await getCollection("pages");
	const page = pages.find((entry) => {
		const id = entry.id.replace(/\\/g, "/");
		return entry.data.slug === slug || id === slug || id.endsWith(`/${slug}.json`) || id.endsWith(`/${slug}`) || id === `${slug}.json`;
	});
	if (!page) throw new Error(`Missing CMS page: ${slug}`);
	return page.data;
}

export async function getProjects(): Promise<Project[]> {
	const [entries, siteSettings] = await Promise.all([
		getCollection("projects"),
		getSiteSettings(),
	]);
	assertUnique(entries.map((entry) => entry.data.order), "project order");
	entries.forEach((entry) => assertEntrySlug(entry.id, entry.data.slug, "project"));

	return entries
		.sort((a, b) => a.data.order - b.data.order)
		.map(({ data }, index) => ({
			...data,
			author: siteSettings.site.name,
			number: String(index + 1).padStart(2, "0"),
			href: `/projects/${data.slug}`,
		}));
}

export async function getProducts(): Promise<Product[]> {
	const entries = await getCollection("products");
	assertUnique(entries.map((entry) => entry.data.id), "product id");
	assertUnique(entries.map((entry) => entry.data.slug), "product slug");
	entries.forEach((entry) => assertEntrySlug(entry.id, entry.data.slug, "product"));
	return entries
		.sort((a, b) => a.data.id - b.data.id)
		.map(({ data }) => ({
			...data,
			href: `/products/${data.slug}`,
		}));
}

export async function getProductCategories(): Promise<ReadonlyArray<{ value: string; label: string }>> {
	const products = await getProducts();
	return Array.from(
		new Map(products.map((product) => [product.categorySlug, { value: product.categorySlug, label: product.category }])).values(),
	);
}

export async function getLabs(): Promise<Lab[]> {
	const entries = await getCollection("labs");
	assertUnique(entries.map((entry) => entry.data.order), "lab order");
	entries.forEach((entry) => assertEntrySlug(entry.id, entry.data.slug, "lab"));

	return entries
		.sort((a, b) => a.data.order - b.data.order)
		.map(({ data }) => ({ ...data, href: `/labs/${data.slug}` }));
}

export async function getInsightEntry(slug: string): Promise<CollectionEntry<"blog">> {
	const entries = await getCollection("blog");
	const entry = entries.find(({ data }) => data.slug === slug);
	if (!entry) throw new Error(`Unknown insight slug: ${slug}`);
	assertEntrySlug(entry.id, entry.data.slug, "blog post");
	return entry;
}

export async function getInsights(): Promise<Insight[]> {
	const [entries, interfaceSettings] = await Promise.all([
		getCollection("blog"),
		getInterfaceSettings(),
	]);
	assertUnique(entries.map((entry) => entry.data.order), "blog order");
	entries.forEach((entry) => assertEntrySlug(entry.id, entry.data.slug, "blog post"));

	const dateFormatter = new Intl.DateTimeFormat(
		interfaceSettings.contentFormatting.dateLocale,
		{ day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" },
	);

	return entries
		.sort((a, b) => a.data.order - b.data.order)
		.map(({ data }, index) => ({
			...data,
			index: String(index + 1).padStart(2, "0"),
			href: `/blog/${data.slug}`,
			readTime: interfaceSettings.contentFormatting.readingTimeTemplate.replace("{minutes}", String(data.readingMinutes)),
			duration: `PT${data.readingMinutes}M`,
			publishedLabel: dateFormatter.format(new Date(`${data.publishedAt}T00:00:00Z`)),
		}));
}

export async function getPublications(collection: "comics" | "novels"): Promise<PublicationEntry[]> {
	const entries = await getCollection(collection);
	assertUnique(entries.map((entry) => entry.data.order), `${collection} order`);
	entries.forEach((entry) => assertEntrySlug(entry.id, entry.data.slug, collection.slice(0, -1)));
	return entries
		.sort((a, b) => a.data.order - b.data.order)
		.map(({ data }) => ({
			...data,
			href: `/${collection}/${data.slug}`,
			catalog: collection,
		}));
}

function assertEntrySlug(id: string, slug: string, contentType: string): void {
	const fileSlug = id.replace(/\.(json|md|mdx)$/, "").split("/").pop() ?? id;
	if (fileSlug !== slug) {
		throw new Error(`CMS ${contentType} slug "${slug}" must match its filename "${fileSlug}"`);
	}
}

function assertUnique(values: Array<string | number>, label: string): void {
	if (new Set(values).size !== values.length) {
		throw new Error(`CMS content contains duplicate ${label} values`);
	}
}

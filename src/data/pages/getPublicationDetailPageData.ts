import { getPublicationCatalogs } from "@/data/cms";
import { mapPublicationToCard } from "@/data/mappers/card";
import type { PublicationDetailPageData } from "@/types/components/pages/publication-detail/PublicationDetailPage.types";
import type { PageBuilderConfig } from "@/types/components/pages/builder/PageBuilder.types";
import type { PublicationCatalog, PublicationEntry } from "@/types/content";
import novelsCatalog from "@/content/publications/novels.json";
import comicsCatalog from "@/content/publications/comics.json";

type CatalogSlug = PublicationCatalog["slug"];

export async function getPublicationDetailPaths(slug: CatalogSlug) {
	const catalogs = await getPublicationCatalogs();
	const catalog = catalogs.find((item) => item.slug === slug);
	if (!catalog) return [];
	return catalog.entries.map((entry) => ({ params: { slug: entry.slug } }));
}

export async function getPublicationDetailPageData(
	catalogSlug: CatalogSlug,
	entrySlug: string,
): Promise<PublicationDetailPageData> {
	const catalogs = await getPublicationCatalogs();
	const catalog = catalogs.find((item) => item.slug === catalogSlug);
	const rawCatalog = (catalogSlug === "novels" ? novelsCatalog : comicsCatalog) as PublicationCatalog;
	const entry = rawCatalog.entries.find((item) => item.slug === entrySlug)
		?? catalog?.entries.find((item) => item.slug === entrySlug);
	if (!catalog || !entry) throw new Error(`Missing publication: ${catalogSlug}/${entrySlug}`);

	const detail = entry.detail ?? fallbackDetail(entry);
	const related = catalog.entries
		.filter((item) => item.slug !== entry.slug)
		.slice(0, 3)
		.map((item) => mapPublicationToCard(item, catalog.slug));
	const chapters = Array.from({ length: entry.chapters }, (_, index) => {
		const number = entry.chapters - index;
		const title = detail.chapterTitles[index] ?? `Chapter ${number}`;
		return {
			order: number,
			number: `#${number}`,
			title,
			publishedAt: `2024-04-${String(Math.max(1, 26 - index * 2)).padStart(2, "0")}`,
			publishedLabel: `${Math.max(1, 26 - index * 2)} Apr, 2024`,
			views: `${Math.max(4.8, 12.5 - index * 0.7).toFixed(1)}K`,
			href: `/${catalog.slug}/${entry.slug}/chapter/${number}`,
			badge: index === 0 ? "New" : undefined,
			status: index === 0 ? "available" as const : index < 4 ? "locked" as const : "read" as const,
		};
	});

	const builder: PageBuilderConfig = {
		layout: { template: "fluid" },
		regions: [
			{
				key: "summary",
				component: "page-header",
				placement: "header",
				section: { theme: "canvas", spacing: "compact", container: "site" },
				props: {
					template: "cover-summary",
					data: {
						breadcrumb: {
							label: "Breadcrumb",
							items: [{ label: catalog.label, href: `/${catalog.slug}` }],
							current: entry.title,
						},
						cover: entry.cover,
						trailer: { label: "Watch trailer", href: "#overview", icon: "play", variant: "outline", size: "sm" },
						tagsLabel: `${entry.title} genres`,
						tags: entry.genres.map((genre) => ({ label: genre.label, href: `/${catalog.slug}/category/${genre.slug}` })),
						title: entry.title,
						badge: "Verified",
						author: { label: "Author", name: entry.author, href: `/${catalog.slug}/author/${encodeURIComponent(entry.author)}` },
						metrics: [
							{ label: "Rating", value: String(entry.rating), icon: "star" },
							{ label: "Reads", value: entry.views, icon: "eye" },
							{ label: "Chapters", value: String(entry.chapters), icon: "bookOpen" },
							{ label: "Followers", value: detail.followers, icon: "bookmark" },
						],
						actionsLabel: `${entry.title} actions`,
						actions: [
							{ label: "Read from start", href: "#chapters", icon: "bookOpen", variant: "primary", size: "md" },
							{ label: "Follow", href: "#subscribe", icon: "bookmark", variant: "outline", size: "md" },
						],
						description: detail.description,
						facts: {
							title: "Information",
							items: [
								{ label: "Author", value: entry.author, href: `/${catalog.slug}/author/${encodeURIComponent(entry.author)}` },
								{ label: "Genres", value: entry.genres.map((genre) => genre.label).join(", ") },
								{ label: "Language", value: detail.language },
								{ label: "Status", value: entry.status === "ongoing" ? "Ongoing" : "Complete" },
								{ label: "Updated", value: entry.updatedLabel },
								{ label: "Views", value: entry.views },
								{ label: "Rating", value: `${entry.rating} / 5` },
							],
						},
						share: {
							label: "Share",
							links: [
								{ label: "Share on Twitter", href: "#share-twitter", icon: "twitter" },
								{ label: "Share on Facebook", href: "#share-facebook", icon: "facebook" },
								{ label: "Copy link", href: "#share-link", icon: "link" },
							],
						},
					},
				},
			},
			{
				key: "navigation",
				component: "tabs",
				section: { theme: "canvas", spacing: "none", container: "site" },
				props: {
					label: `${entry.title} sections`,
					appearance: "underline",
					tone: "light",
					activeValue: "chapters",
					tabs: [
						{ label: "Chapters", value: "chapters", href: "#chapters" },
						{ label: "Introduction", value: "overview", href: "#overview" },
						{ label: "Reviews", value: "reviews", href: "#reviews" },
						{ label: "Comments", value: "comments", href: "#comments" },
					],
				},
			},
			{
				key: "content",
				component: "group",
				section: { theme: "canvas", spacing: "body", container: "site" },
				props: {
					template: "sidebar",
					asideLabel: `${entry.title} supporting information`,
					asidePosition: "end",
					regions: [
						{
							key: "chapters",
							component: "entry-index",
							section: false,
							props: {
								id: "chapters",
								label: `${entry.title} chapter index`,
								title: "Chapter list",
								sort: { id: "chapter-sort", label: "Sort chapters", value: "newest", options: [{ label: "Newest", value: "newest" }, { label: "Oldest", value: "oldest" }] },
								listViewLabel: "List view",
								items: chapters,
								visibleCount: detail.chapterTitles.length,
								footerAction: { label: `View all chapters (${entry.chapters})`, type: "button", variant: "outline" },
							},
						},
						{
							key: "overview",
							component: "details",
							placement: "aside",
							section: { id: "overview", theme: "none", spacing: "none", container: "none" },
							props: { title: "Story overview", list: { items: [{ label: "Introduction", value: detail.description[0] }] } },
						},
						{
							key: "tags",
							component: "details",
							placement: "aside",
							section: false,
							props: { list: { items: [] }, tags: { title: "Tags", list: { label: `${entry.title} tags`, items: detail.tags.map((tag) => ({ label: tag.label, href: `/${catalog.slug}/tag/${tag.slug}` })) } } },
						},
						{
							key: "related",
							component: "cards",
							placement: "aside",
							section: false,
							props: { header: { appearance: "compact", data: { title: "Readers also like" } }, cards: { template: "compact-media", layout: "list", gap: "sm", mediaRatio: "portrait", items: related, slots: { metadata: false, tags: false, action: false } } },
						},
					],
				},
			},
			{
				key: "newsletter",
				component: "cta",
				placement: "cta",
				section: { id: "subscribe", theme: "canvas", spacing: "closing", container: "site" },
				props: {
					template: "subscription",
					data: { id: "subscribe", title: catalog.newsletter.title, description: catalog.newsletter.description, image: catalog.newsletter.image, form: { formName: `${catalog.slug}-${entry.slug}-updates`, inputId: "publication-email", inputLabel: catalog.newsletter.inputLabel, placeholder: catalog.newsletter.placeholder, submitLabel: catalog.newsletter.submitLabel } },
				},
			},
		],
	};

	return { metadata: { title: entry.title, description: entry.summary }, builder };
}

function fallbackDetail(entry: PublicationEntry): NonNullable<PublicationEntry["detail"]> {
	return {
		language: "English",
		followers: entry.views,
		description: [entry.summary, `Follow ${entry.title} as new chapters are released.`],
		tags: entry.genres,
		chapterTitles: Array.from({ length: Math.min(8, entry.chapters) }, (_, index) => `Chapter ${entry.chapters - index}`),
	};
}

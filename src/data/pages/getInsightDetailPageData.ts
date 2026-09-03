import { getBlogDetailSettings, getInsightEntry, getInsights } from "@/data/cms";
import type { PageRegion } from "@/types/components/object/project/page/PageRegion.types";
import type { InsightDetailPageData } from "@/types/components/pages/insight-detail/InsightDetailPage.types";
import type { PPageHeaderEditorialData } from "@/types/components/object/project/page-header/PPageHeader.types";
import type {
	CCardConfig,
	InsightCardPresentation,
} from "@/types/components/object/component/card/CCard.types";
import type { PCardProps } from "@/types/components/object/project/card/PCard.types";

function decodeHeadingText(value: string): string {
	return value
		.replace(/<[^>]+>/g, "")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.trim();
}

function createHeadingSlug(value: string): string {
	return value
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "") || "section";
}

function normalizeArticleContent(source: string): {
	content: string;
	tocItems: Array<{ label: string; href: string }>;
} {
	const usedIds = new Map<string, number>();
	const tocItems: Array<{ label: string; href: string }> = [];

	const content = source.replace(
		/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
		(_match, level: string, rawAttributes: string, innerHtml: string) => {
			const label = decodeHeadingText(innerHtml);
			const existingId = rawAttributes.match(/\sid=(?:"([^"]+)"|'([^']+)')/i)?.slice(1).find(Boolean);
			const baseId = existingId || createHeadingSlug(label);
			const seen = usedIds.get(baseId) ?? 0;
			usedIds.set(baseId, seen + 1);
			const id = seen === 0 ? baseId : `${baseId}-${seen + 1}`;
			const attributes = existingId
				? rawAttributes.replace(/\sid=(?:"[^"]+"|'[^']+')/i, ` id="${id}"`)
				: `${rawAttributes} id="${id}"`;

			tocItems.push({ label, href: `#${id}` });
			return `<h${level}${attributes}>${innerHtml}</h${level}>`;
		},
	);

	return { content, tocItems };
}

export async function getInsightDetailPaths() {
	const insights = await getInsights();
	return insights.map((post) => ({
		params: { slug: post.slug },
		props: { slug: post.slug },
	}));
}

export async function getInsightDetailPageData(
	slug: string,
): Promise<InsightDetailPageData> {
	const [insights, presentation, entry] = await Promise.all([
		getInsights(),
		getBlogDetailSettings(),
		getInsightEntry(slug),
	]);
	const post = insights.find((insight) => insight.slug === slug);
	if (!post) throw new Error(`Unknown insight slug: ${slug}`);

	const { content, tocItems } = normalizeArticleContent(entry.data.content);
	const relatedPosts = insights
		.filter((insight) => insight.slug !== slug)
		.sort((a, b) => {
			const aScore = Number(a.categorySlug === post.categorySlug) * 2 + a.tags.filter((tag) => post.tags.some((postTag) => postTag.slug === tag.slug)).length;
			const bScore = Number(b.categorySlug === post.categorySlug) * 2 + b.tags.filter((tag) => post.tags.some((postTag) => postTag.slug === tag.slug)).length;
			return bScore - aScore || b.publishedAt.localeCompare(a.publishedAt);
		})
		.slice(0, presentation.sidebar.relatedLimit);

	const header = presentation.header;
	const sidebar = presentation.sidebar;
	const headerData: PPageHeaderEditorialData = {
		breadcrumb: {
			label: header.breadcrumbLabel,
			items: [
				{ label: header.collectionLabel, href: header.routes.base },
				{ label: post.category, href: `${header.routes.categoryBase}${post.categorySlug}` },
			],
			current: post.title,
		},
		category: {
			label: post.category,
			href: `${header.routes.categoryBase}${post.categorySlug}`,
		},
		title: post.title,
		description: post.excerpt,
		author: post.author,
		publishedAt: post.publishedAt,
		publishedLabel: post.publishedLabel,
		readTime: post.readTime,
		image: {
			src: post.image,
			alt: post.imageAlt,
			width: header.imageWidth,
			height: header.imageHeight,
		},
		authorImage: {
			src: header.authorImage.src,
			alt: post.author,
			width: header.authorImage.width,
			height: header.authorImage.height,
		},
		share: {
			label: header.share.label,
			links: [
				{
					label: header.share.twitterLabel,
					href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(post.href)}`,
					icon: "twitter",
				},
				{
					label: header.share.linkedinLabel,
					href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.href)}`,
					icon: "linkedin",
				},
				{
					label: header.share.copyLabel,
					href: post.href,
					icon: "link",
				},
			],
		},
	};


	const relatedPresentation: InsightCardPresentation = {
		routes: header.routes,
		separator: sidebar.relatedCards.separator,
		metadataDisplay: sidebar.relatedCards.metadataDisplay,
		imageWidth: sidebar.relatedCards.imageWidth,
		imageHeight: sidebar.relatedCards.imageHeight,
	};

	const relatedCardConfig = sidebar.relatedCards.card;
	const relatedPCard: PCardProps = {
		template: relatedCardConfig.layout as PCardProps["template"],
		columns: relatedCardConfig.columns as PCardProps["columns"],
		gap: relatedCardConfig.gap as PCardProps["gap"],
		card: {
			template: relatedCardConfig.template as CCardConfig["template"],
			slots: relatedCardConfig.slots as CCardConfig["slots"],
			source: "blog",
			presentation: relatedPresentation,
		},
		items: relatedPosts,
	};

	const nestedRegions: PageRegion[] = [
		{
			key: "author-profile",
			component: "profile",
			placement: "aside",
			section: false,
			props: {
				label: sidebar.author.label,
				name: post.author,
				role: sidebar.author.role,
				bio: sidebar.author.bio,
				image: {
					src: header.authorImage.src,
					alt: post.author,
					width: header.authorImage.width,
					height: header.authorImage.height,
				},
				action: {
					href: header.routes.base,
					label: sidebar.author.actionLabel,
				},
			},
		},
		...(tocItems.length
			? [
					{
						key: "table-of-contents",
						component: "toc" as const,
						placement: "aside" as const,
						section: false as const,
						props: {
							appearance: sidebar.toc.appearance,
							label: sidebar.toc.label,
							items: tocItems,
						},
					},
				]
			: []),
		...(relatedPosts.length
			? [
					{
						key: "related-posts",
						component: "cards" as const,
						placement: "aside" as const,
						section: false as const,
						props: {
							panel: true,
							header: {
								data: { title: sidebar.relatedTitle },
								appearance: sidebar.relatedCards.heading.appearance,
								headingLevel: sidebar.relatedCards.heading.level,
							},
							cards: relatedPCard,
						},
					},
				]
			: []),
		{
			key: "newsletter",
			component: "advertisement",
			placement: "aside",
			section: false,
			props: {
				template: sidebar.newsletter.template,
				data: sidebar.newsletter,
			},
		},
		{
			key: "article-header",
			component: "page-header",
			section: false,
			props: {
				template: header.template,
				data: headerData,
			},
		},
		{
			key: "article-content",
			component: "article",
			section: false,
			props: {
				template: presentation.content.template,
				content,
			},
		},
	];

	return {
		post,
		pageTemplate: presentation.page.template,
		regions: [
			{
				key: presentation.section.id,
				component: "group",
				section: {
					id: presentation.section.id,
					...presentation.section.settings,
				},
				props: {
					template: "sidebar",
					asideLabel: sidebar.label,
					asidePosition: sidebar.position,
					stickyAside: sidebar.sticky,
					asideGap: sidebar.columns.gap,
					gap: presentation.content.columns.gap,
					regions: nestedRegions,
				},
			},
		],
	};
}

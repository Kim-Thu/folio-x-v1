import { getBlogDetailSettings, getInsights } from "@/data/cms";
import { mapInsightToCard } from "@/data/mappers/card";
import type { PageRegion } from "@/types/components/pages/builder/PageBuilder.types";
import type { InsightDetailPageData } from "@/types/components/pages/insight-detail/InsightDetailPage.types";
import type { PPageHeaderEditorialData } from "@/types/components/object/project/page-header/PPageHeader.types";

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
	const [insights, presentation] = await Promise.all([
		getInsights(),
		getBlogDetailSettings(),
	]);
	const post = insights.find((insight) => insight.slug === slug);
	if (!post) throw new Error(`Unknown insight slug: ${slug}`);

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

	const tocItems = post.content
		.filter((node) => node.type === "heading")
		.map((node) => ({ label: node.text, href: `#${node.id}` }));

	const relatedCards = relatedPosts.map((insight) =>
		mapInsightToCard(insight, {
			routes: header.routes,
			separator: sidebar.relatedCards.separator,
			metadataDisplay: sidebar.relatedCards.metadataDisplay,
			imageWidth: sidebar.relatedCards.imageWidth,
			imageHeight: sidebar.relatedCards.imageHeight,
		}),
	);

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
		...(relatedCards.length
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
							cards: {
								template: sidebar.relatedCards.card.template,
								layout: sidebar.relatedCards.card.layout,
								columns: sidebar.relatedCards.card.columns,
								gap: sidebar.relatedCards.card.gap,
								items: relatedCards,
								slots: sidebar.relatedCards.card.slots,
							},
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
				content: post.content,
			},
		},
	];

	return {
		post,
		layout: { template: presentation.page.template },
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

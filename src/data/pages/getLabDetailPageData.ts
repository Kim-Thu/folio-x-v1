import { getLabDetailSettings, getLabs } from "@/data/cms";
import type { PageRegion } from "@/types/components/pages/builder/PageBuilder.types";
import type { LabDetailPageData } from "@/types/components/pages/lab-detail/LabDetailPage.types";
import type { PPageHeaderMediaAsideData } from "@/types/components/object/project/page-header/PPageHeader.types";

const formatTitleLabel = (template: string, title: string) =>
	template.replace("{title}", title);

export async function getLabDetailPaths() {
	const labs = await getLabs();
	return labs.map((lab) => ({
		params: { slug: lab.slug },
		props: { slug: lab.slug },
	}));
}

export async function getLabDetailPageData(
	slug: string,
): Promise<LabDetailPageData> {
	const [labs, presentation] = await Promise.all([
		getLabs(),
		getLabDetailSettings(),
	]);
	const lab = labs.find((item) => item.slug === slug);
	if (!lab) throw new Error(`Unknown lab slug: ${slug}`);

	const labsBySlug = new Map(labs.map((item) => [item.slug, item]));
	const relatedLabs = lab.related.slugs.map((relatedSlug) => {
		const relatedLab = labsBySlug.get(relatedSlug);
		if (!relatedLab) {
			throw new Error(
				`Unknown related lab slug "${relatedSlug}" configured for lab "${slug}"`,
			);
		}
		return relatedLab;
	});

	const metricValue = (source: "stars" | "forks" | "updatedLabel") =>
		source === "updatedLabel" ? lab.updatedLabel : String(lab[source]);

	const headerData: PPageHeaderMediaAsideData = {
		breadcrumb: {
			label: presentation.header.labels.breadcrumb,
			items: [
				{
					label: presentation.header.labels.collection,
					href: presentation.header.routes.base,
				},
				{
					label: lab.category.label,
					href: `${presentation.header.routes.categoryBase}/${lab.category.slug}`,
				},
			],
			current: lab.title,
		},
		image: lab.image,
		category: {
			label: lab.category.label,
			href: `${presentation.header.routes.categoryBase}/${lab.category.slug}`,
		},
		badge: lab.statusLabel,
		title: lab.title,
		description: lab.summary,
		metrics: presentation.header.metrics.map((metric) => ({
			icon: metric.icon,
			label: metricValue(metric.source),
		})),
		actionsLabel: formatTitleLabel(
			presentation.header.labels.actionsTemplate,
			lab.title,
		),
		actions: [
			...(lab.liveUrl
				? [
						{
							label: presentation.header.labels.live,
							href: lab.liveUrl,
							...presentation.header.actions.live,
						},
					]
				: []),
			...(lab.sourceUrl
				? [
						{
							label: presentation.header.labels.source,
							href: lab.sourceUrl,
							...presentation.header.actions.source,
						},
					]
				: []),
		],
	};

	const contentTabs = lab.content.flatMap((block) => {
		if (
			(block.type === "heading" || block.type === "feature-grid") &&
			block.navigationLabel
		) {
			return [
				{
					label: block.navigationLabel,
					value: block.id,
					href: `#${block.id}`,
				},
			];
		}
		if (
			block.type === "metric-grid" &&
			block.navigationLabel &&
			block.id
		) {
			return [
				{
					label: block.navigationLabel,
					value: block.id,
					href: `#${block.id}`,
				},
			];
		}
		return [];
	});

	const tabs = [
		...contentTabs,
		...(lab.gallery.length > 0
			? [
					{
						label: presentation.gallery.title,
						value: presentation.gallery.id,
						href: `#${presentation.gallery.id}`,
					},
				]
			: []),
		...(lab.resources.length > 0
			? [
					{
						label: presentation.resources.title,
						value: presentation.resources.id,
						href: `#${presentation.resources.id}`,
					},
				]
			: []),
	];

	const contentGroup: PageRegion = {
		key: presentation.content.id,
		component: "group",
		section: {
			id: presentation.content.id,
			...presentation.content.settings,
		},
		props: {
			template: "sidebar",
			asideLabel: formatTitleLabel(presentation.sidebar.labelTemplate, lab.title),
			asidePosition: presentation.sidebar.position,
			stickyAside: presentation.sidebar.sticky,
			asideGap: presentation.sidebar.stack.gap,
			gap: presentation.sidebar.stack.gap,
			regions: [
				{
					key: "project-information",
					component: "details",
					placement: "aside",
					section: false,
					props: {
						title: presentation.sidebar.labels.projectInformation,
						list: { items: lab.facts },
						tags: {
							title: formatTitleLabel(
								presentation.sidebar.labels.technologyTemplate,
								lab.title,
							),
							list: {
								label: formatTitleLabel(
									presentation.sidebar.labels.technologyTemplate,
									lab.title,
								),
								items: lab.technologies.map((technology) => ({
									label: technology.label,
									href: `${presentation.header.routes.technologyBase}/${technology.slug}`,
								})),
							},
						},
					},
				},
				{
					key: "lab-article",
					component: "article",
					section: false,
					props: {
						template: presentation.content.article.template,
						content: lab.content,
					},
				},
			],
		},
	};

	const regions: PageRegion[] = [
		{
			key: presentation.header.id,
			component: "page-header",
			section: {
				id: presentation.header.id,
				...presentation.header.settings,
			},
			props: {
				template: presentation.header.template,
				data: headerData,
			},
		},
		...(tabs.length > 0
			? [
					{
						key: "lab-navigation",
						component: "tabs" as const,
						section: presentation.navigation.settings,
						props: {
							label: formatTitleLabel(
								presentation.navigation.labelTemplate,
								lab.title,
							),
							appearance: presentation.navigation.appearance,
							activeValue: tabs[0]?.value,
							tone: presentation.navigation.tone,
							tabs,
						},
					},
				]
			: []),
		contentGroup,
		...(lab.gallery.length > 0
			? [
					{
						key: presentation.gallery.id,
						component: "gallery" as const,
						section: {
							id: presentation.gallery.id,
							...presentation.gallery.settings,
						},
						props: {
							template: "grid" as const,
							label: presentation.gallery.title,
							items: lab.gallery,
						},
					},
				]
			: []),
		...(lab.resources.length > 0
			? [
					{
						key: presentation.resources.id,
						component: "cards" as const,
						section: {
							id: presentation.resources.id,
							...presentation.resources.settings,
						},
						props: {
							header: {
								data: { title: presentation.resources.title },
								appearance: presentation.resources.header.appearance,
								headingLevel: presentation.resources.header.headingLevel,
							},
							cards: {
								template: "icon-panel",
								layout: "grid",
								columns: 4,
								gap: "md",
								items: lab.resources.map((resource) => ({
									href: resource.href,
									ariaLabel: resource.actionLabel,
									title: [resource.title],
									excerpt: resource.description,
									icon: resource.icon,
									action: {
										label: resource.actionLabel,
										href: resource.href,
										icon: presentation.resources.actionIcon,
									},
								})),
							},
						},
					},
				]
			: []),
		...(relatedLabs.length > 0
			? [
					{
						key: presentation.related.id,
						component: "cards" as const,
						section: {
							id: presentation.related.id,
							...presentation.related.settings,
						},
						props: {
							header: {
								data: { title: presentation.related.title },
								appearance: presentation.related.header.appearance,
								headingLevel: presentation.related.header.headingLevel,
							},
							headerAction: {
								label: presentation.related.actionLabel,
								href: presentation.header.routes.base,
								icon: presentation.related.actionIcon,
							},
							cards: {
								template: "editorial",
								layout: "grid",
								columns: 4,
								gap: "md",
								mediaRatio: presentation.related.mediaRatio,
								items: relatedLabs.map((item) => ({
									href: item.href,
									ariaLabel: item.title,
									title: [item.title],
									excerpt: item.summary,
									media: item.image,
									metadata: {
										items: [
											{
												type: "category",
												label: item.category.label,
												href: `${presentation.header.routes.categoryBase}/${item.category.slug}`,
												display: presentation.related.metaRow.metadataDisplay,
											},
										],
									},
									metrics: [
										{
											icon: presentation.related.metricIcon,
											label: String(item.stars),
										},
									],
								})),
							},
						},
					},
				]
			: []),
	];

	return {
		layout: { template: presentation.page.template },
		regions,
	};
}

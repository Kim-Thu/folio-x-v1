import { getLabDetailSettings, getLabs } from "@/data/cms";
import type { LabDetailPageData, LabDetailTabData } from "@/types/components/pages/lab-detail/LabDetailPage.types";
import type { PCardData } from "@/types/components/object/project/card/PCard.types";

const formatTitleLabel = (template: string, title: string) =>
	template.replace("{title}", title);

const formatIndexLabel = (template: string, index: number) =>
	template.replace("{index}", String(index));

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
			throw new Error(`Unknown related lab slug "${relatedSlug}" configured for lab "${slug}"`);
		}
		return relatedLab;
	});

	const metricValue = (source: "stars" | "forks" | "updatedLabel") =>
		source === "updatedLabel" ? lab.updatedLabel : String(lab[source]);

	const header = {
		breadcrumb: {
			label: presentation.header.labels.breadcrumb,
			items: [
				{ label: presentation.header.labels.collection, href: presentation.header.routes.base },
				{ label: lab.category.label, href: `${presentation.header.routes.categoryBase}/${lab.category.slug}` },
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
		actionsLabel: formatTitleLabel(presentation.header.labels.actionsTemplate, lab.title),
		actions: [
			...(lab.liveUrl
				? [{ label: presentation.header.labels.live, href: lab.liveUrl, ...presentation.header.actions.live }]
				: []),
			...(lab.sourceUrl
				? [{ label: presentation.header.labels.source, href: lab.sourceUrl, ...presentation.header.actions.source }]
				: []),
		],
	};

	const contentTabs: LabDetailTabData[] = lab.content.flatMap((block) => {
		if (block.type === "heading" && block.navigationLabel) {
			return [{ label: block.navigationLabel, value: block.id, href: `#${block.id}` }];
		}
		if (block.type === "feature-grid" && block.navigationLabel) {
			return [{ label: block.navigationLabel, value: block.id, href: `#${block.id}` }];
		}
		if (block.type === "metric-grid" && block.navigationLabel && block.id) {
			return [{ label: block.navigationLabel, value: block.id, href: `#${block.id}` }];
		}
		return [];
	});

	const tabs: LabDetailTabData[] = [
		...contentTabs,
		...(lab.gallery.length > 0
			? [{ label: presentation.gallery.title, value: presentation.gallery.id, href: `#${presentation.gallery.id}` }]
			: []),
		...(lab.resources.length > 0
			? [{ label: presentation.resources.title, value: presentation.resources.id, href: `#${presentation.resources.id}` }]
			: []),
	];

	const sidebar = {
		label: formatTitleLabel(presentation.sidebar.labelTemplate, lab.title),
		facts: lab.facts,
		technologyLabel: formatTitleLabel(presentation.sidebar.labels.technologyTemplate, lab.title),
		technologies: lab.technologies.map((technology) => ({
			label: technology.label,
			href: `${presentation.header.routes.technologyBase}/${technology.slug}`,
		})),
	};

	const galleryCards: PCardData[] = lab.gallery.map((image, index) => {
		const displayIndex = index + 1;
		return {
			href: image.src,
			ariaLabel: formatIndexLabel(presentation.gallery.openImageLabelTemplate, displayIndex),
			title: [image.caption ?? formatIndexLabel(presentation.gallery.imageTitleLabelTemplate, displayIndex)],
			media: image,
		};
	});

	const resourceCards: PCardData[] = lab.resources.map((resource) => ({
		href: resource.href,
		ariaLabel: resource.title,
		title: [resource.title],
		excerpt: resource.description,
		icon: resource.icon,
		action: {
			label: resource.actionLabel,
			href: resource.href,
			icon: presentation.resources.actionIcon,
		},
	}));

	const relatedCards: PCardData[] = relatedLabs.map((item) => ({
		href: item.href,
		ariaLabel: item.title,
		title: [item.title],
		excerpt: item.summary,
		media: item.image,
		metadata: {
			items: [{
				type: "category",
				label: item.category.label,
				href: `${presentation.header.routes.categoryBase}/${item.category.slug}`,
				display: presentation.related.categoryDisplay,
			}],
		},
		metrics: [{ icon: presentation.related.metricIcon, label: String(item.stars) }],
	}));

	return {
		lab,
		presentation,
		header,
		tabs,
		sidebar,
		galleryCards,
		resourceCards,
		relatedCards,
	};
}

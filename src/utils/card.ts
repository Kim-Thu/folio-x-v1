import type {
	CCardData,
	CCardItemData,
	CCardPresentation,
	CCardSlotOptions,
	CCardSlots,
	CCardSource,
	InsightCardPresentation,
	LabCardPresentation,
	ProductCardPresentation,
	ProjectCardPresentation,
	PublicationCardPresentation,
	PublicationCollectionPresentation,
} from "@/types/components/object/component/card/CCard.types";
import type {
	Insight,
	Lab,
	Product,
	Project,
	PublicationEntry,
} from "@/types/content";

export const DEFAULT_CARD_SLOTS: CCardSlots = {
	media: true,
	icon: true,
	metadata: true,
	tags: true,
	metrics: true,
	title: true,
	excerpt: true,
	action: true,
};

export function resolveCardSlots(slots?: CCardSlotOptions): CCardSlots {
	return {
		...DEFAULT_CARD_SLOTS,
		...slots,
	};
}

export function getCardItemTitle(item: CCardItemData): string {
	return Array.isArray(item.title) ? item.title.join(" ") : item.title;
}

export function getCardItemAriaLabel(item: CCardItemData): string {
	return "ariaLabel" in item && typeof item.ariaLabel === "string"
		? item.ariaLabel
		: getCardItemTitle(item);
}

export function getCardItemSize(item: CCardItemData) {
	return "size" in item ? item.size : undefined;
}

type DynamicCardSource = Exclude<CCardSource, "static">;

type CardSourceDataMap = {
	products: Product;
	projects: Project;
	labs: Lab;
	blog: Insight;
	comics: PublicationEntry;
	novels: PublicationEntry;
	publications: PublicationEntry;
};

type CardSourcePresentationMap = {
	products: ProductCardPresentation;
	projects: ProjectCardPresentation;
	labs: LabCardPresentation;
	blog: InsightCardPresentation;
	comics: PublicationCardPresentation;
	novels: PublicationCardPresentation;
	publications: PublicationCollectionPresentation;
};

interface CardSourceContextInput {
	data: CCardData;
	source?: CCardSource;
	presentation?: CCardPresentation;
}

export function getCardSourceContext<S extends DynamicCardSource>(
	expectedSource: S,
	{
		data,
		source,
		presentation,
	}: CardSourceContextInput,
): {
	item: CardSourceDataMap[S] | undefined;
	presentation: CardSourcePresentationMap[S] | undefined;
} {
	if (source !== expectedSource) {
		return {
			item: undefined,
			presentation: undefined,
		};
	}

	return {
		item: data as unknown as CardSourceDataMap[S],
		presentation: presentation as CardSourcePresentationMap[S] | undefined,
	};
}

interface ProjectOverlayCardInput {
	data: CCardData;
	source?: CCardSource;
	presentation?: CCardPresentation;
}

export function resolveProjectOverlayCard({
	data,
	source,
	presentation,
}: ProjectOverlayCardInput) {
	const {
		item: project,
		presentation: projectPresentation,
	} = getCardSourceContext("projects", {
		data,
		source,
		presentation,
	});
	const href = project?.href ?? data.href;
	const title = project?.title ?? data.title.join(" ");
	const excerpt = project?.summary ?? data.excerpt;
	const appearance = project
		? project.tone === "dark"
			? projectPresentation?.darkAppearance
			: projectPresentation?.lightAppearance
		: data.appearance;
	const media = project && projectPresentation
		? {
			src: project.image,
			alt: project.alt || project.title,
			width: projectPresentation.imageWidth,
			height: projectPresentation.imageHeight,
		}
		: data.media;
	const metadata = project
		? {
			separator: projectPresentation?.separator,
			items: [
				{
					type: "category" as const,
					label: project.category.toUpperCase(),
					href: projectPresentation?.routes.categoryBase
						? `${projectPresentation.routes.categoryBase}${project.categorySlug}`
						: undefined,
					display: projectPresentation?.metadataDisplay,
				},
				{
					type: "author" as const,
					label: project.author,
					display: projectPresentation?.metadataDisplay,
				},
				{
					type: "datetime" as const,
					label: `Updated ${project.year}`,
					display: projectPresentation?.metadataDisplay,
				},
			],
		}
		: data.metadata;
	const tags = project
		? project.tags.map((tag) => ({
			label: tag.label,
			href: projectPresentation?.routes.tagBase
				? `${projectPresentation.routes.tagBase}${tag.slug}`
				: undefined,
		}))
		: data.tags;
	const tagsLabel = project
		? projectPresentation?.tagsLabel
		: data.tagsLabel;
	const action = project
		? project.detail?.liveUrl
			? {
				label: "Live site",
				href: project.detail.liveUrl,
				icon: "arrowUpRight" as const,
				iconPosition: "end" as const,
			}
			: project.detail?.sourceUrl
				? {
					label: "GitHub",
					href: project.detail.sourceUrl,
					icon: "github" as const,
					iconPosition: "end" as const,
				}
				: {
					label: projectPresentation?.actionLabel ?? "Xem dự án",
					href,
					icon: projectPresentation?.actionIcon ?? ("arrowRight" as const),
					iconPosition: "end" as const,
				}
		: data.action;

	return {
		href,
		title,
		excerpt,
		inverse: appearance === "inverse",
		media,
		metadata,
		tags,
		tagsLabel,
		action,
		filterValue: project?.category ?? data.filterValue,
		sortValue: project?.year ?? data.sortValue,
	};
}

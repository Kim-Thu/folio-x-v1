import type { CollectionEntry } from "astro:content";
import type { PageBuilderConfig, PageRegion } from "@/types/components/pages/builder/PageBuilder.types";
import type { HomePageData } from "@/types/components/pages/home/HomePage.types";
import type { PCardData } from "@/types/components/object/project/card/PCard.types";
import type { PHeroProps } from "@/types/components/object/project/hero/PHero.types";
import type { PCtaProps } from "@/types/components/object/project/cta/PCta.types";
import type { PCardProps } from "@/types/components/object/project/card/PCard.types";
import type { PSectionHeaderData } from "@/types/components/object/project/section-header/PSectionHeader.types";
import { getLabs, getInsights, getProjects, getProducts, getPublicationCatalogs } from "@/data/cms";
import { mapInsightToCard, mapLabToCard, mapProductToCard, mapProjectToCard, mapPublicationToCard } from "@/data/mappers/card";

type PageEntry = CollectionEntry<"pages">["data"];
type Section = PageEntry["content"]["sections"][number];
type RecordValue = Record<string, unknown>;

function record(value: unknown): RecordValue {
	return value && typeof value === "object" && !Array.isArray(value) ? value as RecordValue : {};
}

function string(value: unknown, fallback = ""): string {
	return typeof value === "string" ? value : fallback;
}

function array(value: unknown): unknown[] {
	return Array.isArray(value) ? value : [];
}

function source(section: Section): RecordValue {
	return record(record(section.content).source);
}

function limit(value: unknown, fallback: number): number {
	return typeof value === "number" && value > 0 ? value : fallback;
}

function sectionBase(section: Section) {
	const settings = record(section.settings);
	return {
		id: section.id,
		theme: string(settings.theme, "light") as "light" | "dark",
		spacing: string(settings.spacing, "compact") as "lead" | "compact" | "none",
		container: string(settings.container, "site") as "site" | "content" | "none",
	};
}

function cards(
	section: Section,
	items: PCardData[],
	slotsOverride?: Record<string, boolean>,
) {
	const content = record(section.content);
	const config = record(content.cards);
	const settings = record(section.settings);
	return {
		template: string(config.template, string(section.template, "overlay")) as "overlay" | "media-details" | "media-caption" | "media-banner" | "stacked",
		layout: string(config.layout, string(settings.layout, "grid")) as "grid" | "asymmetric" | "showcase" | "list",
		columns: (config.columns ?? settings.columns ?? 1) as 1 | 2 | 3 | 4,
		gap: string(config.gap, string(settings.gap, "sm")) as "none" | "sm" | "md",
		mediaRatio: (config.mediaRatio ?? settings.mediaRatio) as "landscape" | "panoramic" | "video" | undefined,
		separator: (config.separator ?? settings.separator) as "none" | "light" | "dark" | undefined,
		headingLevel: (config.headingLevel ?? 3) as 2 | 3 | 4,
		slots: slotsOverride ?? (record(config.slots) as Record<string, boolean>),
		items,
	};
}

function heading(section: Section): RecordValue {
	return record(record(section.content).heading);
}

function sectionHeader(section: Section) {
	const value = heading(section);
	const action = record(value.action);
	return {
		number: string(value.number),
		label: string(value.label),
		title: array(value.title).filter((item): item is string => typeof item === "string"),
		description: string(value.description),
		action: {
			href: string(action.href),
			label: string(action.label),
			icon: string(action.icon, "arrowRight") as "arrowRight",
			iconPosition: "end" as const,
			variant: "text" as const,
			tone: "light" as const,
			size: "sm" as const,
		},
	};
}

async function resolveItems(section: Section): Promise<PCardData[]> {
	const sourceName = string(source(section).collection);
	const count = limit(source(section).limit, 4);
	if (sourceName === "products") return (await getProducts()).slice(0, count).map(mapProductToCard);
	if (sourceName === "projects") return (await getProjects()).slice(0, count).map((item) => mapProjectToCard(item, "View case direction", "·"));
	if (sourceName === "labs") return (await getLabs()).slice(0, count).map(mapLabToCard);
	if (sourceName === "blog") return (await getInsights()).slice(0, count).map((item) => mapInsightToCard(item, "·"));
	if (sourceName === "publications") {
		const catalogs = await getPublicationCatalogs();
		return catalogs.flatMap((catalog) => catalog.entries.slice(0, count).map((item) => mapPublicationToCard(item, catalog.slug))).slice(0, count);
	}
	return [];
}

function staticUniverseItems(section: Section): PCardData[] {
	const configured = array(record(section.content).items);
	return configured.filter((item): item is PCardData => {
		const value = record(item);
		return typeof value.href === "string" && Array.isArray(value.title) && typeof value.excerpt === "string" && record(value.media).src !== undefined;
	});
}

export async function resolvePage(page: PageEntry): Promise<HomePageData> {
	const regions: PageRegion[] = [];
	for (const section of page.content.sections) {
		const content = record(section.content);
		if (section.type === "hero") {
			regions.push({ key: section.id, component: "hero", section: sectionBase(section), props: { template: string(section.template, "split-media") as PHeroProps["template"], data: content as unknown as PHeroProps["data"] } });
			continue;
		}
		if (section.type === "cta") {
			regions.push({ key: section.id, component: "cta", placement: "cta", section: sectionBase(section), props: { template: string(section.template, "callout") as PCtaProps["template"], data: content as unknown as PCtaProps["data"] } });
			continue;
		}
		const items = section.id === "universe" ? staticUniverseItems(section) : await resolveItems(section);
		if (section.type === "cards") {
			regions.push({ key: section.id, component: "cards", section: sectionBase(section), props: { cards: cards(section, items) as unknown as PCardProps } });
			continue;
		}
		if (section.type === "collection" && section.id === "insights") {
			const featured = items.slice(0, 1);
			const recent = items.slice(1).map((item, index) => ({ ...item, metadata: { ...item.metadata, items: [{ type: "index" as const, label: String(index + 2).padStart(2, "0"), display: "text" as const }, ...(item.metadata?.items ?? [])] } }));
			regions.push({
				key: section.id,
				component: "collection",
				section: sectionBase(section),
				props: {
					template: "split",
					header: { template: "split", data: sectionHeader(section) as unknown as PSectionHeaderData },
					cardGroups: [
						cards(section, featured) as unknown as PCardProps,
						{
							...cards(section, recent, {
								media: false,
								icon: false,
								metadata: true,
								tags: false,
								metrics: false,
								title: true,
								excerpt: true,
								action: false,
							}),
							template: "stacked",
							layout: "list",
							separator: "light",
						} as unknown as PCardProps,
					],
				},
			});
			continue;
		}
		if (section.type === "collection") {
			const headingTitle = array(heading(section).title).filter((item): item is string => typeof item === "string").join(" ");
			regions.push({ key: section.id, component: "group", section: sectionBase(section), props: { template: "sidebar", asideLabel: headingTitle || section.id, asidePosition: "start", regions: [{ key: `${section.id}-heading`, component: "section-header", section: false, placement: "aside", props: { data: sectionHeader(section) as unknown as PSectionHeaderData } }, { key: `${section.id}-cards`, component: "cards", section: false, props: { cards: cards(section, items) as unknown as PCardProps } }] } });
		}
	}
	const config: PageBuilderConfig = { layout: { template: "fluid", containerSize: "site" }, regions };
	return { builder: config };
}

import type {
	PageBuilderConfig,
	PageBuilderControl,
	PageRegion,
} from "@/types/components/pages/builder/PageBuilder.types";

const templatesByComponent = {
	"page-header": new Set([
		"editorial",
		"immersive",
		"split-media",
		"slider-aside",
		"split-benefits",
		"gallery-summary",
		"media-aside",
		"cover-summary",
	]),
	hero: new Set(["split-media"]),
	"section-header": new Set(["default", "split"]),
	article: new Set<string>(),
	reviews: new Set<string>(),
	cards: new Set([
		"stacked",
		"horizontal",
		"overlay",
		"featured",
		"boxed",
		"media-details",
		"compact-media",
		"compact-bordered",
		"editorial",
		"icon-panel",
		"icon-summary",
		"media-only",
		"media-summary",
		"media-metrics",
	]),
	cta: new Set(["default", "callout", "media-pricing", "inline", "subscription"]),
	"post-navigation": new Set(["split"]),
	collection: new Set(["stack", "split"]),
	archive: new Set(["taxonomy", "faceted"]),
	advertisement: new Set<string>(),
	details: new Set<string>(),
	group: new Set(["sidebar"]),
	profile: new Set<string>(),
	status: new Set(["split-media"]),
	tabs: new Set<string>(),
	"entry-index": new Set<string>(),
	reader: new Set<string>(),
	toc: new Set<string>(),
} satisfies Record<PageRegion["component"], Set<string>>;

export function applyPageBuilderControl(
	defaultConfig: PageBuilderConfig,
	control?: PageBuilderControl,
): PageBuilderConfig {
	if (!control) return defaultConfig;

	const regionsByKey = new Map(
		defaultConfig.regions.map((region) => [region.key, region]),
	);
	const controlledKeys = new Set(control.regions.map((region) => region.key));

	const controlledRegions = control.regions.map((selection) => {
		const region = regionsByKey.get(selection.key);

		if (!region) {
			throw new Error(`Unknown page builder region: ${selection.key}`);
		}

		if (region.component !== selection.component) {
			throw new Error(
				`Region "${selection.key}" expects "${region.component}", received "${selection.component}"`,
			);
		}

		const configuredRegion: PageRegion = {
			...region,
			enabled: selection.enabled,
			placement: selection.placement,
			section: {
				...(region.section || {}),
				theme: selection.theme,
				spacing: selection.spacing,
				container: selection.container,
			},
		};

		return selection.template
			? applyRegionTemplate(configuredRegion, selection.template)
			: configuredRegion;
	});

	return {
		layout: {
			...defaultConfig.layout,
			...control.layout,
		},
		regions: [
			...controlledRegions,
			...defaultConfig.regions.filter(
				(region) => !controlledKeys.has(region.key),
			),
		],
	};
}

function applyRegionTemplate(
	region: PageRegion,
	template: string,
): PageRegion {
	if (!templatesByComponent[region.component].has(template)) {
		throw new Error(
			`Template "${template}" is not valid for "${region.component}"`,
		);
	}

	switch (region.component) {
		case "page-header":
		case "hero":
		case "section-header":
		case "cards":
		case "cta":
		case "post-navigation":
		case "collection":
		case "status":
		case "group":
			return {
				...region,
				props: {
					...region.props,
					template,
				},
			} as PageRegion;
		case "archive":
			return {
				...region,
				props: {
					...region.props,
					mode: template,
				},
			} as PageRegion;
		case "article":
		case "reviews":
		case "advertisement":
		case "details":
		case "profile":
		case "tabs":
		case "toc":
		case "entry-index":
		case "reader":
			return region;
	}
}

import CardAsymmetric from "@/components/object/project/card/parts/CardAsymmetric.astro";
import CardCarousel from "@/components/object/project/card/parts/CardCarousel.astro";
import CardContentThreeColumn from "@/components/object/project/card/parts/CardContentThreeColumn.astro";
import CardGrid from "@/components/object/project/card/parts/CardGrid.astro";
import CardMosaic from "@/components/object/project/card/parts/CardMosaic.astro";
import CardShowcase from "@/components/object/project/card/parts/CardShowcase.astro";
import CardTwelveColumn from "@/components/object/project/card/parts/CardTwelveColumn.astro";
import CardBoxed from "@/components/object/project/card/templates/CardBoxed.astro";
import CardCompactBordered from "@/components/object/project/card/templates/CardCompactBordered.astro";
import CardCompactMedia from "@/components/object/project/card/templates/CardCompactMedia.astro";
import CardEditorial from "@/components/object/project/card/templates/CardEditorial.astro";
import CardFeatured from "@/components/object/project/card/templates/CardFeatured.astro";
import CardHorizontal from "@/components/object/project/card/templates/CardHorizontal.astro";
import CardIconPanel from "@/components/object/project/card/templates/CardIconPanel.astro";
import CardIconSummary from "@/components/object/project/card/templates/CardIconSummary.astro";
import CardMediaBanner from "@/components/object/project/card/templates/CardMediaBanner.astro";
import CardMediaCaption from "@/components/object/project/card/templates/CardMediaCaption.astro";
import CardMediaDetails from "@/components/object/project/card/templates/CardMediaDetails.astro";
import CardMediaMetrics from "@/components/object/project/card/templates/CardMediaMetrics.astro";
import CardMediaOnly from "@/components/object/project/card/templates/CardMediaOnly.astro";
import CardMediaSummary from "@/components/object/project/card/templates/CardMediaSummary.astro";
import CardOverlay from "@/components/object/project/card/templates/CardOverlay.astro";
import CardStacked from "@/components/object/project/card/templates/CardStacked.astro";
import type { CColumnsTemplate } from "@/types/components/object/component/CColumns.types";
import type {
	PCardColumns,
	PCardLayout,
	PCardTemplate,
} from "@/types/components/object/project/card/PCard.types";

export const pCardTemplates = {
	stacked: CardStacked,
	horizontal: CardHorizontal,
	overlay: CardOverlay,
	featured: CardFeatured,
	boxed: CardBoxed,
	"compact-media": CardCompactMedia,
	"compact-bordered": CardCompactBordered,
	editorial: CardEditorial,
	"icon-panel": CardIconPanel,
	"icon-summary": CardIconSummary,
	"media-banner": CardMediaBanner,
	"media-caption": CardMediaCaption,
	"media-details": CardMediaDetails,
	"media-only": CardMediaOnly,
	"media-summary": CardMediaSummary,
	"media-metrics": CardMediaMetrics,
} satisfies Record<PCardTemplate, typeof CardStacked>;

export const pCardLayouts = {
	grid: CardGrid,
	list: CardGrid,
	"three-column": CardGrid,
	"twelve-column": CardTwelveColumn,
	"content-three-column": CardContentThreeColumn,
	mosaic: CardMosaic,
	asymmetric: CardAsymmetric,
	showcase: CardShowcase,
	carousel: CardCarousel,
} satisfies Record<PCardLayout, typeof CardGrid>;

export const pCardColumnTemplates: Record<PCardColumns, CColumnsTemplate> = {
	1: "one",
	2: "two",
	3: "three",
	4: "four",
	5: "five",
};

export const pCardLayoutColumnTemplates: Partial<Record<PCardLayout, CColumnsTemplate>> = {
	list: "one",
	"three-column": "three",
};

export const pCardProductGridTemplates = new Set<PCardTemplate>(["media-details"]);

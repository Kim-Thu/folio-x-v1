import CardBoxed from "@/components/object/component/card/templates/CardBoxed.astro";
import CardCompactBordered from "@/components/object/component/card/templates/CardCompactBordered.astro";
import CardCompactMedia from "@/components/object/component/card/templates/CardCompactMedia.astro";
import CardEditorial from "@/components/object/component/card/templates/CardEditorial.astro";
import CardEditorialList from "@/components/object/component/card/templates/CardEditorialList.astro";
import CardFeatured from "@/components/object/component/card/templates/CardFeatured.astro";
import CardHorizontal from "@/components/object/component/card/templates/CardHorizontal.astro";
import CardIconPanel from "@/components/object/component/card/templates/CardIconPanel.astro";
import CardIconSummary from "@/components/object/component/card/templates/CardIconSummary.astro";
import CardMediaBanner from "@/components/object/component/card/templates/CardMediaBanner.astro";
import CardMediaCaption from "@/components/object/component/card/templates/CardMediaCaption.astro";
import CardMediaDetails from "@/components/object/component/card/templates/CardMediaDetails.astro";
import CardMediaMetrics from "@/components/object/component/card/templates/CardMediaMetrics.astro";
import CardMediaOnly from "@/components/object/component/card/templates/CardMediaOnly.astro";
import CardMediaSummary from "@/components/object/component/card/templates/CardMediaSummary.astro";
import CardOverlay from "@/components/object/component/card/templates/CardOverlay.astro";
import CardStacked from "@/components/object/component/card/templates/CardStacked.astro";
import type { CCardTemplate } from "@/types/components/object/component/card/CCard.types";

export const cCardTemplates = {
	stacked: CardStacked,
	horizontal: CardHorizontal,
	overlay: CardOverlay,
	featured: CardFeatured,
	boxed: CardBoxed,
	"compact-media": CardCompactMedia,
	"compact-bordered": CardCompactBordered,
	editorial: CardEditorial,
	"editorial-list": CardEditorialList,
	"icon-panel": CardIconPanel,
	"icon-summary": CardIconSummary,
	"media-banner": CardMediaBanner,
	"media-caption": CardMediaCaption,
	"media-details": CardMediaDetails,
	"media-only": CardMediaOnly,
	"media-summary": CardMediaSummary,
	"media-metrics": CardMediaMetrics,
} satisfies Record<CCardTemplate, typeof CardStacked>;

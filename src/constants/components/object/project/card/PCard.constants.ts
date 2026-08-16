import CardAsymmetric from "@/components/object/project/card/templates/CardAsymmetric.astro";
import CardContentThreeColumn from "@/components/object/project/card/templates/CardContentThreeColumn.astro";
import CardGrid from "@/components/object/project/card/templates/CardGrid.astro";
import CardMosaic from "@/components/object/project/card/templates/CardMosaic.astro";
import CardShowcase from "@/components/object/project/card/templates/CardShowcase.astro";
import CardSlider from "@/components/object/project/card/templates/CardSlider.astro";
import CardTwelveColumn from "@/components/object/project/card/templates/CardTwelveColumn.astro";
import type { PCardTemplate } from "@/types/components/object/project/card/PCard.types";

export const pCardTemplates = {
	grid: CardGrid,
	list: CardGrid,
	"three-column": CardGrid,
	"twelve-column": CardTwelveColumn,
	"content-three-column": CardContentThreeColumn,
	mosaic: CardMosaic,
	asymmetric: CardAsymmetric,
	showcase: CardShowcase,
	slider: CardSlider,
} satisfies Record<PCardTemplate, typeof CardGrid>;

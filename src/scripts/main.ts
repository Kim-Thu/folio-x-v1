import { initAccordion } from "@/scripts/accordion";
import { initArchiveFacets } from "@/scripts/archive-facets";
import { initArchiveFilter } from "@/scripts/archive-filter";
import { initArticleToc } from "@/scripts/article-toc";
import { initCollectionFilter } from "@/scripts/collection-filter";
import { initDialogs } from "@/scripts/dialog";
import { initEntryIndex } from "@/scripts/entry-index";
import { initFooterReveal } from "@/scripts/footer-reveal";
import { initHeader } from "@/scripts/header";
import { initImageGalleries } from "@/scripts/image-gallery";
import { initLoadingScreen } from "@/scripts/loading-screen";
import { initProducts } from "@/scripts/products";
import { initReader } from "@/scripts/reader";
import { initReveal } from "@/scripts/reveal";
import { initScrollProgress } from "@/scripts/scroll-progress";
import { initSelect } from "@/scripts/select";
import { initSelectedWorkTabs } from "@/scripts/selected-work-tabs";

const initializers: ReadonlyArray<() => void> = [
	initLoadingScreen,
	initHeader,
	initImageGalleries,
	initScrollProgress,
	initAccordion,
	initArticleToc,
	initArchiveFilter,
	initArchiveFacets,
	initCollectionFilter,
	initDialogs,
	initProducts,
	initEntryIndex,
	initReader,
	initSelect,
	initFooterReveal,
	initReveal,
	initSelectedWorkTabs,
];

initializers.forEach((initialize) => initialize());

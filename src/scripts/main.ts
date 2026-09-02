import { initAccordion } from "@/scripts/accordion";
import { initDialogs } from "@/scripts/dialog";
import { initEntryIndex } from "@/scripts/entry-index";
import { initFooterReveal } from "@/scripts/footer-reveal";
import { initHeader } from "@/scripts/header";
import { initLoadingScreen } from "@/scripts/loading-screen";
import { initReveal } from "@/scripts/reveal";
import { initScrollProgress } from "@/scripts/scroll-progress";
import { initScrollToTop } from "@/scripts/scroll-to-top";
import { initSelect } from "@/scripts/select";
import { initSelectedWorkTabs } from "@/scripts/selected-work-tabs";

const coreInitializers: ReadonlyArray<() => void> = [
	initLoadingScreen,
	initHeader,
	initScrollProgress,
	initScrollToTop,
	initAccordion,
	initDialogs,
	initEntryIndex,
	initSelect,
	initFooterReveal,
	initReveal,
	initSelectedWorkTabs,
];

coreInitializers.forEach((initialize) => initialize());

const featureInitializers: Promise<void>[] = [];

if (document.querySelector("[data-image-gallery]")) {
	featureInitializers.push(
		import("@/scripts/image-gallery").then(({ initImageGalleries }) => {
			initImageGalleries();
		}),
	);
}

if (document.querySelector("[data-article-toc]")) {
	featureInitializers.push(
		import("@/scripts/article-toc").then(({ initArticleToc }) => {
			initArticleToc();
		}),
	);
}

if (document.querySelector("[data-filter-root]")) {
	featureInitializers.push(
		import("@/scripts/archive-filter").then(({ initArchiveFilter }) => {
			initArchiveFilter();
		}),
	);
}

if (document.querySelector('[data-filter-mode="faceted"] [data-facet-card]')) {
	featureInitializers.push(
		import("@/scripts/archive-facets").then(({ initArchiveFacets }) => {
			initArchiveFacets();
		}),
	);
}

if (document.querySelector("[data-collection-filter-root]")) {
	featureInitializers.push(
		import("@/scripts/collection-filter").then(({ initCollectionFilter }) => {
			initCollectionFilter();
		}),
	);
}

if (document.querySelector('[data-filter-mode="faceted"] [data-product-item]')) {
	featureInitializers.push(
		import("@/scripts/products").then(({ initProducts }) => {
			initProducts();
		}),
	);
}

if (document.querySelector("[data-reader-root]")) {
	featureInitializers.push(
		import("@/scripts/reader").then(({ initReader }) => {
			initReader();
		}),
	);
}

if (document.querySelector("[data-slider]")) {
	featureInitializers.push(
		import("@/scripts/slider").then(({ initSliders }) => {
			initSliders();
		}),
	);
}

void Promise.all(featureInitializers);

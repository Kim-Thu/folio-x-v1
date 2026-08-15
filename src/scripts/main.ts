import { initFooterReveal } from "@/scripts/footer-reveal";
import { initHeader } from "@/scripts/header";
import { initLoadingScreen } from "@/scripts/loading-screen";
import { initReveal } from "@/scripts/reveal";

const loadWhenPresent = (
	selector: string,
	load: () => Promise<void>,
): void => {
	if (!document.querySelector(selector)) return;
	void load();
};

initLoadingScreen();
initHeader();
initFooterReveal();
initReveal();

loadWhenPresent("[data-image-gallery]", async () => {
	const { initImageGalleries } = await import("@/scripts/image-gallery");
	initImageGalleries();
});

loadWhenPresent("#scroll-progress-bar", async () => {
	const { initScrollProgress } = await import("@/scripts/scroll-progress");
	initScrollProgress();
});

loadWhenPresent(".faq", async () => {
	const { initAccordion } = await import("@/scripts/accordion");
	initAccordion();
});

loadWhenPresent("[data-article-toc]", async () => {
	const { initArticleToc } = await import("@/scripts/article-toc");
	initArticleToc();
});

loadWhenPresent("[data-filter-root]", async () => {
	const { initArchiveFilter } = await import("@/scripts/archive-filter");
	initArchiveFilter();
});

loadWhenPresent('[data-filter-mode="faceted"] [data-facet-card]', async () => {
	const { initArchiveFacets } = await import("@/scripts/archive-facets");
	initArchiveFacets();
});

loadWhenPresent("[data-collection-filter-root]", async () => {
	const { initCollectionFilter } = await import("@/scripts/collection-filter");
	initCollectionFilter();
});

loadWhenPresent("[data-product-card]", async () => {
	const { initProducts } = await import("@/scripts/products");
	initProducts();
});

loadWhenPresent("[data-entry-index]", async () => {
	const { initEntryIndex } = await import("@/scripts/entry-index");
	initEntryIndex();
});

loadWhenPresent("[data-reader-root]", async () => {
	const { initReader } = await import("@/scripts/reader");
	initReader();
});

loadWhenPresent("[data-select]", async () => {
	const { initSelect } = await import("@/scripts/select");
	initSelect();
});

loadWhenPresent("[data-slider]", async () => {
	const { initSliders } = await import("@/scripts/slider");
	initSliders();
});

loadWhenPresent("[data-tabbed-collection]", async () => {
	const { initSelectedWorkTabs } = await import("@/scripts/selected-work-tabs");
	initSelectedWorkTabs();
});

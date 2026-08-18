export function initImageGalleries(): void {
	document.querySelectorAll<HTMLElement>("[data-image-gallery]").forEach((gallery) => {
		const panels = Array.from(
			gallery.querySelectorAll<HTMLElement>("[data-gallery-panel]"),
		);
		const thumbnails = Array.from(
			gallery.querySelectorAll<HTMLButtonElement>("[data-gallery-thumbnail]"),
		);

		const select = (index: number) => {
			panels.forEach((panel, panelIndex) => {
				panel.hidden = panelIndex !== index;
			});
			thumbnails.forEach((thumbnail, thumbnailIndex) => {
				thumbnail.setAttribute("aria-pressed", String(thumbnailIndex === index));
			});
		};

		thumbnails.forEach((thumbnail) => {
			thumbnail.addEventListener("click", () => {
				select(Number(thumbnail.dataset.galleryIndex ?? 0));
			});
		});
	});

	document.querySelectorAll<HTMLElement>("[data-gallery-grid]").forEach((gallery) => {
		const viewMoreButton = gallery.querySelector<HTMLButtonElement>(
			"[data-gallery-view-more]",
		);
		if (!viewMoreButton) return;

		const extraItems = Array.from(
			gallery.querySelectorAll<HTMLElement>("[data-gallery-extra]"),
		);

		viewMoreButton.addEventListener("click", () => {
			extraItems.forEach((item) => {
				item.hidden = false;
			});
			viewMoreButton.hidden = true;
		});
	});
}

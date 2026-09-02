import { renderWithFilterLoading } from "@/scripts/filter-loading";

const interactiveClickSelector = [
	"[data-choice-filter]",
	"[data-choice-link]",
	"[data-filter-reset]",
	"[data-page]",
	"[data-page-previous]",
	"[data-page-next]",
].join(",");

export function initProductFilterLoading(scope: ParentNode = document): void {
	scope
		.querySelectorAll<HTMLElement>('[data-filter-mode="faceted"]')
		.forEach((root) => {
			if (!root.querySelector("[data-product-item]")) return;

			const showLoading = (): void => {
				renderWithFilterLoading(root, () => {});
			};

			root.addEventListener(
				"input",
				(event) => {
					const target = event.target;
					if (!(target instanceof HTMLElement)) return;
					if (target.matches("[data-product-search], [data-price-filter]")) {
						showLoading();
					}
				},
				{ capture: true },
			);

			root.addEventListener(
				"change",
				(event) => {
					const target = event.target;
					if (!(target instanceof HTMLElement)) return;
					if (
						target.matches(
							"[data-category-select], [data-platform-select], [data-product-sort], [data-platform-filter], [data-license-filter], [data-rating-filter], input[name='product-category']",
						)
					) {
						showLoading();
					}
				},
				{ capture: true },
			);

			root.addEventListener(
				"click",
				(event) => {
					const target = event.target;
					if (!(target instanceof Element)) return;
					if (target.closest(interactiveClickSelector)) showLoading();
				},
				{ capture: true },
			);
		});
}

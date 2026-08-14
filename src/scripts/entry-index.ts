export function initEntryIndex(scope: ParentNode = document): void {
	scope.querySelectorAll<HTMLElement>("[data-entry-index]").forEach((root) => {
		const select = root.querySelector<HTMLSelectElement>("[data-entry-sort]");
		const showAll = root.querySelector<HTMLButtonElement>("[data-entry-show-all]");

		showAll?.addEventListener("click", () => {
			root
				.querySelectorAll<HTMLElement>("[data-entry-row][hidden]")
				.forEach((row) => {
					row.hidden = false;
				});
			showAll.parentElement?.remove();
		});

		if (!select) return;

		select.addEventListener("change", () => {
			const rows = Array.from(
				root.querySelectorAll<HTMLElement>("[data-entry-row]"),
			);
			const footer = root.querySelector<HTMLElement>("[data-entry-footer]");
			const direction = select.value === "oldest" ? 1 : -1;

			rows
				.sort(
					(left, right) =>
						direction *
						(Number(left.dataset.order) - Number(right.dataset.order)),
				)
				.forEach((row) => {
					const parent = row.parentElement;
					if (!parent) return;
					footer ? parent.insertBefore(row, footer) : parent.append(row);
				});
		});
	});
}

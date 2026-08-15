const SELECTORS = {
	root: "[data-select]",
	trigger: "[data-select-trigger]",
	menu: "[data-select-menu]",
	option: "[data-select-option]",
	native: "[data-select-native]",
	label: "[data-select-label]",
} as const;

export function initSelect(): void {
	document.querySelectorAll<HTMLElement>(SELECTORS.root).forEach((root) => {
		const trigger = root.querySelector<HTMLButtonElement>(SELECTORS.trigger);
		const menu = root.querySelector<HTMLElement>(SELECTORS.menu);
		const nativeSelect =
			root.querySelector<HTMLSelectElement>(SELECTORS.native);
		const selectedLabel = root.querySelector<HTMLElement>(SELECTORS.label);
		const options = Array.from(
			root.querySelectorAll<HTMLElement>(SELECTORS.option),
		);

		if (!trigger || !menu || !nativeSelect || !selectedLabel || !options.length) {
			return;
		}

		const close = (restoreFocus = false): void => {
			menu.hidden = true;
			trigger.setAttribute("aria-expanded", "false");
			if (restoreFocus) trigger.focus();
		};

		const focusOption = (index: number): void => {
			options.at(index)?.focus();
		};

		const open = (focusSelected = false): void => {
			menu.hidden = false;
			trigger.setAttribute("aria-expanded", "true");
			if (focusSelected) {
				const selectedIndex = options.findIndex(
					(option) => option.getAttribute("aria-selected") === "true",
				);
				focusOption(selectedIndex >= 0 ? selectedIndex : 0);
			}
		};

		const selectOption = (option: HTMLElement): void => {
			const value = option.dataset.value;
			if (!value) return;

			nativeSelect.value = value;
			selectedLabel.textContent = option.textContent?.trim() ?? "";
			options.forEach((item) =>
				item.setAttribute("aria-selected", String(item === option)),
			);
			const href = option.dataset.href;
			if (href) {
				close();
				window.location.assign(href);
				return;
			}

			nativeSelect.dispatchEvent(new Event("change", { bubbles: true }));
			close(true);
		};

		trigger.addEventListener("click", () => {
			if (menu.hidden) open();
			else close();
		});

		trigger.addEventListener("keydown", (event) => {
			if (event.key === "ArrowDown" || event.key === "ArrowUp") {
				event.preventDefault();
				open(true);
			}
		});

		options.forEach((option, index) => {
			option.addEventListener("click", () => selectOption(option));
			option.addEventListener("keydown", (event) => {
				if (event.key === "ArrowDown") {
					event.preventDefault();
					focusOption((index + 1) % options.length);
				}
				if (event.key === "ArrowUp") {
					event.preventDefault();
					focusOption((index - 1 + options.length) % options.length);
				}
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					selectOption(option);
				}
				if (event.key === "Escape") {
					event.preventDefault();
					close(true);
				}
			});
		});

		document.addEventListener("pointerdown", (event) => {
			if (!root.contains(event.target as Node)) close();
		});
	});
}

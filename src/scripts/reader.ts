const readerRoots = document.querySelectorAll<HTMLElement>("[data-reader-root]");

readerRoots.forEach((root) => {
	const scaleToggle = root.querySelector<HTMLButtonElement>("[data-reader-scale-toggle]");
	const themeToggle = root.querySelector<HTMLButtonElement>("[data-reader-theme-toggle]");
	const bookmark = root.querySelector<HTMLButtonElement>("[data-reader-bookmark]");
	const reactions = root.querySelectorAll<HTMLButtonElement>("[data-reader-reaction]");

	scaleToggle?.addEventListener("click", () => {
		const expanded = root.dataset.readerScale === "large";
		root.dataset.readerScale = expanded ? "default" : "large";
		root.querySelectorAll<HTMLElement>("[data-reader-copy]").forEach((item) => {
			item.classList.toggle("!text-xl", !expanded);
		});
		scaleToggle.setAttribute("aria-pressed", String(!expanded));
	});

	themeToggle?.addEventListener("click", () => {
		const dark = root.dataset.readerTheme === "dark";
		root.dataset.readerTheme = dark ? "light" : "dark";
		root.classList.toggle("!bg-black", !dark);
		root.classList.toggle("!text-white", !dark);
		root.querySelectorAll<HTMLElement>("[data-reader-copy]").forEach((item) => {
			item.classList.toggle("!text-gray-300", !dark);
		});
		themeToggle.setAttribute("aria-pressed", String(!dark));
	});

	bookmark?.addEventListener("click", () => {
		bookmark.setAttribute("aria-pressed", String(bookmark.getAttribute("aria-pressed") !== "true"));
	});

	reactions.forEach((reaction) => {
		reaction.addEventListener("click", () => {
			const selected = reaction.getAttribute("aria-pressed") === "true";
			reactions.forEach((item) => item.setAttribute("aria-pressed", "false"));
			reaction.setAttribute("aria-pressed", String(!selected));
		});
	});
});

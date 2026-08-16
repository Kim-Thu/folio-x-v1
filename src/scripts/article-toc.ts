export function initArticleToc(): void {
	document.querySelectorAll<HTMLElement>("[data-article-toc]").forEach((toc) => {
		const links = Array.from(
			toc.querySelectorAll<HTMLAnchorElement>("[data-article-toc-link]"),
		);
		const headings = links
			.map((link) => {
				const id = link.hash.slice(1);
				return id ? document.getElementById(id) : null;
			})
			.filter((heading): heading is HTMLElement => Boolean(heading));

		if (headings.length === 0) return;

		const setCurrent = (id: string) => {
			links.forEach((link) => {
				const current = link.hash === `#${id}`;
				const panel = link.dataset.tocAppearance === "panel";
				if (current) link.setAttribute("aria-current", "location");
				else link.removeAttribute("aria-current");
				link.classList.toggle("border-blue-600", current && !panel);
				link.classList.toggle("bg-gray-50", current && panel);
				link.classList.toggle("font-medium", current);
				link.classList.toggle("text-black", current);
			});
		};

		links.forEach((link) => {
			link.addEventListener("click", () => setCurrent(link.hash.slice(1)));
		});

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				const active = visible[0]?.target;
				if (active instanceof HTMLElement) setCurrent(active.id);
			},
			{ rootMargin: "-20% 0px -65% 0px" },
		);

		headings.forEach((heading) => observer.observe(heading));
	});
}

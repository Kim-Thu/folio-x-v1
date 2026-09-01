import { getCollection } from "astro:content";

function addPath(paths: Set<string>, path: string): void {
	paths.add(path === "" ? "/" : path);
}

export async function getIndexablePaths(): Promise<string[]> {
	const [pages, blog, projects, products, labs, comics, novels] = await Promise.all([
		getCollection("pages"),
		getCollection("blog"),
		getCollection("projects"),
		getCollection("products"),
		getCollection("labs"),
		getCollection("comics"),
		getCollection("novels"),
	]);
	const paths = new Set<string>();

	pages.forEach((entry) => addPath(paths, entry.data.slug));
	blog.forEach((entry) => {
		addPath(paths, `/blog/${entry.data.slug}`);
		addPath(paths, `/blog/category/${entry.data.categorySlug}`);
		entry.data.tags.forEach((tag) => addPath(paths, `/blog/tag/${tag.slug}`));
	});
	projects.forEach((entry) => {
		addPath(paths, `/projects/${entry.data.slug}`);
		addPath(paths, `/projects/category/${entry.data.categorySlug}`);
		entry.data.tags.forEach((tag) => addPath(paths, `/projects/tag/${tag.slug}`));
	});
	products.forEach((entry) => {
		addPath(paths, `/products/${entry.data.slug}`);
		addPath(paths, `/products/category/${entry.data.categorySlug}`);
	});
	labs.forEach((entry) => {
		addPath(paths, `/labs/${entry.data.slug}`);
		addPath(paths, `/labs/category/${entry.data.category.slug}`);
		entry.data.technologies.forEach((technology) =>
			addPath(paths, `/labs/technology/${technology.slug}`),
		);
	});
	for (const [kind, entries] of [["comics", comics], ["novels", novels]] as const) {
		entries.forEach((entry) => {
			addPath(paths, `/${kind}/${entry.data.slug}`);
			(entry.data.detail.reader ?? []).forEach((chapter) =>
				addPath(paths, `/${kind}/${entry.data.slug}/chapter/${chapter.number}`),
			);
		});
	}

	return Array.from(paths).sort();
}

export async function getBlogFeedEntries() {
	const blog = await getCollection("blog");
	return [...blog].sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt));
}

export async function getAiDiscoveryResources() {
	const [pages, blog, projects, products, labs, comics, novels] = await Promise.all([
		getCollection("pages"),
		getCollection("blog"),
		getCollection("projects"),
		getCollection("products"),
		getCollection("labs"),
		getCollection("comics"),
		getCollection("novels"),
	]);

	return {
		pages: pages.map((entry) => ({ path: entry.data.slug, title: entry.data.meta.title, description: entry.data.meta.description ?? "" })),
		blog: blog.map((entry) => ({ path: `/blog/${entry.data.slug}`, title: entry.data.title, description: entry.data.excerpt })),
		projects: projects.map((entry) => ({ path: `/projects/${entry.data.slug}`, title: entry.data.title, description: entry.data.summary })),
		products: products.map((entry) => ({ path: `/products/${entry.data.slug}`, title: entry.data.title, description: entry.data.description })),
		labs: labs.map((entry) => ({ path: `/labs/${entry.data.slug}`, title: entry.data.title, description: entry.data.summary })),
		publications: [...comics.map((entry) => ({ path: `/comics/${entry.data.slug}`, title: entry.data.title, description: entry.data.summary })), ...novels.map((entry) => ({ path: `/novels/${entry.data.slug}`, title: entry.data.title, description: entry.data.summary }))],
	};
}

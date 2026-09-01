import { getCollection } from "astro:content";

function addPath(paths: Set<string>, path: string): void {
	paths.add(path === "" ? "/" : path);
}

function routeFileToPath(file: string): string | null {
	if (file.includes("[") || file.endsWith("/404.astro") || file.endsWith("/empty-content.astro")) {
		return null;
	}
	const relative = file.replace(/^\/src\/pages/, "").replace(/\.astro$/, "");
	const withoutIndex = relative.endsWith("/index")
		? relative.slice(0, -"/index".length)
		: relative === "/index"
			? ""
			: relative;
	return withoutIndex || "/";
}

export function getStaticPagePaths(): string[] {
	const modules = import.meta.glob("/src/pages/**/*.astro");
	return Object.keys(modules)
		.map(routeFileToPath)
		.filter((path): path is string => Boolean(path))
		.sort();
}

export async function getIndexablePaths(): Promise<string[]> {
	const [blog, projects, products, labs, comics, novels] = await Promise.all([
		getCollection("blog"),
		getCollection("projects"),
		getCollection("products"),
		getCollection("labs"),
		getCollection("comics"),
		getCollection("novels"),
	]);
	const paths = new Set<string>(getStaticPagePaths());

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
	const staticPaths = new Set(getStaticPagePaths());

	return {
		pages: pages
			.filter((entry) => staticPaths.has(entry.data.slug))
			.map((entry) => ({ path: entry.data.slug, title: entry.data.meta.title, description: entry.data.meta.description ?? "" })),
		blog: blog.map((entry) => ({ path: `/blog/${entry.data.slug}`, title: entry.data.title, description: entry.data.excerpt })),
		projects: projects.map((entry) => ({ path: `/projects/${entry.data.slug}`, title: entry.data.title, description: entry.data.summary })),
		products: products.map((entry) => ({ path: `/products/${entry.data.slug}`, title: entry.data.title, description: entry.data.description })),
		labs: labs.map((entry) => ({ path: `/labs/${entry.data.slug}`, title: entry.data.title, description: entry.data.summary })),
		publications: [...comics.map((entry) => ({ path: `/comics/${entry.data.slug}`, title: entry.data.title, description: entry.data.summary })), ...novels.map((entry) => ({ path: `/novels/${entry.data.slug}`, title: entry.data.title, description: entry.data.summary }))],
	};
}

import { getPage, getProjects } from "@/data/cms";
import type { WorksPageData } from "@/types/components/pages/works/WorksPage.types";

export interface WorksPageQuery {
	categorySlug?: string;
	tagSlug?: string;
}

export async function getWorksPageData(
	query: WorksPageQuery = {},
): Promise<WorksPageData> {
	const page = await getPage("/projects");

	return {
		page,
		context: query,
		metadata: {
			title: page.meta.title,
			description: page.meta.description ?? "",
		},
	};
}

export async function getWorksCategoryPaths() {
	const projects = await getProjects();
	return Array.from(
		new Map(
			projects.map((project) => [
				project.categorySlug,
				{
					params: { category: project.categorySlug },
					props: { categorySlug: project.categorySlug },
				},
			]),
		).values(),
	);
}

export async function getWorksTagPaths() {
	const projects = await getProjects();
	return Array.from(
		new Map(
			projects.flatMap((project) =>
				project.tags.map((tag) => [
					tag.slug,
					{
						params: { tag: tag.slug },
						props: { tagSlug: tag.slug },
					},
				] as const),
			),
		).values(),
	);
}

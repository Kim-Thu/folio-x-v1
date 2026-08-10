import { getProjects } from "@/data/cms";
import type { WorkDetailPageData } from "@/types/components/pages/work-detail/WorkDetailPage.types";

export async function getWorkDetailPaths() {
	const projects = await getProjects();
	return projects.map((project) => ({
		params: { slug: project.slug },
		props: { slug: project.slug },
	}));
}

export async function getWorkDetailPageData(
	slug: string,
): Promise<WorkDetailPageData> {
	const projects = await getProjects();
	const index = projects.findIndex((project) => project.slug === slug);
	const project = projects[index];
	if (!project) throw new Error(`Unknown project slug: ${slug}`);

	return {
		project,
		previous: index > 0 ? projects[index - 1] : undefined,
		next: index < projects.length - 1 ? projects[index + 1] : undefined,
	};
}

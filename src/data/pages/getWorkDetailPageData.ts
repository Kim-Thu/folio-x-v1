import { getPage, getProjects } from "@/data/cms";
import type { WorkDetailPageData } from "@/types/components/pages/work-detail/WorkDetailPage.types";

type ProjectsPage = Awaited<ReturnType<typeof getPage>>;
type ProjectsPageSection = ProjectsPage["content"]["sections"][number];
type ProjectsArchiveSection = Extract<
	ProjectsPageSection,
	{ type: "archive"; content: { source: { collection: "projects" } } }
>;

function isProjectsArchiveSection(
	section: ProjectsPageSection,
): section is ProjectsArchiveSection {
	return (
		section.type === "archive" &&
		section.content.source.collection === "projects"
	);
}

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
	const [projects, projectsPage] = await Promise.all([
		getProjects(),
		getPage("projects"),
	]);
	const index = projects.findIndex((project) => project.slug === slug);
	const project = projects[index];
	if (!project) throw new Error(`Unknown project slug: ${slug}`);

	const archive = projectsPage.content.sections.find(isProjectsArchiveSection);
	if (!archive) throw new Error("Missing projects archive section");

	return {
		project,
		previous: index > 0 ? projects[index - 1] : undefined,
		next: index < projects.length - 1 ? projects[index + 1] : undefined,
		routes: archive.content.routes,
	};
}

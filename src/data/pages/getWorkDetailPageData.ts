import { getPage, getProjects } from "@/data/cms";
import type { PageRegion } from "@/types/components/pages/builder/PageBuilder.types";
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

	const detail = project.detail;
	const page = detail?.page;
	if (!detail || !page) {
		throw new Error(`Missing project detail page configuration: ${slug}`);
	}

	const previous = index > 0 ? projects[index - 1] : undefined;
	const next = index < projects.length - 1 ? projects[index + 1] : undefined;
	const gallery = detail.gallery.length
		? detail.gallery
		: [
				{
					src: project.image,
					alt: project.alt,
					width: archive.content.itemPresentation.imageWidth,
					height: archive.content.itemPresentation.imageHeight,
				},
			];
	const headerImages = Array.from(
		new Map(gallery.map((image) => [image.src, image])).values(),
	);
	const articleBlocks = project.sections.map((section, blockIndex) => ({
		id: `project-content-${blockIndex + 1}`,
		title: section.title,
		paragraphs: section.paragraphs,
		image: gallery[blockIndex % gallery.length],
	}));

	const regions: PageRegion[] = page.sections.flatMap((section) => {
		const frame = {
			id: section.id,
			theme: section.settings.theme,
			spacing: section.settings.spacing,
			container: section.settings.container,
		};

		if (section.type === "page-header") {
			const actions = [
				...(detail.liveUrl
					? [
							{
								kind: "live" as const,
								label: section.content.liveActionLabel,
								href: detail.liveUrl,
								icon: "arrowUpRight" as const,
							},
						]
					: []),
				...(detail.sourceUrl
					? [
							{
								kind: "source" as const,
								label: section.content.sourceActionLabel,
								href: detail.sourceUrl,
								icon: "github" as const,
							},
						]
					: []),
			];

			return [
				{
					key: section.id,
					component: "page-header" as const,
					section: frame,
					props: {
						template: section.template,
						data: {
							backAction: section.content.backAction,
							category: {
								label: project.category,
								href: `${archive.content.routes.categoryBase}${project.categorySlug}`,
							},
							title: project.title,
							description: project.summary,
							images: headerImages,
							mediaTemplate: headerImages.length > 1 ? "slider" : "grid",
							galleryLabel: section.content.galleryLabel,
							previousImageLabel: section.content.previousImageLabel,
							nextImageLabel: section.content.nextImageLabel,
							tagsLabel: section.content.tagsLabel,
							actionsLabel: section.content.actionsLabel,
							tags: project.tags.map((tag) => ({
								label: tag.label,
								href: `${archive.content.routes.tagBase}${tag.slug}`,
							})),
							actions,
							asideDecoration: section.content.asideDecoration,
							facts: [
								{
									label: section.content.facts.clientLabel,
									value: project.client,
								},
								{
									label: section.content.facts.roleLabel,
									value: detail.role ?? project.category,
								},
								{
									label: section.content.facts.durationLabel,
									value: detail.duration ?? project.year,
								},
							],
						},
					},
				},
			];
		}

		if (section.type === "article") {
			return [
				{
					key: section.id,
					component: "article" as const,
					section: frame,
					props: { blocks: articleBlocks },
				},
			];
		}

		if (section.type === "reviews") {
			return detail.reviews
				? [
						{
							key: section.id,
							component: "reviews" as const,
							section: frame,
							props: detail.reviews,
						},
					]
				: [];
		}

		const navigation = [
			...(previous
				? [
						{
							title: previous.title,
							href: previous.href,
							image: previous.image,
							alt: previous.alt,
							label: section.content.previousLabel,
							icon: "arrowLeft" as const,
							summary: previous.summary,
						},
					]
				: []),
			...(next
				? [
						{
							title: next.title,
							href: next.href,
							image: next.image,
							alt: next.alt,
							label: section.content.nextLabel,
							icon: "arrowRight" as const,
							summary: next.summary,
						},
					]
				: []),
		];

		return navigation.length
			? [
					{
						key: section.id,
						component: "post-navigation" as const,
						section: frame,
						props: {
							template: section.template,
							items: navigation,
							label: section.content.label,
						},
					},
				]
			: [];
	});

	return {
		layout: { template: page.template },
		regions,
	};
}

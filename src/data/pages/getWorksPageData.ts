import {
	getArchiveSettings,
	getPage,
	getProjects,
	getSiteSettings,
} from "@/data/cms";
import { mapProjectToCard } from "@/data/mappers/card";
import type { WorksPageData } from "@/types/components/pages/works/WorksPage.types";

export interface WorksPageQuery {
	categorySlug?: string;
	tagSlug?: string;
}

export async function getWorksPageData(
	query: WorksPageQuery = {},
): Promise<WorksPageData> {
	const [archive, homePage, projects, siteSettings] = await Promise.all([
		getArchiveSettings(),
		getPage("/"),
		getProjects(),
		getSiteSettings(),
	]);
	const settings = archive.projects;
	const visibleProjects = projects.filter((project) => {
		if (query.categorySlug) return project.categorySlug === query.categorySlug;
		if (query.tagSlug) return project.tags.some((tag) => tag.slug === query.tagSlug);
		return true;
	});
	const selectedTerm =
		projects.find((project) => project.categorySlug === query.categorySlug)?.category ??
		projects.flatMap((project) => project.tags).find((tag) => tag.slug === query.tagSlug)?.label;
	const categories = Array.from(
		new Map(
			projects.map((project) => [
				project.category,
				{ label: project.category, value: project.category },
			]),
		).values(),
	);
	const pageSize = settings.pageSize;
	const breadcrumbItems = [
		{ label: settings.breadcrumbHomeLabel, href: "/" },
		...(selectedTerm
			? [{ label: settings.breadcrumbProjectsLabel, href: "/projects" }]
			: []),
	];

	const hero = {
			breadcrumb: {
				label: settings.breadcrumbLabel,
			items: breadcrumbItems,
			current: selectedTerm ?? settings.breadcrumbProjectsLabel,
		},
			title: selectedTerm ? [selectedTerm] : settings.headingLines,
			description: settings.description,
			image: settings.heroImage,
		};
	const archiveData = {
			emptyLabel: settings.emptyLabel,
			toolbar: {
				filter: {
					label: settings.filterLabel,
					activeValue: "all",
					tabs: [{ label: settings.allLabel, value: "all" }, ...categories],
				},
				sort: {
					label: settings.sortLabel,
					options: settings.sortOptions,
				},
				view: {
					label: settings.viewLabel,
					gridLabel: settings.gridViewLabel,
					listLabel: settings.listViewLabel,
				},
			},
			pagination: {
				label: settings.paginationLabel,
				previousLabel: settings.previousPageLabel,
				nextLabel: settings.nextPageLabel,
				pageSize,
				totalPages: Math.max(1, Math.ceil(visibleProjects.length / pageSize)),
			},
			items: visibleProjects.map((project, index) =>
				mapProjectToCard(
					project,
					settings.actionLabel,
					"/",
					index % 4 === 0 || index % 4 === 3 ? "wide" : "standard",
					settings.tagPrefix,
				),
			),
		};
	const ctaSection = homePage.content.sections.find((section) => section.id === "contact");
	const ctaContent = ctaSection?.content ?? {};
	const ctaImage = ctaContent.image && typeof ctaContent.image === "object" &&
		"src" in ctaContent.image && typeof ctaContent.image.src === "string" &&
		"alt" in ctaContent.image && typeof ctaContent.image.alt === "string" &&
		"width" in ctaContent.image && typeof ctaContent.image.width === "number" &&
		"height" in ctaContent.image && typeof ctaContent.image.height === "number"
		? { src: ctaContent.image.src, alt: ctaContent.image.alt, width: ctaContent.image.width, height: ctaContent.image.height }
		: undefined;
	const cta = {
			id: ctaSection?.id ?? "contact",
			title: typeof ctaContent.title === "string" ? ctaContent.title : "Contact me",
			description: typeof ctaContent.description === "string" ? ctaContent.description : "",
			image: ctaImage,
			action: {
				href: `mailto:${siteSettings.site.email}`,
				label: ctaContent.action && typeof ctaContent.action === "object" && "label" in ctaContent.action && typeof ctaContent.action.label === "string" ? ctaContent.action.label : "Contact me",
			},
		};

	return {
		metadata: {
			title: hero.title.join(" "),
			description: hero.description,
		},
		builder: {
			layout: {
				template: "fluid",
			},
			regions: [
				{
					key: "lead",
					component: "page-header",
					placement: "header",
					section: {
						theme: "light",
						spacing: "lead",
						container: "site",
					},
					props: {
						template: "split-media",
						data: hero,
					},
				},
				{
					key: "archive",
					component: "archive",
					section: {
						theme: "light",
						spacing: "compact",
						container: "site",
					},
					props: {
						mode: "taxonomy",
						toolbar: {
							data: archiveData.toolbar,
						},
						cards: {
							template: "overlay",
							layout: "mosaic",
							gap: "sm",
							items: archiveData.items,
						},
						emptyLabel: archiveData.emptyLabel,
						pagination: archiveData.pagination,
					},
				},
				{
					key: "closing",
					component: "cta",
					placement: "cta",
					section: {
						id: cta.id,
						theme: "light",
						spacing: "closing",
						container: "site",
					},
					props: {
						template: "callout",
						data: cta,
					},
				},
			],
		},
	};
}

export async function getWorksCategoryPaths() {
	const projects = await getProjects();
	return Array.from(
		new Map(
			projects.map((project) => [
				project.categorySlug,
				{ params: { category: project.categorySlug }, props: { categorySlug: project.categorySlug } },
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
					{ params: { tag: tag.slug }, props: { tagSlug: tag.slug } },
				] as const),
			),
		).values(),
	);
}

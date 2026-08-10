import { getArchiveSettings, getProjects } from "@/data/cms";
import { applyPageBuilderControl } from "@/data/mappers/page-builder";
import type { Project } from "@/types/content";
import type {
	WorkDetailPageData,
	WorkDetailPageSource,
} from "@/types/components/pages/work-detail/WorkDetailPage.types";

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
	const [projects, archive] = await Promise.all([
		getProjects(),
		getArchiveSettings(),
	]);
	const index = projects.findIndex((project) => project.slug === slug);
	const project = projects[index];

	if (!project) throw new Error(`Unknown project slug: ${slug}`);

	const detail = project.detail;
	const labels = archive.detail;
	const reviews = detail?.reviews ?? labels.defaultReviews;
	const gallery = detail?.gallery.length
		? detail.gallery
		: [{ src: project.image, alt: project.alt, width: 1600, height: 1000 }];
	const headerImages = Array.from(
		new Map(
			[
				{ src: project.image, alt: project.alt, width: 1600, height: 1000 },
				...gallery,
			].map((image) => [image.src, image]),
		).values(),
	);
	const articleBlocks = project.sections.map((section, sectionIndex) => ({
		id: `project-content-${sectionIndex + 1}`,
		title: section.title,
		paragraphs: section.paragraphs,
		image: gallery[sectionIndex % gallery.length],
	}));
	const tableOfContents = [
		...articleBlocks.map((block) => ({
			label: block.title,
			href: `#${block.id}`,
		})),
		{ label: reviews.title, href: "#customer-reviews" },
	];

	const content: WorkDetailPageSource = {
		pageHeader: {
			backAction: {
				label: archive.projects.backLabel,
				href: "/projects",
			},
			category: {
				label: project.category,
				href: `/projects/category/${project.categorySlug}`,
			},
			title: project.title,
			description: project.summary,
			images: headerImages,
			mediaTemplate: headerImages.length > 1 ? "slider" : "grid",
			galleryLabel: labels.galleryLabel,
			previousImageLabel: `${labels.previousLabel}: ${labels.galleryLabel}`,
			nextImageLabel: `${labels.nextLabel}: ${labels.galleryLabel}`,
			tagsLabel: labels.techStackLabel,
			actionsLabel: `${labels.liveActionLabel} / ${labels.sourceActionLabel}`,
			tags: project.tags.map((tag) => ({
				label: tag.label,
				href: `/projects/tag/${tag.slug}`,
			})),
			actions: [
				...(detail?.liveUrl
					? [{
							kind: "live" as const,
							label: labels.liveActionLabel,
							href: detail.liveUrl,
							icon: "arrowUpRight" as const,
						}]
					: []),
				...(detail?.sourceUrl
					? [{
							kind: "source" as const,
							label: labels.sourceActionLabel,
							href: detail.sourceUrl,
							icon: "github" as const,
						}]
					: []),
			],
			asideDecoration: labels.pageHeaderPattern,
			facts: [
				{ label: labels.clientLabel, value: project.client },
				{ label: labels.roleLabel, value: detail?.role ?? project.category },
				{ label: labels.durationLabel, value: detail?.duration ?? project.year },
			],
		},
		labels: {
			onThisPage: labels.onThisPageLabel,
			previous: labels.previousLabel,
			next: labels.nextLabel,
		},
		tableOfContents,
		articleBlocks,
		reviews: {
			id: "customer-reviews",
			...reviews,
		},
		navigation: [
			toNavigationProject(
				projects[index - 1],
				labels.previousLabel,
				"arrowLeft",
			),
			toNavigationProject(
				projects[index + 1],
				labels.nextLabel,
				"arrowRight",
			),
		].filter(
			(item): item is NonNullable<typeof item> => Boolean(item),
		),
	};

	const builder = applyPageBuilderControl(
		{
			layout: {
				template: "fluid",
			},
			regions: [
				{
					key: "summary",
					component: "page-header",
					placement: "header",
					section: {
						theme: "light",
						spacing: "compact",
						container: "site",
					},
					props: {
						template: "slider-aside",
						data: content.pageHeader,
					},
				},
				{
					key: "content",
					component: "article",
					section: {
						theme: "light",
						spacing: "compact",
						container: "site",
					},
					props: {
						blocks: content.articleBlocks,
						toc: {
							label: content.labels.onThisPage,
							items: content.tableOfContents,
							sticky: true,
						},
					},
				},
				{
					key: "reviews",
					component: "reviews",
					section: {
						theme: "light",
						spacing: "compact",
						container: "site",
					},
					props: content.reviews,
				},
				{
					key: "navigation",
					component: "post-navigation",
					section: {
						theme: "light",
						spacing: "compact",
						container: "site",
					},
					props: {
						template: "split",
						items: content.navigation,
						label: `${content.labels.previous} / ${content.labels.next}`,
					},
				},
			],
		},
		detail?.builder,
	);

	return {
		project: {
			title: project.title,
			summary: project.summary,
		},
		builder,
	};
}

function toNavigationProject(
	project: Project | undefined,
	label: string,
	icon: "arrowLeft" | "arrowRight",
) {
	if (!project) return undefined;
	return {
		title: project.title,
		href: project.href,
		image: project.image,
		alt: project.alt,
		label,
		icon,
		summary: project.summary,
	};
}

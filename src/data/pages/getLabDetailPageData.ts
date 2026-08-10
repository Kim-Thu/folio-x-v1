import { getLabs } from "@/data/cms";
import { mapLabToCard } from "@/data/mappers/card";
import type { LabDetailPageData } from "@/types/components/pages/lab-detail/LabDetailPage.types";
import type { PCardData } from "@/types/components/object/project/card/PCard.types";

export async function getLabDetailPaths() {
	const labs = await getLabs();
	return labs.map((lab) => ({
		params: { slug: lab.slug },
		props: { slug: lab.slug },
	}));
}

export async function getLabDetailPageData(
	slug: string,
): Promise<LabDetailPageData> {
	const labs = await getLabs();
	const lab = labs.find((item) => item.slug === slug);
	if (!lab) throw new Error(`Unknown lab slug: ${slug}`);

	const actions = [
		...(lab.liveUrl
			? [
					{
						label: "Live demo",
						href: lab.liveUrl,
						icon: "arrowUpRight" as const,
						variant: "primary" as const,
					},
				]
			: []),
		...(lab.sourceUrl
			? [
					{
						label: "Source code",
						href: lab.sourceUrl,
						icon: "github" as const,
						variant: "outline" as const,
					},
				]
			: []),
	];
	const articleBlocks = lab.sections.map((section, index) => ({
		id:
			index === 0
				? "overview"
				: section.title.toLowerCase().replace(/\s+/g, "-"),
		title: section.title,
		paragraphs: section.paragraphs,
	}));
	const featureCards: PCardData[] = lab.features.map((feature) => ({
		href: "#features",
		ariaLabel: feature.title,
		title: [feature.title],
		excerpt: feature.description,
		icon: feature.icon,
	}));
	const featureFacts = lab.features.slice(0, 4).map((feature) => ({
		label: feature.title,
		value: feature.description,
		icon: feature.icon,
	}));
	const galleryCards: PCardData[] = lab.gallery.map((image, index) => ({
		href: image.src,
		ariaLabel: `Open gallery image ${index + 1}`,
		title: [`Gallery image ${index + 1}`],
		media: image,
	}));
	const resourceCards: PCardData[] = lab.resources.map((resource) => ({
		href: resource.href,
		ariaLabel: resource.title,
		title: [resource.title],
		excerpt: resource.description,
		icon: resource.icon,
		action: {
			label: "Open resource",
			href: resource.href,
			icon: "arrowUpRight",
		},
	}));
	const related = labs
		.filter((item) => item.slug !== lab.slug)
		.slice(0, 4)
		.map((item) => ({
			...mapLabToCard(item),
			metrics: [{ icon: "star" as const, label: String(item.stars) }],
		}));
	const shareUrl = new URL(
		lab.href,
		import.meta.env.SITE ?? "https://folio-x-v1.netlify.app",
	).toString();
	const encodedShareUrl = encodeURIComponent(shareUrl);
	const encodedTitle = encodeURIComponent(lab.title);
	const facts = lab.facts.map((fact) =>
		fact.label.toLowerCase() === "category"
			? {
					...fact,
					href: `/labs/category/${lab.category.slug}`,
				}
			: fact,
	);

	return {
		lab: {
			title: lab.title,
			summary: lab.summary,
		},
		builder: {
			layout: {
				template: "fluid",
			},
			regions: [
				{
					key: "summary",
					component: "page-header",
					placement: "header",
					section: {
						theme: "canvas",
						spacing: "compact",
						container: "site",
					},
					props: {
						template: "media-aside",
						data: {
							breadcrumb: {
								label: "Breadcrumb",
								items: [
									{ label: "Labs", href: "/labs" },
									{
										label: lab.category.label,
										href: `/labs/category/${lab.category.slug}`,
									},
								],
								current: lab.title,
							},
							image: lab.image,
							category: {
								label: lab.category.label,
								href: `/labs/category/${lab.category.slug}`,
							},
							badge: lab.statusLabel,
							title: lab.title,
							description: lab.summary,
							metrics: [
								{ icon: "star", label: String(lab.stars) },
								{ icon: "github", label: String(lab.forks) },
								{ icon: "clock01", label: lab.updatedLabel },
							],
							actionsLabel: `${lab.title} actions`,
							actions,
							share: {
								label: "Share project",
								links: [
									{
										label: `Share ${lab.title} on Twitter`,
										href: `https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedTitle}`,
										icon: "twitter",
									},
									{
										label: `Share ${lab.title} on Facebook`,
										href: `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`,
										icon: "facebook",
									},
									{
										label: `Share ${lab.title} on LinkedIn`,
										href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`,
										icon: "linkedin",
									},
									{
										label: `Open ${lab.title} link`,
										href: shareUrl,
										icon: "link",
									},
								],
							},
						},
					},
				},
				{
					key: "navigation",
					component: "tabs",
					section: {
						theme: "canvas",
						spacing: "compact",
						container: "site",
					},
					props: {
						label: "On this page",
						activeValue: "overview",
						appearance: "underline",
						tone: "light",
						tabs: [
							{ label: "Overview", value: "overview", href: "#overview" },
							{ label: "Features", value: "features", href: "#features" },
							...(articleBlocks.some((block) => block.id === "technology")
								? [
										{
											label: "Technology",
											value: "technology",
											href: "#technology",
										},
									]
								: []),
							{ label: "Gallery", value: "gallery", href: "#gallery" },
							{ label: "Resources", value: "resources", href: "#resources" },
						],
					},
				},
				{
					key: "overview-layout",
					component: "group",
					section: {
						id: "overview-layout",
						theme: "canvas",
						spacing: "compact",
						container: "site",
					},
					props: {
						template: "sidebar",
						asideLabel: "Experiment information",
						asidePosition: "end",
						stickyAside: true,
						regions: [
							{
								key: "content",
								component: "article",
								section: false,
								props: {
									appearance: "compact",
									blocks: articleBlocks.slice(0, 1),
								},
							},
							{
								key: "overview-facts",
								component: "details",
								section: false,
								props: {
									list: {
										items: featureFacts,
										variant: "highlights",
									},
								},
							},
							{
								key: "features",
								component: "cards",
								section: {
									id: "features",
									theme: "none",
									spacing: "none",
									container: "none",
								},
								props: {
									header: {
										data: {
											title: "Features",
										},
										appearance: "compact",
										headingLevel: 2,
									},
									cards: {
										template: "icon-summary",
										layout: "grid",
										columns: 2,
										gap: "sm",
										items: featureCards,
										slots: {
											media: false,
											metadata: false,
											action: false,
										},
									},
								},
							},
							{
								key: "facts",
								component: "details",
								placement: "aside",
								section: {
									id: "technology",
									theme: "none",
									spacing: "none",
									container: "none",
								},
								props: {
									title: "Experiment information",
									list: {
										items: facts,
										variant: "default",
									},
									tags: {
										title: "Tech Stack",
										list: {
											label: `${lab.title} technology stack`,
											items: lab.technologies.map((technology) => ({
												label: technology.label,
												href: `/labs/technology/${technology.slug}`,
											})),
										},
									},
								},
							},
						],
					},
				},
				{
					key: "gallery",
					component: "cards",
					section: {
						id: "gallery",
						theme: "canvas",
						spacing: "compact",
						container: "site",
					},
					props: {
						header: {
							data: {
								title: "Gallery",
							},
							appearance: "compact",
							headingLevel: 2,
						},
						cards: {
							template: "media-only",
							layout: "grid",
							columns: 5,
							gap: "sm",
							items: galleryCards,
							slots: {
								metadata: false,
								title: false,
								excerpt: false,
								action: false,
							},
						},
						action: {
							label: "View more gallery",
							href: lab.gallery[0]?.src ?? "#gallery",
							icon: "arrowRight",
							variant: "outline",
							tone: "light",
							size: "xs",
						},
					},
				},
				{
					key: "resources",
					component: "cards",
					section: {
						id: "resources",
						theme: "canvas",
						spacing: "compact",
						container: "site",
					},
					props: {
						header: {
							data: {
								title: "Resources",
							},
							appearance: "compact",
							headingLevel: 2,
						},
						cards: {
							template: "icon-panel",
							layout: "grid",
							columns: 4,
							gap: "sm",
							items: resourceCards,
							slots: { media: false, metadata: false },
						},
					},
				},
				{
					key: "related",
					component: "cards",
					section: {
						theme: "canvas",
						spacing: "compact",
						container: "site",
					},
					props: {
						header: {
							data: {
								title: "Related labs",
							},
							appearance: "compact",
							headingLevel: 2,
						},
						headerAction: {
							label: "View all Labs",
							href: "/labs",
							icon: "arrowRight",
							variant: "text",
							tone: "light",
							size: "xs",
						},
						cards: {
							template: "compact-media",
							layout: "grid",
							columns: 4,
							gap: "sm",
							items: related,
							slots: { excerpt: false },
						},
					},
				},
			],
		},
	};
}

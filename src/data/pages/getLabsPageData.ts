import { getLabs } from "@/data/cms";
import { mapLabToCard } from "@/data/mappers/card";
import type { LabsPageData } from "@/types/components/pages/labs/LabsPage.types";

export interface LabsPageSelection {
	category?: string;
	technology?: string;
}

export async function getLabCategoryPaths() {
	const labs = await getLabs();
	return Array.from(new Set(labs.map((lab) => lab.category.slug))).map(
		(category) => ({ params: { category }, props: { category } }),
	);
}

export async function getLabTechnologyPaths() {
	const labs = await getLabs();
	return Array.from(
		new Set(
			labs.flatMap((lab) =>
				lab.technologies.map((technology) => technology.slug),
			),
		),
	).map((technology) => ({
		params: { technology },
		props: { technology },
	}));
}

export async function getLabsPageData(
	selection: LabsPageSelection = {},
): Promise<LabsPageData> {
	const labs = await getLabs();
	const categories = Array.from(
		new Map(labs.map((lab) => [lab.category.slug, lab.category])).values(),
	);
	const technologies = Array.from(
		new Map(
			labs.flatMap((lab) =>
				lab.technologies.map((technology) => [
					technology.slug,
					technology,
				]),
			),
		).values(),
	);
	const selectedCategory = categories.find(
		(category) => category.slug === selection.category,
	);
	const selectedTechnology = technologies.find(
		(technology) => technology.slug === selection.technology,
	);

	return {
		metadata: {
			title: selectedCategory?.label ?? selectedTechnology?.label ?? "Labs",
			description:
				"Experiments in artificial intelligence, automation, developer tools, data, and interaction design.",
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
						id: "labs-hero",
						theme: "canvas",
						spacing: "lead",
						container: "site",
					},
					props: {
						template: "split-benefits",
						data: {
							id: "labs-hero",
							eyebrow: "NKT Labs",
							title: "Experiment. Innovate. Share",
							accent: ".",
							description:
								"A place for testing new ideas, emerging technology, and useful creative systems.",
							benefits: {
								items: [
									{ icon: "lightBulb", label: "Practical experiments" },
									{ icon: "github", label: "Open source" },
									{ icon: "arrowUpRight", label: "Share what we learn" },
								],
							},
							image: {
								src: "/uploads/labs-hero.png",
								alt: "An isometric laboratory with robotics and experiments",
								width: 1536,
								height: 1024,
							},
						},
					},
				},
				{
					key: "catalog",
					component: "archive",
					section: {
						id: "labs",
						theme: "canvas",
						spacing: "body",
						container: "site",
					},
					props: {
						mode: "faceted",
						toolbar: {
							data: {
								search: {
									id: "labs-search",
									label: "Search experiments",
									name: "search",
									placeholder: "Search projects, technology, or ideas...",
								},
								selects: [
									{
										control: "status",
										id: "labs-status",
										label: "Status",
										value: "all",
										options: [
											{ label: "All statuses", value: "all" },
											{ label: "Experiment", value: "experiment" },
											{ label: "In progress", value: "in-progress" },
											{ label: "Complete", value: "complete" },
										],
									},
								],
								sort: {
									label: "Sort experiments",
									value: "newest",
									options: [
										{ label: "Newest", value: "newest" },
										{ label: "Oldest", value: "oldest" },
									],
								},
								view: {
									label: "Experiment view",
									gridLabel: "Grid view",
									listLabel: "List view",
								},
							},
						},
						sidebar: {
							label: "Lab filters",
							filter: {
								data: {
									filterLabel: "Technology",
									groups: [
										{
											appearance: "navigation",
											control: "category",
											legend: "Categories",
											name: "labs-category",
											type: "radio",
											options: [
												{
													label: "All projects",
													value: "all",
													count: labs.length,
													checked: !selectedCategory,
												},
												...categories.map((category) => ({
													label: category.label,
													value: category.slug,
													checked: category.slug === selectedCategory?.slug,
													count: labs.filter(
														(lab) => lab.category.slug === category.slug,
													).length,
												})),
											],
										},
										{
											appearance: "controls",
											control: "technology",
											legend: "Tech stack",
											name: "labs-technology",
											type: "checkbox",
											options: technologies.map((technology) => ({
												label: technology.label,
												value: technology.slug,
												checked:
													technology.slug === selectedTechnology?.slug,
												count: labs.filter((lab) =>
													lab.technologies.some(
														(item) => item.slug === technology.slug,
													),
												).length,
											})),
										},
									],
								},
							},
						},
						result: {
							count: labs.length,
							label: "experiments found",
						},
						cards: {
							template: "media-metrics",
							layout: "grid",
							columns: 3,
							gap: "md",
							items: labs.map(mapLabToCard),
						},
						emptyLabel: "No experiments match the selected filters.",
						pagination: {
							label: "Lab pages",
							previousLabel: "Previous page",
							nextLabel: "Next page",
							pageSize: 6,
							totalPages: Math.max(1, Math.ceil(labs.length / 6)),
						},
					},
				},
				{
					key: "updates",
					component: "cta",
					section: {
						id: "labs-updates",
						theme: "canvas",
						spacing: "compact",
						container: "site",
					},
					props: {
						template: "default",
						data: {
							id: "labs-updates",
							title: "Get updates from NKT Labs",
							description:
								"Receive new experiments, technical notes, and useful resources.",
							image: {
								src: "/uploads/pattern-1.png",
								alt: "",
								width: 1536,
								height: 1536,
							},
							action: {
								href: "mailto:hello@nkt.studio?subject=Labs%20updates",
								label: "Subscribe",
							},
						},
					},
				},
				{
					key: "principles",
					component: "cards",
					section: {
						id: "labs-principles",
						theme: "canvas",
						spacing: "compact",
						container: "site",
					},
					props: {
						header: {
							data: {
								label: "Why Labs",
								title: "Why we build experiments",
							},
							headingLevel: 2,
						},
						cards: {
							template: "boxed",
							layout: "grid",
							columns: 3,
							gap: "md",
							items: [
								{
									href: "#labs",
									ariaLabel: "Practical experiments",
									title: ["Practical experiments"],
									excerpt:
										"Small, focused prototypes help us learn quickly from real constraints.",
								},
								{
									href: "#labs",
									ariaLabel: "Open collaboration",
									title: ["Open collaboration"],
									excerpt:
										"We share the useful parts so ideas can improve through real feedback.",
								},
								{
									href: "#labs",
									ariaLabel: "Useful by default",
									title: ["Useful by default"],
									excerpt:
										"Every experiment aims to leave behind a reusable tool or lesson.",
								},
							],
							slots: {
								media: false,
								metadata: false,
								action: false,
							},
						},
					},
				},
				{
					key: "closing",
					component: "cta",
					placement: "cta",
					section: {
						id: "lab-idea",
						theme: "canvas",
						spacing: "closing",
						container: "site",
					},
					props: {
						template: "callout",
						data: {
							id: "lab-idea",
							title: "Have an idea worth testing?",
							description:
								"Let us turn a promising direction into a useful experiment.",
							image: {
								src: "/uploads/patten-2.png",
								alt: "",
								width: 1536,
								height: 1024,
							},
							action: {
								href: "mailto:hello@nkt.studio",
								label: "Start a conversation",
							},
						},
					},
				},
			],
		},
	};
}

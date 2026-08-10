import { getLabs, getPage } from "@/data/cms";
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
	const page = await getPage("/labs");

	return {
		page,
		context: {
			categorySlug: selection.category,
			technologySlug: selection.technology,
		},
		metadata: {
			title: page.meta.title,
			description: page.meta.description ?? "",
		},
	};
}

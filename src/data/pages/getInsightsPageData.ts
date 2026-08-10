import { getInsights, getPage } from "@/data/cms";
import type { InsightsPageData } from "@/types/components/pages/insights/InsightsPage.types";

export interface InsightsPageSelection {
	categorySlug?: string;
	tagSlug?: string;
}

export async function getInsightCategoryPaths() {
	const insights = await getInsights();
	return Array.from(new Set(insights.map((insight) => insight.categorySlug))).map(
		(categorySlug) => ({
			params: { category: categorySlug },
			props: { categorySlug },
		}),
	);
}

export async function getInsightTagPaths() {
	const insights = await getInsights();
	return Array.from(
		new Set(insights.flatMap((insight) => insight.tags.map((tag) => tag.slug))),
	).map((tagSlug) => ({
		params: { tag: tagSlug },
		props: { tagSlug },
	}));
}

export async function getInsightsPageData(
	selection: InsightsPageSelection = {},
): Promise<InsightsPageData> {
	return {
		page: await getPage("/blog"),
		context: selection,
	};
}

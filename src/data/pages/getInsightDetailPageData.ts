import { getInsights } from "@/data/cms";
import type { InsightDetailPageData } from "@/types/components/pages/insight-detail/InsightDetailPage.types";

export async function getInsightDetailPaths() {
	const insights = await getInsights();
	return insights.map((post) => ({
		params: { slug: post.slug },
		props: { slug: post.slug },
	}));
}

export async function getInsightDetailPageData(
	slug: string,
): Promise<InsightDetailPageData> {
	const insights = await getInsights();
	const post = insights.find((insight) => insight.slug === slug);
	if (!post) throw new Error(`Unknown insight slug: ${slug}`);

	return { post };
}

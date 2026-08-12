import { getBlogDetailSettings, getInsights } from "@/data/cms";
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
	const [insights, presentation] = await Promise.all([
		getInsights(),
		getBlogDetailSettings(),
	]);
	const post = insights.find((insight) => insight.slug === slug);
	if (!post) throw new Error(`Unknown insight slug: ${slug}`);

	const relatedPosts = insights
		.filter((insight) => insight.slug !== slug)
		.sort((a, b) => {
			const aScore = Number(a.categorySlug === post.categorySlug) * 2 + a.tags.filter((tag) => post.tags.some((postTag) => postTag.slug === tag.slug)).length;
			const bScore = Number(b.categorySlug === post.categorySlug) * 2 + b.tags.filter((tag) => post.tags.some((postTag) => postTag.slug === tag.slug)).length;
			return bScore - aScore || b.publishedAt.localeCompare(a.publishedAt);
		})
		.slice(0, presentation.sidebar.relatedLimit);

	return { post, relatedPosts, presentation };
}

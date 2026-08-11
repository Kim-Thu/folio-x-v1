import { getLabDetailSettings, getLabs } from "@/data/cms";
import type { LabDetailPageData } from "@/types/components/pages/lab-detail/LabDetailPage.types";

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
	const [labs, presentation] = await Promise.all([
		getLabs(),
		getLabDetailSettings(),
	]);
	const lab = labs.find((item) => item.slug === slug);
	if (!lab) throw new Error(`Unknown lab slug: ${slug}`);

	const relatedLabs = labs
		.filter((item) => item.slug !== slug)
		.sort((a, b) => {
			const categoryScore = Number(b.category.slug === lab.category.slug) - Number(a.category.slug === lab.category.slug);
			return categoryScore || a.order - b.order;
		})
		.slice(0, 4);

	return { lab, relatedLabs, presentation };
}

import { getLabs } from "@/data/cms";
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
	const labs = await getLabs();
	const lab = labs.find((item) => item.slug === slug);
	if (!lab) throw new Error(`Unknown lab slug: ${slug}`);

	return { lab };
}

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

	const labsBySlug = new Map(labs.map((item) => [item.slug, item]));
	const relatedLabs = lab.related.slugs.map((relatedSlug) => {
		const relatedLab = labsBySlug.get(relatedSlug);
		if (!relatedLab) {
			throw new Error(`Unknown related lab slug "${relatedSlug}" configured for lab "${slug}"`);
		}
		if (relatedLab.slug === lab.slug) {
			throw new Error(`Lab "${slug}" cannot relate to itself`);
		}
		return relatedLab;
	});

	return { lab, relatedLabs, presentation };
}

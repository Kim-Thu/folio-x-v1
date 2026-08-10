import { getPage } from "@/data/cms";
import type { PolicyPageData } from "@/types/components/pages/policy/PolicyPage.types";

export async function getPolicyPageData(slug: string): Promise<PolicyPageData> {
	const page = await getPage(`/${slug}`);

	return { page };
}

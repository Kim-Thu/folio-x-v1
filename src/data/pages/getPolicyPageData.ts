import { getPage } from "@/data/cms";
import { resolvePage } from "@/data/pages/resolvePage";
import type { PolicyPageData } from "@/types/components/pages/policy/PolicyPage.types";

export async function getPolicyPageData(slug: string): Promise<PolicyPageData> {
	const page = await getPage(`/${slug}`);
	const resolved = await resolvePage(page);

	return {
		metadata: {
			title: page.meta.title,
			description: page.meta.description ?? "",
		},
		builder: resolved.builder,
	};
}

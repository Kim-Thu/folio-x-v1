import { getPolicies } from "@/data/cms";
import type { PolicyPageData } from "@/types/components/pages/policy/PolicyPage.types";

export async function getPolicyPageData(slug: string): Promise<PolicyPageData> {
	const policies = await getPolicies();
	const policy = policies[slug];
	if (!policy) throw new Error(`Missing required CMS policy: ${slug}`);

	const blocks = policy.sections.map((section, index) => ({
		id: `policy-${index + 1}`,
		title: section.title,
		paragraphs: section.paragraphs,
	}));

	return {
		metadata: {
			title: policy.title,
			description: policy.description,
		},
		builder: {
			layout: { template: "fluid" },
			regions: [
				{
					key: "lead",
					component: "page-header",
					placement: "header",
					section: { theme: "light", spacing: "lead", container: "site" },
					props: {
						template: "split-media",
						data: {
							breadcrumb: {
								label: "Breadcrumb",
								items: [{ label: "Home", href: "/" }],
								current: policy.title,
							},
							title: [policy.title],
							description: `${policy.description} ${policy.lastUpdatedLabel}: ${policy.lastUpdated}.`,
						},
					},
				},
				{
					key: "content",
					component: "article",
					section: { theme: "light", spacing: "body", container: "content" },
					props: { blocks },
				},
			],
		},
	};
}

import type { SystemStatePageData } from "@/types/components/pages/system-state/SystemStatePage.types";
import type { SystemStateContent } from "@/types/content/SystemStateContent";

export function getSystemStatePageData(
	content: SystemStateContent,
): SystemStatePageData {
	return {
		builder: {
			layout: {
				template: "centered",
			},
			regions: [
				{
					key: "status",
					component: "status",
					section: {
						id: content.id,
						container: "site",
					},
					props: {
						template: "split-media",
						data: content,
					},
				},
			],
		},
	};
}

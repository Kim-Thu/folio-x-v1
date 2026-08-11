import type { SystemStatePageData } from "@/types/components/pages/system-state/SystemStatePage.types";
import type { SystemStateContent } from "@/types/content/SystemStateContent";

export function getSystemStatePageData(
	content: SystemStateContent,
): SystemStatePageData {
	return { content };
}

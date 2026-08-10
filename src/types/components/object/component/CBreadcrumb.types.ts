import type { HTMLAttributes } from "astro/types";

export interface CBreadcrumbItem {
	label: string;
	href: string;
}

export interface CBreadcrumbData {
	label: string;
	items: CBreadcrumbItem[];
	current: string;
}

export interface CBreadcrumbProps
	extends CBreadcrumbData,
		Omit<HTMLAttributes<"nav">, "class"> {
	class?: string;
}

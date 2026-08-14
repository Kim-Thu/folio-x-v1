import type { LPageProps, LPageTemplate } from "@/types/components/layout/LPage.types";

export type PLayoutTemplate = LPageTemplate;

export interface PLayoutProps
	extends Pick<
		LPageProps,
		"asideLabel" | "asidePosition" | "containerSize"
	> {
	template: PLayoutTemplate;
}

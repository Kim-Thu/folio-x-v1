import type { CTestimonialData } from "@/types/components/object/component/CTestimonial.types";

export interface PReviewDistributionItem {
	label: string;
	value: number;
}

export interface PReviewSummary {
	score: number;
	maximum: number;
	totalLabel: string;
	distribution: PReviewDistributionItem[];
}

export interface PReviewsProps {
	id: string;
	eyebrow: string;
	title: string;
	summary: PReviewSummary;
	items: CTestimonialData[];
}

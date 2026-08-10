import type { HTMLAttributes } from "astro/types";
import type { CImageData } from "@/types/components/object/component/CImage.types";

export interface CTestimonialData {
	name: string;
	date: string;
	quote: string;
	rating: number;
	avatar?: CImageData;
}

export interface CTestimonialProps
	extends Omit<HTMLAttributes<"figure">, "class">,
		CTestimonialData {
	class?: string;
	maximumRating: number;
}

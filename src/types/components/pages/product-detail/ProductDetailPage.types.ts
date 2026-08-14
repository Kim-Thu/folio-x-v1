import type { Product } from "@/types/content";

export interface ProductDetailPresentation {
	routes: {
		base: string;
		categoryBase: string;
	};
	imageWidth: number;
	imageHeight: number;
	pricePrefix: string;
}

export interface ProductDetailPageData {
	product: Product;
	presentation: ProductDetailPresentation;
}

export interface ProductDetailPageProps {
	data: ProductDetailPageData;
}

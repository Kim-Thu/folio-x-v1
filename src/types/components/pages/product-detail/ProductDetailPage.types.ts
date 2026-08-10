import type { Product } from "@/types/content";

export interface ProductDetailPageData {
	product: Product;
}

export interface ProductDetailPageProps {
	data: ProductDetailPageData;
}

import type { ResolvedPageData } from "@/types/components/pages/builder/PageBuilder.types";
import type { Product } from "@/types/content/Product";

export type ProductDetailPageData = ResolvedPageData & {
	product: Product;
};

export interface ProductDetailPageProps {
	data: ProductDetailPageData;
}

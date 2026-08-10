import { getPage, getProducts } from "@/data/cms";
import type { ProductsPageData } from "@/types/components/pages/products/ProductsPage.types";

export interface ProductsPageQuery {
	categorySlug?: string;
}

export async function getProductsPageData(
	query: ProductsPageQuery = {},
): Promise<ProductsPageData> {
	return {
		page: await getPage("/products"),
		context: query,
	};
}

export async function getProductCategoryPaths() {
	const products = await getProducts();
	return Array.from(new Set(products.map((product) => product.categorySlug))).map(
		(categorySlug) => ({
			params: { category: categorySlug },
			props: { categorySlug },
		}),
	);
}

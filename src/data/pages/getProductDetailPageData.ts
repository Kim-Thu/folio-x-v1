import { getProducts } from "@/data/cms";
import type { ProductDetailPageData } from "@/types/components/pages/product-detail/ProductDetailPage.types";

export async function getProductDetailPaths() {
	const products = await getProducts();
	return products.map((product) => ({
		params: { slug: product.slug },
		props: { slug: product.slug },
	}));
}

export async function getProductDetailPageData(
	slug: string,
): Promise<ProductDetailPageData> {
	const products = await getProducts();
	const product = products.find((item) => item.slug === slug);
	if (!product) throw new Error(`Unknown product slug: ${slug}`);

	return { product };
}

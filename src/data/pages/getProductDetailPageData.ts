import { getPage, getProducts } from "@/data/cms";
import type { ProductDetailPageData } from "@/types/components/pages/product-detail/ProductDetailPage.types";

type ProductsPage = Awaited<ReturnType<typeof getPage>>;
type ProductsPageSection = ProductsPage["content"]["sections"][number];
type ProductsArchiveSection = Extract<
	ProductsPageSection,
	{ type: "archive"; content: { source: { collection: "products" } } }
>;

function isProductsArchiveSection(
	section: ProductsPageSection,
): section is ProductsArchiveSection {
	return (
		section.type === "archive" &&
		section.content.source.collection === "products"
	);
}

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
	const [products, productsPage] = await Promise.all([
		getProducts(),
		getPage("products"),
	]);
	const product = products.find((item) => item.slug === slug);
	if (!product) throw new Error(`Unknown product slug: ${slug}`);

	const archive = productsPage.content.sections.find(isProductsArchiveSection);
	if (!archive) throw new Error("Missing products archive section");

	const price = archive.content.sidebar.price;
	if (
		!price ||
		typeof price !== "object" ||
		Array.isArray(price) ||
		typeof price.prefix !== "string"
	) {
		throw new Error("Products archive price prefix is required");
	}

	return {
		product,
		presentation: {
			routes: archive.content.routes,
			imageWidth: archive.content.itemPresentation.imageWidth,
			imageHeight: archive.content.itemPresentation.imageHeight,
			pricePrefix: price.prefix,
		},
	};
}

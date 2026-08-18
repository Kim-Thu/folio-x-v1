import { getPage, getProductCategories, getProducts } from "@/data/cms";
import type { ProductsPageData } from "@/types/components/pages/products/ProductsPage.types";

export interface ProductsPageQuery {
	categorySlug?: string;
}

export async function getProductsPageData(
	query: ProductsPageQuery = {},
): Promise<ProductsPageData> {
	const page = await getPage("/products");

	if (!query.categorySlug) {
		return {
			page,
			context: query,
		};
	}

	const categories = await getProductCategories();
	const category = categories.find(
		(item) => item.value === query.categorySlug,
	);

	if (!category) {
		throw new Error(`Missing product category: ${query.categorySlug}`);
	}

	return {
		page: {
			...page,
			content: {
				...page.content,
				sections: page.content.sections.map((section) => {
					if (section.type !== "page-header" || !section.content.breadcrumb) {
						return section;
					}

					return {
						...section,
						content: {
							...section.content,
							breadcrumb: {
								...section.content.breadcrumb,
								items: [
									...section.content.breadcrumb.items,
									{
										label: section.content.breadcrumb.current,
										href: page.slug,
									},
								],
								current: category.label,
							},
						},
					};
				}),
			},
		},
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

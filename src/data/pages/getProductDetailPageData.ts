import { getPage, getProducts } from "@/data/cms";
import type { PageRegion } from "@/types/components/pages/builder/PageBuilder.types";
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

	const priceConfig = archive.content.sidebar.price;
	if (
		!priceConfig ||
		typeof priceConfig !== "object" ||
		Array.isArray(priceConfig) ||
		typeof priceConfig.prefix !== "string"
	) {
		throw new Error("Products archive price prefix is required");
	}

	const page = product.detail.page;
	const categoryHref = `${archive.content.routes.categoryBase}${product.categorySlug}`;
	const price = {
		current: `${priceConfig.prefix}${product.price}`,
		previous: product.oldPrice
			? `${priceConfig.prefix}${product.oldPrice}`
			: undefined,
		discount: product.oldPrice
			? `-${Math.round((1 - product.price / product.oldPrice) * 100)}%`
			: undefined,
	};

	const regions: PageRegion[] = page.sections.map((section) => {
		const frame = {
			id: section.id,
			theme: section.settings.theme,
			spacing: section.settings.spacing,
			container: section.settings.container,
		};

		if (section.type === "page-header") {
			return {
				key: section.id,
				component: "page-header",
				section: frame,
				props: {
					template: section.template,
					data: {
						breadcrumb: {
							label: section.content.breadcrumbLabel,
							items: [
								{
									label: section.content.productsLabel,
									href: archive.content.routes.base,
								},
								{ label: product.category, href: categoryHref },
							],
							current: product.title,
						},
						category: { label: product.category, href: categoryHref },
						title: product.title,
						description: product.description,
						badge: product.badge,
						images: [
							{
								src: product.image,
								alt: section.content.galleryLabel,
								width: archive.content.itemPresentation.imageWidth,
								height: archive.content.itemPresentation.imageHeight,
							},
						],
						galleryLabel: section.content.galleryLabel,
						thumbnailLabel: section.content.thumbnailLabel,
						rating: {
							value: product.rating,
							maximum: 5,
							count: product.reviews,
							salesLabel: section.content.salesLabel,
						},
						price,
						features: section.content.features,
						facts: section.content.facts,
						actionsLabel: section.content.actionsLabel,
						actions: section.content.actions,
						paymentLabel: section.content.paymentLabel,
						paymentMethods: section.content.paymentMethods,
					},
				},
			};
		}

		return {
			key: section.id,
			component: "article",
			section: frame,
			props: {
				template: section.template,
				blocks: section.content.blocks,
			},
		};
	});

	return {
		product,
		layout: { template: page.template },
		regions,
	};
}

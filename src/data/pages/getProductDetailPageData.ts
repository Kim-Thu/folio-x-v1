import { getPage, getProducts } from "@/data/cms";
import type { PageRegion } from "@/types/components/object/project/page/PageRegion.types";
import type { ProductDetailPageData } from "@/types/components/pages/product-detail/ProductDetailPage.types";

type ProductsPage = Awaited<ReturnType<typeof getPage>>;
type ProductsPageSection = ProductsPage["content"]["sections"][number];
type ProductsArchiveSection = Extract<
	ProductsPageSection,
	{ type: "archive"; content: { source: { collection: "products" } } }
>;

type LegacyArticleBlock = {
	id: string;
	title: string;
	paragraphs: string[];
};

type LegacyArticleContent = {
	blocks: LegacyArticleBlock[];
};

function isProductsArchiveSection(
	section: ProductsPageSection,
): section is ProductsArchiveSection {
	return (
		section.type === "archive" &&
		section.content.source.collection === "products"
	);
}

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");
}

function resolveArticleContent(content: unknown): string {
	if (typeof content === "string") return content;

	if (
		content &&
		typeof content === "object" &&
		"blocks" in content &&
		Array.isArray((content as LegacyArticleContent).blocks)
	) {
		return (content as LegacyArticleContent).blocks
			.map((block) => {
				const heading = `<h2 id="${escapeHtml(block.id)}">${escapeHtml(block.title)}</h2>`;
				const paragraphs = block.paragraphs
					.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
					.join("");

				return `${heading}${paragraphs}`;
			})
			.join("");
	}

	throw new TypeError("Product article content must be an HTML string");
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
			const images = section.content.images?.length
				? section.content.images
				: [
					{
						src: product.image,
						alt: section.content.galleryLabel,
						width: archive.content.itemPresentation.imageWidth,
						height: archive.content.itemPresentation.imageHeight,
					},
				];

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
						images,
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

		const content = resolveArticleContent(section.content);
		const tocItems = Array.from(
			content.matchAll(
				/<h([23])\b[^>]*\bid=(["'])([^"']+)\2[^>]*>([\s\S]*?)<\/h\1>/gi,
			),
			(match) => ({
				label: match[4].replace(/<[^>]*>/g, "").trim(),
				href: `#${match[3]}`,
			}),
		);

		return {
			key: section.id,
			component: "article",
			section: frame,
			props: {
				content,
				toc: tocItems.length
					? {
							label: "On this page",
							position: "start",
							appearance: "panel",
							sticky: true,
							items: tocItems,
						}
					: undefined,
			},
		};
	});

	return {
		product,
		pageTemplate: page.template,
		regions,
	};
}

import { getProducts } from "@/data/cms";
import { mapProductToCard } from "@/data/mappers/card";
import type {
	ProductDetailPageData,
	ProductDetailPageSource,
} from "@/types/components/pages/product-detail/ProductDetailPage.types";

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

	if (!product) {
		throw new Error(`Unknown product slug: ${slug}`);
	}

	const articleBlocks = [
		{
			id: "product-overview",
			title: "Overview",
			paragraphs: [
				`${product.title} is built for teams that need a dependable ${product.category.toLowerCase()} without rebuilding the same foundations for every launch.`,
				`${product.description} The package follows the same component, accessibility, and responsive conventions demonstrated in the preview.`,
			],
			features: [
				{ icon: "check" as const, label: "Modern foundation" },
				{ icon: "check" as const, label: "Flexible customization" },
				{ icon: "check" as const, label: "Optimized performance" },
				{ icon: "check" as const, label: "Responsive by default" },
			],
			image: {
				src: product.image,
				alt: `${product.title} interface demo`,
				width: 900,
				height: 562,
			},
		},
		{
			id: "product-capabilities",
			title: "Included capabilities",
			paragraphs: [
				"The download includes the production-ready files, reusable interface patterns, documentation, and example content needed to evaluate the complete workflow.",
				"Each pattern uses shared design tokens so color, typography, spacing, radius, and interaction states remain consistent when the product is extended.",
			],
		},
		{
			id: "product-compatibility",
			title: "Compatibility",
			paragraphs: [
				`${product.title} is prepared for ${product.platform} and uses predictable, maintainable conventions instead of page-specific visual overrides.`,
				"Review the included documentation before installing the package in an existing production environment.",
			],
		},
		{
			id: "product-documentation",
			title: "Documentation and support",
			paragraphs: [
				"Setup guidance covers installation, customization, updates, and the most common integration decisions.",
				"Purchase access includes six months of product support and future maintenance releases for the licensed version.",
			],
		},
	];
	const tableOfContents = [
		...articleBlocks.map((block) => ({
			label: block.title,
			href: `#${block.id}`,
		})),
		{ label: "Reviews", href: "#customer-reviews" },
	];

	const content: ProductDetailPageSource = {
		pageHeader: {
			breadcrumb: {
				label: "Breadcrumb",
				items: [
					{ label: "Products", href: "/products" },
					{
						label: product.category,
						href: `/products/category/${product.categorySlug}`,
					},
				],
				current: product.title,
			},
			category: {
				label: product.category,
				href: `/products/category/${product.categorySlug}`,
			},
			title: product.title,
			description: product.description,
			badge: product.badge,
			images: [
				product,
				...products.filter((item) => item.slug !== product.slug).slice(0, 4),
			].map((item) => ({
				src: item.image,
				alt: `${product.title} demo view`,
				width: 900,
				height: 562,
			})),
			galleryLabel: `${product.title} gallery`,
			thumbnailLabel: "Select preview",
			rating: {
				value: product.rating,
				maximum: 5,
				count: product.reviews,
				salesLabel: "1,248 sales",
			},
			price: {
				current: `$${product.price}`,
				previous: product.oldPrice ? `$${product.oldPrice}` : undefined,
				discount: product.oldPrice
					? `-${Math.round((1 - product.price / product.oldPrice) * 100)}%`
					: undefined,
			},
			features: [
				{ icon: "check", label: "Single-site license" },
				{ icon: "check", label: "Six months of support" },
				{ icon: "check", label: "Lifetime product updates" },
				{ icon: "check", label: "30-day guarantee" },
			],
			facts: [
				{
					icon: "calendar03",
					label: "Last updated",
					value: "20 Apr, 2024",
				},
				{
					icon: "arrowPath",
					label: "Version",
					value: product.badge ?? "1.0.0",
				},
				{
					icon: "globeAlt",
					label: "Compatible",
					value: product.platform,
				},
				{
					icon: "bolt",
					label: "Performance",
					value: "A (98%)",
				},
				{
					icon: "archiveBox",
					label: "Package size",
					value: "12.5 MB",
				},
			],
			actionsLabel: `${product.title} actions`,
			actions: [
				{
					label: "Add to cart",
					href: `mailto:hello@nkt.studio?subject=${encodeURIComponent(product.title)}`,
					icon: "shoppingBag",
					variant: "primary",
				},
				{
					label: "View demo",
					href: product.image,
					icon: "arrowUpRight",
					variant: "outline",
				},
			],
			paymentLabel: "Secure payment",
			paymentMethods: [
				{
					src: "/uploads/payment-visa.svg",
					alt: "Visa",
					width: 80,
					height: 32,
				},
				{
					src: "/uploads/payment-mastercard.svg",
					alt: "Mastercard",
					width: 80,
					height: 32,
				},
				{
					src: "/uploads/payment-paypal.svg",
					alt: "PayPal",
					width: 80,
					height: 32,
				},
				{
					src: "/uploads/payment-apple-pay.svg",
					alt: "Apple Pay",
					width: 80,
					height: 32,
				},
			],
		},
		article: {
			label: "On this page",
			blocks: articleBlocks,
			tableOfContents,
		},
		reviews: {
			id: "customer-reviews",
			eyebrow: "Customer reviews",
			title: `What customers say about ${product.title}`,
			summary: {
				score: product.rating,
				maximum: 5,
				totalLabel: `Based on ${product.reviews} reviews`,
				distribution: [
					{ label: "5 stars", value: 92 },
					{ label: "4 stars", value: 6 },
					{ label: "3 stars", value: 1 },
					{ label: "2 stars", value: 0.5 },
					{ label: "1 star", value: 0.5 },
				],
			},
			items: [
				{
					name: "Huy Nguyen",
					date: "2 weeks ago",
					quote: "Flexible, polished, and quick to configure for a real launch.",
					rating: 5,
				},
				{
					name: "Lan Anh",
					date: "1 month ago",
					quote: "The clearest product package our team has evaluated this year.",
					rating: 5,
				},
				{
					name: "Minh Tri",
					date: "1 month ago",
					quote: "Modern presentation, useful demos, and a predictable setup process.",
					rating: 5,
				},
			],
		},
		related: {
			eyebrow: "Related products",
			title: "You may also like",
			items: products
				.filter((item) => item.slug !== product.slug)
				.slice(0, 5)
				.map(mapProductToCard),
		},
		support: {
			id: "product-support",
			title: "Need help before purchasing?",
			description: "Our team can help you choose the right product for your needs.",
			image: {
				src: "/uploads/patten-2.png",
				alt: "",
				width: 1536,
				height: 1024,
			},
			action: {
				href: "mailto:hello@nkt.studio",
				label: "Contact us",
			},
		},
	};

	return {
		product: {
			title: product.title,
			description: product.description,
		},
		builder: {
			layout: {
				template: "fluid",
			},
			regions: [
				{
					key: "summary",
					component: "page-header",
					placement: "header",
					section: {
						theme: "canvas",
						spacing: "compact",
						container: "site",
					},
					props: {
						template: "gallery-summary",
						data: content.pageHeader,
					},
				},
				{
					key: "content",
					component: "article",
					section: {
						id: "product-content",
						theme: "canvas",
						spacing: "compact",
						container: "site",
					},
					props: {
						blocks: content.article.blocks,
						toc: {
							appearance: "panel",
							label: content.article.label,
							items: content.article.tableOfContents,
							position: "start",
							sticky: true,
						},
					},
				},
				{
					key: "reviews",
					component: "reviews",
					section: {
						theme: "canvas",
						spacing: "compact",
						container: "site",
					},
					props: content.reviews,
				},
				{
					key: "related",
					component: "cards",
					section: {
						theme: "canvas",
						spacing: "compact",
						container: "site",
					},
					props: {
						header: {
							data: {
								label: content.related.eyebrow,
								title: content.related.title,
							},
							headingLevel: 2,
						},
						cards: {
							template: "media-summary",
							layout: "grid",
							columns: 5,
							gap: "md",
							items: content.related.items,
							slots: {
								action: false,
								excerpt: false,
							},
						},
					},
				},
				{
					key: "support",
					component: "cta",
					placement: "cta",
					section: {
						theme: "canvas",
						spacing: "compact",
						container: "site",
					},
					props: {
						template: "inline",
						data: content.support,
					},
				},
			],
		},
	};
}

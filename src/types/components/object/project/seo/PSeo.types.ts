export interface SeoImage {
	src: string;
	alt: string;
	width?: number;
	height?: number;
}

export interface SeoRobots {
	index?: boolean;
	follow?: boolean;
}

export interface SeoBreadcrumbItem {
	label: string;
	href: string;
}

export type SeoOpenGraphType = "website" | "article";

export interface SeoBlogPostEntity {
	kind: "blog-post";
	headline: string;
	description: string;
	author: string;
	publishedAt: string;
	modifiedAt?: string;
	image?: SeoImage;
	category?: string;
	keywords?: string[];
}

export interface SeoCreativeWorkEntity {
	kind: "creative-work";
	name: string;
	description: string;
	creator?: string;
	image?: SeoImage;
	keywords?: string[];
	datePublished?: string;
	dateModified?: string;
}

export interface SeoProductEntity {
	kind: "product";
	name: string;
	description: string;
	image?: SeoImage;
	category?: string;
	rating?: number;
	reviewCount?: number;
}

export type SeoEntity =
	| SeoBlogPostEntity
	| SeoCreativeWorkEntity
	| SeoProductEntity;

export interface SeoPageData {
	title?: string;
	description?: string;
	canonicalPath?: string;
	image?: SeoImage;
	type?: SeoOpenGraphType;
	robots?: SeoRobots;
	publishedAt?: string;
	modifiedAt?: string;
	breadcrumbs?: SeoBreadcrumbItem[];
	entity?: SeoEntity;
}

export interface SeoSiteIdentity {
	name: string;
	shortName: string;
	role: string;
	location: string;
	email: string;
	logo?: string;
	language: string;
	sameAs: string[];
}

export interface NormalizedSeoPage {
	title: string;
	description: string;
	canonicalUrl: string;
	image?: SeoImage & { src: string };
	type: SeoOpenGraphType;
	robots: string;
	locale: string;
	publishedAt?: string;
	modifiedAt?: string;
	breadcrumbs: SeoBreadcrumbItem[];
	entity?: SeoEntity;
}

export interface PSeoProps {
	site: SeoSiteIdentity;
	title: string;
	description: string;
	language: string;
	seo?: SeoPageData;
}

export type JsonLdValue =
	| string
	| number
	| boolean
	| null
	| JsonLdValue[]
	| JsonLdObject;

export interface JsonLdObject {
	[key: string]: JsonLdValue | undefined;
}

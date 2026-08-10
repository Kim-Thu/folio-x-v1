export interface Product {
	id: number;
	slug: string;
	title: string;
	category: string;
	categorySlug: string;
	platform: string;
	description: string;
	price: number;
	oldPrice?: number;
	rating: number;
	reviews: number;
	badge?: string;
	image: string;
}

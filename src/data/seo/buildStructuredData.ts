import type {
	JsonLdObject,
	NormalizedSeoPage,
	SeoSiteIdentity,
} from "@/types/components/object/project/seo/PSeo.types";

function absoluteUrl(value: string, origin: URL): string {
	return new URL(value, origin).toString();
}

function personReference(name: string | undefined, site: SeoSiteIdentity, personId: string): JsonLdObject {
	if (!name || name === site.name) {
		return { "@id": personId };
	}
	return { "@type": "Person", name };
}

export function buildStructuredData(
	page: NormalizedSeoPage,
	site: SeoSiteIdentity,
	siteUrl: URL,
): JsonLdObject {
	const origin = new URL("/", siteUrl).toString();
	const personId = `${origin}#person`;
	const websiteId = `${origin}#website`;
	const webpageId = `${page.canonicalUrl}#webpage`;
	const graph: JsonLdObject[] = [
		{
			"@type": "Person",
			"@id": personId,
			name: site.name,
			jobTitle: site.role,
			email: `mailto:${site.email}`,
			url: origin,
			homeLocation: site.location,
			image: site.logo ? absoluteUrl(site.logo, siteUrl) : undefined,
			sameAs: site.sameAs.length > 0 ? site.sameAs : undefined,
		},
		{
			"@type": "WebSite",
			"@id": websiteId,
			url: origin,
			name: site.name,
			alternateName: site.shortName,
			inLanguage: site.language,
			publisher: { "@id": personId },
		},
	];

	let breadcrumbId: string | undefined;
	if (page.breadcrumbs.length > 0) {
		breadcrumbId = `${page.canonicalUrl}#breadcrumb`;
		graph.push({
			"@type": "BreadcrumbList",
			"@id": breadcrumbId,
			itemListElement: page.breadcrumbs.map((item, index) => ({
				"@type": "ListItem",
				position: index + 1,
				name: item.label,
				item: absoluteUrl(item.href, siteUrl),
			})),
		});
	}

	graph.push({
		"@type": "WebPage",
		"@id": webpageId,
		url: page.canonicalUrl,
		name: page.title,
		description: page.description,
		inLanguage: site.language,
		isPartOf: { "@id": websiteId },
		about: { "@id": personId },
		breadcrumb: breadcrumbId ? { "@id": breadcrumbId } : undefined,
		primaryImageOfPage: page.image ? { "@type": "ImageObject", url: page.image.src } : undefined,
	});

	const entity = page.entity;
	if (entity?.kind === "blog-post") {
		graph.push({
			"@type": "BlogPosting",
			"@id": `${page.canonicalUrl}#article`,
			mainEntityOfPage: { "@id": webpageId },
			headline: entity.headline,
			description: entity.description,
			datePublished: entity.publishedAt,
			dateModified: entity.modifiedAt ?? entity.publishedAt,
			author: personReference(entity.author, site, personId),
			publisher: { "@id": personId },
			image: entity.image ? absoluteUrl(entity.image.src, siteUrl) : undefined,
			articleSection: entity.category,
			keywords: entity.keywords?.length ? entity.keywords.join(", ") : undefined,
		});
	}

	if (entity?.kind === "creative-work") {
		graph.push({
			"@type": "CreativeWork",
			"@id": `${page.canonicalUrl}#creative-work`,
			mainEntityOfPage: { "@id": webpageId },
			name: entity.name,
			description: entity.description,
			creator: personReference(entity.creator, site, personId),
			image: entity.image ? absoluteUrl(entity.image.src, siteUrl) : undefined,
			keywords: entity.keywords?.length ? entity.keywords.join(", ") : undefined,
			datePublished: entity.datePublished,
			dateModified: entity.dateModified,
		});
	}

	if (entity?.kind === "product") {
		graph.push({
			"@type": "Product",
			"@id": `${page.canonicalUrl}#product`,
			mainEntityOfPage: { "@id": webpageId },
			name: entity.name,
			description: entity.description,
			image: entity.image ? absoluteUrl(entity.image.src, siteUrl) : undefined,
			category: entity.category,
			aggregateRating:
				entity.rating !== undefined && entity.reviewCount && entity.reviewCount > 0
					? {
						"@type": "AggregateRating",
						ratingValue: entity.rating,
						reviewCount: entity.reviewCount,
						bestRating: 5,
					}
					: undefined,
		});
	}

	return {
		"@context": "https://schema.org",
		"@graph": graph,
	};
}

export function serializeStructuredData(value: JsonLdObject): string {
	return JSON.stringify(value).replace(/</g, "\\u003c");
}

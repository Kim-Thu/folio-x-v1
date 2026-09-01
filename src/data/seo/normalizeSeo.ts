import type {
	NormalizedSeoPage,
	PSeoProps,
	SeoImage,
} from "@/types/components/object/project/seo/PSeo.types";

interface NormalizeSeoInput extends PSeoProps {
	currentUrl: URL;
	siteUrl?: URL;
}

function absoluteUrl(value: string, origin: URL): string {
	return new URL(value, origin).toString();
}

function normalizeImage(image: SeoImage | undefined, origin: URL) {
	if (!image) return undefined;
	return {
		...image,
		src: absoluteUrl(image.src, origin),
	};
}

export function normalizeSeo({
	site,
	title,
	description,
	language,
	seo,
	currentUrl,
	siteUrl,
}: NormalizeSeoInput): NormalizedSeoPage {
	const origin = siteUrl ?? new URL(currentUrl.origin);
	const canonicalPath = seo?.canonicalPath ?? currentUrl.pathname;
	const canonicalUrl = absoluteUrl(canonicalPath, origin);
	const image = normalizeImage(
		seo?.image ?? (site.logo ? { src: site.logo, alt: site.name } : undefined),
		origin,
	);
	const index = seo?.robots?.index ?? true;
	const follow = seo?.robots?.follow ?? true;

	return {
		title: seo?.title ?? title,
		description: seo?.description ?? description,
		canonicalUrl,
		image,
		type: seo?.type ?? "website",
		robots: `${index ? "index" : "noindex"},${follow ? "follow" : "nofollow"}`,
		locale: language.replace("-", "_"),
		publishedAt: seo?.publishedAt,
		modifiedAt: seo?.modifiedAt,
		breadcrumbs: seo?.breadcrumbs ?? [],
		entity: seo?.entity,
	};
}

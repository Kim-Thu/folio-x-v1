export function normalizePagePath(value: string): string {
	const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
	if (withLeadingSlash === "/") return "/";
	return withLeadingSlash.endsWith("/")
		? withLeadingSlash
		: `${withLeadingSlash}/`;
}

export function toAbsolutePageUrl(value: string, origin: URL): string {
	return new URL(normalizePagePath(value), origin).toString();
}

export function toAbsoluteUrl(value: string, origin: URL): string {
	return new URL(value, origin).toString();
}

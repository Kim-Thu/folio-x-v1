export function readCommaSeparatedParam(
	params: URLSearchParams,
	name: string,
): string[] {
	const value = params.get(name);
	if (!value) return [];

	return value
		.split(",")
		.map((item) => item.trim())
		.filter(Boolean);
}

export function writeCommaSeparatedParam(
	params: URLSearchParams,
	name: string,
	values: string[],
): void {
	if (values.length) {
		params.set(name, values.join(","));
		return;
	}

	params.delete(name);
}

export function buildUrlWithSearchParams(
	pathname: string,
	params: URLSearchParams,
	hash = "",
): string {
	const query = params.toString();
	return `${pathname}${query ? `?${query}` : ""}${hash}`;
}

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

export function readBoundedNumberParam(
	params: URLSearchParams,
	name: string,
	minimum: number,
	maximum: number,
): number | undefined {
	const rawValue = params.get(name);
	if (rawValue === null || rawValue.trim() === "") return undefined;

	const value = Number(rawValue);
	if (!Number.isFinite(value) || value < minimum || value > maximum) {
		return undefined;
	}

	return value;
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

export function writeOptionalParam(
	params: URLSearchParams,
	name: string,
	value: string | undefined,
): void {
	if (value) {
		params.set(name, value);
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

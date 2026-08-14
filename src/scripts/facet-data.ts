export type FacetData = Record<string, string[]>;

const isRecord = (value: unknown): value is Record<string, unknown> =>
	Boolean(value) && typeof value === "object" && !Array.isArray(value);

export function parseFacetData(element: HTMLElement): FacetData {
	const raw = element.dataset.facets;
	if (!raw) return {};

	try {
		const parsed: unknown = JSON.parse(raw);
		if (!isRecord(parsed)) return {};

		return Object.fromEntries(
			Object.entries(parsed).flatMap(([key, value]) => {
				if (!Array.isArray(value)) return [];
				const items = value.filter((item): item is string => typeof item === "string");
				return [[key, items] as const];
			}),
		);
	} catch {
		return {};
	}
}

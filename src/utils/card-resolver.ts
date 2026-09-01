import type {
	CCardData,
	CCardPresentation,
	CCardSource,
} from "@/types/components/object/component/card/CCard.types";
import {
	resolveInsightCard,
	resolveLabCard,
	resolvePublicationCard,
} from "@/utils/card";

interface MultiSourceCardInput {
	data: CCardData;
	source?: CCardSource;
	presentation?: CCardPresentation;
}

export function resolveMultiSourceCard(input: MultiSourceCardInput) {
	const { data, source } = input;
	const insightCard = source === "blog" ? resolveInsightCard(input) : undefined;
	const labCard = source === "labs" ? resolveLabCard(input) : undefined;
	const publicationCard = source === "comics"
		|| source === "novels"
		|| source === "publications"
		? resolvePublicationCard(input)
		: undefined;

	return {
		source,
		insightCard,
		labCard,
		publicationCard,
		href: insightCard?.href ?? labCard?.href ?? publicationCard?.href ?? data.href,
		title: insightCard?.title ?? labCard?.title ?? publicationCard?.title ?? data.title.join(" "),
		excerpt: insightCard?.excerpt ?? labCard?.excerpt ?? publicationCard?.excerpt ?? data.excerpt,
		media: insightCard?.media ?? labCard?.media ?? publicationCard?.media ?? data.media,
		ariaLabel: insightCard?.title ?? labCard?.ariaLabel ?? publicationCard?.ariaLabel ?? data.ariaLabel,
		metadata: insightCard?.metadata ?? labCard?.metadata ?? publicationCard?.metadata ?? data.metadata,
		facets: insightCard?.facets ?? labCard?.facets ?? publicationCard?.facets ?? data.facets,
		searchValue: insightCard?.searchValue
			?? labCard?.searchValue
			?? publicationCard?.searchValue
			?? data.searchValue
			?? data.title.join(" "),
		sortValue: insightCard?.sortValue ?? publicationCard?.sortValue ?? data.sortValue,
	};
}

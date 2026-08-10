export interface CTagData {
	href?: string;
	label: string;
}

export interface CTagsProps {
	items: readonly CTagData[];
	label: string;
}

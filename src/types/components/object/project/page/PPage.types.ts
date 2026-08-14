export type PPageTemplate =
	| "stacked"
	| "lead-content"
	| "lead-content-closing"
	| "lead-content-navigation"
	| "lead-navigation-content";

export interface PPageProps {
	template?: PPageTemplate;
}

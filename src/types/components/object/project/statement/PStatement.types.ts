import type { HTMLAttributes } from "astro/types";

export interface PStatementData {
	label: string;
	primary: string;
	secondary: string;
}

export interface PStatementProps extends Omit<HTMLAttributes<"div">, "class"> {
	data: PStatementData;
	template?: "split";
}

import type { HTMLAttributes } from "astro/types";

export interface CSkipLinkProps extends Omit<HTMLAttributes<"a">, "href"> {
	href: string;
}

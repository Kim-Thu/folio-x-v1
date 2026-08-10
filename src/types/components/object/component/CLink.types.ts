import type { HTMLAttributes } from "astro/types";

export interface CLinkProps extends Omit<
	HTMLAttributes<"a">,
	"class" | "href" | "rel" | "target"
> {
	href: string;
	class?: string | null;
	nofollow?: boolean;
	rel?: string | null;
	target?: HTMLAttributes<"a">["target"];
}

import type { CIconName } from "@/types/components/object/component/CIcon.types";
import type { HTMLAttributes } from "astro/types";

export type CButtonIconPosition = "start" | "end";
export type CButtonSize = "xs" | "sm" | "md" | "lg";
export type CButtonTone = "dark" | "light";
export type CButtonVariant =
	"primary" | "secondary" | "outline" | "ghost" | "text" | "text-subtle" | "pagination" | "tab" | "view";

interface CButtonCommonProps {
	class?: string;
	label: string;
	icon?: CIconName;
	iconOnly?: boolean;
	iconPosition?: CButtonIconPosition;
	size?: CButtonSize;
	tone?: CButtonTone;
	variant?: CButtonVariant;
	wide?: boolean;
}

export interface CButtonLinkProps
	extends
		CButtonCommonProps,
		Omit<HTMLAttributes<"a">, "class" | "href" | "type"> {
	href: string;
	nofollow?: boolean;
	type?: never;
}

export interface CButtonElementProps
	extends CButtonCommonProps, Omit<HTMLAttributes<"button">, "class"> {
	href?: never;
	nofollow?: never;
}

export type CButtonProps = CButtonLinkProps | CButtonElementProps;

export interface CButtonStyleOptions {
	iconOnly: boolean;
	size: CButtonSize;
	tone: CButtonTone;
	variant: CButtonVariant;
	wide: boolean;
}

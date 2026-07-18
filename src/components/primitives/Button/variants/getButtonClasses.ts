import type {
	ButtonSize,
	ButtonStyleOptions,
	ButtonTone,
	ButtonVariant,
} from "@/types/ui";
import { twJoin } from "@/utils/cn";

const baseClasses =
	"group/button inline-flex cursor-pointer items-center justify-center border-hairline border-transparent font-medium leading-none no-underline transition-colors duration-interaction disabled:cursor-not-allowed disabled:opacity-disabled aria-disabled:cursor-not-allowed aria-disabled:opacity-disabled aria-pressed:border-brand aria-pressed:bg-brand aria-pressed:text-on-brand";

const sizeClasses: Record<ButtonSize, string> = {
	sm: "text-xs",
	md: "text-sm",
	lg: "text-base",
};

const paddingClasses: Record<ButtonSize, string> = {
	sm: "px-sm py-xs",
	md: "px-md py-sm",
	lg: "px-lg py-md",
};

const iconSizeClasses: Record<ButtonSize, string> = {
	sm: "size-control-sm",
	md: "size-control-md",
	lg: "size-control-lg",
};

const toneClasses: Record<
	ButtonTone,
	Record<Exclude<ButtonVariant, "primary" | "text">, string>
> = {
	dark: {
		secondary: "bg-on-dark text-surface-dark",
		outline:
			"border-button-outline bg-button-surface text-on-dark backdrop-blur-button-outline hover:border-brand",
		ghost: "bg-transparent text-on-dark hover:bg-surface-hover",
	},
	light: {
		secondary: "bg-on-light text-surface-light",
		outline:
			"border-line-light bg-transparent text-on-light hover:border-brand",
		ghost: "bg-transparent text-on-light hover:bg-surface-hover-light",
	},
};

const variantClasses: Record<
	Extract<ButtonVariant, "primary" | "text">,
	string
> = {
	primary: "bg-surface-dark text-on-dark-muted hover:bg-surface-dark-soft",
	text: "rounded-none border-0 bg-transparent p-0 hover:text-brand-soft",
};

const textToneClasses: Record<ButtonTone, string> = {
	dark: "text-on-dark",
	light: "text-on-light",
};

export function getButtonClasses({
	iconOnly = false,
	size,
	tone,
	variant,
}: ButtonStyleOptions): string {
	const shapeClasses = variant === "text" ? "" : "rounded-full";
	const dimensionClasses = iconOnly
		? `${iconSizeClasses[size]} aspect-square p-0`
		: variant === "text"
			? sizeClasses[size]
			: `${paddingClasses[size]} ${sizeClasses[size]}`;
	const appearanceClasses =
		variant === "primary"
			? variantClasses.primary
			: variant === "text"
				? `${variantClasses.text} ${textToneClasses[tone]}`
				: toneClasses[tone][variant];

	return twJoin(baseClasses, shapeClasses, dimensionClasses, appearanceClasses);
}

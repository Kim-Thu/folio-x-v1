import type {
	CButtonSize,
	CButtonStyleOptions,
	CButtonTone,
	CButtonVariant,
} from "@/types/components/object/component/CButton.types";
import type { CIconName } from "@/types/components/object/component/CIcon.types";
import { twJoin } from "@/utils/cn";

const buttonBaseClasses =
	"group/button relative z-10 inline-flex cursor-pointer items-center justify-center justify-self-start font-medium leading-none no-underline transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-pressed:bg-blue-600 aria-pressed:text-black";

const buttonSizeClasses: Record<CButtonSize, string> = {
	xs: "gap-2 px-3 py-2 text-xs",
	sm: "gap-2 px-4 py-2 text-sm",
	md: "gap-2 px-6 py-3 text-base",
	lg: "gap-3 px-8 py-4 text-base",
};

const buttonTextSizeClasses: Record<CButtonSize, string> = {
	xs: "gap-2 text-xs",
	sm: "gap-2 text-sm",
	md: "gap-2 text-base",
	lg: "gap-3 text-base",
};

const buttonIconOnlySizeClasses: Record<CButtonSize, string> = {
	xs: "size-8 p-0",
	sm: "size-8 p-0",
	md: "size-10 p-0",
	lg: "size-12 p-0",
};

const buttonPaginationSizeClasses: Record<CButtonSize, string> = {
	xs: "size-10 p-0 text-sm",
	sm: "size-10 p-0 text-sm",
	md: "size-10 p-0 text-sm",
	lg: "size-10 p-0 text-sm",
};

const buttonVariantSizeClasses: Record<
	CButtonVariant,
	Record<CButtonSize, string>
> = {
	primary: buttonSizeClasses,
	secondary: buttonSizeClasses,
	outline: buttonSizeClasses,
	ghost: buttonSizeClasses,
	text: buttonTextSizeClasses,
	"text-subtle": buttonTextSizeClasses,
	pagination: buttonPaginationSizeClasses,
	tab: buttonSizeClasses,
	view: buttonSizeClasses,
};

const buttonShapeClasses: Record<CButtonVariant, string> = {
	primary: "rounded-full",
	secondary: "rounded-full",
	outline: "rounded-full",
	ghost: "rounded-full",
	text: "rounded-none",
	"text-subtle": "rounded-none",
	pagination: "rounded-lg",
	tab: "rounded-full",
	view: "rounded-lg",
};

const buttonAppearanceClasses: Record<
	CButtonTone,
	Record<CButtonVariant, string>
> = {
	dark: {
		primary: "bg-blue-600 text-white hover:bg-blue-400",
		secondary: "bg-white text-black",
		outline:
			"ring-1 ring-inset ring-gray-10/12 bg-black/18 backdrop-blur-sm text-white hover:bg-gray-10/4",
		ghost: "bg-transparent text-white hover:bg-black/18",
		text: "bg-transparent text-white hover:text-blue-400",
		"text-subtle": "bg-transparent text-gray-400 hover:text-white",
		pagination:
			"bg-white/80 text-black ring-1 ring-inset ring-gray-10/12 backdrop-blur-sm hover:ring-gray-10/12 aria-[current=page]:bg-black aria-[current=page]:text-white",
		tab: "shrink-0 whitespace-nowrap bg-white/80 text-black ring-1 ring-inset ring-gray-10/12 backdrop-blur-sm hover:text-blue-600 hover:ring-gray-10/12 aria-pressed:bg-white aria-pressed:text-black",
		view: "bg-white/80 text-black ring-1 ring-inset ring-gray-10/12 backdrop-blur-sm hover:bg-gray-10/4 hover:ring-gray-10/12 aria-pressed:bg-white aria-pressed:text-black",
	},
	light: {
		primary: "bg-blue-600 text-white hover:bg-blue-400",
		secondary: "bg-black text-white hover:bg-black/90",
		outline:
			"bg-white/80 text-black ring-1 ring-inset ring-gray-100 backdrop-blur-sm hover:ring-gray-100 hover:text-blue-600",
		ghost: "bg-transparent text-black hover:bg-gray-10/4",
		text: "bg-transparent text-black hover:text-blue-400",
		"text-subtle": "bg-transparent text-gray-500 hover:text-black",
		pagination:
			"bg-white/80 text-black ring-1 ring-inset ring-gray-10/12 backdrop-blur-sm hover:ring-gray-10/12 aria-[current=page]:bg-black aria-[current=page]:text-white",
		tab: "shrink-0 whitespace-nowrap bg-white/80 text-black ring-1 ring-inset ring-gray-10/12 backdrop-blur-sm hover:text-blue-600 hover:ring-gray-10/12 aria-pressed:bg-black aria-pressed:text-white",
		view: "bg-white/80 text-black ring-1 ring-inset ring-gray-10/12 backdrop-blur-sm hover:bg-gray-10/4 hover:ring-gray-10/12 aria-pressed:bg-black aria-pressed:text-white",
	},
};

export function getCButtonCurrentClasses(): string {
	// Active pagination styling is driven by the live aria-current attribute.
	// Do not emit a server-side color class: it would remain on page 1 after
	// client-side pagination moves the active state to another button.
	return "";
}

const buttonIconMotionClasses: Record<CIconName, string> = {
	arrowLeft: "group-hover/button:-translate-x-1",
	arrowRight: "group-hover/button:translate-x-1",
	arrowUp: "group-hover/button:-translate-y-1",
	arrowUpRight:
		"group-hover/button:translate-x-1 group-hover/button:-translate-y-1",
	arrowPath: "",
	archiveBox: "",
	bars3: "",
	bolt: "",
	calendar03: "",
	check: "",
	chevronLeft: "group-hover/button:-translate-x-1",
	chevronDown: "",
	chevronRight: "group-hover/button:translate-x-1",
	clock01: "",
	folder01: "",
	github: "",
	globeAlt: "",
	lightBulb: "",
	linkedin: "",
	link: "",
	facebook: "",
	twitter: "",
	userCircle: "",
	xMark: "",
	gridView: "",
	listView: "",
	play: "",
	search: "",
	shoppingBag: "",
	star: "",
	questionMarkCircle: "",
	bookOpen: "",
	bookmark: "",
	eye: "",
	lockClosed: "",
	adjustmentsHorizontal: "",
	moon: "",
	handThumbUp: "",
	heart: "",
	faceSmile: "",
	faceFrown: "",
};

export function getCButtonIconClasses(icon: CIconName): string {
	return twJoin(
		"inline-flex transition-transform duration-300",
		buttonIconMotionClasses[icon],
	);
}

export function getCButtonClasses({
	iconOnly,
	size,
	tone,
	variant,
	wide,
}: CButtonStyleOptions): string {
	let sizeClasses = buttonVariantSizeClasses[variant][size];

	if (variant !== "pagination" && iconOnly) {
		sizeClasses = buttonIconOnlySizeClasses[size];
	}

	return twJoin(
		buttonBaseClasses,
		buttonShapeClasses[variant],
		sizeClasses,
		buttonAppearanceClasses[tone][variant],
		wide ? "w-full" : "",
	);
}

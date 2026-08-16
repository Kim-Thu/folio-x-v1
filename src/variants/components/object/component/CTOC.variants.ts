import type { CTOCAppearance } from "@/types/components/object/component/CTOC.types";

export const tocBaseClasses = "self-start";

export const tocAppearanceClasses: Record<CTOCAppearance, string> = {
	plain: "",
	panel:
		"rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-gray-100 backdrop-blur-sm",
};

export const tocStickyClasses = "sticky top-24";

export const tocTitleClasses =
	"block font-mono uppercase tracking-widest";

export const tocListClasses: Record<CTOCAppearance, string> = {
	plain: "mt-5 flex flex-col border-l border-gray-100",
	panel: "mt-5 flex flex-col gap-1",
};

export const tocLinkClasses: Record<CTOCAppearance, string> = {
	plain:
		"-ml-px block border-l border-transparent py-2 pl-6 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-600",
	panel:
		"block rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-black",
};

export const tocLinkCurrentClasses: Record<CTOCAppearance, string> = {
	plain: "border-blue-600 font-medium text-black",
	panel: "bg-gray-50 font-medium text-black",
};

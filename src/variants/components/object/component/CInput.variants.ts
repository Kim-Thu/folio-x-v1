import type { CInputTone } from "@/types/components/object/component/CInput.types";

export const inputBaseClasses =
	"min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none focus-visible:ring-0";

export const inputToneClasses: Record<CInputTone, string> = {
	dark: "text-white placeholder:text-gray-500",
	light: "text-black placeholder:text-gray-500",
};

import type { LSidebarPosition } from "@/types/components/layout/LSidebar.types";

export const sidebarLayoutClasses =
	"grid grid-cols-1 items-start gap-8 lg:grid-cols-12";

export const sidebarAsideClasses = "min-w-0 lg:col-span-3";
export const sidebarAsidePositionClasses: Record<LSidebarPosition, string> = {
	start: "order-1 lg:order-1",
	end: "order-2 lg:order-2",
};
export const sidebarStickyClasses = "lg:sticky lg:top-28";
export const sidebarContentClasses = "min-w-0 lg:col-span-9";
export const sidebarContentPositionClasses: Record<LSidebarPosition, string> = {
	start: "order-2 lg:order-2",
	end: "order-1 lg:order-1",
};

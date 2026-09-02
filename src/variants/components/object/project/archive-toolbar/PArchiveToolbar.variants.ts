import type { PArchiveToolbarSelectVisibility } from "@/types/components/object/project/archive-toolbar/PArchiveToolbar.types";

export const archiveToolbarClasses = "relative z-40";

export const archiveToolbarGridClasses = "items-center";

export const archiveToolbarActionsClasses = "min-w-0 justify-end";

export const archiveToolbarSearchClasses = "w-full";

export const archiveToolbarSelectVisibilityClasses: Record<
	PArchiveToolbarSelectVisibility,
	string
> = {
	all: "",
	mobile: "lg:hidden",
};

export const archiveToolbarViewClasses = "shrink-0";

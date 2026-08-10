import type {
	CPostNavigationItem,
	CPostNavigationProps,
} from "@/types/components/object/component/CPostNavigation.types";

export type PPostNavigationItem = CPostNavigationItem;

export interface PPostNavigationProps extends CPostNavigationProps {
	template?: PPostNavigationTemplate;
}

export type PPostNavigationTemplate = "split";

import type {
	CButtonIconPosition,
} from "@/types/components/object/component/CButton.types";
import type { CIconName } from "@/types/components/object/component/CIcon.types";

export interface CButtonContentProps {
	label: string;
	icon?: CIconName;
	iconOnly: boolean;
	iconPosition: CButtonIconPosition;
}

import type {
  CChoiceGroupAppearance,
  CChoiceGroupControl,
  CChoiceGroupType,
  CChoiceOption,
} from "@/types/components/object/component/CChoiceGroup.types";
import type { CRangeProps } from "@/types/components/object/component/CRange.types";
import type { CRatingProps } from "@/types/components/object/component/CRating.types";

export interface PFilterChoiceGroupData {
  appearance?: CChoiceGroupAppearance;
  control: CChoiceGroupControl;
  legend: string;
  name: string;
  options: CChoiceOption[];
  type: CChoiceGroupType;
}

export interface PFilterPanelData {
  groups?: PFilterChoiceGroupData[];
  category?: PFilterChoiceGroupData;
  filterLabel?: string;
  license?: PFilterChoiceGroupData;
  platform?: PFilterChoiceGroupData;
  range?: CRangeProps;
  ratings?: {
    legend: string;
    name: string;
    options: Array<Pick<CRatingProps, "count" | "value">>;
  };
}

export interface PFilterPanelProps {
  data: PFilterPanelData;
}

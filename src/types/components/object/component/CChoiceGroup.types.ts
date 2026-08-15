import type { HTMLAttributes } from "astro/types";

export type CChoiceGroupControl =
  | "category"
  | "genre"
  | "license"
  | "platform"
  | "status"
  | "technology";
export type CChoiceGroupType = "checkbox" | "radio";
export type CChoiceGroupAppearance = "controls" | "navigation";

export interface CChoiceOption {
  label: string;
  value: string;
  href?: string;
  count?: number;
  checked?: boolean;
}

export interface CChoiceGroupProps extends Omit<
  HTMLAttributes<"fieldset">,
  "class"
> {
  class?: string;
  appearance?: CChoiceGroupAppearance;
  control: CChoiceGroupControl;
  legend: string;
  name: string;
  options: CChoiceOption[];
  type?: CChoiceGroupType;
}

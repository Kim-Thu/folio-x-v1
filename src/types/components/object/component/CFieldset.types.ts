import type { HTMLAttributes } from "astro/types";

export type CFieldsetGap = "xs" | "sm" | "md";

export interface CFieldsetProps extends Omit<
  HTMLAttributes<"fieldset">,
  "class"
> {
  class?: string;
  gap?: CFieldsetGap;
  legend: string;
}

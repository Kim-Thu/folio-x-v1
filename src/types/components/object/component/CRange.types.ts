import type { HTMLAttributes } from "astro/types";

export interface CRangeProps extends Omit<
  HTMLAttributes<"input">,
  "class" | "id" | "max" | "min" | "type" | "value"
> {
  class?: string;
  id: string;
  label: string;
  max: number;
  maxSuffix?: string;
  min: number;
  name: string;
  prefix?: string;
  value: number;
}

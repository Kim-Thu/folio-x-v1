import type { HTMLAttributes } from "astro/types";

export type CColumnsElement =
  | "article"
  | "aside"
  | "div"
  | "dl"
  | "footer"
  | "header"
  | "section"
  | "span"
  | "ul";

export type CColumnsTemplate =
  | "one"
  | "two"
  | "three"
  | "four"
  | "five"
  | "compact-three"
  | "twelve";

export type CColumnsGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type CColumnsSeparator = "none" | "light" | "dark";
export type CColumnsAlign = "start" | "center" | "end" | "stretch";
export type CColumnsScrollMargin = "none" | "header";

export interface CColumnsProps extends Omit<HTMLAttributes<"div">, "class"> {
  as?: CColumnsElement;
  columns?: CColumnsTemplate;
  gap?: CColumnsGap;
  align?: CColumnsAlign;
  scrollMargin?: CColumnsScrollMargin;
  separator?: CColumnsSeparator;
  class?: string;
}

import { twJoin, twMerge } from "tailwind-merge";

/** Merge class layers that may conflict. Pass the intended override last. */
export const cn = twMerge;

/** Join approved internal variants that do not accept caller overrides. */
export { twJoin };

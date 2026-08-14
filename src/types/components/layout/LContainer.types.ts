import type { HTMLAttributes } from 'astro/types';

export type LContainerSize = "site" | "content" | "article";

export interface LContainerProps
  extends Omit<HTMLAttributes<'div'>, 'class'> {
  class?: string;
  size?: LContainerSize;
}

import type { HTMLAttributes } from 'astro/types';

export interface LHeaderProps
  extends Omit<HTMLAttributes<'header'>, 'class'> {
  solid?: boolean;
  tone?: "dark" | "light";
}

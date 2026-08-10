import type { HTMLAttributes } from 'astro/types';

export type CInputTone = "dark" | "light";

export interface CInputProps extends Omit<HTMLAttributes<'input'>, 'class'> {
  class?: never;
  tone?: CInputTone;
}

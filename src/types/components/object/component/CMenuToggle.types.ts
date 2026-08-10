import type { HTMLAttributes } from 'astro/types';

export interface CMenuToggleProps
  extends Omit<HTMLAttributes<'button'>, 'class' | 'type'> {
  controls: string;
  openLabel: string;
  closeLabel: string;
  tone?: "dark" | "light";
}

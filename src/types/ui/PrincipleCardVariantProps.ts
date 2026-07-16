import type { PrincipleCardProps } from '@/types/ui/PrincipleCardProps';

export interface PrincipleCardVariantProps extends Omit<PrincipleCardProps, 'title' | 'variant'> {
  titleLines: readonly string[];
}

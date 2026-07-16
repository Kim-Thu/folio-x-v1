import type { ButtonTone, FilterBarProps } from '@/types/ui';

export function getFilterBarTone(theme: NonNullable<FilterBarProps['theme']>): ButtonTone {
  return theme;
}

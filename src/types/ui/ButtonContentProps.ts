import type { IconName } from '@/types/ui/IconName';
import type { ButtonIconPosition } from '@/types/ui/ButtonCommonProps';

export interface ButtonContentProps {
  label: string;
  icon?: IconName;
  iconPosition: ButtonIconPosition;
  iconClass?: string;
}

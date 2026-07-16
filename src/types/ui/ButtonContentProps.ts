import type { HeroIconName } from './HeroIconName';
import type { ButtonIconPosition } from './ButtonCommonProps';

export interface ButtonContentProps {
  label: string;
  icon?: HeroIconName;
  iconPosition: ButtonIconPosition;
}

import type { HeroIconName } from '../ui/HeroIconName';

export interface SystemStateAction {
  href: string;
  label: string;
  icon?: HeroIconName;
}

export interface SystemStateContent {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: SystemStateAction;
  secondaryAction?: SystemStateAction;
  metadataTitle: string;
  metadataDescription: string;
}

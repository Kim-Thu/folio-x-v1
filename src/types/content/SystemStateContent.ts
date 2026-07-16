import type { IconName } from '@/types/ui/IconName';

export interface SystemStateAction {
  href: string;
  label: string;
  icon?: IconName;
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

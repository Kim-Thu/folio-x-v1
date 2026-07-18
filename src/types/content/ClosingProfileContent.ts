export interface ClosingProfilePortrait {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ClosingProfilePortraits {
  collapsed: ClosingProfilePortrait;
  expanded: ClosingProfilePortrait;
}

export interface ClosingProfileAction {
  label: string;
  href: string;
}

export interface ClosingProfileContent {
  id: string;
  eyebrow: string;
  nameLines: string[];
  roleLabel: string;
  followAction: ClosingProfileAction;
  emailActionLabel: string;
  locationLabel: string;
  portraits?: ClosingProfilePortraits;
}

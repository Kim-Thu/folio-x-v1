export interface SectionHeadingToneClasses {
  kicker: string;
  description: string;
}

export function getSectionHeadingToneClasses(dark: boolean): SectionHeadingToneClasses {
  return dark
    ? { kicker: 'text-on-dark-muted', description: 'text-on-dark-muted' }
    : { kicker: 'text-on-light-muted', description: 'text-on-light-muted' };
}

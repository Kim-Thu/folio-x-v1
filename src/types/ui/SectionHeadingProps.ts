export interface SectionHeadingProps {
  id: string;
  number: string;
  label: string;
  title: string;
  description?: string;
  tone?: SectionHeadingTone;
}

export type SectionHeadingTone = 'dark' | 'light';

export interface SectionHeadingToneClasses {
  kicker: string;
  description: string;
}

export interface PrincipleCardProps {
  index: string;
  href: string;
  label: string;
  title: string | readonly string[];
  variant: 'statement' | 'graphic' | 'image';
  description?: string;
  image?: string;
  imageAlt?: string;
}

export interface CLogoAsset {
  src: string;
  width?: number;
  height?: number;
}

export type CLogoSize = 'sm' | 'md' | 'lg';
export type CLogoTone = 'default' | 'light' | 'dark';

export interface CLogoProps {
  siteName: string;
  href?: string;
  image?: CLogoAsset;
  lightImage?: CLogoAsset;
  darkImage?: CLogoAsset;
  tagline?: string;
  showTagline?: boolean;
  size?: CLogoSize;
  tone?: CLogoTone;
}

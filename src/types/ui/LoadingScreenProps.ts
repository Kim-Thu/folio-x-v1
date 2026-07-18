export interface LoadingScreenImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface LoadingScreenProps {
  label: string;
  status: string;
  tips?: string[];
  holdOpen?: boolean;
  progressLabel: string;
  image?: LoadingScreenImage;
}

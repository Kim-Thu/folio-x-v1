import type { Project } from '@/types/content/Project';

export type ProjectCardVariant = 'tile' | 'archive';

export interface ProjectCardBaseProps {
  project: Project;
}

export interface TileProjectCardProps extends ProjectCardBaseProps {
  variant?: 'tile';
  linkLabel: string;
  outcomeLabel: string;
}

export interface ArchiveProjectCardProps extends ProjectCardBaseProps {
  variant: 'archive';
}

export type ProjectCardProps = TileProjectCardProps | ArchiveProjectCardProps;

export interface ProjectCardMetaProps {
  project: Project;
  showNumber?: boolean;
}

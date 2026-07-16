import type { Project } from '@/types/content/Project';

export interface ProjectCardProps {
  project: Project;
  reverse?: boolean;
  linkLabel: string;
  outcomeLabel: string;
}

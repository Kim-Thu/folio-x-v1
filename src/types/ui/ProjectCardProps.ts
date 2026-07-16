import type { Project } from '../content/Project';

export interface ProjectCardProps {
  project: Project;
  reverse?: boolean;
  linkLabel: string;
  outcomeLabel: string;
}

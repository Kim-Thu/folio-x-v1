import type { Project } from '@/types/content';

export interface ProjectGridProps {
  id: string;
  projects: Project[];
  linkLabel: string;
  outcomeLabel: string;
}

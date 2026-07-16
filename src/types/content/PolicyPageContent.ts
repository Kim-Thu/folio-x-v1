import type { PolicySection } from './PolicySection';

export interface PolicyPageContent {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  sections: PolicySection[];
}

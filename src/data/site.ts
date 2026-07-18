import { getHomepageSettings, getInsights, getNavigationSettings, getProjects, getSiteSettings } from '@/data/cms';

const [siteSettings, navigationSettings, homepageSettings, projectEntries, insightEntries] = await Promise.all([
  getSiteSettings(),
  getNavigationSettings(),
  getHomepageSettings(),
  getProjects(),
  getInsights(),
]);

export const site = siteSettings.site;
export const navItems = navigationSettings.navItems ?? [];
export const footerNavItems = navigationSettings.footerNavItems ?? [];
export const resourceLinks = navigationSettings.resourceLinks ?? [];
export const legalLinks = navigationSettings.legalLinks ?? [];
export const socialLinks = navigationSettings.socialLinks ?? [];
export const projects = projectEntries;
export const insights = insightEntries;
export const faqs = homepageSettings.faqs;

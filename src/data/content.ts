import { getFooterSettings, getHomepageSettings, getInterfaceSettings, getSiteSettings } from '@/data/cms';

const [siteSettings, homepageSettings, interfaceSettings, footerSettings] = await Promise.all([
  getSiteSettings(),
  getHomepageSettings(),
  getInterfaceSettings(),
  getFooterSettings(),
]);

export const metadata = siteSettings.metadata;
export const interfaceContent = interfaceSettings;
export const headerContent = homepageSettings.header;
export const heroContent = homepageSettings.hero;
export const aboutContent = homepageSettings.about;
export const worksContent = homepageSettings.works;
export const insightsContent = homepageSettings.insights;
export const qaContent = homepageSettings.qa;
export const ctaContent = homepageSettings.cta;
export const footerContent = footerSettings;

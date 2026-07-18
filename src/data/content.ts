import {
  getClosingProfileSettings,
  getFooterSettings,
  getHomepageSettings,
  getInterfaceSettings,
  getSiteSettings,
} from '@/data/cms';
import type { ClosingProfileContent } from '@/types/content';

const [siteSettings, homepageSettings, interfaceSettings, footerSettings, closingProfileSettings] = await Promise.all(
  [
    getSiteSettings(),
    getHomepageSettings(),
    getInterfaceSettings(),
    getFooterSettings(),
    getClosingProfileSettings(),
  ],
);

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
export const closingProfileContent: ClosingProfileContent = closingProfileSettings;

const fallbackSiteOrigin = "https://folio-x-v1.netlify.app";

export const siteOrigin = process.env.SITE_URL ?? fallbackSiteOrigin;

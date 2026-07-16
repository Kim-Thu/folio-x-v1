const HTTP_PROTOCOLS = new Set(['http:', 'https:']);

export const isExternalUrl = (href: string, siteUrl: URL): boolean => {
  try {
    const url = new URL(href, siteUrl);

    return HTTP_PROTOCOLS.has(url.protocol) && url.origin !== siteUrl.origin;
  } catch {
    return false;
  }
};

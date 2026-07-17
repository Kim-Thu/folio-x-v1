export function getTaxonomyLinksLabelClass(tone: 'dark' | 'light'): string {
  return tone === 'dark' ? 'text-on-dark-faint' : 'text-on-light-subtle';
}

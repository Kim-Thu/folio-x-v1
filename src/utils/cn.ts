import { extendTailwindMerge, twJoin } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      aspect: ['cta-banner', 'editorial'],
      blur: ['button-outline'],
      color: [
        'brand', 'brand-soft', 'button-outline', 'button-surface', 'line-dark', 'line-light',
        'on-brand', 'on-dark', 'on-dark-faint', 'on-dark-muted', 'on-dark-subtle',
        'on-light', 'on-light-muted', 'on-light-subtle', 'skeleton-base', 'skeleton-highlight',
        'surface-dark', 'surface-hover', 'surface-hover-light', 'surface-light',
      ],
      container: ['site'],
      ease: ['reveal'],
      radius: ['card'],
      spacing: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', 'icon-inline', 'icon-social', 'control-sm', 'control-md', 'control-lg', 'loading-visual', 'viewport'],
      text: ['caption', 'label', 'h1', 'h2', 'h3', 'display', 'profile-name', 'svg-profile-name', 'svg-profile-role'],
      tracking: ['contact', 'meta', 'eyebrow'],
    },
    classGroups: {
      'bg-image': [{ bg: ['grid-dots', 'hero-side', 'hero-floor'] }],
      'border-w': [{ border: ['hairline', 'principle-orbit'] }],
      'border-w-b': [{ 'border-b': ['hairline'] }],
      'border-w-t': [{ 'border-t': ['hairline'] }],
      'grid-cols': [{ 'grid-cols': ['index-content'] }],
      duration: [{ duration: ['interaction', 'loader', 'reduced-motion', 'reveal', 'skeleton'] }],
      opacity: [{ opacity: ['disabled'] }],
      scale: [{ scale: ['media'] }],
      z: [{ z: ['footer-reveal', 'footer-surface', 'loading-screen', 'skip-link'] }],
    },
  },
});

export const cn = customTwMerge;
export { twJoin };

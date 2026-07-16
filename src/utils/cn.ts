import { extendTailwindMerge, twJoin } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      aspect: ['editorial'],
      blur: ['button-outline'],
      container: ['site'],
      ease: ['reveal'],
      radius: ['card'],
      spacing: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', 'icon-inline', 'control-sm', 'control-md', 'control-lg', 'viewport'],
      text: ['caption', 'label', 'h1', 'h2', 'h3', 'display'],
      tracking: ['contact', 'meta', 'eyebrow'],
    },
    classGroups: {
      'bg-image': [{ bg: ['grid-dots', 'hero-side', 'hero-floor'] }],
      'border-w': [{ border: ['hairline', 'principle-orbit'] }],
      'border-w-b': [{ 'border-b': ['hairline'] }],
      'border-w-t': [{ 'border-t': ['hairline'] }],
      'grid-cols': [{ 'grid-cols': ['index-content'] }],
      opacity: [{ opacity: ['disabled'] }],
      scale: [{ scale: ['media'] }],
    },
  },
});

export const cn = customTwMerge;
export { twJoin };

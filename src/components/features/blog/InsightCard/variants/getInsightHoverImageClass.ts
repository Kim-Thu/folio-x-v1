const rotationClasses = [
  '[--rotate-insight-hover:var(--rotate-hover-image-a)]',
  '[--rotate-insight-hover:var(--rotate-hover-image-b)]',
  '[--rotate-insight-hover:var(--rotate-hover-image-c)]',
  '[--rotate-insight-hover:var(--rotate-hover-image-d)]',
] as const;

export function getInsightHoverImageClass(index: string): string {
  const numericIndex = Number.parseInt(index, 10);
  const rotationIndex = Number.isNaN(numericIndex) ? 0 : Math.abs(numericIndex - 1) % rotationClasses.length;

  return rotationClasses[rotationIndex];
}

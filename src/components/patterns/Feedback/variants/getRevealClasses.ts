export function getRevealClasses(): string {
  return 'translate-y-6 opacity-0 transition duration-reveal ease-reveal data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100';
}

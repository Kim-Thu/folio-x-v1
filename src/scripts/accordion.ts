export function initAccordion(): void {
  const accordions = [...document.querySelectorAll<HTMLDetailsElement>('.faq')];

  accordions.forEach((accordion) => {
    accordion.addEventListener('toggle', () => {
      if (!accordion.open) return;

      accordions.forEach((otherAccordion) => {
        if (otherAccordion !== accordion) otherAccordion.open = false;
      });
    });
  });
}

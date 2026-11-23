/** 38 → « 38 € », 37.5 → « 37,50 € » */
export const euro = (n: number) =>
  n.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  });

/** Minuscules sans accents, pour la recherche (« Tiramisù » → « tiramisu ») */
export const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();

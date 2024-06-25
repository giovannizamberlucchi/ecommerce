export const formatCurrency = (number?: number | null): string | null => {
  if (number === null || number === undefined) return null;

  const baseFormattedCurrency = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'code',
  }).format(number);

  return baseFormattedCurrency.replace('USD', '€ HT');
};

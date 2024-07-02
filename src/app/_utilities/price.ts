const priceOption = {
  oneTime: '',
  monthly: 'Mensuel',
  yearly: 'Annuel',
};

export const getPriceOption = (option: string): string => {
  return priceOption[option] || priceOption['oneTime'];
};

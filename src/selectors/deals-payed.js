// Get Deal Payed

export default (deals, utente) => {
  if (utente.role === 'Mitarbeiter') {
    return deals
      .filter(deal => deal.payed)
      .map(deal => deal.provvStefano)
      .reduce((sum, value) => sum + value, 0);
  } else {
    return deals
      .filter(deal => deal.payed)
      .map(deal => deal.provvM2square)
      .reduce((sum, value) => sum + value, 0);
  }
};

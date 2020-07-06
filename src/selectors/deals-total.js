// Get Deal Total

export default (deals, utente = 'Mitarbeiter') => {
  if (utente.role === 'Mitarbeiter') {
    return deals
      .map((deal) => deal.provvStefano)
      .reduce((sum, value) => sum + value, 0);
  } else {
    return deals
      .map((deal) => deal.provvM2square)
      .reduce((sum, value) => sum + value, 0);
  }
};

// Get Deal Payed

export default (deals, utente, fatture) => {
  if (utente.role === 'Mitarbeiter') {
    return deals
      .filter(deal => deal.payedAtStefano)
      .map(deal => deal.provvStefano)
      .reduce((sum, value) => sum + value, 0);
  } else {
    return (
      deals
        .filter(deal =>
          fatture.find(fattura => fattura.dealId === deal.id && fattura.payed)
        )
        // .filter(deal => deal.payed)
        .map(deal => deal.provvM2square)
        .reduce((sum, value) => sum + value, 0)
    );
  }
};

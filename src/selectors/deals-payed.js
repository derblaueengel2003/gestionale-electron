// Get Deal Payed

export default (deals, utente = 'Mitarbeiter', fatture) => {
  if (utente.role === 'Mitarbeiter') {
    return deals
      .filter((deal) => deal.payedStefano)
      .map((deal) => deal.provvStefano)
      .reduce((sum, value) => sum + value, 0);
  } else {
    const dealsFatturati = deals
      .filter((deal) =>
        fatture.find((fattura) => fattura.dealId === deal.id && fattura.payed)
      )
      .map((deal) => deal.provvM2square)
      .reduce((sum, value) => sum + value, 0);

    const dealsGutschrift = deals
      .filter((deal) => deal.feePayed)
      .map((deal) => deal.provvM2square)
      .reduce((sum, value) => sum + value, 0);

    return dealsFatturati + dealsGutschrift;
  }
};

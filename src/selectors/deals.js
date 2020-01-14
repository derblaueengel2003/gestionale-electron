import moment from 'moment';

// Get visible deals
//viene chiamato due volte da DealsSummary e da DealList!

export default (
  deals,
  { text, sortBy, startDate, endDate },
  oggetti,
  clienti,
  utente,
  fatture
) => {
  return deals
    .filter(deal => {
      const oggetto = oggetti.find(ogg => ogg.id === deal.oggettoId) || {
        rifId: 'n/a',
        via: 'n/a',
        numeroCivico: 'n/a',
        numeroAppartamento: 'n/a',
        cap: 'n/a',
        citta: 'n/a'
      };
      const acquirente = clienti.find(
        cliente => cliente.id === deal.acquirenteId
      );
      const acquirente2 = clienti.find(
        cliente => cliente.id === deal.acquirenteId2
      );
      const venditore = clienti.find(
        cliente => cliente.id === deal.venditoreId
      );
      const venditore2 = clienti.find(
        cliente => cliente.id === deal.venditoreId2
      );
      let indirizzo = `${acquirente.nome} ${acquirente.cognome} ${acquirente.ditta} ${oggetto.rifId} ${oggetto.via} ${oggetto.numeroCivico} ${oggetto.numeroAppartamento} ${oggetto.cap} ${oggetto.citta}`;
      acquirente2
        ? (indirizzo += `${acquirente2.nome} ${acquirente2.cognome} ${acquirente2.ditta}`)
        : indirizzo;
      venditore
        ? (indirizzo += `${venditore.nome} ${venditore.cognome} ${venditore.ditta}`)
        : indirizzo;
      venditore2
        ? (indirizzo += `${venditore2.nome} ${venditore2.cognome} ${venditore2.ditta}`)
        : indirizzo;
      const dealFatture = fatture.find(fattura => fattura.dealId === deal.id);

      // il match delle date lo faccio sulla data di emissione della fattura anche per avere un'idea concreta degli incassi dell'anno.
      // I deals che non sono ancora fatturati appaiono come primi
      const createdAtMoment = dealFatture
        ? moment(dealFatture.dataFattura)
        : moment();
      const startDateMatch =
        startDate && createdAtMoment
          ? startDate.isSameOrBefore(createdAtMoment, 'day')
          : true;
      const endDateMatch =
        endDate && createdAtMoment
          ? endDate.isSameOrAfter(createdAtMoment, 'day')
          : true;
      const textMatch = indirizzo.toLowerCase().includes(text.toLowerCase());
      const sellerMatch = deal.provvStefano > 0;

      if (utente.role === 'Mitarbeiter') {
        return startDateMatch && endDateMatch && textMatch && sellerMatch;
      } else {
        return startDateMatch && endDateMatch && textMatch;
      }
    })
    .sort((a, b) => {
      if (utente.role === 'Mitarbeiter') {
        if (sortBy === 'date') {
          return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
          return a.provvStefano < b.provvStefano ? 1 : -1;
        } else if (sortBy === 'paid') {
          return a.payedStefano > b.payedStefano ? 1 : -1;
        }
      } else {
        if (sortBy === 'date') {
          return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
          return a.provvM2square < b.provvM2square ? 1 : -1;
        } else if (sortBy === 'paid') {
          return a.payed > b.payed ? 1 : -1;
        }
      }
    });
};

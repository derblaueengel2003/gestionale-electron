import moment from 'moment';

// Get visible deals
//viene chiamato due volte da DealsSummary e da DealList!

export default (
  nomeLista,
  payload,
  { text, sortBy, startDate, endDate },
  utente,
  oggetti,
  clienti,
  fatture
) => {
  return payload
    .filter((item) => {
      const findCliente = (customerId) =>
        clienti.find((cliente) => cliente.id === customerId);

      let searchString = '';
      let createdAtMoment = moment();

      if (nomeLista === 'deals') {
        // il match delle date lo faccio sulla data di emissione della fattura anche per avere un'idea concreta degli incassi dell'anno.
        // I deals che non sono ancora fatturati appaiono come primi
        const dealFatture =
          fatture && fatture.find((fattura) => fattura.dealId === item.id);

        createdAtMoment = dealFatture
          ? moment(dealFatture.dataFattura)
          : createdAtMoment;

        const oggetto = oggetti.find((ogg) => ogg.id === item.oggettoId) || {
          rifId: 'n/a',
          via: 'n/a',
          numeroCivico: 'n/a',
          numeroAppartamento: 'n/a',
          cap: 'n/a',
          citta: 'n/a',
        };
        const acquirente = findCliente(item.acquirenteId);
        const acquirente2 = findCliente(item.acquirenteId2);
        const venditore = findCliente(item.venditoreId);
        const venditore2 = findCliente(item.venditoreId2);

        oggetto
          ? (searchString += ` ${oggetto.rifId} ${oggetto.via} ${oggetto.numeroCivico} ${oggetto.numeroAppartamento} ${oggetto.cap} ${oggetto.citta}`)
          : searchString;
        acquirente
          ? (searchString += `${acquirente.nome} ${acquirente.cognome} ${acquirente.ditta}`)
          : searchString;
        acquirente2
          ? (searchString += `${acquirente2.nome} ${acquirente2.cognome} ${acquirente2.ditta}`)
          : searchString;
        venditore
          ? (searchString += `${venditore.nome} ${venditore.cognome} ${venditore.ditta}`)
          : searchString;
        venditore2
          ? (searchString += `${venditore2.nome} ${venditore2.cognome} ${venditore2.ditta}`)
          : searchString;
      }

      // se non ho oggetti, vuol dire che il payload è gli oggetti
      if (nomeLista === 'oggetti') {
        createdAtMoment = moment(item.dataModificaOggetto);
        searchString = `${item.citta} ${item.cap} ${item.nazione} ${item.numeroCivico} ${item.numeroAppartamento} ${item.quartiere} ${item.rifId} ${item.via}`;
      }

      if (nomeLista === 'clienti') {
        createdAtMoment = moment(item.dataRegistrazione);
        searchString = `${item.nome} ${item.cognome} ${item.ditta}`;
      }

      const startDateMatch =
        startDate && createdAtMoment
          ? startDate.isSameOrBefore(createdAtMoment, 'day')
          : true;

      const endDateMatch =
        endDate && createdAtMoment
          ? endDate.isSameOrAfter(createdAtMoment, 'day')
          : true;

      const textMatch = searchString.toLowerCase().includes(text.toLowerCase());

      const sellerMatch = item.provvStefano > 0;

      if (utente.role === 'Mitarbeiter') {
        return startDateMatch && endDateMatch && textMatch && sellerMatch;
      } else {
        return startDateMatch && endDateMatch && textMatch;
      }
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ||
          a.dataModificaOggetto < b.dataModificaOggetto ||
          a.dataRegistrazione < b.dataRegistrazione
          ? 1
          : -1;
      } else if (sortBy === 'amount') {
        return a.provvStefano < b.provvStefano ? 1 : -1;
      } else if (sortBy === 'paid') {
        return a.payedStefano > b.payedStefano ? 1 : -1;
      } else if (sortBy === 'name') {
        return a.via > b.via || a.cognome > b.cognome ? 1 : -1;
      }
    });
};

import moment from 'moment';

// Get visible deals
// per i deals viene chiamato due volte da DealsSummary e da DealList!

export default (
  nomeLista,
  payload,
  { text, sortBy, startDate, endDate },
  utente,
  oggetti,
  clienti,
  fatture,
  deals
) => {
  return payload
    .filter((item) => {
      const findCliente = (customerId) =>
        clienti.find((cliente) => cliente.id === customerId);
      const findOggetto = (oggettoId) =>
        oggetti.find((ogg) => ogg.id === oggettoId);

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

        oggetto &&
          (searchString += ` ${oggetto.rifId} ${oggetto.via} ${oggetto.numeroCivico} ${oggetto.numeroAppartamento} ${oggetto.cap} ${oggetto.citta}`);

        acquirente &&
          (searchString += `${acquirente.nome} ${acquirente.cognome} ${acquirente.ditta}`);

        acquirente2 &&
          (searchString += `${acquirente2.nome} ${acquirente2.cognome} ${acquirente2.ditta}`);

        venditore &&
          (searchString += `${venditore.nome} ${venditore.cognome} ${venditore.ditta}`);

        venditore2 &&
          (searchString += `${venditore2.nome} ${venditore2.cognome} ${venditore2.ditta}`);
      }

      if (nomeLista === 'oggetti') {
        createdAtMoment = moment(item.dataModificaOggetto);
        searchString = `${item.citta} ${item.cap} ${item.nazione} ${item.numeroCivico} ${item.numeroAppartamento} ${item.quartiere} ${item.rifId} ${item.via}`;
      }

      if (nomeLista === 'clienti') {
        createdAtMoment = moment(item.dataRegistrazione);
        searchString = `${item.nome} ${item.cognome} ${item.ditta} ${item.email} ${item.telefono1} ${item.cellulare}`;
      }

      if (nomeLista === 'fatture') {
        createdAtMoment = moment(item.dataFattura);

        const deal = deals.find((deal) => deal.id === item.dealId);
        const oggetto = deal
          ? oggetti.find((ogg) => ogg.id === deal.oggettoId)
          : '';
        const cliente = findCliente(item.clienteId);
        const cliente2 = findCliente(item.clienteId2);

        cliente &&
          (searchString += `${cliente.nome} ${cliente.cognome} ${cliente.ditta}`);

        cliente2 &&
          (searchString += `${cliente2.nome} ${cliente2.cognome} ${cliente2.ditta}`);

        oggetto &&
          (searchString += `${oggetto.rifId} ${oggetto.via} ${oggetto.numeroCivico} ${oggetto.numeroAppartamento} ${oggetto.cap} ${oggetto.citta}`);

        item.numeroFattura && (searchString += `${item.numeroFattura}`);
      }

      if (nomeLista === 'evaluations') {
        createdAtMoment = moment(item.dataEvaluation);

        searchString += `${item.titolo}`;
      }

      if (nomeLista === 'newsletters') {
        createdAtMoment = moment(item.dataNewsletter);
        const oggetto1 = item.oggetto1 ? findOggetto(item.oggetto1).rifId : '';
        const oggetto2 = item.oggetto2 ? findOggetto(item.oggetto2).rifId : '';
        const oggetto3 = item.oggetto3 ? findOggetto(item.oggetto3).rifId : '';
        const oggetto4 = item.oggetto4 ? findOggetto(item.oggetto4).rifId : '';
        const oggetto5 = item.oggetto5 ? findOggetto(item.oggetto5).rifId : '';
        const oggetto6 = item.oggetto6 ? findOggetto(item.oggetto6).rifId : '';

        searchString += `${oggetto1}${oggetto2}${oggetto3}${oggetto4}${oggetto5}${oggetto6}`;
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

      // if (utente.role === 'Mitarbeiter') {
      //   return startDateMatch && endDateMatch && textMatch && sellerMatch;
      // } else {
      //   return startDateMatch && endDateMatch && textMatch;
      // }
      return startDateMatch && endDateMatch && textMatch;
    })

    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ||
          a.dataModificaOggetto < b.dataModificaOggetto ||
          a.dataRegistrazione < b.dataRegistrazione ||
          a.dataFattura < b.dataFattura
          ? 1
          : -1;
      } else if (sortBy === 'amount') {
        return a.provvStefano < b.provvStefano ? 1 : -1;
      } else if (sortBy === 'paid') {
        return a.payedStefano > b.payedStefano ? 1 : -1;
      } else if (sortBy === 'name') {
        return a.via > b.via ||
          a.cognome > b.cognome ||
          a.numeroFattura > b.numeroFattura
          ? 1
          : -1;
      }
    });
};

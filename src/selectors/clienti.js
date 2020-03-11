import moment from 'moment';

// Get visible customers

export default (
  clienti,
  { cliente, sortClientiBy, startDateClienti, endDateClienti }
) => {
  return clienti
    .filter(ilcliente => {
      const nameMatch = ilcliente.nome
        .toLowerCase()
        .includes(cliente.toLowerCase());
      const cognomeMatch = ilcliente.cognome
        .toLowerCase()
        .includes(cliente.toLowerCase());
      const dittaMatch = ilcliente.ditta
        .toLowerCase()
        .includes(cliente.toLowerCase());
      const createdAtMoment = ilcliente.dataRegistrazione
        ? moment(ilcliente.dataRegistrazione)
        : false;
      const startDateMatch = startDateClienti
        ? startDateClienti.isSameOrBefore(createdAtMoment, 'day')
        : true;
      const endDateMatch = endDateClienti
        ? endDateClienti.isSameOrAfter(createdAtMoment, 'day')
        : true;
      return (
        (nameMatch || cognomeMatch || dittaMatch) &&
        startDateMatch &&
        endDateMatch
      );
    })
    .sort((a, b) => {
      if (sortClientiBy === 'name') {
        return a.cognome > b.cognome ? 1 : -1;
      } else if (sortClientiBy === 'registration') {
        return a.dataRegistrazione > b.dataRegistrazione ? 1 : -1;
      } else if (sortClientiBy === 'dsgvo') {
        return a.consensoDSGVO > b.consensoDSGVO ? 1 : -1;
      }
    });
};

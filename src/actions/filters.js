// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

//SET_FATTURA_FILTER
export const setFatturaFilter = (fattura = '') => ({
  type: 'SET_FATTURA_FILTER',
  fattura
});
//SET_OGGETTO_FILTER
export const setOggettoFilter = (oggetto = '') => ({
  type: 'SET_OGGETTO_FILTER',
  oggetto
});
// SORT_BY_DATE
export const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

//SORT_BY_PAID
export const sortByPaid = () => ({
  type: 'SORT_BY_PAID'
});

//SET_START_DATE
export const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate
});

//SET_END_DATE
export const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate
});
//SET_CLIENTE_FILTER
export const setClienteFilter = (cliente = '') => ({
  type: 'SET_CLIENTE_FILTER',
  cliente
});
//SET_START_DATE_CLIENTI
export const setStartDateClienti = startDateClienti => ({
  type: 'SET_START_DATE_CLIENTI',
  startDateClienti
});

//SET_END_DATE_CLIENTI
export const setEndDateClienti = endDateClienti => ({
  type: 'SET_END_DATE_CLIENTI',
  endDateClienti
});
//SORT_CLIENTI_BY_DSGVO
export const sortClientiByDSGVO = () => ({
  type: 'SORT_CLIENTI_BY_DSGVO'
});
//SORT_CLIENTI_BY_NAME
export const sortClientiByName = () => ({
  type: 'SORT_CLIENTI_BY_NAME'
});
//SORT_CLIENTI_BY_REGISTRATION
export const sortClientiByRegistration = () => ({
  type: 'SORT_CLIENTI_BY_REGISTRATION'
});
// SET_LEAD_FILTER
export const setLeadsFilter = (lead = 0) => ({
  type: 'SET_LEAD_FILTER',
  lead
});

// SET_LEADSTATO_FILTER
export const setLeadsStatoFilter = leadStato => ({
  type: 'SET_LEADSTATO_FILTER',
  leadStato
});

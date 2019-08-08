// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})
//SET_CLIENTE_FILTER
export const setClienteFilter = (cliente = '') => ({
    type: 'SET_CLIENTE_FILTER',
    cliente
})
//SET_OGGETTO_FILTER
export const setOggettoFilter = (oggetto = '') => ({
    type: 'SET_OGGETTO_FILTER',
    oggetto
})
// SORT_BY_DATE
export const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

// SORT_BY_AMOUNT
export const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

//SORT_BY_PAID
export const sortByPaid = () => ({
    type: 'SORT_BY_PAID'
 })

//SET_START_DATE
export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

//SET_END_DATE
export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

// SET_LEAD_FILTER
export const setLeadsFilter = (lead = 0) => ({
    type: 'SET_LEAD_FILTER',
    lead
})

// SET_LEADSTATO_FILTER
export const setLeadsStatoFilter = (leadStato) => ({
    type: 'SET_LEADSTATO_FILTER',
    leadStato
})
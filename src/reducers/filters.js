import moment from 'moment';

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  cliente: '',
  oggetto: '',
  sortBy: 'date',
  startDate: moment().startOf('year'),
  endDate: moment().endOf('year'),
  startDateClienti: moment().startOf('year'),
  endDateClienti: moment().endOf('year'),
  sortClientiBy: 'name',
  lead: '',
  leadStato: '',
  fattura: ''
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SET_CLIENTE_FILTER':
      return {
        ...state,
        cliente: action.cliente
      };
    case 'SET_FATTURA_FILTER':
      return {
        ...state,
        fattura: action.fattura
      };
    case 'SET_OGGETTO_FILTER':
      return {
        ...state,
        oggetto: action.oggetto
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SORT_BY_PAID':
      return {
        ...state,
        sortBy: 'paid'
      };

    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    case 'SET_START_DATE_CLIENTI':
      return {
        ...state,
        startDateClienti: action.startDateClienti
      };
    case 'SET_END_DATE_CLIENTI':
      return {
        ...state,
        endDateClienti: action.endDateClienti
      };
    case 'SORT_CLIENTI_BY_NAME':
      return {
        ...state,
        sortClientiBy: 'name'
      };
    case 'SORT_CLIENTI_BY_REGISTRATION':
      return {
        ...state,
        sortClientiBy: 'registration'
      };
    case 'SORT_CLIENTI_BY_DSGVO':
      return {
        ...state,
        sortClientiBy: 'dsgvo'
      };
    case 'SET_LEAD_FILTER':
      return {
        ...state,
        lead: action.lead
      };
    case 'SET_LEADSTATO_FILTER':
      return {
        ...state,
        leadStato: action.leadStato
      };
    default:
      return state;
  }
};

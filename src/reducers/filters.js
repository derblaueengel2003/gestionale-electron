import moment from 'moment';

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('year'),
  endDate: moment().endOf('year'),
  lead: '',
  leadStato: '',
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      };
    case 'SORT_BY_PAID':
      return {
        ...state,
        sortBy: 'paid',
      };
    case 'SORT_BY_PUBLISHED':
      return {
        ...state,
        sortBy: 'published',
      };
    case 'SORT_BY_NAME':
      return {
        ...state,
        sortBy: 'name',
      };

    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate,
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate,
      };
    case 'SET_LEAD_FILTER':
      return {
        ...state,
        lead: action.lead,
      };
    case 'SET_LEADSTATO_FILTER':
      return {
        ...state,
        leadStato: action.leadStato,
      };
    default:
      return state;
  }
};

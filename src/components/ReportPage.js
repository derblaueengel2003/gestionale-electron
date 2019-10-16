import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectDeals from '../selectors/deals';
import selectDealsTotal from '../selectors/deals-total';
import selectDealsPayed from '../selectors/deals-payed';
import selectDealsPayedStefano from '../selectors/deals-payed-stefano';
import selectDealsTotalStefano from '../selectors/deals-total-stefano';

export const ReportPage = ({
  dealCount,
  dealsTotal,
  dealsPayed,
  dealsPayedStefano,
  dealsTotalStefano
}) => {
  const dealWord = dealCount === 1 ? 'Deal' : 'Deals';
  const formattedDealsTotal = numeral(dealsTotal / 100).format('0,0[.]00 $');
  const formattedDealsPayed = numeral(dealsPayed / 100).format('0,0[.]00 $');
  const formattedDealsStefano = numeral(dealsPayedStefano / 100).format(
    '0,0[.]00 $'
  );
  const formattedDealsTotalStefano = numeral(dealsTotalStefano / 100).format(
    '0,0[.]00 $'
  );
  const dealsPending = numeral((dealsTotal - dealsPayed) / 100).format(
    '0,0[.]00 $'
  );
  const dealsPendingStefano = numeral(
    (dealsTotalStefano - dealsPayedStefano) / 100
  ).format('0,0[.]00 $');

  return (
    <div className='page-header'>
      <div className='content-container'>
        <h1 className='page-header__title'>
          Zusammenfassung: <span>{dealCount}</span> {dealWord} und Gesamtbetrag
          von <span>{formattedDealsTotal}</span>
        </h1>
        <h1 className='page-header__title'>
          Erhalten: <span>{formattedDealsPayed}</span> - Offen:{' '}
          <span>{dealsPending}</span>
        </h1>
        <h2 className='page-header__title'>
          Stefano: <span>{formattedDealsTotalStefano}</span> - Bezahlt:{' '}
          <span>{formattedDealsStefano}</span> - Offen:{' '}
          <span>{dealsPendingStefano}</span>
        </h2>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleDeals = selectDeals(
    state.deals,
    state.filters,
    state.auth,
    state.oggetti,
    state.clienti
  );
  return {
    dealCount: visibleDeals.length,
    dealsTotal: selectDealsTotal(visibleDeals, state.auth),
    dealsPayed: selectDealsPayed(visibleDeals, state.auth),
    dealsPayedStefano: selectDealsPayedStefano(visibleDeals),
    dealsTotalStefano: selectDealsTotalStefano(visibleDeals)
  };
};

export default connect(mapStateToProps)(ReportPage);

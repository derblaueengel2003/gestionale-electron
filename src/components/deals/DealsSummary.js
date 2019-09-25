import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectDeals from '../../selectors/deals';
import selectDealsTotal from '../../selectors/deals-total';
import selectDealsPayed from '../../selectors/deals-payed';

export const DealsSummary = ({ dealCount, dealsTotal, dealsPayed }) => {
  const dealWord = dealCount === 1 ? 'provvigione' : 'provvigioni';
  const formattedDealsTotal = numeral(dealsTotal / 100).format('0,0[.]00 $');
  const formattedDealsPayed = numeral(dealsPayed / 100).format('0,0[.]00 $');
  const dealsPending = numeral((dealsTotal - dealsPayed) / 100).format(
    '0,0[.]00 $'
  );

  return (
    <div className='page-header page-header-deals'>
      <div className='content-container'>
        <h2 className='page-header__title'>
          Riepilogo: <span>{dealCount}</span> {dealWord} per un totale di{' '}
          <span>{formattedDealsTotal}</span>
        </h2>
        <h2 className='page-header__title'>
          Incassate: <span>{formattedDealsPayed}</span> - Pendenti:{' '}
          <span>{dealsPending}</span>
        </h2>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  //lo chiami anche da dealsList
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
    dealsPayed: selectDealsPayed(visibleDeals, state.auth, state.fatture)
  };
};

export default connect(mapStateToProps)(DealsSummary);

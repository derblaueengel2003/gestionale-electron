import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import numeral from 'numeral';
import selectDeals from '../../selectors/deals';
import selectDealsTotal from '../../selectors/deals-total';
import selectDealsPayed from '../../selectors/deals-payed';

export const DealsSummary = ({ dealCount, dealsTotal, dealsPayed, t }) => {
  const dealWord = dealCount === 1 ? 'Vendita' : 'Vendite';
  const formattedDealsTotal = numeral(dealsTotal / 100).format('0,0[.]00 $');
  const formattedDealsPayed = numeral(dealsPayed / 100).format('0,0[.]00 $');
  const dealsPending = numeral((dealsTotal - dealsPayed) / 100).format(
    '0,0[.]00 $'
  );

  return (
    <div className='container'>
      <span>{dealCount}</span> {t(dealWord)} - {t('Totale')}:{' '}
      <span>{formattedDealsTotal}</span> - {t('Incassate')}:{' '}
      <span>{formattedDealsPayed}</span> - {t('Aperte')}:{' '}
      <span>{dealsPending}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  //lo chiami anche da dealsList
  const visibleDeals = selectDeals(
    'deals',
    state.deals,
    state.filters,
    state.utenti.find((utente) => utente.firebaseAuthId === state.auth.uid),
    state.oggetti,
    state.clienti,
    state.fatture
  );

  return {
    dealCount: visibleDeals.length,
    dealsTotal: selectDealsTotal(
      visibleDeals,
      state.utenti.find((utente) => utente.firebaseAuthId === state.auth.uid)
    ),
    dealsPayed: selectDealsPayed(
      visibleDeals,
      state.utenti.find((utente) => utente.firebaseAuthId === state.auth.uid),
      state.fatture
    ),
  };
};

export default connect(mapStateToProps)(withTranslation()(DealsSummary));

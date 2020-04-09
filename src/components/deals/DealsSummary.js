import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectDeals from '../../selectors/deals';
import selectDealsTotal from '../../selectors/deals-total';
import selectDealsPayed from '../../selectors/deals-payed';
import { Translation } from 'react-i18next';

export const DealsSummary = ({ dealCount, dealsTotal, dealsPayed }) => {
  return (
    <Translation>
      {(t) => {
        const dealWord = dealCount === 1 ? 'Deal' : 'Deals';
        const formattedDealsTotal = numeral(dealsTotal / 100).format(
          '0,0[.]00 $'
        );
        const formattedDealsPayed = numeral(dealsPayed / 100).format(
          '0,0[.]00 $'
        );
        const dealsPending = numeral((dealsTotal - dealsPayed) / 100).format(
          '0,0[.]00 $'
        );

        return (
          <div className='container'>
            <span>{dealCount}</span> {t('Vendite')} - {t('Totale')}:{' '}
            <span>{formattedDealsTotal}</span> - {t('Incassate')}:{' '}
            <span>{formattedDealsPayed}</span> - {t('Aperte')}:{' '}
            <span>{dealsPending}</span>
          </div>
        );
      }}
    </Translation>
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
  // const payedDeals = visibleDeals.filter(deal =>
  //   state.fatture.find(fattura => fattura.dealId === deal.id && fattura.payed)
  // );
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

export default connect(mapStateToProps)(DealsSummary);

import React from 'react';
import { connect } from 'react-redux';
import selectDeals from '../../selectors/deals';
import selectDealsTotal from '../../selectors/deals-total';
import selectDealsPayed from '../../selectors/deals-payed';
import { Translation } from 'react-i18next';
import { formattaPrezzo } from '../common/utils';

export const DealsSummary = ({ dealCount, dealsTotal, dealsPayed }) => {
  return (
    <Translation>
      {(t) => {
        const dealWord = dealCount === 1 ? 'Deal' : 'Deals';
        const formattedDealsTotal = formattaPrezzo(dealsTotal, true);
        const formattedDealsPayed = formattaPrezzo(dealsPayed, true);
        const dealsPending = formattaPrezzo(dealsTotal - dealsPayed, true);

        return (
          <div className='container'>
            <span>{dealCount}</span>{' '}
            {t(dealCount === 1 ? 'Vendita' : 'Vendite')} - {t('Totale')}:{' '}
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

import React from 'react';
import { connect } from 'react-redux';
import { Translation } from 'react-i18next';
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
  dealsTotalStefano,
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
    <Translation>
      {(t, { i18n }) => (
        <div>
          <div className='container'>
            <h1>
              {t('Riepilogo')}: <span>{dealCount}</span> {dealWord} und
              Gesamtbetrag von <span>{formattedDealsTotal}</span>
            </h1>
            <h1>
              Erhalten: <span>{formattedDealsPayed}</span> - Offen:{' '}
              <span>{dealsPending}</span>
            </h1>
            <h1>
              Stefano: <span>{formattedDealsTotalStefano}</span> - Bezahlt:{' '}
              <span>{formattedDealsStefano}</span> - Offen:{' '}
              <span>{dealsPendingStefano}</span>
            </h1>
          </div>
        </div>
      )}
    </Translation>
  );
};

const mapStateToProps = (state) => {
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
    dealsPayedStefano: selectDealsPayedStefano(visibleDeals),
    dealsTotalStefano: selectDealsTotalStefano(visibleDeals),
  };
};

export default connect(mapStateToProps)(ReportPage);

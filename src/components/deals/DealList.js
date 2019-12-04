import React from 'react';
import { connect } from 'react-redux';
import DealListItem from './DealListItem';
import selectDeals from '../../selectors/deals';
import Card from '../Card';
import { TodoProgressBar } from './TodoProgressBar';
import moment from 'moment';
import numeral from 'numeral';

// load a locale
numeral.register('locale', 'de', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function(number) {
    return number === 1 ? 'er' : '°';
  },
  currency: {
    symbol: '€'
  }
});
// switch between locales
numeral.locale('de');
moment.locale('de');

export const DealList = ({
  clienteDeals,
  oggetti,
  clienti,
  fatture,
  utente,
  deals
}) => {
  //controllo se i dati vengono dal clienti page o sono passati via props
  const dealsPayload = clienteDeals || deals;

  return (
    <div className='container'>
      <div className='list-body'>
        {dealsPayload.length > 0 && (
          <div>
            <h5>Deals</h5>
            {dealsPayload.map(deal => {
              const oggetto = oggetti.find(ogg => ogg.id === deal.oggettoId);
              const acquirente = clienti.find(
                cliente => cliente.id === deal.acquirenteId
              );
              const acquirente2 = clienti.find(
                cliente => cliente.id === deal.acquirenteId2
              );
              const gliAcquirenti = `${
                acquirente
                  ? `Käufer: ${acquirente.nome} ${acquirente.cognome} ${acquirente.ditta}`
                  : ''
              } ${
                acquirente2
                  ? `- ${acquirente2.nome} ${acquirente2.cognome} ${acquirente2.ditta}`
                  : ''
              }`;

              const venditore = clienti.find(
                cliente => cliente.id === deal.venditoreId
              );
              const venditore2 = clienti.find(
                cliente => cliente.id === deal.venditoreId2
              );
              const iVenditori = `${
                venditore
                  ? `Verkäufer: ${venditore.nome} ${venditore.cognome} ${venditore.ditta}`
                  : ''
              } ${
                venditore2
                  ? `- ${venditore2.nome} ${venditore2.cognome} ${venditore2.ditta}`
                  : ''
              }`;
              // Determino quante fatture sono state pagate per mostrare i colori adatti. Da dealFature mi arriva un array
              const dealFatture = fatture.filter(
                fattura => fattura.dealId === deal.id
              );
              let payed = 0;
              dealFatture.map(fattura => fattura.payed && payed++);
              if (payed > 0) {
                if (payed === dealFatture.length) {
                  payed = 2;
                } else {
                  payed = 1;
                }
              }
              return (
                <Card
                  key={deal.id}
                  visible={true}
                  link={`/view/${deal.id}`}
                  utente={utente}
                  titolo={`Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}`}
                  titoloDestra={
                    utente.role === 'Mitarbeiter' ? (
                      <span
                        className={` card-title list-item__data ${deal.payedStefano &&
                          'list-item--paid'}`}
                      >
                        {numeral(deal.provvStefano / 100).format('0,0[.]00 $')}
                      </span>
                    ) : (
                      <span
                        className={` card-title list-item__data  list-item--paid${payed}`}
                      >
                        {numeral(deal.provvM2square / 100).format('0,0[.]00 $')}
                      </span>
                    )
                  }
                  sottotitolo={`${oggetto.cap} ${oggetto.citta}`}
                  linea1={
                    deal.createdAt
                      ? `Reservierung vom ${moment(deal.createdAt).format(
                          'DD MMMM, YYYY'
                        )}`
                      : null
                  }
                  linea2={gliAcquirenti}
                  linea3={iVenditori}
                  progressBar={<TodoProgressBar {...deal} />}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  //lo chiami anche da dealsSummary
  return {
    deals: selectDeals(
      state.deals,
      state.filters,
      state.oggetti,
      state.clienti,
      state.utenti.find(utente => utente.firebaseAuthId === state.auth.uid)
    ),
    oggetti: state.oggetti,
    clienti: state.clienti,
    fatture: state.fatture,
    utente: state.utenti.find(
      utente => utente.firebaseAuthId === state.auth.uid
    )
  };
};

export default connect(mapStateToProps)(DealList);

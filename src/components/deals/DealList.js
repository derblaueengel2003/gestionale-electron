import React from 'react';
import { connect } from 'react-redux';
import DealListItem from './DealListItem';
import selectDeals from '../../selectors/deals';
import { Link } from 'react-router-dom';

export const DealList = ({
  clienteDeals,
  oggetti,
  clienti,
  fatture,
  utente,
  deals
}) => {
  //controllo se i dati vengono dal clienti page o sono passati via props
  if (clienteDeals) {
    return (
      clienteDeals.length > 0 && (
        <div className='container'>
          <div className='list-header list-header-deals'>
            <div className='show-for-mobile'>Provision</div>
            <div className='show-for-desktop'>Provision</div>
            <div className='show-for-desktop'>Betrag</div>{' '}
          </div>
          <div className='list-body'>
            {clienteDeals.map(deal => {
              const oggetto = oggetti.find(ogg => ogg.id === deal.oggettoId);
              const acquirente = clienti.find(
                cliente => cliente.id === deal.acquirenteId
              );
              const acquirente2 = clienti.find(
                cliente => cliente.id === deal.acquirenteId2
              );
              const venditore = clienti.find(
                cliente => cliente.id === deal.venditoreId
              );
              const venditore2 = clienti.find(
                cliente => cliente.id === deal.venditoreId2
              );
              const dealFatture = fatture.filter(
                fattura => fattura.dealId === deal.id
              );
              return (
                <DealListItem
                  key={deal.id}
                  {...deal}
                  utente={utente}
                  oggetto={oggetto}
                  acquirente={acquirente}
                  acquirente2={acquirente2}
                  venditore={venditore}
                  venditore2={venditore2}
                  dealFatture={dealFatture}
                />
              );
            })}
          </div>
        </div>
      )
    );
  } else {
    return (
      <div className='container'>
        <div className='list-header list-header-deals'>
          <div>Provision</div>
          <div>
            {' '}
            {utente.role === 'Admin' && (
              <Link className='btn-floating green' to='/create'>
                <i className='material-icons'>add</i>
              </Link>
            )}
          </div>
        </div>
        <div className='list-body'>
          {deals.length === 0 ? (
            <div className='list-item list-item--message'>
              <span>Kein Ergebnis anhand der angegebenen Filtern</span>
            </div>
          ) : (
            deals.map(deal => {
              const oggetto = oggetti.find(ogg => ogg.id === deal.oggettoId);
              const acquirente = clienti.find(
                cliente => cliente.id === deal.acquirenteId
              );
              const acquirente2 = clienti.find(
                cliente => cliente.id === deal.acquirenteId2
              );
              const venditore = clienti.find(
                cliente => cliente.id === deal.venditoreId
              );
              const venditore2 = clienti.find(
                cliente => cliente.id === deal.venditoreId2
              );
              const dealFatture = fatture.filter(
                fattura => fattura.dealId === deal.id
              );
              // console.log(dealFatture);
              return (
                <DealListItem
                  key={deal.id}
                  {...deal}
                  utente={utente}
                  oggetto={oggetto}
                  acquirente={acquirente}
                  acquirente2={acquirente2}
                  venditore={venditore}
                  venditore2={venditore2}
                  dealFatture={dealFatture}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }
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

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
  uid,
  deals
}) => {
  //controllo se i dati vengono dal clienti page o sono passati via props
  if (clienteDeals) {
    return (
      clienteDeals.length > 0 && (
        <div className='content-container'>
          <div className='list-header list-header-deals'>
            <div className='show-for-mobile'>Provvigione</div>
            <div className='show-for-desktop'>Provvigione</div>
            <div className='show-for-desktop'>Importo</div>{' '}
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
                  oggetto={oggetto}
                  uid={uid}
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
      <div className='content-container'>
        {uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' && (
          <Link
            className='button button--secondary button--secondary-add'
            to='/create'
          >
            +
          </Link>
        )}
        {uid === 'aGOwhidD7rVXfbYrWBmKL7mNrf33' && (
          <Link
            className='button button--secondary button--secondary-add'
            to='/create'
          >
            +
          </Link>
        )}
        <div className='list-header list-header-deals'>
          <div className='show-for-mobile'>Provvigione</div>
          <div className='show-for-desktop'>Provvigione</div>
          <div className='show-for-desktop'>Importo</div>
        </div>
        <div className='list-body'>
          {deals.length === 0 ? (
            <div className='list-item list-item--message'>
              <span>Nessuna provvigione in base ai filtri inseriti</span>
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
                  oggetto={oggetto}
                  uid={uid}
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
      state.auth,
      state.oggetti,
      state.clienti
    ),
    oggetti: state.oggetti,
    clienti: state.clienti,
    fatture: state.fatture,
    uid: state.auth.uid
  };
};

export default connect(mapStateToProps)(DealList);

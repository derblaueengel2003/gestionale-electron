import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FattureListItem from './FattureListItem';
import selectFatture from '../../selectors/fatture';

export const FattureList = props => {
  //controllo se i dati vengono dalla view deal page o se sono passati via props
  if (props.dealFatture) {
    return (
      props.dealFatture.length > 0 && (
        <div className='container'>
          <div className='list-header'>
            <div>Rechnungsnummer</div>
            <div>Datum</div>
          </div>
          <div className='list-body'>
            {props.dealFatture.map(fattura => {
              const deal = props.deals.find(deal => deal.id === fattura.dealId);
              const oggetto = props.oggetti.find(
                ogg => ogg.id === deal.oggettoId
              );
              const cliente = props.clienti.find(
                ilcliente => ilcliente.id === fattura.clienteId
              );
              const cliente2 = props.clienti.find(
                ilcliente => ilcliente.id === fattura.clienteId2
              );
              return (
                <FattureListItem
                  key={fattura.id}
                  {...fattura}
                  oggetto={oggetto}
                  cliente={cliente}
                  cliente2={cliente2}
                />
              );
            })}
          </div>
        </div>
      )
    );
  } else {
    //in questo caso i dati provengono dallo state. Siamo sulla fatture dashboard page
    return (
      <div className='container'>
        <Link className='btn-floating green right' to='/fatturacreate'>
          <i className='material-icons'>add</i>
        </Link>

        {props.fatture.length === 0 ? (
          <div>
            <span>Kein Ergebnis anhand der angegebenen Filtern</span>
          </div>
        ) : (
          props.fatture.map(fattura => {
            const deal = props.deals.find(deal => deal.id === fattura.dealId);
            const oggetto = deal
              ? props.oggetti.find(ogg => ogg.id === deal.oggettoId)
              : '';
            const cliente = props.clienti.find(
              ilcliente => ilcliente.id === fattura.clienteId
            );
            const cliente2 = props.clienti.find(
              ilcliente => ilcliente.id === fattura.clienteId2
            );
            return (
              <FattureListItem
                key={fattura.id}
                {...fattura}
                oggetto={oggetto}
                cliente={cliente}
                cliente2={cliente2}
              />
            );
          })
        )}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    fatture: selectFatture(
      state.fatture,
      state.filters,
      state.oggetti,
      state.clienti,
      state.deals
    ),
    deals: state.deals,
    oggetti: state.oggetti,
    clienti: state.clienti
  };
};

export default connect(mapStateToProps)(FattureList);

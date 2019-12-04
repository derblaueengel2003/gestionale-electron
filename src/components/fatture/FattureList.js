import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FattureListItem from './FattureListItem';
import selectFatture from '../../selectors/fatture';
import Card from '../Card';
import moment from 'moment';

export const FattureList = props => {
  //controllo se i dati vengono dalla view deal page o se sono passati via props
  const fatturePayload = props.dealFatture || props.fatture;

  return (
    <div className='container'>
      {fatturePayload.length > 0 && (
        <div>
          <h5>Rechnungen</h5>
          {fatturePayload.map(fattura => {
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
            const iClienti = `${
              cliente
                ? `Kunde: ${cliente.nome} ${cliente.cognome} ${cliente.ditta}`
                : 'nichts'
            } ${
              cliente2
                ? `- ${cliente2.nome} ${cliente2.cognome} ${cliente2.ditta}`
                : ''
            }`;
            return (
              <Card
                key={fattura.id}
                visible={true}
                link={`/fatturaview/${fattura.id}`}
                titolo={
                  oggetto
                    ? `Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}`
                    : ''
                }
                sottotitolo={oggetto ? `${oggetto.cap} ${oggetto.citta}` : ''}
                titoloDestra={
                  <span
                    className={`card-title ${fattura.payed &&
                      'list-item--paid'}`}
                  >{`${fattura.numeroFattura}`}</span>
                }
                linea1={iClienti}
                linea2={moment(fattura.dataFattura).format('DD MMMM, YYYY')}
              />
            );
          })}
        </div>
      )}
    </div>
  );
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

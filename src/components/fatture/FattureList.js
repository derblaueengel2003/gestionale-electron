import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import selectFatture from '../../selectors/deals';
import Card from '../Card';
import { formattaData } from '../common/utils';

export const FattureList = (props) => {
  //controllo se i dati vengono dalla view deal page o se sono passati via props
  const fatturePayload = props.dealFatture || props.fatture;

  return (
    <div className='container'>
      {fatturePayload.length > 0 && (
        <div>
          <h5>{props.ruolo || ''}</h5>
          {fatturePayload
            .sort((a, b) => {
              return a.dataFattura > b.dataFattura ? -1 : 1;
            })
            .map((fattura) => {
              const deal = props.deals.find(
                (deal) => deal.id === fattura.dealId
              );
              const oggetto = deal
                ? props.oggetti.find((ogg) => ogg.id === deal.oggettoId)
                : '';
              const cliente = props.clienti.find(
                (ilcliente) => ilcliente.id === fattura.clienteId
              );
              const cliente2 = props.clienti.find(
                (ilcliente) => ilcliente.id === fattura.clienteId2
              );
              const iClienti = `${
                cliente
                  ? `${props.t('Cliente')}: ${cliente.nome} ${
                      cliente.cognome
                    } ${cliente.ditta}`
                  : props.t('Nessuno')
              } ${
                cliente2
                  ? `- ${cliente2.nome} ${cliente2.cognome} ${cliente2.ditta}`
                  : ''
              }`;
              const dataFattura = formattaData(fattura.dataFattura);
              return (
                <Card
                  key={fattura.id}
                  visible={true}
                  link={`/fatturaview/${fattura.id}`}
                  titolo={
                    oggetto
                      ? `Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}`
                      : fattura.descrizioneProdotto
                  }
                  sottotitolo={oggetto ? `${oggetto.cap} ${oggetto.citta}` : ''}
                  titoloDestra={
                    <span
                      className={`card-title ${
                        fattura.payed && 'list-item--paid'
                      }`}
                    >{`${fattura.numeroFattura}`}</span>
                  }
                  corpo={[iClienti, dataFattura]}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fatture: selectFatture(
      'fatture',
      state.fatture,
      state.filters,
      state.utenti.find((utente) => utente.firebaseAuthId === state.auth.uid),
      state.oggetti,
      state.clienti,
      undefined,
      state.deals
    ),
    deals: state.deals,
    oggetti: state.oggetti,
    clienti: state.clienti,
  };
};

export default connect(mapStateToProps)(withTranslation()(FattureList));

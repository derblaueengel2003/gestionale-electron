import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { startSetCustomers } from '../../actions/clienti';
import selectClienti from '../../selectors/deals';
import Card from '../Card';

export const ClientiList = ({ cliente, clienti, ruolo, t }) => {
  //controllo se i dati vengono dal deal page o se sono passati via props.
  const clientiPayload = cliente || clienti;

  return (
    <div className='container'>
      <div className='list-body'>
        {clientiPayload.length > 0 && (
          <div>
            <h5>{ruolo || `${t('Rubrica')}`}</h5>

            {clientiPayload
              .sort((a, b) => {
                return a.visible < b.visible ? -1 : 1;
              })
              .map((cliente) => {
                const dsgvo = cliente.consensoDSGVO
                  ? `${t(
                      'Consenso al trattamento dei dati personali'
                    )}:${' '}${t('sì')}`
                  : '';

                return (
                  <Card
                    key={cliente.id}
                    link={`/customerview/${cliente.id}`}
                    titolo={`${cliente.nome} ${cliente.cognome}`}
                    sottotitolo={cliente.ditta}
                    corpo={[
                      cliente.email,
                      cliente.telefono1,
                      cliente.cellulare,
                      dsgvo,
                    ]}
                    titoloDestra={
                      <div>
                        {cliente.email && (
                          <a
                            href={`mailto:${cliente.email}`}
                            className='btn-floating blue right btn-floating-margin'
                          >
                            <i className='material-icons'>email</i>
                          </a>
                        )}

                        {cliente.telefono1 && (
                          <a
                            href={`tel:${cliente.telefono1}`}
                            className='btn-floating light-green accent-3 right btn-floating-margin'
                          >
                            <i className='material-icons'>phone</i>
                          </a>
                        )}
                        {cliente.cellulare && (
                          <a
                            href={`tel:${cliente.cellulare}`}
                            className='btn-floating light-green accent-3 right btn-floating-margin'
                          >
                            <i className='material-icons'>phone_iphone</i>
                          </a>
                        )}
                        {cliente.cloudURL && (
                          <a
                            href={cliente.cloudURL}
                            target='_blank'
                            className='btn-floating light-blue accent-3 right btn-floating-margin'
                          >
                            <i className='material-icons'>cloud</i>
                          </a>
                        )}
                      </div>
                    }
                    visible={cliente.visible}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    clienti: selectClienti(
      'clienti',
      state.clienti,
      state.filters,
      state.utenti.find((utente) => utente.firebaseAuthId === state.auth.uid)
    ),
  };
};
const mapDispatchToProps = (dispatch) => ({
  startSetCustomers: () => dispatch(startSetCustomers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ClientiList));

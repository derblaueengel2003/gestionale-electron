import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { storeActions } from '../../store/configureStore';
import selectClienti from '../../selectors/deals';
import Card from '../Card';
import { ipcRenderer } from 'electron';

export const ClientiList = ({ cliente, clienti, ruolo, t }) => {
  //controllo se i dati vengono dal deal page o se sono passati via props.
  const clientiPayload = cliente || clienti;

  return (
    <div className='container'>
      <div className='list-body'>
        {clientiPayload.length > 0 && (
          <div>
            <h5>{ruolo || ''}</h5>

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
                    link={`/clientiview/${cliente.id}`}
                    titolo={`${cliente.nome} ${
                      cliente.cognome ? cliente.cognome : cliente.ditta
                    }`}
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
                        {cliente.cognome && (
                          <button
                            className='btn-floating light-blue accent-3 right btn-floating-margin'
                            onClick={() => {
                              ipcRenderer.send('folder:open', {
                                folder: `Kunden`,
                                folderNamePartial: cliente.cognome,
                              });
                            }}
                          >
                            <i className='material-icons'>folder</i>
                          </button>
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
  startSetCustomers: () =>
    dispatch(
      storeActions.find((action) => action.label === 'clienti').startSetAction()
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ClientiList));

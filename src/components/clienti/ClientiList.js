import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { storeActions } from '../../store/configureStore';
import selectClienti from '../../selectors/deals';
import Card from '../Card';
import { contactDetailsButton } from '../common/elements';

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
                    titoloDestra={contactDetailsButton(cliente)}
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

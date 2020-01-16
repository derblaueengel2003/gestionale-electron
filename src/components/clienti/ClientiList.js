import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import ClientiListItem from './ClientiListItem';
import { startSetCustomers } from '../../actions/clienti';
import selectClienti from '../../selectors/clienti';
import Card from '../Card';

export const ClientiList = ({ cliente, clienti, ruolo }) => {
  //controllo se i dati vengono dal deal page o se sono passati via props
  const clientiPayload = cliente || clienti;

  return (
    <div className='container'>
      <div className='list-body'>
        {clientiPayload.length > 0 && (
          <div>
            <h5>{ruolo || 'Adressbuch'}</h5>

            {clientiPayload
              .sort((a, b) => {
                return a.visible < b.visible ? -1 : 1;
              })
              .map(cliente => {
                return (
                  <Card
                    key={cliente.id}
                    link={`/customerview/${cliente.id}`}
                    titolo={`${cliente.nome} ${cliente.cognome}`}
                    sottotitolo={cliente.ditta}
                    linea1={cliente.email}
                    linea2={cliente.telefono1}
                    linea3={cliente.cellulare}
                    titoloDestra={
                      <div>
                        {cliente.email.length > 0 && (
                          <a
                            href={`mailto:${cliente.email}`}
                            className='btn-floating blue right btn-floating-margin'
                          >
                            <i className='material-icons'>email</i>
                          </a>
                        )}

                        {cliente.telefono1.length > 0 && (
                          <a
                            href={`tel:${cliente.telefono1}`}
                            className='btn-floating light-green accent-3 right btn-floating-margin'
                          >
                            <i className='material-icons'>phone</i>
                          </a>
                        )}
                        {cliente.cellulare.length > 0 && (
                          <a
                            href={`tel:${cliente.cellulare}`}
                            className='btn-floating light-green accent-3 right btn-floating-margin'
                          >
                            <i className='material-icons'>phone_iphone</i>
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

const mapStateToProps = state => {
  return {
    clienti: selectClienti(state.clienti, state.filters)
  };
};
const mapDispatchToProps = dispatch => ({
  startSetCustomers: () => dispatch(startSetCustomers())
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientiList);

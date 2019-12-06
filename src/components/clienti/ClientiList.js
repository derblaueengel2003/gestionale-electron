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
                    titoloDestra={
                      cliente.email.length > 0 && (
                        <a
                          href={`mailto:${cliente.email}`}
                          className='btn-floating blue right'
                        >
                          <i className='material-icons'>email</i>
                        </a>
                      )
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

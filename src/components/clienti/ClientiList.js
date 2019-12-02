import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ClientiListItem from './ClientiListItem';
import { startSetCustomers } from '../../actions/clienti';
import selectClienti from '../../selectors/clienti';
import Card from '../Card';

export const ClientiList = ({ cliente, clienti, ruolo }) => {
  //controllo se i dati vengono dal deal page o se sono passati via props

  if (cliente) {
    //dal deal page - singolo cliente
    return (
      <div className='container'>
        <div className='list-header list-header-clienti'>{ruolo}</div>
        <div className='list-body'>
          <Card key={cliente.id} 
          link={`/customerview/${cliente.id}`}
          titolo={`${cliente.nome} ${cliente.cognome}`}
          sottotitolo={cliente.ditta}
          linea1={cliente.email}
          linea2={cliente.telefono1}
          titoloDestra={cliente.email.length > 0 && (
                    <a
                      href={`mailto:${cliente.email}`}
                      className='btn-floating blue'
                    >
                      <i className='material-icons'>email</i>
                    </a>
                  )}
          
          visible={cliente.visible}
          />
        </div>
      </div>
    );
  } else {
    //tutti i clienti - visualizzazione nella clienti dashboard
    return (
      <div className='container'>
        <div className='list-header'>
          <div></div>
          <div>
            <Link className='btn-floating green' to='/customercreate'>
              <i className='material-icons'>add</i>
            </Link>
          </div>
        </div>
        <div className='list-body'>
          {clienti.length === 0 ? (
            <div className='list-item list-item--message'>
              <span>Kein Ergebnis anhand der angegebenen Filtern</span>
            </div>
          ) : (
            clienti
              .sort((a, b) => {
                return a.visible < b.visible ? -1 : 1;
              })
              .map(cliente => {
                return <ClientiListItem key={cliente.id} {...cliente} />;
              })
          )}
        </div>
      </div>
    );
  }
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

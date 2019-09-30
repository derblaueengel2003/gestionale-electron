import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ClientiListItem from './ClientiListItem';
import { startSetCustomers } from '../../actions/clienti';
import selectClienti from '../../selectors/clienti';

export const ClientiList = ({ cliente, clienti, ruolo }) => {
  //controllo se i dati vengono dal deal page o se sono passati via props
  if (cliente) {
    return (
      <div className='content-container'>
        <div className='list-header list-header-clienti'>{ruolo}</div>
        <div className='list-body'>
          <ClientiListItem key={cliente.id} {...cliente} />
        </div>
      </div>
    );
  } else {
    return (
      <div className='content-container'>
        <div className='page-header__actions'>
          <Link
            className='button button--secondary-clienti button-add'
            to='/customercreate'
          >
            +
          </Link>
        </div>
        <div className='list-header list-header-clienti'>
          <div className='show-for-mobile'>Cliente</div>
          <div className='show-for-desktop'>Cliente</div>
          <div className='show-for-desktop'>Ditta</div>
        </div>
        <div className='list-body'>
          {clienti.length === 0 ? (
            <div className='list-item list-item--message'>
              <span>Nessun cliente in base ai filtri inseriti</span>
            </div>
          ) : (
            clienti.map(cliente => {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientiList);

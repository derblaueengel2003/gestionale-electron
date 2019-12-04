import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import UtentiListItem from './UtentiListItem';
import Card from '../Card';

export const UtentiList = props => (
  <div>
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>Benutzer</h1>
      </div>
    </div>
    <div className='container'>
      <Link className='btn-floating green right' to='/usercreate'>
        <i className='material-icons'>add</i>
      </Link>
      <div>
        {props.utenti.length > 0 &&
          props.utenti.map(utente => {
            return (
              <Card
                key={utente.id}
                titolo={`${utente.name}`}
                sottotitolo={`${utente.qualifica}`}
                titoloDestra={`${utente.role}`}
                visible={true}
                link={`/useredit/${utente.id}`}
                linea1={`${utente.email}`}
                linea2={`${utente.telefon}`}
              />
            );
          })}
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    utenti: state.utenti,
    firma: state.firma
  };
};

export default connect(mapStateToProps)(UtentiList);

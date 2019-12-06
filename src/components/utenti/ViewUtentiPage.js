import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class ViewUtentiPage extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <h1>Benutzer</h1>
          </div>
        </div>
        <div className='container'>
          {this.props.utente.name.length > 0 && (
            <div>Name: {this.props.utente.name}</div>
          )}
          {this.props.utente.role.length > 0 && (
            <div>Rolle: {this.props.utente.role}</div>
          )}
          <Link
            className='button button--secondary-clienti'
            to={`/useredit/${this.props.utente.id}`}
          >
            Benutzer ändern
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  utente: state.utenti.find(utente => utente.id === props.match.params.id)
});

export default connect(mapStateToProps)(ViewUtentiPage);

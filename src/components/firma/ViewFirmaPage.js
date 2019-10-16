import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class ViewFirmaPage extends React.Component {
  render() {
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Firma</h1>
          </div>
        </div>
        <div className='content-container'>
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
            Ändern
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  firma: state.firma.find(firma => firma.id === props.match.params.id)
});

export default connect(mapStateToProps)(ViewFirmaPage);

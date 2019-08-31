import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import moment from 'moment';

export class LeadsListItem extends React.Component {
  render() {
    const cliente = this.props.clienti.find(
      cliente => cliente.id === this.props.leadId
    );
    const consulenteVendita = cliente
      ? this.props.utenti.find(
          utente => utente.id === cliente.consulenteVenditaId
        )
      : { name: this.props.consulenteVendita };

    let immobile = '';
    if (this.props.leadOggettoStato === 'commerciale') {
      immobile = `Locale ${this.props.leadOggettoStato}`;
    } else if (this.props.leadOggettoStato === 'aph') {
      immobile = 'Casa di cura';
    } else if (
      this.props.leadOggettoStato === 'libero' ||
      this.props.leadOggettoStato === 'affittato' ||
      this.props.leadOggettoStato === 'libero o affittato'
    ) {
      immobile = `Appartamento ${this.props.leadOggettoStato}`;
    }

    return (
      <div className='row'>
        <div className='col-4-of-6'>
          <Link className='link-style' to={`/leadview/${this.props.id}`}>
            <h3 className='list-item__title'>
              {cliente ? cliente.nome : `-${this.props.leadNome}`}{' '}
              {cliente && cliente.cognome}
            </h3>
            <span className='list-item__sub-title'>
              {consulenteVendita ? `(${consulenteVendita.name})` : null}
            </span>
            <div className='list-item__sub-title'>
              {this.props.leadCreatedAt
                ? moment(this.props.leadCreatedAt).format('DD MMMM, YYYY')
                : null}
            </div>
            <div className='list-item__sub-title'>
              {cliente ? cliente.email : this.props.leadEmail}
            </div>
            <div className='list-item__sub-title'>
              {cliente ? cliente.telefono1 : this.props.leadTelefono}
            </div>
            <div className='list-item__sub-title'>
              {this.props.leadOggettoStato ? immobile : null}
            </div>
            {/* il prop showAll lo passo per stabilire se mostrare tutto o meno a seconda da dove arriva la richiesta al componente (dashboard o pagina dettaglio)*/}
            {this.props.showAll ? (
              <div className='list-item__sub-title'>
                {this.props.leadNote ? this.props.leadNote : null}
              </div>
            ) : (
              <div className='list-item__sub-title'>
                {this.props.leadNote ? (
                  <strong>Ulteriori dettagli -></strong>
                ) : null}
              </div>
            )}
          </Link>
        </div>

        <div className='col-1-of-6'>
          <h3 className='list-item__data'>
            {numeral(this.props.leadBudget / 100).format('0,0[.]00 $')}
          </h3>
        </div>
        <div className='col-1-of-6'>
          <Link
            className='button button--tertiary'
            to={`/leadmatchview/${this.props.id}`}
          >
            Find a Match!
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removeLead: data => dispatch(removeLead(data))
});

const mapStateToProps = state => {
  return {
    utenti: state.utenti,
    clienti: state.clienti
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeadsListItem);

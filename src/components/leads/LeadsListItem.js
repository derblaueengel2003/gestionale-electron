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
        <div className='col s12'>
          <div className='card'>
            <div className='card-content'>
              <div className='row'>
                <div className='col s12 m10'>
                  <Link to={`/leadview/${this.props.id}`}>
                    <span className='card-title'>
                      {cliente ? cliente.nome : 'Kunde nicht im Adressbuch'}{' '}
                      {cliente && cliente.cognome}
                    </span>
                  </Link>
                  <h6>
                    Budget:{' '}
                    {numeral(this.props.leadBudget / 100).format('0,0[.]00 $')}
                  </h6>
                  <p>
                    {consulenteVendita ? `(${consulenteVendita.name})` : null}
                  </p>
                  <p>
                    {this.props.leadCreatedAt
                      ? moment(this.props.leadCreatedAt).format('DD MMMM, YYYY')
                      : null}
                  </p>
                  <p>{cliente ? cliente.email : this.props.leadEmail}</p>
                  <p>{cliente ? cliente.telefono1 : this.props.leadTelefono}</p>
                  <p>{this.props.leadOggettoStato ? immobile : null}</p>
                  {/* il prop showAll lo passo per stabilire se mostrare tutto o meno a seconda da dove arriva la richiesta al componente (dashboard o pagina dettaglio)*/}
                  {this.props.showAll ? (
                    <p>{this.props.leadNote ? this.props.leadNote : null}</p>
                  ) : (
                    <p>
                      <Link to={`/leadview/${this.props.id}`}>
                        {this.props.leadNote ? (
                          <strong>Mehr details -></strong>
                        ) : null}
                      </Link>
                    </p>
                  )}
                </div>

                <div>
                  {this.props.leadOggettoStato === 'libero' ||
                  this.props.leadOggettoStato === 'affittato' ||
                  this.props.leadOggettoStato === 'libero o affittato' ||
                  this.props.leadOggettoStato === '' ? (
                    <Link
                      className='btn-floating green accent-3 right'
                      to={`/leadmatchview/${this.props.id}`}
                    >
                      Match
                    </Link>
                  ) : (
                    ''
                  )}

                  {cliente && cliente.email && (
                    <a
                      className='btn-floating blue right btn-floating-margin'
                      href={`mailto:${
                        cliente ? cliente.email : this.props.leadEmail
                      }`}
                    >
                      <i className='material-icons'>email</i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeadsListItem);

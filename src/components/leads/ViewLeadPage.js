import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import OffersList from './OffersList';
import { startRemoveLead } from '../../actions/leads';
import { startRemoveOffer } from '../../actions/offers';
import numeral from 'numeral';
import moment from 'moment';

export class ViewLeadPage extends React.Component {
  onRemove = () => {
    if (
      window.confirm('Bestätigen Sie die Löschung? Das ist unwiderruflich!')
    ) {
      const offerteDaCancellare = this.props.offers.filter(
        (offer) => offer.leadId === this.props.lead.id
      );
      //cancello tutte le offerte legate a questa richiesta e poi cancello la richiesta
      offerteDaCancellare.forEach((offer) => {
        this.props.startRemoveOffer({ id: offer.id });
      });
      this.props.startRemoveLead({ id: this.props.lead.id });
      this.props.history.push('/leads');
    }
  };
  render() {
    const cliente = this.props.clienti.find(
      (cliente) => cliente.id === this.props.lead.leadId
    );
    const consulenteVendita = this.props.utenti.find(
      (utente) => utente.id === cliente.consulenteVenditaId
    );
    const offers = this.props.offers.filter(
      (offer) => offer.leadId === this.props.lead.id
    );

    let immobile = '';
    if (this.props.lead.leadOggettoStato === 'commerciale') {
      immobile = `Locale ${this.props.lead.leadOggettoStato}`;
    } else if (this.props.lead.leadOggettoStato === 'aph') {
      immobile = 'Casa di cura';
    } else if (
      this.props.lead.leadOggettoStato === 'libero' ||
      this.props.lead.leadOggettoStato === 'affittato' ||
      this.props.lead.leadOggettoStato === 'libero o affittato'
    ) {
      immobile = `Appartamento ${this.props.lead.leadOggettoStato}`;
    }
    return (
      <div>
        <div className='grey lighten-4'>
          <div className='container'>
            <h1>{this.props.t('Richiesta')}</h1>
          </div>
        </div>
        <div className='container section'>
          <div>
            <button
              className='btn-floating red right btn-floating-margin'
              onClick={this.onRemove}
            >
              <i className='material-icons'>remove</i>
            </button>
            <Link
              className='btn-floating orange right btn-floating-margin'
              to={`/leadedit/${this.props.lead.id}`}
            >
              <i className='material-icons'>edit</i>
            </Link>
            {this.props.lead.leadOggettoStato === 'libero' ||
            this.props.lead.leadOggettoStato === 'affittato' ||
            this.props.lead.leadOggettoStato === 'libero o affittato' ||
            this.props.lead.leadOggettoStato === '' ? (
              <Link
                className='btn-floating green accent-3 right btn-floating-margin'
                to={`/leadmatchview/${this.props.lead.id}`}
              >
                Match
              </Link>
            ) : (
              ''
            )}

            {cliente.email && (
              <a
                className='btn-floating blue right btn-floating-margin'
                href={`mailto:${cliente.email}`}
              >
                <i className='material-icons'>email</i>
              </a>
            )}
          </div>

          <div>
            {cliente && (
              <h5>
                {
                  <Link to={`/customerview/${cliente.id}`}>
                    {cliente.titolo} {cliente.nome} {cliente.cognome}
                  </Link>
                }
              </h5>
            )}
            <h6>
              Budget:{' '}
              {numeral(this.props.lead.leadBudget / 100).format('0,0[.]00 $')}
            </h6>
            <p>{consulenteVendita && `(${consulenteVendita.name})`}</p>
            <p>
              {this.props.lead.leadCreatedAt
                ? moment(this.props.lead.leadCreatedAt).format('DD MMMM, YYYY')
                : null}
            </p>
            <p>{cliente && cliente.email}</p>
            <p>{cliente && cliente.telefono1}</p>
            <p>{this.props.lead.leadOggettoStato ? immobile : null}</p>
            <p>
              {this.props.lead.leadNote && `Note: ${this.props.lead.leadNote}`}
            </p>
          </div>
        </div>

        <div className='container'>
          <Link
            className='btn-floating green right'
            to={{
              pathname: '/createoffer',
              state: { leadId: this.props.lead.id },
            }}
          >
            <i className='material-icons'>add</i>
          </Link>
        </div>
        <OffersList offers={offers} ruolo={'Immobili offerti al cliente'} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  lead: state.leads.find((lead) => lead.id === props.match.params.id),
  clienti: state.clienti,
  offers: state.offers,
  utenti: state.utenti,
});
const mapDispatchToProps = (dispatch) => ({
  startRemoveLead: (data) => dispatch(startRemoveLead(data)),
  startRemoveOffer: (data) => dispatch(startRemoveOffer(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ViewLeadPage));

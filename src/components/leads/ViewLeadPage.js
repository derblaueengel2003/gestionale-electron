import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import OffersList from './OffersList';
import { storeActions } from '../../store/configureStore';
import OptionModal from '../common/OptionModal';
import Intestazione from '../common/Intestazione';
import { formattaData, formattaPrezzo } from '../common/utils';
import { editButton } from '../common/elements';

export class ViewLeadPage extends React.Component {
  state = {
    isOpen: false,
    modalContent: 'remove_confirm',
    btnEnabled: true,
  };

  handleOpenModal = () => {
    this.setState(() => ({
      isOpen: true,
    }));
  };

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  };
  onRemove = () => {
    const offerteDaCancellare = this.props.offers.filter(
      (offer) => offer.leadId === this.props.lead.id
    );
    //cancello tutte le offerte legate a questa richiesta e poi cancello la richiesta
    offerteDaCancellare.forEach((offer) => {
      this.props.startRemoveOffer({ id: offer.id });
    });
    this.props.startRemoveLead({ id: this.props.lead.id });
    this.props.history.push('/leads');
  };
  render() {
    if (!this.props.lead) {
      this.props.history.push('/leads');
      return <div>Loading...</div>;
    }
    const { lead, t } = this.props;
    const cliente = this.props.clienti.find(
      (cliente) => cliente.id === lead.leadId
    );
    const consulenteVendita = this.props.utenti.find(
      (utente) => utente.id === cliente.consulenteVenditaId
    );
    const offers = this.props.offers.filter(
      (offer) => offer.leadId === lead.id
    );

    let immobile = '';
    if (lead.leadOggettoStato === 'commerciale') {
      immobile = `Locale ${lead.leadOggettoStato}`;
    } else if (lead.leadOggettoStato === 'aph') {
      immobile = 'Casa di cura';
    } else if (
      lead.leadOggettoStato === 'libero' ||
      lead.leadOggettoStato === 'affittato' ||
      lead.leadOggettoStato === 'libero o affittato'
    ) {
      immobile = `Appartamento ${lead.leadOggettoStato}`;
    }
    return (
      <div>
        <Intestazione intestazione={t('Richiesta')} />
        <div className='container section'>
          <div>
            <button
              className='btn-floating red right btn-floating-margin'
              onClick={this.handleOpenModal}
            >
              <i className='material-icons'>delete</i>
            </button>
            <OptionModal
              isOpen={this.state.isOpen}
              contentLabel={'remove'}
              modalContent={this.props.t(this.state.modalContent)}
              onCancel={this.handleCloseModal}
              onConfirm={this.onRemove}
              btnEnabled={this.state.btnEnabled}
            />
            {editButton(`/leadedit/${lead.id}`)}
            {lead.leadOggettoStato === 'libero' ||
            lead.leadOggettoStato === 'affittato' ||
            lead.leadOggettoStato === 'libero o affittato' ||
            lead.leadOggettoStato === '' ? (
              <Link
                className='btn-floating green accent-3 right btn-floating-margin'
                to={`/leadmatchview/${lead.id}`}
              >
                <i className='material-icons'>search</i>{' '}
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
                  <Link to={`/clientiview/${cliente.id}`}>
                    {t(cliente.titolo)} {cliente.nome} {cliente.cognome}
                  </Link>
                }
              </h5>
            )}
            {lead.leadCity && (
              <h6>
                {t('city')}: {lead.leadCity}
              </h6>
            )}
            <h6>Budget: {formattaPrezzo(lead.leadBudget, true)}</h6>
            <p>{consulenteVendita && `(${consulenteVendita.name})`}</p>
            <p>
              {lead.leadCreatedAt ? formattaData(lead.leadCreatedAt) : null}
            </p>
            <p>{cliente && cliente.email}</p>
            <p>{cliente && cliente.telefono1}</p>
            <p>{lead.leadOggettoStato ? immobile : null}</p>
            <p>{lead.leadNote && `Note: ${lead.leadNote}`}</p>
          </div>
        </div>

        <div className='container'>
          <Link
            className='btn-floating green right'
            to={{
              pathname: '/createoffer',
              state: { leadId: lead.id },
            }}
          >
            <i className='material-icons'>add</i>
          </Link>
        </div>
        <OffersList offers={offers} ruolo={t('offer_sent_customer')} />
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
  startRemoveLead: (data) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'leads')
        .startRemoveAction(data)
    ),
  startRemoveOffer: (data) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'offers')
        .startRemoveAction(data)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ViewLeadPage));

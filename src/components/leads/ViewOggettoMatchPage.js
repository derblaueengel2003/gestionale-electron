import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import LeadsList from '../leads/LeadsList';
import OggettiList from '../oggetti/OggettiList';

export class ViewOggettoMatchPage extends React.Component {
  leadMatch = () => {
    const leadsMatch = this.props.leads.filter(
      (lead) =>
        lead.leadBudget <= this.props.oggetto.kaufpreis * 1.2 &&
        lead.leadBudget > this.props.oggetto.kaufpreis / 1.2
    );
    if (this.props.oggetto.stato === 'vacant') {
      return leadsMatch.filter(
        (lead) =>
          lead.leadOggettoStato === 'libero' ||
          lead.leadOggettoStato === '' ||
          lead.leadOggettoStato === 'libero o affittato'
      );
    } else if (this.props.oggetto.stato === 'rented') {
      return leadsMatch.filter(
        (lead) =>
          lead.leadOggettoStato === 'affittato' ||
          lead.leadOggettoStato === '' ||
          lead.leadOggettoStato === 'libero o affittato'
      );
    } else {
      return leadsMatch;
    }
  };

  render() {
    const offersLeadIds = this.props.offers.map((offer) => offer.leadId);

    const leadsAlreadyOffered = this.leadMatch().filter((lead) =>
      offersLeadIds.includes(lead.id)
    );
    const leadsToBeOffered = this.leadMatch().filter(
      (lead) => !offersLeadIds.includes(lead.id)
    );
    return (
      <div>
        <div className='container'>
          <h1>
            {this.props.t('Match con le richieste')}: {this.leadMatch().length}
          </h1>
          <span>
            {this.props.t(
              'La corrispondenza si basa sul budget (+-20%) e la tipologia di immobile'
            )}
          </span>
        </div>
        <OggettiList
          oggetto={[this.props.oggetto]}
          ruolo={this.props.t('Oggetto')}
        />
        <LeadsList
          userLeads={leadsToBeOffered}
          oggettoId={this.props.oggetto.id}
          ruolo={`${this.props.t('Richieste')}`}
        />
        <LeadsList
          userLeads={leadsAlreadyOffered}
          feedbackButton={'disabled'}
          ruolo={`${this.props.t('offer_sent')}`}
        />
        ;
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  oggetto: state.oggetti.find(
    (oggetto) => oggetto.id === props.match.params.id
  ),
  leads: state.leads,
  offers: state.offers.filter(
    (offer) => offer.oggettoId === props.match.params.id
  ),
});

export default connect(mapStateToProps)(
  withTranslation()(ViewOggettoMatchPage)
);

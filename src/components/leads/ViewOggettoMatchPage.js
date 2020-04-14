import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import LeadsList from '../leads/LeadsList';
import OggettiList from '../oggetti/OggettiList';

export class ViewOggettoMatchPage extends React.Component {
  primoMatch = () => {
    const leadsMatch = this.props.leads.filter(
      (lead) =>
        lead.leadBudget <= this.props.oggetto.kaufpreis * 1.2 &&
        lead.leadBudget > this.props.oggetto.kaufpreis / 1.2
    );
    if (this.props.oggetto.stato === 'leerstehend') {
      return leadsMatch.filter(
        (lead) =>
          lead.leadOggettoStato === 'libero' ||
          lead.leadOggettoStato === '' ||
          lead.leadOggettoStato === 'libero o affittato'
      );
    } else if (this.props.oggetto.stato === 'vermietet') {
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
    return (
      <div>
        <div className='container'>
          <h1>
            {this.props.t('Match con le richieste')}: {this.primoMatch().length}
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
          userLeads={this.primoMatch()}
          ruolo={`${this.props.t('Richieste')}`}
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
});

export default connect(mapStateToProps)(
  withTranslation()(ViewOggettoMatchPage)
);

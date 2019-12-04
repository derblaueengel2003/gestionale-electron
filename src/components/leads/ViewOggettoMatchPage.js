import React from 'react';
import { connect } from 'react-redux';
import LeadsListItem from '../leads/LeadsListItem';
import OggettiList from '../oggetti/OggettiList';

export class ViewOggettoMatchPage extends React.Component {
  primoMatch = () => {
    const leadsMatch = this.props.leads.filter(
      lead =>
        lead.leadBudget <= this.props.oggetto.kaufpreis * 1.2 &&
        lead.leadBudget > this.props.oggetto.kaufpreis / 1.2
    );
    if (this.props.oggetto.stato === 'leerstehend') {
      return leadsMatch.filter(
        lead =>
          lead.leadOggettoStato === 'libero' ||
          lead.leadOggettoStato === '' ||
          lead.leadOggettoStato === 'libero o affittato'
      );
    } else if (this.props.oggetto.stato === 'vermietet') {
      return leadsMatch.filter(
        lead =>
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
          <h1>Match mit den Anfragen: {this.primoMatch().length}</h1>
          <span>
            Die Übereinstimmung basiert sich auf Kundenbudget (+-20%) und
            Immobilientyp
          </span>
        </div>

        <OggettiList oggetto={[this.props.oggetto]} ruolo={'Objekt'} />
        <div className='container'>
          <h5>Anfragen</h5>
          <div>
            {this.primoMatch().map(lead => {
              return <LeadsListItem key={lead.id} {...lead} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  oggetto: state.oggetti.find(oggetto => oggetto.id === props.match.params.id),
  leads: state.leads
});

export default connect(mapStateToProps)(ViewOggettoMatchPage);

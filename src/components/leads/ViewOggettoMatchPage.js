import React from 'react';
import { connect } from 'react-redux';
import LeadsListItem from '../leads/LeadsListItem';
import OggettiListItem from '../oggetti/OggettiListItem';

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
        <div className='page-header page-header-leads'>
          <div className='container'>
            <h1>Match mit den Anfragen: {this.primoMatch().length}</h1>
            <span>
              Die Übereinstimmung basiert sich auf Kundenbudget (+-20%) und
              Immobilientyp
            </span>
          </div>
        </div>

        <div className='container'>
          <div className='page-header__actions'></div>
          <div className='list-header list-header-oggetti'>
            <div className='show-for-mobile'>Objekt</div>
            <div className='show-for-desktop'>Objekt</div>
            <div className='show-for-desktop'>Ref. Id</div>
          </div>
          <div className='list-body'>
            <OggettiListItem
              key={this.props.oggetto.id}
              {...this.props.oggetto}
            />
          </div>

          <div className='list-header list-header-leads'>
            <div>Anfragen</div>
            <div>Budget</div>
          </div>
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

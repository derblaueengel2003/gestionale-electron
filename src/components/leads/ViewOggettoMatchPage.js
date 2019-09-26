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
    if (this.props.oggetto.affittoNetto === 0) {
      return leadsMatch.filter(lead => lead.leadOggettoStato === 'libero');
    } else if (this.props.oggetto.affittoNetto > 0) {
      return leadsMatch.filter(lead => lead.leadOggettoStato === 'affittato');
    } else {
      return leadsMatch;
    }
  };

  render() {
    return (
      <div>
        <div className='page-header page-header-leads'>
          <div className='content-container'>
            <h1 className='page-header__title'>
              Match con le richieste: {this.primoMatch().length}
            </h1>
            <span>
              La corrispondenza si basa sul budget (+-20%) e sulla tipologia
              dell'immobile
            </span>
          </div>
        </div>

        <div className='content-container'>
          <div className='page-header__actions'></div>
          <div className='list-header list-header-oggetti'>
            <div className='show-for-mobile'>Oggetto</div>
            <div className='show-for-desktop'>Oggetto</div>
            <div className='show-for-desktop'>Rif. Id</div>
          </div>
          <div className='list-body'>
            <OggettiListItem
              key={this.props.oggetto.id}
              {...this.props.oggetto}
            />
          </div>

          <div className='list-header list-header-leads'>
            <div>Richieste</div>
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

import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import LeadsList from './LeadsList';
import OggettiList from '../oggetti/OggettiList';

export class ViewLeadMatchPage extends React.Component {
  leadMatch = () => {
    // controllo se l'oggetto è ancora invenduto
    const primoMatch = this.props.oggetti.filter((ogg) => !ogg.venduto);
    console.log('primo match', primoMatch);
    // controllo se la richiesta contiene indicazione sullo stato dell'immobile
    let secondoMatch = [];
    if (this.props.lead.leadOggettoStato === 'libero') {
      secondoMatch = primoMatch.filter((ogg) => ogg.stato === 'leerstehend');
    } else if (this.props.lead.leadOggettoStato === 'affittato') {
      secondoMatch = primoMatch.filter((ogg) => ogg.stato === 'vermietet');
    } else {
      secondoMatch = [...primoMatch];
    }
    console.log('secondo match', secondoMatch);

    // filtro gli oggetti che hanno un prezzo di vendita del 20% sopra o sotto il budget
    let terzoMatch = [];
    if (this.props.lead.leadBudget > 500) {
      terzoMatch = secondoMatch.filter(
        (ogg) =>
          ogg.kaufpreis <= this.props.lead.leadBudget * 1.2 &&
          ogg.kaufpreis >= this.props.lead.leadBudget / 1.2
      );
    } else {
      terzoMatch = [...secondoMatch];
    }
    console.log('terzo match', terzoMatch);

    //estrapolo gli id degli oggetti già proposti (filtrato già nello state in basso)
    const oggettiIds = this.props.offers.map((offer) => offer.oggettoId);
    console.log('id oggetti già proposti', oggettiIds);

    //restituisco solo gli oggetti che non sono ancora stati proposti
    return terzoMatch.filter((ogg) => !oggettiIds.includes(ogg.id));
  };

  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <h1>
              {this.props.t('Match con i nostri oggetti')}:{' '}
              {this.leadMatch().length}
            </h1>
            <span>
              {this.props.t(
                'La corrispondenza si basa sul budget (+-20%) e la tipologia di immobile'
              )}
              .
            </span>
          </div>
        </div>
        <LeadsList
          userLeads={[this.props.lead]}
          ruolo={this.props.t('Richiesta')}
        />

        {this.leadMatch().length > 0 && (
          <OggettiList
            oggetto={this.leadMatch()}
            ruolo={`Objekte von ${this.props.firma[0].name}`}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  lead: state.leads.find((lead) => lead.id === props.match.params.id),
  clienti: state.clienti,
  oggetti: state.oggetti,
  offers: state.offers.filter(
    (offer) => offer.leadId === props.match.params.id
  ),
  firma: state.firma,
});

export default connect(mapStateToProps)(withTranslation()(ViewLeadMatchPage));

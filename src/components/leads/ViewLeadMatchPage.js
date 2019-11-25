import React from 'react';
import { connect } from 'react-redux';
import { AccentroListItem } from './AccentroListItem';
import OggettiListItem from '../oggetti/OggettiListItem';

export class ViewLeadMatchPage extends React.Component {
  primoMatch = () => {
    if (this.props.lead.leadBudget > 500) {
      const match = this.props.oggetti.filter(
        ogg =>
          ogg.kaufpreis <= this.props.lead.leadBudget * 1.2 &&
          ogg.kaufpreis > this.props.lead.leadBudget / 1.2
      );
      if (this.props.lead.leadOggettoStato === 'libero') {
        return match.filter(ogg => ogg.stato === 'leerstehend');
      } else if (this.props.lead.leadOggettoStato === 'affittato') {
        return match.filter(ogg => ogg.stato === 'vermietet');
      } else {
        return match;
      }
    } else {
      const match = this.props.accentro.filter(ogg => ogg.kaufpreis);
      if (this.props.lead.leadOggettoStato === 'libero') {
        return match.filter(ogg => ogg.affittoNetto);
      } else if (this.props.lead.leadOggettoStato === 'affittato') {
        return match.filter(ogg => ogg.affittoNetto > 0);
      } else {
        return match;
      }
    }
  };
  secondoMatch = () => {
    if (this.props.lead.leadBudget > 500) {
      const match = this.props.accentro.filter(
        ogg =>
          ogg.Kaufpreis <= this.props.lead.leadBudget * 1.2 &&
          ogg.Kaufpreis > this.props.lead.leadBudget / 1.2
      );
      if (this.props.lead.leadOggettoStato === 'libero') {
        return match.filter(ogg => ogg.Miete === 0);
      } else if (this.props.lead.leadOggettoStato === 'affittato') {
        return match.filter(ogg => ogg.Miete > 0);
      } else {
        return match;
      }
    } else {
      const match = this.props.accentro.filter(ogg => ogg.Kaufpreis);
      if (this.props.lead.leadOggettoStato === 'libero') {
        return match.filter(ogg => ogg.Miete === 0);
      } else if (this.props.lead.leadOggettoStato === 'affittato') {
        return match.filter(ogg => ogg.Miete > 0);
      } else {
        return match;
      }
    }
  };

  render() {
    const cliente = this.props.clienti.find(
      cliente => cliente.id === this.props.lead.leadId
    );

    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>
              Match mit unseren Objekten: {this.primoMatch().length}
            </h1>
            <h1 className='page-header__title'>
              Match mit Accentro: {this.secondoMatch().length}
            </h1>
            <span>
              Die Übereinstimmung basiert sich auf Kundenbudget (+-20%) und
              Immobilientyp.
            </span>
          </div>
        </div>

        <div className='content-container'>
          <div className='list-header list-header-leads'>
            <div>
              {cliente ? cliente.nome : this.props.lead.leadNome}{' '}
              {cliente && cliente.cognome}
            </div>
            <div>
              <a
                href={`mailto:${
                  cliente ? cliente.email : this.props.lead.leadEmail
                }`}
              >
                {cliente ? cliente.email : this.props.lead.leadEmail}
              </a>
            </div>
          </div>
          {this.primoMatch().length > 0 && (
            <div className='list-header'>
              <div className='show-for-mobile'>Objekte von m2Square</div>
              <div className='show-for-desktop'>Objekte von m2Square</div>
              <div className='show-for-desktop'>Ref.ID</div>{' '}
            </div>
          )}
          <div>
            {this.primoMatch().map(ogg => {
              return <OggettiListItem key={ogg.id} {...ogg} />;
            })}
          </div>
          <div className='list-header'>Objekte von Accentro</div>
          <div>
            {this.secondoMatch().map(ogg => {
              return <AccentroListItem key={ogg.id} {...ogg} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  lead: state.leads.find(lead => lead.id === props.match.params.id),
  clienti: state.clienti,
  accentro: state.accentro,
  oggetti: state.oggetti
});

export default connect(mapStateToProps)(ViewLeadMatchPage);

import React from 'react';
import { connect } from 'react-redux';
// import { AccentroListItem } from './AccentroListItem';
// import OggettiListItem from '../oggetti/OggettiListItem';
import Card from '../Card';
import ClientiList from '../clienti/ClientiList';
import OggettiList from '../oggetti/OggettiList';
import numeral from 'numeral';

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
    const cliente = this.props.clienti.filter(
      cliente => cliente.id === this.props.lead.leadId
    );

    return (
      <div>
        <div>
          <div className='container'>
            <h1>Match mit unseren Objekten: {this.primoMatch().length}</h1>
            <h1>Match mit Accentro: {this.secondoMatch().length}</h1>
            <span>
              Die Übereinstimmung basiert sich auf Kundenbudget (+-20%) und
              Immobilientyp.
            </span>
          </div>
        </div>

        <ClientiList cliente={cliente} ruolo={'Anfrage von:'} />
        {this.primoMatch().length > 0 && (
          <OggettiList
            oggetto={this.primoMatch()}
            ruolo={`Objekte von ${this.props.firma[0].name}`}
          />
        )}
        {this.secondoMatch().length > 0 && (
          <div className='container'>
            <h5>Objekte von Accentro</h5>
          </div>
        )}
        <div className='container'>
          <div>
            {this.secondoMatch().map(oggetto => {
              return (
                <Card
                  key={oggetto.id}
                  link={'#'}
                  titolo={`${oggetto.Strasse}`}
                  titoloDestra={`WE: ${oggetto.WEG} - ${oggetto.ETW}`}
                  visible={true}
                  sottotitolo={`Preis: ${numeral(
                    oggetto.Kaufpreis / 100
                  ).format('0,0[.]00 $')}`}
                  linea1={oggetto.Bezirk}
                  linea2={`m2: ${oggetto.m2} - Zimmer: ${oggetto.Vani}`}
                  linea3={`Etage: ${oggetto.Etage}`}
                  linea4={`Kaltmiete: ${numeral(oggetto.Miete / 100).format(
                    '0,0[.]00 $'
                  )}`}
                  linea5={`Wohngeld: ${numeral(oggetto.Wohngeld / 100).format(
                    '0,0[.]00 $'
                  )}`}
                  linea6={`Balkon: ${oggetto.Balcone}`}
                  linea7={`Aufzug: ${oggetto.Aufzug}`}
                />
              );
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
  oggetti: state.oggetti,
  firma: state.firma
});

export default connect(mapStateToProps)(ViewLeadMatchPage);

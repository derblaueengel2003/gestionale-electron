import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { creaPrenotazione } from '../moduli/Provisionsbestaetigung';
import { widerrufsBelehrung } from '../moduli/WiderrufsBelehrung';
import { vollmachtNotarauftrag } from '../moduli/VollmachtNotarauftrag';
import { protocollo } from '../moduli/UebergabeProtokoll';
import TodoForm from './TodoForm';
import FattureList from '../fatture/FattureList';
import ClientiList from '../clienti/ClientiList';
import OggettiList from '../oggetti/OggettiList';

export class ViewDealPage extends React.Component {
  render() {
    const {
      prezzoDiVendita,
      createdAt,
      dataRogito,
      note,
      amount,
      consulenteVendita,
      provvM2square,
      provvStefano,
      payedAtStefano,
      provvAgenziaPartner,
      payedAgenziaPartner,
      venditoreId,
      venditoreId2,
      acquirenteId,
      acquirenteId2,
      agenziaPartnerId,
      payedStefano,
      id
    } = this.props.deal;
    const { utente } = this.props;
    const acquirente = this.props.clienti.find(
      cliente => cliente.id === acquirenteId
    );
    const acquirente2 = this.props.clienti.find(
      cliente => cliente.id === this.props.deal.acquirenteId2
    );
    const venditore = this.props.clienti.find(
      cliente => cliente.id === this.props.deal.venditoreId
    );
    const venditore2 = this.props.clienti.find(
      cliente => cliente.id === this.props.deal.venditoreId2
    );
    const agenziaPartner = this.props.clienti.find(
      cliente => cliente.id === this.props.deal.agenziaPartnerId
    );
    const oggetto = this.props.oggetti.find(
      ogg => ogg.id === this.props.deal.oggettoId
    );

    const provvPercentuale = numeral(
      (this.props.deal.amount / this.props.deal.prezzoDiVendita) * 119
    ).format('0,0.00');
    const dataPrenotazione = moment(this.props.deal.createdAt).format(
      'DD.MM.YYYY'
    );
    const notaio = this.props.clienti.find(
      cliente => cliente.id === this.props.deal.notaioId
    );
    // Determino quante fatture sono state pagate per mostrare i colori adatti. Da dealFature mi arriva un array
    let payed = 0;
    this.props.fatture.map(fattura => fattura.payed && payed++);
    if (payed > 0) {
      if (payed === this.props.fatture.length) {
        payed = 2;
      } else {
        payed = 1;
      }
    }
    return (
      <div>
        <div className='page-header page-header-deals'>
          <div className='content-container'>
            <h1 className='page-header__title'>Provisionsdetails</h1>
          </div>
        </div>
        <div className='content-container'>
          <div className='list-header list-header-deals'>
            <div className='show-for-mobile'>Details</div>
            <div className='show-for-desktop'>Details</div>
            <div className='show-for-desktop'></div>
          </div>
          <div className='list-body'>
            <div className='list-item'>
              <div>
                {prezzoDiVendita > 0 && (
                  <h3 className='list-item__title'>
                    Verkaufspreis:{' '}
                    {numeral(prezzoDiVendita / 100).format('0,0[.]00 $')}
                  </h3>
                )}
                {createdAt > 0 && (
                  <span className='list-item__sub-title'>
                    Reservierungsdatum:{' '}
                    {moment(createdAt).format('DD MMMM, YYYY')}
                  </span>
                )}
                {dataRogito > 0 && (
                  <h4 className='list-item__sub-title'>
                    Beurkundungsdatum:{' '}
                    {moment(dataRogito).format('DD MMMM, YYYY')}
                  </h4>
                )}
                {note.length > 0 && (
                  <span className='list-item__sub-title'>Note: {note}</span>
                )}
              </div>
              <div>
                {amount > 0 && (
                  <h3 className='list-item__title'>
                    Provision:{' '}
                    {utente.role === 'Admin'
                      ? numeral(amount / 100).format('0,0[.]00 $')
                      : ''}
                  </h3>
                )}
                {consulenteVendita > 0 && (
                  <h4 className='list-item__sub-title'>
                    Kundenbetreuer: {consulenteVendita}
                  </h4>
                )}
                {utente.role === 'Admin'
                  ? provvM2square > 0 && (
                      <h4
                        className={`list-item__sub-title list-item--paid${payed}`}
                      >
                        m2Square:{' '}
                        {numeral(provvM2square / 100).format('0,0[.]00 $')}
                      </h4>
                    )
                  : ''}
                {provvStefano > 0 && (
                  <h4
                    className={`list-item__sub-title ${payedStefano &&
                      'list-item--paid'}`}
                  >
                    Stefano: {numeral(provvStefano / 100).format('0,0[.]00 $')}
                  </h4>
                )}
                {payedAtStefano > 0 && (
                  <span className='list-item__sub-title'>
                    Bezahlt an Stefano am:{' '}
                    {moment(payedAtStefano).format('DD MMMM, YYYY')}
                  </span>
                )}
                {utente.role === 'Admin'
                  ? provvAgenziaPartner > 0 && (
                      <h4
                        className={`list-item__sub-title ${payedAgenziaPartner &&
                          'list-item--paid'}`}
                      >
                        Provision Kooperationspartner:{' '}
                        {numeral(provvAgenziaPartner / 100).format(
                          '0,0[.]00 $'
                        )}
                      </h4>
                    )
                  : ''}
              </div>
            </div>
          </div>
        </div>
        {/* se invio un oggetto singolo lo devo far diventare un array per poter utilizzare .map nel componete */}
        <OggettiList oggetto={[oggetto]} />
        {venditoreId.length > 0 && (
          <div>
            <ClientiList cliente={venditore} ruolo={'Verkäufer'} />
          </div>
        )}
        {venditoreId2.length > 0 && (
          <div>
            <ClientiList cliente={venditore2} ruolo={'2. Verkäufer'} />
          </div>
        )}
        {acquirenteId.length > 0 && (
          <div>
            <ClientiList cliente={acquirente} ruolo={'Käufer'} />
          </div>
        )}
        {acquirenteId2.length > 0 && (
          <div>
            <ClientiList cliente={acquirente2} ruolo={'2. Käufer'} />
          </div>
        )}
        {agenziaPartnerId.length > 0 && (
          <div>
            <ClientiList
              cliente={agenziaPartner}
              ruolo={'Kooperationspartner'}
            />
          </div>
        )}
        <div className='content-container'>
          {utente.role === 'Admin' && (
            <Link className='button button--secondary' to={`/edit/${id}`}>
              Provision bearbeiten
            </Link>
          )}

          <button
            className='print button button--secondary'
            onClick={() => {
              creaPrenotazione(
                acquirente,
                acquirente2,
                venditore,
                venditore2,
                oggetto,
                provvPercentuale,
                this.props.firma
              );
            }}
          >
            Provisionsbestätigung
          </button>
          <button
            className='print button button--secondary'
            onClick={() => {
              widerrufsBelehrung(
                acquirente,
                acquirente2,
                dataPrenotazione,
                oggetto,
                this.props.firma
              );
            }}
          >
            Widerrufsbelehrung
          </button>
          <button
            className='print button button--secondary'
            onClick={() => {
              vollmachtNotarauftrag(
                acquirente,
                acquirente2,
                venditore,
                venditore2,
                oggetto,
                notaio,
                prezzoDiVendita,
                this.props.firma
              );
            }}
          >
            Vollmacht Notarauftrag
          </button>
          <Link
            className='print button button--secondary'
            to={`/datenblatt/${id}`}
          >
            Notar Datenblatt
          </Link>
          <button
            className='print button button--secondary'
            onClick={() => {
              protocollo(
                acquirente,
                acquirente2,
                venditore,
                venditore2,
                oggetto,
                this.props.utente,
                this.props.firma,
                this.props.ceo
              );
            }}
          >
            Übergabeprotokoll
          </button>
        </div>
        <TodoForm dealId={id} />
        {utente.role === 'Admin' ? (
          <FattureList dealFatture={this.props.fatture} />
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  deal: state.deals.find(deal => deal.id === props.match.params.id),
  clienti: state.clienti,
  oggetti: state.oggetti,
  fatture: state.fatture.filter(
    fattura => fattura.dealId === props.match.params.id
  ),
  utente: state.utenti.find(utente => utente.firebaseAuthId === state.auth.uid),
  ceo: state.utenti.filter(utente => utente.qualifica === 'Geschäftsführer'),
  firma: state.firma[0]
});

export default connect(mapStateToProps)(ViewDealPage);

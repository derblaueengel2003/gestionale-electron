import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { creaPrenotazione } from '../moduli/Provisionsbestaetigung';
import { widerrufsBelehrung } from '../moduli/WiderrufsBelehrung';
import { vollmachtNotarauftrag } from '../moduli/VollmachtNotarauftrag';
import { protocollo } from '../moduli/UebergabeProtokoll';
import { notarDatenblatt } from '../moduli/NotarDatenblatt';
import moment from 'moment';
import numeral from 'numeral';
import TodoForm from './TodoForm';
import FattureList from '../fatture/FattureList';
import ClientiList from '../clienti/ClientiList';
import OggettiList from '../oggetti/OggettiList';

export class ViewDealPage extends React.Component {
  findContact = contact => {
    return this.props.clienti.filter(cliente => cliente.id === contact);
  };

  render() {
    const {
      acquirenteId,
      acquirenteId2,
      agenziaPartnerId,
      amount,
      belastungsVollmacht,
      consulenteVendita,
      createdAt,
      dataRogito,
      id,
      notaioId,
      note,
      oggettoId,
      payedAtStefano,
      payedStefano,
      payedAgenziaPartner,
      prezzoDiVendita,
      provvM2square,
      provvStefano,
      provvAgenziaPartner,
      venditoreId,
      venditoreId2
    } = this.props.deal;
    const { utente } = this.props;
    const oggetto = this.props.oggetti.find(ogg => ogg.id === oggettoId);
    const acquirente = this.findContact(acquirenteId);
    const acquirente2 = this.findContact(acquirenteId2);
    const venditore = this.findContact(venditoreId);
    const venditore2 = this.findContact(venditoreId2);
    const notaio = this.findContact(notaioId);
    const verwalter = this.findContact(oggetto.verwalter);
    const agenziaPartner = this.findContact(agenziaPartnerId);

    const kundenbetreuer = this.props.utenti.find(
      utente => utente.id === consulenteVendita
    );
    const provvPercentuale = numeral((amount / prezzoDiVendita) * 119).format(
      '0,0.00'
    );
    const dataPrenotazione = moment(createdAt).format('DD.MM.YYYY');
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
        <div className='grey lighten-4'>
          <div className='container'>
            <h1>Deal-Details</h1>
          </div>
        </div>

        <div className='container section'>
          <div>
            {utente.role === 'Admin' && (
              <Link className='btn-floating orange right' to={`/edit/${id}`}>
                <i className='material-icons'>edit</i>
              </Link>
            )}
          </div>
          <div>
            {prezzoDiVendita > 0 && (
              <h5>
                Verkaufspreis:{' '}
                {numeral(prezzoDiVendita / 100).format('0,0[.]00 $')}
              </h5>
            )}
            {createdAt > 0 && (
              <p>
                Reservierungsdatum: {moment(createdAt).format('DD MMMM, YYYY')}
              </p>
            )}
            {dataRogito > 0 && (
              <p>
                Beurkundungsdatum: {moment(dataRogito).format('DD MMMM, YYYY')}
              </p>
            )}
            {note.length > 0 && <p>Note: {note}</p>}
          </div>
          <div className='divider'></div>

          <div>
            {amount > 0 && (
              <h5>
                Provision:{' '}
                {utente.role === 'Admin'
                  ? numeral(amount / 100).format('0,0[.]00 $')
                  : ''}
              </h5>
            )}
            {kundenbetreuer && <p>Kundenbetreuer: {kundenbetreuer.name}</p>}
            {utente.role === 'Admin'
              ? provvM2square > 0 && (
                  <p className={`list-item--paid${payed}`}>
                    m2Square:{' '}
                    {numeral(provvM2square / 100).format('0,0[.]00 $')}
                  </p>
                )
              : ''}
            {provvStefano > 0 && (
              <p className={`${payedStefano && 'list-item--paid'}`}>
                Stefano: {numeral(provvStefano / 100).format('0,0[.]00 $')}
              </p>
            )}
            {payedAtStefano > 0 && (
              <p>
                Bezahlt an Stefano am:{' '}
                {moment(payedAtStefano).format('DD MMMM, YYYY')}
              </p>
            )}
            {utente.role === 'Admin'
              ? provvAgenziaPartner > 0 && (
                  <p className={`${payedAgenziaPartner && 'list-item--paid'}`}>
                    Provision Kooperationspartner:{' '}
                    {numeral(provvAgenziaPartner / 100).format('0,0[.]00 $')}
                  </p>
                )
              : ''}
          </div>
          <div className='divider'></div>
        </div>

        <div className='section'>
          <div className='grey lighten-4'>
            <div className='container'>
              <h1>Unterlagen herstellen</h1>
            </div>
          </div>
          <div className='container'>
            <ul className='collection'>
              <li className='collection-item'>
                <div>
                  {' '}
                  Provisionsbestätigung
                  <a href='#!' className='secondary-content'>
                    <i
                      className='material-icons'
                      onClick={() => {
                        creaPrenotazione(
                          acquirente[0],
                          acquirente2[0],
                          venditore[0],
                          venditore2[0],
                          oggetto,
                          provvPercentuale,
                          this.props.firma
                        );
                      }}
                    >
                      picture_as_pdf
                    </i>
                  </a>
                </div>
              </li>
              <li className='collection-item'>
                <div>
                  Widerrufsbelehrung
                  <a href='#!' className='secondary-content'>
                    <i
                      className='material-icons'
                      onClick={() => {
                        widerrufsBelehrung(
                          acquirente[0],
                          acquirente2[0],
                          dataPrenotazione,
                          oggetto,
                          this.props.firma
                        );
                      }}
                    >
                      picture_as_pdf
                    </i>
                  </a>
                </div>
              </li>
              <li className='collection-item'>
                <div>
                  Vollmacht Notarauftrag
                  <a href='#!' className='secondary-content'>
                    <i
                      className='material-icons'
                      onClick={() => {
                        vollmachtNotarauftrag(
                          acquirente[0],
                          acquirente2[0],
                          venditore[0],
                          venditore2[0],
                          oggetto,
                          notaio[0],
                          prezzoDiVendita,
                          this.props.firma
                        );
                      }}
                    >
                      picture_as_pdf
                    </i>
                  </a>
                </div>
              </li>
              <li className='collection-item'>
                <div>
                  Notar Datenblatt
                  {/*                   
                    <Link className='secondary-content' to={`/datenblatt/${id}`}>
                    <i className='material-icons'>print</i>
                  </Link>
*/}
                  <a href='#!' className='secondary-content'>
                    <i
                      className='material-icons'
                      onClick={() => {
                        notarDatenblatt(
                          acquirente[0],
                          acquirente2[0],
                          venditore[0],
                          venditore2[0],
                          oggetto,
                          notaio[0],
                          verwalter[0],
                          belastungsVollmacht,
                          utente,
                          this.props.firma,
                          this.props.ceo,
                          prezzoDiVendita
                        );
                      }}
                    >
                      picture_as_pdf
                    </i>
                  </a>
                </div>
              </li>
              <li className='collection-item'>
                <div>
                  Übergabeprotokoll
                  <a href='#!' className='secondary-content'>
                    <i
                      className='material-icons'
                      onClick={() => {
                        protocollo(
                          acquirente[0],
                          acquirente2[0],
                          venditore[0],
                          venditore2[0],
                          oggetto,
                          this.props.utente,
                          this.props.firma,
                          this.props.ceo
                        );
                      }}
                    >
                      picture_as_pdf
                    </i>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className='grey lighten-4'>
          <div className='container'>
            <h1>Infos</h1>
          </div>
        </div>
        {/* se invio un oggetto singolo lo devo far diventare un array per poter utilizzare .map nel componete */}
        <div>
          <OggettiList oggetto={[oggetto]} />
        </div>
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
        {notaio.length > 0 && (
          <div>
            <ClientiList cliente={notaio} ruolo={'Notar'} />
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
        {utente.role === 'Admin' ? (
          <FattureList dealFatture={this.props.fatture} />
        ) : (
          ''
        )}
        <TodoForm dealId={id} />
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
  utenti: state.utenti,
  ceo: state.utenti.filter(utente => utente.qualifica === 'Geschäftsführer'),
  firma: state.firma[0]
});

export default connect(mapStateToProps)(ViewDealPage);

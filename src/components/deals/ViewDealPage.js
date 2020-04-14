import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
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
  findContact = (contact) => {
    return this.props.clienti.filter((cliente) => cliente.id === contact);
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
      linguaRogito,
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
      venditoreId2,
    } = this.props.deal;
    const { utente, t } = this.props;
    const oggetto = this.props.oggetti.find((ogg) => ogg.id === oggettoId);
    const acquirente = this.findContact(acquirenteId);
    const acquirente2 = this.findContact(acquirenteId2);
    const venditore = this.findContact(venditoreId);
    const venditore2 = this.findContact(venditoreId2);
    const notaio = this.findContact(notaioId);
    const verwalter = this.findContact(oggetto.verwalter);
    const agenziaPartner = this.findContact(agenziaPartnerId);

    const kundenbetreuer = this.props.utenti.find(
      (utente) => utente.id === consulenteVendita
    );
    const provvPercentuale = numeral((amount / prezzoDiVendita) * 119).format(
      '0,0.00'
    );
    const dataPrenotazione = moment(createdAt).format('DD.MM.YYYY');
    // Determino quante fatture sono state pagate per mostrare i colori adatti. Da dealFature mi arriva un array
    let payed = 0;
    this.props.fatture.map((fattura) => fattura.payed && payed++);
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
            <h1>
              {oggetto &&
                `Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}`}
            </h1>
          </div>
        </div>

        <div className='container section'>
          <div>
            {utente.role === 'Admin' && (
              <Link
                className='btn-floating orange right btn-floating-margin'
                to={`/edit/${id}`}
              >
                <i className='material-icons'>edit</i>
              </Link>
            )}
          </div>
          <div>
            {prezzoDiVendita > 0 && (
              <h5>
                {t('Prezzo di vendita')}:{' '}
                {numeral(prezzoDiVendita / 100).format('0,0[.]00 $')}
              </h5>
            )}
            {createdAt > 0 && (
              <p>
                {t('Data prenotazione')}:{' '}
                {moment(createdAt).format('DD MMMM, YYYY')}
              </p>
            )}
            {dataRogito > 0 && (
              <p>
                {t('Data del rogito')}:{' '}
                {moment(dataRogito).format('DD MMMM, YYYY')}
              </p>
            )}
            {note && (
              <p>
                {t('Note')}: {note}
              </p>
            )}
          </div>
          <div className='divider'></div>

          <div>
            {amount > 0 && (
              <h5>
                {t('Provvigione')}:{' '}
                {utente.role === 'Admin'
                  ? numeral(amount / 100).format('0,0[.]00 $')
                  : ''}
              </h5>
            )}
            {kundenbetreuer && (
              <p>
                {t('Consulente vendita')}: {kundenbetreuer.name}
              </p>
            )}
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
                {t('Pagato')} Stefano:{' '}
                {moment(payedAtStefano).format('DD MMMM, YYYY')}
              </p>
            )}
            {utente.role === 'Admin'
              ? provvAgenziaPartner > 0 && (
                  <p className={`${payedAgenziaPartner && 'list-item--paid'}`}>
                    {t('Provvigione')} {t('Partner commerciale')}:{' '}
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
              <h1>{t('Crea documentazione')}</h1>
            </div>
          </div>
          <div className='container'>
            <ul className='collection'>
              <li className='collection-item'>
                <div>
                  {' '}
                  {t('Conferma provvigione')}
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
                  {t('Informativa sul diritto di recesso')}
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
                  {t('Delega richiesta bozza di contratto')}
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
                  {t('Foglio informativo per il notaio')}
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
                          prezzoDiVendita,
                          linguaRogito
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
                  {t('Protocollo consegna appartamento')}
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
            <h1>{t('Informazioni')}</h1>
          </div>
        </div>
        {/* se invio un oggetto singolo lo devo far diventare un array per poter utilizzare .map nel componete */}
        <div>
          <OggettiList oggetto={[oggetto]} ruolo={`${t('Oggetti')}`} />
        </div>
        {venditoreId && (
          <div>
            <ClientiList cliente={venditore} ruolo={`${t('Venditore')}`} />
          </div>
        )}
        {venditoreId2 && (
          <div>
            <ClientiList cliente={venditore2} ruolo={`2. ${t('Venditore')}`} />
          </div>
        )}
        {acquirenteId && (
          <div>
            <ClientiList cliente={acquirente} ruolo={`${t('Acquirente')}`} />
          </div>
        )}
        {acquirenteId2 && (
          <div>
            <ClientiList
              cliente={acquirente2}
              ruolo={`2. ${t('Acquirente')}`}
            />
          </div>
        )}
        {notaio && (
          <div>
            <ClientiList cliente={notaio} ruolo={`${t('Notaio')}`} />
          </div>
        )}
        {agenziaPartnerId && (
          <div>
            <ClientiList
              cliente={agenziaPartner}
              ruolo={`${t('Partner commerciale')}`}
            />
          </div>
        )}
        {utente.role === 'Admin' ? (
          <FattureList
            dealFatture={this.props.fatture}
            ruolo={`${t('Fatture')}`}
          />
        ) : (
          ''
        )}
        <TodoForm dealId={id} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  deal: state.deals.find((deal) => deal.id === props.match.params.id),
  clienti: state.clienti,
  oggetti: state.oggetti,
  fatture: state.fatture.filter(
    (fattura) => fattura.dealId === props.match.params.id
  ),
  utente: state.utenti.find(
    (utente) => utente.firebaseAuthId === state.auth.uid
  ),
  utenti: state.utenti,
  ceo: state.utenti.filter((utente) => utente.qualifica === 'Geschäftsführer'),
  firma: state.firma[0],
});

export default connect(mapStateToProps)(withTranslation()(ViewDealPage));

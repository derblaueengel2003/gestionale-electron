import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { creaPrenotazione } from '../moduli/Provisionsbestaetigung';
import { widerrufsBelehrung } from '../moduli/WiderrufsBelehrung';
import { vollmachtNotarauftrag } from '../moduli/VollmachtNotarauftrag';
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
      belastungsVollmacht,
      payedStefano,
      id
    } = this.props.deal;
    const { uid } = this.props;
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
    const verwalter = this.props.clienti.find(
      cliente => cliente.id === oggetto.verwalter
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

    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Dettagli Provvigione</h1>
          </div>
        </div>
        <div className='content-container'>
          <div className='list-header'>
            <div className='show-for-mobile'>Dettagli</div>
            <div className='show-for-desktop'>Dettagli</div>
            <div className='show-for-desktop'></div>
          </div>
          <div className='list-body'>
            <div className='list-item'>
              <div>
                {prezzoDiVendita > 0 && (
                  <h3 className='list-item__title'>
                    Prezzo di Vendita:{' '}
                    {numeral(prezzoDiVendita / 100).format('0,0[.]00 $')}
                  </h3>
                )}
                {createdAt > 0 && (
                  <span className='list-item__sub-title'>
                    Data prenotazione:{' '}
                    {moment(createdAt).format('DD MMMM, YYYY')}
                  </span>
                )}
                {dataRogito > 0 && (
                  <h4 className='list-item__sub-title'>
                    Data rogito: {moment(dataRogito).format('DD MMMM, YYYY')}
                  </h4>
                )}
                {note.length > 0 && (
                  <span className='list-item__sub-title'>Note: {note}</span>
                )}
              </div>
              <div>
                {amount > 0 && (
                  <h3 className='list-item__title'>
                    Provvigione:{' '}
                    {uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' ||
                    uid === 'BNhRvZCcvMPr54unKlYSSliPel42'
                      ? numeral(amount / 100).format('0,0[.]00 $')
                      : ''}
                  </h3>
                )}
                {consulenteVendita > 0 && (
                  <h4 className='list-item__sub-title'>
                    Cliente di: {consulenteVendita}
                  </h4>
                )}
                {uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' ||
                uid === 'BNhRvZCcvMPr54unKlYSSliPel42'
                  ? provvM2square > 0 && (
                      <h4
                        className={`list-item__sub-title ${this.props.fatture
                          .payed && 'list-item--paid'}`}
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
                    Pagata a Stefano il:{' '}
                    {moment(payedAtStefano).format('DD MMMM, YYYY')}
                  </span>
                )}
                {uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' ||
                uid === 'BNhRvZCcvMPr54unKlYSSliPel42'
                  ? provvAgenziaPartner > 0 && (
                      <h4
                        className={`list-item__sub-title ${payedAgenziaPartner &&
                          'list-item--paid'}`}
                      >
                        Provvigione Agenzia Partner:{' '}
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
            <ClientiList cliente={agenziaPartner} ruolo={'Agenzia Partner'} />
          </div>
        )}
        <div className='content-container'>
          {uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' && (
            <Link className='button button--secondary' to={`/edit/${id}`}>
              Modifica Provvigione
            </Link>
          )}
          <button
            className='print button button--secondary'
            onClick={() => {
              creaPrenotazione(
                acquirente,
                venditore,
                venditore2,
                oggetto,
                provvPercentuale
              );
            }}
          >
            Provisionsbestätigung
          </button>
          <button
            className='print button button--secondary'
            onClick={() => {
              widerrufsBelehrung(acquirente, dataPrenotazione, oggetto);
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
                prezzoDiVendita
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
        </div>
        <TodoForm dealId={id} />
        {uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' ||
        uid === 'BNhRvZCcvMPr54unKlYSSliPel42' ? (
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
  uid: state.auth.uid
});

export default connect(mapStateToProps)(ViewDealPage);

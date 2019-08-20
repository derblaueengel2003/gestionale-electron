import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import { creaPrenotazione } from '../moduli/Provisionsbestaetigung'
import { widerrufsBelehrung } from '../moduli/WiderrufsBelehrung'
import { vollmachtNotarauftrag } from '../moduli/VollmachtNotarauftrag'
import TodoForm from './TodoForm'
import FattureList from '../fatture/FattureList'
import ClientiList from '../clienti/ClientiList'
import OggettiList from '../oggetti/OggettiList'

export class ViewDealPage extends React.Component {
    
    render() {
        if (this.props.uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' || this.props.uid === 'BNhRvZCcvMPr54unKlYSSliPel42') {
            const acquirente = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId)
            const acquirente2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId2)
            const venditore = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId)
            const venditore2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId2)
            const agenziaPartner = this.props.clienti.find((cliente) => cliente.id === this.props.deal.agenziaPartnerId)
            const oggetto = this.props.oggetti.find((ogg) => ogg.id === this.props.deal.description)
            const provvPercentuale = numeral((this.props.deal.amount / this.props.deal.prezzoDiVendita) * 119).format('0,0.00')
            const dataPrenotazione = moment(this.props.deal.createdAt).format('DD.MM.YYYY')
            const notaio = this.props.clienti.find((cliente) => cliente.id === this.props.deal.notaioId)

            return (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Dettagli Provvigione</h1>
                        </div>
                    </div>
                    <OggettiList oggetto={oggetto} />
                    <div className="content-container">
                        <div className="list-header">
                            <div className="show-for-mobile">Dettagli</div>
                            <div className="show-for-desktop">Dettagli</div>
                            <div className="show-for-desktop"></div>
                        </div>
                        <div className="list-body">
                            <div className="list-item">
                                <div>
                                    {this.props.deal.prezzoDiVendita > 0 && <h3 className="list-item__title">Prezzo di Vendita: {numeral(this.props.deal.prezzoDiVendita / 100).format('0,0[.]00 $')}</h3>}
                                    {this.props.deal.createdAt > 0 && <span className="list-item__sub-title">Data prenotazione: {moment(this.props.deal.createdAt).format('DD MMMM, YYYY')}</span>}
                                    {this.props.deal.dataRogito > 0 && <h4 className="list-item__sub-title">Data rogito: {moment(this.props.deal.dataRogito).format('DD MMMM, YYYY')}</h4>}
                                    {this.props.deal.note.length > 0 && <span className="list-item__sub-title">Note: {this.props.deal.note}</span>}
                                </div>
                                <div>
                                    {this.props.deal.amount > 0 && <h3 className="list-item__title">Provvigione: {numeral(this.props.deal.amount / 100).format('0,0[.]00 $')}</h3>}
                                    {this.props.deal.consulenteVendita > 0 && <h4 className="list-item__sub-title">Cliente di: {this.props.deal.consulenteVendita}</h4>}
                                    {this.props.deal.provvM2square > 0 && <h4 className={`list-item__sub-title ${this.props.fatture.payed && 'list-item--paid'}`}>m2Square: {numeral(this.props.deal.provvM2square / 100).format('0,0[.]00 $')}</h4>}
                                    {this.props.deal.payedAt > 0 && <span className="list-item__sub-title">Prenotazione pagata il: {moment(this.props.deal.payedAt).format('DD MMMM, YYYY')}</span>}
                                    {this.props.deal.provvStefano > 0 && <h4 className={`list-item__sub-title ${this.props.deal.payedStefano && 'list-item--paid'}`}>Stefano: {numeral(this.props.deal.provvStefano / 100).format('0,0[.]00 $')}</h4>}
                                    {this.props.deal.payedAtStefano > 0 && <span className="list-item__sub-title">Pagata a Stefano il: {moment(this.props.deal.payedAtStefano).format('DD MMMM, YYYY')}</span>}
                                    {this.props.deal.agenziaPartnerId.length > 0 && <h4 className="list-item__sub-title">Agenzia Partner: {agenziaPartner.nome} {agenziaPartner.cognome} {agenziaPartner.ditta && ` - Firma: ${agenziaPartner.ditta}`}</h4>}
                                    {this.props.deal.provvAgenziaPartner > 0 && <h4 className={`list-item__sub-title ${this.props.deal.payedAgenziaPartner && 'list-item--paid'}`}>Provvigione Agenzia Partner: {numeral(this.props.deal.provvAgenziaPartner / 100).format('0,0[.]00 $')}</h4>}
                                </div>
                            </div>
                        </div>
                    </div>
                        {this.props.deal.venditoreId.length > 0 && <div><ClientiList cliente={venditore} ruolo={'Verkäufer'} /></div>}
                        {this.props.deal.venditoreId2.length > 0 && <div><ClientiList cliente={venditore2} ruolo={'2. Verkäufer'} /></div>}
                        {this.props.deal.acquirenteId.length > 0 && <div><ClientiList cliente={acquirente} ruolo={'Käufer'} /></div>}
                        {this.props.deal.acquirenteId2.length > 0 && <div><ClientiList cliente={acquirente2} ruolo={'2. Käufer'} /></div>}
                       
                    <div className="content-container">
                        {this.props.uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' && <Link className="button button--secondary" to={`/edit/${this.props.deal.id}`}>Modifica Provvigione</Link>}

                        <button className="print button button--secondary"
                            onClick={() => { creaPrenotazione(acquirente, venditore, venditore2, oggetto, provvPercentuale) }}>
                        Provisionsbestätigung
                        </button>
                        <button className="print button button--secondary"
                            onClick={() => { widerrufsBelehrung(acquirente, dataPrenotazione, oggetto) }}>
                            Widerrufsbelehrung
                        </button>
                        <button className="print button button--secondary"
                            onClick={() => { vollmachtNotarauftrag(acquirente, acquirente2, venditore, venditore2, oggetto, notaio) }}>
                            Vollmacht Notarauftrag
                        </button>

                        <Link className="button button--secondary" to={`/datenblatt/${this.props.deal.id}`}>Notar Datenblatt</Link>
                    </div>
                    <TodoForm dealId={this.props.deal.id} />
                    <FattureList dealFatture={this.props.fatture}/>
                    
                </div>
            )
        } else {
            const acquirente = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId)
            const acquirente2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId2)
            const venditore = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId)
            const venditore2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId2)
            const agenziaPartner = this.props.clienti.find((cliente) => cliente.id === this.props.deal.agenziaPartnerId)
            const oggetto = this.props.oggetti.find((ogg) => ogg.id === this.props.deal.description)
            const provvPercentuale = numeral((this.props.deal.amount / this.props.deal.prezzoDiVendita) * 119).format('0,0.00')
            const dataPrenotazione = moment(this.props.deal.createdAt).format('DD.MM.YYYY')
            const notaio = this.props.clienti.find((cliente) => cliente.id === this.props.deal.notaioId)
            return (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Dettagli Provvigione</h1>
                        </div>
                    </div>
                    <OggettiList oggetto={oggetto} />
                    <div className="content-container"><div className="list-header">
                        <div className="show-for-mobile">Dettagli</div>
                        <div className="show-for-desktop">Dettagli</div>
                        <div className="show-for-desktop"></div>
                    </div>
                        <div className="list-body">
                            <div className="list-item">
                                <div>
                                    {this.props.deal.prezzoDiVendita > 0 && <h3 className="list-item__title">Prezzo di Vendita: {numeral(this.props.deal.prezzoDiVendita / 100).format('0,0[.]00 $')}</h3>}
                                    {this.props.deal.createdAt > 0 && <span className="list-item__sub-title">Data prenotazione: {moment(this.props.deal.createdAt).format('DD MMMM, YYYY')}</span>}
                                    {this.props.deal.dataRogito > 0 && <h4 className="list-item__sub-title">Data rogito: {moment(this.props.deal.dataRogito).format('DD MMMM, YYYY')}</h4>}
                                    {this.props.deal.note.length > 0 && <span className="list-item__sub-title">Note: {this.props.deal.note}</span>}
                                </div>
                                <div>
                                    {this.props.deal.provvStefano > 0 && <h3 className={`list-item__title ${this.props.deal.payedStefano && 'list-item--paid'}`}>Provvigione Stefano: {numeral(this.props.deal.provvStefano / 100).format('0,0[.]00 $')}</h3>}
                                    {this.props.deal.payedAtStefano > 0 && <span className="list-item__sub-title">Pagata il: {moment(this.props.deal.payedAtStefano).format('DD MMMM, YYYY')}</span>}
                                    {this.props.deal.agenziaPartnerId.length > 0 && <h4 className="list-item__sub-title">Agenzia Partner: {agenziaPartner.nome} {agenziaPartner.cognome} {agenziaPartner.ditta && ` - Firma: ${agenziaPartner.ditta}`}</h4>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.deal.venditoreId.length > 0 && <div><ClientiList cliente={venditore} ruolo={'Verkäufer'} /></div>}
                    {this.props.deal.venditoreId2.length > 0 && <div><ClientiList cliente={venditore2} ruolo={'2. Verkäufer'} /></div>}
                    {this.props.deal.acquirenteId.length > 0 && <div><ClientiList cliente={acquirente} ruolo={'Käufer'} /></div>}
                    {this.props.deal.acquirenteId2.length > 0 && <div><ClientiList cliente={acquirente2} ruolo={'2. Käufer'} /></div>}

                    <div className="content-container">
                        <button className="print button button--secondary"
                            onClick={() => { creaPrenotazione(acquirente, venditore, venditore2, oggetto, provvPercentuale) }}>
                            Provisionsbestätigung
                        </button>
                        <button className="print button button--secondary"
                            onClick={() => { widerrufsBelehrung(acquirente, dataPrenotazione, oggetto) }}>
                            Widerrufsbelehrung
                        </button>
                        <button className="print button button--secondary"
                            onClick={() => { vollmachtNotarauftrag(acquirente, acquirente2, venditore, venditore2, oggetto, notaio) }}>
                            Vollmacht Notarauftrag
                        </button>
                        <Link className="button button--secondary" to={`/datenblatt/${this.props.deal.id}`}>Notar Datenblatt</Link>
                    </div>
                    <TodoForm dealId={this.props.deal.id} />
                </div>
            )
        }    
    }
}

const mapStateToProps = (state, props) => ({
    deal: state.deals.find((deal) => deal.id === props.match.params.id), 
    clienti: state.clienti,
    oggetti: state.oggetti,
    fatture: state.fatture.filter((fattura) => fattura.dealId === props.match.params.id),
    uid: state.auth.uid
})

export default connect(mapStateToProps)(ViewDealPage)
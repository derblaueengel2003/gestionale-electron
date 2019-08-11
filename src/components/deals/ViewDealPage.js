import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import { doc, imgData } from '../moduli/Provisionsbestaetigung'

export class ViewDealPage extends React.Component {
    creaPrenotazione = () => {
        const acquirente = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId)
        const venditore = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId)
        const venditore2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId2)
        const oggetto = this.props.oggetti.find((ogg) => ogg.id === this.props.deal.description)
        const acqDitta = `${acquirente.ditta && `${acquirente.ditta}`}`
        const acqNome = `${acquirente.titolo} ${acquirente.nome} ${acquirente.cognome}`
        const acqInd = `${acquirente.indirizzo}, ${acquirente.cap} ${acquirente.comune}, ${acquirente.nazione}`
        const vendDitta = `${venditore.ditta && `${venditore.ditta}`}`
        const vendNome = `${venditore.titolo} ${venditore.nome} ${venditore.cognome}`
        const vendInd = `${venditore.indirizzo}, ${venditore.cap} ${venditore.comune}, ${venditore.nazione}`
        const vendDitta2 = venditore2 && `${venditore2.ditta && `${venditore2.ditta}`}`
        const vendNome2 = venditore2 && `${venditore2.titolo} ${venditore2.nome} ${venditore2.cognome}`
        const vendInd2 = venditore2 && `${venditore2.indirizzo}, ${venditore2.cap} ${venditore2.comune}, ${venditore2.nazione}`
        const provvPercentuale = numeral((this.props.deal.amount / this.props.deal.prezzoDiVendita) * 119).format('0,0.00')
       
        doc.addImage(imgData, 'JPEG', 0,0,210,297)
        if (acqDitta.length > 70 || acqInd.length > 70 || acqNome.length > 70) {
            doc.setFontSize(10)
        } else if (acqDitta.length > 100 || acqInd.length > 100 || acqNome.length > 100)
            doc.setFontSize(8)
        else {
            doc.setFontSize(12)
        }
         if (acqDitta.length > 0) {
            doc.text(acqDitta, 61, 30)
            doc.text(acqNome, 61, 35)
            doc.text(acqInd, 61, 40)
        } else {
            doc.text(acqNome, 61, 30)
            doc.text(acqInd, 61, 35)
        }
        doc.text(provvPercentuale, 93, 87)
        doc.text(oggetto.rifId, 25, 136)
        doc.text(`Eigentumswohnung`, 41, 136)
        doc.text(`${oggetto.stato}`, 41, 141)
        doc.text(`Etage: ${oggetto.piano}`, 41, 146)
        doc.text(`m2: ${oggetto.m2}`, 41, 151)
        doc.text(`${oggetto.via} ${oggetto.numeroCivico}`, 95, 136)
        doc.text(`WE ${oggetto.numeroAppartamento}`, 95, 141)
        doc.text(`${oggetto.cap} ${oggetto.citta}`, 95, 146)

        if (vendDitta.length > 25 || vendInd.length > 25 || vendNome.length > 25) {
            doc.setFontSize(10)
        } else if (vendDitta.length > 50 || vendInd.length > 50 || vendNome.length > 50)
            doc.setFontSize(8)
        else {
            doc.setFontSize(12)
        }
        if (vendDitta.length > 0) {
            doc.text(vendDitta, 148, 136)
            doc.text(vendNome, 148, 141)
            doc.text(venditore.indirizzo, 148, 146)
            doc.text(`${venditore.cap} ${venditore.comune}`, 148, 151)
            doc.text(`${venditore.nazione}`, 148, 156)

        } else {
            doc.text(vendNome, 148, 136)
            doc.text(venditore.indirizzo, 148, 141)
            doc.text(`${venditore.cap} ${venditore.comune}`, 148, 146)
            doc.text(`${venditore.nazione}`, 148, 151)
        }

        if (venditore2) {
            doc.text(vendDitta2, 148, 161)
            doc.text(vendNome2, 148, 166)
            doc.text(venditore2.indirizzo, 148, 171)
            doc.text(`${venditore2.cap} ${venditore2.comune}`, 148, 176)
            doc.text(`${venditore2.nazione}`, 148, 181)
        }

        doc.save(`${acquirente.cognome} Provisionsbestätigung.pdf`)
    }

    render() {

        if (this.props.uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' || this.props.uid === 'BNhRvZCcvMPr54unKlYSSliPel42') {
            const acquirente = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId)
            const acquirente2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId2)
            const venditore = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId)
            const venditore2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId2)
            const agenziaPartner = this.props.clienti.find((cliente) => cliente.id === this.props.deal.agenziaPartnerId)
            const oggetto = this.props.oggetti.find((ogg) => ogg.id === this.props.deal.description)
           
            return (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Dettagli Provvigione</h1>
                        </div>
                    </div>
                    <div className="content-container">
                        {this.props.deal.description.length > 0 && <div>{`Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`}</div>}
                        {this.props.deal.createdAt > 0 && <div>Data prenotazione: {moment(this.props.deal.createdAt).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.prezzoDiVendita > 0 && <div>Prezzo di Vendita: {numeral(this.props.deal.prezzoDiVendita / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.amount > 0 && <div>Provvigione: {numeral(this.props.deal.amount / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.consulenteVendita > 0 && <div>Cliente di: {this.props.deal.consulenteVendita}</div>}
                        {this.props.deal.provvM2square > 0 && <div className={`${this.props.deal.payed && 'list-item--paid'}`}>m2Square: {numeral(this.props.deal.provvM2square / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.payedAt > 0 && <div>Prenotazione pagata il: {moment(this.props.deal.payedAt).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.provvStefano > 0 && <div className={`${this.props.deal.payedStefano && 'list-item--paid'}`}>Stefano: {numeral(this.props.deal.provvStefano / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.payedAtStefano > 0 && <div>Pagata a Stefano il: {moment(this.props.deal.payedAtStefano).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.agenziaPartnerId.length > 0 && <div>Agenzia Partner: {agenziaPartner.nome} {agenziaPartner.cognome} {agenziaPartner.ditta && ` - Firma: ${agenziaPartner.ditta}`}</div>}
                        {this.props.deal.provvAgenziaPartner > 0 && <div className={`${this.props.deal.payedAgenziaPartner && 'list-item--paid'}`}>Provvigione Agenzia Partner: {numeral(this.props.deal.provvAgenziaPartner / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.venditoreId.length > 0 && <div>Venditore: {venditore.nome} {venditore.cognome} {venditore.ditta && ` - Firma: ${venditore.ditta}`}</div>}
                        {this.props.deal.venditoreId2.length > 0 && <div>Secondo Venditore: {venditore2.nome} {venditore2.cognome} {venditore2.ditta && ` - Firma: ${venditore2.ditta}`}</div>}
                        {this.props.deal.acquirenteId.length > 0 && <div>Acquirente: {acquirente.nome} {acquirente.cognome} {acquirente.ditta && ` - Firma: ${acquirente.ditta}`}</div>}
                        {this.props.deal.acquirenteId2.length > 0 && <div>Secondo Acquirente: {acquirente2.nome} {acquirente2.cognome} {acquirente2.ditta && ` - Firma: ${acquirente2.ditta}`}</div>}
                        {this.props.deal.numeroFattura && <div>Numero Fattura: {this.props.deal.numeroFattura}</div>}
                        {this.props.deal.dataFattura && <div>Data fattura: {moment(this.props.deal.dataFattura).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.dataRogito > 0 && <div>Data rogito: {moment(this.props.deal.dataRogito).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.note.length > 0 && <div>Note: {this.props.deal.note}</div>}
                        {this.props.uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' && <Link className="button button--secondary" to={`/edit/${this.props.deal.id}`}>Modifica Provvigione</Link>}
                        <Link className="button button--secondary" to={`/datenblatt/${this.props.deal.id}`}>Notar Datenblatt</Link>
                        <button className="print button button--secondary"
                        onClick={this.creaPrenotazione}>
                        Crea Prenotazione
                        </button>
                    </div>
                  
                </div>
            )
        } else {
            const acquirente = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId)
            const acquirente2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId2)
            const venditore = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId)
            const venditore2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId2)
            const agenziaPartner = this.props.clienti.find((cliente) => cliente.id === this.props.deal.agenziaPartnerId)
            const oggetto = this.props.oggetti.find((ogg) => ogg.id === this.props.deal.description)
            return (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Dettagli Provvigione</h1>
                        </div>
                    </div>
                    <div className="content-container">
                        {this.props.deal.description.length > 0 && <div>{`Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`}</div>}
                        {this.props.deal.rifId > 0 && <div>Rif. Id: {this.props.deal.rifId}</div>}
                        {this.props.deal.prezzoDiVendita > 0 && <div>Prezzo di Vendita: {numeral(this.props.deal.prezzoDiVendita / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.provvStefano > 0 && <div className={`list-item ${this.props.deal.payedStefano && 'list-item--paid'}`}>Stefano: {numeral(this.props.deal.provvStefano / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.payedAtStefano > 0 && <div>Pagata il: {moment(this.props.deal.payedAtStefano).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.createdAt > 0 && <div>Data prenotazione: {moment(this.props.deal.createdAt).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.agenziaPartnerId.length > 0 && <div>Agenzia Partner: {agenziaPartner.nome} {agenziaPartner.cognome} {agenziaPartner.ditta}</div>}
                        {this.props.deal.venditoreId.length > 0 && <div>Venditore: {venditore.nome} {venditore.cognome}</div>}
                        {this.props.deal.venditoreId2.length > 0 && <div>Secondo Venditore: {venditore2.nome} {venditore2.cognome}</div>}
                        {this.props.deal.acquirenteId.length > 0 && <div>Acquirente: {acquirente.nome} {acquirente.cognome}</div>}
                        {this.props.deal.acquirenteId2.length > 0 && <div>Secondo Acquirente: {acquirente2.nome} {acquirente2.cognome}</div>}
                        {this.props.deal.dataRogito > 0 && <div>Data rogito: {moment(this.props.deal.dataRogito).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.note.length > 0 && <div>Note: {this.props.deal.note}</div>}
                        <Link className="button button--secondary" to={`/datenblatt/${this.props.deal.id}`}>Notar Datenblatt</Link>
                        <button className="print button button--secondary"
                        onClick={this.creaPrenotazione}>
                        Crea Prenotazione
                        </button>
                    </div>
                </div>
            )
        }
        
    }
}

const mapStateToProps = (state, props) => ({
    deal: state.deals.find((deal) => deal.id === props.match.params.id), 
    clienti: state.clienti,
    oggetti: state.oggetti,
    uid: state.auth.uid
})

export default connect(mapStateToProps)(ViewDealPage)
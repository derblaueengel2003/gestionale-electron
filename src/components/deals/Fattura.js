import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

export class Fattura extends React.Component {
   
    render() {
       
        const acquirente = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId)
        const acquirente2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId2)
        const fattura = this.props.fatture.find((ogg) => ogg.id === this.props.deal.description)
        const formulaSaluto = acquirente.titolo === 'Herr' ? `Sehr geehrter Herr ` : `Sehr geehrte Frau `
        const corpoFattura =  (`${formulaSaluto} ${acquirente.cognome},
        entsprechend dem rechtskräftigen Kaufvertrag vom ${moment(this.props.deal.dataRogito).format('DD.MM.YYYY')} 
        sowie unserer Vereinbarung berechnen wir Ihnen für unsere Nachweis- bzw. Vermittlungstätigkeit zum Verkauf des Objekts
         ${fattura.via} ${fattura.numeroCivico}, WE ${fattura.numeroAppartamento}, ${fattura.cap} ${fattura.citta}:`)

        return (
            <div>
               <img src="../../images/logo.png" />
               <div>
                    m2Square - Arboscello & Fornari GbR - Kastanienallee 2 - 10435 Berlin
                </div>
                <div>
                    {acquirente.ditta} <br></br>
                    {acquirente.titolo} {acquirente.nome} {acquirente.cognome} <br></br>
                    {acquirente.indirizzo} <br></br>
                    {acquirente.cap} {acquirente.comune} <br></br>
                    {acquirente.nazione !== "Deutschland" && acquirente.nazione}                   
                </div>
                
                    <div>
                    Rechnung Nr.: {this.props.deal.numeroFattura}<br></br>
                    Berlin, {this.props.deal.dataFattura}
                    </div>
                {corpoFattura}     
            </div>
        
        )
    }
}

const mapStateToProps = (state, props) => ({
    deal: state.deals.find((deal) => deal.id === props.match.params.id),
    clienti: state.clienti,
    fatture: state.fatture
})

export default connect(mapStateToProps)(Fattura)

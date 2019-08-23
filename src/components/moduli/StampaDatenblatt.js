import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'

export class StampaDatenblatt extends React.Component {
    print() {
        window.print()
    }
    render() {
        const acquirente = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId)
        const acquirente2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId2)
        const venditore = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId)
        const venditore2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId2)
        const oggetto = this.props.oggetti.find((ogg) => ogg.id === this.props.deal.oggettoId)
        const verwalter = this.props.clienti.find((cliente) => cliente.id === oggetto.verwalter)

        
        return (               
            <div className="content-container">
                
                <div>
                    <h1>Datenblatt Wohnungskauf</h1>
                </div>
                <div>
                    <h2>Makler</h2>
                    <p>m2Square - Arboscello & Fornari GbR</p>
                    <p>Kastanienallee 2, 10435 Berlin</p>
                    <p>Tel: +49 30 54482958 - E-Mail: info@m2square.eu</p>
                </div>
                <div>
                    <h2>Objekt</h2>
                    <p>{`Adresse: ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`}</p>
                    <p>{oggetto.grundbuch !== '' && `Grundbuch von ${oggetto.grundbuch}, Blatt Nr. ${oggetto.grundbuchBlatt}`}</p>
                    <p>{`m2: ${oggetto.m2}`}</p>
                    <p>{`Etage: ${oggetto.piano}`}</p>
                    <p>{`Status: ${oggetto.stato}`}</p>
                    {oggetto.stato === 'vermietet' && <p>{`Kaltmiete: ${numeral(oggetto.affittoNetto / 100).format('0,0[.]00 $')}`}</p>}

                    <p>{`Wohngeld: ${numeral(oggetto.wohngeld / 100).format('0,0[.]00 $')}`}</p>
                    <p>{oggetto.ruecklage && `Instandhaltungsrücklage: ${oggetto.ruecklage}`}</p>
                    <p>{`Kaufpreis: ${numeral(this.props.deal.prezzoDiVendita / 100).format('0,0[.]00 $')}`}</p>
                    <p>Belastungsvollmacht: {this.props.deal.belastungsVollmacht ? `Ja` : `Nein`}</p>
                    <p>{oggetto.mobilio && `Einrichtung: siehe Liste`}</p>
                    <p></p>
                    <p></p>
                </div>
                <div>
                    <h2>Verkäufer</h2>
                    <p>{venditore.ditta && `Firma ${venditore.ditta}`}</p>
                    <p>{`${venditore.titolo} ${venditore.nome} ${venditore.cognome}`}</p>
                    <p>{`${venditore.indirizzo} ${venditore.cap}, ${venditore.nazione}`}</p>
                    <p>{venditore.codiceFiscale && `SteuerId-Nr. ${venditore.codiceFiscale}`}</p>
                    <p>{venditore.handelsRegisterNummer && `Handelsregister-Nr. ${venditore.handelsRegisterNummer}`}</p>
                    <p>{venditore.telefono1 && `Tel.: ${venditore.telefono1} - `}{venditore.email && `Email: ${venditore.email}`}</p>
                </div>
                {this.props.deal.venditoreId2.length > 0 && <div>
                    <h2>Verkäufer Nr. 2</h2>
                    <p>{venditore2.ditta && `Firma ${venditore2.ditta}`}</p>
                    <p>{`${venditore2.titolo} ${venditore2.nome} ${venditore2.cognome}`}</p>
                    <p>{`${venditore2.indirizzo} ${venditore2.cap}, ${venditore2.nazione}`}</p>
                    <p>{venditore2.codiceFiscale && `SteuerId-Nr. ${venditore2.codiceFiscale}`}</p>
                    <p>{venditore2.handelsRegisterNummer && `Handelsregister-Nr. ${venditore2.handelsRegisterNummer}`}</p>
                    <p>{venditore2.telefono1 && `Tel.: ${venditore2.telefono1} - `}{venditore2.email && `Email: ${venditore2.email}`}</p>
                </div>
                }   
                <div>
                    <h2>Käufer</h2>
                    <p>{acquirente.ditta && `Firma ${acquirente.ditta}`}</p>
                    <p>{`${acquirente.titolo} ${acquirente.nome} ${acquirente.cognome}`}</p>
                    <p>{`${acquirente.indirizzo} ${acquirente.cap}, ${acquirente.nazione}`}</p>
                    <p>{acquirente.codiceFiscale && `SteuerId-Nr. ${acquirente.codiceFiscale}`}</p>
                    <p>{acquirente.handelsRegisterNummer && `Handelsregister-Nr. ${acquirente.handelsRegisterNummer}`}</p>
                    <p>{acquirente.telefono1 && `Tel.: ${acquirente.telefono1} - `}{acquirente.email && `Email: ${acquirente.email}`}</p>
                </div>
                {this.props.deal.acquirenteId2.length > 0 && <div>
                    <h2>Käufer Nr. 2</h2>
                    <p>{acquirente2.ditta && `Firma ${acquirente2.ditta}`}</p>
                    <p>{`${acquirente2.titolo} ${acquirente2.nome} ${acquirente2.cognome}`}</p>
                    <p>{`${acquirente2.indirizzo} ${acquirente2.cap}, ${acquirente2.nazione}`}</p>
                    <p>{acquirente2.codiceFiscale && `SteuerId-Nr. ${acquirente2.codiceFiscale}`}</p>
                    <p>{acquirente2.handelsRegisterNummer && `Handelsregister-Nr. ${acquirente2.handelsRegisterNummer}`}</p>
                    <p>{acquirente2.telefono1 && `Tel.: ${acquirente2.telefono1} - `}{acquirente2.email && `Email: ${acquirente2.email}`}</p>
                </div>
                }   
               
                {verwalter && <div>
                    <h2>Verwalter</h2>
                    <p>{verwalter.ditta}</p>
                    <p>{verwalter.titolo} {verwalter.nome} {verwalter.cognome}</p>
                    <p>Tel. {verwalter.telefono1}</p>
                    <p>E-Mail: {verwalter.email}</p>
                </div>}
                
                {oggetto.mobilio !== '' && <div className="page-divide">
                        <h2>Einrichtung</h2>
                    <p className="show-textarea">{`${oggetto.mobilio}`}</p>
                    </div>
                }   
                <button className="print button button--secondary"
                    onClick={this.print}>
                    Stampa Datenblatt
                </button>
            </div>
       )
    }
}

const mapStateToProps = (state, props) => ({
    deal: state.deals.find((deal) => deal.id === props.match.params.id),
    clienti: state.clienti,
    oggetti: state.oggetti,
    uid: state.auth.uid
})

export default connect(mapStateToProps)(StampaDatenblatt)
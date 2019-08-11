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
        const oggetto = this.props.oggetti.find((ogg) => ogg.id === this.props.deal.description)
        
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
                    <p>{`Kaufpreis: ${numeral(this.props.deal.prezzoDiVendita / 100).format('0,0[.]00 $')}`}</p>
                    <p>Belastungsvollmacht: {this.props.deal.belastungsVollmacht ? `Ja` : `Nein`}</p>
                    <p>{oggetto.mobilio && `Einrichtung: siehe Liste`}</p>
                    <p></p>
                    <p></p>
                </div>
                <div>
                    <h2>Verkäufer</h2>
                    <p>{`${venditore.titolo} ${venditore.nome} ${venditore.cognome} ${venditore.ditta && ` - Firma: ${venditore.ditta}`}`}</p>
                    <p>{`${venditore.indirizzo} ${venditore.cap}, ${venditore.nazione}`}</p>
                    <p>{`Tel.: ${venditore.telefono1} - E-Mail: ${venditore.email}`}</p>
                </div>
                {this.props.deal.venditoreId2.length > 0 && <div>
                    <h2>Verkäufer Nr. 2</h2>
                    <p>{`${venditore2.titolo} ${venditore2.nome} ${venditore2.cognome} ${venditore2.ditta && ` - Firma: ${venditore2.ditta}`}`}</p>
                    <p>{`${venditore2.indirizzo} ${venditore2.cap}, ${venditore2.nazione}`}</p>
                    <p>{`Tel.: ${venditore2.telefono1} - E-Mail: ${venditore2.email}`}</p>
                </div>
                }   
                <div>
                    <h2>Käufer</h2>
                    <p>{`${acquirente.titolo} ${acquirente.nome} ${acquirente.cognome} ${acquirente.ditta && ` - Firma: ${acquirente.ditta}`}`}</p>
                    <p>{`${acquirente.indirizzo} ${acquirente.cap}, ${acquirente.nazione}`}</p>
                    <p>{`Tel.: ${acquirente.telefono1} - E-Mail: ${acquirente.email}`}</p>
                </div>
                {this.props.deal.acquirenteId2.length > 0 && <div>
                    <h2>Käufer Nr. 2</h2>
                    <p>{`${acquirente2.titolo} ${acquirente2.nome} ${acquirente2.cognome} ${acquirente2.ditta && ` - Firma: ${acquirente2.ditta}`}`}</p>
                    <p>{`${acquirente2.indirizzo} ${acquirente2.cap}, ${acquirente2.nazione}`}</p>
                    <p>{`Tel.: ${acquirente2.telefono1} - E-Mail: ${acquirente2.email}`}</p>
                </div>
                }   
                <div>
                    <h2>Verwalter</h2>
                    <p className="show-textarea">{`${oggetto.verwalter}`}</p>
                </div>
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
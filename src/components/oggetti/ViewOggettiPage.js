import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'

export class ViewOggettiPage extends React.Component {
    render() {
        const verwalter = this.props.clienti.find((cliente) => cliente.id === this.props.oggetto.verwalter)

        return (
            <div>
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Oggetti</h1>
                        </div>
                    </div>
                    <div className="content-container">
                        {this.props.oggetto.via.length > 0 && <div>{`${this.props.oggetto.via} ${this.props.oggetto.numeroCivico}, WE ${this.props.oggetto.numeroAppartamento}, ${this.props.oggetto.cap} ${this.props.oggetto.citta}`}</div>}
                        {this.props.oggetto.rifId.length > 0 && <div>Rif. id: {this.props.oggetto.rifId}</div>}
                        {this.props.oggetto.grundbuch.length > 0 && <div>Grundbuch von {this.props.oggetto.grundbuch} - Blatt Nr. {this.props.oggetto.grundbuchBlatt}</div>}
                        <div>{`m2: ${this.props.oggetto.m2}`}</div>
                        <div>{`Etage: ${this.props.oggetto.piano}`}</div>
                        <div>{`Status: ${this.props.oggetto.stato}`}</div>
                        {this.props.oggetto.stato === 'vermietet' && <div>{`Kaltmiete: ${numeral(this.props.oggetto.affittoNetto / 100).format('0,0[.]00 $')}`}</div>}
                        <div>{`Wohngeld: ${numeral(this.props.oggetto.wohngeld / 100).format('0,0[.]00 $')}`}</div>
                            <br></br>
                        </div>
                    <div className="content-container">
                        {this.props.oggetto.verwalter.length > 0 && <div>Hausverwaltung: <div>{verwalter.ditta} - {verwalter.titolo} {verwalter.nome} {verwalter.cognome}</div> <div>Tel. {verwalter.telefono1}</div> <div>E-Mail: {verwalter.email}</div></div>}

                        <Link className="button" to={`/oggettoedit/${this.props.oggetto.id}`}>Modifica Oggetto</Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    oggetto: state.oggetti.find((oggetto) => oggetto.id === props.match.params.id),
    clienti: state.clienti 
})

export default connect(mapStateToProps)(ViewOggettiPage)
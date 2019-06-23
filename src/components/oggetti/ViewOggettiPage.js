import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { PDFExport } from '@progress/kendo-react-pdf';

export class ViewOggettiPage extends React.Component {
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Oggetti</h1>
                    </div>
                </div>
                <div className="content-container">
                    {this.props.oggetto.via.length > 0 && <div>Via: {`${this.props.oggetto.via} ${this.props.oggetto.numeroCivico}, WE ${this.props.oggetto.numeroAppartamento}, ${this.props.oggetto.cap} ${this.props.oggetto.citta}`}</div>}
                    {this.props.oggetto.rifId.length > 0 && <div>Rif. id: {this.props.oggetto.rifId}</div>}
                    <Link className="button" to={`/oggettoedit/${this.props.oggetto.id}`}>Modifica Oggetto</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    oggetto: state.oggetti.find((oggetto) => oggetto.id === props.match.params.id) 
})

export default connect(mapStateToProps)(ViewOggettiPage)
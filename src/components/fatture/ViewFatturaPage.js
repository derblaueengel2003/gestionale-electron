import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

export class ViewFatturePage extends React.Component {
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Fatture</h1>
                    </div>
                </div>
                <div className="content-container">
                    {this.props.fattura.numeroFattura.length > 0 && <div>Fattura Numero: {this.props.fattura.numeroFattura}</div>}
                    {this.props.fattura.dataFattura > 0 && <div>Data Fattura: {moment(this.props.dataFattura).format('DD MMMM, YYYY')}</div>}
                    <Link className="button" to={`/fatturaedit/${this.props.fattura.id}`}>Modifica Fattura</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    fattura: state.fatture.find((fattura) => fattura.id === props.match.params.id) 
})

export default connect(mapStateToProps)(ViewFatturePage)
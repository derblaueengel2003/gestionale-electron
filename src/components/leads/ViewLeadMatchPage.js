import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import { AccentroListItem } from './AccentroListItem'


export class ViewLeadMatchPage extends React.Component {
    render() {
        const match = this.props.accentro.filter((ogg) => ogg.Kaufpreis <= (this.props.lead.leadBudget * 1.1))

        return (
            <div className="content-container">
                <div className="page-header">
                    <div>
                        <h1 className="page-header__title">Match con gli immobili Accentro</h1>
                    </div>
                    La corrispondenza si basa solo sul budget del cliente e non sulle caratteristiche dell'immobile
                </div>
                <div className="list-header">
                    {this.props.lead.leadNome.length > 0 && <div>{this.props.lead.leadNome}</div>}
                    {this.props.lead.leadEmail.length > 0 && <div>{this.props.lead.leadEmail}</div>}
                </div>
                <div>
                    {match.map((ogg) => {
                        return <AccentroListItem key={ogg.id} {...ogg} />
                    }
                         
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    lead: state.leads.find((lead) => lead.id === props.match.params.id),
    accentro: state.accentro
})


export default connect(mapStateToProps)(ViewLeadMatchPage)
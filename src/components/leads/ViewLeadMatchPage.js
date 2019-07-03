import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import { AccentroListItem } from './AccentroListItem'


export class ViewLeadMatchPage extends React.Component {
    secondoMatch = () => {
        if (this.props.lead.leadBudget > 500){
            const match = this.props.accentro.filter((ogg) => ogg.Kaufpreis <= (this.props.lead.leadBudget * 1.2) && ogg.Kaufpreis > (this.props.lead.leadBudget / 1.2))
            if (this.props.lead.leadOggettoStato === 'libero') {
                return match.filter((ogg) => ogg.Miete === 0)
            } else if (this.props.lead.leadOggettoStato === 'affittato') {
                return match.filter((ogg) => ogg.Miete > 0)
            } else {
                return match
            }
        } else {
            const match = this.props.accentro.filter((ogg) => ogg.Kaufpreis)
            if (this.props.lead.leadOggettoStato === 'libero') {
                return match.filter((ogg) => ogg.Miete === 0)
            } else if (this.props.lead.leadOggettoStato === 'affittato') {
                return match.filter((ogg) => ogg.Miete > 0)
            } else {
                return match
            }
        }
       
    } 

    render() {
        return (
            <div className="content-container">
                <div className="page-header">
                    <div>
                        <h1 className="page-header__title">Match con gli immobili Accentro: {this.secondoMatch().length}</h1>
                    </div>
                    La corrispondenza si basa sul budget (+-20%) e sulla tipologia dell'immobile
                </div>
                <div className="list-header">
                    {this.props.lead.leadNome.length > 0 && <div>{this.props.lead.leadNome}</div>}
                    {this.props.lead.leadEmail.length > 0 && <div>{this.props.lead.leadEmail}</div>}
                </div>
                <div>
                    {this.secondoMatch().map((ogg) => {
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
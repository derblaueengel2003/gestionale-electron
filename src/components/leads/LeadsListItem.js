import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import { removeLead } from '../../actions/leads'



export class LeadsListItem extends React.Component {
    onRemove = () => {
        this.props.removeLead({ id: this.props.id })         
    }

    render() {
        let immobile = ''
        if(this.props.leadOggettoStato === 'commerciale') {
            immobile = `Locale ${this.props.leadOggettoStato }`
        } else if (this.props.leadOggettoStato === 'aph') {
            immobile = 'Casa di cura'
        } else if (this.props.leadOggettoStato === 'libero' || this.props.leadOggettoStato === 'affittato' || this.props.leadOggettoStato === 'libero o affittato'){
            immobile = `Appartamento ${this.props.leadOggettoStato }`
        }


        return (
            <div className="row">
                <div className="col-4-of-6">
                    <Link className="link-style" to={`/leadedit/${this.props.id}`}>
                        <h3 className="list-item__title">{this.props.leadNome}</h3> 
                        <span className="list-item__sub-title">{this.props.consulenteVendita ? `(${this.props.consulenteVendita})` : null}</span>
                        <div className="list-item__sub-title">{this.props.leadEmail ? this.props.leadEmail : null}</div>
                        <div className="list-item__sub-title">{this.props.leadTelefono ? this.props.leadTelefono : null}</div>
                        <div className="list-item__sub-title">{this.props.leadOggettoStato ? immobile : null}</div>
                        <div className="list-item__sub-title">{this.props.leadNote ? this.props.leadNote : null}</div>
                    </Link> 
                </div>
                <div className="col-1-of-6">
                    <h3 className="list-item__data">{numeral(this.props.leadBudget / 100).format('0,0[.]00 $')}</h3>
                </div>
                <div className="col-1-of-6">
                <button className="button" onClick={this.onRemove}>Nascondi</button>
                </div>
            </div>
            
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    removeLead: (data) => dispatch(removeLead(data))
})

export default connect(undefined, mapDispatchToProps)(LeadsListItem)
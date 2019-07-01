import React from 'react'
import { connect } from 'react-redux'
import { setLeadsFilter, setLeadsStatoFilter } from '../../actions/filters'

export class LeadsListFilters extends React.Component {
    onLeadChange = (e) => {
        this.props.setLeadsFilter(e.target.value)
    }
    onLeadsStatoChange = (e) => {
        this.props.setLeadsStatoFilter(e.target.value)
    }
    render() {
        return (
            <div className="content-container">
                <div  className="input-group">
                    <div className="input-group__item">
                        <input
                            type="text"
                            className="text-input"
                            placeholder="Budget cliente"
                            value={this.props.filters.lead}
                            onChange={this.onLeadChange} />
                    </div>
                    <div className="input-group__item">
                        <select
                            className="select"
                            value={this.props.filters.leadStato}
                            onChange={this.onLeadsStatoChange}>
                            <option value="">Disponibilità</option>
                            <option value="libero">Libero</option>
                            <option value="affittato">Affittato</option>
                            <option value="libero o affittato">Libero o Affittato</option>
                            <option value="commerciale">Locale commerciale</option>
                            <option value="aph">Casa di cura</option>
                        </select>
                    </div>
                   
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
})

const mapDispatchToProps = (dispatch)=> ({
    setLeadsFilter: (lead) => dispatch(setLeadsFilter(lead)),
    setLeadsStatoFilter: (leadStato) => dispatch(setLeadsStatoFilter(leadStato))
})

export default connect(mapStateToProps, mapDispatchToProps)(LeadsListFilters)
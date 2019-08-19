import React from 'react'
import { connect } from 'react-redux'
import { setFatturaFilter } from '../../actions/filters'

export class FattureListFilters extends React.Component {

    onFatturaChange = (e) => {
        this.props.setFatturaFilter(e.target.value)
    }

    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input
                            type="text"
                            className="text-input"
                            placeholder="Cerca Fattura"
                            value={this.props.filters.fattura}
                            onChange={this.onFatturaChange} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
    setFatturaFilter: (fattura) => dispatch(setFatturaFilter(fattura))
})

export default connect(mapStateToProps, mapDispatchToProps)(FattureListFilters)
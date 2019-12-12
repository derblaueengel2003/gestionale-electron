import React from 'react';
import { connect } from 'react-redux';
import { setFatturaFilter } from '../../actions/filters';

export class FattureListFilters extends React.Component {
  onFatturaChange = e => {
    this.props.setFatturaFilter(e.target.value);
  };

  render() {
    return (
      <div className='container'>
        <div className='input-group'>
          <div className='input-field'>
            <input
              id='rechnungssuche'
              type='text'
              className='input-field'
              value={this.props.filters.fattura}
              onChange={this.onFatturaChange}
            />
            <label htmlFor='rechnungssuche'>Rechnungssuche</label>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  setFatturaFilter: fattura => dispatch(setFatturaFilter(fattura))
});

export default connect(mapStateToProps, mapDispatchToProps)(FattureListFilters);

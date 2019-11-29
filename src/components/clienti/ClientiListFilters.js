import React from 'react';
import { connect } from 'react-redux';
import { setClienteFilter } from '../../actions/filters';

export class ClientiListFilters extends React.Component {
  onClienteChange = e => {
    this.props.setClienteFilter(e.target.value);
  };

  render() {
    return (
      <div className='container'>
        <div className='input-group'>
          <div className='input-group__item'>
            <input
              type='text'
              className='text-input'
              placeholder='Kundensuche'
              value={this.props.filters.cliente}
              onChange={this.onClienteChange}
            />
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
  setClienteFilter: cliente => dispatch(setClienteFilter(cliente))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientiListFilters);

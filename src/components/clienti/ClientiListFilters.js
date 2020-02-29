import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { setClienteFilter } from '../../actions/filters';

export class ClientiListFilters extends React.Component {
  onClienteChange = e => {
    this.props.setClienteFilter(e.target.value);
  };

  render() {
    return (
      <div className='container'>
        <div className='input-group'>
          <div className='input-field'>
            <input
              id='kundensuche'
              type='text'
              className='input-field'
              value={this.props.filters.cliente}
              onChange={this.onClienteChange}
            />
            <label className='active' htmlFor='kundensuche'>
              {this.props.t('Cerca contatto')}
            </label>
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
)(withTranslation()(ClientiListFilters));

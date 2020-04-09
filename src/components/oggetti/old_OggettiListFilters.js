import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { setOggettoFilter } from '../../actions/filters';

export class OggettiListFilters extends React.Component {
  onOggettoChange = e => {
    this.props.setOggettoFilter(e.target.value);
  };

  render() {
    return (
      <div className='container'>
        <div className='input-group'>
          <div className='input-field'>
            <input
              id='objektsuche'
              type='text'
              className='input-field'
              value={this.props.filters.oggetto}
              onChange={this.onOggettoChange}
            />
            <label className='active' htmlFor='objektsuche'>
              {this.props.t('Cerca oggetto')}
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
  setOggettoFilter: oggetto => dispatch(setOggettoFilter(oggetto))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(OggettiListFilters));

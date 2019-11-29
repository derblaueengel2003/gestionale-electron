import React from 'react';
import { connect } from 'react-redux';
import { setOggettoFilter } from '../../actions/filters';

export class OggettiListFilters extends React.Component {
  onOggettoChange = e => {
    this.props.setOggettoFilter(e.target.value);
  };

  render() {
    return (
      <div className='container'>
        <div className='input-group'>
          <div className='input-group__item'>
            <input
              type='text'
              className='text-input'
              placeholder='Objektsuche'
              value={this.props.filters.oggetto}
              onChange={this.onOggettoChange}
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
  setOggettoFilter: oggetto => dispatch(setOggettoFilter(oggetto))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OggettiListFilters);

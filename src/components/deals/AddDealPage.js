import React from 'react';
import { connect } from 'react-redux';
import DealForm from './DealForm';
import { startAddDeal } from '../../actions/deals';

export class AddDealPage extends React.Component {
  onSubmit = deal => {
    this.props.startAddDeal(deal);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Deal hinzufügen</h1>
          </div>
        </div>
        <div className='content-container'>
          <DealForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddDeal: deal => dispatch(startAddDeal(deal))
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddDealPage);

import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { startAddDeal } from '../../actions/deals';
import DealForm from './DealForm';

export class AddDealPage extends React.Component {
  onSubmit = (deal) => {
    this.props.startAddDeal(deal);
    this.props.history.push('/');
  };
  render() {
    const { t } = this.props;
    return (
      <div>
        <div>
          <div className='container'>
            <h1>{t('Aggiungi vendita')}</h1>
          </div>
        </div>
        <div className='container'>
          <DealForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddDeal: (deal) => dispatch(startAddDeal(deal)),
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(AddDealPage));

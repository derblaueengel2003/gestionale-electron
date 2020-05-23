import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import OfferedPropertiesForm from './OfferedPropertiesForm';
import { startAddOffer } from '../../actions/offers';

export class AddOfferedProperties extends React.Component {
  onSubmit = (offer) => {
    this.props.startAddOffer(offer);
    this.props.history.goBack();
    // this.props.history.push(`/leadview/${this.props.location.state.leadId}`);
  };
  render() {
    const { leadId, oggettoId } = this.props.location.state;

    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t('Nuova proposta')}</h1>
          </div>
        </div>
        <div className='container'>
          <OfferedPropertiesForm
            onSubmit={this.onSubmit}
            leadId={leadId}
            oggettoId={oggettoId}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddOffer: (offer) => dispatch(startAddOffer(offer)),
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(AddOfferedProperties));

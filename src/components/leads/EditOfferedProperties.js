import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import OfferedPropertiesForm from './OfferedPropertiesForm';
import { storeActions } from '../../store/configureStore';

export class EditOfferedProperties extends React.Component {
  onSubmit = async (offer) => {
    await this.props.startEditOffer(this.props.offer.id, offer);
    this.props.history.push(`/leadview/${this.props.offer.leadId}`);
  };
  onRemove = () => {
    this.props.startRemoveOffer({ id: this.props.offer.id });
    this.props.history.push(`/leadview/${this.props.offer.leadId}`);
  };
  render() {
    if (!this.props.offer) {
      this.props.history.push('/leads');
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t('Modifica offerta')}</h1>
          </div>
        </div>
        <div className='container'>
          <button
            className='btn-floating red right btn-floating-margin'
            onClick={this.onRemove}
          >
            <i className='material-icons'>remove</i>
          </button>
          <OfferedPropertiesForm
            offer={this.props.offer}
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  offer: state.offers.find((offer) => offer.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  startEditOffer: (id, offer) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'offers')
        .startEditAction(id, offer)
    ),
  startRemoveOffer: (data) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'offers')
        .startRemoveAction(data)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EditOfferedProperties));

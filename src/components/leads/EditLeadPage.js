import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import LeadForm from './LeadForm';
import { storeActions } from '../../store/configureStore';

export class EditLeadPage extends React.Component {
  onSubmit = async (lead) => {
    await this.props.startEditLead(this.props.lead.id, lead);
    this.props.history.push(`/leadview/${this.props.lead.id}`);
  };

  render() {
    if (!this.props.lead) {
      this.props.history.push('/leads');
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t('Modifica richiesta')}</h1>
          </div>
        </div>
        <div className='container'>
          <LeadForm lead={this.props.lead} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  lead: state.leads.find((lead) => lead.id === props.match.params.id),
  offers: state.offers.filter(
    (offer) => offer.leadId === props.match.params.id
  ),
});

const mapDispatchToProps = (dispatch) => ({
  startEditLead: (id, lead) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'leads')
        .startEditAction(id, lead)
    ),
  startRemoveLead: (data) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'leads')
        .startRemoveAction(data)
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
)(withTranslation()(EditLeadPage));

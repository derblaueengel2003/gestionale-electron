import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import LeadForm from './LeadForm';
import { startEditLead, startRemoveLead } from '../../actions/leads';
import { startRemoveOffer } from '../../actions/offers';

export class EditLeadPage extends React.Component {
  onSubmit = (lead) => {
    this.props.startEditLead(this.props.lead.id, lead);
    this.props.history.push(`/leadview/${this.props.lead.id}`);
  };
  onRemove = () => {
    if (
      window.confirm('Bestätigen Sie die Löschung? Das ist unwiderruflich!')
    ) {
      this.props.offers.forEach((offer) => {
        this.props.startRemoveOffer({ id: offer.id });
      });
      this.props.startRemoveLead({ id: this.props.lead.id });

      this.props.history.push('/leads');
    }
  };
  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t('Modifica richiesta')}</h1>
          </div>
        </div>
        <div className='container'>
          <button
            className='btn-floating red right btn-floating-margin'
            onClick={this.onRemove}
          >
            <i className='material-icons'>remove</i>
          </button>
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
  startEditLead: (id, lead) => dispatch(startEditLead(id, lead)),
  startRemoveLead: (data) => dispatch(startRemoveLead(data)),
  startRemoveOffer: (data) => dispatch(startRemoveOffer(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EditLeadPage));

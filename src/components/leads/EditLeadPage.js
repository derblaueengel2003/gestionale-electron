import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import LeadForm from './LeadForm';
import { startEditLead, startRemoveLead } from '../../actions/leads';
import { startRemoveOffer } from '../../actions/offers';
import OptionModal from '../common/OptionModal';

export class EditLeadPage extends React.Component {
  state = {
    isOpen: false,
    modalContent: 'remove_confirm',
    btnEnabled: true,
  };

  handleOpenModal = () => {
    this.setState(() => ({
      isOpen: true,
    }));
  };

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  };

  onSubmit = (lead) => {
    this.props.startEditLead(this.props.lead.id, lead);
    this.props.history.push(`/leadview/${this.props.lead.id}`);
  };
  onRemove = () => {
    this.props.offers.forEach((offer) => {
      this.props.startRemoveOffer({ id: offer.id });
    });
    this.props.startRemoveLead({ id: this.props.lead.id });

    this.props.history.push('/leads');
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
            onClick={this.handleOpenModal}
          >
            <i className='material-icons'>remove</i>
          </button>
          <OptionModal
            isOpen={this.state.isOpen}
            contentLabel={'remove'}
            modalContent={this.props.t(this.state.modalContent)}
            onCancel={this.handleCloseModal}
            onConfirm={this.onRemove}
            btnEnabled={this.state.btnEnabled}
          />
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

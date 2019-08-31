import React from 'react';
import { connect } from 'react-redux';
import LeadForm from './LeadForm';
import { startEditLead, startRemoveLead } from '../../actions/leads';

export class EditLeadPage extends React.Component {
  onSubmit = lead => {
    this.props.startEditLead(this.props.lead.id, lead);
    this.props.history.push(`/leadview/${this.props.lead.id}`);
  };
  onRemove = () => {
    if (
      window.confirm("Confermi la cancellazione? L'operazione è irreversibile")
    ) {
      this.props.startRemoveLead({ id: this.props.lead.id });
      this.props.history.push('/leads');
    }
  };
  render() {
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Modifica Richiesta</h1>
          </div>
        </div>
        <div className='content-container'>
          <LeadForm lead={this.props.lead} onSubmit={this.onSubmit} />
          <button className='button button--secondary' onClick={this.onRemove}>
            Cancella Richiesta
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  lead: state.leads.find(lead => lead.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  startEditLead: (id, lead) => dispatch(startEditLead(id, lead)),
  startRemoveLead: data => dispatch(startRemoveLead(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLeadPage);

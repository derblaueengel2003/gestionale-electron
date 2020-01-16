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
      window.confirm('Bestätigen Sie die Löschung? Das ist unwiderruflich!')
    ) {
      this.props.startRemoveLead({ id: this.props.lead.id });
      this.props.history.push('/leads');
    }
  };
  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <h1>Anfrage ändern</h1>
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
  lead: state.leads.find(lead => lead.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  startEditLead: (id, lead) => dispatch(startEditLead(id, lead)),
  startRemoveLead: data => dispatch(startRemoveLead(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLeadPage);

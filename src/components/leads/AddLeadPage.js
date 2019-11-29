import React from 'react';
import { connect } from 'react-redux';
import LeadForm from './LeadForm';
import { startAddLead } from '../../actions/leads';

export class AddLeadPage extends React.Component {
  onSubmit = lead => {
    this.props.startAddLead(lead);
    this.props.history.push('/leads');
  };
  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <h1>Neue Anfrage</h1>
          </div>
        </div>
        <div className='container'>
          <LeadForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddLead: lead => dispatch(startAddLead(lead))
});

export default connect(undefined, mapDispatchToProps)(AddLeadPage);

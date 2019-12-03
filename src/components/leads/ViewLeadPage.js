import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LeadsListItem from '../leads/LeadsListItem';
import ClientiList from '../clienti/ClientiList';
import { startRemoveLead } from '../../actions/leads';

export class ViewLeadPage extends React.Component {
  onRemove = () => {
    if (
      window.confirm('Bestätigen Sie die Löschung? Das ist unwiderruflich!')
    ) {
      this.props.startRemoveLead({ id: this.props.lead.id });
      this.props.history.push('/leads');
    }
  };
  render() {
    const cliente = this.props.clienti.filter(
      cliente => cliente.id === this.props.lead.leadId
    );
    return (
      <div>
        <div className='grey lighten-4'>
          <div className='container'>
            <h1>Anfrage</h1>
          </div>
        </div>
        <div className='container'>
          <div className='list-header list-header-leads'>
            <div>Details</div>
            <div>
              <Link
                className='btn-floating orange'
                to={`/leadedit/${this.props.lead.id}`}
              >
                <i className='material-icons'>edit</i>
              </Link>
              <button className='btn-floating red' onClick={this.onRemove}>
                <i className='material-icons'>remove</i>
              </button>
            </div>
          </div>
          <div className='list-body'>
            <div>
              <LeadsListItem {...this.props.lead} showAll={true} />
            </div>
          </div>
        </div>

        <ClientiList cliente={cliente} ruolo={'Cliente'} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  lead: state.leads.find(lead => lead.id === props.match.params.id),
  clienti: state.clienti
});
const mapDispatchToProps = dispatch => ({
  startRemoveLead: data => dispatch(startRemoveLead(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewLeadPage);

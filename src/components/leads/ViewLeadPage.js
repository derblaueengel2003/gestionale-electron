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
    const cliente = this.props.clienti.find(
      cliente => cliente.id === this.props.lead.leadId
    );
    return (
      <div>
        <div className='page-header page-header-leads'>
          <div className='content-container'>
            <h1 className='page-header__title'>Anfrage</h1>
          </div>
        </div>
        <div className='content-container'>
          <div className='list-header list-header-leads'>
            <div className='show-for-mobile'>Details</div>
            <div className='show-for-desktop'>Details</div>
            <div className='show-for-desktop'></div>
          </div>
          <div className='list-body'>
            <div>
              <LeadsListItem {...this.props.lead} showAll={true} />
            </div>
          </div>
          <Link
            className='print button button--secondary-leads'
            to={`/leadedit/${this.props.lead.id}`}
          >
            Anfrage ändern
          </Link>
          <button
            className='button button--secondary-delete'
            onClick={this.onRemove}
          >
            Anfrage löschen
          </button>
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

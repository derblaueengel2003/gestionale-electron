import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LeadsListItem from '../leads/LeadsListItem';
import ClientiList from '../clienti/ClientiList';

export class ViewLeadPage extends React.Component {
  render() {
    const cliente = this.props.clienti.find(
      cliente => cliente.id === this.props.lead.leadId
    );
    return (
      <div>
        <div className='page-header page-header-leads'>
          <div className='content-container'>
            <h1 className='page-header__title'>Richiesta</h1>
          </div>
        </div>
        <div className='content-container'>
          <div className='list-header list-header-leads'>
            <div className='show-for-mobile'>Dettaglio Richiesta</div>
            <div className='show-for-desktop'>Dettaglio Richiesta</div>
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
            Modifica Richiesta
          </Link>
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

export default connect(mapStateToProps)(ViewLeadPage);

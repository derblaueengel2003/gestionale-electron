import React from 'react';
import { connect } from 'react-redux';
import LeadsListItem from './LeadsListItem';
import selectLeads from '../../selectors/leads';
import { Link } from 'react-router-dom';

export const LeadsList = props => {
  //controllo se la i dati vengono dalla scheda clienti e sono passati via props
  if (props.userLeads) {
    return (
      props.userLeads.length > 0 && (
        <div className='container'>
          <div className='list-header list-header-leads'>
            <div className='show-for-mobile'>Anfrage</div>
            <div className='show-for-desktop'>Anfrage</div>
          </div>
          <div className='list-body'>
            {props.userLeads.map(lead => {
              return <LeadsListItem key={lead.id} {...lead} />;
            })}
          </div>
        </div>
      )
    );
  } else {
    //in questo caso i dati provengono dallo state. Siamo sulla lead dashboard page
    return (
      <div className='container'>
        <div className='list-header'>
          <div></div>
          <div>
            <Link className='btn-floating green' to='/leadscreate'>
              <i className='material-icons'>add</i>
            </Link>
          </div>
        </div>
        <div className='list-body'>
          {props.leads.length === 0 ? (
            <div className='list-item list-item--message'>
              <span>Kein Ergebnis anhand der angegebenen Filtern</span>
            </div>
          ) : (
            props.leads.map(lead => {
              return <LeadsListItem key={lead.id} {...lead} />;
            })
          )}
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    leads: selectLeads(state.leads, state.filters)
  };
};

export default connect(mapStateToProps)(LeadsList);

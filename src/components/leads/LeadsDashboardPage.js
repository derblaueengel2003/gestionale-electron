import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import LeadsList from './LeadsList';
import LeadsListFilters from './LeadsListFilters';
import { startSetLeads } from '../../actions/leads';

class LeadsDashboardPage extends React.Component {
  componentDidMount() {
    this.props.startSetLeads();
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <div className='grey lighten-4'>
          <div className='container'>
            <h1>{t('Richieste attive')}</h1>
          </div>
        </div>
        <LeadsListFilters />
        <div className='container'>
          <Link className='btn-floating green right' to='/leadscreate'>
            <i className='material-icons'>add</i>
          </Link>
        </div>
        <LeadsList />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSetLeads: () => dispatch(startSetLeads()),
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(LeadsDashboardPage));

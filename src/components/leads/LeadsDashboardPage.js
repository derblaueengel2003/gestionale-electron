import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import LeadsList from './LeadsList';
import LeadsListFilters from './LeadsListFilters';
import { storeActions } from '../../store/configureStore';

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
  startSetLeads: () =>
    dispatch(
      storeActions.find((action) => action.label === 'leads').startSetAction()
    ),
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(LeadsDashboardPage));

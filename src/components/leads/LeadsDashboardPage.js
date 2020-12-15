import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import LeadsList from './LeadsList';
import LeadsListFilters from './LeadsListFilters';
import { storeActions } from '../../store/configureStore';
import { addButton } from '../common/elements';

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
        {addButton('/leadscreate')}
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

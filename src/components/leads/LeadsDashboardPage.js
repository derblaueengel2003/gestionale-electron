import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import LeadsList from './LeadsList';
import LeadsListFilters from './LeadsListFilters';
import { storeActions } from '../../store/configureStore';
import { addButton } from '../common/elements';
import Intestazione from '../common/Intestazione';

class LeadsDashboardPage extends React.Component {
  componentDidMount() {
    this.props.startSetLeads();
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <Intestazione intestazione={t('Richieste attive')} />
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

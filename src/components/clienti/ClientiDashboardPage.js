import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import ClientiList from './ClientiList';
import ListFilters from '../common/ListFilters';
import { storeActions } from '../../store/configureStore';
import { addButton } from '../common/elements';

class ClientiDashboardPage extends React.Component {
  componentDidMount() {
    this.props.startSetCustomers();
  }
  render() {
    const { t } = this.props;

    const options = [
      { value: 'name', label: 'Cognome' },
      { value: 'date', label: 'Data' },
    ];

    return (
      <div>
        <div className='grey lighten-4'>
          <div className='container'>
            <h1>{t('Rubrica contatti')}</h1>
          </div>
        </div>
        <ListFilters options={options} />
        {addButton('/clienticreate')}
        <ClientiList />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSetCustomers: () =>
    dispatch(
      storeActions.find((action) => action.label === 'clienti').startSetAction()
    ),
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(ClientiDashboardPage));

import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import DealList from './DealList';
import ListFilters from '../common/ListFilters';
import DealsSummary from './DealsSummary';
import { storeActions } from '../../store/configureStore';
import { addButton } from '../common/elements';

class DealDashboardPage extends React.Component {
  componentDidMount() {
    this.props.startSetDeals();
  }
  render() {
    const { t, utente } = this.props;
    const options = [
      { value: 'date', label: 'Data' },
      { value: 'amount', label: 'Importo' },
      { value: 'paid', label: 'Pagato' },
    ];
    return (
      <div>
        <div className='grey lighten-4'>
          <div className='container'>
            <h1>{t('Vendite')}</h1>
          </div>
        </div>
        <ListFilters options={options} />
        <DealsSummary />
        {utente && utente.role === 'Admin' && addButton('/create')}
        {utente && <DealList />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    utente: state.utenti.find(
      (utente) => utente.firebaseAuthId === state.auth.uid
    ),
  };
};
const mapDispatchToProps = (dispatch) => ({
  startSetDeals: () =>
    dispatch(
      storeActions.find((action) => action.label === 'deals').startSetAction()
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(DealDashboardPage));

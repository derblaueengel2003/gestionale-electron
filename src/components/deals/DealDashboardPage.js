import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { startSetDeals } from '../../actions/deals';
import ListFilters from '../common/ListFilters';
import DealsSummary from './DealsSummary';
import DealList from './DealList';
// import snippet from '../../utils.js/snippet';

class DealDashboardPage extends React.Component {
  componentDidMount() {
    this.props.startSetDeals();
    // snippet();
  }
  render() {
    const { t, utente } = this.props;

    //Opzioni per il filtro
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
        {utente.role === 'Admin' && (
          <div className='container section'>
            <Link className='btn-floating green right' to='/create'>
              <i className='material-icons'>add</i>
            </Link>
          </div>
        )}
        <DealList />
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
  startSetDeals: () => dispatch(startSetDeals()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(DealDashboardPage));

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Translation } from 'react-i18next';
import DealList from './DealList';
import DealListFilters from './DealListFilters';
import DealsSummary from './DealsSummary';

const DealDashboardPage = ({ utente }) => {
  return (
    <Translation>
      {t => {
        return (
          <div>
            <div className='grey lighten-4'>
              <div className='container'>
                <h1>{t('Vendite')}</h1>
              </div>
            </div>
            <DealsSummary />
            <DealListFilters />
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
      }}
    </Translation>
  );
};
const mapStateToProps = state => {
  return {
    utente: state.utenti.find(
      utente => utente.firebaseAuthId === state.auth.uid
    )
  };
};

export default connect(mapStateToProps)(DealDashboardPage);

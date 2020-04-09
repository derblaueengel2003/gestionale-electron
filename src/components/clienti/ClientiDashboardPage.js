import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ClientiList from './ClientiList';
import ListFilters from '../common/ListFilters';
import { startSetCustomers } from '../../actions/clienti';

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
        <div className='container'>
          <Link className='btn-floating green right' to='/customercreate'>
            <i className='material-icons'>add</i>
          </Link>
        </div>
        <ClientiList />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSetCustomers: () => dispatch(startSetCustomers()),
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(ClientiDashboardPage));

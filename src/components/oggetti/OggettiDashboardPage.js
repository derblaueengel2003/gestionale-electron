import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import OggettiList from './OggettiList';
import ListFilters from '../common/ListFilters';
import { storeActions } from '../../store/configureStore';

class OggettiDashboardPage extends React.Component {
  componentDidMount() {
    this.props.startSetOggetti();
  }

  render() {
    const { t } = this.props;
    const options = [
      { value: 'name', label: 'Indirizzo' },
      { value: 'date', label: 'Data' },
    ];
    return (
      <div>
        <div className='grey lighten-4'>
          <div className='container'>
            <h1>{t('Oggetti')}</h1>
          </div>
        </div>
        <ListFilters options={options} />
        <div className='container'>
          <Link className='btn-floating green right' to='/oggettocreate'>
            <i className='material-icons'>add</i>
          </Link>
        </div>
        <OggettiList />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSetOggetti: () =>
    dispatch(
      storeActions.find((action) => action.label === 'oggetti').startSetAction()
    ),
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(OggettiDashboardPage));

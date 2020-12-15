import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import FattureList from './FattureList';
import ListFilters from '../common/ListFilters';
import { storeActions } from '../../store/configureStore';
import { addButton } from '../common/elements';

class FattureDashboardPage extends React.Component {
  componentDidMount() {
    this.props.startSetFatture();
  }

  render() {
    const { t } = this.props;

    const options = [{ value: 'date', label: 'Data' }];

    return (
      <div>
        <div className='grey lighten-4'>
          <div className='container'>
            <h1>{t('Fatture')}</h1>
          </div>
        </div>
        <ListFilters options={options} />
        {addButton('/fatturacreate')}
        <FattureList />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSetFatture: () =>
    dispatch(
      storeActions.find((action) => action.label === 'fatture').startSetAction()
    ),
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(FattureDashboardPage));

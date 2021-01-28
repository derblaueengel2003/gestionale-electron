import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import OggettiList from './OggettiList';
import ListFilters from '../common/ListFilters';
import { storeActions } from '../../store/configureStore';
import { addButton } from '../common/elements';
import Intestazione from '../common/Intestazione';

class OggettiDashboardPage extends React.Component {
  componentDidMount() {
    this.props.startSetOggetti();
  }

  render() {
    const { t } = this.props;
    const options = [
      { value: 'name', label: 'Indirizzo' },
      { value: 'date', label: 'Data' },
      { value: 'published', label: 'Pubblicato' },
    ];
    return (
      <div>
        <Intestazione intestazione={t('Oggetti')} />
        <ListFilters options={options} />
        {addButton('/oggettocreate')}
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

import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import OggettoForm from './OggettoForm';
import { startAddOggetto } from '../../actions/oggetti';

export class AddOggettoPage extends React.Component {
  onSubmit = oggetto => {
    this.props.startAddOggetto(oggetto);
    this.props.history.push('/oggetti');
  };
  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t('Aggiungi oggetto')}</h1>
          </div>
        </div>
        <div className='container'>
          <OggettoForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddOggetto: oggetto => dispatch(startAddOggetto(oggetto))
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(AddOggettoPage));

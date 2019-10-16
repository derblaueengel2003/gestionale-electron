import React from 'react';
import { connect } from 'react-redux';
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
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Objekt hinzufügen</h1>
          </div>
        </div>
        <div className='content-container'>
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
)(AddOggettoPage);

import React from 'react';
import { connect } from 'react-redux';
import FirmaForm from './FirmaForm';
import { startAddFirma } from '../../actions/firma';

export class AddFirmaPage extends React.Component {
  onSubmit = firma => {
    this.props.startAddFirma(firma);
    this.props.history.push('/users');
  };
  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <h1>Firma hinzufügen</h1>
          </div>
        </div>
        <div className='container'>
          <FirmaForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddFirma: firma => dispatch(startAddFirma(firma))
});

export default connect(undefined, mapDispatchToProps)(AddFirmaPage);

import React from 'react';
import { connect } from 'react-redux';
import FatturaForm from './FatturaForm';
import { startAddFattura } from '../../actions/fatture';

export class AddFatturaPage extends React.Component {
  onSubmit = fattura => {
    this.props.startAddFattura(fattura);
    this.props.history.push('/fatture');
  };
  render() {
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Rechnung hinzufügen</h1>
          </div>
        </div>
        <div className='content-container'>
          <FatturaForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddFattura: fattura => dispatch(startAddFattura(fattura))
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddFatturaPage);

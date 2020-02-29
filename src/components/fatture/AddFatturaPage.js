import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
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
        <div>
          <div className='container'>
            <h1>{this.props.t('Aggiungi fattura')}</h1>
          </div>
        </div>
        <div className='container'>
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
)(withTranslation()(AddFatturaPage));

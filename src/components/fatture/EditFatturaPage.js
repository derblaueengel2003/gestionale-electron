import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import FatturaForm from './FatturaForm';
import { startEditFattura, startRemoveFattura } from '../../actions/fatture';

export class EditFatturaPage extends React.Component {
  onSubmit = fattura => {
    this.props.startEditFattura(this.props.fattura.id, fattura);
    this.props.history.push(`/fatturaview/${this.props.fattura.id}`);
  };
  onRemove = () => {
    if (
      window.confirm('Bestätigen Sie die Löschung? Das ist unwiderruflich!')
    ) {
      this.props.startRemoveFattura({ id: this.props.fattura.id });
      this.props.history.push('/fatture');
    }
  };
  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t('Modifica fattura')}</h1>
          </div>
        </div>
        <div className='container'>
          <button
            className='btn-floating red right btn-floating-margin'
            onClick={this.onRemove}
          >
            <i className='material-icons'>remove</i>
          </button>
          <FatturaForm fattura={this.props.fattura} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  fattura: state.fatture.find(fattura => fattura.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  startEditFattura: (id, fattura) => dispatch(startEditFattura(id, fattura)),
  startRemoveFattura: data => dispatch(startRemoveFattura(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EditFatturaPage));

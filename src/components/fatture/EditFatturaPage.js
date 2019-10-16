import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Rechnung ändern</h1>
          </div>
        </div>
        <div className='content-container'>
          <FatturaForm fattura={this.props.fattura} onSubmit={this.onSubmit} />
          <button
            className='button button--secondary-delete'
            onClick={this.onRemove}
          >
            Rechnung löschen
          </button>
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
)(EditFatturaPage);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FirmaForm from './FirmaForm';
import { startEditFirma, startRemoveFirma } from '../../actions/firma';

export class EditFirmaPage extends React.Component {
  onSubmit = firma => {
    this.props.startEditFirma(this.props.firma.id, firma);
    this.props.history.push(`/users`);
  };
  onRemove = () => {
    if (
      window.confirm('Bestätigen Sie die Löschung? Das ist unwiderruflich!')
    ) {
      this.props.startRemoveFirma({ id: this.props.firma.id });
      this.props.history.push('/users');
    }
  };
  render() {
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Firmendaten ändern</h1>
          </div>
        </div>
        <div className='content-container'>
          <FirmaForm firma={this.props.firma} onSubmit={this.onSubmit} />
          <button
            className='button button--secondary-delete'
            onClick={this.onRemove}
          >
            Firma löschen
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  firma: state.firma.find(firma => firma.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  startEditFirma: (id, firma) => dispatch(startEditFirma(id, firma)),
  startRemoveFirma: data => dispatch(startRemoveFirma(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFirmaPage);

import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
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
        <div>
          <div className='container'>
            <h1>{this.props.t('Modifica dati azienda')}</h1>
          </div>
        </div>
        <div className='container'>
          <button
            className='btn-floating red right btn-floating-margin'
            onClick={this.onRemove}
          >
            <i className='material-icons'>remove</i>
          </button>
          <FirmaForm firma={this.props.firma} onSubmit={this.onSubmit} />
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
)(withTranslation()(EditFirmaPage));

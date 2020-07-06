import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import FirmaForm from './FirmaForm';
import { storeActions } from '../../store/configureStore';
import OptionModal from '../common/OptionModal';

export class EditFirmaPage extends React.Component {
  state = {
    isOpen: false,
    modalContent: 'remove_confirm',
    btnEnabled: true,
  };

  handleOpenModal = () => {
    this.setState(() => ({
      isOpen: true,
    }));
  };

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  };

  onSubmit = (firma) => {
    this.props.startEditFirma(this.props.firma.id, firma);
    this.props.history.push(`/utenti`);
  };
  onRemove = () => {
    this.props.startRemoveFirma({ id: this.props.firma.id });
    this.props.history.push('/utenti');
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
            onClick={this.handleOpenModal}
          >
            <i className='material-icons'>remove</i>
          </button>
          <OptionModal
            isOpen={this.state.isOpen}
            contentLabel={'remove'}
            modalContent={this.props.t(this.state.modalContent)}
            onCancel={this.handleCloseModal}
            onConfirm={this.onRemove}
            btnEnabled={this.state.btnEnabled}
          />
          <FirmaForm firma={this.props.firma} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  firma: state.firma.find((firma) => firma.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  startEditFirma: (id, firma) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'firma')
        .startEditAction(id, firma)
    ),
  startRemoveFirma: (data) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'firma')
        .startRemoveAction(data)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EditFirmaPage));

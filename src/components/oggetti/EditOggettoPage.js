import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import OggettoForm from './OggettoForm';
import { storeActions } from '../../store/configureStore';
import OptionModal from '../common/OptionModal';

export class EditOggettoPage extends React.Component {
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

  onSubmit = async (oggetto) => {
    await this.props.startEditOggetto(this.props.oggetto.id, oggetto);
    this.props.history.push(`/oggettoview/${this.props.oggetto.id}`);
  };
  onValidate = () => {
    const clienti = this.props.clienti.find(
      (cliente) =>
        cliente.id === this.props.oggetto.proprietarioId ||
        cliente.id === this.props.oggetto.proprietarioId2 ||
        cliente.id === this.props.oggetto.verwalter
    );
    const deals = this.props.deals.find(
      (deal) => deal.oggettoId === this.props.oggetto.id
    );
    if (!clienti && !deals) {
      return true;
    } else {
      return false;
    }
  };

  onRemove = () => {
    if (this.onValidate()) {
      this.props.startRemoveOggetto({ id: this.props.oggetto.id });
      this.props.history.push('/oggetti');
    } else {
      this.setState(() => ({
        isOpen: true,
        modalContent: 'cannot_delete_property',
        btnEnabled: false,
      }));
    }
  };

  onDisable = () => {
    if (this.onValidate()) {
      this.props.startEditOggetto(this.props.oggetto.id, {
        ...this.props.oggetto,
        visible: false,
      });
      this.props.history.push('/oggetti');
    } else {
      this.setState(() => ({
        isOpen: true,
        modalContent: 'cannot_delete_property',
        btnEnabled: false,
      }));
    }
  };

  render() {
    if (
      !this.props.oggetto ||
      (this.props.utente.role === 'Mitarbeiter' && !this.props.oggetto.visible)
    ) {
      this.props.history.push('/oggetti');
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t('Modifica oggetto')}</h1>
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
            onConfirm={
              this.props.utente && this.props.utente.role === 'Admin'
                ? this.onRemove
                : this.onDisable
            }
            btnEnabled={this.state.btnEnabled}
          />
          <OggettoForm oggetto={this.props.oggetto} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  oggetto: state.oggetti.find(
    (oggetto) => oggetto.id === props.match.params.id
  ),
  utente: state.utenti.find(
    (utente) => utente.firebaseAuthId === state.auth.uid
  ),
  deals: state.deals,
  fatture: state.fatture,
  clienti: state.clienti,
});

const mapDispatchToProps = (dispatch) => ({
  startEditOggetto: (id, oggetto) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'oggetti')
        .startEditAction(id, oggetto)
    ),
  startRemoveOggetto: (data) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'oggetti')
        .startRemoveAction(data)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EditOggettoPage));

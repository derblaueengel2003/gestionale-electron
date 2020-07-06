import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import UserForm from './UserForm';
import { storeActions } from '../../store/configureStore';
import OptionModal from '../common/OptionModal';

export class EditUtentePage extends React.Component {
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

  onSubmit = (utente) => {
    this.props.startEditUser(this.props.utente.id, utente);
    this.props.history.push(`/utenti`);
  };
  onRemove = () => {
    this.props.startRemoveUser({ id: this.props.utente.id });
    this.props.history.push('/utenti');
  };
  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t('Modifica utente')}</h1>
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
          <UserForm user={this.props.utente} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  utente: state.utenti.find((utente) => utente.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  startEditUser: (id, utente) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'utenti')
        .startEditAction(id, utente)
    ),
  startRemoveUser: (data) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'utenti')
        .startRemoveAction(data)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EditUtentePage));

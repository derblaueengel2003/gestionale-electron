import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { storeActions } from '../../store/configureStore';
import OptionModal from '../common/OptionModal';
import NewsletterForm from './NewsletterForm';

export class EditNewsletter extends React.Component {
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

  onSubmit = async (newsletter) => {
    await this.props.startEditNewsletter(this.props.newsletter.id, newsletter);
    this.props.history.push(`/newsletterview/${this.props.newsletter.id}`);
  };

  onRemove = () => {
    if (!this.props.newsletter.mailchimpId) {
      this.props.startRemoveNewsletter({ id: this.props.newsletter.id });
      this.props.history.push('/newsletters');
    } else {
      this.setState(() => ({
        isOpen: true,
        modalContent: 'cannot_delete_newsletter',
        btnEnabled: false,
      }));
    }
  };

  onDisable = () => {
    if (!this.props.newsletter.mailchimpId) {
      this.props.startEditNewsletter(this.props.newsletter.id, {
        ...this.props.newsletter,
        visible: false,
      });
      this.props.history.push('/newsletters');
    } else {
      this.setState(() => ({
        isOpen: true,
        modalContent: 'cannot_delete_newsletter',
        btnEnabled: false,
      }));
    }
  };

  render() {
    if (
      !this.props.newsletter ||
      (this.props.utente.role === 'Mitarbeiter' &&
        !this.props.newsletter.visible)
    ) {
      this.props.history.push('/newsletters');
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t('newsletter_edit')}</h1>
          </div>
        </div>
        <div className='container'>
          <OptionModal
            isOpen={this.state.isOpen}
            contentLabel={'remove'}
            modalContent={this.props.t(this.state.modalContent)}
            onCancel={this.handleCloseModal}
            onConfirm={
              this.props.utente.role === 'Admin'
                ? this.onRemove
                : this.onDisable
            }
            btnEnabled={this.state.btnEnabled}
          />
          <NewsletterForm
            newsletter={this.props.newsletter}
            onSubmit={this.onSubmit}
          />
          <button
            className='btn-floating red margine-basso'
            onClick={this.handleOpenModal}
          >
            <i className='material-icons'>delete</i>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  newsletter: state.newsletters.find(
    (newsletter) => newsletter.id === props.match.params.id
  ),
  utente: state.utenti.find(
    (utente) => utente.firebaseAuthId === state.auth.uid
  ),
});

const mapDispatchToProps = (dispatch) => ({
  startEditNewsletter: (id, newsletter, visible) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'newsletters')
        .startEditAction(id, newsletter, visible)
    ),
  startRemoveNewsletter: (data) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'newsletters')
        .startRemoveAction(data)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EditNewsletter));

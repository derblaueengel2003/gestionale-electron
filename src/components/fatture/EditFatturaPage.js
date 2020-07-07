import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import FatturaForm from './FatturaForm';
import { storeActions } from '../../store/configureStore';
import OptionModal from '../common/OptionModal';

export class EditFatturaPage extends React.Component {
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

  onSubmit = (fattura) => {
    this.props.startEditFattura(this.props.fattura.id, fattura);
    this.props.history.push(`/fatturaview/${this.props.fattura.id}`);
  };
  onRemove = () => {
    this.props.startRemoveFattura({ id: this.props.fattura.id });
    this.props.history.push('/fatture');
  };
  render() {
    if (!this.props.fattura) {
      this.props.history.push('/fatture');
      return <div>Loading...</div>;
    }
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
          <FatturaForm fattura={this.props.fattura} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  fattura: state.fatture.find(
    (fattura) => fattura.id === props.match.params.id
  ),
});

const mapDispatchToProps = (dispatch) => ({
  startEditFattura: (id, fattura) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'fatture')
        .startEditAction(id, fattura)
    ),
  startRemoveFattura: (data) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'fatture')
        .startRemoveAction(data)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EditFatturaPage));

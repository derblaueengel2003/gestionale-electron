import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { storeActions } from '../../store/configureStore';
import DealForm from './DealForm';
import OptionModal from '../common/OptionModal';

export class EditDealPage extends React.Component {
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

  onSubmit = (deal) => {
    this.props.startEditDeal(this.props.deal.id, deal);
    this.props.history.push(`/view/${this.props.deal.id}`);
  };

  // verifico che non ci siano fatture emesse per questa vendita
  onValidate = () => {
    const fatture = this.props.fatture.filter(
      (fattura) => fattura.dealId === this.props.deal.id
    );
    if (fatture.length === 0) return true;

    return false;
  };

  onRemove = () => {
    if (this.onValidate()) {
      this.props.startRemoveDeal({ id: this.props.deal.id });
      this.props.history.push('/deals');
    } else {
      this.setState(() => ({
        isOpen: true,
        modalContent: 'cannot_delete',
        btnEnabled: false,
      }));
    }
  };

  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t('Modifica dati vendita')}</h1>
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
          <DealForm deal={this.props.deal} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  deal: state.deals.find((deal) => deal.id === props.match.params.id),
  fatture: state.fatture,
});

const mapDispatchToProps = (dispatch) => ({
  startEditDeal: (id, deal) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'deals')
        .startEditAction(id, deal)
    ),
  startRemoveDeal: (data) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'deals')
        .startRemoveAction(data)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EditDealPage));

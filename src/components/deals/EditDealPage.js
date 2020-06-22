import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { startEditDeal, startRemoveDeal } from '../../actions/deals';
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

  onRemove = () => {
    this.props.startRemoveDeal({ id: this.props.deal.id });
    this.props.history.push('/');
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
});

const mapDispatchToProps = (dispatch) => ({
  startEditDeal: (id, deal) => dispatch(startEditDeal(id, deal)),
  startRemoveDeal: (data) => dispatch(startRemoveDeal(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EditDealPage));

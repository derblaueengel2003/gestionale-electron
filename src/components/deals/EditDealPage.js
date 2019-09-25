import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DealForm from './DealForm';
import { startEditDeal, startRemoveDeal } from '../../actions/deals';

export class EditDealPage extends React.Component {
  onSubmit = deal => {
    this.props.startEditDeal(this.props.deal.id, deal);
    this.props.history.push(`/view/${this.props.deal.id}`);
  };
  onRemove = () => {
    if (
      window.confirm("Confermi la cancellazione? L'operazione è irreversibile")
    ) {
      this.props.startRemoveDeal({ id: this.props.deal.id });
      this.props.history.push('/');
    }
  };
  render() {
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Modifica Provvigione</h1>
          </div>
        </div>
        <div className='content-container'>
          <DealForm deal={this.props.deal} onSubmit={this.onSubmit} />
          <button
            className='button button--secondary-delete'
            onClick={this.onRemove}
          >
            Cancella provvigione
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  deal: state.deals.find(deal => deal.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  startEditDeal: (id, deal) => dispatch(startEditDeal(id, deal)),
  startRemoveDeal: data => dispatch(startRemoveDeal(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDealPage);

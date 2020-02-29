import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { startEditDeal, startRemoveDeal } from '../../actions/deals';
import DealForm from './DealForm';

export class EditDealPage extends React.Component {
  onSubmit = deal => {
    this.props.startEditDeal(this.props.deal.id, deal);
    this.props.history.push(`/view/${this.props.deal.id}`);
  };
  onRemove = () => {
    if (
      window.confirm(
        'Achtung! Möchten Sie wirklich das löschen? Die Daten werden unwiderruflich gelöscht!'
      )
    ) {
      this.props.startRemoveDeal({ id: this.props.deal.id });
      this.props.history.push('/');
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
            onClick={this.onRemove}
          >
            <i className='material-icons'>remove</i>
          </button>
          <DealForm deal={this.props.deal} onSubmit={this.onSubmit} />
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
)(withTranslation()(EditDealPage));

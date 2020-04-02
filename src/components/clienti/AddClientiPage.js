import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { startAddCustomer } from '../../actions/clienti';
import CustomerForm from './ClientiForm';

export class AddCustomerPage extends React.Component {
  onSubmit = customer => {
    this.props.startAddCustomer(customer);
    this.props.history.push('/customer');
  };

  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t('Aggiungi contatto')}</h1>
          </div>
        </div>
        <div className='container'>
          <CustomerForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddCustomer: customer => dispatch(startAddCustomer(customer))
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(AddCustomerPage));

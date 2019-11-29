import React from 'react';
import { connect } from 'react-redux';
import CustomerForm from './ClientiForm';
import { startAddCustomer } from '../../actions/clienti';

export class AddCustomerPage extends React.Component {
  onSubmit = customer => {
    this.props.startAddCustomer(customer);
    this.props.history.push('/customer');
  };

  render() {
    // non so cos'è e ho cancellato customer={cliente} dai props sotto di CustomerForm
    // let cliente = {};
    // if (this.props.location.state) {
    //   cliente = this.props.location.state;
    // }
    return (
      <div>
        <div>
          <div className='container'>
            <h1>Kontakt hinzufügen</h1>
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

export default connect(undefined, mapDispatchToProps)(AddCustomerPage);

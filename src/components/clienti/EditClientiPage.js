import React from 'react';
import { connect } from 'react-redux';
import CustomerForm from './ClientiForm';
import { startEditCustomer, startRemoveCustomer } from '../../actions/clienti';

export class EditClientePage extends React.Component {
  onSubmit = cliente => {
    this.props.startEditCustomer(this.props.cliente.id, cliente);
    this.props.history.push(`/customerview/${this.props.cliente.id}`);
  };
  onRemove = () => {
    if (
      window.confirm("Confermi la cancellazione? L'operazione è irreversibile")
    ) {
      this.props.startRemoveCustomer({ id: this.props.cliente.id });
      this.props.history.push('/customer');
    }
  };
<<<<<<< HEAD
  //Funzione per non mostrare i clienti se a cancellare sono i non admin
  //in pratica edito il clinete impostando la proprietà visible su false
  onDisable = () => {
    this.props.startEditCustomer(this.props.cliente.id, cliente, 0);
    this.props.history.push('/customer');
  };
=======
  onDisable = () => {
    if (window.confirm('Confermi la cancellazione?')) {
      this.props.startEditCustomer(this.props.cliente.id, {
        ...this.props.cliente,
        visible: false
      });
      this.props.history.push('/customer');
    }
  };

>>>>>>> 4297522a215e839b636e06440fe0239b41d60ca6
  render() {
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Modifica Cliente</h1>
          </div>
        </div>
        <div className='content-container'>
          <CustomerForm
            customer={this.props.cliente}
            onSubmit={this.onSubmit}
          />
          <button
            className='button button--secondary-delete'
            onClick={
              this.props.uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' ||
              this.props.uid === 'aGOwhidD7rVXfbYrWBmKL7mNrf33'
                ? this.onRemove
                : this.onDisable
            }
          >
            Cancella cliente
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  cliente: state.clienti.find(cliente => cliente.id === props.match.params.id),
  uid: state.auth.uid
});

const mapDispatchToProps = dispatch => ({
  startEditCustomer: (id, cliente, visible) =>
    dispatch(startEditCustomer(id, cliente, visible)),
  startRemoveCustomer: data => dispatch(startRemoveCustomer(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClientePage);

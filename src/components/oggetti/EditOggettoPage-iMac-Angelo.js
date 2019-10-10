import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OggettoForm from './OggettoForm';
import { startEditOggetto, startRemoveOggetto } from '../../actions/oggetti';

export class EditOggettoPage extends React.Component {
  onSubmit = oggetto => {
    this.props.startEditOggetto(this.props.oggetto.id, oggetto);
    this.props.history.push(`/oggettoview/${this.props.oggetto.id}`);
  };
  onRemove = () => {
    if (
      window.confirm("Confermi la cancellazione? L'operazione è irreversibile")
    ) {
      this.props.startRemoveOggetto({ id: this.props.oggetto.id });
      this.props.history.push('/oggetti');
    }
  };
  onDisable = () => {
    if (window.confirm('Confermi la cancellazione?')) {
      this.props.startEditOggetto(this.props.oggetto.id, {
        ...this.props.oggetto,
        visible: false
      });
      this.props.history.push('/oggetti');
    }
  };
  render() {
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Modifica Oggetto</h1>
          </div>
        </div>
        <div className='content-container'>
          <OggettoForm oggetto={this.props.oggetto} onSubmit={this.onSubmit} />
          <button
            className='button button--secondary-delete'
            onClick={
              this.props.uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' ||
              this.props.uid === 'aGOwhidD7rVXfbYrWBmKL7mNrf33'
                ? this.onRemove
                : this.onDisable
            }
          >
            Cancella oggetto
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  oggetto: state.oggetti.find(oggetto => oggetto.id === props.match.params.id),
  uid: state.auth.uid
});

const mapDispatchToProps = dispatch => ({
  startEditOggetto: (id, oggetto) => dispatch(startEditOggetto(id, oggetto)),
  startRemoveOggetto: data => dispatch(startRemoveOggetto(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOggettoPage);

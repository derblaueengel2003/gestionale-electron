import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import OggettoForm from './OggettoForm';
import { startAddOggetto } from '../../actions/oggetti';
import axios from 'axios';

export class AddOggettoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      oggetto: null,
    };
  }

  // HANDLER
  changeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (oggetto) => {
    this.props.startAddOggetto(oggetto);
    this.props.history.push('/oggetti');
  };

  handleFetch = async (e) => {
    e.preventDefault();
    const oggetto = await axios
      .get(`http://localhost:8888/wp-json/wl/v1/properties/${this.state.url}`)
      .then((res) => res.data);
    console.log(oggetto);
    oggetto.id && this.setState({ oggetto });
  };

  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t('Aggiungi oggetto')}</h1>
            <form className='form' onSubmit={this.handleFetch}>
              <input
                type='text'
                name='url'
                value={this.state.url}
                placeholder='slug oggetto'
                onChange={this.changeHandler}
              />
              <button>Fetch</button>
            </form>{' '}
          </div>
        </div>
        <div className='container'>
          {this.state.oggetto ? (
            <OggettoForm
              oggetto={this.state.oggetto}
              onSubmit={this.onSubmit}
            />
          ) : (
            <OggettoForm onSubmit={this.onSubmit} />
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddOggetto: (oggetto) => dispatch(startAddOggetto(oggetto)),
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(AddOggettoPage));

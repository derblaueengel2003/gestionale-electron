import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import OggettoForm from './OggettoForm';
import { startAddOggetto } from '../../actions/oggetti';
import { ipcRenderer } from 'electron';
import LoadingPage from '../LoadingPage';

export class AddOggettoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      oggetto: null,
      spinner: false,
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

    ipcRenderer.send('oggetto:fetch', this.state.url);

    ipcRenderer.on('oggetto:spinner', (event, spin) => {
      spin
        ? this.setState(() => ({ spinner: true }))
        : this.setState(() => ({ spinner: false }));
    });

    ipcRenderer.on('oggetto:error', (event, error) => {
      console.log(error);
    });

    ipcRenderer.on('oggetto:response', (event, oggetto) => {
      if (!oggetto.affittoNetto) oggetto.affittoNetto = '0';
      if (!oggetto.wohngeld) oggetto.wohngeld = '0';

      for (let voce in oggetto) {
        if (
          voce === 'nazione' ||
          voce == 'energieAusweisTyp' ||
          voce === 'energieTraeger' ||
          voce === 'heizungsart'
        ) {
          oggetto[voce] = this.props.t(oggetto[voce]);
        }
      }
      oggetto.visible = true;
      const indirizzo = oggetto.via.split(' ');
      oggetto.numeroCivico = indirizzo.splice(-1)[0];
      oggetto.via = indirizzo.join(' ');
      oggetto.descrizioneDe = oggetto.descrizioneDe.replace(
        /<\/?[^>]+(>|$)/g,
        ''
      );

      if (
        oggetto.tipologia === 'Wohnungen' ||
        oggetto.tipologia === 'Vermietete Wohnungen'
      ) {
        oggetto.tipologia = 'Eigentumswohnung';
      }

      console.log(oggetto);
      oggetto.id && this.setState({ oggetto });
    });
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
        {this.state.spinner && <LoadingPage />}
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

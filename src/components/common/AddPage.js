import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { storeActions } from '../../store/configureStore';
import { ipcRenderer } from 'electron';
import CustomerForm from '../clienti/ClientiForm';
import DealForm from '../deals/DealForm';
import OggettoForm from '../oggetti/OggettoForm';
import EvaluationForm from '../evaluation/EvaluationForm';
import FatturaForm from '../fatture/FatturaForm';
import FirmaForm from '../firma/FirmaForm';
import UserForm from '../utenti/UserForm';
import LeadForm from '../leads/LeadForm';
import OfferedPropertiesForm from '../leads/OfferedPropertiesForm';

export class AddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      oggetto: null,
      spinner: false,
    };
  }

  changeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

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
      oggetto.citta = oggetto.citta[0];

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

  onSubmit = (item) => {
    this.props.startAddAction(item);
    this.props.item === 'offers'
      ? this.props.history.goBack()
      : this.props.history.push(`/${this.props.item}`);
  };

  render() {
    const evaluation = {
      cloudURL: '',
      affittoNetto: 0,
      m2: 0,
      wohnlage: '',
      bodenRichtwert: 0,
      bodenRichtwert2: 0,
      bodenRichtwert3: 0,
      dataEvaluation: null,
      mietspiegel: 0,
      mietendeckel: 0,
      immobilienpreisMin: 0,
      immobilienpreisMax: 0,
      immobilienpreisAverage: 0,
      is24Evaluation: 0,
      note: '',
      oggettoId: '',
      rendite: 0,
      result: 0,
      titolo: '',
      visible: true,
    };
    const leadId =
      (this.props.location.state && this.props.location.state.leadId) || '';
    const oggettoId =
      (this.props.location.state && this.props.location.state.oggettoId) || '';
    if (this.props.location.state) {
      evaluation.titolo = this.props.location.state.titolo;
      evaluation.affittoNetto = this.props.location.state.affittoNetto;
      evaluation.m2 = this.props.location.state.m2;
      evaluation.oggettoId = this.props.location.state.oggettoId;
    }

    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t(`add_${this.props.item}`)}</h1>
          </div>
        </div>
        <div className='container'>
          {/* CLIENTI */}
          {this.props.item === 'clienti' && (
            <CustomerForm onSubmit={this.onSubmit} />
          )}
          {/* DEALS */}
          {this.props.item === 'deals' && <DealForm onSubmit={this.onSubmit} />}
          {/* OGGETTI */}
          {this.props.item === 'oggetti' && (
            <div>
              <form className='form' onSubmit={this.handleFetch}>
                <div className='evaluation evaluation_rent'>
                  <input
                    type='text'
                    name='url'
                    value={this.state.url}
                    placeholder={this.props.t('property_slug')}
                    onChange={this.changeHandler}
                  />
                  <button className='btn green btn-margin'>
                    {this.props.t('property_fetch')}
                  </button>
                </div>
              </form>
              {this.state.spinner && (
                <div className='progress'>
                  <div className='indeterminate'></div>
                </div>
              )}
              {this.state.oggetto ? (
                <OggettoForm
                  oggetto={this.state.oggetto}
                  onSubmit={this.onSubmit}
                />
              ) : (
                <OggettoForm onSubmit={this.onSubmit} />
              )}
            </div>
          )}
          {/* EVALUATIONS */}
          {this.props.item === 'evaluations' && (
            <EvaluationForm onSubmit={this.onSubmit} evaluation={evaluation} />
          )}
          {/* FATTURE */}
          {this.props.item === 'fatture' && (
            <FatturaForm onSubmit={this.onSubmit} />
          )}
          {/* UTENTI E FIRMA */}
          {this.props.item === 'firma' && (
            <FirmaForm onSubmit={this.onSubmit} />
          )}
          {this.props.item === 'utenti' && (
            <UserForm onSubmit={this.onSubmit} />
          )}
          {/* LEADS E OFFERS */}
          {this.props.item === 'leads' && <LeadForm onSubmit={this.onSubmit} />}
          {this.props.item === 'offers' && (
            <OfferedPropertiesForm
              onSubmit={this.onSubmit}
              leadId={leadId}
              oggettoId={oggettoId}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { item }) => ({
  startAddAction: (label) =>
    dispatch(
      storeActions.find((action) => action.label === item).startAddAction(label)
    ),
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(AddPage));

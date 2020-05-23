import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import M from 'materialize-css';

export class OfferedPropertiesForm extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.props.data.offers.oggettoId) {
      this.props.renderError(
        this.props.t('Inserisci un immobile da proporre al cliente')
      );
    } else {
      this.props.renderError('');
      this.props.onSubmit({
        offerCreatedAt: this.props.data.offers.offerCreatedAt
          ? this.props.data.offers.offerCreatedAt.valueOf()
          : null,
        oggettoId: this.props.data.offers.oggettoId,
        leadId: this.props.data.offers.leadId,
        offertoTramite: this.props.data.offers.offertoTramite,
        consulenteId: this.props.data.offers.consulenteId,
        feedback: this.props.data.offers.feedback,
        offerNote: this.props.data.offers.offerNote,
      });
    }
  };
  render() {
    const { t, renderSelect, renderSingleDate, renderTextArea } = this.props;

    const oggettiOptions = this.props.oggetti.map((oggetto) => ({
      value: oggetto.id,
      label: `Rif.Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`,
    }));

    const consulenteVenditaOptions = this.props.utenti.map((consulente) => ({
      value: consulente.id,
      label: consulente.name,
    }));

    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}
        <div>
          <button className='btn-floating blue right'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {renderSelect('offers', 'oggettoId', oggettiOptions, t('Immobile'))}
        {renderSelect(
          'offers',
          'consulenteId',
          consulenteVenditaOptions,
          t('Inviato da')
        )}
        {renderSingleDate(
          'offers',
          'offerCreatedAt',
          'calendarFocused',
          t('Data invio proposta')
        )}
        {renderSelect(
          'offers',
          'offertoTramite',
          [
            { value: 'email', label: t('Email') },
            { value: 'telefono', label: t('Telefono') },
            { value: 'presenza', label: t('Di presenza') },
          ],
          t('Offerto tramite')
        )}
        {renderSelect(
          'offers',
          'feedback',
          [
            { value: 'positivo', label: t('Positivo') },
            { value: 'negativo', label: t('Negativo') },
            { value: 'neutro', label: t('Neutro') },
            { value: 'sconosciuto', label: t('Non ha risposto') },
          ],
          t('Feedback del cliente')
        )}
        {renderTextArea('offers', 'offerNote')}

        <div>
          <button className='btn-floating blue right'>
            <i className='material-icons'>save</i>
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  utenti: state.utenti,
  oggetti: state.oggetti,
});

export default connect(mapStateToProps)(
  withTranslation()(withForm(OfferedPropertiesForm))
);

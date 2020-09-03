import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import M from 'materialize-css';

export class NewsletterForm extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { newsletters } = this.props.data;
    this.props.onSubmit({
      dataNewsletter: newsletters.dataNewsletter
        ? newsletters.dataNewsletter.valueOf()
        : null,
      oggetto1: newsletters.oggetto1 || null,
      oggetto2: newsletters.oggetto2 || null,
      oggetto3: newsletters.oggetto3 || null,
      oggetto4: newsletters.oggetto4 || null,
      oggetto5: newsletters.oggetto5 || null,
      oggetto6: newsletters.oggetto6 || null,
      newsletterText: newsletters.newsletterText || null,
      visible: newsletters.visible,
    });
  };
  render() {
    const {
      t,
      renderSelect,
      renderSingleDate,
      renderTextArea,
      renderCheckbox,
    } = this.props;
    const oggettiOptions = this.props.oggetti.map((oggetto) => ({
      value: oggetto.id,
      label: `Rif.Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`,
    }));

    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}
        <div className='fixed-action-btn'>
          <button className='btn-floating blue btn-large'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {renderSingleDate(
          'newsletters',
          'dataNewsletter',
          'calendarFocused',
          t('newsletter_send_date')
        )}
        {renderSelect('newsletters', 'oggetto1', oggettiOptions, t('property'))}
        {renderSelect('newsletters', 'oggetto2', oggettiOptions, t('property'))}
        {renderSelect('newsletters', 'oggetto3', oggettiOptions, t('property'))}
        {renderSelect('newsletters', 'oggetto4', oggettiOptions, t('property'))}
        {renderSelect('newsletters', 'oggetto5', oggettiOptions, t('property'))}
        {renderSelect('newsletters', 'oggetto6', oggettiOptions, t('property'))}

        {renderTextArea('newsletters', 'newsletterText')}

        {this.props.utente && this.props.utente.role === 'Admin'
          ? renderCheckbox('newsletters', 'visible', t('visible'))
          : ''}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  utente: state.utenti.find(
    (utente) => utente.firebaseAuthId === state.auth.uid
  ),
  oggetti: state.oggetti,
});

export default connect(mapStateToProps)(
  withTranslation()(withForm(NewsletterForm))
);

import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Intestazione from '../common/Intestazione';
import OptionModal from '../common/OptionModal';
import numeral from 'numeral';
import moment from 'moment';
import OggettiList from '../oggetti/OggettiList';
import Mappa from '../oggetti/Mappa';
import { storeActions } from '../../store/configureStore';
import evaluationPdf from './EvaluationPdf';
import CollectionItem from '../common/collectionItem';

import { ipcRenderer } from 'electron';

export class ViewEvaluation extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  state = {
    isOpen: false,
    modalContent: 'remove_confirm',
    btnEnabled: true,
  };

  handleOpenModal = () => {
    this.setState(() => ({
      isOpen: true,
    }));
  };

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  };

  onRemove = () => {
    this.props.startRemoveEvaluation({ id: this.props.evaluation.id });
    this.props.history.push('/evaluations');
  };

  onDisable = () => {
    this.props.startEditEvaluation(this.props.evaluation.id, {
      ...this.props.evaluation,
      visible: false,
    });
    this.props.history.push('/evaluations');
  };

  openFile = () => {
    const { evaluation, oggetti } = this.props;
    const oggetto = oggetti.find(
      (oggetto) => oggetto.id === evaluation.oggettoId
    );
    ipcRenderer.send('folder:open', {
      folder: `/m2Square - Arboscello & Fornari GbR/m2Square Office - Dokumente/Valutazioni/`,
      folderNamePartial: oggetto
        ? oggetto.via.split(' ')[0]
        : evaluation.titolo.split(' ')[0],
    });
  };

  render() {
    if (
      !this.props.evaluation ||
      (this.props.utente.role === 'Mitarbeiter' &&
        !this.props.evaluation.visible)
    ) {
      this.props.history.push('/evaluations');
      return <div>Loading...</div>;
    }
    const {
      affittoNetto,
      m2,
      cloudURL,
      wohnlage,
      bodenRichtwert,
      bodenRichtwert2,
      bodenRichtwert3,
      dataEvaluation,
      mietspiegel,
      mietendeckel,
      immobilienpreisMin,
      immobilienpreisMax,
      immobilienpreisAverage,
      is24Evaluation,
      note,
      rendite,
      result,
      titolo,
      testoIntroduttivoDe,
      testoIntroduttivoEn,
      testoIntroduttivoIt,
      testoFinaleDe,
      testoFinaleEn,
      testoFinaleIt,
    } = this.props.evaluation;

    const { evaluation, oggetti, t } = this.props;
    const oggetto = oggetti.find(
      (oggetto) => oggetto.id === evaluation.oggettoId
    );

    return (
      <div>
        <Intestazione
          intestazione={
            oggetto
              ? `Rif.Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`
              : titolo
          }
        />{' '}
        <div className='container section'>
          <div>
            <Link
              className='btn-floating orange right btn-floating-margin'
              to={`/evaluationedit/${evaluation.id}`}
            >
              <i className='material-icons'>edit</i>
            </Link>
            <div>
              <button
                className='btn-floating red right btn-floating-margin'
                onClick={this.handleOpenModal}
              >
                <i className='material-icons'>remove</i>
              </button>
            </div>
            <OptionModal
              isOpen={this.state.isOpen}
              contentLabel={'remove'}
              modalContent={this.props.t(this.state.modalContent)}
              onCancel={this.handleCloseModal}
              onConfirm={
                this.props.utente.role === 'Admin'
                  ? this.onRemove
                  : this.onDisable
              }
              btnEnabled={this.state.btnEnabled}
            />
            {
              <button
                className='btn-floating light-blue accent-3 right btn-floating-margin'
                onClick={this.openFile}
              >
                <i className='material-icons'>folder</i>
              </button>
            }
          </div>
          <h5>
            {t('evaluation_result')}: {numeral(result / 100).format('0,0.00')}{' '}
            €/m2
          </h5>
          <h5>{numeral((result * m2) / 10000).format('0,0.00')} €</h5>
          <h6>
            {t('evaluation_date')}:{' '}
            {moment(dataEvaluation).format('DD MMMM, YYYY')}
          </h6>
          <p>
            {t('notes')}: {note}
          </p>
          <ul className='collapsible'>
            <li>
              <div className='collapsible-header'>
                <i className='material-icons'>list</i>
                {t('evaluation_details')}
              </div>
              <div className='collapsible-body'>
                <p>
                  {t('area_classification')}: {t(wohnlage)}
                </p>
                <p>
                  {t('land_price')} {t('last_three_years')}:{' '}
                  {numeral(bodenRichtwert / 100).format('0,0.00')} € -{' '}
                  {numeral(bodenRichtwert2 / 100).format('0,0.00')} € -{' '}
                  {numeral(bodenRichtwert3 / 100).format('0,0.00')} €
                </p>
                <p>
                  {t('mietspiegel')}:{' '}
                  {numeral(mietspiegel / 100).format('0,0.00')} €/m2 (Tot.:{' '}
                  {numeral((mietspiegel * m2) / 10000).format('0,0.00')} €)
                </p>
                <p>
                  {t('mietendeckel')}:{' '}
                  {numeral(mietendeckel / 100).format('0,0.00')} €/m2 (Tot.:{' '}
                  {numeral((mietendeckel * m2) / 10000).format('0,0.00')} €)
                </p>
                <p>
                  {t('sold_price_min')}:{' '}
                  {numeral(immobilienpreisMin / 100).format('0,0.00')} €/m2
                  (Tot.:{' '}
                  {numeral((immobilienpreisMin * m2) / 10000).format('0,0.00')}{' '}
                  €)
                </p>
                <p>
                  {t('sold_price_max')}:{' '}
                  {numeral(immobilienpreisMax / 100).format('0,0.00')} €/m2
                  (Tot.:{' '}
                  {numeral((immobilienpreisMax * m2) / 10000).format('0,0.00')}{' '}
                  €)
                </p>
                <p>
                  {t('sold_price_average')}:{' '}
                  {numeral(immobilienpreisAverage / 100).format('0,0.00')} €/m2
                  (Tot.:{' '}
                  {numeral((immobilienpreisAverage * m2) / 10000).format(
                    '0,0.00'
                  )}{' '}
                  €)
                </p>
                <p>
                  {t('is24_evaluation')}:{' '}
                  {numeral(is24Evaluation / 100).format('0,0.00')} €/m2 (Tot.:{' '}
                  {numeral((is24Evaluation * m2) / 10000).format('0,0.00')} €)
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className='container section'>
          {/* Se ho cover e titolo, mostro il pulsante exposé */}
          <ul className='collection  s12 m6'>
            {oggetto && (
              <CollectionItem
                label={`${t('evaluation_german')}`}
                action={() => {
                  evaluationPdf(
                    this.props.evaluation,
                    this.props.firma,
                    this.props.utente,
                    this.props.ceo,
                    'De',
                    oggetto
                  );
                }}
                icon={'article'}
                btnColor={'blue'}
              />
            )}

            {oggetto && (
              <CollectionItem
                label={`${t('evaluation_english')}`}
                action={() => {
                  evaluationPdf(
                    this.props.evaluation,
                    this.props.firma,
                    this.props.utente,
                    this.props.ceo,
                    'En',
                    oggetto
                  );
                }}
                icon={'article'}
                btnColor={'blue'}
              />
            )}

            {oggetto && (
              <CollectionItem
                label={`${t('evaluation_italian')}`}
                action={() => {
                  evaluationPdf(
                    this.props.evaluation,
                    this.props.firma,
                    this.props.utente,
                    this.props.ceo,
                    'It',
                    oggetto
                  );
                }}
                icon={'article'}
                btnColor={'blue'}
              />
            )}
          </ul>
        </div>
        {/* 
          <div className='container'>
          {evaluation.cover && (
            <div className='grey lighten-4'>
            <div>
            <h1>{t('cover')}</h1>
            </div>{' '}
            </div>
            )}
            {evaluation.cover &&
              evaluation.cover.map((downloadURL, i) => {
                return <img className='foto' key={i} src={downloadURL} />;
              })}
              </div>
            */}
        <div className='container'>
          {evaluation.wohnlageSnippet && (
            <div className='grey lighten-4'>
              <div>
                <h1>{t('area_classification')}</h1>
              </div>{' '}
            </div>
          )}
          {evaluation.wohnlageSnippet &&
            evaluation.wohnlageSnippet.map((downloadURL, i) => {
              return <img className='foto' key={i} src={downloadURL} />;
            })}
        </div>
        <div className='container'>
          {evaluation.bodenrichtwertSnippet && (
            <div className='grey lighten-4'>
              <div>
                <h1>{t('land_price')}</h1>
              </div>{' '}
            </div>
          )}
          {evaluation.bodenrichtwertSnippet &&
            evaluation.bodenrichtwertSnippet.map((downloadURL, i) => {
              return <img className='foto' key={i} src={downloadURL} />;
            })}
        </div>
        <div className='container'>
          {evaluation.immobilienPreisSnippet && (
            <div className='grey lighten-4'>
              <div>
                <h1>{t('sold_price')}</h1>
              </div>{' '}
            </div>
          )}
          {evaluation.immobilienPreisSnippet &&
            evaluation.immobilienPreisSnippet.map((downloadURL, i) => {
              return <img className='foto' key={i} src={downloadURL} />;
            })}
        </div>
        <div className='container'>
          {evaluation.is24Snippet && (
            <div className='grey lighten-4'>
              <div>
                <h1>{t('is24_evaluation')}</h1>
              </div>{' '}
            </div>
          )}
          {evaluation.is24Snippet &&
            evaluation.is24Snippet.map((downloadURL, i) => {
              return <img className='foto' key={i} src={downloadURL} />;
            })}
        </div>
        <div className='container'>
          {evaluation.mietspiegelSnippet && (
            <div className='grey lighten-4'>
              <div>
                <h1>{t('mietspiegel')}</h1>
              </div>{' '}
            </div>
          )}
          {evaluation.mietspiegelSnippet &&
            evaluation.mietspiegelSnippet.map((downloadURL, i) => {
              return <img className='foto' key={i} src={downloadURL} />;
            })}
        </div>
        <div className='container'>
          {testoIntroduttivoDe && (
            <div className='grey lighten-4'>
              <div>
                <h1>{t('german')}</h1>
              </div>{' '}
            </div>
          )}
          {testoIntroduttivoDe}
          {testoFinaleDe && <div>{testoFinaleDe}</div>}
        </div>
        <div className='container'>
          {testoIntroduttivoEn && (
            <div className='grey lighten-4'>
              <div>
                <h1>{t('english')}</h1>
              </div>{' '}
            </div>
          )}
          {testoIntroduttivoEn}
          {testoFinaleEn && <div>{testoFinaleEn}</div>}
        </div>
        <div className='container'>
          {testoIntroduttivoIt && (
            <div className='grey lighten-4'>
              <div>
                <h1>{t('italian')}</h1>
              </div>{' '}
            </div>
          )}
          {testoIntroduttivoIt}
          {testoFinaleIt && <div>{testoFinaleIt}</div>}
        </div>
        <Mappa
          indirizzo={
            oggetto
              ? `${oggetto.via} ${oggetto.numeroCivico}, ${oggetto.cap} ${oggetto.citta}`
              : titolo
          }
        />
        {oggetto && <OggettiList oggetto={[oggetto]} ruolo={t('property')} />}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  evaluation: state.evaluations.find(
    (evaluation) => evaluation.id === props.match.params.id
  ),
  oggetti: state.oggetti,
  utente: state.utenti.find(
    (utente) => utente.firebaseAuthId === state.auth.uid
  ),
  firma: state.firma[0],
  ceo: state.utenti.filter((utente) => utente.qualifica === 'Geschäftsführer'),
});

const mapDispatchToProps = (dispatch) => ({
  startRemoveEvaluation: (data) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'evaluations')
        .startRemoveAction(data)
    ),
  startEditEvaluation: (id, evaluation) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'evaluations')
        .startEditAction(id, evaluation)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ViewEvaluation));

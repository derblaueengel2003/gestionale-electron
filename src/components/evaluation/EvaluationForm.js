import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import ExternalLinks from './ExternalLinks';
import IntestazioneParagrafo from '../common/IntestazioneParagrafo';
import moment from 'moment';
import numeral from 'numeral';
import M from 'materialize-css';

class EvaluationForm extends Component {
  componentDidMount() {
    M.AutoInit();
  }
  onSubmit = (e) => {
    e.preventDefault();

    const { evaluations } = this.props.data;

    const m2 = parseFloat(evaluations.m2.replace(/,/, '.'), 10) * 100;
    const affittoNetto =
      parseFloat(evaluations.affittoNetto.replace(/,/, '.'), 10) * 100;
    const rendite = parseFloat(evaluations.rendite.replace(/,/, '.'), 10) * 100;
    const bodenRichtwert =
      parseFloat(evaluations.bodenRichtwert.replace(/,/, '.'), 10) * 100;
    const bodenRichtwert2 =
      parseFloat(evaluations.bodenRichtwert2.replace(/,/, '.'), 10) * 100;
    const bodenRichtwert3 =
      parseFloat(evaluations.bodenRichtwert3.replace(/,/, '.'), 10) * 100;
    const mietspiegel =
      parseFloat(evaluations.mietspiegel.replace(/,/, '.'), 10) * 100;
    const mietendeckel =
      parseFloat(evaluations.mietendeckel.replace(/,/, '.'), 10) * 100;
    const immobilienpreisMin =
      parseFloat(evaluations.immobilienpreisMin.replace(/,/, '.'), 10) * 100;
    const immobilienpreisMax =
      parseFloat(evaluations.immobilienpreisMax.replace(/,/, '.'), 10) * 100;
    const immobilienpreisAverage =
      parseFloat(evaluations.immobilienpreisAverage.replace(/,/, '.'), 10) *
      100;
    const is24Evaluation =
      parseFloat(evaluations.is24Evaluation.replace(/,/, '.'), 10) * 100;
    const result = parseFloat(evaluations.result.replace(/,/, '.'), 10) * 100;

    if (!evaluations.titolo && !evaluations.oggettoId) {
      this.props.renderError(this.props.t('evaluation_form_submission_error'));
    } else {
      this.props.onSubmit({
        affittoNetto,
        // cover: evaluations.cover,
        bodenRichtwert,
        bodenRichtwert2,
        bodenRichtwert3,
        bodenrichtwertSnippet: evaluations.bodenrichtwertSnippet,
        cloudURL: evaluations.cloudURL,
        dataEvaluation: evaluations.dataEvaluation.valueOf(),
        mietspiegel,
        mietendeckel,
        mietspiegelSnippet: evaluations.mietspiegelSnippet,
        m2,
        immobilienpreisMin,
        immobilienpreisMax,
        immobilienpreisAverage,
        immobilienPreisSnippet: evaluations.immobilienPreisSnippet,
        is24Evaluation,
        is24Snippet: evaluations.is24Snippet,
        note: evaluations.note,
        oggettoId: evaluations.oggettoId,
        rendite,
        result,
        testoIntroduttivoDe: evaluations.testoIntroduttivoDe,
        testoFinaleDe: evaluations.testoFinaleDe,
        testoIntroduttivoEn: evaluations.testoIntroduttivoEn,
        testoFinaleEn: evaluations.testoFinaleEn,
        testoIntroduttivoIt: evaluations.testoIntroduttivoIt,
        testoFinaleIt: evaluations.testoFinaleIt,
        titolo: evaluations.titolo,
        visible: evaluations.visible,
        wohnlage: evaluations.wohnlage,
        wohnlageSnippet: evaluations.wohnlageSnippet,
      });
    }
  };

  render() {
    const { evaluations } = this.props.data;
    const {
      t,
      renderSelect,
      renderInput,
      renderTextArea,
      renderCheckbox,
      renderUploadImage,
      changeHandlerValuta,
    } = this.props;

    const rendite = parseFloat(
      evaluations.rendite.toString().replace(/,/g, '.')
    );
    const affitto = parseFloat(evaluations.affittoNetto)
      .toString()
      .replace(/,/g, '.');
    const price = numeral((affitto * 1200) / rendite).format('0,0.00');
    const m2 = parseFloat(evaluations.m2).toString().replace(/,/g, '.');
    const m2Price = numeral((affitto * 1200) / rendite / m2).format('0,0.00');
    const m2Rent = numeral(affitto / m2).format('0,0.00');

    const oggettiOptions = this.props.oggetti.map((oggetto) => ({
      value: oggetto.id,
      label: `Rif.Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`,
    }));

    return (
      <div>
        <ExternalLinks />

        <form className='form' onSubmit={this.onSubmit}>
          {this.props.data.error && (
            <p className='form__error'>{this.props.data.error}</p>
          )}{' '}
          <div>
            <IntestazioneParagrafo
              intestazione={t('yield_calculator_header')}
            />
            <div className='evaluation'>
              <div>
                {renderInput(
                  'evaluations',
                  'affittoNetto',
                  t('net_rent'),
                  undefined,
                  changeHandlerValuta
                )}
                {renderInput(
                  'evaluations',
                  'm2',
                  t('m2'),
                  undefined,
                  changeHandlerValuta
                )}
                {renderInput(
                  'evaluations',
                  'rendite',
                  t('property_yield'),
                  undefined,
                  changeHandlerValuta
                )}
              </div>
              <div className='card'>
                <div className='card-content blue-text'>
                  <div>
                    <h6>{`${t('calculated_price')}: ${price} €`}</h6>
                  </div>
                  <div>{`${t('m2_price')}: ${m2Price} €`}</div>
                  <div>{`${t('m2_rent_price')}: ${m2Rent} €`}</div>
                </div>
              </div>
            </div>

            <IntestazioneParagrafo intestazione={t('evaluation_summary')} />
            {renderSelect(
              'evaluations',
              'oggettoId',
              oggettiOptions,
              t('Oggetto')
            )}

            {!evaluations.oggettoId &&
              renderInput(
                'evaluations',
                'titolo',
                t('evaluation_title'),
                undefined,
                undefined,
                undefined,
                undefined,
                '*'
              )}
            {renderSelect(
              'evaluations',
              'wohnlage',
              [
                {
                  value: 'simple_area',
                  label: t('simple_area'),
                },
                {
                  value: 'average_area',
                  label: t('average_area'),
                },
                {
                  value: 'good_area',
                  label: t('good_area'),
                },
                {
                  value: 'top_area',
                  label: t('top_area'),
                },
              ],
              t('area_classification')
            )}
            <div className='evaluation'>
              {renderInput(
                'evaluations',
                'bodenRichtwert',
                t('land_price'),
                undefined,
                changeHandlerValuta,
                undefined,
                moment().format('YYYY')
              )}
              {renderInput(
                'evaluations',
                'bodenRichtwert2',
                moment().subtract(1, 'years').format('YYYY'),
                undefined,
                changeHandlerValuta
              )}
              {renderInput(
                'evaluations',
                'bodenRichtwert3',
                moment().subtract(2, 'years').format('YYYY'),
                undefined,
                changeHandlerValuta
              )}
            </div>
            <div className='evaluation'>
              {renderInput(
                'evaluations',
                'mietspiegel',
                t('rent_mietspiegel'),
                undefined,
                changeHandlerValuta
              )}

              {renderInput(
                'evaluations',
                'mietendeckel',
                t('rent_mietendeckel'),
                undefined,
                changeHandlerValuta
              )}
            </div>

            <div className='evaluation'>
              {renderInput(
                'evaluations',
                'immobilienpreisMin',
                t('sold_price_min'),
                undefined,
                changeHandlerValuta
              )}
              {renderInput(
                'evaluations',
                'immobilienpreisMax',
                t('sold_price_max'),
                undefined,
                changeHandlerValuta
              )}
              {renderInput(
                'evaluations',
                'immobilienpreisAverage',
                t('sold_price_average'),
                undefined,
                changeHandlerValuta
              )}
            </div>
            {renderInput(
              'evaluations',
              'is24Evaluation',
              t('is24_evaluation'),
              undefined,
              changeHandlerValuta
            )}
            {renderInput(
              'evaluations',
              'result',
              t('evaluation_result'),
              undefined,
              changeHandlerValuta
            )}
            {renderTextArea('evaluations', 'note')}
            {renderInput('evaluations', 'cloudURL', 'cloud URL')}
            {this.props.utente.role === 'Admin'
              ? renderCheckbox('evaluations', 'visible', t('visible'))
              : ''}
          </div>
          {/* 
          
          */}
          <div>
            <ul className='collection'>
              {/*  
              {renderUploadImage('evaluations', 'cover', 'Cover')}
            */}
              {renderUploadImage('evaluations', 'wohnlageSnippet', 'Wohnlage')}
              {renderUploadImage(
                'evaluations',
                'bodenrichtwertSnippet',
                'Bodenrichtwert'
              )}
              {renderUploadImage(
                'evaluations',
                'immobilienPreisSnippet',
                'Immobilien Preis Info'
              )}
              {renderUploadImage('evaluations', 'is24Snippet', 'ImmoScout24')}
              {renderUploadImage(
                'evaluations',
                'mietspiegelSnippet',
                'Mietspiegel'
              )}
            </ul>
          </div>
          <div>
            {t('german')}
            {renderTextArea(
              'evaluations',
              'testoIntroduttivoDe',
              t('evaluation_text_initial')
            )}
            {renderTextArea(
              'evaluations',
              'testoFinaleDe',
              t('evaluation_text_final')
            )}
          </div>
          <div>
            {t('english')}
            {renderTextArea(
              'evaluations',
              'testoIntroduttivoEn',
              t('evaluation_text_initial')
            )}
            {renderTextArea(
              'evaluations',
              'testoFinaleEn',
              t('evaluation_text_final')
            )}
          </div>
          <div>
            {t('italian')}
            {renderTextArea(
              'evaluations',
              'testoIntroduttivoIt',
              t('evaluation_text_initial')
            )}
            {renderTextArea(
              'evaluations',
              'testoFinaleIt',
              t('evaluation_text_final')
            )}
          </div>
          <div>
            <button className='btn-floating blue right btn-floating-margin'>
              <i className='material-icons'>save</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  evaluations: state.evaluations,
  oggetti: state.oggetti,
  utente: state.utenti.find(
    (utente) => utente.firebaseAuthId === state.auth.uid
  ),
});

export default connect(mapStateToProps)(
  withTranslation()(withForm(EvaluationForm))
);

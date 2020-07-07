import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Intestazione from '../common/Intestazione';
import OptionModal from '../common/OptionModal';
import numeral from 'numeral';
import moment from 'moment';
import OggettiList from '../oggetti/OggettiList';
import { storeActions } from '../../store/configureStore';
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
    ipcRenderer.send('folder:open', {
      folder: `/m2Square - Arboscello & Fornari GbR/m2Square Office - Dokumente/Valutazioni/`,
      folderNamePartial: this.props.evaluation.titolo.split(' ')[0],
    });
  };

  render() {
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
    } = this.props.evaluation;

    const { evaluation, oggetti, t } = this.props;
    const oggetto = oggetti.find(
      (oggetto) => oggetto.id === evaluation.oggettoId
    );

    return (
      <div>
        <Intestazione intestazione={titolo} />
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

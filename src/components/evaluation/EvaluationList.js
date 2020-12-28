import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Card from '../Card';
import selectEvaluations from '../../selectors/deals';
import { formattaData, formattaPrezzo } from '../common/utils';
import { folderButton } from '../common/elements';

export const EvaluationList = ({
  oggettoEvaluation,
  evaluations,
  ruolo,
  oggetti,
  t,
}) => {
  const evaluationsPayload = oggettoEvaluation || evaluations;

  return (
    <div className='container'>
      {evaluationsPayload.length > 0 && (
        <div>
          <h5>{ruolo || ''}</h5>
          {evaluationsPayload
            .sort((a, b) => {
              return a.dataEvaluation > b.dataEvaluation ? -1 : 1;
            })
            .map((evaluation) => {
              const dataEvaluation = formattaData(evaluation.dataEvaluation);
              const oggetto = oggetti.find(
                (oggetto) => oggetto.id === evaluation.oggettoId
              );

              return (
                <Card
                  key={evaluation.id}
                  visible={evaluation.visible}
                  link={`/evaluationview/${evaluation.id}`}
                  titolo={
                    evaluation.oggettoId
                      ? `Rif.Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`
                      : evaluation.titolo
                  }
                  sottotitolo={
                    evaluation.result
                      ? `${formattaPrezzo(
                          evaluation.result,
                          true
                        )}/m2 (Tot.: ${formattaPrezzo(
                          (evaluation.result * evaluation.m2) / 100,
                          true
                        )})`
                      : ''
                  }
                  titoloDestra={
                    <div className='foto-container'>
                      {oggetto && oggetto.downloadURLsCover && (
                        <img
                          className='foto'
                          src={oggetto.downloadURLsCover[0] || ''}
                        />
                      )}
                      {folderButton(
                        evaluation,
                        oggetto && oggetto.downloadURLsCover && true,
                        'Valutazioni',
                        oggetto
                          ? oggetto.via.split(' ')[0]
                          : evaluation.titolo.split(' ')[0]
                      )}
                    </div>
                  }
                  corpo={[dataEvaluation]}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    evaluations: selectEvaluations(
      'evaluations',
      state.evaluations,
      state.filters,
      undefined,
      state.oggetti
    ),
    oggetti: state.oggetti,
  };
};

export default connect(mapStateToProps)(withTranslation()(EvaluationList));

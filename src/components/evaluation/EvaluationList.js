import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Card from '../Card';
import selectEvaluations from '../../selectors/deals';
import moment from 'moment';
import numeral from 'numeral';

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
              const dataEvaluation = moment(evaluation.dataEvaluation).format(
                'DD MMMM, YYYY'
              );

              return (
                <Card
                  key={evaluation.id}
                  visible={evaluation.visible}
                  link={`/evaluationview/${evaluation.id}`}
                  titolo={evaluation.titolo}
                  sottotitolo={
                    evaluation.result
                      ? `${numeral(evaluation.result / 100).format(
                          '0,0.00'
                        )}  €/m2 (Tot.: ${numeral(
                          (evaluation.result * evaluation.m2) / 10000
                        ).format('0,0.00')} €)`
                      : ''
                  }
                  titoloDestra={
                    evaluation.cloudURL && (
                      <a
                        href={evaluation.cloudURL}
                        target='_blank'
                        className='btn-floating light-blue accent-3 right btn-floating-margin'
                      >
                        <i className='material-icons'>cloud</i>
                      </a>
                    )
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
      state.filters
    ),
  };
};

export default connect(mapStateToProps)(withTranslation()(EvaluationList));

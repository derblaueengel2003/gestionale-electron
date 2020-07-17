import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import EvaluationForm from './EvaluationForm';
import { storeActions } from '../../store/configureStore';

export class EditEvaluation extends React.Component {
  onSubmit = async (evaluation) => {
    await this.props.startEditEvaluation(this.props.evaluation.id, evaluation);
    this.props.history.push(`/evaluationview/${this.props.evaluation.id}`);
  };

  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t('evaluation_edit')}</h1>
          </div>
        </div>
        <div className='container'>
          <EvaluationForm
            evaluation={this.props.evaluation}
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  evaluation: state.evaluations.find(
    (evaluation) => evaluation.id === props.match.params.id
  ),
});

const mapDispatchToProps = (dispatch) => ({
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
)(withTranslation()(EditEvaluation));

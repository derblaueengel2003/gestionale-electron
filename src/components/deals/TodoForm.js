import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { storeActions } from '../../store/configureStore';
import Intestazione from '../common/Intestazione';

export class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo1: props.deal.todo1 ? props.deal.todo1 : false,
      todo2: props.deal.todo2 ? props.deal.todo2 : false,
      todo3: props.deal.todo3 ? props.deal.todo3 : false,
      todo4: props.deal.todo4 ? props.deal.todo4 : false,
      todo5: props.deal.todo5 ? props.deal.todo5 : false,
      todo6: props.deal.todo6 ? props.deal.todo6 : false,
      todo7: props.deal.todo7 ? props.deal.todo7 : false,
      todo8: props.deal.todo8 ? props.deal.todo8 : false,
      todo9: props.deal.todo9 ? props.deal.todo9 : false,
      todo10: props.deal.todo10 ? props.deal.todo10 : false,
      todo11: props.deal.todo11 ? props.deal.todo11 : false,
    };
  }

  onTodoChange = (item) => {
    this.setState(() => ({ [item]: !this.state[item] }));
    this.props.startEditDeal(this.props.deal.id, {
      [item]: !this.state[item],
    });
  };

  renderTodoItem = (item, label) => (
    <li>
      <label>
        {' '}
        <input
          type='checkbox'
          name={item}
          checked={this.state[item]}
          onChange={() => this.onTodoChange(item)}
        />{' '}
        <span>{label}</span>
      </label>
    </li>
  );

  render() {
    const { t } = this.props;
    return (
      <div className='margine-basso'>
        <Intestazione intestazione='To-Do' />
        <div className='container'>
          <ul>
            {this.renderTodoItem('todo1', t('Prenotazione'))}
            {this.renderTodoItem(
              'todo2',
              t('Informativa sul diritto di recesso')
            )}
            {this.renderTodoItem('todo3', t('Prova di solvibilità'))}
            {this.renderTodoItem(
              'todo4',
              t("Documenti inviati all'acquirente")
            )}
            {this.renderTodoItem(
              'todo5',
              t('Delega incarico notaio sottoscritta')
            )}
            {this.renderTodoItem(
              'todo6',
              t('Foglio informativo per il notaio inviato')
            )}
            {this.renderTodoItem(
              'todo7',
              t('Informazioni sul fondo di accantonamento')
            )}
            {this.renderTodoItem('todo8', t('Bozza di contratto'))}
            {this.renderTodoItem('todo9', t('Data rogito concordata'))}
            {this.renderTodoItem(
              'todo10',
              t('Modulo riciclo di denaro compilato')
            )}
            {this.renderTodoItem('todo11', t('Immobile consegnato'))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  deal: state.deals.find((deal) => deal.id === props.dealId),
});

const mapDispatchToProps = (dispatch) => ({
  startEditDeal: (id, deal) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'deals')
        .startEditAction(id, deal)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(TodoForm));

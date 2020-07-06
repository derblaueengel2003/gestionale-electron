import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { storeActions } from '../../store/configureStore';

export class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo1: props.deal ? props.deal.todo1 : false,
      todo2: props.deal ? props.deal.todo2 : false,
      todo3: props.deal ? props.deal.todo3 : false,
      todo4: props.deal ? props.deal.todo4 : false,
      todo5: props.deal ? props.deal.todo5 : false,
      todo6: props.deal ? props.deal.todo6 : false,
      todo7: props.deal ? props.deal.todo7 : false,
      todo8: props.deal ? props.deal.todo8 : false,
      todo9: props.deal ? props.deal.todo9 : false,
      todo10: props.deal ? props.deal.todo10 : false,
      todo11: props.deal ? props.deal.todo11 : false,
    };
  }

  onTodo1Change = () => {
    this.setState(() => ({ todo1: !this.state.todo1 }));
    this.props.startEditDeal(this.props.deal.id, { todo1: !this.state.todo1 });
  };
  onTodo2Change = () => {
    this.setState(() => ({ todo2: !this.state.todo2 }));
    this.props.startEditDeal(this.props.deal.id, { todo2: !this.state.todo2 });
  };
  onTodo3Change = () => {
    this.setState(() => ({ todo3: !this.state.todo3 }));
    this.props.startEditDeal(this.props.deal.id, { todo3: !this.state.todo3 });
  };
  onTodo4Change = () => {
    this.setState(() => ({ todo4: !this.state.todo4 }));
    this.props.startEditDeal(this.props.deal.id, { todo4: !this.state.todo4 });
  };
  onTodo5Change = () => {
    this.setState(() => ({ todo5: !this.state.todo5 }));
    this.props.startEditDeal(this.props.deal.id, { todo5: !this.state.todo5 });
  };
  onTodo6Change = () => {
    this.setState(() => ({ todo6: !this.state.todo6 }));
    this.props.startEditDeal(this.props.deal.id, { todo6: !this.state.todo6 });
  };
  onTodo7Change = () => {
    this.setState(() => ({ todo7: !this.state.todo7 }));
    this.props.startEditDeal(this.props.deal.id, { todo7: !this.state.todo7 });
  };
  onTodo8Change = () => {
    this.setState(() => ({ todo8: !this.state.todo8 }));
    this.props.startEditDeal(this.props.deal.id, { todo8: !this.state.todo8 });
  };
  onTodo9Change = () => {
    this.setState(() => ({ todo9: !this.state.todo9 }));
    this.props.startEditDeal(this.props.deal.id, { todo9: !this.state.todo9 });
  };
  onTodo10Change = () => {
    this.setState(() => ({ todo10: !this.state.todo10 }));
    this.props.startEditDeal(this.props.deal.id, {
      todo10: !this.state.todo10,
    });
  };
  onTodo11Change = () => {
    this.setState(() => ({ todo11: !this.state.todo11 }));
    this.props.startEditDeal(this.props.deal.id, {
      todo11: !this.state.todo11,
    });
  };
  render() {
    const { t } = this.props;
    return (
      <div className='margine-basso'>
        <div className='grey lighten-4'>
          <div className='container'>
            <h1>To-Dos</h1>
          </div>
        </div>
        <div className='container'>
          <div>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo1'
                checked={this.state.todo1}
                onChange={this.onTodo1Change}
              />{' '}
              <span>{t('Prenotazione')}</span>
            </label>
          </div>

          <div>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo2'
                checked={this.state.todo2}
                onChange={this.onTodo2Change}
              />{' '}
              <span>{t('Informativa sul diritto di recesso')}</span>
            </label>
          </div>

          <div>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo3'
                checked={this.state.todo3}
                onChange={this.onTodo3Change}
              />{' '}
              <span>{t('Prova di solvibilità')}</span>
            </label>
          </div>

          <div>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo4'
                checked={this.state.todo4}
                onChange={this.onTodo4Change}
              />{' '}
              <span>{t("Documenti inviati all'acquirente")}</span>
            </label>
          </div>

          <div>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo5'
                checked={this.state.todo5}
                onChange={this.onTodo5Change}
              />{' '}
              <span>{t('Delega incarico notaio sottoscritta')}</span>
            </label>
          </div>

          <div>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo6'
                checked={this.state.todo6}
                onChange={this.onTodo6Change}
              />{' '}
              <span>{t('Foglio informativo per il notaio inviato')}</span>
            </label>
          </div>

          <div>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo7'
                checked={this.state.todo7}
                onChange={this.onTodo7Change}
              />{' '}
              <span>{t('Informazioni sul fondo di accantonamento')}</span>
            </label>
          </div>

          <div>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo8'
                checked={this.state.todo8}
                onChange={this.onTodo8Change}
              />{' '}
              <span>{t('Bozza di contratto')}</span>
            </label>
          </div>

          <div>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo9'
                checked={this.state.todo9}
                onChange={this.onTodo9Change}
              />{' '}
              <span>{t('Data rogito concordata')}</span>
            </label>
          </div>

          <div>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo10'
                checked={this.state.todo10}
                onChange={this.onTodo10Change}
              />{' '}
              <span>{t('Modulo riciclo di denaro compilato')}</span>
            </label>
          </div>

          <div>
            <label>
              <input
                type='checkbox'
                name='todo11'
                checked={this.state.todo11}
                onChange={this.onTodo11Change}
              />
              <span>{t('Immobile consegnato')}</span>
            </label>
          </div>
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

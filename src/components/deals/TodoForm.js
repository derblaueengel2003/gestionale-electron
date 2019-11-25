import React from 'react';
import { connect } from 'react-redux';
import { startEditDeal } from '../../actions/deals';

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
      todo11: props.deal ? props.deal.todo11 : false
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
      todo10: !this.state.todo10
    });
  };
  onTodo11Change = () => {
    this.setState(() => ({ todo11: !this.state.todo11 }));
    this.props.startEditDeal(this.props.deal.id, {
      todo11: !this.state.todo11
    });
  };

  render() {
    return (
      <div className='margine-basso'>
        <div className='page-header page-header-deals'>
          <div className='content-container'>
            <h1 className='page-header__title'>To-dos</h1>
          </div>
        </div>
        <div className='content-container'>
          <div className={this.state.todo1 === true ? 'list-item--todo' : ''}>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo1'
                checked={this.state.todo1}
                onChange={this.onTodo1Change}
              />{' '}
              Reservierung
            </label>
          </div>

          <div className={this.state.todo2 === true ? 'list-item--todo' : ''}>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo2'
                checked={this.state.todo2}
                onChange={this.onTodo2Change}
              />{' '}
              Widerrufsbelehrung
            </label>
          </div>

          <div className={this.state.todo3 === true ? 'list-item--todo' : ''}>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo3'
                checked={this.state.todo3}
                onChange={this.onTodo3Change}
              />{' '}
              Kapitalnachweis
            </label>
          </div>

          <div className={this.state.todo4 === true ? 'list-item--todo' : ''}>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo4'
                checked={this.state.todo4}
                onChange={this.onTodo4Change}
              />{' '}
              Unterlagen an den Käufer versendet
            </label>
          </div>

          <div className={this.state.todo5 === true ? 'list-item--todo' : ''}>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo5'
                checked={this.state.todo5}
                onChange={this.onTodo5Change}
              />{' '}
              Unterschriebener Notarauftrag
            </label>
          </div>

          <div className={this.state.todo6 === true ? 'list-item--todo' : ''}>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo6'
                checked={this.state.todo6}
                onChange={this.onTodo6Change}
              />{' '}
              Notardatenblatt versendet
            </label>
          </div>

          <div className={this.state.todo7 === true ? 'list-item--todo' : ''}>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo7'
                checked={this.state.todo7}
                onChange={this.onTodo7Change}
              />{' '}
              Info über die Rücklage
            </label>
          </div>

          <div className={this.state.todo8 === true ? 'list-item--todo' : ''}>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo8'
                checked={this.state.todo8}
                onChange={this.onTodo8Change}
              />{' '}
              Kaufvertrag-Entwurf
            </label>
          </div>

          <div className={this.state.todo9 === true ? 'list-item--todo' : ''}>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo9'
                checked={this.state.todo9}
                onChange={this.onTodo9Change}
              />{' '}
              Beurkundunstermin vereinbart
            </label>
          </div>

          <div className={this.state.todo10 === true ? 'list-item--todo' : ''}>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo10'
                checked={this.state.todo10}
                onChange={this.onTodo10Change}
              />{' '}
              GWG Dokumentationsbogen
            </label>
          </div>

          <div className={this.state.todo11 === true ? 'list-item--todo' : ''}>
            <label>
              {' '}
              <input
                type='checkbox'
                name='todo11'
                checked={this.state.todo11}
                onChange={this.onTodo11Change}
              />{' '}
              Übergabe erledigt
            </label>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  deal: state.deals.find(deal => deal.id === props.dealId)
});

const mapDispatchToProps = dispatch => ({
  startEditDeal: (id, deal) => dispatch(startEditDeal(id, deal))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);

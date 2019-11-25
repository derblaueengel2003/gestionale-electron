import React from 'react';
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem'

export const TodoList = ( todos ) => { 
todos.map(todo => <TodoListItem key={todo.id} todo={...todo}/>)
}

const mapStateToProps = state => {
    return {
        deal: state.deals.find(deal => deal.id === props.match.params.id),
    };
};

export default connect(mapStateToProps)(TodoList);

import React from 'react';

const TodoListItem = ({ id, text, erledigt, onTodosChange }) => {
  return (
    <div>
      <label>
        <input
          type='checkbox'
          name={text}
          checked={erledigt}
          onChange={() => onTodosChange({ id, text, erledigt: !erledigt })}
        />{' '}
        {text}
      </label>
    </div>
  );
};

export default TodoListItem;

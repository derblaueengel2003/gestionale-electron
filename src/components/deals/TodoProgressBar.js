import React from 'react';

const ProgressBar = props => {
  return (
    <div className='progress-bar'>
      <Filler percentage={props.percentage} />
    </div>
  );
};

const Filler = props => {
  return (
    <div className='filler' style={{ width: `${props.percentage}%` }}></div>
  );
};

export const TodoProgressBar = ({
  todo1,
  todo2,
  todo3,
  todo4,
  todo5,
  todo6,
  todo7,
  todo8,
  todo9,
  todo10,
  todo11
}) => {
  // conto i todo fatti
  let todoCount = 0;
  todo1 && todoCount++;
  todo2 && todoCount++;
  todo3 && todoCount++;
  todo4 && todoCount++;
  todo5 && todoCount++;
  todo6 && todoCount++;
  todo7 && todoCount++;
  todo8 && todoCount++;
  todo9 && todoCount++;
  todo10 && todoCount++;
  todo11 && todoCount++;
  return (
    <blockquote>
      {`Erledigte To-dos: ${todoCount} von 11`}
      <ProgressBar percentage={(todoCount * 100) / 11} />
    </blockquote>
  );
};

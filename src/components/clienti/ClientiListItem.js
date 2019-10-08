import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

export const ClientiListItem = ({
  nome,
  cognome,
  ditta,
  email,
  telefono1,
  id,
  visible,
  uid
}) => {
  if (
    visible ||
    uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' ||
    uid === 'aGOwhidD7rVXfbYrWBmKL7mNrf33'
  ) {
    return (
      <Link
        className={visible ? 'list-item' : 'list-item disabled'}
        to={`/customerview/${id}`}
      >
        <div>
          <h3 className='list-item__title'>
            {nome} {cognome}{' '}
          </h3>
          <h4 className='list-item__sub-title'>{email}</h4>
          <h4 className='list-item__sub-title'>{telefono1}</h4>
        </div>
        <div>
          <h3 className='list-item__title'>{ditta} </h3>
        </div>
      </Link>
    );
  } else {
    return <div></div>;
  }
};

const mapStateToProps = state => {
  return {
    uid: state.auth.uid
  };
};

export default connect(mapStateToProps)(ClientiListItem);

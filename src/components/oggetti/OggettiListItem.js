import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const OggettiListItem = ({
  via,
  numeroCivico,
  cap,
  citta,
  rifId,
  id,
  numeroAppartamento,
  nazione,
  visible,
  uid
}) => {
  if (visible || uid === 'XVyqKNyFoDSa7yKV6KZmwRwLGK03') {
    return (
      <div className={visible ? 'list-item' : 'list-item disabled'}>
        <div>
          <Link to={`/oggettoview/${id}`}>
            <h3 className='list-item__title'>{`${via} ${numeroCivico}, WE ${numeroAppartamento}`}</h3>
          </Link>
          <span className='list-item__sub-title'>{`${cap} ${citta}, ${nazione}`}</span>
        </div>
        <div>
          <h3 className='list-item__title'>{rifId} </h3>
        </div>
      </div>
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

export default connect(mapStateToProps)(OggettiListItem);

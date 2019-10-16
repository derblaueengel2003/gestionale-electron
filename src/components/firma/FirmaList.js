import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FirmaListItem from './FirmaListItem';

export const FirmaList = props => (
  <div className='content-container'>
    <div className='list-header'>
      <div className='show-for-mobile'>Firmendaten</div>
      <div className='show-for-desktop'>Firmendaten</div>
    </div>
    <div className='list-body'>
      {props.firma.length === 0 ? (
        <div className='list-item list-item--message'>
          <div className='page-header__actions'>
            <Link
              className='button button-add button--secondary-clienti'
              to='/firmacreate'
            >
              +
            </Link>
          </div>
        </div>
      ) : (
        props.firma.map(firma => {
          return <FirmaListItem key={firma.id} {...firma} />;
        })
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    firma: state.firma
  };
};

export default connect(mapStateToProps)(FirmaList);

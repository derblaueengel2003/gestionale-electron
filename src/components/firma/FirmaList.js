import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FirmaListItem from './FirmaListItem';

export const FirmaList = props => (
  <div className='container'>
    <div className='list-header'>
      <div>Firmendaten</div>
      <div>
        {props.firma.length < 1 && (
          <div>
            <Link className='btn-floating' to='/firmacreate'>
              <i className='material-icons'>add</i>
            </Link>
          </div>
        )}
      </div>
    </div>
    <div className='list-body'>
      {props.firma &&
        props.firma.map(firma => {
          return <FirmaListItem key={firma.id} {...firma} />;
        })}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    firma: state.firma
  };
};

export default connect(mapStateToProps)(FirmaList);

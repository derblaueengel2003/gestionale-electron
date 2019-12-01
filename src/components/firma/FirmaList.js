import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FirmaListItem from './FirmaListItem';

export const FirmaList = props => (
  <div>
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>Firmendaten</h1>
      </div>
    </div>
    <div className='container'>
      <div>
        {props.firma.length < 1 && (
          <div>
            <Link className='btn-floating' to='/firmacreate'>
              <i className='material-icons'>add</i>
            </Link>
          </div>
        )}
      </div>
      <div>
        {props.firma &&
          props.firma.map(firma => {
            return <FirmaListItem key={firma.id} {...firma} />;
          })}
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    firma: state.firma
  };
};

export default connect(mapStateToProps)(FirmaList);

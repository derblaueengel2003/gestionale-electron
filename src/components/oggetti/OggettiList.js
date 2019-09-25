import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OggettiListItem from './OggettiListItem';
import selectOggetti from '../../selectors/oggetti';

export const OggettiList = props => {
  //controllo se arrivo da view deal o dalla dashboard oggetti
  if (props.oggetto) {
    return (
      props.oggetto.length > 0 && (
        <div className='content-container'>
          <div className='list-header-oggetti'>
            <div className='show-for-mobile'>Oggetto</div>
            <div className='show-for-desktop'>Oggetto</div>
            <div className='show-for-desktop'>Rif. Id</div>
          </div>
          <div className='list-body'>
            {props.oggetto.map(oggetto => {
              return <OggettiListItem key={oggetto.id} {...oggetto} />;
            })}
          </div>
        </div>
      )
    );
  } else {
    return (
      <div className='content-container'>
        <div className='page-header__actions'>
          <Link
            className='button button--secondary-oggetti-add'
            to='/oggettocreate'
          >
            +
          </Link>
        </div>
        <div className='list-header-oggetti'>
          <div className='show-for-mobile'>Oggetto</div>
          <div className='show-for-desktop'>Oggetto</div>
          <div className='show-for-desktop'>Rif. Id</div>
        </div>
        <div className='list-body'>
          {props.oggetti.length === 0 ? (
            <div className='list-item list-item--message'>
              <span>Nessun oggetto in base ai filtri inseriti</span>
            </div>
          ) : (
            props.oggetti.map(oggetto => {
              return <OggettiListItem key={oggetto.id} {...oggetto} />;
            })
          )}
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    oggetti: selectOggetti(state.oggetti, state.filters)
  };
};
const mapDispatchToProps = dispatch => ({
  startSetOggetti: () => dispatch(startSetOggetti())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OggettiList);

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import OggettiListItem from './OggettiListItem';
import selectOggetti from '../../selectors/oggetti';
import Card from '../Card'

export const OggettiList = props => {
  //controllo se arrivo da view deal o dalla dashboard oggetti
  if (props.oggetto) {
    // dal deal page
    return (
      props.oggetto.length > 0 && (
        <div className='container'>
          <h5>Objekt</h5>
          <div>
            {props.oggetto.map(oggetto => {
              return <Card key={oggetto.id} 
                titolo={`${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}`} 
                sottotitolo={`${oggetto.cap} ${oggetto.citta}, ${oggetto.nazione}`} 
                titoloDestra={`Ref. ID ${oggetto.rifId}`}
                visible={oggetto.visible}
                link={`/oggettoview/${oggetto.id}`}
                />;
            })}     
          </div>
        </div>
      )
    );
  } else {
    // dalla dashboard oggetti page
    return (
      <div className='container'>
        <div className='list-header'>
          <div></div>
          <div>
            <Link className='btn-floating green' to='/oggettocreate'>
              <i className='material-icons'>add</i>
            </Link>
          </div>
        </div>
        <div className='list-body'>
          {props.oggetti.length === 0 ? (
            <div className='list-item list-item--message'>
              <span>Kein Ergebnis anhand der angegebenen Filtern</span>
            </div>
          ) : (
            props.oggetti
              .sort((a, b) => {
                return a.visible < b.visible ? -1 : 1;
              })
              .map(oggetto => {
                return <Card key={oggetto.id} 
                titolo={`${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}`} 
                sottotitolo={`${oggetto.cap} ${oggetto.citta}, ${oggetto.nazione}`} 
                titoloDestra={`Ref. ID ${oggetto.rifId}`}
                visible={oggetto.visible}
                link={`/oggettoview/${oggetto.id}`}
                />;
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

export default connect(mapStateToProps, mapDispatchToProps)(OggettiList);

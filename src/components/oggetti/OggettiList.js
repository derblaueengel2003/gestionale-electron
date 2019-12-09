import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import OggettiListItem from './OggettiListItem';
import selectOggetti from '../../selectors/oggetti';
import Card from '../Card';
import numeral from 'numeral';

export const OggettiList = props => {
  //controllo se arrivo da view deal o dalla dashboard oggetti
  const oggettiPayload = props.oggetto || props.oggetti;

  return (
    <div className='container'>
      <div className='list-body'>
        {oggettiPayload.length > 0 && (
          <div>
            <h5>{props.ruolo || 'Objekte'}</h5>
            {oggettiPayload
              .sort((a, b) => {
                return a.visible < b.visible ? -1 : 1;
              })
              .map(oggetto => {
                const verkauft = oggetto.venduto ? (
                  <h5 className='red-text'>Verkauft!</h5>
                ) : (
                  ''
                );
                return (
                  <Card
                    key={oggetto.id}
                    titolo={`${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}`}
                    sottotitolo={`${oggetto.cap} ${oggetto.citta}, ${oggetto.nazione}`}
                    titoloDestra={`Ref. ID ${oggetto.rifId}`}
                    visible={oggetto.visible}
                    link={`/oggettoview/${oggetto.id}`}
                    linea1={`Kaufpreis: ${numeral(
                      oggetto.kaufpreis / 100
                    ).format('0,0[.]00 $')}`}
                    verkauft={verkauft}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
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

import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import selectOggetti from '../../selectors/deals';
import Card from '../Card';
import numeral from 'numeral';
import moment from 'moment';
import { ipcRenderer } from 'electron';

export const OggettiList = (props) => {
  //controllo se arrivo da view deal o dalla dashboard oggetti
  const oggettiPayload = props.oggetto || props.oggetti;

  return (
    <div className='container'>
      <div className='list-body'>
        {oggettiPayload.length > 0 && (
          <div>
            <h5>{props.ruolo || ''}</h5>
            {oggettiPayload
              .sort((a, b) => {
                return a.visible < b.visible ? -1 : 1;
              })
              .map((oggetto) => {
                const verkauft = oggetto.venduto ? (
                  <h5 className='red-text'>{props.t('Venduto')}!</h5>
                ) : (
                  ''
                );

                const prezzoDiVendita = `${props.t(
                  'Prezzo di vendita'
                )}: ${numeral(oggetto.kaufpreis / 100).format('0,0[.]00 $')}`;

                const dataOggetto = moment(oggetto.dataModificaOggetto).format(
                  'DD MMMM, YYYY'
                );
                return (
                  <Card
                    key={oggetto.id}
                    titolo={`${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}`}
                    titoloDestra={
                      <button
                        className='btn-floating light-blue accent-3 right btn-floating-margin'
                        onClick={() => {
                          ipcRenderer.send('folder:open', {
                            folder: `/m2Square - Arboscello & Fornari GbR/m2Square Office - Dokumente/Exposé/`,
                            folderNamePartial: oggetto.rifId,
                          });
                        }}
                      >
                        <i className='material-icons'>folder</i>
                      </button>
                    }
                    sottotitolo={`${props.t('Rif')}. ID ${oggetto.rifId}`}
                    visible={oggetto.visible}
                    link={`/oggettoview/${oggetto.id}`}
                    corpo={[
                      props.t(oggetto.tipologia),
                      prezzoDiVendita,
                      dataOggetto,
                    ]}
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

const mapStateToProps = (state) => {
  return {
    oggetti: selectOggetti(
      'oggetti',
      state.oggetti,
      state.filters,
      state.utenti.find((utente) => utente.firebaseAuthId === state.auth.uid)
    ),
  };
};
const mapDispatchToProps = (dispatch) => ({
  startSetOggetti: () => dispatch(startSetOggetti()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(OggettiList));

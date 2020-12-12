import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import selectOggetti from '../../selectors/deals';
import Card from '../Card';
import { formattaData, formattaPrezzo } from '../common/utils';
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
                )}: ${formattaPrezzo(oggetto.kaufpreis, true)}`;

                const dataOggetto = oggetto.dataModificaOggetto
                  ? formattaData(oggetto.dataModificaOggetto)
                  : oggetto.dataInserimentoOggetto
                  ? formattaData(oggetto.dataModificaOggetto)
                  : 'n/a';

                return (
                  <Card
                    key={oggetto.id}
                    titolo={`${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.citta}`}
                    titoloDestra={
                      <div className='foto-container'>
                        {oggetto.downloadURLsCover && (
                          <img
                            className='foto'
                            src={oggetto.downloadURLsCover[0] || ''}
                          />
                        )}
                        <button
                          className={`btn-floating light-blue accent-3 ${
                            oggetto.downloadURLsCover
                              ? 'icon-in-picture'
                              : 'btn-floating-margin right'
                          }`}
                          onClick={() => {
                            ipcRenderer.send('folder:open', {
                              folder: `/m2Square - Arboscello & Fornari GbR/m2Square Office - Dokumente/Exposé/`,
                              folderNamePartial: oggetto.rifId,
                            });
                          }}
                        >
                          <i className='material-icons'>folder</i>
                        </button>
                      </div>
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

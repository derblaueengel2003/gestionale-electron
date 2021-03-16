import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import YouTube from 'react-youtube';

const Videotutorial = ({ utente }) => {
  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  return (
    <div>
      <h6>Inserire immobile sul sito dal gestionale</h6>
      <YouTube videoId='Arim_yE7_LE' opts={opts} onReady={_onReady} />
      <h6>Inserire immobile sul sito dal backend</h6>
      <YouTube videoId='Xk2gO8sewS8' opts={opts} onReady={_onReady} />
      <h6>Flurkarte online</h6>
      <YouTube videoId='JhW__R8H0pU' opts={opts} onReady={_onReady} />
      <h6>Casa di cura Reservierung online</h6>
      <YouTube videoId='O1R1tFJOlGg' opts={opts} onReady={_onReady} />
      <h6>Caricare video su YouTube</h6>
      <YouTube videoId='lqrskaw8aqY' opts={opts} onReady={_onReady} />
      <h6>OneDrive creare link a una cartella da inviare ai clienti</h6>
      <YouTube videoId='RbLR_xJ2hBk' opts={opts} onReady={_onReady} />
      <h6>Statistiche visite del sito google analytics</h6>
      <YouTube videoId='DC3ESsXkxaU' opts={opts} onReady={_onReady} />

      {/* ADMIN */}
      {(utente.role === 'Admin' || utente.role === 'Geschäftsführer') && (
        <div>
          <h6>Fattura per provvigione di vendita</h6>
          <YouTube videoId='Lpmk8W40bMk' opts={opts} onReady={_onReady} />
          <h6>Fattura per altre prestazioni</h6>
          <YouTube videoId='9YaJuiEX6AU' opts={opts} onReady={_onReady} />
          <h6>Sollecito di pagamento</h6>
          <YouTube videoId='aX8dhBiGuF8' opts={opts} onReady={_onReady} />
          <h6>Sollecito con penale Mahnung</h6>
          <YouTube videoId='qCQNjunjnq4' opts={opts} onReady={_onReady} />
          <h6>Fattura Google</h6>
          <YouTube videoId='N6-QSBi3z1k' opts={opts} onReady={_onReady} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  utente: state.utenti.find(
    (utente) => utente.firebaseAuthId === state.auth.uid
  ),
});
export default connect(mapStateToProps)(withTranslation()(Videotutorial));

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
     Your videos here!
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  utente: state.utenti.find(
    (utente) => utente.firebaseAuthId === state.auth.uid
  ),
});
export default connect(mapStateToProps)(withTranslation()(Videotutorial));

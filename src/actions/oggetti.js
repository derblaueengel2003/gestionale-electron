import database from '../firebase/firebase';

// ADD_OGGETTO
export const addOggetto = (oggetto) => ({
  type: 'ADD_OGGETTO',
  oggetto,
});

export const startAddOggetto = (oggettoData = {}) => {
  return (dispatch) => {
    const {
      affittoNetto = 0,
      amtsgericht = '',
      ascensore = false,
      bagni = '',
      balcone = false,
      baujahr = '',
      cantina = false,
      cap = '',
      citta = '',
      condizioni = '',
      descrizione = '',
      descrizioneDe = '',
      descrizioneEn = '',
      downloadURLs = '',
      downloadURLsCover = '',
      downloadURLsGrundriss = '',
      energieAusweisBis = '',
      energieAusweisTyp = '',
      energieBedarf = '',
      energieTraeger = '',
      filenames = '',
      filenamesCover = '',
      filenamesGrundriss = '',
      giardino = false,
      grundbuch = '',
      grundbuchBlatt = '',
      heizungsart = '',
      inquilinoId = '',
      kaufpreis = 0,
      m2 = '',
      mobilio = '',
      nazione = '',
      note = '',
      numeroAppartamento = '',
      numeroCivico = '',
      piano = '',
      proprietarioId = '',
      proprietarioId2 = '',
      provvigione = '',
      quartiere = '',
      rifId = '',
      ruecklage = '',
      stato = '',
      tipologia = '',
      titolo = '',
      titoloDe = '',
      titoloEn = '',
      vani = '',
      venduto = false,
      verwalter = '',
      via = '',
      visible = true,
      wohngeld = 0,
      www = '',
      dataInserimentoOggetto = null,
      dataModificaOggetto = null,
    } = oggettoData;
    const oggetto = {
      affittoNetto,
      amtsgericht,
      ascensore,
      bagni,
      balcone,
      baujahr,
      cantina,
      cap,
      citta,
      condizioni,
      descrizione,
      descrizioneDe,
      descrizioneEn,
      downloadURLs,
      downloadURLsCover,
      downloadURLsGrundriss,
      energieAusweisBis,
      energieAusweisTyp,
      energieBedarf,
      energieTraeger,
      filenames,
      filenamesCover,
      filenamesGrundriss,
      giardino,
      grundbuch,
      grundbuchBlatt,
      heizungsart,
      inquilinoId,
      kaufpreis,
      m2,
      mobilio,
      nazione,
      note,
      numeroAppartamento,
      numeroCivico,
      piano,
      proprietarioId,
      proprietarioId2,
      provvigione,
      quartiere,
      rifId,
      ruecklage,
      stato,
      tipologia,
      titolo,
      titoloDe,
      titoloEn,
      vani,
      venduto,
      verwalter,
      via,
      visible,
      wohngeld,
      www,
      dataInserimentoOggetto,
      dataModificaOggetto,
    };

    return database
      .ref(`/oggetti`)
      .push(oggetto)
      .then((ref) => {
        dispatch(
          addOggetto({
            id: ref.key,
            ...oggetto,
          })
        );
      });
  };
};

// REMOVE_OGGETTO
export const removeOggetto = ({ id } = {}) => ({
  type: 'REMOVE_OGGETTO',
  id,
});

export const startRemoveOggetto = ({ id } = {}) => {
  return (dispatch) => {
    return database
      .ref(`/oggetti/${id}`)
      .remove()
      .then(() => {
        dispatch(removeOggetto({ id }));
      });
  };
};

//EDIT_OGGETTO
export const editOggetto = (id, updates) => ({
  type: 'EDIT_OGGETTO',
  id,
  updates,
});

export const startEditOggetto = (id, updates) => {
  return (dispatch) => {
    return database
      .ref(`/oggetti/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editOggetto(id, updates));
      });
  };
};

// SET_OGGETTI
export const setOggetti = (oggetti) => ({
  type: 'SET_OGGETTI',
  oggetti,
});

// export const startSetOggetti
export const startSetOggetti = () => {
  return (dispatch) => {
    return database
      .ref(`oggetti`)
      .once('value')
      .then((snapshot) => {
        const oggetti = [];

        snapshot.forEach((childSnapshot) => {
          oggetti.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        dispatch(setOggetti(oggetti));
      });
  };
};

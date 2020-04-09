// Get visible Objects

export default (oggetti, { oggetto }) => {
  return oggetti
    .filter((loggetto) => {
      const viaMatch = loggetto.via
        .toLowerCase()
        .includes(oggetto.toLowerCase());
      const cittaMatch = loggetto.citta
        .toLowerCase()
        .includes(oggetto.toLowerCase());
      const rifIdMatch = loggetto.rifId
        .toLowerCase()
        .includes(oggetto.toLowerCase());

      return viaMatch || cittaMatch || rifIdMatch;
    })
    .sort((a, b) => {
      return a.dataModificaOggetto < b.dataModificaOggetto ? 1 : -1;
    });
};

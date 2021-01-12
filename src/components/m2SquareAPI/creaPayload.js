import { formattaPrezzo, visualizzaDecimaleConVirgola } from '../common/utils';

export const creaPayload = (oggetto) => {
  const oggettoCopy = { ...oggetto };

  // Modifico l'oggetto per farlo aderire ai campi su WP
  const via = `${oggettoCopy.via} ${oggettoCopy.numeroCivico}`;
  const affittoNetto =
    oggettoCopy.affittoNetto > 0
      ? `${formattaPrezzo(oggettoCopy.affittoNetto, true)}`
      : null;

  const kaufpreis =
    oggettoCopy.kaufpreis > 0
      ? visualizzaDecimaleConVirgola(oggettoCopy.kaufpreis)
      : null;

  const wohngeld =
    oggettoCopy.wohngeld > 0
      ? `${formattaPrezzo(oggettoCopy.wohngeld, true)}`
      : null;

  if (oggettoCopy.energieAusweisTyp === 'based_on_consumption') {
    oggettoCopy.energieAusweisTyp = 'Consumption';
  } else if (oggettoCopy.energieAusweisTyp === 'based_on_requirement') {
    oggettoCopy.energieAusweisTyp = 'Requirement';
  }

  if (oggettoCopy.heizungsart === 'heating_central') {
    oggettoCopy.heizungsart = 'Central heating system';
  } else if (oggettoCopy.heizungsart === 'heating_floor') {
    oggettoCopy.heizungsart = 'Floor heating system';
  }

  if (oggettoCopy.energieTraeger === 'heating_gas') {
    oggettoCopy.energieTraeger = 'Gas';
  } else if (oggettoCopy.energieTraeger === 'heating_district') {
    oggettoCopy.energieTraeger = 'District heating';
  } else if (oggettoCopy.energieTraeger === 'heating_oil') {
    oggettoCopy.energieTraeger = 'Fuel oil';
  }

  if (
    oggettoCopy.stato === 'vacant' ||
    oggettoCopy.tipologia === 'property_apt'
  ) {
    oggettoCopy.tipologia = [243, 240, 244];
  } else if (
    oggettoCopy.stato === 'rented' ||
    oggettoCopy.tipologia === 'property_apt'
  ) {
    oggettoCopy.tipologia = [247, 241, 248];
  } else if (oggettoCopy.tipologia === 'property_nursing_home') {
    oggettoCopy.tipologia = [953, 952, 954];
  } else if (oggettoCopy.tipologia === 'property_commercial') {
    oggettoCopy.tipologia = [245, 242, 246];
  } else {
    oggettoCopy.tipologia = [243, 240, 244];
  }

  // Creo array di codici delle categorie da passare a ogni traduzione
  const property_area = () => {
    switch (oggettoCopy.quartiere) {
      case 'Charlottenburg':
        return [303, 302, 304];
      case 'Friedrichshain':
        return [255, 235, 256];
      case 'Hohenschonhausen':
        return [595, 596, 594];
      case 'Kreuzberg':
        return [257, 238, 258];
      case 'Lichtenberg':
        return [259, 236, 260];
      case 'Lichtenrade':
        return [700, 701, 702];
      case 'Mitte':
        return [309, 308, 310];
      case 'Moabit':
        return [3338, 3338, 3339];
      case 'Neukölln':
        return [270, 269, 271];
      case 'Pankow':
        return [321, 320, 322];
      case 'Prenzlauer Berg':
        return [262, 234, 261];
      case 'Reinickendorf':
        return [592, 591, 593];
      case 'Schöneberg':
        return [585, 584, 586];
      case 'Spandau':
        return [327, 323, 326];
      case 'Steglitz':
        return [274, 272, 273];
      case 'Tegel':
        return [300, 299, 301];
      case 'Tempelhof':
        return [317, 319, 318];
      case 'Tiergarten':
        return [313, 311, 314];
      case 'Treptow-Köpenick':
        return [329, 324, 328];
      case 'Wedding':
        return [264, 237, 263];
      case 'Weißensee':
        return [330, 325, 331];
      case 'Wilmersdorf':
        return [296, 298, 297];
      case 'Zehlendorf':
        return [305, 307, 306];
    }
  };

  const property_city = () => {
    switch (oggettoCopy.citta) {
      case 'Berlin':
        return [284, 232, 285];
      case 'Leipzig':
        return [655, 654, 656];
    }
  };
  const property_county_state = () => {
    switch (oggettoCopy.citta) {
      case 'Berlin':
        return [265, 230, 266];
      case 'Leipzig':
        return [267, 231, 268];
    }
  };

  const property_action_category = [249, 239, 250];

  // Creo il payload da passare ad axios
  const payload = {
    title: oggettoCopy.titoloDe,
    content: oggettoCopy.descrizioneDe,
    // postId: oggettoCopy.postIdDe || null,
    affittoNetto,
    ascensore: oggettoCopy.ascensore || null,
    bagni: oggettoCopy.bagni || null,
    balcone: oggettoCopy.balcone || null,
    baujahr: oggettoCopy.baujahr || null,
    cantina: oggettoCopy.cantina || null,
    cap: oggettoCopy.cap || null,
    downloadURLsId: oggettoCopy.downloadURLsId,
    energieAusweisBis: oggettoCopy.energieAusweisBis || null,
    energieAusweisTyp: oggettoCopy.energieAusweisTyp || null,
    energieBedarf: oggettoCopy.energieBedarf || null,
    energieTraeger: oggettoCopy.energieTraeger || null,
    featuredProperty: oggettoCopy.featuredProperty || null,
    giardino: oggettoCopy.giardino || null,
    heizungsart: oggettoCopy.heizungsart || null,
    immaginiInviate: oggettoCopy.immaginiInviate || [],
    kaufpreis,
    m2: oggettoCopy.m2 || null,
    piano: oggettoCopy.piano || null,
    postIdDe: oggettoCopy.postIdDe || null,
    postIdEn: oggettoCopy.postIdEn || null,
    postIdIt: oggettoCopy.postIdIt || null,
    property_latitude: oggettoCopy.latitude || null,
    property_longitude: oggettoCopy.longitude || null,
    property_status: 'normal',
    provvigione:
      (oggettoCopy.provvigione &&
        `${visualizzaDecimaleConVirgola(oggettoCopy.provvigione)}%`) ||
      null,
    rifId: oggettoCopy.rifId || null,
    terms: {
      property_area: oggettoCopy.quartiere
        ? property_area()
          ? property_area()[0]
          : null
        : null,
      property_city: oggettoCopy.citta
        ? property_city()
          ? property_city()[0]
          : null
        : null,
      property_county_state: oggettoCopy.citta
        ? property_county_state()
          ? property_county_state()[0]
          : null
        : null,
      property_category: oggettoCopy.tipologia[0],
      property_action_category: property_action_category[0],
    },
    themeSlider: oggettoCopy.themeSlider || null,
    vani: oggettoCopy.vani || null,
    via,
    videoId: oggettoCopy.videoId || null,
    wohngeld,
  };

  // Cover
  if (oggettoCopy.downloadURLsCoverId) {
    payload.featured_media = oggettoCopy.downloadURLsCoverId[0];
  }

  // Grundriss
  payload.useFloorPlans = 0;
  if (oggettoCopy.downloadURLsGrundriss) {
    payload.downloadURLsGrundriss = oggettoCopy.downloadURLsGrundriss;
  }
  if (oggettoCopy.downloadURLsGrundrissId) {
    payload.downloadURLsGrundrissId = oggettoCopy.downloadURLsGrundrissId;
    payload.useFloorPlans = 1;
    payload.planTitle = [];
    for (let i = 0; i < payload.downloadURLsGrundrissId.length; i++) {
      payload.planTitle.push(`Grundriss ${i + 1}`);
    }
  }

  if (oggettoCopy.status) {
    payload.status = 'publish';
  } else {
    payload.status = 'draft';
  }
  if (oggettoCopy.prenotato) payload.property_status = 'reserved';
  if (oggettoCopy.venduto) payload.property_status = 'sold';

  const payloadIt = {
    ...payload,
    title: oggettoCopy.titolo,
    content: oggettoCopy.descrizione,
    terms: {
      property_area: oggettoCopy.quartiere
        ? property_area()
          ? property_area()[2]
          : null
        : null,
      property_city: oggettoCopy.citta
        ? property_city()
          ? property_city()[2]
          : null
        : null,
      property_county_state: oggettoCopy.citta
        ? property_county_state()
          ? property_county_state()[2]
          : null
        : null,
      property_category: oggettoCopy.tipologia[2],
      property_action_category: property_action_category[2],
    },
  };

  const payloadEn = {
    ...payload,
    title: oggettoCopy.titoloEn,
    content: oggettoCopy.descrizioneEn,
    terms: {
      property_area: oggettoCopy.quartiere
        ? property_area()
          ? property_area()[1]
          : null
        : null,
      property_city: oggettoCopy.citta
        ? property_city()
          ? property_city()[1]
          : null
        : null,
      property_county_state: oggettoCopy.citta
        ? property_county_state()
          ? property_county_state()[1]
          : null
        : null,
      property_category: oggettoCopy.tipologia[1],
      property_action_category: property_action_category[1],
    },
  };

  return { payload, payloadIt, payloadEn };
};

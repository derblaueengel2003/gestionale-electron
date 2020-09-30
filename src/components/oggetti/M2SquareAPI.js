import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { storeActions } from '../../store/configureStore';
import CollectionItem from '../common/collectionItem';

const M2SquareAPI = ({ oggetto, startEditOggetto, t }) => {
  useEffect(() => {
    // dopo ogni chiamata api dovrei cancellare la sottoscrizione
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // Get Token
    const loadData = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_WPAPI}/wp-json/jwt-auth/v1/token`,
          {
            username: `${process.env.WPAPI_USERNAME}`,
            password: `${process.env.WPAPI_PASSWORD}`,
          },
          { cancelToken: source.token }
        );
        localStorage.setItem('token', data.token);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('cancelled');
        } else {
          throw error;
        }
      }
    };
    loadData();
    return () => {
      source.cancel();
    };
  }, []);

  const oggettoCopy = { ...oggetto };
  // Modifico l'oggetto per farlo aderire ai campi su WP
  const via = `${oggettoCopy.via} ${oggettoCopy.numeroCivico}`;
  const affittoNetto =
    oggettoCopy.affittoNetto > 0
      ? `${(oggettoCopy.affittoNetto / 100).toString().replace(/\./, ',')} €`
      : null;

  const kaufpreis =
    oggettoCopy.kaufpreis > 0
      ? (oggettoCopy.kaufpreis / 100).toString().replace(/\./, ',')
      : null;

  const wohngeld =
    oggettoCopy.wohngeld > 0
      ? `${(oggettoCopy.wohngeld / 100).toString().replace(/\./, ',')} €`
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

  // Creo l'oggettoCopy da passare ad axios
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
      (oggettoCopy.provvigione && `${oggettoCopy.provvigione}%`) || null,
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
      property_category: [oggettoCopy.tipologia[0]],
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

  const postImages = (postId, payload, language) => {
    // se ci sono immagini, le posto. gli id sono un array di arrays
    let i;
    if (language === 'En') {
      i = 1;
    } else if (language === 'It') {
      i = 2;
    } else {
      i = 0;
    }

    if (payload && payload[i].length > 0) {
      payload[i].forEach((id) => {
        axios.put(
          `${process.env.REACT_APP_WPAPI}/wp-json/wp/v2/media/${id}`,
          { post: postId },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
      });
    }
  };

  const translateImages = (downloadURLsId, language) => {
    let imgArray = [];
    if (language === 'En') {
      imgArray = [...downloadURLsId[1]];
    } else if (language === 'It') {
      imgArray = [...downloadURLsId[2]];
    }
    downloadURLsId[0].forEach((url, i) => {
      axios.post(
        `${process.env.REACT_APP_WPAPI}/wp-json/wl/v1/mediatranslation/`,
        {
          original: url,
          translation: imgArray[i],
          language: language.toLowerCase(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    });
  };

  const postProperty = async (language, payload) => {
    startEditOggetto(oggetto.id, {
      spinner: true,
    });
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_WPAPI}/wp-json/wp/v2/estate_property`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(data);
      localStorage.setItem(`postId${language}`, data.id);

      //i link che ricevo non contengono la sigla per la lingua. La devo inserire io
      let newLink = data.link;
      if (language !== 'De') {
        const searchTerm = '/immobili';
        const indexOfFirst = data.link.indexOf(searchTerm);
        const firstPart = newLink.slice(0, indexOfFirst);
        const languagePart = language.toLowerCase();
        const secondPart = newLink.slice(indexOfFirst);
        newLink = `${firstPart}/${languagePart}${secondPart}`;
      }

      // passo allo store il post id che mi ritorna
      await startEditOggetto(oggetto.id, {
        [`postId${language}`]: data.id,
        [`link${language}`]: newLink,
      });

      // posto i custom field di estate_property tramite il plugin che ho scritto
      await axios.post(
        `${process.env.REACT_APP_WPAPI}/wp-json/wl/v1/properties/`,
        { ...payload, postId: data.id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // se ci sono immagini, le posto. gli id sono un array di arrays
      await postImages(data.id, payload.downloadURLsId, language);

      if (language !== 'De') {
        axios.post(
          `${process.env.REACT_APP_WPAPI}/wp-json/wl/v1/translation/`,
          {
            original: localStorage.getItem('postIdDe'),
            translation: data.id,
            language: language.toLowerCase(),
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        // translate images
        payload.downloadURLsId &&
          translateImages(payload.downloadURLsId, language);
      }
    } catch (error) {
      console.log(error);
    } finally {
      startEditOggetto(oggetto.id, {
        spinner: false,
      });
    }
  };

  const updateProperty = async (postId, payload, language) => {
    startEditOggetto(oggetto.id, {
      spinner: true,
    });
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_WPAPI}/wp-json/wp/v2/estate_property/${postId}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      startEditOggetto(oggetto.id, {
        [`link${language}`]: data.link,
      });

      const { data: customFields } = await axios.post(
        `${process.env.REACT_APP_WPAPI}/wp-json/wl/v1/properties/`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // se ci sono immagini, le posto. gli id sono un array di arrays
      postImages(postId, payload.downloadURLsId, language);

      // traduzioni
      if (language !== 'De') {
        const { data: traduzione } = await axios.post(
          `${process.env.REACT_APP_WPAPI}/wp-json/wl/v1/translation/`,
          {
            original: payload.postIdDe,
            translation: postId,
            language: language.toLowerCase(),
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        // translate images
        payload.downloadURLsId &&
          translateImages(payload.downloadURLsId, language);
      }
    } catch (error) {
      console.log(error);
    } finally {
      startEditOggetto(oggetto.id, {
        spinner: false,
      });
    }
  };

  const sendDeRequest = () => {
    if (oggettoCopy.postIdDe) {
      updateProperty(oggettoCopy.postIdDe, payload, 'De');
    } else if (oggettoCopy.titoloDe) {
      postProperty('De', payload);
    }
  };

  const sendItRequest = () => {
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
        property_category: [oggettoCopy.tipologia[2]],
        property_action_category: property_action_category[2],
      },
    };
    if (oggettoCopy.postIdIt) {
      updateProperty(oggettoCopy.postIdIt, payloadIt, 'It');
    } else if (oggettoCopy.titolo) {
      postProperty('It', payloadIt);
    }
  };

  const sendEnRequest = () => {
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
        property_category: [oggettoCopy.tipologia[1]],
        property_action_category: property_action_category[1],
      },
    };
    if (oggettoCopy.postIdEn) {
      updateProperty(oggettoCopy.postIdEn, payloadEn, 'En');
    } else if (oggettoCopy.titoloEn) {
      postProperty('En', payloadEn);
    }
  };

  const sendAllRequests = async () => {
    if (!oggettoCopy.postIdDe) {
      console.log('Start Post');
      await postProperty('De', payload);
      sendItRequest();
      sendEnRequest();
    } else {
      console.log('Start PUT');
      updateProperty(oggettoCopy.postIdDe, payload, 'De');
      sendItRequest();
      sendEnRequest();
    }
  };

  const btnColorDe = oggetto.postIdDe ? 'green' : 'blue';
  const btnColorEn = oggetto.postIdEn ? 'green' : 'blue';
  const btnColorIt = oggetto.postIdIt ? 'green' : 'blue';
  const btnColorAll =
    oggetto.postIdDe && oggetto.postIdEn && oggetto.postIdIt ? 'green' : 'blue';

  return (
    <div>
      <h5>{t('sync_website')}</h5>
      {/* Se ho cover e titolo, mostro il pulsante sync */}
      {oggetto.spinner ? (
        <div className='progress'>
          <div className='indeterminate'></div>
        </div>
      ) : (
        <ul className='collection'>
          {oggetto.downloadURLsCover && oggetto.titoloDe && (
            <CollectionItem
              label={`Sync ${t('tedesco')}`}
              action={sendDeRequest}
              icon={'send'}
              btnColor={btnColorDe}
            />
          )}

          {oggetto.downloadURLsCover && oggetto.titolo && (
            <CollectionItem
              label={`Sync ${t('italiano')}`}
              action={sendItRequest}
              icon={'send'}
              btnColor={btnColorIt}
            />
          )}
          {oggetto.downloadURLsCover && oggetto.titoloEn && (
            <CollectionItem
              label={`Sync ${t('inglese')}`}
              action={sendEnRequest}
              icon={'send'}
              btnColor={btnColorEn}
            />
          )}
          {oggetto.downloadURLsCover &&
            oggetto.titolo.length > 1 &&
            oggetto.titoloDe.length > 1 &&
            oggetto.titoloEn.length > 1 && (
              <CollectionItem
                label={`Sync All`}
                action={sendAllRequests}
                icon={'send'}
                btnColor={btnColorAll}
              />
            )}
        </ul>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startEditOggetto: (id, oggetto) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'oggetti')
        .startEditAction(id, oggetto)
    ),
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(M2SquareAPI));

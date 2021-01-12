import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { storeActions } from '../../store/configureStore';
import CollectionItem from '../common/collectionItem';
import { formattaPrezzo, visualizzaDecimaleConVirgola } from '../common/utils';

export class M2SquareAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      payload: {},
      payloadIt: {},
      payloadEn: {},
    };
  }

  componentDidMount() {
    console.log('m2Square API reloaded');
    this.preparePayloads();
  }

  postImages = (postId, payload, language) => {
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
      console.log(payload[i]);
      let sortPayload = [];

      payload[i].forEach((id, indice) => {
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

        sortPayload.push({
          postId: id,
          menuOrder: indice,
        });
      });

      axios.put(
        `${process.env.REACT_APP_WPAPI}/wp-json/wl/v1/sortimage/`,
        sortPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    }
  };

  translateImages = (downloadURLsId, language) => {
    let imgArray = [];
    let translationArray = [];

    if (language === 'En') {
      imgArray = [...downloadURLsId[1]];
    } else if (language === 'It') {
      imgArray = [...downloadURLsId[2]];
    }
    downloadURLsId[0].forEach((url, i) => {
      translationArray.push({
        original: url,
        translation: imgArray[i],
        language: language.toLowerCase(),
      });
    });

    axios.post(
      `${process.env.REACT_APP_WPAPI}/wp-json/wl/v1/mediatranslation/`,
      translationArray,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  };

  postProperty = async (language, payload) => {
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
      console.log('Data: ', data);
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
      await this.props.startEditOggetto(this.props.oggetto.id, {
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
      console.log('POST');
      console.log('Payload: ', payload);
      // se ci sono immagini, le posto. gli id sono un array di arrays
      this.postImages(data.id, payload.downloadURLsId, language);

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
          this.translateImages(payload.downloadURLsId, language);
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateProperty = async (postId, payload, language) => {
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
      console.log('PUT Data: ', data);
      console.log('PUT Payload: ', payload);
      this.props.startEditOggetto(this.props.oggetto.id, {
        [`link${language}`]: data.link,
      });

      // posto i custom field di estate_property tramite il plugin che ho scritto
      await axios.post(
        `${process.env.REACT_APP_WPAPI}/wp-json/wl/v1/properties/`,
        { ...payload, postId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // se ci sono immagini, le posto. gli id sono un array di arrays
      this.postImages(postId, payload.downloadURLsId, language);

      // traduzioni
      if (language !== 'De') {
        axios.post(
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
          this.translateImages(payload.downloadURLsId, language);
      }
    } catch (error) {
      console.log(error);
    }
  };

  sendDeRequest = () => {
    // this.preparePayloadDe();

    if (this.state.payload.postIdDe) {
      this.updateProperty(this.state.payload.postIdDe, payload, 'De');
    } else if (this.state.payload.titoloDe) {
      this.postProperty('De', this.state.payload);
    }
  };

  sendItRequest = async () => {
    if (this.state.payload.postIdIt) {
      await this.updateProperty(
        this.state.payload.postIdIt,
        this.state.payloadIt,
        'It'
      );
    } else if (this.state.payload.titolo) {
      await this.postProperty('It', this.state.payloadIt);
    }
  };

  sendEnRequest = async () => {
    if (this.state.payload.postIdEn) {
      await this.updateProperty(
        this.state.payload.postIdEn,
        this.state.payloadEn,
        'En'
      );
    } else if (this.state.payload.titoloEn) {
      await this.postProperty('En', this.state.payloadEn);
    }
  };

  sendAllRequests = async () => {
    try {
      this.setState((previousState) => {
        return { spinner: !previousState.spinner };
      });
      !this.state.payload.postIdDe
        ? await this.postProperty('De', this.state.payload)
        : await this.updateProperty(
            this.state.payload.postIdDe,
            this.state.payload,
            'De'
          );
      await this.sendEnRequest();
      await this.sendItRequest();
    } catch (error) {
      console.log(error);
    }
  };

  preparePayloads = () => {
    const oggetto = { ...this.props.oggetto };

    // Modifico l'oggetto per farlo aderire ai campi su WP
    const via = `${oggetto.via} ${oggetto.numeroCivico}`;
    const affittoNetto =
      oggetto.affittoNetto > 0
        ? `${formattaPrezzo(oggetto.affittoNetto, true)}`
        : null;

    const kaufpreis =
      oggetto.kaufpreis > 0
        ? visualizzaDecimaleConVirgola(oggetto.kaufpreis)
        : null;

    const wohngeld =
      oggetto.wohngeld > 0 ? `${formattaPrezzo(oggetto.wohngeld, true)}` : null;

    let energieAusweisTyp,
      heizungsart,
      energieTraeger,
      tipologia = null;

    if (oggetto.energieAusweisTyp === 'based_on_consumption') {
      energieAusweisTyp = 'Consumption';
    } else if (oggetto.energieAusweisTyp === 'based_on_requirement') {
      energieAusweisTyp = 'Requirement';
    }

    if (oggetto.heizungsart === 'heating_central') {
      heizungsart = 'Central heating system';
    } else if (oggetto.heizungsart === 'heating_floor') {
      heizungsart = 'Floor heating system';
    }

    if (oggetto.energieTraeger === 'heating_gas') {
      energieTraeger = 'Gas';
    } else if (oggetto.energieTraeger === 'heating_district') {
      energieTraeger = 'District heating';
    } else if (oggetto.energieTraeger === 'heating_oil') {
      energieTraeger = 'Fuel oil';
    }

    if (oggetto.stato === 'vacant' || oggetto.tipologia === 'property_apt') {
      tipologia = [243, 240, 244];
    } else if (
      oggetto.stato === 'rented' ||
      oggetto.tipologia === 'property_apt'
    ) {
      tipologia = [247, 241, 248];
    } else if (oggetto.tipologia === 'property_nursing_home') {
      tipologia = [953, 952, 954];
    } else if (oggetto.tipologia === 'property_commercial') {
      tipologia = [245, 242, 246];
    } else {
      tipologia = [243, 240, 244];
    }

    // Creo array di codici delle categorie da passare a ogni traduzione
    const property_area = () => {
      switch (oggetto.quartiere) {
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
      switch (oggetto.citta) {
        case 'Berlin':
          return [284, 232, 285];
        case 'Leipzig':
          return [655, 654, 656];
      }
    };
    const property_county_state = () => {
      switch (oggetto.citta) {
        case 'Berlin':
          return [265, 230, 266];
        case 'Leipzig':
          return [267, 231, 268];
      }
    };
    const property_action_category = [249, 239, 250];

    //// INIZIO PAYLOAD
    const payload = {
      title: oggetto.titoloDe,
      content: oggetto.descrizioneDe,
      postId: oggetto.postIdDe || null,
      affittoNetto,
      ascensore: oggetto.ascensore || null,
      bagni: oggetto.bagni || null,
      balcone: oggetto.balcone || null,
      baujahr: oggetto.baujahr || null,
      cantina: oggetto.cantina || null,
      cap: oggetto.cap || null,
      downloadURLsId: oggetto.downloadURLsId,
      energieAusweisBis: oggetto.energieAusweisBis || null,
      energieAusweisTyp,
      energieBedarf: oggetto.energieBedarf || null,
      energieTraeger,
      featuredProperty: oggetto.featuredProperty || null,
      giardino: oggetto.giardino || null,
      heizungsart,
      kaufpreis,
      m2: oggetto.m2 || null,
      piano: oggetto.piano || null,
      postIdDe: oggetto.postIdDe || null,
      postIdEn: oggetto.postIdEn || null,
      postIdIt: oggetto.postIdIt || null,
      property_latitude: oggetto.latitude || null,
      property_longitude: oggetto.longitude || null,
      property_status: 'normal',
      provvigione:
        (oggetto.provvigione &&
          `${visualizzaDecimaleConVirgola(oggetto.provvigione)}%`) ||
        null,
      rifId: oggetto.rifId || null,
      terms: {
        property_area: oggetto.quartiere
          ? property_area()
            ? property_area()[0]
            : null
          : null,
        property_city: oggetto.citta
          ? property_city()
            ? property_city()[0]
            : null
          : null,
        property_county_state: oggetto.citta
          ? property_county_state()
            ? property_county_state()[0]
            : null
          : null,
        property_category: tipologia[0],
        property_action_category: property_action_category[0],
      },
      themeSlider: oggetto.themeSlider || null,
      vani: oggetto.vani || null,
      via,
      videoId: oggetto.videoId || null,
      wohngeld,
    };

    // Cover
    if (oggetto.downloadURLsCoverId) {
      payload.featured_media = oggetto.downloadURLsCoverId[0];
    }

    // Grundriss
    payload.useFloorPlans = 0;
    if (oggetto.downloadURLsGrundriss) {
      payload.downloadURLsGrundriss = oggetto.downloadURLsGrundriss;
    }
    if (oggetto.downloadURLsGrundrissId) {
      payload.downloadURLsGrundrissId = oggetto.downloadURLsGrundrissId;
      payload.useFloorPlans = 1;
      payload.planTitle = [];
      for (let i = 0; i < payload.downloadURLsGrundrissId.length; i++) {
        payload.planTitle.push(`Grundriss ${i + 1}`);
      }
    }

    if (payload.status) {
      payload.status = 'publish';
    } else {
      payload.status = 'draft';
    }
    if (payload.prenotato) payload.property_status = 'reserved';
    if (payload.venduto) payload.property_status = 'sold';

    const payloadEn = {
      ...payload,
      title: oggetto.titoloEn,
      content: oggetto.descrizioneEn,
      terms: {
        property_area: payload.quartiere
          ? property_area()
            ? property_area()[1]
            : null
          : null,
        property_city: payload.citta
          ? property_city()
            ? property_city()[1]
            : null
          : null,
        property_county_state: payload.citta
          ? property_county_state()
            ? property_county_state()[1]
            : null
          : null,
        property_category: tipologia[1],
        property_action_category: property_action_category[1],
      },
    };

    const payloadIt = {
      ...payload,
      title: oggetto.titolo,
      content: oggetto.descrizione,
      terms: {
        property_area: payload.quartiere
          ? property_area()
            ? property_area()[2]
            : null
          : null,
        property_city: payload.citta
          ? property_city()
            ? property_city()[2]
            : null
          : null,
        property_county_state: payload.citta
          ? property_county_state()
            ? property_county_state()[2]
            : null
          : null,
        property_category: tipologia[2],
        property_action_category: property_action_category[2],
      },
    };

    this.setState({ payload, payloadEn, payloadIt });
  };

  render() {
    const { oggetto, t } = this.props;
    const btnColorDe = oggetto.postIdDe ? 'green' : 'blue';
    const btnColorEn = oggetto.postIdEn ? 'green' : 'blue';
    const btnColorIt = oggetto.postIdIt ? 'green' : 'blue';
    const btnColorAll =
      oggetto.postIdDe && oggetto.postIdEn && oggetto.postIdIt
        ? 'green'
        : 'blue';

    return (
      <div>
        <h5>{t('sync_website')}</h5>
        {/* Se ho cover e titolo, mostro il pulsante sync */}
        {this.state.spinner ? (
          <div className='progress'>
            <div className='indeterminate'></div>
          </div>
        ) : (
          <ul className='collection'>
            {oggetto.downloadURLsCover && oggetto.titoloDe && (
              <CollectionItem
                label={`Sync ${t('tedesco')}`}
                action={this.sendDeRequest}
                icon={oggetto.postIdDe ? 'update' : 'add'}
                btnColor={btnColorDe}
              />
            )}

            {oggetto.downloadURLsCover && oggetto.titolo && (
              <CollectionItem
                label={`Sync ${t('italiano')}`}
                action={this.sendItRequest}
                icon={oggetto.postIdIt ? 'update' : 'add'}
                btnColor={btnColorIt}
              />
            )}
            {oggetto.downloadURLsCover && oggetto.titoloEn && (
              <CollectionItem
                label={`Sync ${t('inglese')}`}
                action={this.sendEnRequest}
                icon={oggetto.postIdEn ? 'update' : 'add'}
                btnColor={btnColorEn}
              />
            )}
            {oggetto.downloadURLsCover &&
              oggetto.titolo.length > 1 &&
              oggetto.titoloDe.length > 1 &&
              oggetto.titoloEn.length > 1 && (
                <CollectionItem
                  label={`Sync All`}
                  action={this.sendAllRequests}
                  icon={
                    oggetto.postIdDe && oggetto.postIdIt && oggetto.postIdEn
                      ? 'update'
                      : 'add'
                  }
                  btnColor={btnColorAll}
                />
              )}
          </ul>
        )}
      </div>
    );
  }
}

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

// ({ oggetto, startEditOggetto, t }) => {
// useEffect(() => {
//   // dopo ogni chiamata api dovrei cancellare la sottoscrizione
//   const CancelToken = axios.CancelToken;
//   const source = CancelToken.source();

//   // Get Token
//   const loadData = async () => {
//     try {
//       const { data } = await axios.post(
//         `${process.env.REACT_APP_WPAPI}/wp-json/jwt-auth/v1/token`,
//         {
//           username: `${process.env.WPAPI_USERNAME}`,
//           password: `${process.env.WPAPI_PASSWORD}`,
//         },
//         { cancelToken: source.token }
//       );
//       localStorage.setItem('token', data.token);
//     } catch (error) {
//       if (axios.isCancel(error)) {
//         console.log('cancelled');
//       } else {
//         throw error;
//       }
//     }
//   };
//   loadData();
//   return () => {
//     source.cancel();
//   };
// }, []);

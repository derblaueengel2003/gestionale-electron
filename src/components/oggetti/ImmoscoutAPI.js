import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { storeActions } from '../../store/configureStore';
import uuid from 'uuid';
import crypto from 'crypto';
import { formattaPrezzo } from '../common/utils';
import CollectionItem from '../common/collectionItem';
// ELECTRON
import { ipcRenderer } from 'electron';

const ImmoscoutAPI = ({ oggetto, startEditOggetto }) => {
  const connectToIS24 = (base_url, method) => {
    const oauth_timestamp = Math.floor(Date.now() / 1000);
    const oauth_nonce = uuid.v1();
    const oauth_token = 'b895110f-2b6d-41ea-b1d4-85a63a17c200';
    const encoded_oauth_token = encodeURIComponent(oauth_token);
    const parameters = {
      oauth_consumer_key: 'm2SquareImmobilienKey',
      oauth_nonce,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp,
      oauth_token,
      oauth_version: '1.0',
    };
    let ordered = {};
    Object.keys(parameters)
      .sort()
      .forEach(function (key) {
        ordered[key] = parameters[key];
      });
    let encodedParameters = '';
    for (let k in ordered) {
      const encodedValue = escape(ordered[k]);
      const encodedKey = encodeURIComponent(k);
      if (encodedParameters === '') {
        encodedParameters += encodeURIComponent(
          `${encodedKey}=${encodedValue}`
        );
      } else {
        encodedParameters += encodeURIComponent(
          `&${encodedKey}=${encodedValue}`
        );
      }
    }
    const encodedUrl = encodeURIComponent(base_url);
    const signature_base_string = `${method}&${encodedUrl}&${encodedParameters}`;
    const encodedClientSecret = encodeURIComponent('c1jaBYcJ2umVdm0G');
    const encodedTokenSecret = encodeURIComponent(
      'WnKSZ4FByiUAL2Cg0fGVqhLDNU8UX7BQfA+Xf+gSvz2BC0yaKxtmLGDJH4gUt9bK+RnyGOEJAadpp7XzSWLDzQYZFfX9dDp7ILp+mhM92JQ='
    );
    const signing_key = `${encodedClientSecret}&${encodedTokenSecret}`;
    const oauth_signature = crypto
      .createHmac('sha1', signing_key)
      .update(signature_base_string)
      .digest()
      .toString('base64');
    const encoded_oauth_signature = encodeURIComponent(oauth_signature);
    const oAuth = `OAuth oauth_consumer_key="m2SquareImmobilienKey",oauth_nonce="${oauth_nonce}",oauth_signature="${encoded_oauth_signature}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${oauth_timestamp}",oauth_token="${encoded_oauth_token}",oauth_version="1.0"`;
    return oAuth;
  };

  const exportToIS24 = () => {
    const haftungText = `Haftungsausschluss:
      
      Die Angaben zu folgende Vertragsgelegenheit haben wir vom Eigentümer erhalten, welche wir gerne an Sie weiterleiten. Eine Haftung für die Richtigkeit dieser Angaben können wir nicht übernehmen. Die Wohnungsgröße wurde von uns ausdrücklich nicht ausgemessen. Der Grundriss stammt vom Verkäufer.
      Wir sind auch für den Verkäufer tätig.`;
    const provisionsHinweis = `Die Provision beträgt ${formattaPrezzo(
      oggetto.provvigione / 100,
      false,
      false,
      true
    )} (inkl. MwSt.) vom Kaufpreis und ist vom Käufer bei wirksamem Abschluss des Kaufvertrags zu zahlen. Der Interessent verpflichtet sich, die vereinbarte Provision zu bezahlen, wenn mit ihm oder einem mit ihm verbundenen Haus ein notariell beurkundeter Vertrag zustande kommt.`;

    const body = {
      'realestates.apartmentBuy': {
        externalId: oggetto.rifId,
        title: oggetto.titoloDe,
        address: {
          street: oggetto.via,
          houseNumber: oggetto.numeroCivico,
          postcode: oggetto.cap,
          city: oggetto.citta,
        },
        descriptionNote: oggetto.descrizioneDe,
        otherNote: haftungText,
        showAddress: 'true',
        contact: {},
        apartmentType: 'NO_INFORMATION',
        floor: parseInt(oggetto.piano, 10),
        lift: oggetto.ascensore,
        cellar: oggetto.cantina,
        handicappedAccessible: 'NOT_APPLICABLE',
        condition: 'NO_INFORMATION',
        constructionYear: oggetto.baujahr,
        //////////////////////////////////////////////////////////

        energyCertificate: {
          energyCertificateAvailability: oggetto.energieBedarf
            ? 'AVAILABLE'
            : 'NOT_REQUIRED',
          energyCertificateCreationDate: 'FROM_01_MAY_2014',
        },
        heatingType: oggetto.heizungsart,
        heatingTypeEnev2014: oggetto.heizungsart,
        energySourcesEnev2014: {
          energySourceEnev2014: 'NO_INFORMATION',
        },
        buildingEnergyRatingType:
          oggetto.energieAusweisTyp === 'based_on_consumption'
            ? 'ENERGY_CONSUMPTION'
            : 'ENERGY_REQUIRED',
        thermalCharacteristic: parseFloat(oggetto.energieBedarf),
        energyConsumptionContainsWarmWater: 'NOT_APPLICABLE',
        ////////////////////////////////////////////////////////////////
        numberOfBathRooms: parseInt(oggetto.bagni, 10),
        guestToilet: 'NOT_APPLICABLE',
        rented: oggetto.stato === 'vacant' ? 'NOT_APPLICABLE' : 'YES',
        price: {
          value: oggetto.kaufpreis / 100,
          currency: 'EUR',
          marketingType: 'PURCHASE',
          priceIntervalType: 'ONE_TIME_CHARGE',
        },
        livingSpace: parseFloat(oggetto.m2),
        numberOfRooms: parseFloat(oggetto.vani),
        balcony: oggetto.balcone,
        garden: oggetto.giardino,
        energyPerformanceCertificate: oggetto.energieBedarf ? true : false,
        courtage: {
          hasCourtage: 'YES',
          courtage: `${formattaPrezzo(oggetto.provvigione)}%`,
          courtageNote: provisionsHinweis,
        },
        serviceCharge: oggetto.wohngeld / 100,
      },
    };

    // Affitto
    if (oggetto.affittoNetto > 0) {
      body.rentalIncome = oggetto.affittoNetto / 100;
    }

    // Energieausweis
    switch (oggetto.heizungsart) {
      case 'heating_central':
        body.HeatingTypeEnev2014 = 'CENTRAL_HEATING';
        break;
      case 'heating_floor':
        body.HeatingTypeEnev2014 = 'SELF_CONTAINED_CENTRAL_HEATING';
        break;
    }

    switch (oggetto.energieTraeger) {
      case 'heating_gas':
        body[
          'realestates.apartmentBuy'
        ].energySourcesEnev2014.energySourceEnev2014 = 'GAS';
        break;
      case 'heating_oil':
        body[
          'realestates.apartmentBuy'
        ].energySourcesEnev2014.energySourceEnev2014 = 'OIL';
        break;
      case 'heating_district':
        body[
          'realestates.apartmentBuy'
        ].energySourcesEnev2014.energySourceEnev2014 = 'DISTRICT_HEATING';
        break;
    }

    if (oggetto.is24id) {
      body['realestates.apartmentBuy']['@id'] = oggetto.is24id;
    }

    //Condition
    switch (oggetto.condizioni) {
      case 'new':
        body.condition = 'MINT_CONDITION';
        break;
      case 'refurbished':
        body.condition = 'REFURBISHED';
        break;
      case 'fully_renovated':
        body.condition = 'FULLY_RENOVATED';
        break;
      case 'modernized':
        body.condition = 'MODERNIZED';
        break;
      case 'good':
        body.condition = 'WELL_KEPT';
        break;
      case 'to_renovate':
        body.condition = 'NEED_OF_RENOVATION';
        break;
    }

    // se c'è già un is24id allora parte l'update con put
    const base_url = oggetto.is24id
      ? `https://rest.immobilienscout24.de/restapi/api/offer/v1.0/user/me/realestate/${oggetto.is24id}`
      : 'https://rest.immobilienscout24.de/restapi/api/offer/v1.0/user/me/realestate';

    //Stabilisco la connessione passando l'endpoint
    const oAuth = connectToIS24(base_url, oggetto.is24id ? 'PUT' : 'POST');

    const options = {
      method: oggetto.is24id ? 'put' : 'post',
      url: base_url,
      data: body,
      headers: {
        Authorization: oAuth,
      },
    };

    ipcRenderer.send('is24:send', options);
    startEditOggetto(oggetto.id, {
      spinnerIs24: true,
    });

    ipcRenderer.on('is24:response', (event, data) => {
      console.log(data);
      startEditOggetto(oggetto.id, {
        ...oggetto,
        is24id: data['common.messages'][0].message.id,
        spinnerIs24: false,
      });
    });

    ipcRenderer.on('is24:error', (event, error) => {
      console.log(error);
      startEditOggetto(oggetto.id, {
        spinnerIs24: false,
      });
    });
  };

  const exportImagesToIS24 = () => {
    const base_url = `https://rest.immobilienscout24.de/restapi/api/offer/v1.0/user/me/realestate/${oggetto.is24id}/attachment/`;

    const options = {
      url: oggetto.downloadURLsCover[0],
      imagePath: oggetto.downloadURLsCoverId[0],
      is24id: oggetto.is24id,
      oAuth: connectToIS24(base_url, 'POST'),
      base_url,
    };

    ipcRenderer.send('is24img:upload', options);
    startEditOggetto(oggetto.id, {
      spinnerIs24: true,
    });
    ipcRenderer.on('is24img:error', (event, error) => {
      console.log(error);
      startEditOggetto(oggetto.id, {
        spinnerIs24: false,
      });
    });
    ipcRenderer.on('is24img:response', (event, data) => {
      console.log(data);
      startEditOggetto(oggetto.id, {
        spinnerIs24: false,
      });
    });
  };

  const btnColor = oggetto.is24id ? 'green' : 'blue';
  return (
    <div>
      <h5>Sync ImmobilienScout24</h5>
      {oggetto.spinnerIs24 ? (
        <div className='progress'>
          <div className='indeterminate'></div>
        </div>
      ) : (
        <div>
          <ul className='collection'>
            <CollectionItem
              label='Sync to ImmobilienScout24'
              action={exportToIS24}
              icon={oggetto.is24id ? 'update' : 'add'}
              btnColor={btnColor}
            />
            {/* Se ho l'id di is24 mostro il pulsante sync per le foto
            {oggetto.is24id && (
              <CollectionItem
              label='Fotos to ImmobilienScout24'
              action={exportImagesToIS24}
              icon={'add'}
              btnColor={btnColor}
              />
              )}
            */}
          </ul>
          <p>
            Campi obbligatori: Rif. ID, vani, prezzo di vendita, m2, indirizzo
          </p>
          <div className='divider'></div>
        </div>
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
)(withTranslation()(ImmoscoutAPI));

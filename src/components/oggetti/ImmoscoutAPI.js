import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { startEditOggetto } from '../../actions/oggetti';
import uuid from 'uuid';
import crypto from 'crypto';
import { ipcRenderer } from 'electron';

const ImmoscoutAPI = ({ oggetto, startEditOggetto }) => {
  const connectToIS24 = (base_url) => {
    const oauth_timestamp = Math.floor(Date.now() / 1000);
    const oauth_nonce = uuid.v1();
    const oauth_token = 'b895110f-2b6d-41ea-b1d4-85a63a17c200';
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
    const method = 'POST';
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
    const oAuth = `OAuth oauth_consumer_key="m2SquareImmobilienKey",oauth_nonce="${oauth_nonce}",oauth_signature="${encoded_oauth_signature}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${oauth_timestamp}",oauth_token="${oauth_token}",oauth_version="1.0"`;
    return oAuth;
  };

  const exportToIS24 = () => {
    const haftungText = `Haftungsausschluss:
      
      Die Angaben zu folgende Vertragsgelegenheit haben wir vom Eigentümer erhalten, welche wir gerne an Sie weiterleiten. Eine Haftung für die Richtigkeit dieser Angaben können wir nicht übernehmen. Die Wohnungsgröße wurde von uns ausdrücklich nicht ausgemessen. Der Grundriss stammt vom Verkäufer.
      Wir sind auch für den Verkäufer tätig.`;
    const provisionsHinweis = `Die Provision beträgt 7,14% (inkl. MwSt.) vom Kaufpreis und ist vom Käufer bei wirksamem Abschluss des Kaufvertrags zu zahlen. Der Interessent verpflichtet sich, die vereinbarte Provision zu bezahlen, wenn mit ihm oder einem mit ihm verbundenen Haus ein notariell beurkundeter Vertrag zustande kommt.`;
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
        heatingType: oggetto.heizungsart,
        thermalCharacteristic: parseFloat(oggetto.energieBedarf),
        energyConsumptionContainsWarmWater: 'NOT_APPLICABLE',
        numberOfBathRooms: parseInt(oggetto.bagni, 10),
        guestToilet: 'NOT_APPLICABLE',
        rentalIncome: parseFloat(oggetto.affittoNetto),
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
        courtage: {
          hasCourtage: 'YES',
          courtage: '7,14%',
        },
        courtageNote: provisionsHinweis,
        serviceCharge: oggetto.wohngeld,
      },
    };
    const base_url =
      'https://rest.immobilienscout24.de/restapi/api/offer/v1.0/user/me/realestate';

    //Stabilisco la connessione passando l'endpoint
    const oAuth = connectToIS24(base_url);

    const options = {
      method: 'post',
      url: base_url,
      data: body,
      headers: {
        Authorization: oAuth,
      },
    };

    ipcRenderer.send('is24:send', options);

    ipcRenderer.on('is24:response', (event, data) => {
      startEditOggetto(oggetto.id, {
        ...oggetto,
        is24id: data['common.messages'][0].message.id,
      });
    });

    ipcRenderer.on('is24:error', (event, error) => {
      console.log(error);
    });
  };

  const btnColor = oggetto.is24id ? 'disabled' : 'green';
  return (
    <div>
      <button className={`btn ${btnColor}`} onClick={exportToIS24}>
        Export to immobilienscout24
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startEditOggetto: (id, oggetto) => dispatch(startEditOggetto(id, oggetto)),
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(ImmoscoutAPI));

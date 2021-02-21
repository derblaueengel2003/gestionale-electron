import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { storeActions } from '../../store/configureStore';
import CollectionItem from '../common/collectionItem';
import { creaPayload } from './creaPayload';
import { postProperty } from './postProperty';

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

  const { payload, payloadEn, payloadIt } = creaPayload(oggetto);

  const sendRequest = async ({ language, payload }) => {
    try {
      await startEditOggetto(oggetto.id, { spinner: true });

      const result = await postProperty(
        language,
        payload,
        payload[`postId${language}`] && payload[`postId${language}`]
      );
      // passo allo store il post id che mi ritorna, l'array di immagini inviate e spinner false
      startEditOggetto(oggetto.id, { ...result, spinner: false });
    } catch (error) {
      console.log(error);
      startEditOggetto(oggetto.id, { spinner: false });
    }
  };

  const sendAllRequests = async () => {
    try {
      await sendRequest({
        language: 'De',
        payload,
        isSingle: false,
      });
      await sendRequest({
        language: 'En',
        payload: payloadEn,
        isSingle: false,
      });
      await sendRequest({
        language: 'It',
        payload: payloadIt,
        isSingle: false,
      });
    } catch (error) {
      console.log(error);
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
              action={() =>
                sendRequest({ language: 'De', payload, isSingle: true })
              }
              icon={oggetto.postIdDe ? 'update' : 'add'}
              btnColor={btnColorDe}
            />
          )}

          {oggetto.downloadURLsCover && oggetto.titolo && (
            <CollectionItem
              label={`Sync ${t('italiano')}`}
              action={() =>
                sendRequest({
                  language: 'It',
                  payload: payloadIt,
                  isSingle: true,
                })
              }
              icon={oggetto.postIdIt ? 'update' : 'add'}
              btnColor={btnColorIt}
            />
          )}
          {oggetto.downloadURLsCover && oggetto.titoloEn && (
            <CollectionItem
              label={`Sync ${t('inglese')}`}
              action={() =>
                sendRequest({
                  language: 'En',
                  payload: payloadEn,
                  isSingle: true,
                })
              }
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
                action={sendAllRequests}
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
      <div className='divider'></div>
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

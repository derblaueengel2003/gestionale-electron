import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { storeActions } from '../../store/configureStore';
import CollectionItem from '../common/collectionItem';
import { creaPayload } from './creaPayload';
import { postImages, translateImages } from './images';

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

  const postCustomFields = async (payload, postId) => {
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
    console.log('Payload Custom Fields: ', payload);
  };

  const postTranslation = (postIdDe, postId, language) => {
    if (language !== 'De') {
      axios.post(
        `${process.env.REACT_APP_WPAPI}/wp-json/wl/v1/translation/`,
        {
          original: parseInt(postIdDe, 10),
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
    }
  };

  const postProperty = async (language, payload) => {
    await startEditOggetto(oggetto.id, {
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
      console.log(`POST Sent Payload ${language}: `, payload);
      console.log(`POST Response Data ${language}: `, data);

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

      // posto i custom field di estate_property tramite il plugin che ho scritto
      await postCustomFields(payload, data.id);

      // se ci sono immagini, le posto. gli id sono un array di arrays
      const immaginiInviate = await postImages(
        data.id,
        payload.downloadURLsId,
        language,
        payload.immaginiInviate
      );
      console.log(`Immagini inviate: `, immaginiInviate);

      // passo allo store il post id che mi ritorna e l'array di immagini inviate
      await startEditOggetto(oggetto.id, {
        [`postId${language}`]: data.id,
        [`link${language}`]: newLink,
        immaginiInviate: [...immaginiInviate],
      });

      postTranslation(localStorage.getItem('postIdDe'), data.id, language);
      // localStorage.removeItem('postIdDe');

      // translate images
      payload.downloadURLsId &&
        (await translateImages(payload.downloadURLsId, language));

      return true;
    } catch (error) {
      console.log(error);
    } finally {
      await startEditOggetto(oggetto.id, {
        spinner: false,
      });
    }
  };

  const updateProperty = async (postId, payload, language) => {
    await startEditOggetto(oggetto.id, {
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
      console.log(`PUT Sent Payload ${language}: `, payload);
      console.log(`PUT Response Data ${language}: `, data);

      // posto i custom field di estate_property tramite il plugin che ho scritto
      await postCustomFields(payload, postId);

      // se ci sono immagini, le posto. gli id sono un array di arrays
      const immaginiInviate = await postImages(
        postId,
        payload.downloadURLsId,
        language,
        payload.immaginiInviate
      );
      console.log(`Immagini inviate: `, immaginiInviate);

      // passo allo store il link e l'array di immagini inviate
      await startEditOggetto(oggetto.id, {
        [`link${language}`]: data.link,
        immaginiInviate: [...immaginiInviate],
      });

      // postTranslation(localStorage.getItem('postIdDe'), data.id, language);

      // translate images
      payload.downloadURLsId &&
        (await translateImages(payload.downloadURLsId, language));

      return true;
    } catch (error) {
      console.log(error);
    } finally {
      await startEditOggetto(oggetto.id, {
        spinner: false,
      });
    }
  };

  const sendDeRequest = async () => {
    if (payload.postIdDe) {
      await updateProperty(payload.postIdDe, payload, 'De');
    } else {
      await postProperty('De', payload);
    }
  };

  const sendItRequest = async () => {
    if (payload.postIdIt) {
      await updateProperty(payload.postIdIt, payloadIt, 'It');
    } else {
      await postProperty('It', payloadIt);
    }
  };

  const sendEnRequest = async () => {
    if (payload.postIdEn) {
      await updateProperty(payload.postIdEn, payloadEn, 'En');
    } else {
      await postProperty('En', payloadEn);
    }
  };

  const sendAllRequests = async () => {
    try {
      await startEditOggetto(oggetto.id, {
        spinner: true,
      });
      await sendDeRequest();
      await sendEnRequest();
      await sendItRequest();
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
              action={sendDeRequest}
              icon={oggetto.postIdDe ? 'update' : 'add'}
              btnColor={btnColorDe}
            />
          )}

          {oggetto.downloadURLsCover && oggetto.titolo && (
            <CollectionItem
              label={`Sync ${t('italiano')}`}
              action={sendItRequest}
              icon={oggetto.postIdIt ? 'update' : 'add'}
              btnColor={btnColorIt}
            />
          )}
          {oggetto.downloadURLsCover && oggetto.titoloEn && (
            <CollectionItem
              label={`Sync ${t('inglese')}`}
              action={sendEnRequest}
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

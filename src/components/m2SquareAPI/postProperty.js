import axios from 'axios';
import { postCustomFields, postTranslation } from './functions';
import { postImages, translateImages } from './images';

export const postProperty = async (language, payload, postId) => {
  // la differenza tra un post e un put viene data dalla presenza o meno
  // dell'argomento postId. Se c'è, si tratta di un update
  try {
    const { data } = await axios({
      method: postId ? 'put' : 'post',
      url: postId
        ? `${process.env.REACT_APP_WPAPI}/wp-json/wp/v2/estate_property/${postId}`
        : `${process.env.REACT_APP_WPAPI}/wp-json/wp/v2/estate_property`,
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    console.log(
      `${postId ? 'PUT' : 'POST'} Sent Payload ${language}: `,
      payload
    );
    console.log(`${postId ? 'PUT' : 'POST'} Response Data ${language}: `, data);

    let newLink = data.link;

    // sto creando il post
    if (!postId) {
      localStorage.setItem(`postId${language}`, data.id);

      //i link che ricevo non contengono la sigla per la lingua. La devo inserire io
      if (language !== 'De') {
        const searchTerm = '/immobili';
        const indexOfFirst = data.link.indexOf(searchTerm);
        const firstPart = newLink.slice(0, indexOfFirst);
        const languagePart = language.toLowerCase();
        const secondPart = newLink.slice(indexOfFirst);
        newLink = `${firstPart}/${languagePart}${secondPart}`;
      }
    }

    // posto i custom field di estate_property tramite il plugin che ho scritto
    await postCustomFields(payload, postId || data.id);

    // se ci sono immagini, le posto. gli id sono un array di arrays
    const immaginiInviate = await postImages(
      postId || data.id,
      payload.downloadURLsId,
      language,
      payload.immaginiInviate
    );
    console.log(`Immagini inviate: `, immaginiInviate);

    !postId &&
      (await postTranslation(
        localStorage.getItem('postIdDe'),
        data.id,
        language
      ));
    // localStorage.removeItem('postIdDe');

    // translate images
    payload.downloadURLsId &&
      (await translateImages(payload.downloadURLsId, language));

    if (!postId) {
      return {
        [`postId${language}`]: data.id,
        [`link${language}`]: newLink,
        immaginiInviate: [...immaginiInviate],
      };
    } else {
      return {
        [`link${language}`]: newLink,
        immaginiInviate: [...immaginiInviate],
      };
    }
  } catch (error) {
    console.log(error);
  }
};

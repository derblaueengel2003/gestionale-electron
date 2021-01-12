import axios from 'axios';

export const postImages = async (
  postId,
  payload,
  language,
  immaginiInviate
) => {
  // se ci sono immagini non inviate, le posto. gli id sono un array di arrays
  // il check di invio si basa sull'array immaginiInviate
  let i = 0;
  if (language === 'En') {
    i = 1;
  } else if (language === 'It') {
    i = 2;
  }

  if (payload && payload[i].length > 0) {
    console.log(`Foto Payload: ${i}`, payload[i]);

    let sortPayload = [];

    // payload[i].forEach((id, indice) => {

    const sendImage = async (id) => {
      try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_WPAPI}/wp-json/wp/v2/media/${id}`,
          { post: postId },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const sendNewImages = async (payload) => {
      for (let i = 0; i < payload.length; i++) {
        sortPayload.push({
          postId: payload[i],
          menuOrder: i,
        });

        if (!immaginiInviate.includes(payload[i])) {
          await sendImage(payload[i]);
          immaginiInviate.push(payload[i]);
        }
      }
      return true;
    };

    await sendNewImages(payload[i]).then(() => {
      console.log(sortPayload);
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
    });
    // });
  }
  return immaginiInviate;
};

export const translateImages = async (downloadURLsId, language) => {
  if (language !== 'De') {
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

    await axios.post(
      `${process.env.REACT_APP_WPAPI}/wp-json/wl/v1/mediatranslation/`,
      translationArray,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }
  return true;
};

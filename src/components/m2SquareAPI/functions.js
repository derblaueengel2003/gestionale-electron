import axios from 'axios';

export const postCustomFields = async (payload, postId) => {
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

export const postTranslation = async (postIdDe, postId, language) => {
  await axios.post(
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
};

var base64Img = require('base64-img');

var url =
  'https://firebasestorage.googleapis.com/v0/b/gestionale-dummy.appspot.com/o/cover%2Faph12-Cover%7D.jpg?alt=media&token=327cafc5-d882-4376-b378-b77ce2ffaf96';
base64Img.requestBase64(url, function (err, res, body) {
  if (err) console.log('Errore', err);
  if (res) console.log('Risposta', res);
  if (body) console.log('Body', body);
});

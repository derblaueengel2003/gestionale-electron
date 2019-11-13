const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileChange = functions.storage.object().onFinalize(event => {
  const object = event.data;
  const bucket = event.bucket;
  const contentType = event.contentType;
  const filePath = event.name;
  console.log('File change detected');

  return;
});

exports.onFileDelete = functions.storage.object().onDelete(event => {
  console.log(event);
  return;
});

exports.uploadFile = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    return res.status(500).json({
      message: 'Not allowed'
    });
  }
  res.status(200).json({
    message: 'It worked!'
  });
});

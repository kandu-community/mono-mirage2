const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const os = require('os');
const path = require('path');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.onFileChange = functions.storage.object().onFinalize(object => {
    console.log('TCL: object', object);

    // const object = event.data
    const bucket = object.bucket
    const contentType = object.contentType
    const filePath = object.name
    console.log('TCL: filePath', filePath);


    if (path.basename(filePath).startsWith('renamed-')) {
        console.log('file already renamed')
        return
    }

    const destBucket = gcs.bucket(bucket);
    const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath))
    const metadata = {
        contentType: contentType
    }
    return destBucket.file(filePath).download({
        destination: tmpFilePath
    }).then(() => {
        return destBucket.upload(tmpFilePath, {
            destination: 'renamed-' + path.basename(filePath),
            metadata: metadata

        })
    });
})
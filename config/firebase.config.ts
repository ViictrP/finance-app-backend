import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(require('./firebase-private-key.json'))
});

export default admin;

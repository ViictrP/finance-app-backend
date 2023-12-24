import admin from 'firebase-admin';

if (process.env.TESTING !== 'true') {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(
        Buffer.from(
          process.env.FIREBASE_SERVICE_ACCOUNT as string,
          'base64'
        ).toString()
      )
    )
  });
}

export default admin;

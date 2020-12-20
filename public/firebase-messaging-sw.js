const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js');

// eslint-disable-next-line no-undef
firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
});

// eslint-disable-next-line no-undef,no-unused-vars
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const { notification } = payload;
  const notificationTitle = notification.title || '-';
  const notificationOptions = {
    body: notification.body || '-',
    icon: notification.image || '/icon-192x192.png',
  };
  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});

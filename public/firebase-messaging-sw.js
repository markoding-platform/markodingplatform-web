// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js');

// eslint-disable-next-line no-undef
firebase.initializeApp({
  apiKey: 'AIzaSyCLnv3L7Q6rzpcXHXjPfivFurqh9SodySI',
  authDomain: 'markoding-platform.firebaseapp.com',
  databaseURL: 'https://markoding-platform.firebaseio.com',
  projectId: 'markoding-platform',
  storageBucket: 'markoding-platform.appspot.com',
  messagingSenderId: '443874020256',
  appId: '1:443874020256:web:4cf164c3c518a36af5f2c5',
  measurementId: 'G-VB1LHJPLSX',
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

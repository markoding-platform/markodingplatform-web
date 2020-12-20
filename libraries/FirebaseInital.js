import firebase from 'firebase';
import 'firebase/messaging';
import localforage from 'localforage';
import { toast } from 'react-toastify';
import Image from 'next/image';

const FirebaseInitial = () => {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };

  if (typeof window !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(config);
    const messaging = firebase.messaging();

    const listenMessaging = () => {
      messaging.onMessage((payload) => {
        const { notification } = payload;
        toast.info(
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">{notification.title || '-'}</h5>
              <p className="mb-0">{notification.body || '-'}</p>
            </div>
            <div className="pr-2">
              <Image
                src={notification.image || '/icon-192x192.png'}
                width={45}
                height={45}
                layout="fixed"
              />
            </div>
          </div>,
          {
            position: 'top-right',
            autoClose: 7000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
    };

    const getFcmToken = () => {
      messaging
        .getToken({
          vapidKey: process.env.FIREBASE_VAPID_KEY,
        })
        .then((currentToken) => {
          localforage.setItem('FCM_TOKEN', currentToken);
          if (currentToken) {
            listenMessaging();
          }
        });
    };

    localforage
      .getItem('FCM_TOKEN')
      .then((localToken) => {
        if (localToken) {
          listenMessaging();
        } else {
          getFcmToken();
        }
      })
      .catch(() => {
        getFcmToken();
      });
  }
};

export default FirebaseInitial;

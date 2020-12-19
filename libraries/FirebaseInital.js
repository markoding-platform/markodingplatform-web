import firebase from 'firebase';
import 'firebase/messaging';
import localforage from 'localforage';
import { toast } from 'react-toastify';
import Image from 'next/image';

const FirebaseInitial = () => {
  const config = {
    apiKey: 'AIzaSyCLnv3L7Q6rzpcXHXjPfivFurqh9SodySI',
    authDomain: 'markoding-platform.firebaseapp.com',
    databaseURL: 'https://markoding-platform.firebaseio.com',
    projectId: 'markoding-platform',
    storageBucket: 'markoding-platform.appspot.com',
    messagingSenderId: '443874020256',
    appId: '1:443874020256:web:4cf164c3c518a36af5f2c5',
    measurementId: 'G-VB1LHJPLSX',
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
          vapidKey:
            'BFhkEoQEjWVj5GCX2NIGzslBtCRqyVbplBpbtxUpEuaJfnGy5dk-bIY5LeC_PYWc_iIonoHAc4bS0MZMpbCYGdg',
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

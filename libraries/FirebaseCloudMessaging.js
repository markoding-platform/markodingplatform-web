import localforage from 'localforage';
import { toast } from 'react-toastify';
import Image from 'next/image';
import firebase from './FirebaseInitial';

const FirebaseCloudMessaging = () => {
  if (typeof window !== 'undefined' && firebase.messaging.isSupported()) {
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
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
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
        } else {
          toast.warning(
            <p className="m-0 pl-3">
              Pengaturan browser Anda tidak menizinkan notifikasi.
            </p>
          );
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

export default FirebaseCloudMessaging;

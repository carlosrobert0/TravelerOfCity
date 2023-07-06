import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAWW7Dz8U6FmXWX66G-TE4DUUMkJ8_EfxM',
  authDomain: 'caparaotour-a6b0f.firebaseapp.com',
  projectId: 'caparaotour-a6b0f',
  storageBucket: 'caparaotour-a6b0f.appspot.com',
  messagingSenderId: '1007064716882',
  appId: '1:1007064716882:web:995ffef588db4bcd01318b',
  measurementId: 'G-SN9SQSX9N8',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);

// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getApps, getApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2isX8dBoaslZLJqUUgzhKkApZZIXKGbI",
  authDomain: "prajimoftmobile.firebaseapp.com",
  projectId: "prajimoftmobile",
  storageBucket: "prajimoftmobile.appspot.com",
  messagingSenderId: "1022389119329",
  appId: "1:1022389119329:web:7aa44f06bfc14706873d20"
};

// Initialize Firebase

let app;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);

export { auth };
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBTU1CrJgaEswM54synsoe3jl-jLAXHJPg',
  authDomain: 'duofit-49c09.firebaseapp.com',
  databaseURL: 'https://duofit-49c09-default-rtdb.firebaseio.com',
  projectId: 'duofit-49c09',
  storageBucket: 'duofit-49c09.appspot.com',
  messagingSenderId: '372081593955',
  appId: '1:372081593955:web:0cdab27436e19074f6f256',
  measurementId: 'G-Z8VHB73J75'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, app, db}

import { initializeApp } from 'firebase/app'
import { getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Timestamp } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: 'AIzaSyAGNYnBRn7aTYtbivpjlMFErm5oRYE1B2Q',
  authDomain: 'mymoney-7a7ec.fireb  aseapp.com',
  projectId: 'mymoney-7a7ec',
  storageBucket: 'mymoney-7a7ec.appspot.com',
  messagingSenderId: '423011437791',
  appId: '1:423011437791:web:6144271f6a2f114bfaed6a',
} 

const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service

const auth = getAuth(app); //the auth can be used to sign a user in or sign a user out


const db = getFirestore(app) //to acess the firebase app stuff


const timestamp = Timestamp;

// console.log(auth, db)
export {db, auth, createUserWithEmailAndPassword, timestamp} 

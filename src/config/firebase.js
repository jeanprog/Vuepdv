import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyD_gOY8mJg5DIJJbj8IGcmc-d7dWrluqkU',
    authDomain: 'tcc1-f6fa9.firebaseapp.com',
    projectId: 'tcc1-f6fa9',
    storageBucket: 'tcc1-f6fa9.appspot.com',
    messagingSenderId: '677312789428',
    appId: '1:677312789428:web:46f67dd811976303b450e1',
    measurementId: 'G-BR6P2QNVT7',
}

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig)

// Use these for db & auth
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { auth, db }

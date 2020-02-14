import firebase from 'firebase'
import firebaseConfig from '../config/firebase'

const app = firebase.initializeApp(firebaseConfig)

export default app

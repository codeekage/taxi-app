import * as firebase from "firebase";
import * as admin from "firebase-admin";
admin.initializeApp();

const config = {
  apiKey: "AIzaSyBpQchMp1r7iU6W18AeDQy7M8zrikBLH7o",
  authDomain: "pelagic-bonbon-233717.firebaseapp.com",
  databaseURL: "https://pelagic-bonbon-233717.firebaseio.com",
  projectId: "pelagic-bonbon-233717",
  storageBucket: "pelagic-bonbon-233717.appspot.com",
  messagingSenderId: "19874358374",
  appId: "1:19874358374:web:1a4fc2aa71d74fd6"
};


firebase.initializeApp(config);

export default class FirebaseService {
  auth = firebase.auth();
  firestore = firebase.firestore();
  firestoreGeo = firebase.firestore;
  messaging = admin.messaging();
  constructor() {
    this.auth = this.auth;
    this.firestore = this.firestore;
    this.messaging = this.messaging
    this.firestoreGeo = this.firestoreGeo
  }
}

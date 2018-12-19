import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

var config = {
    apiKey: "AIzaSyANpwh2f-3TbxiI49UG4U5-xl1OAt3FrUU",
    authDomain: "tokka-app.firebaseapp.com",
    databaseURL: "https://tokka-app.firebaseio.com",
    projectId: "tokka-app",
    storageBucket: "tokka-app.appspot.com",
    messagingSenderId: "815578441493"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
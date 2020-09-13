
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDJ03ELDE_stjoX6VQIcLTiM73XGbnNQF0",
    authDomain: "genyus-roundtables.firebaseapp.com",
    databaseURL: "https://genyus-roundtables.firebaseio.com",
    projectId: "genyus-roundtables",
    storageBucket: "genyus-roundtables.appspot.com",
    messagingSenderId: "685390968215",
    appId: "1:685390968215:web:a13f801c94b1f95bf680d2",
    measurementId: "G-YPX8T7WTC9"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;

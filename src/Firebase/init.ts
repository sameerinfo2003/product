import firebase from "firebase";

var firebaseConfig = {
   apiKey: "AIzaSyDSV_qyG-HsUwxuC7wRjqtEYxU_dpAr4lY",
   authDomain: "productsmanagement-bc427.firebaseapp.com",
   projectId: "productsmanagement-bc427",
   storageBucket: "productsmanagement-bc427.appspot.com",
   messagingSenderId: "261157745438",
   appId: "1:261157745438:web:08cc181823423b7dcf8f0f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const fb = firebase;
export const db = fb.database();
export const productsRef = db.ref("products");

import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZPbW5xkkMVUMPv_FEnf0d2MN4fYTPNQA",
  authDomain: "sleep-tracker-8de80.firebaseapp.com",
  projectId: "sleep-tracker-8de80",
  storageBucket: "sleep-tracker-8de80.appspot.com",
  messagingSenderId: "488087516368",
  appId: "1:488087516368:web:dd53c7ca4b0dd53d3b5ad5"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const auth = firebase.auth();
const database = firebase.firestore();

export { auth, database };

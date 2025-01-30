const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAkbXR014C05XWDNQ9nySplEiCSe1u3HSU",
  authDomain: "webtradingsf.firebaseapp.com",
  projectId: "webtradingsf",
  storageBucket: "webtradingsf.appspot.com",
  messagingSenderId: "657601885222",
  appId: "1:657601885222:web:387b5391b10c13e67c62e7",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = { storage };


import firebase from "firebase/app";
import "firebase/database";
// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
    apiKey: "AIzaSyCaM8xTfU7bKgUcSeXdw1oiodKkkHtWJZA",
    authDomain: "jitsi-rooms.firebaseapp.com",
    databaseURL: "https://jitsi-rooms.firebaseio.com",
    projectId: "jitsi-rooms",
    storageBucket: "jitsi-rooms.appspot.com",
    messagingSenderId: "731687844184",
    appId: "1:731687844184:web:50bb9daf94d162f5c28d2d",
    measurementId: "G-QDSXV25ESS"
};

const app = firebase.initializeApp(firebaseConfig);

export const useFirebase = () => {
    return {
        firebase: app
    };
};

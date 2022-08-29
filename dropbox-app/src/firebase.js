import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const app = firebase.initializeApp({
    apiKey: process.env.API_KEY || "AIzaSyD5j7MD5dD4kvjPPazgYI0Zy9C-ee10Mug",
    authDomain: process.env.AUTH_DOMAIN || "dropbox-clone-app-1c528.firebaseapp.com",
    projectId: process.env.PROJECT_ID || "dropbox-clone-app-1c528",
    storageBucket: process.env.STORAGE_BUCKET || "dropbox-clone-app-1c528.appspot.com",
    messagingSenderId: process.env.MESSAGING_SENDER_ID || "1080380114589",
    appId: process.env.APP_ID || "1:1080380114589:web:659ae88b3aea5c0bcb3674"
});
const firestore = app.firestore();

export const database = {
    folders: firestore.collection("folders"),
    files: firestore.collection("files"),
    formatDoc: doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    },
    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = app.storage();
export const auth = app.auth();
export default app;


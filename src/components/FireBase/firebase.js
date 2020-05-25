import app from 'firebase/app'
import 'firebase/auth'
import firebase from 'firebase'
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSENGER_ID,
//     appId: process.env.REACT_APP_APPID,
//     measurementId: process.env.REACT_APP_MEASURE_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyBxdACGbQmnzKe2R4u1S_gpEor4jaBjdfg",
    authDomain: "gamezone-846ff.firebaseapp.com",
    databaseURL: "https://gamezone-846ff.firebaseio.com",
    projectId: "gamezone-846ff",
    storageBucket: "gamezone-846ff.appspot.com",
    messagingSenderId: "1008166566871",
    appId: "1:1008166566871:web:81a164c4021a261b432992",
    measurementId: "G-JGKQYMGP3K"
};


class Firebase {
    constructor() {
        
    // Initialize Firebase
        !firebase.apps.length ? app.initializeApp(firebaseConfig) : firebase.app();
        app.analytics();
        this.auth = app.auth();
        this.db = app.database();
    }

    /** AUTH API */

    doCreateUser = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignIn = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);
        doSignInWithGoogle = async () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        await this.auth.signInWithRedirect(provider);
        return this.auth.getRedirectResult();
    }

    doSignOut = () => 
        this.auth.signOut();
    
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = newPassword => this.auth.currentUser.updatePassword(newPassword);

/** USer Apu */
    
    getCurrentUserProfile = () => this.auth.currentUser;
    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users')
}   

export default Firebase

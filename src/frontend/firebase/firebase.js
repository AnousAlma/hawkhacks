// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF5BzvXuk-nfTw2elGHEKNjmrHUGilfd4",
  authDomain: "hawkhacks-d179f.firebaseapp.com",
  projectId: "hawkhacks-d179f",
  storageBucket: "hawkhacks-d179f.appspot.com",
  messagingSenderId: "391767740395",
  appId: "1:391767740395:web:ba3938b7da170e8f0113ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const currentUser = auth.currentUser;

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);

export const get_user = async () => {
  const user = auth.currentUser
  if (user) {
    return user
  }
  return false
}

export const get_user_id = async () => {
  const user = auth.currentUser
  if (user) {
    return user.uid
  }
  return false
}


export const is_logged_in = async () => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        resolve(true);
      } else {
        // No user is signed in.
        resolve(false);
      }

      // Clean up the subscription after resolving the Promise
      unsubscribe();
    });
  });
};

export const sign_out = async () => {
  auth.signOut()
}


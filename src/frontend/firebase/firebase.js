// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7xKPO9w1Sb2-oSqAFmU5Xvf_KeufkpAw",
  authDomain: "qr-inventory-management-sys.firebaseapp.com",
  projectId: "qr-inventory-management-sys",
  storageBucket: "qr-inventory-management-sys.appspot.com",
  messagingSenderId: "980726773573",
  appId: "1:980726773573:web:7c653f9d34b5b031c1702c",
  measurementId: "G-SRC7PYWEJG"
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


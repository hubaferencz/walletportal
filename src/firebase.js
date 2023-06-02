import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCD389aSWTDIEPwXcqwlHFZJstHOm01Dvw",
  authDomain: "walletportal-475b7.firebaseapp.com",
  projectId: "walletportal-475b7",
  storageBucket: "walletportal-475b7.appspot.com",
  messagingSenderId: "408423245557",
  appId: "1:408423245557:web:951de0ad9aca07b78147bc"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};

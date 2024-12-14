import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseAuth } from "./config";
const googleProvider = new GoogleAuthProvider();

const handleErrors = (error) => {
  const errorMsg = error.message;
  const errorCode = error.code;

  return {
    ok: false,
    errorMsg,
    errorCode,
  };
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    return handleErrors(error);
  }
};

export const registerWithEmailPassword = async ({
  email,
  displayName,
  password,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    await updateProfile(FirebaseAuth.currentUser, { displayName });
    const { uid, photoURL } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
    };
  } catch (error) {
    return handleErrors(error);
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, displayName, photoURL } = resp.user;

    return {
      ok: true,
      uid,
      displayName,
      photoURL,
    };
  } catch (error) {
    return handleErrors(error);
  }
};

export const logOutFirebase = async () => {
  return await FirebaseAuth.signOut();
};

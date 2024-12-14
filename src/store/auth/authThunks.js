import {
  loginWithEmailPassword,
  logOutFirebase,
  registerWithEmailPassword,
  signInWithGoogle,
} from "../../common";
import { checkingCredentials, login, logOut } from ".";

export const checkingAuthentication = () => {
  return async (dispath) => {
    dispath(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispath) => {
    dispath(checkingCredentials());
    const result = await signInWithGoogle();

    if (!result.ok) {
      return dispath(logOut({ errorMsg: result.errorMsg }));
    }

    dispath(
      login({
        uid: result.uid,
        email: result.email,
        displayName: result.displayName,
        photoURL: result.photoURL,
      })
    );
  };
};

export const startRegisterWithEmailPassword = ({
  email,
  displayName,
  password,
}) => {
  return async (dispath) => {
    dispath(checkingCredentials());
    const { ok, photoURL, uid, errorMsg } = await registerWithEmailPassword({
      email,
      displayName,
      password,
    });

    if (!ok) {
      return dispath(logOut({ errorMsg }));
    }

    return dispath(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispath) => {
    dispath(checkingCredentials());

    const resp = await loginWithEmailPassword({ email, password });
    const { ok, uid, displayName, photoURL, errorMsg } = resp;

    if (!ok) {
      return dispath(logOut({ errorMsg }));
    }

    dispath(login({ uid, displayName, email, photoURL }));
  };
};

export const startLogout = () => {
  return async (dispath) => {
    await logOutFirebase();
    dispath(logOut());
  };
};

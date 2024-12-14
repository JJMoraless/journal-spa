import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase";

import { login, logOut } from "../../store/auth";
import { startLoadingNotes } from "../../store/journal";

export const useCheckAuth = () => {
  const { statusAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logOut());

      const { uid, displayName, email, photoURL } = user;
      dispatch(login({ uid, displayName, email, photoURL }));
      dispatch(startLoadingNotes());
    });
  }, []);

  return {
    statusAuth,
  };
};

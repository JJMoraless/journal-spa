import { createSlice } from "@reduxjs/toolkit";
import { authEnum } from "../../common/enum";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    statusAuth: authEnum.CHECKING,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMsg: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.statusAuth = authEnum.AUTHENTICATED;
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMsg = null;
    },

    logOut: (state, { payload }) => {
      state.statusAuth = authEnum.NOT_AUTHENTICATED;
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMsg = payload?.errorMsg;
    },

    checkingCredentials: (state) => {
      state.statusAuth = authEnum.CHECKING;
      state.errorMsg = null;
    },
  },
});

export const { login, checkingCredentials, logOut } = authSlice.actions;

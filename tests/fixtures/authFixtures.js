import { authEnum } from "../../src/common/enum";

export const authInitialState = {
  statusAuth: authEnum.CHECKING,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMsg: null,
};

export const authenticatedState = {
  statusAuth: authEnum.AUTHENTICATED,
  uid: "123ABC",
  email: "demo@gmail.com",
  displayName: "Demo User",
  photoURL: "https://example.com/photo.jpg",
  errorMsg: null,
};

export const notAuthenticatedState = {
  statusAuth: authEnum.NOT_AUTHENTICATED,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMsg: null,
};

export const demoUser = {
  uid: null,
  email: "demo@gmail.com",
  displayName: "Demo User",
  photoURL: "https://example.com/photo.jpg",
};

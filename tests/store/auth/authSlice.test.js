import { authEnum } from "../../../src/common/enum";
import { authSlice, login, logOut } from "../../../src/store/auth/authSlice";
import { authInitialState, demoUser } from "../../fixtures/authFixtures";

describe("Pruebas authSlice", () => {
  test("debe de tener un estado inicial", () => {
    expect(authSlice.name).toBe("auth");

    const authState = authSlice.reducer(authInitialState, {});
    expect(authState).toEqual(authInitialState);
  });

  test("debe realizar autenticacion", () => {
    const state = authSlice.reducer(authInitialState, login(demoUser));

    expect(state).toEqual({
      statusAuth: authEnum.AUTHENTICATED,
      uid: null,
      email: "demo@gmail.com",
      displayName: "Demo User",
      photoURL: "https://example.com/photo.jpg",
      errorMsg: null,
    });
  });

  test("debe realizar el logout y lanzar error", () => {
    const errorMsg = "Error de autenticación";
    const stateLogout = authSlice.reducer( authInitialState,logOut({ errorMsg }));

    expect(stateLogout).toEqual({
      statusAuth: authEnum.NOT_AUTHENTICATED,
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMsg,
    });
  });
});

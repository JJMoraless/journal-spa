import { signInWithGoogle } from "../../../src/common/firebase/providers";
import {
  checkingAuthentication,
  checkingCredentials,
  startGoogleSignIn,
} from "../../../src/store/auth";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/common/firebase/providers");
const dispath = jest.fn();

describe("pruebaas auth thunks", () => {
  test("debe invocar checkingCredentials()", async () => {
    await checkingAuthentication()(dispath);
    expect(dispath).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSignIn debe llamar checking credentials", async () => {
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispath);
  });
});

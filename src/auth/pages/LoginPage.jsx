import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import {
  Grid2,
  TextField,
  Typography,
  Button,
  Link,
  Alert,
} from "@mui/material";
import Google from "@mui/icons-material/Google";

import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth";
import { AuthLayout } from "../layout/AuthLayout";
import { authEnum, useForm } from "../../common";

const loginFormData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { statusAuth, errorMsg } = useSelector((state) => state.auth);

  const isAuthenticating = useMemo(
    () => statusAuth === authEnum.CHECKING,
    [statusAuth]
  );

  const { formState, onInputChange } = useForm(loginFormData);
  const { email, password } = formState;

  /**
   * @param { React.ChangeEvent<HTMLInputElement> } event
   */
  const onLoginWithEmail = ($event) => {
    $event.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  /**
   * @param { React.ChangeEvent<HTMLInputElement> } event
   */
  const onGoogleSignIn = (event) => {
    event.preventDefault();
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title={"Login"}>
      <form action="" onSubmit={onLoginWithEmail}>
        <Grid2 container spacing={1}>
          {/* ! inputs */}
          <Grid2 size={{ xs: 12 }}>
            <TextField
              label="Correo electronico"
              type="email"
              fullWidth
              placeholder="correo@Gmail.com"
              name="email"
              value={email}
              onChange={onInputChange}
              required
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              required
            />
          </Grid2>

          {/* ! buttuns  */}
          <Grid2 container spacing={2} size={{ xs: 12 }}>
            <Grid2
              size={{ xs: 12, sm: 12 }}
              sx={{
                display: errorMsg ? "block" : "none",
              }}
            >
              <Alert severity="error">{errorMsg}</Alert>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
              >
                <Google />
                <Typography sx={{ ml: 1 }}> Google </Typography>
              </Button>
            </Grid2>
          </Grid2>

          {/* ! link */}
          <Grid2
            container
            size={{ xs: 12 }}
            direction="row"
            justifyContent="flex-end"
          >
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crea una cuenta
            </Link>
          </Grid2>
        </Grid2>
      </form>
    </AuthLayout>
  );
};

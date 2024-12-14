import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

import { Alert, Button, Grid2, Link, TextField } from "@mui/material";

import { AuthLayout } from "../layout/AuthLayout";
import { authEnum, useForm } from "../../common";
import { startRegisterWithEmailPassword } from "../../store/auth";

const formAuthRegister = {
  displayName: "",
  email: "",
  password: "",
};

const formAuthRegisterValidator = {
  email: [
    (value) => value.includes("@"),
    "el correo debe tener una arroba para ser valido",
  ],
  password: [
    (value) => value.length >= 6,
    "la contraseña debe tener al menos 6 caracteres",
  ],
  displayName: [
    (value) => value.length >= 1,
    "el nombre debe tener al menos 3 caracteres",
  ],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { statusAuth, errorMsg } = useSelector((state) => state.auth);

  const isCheckingAuthentication = useMemo(
    () => statusAuth === authEnum.CHECKING,
    [statusAuth]
  );

  const { formState, onInputChange, formValidations, isFormValid } = useForm(
    formAuthRegister,
    formAuthRegisterValidator
  );
  const { displayName, email, password } = formState;
  const { displayNameValid, emailValid, passwordValid } = formValidations;

  const onAuthRegister = ($event) => {
    $event.preventDefault();
    setIsFormSubmitted(true);
    if (!isFormValid) return;

    dispatch(startRegisterWithEmailPassword({ email, displayName, password }));
  };

  return (
    <AuthLayout title={"Registrar"}>
      <form action="" onSubmit={onAuthRegister}>
        <Grid2 container spacing={1}>
          {/* ! inputs */}
          <Grid2 size={{ xs: 12 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="jhon Doe"
              fullWidth
              value={displayName}
              name="displayName"
              onChange={onInputChange}
              error={!!displayNameValid && isFormSubmitted}
              helperText={displayNameValid}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <TextField
              label="Correo"
              placeholder="jhon Doe"
              fullWidth
              value={email}
              name="email"
              onChange={onInputChange}
              error={!!emailValid && isFormSubmitted}
              helperText={emailValid}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <TextField
              label="Contranseña"
              type="password"
              placeholder="Contranseña"
              fullWidth
              value={password}
              name="password"
              onChange={onInputChange}
              error={!!passwordValid && isFormSubmitted}
              helperText={passwordValid}
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

            <Grid2 size={{ xs: 12, sm: 12 }}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isCheckingAuthentication}
              >
                Crear cuenta
              </Button>
            </Grid2>
          </Grid2>

          {/* ! links */}
          <Grid2
            container
            size={{ xs: 12 }}
            direction="row"
            justifyContent="flex-end"
          >
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ya tiene una cuenta ?
            </Link>
          </Grid2>
        </Grid2>
      </form>
    </AuthLayout>
  );
};

import React from "react";
import { AuthLayout } from "../layout/AuthLayout";
import { Button, Grid2, Link, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <AuthLayout title={"Registrar"}>
      <form action="">
        <Grid2 container spacing={1}>
          {/* ! inputs */}
          <Grid2 size={{ xs: 12 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="jhon Doe"
              fullWidth
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="jhon Doe"
              fullWidth
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <TextField
              label="Contranseña"
              type="password"
              placeholder="Contranseña"
              fullWidth
            />
          </Grid2>

          {/* ! buttuns  */}
          <Grid2 container spacing={2} size={{ xs: 12 }}>
            <Grid2 size={{ xs: 12, sm: 12 }}>
              <Button variant="contained" fullWidth>
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

            <Link component={RouterLink} color="inherit" to="/auth/login" >
              Ya tiene una cuenta ?
            </Link>

          </Grid2>
        </Grid2>
      </form>
    </AuthLayout>
  );
};


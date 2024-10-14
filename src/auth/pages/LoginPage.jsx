import Google from "@mui/icons-material/Google";
import { Link as RouterLink } from "react-router-dom";
import { Grid2, TextField, Typography, Button, Link } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout title={"Login"}>
      <form action="">
        <Grid2 container spacing={1}>
          {/* ! inputs */}
          <Grid2 size={{ xs: 12 }}>
            <TextField
              label="Correo electronico"
              type="email"
              placeholder="correo@Gmail.com"
              fullWidth
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
            />
          </Grid2>

          {/* ! buttuns  */}
          <Grid2 container spacing={2} size={{ xs: 12 }}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Button variant="contained" fullWidth>
                Login
              </Button>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Button variant="contained" fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}> Google </Typography>
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
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crea una cuenta
            </Link>
          </Grid2>
        </Grid2>
      </form>
    </AuthLayout>
  );
};

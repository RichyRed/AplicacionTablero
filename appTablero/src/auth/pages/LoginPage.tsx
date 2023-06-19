import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Grid, TextField, Button, Typography, Link } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useDispatch } from "../../context/ContextProvider";
import { types } from "../../context/storeReducer";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = () => {
    if (email && password) {
      dispatch({ type: types.login });
      navigate("/");
    } else {
      if (!email) {
        setEmailError(true);
      }
      if (!password) {
        setPasswordError(true);
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false); // Reset email error
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false); // Reset password error
  };

  return (
    <AuthLayout title="Ingresa a TaskIsi">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@gmail.com"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError && "Este campo es requerido"}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Contraseña"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={passwordError && "Este campo es requerido"}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button variant="contained" fullWidth onClick={login}>
                Login
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

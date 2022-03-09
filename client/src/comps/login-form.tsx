import { useState } from "react";
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";

import { LoadingButton } from "@mui/lab";

const LoginForm = () => {
  //const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleShowPassword}
                    edge="end"
                  ></IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel control={<Checkbox />} label="Remember me" />

          <Link variant="subtitle2">Forgot password?</Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={false}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
};
export default LoginForm;

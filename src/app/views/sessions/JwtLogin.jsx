import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Checkbox,
  Grid,
  styled,
  TextField,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";

import { Paragraph } from "app/components/Typography";
import AuthContext from "app/contexts/JWTAuthContext";
import { useDispatch } from "react-redux";
import { setToast } from "../../../redux/feature";

// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
  display: "flex",
}));

const ContentBox = styled("div")(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },

  ".img-wrapper": {
    height: "100%",
    minWidth: 320,
    display: "flex",
    padding: "2rem",
    alignItems: "center",
    justifyContent: "center",
  },
}));

// initial login credentials
const initialValues = {
  email: "jason@ui-lib.com",
  password: "dummyPass",
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});

export default function JwtLogin() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { login } = useContext(AuthContext); // Use login from AuthContext
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      // Thực hiện đăng nhập bằng hàm login từ AuthContext
      await login(values.email, values.password, setLoading);
      // Chuyển hướng sau khi đăng nhập thành công
    } catch (error) {
      dispatch(
        setToast({
          severity: "error",
          summary: "Thất bại!",
          detail: error.response?.data?.message || "Login Failed!",
          life: 3000,
        })
      );
      setLoading(false);
    }
  };

  return (
    <StyledRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <div className="img-wrapper">
              <img
                src="/assets/images/illustrations/dreamer.svg"
                width="100%"
                alt=""
              />
            </div>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <FlexBox justifyContent="space-between">
                      <FlexBox gap={1}>
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0 }}
                        />

                        <Paragraph>Remember Me</Paragraph>
                      </FlexBox>

                      <NavLink
                        to="/forgot-password"
                        style={{ color: theme.palette.primary.main }}
                      >
                        Forgot password?
                      </NavLink>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Login
                    </LoadingButton>

                    <Paragraph>
                      Don't have an account?
                      <NavLink
                        to="/signup"
                        style={{
                          color: theme.palette.primary.main,
                          marginLeft: 5,
                        }}
                      >
                        Register
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </StyledRoot>
  );
}

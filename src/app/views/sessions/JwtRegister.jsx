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
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { post } from "api/api";
import { Paragraph } from "app/components/Typography";
import { useDispatch } from "react-redux";
import { setToast } from "../../../redux/feature";

// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: "center",
}));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

// initial login credentials
const initialValues = {
  email: "",
  password: "",
  username: "",
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

export default function JwtRegister() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFormSubmit = async (values) => {
    setLoading(true);

    try {
      const result = await post("/users/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      if (result.status) {
        dispatch(
          setToast({
            severity: "success",
            summary: "Thành công!",
            detail: result.message,
            life: 3000,
          })
        );
        setLoading(false);
        navigate("/signin");
      } else {
        dispatch(
          setToast({
            severity: "error",
            summary: "Thành công!",
            detail: result.message,
            life: 3000,
          })
        );
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="100%"
                alt="Register"
                src="/assets/images/illustrations/posting_photo.svg"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
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
                      type="text"
                      name="username"
                      label="Username"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.username}
                      onChange={handleChange}
                      helperText={touched.username && errors.username}
                      error={Boolean(errors.username && touched.username)}
                      sx={{ mb: 3 }}
                    />

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
                      sx={{ mb: 2 }}
                    />

                    <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph fontSize={13}>
                        I have read and agree to the terms of service.
                      </Paragraph>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Register
                    </LoadingButton>

                    <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/session/signin"
                        style={{
                          color: theme.palette.primary.main,
                          marginLeft: 5,
                        }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
}

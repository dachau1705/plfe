import { Button, Card, Grid, styled, TextField } from "@mui/material";
import { post } from "api/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listToast } from "../../../constants";
import { setToast } from "../../../redux/feature";

// STYLED COMPONENTS
const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100vh !important",

  "& .card": {
    maxWidth: 800,
    margin: "1rem",
    borderRadius: 12,
  },

  ".img-wrapper": {
    display: "flex",
    padding: "2rem",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ContentBox = styled("div")(({ theme }) => ({
  padding: 32,
  background: theme.palette.background.default,
}));

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@example.com");
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await post("/users/forgot_password", {
        email: email,
      }); // Thay thế '/submit-form' bằng endpoint API của bạn
      if (result.status) {
        dispatch(
          setToast({
            ...listToast[0],
            detail: `New Password : 123456`,
          })
        );
      } else {
        dispatch(
          setToast({
            ...listToast[1],
            detail: `${result.message}`,
          })
        );
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      dispatch(
        setToast({
          ...listToast[1],
          detail: `An error Occured!`,
        })
      );
    }
  };

  return (
    <StyledRoot>
      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <div className="img-wrapper">
              <img
                width="300"
                src="/assets/images/illustrations/dreamer.svg"
                alt=""
              />
            </div>

            <ContentBox>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  type="email"
                  name="email"
                  size="small"
                  label="Email"
                  value={email}
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 3, width: "100%" }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Reset Password
                </Button>

                <Button
                  fullWidth
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate("/signin")}
                  sx={{ mt: 2 }}
                >
                  Go Back
                </Button>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </StyledRoot>
  );
}

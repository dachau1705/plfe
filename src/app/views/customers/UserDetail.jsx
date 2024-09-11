import { Autocomplete, Button, Chip, Icon, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { post } from "api/api";
import { useUserDetail } from "app/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setToast } from "../../../redux/feature";
export const StyledButton = styled(Button)(({ theme }) => ({
  size: "small",
}));

const Item = (props) => {
  const { sx, ...other } = props;
  return (
    <Box>
      <Box
        sx={[
          (theme) => ({
            bgcolor: "#fff",
            color: "grey.800",
            border: "1px solid",
            borderColor: "grey.300",
            p: 1,
            m: 1,
            borderRadius: 2,
            fontWeight: "light",
            width: "auto", // Auto width based on content
            height: "auto", // Auto height based on content
            // Remove the minHeight or adjust to fit specific needs
            ...theme.applyStyles("dark", {
              bgcolor: "#101010",
              color: "grey.300",
              borderColor: "grey.800",
            }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      />
    </Box>
  );
};

const Item2 = (props) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (theme) => ({
          color: "grey.800",
          px: 1,
          py: 1.5,
          my: "auto",
          fontWeight: "light",
          borderRadius: 2,
          ...theme.applyStyles("dark", {
            bgcolor: "#101010",
            color: "grey.300",
            borderColor: "grey.800",
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
};
const Item3 = (props) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (theme) => ({
          color: "grey.800",
          px: 1,
          py: 1,
          my: "auto",
          fontWeight: "light",
          borderRadius: 2,
          ...theme.applyStyles("dark", {
            bgcolor: "#101010",
            color: "grey.300",
            borderColor: "grey.800",
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
};

const Item4 = (props) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (theme) => ({
          color: "grey.800",
          px: 1,
          py: 1,
          my: "auto",
          fontWeight: "light",
          borderRadius: 2,
          ...theme.applyStyles("dark", {
            bgcolor: "#101010",
            color: "grey.300",
            borderColor: "grey.800",
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
};

const suggestions = [
  "Resend Last Invoice",
  "Send Password Reset Email",
  "Send Verification Email",
];

const UserDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _id = Cookies.get("user_id");
  const detail = useUserDetail(_id);
  const [user, setUser] = useState({});
  const [userInfor, setUserInfor] = useState({});
  const [address, setAddress] = useState({});
  const [optionSend, setOptionSend] = useState("Resend Last Invoice");

  useEffect(() => {
    if (detail.user) {
      setUser(detail.user);
    }
    if (detail.userInfo) {
      setUserInfor(detail.userInfo);
      if (detail.userInfo.address) {
        setAddress(detail.userInfo.address);
      }
    }
  }, [detail]);

  const handleSendEmail = async () => {
    try {
      let type;
      if (optionSend === "Resend Last Invoice") {
        type = 1;
      } else if (optionSend === "Send Password Reset Email") {
        type = 2;
      } else if (optionSend === "Send Verification Email") {
        type = 3;
      }
      const response = await post("/users/sendMail", {
        _id: user._id,
        type,
      });
      console.log(response);

      if (response.status) {
        dispatch(
          setToast({
            severity: "success",
            summary: "Successfully!",
            detail: response.message || "Successfully!",
            life: 3000,
          })
        );
        // Optionally navigate to another page or show success message
      } else {
        dispatch(
          setToast({
            severity: "error",
            summary: "Failed!",
            detail: response.message || "Failed!",
            life: 3000,
          })
        );
      }
    } catch (error) {
      dispatch(
        setToast({
          severity: "error",
          summary: "Thất bại!",
          detail: error.response?.data?.message || "Login Failed!",
          life: 3000,
        })
      );
    }
  };

  return (
    <div>
      <div style={{ width: "100%", height: "100%" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoFlow: "row",
            height: "100%",
          }}
        >
          <Item>
            <Box
              style={{ width: "100%" }}
              sx={{
                justifyContent: "center",
                display: "flex",
                pt: 2,
                pb: 1,
              }}
            >
              {/* <Stack direction="row" spacing={2}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
              <Avatar
                alt="Travis Howard"
                src={userInfor.avatar}
                sx={{ width: 75, height: 75 }}
              />
              {/* <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </Stack> */}
            </Box>
            <Box
              style={{ width: "100%" }}
              sx={{
                textAlign: "center",
                borderBottom: "1px solid",
                borderColor: "grey.300",
                pb: 1,
              }}
            >
              <Box sx={{ fontSize: "h6.fontSize", fontWeight: "medium" }}>
                {userInfor.firstName + " " + userInfor.lastName}
              </Box>
              <Box sx={{ fontSize: "h7.fontSize" }}>{userInfor.desc}</Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>Email</Item2>
              <Item2>
                <Box>{user.email}</Box>
                <Box>
                  {Boolean(user.isVerified) === true ? (
                    <Chip label="Email Verified" color="success" />
                  ) : (
                    <Chip label="Email Not Verified" color="warning" />
                  )}
                </Box>
              </Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>Phone</Item2>
              <Item2>{userInfor.phoneNumber}</Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>Country</Item2>
              <Item2>{address.country || "Việt Nam"}</Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>State/Region</Item2>
              <Item2>{address.state}</Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>Address</Item2>
              <Item2>
                {address.street +
                  ", " +
                  address.state +
                  ", " +
                  address.city +
                  ", " +
                  (address.country || "Việt Nam")}
              </Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <Item2>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    cursor: "pointer",
                  }}
                  onClick={(e) => console.log(e)}
                >
                  <Icon sx={{ my: "auto" }} fontSize="small">
                    lock_open
                  </Icon>
                  <Box sx={{ mx: 1 }}>Reset and send password</Box>
                </Box>
              </Item2>
              <Item2>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    Cookies.remove("token");
                    localStorage.removeItem("token");
                    navigate("/signin");
                    console.log(e);
                  }}
                >
                  <Icon sx={{ my: "auto" }} fontSize="small">
                    person
                  </Icon>
                  <Box sx={{ mx: 1 }}>Login as Customer</Box>
                </Box>
              </Item2>
            </Box>
          </Item>
          <Item>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Box sx={{ ml: 2 }}>
                <h3>Billing</h3>
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>Credit Card</Item2>
              <Item2> **** **** **** **** 4242</Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>Paid</Item2>
              <Item2> 5 ($500.00)</Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>Draft</Item2>
              <Item2> 2 ($150.00)</Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>Unpaid/Due</Item2>
              <Item2> 1 ($355.00)</Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>Refunded</Item2>
              <Item2> 0 ($0.00)</Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>Gross Income</Item2>
              <Item2> $2,100.00</Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <Item2>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    cursor: "pointer",
                  }}
                  onClick={(e) => console.log(e)}
                >
                  <Icon sx={{ my: "auto" }} fontSize="small">
                    attach_money
                  </Icon>
                  <Box sx={{ mx: 1 }}>Create Invoice</Box>
                </Box>
              </Item2>
              <Item2>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    Cookies.remove("token");
                    localStorage.removeItem("token");
                    navigate("/signin");
                    console.log(e);
                  }}
                >
                  <Icon sx={{ my: "auto" }} fontSize="small">
                    receipt
                  </Icon>
                  <Box sx={{ mx: 1 }}>Resend Due Invoices</Box>
                </Box>
              </Item2>
            </Box>
          </Item>
          <Item>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Box sx={{ ml: 2 }}>
                <h3>Send Email</h3>
              </Box>
            </Box>
            <Box sx={{ borderBottom: "1px solid", borderColor: "grey.300" }}>
              <Box
                sx={{
                  my: 1,
                  px: 1,
                }}
              >
                <Autocomplete
                  defaultValue={suggestions[0]}
                  size="small"
                  value={optionSend}
                  onChange={(event, newValue) => {
                    setOptionSend(newValue ? newValue : "");
                  }}
                  options={suggestions}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" fullWidth />
                  )}
                />
              </Box>
              <Box>
                <StyledButton
                  onClick={handleSendEmail}
                  variant="contained"
                  color="primary"
                  sx={{
                    color: "white",
                    m: 1,
                    px: 1,
                  }}
                >
                  <Icon sx={{ my: "auto" }} fontSize="small">
                    mail_outline
                  </Icon>
                  <Box sx={{ mx: 1 }}>Send Email</Box>
                </StyledButton>
              </Box>
            </Box>

            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>27/10/2020 | 12:23</Item2>
              <Item2> Order Received</Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>11/05/2020 | 01:19</Item2>
              <Item2> Order Confirmation</Item2>
            </Box>
          </Item>
          <Item>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Box sx={{ ml: 2 }}>
                <h3>Other Actions</h3>
              </Box>
            </Box>
            <Item4>
              <StyledButton
                sx={{
                  color: "black",
                }}
              >
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    cursor: "pointer",
                  }}
                  onClick={(e) => console.log(e)}
                >
                  <Icon sx={{ my: "auto" }} fontSize="small">
                    do_not_disturb
                  </Icon>
                  <Box sx={{ mx: 1, fontSize: 13 }}>Close Account</Box>
                </Box>
              </StyledButton>
            </Item4>
            <Item4>
              <StyledButton
                sx={{
                  color: "black",
                }}
              >
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    Cookies.remove("token");
                    localStorage.removeItem("token");
                    navigate("/signin");
                    console.log(e);
                  }}
                >
                  <Icon sx={{ my: "auto" }} fontSize="small">
                    file_download
                  </Icon>
                  <Box sx={{ mx: 1, fontSize: 13 }}>Export Data</Box>
                </Box>
              </StyledButton>
            </Item4>
            <Item4>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  Cookies.remove("token");
                  localStorage.removeItem("token");
                  navigate("/signin");
                  console.log(e);
                }}
              >
                <Icon sx={{ my: "auto", color: "orange" }} fontSize="small">
                  info
                </Icon>
                <Box sx={{ mx: 1, fontSize: 13 }}>
                  Once you delete account, data will be lost forever.
                </Box>
              </Box>
            </Item4>
            <Item4>
              <Box>
                <StyledButton
                  onClick={handleSendEmail}
                  variant="contained"
                  color="primary"
                  sx={{
                    color: "white",
                    m: 1,
                    px: 1,
                  }}
                >
                  <Icon sx={{ my: "auto" }} fontSize="small">
                    delete
                  </Icon>
                  <Box sx={{ mx: 1 }}>Delete Account</Box>
                </StyledButton>
              </Box>
            </Item4>
          </Item>
        </Box>
      </div>
    </div>
  );
};
export default UserDetail;

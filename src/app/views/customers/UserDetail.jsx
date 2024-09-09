import { Autocomplete, Chip, Icon, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { useUserDetail } from "app/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Item = (props) => {
  const { sx, ...other } = props;
  return (
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

const suggestions = [
  { label: "Resend Last Invoice" },
  { label: "Send Password Reset Email" },
  { label: "Send Verification Email" },
];

const UserDetail = () => {
  const navigate = useNavigate();
  const _id = Cookies.get("user_id");
  const detail = useUserDetail(_id);
  const [user, setUser] = useState({});
  const [userInfor, setUserInfor] = useState({});
  const [address, setAddress] = useState({});
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
  return (
    <div>
      <div style={{ width: "100%" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
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
                  <Icon sx={{ my: "auto" }} fontSize="medium">
                    lock_open
                  </Icon>
                  <Box>Reset and send password</Box>
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
                  <Icon sx={{ my: "auto" }} fontSize="medium">
                    person
                  </Icon>
                  <Box>Login as Customer</Box>
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
                  <Icon sx={{ my: "auto" }} fontSize="medium">
                    attach_money
                  </Icon>
                  <Box>Create Invoice</Box>
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
                  <Icon sx={{ my: "auto" }} fontSize="medium">
                    receipt
                  </Icon>
                  <Box>Resend Due Invoices</Box>
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
                  defaultValue={suggestions[0].label}
                  size="small"
                  options={suggestions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" fullWidth />
                  )}
                />
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  display: "inline-flex", // inline-flex allows the box to adjust its width based on content
                  cursor: "pointer",
                  bgcolor: "#1976d2",
                  color: "white",
                  m: 1,
                  px: 1,
                  border: 1,
                  fontWeight: "medium",
                  borderRadius: "5px",
                  height: "auto", // remove fixed height
                  minHeight: "2.5rem", // keep a minimum height if needed,
                  fontSize: "h7.fontSize",
                }}
                // onClick={(e) => {
                //   Cookies.remove("token");
                //   localStorage.removeItem("token");
                //   navigate("/signin");
                //   console.log(e);
                // }}
              >
                <Icon sx={{ my: "auto" }} fontSize="medium">
                  mail_outline
                </Icon>
                <Box sx={{ mx: 1 }}>Send Email</Box>
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
        </Box>
      </div>
    </div>
  );
};
export default UserDetail;

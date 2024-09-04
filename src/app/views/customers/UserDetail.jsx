import { Icon } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { useUserDetail } from "app/api";
import Cookies from "js-cookie";
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
          py: 2,
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

const UserDetail = () => {
  const navigate = useNavigate();
  const _id = Cookies.get("user_id");
  const detail = useUserDetail(_id);
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
                src="https://lh3.googleusercontent.com/a/ACg8ocIFMlN728WD1305qBK8PxaNNbHGpRFSARz5iWQAQ8UibeiR0VE2=s288-c-no"
                sx={{ width: 75, height: 75 }}
              />
              {/* <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </Stack> */}
            </Box>
            <Box
              style={{ width: "100%" }}
              sx={{
                textAlign: "center",
                borderBottom: "2px solid",
                borderColor: "grey.300",
                pb: 1,
              }}
            >
              <Box sx={{ fontSize: "h6.fontSize" }}>Ben Peterson</Box>
              <Box sx={{ fontSize: "h7.fontSize" }}>CEO, Brack Ltd.</Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "2px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>Email</Item2>
              <Item2>
                <Box>{detail.email}</Box>
                <Box>Email Verified</Box>
              </Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "2px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>Phone</Item2>
              <Item2>+84 986 143 252</Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "2px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>Country</Item2>
              <Item2>USA</Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "2px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>State/Region</Item2>
              <Item2>New York</Item2>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "2px solid",
                borderColor: "grey.300",
              }}
            >
              <Item2>Address</Item2>
              <Item2>Street Tailwood, No. 17</Item2>
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
          <Item>2</Item>
          <Item>3</Item>
        </Box>
      </div>
    </div>
  );
};
export default UserDetail;

import { Box, Button, Menu, MenuItem } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Box>
      <Button
        variant="outlined"
        aria-haspopup="true"
        onClick={handleClick}
        aria-owns={anchorEl ? "simple-menu" : undefined}
      >
        Open Menu
      </Button>

      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>

        <MenuItem
          onClick={(e) => {
            Cookies.remove('token');
            localStorage.removeItem("token");
            navigate("/signin");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

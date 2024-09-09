import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserDetail from "./UserDetail";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const ViewUser = () => {
  const [value, setValue] = useState(0);
  const { id } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div sx={{ mx: 10 }}>
      <Box sx={{ my: 2, mx: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ lineHeight: 4 }}>
          <Link underline="hover" to="/">
            HOME
          </Link>
          <Link underline="hover" to="/product/default">
            USER
          </Link>
          <Typography color="text.primary">PROFILE</Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ my: 2, mx: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Details" {...a11yProps(0)} />
            <Tab label="Invoices" {...a11yProps(1)} />
            <Tab label="Log" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <UserDetail />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default ViewUser;

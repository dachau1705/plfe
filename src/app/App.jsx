/* eslint-disable react-hooks/exhaustive-deps */
import CssBaseline from "@mui/material/CssBaseline";
import { useRoutes } from "react-router-dom";

import { MatxTheme } from "./components";
// ALL CONTEXTS
import { AuthProvider } from "./contexts/JWTAuthContext";
import SettingsProvider from "./contexts/SettingsContext";
// ROUTES
import routes from "./routes";
// FAKE SERVER
import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../fake-db";
import { hideToast } from "../redux/feature";

export default function App() {
  const content = useRoutes(routes);
  const dispatch = useDispatch();
  const toastOptions = useSelector((state) => state.toast);
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState({});
  const handleClose = () => {
    setVisible(false);
  };
  // const user = useSelector((state) => state.userInfo);
  // console.log(user);
  useEffect(() => {
    if (toastOptions.severity) {
      setVisible(true);
      setToast(toastOptions);
      dispatch(hideToast());
    }
  }, [toastOptions]);
  return (
    <SettingsProvider>
      <AuthProvider>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={visible}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={toast.severity}
            sx={{ width: "100%" }}
          >
            {toast.detail}
          </Alert>
        </Snackbar>
        <MatxTheme>
          <CssBaseline />
          {content}
        </MatxTheme>
      </AuthProvider>
    </SettingsProvider>
  );
}

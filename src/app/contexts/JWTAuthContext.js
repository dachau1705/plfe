import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
// CUSTOM COMPONENT
import { post } from "api/api";
import { MatxLoading } from "app/components";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToast, setUserInfo } from "../../redux/feature";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialized: true, user };
    }

    case "LOGIN": {
      return { ...state, isAuthenticated: true, user: action.payload.user };
    }

    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }

    case "REGISTER": {
      const { user } = action.payload;

      return { ...state, isAuthenticated: true, user };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => { },
  logout: () => { },
  register: () => { }
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const login = async (email, password, setLoading) => {
    const result = await post("/users/login", {
      username: email,
      password: password,
    });
    if (result.status) {
      const user = {
        username: email,
        password: password,
      }
      const { user_id, token, detail } = result;
      localStorage.setItem("token", token);
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("user_id", user_id, { expires: 1 });
      reduxDispatch(setUserInfo(detail))
      reduxDispatch(
        setToast({
          severity: "success",
          summary: "Thành công!",
          detail: "Login Successfully!",
          life: 3000,
        })
      );
      setLoading(false)
      navigate("/");
    } else {
      reduxDispatch(
        setToast({
          severity: "error",
          summary: "Thành công!",
          detail: result.message,
          life: 3000,
        })
      );
      setLoading(false)
    }
    // dispatch({ type: "LOGIN", payload: { user } });
  };

  const register = async (email, username, password) => {
    const response = await axios.post("/api/auth/register", { email, username, password });
    const { user } = response.data;

    dispatch({ type: "REGISTER", payload: { user } });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/auth/profile");
        dispatch({ type: "INIT", payload: { isAuthenticated: true, user: data.user } });
      } catch (err) {
        console.error(err);
        dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
      }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialized) return <MatxLoading />;

  return (
    <AuthContext.Provider value={{ ...state, method: "JWT", login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

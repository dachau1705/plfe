import { Navigate } from "react-router-dom";

// AuthGuard component to protect routes
const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("token"); // Kiểm tra token trong localStorage

  if (!token) {
    // Nếu không có token, chuyển hướng đến trang đăng nhập
    return <Navigate to="/signin" />;
  }

  // Nếu có token, render các component con
  return <>{children}</>;
};

export default AuthGuard;

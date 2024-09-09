import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const _id = Cookies.get("user_id");
  const [dataReturn, setDataReturn] = useState({});
  // Lấy giá trị của tham số 'token'

  const token = urlParams.get("token");
  useEffect(() => {
    if (token) {
      // Gọi API với giá trị token
      fetch("http://localhost:4000/users/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, _id: _id }), // Gửi token trong body của request
      })
        .then((response) => response.json())
        .then((data) => {
          setDataReturn(data);
          // Xử lý dữ liệu phản hồi từ API
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("Token không tồn tại trong URL");
    }
  }, [token, _id]);

  return <div>{dataReturn.message}</div>;
};

export default VerifyEmail;

import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { post } from "api/api";
import { useState } from "react";
import { FormUpdate } from "./FormUpdate";

const UserProfileForm = ({ userId }) => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        isAdmin: false,
    });

    const handleData = (event) => {
        const formData = new FormData(event.target);
        const data = {
            username: formData.get("username"),
            email: formData.get("email"),
            isAdmin: formData.get("isAdmin") === "on",
        };
        return data;
    };

    const actions = {
        add: async (data) => post("/users", data),
        // update: async (data) => axiosInstance.put(`/users/${userId}`, data),
    };

    const handleAfterCallApi = () => {
        console.log("API call completed.");
    };

    return (
        <FormUpdate
            checkId={userId}
            title="User Profile"
            handleData={handleData}
            actions={actions}
            route="/user"
            setParams={() => { }}
            handleAfterCallApi={handleAfterCallApi}
            buttonLabel="Save"
        >
            <TextField
                name="username"
                label="Username"
                defaultValue={userData.username}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                name="email"
                label="Email"
                type="email"
                defaultValue={userData.email}
                required
                fullWidth
                margin="normal"
            />
            <FormControlLabel
                control={<Checkbox name="isAdmin" defaultChecked={userData.isAdmin} />}
                label="Is Admin"
            />
        </FormUpdate>
    );
};

export default UserProfileForm;

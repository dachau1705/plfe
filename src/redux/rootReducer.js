import { combineReducers } from 'redux';
import cartSlice from "./feature/cart";
import toastSlice from "./feature/toast";
import userSlice from "./feature/userInfo";

const rootReducer = combineReducers({
    toast: toastSlice,
    userInfo: userSlice ,
    cart: cartSlice,
});

export default rootReducer;

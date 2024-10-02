import { combineReducers } from 'redux';
import cartSlice from "./feature/cart";
import loadingSlice from './feature/loading';
import toastSlice from "./feature/toast";
import userSlice from "./feature/userInfo";

const rootReducer = combineReducers({
    toast: toastSlice,
    userInfo: userSlice,
    cart: cartSlice,
    loading: loadingSlice,
});

export default rootReducer;

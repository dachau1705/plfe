import { combineReducers } from 'redux';
import toastSlice from "./feature/toast";
import { userSlice } from './feature/userInfo';

const rootReducer = combineReducers({
    toast: toastSlice,
    userInfo: userSlice,
});

export default rootReducer;

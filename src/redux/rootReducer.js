import { combineReducers } from 'redux';
import toastSlice from "./feature/toast";

const rootReducer = combineReducers({
    toast: toastSlice,
});

export default rootReducer;

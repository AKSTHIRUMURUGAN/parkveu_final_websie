import {combineReducers, configureStore} from  '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from "./slices/authSlice";

import orderReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice"

const reducer=combineReducers({

  authState:authReducer,
  orderState:orderReducer,
  userState:userReducer
})
const store=configureStore({
    reducer,
    middleware:[thunk]
})
export default store;
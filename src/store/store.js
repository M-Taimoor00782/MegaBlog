import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'
const store = configureStore({
    reducer:{
        auth: authSlice,
        // post : postSlice new feature add after complete the app
    }
});


export default store
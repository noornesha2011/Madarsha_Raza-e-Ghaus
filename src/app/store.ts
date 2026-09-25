import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import dashboardReducer from '../features/dashboardSlice'
const store = configureStore(

   {
    reducer:{
        auth:authReducer,
        dashboard: dashboardReducer
    }

    }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store

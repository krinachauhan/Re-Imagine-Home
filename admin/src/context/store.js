import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import historyReducer from "./historySlice"
import feedbackReducer from './feedbackSlice'
import userReducer from './userSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        history: historyReducer,
        feedback: feedbackReducer,
        users: userReducer
    }
})

export default store
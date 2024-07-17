import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        _id: null,
        profileImage: null,
        emailID: null,
        firstName: null,
        lastName: null,   
    },
    isLogin: true
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { _id, profileImage, emailID, firstName, lastName } = action.payload.user    
            state.user._id = _id
            state.user.profileImage = profileImage
            state.user.emailID = emailID
            state.user.firstName = firstName
            state.user.lastName = lastName
            state.isLogin = true
        },
        logout: (state) => {
            state.user = {}
            state.isLogin = false
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer   

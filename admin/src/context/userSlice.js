import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [

    ],
    userEmail: {

    }
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getallusers: (state, action) => {
            state.users = action.payload

            const usersObject = action.payload.reduce((acc, user) => {
                acc[user._id] = user.emailID
                return acc
            }, {})

            state.userEmail = usersObject
        }
    }
})

export const { getallusers } = userSlice.actions

export default userSlice.reducer
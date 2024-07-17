import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    feedback: []
}

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        addfeedback: (state, action) => {
            state.feedback = action.payload.feedback
        }
    }
})

export const { addfeedback } = feedbackSlice.actions

export default feedbackSlice.reducer
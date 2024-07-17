import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    history: [

    ]
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addhistory: (state, action)  => {
            state.history = action.payload.history
        }
    }
})

export const { addhistory } = historySlice.actions
export default historySlice.reducer
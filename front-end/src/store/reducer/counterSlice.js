import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState:{
            value:0,
    },
    reducers: {
        changeCounter: (state,action) =>{
            state.value=action.payload
        },
    }

})
export const{changeCounter}=counterSlice.actions

export default counterSlice.reducer
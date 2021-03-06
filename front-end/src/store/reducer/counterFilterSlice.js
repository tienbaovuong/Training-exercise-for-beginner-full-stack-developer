import { createSlice } from '@reduxjs/toolkit'

export const counterFilterSlice = createSlice({
    name: 'counterFilter',
    initialState:{
            value:0,
    },
    reducers: {
        changeCounterFilter: (state,action) =>{
            console.log("reset counter");
            state.value=action.payload
        },
    }

})
export const{changeCounterFilter}=counterFilterSlice.actions

export default counterFilterSlice.reducer